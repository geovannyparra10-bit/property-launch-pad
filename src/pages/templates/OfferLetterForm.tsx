import { DollarSign, Calendar, User, MapPin, Phone, Mail } from 'lucide-react'
import type { OfferLetterFormData, FinancingType } from './offerLetterTypes'

interface Props {
  data: OfferLetterFormData
  onChange: (field: keyof OfferLetterFormData, value: string | boolean) => void
  lang: 'en' | 'es'
}

const L = {
  en: {
    buyerInfo: 'Buyer Information',
    sellerInfo: 'Seller Information',
    propertyInfo: 'Property',
    offerTerms: 'Offer Terms',
    financing: 'Financing Type',
    contingencies: 'Contingencies',
    included: 'Included Items',
    excluded: 'Excluded Items',
    expiration: 'Offer Expiration',
    personalNote: 'Personal Note to Seller',
    fullName: 'Full Name',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    sellerName: 'Seller Name (or "To Whom It May Concern")',
    propertyAddress: 'Property Address',
    offerPrice: 'Offer Price',
    earnestMoney: 'Earnest Money Deposit',
    downPayment: 'Down Payment',
    conventional: 'Conventional',
    fha: 'FHA',
    va: 'VA',
    cash: 'Cash',
    ownerFinance: 'Owner Finance',
    inspection: 'Inspection',
    appraisal: 'Appraisal',
    financingCont: 'Financing',
    saleOfHome: 'Sale of Current Home',
    inspectionDays: 'Inspection Period (days)',
    financingDays: 'Financing Contingency (days)',
    closingDate: 'Proposed Closing Date',
    appliances: 'Appliances',
    fixtures: 'Fixtures',
    windowTreatments: 'Window Treatments',
    otherIncluded: 'Other Included Items',
    excludedItems: 'Excluded Items',
    expirationDate: 'Offer Expiration Date',
    personalNotePlaceholder: 'Write a brief personal note to the seller...',
    optional: 'optional',
  },
  es: {
    buyerInfo: 'Información del Comprador',
    sellerInfo: 'Información del Vendedor',
    propertyInfo: 'Propiedad',
    offerTerms: 'Términos de la Oferta',
    financing: 'Tipo de Financiamiento',
    contingencies: 'Contingencias',
    included: 'Artículos Incluidos',
    excluded: 'Artículos Excluidos',
    expiration: 'Expiración de la Oferta',
    personalNote: 'Nota Personal al Vendedor',
    fullName: 'Nombre Completo',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo Electrónico',
    sellerName: 'Nombre del Vendedor (o "A Quien Corresponda")',
    propertyAddress: 'Dirección de la Propiedad',
    offerPrice: 'Precio de Oferta',
    earnestMoney: 'Depósito de Arras',
    downPayment: 'Pago Inicial',
    conventional: 'Convencional',
    fha: 'FHA',
    va: 'VA',
    cash: 'Efectivo',
    ownerFinance: 'Financiamiento por Vendedor',
    inspection: 'Inspección',
    appraisal: 'Avalúo',
    financingCont: 'Financiamiento',
    saleOfHome: 'Venta del Hogar Actual',
    inspectionDays: 'Período de Inspección (días)',
    financingDays: 'Contingencia de Financiamiento (días)',
    closingDate: 'Fecha de Cierre Propuesta',
    appliances: 'Electrodomésticos',
    fixtures: 'Accesorios',
    windowTreatments: 'Persianas/Cortinas',
    otherIncluded: 'Otros Artículos Incluidos',
    excludedItems: 'Artículos Excluidos',
    expirationDate: 'Fecha de Expiración de la Oferta',
    personalNotePlaceholder: 'Escribe una nota personal breve al vendedor...',
    optional: 'opcional',
  },
}

const inputClass = 'w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500'
const iconInputClass = 'w-full pl-9 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500'
const labelClass = 'block text-xs font-medium text-gray-400 mb-1.5'
const sectionClass = 'bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4'
const sectionTitle = 'text-base font-bold text-white mb-4'

function IconInput({ icon: Icon, ...props }: { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input className={iconInputClass} {...props} />
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

const FINANCING_OPTIONS: { value: FinancingType; labelKey: keyof typeof L['en'] }[] = [
  { value: 'conventional', labelKey: 'conventional' },
  { value: 'fha', labelKey: 'fha' },
  { value: 'va', labelKey: 'va' },
  { value: 'cash', labelKey: 'cash' },
  { value: 'owner-finance', labelKey: 'ownerFinance' },
]

export function OfferLetterForm({ data, onChange, lang }: Props) {
  const l = L[lang]
  const ch = (field: keyof OfferLetterFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(field, e.target.value)

  return (
    <div className="space-y-5">
      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.buyerInfo}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{l.fullName}</label>
            <IconInput icon={User} value={data.buyerName} onChange={ch('buyerName')} placeholder="Jane Smith" />
          </div>
          <div>
            <label className={labelClass}>{l.phone}</label>
            <IconInput icon={Phone} value={data.buyerPhone} onChange={ch('buyerPhone')} placeholder="(555) 000-0000" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.address}</label>
            <IconInput icon={MapPin} value={data.buyerAddress} onChange={ch('buyerAddress')} placeholder="123 Main St, City, State ZIP" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{l.email}</label>
            <IconInput icon={Mail} value={data.buyerEmail} onChange={ch('buyerEmail')} placeholder="buyer@email.com" type="email" />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.sellerInfo}</h3>
        <div>
          <label className={labelClass}>{l.sellerName}</label>
          <IconInput icon={User} value={data.sellerName} onChange={ch('sellerName')} placeholder='John Doe or "To Whom It May Concern"' />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.propertyInfo}</h3>
        <div>
          <label className={labelClass}>{l.propertyAddress}</label>
          <IconInput icon={MapPin} value={data.propertyAddress} onChange={ch('propertyAddress')} placeholder="456 Oak Ave, City, State ZIP" />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.offerTerms}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>{l.offerPrice}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className={iconInputClass} value={data.offerPrice} onChange={ch('offerPrice')} placeholder="250,000" />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.earnestMoney}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className={iconInputClass} value={data.earnestMoney} onChange={ch('earnestMoney')} placeholder="2,500" />
            </div>
          </div>
          <div>
            <label className={labelClass}>{l.downPayment}</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className={iconInputClass} value={data.downPayment} onChange={ch('downPayment')} placeholder="50,000" />
            </div>
          </div>
        </div>
        <div>
          <label className={labelClass}>{l.closingDate}</label>
          <div className="max-w-xs">
            <IconInput icon={Calendar} type="date" value={data.closingDate} onChange={ch('closingDate')} />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.financing}</h3>
        <div className="flex flex-wrap gap-2">
          {FINANCING_OPTIONS.map(({ value, labelKey }) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange('financingType', value)}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                data.financingType === value
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
              }`}
            >
              {l[labelKey] as string}
            </button>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.contingencies}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Checkbox checked={data.contingencyInspection} onChange={(v) => onChange('contingencyInspection', v)} label={l.inspection} />
          <Checkbox checked={data.contingencyAppraisal} onChange={(v) => onChange('contingencyAppraisal', v)} label={l.appraisal} />
          <Checkbox checked={data.contingencyFinancing} onChange={(v) => onChange('contingencyFinancing', v)} label={l.financingCont} />
          <Checkbox checked={data.contingencySaleOfHome} onChange={(v) => onChange('contingencySaleOfHome', v)} label={l.saleOfHome} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.contingencyInspection && (
            <div>
              <label className={labelClass}>{l.inspectionDays}</label>
              <input className={inputClass} value={data.inspectionDays} onChange={ch('inspectionDays')} placeholder="10" />
            </div>
          )}
          {data.contingencyFinancing && (
            <div>
              <label className={labelClass}>{l.financingDays}</label>
              <input className={inputClass} value={data.financingDays} onChange={ch('financingDays')} placeholder="21" />
            </div>
          )}
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.included}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Checkbox checked={data.includedAppliances} onChange={(v) => onChange('includedAppliances', v)} label={l.appliances} />
          <Checkbox checked={data.includedFixtures} onChange={(v) => onChange('includedFixtures', v)} label={l.fixtures} />
          <Checkbox checked={data.includedWindowTreatments} onChange={(v) => onChange('includedWindowTreatments', v)} label={l.windowTreatments} />
        </div>
        <div>
          <label className={labelClass}>{l.otherIncluded} <span className="text-gray-600 font-normal">({l.optional})</span></label>
          <input className={inputClass} value={data.includedOther} onChange={ch('includedOther')} placeholder="Shed, swing set..." />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.excluded}</h3>
        <label className={labelClass}>{l.excludedItems} <span className="text-gray-600 font-normal">({l.optional})</span></label>
        <input className={inputClass} value={data.excludedItems} onChange={ch('excludedItems')} placeholder="Dining room chandelier, garage shelving..." />
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.expiration}</h3>
        <div className="max-w-xs">
          <label className={labelClass}>{l.expirationDate}</label>
          <IconInput icon={Calendar} type="date" value={data.offerExpirationDate} onChange={ch('offerExpirationDate')} />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className={sectionTitle}>{l.personalNote} <span className="text-gray-600 font-normal text-sm">({l.optional})</span></h3>
        <textarea
          value={data.personalNote}
          onChange={ch('personalNote')}
          rows={4}
          placeholder={l.personalNotePlaceholder}
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500 resize-none"
        />
      </div>
    </div>
  )
}
