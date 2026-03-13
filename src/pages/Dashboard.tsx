import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const { profile } = useAuth()

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">My Properties</h3>
            <p className="text-3xl font-bold text-indigo-400">0</p>
            <p className="text-gray-400 text-sm mt-2">Properties tracked</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Saved Calculations</h3>
            <p className="text-3xl font-bold text-indigo-400">0</p>
            <p className="text-gray-400 text-sm mt-2">Total calculations</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Reports Generated</h3>
            <p className="text-3xl font-bold text-indigo-400">0</p>
            <p className="text-gray-400 text-sm mt-2">Financial reports</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <p className="text-gray-400">Dashboard features coming soon...</p>
        </div>
      </div>
    </div>
  )
}
