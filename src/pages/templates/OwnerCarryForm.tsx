import { DollarSign, Percent, Calendar, User, MapPin, Phone, Mail, FileText } from 'lucide-react'
import type { OwnerCarryFormData } from './ownerCarryTypes'
import { US_STATES } from './ownerCarryTypes'

interface Props {
  data: OwnerCarryFormData
  onChange: (field: keyof OwnerCarryFormData, value: string) => void
  lang: 'en' | 'es'
}

const L = {
  en: {
    sellerInfo: 'Seller Information',
    buyerInfo: 'Buyer Information',
    propertyDetails: 'Property Details',
    financingTerms: 'Financing Terms',
    balloonSection: 'Balloon Payment',
    loanConditions: 'Loan Conditions',
    responsibilities: 'Tax & Insurance Responsibilities',
    closing: 'Closing Details',
    fullName: 'Full Name',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    propertyAddress: 'Property Address',
    legalDescription: 'Legal Description',
    purchasePrice: 'Purchase Price',
    downPayment: 'Down Payment Amount',
    downPaymentDue: 'Down Payment Due Date',
    loanAmount: 'Loan Amount (Principal)',
    interestRate: 'Interest Rate (%)',
    loanTerm: 'Loan Term (Years)',
    monthlyPayment: 'Monthly Payment Amount',
    paymentDueDay: 'Payment Due Day',
    balloonEnabled: 'Balloon Payment',
    balloonAmount: 'Balloon Amount',
    balloonDueDate: 'Balloon Due Date',
    lateFeePercent: 'Late Fee (%)',
    lateFeeGraceDays: 'Grace Period (Days)',
    defaultDays: 'Days Before Default',
    prepaymentPenalty: 'Prepayment Penalty',
    taxResp: 'Property Tax Responsibility',
    insResp: 'Insurance Responsibility',
    closingDate: 'Closing Date',
    governingState: 'Governing State',
    yes: 'Yes',
    no: 'No',
    buyer: 'Buyer',
    seller: 'Seller',
    first: '1st of Month',
    fifteenth: '15th of Month',
  },
  es: {
    sellerInfo: 'Información del Vendedor',
    buyerInfo: 'Información del Comprador',
    propertyDetails: 'Detalles de la Propiedad',
    financingTerms: 'Términos de Financiamiento',
    balloonSection: 'Pago Globo (Balloon)',
    loanConditions: 'Condiciones del Préstamo',
    responsibilities: 'Responsabilidades de Impuestos y Seguro',
    closing: 'Detalles del Cierre',
    fullName: 'Nombre Completo',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo Electrónico',
    propertyAddress: 'Dirección de la Propiedad',
    legalDescription: 'Descripción Legal',
    purchasePrice: 'Precio de Compra',
    downPayment: 'Monto del Enganche',
    downPaymentDue: 'Fecha de Vencimiento del Enganche',
    loanAmount: 'Monto del Préstamo (Principal)',
    interestRate: 'Tasa de Interés (%)',
    loanTerm: 'Plazo del Préstamo (Años)',
    monthlyPayment: 'Monto del Pago Mensual',
    paymentDueDay: 'Día de Vencimiento del Pago',
    balloonEnabled: 'Pago Globo',
    balloonAmount: 'Monto del Pago Globo',
    balloonDueDate: 'Fecha de Vencimiento del Pago Globo',
    lateFeePercent: 'Cargo por Mora (%)',
    lateFeeGraceDays: 'Período de Gracia (Días)',
    defaultDays: 'Días Antes de Incumplimiento',
    prepaymentPenalty: 'Penalización por Pago Anticipado',
    taxResp: 'Responsabilidad de Impuestos sobre la Propiedad',
    insResp: 'Responsabilidad del Seguro',
    closingDate: 'Fecha de Cierre',
    governingState: 'Estado Gobernante',
    yes: 'Sí',
    no: 'No',
    buyer: 'Comprador',
    seller: 'Vendedor',
    first: 'Día 1 del Mes',
    fifteenth: 'Día 15 del Mes',
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
    <div className="flex gap-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
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

export function OwnerCarryForm({ data, onChange, lang }: Props) {
  const l = L[lang]
  const ch = (field: keyof OwnerCarryFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(field, e.target.value)

  return (
    <div className="space-y-5">
      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.sellerInfo}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.fullName}</label>
            <IconInput icon={User} value={data.sellerName} onChange={ch('sellerName')} placeholder="John Smith" />
          </div>
          <div>
            <label className={labelClass}>{l.phone}</label>
            <IconInput icon={Phone} value={data.sellerPhone} onChange={ch('sellerPhone')} placeholder="(555) 000-0000" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.address}</label>
            <IconInput icon={MapPin} value={data.sellerAddress} onChange={ch('sellerAddress')} placeholder="123 Main St, City, State ZIP" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.email}</label>
            <IconInput icon={Mail} value={data.sellerEmail} onChange={ch('sellerEmail')} placeholder="seller@email.com" type="email" />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.buyerInfo}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.fullName}</label>
            <IconInput icon={User} value={data.buyerName} onChange={ch('buyerName')} placeholder="Jane Doe" />
          </div>
          <div>
            <label className={labelClass}>{l.phone}</label>
            <IconInput icon={Phone} value={data.buyerPhone} onChange={ch('buyerPhone')} placeholder="(555) 000-0000" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.address}</label>
            <IconInput icon={MapPin} value={data.buyerAddress} onChange={ch('buyerAddress')} placeholder="456 Oak Ave, City, State ZIP" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.email}</label>
            <IconInput icon={Mail} value={data.buyerEmail} onChange={ch('buyerEmail')} placeholder="buyer@email.com" type="email" />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.propertyDetails}</h3>
        <div>
          <label className={labelClass}>{l.propertyAddress}</label>
          <IconInput icon={MapPin} value={data.propertyAddress} onChange={ch('propertyAddress')} placeholder="789 Property Rd, City, State ZIP" />
        </div>
        <div>
          <label className={labelClass}>{l.legalDescription}</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              value={data.legalDescription}
              onChange={ch('legalDescription')}
              rows={3}
              placeholder="Lot 5, Block 12, Sunrise Subdivision, City County..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.financingTerms}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.purchasePrice}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.purchasePrice} onChange={ch('purchasePrice')} placeholder="250,000" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.downPayment}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.downPaymentAmount} onChange={ch('downPaymentAmount')} placeholder="25,000" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.downPaymentDue}</label>
            <IconInput icon={Calendar} type="date" value={data.downPaymentDueDate} onChange={ch('downPaymentDueDate')} />
          </div>
          <div>
            <label className={labelClass}>{l.loanAmount}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.loanAmount} onChange={ch('loanAmount')} placeholder="225,000" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.interestRate}</label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.interestRate} onChange={ch('interestRate')} placeholder="7.0" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.loanTerm}</label>
            <input type="text" value={data.loanTermYears} onChange={ch('loanTermYears')} placeholder="5" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{l.monthlyPayment}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.monthlyPaymentAmount} onChange={ch('monthlyPaymentAmount')} placeholder="1,497.00" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.paymentDueDay}</label>
            <RadioGroup
              value={data.paymentDueDay}
              onChange={(v) => onChange('paymentDueDay', v)}
              options={[
                { value: '1st', label: l.first },
                { value: '15th', label: l.fifteenth },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.balloonSection}</h3>
        <div>
          <label className={labelClass}>{l.balloonEnabled}</label>
          <RadioGroup
            value={data.balloonPayment}
            onChange={(v) => onChange('balloonPayment', v)}
            options={[
              { value: 'yes', label: l.yes },
              { value: 'no', label: l.no },
            ]}
          />
        </div>
        {data.balloonPayment === 'yes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className={labelClass}>{l.balloonAmount}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={data.balloonAmount} onChange={ch('balloonAmount')} placeholder="210,000" className={iconInputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>{l.balloonDueDate}</label>
              <IconInput icon={Calendar} type="date" value={data.balloonDueDate} onChange={ch('balloonDueDate')} />
            </div>
          </div>
        )}
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.loanConditions}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>{l.lateFeePercent}</label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={data.lateFeePercent} onChange={ch('lateFeePercent')} placeholder="5" className={iconInputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.lateFeeGraceDays}</label>
            <input type="text" value={data.lateFeeGraceDays} onChange={ch('lateFeeGraceDays')} placeholder="15" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{l.defaultDays}</label>
            <input type="text" value={data.defaultDays} onChange={ch('defaultDays')} placeholder="30" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{l.prepaymentPenalty}</label>
          <RadioGroup
            value={data.prepaymentPenalty}
            onChange={(v) => onChange('prepaymentPenalty', v)}
            options={[
              { value: 'yes', label: l.yes },
              { value: 'no', label: l.no },
            ]}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.responsibilities}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{l.taxResp}</label>
            <RadioGroup
              value={data.propertyTaxResponsibility}
              onChange={(v) => onChange('propertyTaxResponsibility', v)}
              options={[
                { value: 'buyer', label: l.buyer },
                { value: 'seller', label: l.seller },
              ]}
            />
          </div>
          <div>
            <label className={labelClass}>{l.insResp}</label>
            <RadioGroup
              value={data.insuranceResponsibility}
              onChange={(v) => onChange('insuranceResponsibility', v)}
              options={[
                { value: 'buyer', label: l.buyer },
                { value: 'seller', label: l.seller },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.closing}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.closingDate}</label>
            <IconInput icon={Calendar} type="date" value={data.closingDate} onChange={ch('closingDate')} />
          </div>
          <div>
            <label className={labelClass}>{l.governingState}</label>
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
      </div>
    </div>
  )
}
