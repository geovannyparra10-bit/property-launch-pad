import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Finding good flip deals is the skill that separates successful flippers from broke ones. Anyone can renovate a house. The profit — or loss — is locked in at the moment you buy. This lesson teaches you the 70% rule for quick deal screening, where to find motivated sellers, and how to evaluate neighborhoods before you make an offer.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The 70% Rule: Your Quick Screen</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The 70% rule is the most widely used rule of thumb in fix-and-flip investing. It gives you a maximum purchase price in under 30 seconds:
      </p>
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5 mb-6">
        <p className="text-blue-300 font-bold text-center text-lg">Max Purchase Price = (ARV × 0.70) − Estimated Rehab Costs</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">ARV</strong> (After Repair Value) is what the property will be worth after renovations are complete, based on comparable sales in the neighborhood. The 30% buffer accounts for your profit, closing costs, carrying costs, and contingency.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">70% Rule Example</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Comparable sales (ARV)</span><span>$250,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Estimated rehab</span><span>$45,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>70% of ARV</span><span>$175,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Maximum purchase price</span><span className="text-green-400">$130,000</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        If the seller is asking $160,000, you walk. If they're at $125,000, you look deeper. The 70% rule is not the final analysis — it's a filter. Once a deal passes the 70% screen, you do a detailed analysis with real numbers (covered in Lesson 4).
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where to Find Flip Deals</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The best flip deals are rarely on the MLS at full asking price. You need to find properties before they hit the market, or find motivated sellers who need a quick close.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">1. Direct Mail and Driving for Dollars</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Drive through target neighborhoods looking for visibly distressed properties — overgrown yards, boarded windows, peeling paint, deferred maintenance. Note the address, look up the owner, and send a direct mail letter expressing interest in buying. Response rates are low (1–3%), but the leads are highly motivated.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">2. Wholesalers</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Wholesalers find distressed properties, get them under contract, and then assign those contracts to investors for an assignment fee (typically $5,000–$20,000). They do the leg work; you pay for the curated lead. Connect with local wholesalers through real estate investor meetups, BiggerPockets, and local Facebook groups. Always verify the ARV and rehab independently — wholesalers have an incentive to present optimistic numbers.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">3. Foreclosures and Bank-Owned (REO) Properties</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Banks that foreclose on properties often sell them below market to move them off their books. REO properties are listed on the MLS, Hubzu, and Auction.com. Competition is higher than off-market deals, but the process is more straightforward.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">4. Tax Delinquent and Probate Properties</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Owners who haven't paid property taxes are often in financial distress and motivated to sell. County websites often publish delinquent tax lists. Similarly, estate attorneys handle properties going through probate — heirs often want to sell quickly and don't want the hassle of a traditional listing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">5. MLS — If You Move Fast</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Good flip deals do appear on the MLS, but they go fast. Work with an investor-friendly agent who can set up alerts for distressed properties, price reductions, and days-on-market outliers. The key is speed — a deal sitting on MLS for 90 days likely has a problem; a new listing at a below-market price needs a same-day offer.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Analyzing Neighborhoods Before You Buy</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The property matters, but the neighborhood determines your ARV ceiling and your buyer pool. Before you commit to a flip in any area, evaluate:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Recent comparable sales:</strong> What have similar renovated homes sold for in the last 90 days? This is your ARV.</li>
        <li><strong className="text-white">Days on market:</strong> Are homes selling in 2 weeks or sitting for 6 months? Fast markets reduce carrying costs and risk.</li>
        <li><strong className="text-white">Price per square foot:</strong> Know the ceiling. In some neighborhoods, no home sells above $120/sqft regardless of how nice it is.</li>
        <li><strong className="text-white">Rental demand:</strong> If the flip doesn't sell, can you convert it to a rental? Markets with strong rental demand give you an exit backup.</li>
        <li><strong className="text-white">School districts and amenities:</strong> Retail buyers pay premiums for good schools, walkability, and proximity to employment.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Once you identify a neighborhood that works, run every potential deal through the 70% rule as a first screen. The deals that pass go into a detailed analysis — which starts with an accurate rehab estimate. That's next.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Encontrar buenos negocios de flip es la habilidad que separa a los flippers exitosos de los que pierden dinero. La ganancia — o pérdida — se determina en el momento de la compra. Esta lección te enseña la regla del 70%, dónde encontrar vendedores motivados y cómo evaluar vecindarios antes de hacer una oferta.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Regla del 70%: Tu Filtro Rápido</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La regla del 70% es la guía más utilizada en el flipping de propiedades. Te da un precio máximo de compra en menos de 30 segundos:
      </p>
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5 mb-6">
        <p className="text-blue-300 font-bold text-center text-lg">Precio Máximo de Compra = (ARV × 0.70) − Costos de Rehabilitación Estimados</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        El <strong className="text-white">ARV</strong> (Valor Después de Reparaciones) es lo que valdrá la propiedad después de las renovaciones, basado en ventas comparables en el vecindario. El margen del 30% cubre tu ganancia, costos de cierre, costos de mantenimiento y contingencias.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Ejemplo de la Regla del 70%</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Ventas comparables (ARV)</span><span>$250,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Rehabilitación estimada</span><span>$45,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>70% del ARV</span><span>$175,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Precio máximo de compra</span><span className="text-green-400">$130,000</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Dónde Encontrar Negocios de Flip</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">1. Correo Directo y Conducir para Encontrar Dólares</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Recorre vecindarios objetivo buscando propiedades visiblemente deterioradas. Anota la dirección, busca al propietario y envía una carta directa expresando interés en comprar. Las tasas de respuesta son bajas (1–3%), pero los leads son altamente motivados.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">2. Mayoristas (Wholesalers)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los mayoristas encuentran propiedades en problemas y las ponen bajo contrato, luego ceden esos contratos a inversores por una tarifa. Siempre verifica el ARV y la rehabilitación de forma independiente.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">3. Propiedades en Ejecución Hipotecaria y REO</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los bancos que ejecutan hipotecas a menudo venden por debajo del mercado. Las propiedades REO se listan en el MLS, Hubzu y Auction.com.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">4. Propiedades con Impuestos Atrasados y en Sucesión</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los propietarios con impuestos atrasados a menudo están en dificultades financieras. Los sitios web del condado publican listas de impuestos atrasados. Los herederos en sucesión a menudo quieren vender rápidamente.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">5. MLS — Si Te Mueves Rápido</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Buenos negocios de flip aparecen en el MLS, pero se van rápido. Trabaja con un agente amigable a inversores que configure alertas para propiedades en problemas.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Analizar Vecindarios Antes de Comprar</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El vecindario determina tu techo de ARV y tu grupo de compradores. Evalúa:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Ventas comparables recientes:</strong> ¿A cuánto vendieron casas similares renovadas en los últimos 90 días?</li>
        <li><strong className="text-white">Días en el mercado:</strong> ¿Las casas se venden en 2 semanas o permanecen 6 meses?</li>
        <li><strong className="text-white">Precio por pie cuadrado:</strong> Conoce el techo de precios del vecindario.</li>
        <li><strong className="text-white">Demanda de alquiler:</strong> Si el flip no se vende, ¿puedes convertirlo en alquiler?</li>
        <li><strong className="text-white">Distritos escolares y comodidades:</strong> Los compradores pagan primas por buenas escuelas.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Una vez que identifiques un vecindario que funcione, aplica la regla del 70% a cada posible negocio. Los que pasen van a un análisis detallado, que comienza con una estimación precisa de rehabilitación. Eso es lo siguiente.
      </p>
    </div>
  )
}

export function FPLesson2() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
