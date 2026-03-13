import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
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
import { Pricing } from './pages/Pricing'
import { Settings } from './pages/Settings'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/mortgage_calculator" element={<MortgageCalculator />} />
              <Route path="/tools/rental_yield" element={<RentalYieldCalculator />} />
              <Route path="/tools/stamp_duty" element={<StampDutyCalculator />} />
              <Route path="/tools/deal_analyzer" element={<DealAnalyzer />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
