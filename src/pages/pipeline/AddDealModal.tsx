import { useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface Props {
  onClose: () => void
  onAdd: (payload: {
    address: string
    purchase_price: number
    offer_price?: number | null
    notes?: string | null
  }) => Promise<unknown>
}

export function AddDealModal({ onClose, onAdd }: Props) {
  const { language } = useLanguage()
  const [address, setAddress] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const t = (en: string, es: string) => (language === 'en' ? en : es)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) { setError(t('Property address is required.', 'La dirección es requerida.')); return }
    const pp = parseFloat(purchasePrice.replace(/,/g, ''))
    if (isNaN(pp) || pp <= 0) { setError(t('Enter a valid purchase price.', 'Ingresa un precio de compra válido.')); return }
    setSaving(true)
    try {
      await onAdd({
        address: address.trim(),
        purchase_price: pp,
        offer_price: offerPrice ? parseFloat(offerPrice.replace(/,/g, '')) || null : null,
        notes: notes.trim() || null,
      })
      onClose()
    } catch {
      setError(t('Failed to add deal. Try again.', 'Error al agregar el negocio. Inténtalo de nuevo.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-white font-bold text-lg">{t('Add New Deal', 'Agregar Nuevo Negocio')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-900/40 border border-red-700/50 rounded-lg px-3 py-2 text-red-300 text-sm">{error}</div>
          )}
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {t('Property Address', 'Dirección de la Propiedad')} *
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('123 Main St, City, State', '123 Calle Principal, Ciudad, Estado')}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {t('Purchase / Asking Price', 'Precio de Compra / Venta')} *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="250,000"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-7 pr-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {t('Your Offer Price', 'Tu Precio de Oferta')}{' '}
              <span className="text-gray-600 normal-case font-normal">({t('optional', 'opcional')})</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="220,000"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-7 pr-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {t('Notes', 'Notas')}{' '}
              <span className="text-gray-600 normal-case font-normal">({t('optional', 'opcional')})</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder={t('Add any notes about this deal...', 'Agrega notas sobre este negocio...')}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-semibold text-sm transition-colors"
            >
              {t('Cancel', 'Cancelar')}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              {saving ? t('Adding...', 'Agregando...') : t('Add Deal', 'Agregar Negocio')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
