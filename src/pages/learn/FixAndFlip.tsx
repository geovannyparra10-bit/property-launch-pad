import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        House flipping has captured the popular imagination through countless TV shows, but the reality is far more nuanced — and more profitable — than what's depicted on screen. When executed correctly, fix-and-flip investing offers the potential to earn $20,000 to $80,000 (or more) in profit within 4 to 8 months. The key word is "correctly." This guide covers everything you need to know to approach your first flip like a professional.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Is Fix and Flip?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Fix and flip is a real estate investment strategy where an investor purchases a distressed or undervalued property, renovates it to increase its market value, and then sells it for a profit — typically within 6 to 12 months. Unlike rental investing (which generates ongoing monthly income), flipping is a transactional business that generates one-time profits per deal.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The appeal is clear: significant potential profits in a short period without becoming a long-term landlord. The risk is also real: mispricing a deal, underestimating rehab costs, or experiencing unexpected delays can rapidly erode — or eliminate — your profit margin.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Finding Profitable Deals</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The most critical phase of any flip is the acquisition. Your profit is largely determined at purchase — you need to buy significantly below the property's After Repair Value (ARV). Competition for flip-worthy deals has intensified with the rise of institutional buyers and iBuyers, which means today's successful flippers develop systems to find deals that others miss.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Top deal sources for fix-and-flip investors:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">MLS (Multiple Listing Service):</strong> Days-on-market properties, price reductions, and distressed listings can still offer margins. Act fast and make strong offers.</li>
        <li><strong className="text-white">Wholesale deals:</strong> Wholesalers specialize in finding below-market deals and assigning contracts. Develop relationships with active wholesalers in your market.</li>
        <li><strong className="text-white">Direct mail and marketing:</strong> Targeted letters and postcards to absentee owners, tax-delinquent properties, and out-of-state landlords often produce motivated sellers.</li>
        <li><strong className="text-white">Foreclosure auctions:</strong> Courthouse steps and online auction platforms (Auction.com, Hubzu) can produce sharp discounts. Requires cash and carries title and inspection risks.</li>
        <li><strong className="text-white">Probate properties:</strong> Heirs often prefer a quick cash sale over managing a property they inherited. Connect with probate attorneys in your area.</li>
        <li><strong className="text-white">Driving for dollars:</strong> Physically driving through target neighborhoods to identify visibly neglected properties and contacting owners directly.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        The investors who consistently find profitable deals build a pipeline — they're not waiting for the next deal to fall in their lap, they're actively generating leads through multiple channels simultaneously.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The 70% Rule: Your Quick Filter</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before running a detailed analysis on any deal, experienced flippers use the 70% rule as a fast initial filter. The formula is simple:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Maximum Allowable Offer (MAO)</p>
        <p className="text-2xl font-bold text-white">MAO = (ARV × 70%) − Rehab Costs</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        The 70% rule says you should pay no more than 70% of the ARV, minus your estimated repair costs. The remaining 30% is allocated to holding costs, closing costs (buy and sell side), agent commissions, and your profit.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">Example:</strong> A house with an ARV of $200,000 needs $30,000 in repairs.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>ARV</span><span className="text-white font-medium">$200,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>× 70%</span><span className="text-white font-medium">$140,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>− Rehab costs</span><span className="text-red-400 font-medium">$30,000</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">Maximum Allowable Offer</span><span className="text-green-400 font-bold text-base">$110,000</span></div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        If you can buy this house for $110,000 or less, the 70% rule gives you a buffer to make money. If the seller wants $140,000, the deal likely doesn't work for a flip — though it might still work as a rental. The 70% rule is a starting point, not an absolute — in hot markets you may need to adjust to 65%, and in cheaper markets you may have more room to work with.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estimating Rehab Costs Accurately</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Underestimating rehab costs is the single most common way flippers lose money. Projects almost always take longer and cost more than anticipated. Professionals use a detailed scope of work (SOW) and get 2–3 contractor bids before finalizing their offer price.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Categories to evaluate during your walkthrough:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Foundation and structure:</strong> Cracks, settling, or bowing walls can be extremely expensive. Always have structural issues inspected by a specialist before buying.</li>
        <li><strong className="text-white">Roof:</strong> Age, condition, and presence of active leaks. A new roof on a typical house costs $8,000–$15,000+.</li>
        <li><strong className="text-white">HVAC:</strong> Age and condition of furnace, AC, and ductwork. Replacement can run $5,000–$12,000+.</li>
        <li><strong className="text-white">Plumbing:</strong> Galvanized pipes, polybutylene, or copper condition. A full replumb can cost $8,000–$20,000.</li>
        <li><strong className="text-white">Electrical:</strong> Panel amperage, wiring type (knob-and-tube, aluminum). Upgrades can range from $2,000 to $15,000+.</li>
        <li><strong className="text-white">Kitchen:</strong> Cabinets, countertops, appliances, flooring — budget $10,000–$25,000 for a complete update in a mid-range market.</li>
        <li><strong className="text-white">Bathrooms:</strong> $5,000–$15,000 per bath depending on scope.</li>
        <li><strong className="text-white">Cosmetics:</strong> Paint, flooring, fixtures, landscaping — estimate per square foot based on local labor rates.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Always add a 15–20% contingency buffer on top of your estimated rehab total. Unknown conditions (mold behind walls, outdated wiring discovered during demo) are the rule, not the exception.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Understanding Holding Costs</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Holding costs are expenses you incur while you own the property — from the day you close on purchase until the day you close on the sale. They're often underestimated by beginners, and they escalate rapidly if the project runs long.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Key holding costs include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Hard money loan interest:</strong> Typically 8–12% annually. On a $120,000 loan at 10%, that's $1,000/month. A 6-month project costs $6,000 in interest alone.</li>
        <li><strong className="text-white">Loan origination points:</strong> Usually 1–3% of the loan amount, paid at closing. On a $120,000 loan, 2 points = $2,400 upfront.</li>
        <li><strong className="text-white">Property taxes:</strong> Prorated for your ownership period.</li>
        <li><strong className="text-white">Insurance:</strong> A vacant/renovation property insurance policy — typically $1,000–$2,000/year.</li>
        <li><strong className="text-white">Utilities:</strong> Electricity, water, and gas during renovation.</li>
        <li><strong className="text-white">HOA fees:</strong> If applicable, these continue regardless of vacancy.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Total holding costs for a typical 6-month flip can range from $8,000 to $20,000 or more. Speed is money in fix-and-flip — every week your project runs over schedule directly reduces your profit.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A Full Flip Profit Analysis</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-4">Complete Flip Example — $200,000 ARV Property</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-2 pb-1">Income</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Sale price (ARV)</span><span className="text-green-400 font-medium">$200,000</span></div>
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-4 pb-1">Costs</div>
          <div className="flex justify-between"><span>Purchase price</span><span className="text-red-400 font-medium">$110,000</span></div>
          <div className="flex justify-between"><span>Rehab costs</span><span className="text-red-400 font-medium">$30,000</span></div>
          <div className="flex justify-between"><span>Hard money interest (6 mo.)</span><span className="text-red-400 font-medium">$5,500</span></div>
          <div className="flex justify-between"><span>Loan points (2%)</span><span className="text-red-400 font-medium">$2,200</span></div>
          <div className="flex justify-between"><span>Buy-side closing costs</span><span className="text-red-400 font-medium">$1,500</span></div>
          <div className="flex justify-between"><span>Sell-side agent commission (6%)</span><span className="text-red-400 font-medium">$12,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Sell-side closing costs</span><span className="text-red-400 font-medium">$2,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Total costs</span><span className="text-red-400 font-medium">$163,200</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold text-base">Net Profit</span><span className="text-green-400 font-bold text-base">$36,800</span></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Exit Strategies</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The primary exit for a flip is a retail sale to an owner-occupant buyer on the MLS. But having backup exit strategies is critical risk management:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Retail sale (primary):</strong> List on the MLS with a real estate agent. The widest buyer pool and typically highest price.</li>
        <li><strong className="text-white">Wholesale the flip:</strong> If the market shifts or the project runs over budget, selling to another investor wholesale can recapture some capital and cut losses.</li>
        <li><strong className="text-white">Convert to rental:</strong> If the market softens or you can't achieve target ARV, renting the property generates income while you wait for the right sale opportunity. Requires refinancing out of hard money.</li>
        <li><strong className="text-white">Owner financing:</strong> Selling with seller financing can attract a broader buyer pool and sometimes achieve above-market prices, while generating ongoing income from the note.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Always enter a flip with at least two viable exit strategies mapped out. A single point of failure is how beginners get stuck.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Getting Started: Key Steps</h2>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Build your team first.</strong> You need a real estate agent (buyer's side), a hard money lender, a general contractor, and a real estate attorney before you make your first offer. Trying to assemble a team mid-deal leads to costly delays.</li>
        <li><strong className="text-white">Study your target market deeply.</strong> Know what renovated homes in your target zip codes sell for and how long they sit on market. You can't estimate ARV without knowing comparable sales intimately.</li>
        <li><strong className="text-white">Get pre-approved for hard money financing.</strong> Having a pre-approval letter allows you to make cash-equivalent offers that sellers and wholesalers take seriously.</li>
        <li><strong className="text-white">Shadow an experienced flipper.</strong> Many investors are willing to mentor beginners in exchange for help finding deals or managing projects. Real-world experience is irreplaceable.</li>
        <li><strong className="text-white">Use the Flip Calculator to stress test every deal.</strong> Model best case, base case, and worst case scenarios before committing. The numbers must work under adverse conditions.</li>
      </ol>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        El negocio de renovar y vender propiedades ha capturado la imaginación popular a través de innumerables programas de televisión, pero la realidad es mucho más matizada — y más rentable — que lo que se muestra en pantalla. Cuando se ejecuta correctamente, la inversión de fix and flip ofrece el potencial de ganar entre $20,000 y $80,000 (o más) de ganancia en 4 a 8 meses. La palabra clave es "correctamente".
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Qué es el Fix and Flip?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El fix and flip es una estrategia de inversión inmobiliaria en la que un inversor compra una propiedad en mal estado o subvalorada, la renueva para aumentar su valor de mercado, y luego la vende con ganancia — típicamente en 6 a 12 meses. A diferencia de la inversión en alquileres (que genera ingresos mensuales continuos), el flipping es un negocio transaccional que genera ganancias únicas por cada negocio.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        El atractivo es claro: ganancias potenciales significativas en un corto período sin convertirse en arrendador a largo plazo. El riesgo también es real: una mala estimación del precio del negocio, subestimar los costos de rehabilitación, o experimentar retrasos inesperados puede erosionar rápidamente — o eliminar — tu margen de ganancia.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Encontrar Negocios Rentables</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La fase más crítica de cualquier flip es la adquisición. Tu ganancia se determina en gran medida en la compra — necesitas comprar significativamente por debajo del Valor Después de la Reparación (ARV) de la propiedad. Las principales fuentes de negocios incluyen:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">MLS:</strong> Propiedades con muchos días en el mercado, reducciones de precio y listados en mal estado.</li>
        <li><strong className="text-white">Mayoristas:</strong> Desarrolla relaciones con mayoristas activos en tu mercado.</li>
        <li><strong className="text-white">Marketing directo:</strong> Cartas y postales dirigidas a propietarios ausentes, propiedades con impuestos atrasados.</li>
        <li><strong className="text-white">Subastas de ejecución hipotecaria:</strong> Pueden producir descuentos importantes, pero requieren efectivo y conllevan riesgos.</li>
        <li><strong className="text-white">Propiedades en proceso sucesorio:</strong> Los herederos frecuentemente prefieren una venta rápida en efectivo.</li>
        <li><strong className="text-white">Conducir por el vecindario:</strong> Identificar propiedades visiblemente descuidadas y contactar a los propietarios directamente.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Regla del 70%: Tu Filtro Rápido</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Antes de hacer un análisis detallado de cualquier negocio, los flippers experimentados usan la regla del 70% como filtro inicial rápido. La fórmula es simple:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-6 text-center">
        <p className="text-gray-400 text-sm mb-2">Oferta Máxima Permitida (MAO)</p>
        <p className="text-2xl font-bold text-white">MAO = (ARV × 70%) − Costos de Rehabilitación</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        La regla del 70% dice que no debes pagar más del 70% del ARV, menos tus costos de reparación estimados. El 30% restante se destina a costos de tenencia, costos de cierre (de compra y venta), comisiones de agentes y tu ganancia.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <h4 className="text-white font-semibold mb-4">Ejemplo con ARV de $200,000 y $30,000 de rehabilitación</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>ARV</span><span className="text-white font-medium">$200,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>× 70%</span><span className="text-white font-medium">$140,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>− Costos de rehabilitación</span><span className="text-red-400 font-medium">$30,000</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">Oferta Máxima Permitida</span><span className="text-green-400 font-bold text-base">$110,000</span></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estimando los Costos de Rehabilitación con Precisión</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Subestimar los costos de rehabilitación es la forma más común en que los flippers pierden dinero. Los profesionales usan un alcance de trabajo detallado y obtienen 2–3 presupuestos de contratistas antes de finalizar su precio de oferta.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Categorías clave a evaluar durante tu inspección: fundación y estructura, techo, HVAC, plomería, electricidad, cocina, baños, y acabados (pintura, pisos, accesorios). Siempre añade un margen de contingencia del 15–20% sobre tu estimado total de rehabilitación.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Entendiendo los Costos de Tenencia</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los costos de tenencia son los gastos que incurres mientras eres propietario — desde el día que cierras la compra hasta el día que cierras la venta. Los principales incluyen: intereses del préstamo de dinero duro (típicamente 8–12% anual), puntos de originación del préstamo (1–3%), impuestos a la propiedad, seguro de propiedad vacante/en renovación, servicios públicos y cuotas de HOA si aplica.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los costos totales de tenencia para un flip típico de 6 meses pueden oscilar entre $8,000 y $20,000 o más. La velocidad es dinero en el fix and flip — cada semana que tu proyecto se retrasa reduce directamente tu ganancia.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Análisis Completo de Ganancia del Flip</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-4">Ejemplo Completo — Propiedad con ARV de $200,000</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-2 pb-1">Ingresos</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Precio de venta (ARV)</span><span className="text-green-400 font-medium">$200,000</span></div>
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-4 pb-1">Costos</div>
          <div className="flex justify-between"><span>Precio de compra</span><span className="text-red-400 font-medium">$110,000</span></div>
          <div className="flex justify-between"><span>Costos de rehabilitación</span><span className="text-red-400 font-medium">$30,000</span></div>
          <div className="flex justify-between"><span>Interés dinero duro (6 meses)</span><span className="text-red-400 font-medium">$5,500</span></div>
          <div className="flex justify-between"><span>Puntos del préstamo (2%)</span><span className="text-red-400 font-medium">$2,200</span></div>
          <div className="flex justify-between"><span>Costos de cierre de compra</span><span className="text-red-400 font-medium">$1,500</span></div>
          <div className="flex justify-between"><span>Comisión del agente de venta (6%)</span><span className="text-red-400 font-medium">$12,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Costos de cierre de venta</span><span className="text-red-400 font-medium">$2,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Costos totales</span><span className="text-red-400 font-medium">$163,200</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold text-base">Ganancia Neta</span><span className="text-green-400 font-bold text-base">$36,800</span></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estrategias de Salida</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La salida principal para un flip es la venta al por menor a un comprador que ocupará la vivienda. Pero tener estrategias de salida de respaldo es una gestión de riesgos crítica:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Venta al por menor (principal):</strong> Listar en el MLS con un agente de bienes raíces para el mayor grupo de compradores.</li>
        <li><strong className="text-white">Vender a otro inversor:</strong> Si el mercado cambia o el proyecto se excede del presupuesto, vender al por mayor puede recuperar algo de capital.</li>
        <li><strong className="text-white">Convertir a alquiler:</strong> Si el mercado se debilita, alquilar la propiedad genera ingresos mientras esperas la oportunidad de venta correcta.</li>
        <li><strong className="text-white">Financiamiento del vendedor:</strong> Vender con financiamiento del vendedor puede atraer a un grupo más amplio de compradores y a veces lograr precios por encima del mercado.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Para Empezar: Pasos Clave</h2>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Construye tu equipo primero.</strong> Necesitas un agente de bienes raíces, un prestamista de dinero duro, un contratista general y un abogado de bienes raíces antes de hacer tu primera oferta.</li>
        <li><strong className="text-white">Estudia tu mercado objetivo en profundidad.</strong> Conoce a qué precio se venden las casas renovadas en tus códigos postales objetivo y cuánto tiempo permanecen en el mercado.</li>
        <li><strong className="text-white">Obtén una preaprobación de financiamiento de dinero duro.</strong> Tener una carta de preaprobación te permite hacer ofertas en efectivo que los vendedores y mayoristas toman en serio.</li>
        <li><strong className="text-white">Aprende de un flipper experimentado.</strong> La experiencia en el mundo real es irremplazable.</li>
        <li><strong className="text-white">Usa la Calculadora de Flip para evaluar cada negocio.</strong> Modela el mejor caso, el caso base y el peor caso antes de comprometerte.</li>
      </ol>
    </div>
  )
}

export function FixAndFlip() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="Fix and Flip Guide: How to Profit from Property Renovation"
      titleEs="Guía de Fix and Flip: Cómo Obtener Ganancias con la Renovación de Propiedades"
      readTimeEn="10 min read"
      readTimeEs="10 min de lectura"
      categoryEn="Strategy"
      categoryEs="Estrategia"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Analyze Your Flip Deal' : 'Analiza Tu Negocio de Flip'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use the Flip Calculator to model your purchase price, rehab costs, holding costs, and projected profit before making an offer.'
            : 'Usa la Calculadora de Flip para modelar tu precio de compra, costos de rehabilitación, costos de tenencia y ganancia proyectada antes de hacer una oferta.'}
        </p>
        <Link
          to="/tools/flip"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Flip Calculator' : 'Abrir Calculadora de Flip'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
