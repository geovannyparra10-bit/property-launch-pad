import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { CircleCheck as CheckCircle2 } from 'lucide-react'

type Step = 1 | 2 | 3

interface StepData {
  experience?: string
  goals?: string[]
  propertyTypes?: string[]
}

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [stepData, setStepData] = useState<StepData>({})
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    checkOnboardingStatus()
  }, [user])

  const checkOnboardingStatus = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error

      if (data?.onboarding_completed) {
        navigate('/dashboard')
        return
      }

      setLoading(false)
    } catch (err) {
      console.error('Error checking onboarding status:', err)
      setLoading(false)
    }
  }

  const saveStep = async (stepKey: string, response: any) => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('onboarding_responses')
        .upsert({
          user_id: user.id,
          step_key: stepKey,
          response: response,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,step_key'
        })

      if (error) throw error
    } catch (err) {
      console.error('Error saving step:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleStep1Submit = async (experience: string) => {
    setStepData({ ...stepData, experience })
    await saveStep('experience', { value: experience })
    setCurrentStep(2)
  }

  const handleStep2Submit = async (goals: string[]) => {
    setStepData({ ...stepData, goals })
    await saveStep('goals', { values: goals })
    setCurrentStep(3)
  }

  const handleStep3Submit = async (propertyTypes: string[]) => {
    setStepData({ ...stepData, propertyTypes })
    await saveStep('property_types', { values: propertyTypes })

    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('user_id', user.id)

      if (error) throw error

      navigate('/dashboard')
    } catch (err) {
      console.error('Error completing onboarding:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome to Property Launch Pad</h2>
          <p className="text-gray-400 text-center mb-8">
            Let's personalize your experience in just a few steps
          </p>

          <ProgressBar currentStep={currentStep} />

          {currentStep === 1 && (
            <Step1Experience onSubmit={handleStep1Submit} saving={saving} />
          )}

          {currentStep === 2 && (
            <Step2Goals onSubmit={handleStep2Submit} onBack={() => setCurrentStep(1)} saving={saving} />
          )}

          {currentStep === 3 && (
            <Step3PropertyTypes onSubmit={handleStep3Submit} onBack={() => setCurrentStep(2)} saving={saving} />
          )}
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ currentStep }: { currentStep: Step }) {
  const steps = [
    { number: 1, label: 'Experience' },
    { number: 2, label: 'Goals' },
    { number: 3, label: 'Property Types' },
  ]

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle2 className="w-6 h-6 animate-check-pop" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-sm mt-2 transition-colors ${
                  currentStep >= step.number ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition-all duration-500 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Step1Experience({ onSubmit, saving }: { onSubmit: (value: string) => void; saving: boolean }) {
  const [selected, setSelected] = useState<string>('')

  const options = [
    { value: 'beginner', label: 'Beginner', description: 'New to real estate investing' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience with properties' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced investor' },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">Your Experience</h3>
      <p className="text-gray-400 mb-6">Tell us about your real estate experience level</p>

      <div className="space-y-3 mb-8">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelected(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selected === option.value
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="font-semibold text-white">{option.label}</div>
            <div className="text-sm text-gray-400">{option.description}</div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onSubmit(selected)}
        disabled={!selected || saving}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        {saving ? 'Saving...' : 'Continue'}
      </button>
    </div>
  )
}

function Step2Goals({ onSubmit, onBack, saving }: { onSubmit: (values: string[]) => void; onBack: () => void; saving: boolean }) {
  const [selected, setSelected] = useState<string[]>([])

  const options = [
    { value: 'cash_flow', label: 'Cash Flow', description: 'Generate monthly rental income' },
    { value: 'appreciation', label: 'Appreciation', description: 'Build long-term property value' },
    { value: 'tax_benefits', label: 'Tax Benefits', description: 'Maximize tax deductions' },
    { value: 'portfolio_growth', label: 'Portfolio Growth', description: 'Expand property holdings' },
  ]

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">Your Goals</h3>
      <p className="text-gray-400 mb-6">Select all that apply</p>

      <div className="space-y-3 mb-8">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selected.includes(option.value)
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="font-semibold text-white">{option.label}</div>
            <div className="text-sm text-gray-400">{option.description}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => onSubmit(selected)}
          disabled={selected.length === 0 || saving}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {saving ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}

function Step3PropertyTypes({ onSubmit, onBack, saving }: { onSubmit: (values: string[]) => void; onBack: () => void; saving: boolean }) {
  const [selected, setSelected] = useState<string[]>([])

  const options = [
    { value: 'single_family', label: 'Single Family', description: 'Traditional single-family homes' },
    { value: 'multi_family', label: 'Multi-Family', description: 'Duplexes, triplexes, apartments' },
    { value: 'commercial', label: 'Commercial', description: 'Office, retail, industrial' },
    { value: 'vacation_rental', label: 'Vacation Rental', description: 'Short-term rental properties' },
  ]

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">Property Types</h3>
      <p className="text-gray-400 mb-6">What types of properties interest you?</p>

      <div className="space-y-3 mb-8">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selected.includes(option.value)
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
            }`}
          >
            <div className="font-semibold text-white">{option.label}</div>
            <div className="text-sm text-gray-400">{option.description}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => onSubmit(selected)}
          disabled={selected.length === 0 || saving}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {saving ? 'Completing...' : 'Complete Setup'}
        </button>
      </div>
    </div>
  )
}
