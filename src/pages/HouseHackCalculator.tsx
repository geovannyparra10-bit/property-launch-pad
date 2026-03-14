import { useState, useEffect } from 'react';
import { Hop as Home, DollarSign, Users, TrendingUp, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { PremiumFeatureModal } from '../components/PremiumFeatureModal';
import { Tooltip } from '../components/Tooltip';
import { generateProFormaPDF } from '../utils/pdfGenerator';
import DisclaimerBanner from '../components/DisclaimerBanner';

interface HouseHackInputs {
  purchasePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  totalUnits: string;
  rentedUnits: string;
  monthlyRentPerUnit: string;
  monthlyPropertyTax: string;
  monthlyInsurance: string;
  monthlyMaintenance: string;
  monthlyUtilities: string;
}

interface HouseHackResults {
  totalRentalIncome: number;
  mortgagePayment: number;
  totalMonthlyExpenses: number;
  effectiveHousingCost: number;
  monthlyCashFlow: number;
  livingStatus: 'free' | 'affordable' | 'expensive';
}

export default function HouseHackCalculator() {
  const { user, profile } = useAuth();
  const [inputs, setInputs] = useState<HouseHackInputs>({
    purchasePrice: '400000',
    downPayment: '20',
    interestRate: '6.5',
    loanTerm: '30',
    totalUnits: '4',
    rentedUnits: '3',
    monthlyRentPerUnit: '1500',
    monthlyPropertyTax: '500',
    monthlyInsurance: '200',
    monthlyMaintenance: '300',
    monthlyUtilities: '150',
  });
  const [results, setResults] = useState<HouseHackResults | null>(null);
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const calculateResults = (): HouseHackResults => {
    const price = parseFloat(inputs.purchasePrice) || 0;
    const downPct = parseFloat(inputs.downPayment) || 0;
    const rate = parseFloat(inputs.interestRate) || 0;
    const term = parseInt(inputs.loanTerm) || 30;
    const totalUnits = parseInt(inputs.totalUnits) || 0;
    const rentedUnits = parseInt(inputs.rentedUnits) || 0;
    const rentPerUnit = parseFloat(inputs.monthlyRentPerUnit) || 0;
    const tax = parseFloat(inputs.monthlyPropertyTax) || 0;
    const insurance = parseFloat(inputs.monthlyInsurance) || 0;
    const maintenance = parseFloat(inputs.monthlyMaintenance) || 0;
    const utilities = parseFloat(inputs.monthlyUtilities) || 0;

    const loanAmount = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;

    let mortgagePayment = 0;
    if (monthlyRate > 0) {
      mortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      mortgagePayment = loanAmount / numPayments;
    }

    const totalRentalIncome = rentedUnits * rentPerUnit;
    const totalMonthlyExpenses = mortgagePayment + tax + insurance + maintenance + utilities;
    const effectiveHousingCost = totalMonthlyExpenses - totalRentalIncome;
    const monthlyCashFlow = totalUnits * rentPerUnit - totalMonthlyExpenses;

    let livingStatus: 'free' | 'affordable' | 'expensive' = 'expensive';
    if (effectiveHousingCost <= 0) {
      livingStatus = 'free';
    } else if (effectiveHousingCost < 500) {
      livingStatus = 'affordable';
    }

    return {
      totalRentalIncome,
      mortgagePayment,
      totalMonthlyExpenses,
      effectiveHousingCost,
      monthlyCashFlow,
      livingStatus,
    };
  };

  useEffect(() => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setCurrentOutputs({
      totalRentalIncome: calculatedResults.totalRentalIncome,
      mortgagePayment: calculatedResults.mortgagePayment,
      totalMonthlyExpenses: calculatedResults.totalMonthlyExpenses,
      effectiveHousingCost: calculatedResults.effectiveHousingCost,
      monthlyCashFlow: calculatedResults.monthlyCashFlow,
      livingStatus: calculatedResults.livingStatus,
    });
  }, [inputs]);

  const handleInputChange = (field: keyof HouseHackInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getLivingStatusColor = (status: 'free' | 'affordable' | 'expensive') => {
    switch (status) {
      case 'free':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'affordable':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'expensive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getLivingStatusText = (status: 'free' | 'affordable' | 'expensive') => {
    switch (status) {
      case 'free':
        return 'Living for Free!';
      case 'affordable':
        return 'Affordable Housing';
      case 'expensive':
        return 'Still Paying';
    }
  };

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    if (!results) return

    generateProFormaPDF({
      toolName: 'House Hack Calculator',
      inputs: {
        'Purchase Price': formatCurrency(parseFloat(inputs.purchasePrice) || 0),
        'Down Payment': `${inputs.downPayment}%`,
        'Interest Rate': `${inputs.interestRate}%`,
        'Loan Term': `${inputs.loanTerm} years`,
        'Total Units': inputs.totalUnits,
        'Units Rented Out': inputs.rentedUnits,
        'Monthly Rent per Unit': formatCurrency(parseFloat(inputs.monthlyRentPerUnit) || 0),
        'Monthly Property Tax': formatCurrency(parseFloat(inputs.monthlyPropertyTax) || 0),
        'Monthly Insurance': formatCurrency(parseFloat(inputs.monthlyInsurance) || 0),
        'Monthly Maintenance': formatCurrency(parseFloat(inputs.monthlyMaintenance) || 0),
        'Monthly Utilities': formatCurrency(parseFloat(inputs.monthlyUtilities) || 0),
      },
      outputs: {
        'Total Rental Income': formatCurrency(results.totalRentalIncome),
        'Mortgage Payment': formatCurrency(results.mortgagePayment),
        'Total Monthly Expenses': formatCurrency(results.totalMonthlyExpenses),
        'Effective Housing Cost': formatCurrency(Math.max(0, results.effectiveHousingCost)),
        'Monthly Cash Flow (All Units Rented)': formatCurrency(results.monthlyCashFlow),
        'Living Status': getLivingStatusText(results.livingStatus),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <Home className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">House Hack Calculator</h1>
              <p className="text-slate-400 mt-1">Calculate your effective housing cost with rental income</p>
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
              <h2 className="text-xl font-semibold text-white mb-6">Property Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
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
                    Down Payment (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Interest Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Loan Term
                  </label>
                  <select
                    value={inputs.loanTerm}
                    onChange={(e) => handleInputChange('loanTerm', e.target.value)}
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

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Units & Rental Income</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Total Number of Units
                  </label>
                  <input
                    type="number"
                    value={inputs.totalUnits}
                    onChange={(e) => handleInputChange('totalUnits', e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Units You Rent Out
                  </label>
                  <input
                    type="number"
                    value={inputs.rentedUnits}
                    onChange={(e) => handleInputChange('rentedUnits', e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Average Monthly Rent per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.monthlyRentPerUnit}
                      onChange={(e) => handleInputChange('monthlyRentPerUnit', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Monthly Expenses</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Property Tax
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.monthlyPropertyTax}
                      onChange={(e) => handleInputChange('monthlyPropertyTax', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.monthlyInsurance}
                      onChange={(e) => handleInputChange('monthlyInsurance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Maintenance
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.monthlyMaintenance}
                      onChange={(e) => handleInputChange('monthlyMaintenance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Utilities
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.monthlyUtilities}
                      onChange={(e) => handleInputChange('monthlyUtilities', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Results</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Total Rental Income</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.totalRentalIncome)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <Home className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Mortgage Payment</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.mortgagePayment)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-400">Total Monthly Expenses</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.totalMonthlyExpenses)}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-xl border-2 ${getLivingStatusColor(results.livingStatus)}`}>
                      <div className="text-center">
                        <p className="text-sm font-medium mb-2">Your Effective Housing Cost</p>
                        <p className="text-3xl font-bold mb-2">
                          {formatCurrency(Math.max(0, results.effectiveHousingCost))}
                          <span className="text-sm font-normal">/month</span>
                        </p>
                        <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold">
                          {getLivingStatusText(results.livingStatus)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <Users className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400 inline-flex items-center">
                            Monthly Cash Flow (All Units Rented)
                            <Tooltip
                              term="Cash Flow"
                              definition="The amount of money remaining after all expenses (including mortgage, taxes, insurance, and operating costs) are paid from rental income."
                            />
                          </p>
                          <p className={`text-xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(results.monthlyCashFlow)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {user && (
                  <ScenarioPanel
                    toolSlug="house_hack"
                    currentInputs={inputs}
                    currentOutputs={currentOutputs}
                    onLoadScenario={(inputs: Record<string, any>) => setInputs(inputs as HouseHackInputs)}
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
