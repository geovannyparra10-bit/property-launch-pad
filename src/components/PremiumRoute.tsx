import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PremiumFeatureModal } from './PremiumFeatureModal'

interface PremiumRouteProps {
  children: React.ReactNode
  featureName?: string
}

export function PremiumRoute({ children, featureName = 'This Tool' }: PremiumRouteProps) {
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const isPremium = profile?.subscription_status === 'premium' || profile?.subscription_status === 'active'

  useEffect(() => {
    if (!loading && user && profile && !isPremium) {
      setShowModal(true)
    }
  }, [loading, user, profile, isPremium])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isPremium) {
    return (
      <PremiumFeatureModal
        isOpen={showModal}
        onClose={() => navigate(-1)}
        featureName={featureName}
      />
    )
  }

  return <>{children}</>
}
