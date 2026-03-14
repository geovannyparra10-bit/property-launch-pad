import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Imagine paying $0 in housing costs — or even getting paid to live in your own home. That's the promise of house hacking, a time-tested strategy that savvy investors have used for decades to eliminate housing expenses while simultaneously building long-term wealth.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Is House Hacking?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        House hacking is the strategy of purchasing a multi-unit or multi-room property, living in one unit or room yourself, and renting out the remaining units or rooms to tenants. The rental income from your tenants offsets — and ideally covers entirely — your mortgage payment, effectively allowing you to live for free or at a drastically reduced cost.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The term was popularized by BiggerPockets, but the concept is as old as real estate itself. Your grandparents may have rented out a room in their home during tough times. Today, house hackers do it intentionally as a wealth-building strategy from day one.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        What makes house hacking uniquely powerful is that it bridges the gap between renting (which builds zero equity) and traditional homeownership (which requires 100% of mortgage costs from your own pocket). With house hacking, you can own property, build equity, and have someone else pay your mortgage.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why FHA Loans Are a House Hacker's Best Friend</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        One of the biggest barriers to real estate investing is the down payment. Conventional investment properties typically require 20–25% down — that's $50,000 to $62,500 on a $250,000 property. House hacking changes the math dramatically.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Because you're technically buying a primary residence (you plan to live there), you can use an FHA loan, which requires as little as <strong className="text-white">3.5% down</strong>. On that same $250,000 property, that's just $8,750 out of pocket — a fraction of what a conventional investor would need.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        FHA loans are backed by the Federal Housing Administration and are specifically designed for owner-occupants. The key rules:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>You must occupy one of the units as your primary residence for at least one year.</li>
        <li>The property must be 1–4 units (a 4-unit building is the largest FHA-eligible property).</li>
        <li>You'll need a minimum credit score of 580 for 3.5% down (500–579 requires 10% down).</li>
        <li>There are loan limits by county — check your area's FHA limits before assuming a property qualifies.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Conventional loans (3% down via Fannie Mae's HomeReady program) and VA loans (0% down for eligible veterans) are also viable options depending on your situation.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Types of House Hacking</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        House hacking isn't one-size-fits-all. There are several approaches depending on your budget, lifestyle, and local market:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Duplex or Triplex / Fourplex</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The classic approach. You buy a 2, 3, or 4-unit property, live in one unit, and rent the others. This is the most profitable form of house hacking because each additional unit generates more rental income. A fourplex is the "holy grail" for beginners — it's the largest property eligible for an FHA loan, yet it can generate enough income to completely cover your mortgage.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Rent by the Room</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Buy a single-family home with 3+ bedrooms and rent out the extra rooms to roommates. This approach works especially well near universities, hospitals, or in high-cost cities where room rentals command strong prices. A 4-bedroom home where you live in one room and rent out three can be highly profitable. The tradeoff: you share common spaces with tenants.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Accessory Dwelling Units (ADUs)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Buy a single-family home with an existing or buildable ADU — a garage apartment, basement suite, or backyard cottage. You live in the main house and rent out the ADU. Many cities are now actively encouraging ADU development, making this approach increasingly common.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Short-Term Rental House Hack</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        In markets where short-term rentals (Airbnb, VRBO) are permitted, renting your extra units or rooms on a nightly basis can generate 2–3x more income than long-term rentals. This strategy requires more management effort but can dramatically accelerate your savings rate.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A Real-World Example With Numbers</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Let's walk through a realistic house hack scenario:
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <h4 className="text-white font-semibold mb-4">Scenario: 3-Unit Property in a Mid-Size City</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Purchase price</span><span className="text-white font-medium">$320,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>FHA down payment (3.5%)</span><span className="text-white font-medium">$11,200</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Loan amount</span><span className="text-white font-medium">$308,800</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Monthly mortgage (PITI)</span><span className="text-red-400 font-medium">-$2,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Rent from Unit 2</span><span className="text-green-400 font-medium">+$1,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Rent from Unit 3</span><span className="text-green-400 font-medium">+$1,100</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">Your effective housing cost</span><span className="text-green-400 font-bold text-base">$100/month</span></div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        In this example, instead of paying $2,100/month in rent or mortgage on a single-family home, you pay just $100/month — a savings of $2,000/month, or $24,000/year. Over five years, that's $120,000 in savings, not counting equity buildup from your mortgage paydown and any property appreciation.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        And if market rents rise slightly, you may reach true $0 housing costs. Some house hackers even achieve positive cash flow, meaning they get paid to live in their own home.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Pros and Cons of House Hacking</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
          <h4 className="text-green-400 font-semibold mb-3">Advantages</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Low down payment via FHA (3.5%)</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Drastically reduced or eliminated housing costs</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Build equity while tenants pay your mortgage</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Easier to qualify — lenders count rental income</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Great entry point into real estate investing</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Tax benefits (depreciation, repairs, etc.)</li>
          </ul>
        </div>
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
          <h4 className="text-red-400 font-semibold mb-3">Disadvantages</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>You live with or near your tenants</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Landlord responsibilities from day one</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Vacancies directly impact your ability to pay your mortgage</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>FHA requires MIP (mortgage insurance premium)</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Multi-unit properties may be harder to find in some markets</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Must occupy for at least 1 year per FHA rules</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Getting Started: Your Action Plan</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you're ready to explore house hacking, here are the practical steps to take:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-6 ml-4">
        <li><strong className="text-white">Check your credit score.</strong> Aim for 620+ (ideally 680+) to get the best FHA rates. Pull your free report at annualcreditreport.com and fix any errors.</li>
        <li><strong className="text-white">Get pre-approved for an FHA loan.</strong> Talk to 2–3 lenders and compare rates. Ask specifically about the "owner-occupied multi-family" FHA product.</li>
        <li><strong className="text-white">Research your local market.</strong> Look at Zillow, Realtor.com, and local MLS listings for duplexes, triplexes, and fourplexes. Compare asking prices to rental rates using our calculator.</li>
        <li><strong className="text-white">Run the numbers before making an offer.</strong> Use the House Hack Calculator below to model different scenarios and ensure the deal pencils out.</li>
        <li><strong className="text-white">Make an offer and inspect thoroughly.</strong> Multi-unit properties require extra diligence — inspect all units, review existing leases, and understand the local landlord-tenant laws.</li>
        <li><strong className="text-white">Secure tenants before or at closing.</strong> Ideally, the property already has tenants in place, or you begin marketing before you close to minimize vacancy.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">After Year One: What Comes Next?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        After living in the property for 12 months (satisfying the FHA occupancy requirement), you have several powerful options:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Move out and convert your unit into a third rental, maximizing cash flow</li>
        <li>Keep the property and use your savings to house hack again at a new property</li>
        <li>Refinance into a conventional loan to remove FHA mortgage insurance once you have 20% equity</li>
        <li>Use a cash-out refinance or HELOC to fund your next down payment</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Many successful investors have built portfolios of 5, 10, or even 20+ units by repeating this process. Each house hack sets you up for the next one, compounding your wealth at an accelerating pace.
      </p>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Imagina pagar $0 en costos de vivienda — o incluso que te paguen por vivir en tu propia casa. Esa es la promesa del house hacking, una estrategia probada en el tiempo que inversores inteligentes han utilizado durante décadas para eliminar los gastos de vivienda mientras construyen riqueza a largo plazo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Qué es el House Hacking?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El house hacking es la estrategia de comprar una propiedad con múltiples unidades o habitaciones, vivir en una unidad o habitación tú mismo, y alquilar las unidades o habitaciones restantes a inquilinos. El ingreso por alquiler de tus inquilinos compensa — e idealmente cubre completamente — tu pago hipotecario, permitiéndote efectivamente vivir gratis o a un costo drásticamente reducido.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        El término fue popularizado por BiggerPockets, pero el concepto es tan antiguo como los bienes raíces. Tus abuelos puede que hayan alquilado una habitación en su casa durante tiempos difíciles. Hoy, los house hackers lo hacen intencionalmente como estrategia de construcción de riqueza desde el primer día.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Lo que hace al house hacking único es que tiende un puente entre rentar (que no construye capital) y la propiedad tradicional (que requiere el 100% de los costos hipotecarios de tu propio bolsillo). Con el house hacking, puedes ser propietario, construir capital, y que alguien más pague tu hipoteca.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Por Qué los Préstamos FHA Son el Mejor Amigo del House Hacker</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Uno de los mayores obstáculos para invertir en bienes raíces es el pago inicial. Las propiedades de inversión convencionales típicamente requieren entre 20% y 25% de entrada — eso es entre $50,000 y $62,500 en una propiedad de $250,000. El house hacking cambia drásticamente esa matemática.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Dado que técnicamente estás comprando una residencia principal (planeas vivir allí), puedes usar un préstamo FHA, que requiere tan solo un <strong className="text-white">3.5% de entrada</strong>. En esa misma propiedad de $250,000, eso es solo $8,750 de tu bolsillo — una fracción de lo que necesitaría un inversor convencional.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los préstamos FHA están respaldados por la Administración Federal de Vivienda y están diseñados específicamente para propietarios que van a ocupar la vivienda. Las reglas clave:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Debes ocupar una de las unidades como residencia principal durante al menos un año.</li>
        <li>La propiedad debe tener entre 1 y 4 unidades (un edificio de 4 unidades es la propiedad más grande elegible para FHA).</li>
        <li>Necesitas un puntaje de crédito mínimo de 580 para el 3.5% de entrada (500–579 requiere 10%).</li>
        <li>Hay límites de préstamo por condado — verifica los límites FHA de tu área antes de asumir que una propiedad califica.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Los préstamos convencionales (3% de entrada vía el programa HomeReady de Fannie Mae) y los préstamos VA (0% de entrada para veteranos elegibles) también son opciones viables dependiendo de tu situación.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tipos de House Hacking</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El house hacking no es igual para todos. Hay varios enfoques dependiendo de tu presupuesto, estilo de vida y mercado local:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Dúplex, Tríplex o Cuádruplex</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El enfoque clásico. Compras una propiedad de 2, 3 o 4 unidades, vives en una unidad y alquilas las demás. Esta es la forma más rentable de house hacking porque cada unidad adicional genera más ingresos por alquiler. Un cuádruplex es el "santo grial" para principiantes — es la propiedad más grande elegible para un préstamo FHA, y puede generar suficientes ingresos para cubrir completamente tu hipoteca.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Alquiler por Habitación</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Compra una casa unifamiliar con 3 o más habitaciones y alquila las habitaciones adicionales a compañeros de cuarto. Este enfoque funciona especialmente bien cerca de universidades, hospitales o en ciudades de alto costo donde los alquileres por habitación alcanzan precios elevados. Una casa de 4 habitaciones donde vives en una y alquilas las otras tres puede ser muy rentable. La desventaja: compartes espacios comunes con los inquilinos.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Unidades de Vivienda Accesoria (ADU)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Compra una casa unifamiliar con una ADU existente o construible — un apartamento sobre el garaje, una suite en el sótano o una cabaña en el patio trasero. Vives en la casa principal y alquilas la ADU. Muchas ciudades ahora fomentan activamente el desarrollo de ADUs, haciendo este enfoque cada vez más común.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. House Hack con Alquiler a Corto Plazo</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        En mercados donde los alquileres a corto plazo (Airbnb, VRBO) están permitidos, alquilar tus unidades o habitaciones extra por noche puede generar 2 a 3 veces más ingresos que los alquileres a largo plazo. Esta estrategia requiere más esfuerzo de gestión pero puede acelerar drásticamente tu tasa de ahorro.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Un Ejemplo Real con Números</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Veamos un escenario realista de house hacking:
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <h4 className="text-white font-semibold mb-4">Escenario: Propiedad de 3 Unidades en una Ciudad de Tamaño Mediano</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Precio de compra</span><span className="text-white font-medium">$320,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Pago inicial FHA (3.5%)</span><span className="text-white font-medium">$11,200</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Monto del préstamo</span><span className="text-white font-medium">$308,800</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Hipoteca mensual (PITI)</span><span className="text-red-400 font-medium">-$2,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Alquiler Unidad 2</span><span className="text-green-400 font-medium">+$1,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Alquiler Unidad 3</span><span className="text-green-400 font-medium">+$1,100</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">Tu costo efectivo de vivienda</span><span className="text-green-400 font-bold text-base">$100/mes</span></div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        En este ejemplo, en lugar de pagar $2,100/mes en renta o hipoteca por una casa unifamiliar, pagas solo $100/mes — un ahorro de $2,000/mes, o $24,000 al año. En cinco años, son $120,000 en ahorros, sin contar el capital acumulado por el pago de la hipoteca y cualquier apreciación de la propiedad.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Y si los alquileres de mercado suben ligeramente, podrías llegar a $0 en costos de vivienda. Algunos house hackers incluso logran flujo de caja positivo, lo que significa que les pagan por vivir en su propia casa.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ventajas y Desventajas del House Hacking</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
          <h4 className="text-green-400 font-semibold mb-3">Ventajas</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Bajo pago inicial vía FHA (3.5%)</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Costos de vivienda drásticamente reducidos o eliminados</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Construye capital mientras los inquilinos pagan tu hipoteca</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Más fácil de calificar — los prestamistas cuentan los ingresos por alquiler</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Excelente punto de entrada a la inversión inmobiliaria</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Beneficios fiscales (depreciación, reparaciones, etc.)</li>
          </ul>
        </div>
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
          <h4 className="text-red-400 font-semibold mb-3">Desventajas</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Vives con o cerca de tus inquilinos</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Responsabilidades de arrendador desde el primer día</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Las vacantes afectan directamente tu capacidad de pagar la hipoteca</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>FHA requiere MIP (prima de seguro hipotecario)</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Las propiedades multiunitarias pueden ser difíciles de encontrar en algunos mercados</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Debes ocupar la propiedad al menos 1 año según las reglas FHA</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Para Empezar: Tu Plan de Acción</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Si estás listo para explorar el house hacking, aquí están los pasos prácticos a seguir:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-6 ml-4">
        <li><strong className="text-white">Revisa tu puntaje de crédito.</strong> Apunta a 620+ (idealmente 680+) para obtener las mejores tasas FHA. Descarga tu reporte gratuito en annualcreditreport.com y corrige cualquier error.</li>
        <li><strong className="text-white">Obtén una preaprobación para un préstamo FHA.</strong> Habla con 2–3 prestamistas y compara tasas. Pregunta específicamente sobre el producto FHA "multifamiliar ocupado por el propietario".</li>
        <li><strong className="text-white">Investiga tu mercado local.</strong> Mira en Zillow, Realtor.com y listados locales los dúplex, tríplex y cuádruplex. Compara precios de venta con tasas de alquiler usando nuestra calculadora.</li>
        <li><strong className="text-white">Calcula los números antes de hacer una oferta.</strong> Usa la Calculadora de House Hack abajo para modelar diferentes escenarios y asegurarte de que el negocio sea rentable.</li>
        <li><strong className="text-white">Haz una oferta e inspecciona a fondo.</strong> Las propiedades multiunitarias requieren más diligencia — inspecciona todas las unidades, revisa los contratos de arrendamiento existentes y entiende las leyes locales de arrendadores e inquilinos.</li>
        <li><strong className="text-white">Asegura inquilinos antes o al cierre.</strong> Idealmente, la propiedad ya tiene inquilinos, o comienzas a comercializarla antes del cierre para minimizar la vacancia.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Después del Primer Año: ¿Qué Sigue?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Después de vivir en la propiedad durante 12 meses (cumpliendo el requisito de ocupación FHA), tienes varias opciones poderosas:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Mudarte y convertir tu unidad en un tercer alquiler, maximizando el flujo de caja</li>
        <li>Conservar la propiedad y usar tus ahorros para hacer house hack de nuevo en una nueva propiedad</li>
        <li>Refinanciar a un préstamo convencional para eliminar el seguro hipotecario FHA una vez que tengas el 20% de capital</li>
        <li>Usar una refinanciación con extracción de efectivo o una HELOC para financiar tu próximo pago inicial</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Muchos inversores exitosos han construido carteras de 5, 10 o incluso más de 20 unidades repitiendo este proceso. Cada house hack te prepara para el siguiente, multiplicando tu riqueza a un ritmo acelerado.
      </p>
    </div>
  )
}

export function HouseHacking101() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="House Hacking 101: How to Live for Free While Building Wealth"
      titleEs="House Hacking 101: Cómo Vivir Gratis Mientras Construyes Riqueza"
      readTimeEn="9 min read"
      readTimeEs="9 min de lectura"
      categoryEn="Strategy"
      categoryEs="Estrategia"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Ready to Run the Numbers?' : '¿Listo para Calcular los Números?'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use our House Hack Calculator to model your specific scenario and see exactly what your monthly costs would be.'
            : 'Usa nuestra Calculadora de House Hack para modelar tu escenario específico y ver exactamente cuáles serían tus costos mensuales.'}
        </p>
        <Link
          to="/tools/house_hack"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open House Hack Calculator' : 'Abrir Calculadora de House Hack'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
