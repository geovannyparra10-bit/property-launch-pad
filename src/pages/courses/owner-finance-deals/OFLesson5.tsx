import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Every owner finance deal needs an exit plan before you enter it. A balloon payment will eventually come due — and when it does, you need to be ready. But the balloon isn't the only exit. This lesson covers the full range of strategies for getting out of an owner finance deal successfully, the risks to watch for as the buyer, and how to protect your position throughout the hold period.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Exit Strategy 1: Refinance Before the Balloon</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The most common and cleanest exit from an owner finance deal: refinance into a conventional mortgage before the balloon payment comes due. This replaces the seller's note with a bank loan, pays off the seller in full, and converts your owner-financed property into a traditionally financed one.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">What You Need to Refinance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Conventional lenders evaluate refinances on three factors: the property's value, your creditworthiness, and the loan-to-value (LTV) ratio. For an investment property refinance, most conventional lenders require:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>LTV of 75–80% or lower (meaning you need 20–25% equity)</li>
        <li>Credit score of 680–700+</li>
        <li>Debt-to-income ratio within guidelines</li>
        <li>A property that appraises at or above the outstanding loan balance</li>
        <li>Rental income documentation (leases, bank statements showing deposits)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is why buying below market value matters so much in owner finance deals. If you buy a $220,000 property worth $260,000 and make payments for 3 years, your loan balance might be $180,000 and the property might be worth $280,000. That's a comfortable LTV of ~64% — easy to refinance.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Start the refinance process 6–9 months before the balloon date. Getting financing approved takes 45–60 days, and lenders may have guidelines about how long you must have been making owner-finance payments (often 12 months). Don't wait until 60 days before the balloon to start.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">DSCR Refinance: No Income Verification</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        If your personal income doesn't qualify for conventional refinancing (self-employed, complex taxes, too many financed properties), a DSCR loan is your fallback. It evaluates the property's cash flow rather than your income. As long as rent covers the new mortgage payment at a 1.0–1.25 ratio, you can qualify. Rates will be slightly higher, but this option ensures you're not stuck.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Exit Strategy 2: Sell the Property</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you don't want to refinance — or the market has appreciated significantly and you want to capture gains — selling the property is a clean exit. The sale proceeds pay off the seller's note in full (often triggering the balloon payment clause anyway), and any remaining equity is your profit.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Key considerations when planning a sale exit:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Prepayment penalty:</strong> If your note includes a prepayment penalty, selling before the penalty window closes may reduce your net proceeds. Factor this in when calculating your return.</li>
        <li><strong className="text-white">Capital gains:</strong> If you've held the property for more than one year, gains are taxed at long-term capital gains rates. If less than one year, short-term rates apply. Consider timing.</li>
        <li><strong className="text-white">1031 exchange:</strong> If you want to defer capital gains, you can roll proceeds into a like-kind replacement property through a 1031 exchange — but the timing rules are strict (45-day identification window, 180-day closing window).</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Exit Strategy 3: Negotiate a Balloon Extension</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If the balloon date arrives and you're not ready to refinance or sell, negotiate directly with the seller. Sellers who've been receiving steady payments for 5 years often prefer a 12–24 month extension over the complexity of foreclosure. Offer to increase the interest rate slightly during the extension period to compensate them for the additional time.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        This is why making every payment on time matters: sellers who trust the buyer are far more likely to extend. A track record of on-time payments is your most powerful negotiating tool when you need flexibility.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Exit Strategy 4: Lease Option (Sell on Lease Option)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you want to exit but aren't ready to sell outright, you can sell on a lease option to a tenant-buyer. They pay you monthly rent plus an option premium, and they have the right (but not the obligation) to purchase the property at a set price within a defined period.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        In this structure, the tenant-buyer's monthly payment should cover your owner-finance payment to the seller, plus cash flow. When they exercise the option and obtain their own financing, those proceeds pay off your seller note and net you the equity spread. This is a sophisticated technique — consult an attorney before setting up a lease option arrangement.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Protecting Yourself as the Buyer</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        While most of the discussion around owner financing focuses on seller protections, buyers have risks too. Here's how to protect your position:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Record the Deed Immediately</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        When you close, record the deed transferring title to you immediately in the county recorder's office. Do not delay. Unrecorded deeds can create title problems if the seller has other creditors or if there's any dispute about ownership. The deed should be recorded on the day of or within days of closing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Get Owner's Title Insurance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Title insurance protects you against prior claims on the property — undisclosed liens, unpaid taxes, errors in public records, or fraud in the chain of title. It's a one-time premium paid at closing and provides coverage for as long as you own the property.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Verify the Seller Owns the Property Free and Clear</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before signing anything, pull a title report or have a title company run a full title search. Confirm there are no existing mortgages, liens, tax judgments, or encumbrances on the property. A seller who claims to own free and clear but has an undisclosed mortgage creates legal complications that could cost you the property.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Maintain Documentation of Every Payment</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Pay by check or ACH transfer — never cash. Keep records of every payment: canceled checks, bank statements, wire confirmations. If a dispute ever arises about what you've paid, this documentation is your protection.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Use a Loan Servicer</h3>
      <p className="text-gray-300 leading-relaxed">
        A third-party loan servicer (specialized companies that administer private loans for a small monthly fee) tracks your payment history, sends payment statements, issues payoff letters, and maintains official records. They remove any ambiguity about what has and hasn't been paid. Services like Loancare, National Loan Exchange, or local escrow companies can serve this function. At $15–$30/month, it's one of the best investments in a clean, dispute-free owner finance relationship.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Cada negocio de financiamiento del propietario necesita un plan de salida antes de entrar. Un pago global eventualmente llegará a su vencimiento — y cuando lo haga, necesitas estar preparado. Esta lección cubre la gama completa de estrategias para salir exitosamente de un negocio de financiamiento del propietario.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estrategia de Salida 1: Refinanciar Antes del Pago Global</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La salida más común y limpia: refinanciar en una hipoteca convencional antes de que venza el pago global. Para una refinanciación de propiedad de inversión, la mayoría de los prestamistas convencionales requieren:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>LTV del 75–80% o menor (necesitas 20–25% de capital)</li>
        <li>Puntaje de crédito de 680–700+</li>
        <li>Ratio de deuda a ingresos dentro de las pautas</li>
        <li>Documentación de ingresos de alquiler</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Comienza el proceso de refinanciación 6–9 meses antes de la fecha del pago global. No esperes hasta 60 días antes del pago global para comenzar.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Refinanciación DSCR: Sin Verificación de Ingresos</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Si tus ingresos personales no califican para una refinanciación convencional, un préstamo DSCR es tu alternativa. Evalúa el flujo de efectivo de la propiedad en lugar de tus ingresos.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estrategia de Salida 2: Vender la Propiedad</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Si no quieres refinanciar, vender la propiedad es una salida limpia. Los ingresos de la venta pagan el pagaré del vendedor en su totalidad. Consideraciones clave:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li><strong className="text-white">Penalización de prepago:</strong> Si tu pagaré incluye una penalización, factor esto al calcular tu retorno.</li>
        <li><strong className="text-white">Ganancias de capital:</strong> Si has tenido la propiedad más de un año, las ganancias se gravan a tasas de ganancias de capital a largo plazo.</li>
        <li><strong className="text-white">Intercambio 1031:</strong> Puedes diferir las ganancias de capital reinvirtiendo los ingresos en una propiedad de reemplazo de tipo similar.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estrategia de Salida 3: Negociar una Extensión del Pago Global</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Si la fecha del pago global llega y no estás listo para refinanciar o vender, negocia directamente con el vendedor. Los vendedores que han estado recibiendo pagos constantes durante 5 años a menudo prefieren una extensión de 12–24 meses a la complejidad de una ejecución hipotecaria.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Protegerte Como Comprador</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Registra la Escritura Inmediatamente</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cuando cierres, registra la escritura que te transfiere el título inmediatamente en la oficina del registrador del condado. Las escrituras no registradas pueden crear problemas de título.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Obtén un Seguro de Título</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El seguro de título te protege contra reclamaciones previas sobre la propiedad — gravámenes no revelados, impuestos no pagados, errores en registros públicos o fraude.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Mantén Documentación de Cada Pago</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Paga mediante cheque o transferencia ACH — nunca en efectivo. Conserva registros de cada pago.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Usa un Administrador de Préstamos</h3>
      <p className="text-gray-300 leading-relaxed">
        Un administrador de préstamos de terceros rastrea tu historial de pagos, envía estados de cuenta, emite cartas de pago total y mantiene registros oficiales. A $15–$30/mes, es una de las mejores inversiones en una relación de financiamiento del propietario limpia y sin disputas.
      </p>
    </div>
  )
}

export function OFLesson5() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
