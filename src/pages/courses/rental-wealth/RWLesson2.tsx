import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Location drives rental performance more than any other variable. The best deal analysis in the world can't fix a bad market or the wrong property type. This lesson gives you a framework for identifying strong rental markets, evaluating neighborhoods within those markets, and deciding between single-family and multi-family properties.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Makes a Good Rental Market?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        You're looking for markets where the economics of renting are strong — where rents are high relative to property prices, where demand for housing is supported by a growing population and employment base, and where landlord-tenant laws don't severely disadvantage property owners.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">The Price-to-Rent Ratio</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The price-to-rent ratio divides a home's purchase price by its annual rent. A ratio below 15 generally favors buying (strong cash flow potential). A ratio of 15–20 is neutral. Above 20 typically favors renting over owning, and cash flow positive rentals are rare.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Price-to-Rent Ratio Examples</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Home price $180,000 / Annual rent $18,000</span><span className="text-green-400">Ratio: 10 — Strong cash flow market</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Home price $300,000 / Annual rent $18,000</span><span className="text-amber-400">Ratio: 16.7 — Neutral</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Home price $800,000 / Annual rent $30,000</span><span className="text-red-400">Ratio: 26.7 — Cash flow very difficult</span></div>
      </div>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Job Market and Population Growth</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Rental demand is driven by people who need housing. Markets with diverse, growing employment bases attract workers who need to rent. Look for:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Multiple major employers across different industries (not one-industry towns)</li>
        <li>Population growth over the last 5–10 years (Census data and local planning reports)</li>
        <li>New businesses and employers moving in (local business journals)</li>
        <li>University or healthcare anchor employment (stable demand drivers)</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Landlord-Friendly Legal Environment</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Some states and cities have strict rent control laws, lengthy eviction processes, or regulations that heavily favor tenants. While tenant protections serve important purposes, they can significantly affect your ability to manage a property and your financial risk profile. Research landlord-tenant laws in your target market before investing. Generally, Midwest and Southeast markets tend to be more landlord-friendly than coastal cities.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Evaluating Neighborhoods</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Within a market, neighborhood selection determines your tenant quality, vacancy rate, maintenance burden, and rent growth. Investors commonly classify neighborhoods on an A–D scale:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-6">
        <div>
          <p className="text-white font-semibold text-sm mb-1">A-Class Neighborhoods</p>
          <p className="text-gray-400 text-sm">Highest-income areas, low crime, best schools. Strong appreciation but low cash flow yields. Best for appreciation investors.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">B-Class Neighborhoods</p>
          <p className="text-gray-400 text-sm">Working-class and middle-income areas. Balance of cash flow and appreciation. Often the sweet spot for buy-and-hold investors.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">C-Class Neighborhoods</p>
          <p className="text-gray-400 text-sm">Lower-income areas, higher crime, older housing stock. Higher cash flow yields but higher management intensity, vacancy, and maintenance.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">D-Class Neighborhoods</p>
          <p className="text-gray-400 text-sm">Very high crime, significant blight. Yields can appear attractive but operational challenges and risk often make returns negative after real costs.</p>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        For most investors — especially beginners — B-class neighborhoods offer the best balance of returns, manageability, and tenant quality. Avoid D-class regardless of the numbers on paper.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Single-Family vs. Multi-Family</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Single-Family Homes (SFH)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Single-family homes are the most common starting point for rental investors. Advantages:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Easier to finance (conventional loans, lower down payments)</li>
        <li>Broader pool of buyers when you sell (easier exit)</li>
        <li>Tends to attract longer-term tenants (families)</li>
        <li>Lower management complexity</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Disadvantages: When one tenant leaves, you have 100% vacancy. Less economies of scale.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Small Multi-Family (2–4 Units)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Duplexes, triplexes, and quadplexes offer higher income per property and risk diversification across multiple units. You still finance with residential loans (4 units and under). If one unit is vacant, others continue to produce income.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is why many experienced investors prefer small multi-family as a portfolio foundation — better cash flow, built-in vacancy protection, and still manageable with conventional financing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Large Multi-Family (5+ Units)</h3>
      <p className="text-gray-300 leading-relaxed">
        Commercial financing (different underwriting standards, shorter loan terms, larger down payments) is required for 5+ unit properties. The upside: greater economies of scale, professional management makes sense earlier, and valuation is based on income rather than comparables. The downside: larger capital requirements, more complex management, and a smaller buyer pool on exit. This is typically a step for investors who've built cash flow and experience with smaller properties first.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La ubicación impulsa el rendimiento del alquiler más que cualquier otra variable. Esta lección te da un marco para identificar mercados de alquiler sólidos, evaluar vecindarios y decidir entre propiedades unifamiliares y multifamiliares.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Qué Hace a un Buen Mercado de Alquiler?</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">La Relación Precio-Alquiler</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        La relación precio-alquiler divide el precio de compra de una vivienda entre su alquiler anual. Una relación inferior a 15 generalmente favorece la compra (fuerte potencial de flujo de efectivo). Entre 15–20 es neutral. Por encima de 20, el flujo de efectivo positivo es difícil.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Ejemplos de Relación Precio-Alquiler</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Casa $180,000 / Alquiler anual $18,000</span><span className="text-green-400">Relación: 10 — Mercado con buen flujo</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Casa $300,000 / Alquiler anual $18,000</span><span className="text-amber-400">Relación: 16.7 — Neutral</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Casa $800,000 / Alquiler anual $30,000</span><span className="text-red-400">Relación: 26.7 — Flujo de efectivo muy difícil</span></div>
      </div>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Mercado Laboral y Crecimiento Poblacional</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Busca mercados con empleadores múltiples y diversos, crecimiento poblacional en los últimos 5–10 años, y nuevas empresas llegando. La presencia de universidades o empleadores del sector salud son impulsores estables de demanda.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Entorno Legal Favorable para Propietarios</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Algunos estados y ciudades tienen leyes estrictas de control de alquiler o procesos de desalojo prolongados. Generalmente, los mercados del Midwest y del Sureste tienden a ser más favorables para los propietarios que las ciudades costeras.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Evaluar Vecindarios</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-6">
        <div>
          <p className="text-white font-semibold text-sm mb-1">Vecindarios Clase A</p>
          <p className="text-gray-400 text-sm">Áreas de mayores ingresos, bajo crimen, mejores escuelas. Fuerte apreciación pero bajo rendimiento de flujo de efectivo.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Vecindarios Clase B</p>
          <p className="text-gray-400 text-sm">Áreas de clase trabajadora y media. Equilibrio de flujo de efectivo y apreciación. A menudo el punto óptimo para inversores de compra y retención.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Vecindarios Clase C</p>
          <p className="text-gray-400 text-sm">Áreas de menores ingresos. Mayor rendimiento de flujo de efectivo pero mayor intensidad de gestión y mantenimiento.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Vecindarios Clase D</p>
          <p className="text-gray-400 text-sm">Muy alto crimen. Los rendimientos pueden parecer atractivos pero los desafíos operativos a menudo hacen que los retornos sean negativos.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Unifamiliar vs. Multifamiliar</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Casas Unifamiliares</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Ventajas: más fácil de financiar con préstamos convencionales, amplia base de compradores al vender, inquilinos a más largo plazo (familias), y menor complejidad de gestión. Desventaja: cuando un inquilino se va, tienes 100% de vacante.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Pequeño Multifamiliar (2–4 Unidades)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Dúplex, tríplex y cuádruplex ofrecen mayores ingresos por propiedad y diversificación de riesgo. Todavía se financian con préstamos residenciales (4 unidades o menos). Si una unidad está vacante, las otras siguen produciendo ingresos.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Gran Multifamiliar (5+ Unidades)</h3>
      <p className="text-gray-300 leading-relaxed">
        Requiere financiamiento comercial con requisitos más estrictos. La ventaja: mayor escala económica y valoración basada en ingresos. Generalmente adecuado para inversores que ya han construido experiencia con propiedades más pequeñas.
      </p>
    </div>
  )
}

export function RWLesson2() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
