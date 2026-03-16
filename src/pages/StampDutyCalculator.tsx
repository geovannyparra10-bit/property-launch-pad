import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { DollarSign, FileText, Hop as Home, Percent, FileDown } from 'lucide-react'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import { generateProFormaPDF } from '../utils/pdfGenerator'
import DisclaimerBanner from '../components/DisclaimerBanner'

type PropertyType = 'primary' | 'investment' | 'second_home'

export function StampDutyCalculator() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [propertyPrice, setPropertyPrice] = useState(350000)
  const [stateRegion, setStateRegion] = useState('California')
  const [propertyType, setPropertyType] = useState<PropertyType>('primary')
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const calculateStampDuty = () => {
    let duty = 0
    let breakdown: Array<{ bracket: string; amount: number }> = []

    if (propertyPrice <= 200000) {
      const amount = propertyPrice * 0.01
      duty += amount
      breakdown.push({ bracket: 'Up to $200k (1%)', amount })
    } else if (propertyPrice <= 500000) {
      const tier1 = 200000 * 0.01
      const tier2 = (propertyPrice - 200000) * 0.02
      duty = tier1 + tier2
      breakdown.push({ bracket: 'Up to $200k (1%)', amount: tier1 })
      breakdown.push({ bracket: '$200k - $500k (2%)', amount: tier2 })
    } else {
      const tier1 = 200000 * 0.01
      const tier2 = 300000 * 0.02
      const tier3 = (propertyPrice - 500000) * 0.03
      duty = tier1 + tier2 + tier3
      breakdown.push({ bracket: 'Up to $200k (1%)', amount: tier1 })
      breakdown.push({ bracket: '$200k - $500k (2%)', amount: tier2 })
      breakdown.push({ bracket: 'Above $500k (3%)', amount: tier3 })
    }

    let adjustments: Array<{ description: string; amount: number }> = []

    if (isFirstTimeBuyer) {
      const discount = duty * 0.5
      adjustments.push({ description: 'First-time buyer discount (50%)', amount: -discount })
      duty -= discount
    }

    if (propertyType === 'investment') {
      const surcharge = propertyPrice * 0.01
      adjustments.push({ description: 'Investment property surcharge (1%)', amount: surcharge })
      duty += surcharge
    }

    const effectiveRate = propertyPrice > 0 ? (duty / propertyPrice) * 100 : 0

    return { duty, effectiveRate, breakdown, adjustments }
  }

  const { duty, effectiveRate, breakdown, adjustments } = calculateStampDuty()

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
    if (inputs.stateRegion !== undefined) setStateRegion(inputs.stateRegion)
    if (inputs.propertyType !== undefined) setPropertyType(inputs.propertyType)
    if (inputs.isFirstTimeBuyer !== undefined) setIsFirstTimeBuyer(inputs.isFirstTimeBuyer)
  }

  const currentInputs = {
    propertyPrice,
    stateRegion,
    propertyType,
    isFirstTimeBuyer,
  }

  const currentOutputs = {
    duty,
    effectiveRate,
  }

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'premium' || profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    generateProFormaPDF({
      toolName: 'Stamp Duty Calculator',
      inputs: {
        'Property Price': formatCurrency(propertyPrice),
        'State/Region': stateRegion,
        'Property Type': propertyType === 'primary' ? 'Primary Residence' : propertyType === 'investment' ? 'Investment Property' : 'Second Home',
        'First-Time Buyer': isFirstTimeBuyer ? 'Yes' : 'No',
      },
      outputs: {
        'Total Stamp Duty': formatCurrencyDecimal(duty),
        'Effective Rate': formatPercent(effectiveRate),
        'Property Price': formatCurrency(propertyPrice),
        'Total Purchase Cost': formatCurrency(propertyPrice + duty),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Stamp Duty Calculator</h1>
              <p className="text-gray-400">Calculate property transfer taxes and stamp duty costs</p>
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
            toolSlug="stamp_duty"
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
                  State/Region
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={stateRegion}
                    onChange={(e) => setStateRegion(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="Texas">Texas</option>
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                    <option value="Florida">Florida</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Property Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPropertyType('primary')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all text-center ${
                      propertyType === 'primary'
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    Primary
                  </button>
                  <button
                    onClick={() => setPropertyType('investment')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all text-center ${
                      propertyType === 'investment'
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    Investment
                  </button>
                  <button
                    onClick={() => setPropertyType('second_home')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all text-center ${
                      propertyType === 'second_home'
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    2nd Home
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-650 transition-colors">
                  <input
                    type="checkbox"
                    checked={isFirstTimeBuyer}
                    onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-500 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-700"
                  />
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">First-Time Buyer</span>
                  </div>
                </label>
                {isFirstTimeBuyer && (
                  <p className="text-xs text-green-400 mt-2 ml-1">
                    You qualify for a 50% discount on stamp duty
                  </p>
                )}
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h3 className="text-sm font-semibold text-white mb-2">Rate Structure</h3>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Up to $200,000:</span>
                    <span className="text-gray-400">1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$200,000 - $500,000:</span>
                    <span className="text-gray-400">2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Above $500,000:</span>
                    <span className="text-gray-400">3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 border border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-200" />
                <h3 className="text-sm font-medium text-blue-200">Total Stamp Duty</h3>
              </div>
              <p className="text-4xl font-bold text-white mb-1">
                {formatCurrencyDecimal(duty)}
              </p>
              <p className="text-blue-200 text-sm">Effective rate: {formatPercent(effectiveRate)}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-bold text-white">Breakdown by Bracket</h3>
              </div>
              <div className="space-y-3">
                {breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">{item.bracket}</span>
                    <span className="text-white font-semibold">
                      {formatCurrencyDecimal(item.amount)}
                    </span>
                  </div>
                ))}
                {breakdown.length === 0 && (
                  <p className="text-gray-500 text-sm">No duty calculated</p>
                )}
              </div>
            </div>

            {adjustments.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Adjustments</h3>
                <div className="space-y-3">
                  {adjustments.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400 text-sm">{item.description}</span>
                      <span className={`font-semibold ${
                        item.amount < 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.amount < 0 ? '' : '+'}{formatCurrencyDecimal(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Purchase Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Property Price</span>
                  <span className="text-white font-semibold">{formatCurrency(propertyPrice)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400">Stamp Duty</span>
                  <span className="text-white font-semibold">{formatCurrency(duty)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t-2 border-gray-600 mt-2">
                  <span className="text-gray-300 font-medium">Total Cost</span>
                  <span className="text-white font-bold text-lg">
                    {formatCurrency(propertyPrice + duty)}
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
