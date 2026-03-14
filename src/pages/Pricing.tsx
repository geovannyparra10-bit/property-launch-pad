import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Loader as Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { createCheckoutSession } from '../api/create-checkout'

export function Pricing() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      if (!user) {
        window.location.href = '/signup'
        return
      }
      const url = await createCheckoutSession(user.id)
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg sm:text-xl text-gray-400">Choose the plan that's right for your real estate journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-700 card-hover">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-gray-400 text-lg">/forever</span>
              </div>
              <p className="text-gray-400">Perfect for getting started with property analysis</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-green-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-gray-300">Mortgage calculator access</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-green-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-gray-300">1 saved scenario per tool</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-green-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-gray-300">Basic support</span>
              </li>
            </ul>

            <Link
              to="/signup"
              className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 border-2 border-blue-500 relative shadow-xl shadow-blue-500/20 card-hover">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                MOST POPULAR
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-bold text-white">$9</span>
                <span className="text-blue-300 text-lg">/month</span>
              </div>
              <p className="text-gray-300">Everything you need for serious property investing</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-blue-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">All tools included</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-blue-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">Unlimited saved scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-blue-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-blue-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">Advanced analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="rounded-full p-1 bg-blue-500/20 flex-shrink-0">
                  <Check className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">Export to PDF</span>
              </li>
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full text-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                'Upgrade to Premium'
              )}
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            All plans include secure data storage and regular feature updates
          </p>
        </div>
      </div>
    </div>
  )
}
