import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, Percent, Calendar, FileDown } from 'lucide-react'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { generateProFormaPDF } from '../utils/pdfGenerator'

export function MortgageCalculator() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [homePrice, setHomePrice] = useState(300000)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2)
  const [annualInsurance, setAnnualInsurance] = useState(1200)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const clampedDownPayment = Math.min(Math.max(0, downPayment), homePrice)
  const loanAmount = homePrice - clampedDownPayment

  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0) return 0

    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    if (monthlyRate === 0) {
      return loanAmount / numberOfPayments
    }

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment
  }

  const principalAndInterest = calculateMonthlyPayment()
  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12
  const monthlyInsurance = annualInsurance / 12
  const monthlyPITI = principalAndInterest + monthlyPropertyTax + monthlyInsurance
  const totalPaid = monthlyPITI * loanTerm * 12 + clampedDownPayment

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

  const handleLoadScenario = (inputs: Record<string, any>) => {
    if (inputs.homePrice !== undefined) setHomePrice(inputs.homePrice)
    if (inputs.downPayment !== undefined) setDownPayment(inputs.downPayment)
    if (inputs.interestRate !== undefined) setInterestRate(inputs.interestRate)
    if (inputs.loanTerm !== undefined) setLoanTerm(inputs.loanTerm)
    if (inputs.propertyTaxRate !== undefined) setPropertyTaxRate(inputs.propertyTaxRate)
    if (inputs.annualInsurance !== undefined) setAnnualInsurance(inputs.annualInsurance)
  }

  const currentInputs = {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    annualInsurance,
  }

  const currentOutputs = {
    monthlyPITI,
    totalPaid,
    loanAmount,
    principalAndInterest,
    monthlyPropertyTax,
    monthlyInsurance,
  }

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    generateProFormaPDF({
      toolName: 'Mortgage Calculator',
      inputs: {
        'Home Price': formatCurrency(homePrice),
        'Down Payment': formatCurrency(downPayment),
        'Interest Rate': `${interestRate}%`,
        'Loan Term': `${loanTerm} years`,
        'Property Tax Rate': `${propertyTaxRate}%`,
        'Annual Insurance': formatCurrency(annualInsurance),
      },
      outputs: {
        'Monthly Payment (PITI)': formatCurrencyDecimal(monthlyPITI),
        'Principal & Interest': formatCurrencyDecimal(principalAndInterest),
        'Property Tax (Monthly)': formatCurrencyDecimal(monthlyPropertyTax),
        'Insurance (Monthly)': formatCurrencyDecimal(monthlyInsurance),
        'Loan Amount': formatCurrency(loanAmount),
        'Down Payment': formatCurrency(clampedDownPayment),
        'Total Paid Over Loan Term': formatCurrency(totalPaid),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Mortgage Calculator</h1>
              <p className="text-gray-400">Calculate your monthly mortgage payment and total costs</p>
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
            toolSlug="mortgage_calculator"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={handleLoadScenario}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Loan Details</h2>
            <div className="lg:hidden border-b border-gray-700 my-6"></div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((clampedDownPayment / homePrice) * 100 || 0).toFixed(1)}% of home price
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Interest Rate
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Loan Term
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 20, 25, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        loanTerm === term
                          ? 'bg-indigo-600 text-white border-2 border-indigo-400'
                          : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      {term} yr
                    </button>
                  ))}
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 border border-blue-400 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-6 h-6 text-blue-200" />
                <h3 className="text-base font-medium text-blue-200">Monthly Payment (PITI)</h3>
              </div>
              <p className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                {formatCurrencyDecimal(monthlyPITI)}
              </p>
              <p className="text-blue-200 text-sm">Principal, Interest, Taxes, Insurance</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Principal & Interest</span>
                  <span className="text-white font-semibold">
                    {formatCurrencyDecimal(principalAndInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Property Tax</span>
                  <span className="text-white font-semibold">
                    {formatCurrencyDecimal(monthlyPropertyTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Insurance</span>
                  <span className="text-white font-semibold">
                    {formatCurrencyDecimal(monthlyInsurance)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Loan Amount</span>
                  <span className="text-white font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Down Payment</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(clampedDownPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t-2 border-gray-600 mt-2">
                  <span className="text-gray-300 font-medium">Total Paid Over {loanTerm} Years</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(totalPaid)}</span>
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
