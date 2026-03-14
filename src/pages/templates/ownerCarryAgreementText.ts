import type { OwnerCarryFormData } from './ownerCarryTypes'

const or = (val: string, fallback: string) => val?.trim() || fallback

export function generateAgreementHTML(data: OwnerCarryFormData, lang: 'en' | 'es'): string {
  const f = (k: keyof OwnerCarryFormData) => or(data[k] as string, '_______________')
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  if (lang === 'es') return generateSpanish(data, f, today)
  return generateEnglish(data, f, today)
}

function generateEnglish(data: OwnerCarryFormData, f: (k: keyof OwnerCarryFormData) => string, today: string): string {
  const hasBalloon = data.balloonPayment === 'yes'
  const noPrepay = data.prepaymentPenalty === 'yes'
  const taxBuyer = data.propertyTaxResponsibility === 'buyer'
  const insBuyer = data.insuranceResponsibility === 'buyer'

  return `
<div class="agreement-body">

<div class="agreement-title">OWNER CARRY / SELLER FINANCE AGREEMENT</div>
<div class="agreement-subtitle">Real Estate Purchase Money Note and Security Agreement</div>
<div class="agreement-date">Date: ${today}</div>

<p>This Owner Carry Agreement ("Agreement") is entered into as of ${f('closingDate') !== '_______________' ? f('closingDate') : today}, by and between:</p>

<div class="parties-block">
  <div class="party">
    <strong>SELLER:</strong><br/>
    ${f('sellerName')}<br/>
    ${f('sellerAddress')}<br/>
    Phone: ${f('sellerPhone')} | Email: ${f('sellerEmail')}
  </div>
  <div class="party">
    <strong>BUYER:</strong><br/>
    ${f('buyerName')}<br/>
    ${f('buyerAddress')}<br/>
    Phone: ${f('buyerPhone')} | Email: ${f('buyerEmail')}
  </div>
</div>

<h2>1. PROPERTY DESCRIPTION</h2>
<p>Seller agrees to sell and Buyer agrees to purchase the real property located at:</p>
<div class="indent-block">
  <strong>Property Address:</strong> ${f('propertyAddress')}<br/>
  <strong>Legal Description:</strong> ${f('legalDescription')}
</div>

<h2>2. PURCHASE PRICE AND FINANCING TERMS</h2>
<p>The total purchase price for the Property shall be <strong>${f('purchasePrice')}</strong>, to be paid as follows:</p>
<ul>
  <li><strong>Down Payment:</strong> $${f('downPaymentAmount')}, due on or before ${f('downPaymentDueDate')}.</li>
  <li><strong>Seller-Financed Loan Amount (Principal):</strong> $${f('loanAmount')}</li>
  <li><strong>Interest Rate:</strong> ${f('interestRate')}% per annum</li>
  <li><strong>Loan Term:</strong> ${f('loanTermYears')} years (payments amortized over 30 years)</li>
  <li><strong>Monthly Payment:</strong> $${f('monthlyPaymentAmount')}, due on the <strong>${f('paymentDueDay')}</strong> of each month, beginning the first month following closing.</li>
</ul>
<p>Payments shall be made payable to Seller at the address stated above, or such other address as Seller may designate in writing.</p>

${hasBalloon ? `
<h2>3. BALLOON PAYMENT</h2>
<div class="warning-block">
  <strong>BALLOON PAYMENT NOTICE:</strong> This loan contains a balloon payment provision. The entire remaining principal balance, plus all accrued and unpaid interest, in the estimated amount of <strong>$${f('balloonAmount')}</strong>, shall be due and payable in full on <strong>${f('balloonDueDate')}</strong> ("Balloon Due Date"). Buyer acknowledges that Buyer will be required to refinance or otherwise pay the full remaining balance by the Balloon Due Date. Failure to pay the balloon amount by the Balloon Due Date shall constitute an event of default under this Agreement.
</div>
` : `
<h2>3. FULL AMORTIZATION</h2>
<p>This loan does not contain a balloon payment. If all scheduled monthly payments are made in accordance with the amortization schedule, the loan shall be fully paid at the end of the stated loan term.</p>
`}

<h2>4. LATE PAYMENT CHARGE</h2>
<p>If any monthly payment is not received by Seller within <strong>${f('lateFeeGraceDays')} days</strong> after the due date, Buyer shall pay a late charge equal to <strong>${f('lateFeePercent')}%</strong> of the overdue payment. This late charge shall be in addition to, and not in lieu of, any other remedy available to Seller. Acceptance of a late charge by Seller shall not constitute a waiver of any default or of Seller's right to exercise any remedy available under this Agreement or applicable law.</p>

<h2>5. PREPAYMENT</h2>
${noPrepay
  ? `<p>This loan is subject to a prepayment penalty. Buyer may not prepay all or any portion of the outstanding principal balance prior to the scheduled maturity date without the prior written consent of Seller and payment of any applicable prepayment fee as separately agreed in writing by the parties.</p>`
  : `<p>Buyer shall have the right to prepay all or any portion of the outstanding principal balance at any time, without penalty or premium. Partial prepayments shall be applied first to any accrued and unpaid interest, then to the reduction of the outstanding principal balance. Prepayment shall not relieve Buyer of the obligation to continue making scheduled monthly payments until the loan is fully paid.</p>`
}

<h2>6. DEFAULT AND REMEDIES</h2>
<p>Each of the following shall constitute an event of default under this Agreement:</p>
<ul>
  <li>Buyer fails to make any payment when due, and such failure continues for <strong>${f('defaultDays')} days</strong> after written notice from Seller;</li>
  <li>Buyer fails to pay property taxes, assessments, or insurance premiums when due and such failure continues for 30 days after written notice from Seller;</li>
  <li>Buyer transfers, conveys, assigns, or otherwise disposes of the Property or any interest therein without the prior written consent of Seller;</li>
  <li>Buyer files or has filed against Buyer a petition in bankruptcy, insolvency, or reorganization, or makes a general assignment for the benefit of creditors;</li>
  <li>Any representation or warranty made by Buyer in this Agreement is found to be materially false or misleading.</li>
</ul>
<p>Upon any event of default, and after the expiration of any applicable cure period, Seller shall have all rights and remedies available at law or in equity, including but not limited to: (a) acceleration of the entire outstanding principal balance and all accrued interest; (b) commencement of foreclosure proceedings in accordance with applicable law; (c) the right to seek specific performance or injunctive relief; and (d) any other remedy available under the laws of the State of ${f('governingState')}. All remedies are cumulative and not exclusive. Seller's exercise of any remedy shall not constitute a waiver of any other remedy.</p>

<h2>7. TITLE AND DEED</h2>
<p>Seller shall convey marketable title to the Property by Warranty Deed (or such other deed form as is customary in the State of ${f('governingState')}) at closing. Said deed shall be recorded in the official records of the county in which the Property is located. Until the loan is paid in full, Seller retains a purchase money security interest in the Property, and Buyer hereby grants Seller a lien against the Property to secure Buyer's obligations hereunder. Buyer agrees to execute any and all documents reasonably necessary to perfect and maintain Seller's security interest.</p>

<h2>8. PROPERTY TAXES</h2>
<p>${taxBuyer
  ? `Buyer shall be solely responsible for the timely payment of all real property taxes, special assessments, and other governmental charges levied against the Property from and after the closing date. Buyer shall provide Seller with proof of payment of such taxes upon Seller's written request. Failure to pay taxes when due shall constitute an event of default after the applicable cure period.`
  : `Seller shall be responsible for the payment of all real property taxes, special assessments, and other governmental charges levied against the Property during the term of this Agreement. Seller shall provide Buyer with proof of payment upon Buyer's written request.`
}</p>

<h2>9. INSURANCE</h2>
<p>${insBuyer
  ? `Buyer shall, at Buyer's expense, obtain and maintain throughout the term of this Agreement a policy of hazard and casualty insurance covering the Property in an amount not less than the full replacement value thereof, with Seller named as an additional insured and loss payee. Buyer shall deliver evidence of such insurance to Seller at closing and upon each renewal thereafter. If Buyer fails to maintain required insurance, Seller may obtain such insurance at Buyer's expense, and such cost shall be added to the outstanding loan balance and shall bear interest at the contract rate.`
  : `Seller shall, at Seller's expense, obtain and maintain a policy of hazard and casualty insurance covering the Property in an amount not less than the full replacement value thereof throughout the term of this Agreement.`
}</p>

<h2>10. MAINTENANCE AND USE</h2>
<p>Buyer shall maintain the Property in good condition and repair and shall not permit waste or deterioration. Buyer shall comply with all applicable laws, ordinances, and regulations governing the use and maintenance of the Property. Buyer shall not make any structural alterations or improvements to the Property without the prior written consent of Seller, which consent shall not be unreasonably withheld. Seller shall have the right to inspect the Property upon reasonable advance notice to Buyer.</p>

<h2>11. DUE ON SALE</h2>
<p>This Agreement and the indebtedness evidenced hereby shall not be assumed by any third party without the prior written consent of Seller. Any sale, transfer, assignment, or other conveyance of the Property or any interest therein, without Seller's prior written consent, shall constitute an event of default and shall entitle Seller to declare the entire outstanding balance immediately due and payable.</p>

<h2>12. GOVERNING LAW; DISPUTE RESOLUTION</h2>
<p>This Agreement shall be governed by and construed in accordance with the laws of the State of <strong>${f('governingState')}</strong>, without regard to its conflict of laws principles. Any dispute arising out of or relating to this Agreement shall be resolved in the courts of competent jurisdiction located in the State of ${f('governingState')}. The prevailing party in any such dispute shall be entitled to recover its reasonable attorneys' fees and costs.</p>

<h2>13. ENTIRE AGREEMENT; AMENDMENTS</h2>
<p>This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements, representations, warranties, and understandings of the parties, whether oral or written. This Agreement may not be modified or amended except by a written instrument signed by both parties.</p>

<h2>14. SEVERABILITY</h2>
<p>If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</p>

<h2>15. NOTICES</h2>
<p>All notices required or permitted under this Agreement shall be in writing and shall be delivered personally, by certified mail, return receipt requested, or by nationally recognized overnight courier to the addresses set forth above. Notice shall be deemed effective upon actual receipt.</p>

<h2>16. CLOSING DATE</h2>
<p>The closing of the purchase and sale contemplated by this Agreement shall occur on or before <strong>${f('closingDate')}</strong>, or at such other date as mutually agreed by the parties in writing.</p>

<div class="signature-block">
  <h2>SIGNATURES</h2>
  <p>IN WITNESS WHEREOF, the parties have executed this Owner Carry Agreement as of the date first written above.</p>

  <div class="sig-grid">
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>SELLER:</strong> ${f('sellerName')}</p>
      <p>Date: ___________________________</p>
      <p>Print Name: ___________________________</p>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>BUYER:</strong> ${f('buyerName')}</p>
      <p>Date: ___________________________</p>
      <p>Print Name: ___________________________</p>
    </div>
  </div>

  <div class="notary-block">
    <h3>NOTARY ACKNOWLEDGMENT</h3>
    <p>State of ${f('governingState')}<br/>
    County of ___________________________</p>
    <p>On this ______ day of _________________, 20____, before me, the undersigned Notary Public, personally appeared _________________________ and _________________________, known to me to be the persons whose names are subscribed to the within instrument, and acknowledged to me that they executed the same for the purposes therein contained.</p>
    <p>IN WITNESS WHEREOF I have hereunto set my hand and official seal.</p>
    <br/>
    <div class="sig-line" style="width:300px;"></div>
    <p>Notary Public<br/>
    My Commission Expires: ___________________________</p>
  </div>
</div>

<div class="disclaimer-block">
  <strong>DISCLAIMER:</strong> This template is for educational purposes only. It is not a substitute for legal advice. Have all agreements reviewed by a licensed attorney in your state before signing.
</div>

</div>
`
}

function generateSpanish(data: OwnerCarryFormData, f: (k: keyof OwnerCarryFormData) => string, today: string): string {
  const hasBalloon = data.balloonPayment === 'yes'
  const noPrepay = data.prepaymentPenalty === 'yes'
  const taxBuyer = data.propertyTaxResponsibility === 'buyer'
  const insBuyer = data.insuranceResponsibility === 'buyer'

  return `
<div class="agreement-body">

<div class="agreement-title">CONTRATO DE FINANCIAMIENTO POR EL VENDEDOR</div>
<div class="agreement-subtitle">Pagaré de Compra con Garantía Inmobiliaria y Acuerdo de Seguridad</div>
<div class="agreement-date">Fecha: ${today}</div>

<p>Este Contrato de Financiamiento por el Vendedor ("Contrato") es celebrado a partir del ${f('closingDate') !== '_______________' ? f('closingDate') : today}, entre:</p>

<div class="parties-block">
  <div class="party">
    <strong>VENDEDOR:</strong><br/>
    ${f('sellerName')}<br/>
    ${f('sellerAddress')}<br/>
    Teléfono: ${f('sellerPhone')} | Correo: ${f('sellerEmail')}
  </div>
  <div class="party">
    <strong>COMPRADOR:</strong><br/>
    ${f('buyerName')}<br/>
    ${f('buyerAddress')}<br/>
    Teléfono: ${f('buyerPhone')} | Correo: ${f('buyerEmail')}
  </div>
</div>

<h2>1. DESCRIPCIÓN DE LA PROPIEDAD</h2>
<p>El Vendedor acuerda vender y el Comprador acuerda adquirir el bien inmueble ubicado en:</p>
<div class="indent-block">
  <strong>Dirección de la Propiedad:</strong> ${f('propertyAddress')}<br/>
  <strong>Descripción Legal:</strong> ${f('legalDescription')}
</div>

<h2>2. PRECIO DE COMPRA Y TÉRMINOS DE FINANCIAMIENTO</h2>
<p>El precio total de compra de la Propiedad será de <strong>${f('purchasePrice')}</strong>, a pagarse de la siguiente manera:</p>
<ul>
  <li><strong>Enganche:</strong> $${f('downPaymentAmount')}, con vencimiento el ${f('downPaymentDueDate')}.</li>
  <li><strong>Monto del Préstamo Financiado por el Vendedor (Principal):</strong> $${f('loanAmount')}</li>
  <li><strong>Tasa de Interés:</strong> ${f('interestRate')}% anual</li>
  <li><strong>Plazo del Préstamo:</strong> ${f('loanTermYears')} años (pagos amortizados a 30 años)</li>
  <li><strong>Pago Mensual:</strong> $${f('monthlyPaymentAmount')}, con vencimiento el día <strong>${f('paymentDueDay')}</strong> de cada mes, comenzando el primer mes después del cierre.</li>
</ul>
<p>Los pagos deberán efectuarse a nombre del Vendedor en la dirección indicada anteriormente, o en la dirección que el Vendedor designe por escrito.</p>

${hasBalloon ? `
<h2>3. PAGO GLOBO (BALLOON)</h2>
<div class="warning-block">
  <strong>AVISO DE PAGO GLOBO:</strong> Este préstamo contiene una disposición de pago globo. El saldo principal restante completo, más todos los intereses devengados e impagos, por un monto estimado de <strong>$${f('balloonAmount')}</strong>, vencerá y será pagadero en su totalidad el <strong>${f('balloonDueDate')}</strong> ("Fecha de Vencimiento del Pago Globo"). El Comprador reconoce que deberá refinanciar o pagar de otra manera el saldo total restante en la Fecha de Vencimiento del Pago Globo. El incumplimiento de pago del monto globo en la fecha de vencimiento constituirá un evento de incumplimiento bajo este Contrato.
</div>
` : `
<h2>3. AMORTIZACIÓN COMPLETA</h2>
<p>Este préstamo no contiene un pago globo. Si se realizan todos los pagos mensuales programados de acuerdo con el calendario de amortización, el préstamo quedará completamente liquidado al final del plazo establecido.</p>
`}

<h2>4. CARGO POR PAGO TARDÍO</h2>
<p>Si el Vendedor no recibe algún pago mensual dentro de los <strong>${f('lateFeeGraceDays')} días</strong> posteriores a la fecha de vencimiento, el Comprador pagará un cargo por mora equivalente al <strong>${f('lateFeePercent')}%</strong> del pago vencido. Este cargo por mora será adicional a cualquier otro recurso disponible para el Vendedor.</p>

<h2>5. PAGO ANTICIPADO</h2>
${noPrepay
  ? `<p>Este préstamo está sujeto a una penalización por pago anticipado. El Comprador no podrá prepagar la totalidad o cualquier parte del saldo principal pendiente antes de la fecha de vencimiento programada sin el consentimiento previo por escrito del Vendedor y el pago de cualquier tarifa de prepago aplicable acordada por escrito entre las partes.</p>`
  : `<p>El Comprador tendrá el derecho de prepagar la totalidad o cualquier parte del saldo principal pendiente en cualquier momento, sin penalización ni prima. Los prepagos parciales se aplicarán primero a los intereses devengados e impagos, y luego a la reducción del saldo principal pendiente.</p>`
}

<h2>6. INCUMPLIMIENTO Y RECURSOS</h2>
<p>Cada uno de los siguientes constituirá un evento de incumplimiento bajo este Contrato:</p>
<ul>
  <li>El Comprador no realiza algún pago a su vencimiento y dicho incumplimiento continúa por <strong>${f('defaultDays')} días</strong> después de notificación escrita del Vendedor;</li>
  <li>El Comprador no paga impuestos sobre la propiedad, valuaciones o primas de seguros cuando vencen y dicho incumplimiento continúa por 30 días después de notificación escrita del Vendedor;</li>
  <li>El Comprador transfiere, cede o dispone de la Propiedad o cualquier interés en ella sin el consentimiento previo por escrito del Vendedor;</li>
  <li>El Comprador presenta o tiene presentada en su contra una petición de quiebra, insolvencia o reorganización.</li>
</ul>
<p>Ante cualquier evento de incumplimiento, y después del vencimiento del período de subsanación aplicable, el Vendedor tendrá todos los derechos y recursos disponibles en ley o equidad, incluyendo la aceleración del saldo total pendiente, el inicio de procedimientos de ejecución hipotecaria conforme a la ley aplicable, y cualquier otro recurso disponible bajo las leyes del Estado de ${f('governingState')}.</p>

<h2>7. TÍTULO Y ESCRITURA</h2>
<p>El Vendedor transmitirá título comercializable de la Propiedad mediante Escritura de Garantía al cierre, misma que será inscrita en los registros oficiales del condado donde se ubica la Propiedad. Hasta que el préstamo sea pagado en su totalidad, el Vendedor conserva un interés de seguridad sobre la Propiedad, y el Comprador otorga al Vendedor un gravamen sobre la misma para garantizar las obligaciones del Comprador bajo este Contrato.</p>

<h2>8. IMPUESTOS SOBRE LA PROPIEDAD</h2>
<p>${taxBuyer
  ? `El Comprador será el único responsable del pago oportuno de todos los impuestos sobre bienes raíces, valuaciones especiales y demás cargos gubernamentales impuestos sobre la Propiedad a partir de la fecha de cierre. El incumplimiento en el pago de impuestos a su vencimiento constituirá un evento de incumplimiento después del período de subsanación aplicable.`
  : `El Vendedor será responsable del pago de todos los impuestos sobre bienes raíces, valuaciones especiales y demás cargos gubernamentales impuestos sobre la Propiedad durante la vigencia de este Contrato.`
}</p>

<h2>9. SEGUROS</h2>
<p>${insBuyer
  ? `El Comprador, a sus expensas, deberá obtener y mantener durante toda la vigencia de este Contrato una póliza de seguro contra daños y siniestros que cubra la Propiedad por un monto no menor a su valor de reposición total, con el Vendedor nombrado como asegurado adicional y beneficiario de pérdidas. El Comprador entregará evidencia de dicho seguro al Vendedor al cierre y en cada renovación posterior.`
  : `El Vendedor, a sus expensas, deberá obtener y mantener una póliza de seguro contra daños y siniestros que cubra la Propiedad durante la vigencia de este Contrato.`
}</p>

<h2>10. MANTENIMIENTO Y USO</h2>
<p>El Comprador mantendrá la Propiedad en buenas condiciones y estado de conservación, y no permitirá deterioro o desperdicio. El Comprador cumplirá con todas las leyes, ordenanzas y reglamentos aplicables que rigen el uso y mantenimiento de la Propiedad.</p>

<h2>11. VENCIMIENTO EN CASO DE VENTA</h2>
<p>Este Contrato y la deuda evidenciada en el mismo no podrán ser asumidos por un tercero sin el consentimiento previo por escrito del Vendedor. Cualquier venta, transferencia, cesión u otra transmisión de la Propiedad sin dicho consentimiento constituirá un evento de incumplimiento.</p>

<h2>12. LEY APLICABLE; RESOLUCIÓN DE DISPUTAS</h2>
<p>Este Contrato se regirá e interpretará de acuerdo con las leyes del Estado de <strong>${f('governingState')}</strong>. Cualquier disputa que surja en relación con este Contrato será resuelta ante los tribunales competentes del Estado de ${f('governingState')}. La parte prevaleciente en cualquier disputa tendrá derecho a recuperar sus honorarios razonables de abogados y costas.</p>

<h2>13. ACUERDO COMPLETO; MODIFICACIONES</h2>
<p>Este Contrato constituye el acuerdo completo entre las partes con respecto al objeto del mismo y reemplaza todos los acuerdos, representaciones y entendimientos previos de las partes. Este Contrato no podrá modificarse ni enmendarse excepto mediante un instrumento escrito firmado por ambas partes.</p>

<h2>14. DIVISIBILIDAD</h2>
<p>Si alguna disposición de este Contrato es declarada inválida, ilegal o inaplicable, las disposiciones restantes continuarán en plena vigencia y efecto.</p>

<h2>15. NOTIFICACIONES</h2>
<p>Todas las notificaciones requeridas o permitidas bajo este Contrato deberán ser por escrito y entregadas personalmente, por correo certificado con acuse de recibo, o mediante mensajería reconocida a las direcciones indicadas anteriormente.</p>

<h2>16. FECHA DE CIERRE</h2>
<p>El cierre de la compraventa contemplada en este Contrato se realizará a más tardar el <strong>${f('closingDate')}</strong>, o en la fecha que las partes acuerden mutuamente por escrito.</p>

<div class="signature-block">
  <h2>FIRMAS</h2>
  <p>EN FE DE LO CUAL, las partes han suscrito este Contrato de Financiamiento por el Vendedor a partir de la fecha indicada al inicio.</p>

  <div class="sig-grid">
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>VENDEDOR:</strong> ${f('sellerName')}</p>
      <p>Fecha: ___________________________</p>
      <p>Nombre en letra de molde: ___________________________</p>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>COMPRADOR:</strong> ${f('buyerName')}</p>
      <p>Fecha: ___________________________</p>
      <p>Nombre en letra de molde: ___________________________</p>
    </div>
  </div>

  <div class="notary-block">
    <h3>RECONOCIMIENTO NOTARIAL</h3>
    <p>Estado de ${f('governingState')}<br/>
    Condado de ___________________________</p>
    <p>En este día ______ de _________________, 20____, ante mí, el suscrito Notario Público, comparecieron personalmente _________________________ y _________________________, conocidos por mí como las personas cuyos nombres están suscritos en el instrumento adjunto, y reconocieron ante mí que lo ejecutaron para los propósitos contenidos en el mismo.</p>
    <p>EN FE DE LO CUAL he puesto mi mano y sello oficial.</p>
    <br/>
    <div class="sig-line" style="width:300px;"></div>
    <p>Notario Público<br/>
    Mi Comisión Vence: ___________________________</p>
  </div>
</div>

<div class="disclaimer-block">
  <strong>AVISO LEGAL:</strong> Esta plantilla es solo para fines educativos. No sustituye el asesoramiento legal. Haga que todos los acuerdos sean revisados por un abogado con licencia en su estado antes de firmarlos.
</div>

</div>
`
}
