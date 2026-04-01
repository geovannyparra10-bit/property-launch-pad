import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { supabase } from '../lib/supabase'
import { LoadingPage } from '../components/LoadingSpinner'
import { ArrowRight, Save, BookOpen, Clock } from 'lucide-react'

const featuredArticles = [
  {
    slug: 'rental-property-investing',
    titleEn: "Beginner's Guide to Rental Property Investing",
    summaryEn: 'Cash flow basics, cap rates, tenant screening, and the system for building a rental portfolio.',
    readTime: '11 min read',
    category: 'Fundamentals',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    slug: 'understanding-mortgages',
    titleEn: 'Understanding Mortgages: What Every Investor Needs to Know',
    summaryEn: 'Fixed vs. adjustable rates, FHA vs. VA vs. conventional, amortization, and when to refinance.',
    readTime: '10 min read',
    category: 'Financing',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    slug: 'analyzing-deals',
    titleEn: 'How to Analyze a Real Estate Deal in 15 Minutes',
    summaryEn: 'NOI, cap rate, DSCR, cash-on-cash return, pro forma red flags, and a 15-minute checklist.',
    readTime: '10 min read',
    category: 'Analysis',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

interface Tool {
  id: string
  slug: string
  title_en: string
  description_en: string
  sort_order: number
  icon: string
}

export function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [tools, setTools] = useState<Tool[]>([])
  const [scenarioCount, setScenarioCount] = useState(0)

  useEffect(() => {
    checkAccess()
  }, [user, authLoading])

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      activatePremium()
    }
  }, [])

  const activatePremium = async () => {
    if (!user) return
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_status: 'premium' })
        .eq('user_id', user.id)
      if (error) throw error
      showToast('Payment successful! Welcome to Premium.', 'success')
    } catch (err) {
      console.error('Error activating premium:', err)
      showToast('Payment received — please use "Restore Purchase" in Settings if Premium is not active.', 'info')
    } finally {
      setSearchParams({})
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchActiveTools()
      fetchScenarioCount()
    }
  }, [loading])

  const checkAccess = async () => {
    if (authLoading) return

    if (!user) {
      navigate('/login')
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

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Free Articles</h2>
            </div>
            <Link
              to="/learn"
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/learn/${article.slug}`}
                className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                    {article.titleEn}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-3">
                    {article.summaryEn}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-700">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-blue-400 font-medium group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
