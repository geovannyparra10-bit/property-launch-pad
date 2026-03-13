import { useAuth } from '../contexts/AuthContext'

export function Settings() {
  const { user, profile } = useAuth()

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <p className="text-white">{profile?.full_name || 'Not set'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>
          <p className="text-gray-400">Settings options coming soon...</p>
        </div>
      </div>
    </div>
  )
}
