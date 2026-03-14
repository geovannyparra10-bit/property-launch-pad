import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Plus, X, TrendingUp, TrendingDown, FileDown, Building2 } from 'lucide-react'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { generateProFormaPDF } from '../utils/pdfGenerator'

interface Property {
  id: string
  address: string
  purchasePrice: number
  downPayment: number
  interestRate: number
  loanTerm: number
  monthlyRentalIncome: number
  monthlyExpenses: number
  rehabCost: number
}

const createEmptyProperty = (): Property => ({
  id: Math.random().toString(36).substr(2, 9),
  address: '',
  purchasePrice: 0,
  downPayment: 0,
  interestRate: 4.5,
  loanTerm: 30,
  monthlyRentalIncome: 0,
  monthlyExpenses: 0,
  rehabCost: 0,
})

export function PortfolioAnalyzer() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState<Property[]>([createEmptyProperty()])
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const calculatePropertyMetrics = (property: Property) => {
    const loanAmount = property.purchasePrice - property.downPayment
    const monthlyRate = property.interestRate / 100 / 12
    const numPayments = property.loanTerm * 12

    let monthlyMortgage = 0
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyMortgage =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const monthlyCashFlow = property.monthlyRentalIncome - property.monthlyExpenses - monthlyMortgage
    const annualNOI = (property.monthlyRentalIncome - property.monthlyExpenses) * 12
    const capRate = property.purchasePrice > 0 ? (annualNOI / property.purchasePrice) * 100 : 0

    const cashInvested = property.downPayment + property.rehabCost
    const annualCashFlow = monthlyCashFlow * 12
    const cashOnCash = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0

    return {
      monthlyCashFlow,
      capRate,
      cashOnCash,
      monthlyMortgage,
    }
  }

  const addProperty = () => {
    if (properties.length < 10) {
      setProperties([...properties, createEmptyProperty()])
    }
  }

  const removeProperty = (id: string) => {
    if (properties.length > 1) {
      setProperties(properties.filter(p => p.id !== id))
    }
  }

  const updateProperty = (id: string, field: keyof Property, value: any) => {
    setProperties(properties.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const portfolioMetrics = properties.reduce((acc, property) => {
    const metrics = calculatePropertyMetrics(property)
    const annualNOI = (property.monthlyRentalIncome - property.monthlyExpenses) * 12

    return {
      totalPurchasePrice: acc.totalPurchasePrice + property.purchasePrice,
      totalDownPayment: acc.totalDownPayment + property.downPayment,
      totalRehabCost: acc.totalRehabCost + property.rehabCost,
      totalMonthlyIncome: acc.totalMonthlyIncome + property.monthlyRentalIncome,
      totalMonthlyExpenses: acc.totalMonthlyExpenses + property.monthlyExpenses + metrics.monthlyMortgage,
      totalMonthlyCashFlow: acc.totalMonthlyCashFlow + metrics.monthlyCashFlow,
      totalAnnualNOI: acc.totalAnnualNOI + annualNOI,
    }
  }, {
    totalPurchasePrice: 0,
    totalDownPayment: 0,
    totalRehabCost: 0,
    totalMonthlyIncome: 0,
    totalMonthlyExpenses: 0,
    totalMonthlyCashFlow: 0,
    totalAnnualNOI: 0,
  })

  const totalCashInvested = portfolioMetrics.totalDownPayment + portfolioMetrics.totalRehabCost
  const totalAnnualCashFlow = portfolioMetrics.totalMonthlyCashFlow * 12
  const portfolioCapRate = portfolioMetrics.totalPurchasePrice > 0
    ? (portfolioMetrics.totalAnnualNOI / portfolioMetrics.totalPurchasePrice) * 100
    : 0
  const portfolioCashOnCash = totalCashInvested > 0
    ? (totalAnnualCashFlow / totalCashInvested) * 100
    : 0
  const averagePropertyCashFlow = properties.length > 0
    ? portfolioMetrics.totalMonthlyCashFlow / properties.length
    : 0

  const getVerdictColor = (cashOnCash: number) => {
    if (cashOnCash > 8) return 'green'
    if (cashOnCash >= 4) return 'yellow'
    return 'red'
  }

  const getVerdictText = (cashOnCash: number) => {
    if (cashOnCash > 8) return 'Strong Portfolio'
    if (cashOnCash >= 4) return 'Moderate Portfolio'
    return 'Weak Portfolio'
  }

  const verdictColor = getVerdictColor(portfolioCashOnCash)
  const verdictText = getVerdictText(portfolioCashOnCash)

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
    if (inputs.properties && Array.isArray(inputs.properties)) {
      setProperties(inputs.properties.map((p: any) => ({
        ...createEmptyProperty(),
        ...p,
      })))
    }
  }

  const currentInputs = {
    properties: properties.map(p => ({
      address: p.address,
      purchasePrice: p.purchasePrice,
      downPayment: p.downPayment,
      interestRate: p.interestRate,
      loanTerm: p.loanTerm,
      monthlyRentalIncome: p.monthlyRentalIncome,
      monthlyExpenses: p.monthlyExpenses,
      rehabCost: p.rehabCost,
    })),
  }

  const currentOutputs = {
    portfolioCapRate,
    portfolioCashOnCash,
    totalMonthlyCashFlow: portfolioMetrics.totalMonthlyCashFlow,
    totalAnnualCashFlow,
    averagePropertyCashFlow,
  }

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    const propertyInputs: Record<string, any> = {}
    properties.forEach((property, index) => {
      const num = index + 1
      propertyInputs[`Property ${num} - Address`] = property.address || `Property ${num}`
      propertyInputs[`Property ${num} - Purchase Price`] = formatCurrency(property.purchasePrice)
      propertyInputs[`Property ${num} - Down Payment`] = formatCurrency(property.downPayment)
      propertyInputs[`Property ${num} - Interest Rate`] = `${property.interestRate}%`
      propertyInputs[`Property ${num} - Loan Term`] = `${property.loanTerm} years`
      propertyInputs[`Property ${num} - Monthly Rental Income`] = formatCurrencyDecimal(property.monthlyRentalIncome)
      propertyInputs[`Property ${num} - Monthly Expenses`] = formatCurrencyDecimal(property.monthlyExpenses)
      propertyInputs[`Property ${num} - Rehab Cost`] = formatCurrency(property.rehabCost)
    })

    generateProFormaPDF({
      toolName: 'Portfolio Analyzer',
      inputs: propertyInputs,
      outputs: {
        'Total Properties': properties.length,
        'Total Purchase Price': formatCurrency(portfolioMetrics.totalPurchasePrice),
        'Total Down Payment': formatCurrency(portfolioMetrics.totalDownPayment),
        'Total Rehab Cost': formatCurrency(portfolioMetrics.totalRehabCost),
        'Total Cash Invested': formatCurrency(totalCashInvested),
        'Total Monthly Rental Income': formatCurrencyDecimal(portfolioMetrics.totalMonthlyIncome),
        'Total Monthly Expenses': formatCurrencyDecimal(portfolioMetrics.totalMonthlyExpenses),
        'Total Monthly Cash Flow': formatCurrencyDecimal(portfolioMetrics.totalMonthlyCashFlow),
        'Total Annual Cash Flow': formatCurrency(totalAnnualCashFlow),
        'Portfolio Cap Rate': formatPercent(portfolioCapRate),
        'Portfolio Cash-on-Cash Return': formatPercent(portfolioCashOnCash),
        'Average Per-Property Cash Flow': formatCurrencyDecimal(averagePropertyCashFlow),
        'Portfolio Verdict': verdictText,
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Portfolio Analyzer</h1>
              <p className="text-gray-400">Analyze multiple single-family properties as a bundle</p>
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
            toolSlug="portfolio_analyzer"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={handleLoadScenario}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Properties ({properties.length}/10)
            </h2>
            <button
              onClick={addProperty}
              disabled={properties.length >= 10}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
              Add Property
            </button>
          </div>

          {properties.map((property, index) => {
            const metrics = calculatePropertyMetrics(property)

            return (
              <div key={property.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Property {index + 1}</h3>
                  {properties.length > 1 && (
                    <button
                      onClick={() => removeProperty(property.id)}
                      className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={property.address}
                      onChange={(e) => updateProperty(property.id, 'address', e.target.value)}
                      placeholder="123 Main St"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Purchase Price
                    </label>
                    <input
                      type="number"
                      value={property.purchasePrice || ''}
                      onChange={(e) => updateProperty(property.id, 'purchasePrice', Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Down Payment
                    </label>
                    <input
                      type="number"
                      value={property.downPayment || ''}
                      onChange={(e) => updateProperty(property.id, 'downPayment', Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={property.interestRate || ''}
                      onChange={(e) => updateProperty(property.id, 'interestRate', Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Loan Term (Years)
                    </label>
                    <select
                      value={property.loanTerm}
                      onChange={(e) => updateProperty(property.id, 'loanTerm', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value={15}>15 years</option>
                      <option value={20}>20 years</option>
                      <option value={25}>25 years</option>
                      <option value={30}>30 years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Monthly Rental Income
                    </label>
                    <input
                      type="number"
                      value={property.monthlyRentalIncome || ''}
                      onChange={(e) => updateProperty(property.id, 'monthlyRentalIncome', Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Monthly Expenses
                    </label>
                    <input
                      type="number"
                      value={property.monthlyExpenses || ''}
                      onChange={(e) => updateProperty(property.id, 'monthlyExpenses', Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Rehab Cost
                    </label>
                    <input
                      type="number"
                      value={property.rehabCost || ''}
                      onChange={(e) => updateProperty(property.id, 'rehabCost', Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Monthly Cash Flow</p>
                    <p className={`text-lg font-semibold ${
                      metrics.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatCurrencyDecimal(metrics.monthlyCashFlow)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Cap Rate</p>
                    <p className="text-lg font-semibold text-blue-400">
                      {formatPercent(metrics.capRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Cash-on-Cash Return</p>
                    <p className={`text-lg font-semibold ${
                      metrics.cashOnCash >= 8 ? 'text-green-400' :
                      metrics.cashOnCash >= 4 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {formatPercent(metrics.cashOnCash)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Portfolio Summary</h2>
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                verdictColor === 'green' ? 'bg-green-600 text-white' :
                verdictColor === 'yellow' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}>
                {verdictText}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Total Purchase Price</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(portfolioMetrics.totalPurchasePrice)}
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Total Down Payment</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(portfolioMetrics.totalDownPayment)}
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Total Rehab Cost</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(portfolioMetrics.totalRehabCost)}
                </p>
              </div>

              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                <p className="text-sm text-blue-400 mb-1">Total Cash Invested</p>
                <p className="text-xl font-bold text-blue-300">
                  {formatCurrency(totalCashInvested)}
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Total Monthly Rental Income</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrencyDecimal(portfolioMetrics.totalMonthlyIncome)}
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Total Monthly Expenses</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrencyDecimal(portfolioMetrics.totalMonthlyExpenses)}
                </p>
              </div>

              <div className={`rounded-lg p-4 ${
                portfolioMetrics.totalMonthlyCashFlow >= 0
                  ? 'bg-green-900/30 border border-green-700'
                  : 'bg-red-900/30 border border-red-700'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {portfolioMetrics.totalMonthlyCashFlow >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <p className={`text-sm ${
                    portfolioMetrics.totalMonthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    Total Monthly Cash Flow
                  </p>
                </div>
                <p className={`text-xl font-bold ${
                  portfolioMetrics.totalMonthlyCashFlow >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {formatCurrencyDecimal(portfolioMetrics.totalMonthlyCashFlow)}
                </p>
              </div>

              <div className={`rounded-lg p-4 ${
                totalAnnualCashFlow >= 0
                  ? 'bg-green-900/30 border border-green-700'
                  : 'bg-red-900/30 border border-red-700'
              }`}>
                <p className={`text-sm mb-1 ${
                  totalAnnualCashFlow >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  Total Annual Cash Flow
                </p>
                <p className={`text-xl font-bold ${
                  totalAnnualCashFlow >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {formatCurrency(totalAnnualCashFlow)}
                </p>
              </div>

              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                <p className="text-sm text-blue-400 mb-1">Portfolio Cap Rate</p>
                <p className="text-xl font-bold text-blue-300">
                  {formatPercent(portfolioCapRate)}
                </p>
              </div>

              <div className={`rounded-lg p-4 border ${
                verdictColor === 'green' ? 'bg-green-900/30 border-green-700' :
                verdictColor === 'yellow' ? 'bg-yellow-900/30 border-yellow-700' :
                'bg-red-900/30 border-red-700'
              }`}>
                <p className={`text-sm mb-1 ${
                  verdictColor === 'green' ? 'text-green-400' :
                  verdictColor === 'yellow' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  Portfolio Cash-on-Cash Return
                </p>
                <p className={`text-xl font-bold ${
                  verdictColor === 'green' ? 'text-green-300' :
                  verdictColor === 'yellow' ? 'text-yellow-300' :
                  'text-red-300'
                }`}>
                  {formatPercent(portfolioCashOnCash)}
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Average Per-Property Cash Flow</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrencyDecimal(averagePropertyCashFlow)}
                </p>
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
