export type FinancingType = 'conventional' | 'fha' | 'va' | 'cash' | 'owner-finance'

export interface OfferLetterFormData {
  buyerName: string
  buyerAddress: string
  buyerPhone: string
  buyerEmail: string

  sellerName: string

  propertyAddress: string

  offerPrice: string
  earnestMoney: string
  downPayment: string

  financingType: FinancingType

  contingencyInspection: boolean
  contingencyAppraisal: boolean
  contingencyFinancing: boolean
  contingencySaleOfHome: boolean
  inspectionDays: string
  financingDays: string

  closingDate: string

  includedAppliances: boolean
  includedFixtures: boolean
  includedWindowTreatments: boolean
  includedOther: string

  excludedItems: string

  offerExpirationDate: string
  personalNote: string
}

export const defaultOfferLetterData = (): OfferLetterFormData => {
  const today = new Date()
  const expDate = new Date(today)
  expDate.setDate(expDate.getDate() + 3)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return {
    buyerName: '',
    buyerAddress: '',
    buyerPhone: '',
    buyerEmail: '',
    sellerName: '',
    propertyAddress: '',
    offerPrice: '',
    earnestMoney: '',
    downPayment: '',
    financingType: 'conventional',
    contingencyInspection: true,
    contingencyAppraisal: true,
    contingencyFinancing: true,
    contingencySaleOfHome: false,
    inspectionDays: '10',
    financingDays: '21',
    closingDate: '',
    includedAppliances: false,
    includedFixtures: false,
    includedWindowTreatments: false,
    includedOther: '',
    excludedItems: '',
    offerExpirationDate: fmt(expDate),
    personalNote: '',
  }
}
