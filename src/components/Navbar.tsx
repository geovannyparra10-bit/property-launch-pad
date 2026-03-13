import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Hop as Home, LogOut, Settings } from 'lucide-react'

export function Navbar() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-gray-800 border-b border-gray-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Home className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">Property Launch Pad</span>
            </Link>

            {user && (
              <div className="hidden md:ml-10 md:flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/tools"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/tools')
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Tools
                </Link>
                <Link
                  to="/pricing"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/pricing')
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Pricing
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <Link
                  to="/settings"
                  className={`p-2 rounded-md transition-colors ${
                    isActive('/settings')
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
