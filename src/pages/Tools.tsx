import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ArrowRight } from 'lucide-react'

interface Tool {
  id: string
  slug: string
  title_en: string
  description_en: string
  access_level: string
  sort_order: number
}

export function Tools() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchTools()
  }, [user])

  const fetchTools = async () => {
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
    } finally {
      setLoading(false)
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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Financial Tools</h1>
          <p className="text-gray-400">
            Powerful calculators and analyzers to help you make informed real estate decisions.
          </p>
        </div>

        {tools.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No tools available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.slug}`}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-indigo-500 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {tool.title_en}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tool.access_level === 'premium'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}
                      >
                        {tool.access_level === 'premium' ? 'Premium' : 'Free'}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
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
  )
}
