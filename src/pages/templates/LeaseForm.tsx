import { DollarSign, Calendar, User, MapPin, Phone, Mail, Hash } from 'lucide-react'
import type { LeaseFormData } from './leaseTypes'
import { US_STATES } from './ownerCarryTypes'

interface Props {
  data: LeaseFormData
  onChange: (field: keyof LeaseFormData, value: string | boolean) => void
  lang: 'en' | 'es'
}

const L = {
  en: {
    landlordInfo: 'Landlord Information',
    tenantInfo: 'Tenant Information',
    propertyDetails: 'Property Details',
    leaseTerm: 'Lease Term',
    rentDeposit: 'Rent & Security Deposit',
    lateFees: 'Late Fees',
    petPolicy: 'Pet Policy',
    utilities: 'Utilities Included in Rent',
    maintenance: 'Maintenance Responsibility',
    occupancyParking: 'Occupancy & Parking',
    termination: 'Termination Terms',
    governingLaw: 'Governing Law',
    fullName: 'Full Name',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    propertyAddress: 'Property Address',
    unitNumber: 'Unit Number',
    leaseType: 'Lease Type',
    fixed: 'Fixed-Term',
    monthToMonth: 'Month-to-Month',
    startDate: 'Lease Start Date',
    endDate: 'Lease End Date',
    monthlyRent: 'Monthly Rent',
    rentDueDay: 'Rent Due Day',
    first: '1st of Month',
    fifteenth: '15th of Month',
    securityDeposit: 'Security Deposit',
    lateFeeAmount: 'Late Fee Amount',
    lateFeeGrace: 'Grace Period (Days)',
    noPets: 'No Pets',
    petsAllowed: 'Pets Allowed',
    serviceOnly: 'Service Animals Only',
    petDeposit: 'Pet Deposit Amount',
    water: 'Water',
    electric: 'Electric',
    gas: 'Gas',
    trash: 'Trash',
    internet: 'Internet',
    landlordAll: 'Landlord Handles All',
    tenantMinor: 'Tenant Handles Minor (under $X)',
    tenantLimit: 'Tenant Repair Limit ($)',
    maxOccupants: 'Max Occupants Allowed',
    parkingIncluded: 'Included',
    parkingFee: 'Additional Fee',
    parkingNone: 'Not Included',
    parkingFeeAmount: 'Monthly Parking Fee',
    earlyTermFee: 'Early Termination Fee',
    noticeVacate: 'Notice to Vacate (Days)',
    governingState: 'Governing State',
    yes: 'Yes',
    no: 'No',
  },
  es: {
    landlordInfo: 'Información del Arrendador',
    tenantInfo: 'Información del Arrendatario',
    propertyDetails: 'Detalles de la Propiedad',
    leaseTerm: 'Vigencia del Contrato',
    rentDeposit: 'Renta y Depósito en Garantía',
    lateFees: 'Cargos por Mora',
    petPolicy: 'Política de Mascotas',
    utilities: 'Servicios Incluidos en la Renta',
    maintenance: 'Responsabilidad de Mantenimiento',
    occupancyParking: 'Ocupación y Estacionamiento',
    termination: 'Términos de Terminación',
    governingLaw: 'Ley Aplicable',
    fullName: 'Nombre Completo',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo Electrónico',
    propertyAddress: 'Dirección de la Propiedad',
    unitNumber: 'Número de Unidad',
    leaseType: 'Tipo de Contrato',
    fixed: 'Plazo Fijo',
    monthToMonth: 'Mes a Mes',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Terminación',
    monthlyRent: 'Renta Mensual',
    rentDueDay: 'Día de Vencimiento',
    first: 'Día 1 del Mes',
    fifteenth: 'Día 15 del Mes',
    securityDeposit: 'Depósito en Garantía',
    lateFeeAmount: 'Cargo por Mora',
    lateFeeGrace: 'Período de Gracia (Días)',
    noPets: 'Sin Mascotas',
    petsAllowed: 'Mascotas Permitidas',
    serviceOnly: 'Solo Animales de Servicio',
    petDeposit: 'Depósito por Mascotas',
    water: 'Agua',
    electric: 'Electricidad',
    gas: 'Gas',
    trash: 'Basura',
    internet: 'Internet',
    landlordAll: 'Arrendador se Encarga de Todo',
    tenantMinor: 'Arrendatario Maneja Menores (menos de $X)',
    tenantLimit: 'Límite de Reparación del Arrendatario ($)',
    maxOccupants: 'Máx. Ocupantes Permitidos',
    parkingIncluded: 'Incluido',
    parkingFee: 'Cargo Adicional',
    parkingNone: 'No Incluido',
    parkingFeeAmount: 'Cargo Mensual de Estacionamiento',
    earlyTermFee: 'Penalización por Terminación Anticipada',
    noticeVacate: 'Aviso de Desocupación (Días)',
    governingState: 'Estado Gobernante',
    yes: 'Sí',
    no: 'No',
  },
}

const inputClass = 'w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors'
const iconInputClass = 'w-full pl-9 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors'
const labelClass = 'block text-xs font-medium text-gray-400 mb-1.5'
const sectionClass = 'bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4'
const sectionTitle = 'text-base font-bold text-white mb-4'

function IconInput({ icon: Icon, ...props }: { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input className={iconInputClass} {...props} />
    </div>
  )
}

function RadioGroup({ value, onChange, options }: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
            value === o.value
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
        checked
          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
          : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
      }`}
    >
      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? 'bg-blue-500 border-blue-500' : 'border-gray-500'
      }`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

export function LeaseForm({ data, onChange, lang }: Props) {
  const l = L[lang]
  const ch = (field: keyof LeaseFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(field, e.target.value)

  return (
    <div className="space-y-5">
      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.landlordInfo}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.fullName}</label>
            <IconInput icon={User} value={data.landlordName} onChange={ch('landlordName')} placeholder="Jane Smith" />
          </div>
          <div>
            <label className={labelClass}>{l.phone}</label>
            <IconInput icon={Phone} value={data.landlordPhone} onChange={ch('landlordPhone')} placeholder="(555) 000-0000" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.address}</label>
            <IconInput icon={MapPin} value={data.landlordAddress} onChange={ch('landlordAddress')} placeholder="123 Main St, City, State ZIP" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.email}</label>
            <IconInput icon={Mail} value={data.landlordEmail} onChange={ch('landlordEmail')} placeholder="landlord@email.com" type="email" />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.tenantInfo}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.fullName}</label>
            <IconInput icon={User} value={data.tenantName} onChange={ch('tenantName')} placeholder="John Doe" />
          </div>
          <div>
            <label className={labelClass}>{l.phone}</label>
            <IconInput icon={Phone} value={data.tenantPhone} onChange={ch('tenantPhone')} placeholder="(555) 000-0000" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.email}</label>
            <IconInput icon={Mail} value={data.tenantEmail} onChange={ch('tenantEmail')} placeholder="tenant@email.com" type="email" />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.propertyDetails}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className={labelClass}>{l.propertyAddress}</label>
            <IconInput icon={MapPin} value={data.propertyAddress} onChange={ch('propertyAddress')} placeholder="456 Oak Ave, City, State ZIP" />
          </div>
          <div>
            <label className={labelClass}>{l.unitNumber}</label>
            <IconInput icon={Hash} value={data.unitNumber} onChange={ch('unitNumber')} placeholder="2B" />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.leaseTerm}</h3>
        <div>
          <label className={labelClass}>{l.leaseType}</label>
          <RadioGroup
            value={data.leaseType}
            onChange={(v) => onChange('leaseType', v)}
            options={[
              { value: 'fixed', label: l.fixed },
              { value: 'month-to-month', label: l.monthToMonth },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.startDate}</label>
            <IconInput icon={Calendar} type="date" value={data.leaseStartDate} onChange={ch('leaseStartDate')} />
          </div>
          {data.leaseType === 'fixed' && (
            <div>
              <label className={labelClass}>{l.endDate}</label>
              <IconInput icon={Calendar} type="date" value={data.leaseEndDate} onChange={ch('leaseEndDate')} />
            </div>
          )}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.rentDeposit}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.monthlyRent}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.monthlyRent} onChange={ch('monthlyRent')} placeholder="1,500" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.securityDeposit}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.securityDeposit} onChange={ch('securityDeposit')} placeholder="1,500" className={iconInputClass} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.rentDueDay}</label>
            <RadioGroup
              value={data.rentDueDay}
              onChange={(v) => onChange('rentDueDay', v)}
              options={[
                { value: '1st', label: l.first },
                { value: '15th', label: l.fifteenth },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.lateFees}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.lateFeeAmount}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.lateFeeAmount} onChange={ch('lateFeeAmount')} placeholder="50" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.lateFeeGrace}</label>
            <input type="text" value={data.lateFeeGraceDays} onChange={ch('lateFeeGraceDays')} placeholder="5" className={inputClass} />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.petPolicy}</h3>
        <RadioGroup
          value={data.petPolicy}
          onChange={(v) => onChange('petPolicy', v)}
          options={[
            { value: 'no-pets', label: l.noPets },
            { value: 'pets-allowed', label: l.petsAllowed },
            { value: 'service-only', label: l.serviceOnly },
          ]}
        />
        {data.petPolicy === 'pets-allowed' && (
          <div className="pt-1">
            <label className={labelClass}>{l.petDeposit}</label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.petDeposit} onChange={ch('petDeposit')} placeholder="250" className={iconInputClass} />
            </div>
          </div>
        )}
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.utilities}</h3>
        <div className="flex flex-wrap gap-2">
          {([
            { field: 'utilitiesWater', label: l.water },
            { field: 'utilitiesElectric', label: l.electric },
            { field: 'utilitiesGas', label: l.gas },
            { field: 'utilitiesTrash', label: l.trash },
            { field: 'utilitiesInternet', label: l.internet },
          ] as { field: keyof LeaseFormData; label: string }[]).map((u) => (
            <Checkbox
              key={u.field}
              checked={data[u.field] as boolean}
              onChange={(v) => onChange(u.field, v)}
              label={u.label}
            />
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.maintenance}</h3>
        <RadioGroup
          value={data.maintenanceResponsibility}
          onChange={(v) => onChange('maintenanceResponsibility', v)}
          options={[
            { value: 'landlord-all', label: l.landlordAll },
            { value: 'tenant-minor', label: l.tenantMinor },
          ]}
        />
        {data.maintenanceResponsibility === 'tenant-minor' && (
          <div className="pt-1">
            <label className={labelClass}>{l.tenantLimit}</label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.tenantMaintenanceLimit} onChange={ch('tenantMaintenanceLimit')} placeholder="100" className={iconInputClass} />
            </div>
          </div>
        )}
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.occupancyParking}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.maxOccupants}</label>
            <input type="text" value={data.maxOccupants} onChange={ch('maxOccupants')} placeholder="2" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Parking</label>
          <RadioGroup
            value={data.parking}
            onChange={(v) => onChange('parking', v)}
            options={[
              { value: 'included', label: l.parkingIncluded },
              { value: 'additional-fee', label: l.parkingFee },
              { value: 'not-included', label: l.parkingNone },
            ]}
          />
        </div>
        {data.parking === 'additional-fee' && (
          <div className="pt-1">
            <label className={labelClass}>{l.parkingFeeAmount}</label>
            <div className="relative max-w-xs">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.parkingFee} onChange={ch('parkingFee')} placeholder="75" className={iconInputClass} />
            </div>
          </div>
        )}
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.termination}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.earlyTermFee}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.earlyTerminationFee} onChange={ch('earlyTerminationFee')} placeholder="3,000" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.noticeVacate}</label>
            <input type="text" value={data.noticeToVacateDays} onChange={ch('noticeToVacateDays')} placeholder="30" className={inputClass} />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.governingLaw}</h3>
        <select
          value={data.governingState}
          onChange={ch('governingState')}
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
        >
          {US_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
