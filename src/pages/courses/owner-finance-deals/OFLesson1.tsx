import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Owner financing — also called seller financing or owner carry — is one of the most powerful tools in a real estate investor's arsenal. It allows a buyer to purchase a property directly from the seller, making payments to them instead of a bank. No mortgage application, no appraisal requirement, no 45-day closing timeline. Just two parties agreeing on terms and putting it in writing.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">How Owner Financing Works</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        In a traditional sale, the buyer brings a bank into the deal. The bank lends the purchase price (minus the down payment), the seller gets paid in full at closing, and the buyer makes monthly payments to the bank for 15–30 years.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        In an owner-financed sale, the seller acts as the bank. The buyer makes a down payment, and instead of a bank loan, the parties sign a promissory note (the loan agreement) and record a mortgage or deed of trust (the security instrument) against the property. The buyer makes monthly payments directly to the seller, including principal and interest, until the loan is paid off or refinanced.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Owner Finance vs. Traditional Financing</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 font-semibold mb-1">
          <span></span><span className="text-center">Traditional</span><span className="text-center">Owner Finance</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Who lends the money</span><span className="text-center">Bank or lender</span><span className="text-center">The seller</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Closing timeline</span><span className="text-center">30–45 days</span><span className="text-center">7–21 days</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Credit requirements</span><span className="text-center">Strict (680+)</span><span className="text-center">Negotiable</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Appraisal required</span><span className="text-center">Yes</span><span className="text-center">No</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Down payment</span><span className="text-center">3.5–25%</span><span className="text-center">Negotiable</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Loan term</span><span className="text-center">15 or 30 years</span><span className="text-center">Negotiable (often balloon)</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Would a Seller Agree to This?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is the question most buyers ask first. The answer is: sellers offer owner financing when it benefits them more than a traditional cash sale. That happens more often than you'd think.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Tax Deferral Through Installment Sales</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        When a seller sells a property they've owned for years, a traditional sale triggers the full capital gains tax bill in the year of sale. Under an installment sale (owner financing is an installment sale), the seller only pays capital gains tax on the principal received each year. This can spread a large tax liability across many years, sometimes saving the seller tens of thousands of dollars. For a seller sitting on a large gain, this is a compelling benefit.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Passive Income Stream</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A retired landlord who no longer wants to manage tenants but still wants monthly income can convert an active investment into a passive one. Instead of managing the property, they simply collect a monthly check — often at a higher interest rate than they'd earn from a savings account or bond.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Selling a Property That's Hard to Finance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Properties with deferred maintenance, title issues, or unusual configurations can be difficult or impossible to finance through traditional lenders. Owner financing removes that barrier and expands the buyer pool significantly.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Faster, Simpler Closing</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Some sellers value speed and simplicity over price. Avoiding a bank appraisal, underwriting delays, and a 45-day timeline can be worth accepting a lower effective yield on their note.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Benefits for the Buyer</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Owner financing opens doors that traditional financing closes:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">No bank qualification required</strong> — imperfect credit, self-employment income, or maxed-out DTI ratios don't disqualify you</li>
        <li><strong className="text-white">Creative terms</strong> — interest-only periods, lower initial down payments, and customized repayment schedules are all on the table</li>
        <li><strong className="text-white">Speed</strong> — close in days, not months</li>
        <li><strong className="text-white">Access to unlisted opportunities</strong> — off-market sellers who won't list publicly often respond to owner finance proposals</li>
        <li><strong className="text-white">Below-market purchases</strong> — sellers often accept a slightly lower price in exchange for the terms and benefits of carrying the note</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Key Documents</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        An owner finance transaction involves two core legal documents:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-8">
        <div>
          <p className="text-white font-semibold text-sm mb-1">Promissory Note</p>
          <p className="text-gray-400 text-sm">The loan agreement. Specifies the principal amount, interest rate, payment schedule, balloon payment date (if any), and what happens in case of default. This is the binding promise to repay.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Mortgage or Deed of Trust</p>
          <p className="text-gray-400 text-sm">The security instrument recorded against the property. Gives the seller (now the lender) the right to foreclose if the buyer defaults. This protects the seller's investment.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Purchase and Sale Agreement</p>
          <p className="text-gray-400 text-sm">The overall purchase contract, which references the owner finance terms. States that the financing is between buyer and seller rather than through a bank.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Is This Legal? What About the Due-on-Sale Clause?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Owner financing on a property the seller owns free and clear is entirely legal and straightforward. When the seller has an existing mortgage, it gets more complex: most mortgages contain a "due-on-sale" clause that requires the full loan balance to be paid when ownership transfers. Structuring a deal around an existing mortgage requires careful legal guidance.
      </p>
      <p className="text-gray-300 leading-relaxed">
        The cleanest owner finance deals involve sellers who own their property free and clear — no underlying mortgage. In the next lesson, you'll learn exactly how to find these sellers.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        El financiamiento del propietario — también llamado financiamiento del vendedor o "owner carry" — permite a un comprador adquirir una propiedad directamente del vendedor, haciéndole pagos a él en lugar de a un banco. Sin solicitud de hipoteca, sin requerimiento de tasación, sin cronograma de cierre de 45 días.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Cómo Funciona el Financiamiento del Propietario</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        En una venta con financiamiento del propietario, el vendedor actúa como el banco. El comprador hace un enganche y, en lugar de un préstamo bancario, las partes firman un pagaré (el acuerdo de préstamo) y registran una hipoteca o escritura de fideicomiso contra la propiedad. El comprador hace pagos mensuales directamente al vendedor, incluyendo capital e intereses.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Financiamiento del Propietario vs. Tradicional</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 font-semibold mb-1">
          <span></span><span className="text-center">Tradicional</span><span className="text-center">Propietario</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Quién presta</span><span className="text-center">Banco</span><span className="text-center">El vendedor</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Plazo de cierre</span><span className="text-center">30–45 días</span><span className="text-center">7–21 días</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Crédito requerido</span><span className="text-center">Estricto (680+)</span><span className="text-center">Negociable</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
          <span>Tasación</span><span className="text-center">Requerida</span><span className="text-center">No requerida</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Por Qué un Vendedor Aceptaría Esto?</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Diferimiento Fiscal a Través de Ventas a Plazos</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Bajo una venta a plazos (el financiamiento del propietario es una venta a plazos), el vendedor solo paga impuestos sobre las ganancias de capital sobre el principal recibido cada año. Esto puede distribuir una gran obligación fiscal durante muchos años, ahorrándole al vendedor decenas de miles de dólares.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Flujo de Ingresos Pasivos</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un propietario jubilado que ya no quiere administrar inquilinos puede convertir una inversión activa en pasiva. En lugar de administrar la propiedad, simplemente cobra un cheque mensual, a menudo a una tasa de interés más alta que la que ganaría de una cuenta de ahorros.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Vender una Propiedad Difícil de Financiar</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Las propiedades con mantenimiento diferido, problemas de título o configuraciones inusuales pueden ser difíciles o imposibles de financiar a través de prestamistas tradicionales. El financiamiento del propietario elimina esa barrera y amplía significativamente la base de compradores.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Beneficios para el Comprador</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Sin calificación bancaria requerida</strong> — crédito imperfecto, ingresos por trabajo independiente o ratios DTI altos no te descalifican</li>
        <li><strong className="text-white">Términos creativos</strong> — períodos solo de interés, enganches iniciales más bajos y cronogramas de pago personalizados</li>
        <li><strong className="text-white">Velocidad</strong> — cierra en días, no en meses</li>
        <li><strong className="text-white">Compras por debajo del mercado</strong> — los vendedores a menudo aceptan un precio ligeramente menor a cambio de los beneficios de mantener el pagaré</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Los Documentos Clave</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-8">
        <div>
          <p className="text-white font-semibold text-sm mb-1">Pagaré</p>
          <p className="text-gray-400 text-sm">El acuerdo de préstamo. Especifica el monto principal, la tasa de interés, el cronograma de pagos y la fecha de pago global (si la hay).</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Hipoteca o Escritura de Fideicomiso</p>
          <p className="text-gray-400 text-sm">El instrumento de seguridad registrado contra la propiedad. Da al vendedor (ahora el prestamista) el derecho a ejecutar la hipoteca si el comprador incumple.</p>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed">
        Los negocios de financiamiento del propietario más limpios involucran vendedores que poseen su propiedad libre de deudas. En la próxima lección, aprenderás exactamente cómo encontrar a estos vendedores.
      </p>
    </div>
  )
}

export function OFLesson1() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
