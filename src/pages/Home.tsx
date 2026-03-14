import { Link } from 'react-router-dom'
import { Calculator, Save, Globe, BookOpen } from 'lucide-react'

export function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-teal-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center mb-12 sm:mb-20 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Make smarter property decisions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto px-4">
              Professional-grade real estate calculators and tools to help you analyze, compare, and understand property investments with confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/tools"
                className="bg-gray-800 hover:bg-gray-700 text-white px-10 py-4 rounded-lg font-semibold text-lg border border-gray-700 transition-all hover:scale-105"
              >
                Browse Tools
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 card-hover animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Professional Calculators</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced mortgage, ROI, and affordability calculators with detailed breakdowns and amortization schedules.
              </p>
            </div>

            <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 card-hover animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Save className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Save & Compare</h3>
              <p className="text-gray-400 leading-relaxed">
                Save your calculations and compare multiple properties side-by-side to make informed decisions.
              </p>
            </div>

            <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 card-hover animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">English & Spanish</h3>
              <p className="text-gray-400 leading-relaxed">
                Full bilingual support to serve English and Spanish-speaking users with seamless language switching.
              </p>
            </div>

            <Link
              to="/learn"
              className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 card-hover animate-slide-up hover:border-blue-500/50 transition-all group flex flex-col"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="bg-blue-600/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Free Learning Resources</h3>
              <p className="text-gray-400 leading-relaxed flex-1">
                In-depth guides on house hacking, BRRR, flipping, rental investing, and more — in English and Spanish.
              </p>
              <span className="mt-4 text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse articles
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
