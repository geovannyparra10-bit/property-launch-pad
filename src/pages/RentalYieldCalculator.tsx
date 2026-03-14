import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, Percent, TrendingUp, TrendingDown, FileDown } from 'lucide-react'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { Tooltip } from '../components/Tooltip'
import { generateProFormaPDF } from '../utils/pdfGenerator'

export function RentalYieldCalculator() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [propertyPrice, setPropertyPrice] = useState(300000)
  const [monthlyRentalIncome, setMonthlyRentalIncome] = useState(2000)
  const [annualMaintenanceCosts, setAnnualMaintenanceCosts] = useState(2400)
  const [annualInsurance, setAnnualInsurance] = useState(1200)
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2)
  const [vacancyRate, setVacancyRate] = useState(5)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const annualRent = monthlyRentalIncome * 12
  const effectiveAnnualRent = annualRent * (1 - vacancyRate / 100)
  const annualPropertyTax = propertyPrice * (propertyTaxRate / 100)
  const totalAnnualCosts = annualMaintenanceCosts + annualInsurance + annualPropertyTax

  const grossYield = propertyPrice > 0 ? (annualRent / propertyPrice) * 100 : 0
  const netYield = propertyPrice > 0 ? ((effectiveAnnualRent - totalAnnualCosts) / propertyPrice) * 100 : 0

  const monthlyExpenses = totalAnnualCosts / 12
  const monthlyCashFlow = monthlyRentalIncome - monthlyExpenses
  const annualCashFlow = effectiveAnnualRent - totalAnnualCosts

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
    if (inputs.propertyPrice !== undefined) setPropertyPrice(inputs.propertyPrice)
    if (inputs.monthlyRentalIncome !== undefined) setMonthlyRentalIncome(inputs.monthlyRentalIncome)
    if (inputs.annualMaintenanceCosts !== undefined) setAnnualMaintenanceCosts(inputs.annualMaintenanceCosts)
    if (inputs.annualInsurance !== undefined) setAnnualInsurance(inputs.annualInsurance)
    if (inputs.propertyTaxRate !== undefined) setPropertyTaxRate(inputs.propertyTaxRate)
    if (inputs.vacancyRate !== undefined) setVacancyRate(inputs.vacancyRate)
  }

  const currentInputs = {
    propertyPrice,
    monthlyRentalIncome,
    annualMaintenanceCosts,
    annualInsurance,
    propertyTaxRate,
    vacancyRate,
  }

  const currentOutputs = {
    grossYield,
    netYield,
    monthlyCashFlow,
    annualCashFlow,
  }

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    generateProFormaPDF({
      toolName: 'Rental Yield Calculator',
      inputs: {
        'Property Price': formatCurrency(propertyPrice),
        'Monthly Rental Income': formatCurrencyDecimal(monthlyRentalIncome),
        'Annual Maintenance Costs': formatCurrency(annualMaintenanceCosts),
        'Annual Insurance': formatCurrency(annualInsurance),
        'Property Tax Rate': `${propertyTaxRate}%`,
        'Vacancy Rate': `${vacancyRate}%`,
      },
      outputs: {
        'Gross Yield': formatPercent(grossYield),
        'Net Yield': formatPercent(netYield),
        'Monthly Cash Flow': formatCurrencyDecimal(monthlyCashFlow),
        'Annual Cash Flow': formatCurrency(annualCashFlow),
        'Gross Annual Rent': formatCurrency(annualRent),
        'Effective Annual Rent': formatCurrency(effectiveAnnualRent),
        'Total Annual Costs': formatCurrency(totalAnnualCosts),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Rental Yield Calculator</h1>
              <p className="text-gray-400">Calculate your rental property returns and cash flow</p>
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
            toolSlug="rental_yield"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={handleLoadScenario}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Property Details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Property Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

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
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(monthlyRentalIncome * 12)} per year
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Annual Maintenance Costs
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={annualMaintenanceCosts}
                    onChange={(e) => setAnnualMaintenanceCosts(Number(e.target.value) || 0)}
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
                  Property Tax Rate (Annual %)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={propertyTaxRate}
                    onChange={(e) => setPropertyTaxRate(Number(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(annualPropertyTax)} per year
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Expected vacancy: {((vacancyRate / 100) * 12).toFixed(1)} months per year
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 border border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-200" />
                <h3 className="text-sm font-medium text-blue-200 inline-flex items-center">
                  Gross Yield
                  <Tooltip
                    term="Gross Yield"
                    definition="Annual rental income divided by property value, expressed as a percentage. Does not account for expenses."
                  />
                </h3>
              </div>
              <p className="text-4xl font-bold text-white mb-1">
                {formatPercent(grossYield)}
              </p>
              <p className="text-blue-200 text-sm">Annual rent / Property price</p>
            </div>

            <div className={`rounded-lg p-6 border ${
              netYield >= 0
                ? 'bg-gradient-to-br from-green-600 to-green-700 border-green-400'
                : 'bg-gradient-to-br from-red-600 to-red-700 border-red-400'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {netYield >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-200" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-200" />
                )}
                <h3 className={`text-sm font-medium inline-flex items-center ${netYield >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  Net Yield
                  <Tooltip
                    term="Net Yield"
                    definition="Annual rental income minus expenses divided by property value, expressed as a percentage. Provides a more accurate measure of return."
                  />
                </h3>
              </div>
              <p className="text-4xl font-bold text-white mb-1">
                {formatPercent(netYield)}
              </p>
              <p className={`text-sm ${netYield >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                After all expenses and vacancy
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 inline-flex items-center">
                Cash Flow Analysis
                <Tooltip
                  term="Cash Flow"
                  definition="The amount of money remaining after all expenses (including mortgage, taxes, insurance, and operating costs) are paid from rental income."
                />
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Monthly Rental Income</span>
                  <span className="text-white font-semibold">
                    {formatCurrencyDecimal(monthlyRentalIncome)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Monthly Expenses</span>
                  <span className="text-white font-semibold">
                    {formatCurrencyDecimal(monthlyExpenses)}
                  </span>
                </div>
                <div className={`flex justify-between items-center py-2 border-t-2 mt-2 ${
                  monthlyCashFlow >= 0 ? 'border-green-600' : 'border-red-600'
                }`}>
                  <span className="text-gray-300 font-medium">Monthly Cash Flow</span>
                  <span className={`font-bold text-lg ${
                    monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrencyDecimal(monthlyCashFlow)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Annual Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Gross Annual Rent</span>
                  <span className="text-white font-semibold">{formatCurrency(annualRent)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Effective Rent (after vacancy)</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(effectiveAnnualRent)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Total Annual Costs</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(totalAnnualCosts)}
                  </span>
                </div>
                <div className={`flex justify-between items-center py-2 border-t-2 mt-2 ${
                  annualCashFlow >= 0 ? 'border-green-600' : 'border-red-600'
                }`}>
                  <span className="text-gray-300 font-medium">Annual Cash Flow</span>
                  <span className={`font-bold text-lg ${
                    annualCashFlow >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrency(annualCashFlow)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  )
}
