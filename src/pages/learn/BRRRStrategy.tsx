import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        What if you could buy a rental property, pull out most or all of your original investment, and still own the property free and clear of your own cash? That's the power of the BRRR strategy — a method that allows disciplined investors to scale a rental portfolio without continuously needing large amounts of fresh capital.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Does BRRR Stand For?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        BRRR stands for <strong className="text-white">Buy, Rehab, Rent, Refinance, Repeat</strong>. Each letter represents a phase in the investment cycle. Together, they describe a strategy where an investor purchases a distressed property below market value, renovates it to force appreciation, rents it out to stabilize income, refinances to pull out equity, and then uses that equity to do it again.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The genius of BRRR is capital recycling. Unlike a traditional buy-and-hold where your down payment is tied up in the property indefinitely, BRRR allows you to recapture and redeploy that capital — sometimes within 6 to 12 months of closing. Done correctly, you can build a substantial portfolio with a surprisingly small initial pool of capital.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: Buy — Finding the Right Deal</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The BRRR strategy lives or dies on the buy. If you overpay for the property, no amount of renovation will create enough equity to execute a successful refinance. The goal is to find distressed properties selling below their After Repair Value (ARV) — the property's estimated value after renovations are complete.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Where do BRRR investors find deals? The best sources include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Off-market properties:</strong> Direct mail campaigns, driving for dollars, and networking with wholesalers often uncover properties before they hit the MLS.</li>
        <li><strong className="text-white">MLS distressed listings:</strong> REOs (bank-owned), short sales, and estate sales listed on the open market.</li>
        <li><strong className="text-white">Foreclosure auctions:</strong> Higher risk, but potentially significant discounts. Requires cash and carries title risks.</li>
        <li><strong className="text-white">Wholesalers:</strong> Investors who find deals and assign the contract to you for a fee. Saves legwork but typically reduces the margin.</li>
        <li><strong className="text-white">Probate and tax lien sales:</strong> Properties in estate proceedings or with delinquent taxes are often motivated sellers.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        The financing at purchase is typically a short-term hard money loan (8–12% interest, 1–3 points) or private money from individuals. The higher cost is acceptable because you'll be refinancing out of it quickly. Some experienced investors use HELOC funds or existing cash reserves.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: Rehab — Forcing Appreciation</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The rehab phase is where you create value. Unlike market appreciation (which is passive and unpredictable), forced appreciation is something you directly control by improving the property. Your renovation budget should be laser-focused on improvements that maximize the appraisal value, not personal taste.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        High-ROI renovations for BRRR properties typically include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Kitchen updates (cabinets, countertops, appliances) — often the single highest-value improvement</li>
        <li>Bathroom renovations (new vanities, fixtures, tile)</li>
        <li>Flooring replacement (LVP is durable and cost-effective for rentals)</li>
        <li>Fresh paint throughout (highest ROI of any single improvement)</li>
        <li>Roof, HVAC, plumbing, and electrical — necessary for appraisal and tenant safety</li>
        <li>Curb appeal (landscaping, new front door, exterior paint)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Avoid over-improving. There's a ceiling on value in every neighborhood (the "market ceiling"), and spending $80,000 on a kitchen in a $150,000 market won't produce an $80,000 increase in appraised value. Your renovation should bring the property up to — but not significantly above — neighborhood comps.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Speed matters in the rehab phase. Every week you're holding the property with a high-interest hard money loan, your holding costs accumulate. Having a reliable contractor and a detailed scope of work before closing is essential to keeping the project on time and on budget.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: Rent — Stabilizing the Asset</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Once the renovation is complete, you need to get a qualified tenant in place. Most lenders require 3–6 months of rental history (or at least a signed lease) before they'll refinance the property. This "seasoning period" is a critical timing consideration in your BRRR plan.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Key considerations in the rent phase:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Price at market rent:</strong> Price your unit competitively to minimize vacancy. Overpricing leads to extended vacancies that hurt cash flow and delay your refinance.</li>
        <li><strong className="text-white">Screen tenants thoroughly:</strong> Run credit, income verification, and background checks. Bad tenants can create costly evictions and property damage that undermine your entire BRRR cycle.</li>
        <li><strong className="text-white">Use a proper lease:</strong> Especially in tenant-friendly states, a well-crafted lease protects you legally.</li>
        <li><strong className="text-white">Document everything:</strong> Keep records of rent payments, maintenance requests, and any communications — important for your lender during the refinance.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: Refinance — Pulling Out Your Capital</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The refinance is the "magic" step that makes BRRR so powerful. After completing renovations and placing a tenant, you apply for a conventional cash-out refinance with a long-term lender. The lender will order an appraisal based on the new ARV. If your numbers were right at purchase, the appraisal should reflect a value well above what you paid.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most lenders will refinance up to 75–80% of the appraised value (Loan-to-Value ratio). The loan proceeds are used to pay off your hard money loan, and any remaining cash is returned to you — that's your capital being recycled.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <h4 className="text-white font-semibold mb-4">BRRR Example With Numbers</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Purchase price</span><span className="text-white font-medium">$90,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Rehab cost</span><span className="text-white font-medium">$30,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Holding costs (3 months)</span><span className="text-white font-medium">$3,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Total all-in cost</span><span className="text-white font-medium">$123,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>After Repair Value (ARV)</span><span className="text-blue-400 font-medium">$160,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Refinance at 75% LTV</span><span className="text-green-400 font-medium">$120,000</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">Cash left in deal</span><span className="text-green-400 font-bold text-base">$3,000</span></div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        In this example, you invested $123,000 total and pulled back $120,000 through the refinance, leaving only $3,000 of your own money in the deal. You now own a $160,000 rental property with a long-term, fixed-rate mortgage and a monthly-paying tenant. That $3,000 is your "money left in the deal."
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The holy grail is achieving a "infinite return" deal — where you pull out 100% or more of your invested capital, meaning you have zero of your own money in the deal while still owning the asset.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: Repeat — Scaling Your Portfolio</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        With your capital recycled, you're ready to find the next deal. The power of BRRR compounds over time — each successful deal returns capital that funds the next one. Some investors do 2–4 BRRR deals per year and build 10+ door portfolios within 3–5 years starting with modest initial capital.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        As your portfolio grows, you'll also find that lenders become more willing to work with you (you have a track record), tenants refer other tenants, and contractors give you better pricing due to volume. The system accelerates the more you use it.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Calculating ARV: The Most Critical Number</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Your entire BRRR profit model depends on accurately estimating the After Repair Value (ARV) before you buy. Overestimating ARV is the #1 mistake that kills BRRR deals — you'll be stuck with less equity than expected and unable to pull your capital out.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        How to estimate ARV:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Pull recent sold comps (comparable properties) within 0.5–1 mile, similar size, age, and condition</li>
        <li>Focus on homes that sold in the last 3–6 months — older comps don't reflect current market conditions</li>
        <li>Adjust for differences in square footage, bedrooms, bathrooms, garage, lot size</li>
        <li>Be conservative — appraisers are conservative too, and your lender uses the appraisal, not your estimate</li>
        <li>Get a licensed appraiser or a BPO (Broker Price Opinion) before closing when possible</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Common BRRR Mistakes to Avoid</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Overestimating ARV:</strong> The most common and costly error. Conservative ARV estimates protect you from getting stuck.</li>
        <li><strong className="text-white">Underestimating rehab costs:</strong> Always add a 15–20% contingency buffer to your rehab budget. Surprises always happen.</li>
        <li><strong className="text-white">Ignoring holding costs:</strong> Hard money interest, taxes, insurance, and utilities add up quickly. A 6-month rehab is far more expensive than a 2-month one.</li>
        <li><strong className="text-white">Not having an exit strategy:</strong> If the refinance doesn't work out (appraisal comes in low, you can't qualify), do you have the cash reserves to cover the hard money payoff?</li>
        <li><strong className="text-white">Poor tenant selection:</strong> An eviction mid-BRRR cycle can destroy your timeline and budget. Invest in thorough screening.</li>
        <li><strong className="text-white">Violating lender seasoning requirements:</strong> Some lenders require 6–12 months of ownership before a cash-out refinance. Know this before you buy.</li>
      </ul>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        ¿Qué pasaría si pudieras comprar una propiedad de alquiler, recuperar la mayor parte o toda tu inversión original, y aún así seguir siendo propietario sin tener tu propio efectivo inmovilizado? Ese es el poder de la estrategia BRRR: un método que permite a los inversores disciplinados escalar una cartera de alquileres sin necesitar continuamente grandes cantidades de capital nuevo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Qué Significa BRRR?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        BRRR significa <strong className="text-white">Buy (Comprar), Rehab (Rehabilitar), Rent (Rentar), Refinance (Refinanciar), Repeat (Repetir)</strong>. Cada letra representa una fase del ciclo de inversión. En conjunto, describen una estrategia en la que un inversor compra una propiedad en mal estado por debajo del valor de mercado, la renueva para forzar la apreciación, la alquila para estabilizar los ingresos, refinancia para sacar capital, y luego usa ese capital para repetir el proceso.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        El genio del BRRR está en el reciclaje de capital. A diferencia de un comprar-y-mantener tradicional donde tu pago inicial queda inmovilizado en la propiedad indefinidamente, el BRRR te permite recuperar y reutilizar ese capital — a veces dentro de 6 a 12 meses del cierre. Bien ejecutado, puedes construir una cartera sustancial con una cantidad inicial de capital sorprendentemente pequeña.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 1: Comprar — Encontrar el Negocio Correcto</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La estrategia BRRR vive o muere en la compra. Si pagas de más por la propiedad, ninguna cantidad de renovación creará suficiente capital para ejecutar un refinanciamiento exitoso. El objetivo es encontrar propiedades en mal estado que se vendan por debajo de su Valor Después de la Reparación (ARV) — el valor estimado de la propiedad después de completar las renovaciones.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        ¿Dónde encuentran negocios los inversores BRRR? Las mejores fuentes incluyen:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Propiedades fuera del mercado:</strong> Campañas de correo directo, conducir por el vecindario y trabajar con mayoristas suelen revelar propiedades antes de que lleguen al MLS.</li>
        <li><strong className="text-white">Listados en mal estado en el MLS:</strong> REOs (propiedades del banco), ventas cortas y ventas de sucesiones en el mercado abierto.</li>
        <li><strong className="text-white">Subastas de ejecución hipotecaria:</strong> Mayor riesgo, pero potencialmente descuentos significativos. Requiere efectivo y conlleva riesgos de título.</li>
        <li><strong className="text-white">Mayoristas:</strong> Inversores que encuentran negocios y te ceden el contrato por una tarifa. Ahorra trabajo pero típicamente reduce el margen.</li>
        <li><strong className="text-white">Ventas probatorias y embargos fiscales:</strong> Las propiedades en procesos sucesorios o con impuestos atrasados suelen tener vendedores motivados.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        El financiamiento en la compra suele ser un préstamo de dinero duro a corto plazo (8–12% de interés, 1–3 puntos) o dinero privado de individuos. El mayor costo es aceptable porque pronto saldrás de él mediante el refinanciamiento. Algunos inversores experimentados usan fondos de HELOC o reservas de efectivo existentes.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 2: Rehabilitar — Forzar la Apreciación</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La fase de rehabilitación es donde creas valor. A diferencia de la apreciación de mercado (que es pasiva e impredecible), la apreciación forzada es algo que controlas directamente al mejorar la propiedad. Tu presupuesto de renovación debe enfocarse en mejoras que maximicen el valor de tasación, no en gustos personales.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las renovaciones de alto retorno para propiedades BRRR típicamente incluyen:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Actualización de cocina (gabinetes, encimeras, electrodomésticos) — a menudo la mejora de mayor valor</li>
        <li>Renovaciones de baño (nuevas vanidades, accesorios, azulejos)</li>
        <li>Reemplazo de pisos (LVP es duradero y rentable para alquileres)</li>
        <li>Pintura fresca en toda la propiedad (el mayor ROI de cualquier mejora)</li>
        <li>Techo, HVAC, plomería y electricidad — necesarios para la tasación y la seguridad del inquilino</li>
        <li>Atractivo exterior (paisajismo, nueva puerta principal, pintura exterior)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Evita mejorar en exceso. Hay un techo en el valor en cada vecindario, y gastar $80,000 en una cocina en un mercado de $150,000 no producirá un aumento de $80,000 en el valor tasado. Tu renovación debe llevar la propiedad al — pero no significativamente por encima del — nivel de las propiedades comparables del vecindario.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 3: Rentar — Estabilizar el Activo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una vez completada la renovación, necesitas colocar un inquilino calificado. La mayoría de los prestamistas requieren 3–6 meses de historial de alquiler (o al menos un contrato firmado) antes de refinanciar la propiedad. Este "período de maduración" es una consideración crítica de tiempo en tu plan BRRR.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Consideraciones clave en la fase de alquiler: establece el precio a la renta de mercado para minimizar la vacancia, selecciona inquilinos exhaustivamente con verificaciones de crédito e ingresos, usa un contrato de arrendamiento adecuado, y documenta todo para tu prestamista durante el refinanciamiento.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 4: Refinanciar — Recuperar Tu Capital</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El refinanciamiento es el paso "mágico" que hace al BRRR tan poderoso. Después de completar las renovaciones y colocar un inquilino, solicitas un refinanciamiento con extracción de efectivo convencional con un prestamista a largo plazo. El prestamista ordenará una tasación basada en el nuevo ARV.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
        <h4 className="text-white font-semibold mb-4">Ejemplo BRRR con Números</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Precio de compra</span><span className="text-white font-medium">$90,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Costo de rehabilitación</span><span className="text-white font-medium">$30,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Costos de tenencia (3 meses)</span><span className="text-white font-medium">$3,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Costo total invertido</span><span className="text-white font-medium">$123,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Valor Después de la Reparación (ARV)</span><span className="text-blue-400 font-medium">$160,000</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Refinanciamiento al 75% LTV</span><span className="text-green-400 font-medium">$120,000</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">Efectivo que queda en el negocio</span><span className="text-green-400 font-bold text-base">$3,000</span></div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        En este ejemplo, invertiste $123,000 en total y recuperaste $120,000 a través del refinanciamiento, dejando solo $3,000 de tu propio dinero en el negocio. Ahora eres propietario de una propiedad de alquiler de $160,000 con una hipoteca a largo plazo a tasa fija y un inquilino que paga mensualmente.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 5: Repetir — Escalar Tu Cartera</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Con tu capital reciclado, estás listo para encontrar el próximo negocio. El poder del BRRR se compone con el tiempo — cada negocio exitoso devuelve capital que financia el siguiente. Algunos inversores hacen 2–4 negocios BRRR por año y construyen carteras de 10+ unidades en 3–5 años comenzando con capital inicial modesto.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Errores Comunes del BRRR a Evitar</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Sobreestimar el ARV:</strong> El error más común y costoso. Las estimaciones conservadoras de ARV te protegen de quedarte atascado.</li>
        <li><strong className="text-white">Subestimar los costos de rehabilitación:</strong> Siempre agrega un margen de contingencia del 15–20% a tu presupuesto de rehabilitación. Las sorpresas siempre ocurren.</li>
        <li><strong className="text-white">Ignorar los costos de tenencia:</strong> Los intereses del dinero duro, impuestos, seguros y servicios se acumulan rápidamente.</li>
        <li><strong className="text-white">No tener una estrategia de salida:</strong> Si el refinanciamiento no funciona, ¿tienes reservas de efectivo para cubrir el pago del préstamo de dinero duro?</li>
        <li><strong className="text-white">Mala selección de inquilinos:</strong> Un desalojo a mitad del ciclo BRRR puede destruir tu cronograma y presupuesto.</li>
        <li><strong className="text-white">Violar los requisitos de maduración del prestamista:</strong> Algunos prestamistas requieren 6–12 meses de propiedad antes de un refinanciamiento con extracción de efectivo.</li>
      </ul>
    </div>
  )
}

export function BRRRStrategy() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="The BRRR Strategy Explained: Buy, Rehab, Rent, Refinance, Repeat"
      titleEs="La Estrategia BRRR Explicada: Comprar, Rehabilitar, Rentar, Refinanciar, Repetir"
      readTimeEn="10 min read"
      readTimeEs="10 min de lectura"
      categoryEn="Strategy"
      categoryEs="Estrategia"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Model Your BRRR Deal' : 'Modela Tu Negocio BRRR'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use the BRRR Calculator to plug in your numbers, estimate your ARV, and see how much capital you can recycle from your next deal.'
            : 'Usa la Calculadora BRRR para ingresar tus números, estimar tu ARV y ver cuánto capital puedes reciclar de tu próximo negocio.'}
        </p>
        <Link
          to="/tools/brrr"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open BRRR Calculator' : 'Abrir Calculadora BRRR'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
