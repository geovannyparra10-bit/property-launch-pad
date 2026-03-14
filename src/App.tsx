import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { LanguageProvider } from './contexts/LanguageContext'
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
import { DealComparison } from './pages/DealComparison'
import { Pricing } from './pages/Pricing'
import { Settings } from './pages/Settings'
import { Glossary } from './pages/Glossary'
import { DocumentAnalyzer } from './pages/DocumentAnalyzer'
import { ARVCompsAnalyzer } from './pages/ARVCompsAnalyzer'
import { OwnerFinanceCalculator } from './pages/OwnerFinanceCalculator'
import { Templates } from './pages/Templates'
import { OwnerCarryAgreement } from './pages/templates/OwnerCarryAgreement'
import { LeaseAgreement } from './pages/templates/LeaseAgreement'
import AdminDashboard from './pages/AdminDashboard'
import Disclaimer from './pages/Disclaimer'
import { Learn } from './pages/Learn'
import { HouseHacking101 } from './pages/learn/HouseHacking101'
import { BRRRStrategy } from './pages/learn/BRRRStrategy'
import { FixAndFlip } from './pages/learn/FixAndFlip'
import { RentalPropertyInvesting } from './pages/learn/RentalPropertyInvesting'
import { UnderstandingMortgages } from './pages/learn/UnderstandingMortgages'
import { AnalyzingDeals } from './pages/learn/AnalyzingDeals'
import { EstimatingRepairs } from './pages/learn/EstimatingRepairs'
import { BuildingAPortfolio } from './pages/learn/BuildingAPortfolio'

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
        <Route path="/tools/compare" element={<ProtectedRoute><DealComparison /></ProtectedRoute>} />
        <Route path="/tools/document_analyzer" element={<DocumentAnalyzer />} />
        <Route path="/tools/arv_comps" element={<ARVCompsAnalyzer />} />
        <Route path="/tools/owner_finance" element={<OwnerFinanceCalculator />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/owner-carry" element={<OwnerCarryAgreement />} />
        <Route path="/templates/lease-agreement" element={<LeaseAgreement />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/house-hacking-101" element={<HouseHacking101 />} />
        <Route path="/learn/brrr-strategy" element={<BRRRStrategy />} />
        <Route path="/learn/fix-and-flip" element={<FixAndFlip />} />
        <Route path="/learn/rental-property-investing" element={<RentalPropertyInvesting />} />
        <Route path="/learn/understanding-mortgages" element={<UnderstandingMortgages />} />
        <Route path="/learn/analyzing-deals" element={<AnalyzingDeals />} />
        <Route path="/learn/estimating-repairs" element={<EstimatingRepairs />} />
        <Route path="/learn/building-a-portfolio" element={<BuildingAPortfolio />} />
      </Routes>
    </PageTransition>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LanguageProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </LanguageProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
