export interface LeaseFormData {
  landlordName: string
  landlordAddress: string
  landlordPhone: string
  landlordEmail: string

  tenantName: string
  tenantPhone: string
  tenantEmail: string

  propertyAddress: string
  unitNumber: string

  leaseType: 'fixed' | 'month-to-month'
  leaseStartDate: string
  leaseEndDate: string

  monthlyRent: string
  rentDueDay: '1st' | '15th'

  securityDeposit: string

  lateFeeAmount: string
  lateFeeGraceDays: string

  petPolicy: 'no-pets' | 'pets-allowed' | 'service-only'
  petDeposit: string

  utilitiesWater: boolean
  utilitiesElectric: boolean
  utilitiesGas: boolean
  utilitiesTrash: boolean
  utilitiesInternet: boolean

  maintenanceResponsibility: 'landlord-all' | 'tenant-minor'
  tenantMaintenanceLimit: string

  maxOccupants: string

  parking: 'included' | 'additional-fee' | 'not-included'
  parkingFee: string

  earlyTerminationFee: string
  noticeToVacateDays: string

  governingState: string
}

export const defaultLeaseData: LeaseFormData = {
  landlordName: '',
  landlordAddress: '',
  landlordPhone: '',
  landlordEmail: '',
  tenantName: '',
  tenantPhone: '',
  tenantEmail: '',
  propertyAddress: '',
  unitNumber: '',
  leaseType: 'fixed',
  leaseStartDate: '',
  leaseEndDate: '',
  monthlyRent: '',
  rentDueDay: '1st',
  securityDeposit: '',
  lateFeeAmount: '50',
  lateFeeGraceDays: '5',
  petPolicy: 'no-pets',
  petDeposit: '',
  utilitiesWater: false,
  utilitiesElectric: false,
  utilitiesGas: false,
  utilitiesTrash: false,
  utilitiesInternet: false,
  maintenanceResponsibility: 'landlord-all',
  tenantMaintenanceLimit: '100',
  maxOccupants: '',
  parking: 'included',
  parkingFee: '',
  earlyTerminationFee: '',
  noticeToVacateDays: '30',
  governingState: 'Texas',
}
