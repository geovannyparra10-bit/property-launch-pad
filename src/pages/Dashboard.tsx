import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { LoadingPage } from '../components/LoadingSpinner'
import { ArrowRight } from 'lucide-react'

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

  useEffect(() => {
    checkAccess()
  }, [user, profile])

  useEffect(() => {
    if (!loading) {
      fetchActiveTools()
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back{getFirstName() ? `, ${getFirstName()}` : ''}
          </h1>
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

        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Your Tools</h2>
            <Link
              to="/tools"
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2 transition-colors"
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
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-indigo-500 transition-all group card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {tool.title_en}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tool.description_en}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 card-hover">
            <h3 className="text-lg font-semibold text-white mb-2">My Properties</h3>
            <p className="text-3xl font-bold text-indigo-400">0</p>
            <p className="text-gray-400 text-sm mt-2">Properties tracked</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 card-hover">
            <h3 className="text-lg font-semibold text-white mb-2">Saved Calculations</h3>
            <p className="text-3xl font-bold text-indigo-400">0</p>
            <p className="text-gray-400 text-sm mt-2">Total calculations</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 card-hover">
            <h3 className="text-lg font-semibold text-white mb-2">Reports Generated</h3>
            <p className="text-3xl font-bold text-indigo-400">0</p>
            <p className="text-gray-400 text-sm mt-2">Financial reports</p>
          </div>
        </div>
      </div>
    </div>
  )
}
