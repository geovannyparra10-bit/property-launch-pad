import { useState, useEffect } from 'react';
import { Search, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { Tooltip } from '../components/Tooltip';
import DisclaimerBanner from '../components/DisclaimerBanner';

interface ScreenerInputs {
  purchasePrice: string;
  monthlyRent: string;
  downPaymentPct: string;
  interestRate: string;
  annualTaxes: string;
  annualInsurance: string;
  annualMaintenance: string;
  vacancyRate: string;
  propertyManagement: string;
}

interface RuleResult {
  label: string;
  value: string;
  threshold: string;
  passes: boolean;
  description: string;
}

interface ScreenerResults {
  onePercentRatio: number;
  twoPercentRatio: number;
  grossRentMultiplier: number;
  monthlyMortgage: number;
  monthlyCashFlow: number;
  capRate: number;
  breakEvenRent: number;
  rules: RuleResult[];
  overallScore: number;
  overallGrade: string;
  overallColor: string;
}

export default function DealScreener() {
  const { user } = useAuth();
  const [inputs, setInputs] = useState<ScreenerInputs>({
    purchasePrice: '200000',
    monthlyRent: '1800',
    downPaymentPct: '20',
    interestRate: '7.0',
    annualTaxes: '2400',
    annualInsurance: '1200',
    annualMaintenance: '2000',
    vacancyRate: '8',
    propertyManagement: '10',
  });
  const [results, setResults] = useState<ScreenerResults | null>(null);
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});

  const calcMonthlyPayment = (principal: number, annualRate: number, months: number) => {
    if (months <= 0 || principal <= 0) return 0;
    if (annualRate === 0) return principal / months;
    const r = annualRate / 100 / 12;
    return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  };

  const calculateResults = (): ScreenerResults => {
    const price = parseFloat(inputs.purchasePrice) || 0;
    const rent = parseFloat(inputs.monthlyRent) || 0;
    const downPct = parseFloat(inputs.downPaymentPct) || 20;
    const rate = parseFloat(inputs.interestRate) || 0;
    const annualTaxes = parseFloat(inputs.annualTaxes) || 0;
    const annualInsurance = parseFloat(inputs.annualInsurance) || 0;
    const annualMaintenance = parseFloat(inputs.annualMaintenance) || 0;
    const vacancyRate = parseFloat(inputs.vacancyRate) || 0;
    const mgmtRate = parseFloat(inputs.propertyManagement) || 0;

    const loanAmount = price * (1 - downPct / 100);
    const monthlyMortgage = calcMonthlyPayment(loanAmount, rate, 360);

    const effectiveRent = rent * (1 - vacancyRate / 100);
    const monthlyMgmt = effectiveRent * (mgmtRate / 100);
    const totalMonthlyExpenses = monthlyMortgage + (annualTaxes / 12) + (annualInsurance / 12) + (annualMaintenance / 12) + monthlyMgmt;
    const monthlyCashFlow = effectiveRent - totalMonthlyExpenses;

    const annualNOI = (effectiveRent * 12) - annualTaxes - annualInsurance - annualMaintenance - (monthlyMgmt * 12);
    const capRate = price > 0 ? (annualNOI / price) * 100 : 0;

    const onePercentRatio = price > 0 ? (rent / price) * 100 : 0;
    const twoPercentRatio = price > 0 ? (rent / price) * 100 : 0;
    const grossRentMultiplier = rent > 0 ? price / (rent * 12) : 0;

    const breakEvenRent = totalMonthlyExpenses + (rent * vacancyRate / 100);

    const rules: RuleResult[] = [
      {
        label: '1% Rule',
        value: `${onePercentRatio.toFixed(2)}%`,
        threshold: '≥ 1.0%',
        passes: onePercentRatio >= 1.0,
        description: 'Monthly rent should be ≥ 1% of purchase price. Quick screen for cash flow potential.',
      },
      {
        label: 'Gross Rent Multiplier',
        value: `${grossRentMultiplier.toFixed(1)}x`,
        threshold: '≤ 10x',
        passes: grossRentMultiplier <= 10,
        description: 'Purchase price divided by annual rent. Lower = better value. Under 10x is generally considered a good deal.',
      },
      {
        label: 'Cap Rate',
        value: `${capRate.toFixed(2)}%`,
        threshold: '≥ 6%',
        passes: capRate >= 6,
        description: 'Net Operating Income as % of purchase price. 6%+ is generally acceptable for rental properties.',
      },
      {
        label: 'Cash Flow Positive',
        value: monthlyCashFlow >= 0 ? `+$${Math.abs(monthlyCashFlow).toFixed(0)}/mo` : `-$${Math.abs(monthlyCashFlow).toFixed(0)}/mo`,
        threshold: '> $0/mo',
        passes: monthlyCashFlow > 0,
        description: 'Monthly income after all expenses including mortgage. Positive cash flow is critical for stable rental ownership.',
      },
      {
        label: '2% Rule (Aggressive Markets)',
        value: `${twoPercentRatio.toFixed(2)}%`,
        threshold: '≥ 2.0%',
        passes: twoPercentRatio >= 2.0,
        description: 'Stricter version of the 1% rule for high-cash-flow markets. Rarely achievable in competitive markets.',
      },
    ];

    const passedRules = rules.filter(r => r.passes).length;
    const overallScore = Math.round((passedRules / rules.length) * 100);

    let overallGrade = 'Poor Deal';
    let overallColor = 'text-red-400';
    if (passedRules >= 4) { overallGrade = 'Strong Deal'; overallColor = 'text-green-400'; }
    else if (passedRules === 3) { overallGrade = 'Decent Deal'; overallColor = 'text-yellow-400'; }
    else if (passedRules === 2) { overallGrade = 'Marginal Deal'; overallColor = 'text-orange-400'; }

    return {
      onePercentRatio,
      twoPercentRatio,
      grossRentMultiplier,
      monthlyMortgage,
      monthlyCashFlow,
      capRate,
      breakEvenRent,
      rules,
      overallScore,
      overallGrade,
      overallColor,
    };
  };

  useEffect(() => {
    const r = calculateResults();
    setResults(r);
    setCurrentOutputs({
      onePercentRatio: r.onePercentRatio,
      capRate: r.capRate,
      monthlyCashFlow: r.monthlyCashFlow,
      overallScore: r.overallScore,
    });
  }, [inputs]);

  const handleInputChange = (field: keyof ScreenerInputs, value: string) => {
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

  const getRuleIcon = (passes: boolean) => {
    if (passes) return <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />;
    return <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Search className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Quick Deal Screener</h1>
            <p className="text-slate-400 mt-1">Instantly screen deals using the 1% Rule, Cap Rate, GRM, and cash flow</p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-blue-300 text-sm">
            <strong>How to use:</strong> Enter the property price and rent to instantly see whether the deal passes key investor benchmarks. Use this as a first-pass screen — not a replacement for full analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Property &amp; Income</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Purchase Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 inline-flex items-center gap-1">
                    Monthly Rent (Market Rate)
                    <Tooltip term="Market Rent" definition="The rent you realistically expect to charge based on comparable properties in the area." />
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.monthlyRent}
                      onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Down Payment</label>
                  <div className="relative">
                    <input type="number" value={inputs.downPaymentPct}
                      onChange={(e) => handleInputChange('downPaymentPct', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Interest Rate</label>
                  <div className="relative">
                    <input type="number" step="0.125" value={inputs.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Annual Expenses</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Property Taxes</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualTaxes}
                      onChange={(e) => handleInputChange('annualTaxes', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Insurance</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualInsurance}
                      onChange={(e) => handleInputChange('annualInsurance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Maintenance &amp; CapEx</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.annualMaintenance}
                      onChange={(e) => handleInputChange('annualMaintenance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Vacancy Rate</label>
                  <div className="relative">
                    <input type="number" step="0.5" value={inputs.vacancyRate}
                      onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Property Management</label>
                  <div className="relative">
                    <input type="number" step="0.5" value={inputs.propertyManagement}
                      onChange={(e) => handleInputChange('propertyManagement', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">% (0 if self-managing)</span>
                  </div>
                </div>
              </div>
            </div>

            {results && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Rule-by-Rule Breakdown</h2>
                <div className="space-y-4">
                  {results.rules.map((rule, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${rule.passes ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                      <div className="flex items-start gap-3">
                        {getRuleIcon(rule.passes)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-white text-sm">{rule.label}</span>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-slate-400">{rule.threshold}</span>
                              <span className={`font-bold ${rule.passes ? 'text-green-400' : 'text-red-400'}`}>{rule.value}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400">{rule.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Overall Deal Score</p>
                  <p className={`text-5xl font-bold mb-1 ${results.overallColor}`}>{results.overallScore}%</p>
                  <p className={`text-lg font-semibold ${results.overallColor}`}>{results.overallGrade}</p>
                  <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${results.overallScore >= 60 ? 'bg-green-500' : results.overallScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${results.overallScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{results.rules.filter(r => r.passes).length} of {results.rules.length} rules passed</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Key Numbers</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Mortgage (P&I)</span>
                      <span className="text-white font-medium">{formatCurrency(results.monthlyMortgage)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Cash Flow</span>
                      <span className={`font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {results.monthlyCashFlow >= 0 ? '+' : ''}{formatCurrency(results.monthlyCashFlow)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cap Rate</span>
                      <span className="text-white font-medium">{results.capRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">1% Rule Ratio</span>
                      <span className={`font-medium ${results.onePercentRatio >= 1 ? 'text-green-400' : 'text-red-400'}`}>
                        {results.onePercentRatio.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gross Rent Multiplier</span>
                      <span className="text-white font-medium">{results.grossRentMultiplier.toFixed(1)}x</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3">
                      <span className="text-slate-300 font-medium inline-flex items-center gap-1">
                        Break-Even Rent
                        <Tooltip term="Break-Even Rent" definition="The minimum rent needed to cover all expenses including mortgage. You need to charge more than this to make money." />
                      </span>
                      <span className="text-yellow-400 font-bold">{formatCurrency(results.breakEvenRent)}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400">
                      These are quick screening rules only. A deal that fails the 1% rule can still be excellent in appreciating markets. Always run a full Deal Analyzer before making decisions.
                    </p>
                  </div>
                </div>

                {user && (
                  <ScenarioPanel
                    toolSlug="deal_screener"
                    currentInputs={inputs}
                    currentOutputs={currentOutputs}
                    onLoadScenario={(s: Record<string, any>) => setInputs(s as ScreenerInputs)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <DisclaimerBanner />
      </div>
    </div>
  );
}
