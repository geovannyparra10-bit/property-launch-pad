import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        You've found the deal, estimated the costs, and run the numbers. Now it's time to execute. The execution phase — from managing the rehab through closing the sale — is where deals are won or lost in the field. This lesson covers contractor management, staging and presentation, selling strategies, and the tax implications every flipper needs to understand before they close.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Managing the Rehab: Staying On Time and On Budget</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Every week your property sits under renovation is money out of your pocket in carrying costs. Tight project management isn't optional — it's a core profit driver.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Create a Master Schedule Before Demo Starts</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before swinging a hammer, document the full scope of work in sequential order. Trades must be coordinated — plumbing rough-in before drywall, electrical before insulation, flooring before base cabinets. A typical rehab sequence:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Demo and haul-out</li>
        <li>Structural repairs (if any)</li>
        <li>Plumbing rough-in</li>
        <li>Electrical rough-in</li>
        <li>HVAC installation</li>
        <li>Insulation</li>
        <li>Drywall hang and mud</li>
        <li>Prime and paint</li>
        <li>Flooring</li>
        <li>Kitchen and bath finishes (cabinets, tile, fixtures)</li>
        <li>Trim work and doors</li>
        <li>Final electrical and plumbing (outlets, light fixtures, faucets)</li>
        <li>Appliances, cleaning, punch list</li>
      </ol>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Weekly Site Visits Are Non-Negotiable</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Even if you trust your contractor, visit the site at least twice a week — more during active framing, plumbing, or electrical phases. Catching a mistake during rough-in costs $500 to fix. Catching the same mistake after drywall is up costs $5,000.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Document everything with dated photos. If a dispute arises later over workmanship or change orders, photos are your evidence.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Handling Change Orders</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Changes happen. When they do, get every change order in writing before the work is done — including the scope, cost, and impact on the project timeline. Oral approvals lead to disagreements. A contractor who won't put a change order in writing is a contractor you shouldn't trust.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Staging and Presentation: Selling at Full ARV</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Buyers buy emotionally. A staged home sells faster and at a higher price than an empty or poorly presented one. Studies consistently show staged homes sell 73% faster and for 1–5% more than unstaged equivalents. On a $280,000 home, 2% extra is $5,600 — more than most staging budgets.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Professional staging tips:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Neutral palette:</strong> Stick to warm grays, soft whites, and natural wood tones. Avoid trendy colors that polarize buyers.</li>
        <li><strong className="text-white">Declutter the space:</strong> Staging furniture should be minimal and appropriately sized. Oversized or too much furniture makes rooms feel small.</li>
        <li><strong className="text-white">Curb appeal is your first impression:</strong> Fresh mulch, trimmed bushes, clean driveway, a new front door or hardware can add thousands in perceived value at minimal cost.</li>
        <li><strong className="text-white">Professional photography:</strong> 90% of buyers start their search online. Dark, blurry phone photos are a deal killer. Budget $300–$600 for professional real estate photography.</li>
        <li><strong className="text-white">Light and bright:</strong> Replace all light fixtures with modern, high-lumen options. Schedule listing photos during the day with all blinds open.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Selling Strategies</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Price to Create Competition</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        In active markets, consider pricing slightly below your target ARV to generate multiple offers. A bidding war can push you above your asking price and create urgency. In slower markets, price at ARV and be prepared to negotiate.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Timing Your Listing</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Spring (March–June) is the strongest selling season in most U.S. markets. If your rehab finishes in January, consider whether it's worth carrying the property a few extra weeks to list in March. The premium buyers pay in spring often exceeds the additional holding costs.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Know When to Adjust</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        If your property sits for more than 3 weeks without an offer, something is wrong — usually price, condition, or marketing. Don't be emotionally attached to your ARV estimate. A price reduction of 3–5% often generates a flurry of activity and gets you to closing faster, which reduces carrying costs.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tax Implications: What You Need to Know</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Flipping profits are taxed differently than long-term rental income. Understanding this before you flip — not after — protects your net return.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Short-Term vs. Long-Term Capital Gains</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you hold a flip property for less than 12 months before selling, your profit is taxed as <strong className="text-white">short-term capital gains</strong> — at your ordinary income tax rate, which can be as high as 37% for high earners. Hold for more than 12 months and the profit qualifies for <strong className="text-white">long-term capital gains rates</strong> (0%, 15%, or 20% depending on your income).
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is why many experienced flippers aim to hold properties for at least 12 months when market conditions allow, or structure deals with partners to optimize tax treatment.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Self-Employment Tax for Active Flippers</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        If flipping is your primary business activity (the IRS deems you a "dealer"), your profits may also be subject to self-employment tax (15.3% on the first $160,200 of net income as of 2024), in addition to regular income tax. This dramatically increases your effective tax rate. Work with a CPA who specializes in real estate investors before you close your first deal.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Deductible Expenses</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The good news: virtually all of your project costs are deductible against your flip profit:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>All rehab costs (materials and labor)</li>
        <li>Carrying costs (interest, insurance, utilities)</li>
        <li>Closing costs (buy and sell)</li>
        <li>Agent commissions</li>
        <li>Staging, photography, marketing</li>
        <li>Mileage and travel to/from the property</li>
        <li>Professional fees (CPA, attorney, inspector)</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Use an S-Corp or LLC (Consult a CPA)</h3>
      <p className="text-gray-300 leading-relaxed">
        Many active flippers structure their business as an S-Corp to reduce self-employment tax exposure. The mechanics are beyond the scope of this course, but the key takeaway is this: consult a real estate-focused CPA before your first flip. The tax planning decisions you make now can save you tens of thousands over your flipping career.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Encontraste el negocio, estimaste los costos y calculaste los números. Ahora es el momento de ejecutar. Esta lección cubre la gestión de contratistas, el staging y presentación, las estrategias de venta, y las implicaciones fiscales que todo flipper necesita entender antes de cerrar.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Gestionar la Rehabilitación: A Tiempo y en Presupuesto</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Crea un Programa Maestro Antes de Comenzar</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Antes de comenzar, documenta el alcance completo del trabajo en orden secuencial. Los oficios deben coordinarse — la plomería en bruto antes del drywall, la electricidad antes del aislamiento, los pisos antes de los gabinetes. Visita el sitio al menos dos veces a la semana para detectar errores antes de que sean costosos.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Manejo de Órdenes de Cambio</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Cuando ocurran cambios, obtén cada orden de cambio por escrito antes de que se realice el trabajo, incluyendo el alcance, el costo y el impacto en el cronograma del proyecto.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Staging y Presentación: Vender al ARV Completo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los compradores compran emocionalmente. Las casas con staging se venden un 73% más rápido y por 1–5% más. Consejos:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Paleta neutral:</strong> Grises cálidos, blancos suaves, tonos naturales de madera.</li>
        <li><strong className="text-white">Atractivo exterior:</strong> Mantillo fresco, arbustos recortados, entrada de coches limpia.</li>
        <li><strong className="text-white">Fotografía profesional:</strong> El 90% de los compradores comienzan su búsqueda en línea. Presupuesta $300–$600 para fotografías profesionales.</li>
        <li><strong className="text-white">Luz y brillo:</strong> Reemplaza todas las luminarias con opciones modernas de alta luminosidad.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estrategias de Venta</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Precio para Crear Competencia</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        En mercados activos, considera fijar el precio ligeramente por debajo de tu ARV objetivo para generar múltiples ofertas. Si tu propiedad permanece más de 3 semanas sin oferta, normalmente es un problema de precio, condición o marketing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Momento de tu Listado</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        La primavera (marzo–junio) es la temporada de ventas más fuerte en la mayoría de los mercados de EE.UU. La prima que pagan los compradores en primavera a menudo supera los costos de mantenimiento adicionales.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Implicaciones Fiscales: Lo que Necesitas Saber</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Ganancias de Capital a Corto vs. Largo Plazo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Si vendes en menos de 12 meses, tu ganancia se grava como <strong className="text-white">ganancias de capital a corto plazo</strong> — a tu tasa de impuesto sobre la renta ordinaria (hasta 37%). Retén por más de 12 meses y califica para <strong className="text-white">tasas de ganancias de capital a largo plazo</strong> (0%, 15% o 20%).
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Impuesto de Trabajo por Cuenta Propia</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Si el flipping es tu actividad comercial principal, tus ganancias también pueden estar sujetas al impuesto de trabajo por cuenta propia (15.3%). Trabaja con un CPA especializado en inversores inmobiliarios antes de cerrar tu primer negocio.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Gastos Deducibles</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Prácticamente todos tus costos del proyecto son deducibles: costos de rehabilitación, costos de mantenimiento, costos de cierre, comisiones de agentes, staging, fotografía, kilometraje, honorarios profesionales.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Usa una S-Corp o LLC (Consulta a un CPA)</h3>
      <p className="text-gray-300 leading-relaxed">
        Muchos flippers activos estructuran su negocio como una S-Corp para reducir la exposición al impuesto de trabajo por cuenta propia. La conclusión clave: consulta a un CPA enfocado en bienes raíces antes de tu primer flip. Las decisiones de planificación fiscal que tomes ahora pueden ahorrarte decenas de miles a lo largo de tu carrera de flipping.
      </p>
    </div>
  )
}

export function FPLesson5() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
