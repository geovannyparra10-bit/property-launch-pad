import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PageTransition } from './components/PageTransition'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Onboarding } from './pages/Onboarding'
import { Dashboard } from './pages/Dashboard'
import { Tools } from './pages/Tools'
import { MortgageCalculator } from './pages/MortgageCalculator'
import { RentalYieldCalculator } from './pages/RentalYieldCalculator'
import { StampDutyCalculator } from './pages/StampDutyCalculator'
import { DealAnalyzer } from './pages/DealAnalyzer'
import HouseHackCalculator from './pages/HouseHackCalculator'
import BRRRCalculator from './pages/BRRRCalculator'
import FlipCalculator from './pages/FlipCalculator'
import RepairsEstimator from './pages/RepairsEstimator'
import { PortfolioAnalyzer } from './pages/PortfolioAnalyzer'
import { Pricing } from './pages/Pricing'
import { Settings } from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'

function AppRoutes() {
  const location = useLocation()

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/mortgage_calculator" element={<MortgageCalculator />} />
        <Route path="/tools/rental_yield" element={<RentalYieldCalculator />} />
        <Route path="/tools/stamp_duty" element={<StampDutyCalculator />} />
        <Route path="/tools/deal_analyzer" element={<DealAnalyzer />} />
        <Route path="/tools/house_hack" element={<HouseHackCalculator />} />
        <Route path="/tools/brrr" element={<BRRRCalculator />} />
        <Route path="/tools/flip" element={<FlipCalculator />} />
        <Route path="/tools/repairs_estimator" element={<RepairsEstimator />} />
        <Route path="/tools/portfolio_analyzer" element={<PortfolioAnalyzer />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </PageTransition>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
