import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { supabase } from '../lib/supabase'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { LogOut, Save, CreditCard, Loader as Loader2, RefreshCw } from 'lucide-react'
import { createPortalSession } from '../api/create-portal'

export function Settings() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [restoreLoading, setRestoreLoading] = useState(false)
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

  const handleManageSubscription = async () => {
    if (!user) return
    setPortalLoading(true)
    try {
      const url = await createPortalSession(user.id)
      window.location.href = url
    } catch (err) {
      console.error('Portal error:', err)
      showToast('Failed to open subscription portal', 'error')
      setPortalLoading(false)
    }
  }

  const handleRestorePurchase = async () => {
    if (!user) return
    setRestoreLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_status: 'premium' })
        .eq('user_id', user.id)
      if (error) throw error
      showToast('Premium access restored successfully!', 'success')
    } catch (err) {
      console.error('Error restoring purchase:', err)
      showToast('Failed to restore purchase. Please contact support.', 'error')
    } finally {
      setRestoreLoading(false)
    }
  }

  const subscriptionStatus = profile?.subscription_status || 'free'
  const isPremium = subscriptionStatus === 'premium' || subscriptionStatus === 'active'

  const getSubscriptionBadge = () => {
    if (isPremium) {
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
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Subscription Status</label>
              <div className="flex items-center gap-4 flex-wrap">
                {getSubscriptionBadge()}
                {!isPremium && (
                  <button
                    onClick={handleRestorePurchase}
                    disabled={restoreLoading}
                    className="flex items-center gap-2 px-4 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-300 text-sm font-medium rounded-lg transition-colors"
                  >
                    {restoreLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Restoring...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        Restore Purchase
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {saving ? <LoadingSpinner size="small" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {isPremium && (
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 border border-gray-700 card-hover">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Subscription</h2>
            <p className="text-gray-400 text-sm mb-4">
              Manage your billing, update your payment method, or cancel your subscription.
            </p>
            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {portalLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Opening...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Manage Subscription
                </>
              )}
            </button>
          </div>
        )}

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
