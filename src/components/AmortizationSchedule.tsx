import { useState } from 'react'
import { ChevronDown, ChevronUp, FileDown, Calendar, TrendingDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { PremiumFeatureModal } from './PremiumFeatureModal'

interface MonthlyPayment {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

interface YearlyPayment {
  year: number
  totalPayment: number
  totalPrincipal: number
  totalInterest: number
  endingBalance: number
}

interface AmortizationScheduleProps {
  loanAmount: number
  interestRate: number
  loanTerm: number
  monthlyPayment: number
}

export function AmortizationSchedule({
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
}: AmortizationScheduleProps) {
  const { profile } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly')
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const calculateSchedule = (): MonthlyPayment[] => {
    const schedule: MonthlyPayment[] = []
    const monthlyRate = interestRate / 100 / 12
    let remainingBalance = loanAmount
    const numberOfPayments = loanTerm * 12

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance = Math.max(0, remainingBalance - principalPayment)

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance,
      })
    }

    return schedule
  }

  const calculateYearlySchedule = (): YearlyPayment[] => {
    const monthlySchedule = calculateSchedule()
    const yearlySchedule: YearlyPayment[] = []

    for (let year = 1; year <= loanTerm; year++) {
      const startMonth = (year - 1) * 12
      const endMonth = year * 12
      const yearData = monthlySchedule.slice(startMonth, endMonth)

      const totalPayment = yearData.reduce((sum, m) => sum + m.payment, 0)
      const totalPrincipal = yearData.reduce((sum, m) => sum + m.principal, 0)
      const totalInterest = yearData.reduce((sum, m) => sum + m.interest, 0)
      const endingBalance = yearData[yearData.length - 1]?.balance || 0

      yearlySchedule.push({
        year,
        totalPayment,
        totalPrincipal,
        totalInterest,
        endingBalance,
      })
    }

    return yearlySchedule
  }

  const monthlySchedule = calculateSchedule()
  const yearlySchedule = calculateYearlySchedule()

  const totalInterest = monthlySchedule.reduce((sum, m) => sum + m.interest, 0)
  const totalPrincipal = loanAmount
  const principalToInterestRatio = totalPrincipal / totalInterest

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleExportSchedule = () => {
    const isPremium = profile?.subscription_status === 'premium'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    const schedule = viewMode === 'monthly' ? monthlySchedule : yearlySchedule
    const csvRows: string[] = []

    if (viewMode === 'monthly') {
      csvRows.push('Month,Payment,Principal,Interest,Remaining Balance')
      schedule.forEach((row) => {
        const m = row as MonthlyPayment
        csvRows.push(
          `${m.month},${m.payment.toFixed(2)},${m.principal.toFixed(2)},${m.interest.toFixed(2)},${m.balance.toFixed(2)}`
        )
      })
    } else {
      csvRows.push('Year,Total Payment,Total Principal,Total Interest,Ending Balance')
      schedule.forEach((row) => {
        const y = row as YearlyPayment
        csvRows.push(
          `${y.year},${y.totalPayment.toFixed(2)},${y.totalPrincipal.toFixed(2)},${y.totalInterest.toFixed(2)},${y.endingBalance.toFixed(2)}`
        )
      })
    }

    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `amortization-schedule-${viewMode}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Amortization Schedule</h3>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="px-6 pb-6 border-t border-gray-700">
            <div className="pt-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-400">Total Interest Paid</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalInterest)}</p>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Total Principal</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalPrincipal)}</p>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Principal to Interest Ratio</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {principalToInterestRatio.toFixed(2)}:1
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Monthly View
                  </button>
                  <button
                    onClick={() => setViewMode('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'yearly'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Yearly View
                  </button>
                </div>

                <button
                  onClick={handleExportSchedule}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  Export Schedule
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full text-sm">
                  <thead>
                    {viewMode === 'monthly' ? (
                      <tr className="bg-gray-750 border-b border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                          Month
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Payment
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Principal
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Interest
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Balance
                        </th>
                      </tr>
                    ) : (
                      <tr className="bg-gray-750 border-b border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                          Year
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Total Payment
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Total Principal
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Total Interest
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                          Ending Balance
                        </th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {viewMode === 'monthly'
                      ? monthlySchedule.map((row, index) => (
                          <tr
                            key={row.month}
                            className={`border-b border-gray-700 hover:bg-gray-750/50 transition-colors ${
                              index % 12 === 11 ? 'border-b-2 border-gray-600' : ''
                            }`}
                          >
                            <td className="px-4 py-3 text-white font-medium">{row.month}</td>
                            <td className="px-4 py-3 text-right text-gray-300">
                              {formatCurrency(row.payment)}
                            </td>
                            <td className="px-4 py-3 text-right text-green-400 font-medium">
                              {formatCurrency(row.principal)}
                            </td>
                            <td className="px-4 py-3 text-right text-red-400 font-medium">
                              {formatCurrency(row.interest)}
                            </td>
                            <td className="px-4 py-3 text-right text-white font-semibold">
                              {formatCurrency(row.balance)}
                            </td>
                          </tr>
                        ))
                      : yearlySchedule.map((row) => (
                          <tr
                            key={row.year}
                            className="border-b border-gray-700 hover:bg-gray-750/50 transition-colors"
                          >
                            <td className="px-4 py-3 text-white font-medium">Year {row.year}</td>
                            <td className="px-4 py-3 text-right text-gray-300">
                              {formatCurrency(row.totalPayment)}
                            </td>
                            <td className="px-4 py-3 text-right text-green-400 font-medium">
                              {formatCurrency(row.totalPrincipal)}
                            </td>
                            <td className="px-4 py-3 text-right text-red-400 font-medium">
                              {formatCurrency(row.totalInterest)}
                            </td>
                            <td className="px-4 py-3 text-right text-white font-semibold">
                              {formatCurrency(row.endingBalance)}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  )
}
