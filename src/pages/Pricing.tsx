import { Check } from 'lucide-react'

export function Pricing() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
            <p className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-gray-400">/mo</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Basic calculators</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Limited calculations</span>
              </li>
            </ul>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg">
              Get Started
            </button>
          </div>

          <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-lg p-8 relative">
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
            <p className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-indigo-200">/mo</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white">All calculators</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white">Unlimited calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white">Property tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white">Advanced reports</span>
              </li>
            </ul>
            <button className="w-full bg-white hover:bg-gray-100 text-indigo-600 font-medium py-2 px-4 rounded-lg">
              Subscribe
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
            <p className="text-4xl font-bold text-white mb-6">Custom</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Everything in Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Custom integrations</span>
              </li>
            </ul>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
