import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, Percent, Calendar, FileDown, TriangleAlert as AlertTriangle } from 'lucide-react'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { Tooltip } from '../components/Tooltip'
import { generateProFormaPDF } from '../utils/pdfGenerator'
import DisclaimerBanner from '../components/DisclaimerBanner'

function calcMonthlyPI(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0
  const r = annualRate / 100 / 12
  const n = termYears * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function getRemainingBalance(
  principal: number,
  annualRate: number,
  amortYears: number,
  afterMonths: number
): number {
  if (principal <= 0) return 0
  const r = annualRate / 100 / 12
  const n = amortYears * 12
  if (r === 0) return principal - (principal / n) * afterMonths
  const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return principal * Math.pow(1 + r, afterMonths) - payment * ((Math.pow(1 + r, afterMonths) - 1) / r)
}

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v)

const fmt2 = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)

export function OwnerFinanceCalculator() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [purchasePrice, setPurchasePrice] = useState(250000)
  const [downPayment, setDownPayment] = useState(25000)
  const [interestRate, setInterestRate] = useState(7)
  const [loanTerm, setLoanTerm] = useState(5)
  const [balloonEnabled, setBalloonEnabled] = useState(true)
  const [balloonYears, setBalloonYears] = useState(5)
  const [monthlyTax, setMonthlyTax] = useState(250)
  const [monthlyInsurance, setMonthlyInsurance] = useState(100)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  const loanAmount = Math.max(0, purchasePrice - downPayment)

  const results = useMemo(() => {
    const amortYears = 30
    const monthlyPI = calcMonthlyPI(loanAmount, interestRate, amortYears)
    const monthlyPITI = monthlyPI + monthlyTax + monthlyInsurance

    const balloonMonths = balloonEnabled ? balloonYears * 12 : loanTerm * 12
    const totalMonthlyPayments = monthlyPI * balloonMonths
    const balloonBalance = balloonEnabled
      ? getRemainingBalance(loanAmount, interestRate, amortYears, balloonMonths)
      : 0

    const totalInterestUntilBalloon = totalMonthlyPayments - (loanAmount - balloonBalance)
    const totalCostIfHeldToBalloon = downPayment + totalMonthlyPayments + (balloonEnabled ? balloonBalance : 0)

    const convPaymentPI = calcMonthlyPI(loanAmount, interestRate, 30)
    const monthlyDiff = convPaymentPI - monthlyPI

    return {
      monthlyPI,
      monthlyPITI,
      totalMonthlyPayments,
      balloonBalance,
      totalInterestUntilBalloon,
      totalCostIfHeldToBalloon,
      convPaymentPI,
      monthlyDiff,
      balloonMonths,
    }
  }, [loanAmount, interestRate, loanTerm, balloonEnabled, balloonYears, monthlyTax, monthlyInsurance, downPayment])

  const currentInputs = {
    purchasePrice,
    downPayment,
    interestRate,
    loanTerm,
    balloonEnabled,
    balloonYears,
    monthlyTax,
    monthlyInsurance,
  }

  const currentOutputs = {
    loanAmount,
    monthlyPI: results.monthlyPI,
    monthlyPITI: results.monthlyPITI,
    balloonBalance: results.balloonBalance,
    totalInterest: results.totalInterestUntilBalloon,
    totalCost: results.totalCostIfHeldToBalloon,
  }

  const handleLoadScenario = (inputs: Record<string, any>) => {
    if (inputs.purchasePrice !== undefined) setPurchasePrice(inputs.purchasePrice)
    if (inputs.downPayment !== undefined) setDownPayment(inputs.downPayment)
    if (inputs.interestRate !== undefined) setInterestRate(inputs.interestRate)
    if (inputs.loanTerm !== undefined) setLoanTerm(inputs.loanTerm)
    if (inputs.balloonEnabled !== undefined) setBalloonEnabled(inputs.balloonEnabled)
    if (inputs.balloonYears !== undefined) setBalloonYears(inputs.balloonYears)
    if (inputs.monthlyTax !== undefined) setMonthlyTax(inputs.monthlyTax)
    if (inputs.monthlyInsurance !== undefined) setMonthlyInsurance(inputs.monthlyInsurance)
  }

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'premium' || profile?.subscription_status === 'active'
    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    generateProFormaPDF({
      toolName: 'Owner Finance Calculator',
      inputs: {
        'Purchase Price': fmt(purchasePrice),
        'Down Payment': fmt(downPayment),
        'Interest Rate': `${interestRate}%`,
        'Amortization': '30 years',
        'Balloon Enabled': balloonEnabled ? 'Yes' : 'No',
        ...(balloonEnabled ? { 'Balloon Due': `Year ${balloonYears}` } : {}),
        'Monthly Property Tax': fmt2(monthlyTax),
        'Monthly Insurance': fmt2(monthlyInsurance),
      },
      outputs: {
        'Loan Amount': fmt(loanAmount),
        'Monthly P&I': fmt2(results.monthlyPI),
        'Monthly PITI': fmt2(results.monthlyPITI),
        ...(balloonEnabled ? {
          'Total Payments Until Balloon': fmt(results.totalMonthlyPayments),
          'Balloon Payoff Amount': fmt(results.balloonBalance),
          'Total Interest Until Balloon': fmt(results.totalInterestUntilBalloon),
          'Total Cost to Balloon': fmt(results.totalCostIfHeldToBalloon),
        } : {}),
        'Conventional 30-yr P&I (same rate)': fmt2(results.convPaymentPI),
        'Monthly Payment Difference': `${results.monthlyDiff >= 0 ? '+' : ''}${fmt2(results.monthlyDiff)} vs conventional`,
      },
    })
  }

  const downPct = purchasePrice > 0 ? ((downPayment / purchasePrice) * 100).toFixed(1) : '0.0'

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Owner Finance Calculator</h1>
              <p className="text-gray-400">Model seller-financed deals with balloon payments and compare to conventional financing</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg whitespace-nowrap"
            >
              <FileDown className="h-5 w-5" />
              Download Pro Forma PDF
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ScenarioPanel
            toolSlug="owner_finance"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={handleLoadScenario}
          />
        </div>

        {balloonEnabled && loanAmount > 0 && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/40 rounded-xl">
            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-300 text-sm leading-relaxed">
              <strong>Balloon Payment Warning:</strong> This loan has a balloon payment of{' '}
              <strong>{fmt(results.balloonBalance)}</strong> due in{' '}
              <strong>{balloonYears} year{balloonYears !== 1 ? 's' : ''}</strong>. You will need to
              refinance or pay the remaining balance in full by that date.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Loan Details</h2>
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Purchase Price</label>
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
                  Down Payment{' '}
                  <span className="text-gray-500 font-normal">(can be $0)</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{downPct}% of purchase price</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Interest Rate
                  <Tooltip
                    term="Owner Finance Rate"
                    definition="Seller-financed rates are typically higher than conventional mortgages (often 6–10%) since the seller acts as the lender and takes on risk."
                  />
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Loan Term (Years)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 7, 10].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setLoanTerm(t)
                        if (balloonEnabled) setBalloonYears(t)
                      }}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        loanTerm === t
                          ? 'bg-blue-600 text-white border-2 border-blue-400'
                          : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      {t} yr
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Payments amortized over 30 years regardless of term</p>
              </div>

              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="text-sm font-medium text-white">Balloon Payment</label>
                    <p className="text-xs text-gray-500 mt-0.5">Full balance due at end of term</p>
                  </div>
                  <button
                    onClick={() => setBalloonEnabled(!balloonEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      balloonEnabled ? 'bg-yellow-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        balloonEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {balloonEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Balloon Due (Years)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={balloonYears}
                        onChange={(e) => setBalloonYears(Math.min(30, Math.max(1, Number(e.target.value) || 1)))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-yellow-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Taxes &amp; Insurance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Monthly Property Tax</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={monthlyTax}
                        onChange={(e) => setMonthlyTax(Number(e.target.value) || 0)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Monthly Insurance</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={monthlyInsurance}
                        onChange={(e) => setMonthlyInsurance(Number(e.target.value) || 0)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 border border-blue-400 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-6 h-6 text-blue-200" />
                <h3 className="text-base font-medium text-blue-200 inline-flex items-center">
                  Monthly Payment (PITI)
                  <Tooltip
                    term="PITI"
                    definition="Principal, Interest, Taxes, and Insurance — the four components of the full monthly payment obligation."
                  />
                </h3>
              </div>
              <p className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                {fmt2(results.monthlyPITI)}
              </p>
              <p className="text-blue-200 text-sm">Principal, Interest, Taxes, Insurance</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Loan Amount</span>
                  <span className="text-white font-semibold">{fmt(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Monthly P&amp;I</span>
                  <span className="text-white font-semibold">{fmt2(results.monthlyPI)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Monthly Tax</span>
                  <span className="text-white font-semibold">{fmt2(monthlyTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Monthly Insurance</span>
                  <span className="text-white font-semibold">{fmt2(monthlyInsurance)}</span>
                </div>
              </div>
            </div>

            {balloonEnabled && loanAmount > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Balloon Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-yellow-700/30">
                    <span className="text-gray-400">Total P&amp;I Payments</span>
                    <span className="text-white font-semibold">{fmt(results.totalMonthlyPayments)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-yellow-700/30">
                    <span className="text-gray-400">Total Interest Paid</span>
                    <span className="text-white font-semibold">{fmt(results.totalInterestUntilBalloon)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-yellow-500/50">
                    <span className="text-yellow-300 font-medium">Balloon Payoff Amount</span>
                    <span className="text-yellow-300 font-bold text-lg">{fmt(results.balloonBalance)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Total Cost to Balloon</span>
                    <span className="text-white font-bold">{fmt(results.totalCostIfHeldToBalloon)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Total cost = down payment + all P&I payments + balloon payoff
                </p>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-1">vs. Traditional 30-Year Mortgage</h3>
              <p className="text-xs text-gray-500 mb-4">Same rate ({interestRate}%), same loan amount</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Conventional Monthly P&amp;I</span>
                  <span className="text-white font-semibold">{fmt2(results.convPaymentPI)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Owner Finance Monthly P&amp;I</span>
                  <span className="text-white font-semibold">{fmt2(results.monthlyPI)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Monthly Difference</span>
                  <span className={`font-bold text-lg ${results.monthlyDiff > 0 ? 'text-green-400' : results.monthlyDiff < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                    {results.monthlyDiff > 0 ? '+' : ''}{fmt2(results.monthlyDiff)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                {results.monthlyDiff > 0
                  ? 'Owner finance saves money monthly because payments are amortized the same — the difference here reflects identical amortization. The key difference is the balloon payoff obligation.'
                  : results.monthlyDiff === 0
                  ? 'Same monthly payment — both are amortized over 30 years at the same rate.'
                  : 'Monthly payment is higher than conventional — review your rate inputs.'}
              </p>
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
