import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The property you buy sets everything else. It determines your cash flow, your FHA eligibility, your tenant quality, and your experience as a landlord-occupant. In this lesson, you'll learn the specific criteria that make a house hack property great — and the subtle details that turn one into a nightmare.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Core Property Types</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2–4 Unit Multifamily (The Classic Hack)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A duplex, triplex, or fourplex is the gold standard. You live in one unit and rent the others. With a fourplex, three rental units can often entirely cover your mortgage — sometimes generating positive cash flow while you live nearly for free. The fourplex is also the largest property eligible for FHA financing, which makes it the sweet spot for maximum rental income with minimum down payment.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Key things to verify on multifamily:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li><strong className="text-white">Unit separation quality</strong> — Are units truly separate with their own entrances? Shared entrances mean shared headaches.</li>
        <li><strong className="text-white">Utility separation</strong> — Are utilities metered separately per unit? If not, you'll pay for tenants' utility usage. Fix this or price it into your offer.</li>
        <li><strong className="text-white">Unit sizes</strong> — Can each unit command market rent? A 2-bed/1-bath unit in your market might rent for $1,200 or $1,800 depending on size, condition, and location.</li>
        <li><strong className="text-white">Existing leases</strong> — Are tenants in place? What are their lease terms and current rents vs. market rates? Undermarket rents are an opportunity and a short-term constraint.</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Single-Family Home (Rent by the Room)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A 3–5 bedroom single-family home where you occupy one room and rent the others. This works particularly well near universities, hospitals, or in high-cost cities. A 4-bedroom house where you take one room and rent three at $700–$900 each can generate $2,100–$2,700/month in income against a mortgage that might be $1,800–$2,200.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The tradeoff: you share common spaces — kitchen, living room, laundry — with tenants. This works best with young professionals or students who respect space. It demands clear house rules and detailed roommate agreements.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">ADU-Capable Properties</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Some single-family homes have a basement, garage, or backyard space that can be converted into an accessory dwelling unit (ADU). A finished basement with a separate entrance, bathroom, and kitchen can rent for $800–$1,500/month in many markets.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The key is to verify local zoning laws before counting on ADU income. Some cities require permits and specific minimum square footage. Others have streamlined ADU approval to address housing shortages. Research your target market's ADU regulations thoroughly.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What to Look for in a Market and Neighborhood</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A great property in the wrong location is a cash-flow drain with a great-looking spreadsheet. Location affects your vacancy rate, your tenant quality, your ability to raise rents, and your appreciation potential. Here's how to evaluate it:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Demand Drivers</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Look for neighborhoods with strong, diverse demand drivers — things that generate renters:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Universities and colleges (student rentals have high demand and predictable annual cycles)</li>
        <li>Major employers and employment centers within commute distance</li>
        <li>Hospitals, medical centers, and healthcare campuses (nurses and residents are excellent long-term tenants)</li>
        <li>Military bases (steady tenant demand from enlisted and officer housing allowances)</li>
        <li>Transit-oriented locations (access to public transportation increases tenant demand)</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">The B-Class Sweet Spot</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        For house hacking beginners, target B-class neighborhoods — not the most affluent areas (A-class, where yields are low) and not distressed areas (D-class, where headaches are high). B-class areas have:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Working-class to middle-class residents with stable employment</li>
        <li>Decent schools and infrastructure</li>
        <li>Properties that need cosmetic work (opportunity) but not structural rehabilitation (risk)</li>
        <li>Rent-to-price ratios that can support positive cash flow</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">MLS vs. Off-Market Strategies</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Finding Deals on the MLS</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most house hackers find their first deal on the MLS. The key is moving fast and knowing your numbers cold. Set up automated alerts for 2–4 unit properties in your target zip codes. When a new listing hits that meets your criteria, schedule a showing within 24 hours.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Pro tip: filter for properties that have been on the market 30+ days. These sellers are more motivated and more likely to accept below-ask offers. A stale listing that needs cosmetic updating is often a house hacker's best opportunity.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Off-Market Sources</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Direct mail to multifamily property owners, driving for dollars (identifying rundown properties and researching ownership through county records), and networking with local real estate attorneys and estate attorneys who handle probate sales can surface deals before they hit the public market.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        For a first house hack, focus your energy on the MLS and investor meetups. Off-market sourcing becomes more valuable as you scale.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">FHA Property Requirements</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        FHA loans have property condition requirements that conventional loans don't. The FHA appraiser will look for:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Functioning HVAC, plumbing, and electrical systems</li>
        <li>Roof with at least 2 years of remaining life</li>
        <li>No peeling paint (important in pre-1978 properties due to lead paint concerns)</li>
        <li>Working appliances (if they're included in the sale)</li>
        <li>No safety hazards — broken stairs, exposed wiring, structural damage</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Properties that fail these minimums won't qualify for FHA until repairs are made. This is sometimes negotiable with the seller, but it can also kill a deal. Conventional financing is more flexible, but requires a higher credit score and down payment.
      </p>
      <p className="text-gray-300 leading-relaxed">
        In the next lesson, you'll walk through running the numbers on a real house hack deal step-by-step using the House Hack Calculator, so you can evaluate any property you find with confidence.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La propiedad que compras define todo lo demás. Determina tu flujo de caja, tu elegibilidad para FHA, la calidad de tus inquilinos y tu experiencia como arrendador-ocupante. En esta lección, aprenderás los criterios específicos que hacen excelente a una propiedad de house hacking.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Los Tipos de Propiedad Principales</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Multifamiliar de 2–4 Unidades (El Hack Clásico)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un dúplex, tríplex o fourplex es el estándar de oro. Vives en una unidad y alquilas las demás. Con un fourplex, tres unidades de alquiler a menudo pueden cubrir completamente tu hipoteca. El fourplex también es la propiedad más grande elegible para financiamiento FHA, lo que lo convierte en el punto óptimo para máximos ingresos de alquiler con mínimo enganche.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li><strong className="text-white">Separación de unidades</strong> — ¿Son las unidades verdaderamente independientes con sus propias entradas?</li>
        <li><strong className="text-white">Separación de servicios</strong> — ¿Están los servicios medidos por separado por unidad?</li>
        <li><strong className="text-white">Contratos de arrendamiento existentes</strong> — ¿Hay inquilinos en su lugar? ¿Cuáles son sus rentas actuales vs. las tasas de mercado?</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Casa Unifamiliar (Renta por Habitación)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una casa de 3–5 habitaciones donde ocupas una habitación y alquilas las demás. Funciona particularmente bien cerca de universidades, hospitales o en ciudades de alto costo. Requiere reglas claras del hogar y acuerdos detallados de compañeros de cuarto.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Qué Buscar en un Mercado y Vecindario</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Impulsores de Demanda</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Universidades y colegios (alta demanda estudiantil)</li>
        <li>Grandes empleadores dentro de distancia de commute</li>
        <li>Hospitales y centros de salud (enfermeras y residentes son excelentes inquilinos)</li>
        <li>Bases militares (demanda constante de arrendatarios)</li>
        <li>Ubicaciones orientadas al transporte público</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">El Punto Óptimo: Vecindarios Clase B</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Para principiantes en house hacking, apunta a vecindarios de clase B — no las áreas más afluentes (clase A, donde los rendimientos son bajos) ni áreas deterioradas (clase D, donde los problemas son altos). Las áreas de clase B tienen residentes de clase trabajadora a clase media con empleo estable, buena infraestructura y propiedades que necesitan trabajo cosmético pero no rehabilitación estructural.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">MLS vs. Estrategias Fuera del Mercado</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mayoría de los house hackers encuentran su primer negocio en el MLS. Configura alertas automáticas para propiedades de 2–4 unidades en tus códigos postales objetivo. Cuando aparezca una nueva publicación que cumpla tus criterios, programa una visita dentro de las 24 horas.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Requisitos de Propiedad FHA</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los préstamos FHA tienen requisitos de condición de la propiedad que los préstamos convencionales no tienen. El tasador FHA buscará: sistemas HVAC, plomería y eléctrico funcionando; techo con al menos 2 años de vida útil restante; sin pintura descascarada; sin peligros de seguridad.
      </p>
      <p className="text-gray-300 leading-relaxed">
        En la próxima lección, harás un recorrido paso a paso por los números de un negocio real de house hacking utilizando la Calculadora de House Hack.
      </p>
    </div>
  )
}

export function HHLesson2() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
