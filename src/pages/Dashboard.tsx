import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { LoadingPage } from '../components/LoadingSpinner'
import { ArrowRight, Save } from 'lucide-react'

interface Tool {
  id: string
  slug: string
  title_en: string
  description_en: string
  sort_order: number
  icon: string
}

export function Dashboard() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [tools, setTools] = useState<Tool[]>([])
  const [scenarioCount, setScenarioCount] = useState(0)

  useEffect(() => {
    checkAccess()
  }, [user, profile])

  useEffect(() => {
    if (!loading) {
      fetchActiveTools()
      fetchScenarioCount()
    }
  }, [loading])

  const checkAccess = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (!profile) {
      setLoading(true)
      return
    }

    if (!profile.onboarding_completed) {
      navigate('/onboarding')
      return
    }

    setLoading(false)
  }

  const fetchActiveTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error

      setTools(data || [])
    } catch (err) {
      console.error('Error fetching tools:', err)
    }
  }

  const fetchScenarioCount = async () => {
    if (!user) return

    try {
      const { count, error } = await supabase
        .from('saved_scenarios')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if (error) throw error
      setScenarioCount(count || 0)
    } catch (err) {
      console.error('Error fetching scenario count:', err)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getFirstName = () => {
    if (!profile?.full_name) return ''
    return profile.full_name.split(' ')[0]
  }

  const subscriptionStatus = profile?.subscription_status || 'free'
  const isPremium = subscriptionStatus === 'active' || subscriptionStatus === 'premium'

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-blue-400 text-sm font-medium mb-1">{getGreeting()}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {getFirstName() ? `${getFirstName()}'s Dashboard` : 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isPremium
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}
            >
              {isPremium ? 'Premium' : 'Free'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Saved Scenarios</p>
                <p className="text-3xl font-bold text-white">{scenarioCount}</p>
              </div>
              <div className="bg-blue-600/20 p-3 rounded-lg">
                <Save className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Tools</p>
                <p className="text-3xl font-bold text-white">{tools.length}</p>
              </div>
              <div className="bg-teal-600/20 p-3 rounded-lg">
                <ArrowRight className="w-6 h-6 text-teal-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Account Type</p>
                <p className="text-3xl font-bold text-white">{isPremium ? 'Premium' : 'Free'}</p>
              </div>
              <div className={`${isPremium ? 'bg-yellow-600/20' : 'bg-green-600/20'} p-3 rounded-lg`}>
                <span className={`text-2xl ${isPremium ? 'text-yellow-400' : 'text-green-400'}`}>★</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Your Tools</h2>
            <Link
              to="/tools"
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors"
            >
              View all tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {tools.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center card-hover">
              <p className="text-gray-400">No active tools available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.slug}`}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all group card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {tool.title_en}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tool.description_en}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
