import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'

export function Tools() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Financial Tools</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/tools/mortgage_calculator"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition"
          >
            <Calculator className="h-12 w-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Mortgage Calculator</h3>
            <p className="text-gray-400">
              Calculate monthly payments, total interest, and create amortization schedules.
            </p>
          </Link>

          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <Calculator className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Affordability Calculator</h3>
            <p className="text-gray-400">Coming soon...</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <Calculator className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Refinance Calculator</h3>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
