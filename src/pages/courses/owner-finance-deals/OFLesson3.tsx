import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { Calculator } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The flexibility of owner financing is its greatest strength — and its greatest source of confusion. There's no standard template. Every deal is negotiated. This lesson breaks down the key variables in an owner finance structure, how to think about each one, and how to use the Owner Finance Calculator to model different scenarios before you sit down with a seller.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Five Deal Variables</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">1. Purchase Price</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Owner financing doesn't mean you have to pay full price — but sellers who offer creative terms often expect a price closer to market value in return. The negotiation dynamic is different: instead of fighting purely on price, you're trading terms for price. A seller who wants $300,000 for a property worth $280,000 might accept that if you offer a lower interest rate, minimal down payment, or faster close. Think of price and terms as a combined package.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">2. Down Payment</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The down payment in owner financing is negotiable — but it's not optional. Sellers want skin in the game. A buyer who walks away from a deal loses their down payment; a seller with no down payment has no protection against a buyer who just stops making payments and occupies the property while a lengthy foreclosure process unfolds.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Typical owner finance down payments range from 5–20%. The lower the down payment, the more risk the seller takes on, and the more they'll compensate by requiring a higher interest rate or shorter balloon term.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">3. Interest Rate</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Owner finance interest rates are set by negotiation, not by the market. They're typically higher than conventional mortgage rates — often in the 6–10% range. The seller wants to earn more than they'd get from a CD or savings account; the buyer wants to minimize the rate to protect cash flow.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Rate is negotiable against other terms. A buyer willing to put more down may negotiate a lower rate. A buyer asking for interest-only payments or a longer balloon may need to offer a higher rate.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">4. Amortization Period</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The amortization period determines how monthly payments are calculated. A 30-year amortization on a $200,000 loan at 7% results in a $1,331/month payment. A 15-year amortization on the same loan would result in ~$1,797/month. Longer amortization = lower payments = better cash flow for the buyer.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">5. Balloon Payment</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most owner finance deals include a balloon payment — a date at which the full remaining balance is due. Common balloon periods are 3, 5, 7, or 10 years. The payments are calculated on a 30-year amortization, but the remaining balance comes due at the balloon date.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        This protects the seller (they're not locked in forever) and gives the buyer time to build equity and credit before refinancing into conventional financing. A 5-year balloon is common: make payments for 5 years, then refinance.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Example: 5-Year Balloon Deal</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Purchase price</span><span>$220,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Down payment (10%)</span><span>$22,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Loan amount</span><span>$198,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Interest rate</span><span>7.5%</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Amortization</span><span>30 years</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Balloon</span><span>5 years</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-gray-300 text-sm"><span>Monthly payment (P&I)</span><span>$1,385</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Balance at balloon (5 yrs)</span><span>~$184,000</span></div>
        <div className="flex justify-between text-white font-bold text-sm"><span>Total paid over 5 years</span><span>$83,100</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Interest-Only Periods</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Some owner finance deals include an interest-only period for the first 1–3 years, after which the loan converts to fully amortizing. This dramatically lowers the initial payment — on a $198,000 loan at 7.5%, interest-only payments would be $1,238/month vs. $1,385 with principal. The lower payment helps cash flow in the early years when you may be investing in the property.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Interest-only can also be attractive to sellers because they earn more interest (no principal reduction means higher outstanding balance for longer). Frame it as a benefit to both sides.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use the Owner Finance Calculator</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before entering any negotiation, model multiple scenarios with the Owner Finance Calculator. Adjust purchase price, down payment, rate, amortization, and balloon term to see how each variable affects monthly payment and total cost. This lets you walk into a negotiation knowing exactly what you can and cannot afford — and gives you the ability to offer the seller alternatives in real time.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Owner Finance Calculator</p>
            <p className="text-gray-400 text-xs mt-0.5">Model payment schedules, balloon balances, and total cost for any owner finance structure</p>
          </div>
        </div>
        <Link
          to="/tools/owner_finance"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Makes a Good Deal?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Apply the same cash flow analysis you'd use for any rental purchase. The owner finance structure changes how the deal is financed, not whether the underlying numbers work. A deal that doesn't cash flow at a 7% owner finance rate also wouldn't cash flow at a 7% bank rate.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The added variable unique to owner finance: can you refinance before the balloon? Model the balloon payoff assumption carefully. If your 5-year balloon comes due and you can't refinance, you'll need to sell or negotiate an extension with the seller. Always have a clear exit plan before you commit to the deal terms.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Build a payment schedule, verify your cash flow math, and run the deal through the Deal Analyzer before making an offer. The terms that feel comfortable in a verbal conversation can look very different when modeled out over 5 years.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La flexibilidad del financiamiento del propietario es su mayor fortaleza — y su mayor fuente de confusión. No hay una plantilla estándar. Cada negocio se negocia. Esta lección desglosa las variables clave en una estructura de financiamiento del propietario y cómo usar la Calculadora de Financiamiento del Propietario para modelar diferentes escenarios.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Las Cinco Variables del Negocio</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">1. Precio de Compra</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        En lugar de luchar puramente por el precio, estás intercambiando términos por precio. Un vendedor que quiere $300,000 por una propiedad que vale $280,000 podría aceptar eso si ofreces una tasa de interés más baja, un enganche mínimo o un cierre más rápido.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">2. Enganche</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los enganches típicos en financiamiento del propietario oscilan entre el 5–20%. Cuanto menor sea el enganche, más riesgo asume el vendedor, y más compensarán requiriendo una tasa de interés más alta o un plazo de pago global más corto.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">3. Tasa de Interés</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las tasas de financiamiento del propietario se establecen por negociación. Típicamente están en el rango del 6–10%. La tasa es negociable frente a otros términos.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">4. Período de Amortización</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una amortización a 30 años en un préstamo de $200,000 al 7% resulta en un pago mensual de $1,331. Una amortización a 15 años en el mismo préstamo resultaría en ~$1,797/mes. Mayor amortización = pagos más bajos = mejor flujo de efectivo para el comprador.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">5. Pago Global (Balloon)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mayoría de los negocios de financiamiento del propietario incluyen un pago global — una fecha en la que vence el saldo total restante. Los períodos comunes son 3, 5, 7 o 10 años. Los pagos se calculan con una amortización a 30 años, pero el saldo restante vence en la fecha del pago global.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Ejemplo: Negocio con Pago Global a 5 Años</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Precio de compra</span><span>$220,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Enganche (10%)</span><span>$22,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Monto del préstamo</span><span>$198,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Tasa de interés</span><span>7.5%</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Pago mensual (P&I)</span><span>$1,385</span></div>
        <div className="flex justify-between text-white font-bold text-sm"><span>Saldo en el pago global (5 años)</span><span>~$184,000</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa la Calculadora de Financiamiento del Propietario</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Antes de entrar en cualquier negociación, modela múltiples escenarios con la Calculadora de Financiamiento del Propietario. Ajusta el precio de compra, el enganche, la tasa, la amortización y el plazo del pago global para ver cómo cada variable afecta el pago mensual y el costo total.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Calculadora de Financiamiento del Propietario</p>
            <p className="text-gray-400 text-xs mt-0.5">Modela cronogramas de pagos, saldos de pago global y costo total</p>
          </div>
        </div>
        <Link
          to="/tools/owner_finance"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Qué Hace un Buen Negocio?</h2>
      <p className="text-gray-300 leading-relaxed">
        Aplica el mismo análisis de flujo de efectivo que usarías para cualquier compra de alquiler. La variable adicional única del financiamiento del propietario: ¿puedes refinanciar antes del pago global? Modela cuidadosamente el supuesto de pago global. Si tu pago global a 5 años vence y no puedes refinanciar, necesitarás vender o negociar una extensión con el vendedor. Siempre ten un plan de salida claro antes de comprometerte con los términos del negocio.
      </p>
    </div>
  )
}

export function OFLesson3() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
