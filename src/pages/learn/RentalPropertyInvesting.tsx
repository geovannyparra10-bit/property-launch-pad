import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Rental property investing is one of the most reliable paths to long-term wealth ever discovered. Unlike stocks, which can disappear overnight in a market crash, rental properties generate monthly income, appreciate over time, offer significant tax advantages, and can be leveraged with borrowed money to amplify returns. This guide walks you through everything a beginner needs to know to buy their first rental property with confidence.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Understanding Cash Flow: The Foundation of Rental Investing</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cash flow is the money left over each month after all expenses have been paid. It's the heartbeat of a rental investment — positive cash flow means the property is generating profit; negative cash flow means you're subsidizing the property out of your own pocket.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The formula for monthly cash flow is straightforward:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Monthly Cash Flow</p>
        <p className="text-xl font-bold text-white">Gross Rent − Vacancy − Operating Expenses − Mortgage Payment</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Common operating expenses include property management (8–12% of rent), repairs and maintenance (typically 5–10% of rent annually), property taxes, insurance, HOA fees, and capital expenditure reserves (setting aside money for big future expenses like a new roof or HVAC).
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        A popular rule of thumb is the <strong className="text-white">50% Rule</strong>: expect roughly 50% of your gross rent to be consumed by expenses (excluding the mortgage). So if a property rents for $2,000/month, you can estimate $1,000 in expenses — and the remaining $1,000 goes toward the mortgage. Whatever's left after that is your cash flow.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Another quick filter is the <strong className="text-white">1% Rule</strong>: a property should rent for at least 1% of its purchase price per month. A $150,000 property should rent for $1,500/month. This doesn't guarantee profitability, but it ensures a starting baseline. In expensive coastal markets the 1% rule is rarely achievable — investors in those markets often accept low or breakeven cash flow in exchange for appreciation upside.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Key Metrics: Cap Rate and Cash-on-Cash Return</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Two numbers every rental investor should understand before making an offer:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Cap Rate (Capitalization Rate)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The cap rate measures the property's income relative to its value, independent of financing. It's calculated as:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">Cap Rate = Net Operating Income ÷ Property Value</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Net Operating Income (NOI) is gross rent minus all operating expenses (not including the mortgage). If a property generates $15,000/year in NOI and is valued at $200,000, the cap rate is 7.5%. Cap rates vary widely by market — 4–5% is typical in expensive cities, while 8–10%+ is achievable in secondary and tertiary markets.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Cash-on-Cash Return</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cash-on-cash (CoC) return measures the actual cash profit relative to the cash you invested. Unlike cap rate, it accounts for your specific financing terms:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">CoC = Annual Cash Flow ÷ Total Cash Invested</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        If you invested $40,000 (down payment + closing costs) and the property produces $3,600/year in cash flow, your CoC return is 9%. Most investors target a minimum of 8–10% CoC. This metric lets you directly compare a rental investment to other uses of your capital (stocks, savings accounts, etc.).
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Finding the Right Market</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Where you invest matters as much as what you invest in. The best rental markets balance strong rental demand, reasonable purchase prices, and favorable landlord-tenant laws. Key indicators to research before committing to a market:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Population and job growth:</strong> Growing populations drive rental demand. Look for cities with diverse, expanding economies — not single-employer towns.</li>
        <li><strong className="text-white">Rent-to-price ratio:</strong> Compare median home prices to median rents. Markets with high ratios (closer to the 1% rule) produce better cash flow.</li>
        <li><strong className="text-white">Vacancy rates:</strong> Low vacancy rates (below 5%) indicate healthy rental demand. High vacancy suggests oversupply or weak demand.</li>
        <li><strong className="text-white">Landlord-tenant laws:</strong> Some states heavily favor tenants (California, New York), making evictions slow and expensive. Others lean toward landlords (Texas, Georgia, Florida). Know the rules before you buy.</li>
        <li><strong className="text-white">Property taxes:</strong> High property taxes in states like New Jersey or Illinois can significantly eat into cash flow. Factor them in during analysis.</li>
        <li><strong className="text-white">Insurance costs:</strong> Properties in hurricane, flood, or wildfire zones carry elevated insurance premiums. Check these before buying.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Many investors successfully invest out of state in more affordable markets with better cash flow. Long-distance investing is viable when you have a strong local property manager and team in place.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Screening Tenants: Your Most Important Decision</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A bad tenant can turn a profitable investment into a nightmare — unpaid rent, property damage, costly evictions, and months of vacancy. Thorough tenant screening is your primary risk management tool.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        A professional tenant screening process should evaluate:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Income verification:</strong> Require gross monthly income of at least 3x the monthly rent. Request pay stubs, bank statements, or tax returns.</li>
        <li><strong className="text-white">Credit check:</strong> Look for scores above 620 as a baseline. Pay attention to collections, eviction judgments, and patterns of late payments.</li>
        <li><strong className="text-white">Background check:</strong> Criminal history, sex offender registry, and prior eviction records.</li>
        <li><strong className="text-white">Rental history:</strong> Contact previous landlords directly (not just those listed by the applicant). Ask if they'd rent to this person again.</li>
        <li><strong className="text-white">Employment verification:</strong> Verify employer directly via phone — don't rely solely on documents that could be falsified.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Always apply consistent, documented criteria to every applicant to comply with Fair Housing laws. Never make decisions based on protected characteristics (race, religion, national origin, sex, disability, familial status). Create a written screening policy and stick to it.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Property Management: Self-Manage or Hire Out?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        One of the first decisions every landlord faces is whether to manage the property themselves or hire a professional property manager. Both have real tradeoffs:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
          <h4 className="text-green-400 font-semibold mb-3">Self-Management</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Save 8–12% of rent monthly</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Direct control over tenant selection</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Learn the business firsthand</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Time-intensive — nights and weekends</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Requires local presence</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Emotional involvement complicates decisions</li>
          </ul>
        </div>
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5">
          <h4 className="text-blue-400 font-semibold mb-3">Professional Manager</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Passive — no landlord calls</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Enables out-of-state investing</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Professional tenant screening</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Costs 8–12% of monthly rent</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Quality varies widely</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Less control over day-to-day decisions</li>
          </ul>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Most beginners self-manage their first 1–2 properties to learn the business and maximize cash flow. As your portfolio grows, professional management allows you to scale without proportionally increasing your workload.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Building a Portfolio Over Time</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The most common path to a multi-property portfolio follows a repeatable cycle:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-6 ml-4">
        <li><strong className="text-white">Buy Property #1.</strong> Save a 20–25% down payment (or use house hacking with 3.5% FHA). Analyze rigorously. Buy conservatively.</li>
        <li><strong className="text-white">Stabilize and build cash reserves.</strong> Maintain 3–6 months of expenses in reserves per property. Don't stretch thin.</li>
        <li><strong className="text-white">Build equity and cash flow.</strong> Tenant pays down your mortgage while the property appreciates. Your net worth grows passively.</li>
        <li><strong className="text-white">Leverage equity for the next deal.</strong> A cash-out refinance or HELOC lets you access equity from Property #1 to fund the down payment on Property #2 — without depleting your savings.</li>
        <li><strong className="text-white">Repeat and scale.</strong> Each property adds cash flow and equity. The compounding effect accelerates over time.</li>
      </ol>
      <p className="text-gray-300 leading-relaxed mb-8">
        Patience is a virtue in rental investing. Many investors who started with one duplex in their 30s found themselves with 10+ units by their 40s and financially independent before traditional retirement age. The key is consistent, disciplined execution — not speed.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tax Advantages of Rental Property</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        One of rental investing's most underappreciated benefits is the tax treatment. Key advantages include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Depreciation:</strong> The IRS allows you to deduct the cost of the building (not land) over 27.5 years. This "paper loss" often offsets rental income entirely, reducing your tax bill even when the property is cash flowing positively.</li>
        <li><strong className="text-white">Mortgage interest deduction:</strong> Interest paid on your rental property mortgage is fully deductible as a business expense.</li>
        <li><strong className="text-white">Operating expense deductions:</strong> Repairs, management fees, insurance, property taxes, utilities, and mileage are all deductible.</li>
        <li><strong className="text-white">1031 Exchange:</strong> When you sell a rental property, you can defer capital gains taxes by rolling the proceeds into a "like-kind" property within 45/180 days. This allows you to grow your portfolio tax-deferred.</li>
        <li><strong className="text-white">Qualified Business Income (QBI) deduction:</strong> Depending on your income and structure, rental income may qualify for the 20% QBI deduction under Section 199A.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Always work with a CPA experienced in real estate to maximize these deductions. The tax advantages alone can significantly improve the after-tax returns on rental investments.
      </p>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La inversión en propiedades de alquiler es uno de los caminos más confiables hacia la riqueza a largo plazo jamás descubiertos. A diferencia de las acciones, que pueden desaparecer de la noche a la mañana en una caída del mercado, las propiedades de alquiler generan ingresos mensuales, se aprecian con el tiempo, ofrecen importantes ventajas fiscales y pueden apalancarse con dinero prestado para amplificar los retornos. Esta guía cubre todo lo que un principiante necesita saber para comprar su primera propiedad de alquiler con confianza.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Entendiendo el Flujo de Caja: La Base de la Inversión en Alquileres</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El flujo de caja es el dinero que queda cada mes después de pagar todos los gastos. Es el pulso de una inversión en alquiler — un flujo de caja positivo significa que la propiedad genera ganancias; uno negativo significa que estás subsidiando la propiedad de tu propio bolsillo.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        La fórmula del flujo de caja mensual es sencilla:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Flujo de Caja Mensual</p>
        <p className="text-xl font-bold text-white">Renta Bruta − Vacancia − Gastos Operativos − Pago Hipotecario</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los gastos operativos comunes incluyen administración de propiedades (8–12% de la renta), reparaciones y mantenimiento (típicamente 5–10% de la renta anual), impuestos a la propiedad, seguros, cuotas de HOA y reservas para gastos de capital (apartar dinero para grandes gastos futuros como un nuevo techo o HVAC).
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una regla empírica popular es la <strong className="text-white">Regla del 50%</strong>: espera que aproximadamente el 50% de tu renta bruta sea consumida por gastos (excluyendo la hipoteca). Si una propiedad se alquila por $2,000/mes, puedes estimar $1,000 en gastos — y los $1,000 restantes van hacia la hipoteca. Lo que quede después de eso es tu flujo de caja.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Otro filtro rápido es la <strong className="text-white">Regla del 1%</strong>: una propiedad debería alquilarse por al menos el 1% de su precio de compra por mes. Una propiedad de $150,000 debería alquilarse por $1,500/mes.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Métricas Clave: Tasa de Capitalización y Retorno Efectivo sobre el Capital</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Dos números que todo inversor en alquileres debe entender antes de hacer una oferta:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Tasa de Capitalización (Cap Rate)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        La tasa de capitalización mide los ingresos de la propiedad en relación con su valor, independientemente del financiamiento:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">Cap Rate = Ingreso Neto Operativo ÷ Valor de la Propiedad</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        El Ingreso Neto Operativo (NOI) es la renta bruta menos todos los gastos operativos (sin incluir la hipoteca). Si una propiedad genera $15,000/año en NOI y está valorada en $200,000, la tasa de capitalización es del 7.5%. Las tasas de capitalización varían ampliamente según el mercado — del 4–5% en ciudades costeras caras, hasta el 8–10%+ en mercados secundarios y terciarios.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Retorno Efectivo sobre el Capital (Cash-on-Cash)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El retorno cash-on-cash mide la ganancia real en efectivo en relación al efectivo invertido:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">CoC = Flujo de Caja Anual ÷ Total de Efectivo Invertido</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Si invertiste $40,000 (pago inicial + costos de cierre) y la propiedad produce $3,600/año en flujo de caja, tu retorno CoC es del 9%. La mayoría de los inversores apuntan a un mínimo de 8–10% de CoC. Esta métrica te permite comparar directamente una inversión en alquiler con otros usos de tu capital.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Encontrando el Mercado Correcto</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Dónde inviertes importa tanto como en qué inviertes. Los mejores mercados de alquiler equilibran una fuerte demanda de alquileres, precios de compra razonables y leyes favorables para los arrendadores. Indicadores clave a investigar:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Crecimiento de población y empleo:</strong> Las poblaciones en crecimiento impulsan la demanda de alquileres. Busca ciudades con economías diversas y en expansión.</li>
        <li><strong className="text-white">Relación renta-precio:</strong> Compara precios medianos de casas con alquileres medianos. Mercados con alta relación (más cercana a la regla del 1%) producen mejor flujo de caja.</li>
        <li><strong className="text-white">Tasas de vacancia:</strong> Las tasas bajas (por debajo del 5%) indican demanda saludable de alquileres.</li>
        <li><strong className="text-white">Leyes de arrendadores e inquilinos:</strong> Algunos estados favorecen fuertemente a los inquilinos, haciendo los desalojos lentos y costosos. Conoce las reglas antes de comprar.</li>
        <li><strong className="text-white">Impuestos a la propiedad:</strong> Los impuestos altos pueden reducir significativamente el flujo de caja.</li>
        <li><strong className="text-white">Costos de seguro:</strong> Las propiedades en zonas de huracanes, inundaciones o incendios forestales tienen primas elevadas.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Selección de Inquilinos: Tu Decisión Más Importante</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un mal inquilino puede convertir una inversión rentable en una pesadilla. Un proceso profesional de selección debe evaluar:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Verificación de ingresos:</strong> Exige ingresos brutos mensuales de al menos 3 veces la renta mensual.</li>
        <li><strong className="text-white">Verificación de crédito:</strong> Busca puntajes superiores a 620. Presta atención a cobros, juicios de desalojo y patrones de pagos atrasados.</li>
        <li><strong className="text-white">Verificación de antecedentes:</strong> Historial criminal y registros de desalojos previos.</li>
        <li><strong className="text-white">Historial de alquiler:</strong> Contacta directamente a los arrendadores anteriores y pregunta si volverían a alquilarle.</li>
        <li><strong className="text-white">Verificación de empleo:</strong> Verifica directamente con el empleador por teléfono.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Siempre aplica criterios consistentes y documentados a cada solicitante para cumplir con las leyes de Vivienda Justa (Fair Housing).
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Administración de Propiedades: ¿Gestionar Tú Mismo o Contratar?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
          <h4 className="text-green-400 font-semibold mb-3">Autogestión</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Ahorro del 8–12% de la renta mensual</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Control directo sobre la selección de inquilinos</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Aprendes el negocio de primera mano</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Requiere tiempo — noches y fines de semana</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Requiere presencia local</li>
          </ul>
        </div>
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5">
          <h4 className="text-blue-400 font-semibold mb-3">Administrador Profesional</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Pasivo — sin llamadas de arrendador</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Permite invertir fuera de tu estado</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Selección profesional de inquilinos</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Cuesta 8–12% de la renta mensual</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>La calidad varía ampliamente</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Construyendo una Cartera con el Tiempo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El camino más común hacia una cartera de múltiples propiedades sigue un ciclo repetible:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-6 ml-4">
        <li><strong className="text-white">Compra la Propiedad #1.</strong> Ahorra un pago inicial del 20–25% (o usa house hacking con 3.5% FHA). Analiza rigurosamente.</li>
        <li><strong className="text-white">Estabiliza y construye reservas.</strong> Mantén 3–6 meses de gastos en reservas por propiedad.</li>
        <li><strong className="text-white">Construye capital y flujo de caja.</strong> El inquilino paga tu hipoteca mientras la propiedad se aprecia.</li>
        <li><strong className="text-white">Aprovecha el capital para el próximo negocio.</strong> Un refinanciamiento con extracción de efectivo o HELOC te permite acceder al capital de la Propiedad #1 para financiar el pago inicial de la Propiedad #2.</li>
        <li><strong className="text-white">Repite y escala.</strong> Cada propiedad agrega flujo de caja y capital. El efecto compuesto se acelera con el tiempo.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ventajas Fiscales de las Propiedades de Alquiler</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una de las ventajas más subestimadas de la inversión en alquileres es el tratamiento fiscal. Las ventajas clave incluyen:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Depreciación:</strong> El IRS permite deducir el costo del edificio (no del terreno) en 27.5 años. Esta "pérdida en papel" a menudo compensa completamente los ingresos por alquiler, reduciendo tu factura fiscal.</li>
        <li><strong className="text-white">Deducción de intereses hipotecarios:</strong> Los intereses pagados en tu hipoteca de propiedad de alquiler son totalmente deducibles como gasto comercial.</li>
        <li><strong className="text-white">Deducciones de gastos operativos:</strong> Reparaciones, honorarios de gestión, seguros, impuestos y servicios son deducibles.</li>
        <li><strong className="text-white">Intercambio 1031:</strong> Al vender una propiedad de alquiler, puedes diferir los impuestos sobre las ganancias de capital reinvirtiendo los ingresos en una propiedad similar.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Siempre trabaja con un contador con experiencia en bienes raíces para maximizar estas deducciones.
      </p>
    </div>
  )
}

export function RentalPropertyInvesting() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="Beginner's Guide to Rental Property Investing"
      titleEs="Guía para Principiantes en la Inversión en Propiedades de Alquiler"
      readTimeEn="11 min read"
      readTimeEs="11 min de lectura"
      categoryEn="Fundamentals"
      categoryEs="Fundamentos"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Calculate Your Rental Yield' : 'Calcula tu Rendimiento de Alquiler'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use the Rental Yield Calculator to model your gross yield, net yield, and cash-on-cash return for any rental property.'
            : 'Usa la Calculadora de Rendimiento de Alquiler para modelar el rendimiento bruto, el rendimiento neto y el retorno cash-on-cash de cualquier propiedad de alquiler.'}
        </p>
        <Link
          to="/tools/rental_yield"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Rental Yield Calculator' : 'Abrir Calculadora de Rendimiento'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
