import { useState, useEffect } from 'react';
import { ShieldCheck, TriangleAlert as AlertTriangle, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { PremiumFeatureModal } from '../components/PremiumFeatureModal';
import { Tooltip } from '../components/Tooltip';
import { generateProFormaPDF } from '../utils/pdfGenerator';
import DisclaimerBanner from '../components/DisclaimerBanner';

interface DSCRInputs {
  monthlyRentalIncome: string;
  vacancyRate: string;
  annualPropertyTax: string;
  annualInsurance: string;
  annualMaintenance: string;
  annualHOA: string;
  propertyManagementRate: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
}

interface DSCRResults {
  grossAnnualIncome: number;
  vacancyLoss: number;
  effectiveGrossIncome: number;
  totalAnnualExpenses: number;
  netOperatingIncome: number;
  annualDebtService: number;
  dscr: number;
  monthlyDebtService: number;
  lenderMinDSCR: number;
  qualifies: boolean;
  maxLoanAtDSCR: number;
}

const LENDER_MIN_DSCR = 1.25;

export default function DSCRCalculator() {
  const { user, profile } = useAuth();
  const [inputs, setInputs] = useState<DSCRInputs>({
    monthlyRentalIncome: '2400',
    vacancyRate: '8',
    annualPropertyTax: '3600',
    annualInsurance: '1400',
    annualMaintenance: '2400',
    annualHOA: '0',
    propertyManagementRate: '10',
    loanAmount: '240000',
    interestRate: '7.25',
    loanTerm: '30',
  });
  const [results, setResults] = useState<DSCRResults | null>(null);
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const calculateResults = (): DSCRResults => {
    const monthlyRent = parseFloat(inputs.monthlyRentalIncome) || 0;
    const vacancyRate = parseFloat(inputs.vacancyRate) || 0;
    const annualTax = parseFloat(inputs.annualPropertyTax) || 0;
    const annualInsurance = parseFloat(inputs.annualInsurance) || 0;
    const annualMaintenance = parseFloat(inputs.annualMaintenance) || 0;
    const annualHOA = parseFloat(inputs.annualHOA) || 0;
    const mgmtRate = parseFloat(inputs.propertyManagementRate) || 0;
    const loanAmount = parseFloat(inputs.loanAmount) || 0;
    const interestRate = parseFloat(inputs.interestRate) || 0;
    const loanTerm = parseInt(inputs.loanTerm) || 30;

    const grossAnnualIncome = monthlyRent * 12;
    const vacancyLoss = grossAnnualIncome * (vacancyRate / 100);
    const effectiveGrossIncome = grossAnnualIncome - vacancyLoss;

    const annualMgmtFee = effectiveGrossIncome * (mgmtRate / 100);
    const totalAnnualExpenses = annualTax + annualInsurance + annualMaintenance + annualHOA + annualMgmtFee;

    const netOperatingIncome = effectiveGrossIncome - totalAnnualExpenses;

    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    let monthlyDebtService = 0;
    if (monthlyRate > 0 && loanAmount > 0) {
      monthlyDebtService = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else if (loanAmount > 0) {
      monthlyDebtService = loanAmount / numPayments;
    }
    const annualDebtService = monthlyDebtService * 12;

    const dscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 0;
    const qualifies = dscr >= LENDER_MIN_DSCR;

    const maxLoanAtDSCR = annualDebtService > 0
      ? loanAmount * (netOperatingIncome / (LENDER_MIN_DSCR * annualDebtService))
      : 0;

    return {
      grossAnnualIncome,
      vacancyLoss,
      effectiveGrossIncome,
      totalAnnualExpenses,
      netOperatingIncome,
      annualDebtService,
      dscr,
      monthlyDebtService,
      lenderMinDSCR: LENDER_MIN_DSCR,
      qualifies,
      maxLoanAtDSCR,
    };
  };

  useEffect(() => {
    const r = calculateResults();
    setResults(r);
    setCurrentOutputs({
      netOperatingIncome: r.netOperatingIncome,
      annualDebtService: r.annualDebtService,
      dscr: r.dscr,
      qualifies: r.qualifies,
    });
  }, [inputs]);

  const handleInputChange = (field: keyof DSCRInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getDSCRColor = (dscr: number) => {
    if (dscr >= 1.35) return 'text-green-400';
    if (dscr >= 1.25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDSCRBg = (dscr: number) => {
    if (dscr >= 1.35) return 'bg-green-500/20 border-green-500/50';
    if (dscr >= 1.25) return 'bg-yellow-500/20 border-yellow-500/50';
    return 'bg-red-500/20 border-red-500/50';
  };

  const getDSCRLabel = (dscr: number) => {
    if (dscr >= 1.5) return 'Excellent — Easily Qualifies';
    if (dscr >= 1.35) return 'Strong — Qualifies with Most Lenders';
    if (dscr >= 1.25) return 'Borderline — May Qualify';
    if (dscr >= 1.0) return 'Below Lender Minimum (1.25x)';
    return 'NOI Does Not Cover Debt';
  };

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'premium' || profile?.subscription_status === 'active';
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    if (!results) return;
    generateProFormaPDF({
      toolName: 'DSCR Calculator',
      inputs: {
        'Monthly Rental Income': formatCurrency(parseFloat(inputs.monthlyRentalIncome) || 0),
        'Vacancy Rate': `${inputs.vacancyRate}%`,
        'Annual Property Tax': formatCurrency(parseFloat(inputs.annualPropertyTax) || 0),
        'Annual Insurance': formatCurrency(parseFloat(inputs.annualInsurance) || 0),
        'Annual Maintenance': formatCurrency(parseFloat(inputs.annualMaintenance) || 0),
        'Annual HOA': formatCurrency(parseFloat(inputs.annualHOA) || 0),
        'Property Management': `${inputs.propertyManagementRate}%`,
        'Loan Amount': formatCurrency(parseFloat(inputs.loanAmount) || 0),
        'Interest Rate': `${inputs.interestRate}%`,
        'Loan Term': `${inputs.loanTerm} years`,
      },
      outputs: {
        'Net Operating Income (NOI)': formatCurrency(results.netOperatingIncome),
        'Annual Debt Service': formatCurrency(results.annualDebtService),
        'DSCR': results.dscr.toFixed(2) + 'x',
        'Lender Minimum DSCR': `${LENDER_MIN_DSCR}x`,
        'Qualification Status': results.qualifies ? 'Qualifies' : 'Does Not Qualify',
        'Max Loan at 1.25x DSCR': formatCurrency(results.maxLoanAtDSCR),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">DSCR Calculator</h1>
              <p className="text-slate-400 mt-1">Debt Service Coverage Ratio — qualify investment loans by rental income</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <FileDown className="h-5 w-5" />
            Download Pro Forma PDF
          </button>
        </div>

        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <p className="text-emerald-300 text-sm">
            <strong>What is DSCR?</strong> Most investment property lenders require a minimum DSCR of <strong>1.25x</strong>, meaning the property's Net Operating Income must be at least 125% of your annual mortgage payment. A higher DSCR gives you better rates and easier approval.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Rental Income</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 inline-flex items-center gap-1">
                    Monthly Gross Rental Income
                    <Tooltip term="Gross Rental Income" definition="Total scheduled rent before vacancy or expense deductions." />
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.monthlyRentalIncome}
                      onChange={(e) => handleInputChange('monthlyRentalIncome', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Vacancy Rate</label>
                  <div className="relative">
                    <input type="number" step="0.1" value={inputs.vacancyRate}
                      onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Operating Expenses (Annual)</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Property Tax</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualPropertyTax}
                      onChange={(e) => handleInputChange('annualPropertyTax', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Insurance</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualInsurance}
                      onChange={(e) => handleInputChange('annualInsurance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Maintenance &amp; Repairs</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualMaintenance}
                      onChange={(e) => handleInputChange('annualMaintenance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">HOA Fees (if applicable)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualHOA}
                      onChange={(e) => handleInputChange('annualHOA', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Property Management Fee</label>
                  <div className="relative">
                    <input type="number" step="0.5" value={inputs.propertyManagementRate}
                      onChange={(e) => handleInputChange('propertyManagementRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">% of EGI</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Enter 0 if self-managing</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Proposed Loan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Loan Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Interest Rate</label>
                  <div className="relative">
                    <input type="number" step="0.125" value={inputs.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Loan Term</label>
                  <select value={inputs.loanTerm} onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className={`p-6 rounded-2xl border-2 ${getDSCRBg(results.dscr)}`}>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-300 mb-1 inline-flex items-center justify-center gap-1">
                      DSCR
                      <Tooltip term="DSCR" definition="Debt Service Coverage Ratio = NOI / Annual Debt Service. Most lenders require at least 1.25x." />
                    </p>
                    <p className={`text-6xl font-bold mb-2 ${getDSCRColor(results.dscr)}`}>
                      {results.dscr.toFixed(2)}x
                    </p>
                    <p className={`text-sm font-semibold ${getDSCRColor(results.dscr)}`}>
                      {getDSCRLabel(results.dscr)}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Lender Minimum</span>
                      <span className="text-white font-semibold">{LENDER_MIN_DSCR}x</span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${results.dscr >= 1.25 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min((results.dscr / 2) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Income &amp; NOI</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gross Annual Income</span>
                      <span className="text-white font-medium">{formatCurrency(results.grossAnnualIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vacancy Loss</span>
                      <span className="text-red-400 font-medium">-{formatCurrency(results.vacancyLoss)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-2">
                      <span className="text-slate-300">Effective Gross Income</span>
                      <span className="text-white font-semibold">{formatCurrency(results.effectiveGrossIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Operating Expenses</span>
                      <span className="text-red-400 font-medium">-{formatCurrency(results.totalAnnualExpenses)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-2">
                      <span className="text-emerald-300 font-semibold">Net Operating Income</span>
                      <span className="text-emerald-400 font-bold">{formatCurrency(results.netOperatingIncome)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Debt Service</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Payment</span>
                      <span className="text-white font-medium">{formatCurrency(results.monthlyDebtService)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Debt Service</span>
                      <span className="text-white font-medium">{formatCurrency(results.annualDebtService)}</span>
                    </div>
                  </div>
                </div>

                {!results.qualifies && results.maxLoanAtDSCR > 0 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-300 font-semibold text-sm mb-1">To reach 1.25x DSCR</p>
                        <p className="text-yellow-400/80 text-xs">Reduce the loan to approximately</p>
                        <p className="text-yellow-300 font-bold text-lg">{formatCurrency(results.maxLoanAtDSCR)}</p>
                        <p className="text-yellow-400/80 text-xs mt-1">or increase rental income / reduce expenses.</p>
                      </div>
                    </div>
                  </div>
                )}

                {user && (
                  <ScenarioPanel
                    toolSlug="dscr"
                    currentInputs={inputs}
                    currentOutputs={currentOutputs}
                    onLoadScenario={(s: Record<string, any>) => setInputs(s as DSCRInputs)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <DisclaimerBanner />
      </div>

      <PremiumFeatureModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  );
}
