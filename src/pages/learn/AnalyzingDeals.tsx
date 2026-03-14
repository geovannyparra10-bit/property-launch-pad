import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The ability to quickly analyze a real estate deal is one of the most valuable skills an investor can develop. Experienced investors evaluate dozens of properties for every one they purchase — and they do it fast. This guide walks you through a systematic 15-minute framework that separates the good deals from the time-wasters before you invest serious due diligence hours.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Speed Matters in Deal Analysis</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The best deals move fast. In competitive markets, a property listed on Monday may have multiple offers by Wednesday. If you need two weeks to decide whether to pursue a deal, you'll consistently lose to investors who've built the mental muscle to evaluate quickly and act decisively.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The goal isn't to rush — it's to develop a systematic process that gives you a reliable answer quickly. The 15-minute analysis framework here handles the initial filter. Deals that pass go on to a deeper dive with actual contractor bids, comp analysis, and professional inspections. Deals that fail the quick screen are released without remorse, preserving your time for better opportunities.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Key Numbers: What You Must Calculate</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Gross Rent and Vacancy Adjustment</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Start with the property's potential gross rent — what the units would produce at full occupancy. Then apply a vacancy allowance (typically 5–8% in healthy markets, higher in weaker ones) to arrive at <strong className="text-white">Effective Gross Income (EGI)</strong>.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Research rents using Zillow Rentals, Apartments.com, Rentometer, or by calling local property managers. Get specific to the submarket — rents can vary dramatically by neighborhood within the same city.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Net Operating Income (NOI)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        NOI is the most fundamental metric in commercial and multi-family real estate analysis. It represents the property's income-generating power independent of financing:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Net Operating Income</p>
        <p className="text-xl font-bold text-white">NOI = Effective Gross Income − All Operating Expenses</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Operating expenses include: property taxes, insurance, property management, repairs and maintenance, utilities (if landlord-paid), HOA fees, lawn and snow removal, and capital expenditure reserves. <strong className="text-white">The mortgage is NOT included in NOI calculations.</strong>
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        When you don't have actual expense data, use the <strong className="text-white">50% Rule</strong> as a quick estimate: total operating expenses tend to equal about 50% of gross rents. This rule of thumb works surprisingly well across diverse markets and property types.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Cap Rate</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The cap rate expresses the property's return as if you paid all cash:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Cap Rate</p>
        <p className="text-xl font-bold text-white">Cap Rate = NOI ÷ Purchase Price</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cap rates allow you to compare properties across different prices and locations on an equal footing. A $100,000 NOI property worth $2,000,000 has the same 5% cap rate as a $20,000 NOI property worth $400,000.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Know your market's cap rate expectations before analyzing deals. In major metros (NYC, LA, SF), 4–5% cap rates are normal. In secondary markets (Columbus, Memphis, Indianapolis), 7–9%+ is achievable. Buying at or below market cap rates generally means you're paying a fair price; buying above market cap rates means you're getting a relative bargain.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Cash Flow</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cash flow is what's left after the mortgage payment:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Monthly Cash Flow</p>
        <p className="text-xl font-bold text-white">Cash Flow = NOI − Annual Debt Service ÷ 12</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most investors target a minimum of $100–$200 per unit per month in cash flow after all expenses and the mortgage. Below that, there's not enough buffer for unexpected vacancies or repairs. Negative cash flow (alligator property) means you're paying to own it — acceptable only if you have very strong conviction on appreciation.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">5. Cash-on-Cash Return (CoC)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        CoC measures the return on your actual invested capital:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Cash-on-Cash Return</p>
        <p className="text-xl font-bold text-white">CoC = Annual Cash Flow ÷ Total Cash Invested</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Total cash invested includes your down payment, closing costs, and any immediate repairs. Target 8–12%+ CoC for a strong rental. Below 6% starts to compete unfavorably with alternative investments.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">6. Debt Service Coverage Ratio (DSCR)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        DSCR is a lender's primary tool for evaluating investment property loans:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Debt Service Coverage Ratio</p>
        <p className="text-xl font-bold text-white">DSCR = NOI ÷ Annual Debt Service</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        A DSCR of 1.0 means the property generates just enough income to cover the mortgage. Most lenders require a minimum 1.2–1.25 DSCR for investment property loans (meaning NOI must be 20–25% above the mortgage payment). Understanding DSCR helps you anticipate whether you'll qualify for financing before making an offer.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A Complete Deal Analysis Example</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-4">Example: 4-Unit Property Listed at $450,000</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-2 pb-1">Income</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Gross monthly rent (4 × $1,050)</span><span className="text-white font-medium">$4,200</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Less 6% vacancy</span><span className="text-red-400 font-medium">−$252</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Effective Gross Income (monthly)</span><span className="text-white font-medium">$3,948</span></div>
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-4 pb-1">Operating Expenses (50% Rule)</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Total operating expenses</span><span className="text-red-400 font-medium">−$2,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Monthly NOI</span><span className="text-blue-400 font-medium">$2,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Annual NOI</span><span className="text-blue-400 font-medium">$25,200</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Cap Rate ($25,200 ÷ $450,000)</span><span className="text-blue-400 font-medium">5.6%</span></div>
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-4 pb-1">Cash Flow (25% down, 7% rate, 30yr)</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Mortgage payment (P&I)</span><span className="text-red-400 font-medium">−$2,244</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Monthly cash flow</span><span className="text-red-400 font-medium">−$144</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Cash invested ($112,500 + $6,000 closing)</span><span className="text-white font-medium">$118,500</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">DSCR</span><span className="text-yellow-400 font-bold">0.94 ❌</span></div>
        </div>
        <p className="text-sm text-yellow-400 mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
          This deal doesn't pencil at the asking price and current rates. The investor should either negotiate the price down, find ways to increase rents, or pass on the deal.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Reading a Pro Forma</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A pro forma is a projected income statement prepared by the seller or listing agent. It shows expected income and expenses to demonstrate the property's earning potential. Treat seller-provided pro formas with healthy skepticism — they frequently contain optimistic assumptions.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Common ways sellers inflate pro formas:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Market rate rents instead of actual rents.</strong> The property may currently be 20% below market. Assume current rents (with a realistic path to market rate) rather than immediate market rents.</li>
        <li><strong className="text-white">Zero vacancy.</strong> Any property will experience turnover. Use 5–8% vacancy minimum.</li>
        <li><strong className="text-white">No management fee.</strong> Even if you self-manage, include it in analysis. You may not always self-manage, and it represents real economic value of your time.</li>
        <li><strong className="text-white">Minimal repair and CapEx allowances.</strong> Sellers often show $500/year for maintenance on a 40-year-old building. Use 10–15% of gross rents for repairs + CapEx combined.</li>
        <li><strong className="text-white">Cherry-picked time periods.</strong> A pro forma showing "last year's performance" during a period of 100% occupancy doesn't reflect normalized operations.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Always reconstruct the pro forma with your own conservative assumptions. Request actual tax returns (Schedule E), bank statements, and utility bills for the past 24 months.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Red Flags That Kill Deals</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Not every problem is a dealbreaker, but these red flags warrant serious scrutiny or an immediate pass:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Deferred maintenance everywhere.</strong> A leaking roof, cracked foundation, outdated electrical panel, and failing HVAC all at once signals chronic neglect — expect a massive rehab bill.</li>
        <li><strong className="text-white">Below-market rents with no clear path to market.</strong> Tenants on long-term leases far below market can be difficult or legally impossible to raise quickly depending on your jurisdiction.</li>
        <li><strong className="text-white">High tenant turnover history.</strong> Frequent turnover drives vacancy costs, cleaning expenses, and re-leasing costs. Investigate the cause — bad management, bad location, or bad tenants.</li>
        <li><strong className="text-white">Environmental issues.</strong> Flood zone designation, oil tanks, asbestos, lead paint, or mold — these carry both cost and liability.</li>
        <li><strong className="text-white">Title issues.</strong> Unpaid liens, encroachments, easement disputes — always get a title search and title insurance.</li>
        <li><strong className="text-white">Seller won't provide financials.</strong> Reluctance to share actual income and expense documentation is a major red flag. What are they hiding?</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Comparing Multiple Deals Side by Side</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        When analyzing multiple opportunities simultaneously, create a comparison spreadsheet (or use our Deal Comparison tool) that normalizes your analysis across all properties. Key columns to include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Purchase price per unit</li>
        <li>Price per square foot</li>
        <li>Gross rent multiplier (GRM = Price ÷ Annual Gross Rent)</li>
        <li>Cap rate (your conservative estimate, not seller's)</li>
        <li>Monthly cash flow</li>
        <li>Cash-on-cash return</li>
        <li>DSCR</li>
        <li>Estimated repair needs</li>
        <li>Market rent upside potential</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Seeing multiple deals on one screen reveals patterns — which markets offer better cap rates, which properties are priced efficiently, and which ones have the most upside potential. Decisions made in comparison are almost always better than decisions made on a single deal in isolation.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Your 15-Minute Analysis Checklist</h2>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Minutes 1–3:</strong> Research current market rents for comparable units. Apply a 6% vacancy rate.</li>
        <li><strong className="text-white">Minutes 4–6:</strong> Apply the 50% rule to estimate operating expenses. Calculate NOI.</li>
        <li><strong className="text-white">Minutes 7–9:</strong> Calculate cap rate. Compare to your market's typical cap rates.</li>
        <li><strong className="text-white">Minutes 10–12:</strong> Run the mortgage payment at your assumed rate and LTV. Calculate monthly cash flow.</li>
        <li><strong className="text-white">Minutes 13–14:</strong> Calculate CoC return and DSCR. Do both meet your minimum thresholds?</li>
        <li><strong className="text-white">Minute 15:</strong> Decision: pursue deeper due diligence, negotiate on price, or pass.</li>
      </ol>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La capacidad de analizar rápidamente un negocio inmobiliario es una de las habilidades más valiosas que un inversor puede desarrollar. Los inversores experimentados evalúan docenas de propiedades por cada una que compran — y lo hacen rápido. Esta guía te lleva a través de un marco sistemático de 15 minutos que separa los buenos negocios de los que hacen perder tiempo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Por Qué la Velocidad Importa en el Análisis de Negocios</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los mejores negocios se mueven rápido. En mercados competitivos, una propiedad listada el lunes puede tener múltiples ofertas el miércoles. Si necesitas dos semanas para decidir si perseguir un negocio, consistentemente perderás frente a inversores que han desarrollado el músculo mental para evaluar rápidamente y actuar decisivamente.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        El objetivo no es apresurarse — es desarrollar un proceso sistemático que te dé una respuesta confiable rápidamente. El marco de análisis de 15 minutos aquí maneja el filtro inicial. Los negocios que pasan van a un análisis más profundo con presupuestos reales de contratistas, análisis de comparables e inspecciones profesionales.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Los Números Clave: Lo que Debes Calcular</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Renta Bruta y Ajuste por Vacancia</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Comienza con la renta bruta potencial de la propiedad — lo que las unidades producirían con ocupación total. Luego aplica un margen de vacancia (típicamente 5–8% en mercados saludables) para llegar al <strong className="text-white">Ingreso Bruto Efectivo (EGI)</strong>. Investiga las rentas usando Zillow Rentals, Apartments.com, Rentometer, o llamando a administradores de propiedades locales.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Ingreso Neto Operativo (NOI)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El NOI es la métrica más fundamental en el análisis de bienes raíces comerciales y multifamiliares. Representa el poder generador de ingresos de la propiedad independientemente del financiamiento:
      </p>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-2">Ingreso Neto Operativo</p>
        <p className="text-xl font-bold text-white">NOI = Ingreso Bruto Efectivo − Todos los Gastos Operativos</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los gastos operativos incluyen: impuestos a la propiedad, seguros, administración, reparaciones y mantenimiento, servicios (si los paga el arrendador), cuotas HOA y reservas para gastos de capital. <strong className="text-white">La hipoteca NO está incluida en los cálculos de NOI.</strong>
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cuando no tienes datos reales de gastos, usa la <strong className="text-white">Regla del 50%</strong>: los gastos operativos totales tienden a igualar aproximadamente el 50% de las rentas brutas.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Tasa de Capitalización (Cap Rate)</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">Cap Rate = NOI ÷ Precio de Compra</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las tasas de capitalización te permiten comparar propiedades de diferentes precios y ubicaciones en igualdad de condiciones. Conoce las expectativas de cap rate de tu mercado antes de analizar negocios — del 4–5% en grandes ciudades, hasta el 7–9%+ en mercados secundarios.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Flujo de Caja</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">Flujo de Caja = NOI − Servicio Anual de la Deuda ÷ 12</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mayoría de los inversores apuntan a un mínimo de $100–$200 por unidad por mes en flujo de caja. Por debajo de eso, no hay suficiente margen para vacantes o reparaciones inesperadas.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">5. Retorno Cash-on-Cash (CoC)</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">CoC = Flujo de Caja Anual ÷ Total de Efectivo Invertido</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Apunta a un CoC del 8–12%+ para un alquiler sólido.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">6. Ratio de Cobertura del Servicio de la Deuda (DSCR)</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-5 mb-4 text-center">
        <p className="text-xl font-bold text-white">DSCR = NOI ÷ Servicio Anual de la Deuda</p>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Un DSCR de 1.0 significa que la propiedad genera justo lo suficiente para cubrir la hipoteca. La mayoría de los prestamistas requieren un mínimo de 1.2–1.25 DSCR para préstamos de propiedades de inversión.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ejemplo Completo de Análisis de Negocio</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-4">Ejemplo: Propiedad de 4 Unidades con Precio de $450,000</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-2 pb-1">Ingresos</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Renta mensual bruta (4 × $1,050)</span><span className="text-white font-medium">$4,200</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Menos 6% de vacancia</span><span className="text-red-400 font-medium">−$252</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Ingreso Bruto Efectivo (mensual)</span><span className="text-white font-medium">$3,948</span></div>
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-4 pb-1">Gastos Operativos (Regla del 50%)</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Gastos operativos totales</span><span className="text-red-400 font-medium">−$2,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>NOI Mensual</span><span className="text-blue-400 font-medium">$2,100</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>NOI Anual</span><span className="text-blue-400 font-medium">$25,200</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Cap Rate ($25,200 ÷ $450,000)</span><span className="text-blue-400 font-medium">5.6%</span></div>
          <div className="text-gray-500 uppercase text-xs tracking-widest pt-4 pb-1">Flujo de Caja (25% entrada, 7% tasa, 30 años)</div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Pago hipotecario (P&I)</span><span className="text-red-400 font-medium">−$2,244</span></div>
          <div className="flex justify-between border-b border-gray-700 pb-2"><span>Flujo de caja mensual</span><span className="text-red-400 font-medium">−$144</span></div>
          <div className="flex justify-between pt-2"><span className="font-semibold">DSCR</span><span className="text-yellow-400 font-bold">0.94 ❌</span></div>
        </div>
        <p className="text-sm text-yellow-400 mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
          Este negocio no funciona al precio pedido con las tasas actuales. El inversor debe negociar el precio a la baja, encontrar formas de aumentar las rentas, o pasar al siguiente negocio.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Leyendo un Pro Forma</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un pro forma es un estado de resultados proyectado preparado por el vendedor o agente de listado. Trata los pro formas proporcionados por el vendedor con escepticismo saludable — frecuentemente contienen suposiciones optimistas.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Formas comunes en que los vendedores inflan los pro formas:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Rentas de mercado en lugar de rentas reales.</strong> La propiedad puede estar actualmente un 20% por debajo del mercado.</li>
        <li><strong className="text-white">Cero vacancia.</strong> Cualquier propiedad experimentará rotación. Usa un mínimo del 5–8% de vacancia.</li>
        <li><strong className="text-white">Sin honorarios de gestión.</strong> Inclúyelos en el análisis incluso si administras tú mismo.</li>
        <li><strong className="text-white">Reservas mínimas para reparaciones y CapEx.</strong> Usa el 10–15% de las rentas brutas para reparaciones + CapEx combinados.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Siempre reconstruye el pro forma con tus propias suposiciones conservadoras. Solicita declaraciones de impuestos reales (Schedule E), extractos bancarios y facturas de servicios de los últimos 24 meses.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Señales de Alerta que Matan los Negocios</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Mantenimiento diferido en todas partes.</strong> Un techo con goteras, fundación agrietada y electricidad obsoleta señalan negligencia crónica.</li>
        <li><strong className="text-white">Rentas por debajo del mercado sin camino claro al mercado.</strong> Los inquilinos en contratos a largo plazo muy por debajo del mercado pueden ser difíciles de aumentar.</li>
        <li><strong className="text-white">Alta rotación histórica de inquilinos.</strong> Investiga la causa — mala gestión, mala ubicación o malos inquilinos.</li>
        <li><strong className="text-white">Problemas ambientales.</strong> Zona de inundación, tanques de aceite, asbesto, pintura con plomo o moho — todos conllevan costos y responsabilidades.</li>
        <li><strong className="text-white">El vendedor no proporciona estados financieros.</strong> La reluctancia a compartir documentación real de ingresos y gastos es una señal de alarma importante.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tu Lista de Verificación de Análisis en 15 Minutos</h2>
      <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-8 ml-4">
        <li><strong className="text-white">Minutos 1–3:</strong> Investiga las rentas actuales del mercado para unidades comparables. Aplica una tasa de vacancia del 6%.</li>
        <li><strong className="text-white">Minutos 4–6:</strong> Aplica la regla del 50% para estimar gastos operativos. Calcula el NOI.</li>
        <li><strong className="text-white">Minutos 7–9:</strong> Calcula el cap rate. Compara con los cap rates típicos de tu mercado.</li>
        <li><strong className="text-white">Minutos 10–12:</strong> Calcula el pago hipotecario a tu tasa y LTV asumidos. Calcula el flujo de caja mensual.</li>
        <li><strong className="text-white">Minutos 13–14:</strong> Calcula el retorno CoC y el DSCR. ¿Cumplen ambos con tus umbrales mínimos?</li>
        <li><strong className="text-white">Minuto 15:</strong> Decisión: continuar con mayor diligencia, negociar el precio, o pasar al siguiente.</li>
      </ol>
    </div>
  )
}

export function AnalyzingDeals() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="How to Analyze a Real Estate Deal in 15 Minutes"
      titleEs="Cómo Analizar un Negocio Inmobiliario en 15 Minutos"
      readTimeEn="10 min read"
      readTimeEs="10 min de lectura"
      categoryEn="Analysis"
      categoryEs="Análisis"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Analyze Your Deal Now' : 'Analiza Tu Negocio Ahora'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use the Deal Analyzer to calculate NOI, cap rate, cash flow, CoC return, and DSCR for any property in minutes.'
            : 'Usa el Analizador de Negocios para calcular el NOI, cap rate, flujo de caja, retorno CoC y DSCR de cualquier propiedad en minutos.'}
        </p>
        <Link
          to="/tools/deal_analyzer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Deal Analyzer' : 'Abrir Analizador de Negocios'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
