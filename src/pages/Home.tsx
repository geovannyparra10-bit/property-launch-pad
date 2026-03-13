import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, TrendingUp, Shield } from 'lucide-react'

export function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Your Intelligent Home Financing Assistant
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Make smarter homebuying decisions with powerful calculators, personalized insights, and expert guidance.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/tools"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Explore Tools
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gray-800 p-8 rounded-lg">
            <Calculator className="h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Smart Calculators</h3>
            <p className="text-gray-400">
              Advanced mortgage calculators with amortization schedules and comparison tools.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <TrendingUp className="h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Market Insights</h3>
            <p className="text-gray-400">
              Real-time data and trends to help you make informed decisions.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <Shield className="h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">
              Your financial data is encrypted and protected with industry-leading security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
