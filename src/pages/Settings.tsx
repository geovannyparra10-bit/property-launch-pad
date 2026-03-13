import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { supabase } from '../lib/supabase'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { LogOut, Save } from 'lucide-react'

export function Settings() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState('')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (profile) {
      setFullName(profile.full_name || '')
      setLanguage(profile.language || 'en')
    }
  }, [user, profile, navigate])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          language: language
        })
        .eq('user_id', user.id)

      if (error) throw error

      showToast('Profile updated', 'success')
    } catch (err) {
      console.error('Error saving settings:', err)
      showToast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      navigate('/login')
    } catch (err) {
      console.error('Error signing out:', err)
      setLoading(false)
    }
  }

  const getSubscriptionBadge = () => {
    const subscriptionStatus = profile?.subscription_status || 'free'

    if (subscriptionStatus === 'premium' || subscriptionStatus === 'active') {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          Premium
        </span>
      )
    }

    return (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
        Free
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 border border-gray-700 card-hover">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">Account Information</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Subscription Status</label>
              <div>{getSubscriptionBadge()}</div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {saving ? <LoadingSpinner size="small" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 card-hover">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Account Actions</h2>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="small" /> : <LogOut className="w-4 h-4" />}
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  )
}
