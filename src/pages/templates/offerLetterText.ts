import type { OfferLetterFormData, FinancingType } from './offerLetterTypes'

function fmt(n: string) {
  const num = parseFloat(n.replace(/,/g, ''))
  if (isNaN(num)) return n || '___________'
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function fmtDate(iso: string, lang: 'en' | 'es') {
  if (!iso) return '___________'
  try {
    return new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function financingLabel(type: FinancingType, lang: 'en' | 'es') {
  const map: Record<FinancingType, [string, string]> = {
    conventional: ['Conventional Mortgage Financing', 'Financiamiento Hipotecario Convencional'],
    fha: ['FHA Loan Financing', 'Financiamiento con Préstamo FHA'],
    va: ['VA Loan Financing', 'Financiamiento con Préstamo VA'],
    cash: ['All-Cash (no financing contingency)', 'Compra en Efectivo (sin contingencia de financiamiento)'],
    'owner-finance': ['Owner/Seller Financing', 'Financiamiento por el Vendedor'],
  }
  return map[type][lang === 'en' ? 0 : 1]
}

export function generateOfferLetterHTML(data: OfferLetterFormData, lang: 'en' | 'es'): string {
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const seller = data.sellerName.trim() || (lang === 'en' ? 'To Whom It May Concern' : 'A Quien Corresponda')
  const buyer = data.buyerName.trim() || '___________'
  const property = data.propertyAddress.trim() || '___________'

  const includedItems: string[] = []
  if (data.includedAppliances) includedItems.push(lang === 'en' ? 'All appliances' : 'Todos los electrodomésticos')
  if (data.includedFixtures) includedItems.push(lang === 'en' ? 'All fixtures' : 'Todos los accesorios')
  if (data.includedWindowTreatments) includedItems.push(lang === 'en' ? 'Window treatments' : 'Persianas y cortinas')
  if (data.includedOther.trim()) includedItems.push(data.includedOther.trim())

  const contingencies: string[] = []
  if (data.contingencyInspection)
    contingencies.push(lang === 'en'
      ? `Inspection contingency (${data.inspectionDays || '10'} days)`
      : `Contingencia de inspección (${data.inspectionDays || '10'} días)`)
  if (data.contingencyAppraisal)
    contingencies.push(lang === 'en' ? 'Appraisal contingency' : 'Contingencia de avalúo')
  if (data.contingencyFinancing)
    contingencies.push(lang === 'en'
      ? `Financing contingency (${data.financingDays || '21'} days)`
      : `Contingencia de financiamiento (${data.financingDays || '21'} días)`)
  if (data.contingencySaleOfHome)
    contingencies.push(lang === 'en' ? 'Sale of buyer\'s current home' : 'Venta del hogar actual del comprador')

  const isEn = lang === 'en'

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    color: #1a1a1a;
    background: #fff;
    font-size: 13px;
    line-height: 1.6;
  }
  .page {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 60px;
  }
  .letterhead {
    border-bottom: 3px solid #1e3a5f;
    padding-bottom: 20px;
    margin-bottom: 28px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
  }
  .brand {
    font-size: 18px;
    font-weight: bold;
    color: #1e3a5f;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    letter-spacing: -0.3px;
  }
  .doc-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #64748b;
    font-family: -apple-system, sans-serif;
    text-align: right;
  }
  .date-line {
    font-size: 12px;
    color: #475569;
    margin-bottom: 20px;
    font-family: -apple-system, sans-serif;
  }
  .to-block {
    margin-bottom: 24px;
  }
  .to-block p {
    line-height: 1.5;
    font-size: 13px;
  }
  .subject-line {
    margin-bottom: 20px;
    padding: 10px 14px;
    background: #f1f5f9;
    border-left: 3px solid #1e3a5f;
    font-size: 13px;
  }
  .subject-line strong { font-weight: 700; }
  p { margin-bottom: 14px; }
  .section-header {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #1e3a5f;
    font-family: -apple-system, sans-serif;
    margin-top: 22px;
    margin-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
  }
  .terms-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    font-size: 12.5px;
  }
  .terms-table td {
    padding: 5px 8px;
    vertical-align: top;
  }
  .terms-table td:first-child {
    font-weight: 600;
    color: #475569;
    white-space: nowrap;
    width: 42%;
    font-family: -apple-system, sans-serif;
    font-size: 11.5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .terms-table td:last-child {
    color: #1a1a1a;
    font-weight: 500;
  }
  .terms-table tr:nth-child(even) td {
    background: #f8fafc;
  }
  ul.items-list {
    margin: 6px 0 12px 0;
    padding-left: 18px;
  }
  ul.items-list li { margin-bottom: 3px; }
  .personal-note {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 14px 16px;
    font-style: italic;
    color: #374151;
    margin-bottom: 18px;
    font-size: 12.5px;
  }
  .disclaimer {
    margin-top: 30px;
    padding: 12px 16px;
    background: #fefce8;
    border: 1px solid #fde68a;
    border-radius: 6px;
    font-size: 10.5px;
    color: #92400e;
    font-family: -apple-system, sans-serif;
    line-height: 1.5;
  }
  .signature-block {
    margin-top: 32px;
  }
  .sig-line {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
  }
  .sig-item {
    flex: 1;
    min-width: 180px;
  }
  .sig-underline {
    border-bottom: 1px solid #1a1a1a;
    height: 36px;
    margin-bottom: 4px;
  }
  .sig-label {
    font-size: 10px;
    color: #64748b;
    font-family: -apple-system, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  @media print {
    body { background: white; }
    .page { padding: 30px 40px; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="letterhead">
    <div class="brand">Property Launch Pad</div>
    <div class="doc-title">${isEn ? 'Letter of Intent — Real Estate Offer' : 'Carta de Intención — Oferta Inmobiliaria'}</div>
  </div>

  <div class="date-line">${today}</div>

  <div class="to-block">
    <p><strong>${isEn ? 'To:' : 'Para:'}</strong> ${seller}</p>
    ${data.propertyAddress ? `<p><strong>${isEn ? 'Re: Property at' : 'Re: Propiedad en'}</strong> ${property}</p>` : ''}
  </div>

  <p>${isEn ? 'Dear' : 'Estimado/a'} ${seller},</p>

  <p>${isEn
    ? `I am pleased to submit this Letter of Intent to purchase the property located at <strong>${property}</strong>. The terms outlined below represent my sincere offer and desire to proceed to a formal purchase agreement.`
    : `Me complace presentar esta Carta de Intención para comprar la propiedad ubicada en <strong>${property}</strong>. Los términos descritos a continuación representan mi oferta sincera y mi deseo de proceder a un contrato de compra formal.`
  }</p>

  <div class="section-header">${isEn ? 'Offer Terms' : 'Términos de la Oferta'}</div>
  <table class="terms-table">
    <tr><td>${isEn ? 'Purchase Price' : 'Precio de Compra'}</td><td>${fmt(data.offerPrice)}</td></tr>
    <tr><td>${isEn ? 'Earnest Money Deposit' : 'Depósito de Arras'}</td><td>${fmt(data.earnestMoney)}</td></tr>
    ${data.downPayment ? `<tr><td>${isEn ? 'Down Payment' : 'Pago Inicial'}</td><td>${fmt(data.downPayment)}</td></tr>` : ''}
    <tr><td>${isEn ? 'Financing' : 'Financiamiento'}</td><td>${financingLabel(data.financingType, lang)}</td></tr>
    <tr><td>${isEn ? 'Proposed Closing Date' : 'Fecha de Cierre Propuesta'}</td><td>${fmtDate(data.closingDate, lang)}</td></tr>
  </table>

  ${contingencies.length > 0 ? `
  <div class="section-header">${isEn ? 'Contingencies' : 'Contingencias'}</div>
  <p>${isEn ? 'This offer is contingent upon the following:' : 'Esta oferta está sujeta a las siguientes contingencias:'}</p>
  <ul class="items-list">
    ${contingencies.map(c => `<li>${c}</li>`).join('')}
  </ul>
  ` : ''}

  <div class="section-header">${isEn ? 'Earnest Money' : 'Depósito de Arras'}</div>
  <p>${isEn
    ? `An earnest money deposit of <strong>${fmt(data.earnestMoney)}</strong> will be delivered to the escrow/title company within 3 business days of an accepted offer.`
    : `Un depósito de arras de <strong>${fmt(data.earnestMoney)}</strong> será entregado a la compañía de títulos/fideicomiso dentro de los 3 días hábiles posteriores a la aceptación de la oferta.`
  }</p>

  ${includedItems.length > 0 ? `
  <div class="section-header">${isEn ? 'Personal Property Included' : 'Bienes Personales Incluidos'}</div>
  <ul class="items-list">
    ${includedItems.map(i => `<li>${i}</li>`).join('')}
  </ul>
  ` : ''}

  ${data.excludedItems.trim() ? `
  <div class="section-header">${isEn ? 'Excluded Items' : 'Artículos Excluidos'}</div>
  <p>${data.excludedItems}</p>
  ` : ''}

  ${data.personalNote.trim() ? `
  <div class="section-header">${isEn ? 'A Note from the Buyer' : 'Nota del Comprador'}</div>
  <div class="personal-note">"${data.personalNote}"</div>
  ` : ''}

  <div class="section-header">${isEn ? 'Offer Expiration' : 'Expiración de la Oferta'}</div>
  <p>${isEn
    ? `This Letter of Intent expires on <strong>${fmtDate(data.offerExpirationDate, lang)}</strong>. If not accepted in writing by that date, this offer shall be considered withdrawn.`
    : `Esta Carta de Intención vence el <strong>${fmtDate(data.offerExpirationDate, lang)}</strong>. Si no se acepta por escrito antes de esa fecha, esta oferta se considerará retirada.`
  }</p>

  <p>${isEn
    ? 'I look forward to your response and the opportunity to work together toward a successful transaction.'
    : 'Espero su respuesta y la oportunidad de trabajar juntos hacia una transacción exitosa.'
  }</p>

  <p>${isEn ? 'Respectfully submitted,' : 'Atentamente,'}</p>

  <div class="signature-block">
    <div class="sig-line">
      <div class="sig-item">
        <div class="sig-underline"></div>
        <div class="sig-label">${isEn ? 'Buyer Signature' : 'Firma del Comprador'}</div>
      </div>
      <div class="sig-item">
        <div class="sig-underline"></div>
        <div class="sig-label">${isEn ? 'Date' : 'Fecha'}</div>
      </div>
    </div>
    <br/>
    <p style="margin-top:8px; font-size:12px;"><strong>${buyer}</strong></p>
    ${data.buyerAddress ? `<p style="font-size:11px; color:#475569;">${data.buyerAddress}</p>` : ''}
    ${data.buyerPhone ? `<p style="font-size:11px; color:#475569;">${data.buyerPhone}</p>` : ''}
    ${data.buyerEmail ? `<p style="font-size:11px; color:#475569;">${data.buyerEmail}</p>` : ''}
  </div>

  <div class="disclaimer">
    <strong>${isEn ? 'LEGAL DISCLAIMER:' : 'AVISO LEGAL:'}</strong> ${isEn
      ? 'This letter of intent is not a legally binding contract. It is intended solely as an expression of interest and does not obligate either party to complete the transaction. Consult a licensed real estate attorney before submitting any offers or signing any purchase agreements.'
      : 'Esta carta de intención no es un contrato legalmente vinculante. Su finalidad es únicamente expresar interés y no obliga a ninguna de las partes a completar la transacción. Consulte a un abogado de bienes raíces con licencia antes de presentar cualquier oferta o firmar acuerdos de compra.'}
  </div>
</div>
</body>
</html>`
}

export function printOfferLetter(data: OfferLetterFormData, lang: 'en' | 'es') {
  const html = generateOfferLetterHTML(data, lang)
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) return
  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
}
