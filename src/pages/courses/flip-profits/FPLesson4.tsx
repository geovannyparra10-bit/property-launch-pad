import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { Calculator } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The difference between a profitable flip and a losing one often comes down to how carefully you ran the numbers before you bought. This lesson walks you through every cost and revenue variable in a flip analysis, then shows you how to use the Flip Calculator to model a complete deal with real numbers.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Full Cost Stack of a Flip</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most beginners only think about purchase price and rehab. Profitable flippers account for every line item:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Acquisition Costs</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Purchase price</li>
        <li>Closing costs (title, escrow, recording fees): typically 1–2% of purchase price</li>
        <li>Inspection fees ($300–$600)</li>
        <li>Hard money origination points (1–3% of loan amount)</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Rehab Costs</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Total contractor labor and materials (from your Repairs Estimator)</li>
        <li>Permit fees (varies widely by municipality)</li>
        <li>10–15% contingency</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Carrying Costs (Monthly × Months Held)</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Hard money interest (typically 10–14% annually on the loan balance)</li>
        <li>Property taxes (monthly proration)</li>
        <li>Insurance (builder's risk or vacant property policy)</li>
        <li>Utilities (if kept on during rehab)</li>
        <li>HOA fees (if applicable)</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Selling Costs</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Agent commissions: typically 5–6% of sale price (buyer's and seller's agents combined)</li>
        <li>Seller closing costs: 1–2% of sale price</li>
        <li>Staging costs ($1,000–$5,000)</li>
        <li>Seller concessions (buyer may request repairs or credits)</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step-by-Step Example Deal</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Let's model a complete flip. A 3/2 ranch home in a neighborhood where renovated comps sell for $280,000 (ARV). The property needs a full cosmetic rehab and HVAC replacement.
      </p>

      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-2">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Step 1: Determine Maximum Purchase Price (70% Rule)</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>ARV</span><span>$280,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Estimated rehab</span><span>$52,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>70% of ARV</span><span>$196,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-semibold"><span>Max purchase price</span><span>$144,000</span></div>
      </div>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-2 mt-3">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Step 2: Total All-In Cost</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Purchase price (negotiated)</span><span>$138,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Buy-side closing costs (1.5%)</span><span>$2,070</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Hard money origination (2 pts)</span><span>$2,760</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Rehab (including 12% contingency)</span><span>$58,240</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Carrying costs (5 months × $1,600)</span><span>$8,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-semibold"><span>Total all-in cost</span><span>$209,070</span></div>
      </div>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6 mt-3">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Step 3: Net Profit</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Sale price (ARV)</span><span>$280,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Agent commissions (5.5%)</span><span>− $15,400</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Sell-side closing costs (1.5%)</span><span>− $4,200</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Staging</span><span>− $2,500</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Net proceeds</span><span>$257,900</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Total all-in cost</span><span>− $209,070</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Net profit</span><span className="text-green-400">$48,830</span></div>
        <div className="flex justify-between text-gray-400 text-sm"><span>Return on investment</span><span>~23%</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use the Flip Calculator</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The Flip Calculator lets you input all of these variables and instantly model your net profit, ROI, and return on equity. Use it on every potential deal before you make an offer. Try adjusting the sale price down by 5–10% to stress-test your numbers — does the deal still work?
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Flip Calculator</p>
            <p className="text-gray-400 text-xs mt-0.5">Model your complete flip deal with all costs and profit scenarios</p>
          </div>
        </div>
        <Link
          to="/tools/flip"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Minimum Profit Thresholds</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        What's a good profit on a flip? It depends on your market and risk tolerance, but most experienced investors use these benchmarks:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Minimum net profit:</strong> $25,000–$30,000. Smaller deals aren't worth the risk and effort.</li>
        <li><strong className="text-white">Minimum ROI:</strong> 15–20% on total invested capital. Below this, other strategies outperform flipping on a risk-adjusted basis.</li>
        <li><strong className="text-white">Stress test at 90% of ARV:</strong> If the deal requires full ARV to be profitable, it's too thin. Markets soften; buyers negotiate.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Run your numbers conservatively, then run them again with pessimistic assumptions. If the deal still pencils at lower sale prices and higher costs, you've found something worth pursuing. In the final lesson, you'll learn how to manage the execution to protect those numbers.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La diferencia entre un flip rentable y uno perdedor a menudo se reduce a qué tan cuidadosamente analizaste los números antes de comprar. Esta lección te guía a través de cada variable de costo e ingresos en un análisis de flip, luego te muestra cómo usar la Calculadora de Flip para modelar un negocio completo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Pila de Costos Completa de un Flip</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Costos de Adquisición</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Precio de compra</li>
        <li>Costos de cierre (título, fideicomiso, tarifas de registro): típicamente 1–2%</li>
        <li>Tarifas de inspección ($300–$600)</li>
        <li>Puntos de originación de dinero duro (1–3% del monto del préstamo)</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Costos de Rehabilitación</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Mano de obra y materiales totales del contratista</li>
        <li>Tarifas de permisos</li>
        <li>Contingencia del 10–15%</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Costos de Mantenimiento (Mensual × Meses de Tenencia)</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Intereses de dinero duro (típicamente 10–14% anual)</li>
        <li>Impuestos a la propiedad (prorrateo mensual)</li>
        <li>Seguro (póliza de riesgo del constructor)</li>
        <li>Servicios públicos</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Costos de Venta</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Comisiones de agentes: típicamente 5–6% del precio de venta</li>
        <li>Costos de cierre del vendedor: 1–2%</li>
        <li>Costos de staging ($1,000–$5,000)</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ejemplo de Negocio Paso a Paso</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Resumen del Negocio</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>ARV</span><span>$280,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Precio de compra</span><span>$138,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Rehabilitación + contingencia</span><span>$58,240</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costos de mantenimiento (5 meses)</span><span>$8,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costo total</span><span>$209,070</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Ingresos netos de venta</span><span>$257,900</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Ganancia neta</span><span className="text-green-400">$48,830</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa la Calculadora de Flip</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La Calculadora de Flip te permite ingresar todas estas variables y modelar instantáneamente tu ganancia neta, ROI y retorno sobre el capital. Úsala en cada negocio potencial antes de hacer una oferta.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Calculadora de Flip</p>
            <p className="text-gray-400 text-xs mt-0.5">Modela tu negocio de flip completo con todos los costos y escenarios de ganancia</p>
          </div>
        </div>
        <Link
          to="/tools/flip"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Umbrales Mínimos de Ganancia</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Ganancia neta mínima:</strong> $25,000–$30,000.</li>
        <li><strong className="text-white">ROI mínimo:</strong> 15–20% sobre el capital total invertido.</li>
        <li><strong className="text-white">Prueba de estrés al 90% del ARV:</strong> Si el negocio requiere el ARV completo para ser rentable, es demasiado ajustado.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Calcula tus números de forma conservadora, luego con suposiciones pesimistas. En la lección final, aprenderás cómo gestionar la ejecución para proteger esas ganancias.
      </p>
    </div>
  )
}

export function FPLesson4() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
