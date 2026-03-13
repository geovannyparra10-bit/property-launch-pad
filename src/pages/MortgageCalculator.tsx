import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import Navbar from '@/components/Navbar';
import { CalculatorScenario } from '@/types';
import { ArrowLeft, Save, Pin, Trash2 } from 'lucide-react';

interface Inputs {
  principal: number;
  interestRate: number;
  years: number;
  propertyTax: number;
  insurance: number;
}

interface Outputs {
  monthlyPayment: number;
  principalAndInterest: number;
  totalPITI: number;
}

export default function MortgageCalculator() {
  const { user, profile } = useAuth();
  const { t } = useLocale();
  const [toolId, setToolId] = useState<string>('');
  const [inputs, setInputs] = useState<Inputs>({
    principal: 300000,
    interestRate: 4.5,
    years: 30,
    propertyTax: 300,
    insurance: 100,
  });
  const [outputs, setOutputs] = useState<Outputs | null>(null);
  const [scenarios, setScenarios] = useState<CalculatorScenario[]>([]);
  const [showSave, setShowSave] = useState(false);
  const [scenarioName, setScenarioName] = useState('');

  useEffect(() => {
    loadTool();
  }, []);

  useEffect(() => {
    if (toolId) {
      loadScenarios();
    }
  }, [toolId]);

  const loadTool = async () => {
    const { data } = await supabase
      .from('tools')
      .select('id')
      .eq('slug', 'mortgage_calculator')
      .eq('is_active', true)
      .maybeSingle();

    if (data) {
      setToolId(data.id);
    }
  };

  const loadScenarios = async () => {
    if (!user || !toolId) return;

    const { data } = await supabase
      .from('calculator_scenarios')
      .select('*')
      .eq('user_id', user.id)
      .eq('tool_id', toolId)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    setScenarios((data as CalculatorScenario[]) || []);
  };

  const calculate = () => {
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.years * 12;

    let pi = 0;
    if (monthlyRate === 0) {
      pi = inputs.principal / numPayments;
    } else {
      pi =
        (inputs.principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const totalPITI = pi + inputs.propertyTax + inputs.insurance;

    setOutputs({
      principalAndInterest: pi,
      monthlyPayment: pi,
      totalPITI,
    });
  };

  const saveScenario = async () => {
    if (!user || !toolId || !scenarioName.trim()) return;

    const isFree = profile?.subscription_status !== 'premium';
    if (isFree && scenarios.length >= 1) {
      alert(t('scenarios.freeLimit'));
      return;
    }

    await supabase.from('calculator_scenarios').insert({
      user_id: user.id,
      tool_id: toolId,
      scenario_name: scenarioName.trim(),
      inputs,
      outputs,
      is_pinned: false,
    });

    setScenarioName('');
    setShowSave(false);
    loadScenarios();
  };

  const loadScenario = (scenario: CalculatorScenario) => {
    setInputs(scenario.inputs as unknown as Inputs);
    if (scenario.outputs) {
      setOutputs(scenario.outputs as unknown as Outputs);
    }
  };

  const deleteScenario = async (id: string) => {
    await supabase
      .from('calculator_scenarios')
      .delete()
      .eq('id', id)
      .eq('user_id', user!.id);

    loadScenarios();
  };

  const togglePin = async (scenario: CalculatorScenario) => {
    await supabase
      .from('calculator_scenarios')
      .update({ is_pinned: !scenario.is_pinned })
      .eq('id', scenario.id)
      .eq('user_id', user!.id);

    loadScenarios();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-accent mb-6"
        >
          <ArrowLeft size={16} /> All Tools
        </Link>

        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
          Mortgage Calculator
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Calculate PITI payments and compare scenarios
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Loan Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Principal Amount ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.principal}
                    onChange={(e) =>
                      setInputs({ ...inputs, principal: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.interestRate}
                    onChange={(e) =>
                      setInputs({ ...inputs, interestRate: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Loan Term (years)
                  </label>
                  <input
                    type="number"
                    value={inputs.years}
                    onChange={(e) =>
                      setInputs({ ...inputs, years: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Property Tax ($/month)
                  </label>
                  <input
                    type="number"
                    value={inputs.propertyTax}
                    onChange={(e) =>
                      setInputs({ ...inputs, propertyTax: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Home Insurance ($/month)
                  </label>
                  <input
                    type="number"
                    value={inputs.insurance}
                    onChange={(e) =>
                      setInputs({ ...inputs, insurance: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <button
                onClick={calculate}
                className="mt-6 w-full px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
              >
                Calculate
              </button>
            </div>

            {outputs && (
              <div className="p-6 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">Results</h2>
                  <button
                    onClick={() => setShowSave(!showSave)}
                    className="px-4 py-2 bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg font-semibold hover:border-accent transition flex items-center gap-2"
                  >
                    <Save size={16} /> {t('scenarios.save')}
                  </button>
                </div>

                {showSave && (
                  <div className="mb-4 p-4 bg-[var(--bg-base)] rounded-lg">
                    <input
                      type="text"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      placeholder={t('scenarios.name')}
                      className="w-full px-4 py-2 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-accent mb-3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveScenario}
                        className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition"
                      >
                        {t('scenarios.save')}
                      </button>
                      <button
                        onClick={() => setShowSave(false)}
                        className="px-4 py-2 bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg font-semibold hover:border-[var(--border-hover)] transition"
                      >
                        {t('scenarios.cancel')}
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-secondary)]">Principal & Interest:</span>
                    <span className="text-xl font-bold text-[var(--text-primary)]">
                      ${outputs.principalAndInterest.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)] font-semibold">Total PITI Payment:</span>
                    <span className="text-2xl font-bold text-accent">
                      ${outputs.totalPITI.toFixed(2)}/mo
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {t('scenarios.saved')}
            </h2>

            {scenarios.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">
                No saved scenarios yet. Calculate and save your first scenario!
              </p>
            ) : (
              scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="p-4 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {scenario.scenario_name}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => togglePin(scenario)}
                        className={`p-1.5 rounded hover:bg-[var(--bg-base)] ${
                          scenario.is_pinned ? 'text-accent' : 'text-[var(--text-muted)]'
                        }`}
                        title={scenario.is_pinned ? t('scenarios.unpin') : t('scenarios.pin')}
                      >
                        <Pin size={14} />
                      </button>
                      <button
                        onClick={() => deleteScenario(scenario.id)}
                        className="p-1.5 rounded hover:bg-[var(--bg-base)] text-[var(--text-muted)] hover:text-red-400"
                        title={t('scenarios.delete')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => loadScenario(scenario)}
                    className="w-full px-3 py-2 bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg text-sm font-semibold hover:border-accent transition"
                  >
                    {t('scenarios.load')}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
