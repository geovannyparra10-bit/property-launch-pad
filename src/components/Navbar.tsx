import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Hop as Home, LogOut, Settings, Shield, TrendingUp, BookOpen, GraduationCap, Globe, FileText, CirclePlay as PlayCircle, SquareKanban as KanbanSquare, Users } from 'lucide-react'

export function Navbar() {
  const { user, profile, signOut } = useAuth()
  const { language, setLanguage } = useLanguage()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <nav className="bg-gray-800 border-b border-gray-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Home className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Property Launch Pad</span>
            </Link>

            <div className="hidden md:ml-8 md:flex items-baseline space-x-1">
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {language === 'en' ? 'Dashboard' : 'Panel'}
                  </Link>
                  <Link
                    to="/tools"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/tools')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {language === 'en' ? 'Tools' : 'Herramientas'}
                  </Link>
                  <Link
                    to="/tools/compare"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive('/tools/compare')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    {language === 'en' ? 'Compare' : 'Comparar'}
                  </Link>
                  <Link
                    to="/pipeline"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive('/pipeline')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <KanbanSquare className="h-4 w-4" />
                    {language === 'en' ? 'Pipeline' : 'Pipeline'}
                  </Link>
                  <Link
                    to="/pricing"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/pricing')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {language === 'en' ? 'Pricing' : 'Precios'}
                  </Link>
                </>
              )}
              <Link
                to="/learn"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === '/learn' || location.pathname.startsWith('/learn/')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                {language === 'en' ? 'Learn' : 'Aprender'}
              </Link>
              <Link
                to="/courses"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === '/courses' || location.pathname.startsWith('/courses/')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <PlayCircle className="h-4 w-4" />
                {language === 'en' ? 'Courses' : 'Cursos'}
              </Link>
              {user && (
                <>
                  <Link
                    to="/templates"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive('/templates')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    {language === 'en' ? 'Templates' : 'Plantillas'}
                  </Link>
                  <Link
                    to="/community"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive('/community')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    {language === 'en' ? 'Community' : 'Comunidad'}
                  </Link>
                  <Link
                    to="/glossary"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive('/glossary')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    {language === 'en' ? 'Glossary' : 'Glosario'}
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      to="/admin"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActive('/admin')
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white hover:bg-gray-700 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors"
              title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold">{language === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {user ? (
              <>
                <Link
                  to="/settings"
                  className={`p-2 rounded-md transition-colors ${
                    isActive('/settings')
                      ? 'bg-blue-600 text-white'
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
                  {language === 'en' ? 'Log in' : 'Iniciar sesión'}
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {language === 'en' ? 'Sign up' : 'Registrarse'}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
