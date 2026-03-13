import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { ChevronDown, ChevronUp, Save, Pin, Trash2, CircleAlert as AlertCircle } from 'lucide-react'

interface Scenario {
  id: string
  scenario_name: string
  inputs: Record<string, any>
  outputs: Record<string, any>
  is_pinned: boolean
  created_at: string
  updated_at: string
}

interface ScenarioPanelProps {
  toolSlug: string
  currentInputs: Record<string, any>
  currentOutputs: Record<string, any>
  onLoadScenario: (inputs: Record<string, any>) => void
}

export function ScenarioPanel({
  toolSlug,
  currentInputs,
  currentOutputs,
  onLoadScenario,
}: ScenarioPanelProps) {
  const { user, profile } = useAuth()
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [scenarioName, setScenarioName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toolId, setToolId] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchToolId()
    }
  }, [user, toolSlug])

  useEffect(() => {
    if (user && toolId) {
      fetchScenarios()
    }
  }, [user, toolId])

  const fetchToolId = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('id')
        .eq('slug', toolSlug)
        .maybeSingle()

      if (error) throw error
      if (data) {
        setToolId(data.id)
      }
    } catch (err) {
      console.error('Error fetching tool ID:', err)
    }
  }

  const fetchScenarios = async () => {
    if (!user || !toolId) return

    try {
      const { data, error } = await supabase
        .from('calculator_scenarios')
        .select('*')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false })

      if (error) throw error
      setScenarios(data || [])
    } catch (err) {
      console.error('Error fetching scenarios:', err)
    }
  }

  const handleSave = async () => {
    if (!user || !toolId) return
    if (!scenarioName.trim()) {
      setError('Please enter a scenario name')
      return
    }

    if (scenarioName.length > 60) {
      setError('Scenario name must be 60 characters or less')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { count } = await supabase
        .from('calculator_scenarios')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('tool_id', toolId)

      if (count !== null && count >= 1 && profile?.subscription_status !== 'premium') {
        setError('Free accounts can save 1 scenario per tool. Upgrade to Premium for unlimited.')
        showToast('Free tier limit reached', 'error')
        setLoading(false)
        return
      }

      const { error: insertError } = await supabase
        .from('calculator_scenarios')
        .insert({
          user_id: user.id,
          tool_id: toolId,
          scenario_name: scenarioName.trim(),
          inputs: currentInputs,
          outputs: currentOutputs,
          is_pinned: false,
        })

      if (insertError) throw insertError

      showToast('Scenario saved', 'success')
      setScenarioName('')
      await fetchScenarios()
    } catch (err) {
      console.error('Error saving scenario:', err)
      setError('Failed to save scenario. Please try again.')
      showToast('Failed to save scenario', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleLoad = (scenario: Scenario) => {
    onLoadScenario(scenario.inputs)
  }

  const handleTogglePin = async (scenarioId: string, currentPinned: boolean) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('calculator_scenarios')
        .update({ is_pinned: !currentPinned })
        .eq('id', scenarioId)
        .eq('user_id', user.id)

      if (error) throw error
      await fetchScenarios()
    } catch (err) {
      console.error('Error toggling pin:', err)
    }
  }

  const handleDelete = async (scenarioId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('calculator_scenarios')
        .delete()
        .eq('id', scenarioId)
        .eq('user_id', user.id)

      if (error) throw error
      showToast('Scenario deleted', 'success')
      await fetchScenarios()
    } catch (err) {
      console.error('Error deleting scenario:', err)
      showToast('Failed to delete scenario', 'error')
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-white">Saved Scenarios</h3>
          {scenarios.length > 0 && (
            <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
              {scenarios.length}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-700">
          <div className="pt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Save Current Scenario
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="Enter scenario name"
                  maxLength={60}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  onClick={handleSave}
                  disabled={loading || !scenarioName.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
              {scenarioName.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {scenarioName.length}/60 characters
                </p>
              )}
              {error && (
                <div className="mt-3 p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>

            {scenarios.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Your Scenarios</h4>
                <div className="space-y-2">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="bg-gray-700 rounded-lg p-3 flex items-center justify-between group hover:bg-gray-650 transition-colors"
                    >
                      <button
                        onClick={() => handleLoad(scenario)}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center gap-2">
                          {scenario.is_pinned && (
                            <Pin className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          )}
                          <span className="text-white font-medium">
                            {scenario.scenario_name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(scenario.updated_at).toLocaleDateString()}
                        </p>
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleTogglePin(scenario.id, scenario.is_pinned)}
                          className="p-2 hover:bg-gray-600 rounded transition-colors"
                          title={scenario.is_pinned ? 'Unpin' : 'Pin'}
                        >
                          <Pin
                            className={`w-4 h-4 ${
                              scenario.is_pinned
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-400'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(scenario.id)}
                          className="p-2 hover:bg-red-600/20 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scenarios.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No saved scenarios yet</p>
                <p className="text-gray-600 text-xs mt-1">
                  Save your first scenario to quickly load it later
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
