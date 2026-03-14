export interface OwnerCarryFormData {
  sellerName: string
  sellerAddress: string
  sellerPhone: string
  sellerEmail: string

  buyerName: string
  buyerAddress: string
  buyerPhone: string
  buyerEmail: string

  propertyAddress: string
  legalDescription: string

  purchasePrice: string
  downPaymentAmount: string
  downPaymentDueDate: string

  loanAmount: string
  interestRate: string
  loanTermYears: string
  monthlyPaymentAmount: string
  paymentDueDay: '1st' | '15th'

  balloonPayment: 'yes' | 'no'
  balloonAmount: string
  balloonDueDate: string

  lateFeePercent: string
  lateFeeGraceDays: string

  defaultDays: string

  prepaymentPenalty: 'yes' | 'no'

  propertyTaxResponsibility: 'buyer' | 'seller'
  insuranceResponsibility: 'buyer' | 'seller'

  closingDate: string
  governingState: string
}

export const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
]

export const defaultFormData: OwnerCarryFormData = {
  sellerName: '',
  sellerAddress: '',
  sellerPhone: '',
  sellerEmail: '',
  buyerName: '',
  buyerAddress: '',
  buyerPhone: '',
  buyerEmail: '',
  propertyAddress: '',
  legalDescription: '',
  purchasePrice: '',
  downPaymentAmount: '',
  downPaymentDueDate: '',
  loanAmount: '',
  interestRate: '',
  loanTermYears: '',
  monthlyPaymentAmount: '',
  paymentDueDay: '1st',
  balloonPayment: 'no',
  balloonAmount: '',
  balloonDueDate: '',
  lateFeePercent: '5',
  lateFeeGraceDays: '15',
  defaultDays: '30',
  prepaymentPenalty: 'no',
  propertyTaxResponsibility: 'buyer',
  insuranceResponsibility: 'buyer',
  closingDate: '',
  governingState: 'Texas',
}
