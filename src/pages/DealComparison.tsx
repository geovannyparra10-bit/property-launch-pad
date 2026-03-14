import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ChevronDown, Trophy, TrendingUp } from 'lucide-react'
import { LoadingSpinner } from '../components/LoadingSpinner'

interface Scenario {
  id: string
  scenario_name: string
  inputs: Record<string, any>
  outputs: Record<string, any>
  created_at: string
}

const TOOL_OPTIONS = [
  { slug: 'mortgage_calculator', label: 'Mortgage Calculator' },
  { slug: 'rental_yield', label: 'Rental Yield Calculator' },
  { slug: 'house_hack', label: 'House Hack Calculator' },
  { slug: 'brrr', label: 'BRRR Calculator' },
  { slug: 'flip', label: 'Flip Calculator' },
  { slug: 'deal_analyzer', label: 'Deal Analyzer' },
]

export function DealComparison() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedToolSlug, setSelectedToolSlug] = useState<string>('')
  const [toolId, setToolId] = useState<string | null>(null)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [selectedScenarios, setSelectedScenarios] = useState<Scenario[]>([])
  const [loadingScenarios, setLoadingScenarios] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    if (selectedToolSlug) {
      fetchToolId()
    }
  }, [selectedToolSlug])

  useEffect(() => {
    if (toolId) {
      fetchScenarios()
    }
  }, [toolId])

  const fetchToolId = async () => {
    try {
      setLoadingScenarios(true)
      const { data, error } = await supabase
        .from('tools')
        .select('id')
        .eq('slug', selectedToolSlug)
        .maybeSingle()

      if (error) throw error
      setToolId(data?.id || null)
    } catch (err) {
      console.error('Error fetching tool ID:', err)
    } finally {
      setLoadingScenarios(false)
    }
  }

  const fetchScenarios = async () => {
    if (!user || !toolId) return

    try {
      setLoadingScenarios(true)
      const { data, error } = await supabase
        .from('calculator_scenarios')
        .select('*')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setScenarios(data || [])
      setSelectedScenarios([])
    } catch (err) {
      console.error('Error fetching scenarios:', err)
    } finally {
      setLoadingScenarios(false)
    }
  }

  const toggleScenarioSelection = (scenario: Scenario) => {
    const isSelected = selectedScenarios.some(s => s.id === scenario.id)

    if (isSelected) {
      setSelectedScenarios(selectedScenarios.filter(s => s.id !== scenario.id))
    } else {
      if (selectedScenarios.length < 3) {
        setSelectedScenarios([...selectedScenarios, scenario])
      }
    }
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value === 'number') {
      if (value % 1 !== 0) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value)
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return String(value)
  }

  const getAllKeys = (scenarios: Scenario[]) => {
    const inputKeys = new Set<string>()
    const outputKeys = new Set<string>()

    scenarios.forEach(scenario => {
      Object.keys(scenario.inputs).forEach(key => inputKeys.add(key))
      Object.keys(scenario.outputs).forEach(key => outputKeys.add(key))
    })

    return {
      inputs: Array.from(inputKeys),
      outputs: Array.from(outputKeys),
    }
  }

  const formatKeyName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  const isBetterValue = (key: string, value: number, values: number[]): boolean => {
    if (values.length < 2 || !values.every(v => typeof v === 'number')) return false

    const lowerIsBetter = [
      'downPayment',
      'purchasePrice',
      'closingCosts',
      'rehabCosts',
      'monthlyMortgage',
      'monthlyExpenses',
      'totalInvestment',
      'totalCost',
      'holdingCosts',
      'sellingCosts',
      'totalPaid',
      'loanAmount',
      'annualInsurance',
    ]

    const higherIsBetter = [
      'monthlyRent',
      'netCashFlow',
      'annualCashFlow',
      'cashOnCashReturn',
      'capRate',
      'roi',
      'grossYield',
      'netYield',
      'arvEstimate',
      'netProfit',
      'profitMargin',
    ]

    const keyLower = key.toLowerCase()
    const isLower = lowerIsBetter.some(k => keyLower.includes(k.toLowerCase()))
    const isHigher = higherIsBetter.some(k => keyLower.includes(k.toLowerCase()))

    if (isLower) {
      return value === Math.min(...values)
    } else if (isHigher) {
      return value === Math.max(...values)
    }

    return false
  }

  const calculateWinner = (): number => {
    const keys = getAllKeys(selectedScenarios)
    const greenCounts = selectedScenarios.map(() => 0)

    keys.outputs.forEach(key => {
      const values = selectedScenarios.map(s => {
        const val = s.outputs[key]
        return typeof val === 'number' ? val : NaN
      })

      if (values.every(v => !isNaN(v))) {
        values.forEach((val, idx) => {
          if (isBetterValue(key, val, values)) {
            greenCounts[idx]++
          }
        })
      }
    })

    const maxGreen = Math.max(...greenCounts)
    return greenCounts.indexOf(maxGreen)
  }

  const showComparison = selectedScenarios.length >= 2
  const keys = showComparison ? getAllKeys(selectedScenarios) : { inputs: [], outputs: [] }
  const winnerIndex = showComparison ? calculateWinner() : -1

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-400" />
            Deal Comparison
          </h1>
          <p className="text-gray-400">
            Compare 2-3 saved scenarios side by side to find the best deal
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Calculator Tool
              </label>
              <div className="relative">
                <select
                  value={selectedToolSlug}
                  onChange={(e) => {
                    setSelectedToolSlug(e.target.value)
                    setSelectedScenarios([])
                  }}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 transition-colors pr-10"
                >
                  <option value="">Choose a tool...</option>
                  {TOOL_OPTIONS.map(tool => (
                    <option key={tool.slug} value={tool.slug}>
                      {tool.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {selectedToolSlug && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Select Scenarios (2-3)
                </label>
                {loadingScenarios ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : scenarios.length === 0 ? (
                  <div className="text-center py-8 bg-gray-700/50 rounded-lg border border-gray-600">
                    <p className="text-gray-400">No saved scenarios found for this tool</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Save scenarios from the calculator to compare them here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {scenarios.map(scenario => {
                      const isSelected = selectedScenarios.some(s => s.id === scenario.id)
                      const canSelect = selectedScenarios.length < 3 || isSelected

                      return (
                        <button
                          key={scenario.id}
                          onClick={() => toggleScenarioSelection(scenario)}
                          disabled={!canSelect}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500/10'
                              : canSelect
                              ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                              : 'border-gray-700 bg-gray-700/50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="font-medium text-white mb-1">
                            {scenario.scenario_name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(scenario.created_at).toLocaleDateString()}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {showComparison && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400 bg-gray-750">
                      Property
                    </th>
                    {selectedScenarios.map((scenario, scenarioIdx) => (
                      <th
                        key={scenario.id}
                        className="px-6 py-4 text-left text-sm font-semibold text-white bg-gray-750"
                      >
                        <div className="flex items-center gap-2">
                          {scenario.scenario_name}
                          {scenarioIdx === winnerIndex && (
                            <Trophy className="h-4 w-4 text-yellow-400" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keys.inputs.length > 0 && (
                    <tr className="border-b border-gray-700">
                      <td
                        colSpan={selectedScenarios.length + 1}
                        className="px-6 py-3 text-xs font-semibold text-blue-400 bg-gray-750/50"
                      >
                        INPUTS
                      </td>
                    </tr>
                  )}
                  {keys.inputs.map(key => (
                    <tr key={`input-${key}`} className="border-b border-gray-700 hover:bg-gray-750/30">
                      <td className="px-6 py-3 text-sm text-gray-300 font-medium">
                        {formatKeyName(key)}
                      </td>
                      {selectedScenarios.map(scenario => (
                        <td key={scenario.id} className="px-6 py-3 text-sm text-white">
                          {formatValue(scenario.inputs[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {keys.outputs.length > 0 && (
                    <tr className="border-b border-gray-700">
                      <td
                        colSpan={selectedScenarios.length + 1}
                        className="px-6 py-3 text-xs font-semibold text-green-400 bg-gray-750/50"
                      >
                        OUTPUTS
                      </td>
                    </tr>
                  )}
                  {keys.outputs.map(key => {
                    const values = selectedScenarios.map(s => {
                      const val = s.outputs[key]
                      return typeof val === 'number' ? val : NaN
                    })

                    return (
                      <tr key={`output-${key}`} className="border-b border-gray-700 hover:bg-gray-750/30">
                        <td className="px-6 py-3 text-sm text-gray-300 font-medium">
                          {formatKeyName(key)}
                        </td>
                        {selectedScenarios.map((scenario) => {
                          const value = scenario.outputs[key]
                          const numValue = typeof value === 'number' ? value : NaN
                          const isBest = !isNaN(numValue) && isBetterValue(key, numValue, values)

                          return (
                            <td
                              key={scenario.id}
                              className={`px-6 py-3 text-sm font-medium ${
                                isBest
                                  ? 'text-green-400 bg-green-400/10'
                                  : 'text-white'
                              }`}
                            >
                              {formatValue(value)}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {winnerIndex >= 0 && (
              <div className="px-6 py-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-t border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  <div>
                    <div className="text-lg font-bold text-white">
                      Winner: {selectedScenarios[winnerIndex].scenario_name}
                    </div>
                    <div className="text-sm text-gray-400">
                      This scenario has the most favorable metrics
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedToolSlug && scenarios.length > 0 && !showComparison && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-gray-400">
              Select {selectedScenarios.length === 0 ? '2-3' : selectedScenarios.length === 1 ? '1-2 more' : '1 more'} scenario{selectedScenarios.length === 1 ? '' : 's'} to compare
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
