import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The mortgage is the engine of real estate investing. Understanding how mortgages work — how they're structured, priced, and repaid — is not optional for serious investors. The difference between a well-chosen mortgage and a poorly understood one can easily amount to tens of thousands of dollars over the life of a loan. This guide demystifies every aspect of mortgages that investors need to know.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Fixed vs. Adjustable Rate Mortgages</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The first and most fundamental choice in any mortgage is whether to use a fixed or adjustable rate:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Fixed-Rate Mortgages (FRM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        With a fixed-rate mortgage, your interest rate stays the same for the entire loan term — typically 15 or 30 years. Your principal and interest payment never changes, making budgeting predictable and protecting you from rising interest rates.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The <strong className="text-white">30-year fixed</strong> is by far the most popular mortgage for investors. The long amortization period keeps monthly payments low, maximizing cash flow. The tradeoff: you pay more total interest over 30 years compared to a shorter term.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The <strong className="text-white">15-year fixed</strong> carries a lower interest rate (typically 0.5–0.75% less than a 30-year) and builds equity much faster — but the higher monthly payment reduces cash flow, which matters for rentals.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Adjustable-Rate Mortgages (ARM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        ARMs start with a fixed rate for an initial period (typically 5, 7, or 10 years), then adjust periodically based on a market index. A 7/1 ARM is fixed for 7 years, then adjusts annually.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        ARMs are expressed with caps that limit how much the rate can change: for example, a 5/2/5 cap means it can increase 5% at first adjustment, 2% per subsequent adjustment, and 5% lifetime maximum above the initial rate.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        ARMs can make sense for short-term holds (like flips), or if you plan to sell or refinance before the adjustment period begins. However, for long-term rental holds, the payment certainty of a fixed rate generally outweighs the initial rate savings.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Loan Types: Conventional, FHA, VA, and Portfolio</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Conventional Loans</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Conventional loans are not backed by the government. They're the workhorse of investment property financing and come in two forms: conforming (within Fannie Mae/Freddie Mac limits — currently $766,550 in most markets) and jumbo (above those limits).
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Owner-occupied: 3–5% down (Fannie Mae HomeReady/Home Possible programs)</li>
        <li>Investment property: 15–25% down required</li>
        <li>No upfront mortgage insurance premium (unlike FHA)</li>
        <li>PMI required if less than 20% down, but cancelable once you reach 20% equity</li>
        <li>Typically better rates than FHA for borrowers with good credit (680+)</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">FHA Loans</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        FHA loans are backed by the Federal Housing Administration and require only 3.5% down for borrowers with 580+ credit scores. They're ideal for first-time buyers and house hackers because of the low down payment requirement.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Minimum 3.5% down with 580+ credit score; 10% down with 500–579</li>
        <li>Requires Mortgage Insurance Premium (MIP): 1.75% upfront + 0.55–1.05% annual</li>
        <li>MIP cannot be canceled for loans with less than 10% down (unlike conventional PMI)</li>
        <li>Available for 1–4 unit properties (must occupy one unit)</li>
        <li>Loan limits vary by county</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">VA Loans</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        VA loans are available to eligible veterans, active-duty service members, and surviving spouses. They offer the most favorable terms of any mortgage product:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>0% down payment — no down payment required</li>
        <li>No private mortgage insurance (PMI or MIP)</li>
        <li>Competitive interest rates, often lower than conventional</li>
        <li>One-time funding fee (can be rolled into loan)</li>
        <li>Must occupy the property as primary residence; available for 1–4 unit properties</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        VA loans can be used multiple times throughout a veteran's lifetime, and house hacking with a VA loan is one of the most powerful wealth-building moves available to eligible borrowers.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">How Interest Rates Affect Your Payment</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Interest rates have an enormous impact on monthly payments and total interest paid over the life of a loan. The relationship is not linear — small rate differences create surprisingly large payment differences.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 overflow-x-auto">
        <h4 className="text-white font-semibold mb-4">$300,000 Loan — 30-Year Fixed: Rate Impact on Monthly Payment</h4>
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left pb-2 text-gray-400 font-medium">Rate</th>
              <th className="text-right pb-2 text-gray-400 font-medium">Monthly P&I</th>
              <th className="text-right pb-2 text-gray-400 font-medium">Total Interest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            <tr><td className="py-2">5.0%</td><td className="text-right py-2 text-white">$1,610</td><td className="text-right py-2 text-red-400">$279,767</td></tr>
            <tr><td className="py-2">6.0%</td><td className="text-right py-2 text-white">$1,799</td><td className="text-right py-2 text-red-400">$347,515</td></tr>
            <tr><td className="py-2">7.0%</td><td className="text-right py-2 text-white">$1,996</td><td className="text-right py-2 text-red-400">$418,527</td></tr>
            <tr><td className="py-2">8.0%</td><td className="text-right py-2 text-white">$2,201</td><td className="text-right py-2 text-red-400">$492,367</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        The difference between a 5% and 7% rate on a $300,000 loan is $386/month — that's $4,632/year and $138,760 over 30 years. For rental investors, this directly affects cash flow and deal viability. Higher rates reduce the number of deals that pencil out, which is why savvy investors work harder to find off-market deals when rates rise.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Amortization Explained</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Amortization describes how a loan is paid off over time through regular payments. Each payment is split between interest and principal, but the proportion shifts dramatically over the life of the loan.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        In the early years, the vast majority of each payment goes to interest. On a 30-year, 7% loan, your very first payment might be split roughly 85% interest / 15% principal. By year 20, that ratio inverts — a larger portion goes to principal paydown.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is why real estate investors love leverage: your tenants are paying down your mortgage from day one, building your equity in a property you may have purchased with only 20–25% of your own money. Over 30 years, the loan is paid off entirely by rental income (ideally), and you own the asset outright.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        <strong className="text-white">Making extra principal payments</strong> early in the loan dramatically reduces total interest paid and shortens the loan term. An extra $200/month on a 30-year, $300,000 loan at 7% saves over $100,000 in interest and pays off the loan roughly 7 years early.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Understanding Points and Fees</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        When comparing mortgage offers, looking at the interest rate alone is not enough. You also need to factor in points and fees:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Origination points:</strong> One point = 1% of the loan amount. Paying points upfront ("buying down the rate") lowers your interest rate. Each point typically reduces the rate by 0.25%.</li>
        <li><strong className="text-white">Discount points:</strong> Similar to origination points — paid to buy a lower rate. Calculate the break-even period to determine if it's worthwhile.</li>
        <li><strong className="text-white">APR (Annual Percentage Rate):</strong> The APR includes the interest rate plus fees, expressed as an annualized cost. Comparing APRs across lenders gives a more accurate apples-to-apples comparison than comparing rates alone.</li>
        <li><strong className="text-white">Lender fees:</strong> Underwriting fees, processing fees, and administrative fees vary widely between lenders. Always compare the full Loan Estimate document, not just the rate.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">When to Refinance</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Refinancing replaces your existing mortgage with a new one, typically to achieve one or more of these goals:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Rate-and-term refinance:</strong> Lower your interest rate or change the loan term without taking out cash. The classic scenario: refinance from 7% to 5.5% when rates drop.</li>
        <li><strong className="text-white">Cash-out refinance:</strong> Access equity by taking out a new loan larger than your current balance. Used by investors to fund down payments on new properties.</li>
        <li><strong className="text-white">Remove PMI/MIP:</strong> Refinance once you reach 20% equity to eliminate costly mortgage insurance.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        The classic refinance rule of thumb is the <strong className="text-white">"2% rule"</strong> — refinance if you can drop your rate by at least 2%. However, this is outdated. The real test is the break-even analysis:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Break-Even Period</p>
        <p className="text-xl font-bold text-white">Total Closing Costs ÷ Monthly Savings = Months to Break Even</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        If refinancing costs $5,000 and saves $200/month, your break-even is 25 months. If you plan to keep the property for more than 25 months, the refinance makes financial sense. If you're selling soon, it likely doesn't.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Key Tips for Getting the Best Mortgage</h2>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Shop at least 3–5 lenders.</strong> Rates vary significantly between lenders. Getting multiple quotes within a 45-day window counts as a single hard inquiry on your credit report.</li>
        <li><strong className="text-white">Improve your credit before applying.</strong> Every 20-point improvement in your credit score can meaningfully lower your rate. Pay down revolving balances below 30% utilization and fix any errors.</li>
        <li><strong className="text-white">Make a larger down payment if possible.</strong> A 25% down payment gets better rates than 20% on investment properties. The larger the down payment, the lower the rate.</li>
        <li><strong className="text-white">Consider a mortgage broker.</strong> Brokers have access to wholesale rates from dozens of lenders. Their compensation is typically built into the loan, not an additional out-of-pocket cost.</li>
        <li><strong className="text-white">Lock your rate when it makes sense.</strong> Floating a rate while shopping can save money if rates are falling. In rising rate environments, lock as soon as you find a rate you're comfortable with.</li>
      </ol>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La hipoteca es el motor de la inversión inmobiliaria. Comprender cómo funcionan las hipotecas — cómo se estructuran, se cotizan y se pagan — no es opcional para los inversores serios. La diferencia entre una hipoteca bien elegida y una mal entendida puede ascender fácilmente a decenas de miles de dólares a lo largo de la vida del préstamo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Hipotecas de Tasa Fija vs. Tasa Ajustable</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Hipotecas de Tasa Fija</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Con una hipoteca de tasa fija, tu tasa de interés permanece igual durante toda la vida del préstamo — típicamente 15 o 30 años. Tu pago de capital e intereses nunca cambia, haciendo el presupuesto predecible y protegiéndote de las tasas de interés en aumento.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        La <strong className="text-white">hipoteca fija a 30 años</strong> es con mucho la más popular para inversores. El largo período de amortización mantiene los pagos mensuales bajos, maximizando el flujo de caja. La <strong className="text-white">hipoteca fija a 15 años</strong> tiene una tasa de interés más baja (típicamente 0.5–0.75% menos) y construye capital mucho más rápido, pero el mayor pago mensual reduce el flujo de caja.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Hipotecas de Tasa Ajustable (ARM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las ARM comienzan con una tasa fija durante un período inicial (típicamente 5, 7 o 10 años), luego se ajustan periódicamente según un índice de mercado. Una ARM 7/1 es fija por 7 años, luego se ajusta anualmente. Las ARM pueden tener sentido para tenencias a corto plazo, pero para alquileres a largo plazo, la certeza de pago de una tasa fija generalmente supera el ahorro inicial en tasa.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tipos de Préstamos: Convencional, FHA, VA y de Cartera</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Préstamos Convencionales</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los préstamos convencionales no están respaldados por el gobierno. Son el pilar del financiamiento de propiedades de inversión.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Propiedad ocupada por el propietario: 3–5% de entrada</li>
        <li>Propiedad de inversión: 15–25% de entrada requerido</li>
        <li>Sin prima de seguro hipotecario por adelantado (a diferencia del FHA)</li>
        <li>PMI requerido si menos del 20% de entrada, pero cancelable al alcanzar el 20% de capital</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Préstamos FHA</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los préstamos FHA requieren solo el 3.5% de entrada para prestatarios con puntajes de crédito de 580+. Son ideales para compradores por primera vez y house hackers debido al bajo requisito de pago inicial. Requieren Prima de Seguro Hipotecario (MIP): 1.75% por adelantado + 0.55–1.05% anual. Disponibles para propiedades de 1–4 unidades (debes ocupar una unidad).
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Préstamos VA</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Disponibles para veteranos elegibles, miembros en servicio activo y cónyuges sobrevivientes. Ofrecen los términos más favorables de cualquier producto hipotecario: 0% de pago inicial, sin PMI o MIP, tasas competitivas, y disponibles para propiedades de 1–4 unidades (debes ocupar la propiedad como residencia principal).
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Cómo las Tasas de Interés Afectan Tu Pago</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las tasas de interés tienen un enorme impacto en los pagos mensuales y el total de intereses pagados durante la vida del préstamo. Las pequeñas diferencias en las tasas crean diferencias sorprendentemente grandes en los pagos.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 overflow-x-auto">
        <h4 className="text-white font-semibold mb-4">Préstamo de $300,000 — Fijo a 30 años: Impacto de la Tasa en el Pago Mensual</h4>
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left pb-2 text-gray-400 font-medium">Tasa</th>
              <th className="text-right pb-2 text-gray-400 font-medium">Pago Mensual</th>
              <th className="text-right pb-2 text-gray-400 font-medium">Total de Intereses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            <tr><td className="py-2">5.0%</td><td className="text-right py-2 text-white">$1,610</td><td className="text-right py-2 text-red-400">$279,767</td></tr>
            <tr><td className="py-2">6.0%</td><td className="text-right py-2 text-white">$1,799</td><td className="text-right py-2 text-red-400">$347,515</td></tr>
            <tr><td className="py-2">7.0%</td><td className="text-right py-2 text-white">$1,996</td><td className="text-right py-2 text-red-400">$418,527</td></tr>
            <tr><td className="py-2">8.0%</td><td className="text-right py-2 text-white">$2,201</td><td className="text-right py-2 text-red-400">$492,367</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        La diferencia entre una tasa del 5% y del 7% en un préstamo de $300,000 es de $386/mes — eso es $4,632/año y $138,760 en 30 años. Para los inversores en alquileres, esto afecta directamente el flujo de caja y la viabilidad del negocio.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Amortización Explicada</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La amortización describe cómo se paga un préstamo con el tiempo mediante pagos regulares. Cada pago se divide entre intereses y capital, pero la proporción cambia drásticamente a lo largo de la vida del préstamo.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        En los primeros años, la gran mayoría de cada pago va a intereses. En un préstamo a 30 años al 7%, tu primer pago podría dividirse aproximadamente en 85% intereses / 15% capital. Para el año 20, esa proporción se invierte.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Esto es por qué los inversores en bienes raíces aman el apalancamiento: tus inquilinos pagan tu hipoteca desde el primer día, construyendo tu capital en una propiedad que quizás compraste con solo el 20–25% de tu propio dinero. A lo largo de 30 años, el préstamo se paga completamente con los ingresos del alquiler (idealmente), y eres propietario del activo sin deudas.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Entendiendo Puntos y Comisiones</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Al comparar ofertas hipotecarias, mirar solo la tasa de interés no es suficiente. También debes considerar los puntos y comisiones. Un punto equivale al 1% del monto del préstamo. Pagar puntos por adelantado ("comprar la tasa") reduce tu tasa de interés. La APR (Tasa de Porcentaje Anual) incluye la tasa de interés más las comisiones — comparar APRs entre prestamistas da una comparación más precisa.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Cuándo Refinanciar</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Refinanciar reemplaza tu hipoteca existente con una nueva. Las razones principales incluyen: reducir tu tasa de interés, acceder al capital mediante un refinanciamiento con extracción de efectivo, o eliminar el seguro hipotecario costoso una vez que alcanzas el 20% de capital.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        La prueba real es el análisis de punto de equilibrio:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Período de Punto de Equilibrio</p>
        <p className="text-xl font-bold text-white">Costos Totales de Cierre ÷ Ahorro Mensual = Meses para Recuperar la Inversión</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Si refinanciar cuesta $5,000 y ahorra $200/mes, tu punto de equilibrio es 25 meses. Si planeas conservar la propiedad más de 25 meses, el refinanciamiento tiene sentido financiero.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Consejos Clave para Obtener la Mejor Hipoteca</h2>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Compara al menos 3–5 prestamistas.</strong> Las tasas varían significativamente entre prestamistas. Obtener múltiples cotizaciones dentro de una ventana de 45 días cuenta como una sola consulta en tu informe de crédito.</li>
        <li><strong className="text-white">Mejora tu crédito antes de solicitar.</strong> Cada mejora de 20 puntos en tu puntaje de crédito puede reducir significativamente tu tasa. Paga los saldos de crédito rotativo por debajo del 30% de utilización.</li>
        <li><strong className="text-white">Haz un pago inicial más grande si es posible.</strong> Un pago inicial del 25% obtiene mejores tasas que el 20% en propiedades de inversión.</li>
        <li><strong className="text-white">Considera un corredor hipotecario.</strong> Los corredores tienen acceso a tasas mayoristas de docenas de prestamistas.</li>
        <li><strong className="text-white">Bloquea tu tasa cuando tenga sentido.</strong> En entornos de tasas en alza, bloquea tan pronto como encuentres una tasa con la que te sientas cómodo.</li>
      </ol>
    </div>
  )
}

export function UnderstandingMortgages() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="Understanding Mortgages: What Every Investor Needs to Know"
      titleEs="Entendiendo las Hipotecas: Lo que Todo Inversor Necesita Saber"
      readTimeEn="10 min read"
      readTimeEs="10 min de lectura"
      categoryEn="Financing"
      categoryEs="Financiamiento"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Model Your Mortgage Payment' : 'Modela Tu Pago Hipotecario'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use the Mortgage Calculator to compare loan scenarios, see your full amortization schedule, and understand exactly how your rate affects your monthly payment.'
            : 'Usa la Calculadora de Hipotecas para comparar escenarios de préstamos, ver tu calendario de amortización completo y entender exactamente cómo tu tasa afecta tu pago mensual.'}
        </p>
        <Link
          to="/tools/mortgage_calculator"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Mortgage Calculator' : 'Abrir Calculadora de Hipotecas'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
