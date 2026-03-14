import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hop as Home, Plus, Trash2, TrendingUp, FileDown, Send } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { generateProFormaPDF } from '../utils/pdfGenerator'

type Condition = 'Poor' | 'Fair' | 'Average' | 'Good' | 'Excellent'
type RehabScope = 'None' | 'Cosmetic' | 'Moderate' | 'Full Gut'

interface SubjectProperty {
  address: string
  squareFootage: string
  bedrooms: string
  bathrooms: string
  lotSize: string
  condition: Condition
  rehabScope: RehabScope
}

interface ComparableProperty {
  id: string
  address: string
  salePrice: string
  squareFootage: string
  bedrooms: string
  bathrooms: string
  lotSize: string
  condition: Condition
  saleDate: string
  distance: string
}

interface CompAdjustments {
  bedroomAdj: number
  bathroomAdj: number
  sqftAdj: number
  conditionAdj: number
  saleDateAdj: number
  totalAdjustment: number
  adjustedValue: number
}

const conditionValues: Record<Condition, number> = {
  'Poor': -0.15,
  'Fair': -0.07,
  'Average': 0,
  'Good': 0.05,
  'Excellent': 0.10
}

export function ARVCompsAnalyzer() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [showCalculatorMenu, setShowCalculatorMenu] = useState(false)

  const [subjectProperty, setSubjectProperty] = useState<SubjectProperty>({
    address: '',
    squareFootage: '',
    bedrooms: '',
    bathrooms: '',
    lotSize: '',
    condition: 'Average',
    rehabScope: 'Cosmetic'
  })

  const [comparables, setComparables] = useState<ComparableProperty[]>([
    {
      id: '1',
      address: '',
      salePrice: '',
      squareFootage: '',
      bedrooms: '',
      bathrooms: '',
      lotSize: '',
      condition: 'Average',
      saleDate: '',
      distance: ''
    },
    {
      id: '2',
      address: '',
      salePrice: '',
      squareFootage: '',
      bedrooms: '',
      bathrooms: '',
      lotSize: '',
      condition: 'Average',
      saleDate: '',
      distance: ''
    },
    {
      id: '3',
      address: '',
      salePrice: '',
      squareFootage: '',
      bedrooms: '',
      bathrooms: '',
      lotSize: '',
      condition: 'Average',
      saleDate: '',
      distance: ''
    }
  ])

  const addComparable = () => {
    if (comparables.length >= 6) {
      showToast('Maximum 6 comparables allowed', 'error')
      return
    }
    setComparables([
      ...comparables,
      {
        id: Date.now().toString(),
        address: '',
        salePrice: '',
        squareFootage: '',
        bedrooms: '',
        bathrooms: '',
        lotSize: '',
        condition: 'Average',
        saleDate: '',
        distance: ''
      }
    ])
  }

  const removeComparable = (id: string) => {
    if (comparables.length <= 3) {
      showToast('Minimum 3 comparables required', 'error')
      return
    }
    setComparables(comparables.filter(c => c.id !== id))
  }

  const updateComparable = (id: string, field: keyof ComparableProperty, value: string) => {
    setComparables(comparables.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const calculateAdjustments = (comp: ComparableProperty): CompAdjustments | null => {
    const compPrice = parseFloat(comp.salePrice)
    const compSqft = parseFloat(comp.squareFootage)
    const compBeds = parseFloat(comp.bedrooms)
    const compBaths = parseFloat(comp.bathrooms)
    const subjectSqft = parseFloat(subjectProperty.squareFootage)
    const subjectBeds = parseFloat(subjectProperty.bedrooms)
    const subjectBaths = parseFloat(subjectProperty.bathrooms)
    const distance = parseFloat(comp.distance)

    if (isNaN(compPrice) || isNaN(compSqft) || isNaN(compBeds) || isNaN(compBaths) ||
        isNaN(subjectSqft) || isNaN(subjectBeds) || isNaN(subjectBaths) || isNaN(distance)) {
      return null
    }

    const pricePerSqft = compPrice / compSqft

    const bedroomAdj = (subjectBeds - compBeds) * 5000
    const bathroomAdj = (subjectBaths - compBaths) * 3000
    const sqftAdj = pricePerSqft * (subjectSqft - compSqft)

    const subjectConditionValue = conditionValues[subjectProperty.condition]
    const compConditionValue = conditionValues[comp.condition]
    const conditionAdjPercent = subjectConditionValue - compConditionValue
    const conditionAdj = compPrice * conditionAdjPercent

    let saleDateAdj = 0
    if (comp.saleDate) {
      const saleDate = new Date(comp.saleDate)
      const today = new Date()
      const monthsAgo = (today.getFullYear() - saleDate.getFullYear()) * 12 +
                        (today.getMonth() - saleDate.getMonth())

      if (monthsAgo > 3) {
        const staleness = Math.min(monthsAgo - 3, 6)
        saleDateAdj = -compPrice * (staleness * 0.01)
      }
    }

    const totalAdjustment = bedroomAdj + bathroomAdj + sqftAdj + conditionAdj + saleDateAdj
    const adjustedValue = compPrice + totalAdjustment

    return {
      bedroomAdj,
      bathroomAdj,
      sqftAdj,
      conditionAdj,
      saleDateAdj,
      totalAdjustment,
      adjustedValue
    }
  }

  const calculateARV = () => {
    const validComps = comparables.filter(c => {
      const adj = calculateAdjustments(c)
      return adj !== null
    })

    if (validComps.length === 0) return null

    let totalWeightedValue = 0
    let totalWeight = 0

    validComps.forEach(comp => {
      const adj = calculateAdjustments(comp)
      if (adj) {
        const distance = parseFloat(comp.distance)
        const weight = 1 / (distance || 1)
        totalWeightedValue += adj.adjustedValue * weight
        totalWeight += weight
      }
    })

    const estimatedARV = totalWeightedValue / totalWeight

    const adjustedValues = validComps.map(c => calculateAdjustments(c)!.adjustedValue)
    const minARV = Math.min(...adjustedValues)
    const maxARV = Math.max(...adjustedValues)

    const avgDistance = validComps.reduce((sum, c) => sum + parseFloat(c.distance), 0) / validComps.length
    let confidence: 'High' | 'Medium' | 'Low' = 'Low'
    if (validComps.length >= 5 && avgDistance <= 1) {
      confidence = 'High'
    } else if (validComps.length >= 3 && avgDistance <= 3) {
      confidence = 'Medium'
    }

    const avgPricePerSqft = validComps.reduce((sum, c) => {
      const price = parseFloat(c.salePrice)
      const sqft = parseFloat(c.squareFootage)
      return sum + (price / sqft)
    }, 0) / validComps.length

    return {
      estimatedARV,
      minARV,
      maxARV,
      confidence,
      avgPricePerSqft,
      validCompsCount: validComps.length
    }
  }

  const arvResults = calculateARV()

  const sendToCalculator = (calculator: string) => {
    if (!arvResults) return

    const arv = Math.round(arvResults.estimatedARV).toString()

    switch (calculator) {
      case 'brrr':
        navigate(`/tools/brrr?arv=${arv}`)
        break
      case 'flip':
        navigate(`/tools/flip?arv=${arv}`)
        break
      case 'deal_analyzer':
        navigate(`/tools/deal_analyzer?arv=${arv}`)
        break
    }
    setShowCalculatorMenu(false)
  }

  const downloadPDF = () => {
    if (!arvResults) return

    const inputs = {
      'Address': subjectProperty.address,
      'Square Footage': subjectProperty.squareFootage,
      'Bedrooms': subjectProperty.bedrooms,
      'Bathrooms': subjectProperty.bathrooms,
      'Lot Size': `${subjectProperty.lotSize} sqft`,
      'Condition': subjectProperty.condition,
      'Rehab Scope': subjectProperty.rehabScope
    }

    const outputs = {
      'Estimated ARV': `$${arvResults.estimatedARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      'ARV Range': `$${arvResults.minARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} - $${arvResults.maxARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      'Average Price/Sqft': `$${arvResults.avgPricePerSqft.toFixed(2)}`,
      'Comparables Used': arvResults.validCompsCount.toString(),
      'Confidence Level': arvResults.confidence
    }

    generateProFormaPDF({
      toolName: 'ARV & Comps Analyzer',
      inputs,
      outputs
    })
    showToast('PDF downloaded successfully', 'success')
  }

  const currentInputs = {
    'Subject Address': subjectProperty.address,
    'Square Footage': subjectProperty.squareFootage,
    'Comparables': comparables.length.toString()
  }

  const currentOutputs = arvResults ? {
    'Estimated ARV': `$${arvResults.estimatedARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    'Confidence': arvResults.confidence
  } : {}

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ARV & Comps Analyzer</h1>
          <p className="text-gray-400">
            Analyze comparable sales to estimate After Repair Value (ARV)
          </p>
        </div>

        {user && (
          <ScenarioPanel
            toolSlug="arv_comps"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={() => {}}
          />
        )}

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Home className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold">Subject Property</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={subjectProperty.address}
                    onChange={(e) => setSubjectProperty({ ...subjectProperty, address: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="123 Main St, City, State"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Square Footage
                    </label>
                    <input
                      type="number"
                      value={subjectProperty.squareFootage}
                      onChange={(e) => setSubjectProperty({ ...subjectProperty, squareFootage: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={subjectProperty.bedrooms}
                      onChange={(e) => setSubjectProperty({ ...subjectProperty, bedrooms: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={subjectProperty.bathrooms}
                      onChange={(e) => setSubjectProperty({ ...subjectProperty, bathrooms: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Lot Size (sqft)
                    </label>
                    <input
                      type="number"
                      value={subjectProperty.lotSize}
                      onChange={(e) => setSubjectProperty({ ...subjectProperty, lotSize: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Condition
                    </label>
                    <select
                      value={subjectProperty.condition}
                      onChange={(e) => setSubjectProperty({ ...subjectProperty, condition: e.target.value as Condition })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Poor">Poor</option>
                      <option value="Fair">Fair</option>
                      <option value="Average">Average</option>
                      <option value="Good">Good</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Rehab Scope
                    </label>
                    <select
                      value={subjectProperty.rehabScope}
                      onChange={(e) => setSubjectProperty({ ...subjectProperty, rehabScope: e.target.value as RehabScope })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="None">None</option>
                      <option value="Cosmetic">Cosmetic</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Full Gut">Full Gut</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Comparable Properties</h2>
                <button
                  onClick={addComparable}
                  disabled={comparables.length >= 6}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Comp
                </button>
              </div>

              <div className="space-y-6">
                {comparables.map((comp, index) => (
                  <div key={comp.id} className="border border-gray-700 rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-blue-400">Comp #{index + 1}</h3>
                      {comparables.length > 3 && (
                        <button
                          onClick={() => removeComparable(comp.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          value={comp.address}
                          onChange={(e) => updateComparable(comp.id, 'address', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="456 Oak St, City, State"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Sale Price
                          </label>
                          <input
                            type="number"
                            value={comp.salePrice}
                            onChange={(e) => updateComparable(comp.id, 'salePrice', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="250000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Square Footage
                          </label>
                          <input
                            type="number"
                            value={comp.squareFootage}
                            onChange={(e) => updateComparable(comp.id, 'squareFootage', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="1800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Bedrooms
                          </label>
                          <input
                            type="number"
                            value={comp.bedrooms}
                            onChange={(e) => updateComparable(comp.id, 'bedrooms', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Bathrooms
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={comp.bathrooms}
                            onChange={(e) => updateComparable(comp.id, 'bathrooms', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Lot Size
                          </label>
                          <input
                            type="number"
                            value={comp.lotSize}
                            onChange={(e) => updateComparable(comp.id, 'lotSize', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="4500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Condition
                          </label>
                          <select
                            value={comp.condition}
                            onChange={(e) => updateComparable(comp.id, 'condition', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Poor">Poor</option>
                            <option value="Fair">Fair</option>
                            <option value="Average">Average</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Sale Date
                          </label>
                          <input
                            type="date"
                            value={comp.saleDate}
                            onChange={(e) => updateComparable(comp.id, 'saleDate', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Distance (miles)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={comp.distance}
                            onChange={(e) => updateComparable(comp.id, 'distance', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Analysis Results</h2>
                {arvResults && (
                  <button
                    onClick={downloadPDF}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Download PDF"
                  >
                    <FileDown className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!arvResults ? (
                <div className="text-center py-12 text-gray-400">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter property details and comparables to see ARV estimate</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-center">
                    <p className="text-sm text-blue-200 mb-2">Estimated ARV</p>
                    <p className="text-4xl font-bold mb-2">
                      ${arvResults.estimatedARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        arvResults.confidence === 'High' ? 'bg-green-500/20 text-green-300' :
                        arvResults.confidence === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {arvResults.confidence} Confidence
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">ARV Range</span>
                      <span className="font-semibold">
                        ${arvResults.minARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} -
                        ${arvResults.maxARV.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">Avg Price/Sqft</span>
                      <span className="font-semibold">${arvResults.avgPricePerSqft.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">Comps Used</span>
                      <span className="font-semibold">{arvResults.validCompsCount}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="font-semibold mb-3">Comp Adjustments</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {comparables.map((comp, index) => {
                        const adj = calculateAdjustments(comp)
                        if (!adj) return null

                        return (
                          <div key={comp.id} className="bg-gray-700/50 rounded p-3 text-sm">
                            <div className="font-semibold text-blue-400 mb-2">Comp #{index + 1}</div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Sale Price:</span>
                                <span>${parseFloat(comp.salePrice).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Bedroom Adj:</span>
                                <span className={adj.bedroomAdj >= 0 ? 'text-green-400' : 'text-red-400'}>
                                  {adj.bedroomAdj >= 0 ? '+' : ''}${adj.bedroomAdj.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Bathroom Adj:</span>
                                <span className={adj.bathroomAdj >= 0 ? 'text-green-400' : 'text-red-400'}>
                                  {adj.bathroomAdj >= 0 ? '+' : ''}${adj.bathroomAdj.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Sqft Adj:</span>
                                <span className={adj.sqftAdj >= 0 ? 'text-green-400' : 'text-red-400'}>
                                  {adj.sqftAdj >= 0 ? '+' : ''}${adj.sqftAdj.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Condition Adj:</span>
                                <span className={adj.conditionAdj >= 0 ? 'text-green-400' : 'text-red-400'}>
                                  {adj.conditionAdj >= 0 ? '+' : ''}${adj.conditionAdj.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                              </div>
                              {adj.saleDateAdj !== 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Date Adj:</span>
                                  <span className="text-red-400">
                                    ${adj.saleDateAdj.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                  </span>
                                </div>
                              )}
                              <div className="flex justify-between pt-2 border-t border-gray-600 font-semibold">
                                <span>Adjusted Value:</span>
                                <span>${adj.adjustedValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setShowCalculatorMenu(!showCalculatorMenu)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold"
                    >
                      <Send className="w-4 h-4" />
                      Use This ARV
                    </button>

                    {showCalculatorMenu && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-10">
                        <div className="p-2">
                          <button
                            onClick={() => sendToCalculator('brrr')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            BRRR Calculator
                          </button>
                          <button
                            onClick={() => sendToCalculator('flip')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            Flip Calculator
                          </button>
                          <button
                            onClick={() => sendToCalculator('deal_analyzer')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            Deal Analyzer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
