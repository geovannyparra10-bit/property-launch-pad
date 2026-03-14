import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, TrendingUp, TrendingDown, Calculator, Percent, Hop as Home, Clock, FileDown } from 'lucide-react'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { generateProFormaPDF } from '../utils/pdfGenerator'
import DisclaimerBanner from '../components/DisclaimerBanner'

type LoanTerm = 15 | 20 | 25 | 30

export function DealAnalyzer() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [purchasePrice, setPurchasePrice] = useState(300000)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState<LoanTerm>(30)
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(2500)
  const [vacancyRate, setVacancyRate] = useState(5)
  const [annualPropertyTax, setAnnualPropertyTax] = useState(3600)
  const [annualInsurance, setAnnualInsurance] = useState(1200)
  const [annualMaintenance, setAnnualMaintenance] = useState(3000)
  const [annualPropertyManagementFee, setAnnualPropertyManagementFee] = useState(10)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const calculateDeal = () => {
    const loanAmount = purchasePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    let monthlyMortgage = 0
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    } else if (loanAmount > 0) {
      monthlyMortgage = loanAmount / numberOfPayments
    }

    const closingCosts = purchasePrice * 0.03
    const totalCashInvested = downPayment + closingCosts

    const monthlyPropertyTax = annualPropertyTax / 12
    const monthlyInsurance = annualInsurance / 12
    const monthlyMaintenance = annualMaintenance / 12

    const effectiveMonthlyRentalIncome = monthlyRentalIncome * (1 - vacancyRate / 100)
    const monthlyManagementFee = effectiveMonthlyRentalIncome * (annualPropertyManagementFee / 100)
    const monthlyVacancyLoss = monthlyRentalIncome * (vacancyRate / 100)

    const totalMonthlyExpenses = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + monthlyManagementFee

    const monthlyCashFlow = effectiveMonthlyRentalIncome - totalMonthlyExpenses
    const annualCashFlow = monthlyCashFlow * 12

    const annualOperatingExpenses = annualPropertyTax + annualInsurance + annualMaintenance + (effectiveMonthlyRentalIncome * (annualPropertyManagementFee / 100) * 12)
    const netOperatingIncome = (effectiveMonthlyRentalIncome * 12) - annualOperatingExpenses
    const capRate = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0

    const cashOnCashReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0

    return {
      monthlyMortgage,
      totalMonthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCashReturn,
      totalCashInvested,
      closingCosts,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyMaintenance,
      monthlyManagementFee,
      monthlyVacancyLoss,
      effectiveMonthlyRentalIncome,
      loanAmount,
    }
  }

  const {
    monthlyMortgage,
    totalMonthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    capRate,
    cashOnCashReturn,
    totalCashInvested,
    closingCosts,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyMaintenance,
    monthlyManagementFee,
    monthlyVacancyLoss,
    effectiveMonthlyRentalIncome,
    loanAmount,
  } = calculateDeal()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCurrencyDecimal = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const handleLoadScenario = (inputs: Record<string, any>) => {
    if (inputs.purchasePrice !== undefined) setPurchasePrice(inputs.purchasePrice)
    if (inputs.downPayment !== undefined) setDownPayment(inputs.downPayment)
    if (inputs.interestRate !== undefined) setInterestRate(inputs.interestRate)
    if (inputs.loanTerm !== undefined) setLoanTerm(inputs.loanTerm)
    if (inputs.monthlyRentalIncome !== undefined) setMonthlyRentalIncome(inputs.monthlyRentalIncome)
    if (inputs.vacancyRate !== undefined) setVacancyRate(inputs.vacancyRate)
    if (inputs.annualPropertyTax !== undefined) setAnnualPropertyTax(inputs.annualPropertyTax)
    if (inputs.annualInsurance !== undefined) setAnnualInsurance(inputs.annualInsurance)
    if (inputs.annualMaintenance !== undefined) setAnnualMaintenance(inputs.annualMaintenance)
    if (inputs.annualPropertyManagementFee !== undefined) setAnnualPropertyManagementFee(inputs.annualPropertyManagementFee)
  }

  const currentInputs = {
    purchasePrice,
    downPayment,
    interestRate,
    loanTerm,
    monthlyRentalIncome,
    vacancyRate,
    annualPropertyTax,
    annualInsurance,
    annualMaintenance,
    annualPropertyManagementFee,
  }

  const currentOutputs = {
    monthlyMortgage,
    totalMonthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    capRate,
    cashOnCashReturn,
    totalCashInvested,
  }

  const isPositiveCashFlow = monthlyCashFlow > 0

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    generateProFormaPDF({
      toolName: 'Investment Deal Analyzer',
      inputs: {
        'Purchase Price': formatCurrency(purchasePrice),
        'Down Payment': formatCurrency(downPayment),
        'Interest Rate': `${interestRate}%`,
        'Loan Term': `${loanTerm} years`,
        'Monthly Rental Income': formatCurrencyDecimal(monthlyRentalIncome),
        'Vacancy Rate': `${vacancyRate}%`,
        'Annual Property Tax': formatCurrency(annualPropertyTax),
        'Annual Insurance': formatCurrency(annualInsurance),
        'Annual Maintenance': formatCurrency(annualMaintenance),
        'Property Management Fee': `${annualPropertyManagementFee}%`,
      },
      outputs: {
        'Monthly Cash Flow': formatCurrencyDecimal(monthlyCashFlow),
        'Annual Cash Flow': formatCurrency(annualCashFlow),
        'Cap Rate': formatPercent(capRate),
        'Cash on Cash Return': formatPercent(cashOnCashReturn),
        'Total Cash Invested': formatCurrency(totalCashInvested),
        'Monthly Mortgage (P&I)': formatCurrencyDecimal(monthlyMortgage),
        'Total Monthly Expenses': formatCurrencyDecimal(totalMonthlyExpenses),
        'Loan Amount': formatCurrency(loanAmount),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Investment Deal Analyzer</h1>
              <p className="text-gray-400">Analyze real estate investment opportunities and cash flow</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <FileDown className="h-5 w-5" />
              Download Pro Forma PDF
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ScenarioPanel
            toolSlug="deal_analyzer"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={handleLoadScenario}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Property Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {purchasePrice > 0 ? `${((downPayment / purchasePrice) * 100).toFixed(1)}% down` : '0% down'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Loan Term (years)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value) as LoanTerm)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                      >
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={30}>30</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Income & Expenses</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Monthly Rental Income
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={monthlyRentalIncome}
                      onChange={(e) => setMonthlyRentalIncome(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Vacancy Rate (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.1"
                      value={vacancyRate}
                      onChange={(e) => setVacancyRate(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Annual Property Tax
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={annualPropertyTax}
                      onChange={(e) => setAnnualPropertyTax(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Annual Insurance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={annualInsurance}
                      onChange={(e) => setAnnualInsurance(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Annual Maintenance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={annualMaintenance}
                      onChange={(e) => setAnnualMaintenance(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Property Management Fee (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.1"
                      value={annualPropertyManagementFee}
                      onChange={(e) => setAnnualPropertyManagementFee(Number(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatCurrencyDecimal(monthlyManagementFee)}/month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-lg p-6 border-2 ${
              isPositiveCashFlow
                ? 'bg-gradient-to-br from-green-600 to-green-700 border-green-400'
                : 'bg-gradient-to-br from-red-600 to-red-700 border-red-400'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isPositiveCashFlow ? (
                  <TrendingUp className="w-6 h-6 text-green-100" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-100" />
                )}
                <h3 className="text-lg font-semibold text-white">Deal Verdict</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">
                {isPositiveCashFlow ? 'Positive Cash Flow' : 'Negative Cash Flow'}
              </p>
              <p className="text-sm text-white/80">
                Monthly: {formatCurrencyDecimal(monthlyCashFlow)} | Annual: {formatCurrencyDecimal(annualCashFlow)}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-bold text-white">Key Metrics</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Cap Rate</span>
                  <span className="text-white font-semibold">{formatPercent(capRate)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Cash on Cash Return</span>
                  <span className="text-white font-semibold">{formatPercent(cashOnCashReturn)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Total Cash Invested</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(totalCashInvested)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-bold text-white">Monthly Breakdown</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Rental Income</span>
                  <span className="text-green-400 font-semibold">+{formatCurrencyDecimal(monthlyRentalIncome)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Vacancy Loss</span>
                  <span className="text-red-400 font-semibold">-{formatCurrencyDecimal(monthlyVacancyLoss)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Effective Income</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(effectiveMonthlyRentalIncome)}</span>
                </div>
                <div className="h-px bg-gray-600 my-2"></div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Mortgage (P&I)</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(monthlyMortgage)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Property Tax</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(monthlyPropertyTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Insurance</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(monthlyInsurance)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Maintenance</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(monthlyMaintenance)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Management Fee</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(monthlyManagementFee)}</span>
                </div>
                <div className="h-px bg-gray-600 my-2"></div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Total Expenses</span>
                  <span className="text-white font-semibold">{formatCurrencyDecimal(totalMonthlyExpenses)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t-2 border-gray-600 mt-2">
                  <span className="text-gray-300 font-medium">Net Cash Flow</span>
                  <span className={`font-bold text-lg ${
                    monthlyCashFlow > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrencyDecimal(monthlyCashFlow)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Loan Amount</span>
                  <span className="text-white font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Down Payment</span>
                  <span className="text-white font-semibold">{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Closing Costs (3%)</span>
                  <span className="text-white font-semibold">{formatCurrency(closingCosts)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t-2 border-gray-600 mt-2">
                  <span className="text-gray-300 font-medium">Total Cash Needed</span>
                  <span className="text-white font-bold text-lg">
                    {formatCurrency(totalCashInvested)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclaimerBanner />
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  )
}
