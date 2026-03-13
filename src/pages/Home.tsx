import { Link } from 'react-router-dom'
import { Calculator, Save, Globe } from 'lucide-react'

export function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Make smarter property decisions
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Professional-grade real estate calculators and tools to help you analyze, compare, and understand property investments with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/tools"
              className="bg-gray-800 hover:bg-gray-700 text-white px-10 py-4 rounded-lg font-semibold text-lg border border-gray-700 transition-colors"
            >
              Browse Tools
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-600 transition-colors">
            <div className="bg-indigo-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Calculator className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Professional Calculators</h3>
            <p className="text-gray-400 leading-relaxed">
              Advanced mortgage, ROI, and affordability calculators with detailed breakdowns and amortization schedules.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-600 transition-colors">
            <div className="bg-indigo-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Save className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Save & Compare</h3>
            <p className="text-gray-400 leading-relaxed">
              Save your calculations and compare multiple properties side-by-side to make informed decisions.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-indigo-600 transition-colors">
            <div className="bg-indigo-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Globe className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">English & Spanish</h3>
            <p className="text-gray-400 leading-relaxed">
              Full bilingual support to serve English and Spanish-speaking users with seamless language switching.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
