import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Owning one rental property is an achievement. Owning fifteen is a business. The gap between those two outcomes is bridged by strategy, patience, and a system for compounding gains rather than starting from zero with every deal. This guide lays out the proven path from your first property to a diversified portfolio — and how to use the tools and structures available to accelerate the journey.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Phase 1: Getting the Foundation Right (Properties 1–2)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most investors who fail to scale do so because they get Property #1 wrong. A bad first deal — one with negative cash flow, deferred maintenance time bombs, or a bad tenant from the start — drains both capital and motivation. Your first two properties should be conservative, thoroughly analyzed, and chosen to maximize learning.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Key principles for your first two deals:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Buy in a market you understand.</strong> Local knowledge is a real edge. You know the good and bad neighborhoods, the employer landscape, and the rental comps.</li>
        <li><strong className="text-white">Prioritize cash flow over appreciation.</strong> Appreciation is unpredictable. Cash flow is monthly income you can bank on. For beginners, cash flow provides the financial cushion to survive mistakes.</li>
        <li><strong className="text-white">Build reserves immediately.</strong> Keep 3–6 months of expenses per property in a dedicated savings account. Never enter a deal without a plan for vacancies, major repairs, and unexpected costs.</li>
        <li><strong className="text-white">Self-manage your first property.</strong> Even if you eventually plan to hire a manager, managing one property yourself teaches you what to look for in a property manager and gives you an irreplaceable understanding of the business.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Your goal during this phase: stabilize both properties, build tenant relationships, and start accumulating equity. You're not trying to get rich — you're building the platform that will make the next phase possible.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Phase 2: Leveraging Equity to Scale (Properties 3–6)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        After 2–4 years of owning your first properties, one of the most powerful moves available to you is using the equity you've built to fund the next deal — without depleting your savings.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Cash-Out Refinance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A cash-out refinance replaces your existing mortgage with a new, larger loan. The difference between the new loan balance and the old one is paid out to you in cash. For example, if a property is worth $300,000, you have $80,000 in equity (original loan is now $220,000 after paydown), and the lender allows you to cash out to 75% LTV ($225,000), you'd net approximately $5,000 after paying off the existing mortgage. That cash can fund a new down payment.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The mechanics vary — the key is that you're converting illiquid equity into deployable capital without selling the asset. The original property keeps generating cash flow and appreciating. You're recycling one asset's gains into a new one.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">HELOC (Home Equity Line of Credit)</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        A HELOC works like a credit card secured by your property's equity. Instead of a lump-sum cash-out, you get a revolving line of credit — draw what you need, pay it back, draw again. HELOCs typically come with variable interest rates and a 10-year draw period. They're flexible tools for funding down payments or renovation costs, but discipline is required to avoid over-leveraging.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The 1031 Exchange: Selling Without Paying Tax</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        One of the most powerful wealth-preserving tools in real estate investing is the 1031 Exchange, named after Section 1031 of the IRS tax code. When you sell an investment property, you normally owe capital gains tax on the profit. With a properly executed 1031 Exchange, you can defer that tax indefinitely by reinvesting the proceeds into a "like-kind" replacement property.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The rules are strict:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>You must identify the replacement property within <strong className="text-white">45 days</strong> of the sale.</li>
        <li>You must close on the replacement property within <strong className="text-white">180 days</strong> of the sale.</li>
        <li>The replacement property must be of equal or greater value.</li>
        <li>You cannot touch the sale proceeds — they must be held by a Qualified Intermediary (QI).</li>
        <li>You can exchange into multiple properties (up to 3 under the standard "3-property rule").</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Why this matters for scaling: imagine you bought a duplex for $200,000, it's now worth $400,000, and you want to sell it and upgrade to a 6-unit building. Without a 1031, you'd owe capital gains tax on $200,000 of profit — potentially $30,000–$60,000+ depending on your tax bracket. With a 1031, that entire $200,000 stays working for you in the new property.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Investors who master the 1031 Exchange can trade up to larger properties repeatedly throughout their investing career, compounding wealth tax-deferred. Some investors eventually hold appreciated properties until death, when heirs receive a "stepped-up" basis and the embedded capital gains disappear entirely.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Scaling Strategies That Actually Work</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">The BRRR Method</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        BRRR (Buy, Rehab, Rent, Refinance, Repeat) is one of the fastest portfolio-scaling strategies available. Instead of saving a new down payment for each deal, you force-appreciate a distressed property through renovation, refinance to pull out your invested capital, and redeploy it. At its best, BRRR allows investors to scale with little to no money left in each deal. It requires deal-finding skill, rehab management experience, and market knowledge, but the capital efficiency is unmatched.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">House Hacking to Portfolio Hacking</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Many investors who start with a house hack — buying a multi-unit property and living in one unit — move out after 12 months and repeat the process. Over 5–7 years, this "house hacking chain" can produce a portfolio of 3–5 properties, each purchased with owner-occupied financing (lower down payments, better interest rates), each now fully rented and cash flowing.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">The Snowball: Reinvesting Cash Flow</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Each property added to your portfolio generates additional monthly cash flow. If you systematically reinvest that cash flow rather than spending it, you accelerate the timeline to your next down payment. An investor with five properties generating $400/month each has $2,000/month flowing into a down payment fund — that's $24,000/year toward the next deal.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Phase 3: Building an Actual Business (Properties 7–15)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        At 7+ properties, self-management becomes a second full-time job. This is the point where most serious investors bring in professional property management — typically at 8–12% of gross rents. The math: if you're collecting $15,000/month in rent across 10 properties, a 10% management fee is $1,500/month. In exchange, you free up dozens of hours and gain the ability to invest in any market, not just your backyard.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Other infrastructure to build as your portfolio scales:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">LLC structure.</strong> As your portfolio grows, liability protection becomes more important. Many investors hold properties in individual LLCs or series LLCs. Consult with a real estate attorney about the right structure for your state and situation.</li>
        <li><strong className="text-white">Business bank accounts.</strong> Separate your personal and business finances from day one. It simplifies bookkeeping, improves your credibility with lenders, and protects you legally.</li>
        <li><strong className="text-white">Real estate CPA.</strong> A CPA who specializes in real estate will find deductions and structuring opportunities that a generalist will miss. Depreciation, cost segregation studies, the real estate professional tax election — these are worth thousands of dollars annually.</li>
        <li><strong className="text-white">Property management software.</strong> At 5+ units, software like AppFolio, Buildium, or Rent Manager is worth the monthly cost in time savings alone.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Portfolio Analysis: Know Your Numbers Across All Properties</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        As your portfolio grows, ad-hoc analysis no longer works. You need a consolidated view of:
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Per-Property Metrics</p>
            <ul className="space-y-1.5 text-gray-300">
              <li>Monthly cash flow</li>
              <li>Cash-on-cash return</li>
              <li>Cap rate</li>
              <li>Current equity position</li>
              <li>Occupancy rate</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Portfolio-Level Metrics</p>
            <ul className="space-y-1.5 text-gray-300">
              <li>Total portfolio value</li>
              <li>Total monthly income</li>
              <li>Blended cap rate</li>
              <li>Total equity across all properties</li>
              <li>Portfolio cash-on-cash return</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Our <strong className="text-white">Portfolio Analyzer</strong> is designed exactly for this — it supports up to 15 properties and gives you a consolidated dashboard with both per-property breakdowns and portfolio-level totals. You can see at a glance which properties are underperforming, where your equity is concentrated, and what your blended returns look like across the entire portfolio.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Regularly reviewing these numbers — monthly for cash flow, quarterly for equity — helps you make strategic decisions about when to refinance, when to sell and 1031 into a larger asset, and where to focus your next acquisition.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Managing Multiple Properties: Systems Over Heroics</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Investors who run 10+ properties successfully don't do it by working harder — they do it by building systems:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Standardized tenant intake process.</strong> Same application, same screening criteria, same lease template for every property. Consistency prevents legal risk and saves time.</li>
        <li><strong className="text-white">Annual rent reviews.</strong> Set a calendar reminder each year to compare your rents to current market rates. Below-market rents are quietly eroding your returns.</li>
        <li><strong className="text-white">Preventive maintenance schedule.</strong> HVAC filters changed quarterly, gutters cleaned annually, roof inspected every 3 years — proactive maintenance prevents emergency calls.</li>
        <li><strong className="text-white">Insurance review.</strong> As your portfolio grows, an umbrella policy and a landlord policy (not just standard homeowner's insurance) are essential. Review coverage amounts annually.</li>
        <li><strong className="text-white">Vendor relationships.</strong> A reliable plumber, electrician, and handyman who know your properties and give you preferential pricing are more valuable than any app.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        The goal is to operate like a business, not a hobbyist. Every process that is systematized is one less thing that depends on you personally — which means the portfolio can grow without your involvement growing proportionally.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Financing at Scale: What Changes</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Conventional financing becomes more complicated as your portfolio grows. Fannie Mae limits conventional financing to 10 financed properties per borrower. Beyond that, investors typically turn to:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Portfolio loans.</strong> Offered by local banks and credit unions, these are loans the lender holds on their own books rather than selling to the secondary market. They're more flexible on property count and can be underwritten based on the portfolio's performance rather than personal income.</li>
        <li><strong className="text-white">DSCR loans.</strong> Debt Service Coverage Ratio loans qualify based on the property's income, not the borrower's W-2. The property must generate enough NOI to cover the mortgage payment at a specified ratio (typically 1.2x). No tax returns required.</li>
        <li><strong className="text-white">Commercial loans.</strong> For 5+ unit properties, commercial financing is the standard. Terms differ significantly from residential: shorter amortization periods (20–25 years), balloon payments, and stricter DSCR requirements.</li>
        <li><strong className="text-white">Private money and hard money.</strong> For acquisitions and rehabs that don't fit conventional criteria, private lenders and hard money lenders provide short-term capital at higher rates but with faster approval and more flexibility.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Building relationships with community banks early in your investing career pays dividends as you scale. A local bank that knows your track record and has seen your financials is far more likely to get creative on financing for your 12th property than an institutional lender seeing you for the first time.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Long Game: Compounding Over Decades</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Real estate's greatest power is time. An investor who buys one rental property per year for 10 years, reinvests cash flow, and executes a 1031 exchange when trading up could realistically retire on the portfolio's income. The compounding is not flashy year by year — but over a decade or two, it becomes transformational.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The investors who build wealth in real estate consistently share common traits: they analyze every deal rigorously, they don't overextend, they hold through market cycles rather than panic-selling, and they keep buying even when the market feels uncertain. The strategy works because the fundamentals — people need housing, supply is constrained, inflation erodes the real cost of fixed-rate debt — are structural forces that have persisted across every economic cycle in modern history.
      </p>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Tener una propiedad de alquiler es un logro. Tener quince es un negocio. La diferencia entre estos dos resultados se construye con estrategia, paciencia y un sistema para multiplicar las ganancias en lugar de empezar desde cero con cada negocio. Esta guía traza el camino probado desde tu primera propiedad hasta una cartera diversificada, y cómo usar las herramientas y estructuras disponibles para acelerar el camino.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Fase 1: Construir la Base Correcta (Propiedades 1–2)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mayoría de los inversores que no logran escalar lo hacen porque cometen errores en la Propiedad #1. Un primer negocio malo — uno con flujo de caja negativo, problemas de mantenimiento ocultos o un mal inquilino desde el inicio — agota tanto el capital como la motivación. Tus primeras dos propiedades deben ser conservadoras, analizadas a fondo y elegidas para maximizar el aprendizaje.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Principios clave para tus primeros dos negocios:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Compra en un mercado que conozcas.</strong> El conocimiento local es una ventaja real. Conoces los buenos y malos vecindarios, el panorama de empleadores y las rentas comparables.</li>
        <li><strong className="text-white">Prioriza el flujo de caja sobre la apreciación.</strong> La apreciación es impredecible. El flujo de caja es ingreso mensual en el que puedes confiar. Para principiantes, el flujo de caja proporciona el colchón financiero para sobrevivir errores.</li>
        <li><strong className="text-white">Construye reservas inmediatamente.</strong> Mantén 3–6 meses de gastos por propiedad en una cuenta de ahorros dedicada. Nunca entres a un negocio sin un plan para vacantes, reparaciones mayores y costos inesperados.</li>
        <li><strong className="text-white">Administra tú mismo tu primera propiedad.</strong> Aunque eventualmente planees contratar un administrador, gestionar una propiedad por tu cuenta te enseña qué buscar en un administrador y te da una comprensión irremplazable del negocio.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Tu objetivo durante esta fase: estabilizar ambas propiedades, construir relaciones con inquilinos y comenzar a acumular capital. No estás tratando de enriquecerte — estás construyendo la plataforma que hará posible la siguiente fase.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Fase 2: Apalancar el Capital para Escalar (Propiedades 3–6)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Después de 2–4 años de poseer tus primeras propiedades, uno de los movimientos más poderosos disponibles es usar el capital acumulado para financiar el próximo negocio, sin agotar tus ahorros.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Refinanciamiento con Extracción de Efectivo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un refinanciamiento con extracción de efectivo reemplaza tu hipoteca existente con un nuevo préstamo más grande. La diferencia entre el nuevo saldo del préstamo y el antiguo se te paga en efectivo. Por ejemplo, si una propiedad vale $300,000, tienes $80,000 en capital (el préstamo original ahora es de $220,000) y el prestamista te permite retirar hasta el 75% del valor ($225,000), recibirías aproximadamente $5,000 en efectivo después de pagar la hipoteca existente. Ese efectivo puede financiar un nuevo pago inicial.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mecánica varía, pero la clave es que estás convirtiendo capital no líquido en capital desplegable sin vender el activo. La propiedad original sigue generando flujo de caja y apreciándose. Estás reciclando las ganancias de un activo en uno nuevo.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">HELOC (Línea de Crédito sobre el Valor de la Vivienda)</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Un HELOC funciona como una tarjeta de crédito garantizada por el capital de tu propiedad. En lugar de un retiro de efectivo en suma global, obtienes una línea de crédito revolvente: retira lo que necesites, devuélvelo, retira de nuevo. Los HELOCs suelen tener tasas de interés variables y un período de retiro de 10 años. Son herramientas flexibles para financiar pagos iniciales o costos de renovación, pero se requiere disciplina para evitar el apalancamiento excesivo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Intercambio 1031: Vender Sin Pagar Impuestos</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una de las herramientas de preservación de riqueza más poderosas en la inversión inmobiliaria es el Intercambio 1031, llamado así por la Sección 1031 del código tributario del IRS. Al vender una propiedad de inversión, normalmente debes impuestos sobre las ganancias de capital. Con un Intercambio 1031 correctamente ejecutado, puedes diferir ese impuesto indefinidamente reinvirtiendo los ingresos en una propiedad de "tipo similar".
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las reglas son estrictas:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Debes identificar la propiedad de reemplazo dentro de <strong className="text-white">45 días</strong> de la venta.</li>
        <li>Debes cerrar la propiedad de reemplazo dentro de <strong className="text-white">180 días</strong> de la venta.</li>
        <li>La propiedad de reemplazo debe ser de igual o mayor valor.</li>
        <li>No puedes tocar los ingresos de la venta — deben ser retenidos por un Intermediario Calificado (QI).</li>
        <li>Puedes intercambiar por múltiples propiedades (hasta 3 bajo la "regla de 3 propiedades").</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Por qué esto importa para escalar: imagina que compraste un dúplex por $200,000, ahora vale $400,000 y quieres venderlo y pasar a un edificio de 6 unidades. Sin un 1031, deberías impuestos sobre ganancias de capital por $200,000 de ganancia — potencialmente $30,000–$60,000+ dependiendo de tu tramo impositivo. Con un 1031, esos $200,000 completos siguen trabajando para ti en la nueva propiedad.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Los inversores que dominan el Intercambio 1031 pueden mejorar a propiedades más grandes repetidamente a lo largo de su carrera inversora, multiplicando su riqueza con impuestos diferidos. Algunos inversores eventualmente mantienen propiedades apreciadas hasta la muerte, cuando los herederos reciben una "base ajustada" y las ganancias de capital implícitas desaparecen por completo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estrategias de Escalado que Funcionan</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">El Método BRRR</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        BRRR (Comprar, Rehabilitar, Rentar, Refinanciar, Repetir) es una de las estrategias de escalado de cartera más rápidas disponibles. En lugar de ahorrar un nuevo pago inicial para cada negocio, fuerzas la apreciación de una propiedad deteriorada mediante renovación, refinancias para recuperar tu capital invertido y lo vuelves a desplegar. En su mejor versión, BRRR permite a los inversores escalar con poco o ningún dinero inmovilizado en cada negocio. Requiere habilidad para encontrar negocios, experiencia en gestión de rehabilitación y conocimiento del mercado, pero la eficiencia de capital es incomparable.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Del House Hacking al Portfolio Hacking</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Muchos inversores que empiezan con un house hack — comprando una propiedad multiunitaria y viviendo en una unidad — se mudan después de 12 meses y repiten el proceso. En 5–7 años, esta "cadena de house hacking" puede producir una cartera de 3–5 propiedades, cada una comprada con financiamiento de propietario ocupante (pagos iniciales más bajos, mejores tasas de interés), cada una ahora completamente alquilada y con flujo de caja.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">La Bola de Nieve: Reinvertir el Flujo de Caja</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Cada propiedad añadida a tu cartera genera flujo de caja mensual adicional. Si reinviertes sistemáticamente ese flujo de caja en lugar de gastarlo, aceleras el plazo para tu próximo pago inicial. Un inversor con cinco propiedades generando $400/mes cada una tiene $2,000/mes fluyendo hacia un fondo de pago inicial — eso es $24,000/año hacia el próximo negocio.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Fase 3: Construir un Negocio Real (Propiedades 7–15)</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Con 7 o más propiedades, la autogestión se convierte en un segundo trabajo a tiempo completo. Este es el punto en que la mayoría de los inversores serios incorporan administración profesional de propiedades — típicamente al 8–12% de las rentas brutas. La matemática: si estás cobrando $15,000/mes en renta en 10 propiedades, una comisión del 10% es $1,500/mes. A cambio, liberas docenas de horas y obtienes la capacidad de invertir en cualquier mercado.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Otra infraestructura a construir conforme tu cartera escala:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Estructura LLC.</strong> A medida que tu cartera crece, la protección de responsabilidad se vuelve más importante. Muchos inversores mantienen propiedades en LLCs individuales o LLCs en serie. Consulta con un abogado inmobiliario sobre la estructura correcta para tu estado y situación.</li>
        <li><strong className="text-white">Cuentas bancarias empresariales.</strong> Separa tus finanzas personales y comerciales desde el primer día. Simplifica la contabilidad, mejora tu credibilidad con los prestamistas y te protege legalmente.</li>
        <li><strong className="text-white">CPA de bienes raíces.</strong> Un CPA especializado en bienes raíces encontrará deducciones y oportunidades de estructuración que un generalista pasará por alto — depreciación, estudios de segregación de costos, la elección de profesional inmobiliario.</li>
        <li><strong className="text-white">Software de administración de propiedades.</strong> Con 5 o más unidades, el software como AppFolio o Buildium vale el costo mensual solo en ahorro de tiempo.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Análisis de Cartera: Conoce tus Números en Todas las Propiedades</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A medida que tu cartera crece, el análisis ad hoc ya no funciona. Necesitas una vista consolidada de:
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Métricas por Propiedad</p>
            <ul className="space-y-1.5 text-gray-300">
              <li>Flujo de caja mensual</li>
              <li>Retorno cash-on-cash</li>
              <li>Tasa de capitalización</li>
              <li>Posición de capital actual</li>
              <li>Tasa de ocupación</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Métricas de la Cartera</p>
            <ul className="space-y-1.5 text-gray-300">
              <li>Valor total de la cartera</li>
              <li>Ingreso mensual total</li>
              <li>Tasa de capitalización combinada</li>
              <li>Capital total en todas las propiedades</li>
              <li>Retorno cash-on-cash de la cartera</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nuestro <strong className="text-white">Analizador de Cartera</strong> está diseñado exactamente para esto — admite hasta 15 propiedades y te proporciona un panel consolidado con desglose por propiedad y totales a nivel de cartera. Puedes ver de un vistazo qué propiedades tienen un rendimiento inferior, dónde se concentra tu capital y cómo lucen tus retornos combinados en toda la cartera.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Revisar regularmente estos números — mensualmente para el flujo de caja, trimestralmente para el capital — te ayuda a tomar decisiones estratégicas sobre cuándo refinanciar, cuándo vender y hacer un 1031 en un activo mayor, y en qué enfocarte en tu próxima adquisición.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Gestionar Múltiples Propiedades: Sistemas sobre Heroísmo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los inversores que gestionan 10 o más propiedades con éxito no lo hacen trabajando más duro — lo hacen construyendo sistemas:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Proceso estandarizado de admisión de inquilinos.</strong> La misma solicitud, los mismos criterios de selección, la misma plantilla de arrendamiento para cada propiedad. La coherencia previene el riesgo legal y ahorra tiempo.</li>
        <li><strong className="text-white">Revisiones anuales de renta.</strong> Establece un recordatorio anual en el calendario para comparar tus rentas con las tasas actuales del mercado. Las rentas por debajo del mercado están erosionando silenciosamente tus retornos.</li>
        <li><strong className="text-white">Programa de mantenimiento preventivo.</strong> Filtros de HVAC cambiados trimestralmente, canaletas limpiadas anualmente, techo inspeccionado cada 3 años — el mantenimiento proactivo previene llamadas de emergencia.</li>
        <li><strong className="text-white">Revisión de seguros.</strong> A medida que crece tu cartera, una póliza paraguas y una póliza de arrendador son esenciales. Revisa los montos de cobertura anualmente.</li>
        <li><strong className="text-white">Relaciones con proveedores.</strong> Un plomero, electricista y manitas confiables que conocen tus propiedades y te dan precios preferenciales son más valiosos que cualquier aplicación.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        El objetivo es operar como un negocio, no como un aficionado. Cada proceso que se sistematiza es una cosa menos que depende de ti personalmente, lo que significa que la cartera puede crecer sin que tu participación crezca proporcionalmente.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Juego a Largo Plazo: Capitalización en Décadas</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El mayor poder de los bienes raíces es el tiempo. Un inversor que compra una propiedad de alquiler por año durante 10 años, reinvierte el flujo de caja y ejecuta un intercambio 1031 al mejorar podría retirarse de manera realista con los ingresos de la cartera. La capitalización no es espectacular año tras año — pero en una o dos décadas, se vuelve transformadora.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Los inversores que construyen riqueza en bienes raíces comparten consistentemente rasgos comunes: analizan cada negocio rigurosamente, no se sobreextienden, mantienen las inversiones a través de los ciclos del mercado en lugar de vender en pánico y siguen comprando incluso cuando el mercado se siente incierto. La estrategia funciona porque los fundamentos — las personas necesitan vivienda, la oferta está restringida, la inflación erosiona el costo real de la deuda a tasa fija — son fuerzas estructurales que han persistido en todos los ciclos económicos de la historia moderna.
      </p>
    </div>
  )
}

export function BuildingAPortfolio() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="From 1 to 15 Properties: How to Build a Real Estate Portfolio"
      titleEs="De 1 a 15 Propiedades: Cómo Construir una Cartera Inmobiliaria"
      readTimeEn="13 min read"
      readTimeEs="13 min de lectura"
      categoryEn="Portfolio"
      categoryEs="Cartera"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Analyze Your Entire Portfolio in One Place' : 'Analiza Toda tu Cartera en un Solo Lugar'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Our Portfolio Analyzer supports up to 15 properties — see per-property metrics and portfolio-level totals, including total equity, blended cap rate, and overall cash-on-cash return.'
            : 'Nuestro Analizador de Cartera admite hasta 15 propiedades — ve métricas por propiedad y totales a nivel de cartera, incluyendo capital total, tasa de capitalización combinada y retorno cash-on-cash general.'}
        </p>
        <Link
          to="/tools/portfolio_analyzer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Portfolio Analyzer' : 'Abrir Analizador de Cartera'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
