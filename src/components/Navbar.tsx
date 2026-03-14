import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Hop as Home, LogOut, Settings, Shield, Globe, SquareKanban as KanbanSquare, Users, ChevronDown, Menu, X, BookOpen, GraduationCap, FileText, CirclePlay as PlayCircle, CircleAlert as AlertCircle } from 'lucide-react'

export function Navbar() {
  const { user, profile, signOut } = useAuth()
  const { language, setLanguage } = useLanguage()
  const location = useLocation()
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const resourcesRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')
  const isResourcesActive = () =>
    ['/learn', '/courses', '/templates', '/glossary', '/disclaimer'].some(p => location.pathname === p || location.pathname.startsWith(p + '/'))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [location.pathname])

  const resourcesItems = [
    { to: '/learn', icon: <GraduationCap className="h-4 w-4" />, en: 'Learn', es: 'Aprender' },
    { to: '/courses', icon: <PlayCircle className="h-4 w-4" />, en: 'Courses', es: 'Cursos' },
    { to: '/templates', icon: <FileText className="h-4 w-4" />, en: 'Templates', es: 'Plantillas' },
    { to: '/glossary', icon: <BookOpen className="h-4 w-4" />, en: 'Glossary', es: 'Glosario' },
    { to: '/disclaimer', icon: <AlertCircle className="h-4 w-4" />, en: 'Disclaimer', es: 'Aviso Legal' },
  ]

  const mainLinks = [
    { to: '/tools', en: 'Tools', es: 'Herramientas' },
    { to: '/pipeline', icon: <KanbanSquare className="h-4 w-4" />, en: 'Pipeline', es: 'Pipeline' },
    { to: '/community', icon: <Users className="h-4 w-4" />, en: 'Community', es: 'Comunidad' },
    { to: '/pricing', en: 'Pricing', es: 'Precios' },
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-600 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <Home className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Property Launch Pad</span>
            </Link>

            <div className="hidden md:ml-8 md:flex items-center space-x-1">
              {mainLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    isActive(link.to) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {language === 'en' ? link.en : link.es}
                </Link>
              ))}

              <div className="relative" ref={resourcesRef}>
                <button
                  onClick={() => setResourcesOpen(o => !o)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    isResourcesActive() ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Resources' : 'Recursos'}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-1 z-50">
                    {resourcesItems.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                          isActive(item.to) ? 'text-blue-400 bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {item.icon}
                        {language === 'en' ? item.en : item.es}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {user && profile?.is_admin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    isActive('/admin') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="hidden md:flex items-center gap-1.5 text-gray-300 hover:text-white hover:bg-gray-700 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors"
              title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold">{language === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {user ? (
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Dashboard' : 'Panel'}
                </Link>
                <Link
                  to="/settings"
                  className={`p-2 rounded-md transition-colors ${
                    isActive('/settings') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
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
              </div>
            )}

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-700 bg-gray-800 px-4 pt-3 pb-4 space-y-1">
          {mainLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.to) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {link.icon}
              {language === 'en' ? link.en : link.es}
            </Link>
          ))}

          <button
            onClick={() => setMobileResourcesOpen(o => !o)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isResourcesActive() ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span>{language === 'en' ? 'Resources' : 'Recursos'}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileResourcesOpen && (
            <div className="ml-4 space-y-1">
              {resourcesItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.to) ? 'text-blue-400 bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {language === 'en' ? item.en : item.es}
                </Link>
              ))}
            </div>
          )}

          {user && profile?.is_admin && (
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}

          <div className="pt-2 border-t border-gray-700 space-y-1">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
            </button>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Dashboard' : 'Panel'}
                </Link>
                <Link
                  to="/settings"
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive('/settings') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  {language === 'en' ? 'Settings' : 'Ajustes'}
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full"
                >
                  <LogOut className="h-4 w-4" />
                  {language === 'en' ? 'Sign out' : 'Cerrar sesión'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  {language === 'en' ? 'Log in' : 'Iniciar sesión'}
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  {language === 'en' ? 'Sign up' : 'Registrarse'}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
