import { useState, useEffect } from 'react';
import { RefreshCw, DollarSign, TrendingUp, Calculator, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { PremiumFeatureModal } from '../components/PremiumFeatureModal';
import { Tooltip } from '../components/Tooltip';
import { generateProFormaPDF } from '../utils/pdfGenerator';
import DisclaimerBanner from '../components/DisclaimerBanner';

interface BRRRInputs {
  purchasePrice: string;
  rehabBudget: string;
  afterRepairValue: string;
  monthlyRentalIncome: string;
  vacancyRate: string;
  annualPropertyTax: string;
  annualInsurance: string;
  annualMaintenance: string;
  refinanceLTV: string;
  refinanceInterestRate: string;
  refinanceLoanTerm: string;
}

interface BRRRResults {
  totalCashInvested: number;
  refinanceLoanAmount: number;
  cashRecouped: number;
  cashLeftInDeal: number;
  monthlyRefinanceMortgage: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number | 'infinite';
}

export default function BRRRCalculator() {
  const { user, profile } = useAuth();
  const [inputs, setInputs] = useState<BRRRInputs>({
    purchasePrice: '150000',
    rehabBudget: '30000',
    afterRepairValue: '220000',
    monthlyRentalIncome: '1800',
    vacancyRate: '8',
    annualPropertyTax: '2400',
    annualInsurance: '1200',
    annualMaintenance: '1800',
    refinanceLTV: '75',
    refinanceInterestRate: '6.5',
    refinanceLoanTerm: '30',
  });
  const [results, setResults] = useState<BRRRResults | null>(null);
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const calculateResults = (): BRRRResults => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const rehabBudget = parseFloat(inputs.rehabBudget) || 0;
    const arv = parseFloat(inputs.afterRepairValue) || 0;
    const monthlyRent = parseFloat(inputs.monthlyRentalIncome) || 0;
    const vacancyRate = parseFloat(inputs.vacancyRate) || 0;
    const annualTax = parseFloat(inputs.annualPropertyTax) || 0;
    const annualInsurance = parseFloat(inputs.annualInsurance) || 0;
    const annualMaintenance = parseFloat(inputs.annualMaintenance) || 0;
    const refinanceLTV = parseFloat(inputs.refinanceLTV) || 75;
    const refinanceRate = parseFloat(inputs.refinanceInterestRate) || 0;
    const refinanceTerm = parseInt(inputs.refinanceLoanTerm) || 30;

    const totalCashInvested = purchasePrice + rehabBudget;
    const refinanceLoanAmount = arv * (refinanceLTV / 100);
    const cashRecouped = refinanceLoanAmount - totalCashInvested;
    const cashLeftInDeal = Math.max(0, totalCashInvested - refinanceLoanAmount);

    const monthlyRate = refinanceRate / 100 / 12;
    const numPayments = refinanceTerm * 12;

    let monthlyRefinanceMortgage = 0;
    if (monthlyRate > 0 && refinanceLoanAmount > 0) {
      monthlyRefinanceMortgage = refinanceLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                                  (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else if (refinanceLoanAmount > 0) {
      monthlyRefinanceMortgage = refinanceLoanAmount / numPayments;
    }

    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    const monthlyMaintenance = annualMaintenance / 12;
    const vacancyLoss = monthlyRent * (vacancyRate / 100);

    const totalMonthlyExpenses = monthlyRefinanceMortgage + monthlyTax + monthlyInsurance + monthlyMaintenance + vacancyLoss;
    const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;

    let cashOnCashReturn: number | 'infinite';
    if (cashLeftInDeal === 0) {
      cashOnCashReturn = 'infinite';
    } else {
      cashOnCashReturn = (annualCashFlow / cashLeftInDeal) * 100;
    }

    return {
      totalCashInvested,
      refinanceLoanAmount,
      cashRecouped,
      cashLeftInDeal,
      monthlyRefinanceMortgage,
      totalMonthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
    };
  };

  useEffect(() => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setCurrentOutputs({
      totalCashInvested: calculatedResults.totalCashInvested,
      refinanceLoanAmount: calculatedResults.refinanceLoanAmount,
      cashRecouped: calculatedResults.cashRecouped,
      cashLeftInDeal: calculatedResults.cashLeftInDeal,
      monthlyRefinanceMortgage: calculatedResults.monthlyRefinanceMortgage,
      totalMonthlyExpenses: calculatedResults.totalMonthlyExpenses,
      monthlyCashFlow: calculatedResults.monthlyCashFlow,
      annualCashFlow: calculatedResults.annualCashFlow,
      cashOnCashReturn: calculatedResults.cashOnCashReturn,
    });
  }, [inputs]);

  const handleInputChange = (field: keyof BRRRInputs, value: string) => {
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

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'premium' || profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    if (!results) return

    generateProFormaPDF({
      toolName: 'BRRR Calculator',
      inputs: {
        'Purchase Price': formatCurrency(parseFloat(inputs.purchasePrice) || 0),
        'Rehab Budget': formatCurrency(parseFloat(inputs.rehabBudget) || 0),
        'After Repair Value (ARV)': formatCurrency(parseFloat(inputs.afterRepairValue) || 0),
        'Monthly Rental Income': formatCurrency(parseFloat(inputs.monthlyRentalIncome) || 0),
        'Vacancy Rate': `${inputs.vacancyRate}%`,
        'Annual Property Tax': formatCurrency(parseFloat(inputs.annualPropertyTax) || 0),
        'Annual Insurance': formatCurrency(parseFloat(inputs.annualInsurance) || 0),
        'Annual Maintenance': formatCurrency(parseFloat(inputs.annualMaintenance) || 0),
        'Refinance LTV': `${inputs.refinanceLTV}%`,
        'Refinance Interest Rate': `${inputs.refinanceInterestRate}%`,
        'Refinance Loan Term': `${inputs.refinanceLoanTerm} years`,
      },
      outputs: {
        'Total Cash Invested': formatCurrency(results.totalCashInvested),
        'Refinance Loan Amount': formatCurrency(results.refinanceLoanAmount),
        'Cash Recouped at Refinance': formatCurrency(results.cashRecouped),
        'Cash Left in Deal': formatCurrency(results.cashLeftInDeal),
        'Monthly Refinance Mortgage': formatCurrency(results.monthlyRefinanceMortgage),
        'Total Monthly Expenses': formatCurrency(results.totalMonthlyExpenses),
        'Monthly Cash Flow': formatCurrency(results.monthlyCashFlow),
        'Annual Cash Flow': formatCurrency(results.annualCashFlow),
        'Cash-on-Cash Return': results.cashOnCashReturn === 'infinite' ? 'Infinite' : formatPercent(results.cashOnCashReturn),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <RefreshCw className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">BRRR Calculator</h1>
              <p className="text-slate-400 mt-1">Buy, Rehab, Rent, Refinance, Repeat</p>
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Purchase & Rehab</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Rehab/Renovation Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.rehabBudget}
                      onChange={(e) => handleInputChange('rehabBudget', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2 inline-flex items-center">
                    After Repair Value (ARV)
                    <Tooltip
                      term="ARV (After Repair Value)"
                      definition="The estimated value of a property after renovations and repairs are completed. Used in fix-and-flip and BRRR strategies."
                    />
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.afterRepairValue}
                      onChange={(e) => handleInputChange('afterRepairValue', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Rental Income & Expenses</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Monthly Rental Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.monthlyRentalIncome}
                      onChange={(e) => handleInputChange('monthlyRentalIncome', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Vacancy Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.vacancyRate}
                      onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Annual Property Tax
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.annualPropertyTax}
                      onChange={(e) => handleInputChange('annualPropertyTax', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Annual Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.annualInsurance}
                      onChange={(e) => handleInputChange('annualInsurance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Annual Maintenance
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      value={inputs.annualMaintenance}
                      onChange={(e) => handleInputChange('annualMaintenance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Refinance Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Refinance Loan-to-Value (LTV)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.refinanceLTV}
                      onChange={(e) => handleInputChange('refinanceLTV', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Refinance Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.refinanceInterestRate}
                      onChange={(e) => handleInputChange('refinanceInterestRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Refinance Loan Term
                  </label>
                  <select
                    value={inputs.refinanceLoanTerm}
                    onChange={(e) => handleInputChange('refinanceLoanTerm', e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
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
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">BRRR Analysis</h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                          <DollarSign className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Total Cash Invested</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.totalCashInvested)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Calculator className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Refinance Loan Amount</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.refinanceLoanAmount)}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${results.cashRecouped >= 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${results.cashRecouped >= 0 ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                          <TrendingUp className={`h-5 w-5 ${results.cashRecouped >= 0 ? 'text-green-400' : 'text-yellow-400'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${results.cashRecouped >= 0 ? 'text-green-300' : 'text-yellow-300'}`}>Cash Recouped at Refinance</p>
                          <p className={`text-xl font-bold ${results.cashRecouped >= 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {formatCurrency(results.cashRecouped)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <DollarSign className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Cash Left in Deal</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.cashLeftInDeal)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-700/50 my-4"></div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Monthly Refinance Mortgage</p>
                        <p className="text-lg font-bold text-white">{formatCurrency(results.monthlyRefinanceMortgage)}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Total Monthly Expenses</p>
                        <p className="text-lg font-bold text-white">{formatCurrency(results.totalMonthlyExpenses)}</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${results.monthlyCashFlow >= 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                      <div>
                        <p className={`text-sm mb-1 ${results.monthlyCashFlow >= 0 ? 'text-green-300' : 'text-red-300'}`}>Monthly Cash Flow</p>
                        <p className={`text-2xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(results.monthlyCashFlow)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Annual Cash Flow</p>
                        <p className={`text-lg font-bold ${results.annualCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(results.annualCashFlow)}
                        </p>
                      </div>
                    </div>

                    <div className={`p-6 rounded-xl border-2 ${results.cashOnCashReturn === 'infinite' ? 'bg-green-500/20 border-green-500/50' : 'bg-blue-500/10 border-blue-500/30'}`}>
                      <div className="text-center">
                        <p className="text-sm font-medium mb-2 text-slate-300 inline-flex items-center justify-center">
                          Cash-on-Cash Return
                          <Tooltip
                            term="Cash-on-Cash Return"
                            definition="The ratio of annual pre-tax cash flow to the total cash invested, expressed as a percentage. Measures the return on actual cash invested."
                          />
                        </p>
                        {results.cashOnCashReturn === 'infinite' ? (
                          <>
                            <p className="text-3xl font-bold text-green-400 mb-2">Infinite</p>
                            <div className="inline-block px-4 py-1 bg-green-500/20 rounded-full text-sm font-semibold text-green-400 border border-green-500/30">
                              All Capital Recycled!
                            </div>
                          </>
                        ) : (
                          <p className={`text-3xl font-bold ${results.cashOnCashReturn >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                            {formatPercent(results.cashOnCashReturn)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {user && (
                  <ScenarioPanel
                    toolSlug="brrr"
                    currentInputs={inputs}
                    currentOutputs={currentOutputs}
                    onLoadScenario={(inputs: Record<string, any>) => setInputs(inputs as BRRRInputs)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <DisclaimerBanner />
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}
