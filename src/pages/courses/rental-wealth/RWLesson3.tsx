import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { ChartBar as BarChart2, Calculator } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Numbers separate good rental deals from bad ones. Gut feel is not enough — you need a systematic way to evaluate every property before you commit capital. This lesson walks through the key metrics every rental investor must understand, and shows you how to use the Rental Yield Calculator and Deal Analyzer to evaluate real deals step by step.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Metrics That Matter</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Gross Rent Multiplier (GRM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        GRM = Purchase Price ÷ Annual Gross Rent. It's a fast screen — not a complete analysis. A GRM under 10 is generally favorable; over 15 makes cash flow difficult. Use it to quickly filter properties before digging into full numbers.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Gross Rental Yield</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Gross Yield = (Annual Gross Rent ÷ Purchase Price) × 100. A property renting for $1,800/month ($21,600/yr) purchased for $200,000 has a gross yield of 10.8%. Gross yield is useful for quick comparisons but ignores all expenses.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Net Operating Income (NOI)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        NOI = Gross Rent – Operating Expenses (everything except the mortgage). Operating expenses include property taxes, insurance, maintenance, vacancy allowance, and property management. NOI measures the property's income-producing ability independent of financing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cap Rate</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cap Rate = NOI ÷ Purchase Price. If a property generates $12,000 NOI and costs $200,000, the cap rate is 6%. Cap rate lets you compare properties of different prices on the same basis. In most U.S. markets, residential rentals trade at 5–8% cap rates. Higher cap rate = more income relative to price (but often higher risk).
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cash-on-Cash Return (CoC)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        CoC = Annual Cash Flow ÷ Total Cash Invested. This measures the return on your actual out-of-pocket capital (down payment + closing costs + any repairs). A property with $3,600/yr cash flow on a $45,000 investment has a 8% CoC return. This is the metric most buy-and-hold investors care about most.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Debt Service Coverage Ratio (DSCR)</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        DSCR = NOI ÷ Annual Mortgage Payment. A DSCR of 1.0 means NOI exactly covers your mortgage. A DSCR below 1.0 means the property doesn't cover its own debt — you're paying out of pocket. Lenders typically require a minimum DSCR of 1.2–1.25. Aim for 1.25 or higher for a comfortable margin.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use the Rental Yield Calculator</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The Rental Yield Calculator gives you a fast, clean view of gross and net yield for any property. Enter the purchase price, monthly rent, and key expense assumptions — and it instantly shows you yield metrics and cash flow at a glance.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <BarChart2 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Rental Yield Calculator</p>
            <p className="text-gray-400 text-xs mt-0.5">Quickly screen any property's gross and net rental yield</p>
          </div>
        </div>
        <Link
          to="/tools/rental_yield"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use the Deal Analyzer for Full Analysis</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The Deal Analyzer goes deeper — it models the complete financial picture of a rental deal including purchase costs, financing assumptions, all operating expenses, and projected cash flow. It's what you use when you're seriously evaluating a property before making an offer.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Deal Analyzer</p>
            <p className="text-gray-400 text-xs mt-0.5">Full rental property analysis: NOI, cap rate, CoC return, and cash flow</p>
          </div>
        </div>
        <Link
          to="/tools/deal_analyzer"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A Step-by-Step Example</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Let's analyze a real deal together. Here are the inputs:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Deal Inputs</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Purchase price</span><span>$185,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Down payment (25%)</span><span>$46,250</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Closing costs</span><span>$4,500</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Monthly rent</span><span>$1,750</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Monthly mortgage (PITI at 7%)</span><span>$1,105</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Property management (8%)</span><span>$140</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Maintenance + vacancy reserve (10%)</span><span>$175</span></div>
      </div>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Deal Analysis Results</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Annual gross rent</span><span>$21,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Annual operating expenses (ex. mortgage)</span><span>– $3,780</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>NOI</span><span>$17,220</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Cap rate</span><span>9.3%</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Annual mortgage payments</span><span>– $13,260</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Annual cash flow</span><span>$3,960</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Total cash invested</span><span>$50,750</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Cash-on-cash return</span><span className="text-green-400">7.8%</span></div>
        <div className="flex justify-between text-white font-bold"><span>DSCR</span><span className="text-green-400">1.30</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed">
        This deal passes the key tests: positive cash flow, a cap rate above 8%, a CoC return near 8%, and a DSCR comfortably above 1.25. This is a deal worth pursuing. In the next lesson, you'll learn how to finance it.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Los números separan los buenos negocios de alquiler de los malos. Esta lección recorre las métricas clave que todo inversor de alquiler debe entender, y muestra cómo usar la Calculadora de Rendimiento de Alquiler y el Analizador de Negocios para evaluar propiedades reales.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Las Métricas que Importan</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Multiplicador Bruto de Alquiler (GRM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        GRM = Precio de Compra ÷ Alquiler Bruto Anual. Es una revisión rápida. Un GRM inferior a 10 es generalmente favorable; por encima de 15 hace difícil el flujo de efectivo.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Rendimiento Bruto de Alquiler</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Rendimiento Bruto = (Alquiler Bruto Anual ÷ Precio de Compra) × 100. Una propiedad con renta de $1,800/mes ($21,600/año) comprada por $200,000 tiene un rendimiento bruto del 10.8%.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Ingreso Operativo Neto (NOI)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        NOI = Alquiler Bruto – Gastos Operativos (todo excepto la hipoteca). Incluye impuestos sobre la propiedad, seguro, mantenimiento, vacantes y administración.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Tasa de Capitalización (Cap Rate)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cap Rate = NOI ÷ Precio de Compra. En la mayoría de los mercados residenciales de EE.UU., las propiedades de alquiler se negocian a tasas del 5–8%. Mayor cap rate = más ingresos en relación al precio (pero a menudo mayor riesgo).
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Retorno en Efectivo sobre Efectivo (CoC)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        CoC = Flujo de Efectivo Anual ÷ Total de Efectivo Invertido. Esta es la métrica que más les importa a la mayoría de los inversores de compra y retención.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Ratio de Cobertura del Servicio de la Deuda (DSCR)</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        DSCR = NOI ÷ Pago Anual de Hipoteca. Apunta a 1.25 o más para un margen cómodo. Los prestamistas típicamente requieren un DSCR mínimo de 1.2–1.25.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa la Calculadora de Rendimiento de Alquiler</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La Calculadora de Rendimiento de Alquiler te da una vista rápida del rendimiento bruto y neto de cualquier propiedad.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <BarChart2 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Calculadora de Rendimiento de Alquiler</p>
            <p className="text-gray-400 text-xs mt-0.5">Evalúa rápidamente el rendimiento bruto y neto de cualquier propiedad</p>
          </div>
        </div>
        <Link
          to="/tools/rental_yield"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa el Analizador de Negocios para un Análisis Completo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El Analizador de Negocios modela la imagen financiera completa de un negocio de alquiler, incluyendo costos de compra, supuestos de financiamiento, todos los gastos operativos y flujo de efectivo proyectado.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Analizador de Negocios</p>
            <p className="text-gray-400 text-xs mt-0.5">Análisis completo: NOI, cap rate, retorno CoC y flujo de efectivo</p>
          </div>
        </div>
        <Link
          to="/tools/deal_analyzer"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Un Ejemplo Paso a Paso</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Resultados del Análisis</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Alquiler bruto anual</span><span>$21,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>NOI</span><span>$17,220</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Cap rate</span><span>9.3%</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Flujo de efectivo anual</span><span>$3,960</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Retorno CoC</span><span className="text-green-400">7.8%</span></div>
        <div className="flex justify-between text-white font-bold"><span>DSCR</span><span className="text-green-400">1.30</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed">
        Este negocio pasa las pruebas clave: flujo de efectivo positivo, cap rate por encima del 8%, retorno CoC cercano al 8% y DSCR cómodamente por encima de 1.25. En la próxima lección aprenderás cómo financiarlo.
      </p>
    </div>
  )
}

export function RWLesson3() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
