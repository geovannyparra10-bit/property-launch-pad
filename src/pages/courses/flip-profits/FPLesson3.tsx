import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { Wrench } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Rehab cost estimation is where most beginner flippers get hurt. Underestimate by $20,000 and your profit evaporates. Overestimate and you'll walk away from profitable deals. This lesson walks you through a systematic approach to estimating rehab costs, introduces you to the Repairs Estimator tool, and covers the contractor management tactics that protect your budget.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Walkthrough Method: Room by Room</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Never estimate a rehab from photos. You must physically walk the property with a notepad (or your phone) and evaluate every major system and surface. Move through the property systematically:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Exterior:</strong> Roof condition, siding, gutters, foundation, grading, driveway, landscaping</li>
        <li><strong className="text-white">HVAC:</strong> Age and condition of furnace, A/C, water heater. Old systems should be budgeted for replacement.</li>
        <li><strong className="text-white">Electrical:</strong> Panel age and amperage, visible wiring type, outlet condition, smoke detectors</li>
        <li><strong className="text-white">Plumbing:</strong> Pipe material (copper vs. galvanized vs. PVC), water pressure, visible leaks, drain condition</li>
        <li><strong className="text-white">Kitchen:</strong> Cabinet condition, countertops, appliances, flooring, backsplash</li>
        <li><strong className="text-white">Bathrooms:</strong> Tile condition, fixtures, vanity, toilet, shower/tub</li>
        <li><strong className="text-white">Flooring:</strong> Type and condition throughout — hardwood refinish vs. replace, carpet remove and replace</li>
        <li><strong className="text-white">Walls and ceilings:</strong> Drywall condition, texture, paint — note any water stains (potential roof or plumbing issues)</li>
        <li><strong className="text-white">Windows and doors:</strong> Single vs. double pane, condition, hardware</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Take photos of every room and every issue. Document as much as possible — you'll reference these when getting contractor bids and when reconciling invoices later.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use the Repairs Estimator</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Once you've completed your walkthrough, use the Repairs Estimator to build a detailed cost breakdown. The tool lets you itemize each repair category with quantity and unit cost — giving you a total project budget and a line-by-line scope of work you can use when getting contractor bids.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Wrench className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Repairs Estimator</p>
            <p className="text-gray-400 text-xs mt-0.5">Build a line-by-line rehab budget from your walkthrough notes</p>
          </div>
        </div>
        <Link
          to="/tools/repairs_estimator"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Common Rehab Cost Benchmarks</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        These are rough national averages — your market may vary by 20–40% in either direction. Use them for initial estimates only; always get real bids before committing to a purchase price.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Rough Cost Benchmarks</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Roof replacement (2,000 sqft)</span><span>$8,000 – $15,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>HVAC system replacement</span><span>$5,000 – $12,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Kitchen remodel (cosmetic)</span><span>$10,000 – $25,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Bathroom remodel (per bath)</span><span>$5,000 – $15,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>LVP flooring (per sqft installed)</span><span>$3 – $6</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Interior paint (full house)</span><span>$2,500 – $6,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Electrical panel upgrade</span><span>$2,000 – $5,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Water heater replacement</span><span>$800 – $2,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Windows (per window)</span><span>$400 – $800</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contractor Tips: Protecting Your Budget</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Your rehab budget is only as good as your contractor relationships and management. These are the tactics experienced flippers use to stay on budget:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Get Three Bids on Everything</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Never accept the first bid. Get at least three bids for any scope of work over $3,000. The spread between high and low bids is often 30–50%. The goal isn't always the lowest bid — it's the most credible bid from a contractor you trust to finish on time and on budget.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Detailed Scope of Work in Writing</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Never give a contractor a verbal description and accept a lump-sum price. Your contract should list every material, finish level, brand (where applicable), and deliverable. Vague scopes lead to "that's extra" disputes halfway through the job.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Draw Schedules, Not Upfront Payments</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Pay contractors in draws tied to milestones, not upfront. A common structure: 10% to mobilize, 40% at rough-in completion, 40% at substantial completion, 10% at punch list sign-off. Never pay more than 50% of the total before work begins.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Always Include a Contingency</h3>
      <p className="text-gray-300 leading-relaxed">
        Build a 10–15% contingency into every budget. Not every rehab hits surprises, but enough do that you need the buffer. If you don't use it, it's profit. If you need it, you're protected. Never calculate your deal numbers without it.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La estimación de costos de rehabilitación es donde la mayoría de los flippers principiantes sufren. Subestimar por $20,000 hace que tu ganancia desaparezca. Esta lección te guía a través de un enfoque sistemático para estimar los costos de rehabilitación y cubre las tácticas de gestión de contratistas que protegen tu presupuesto.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Método de Recorrido: Habitación por Habitación</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nunca estimes una rehabilitación desde fotos. Debes caminar físicamente por la propiedad evaluando cada sistema y superficie importantes:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Exterior:</strong> Condición del techo, revestimiento, canalones, cimientos, entrada</li>
        <li><strong className="text-white">HVAC:</strong> Edad y condición del calentador, A/C, calentador de agua</li>
        <li><strong className="text-white">Eléctrico:</strong> Edad del panel, tipo de cableado visible</li>
        <li><strong className="text-white">Plomería:</strong> Material de las tuberías, presión del agua, fugas visibles</li>
        <li><strong className="text-white">Cocina:</strong> Condición de gabinetes, encimeras, electrodomésticos, pisos</li>
        <li><strong className="text-white">Baños:</strong> Condición de azulejos, accesorios, vanidad</li>
        <li><strong className="text-white">Pisos:</strong> Tipo y condición en toda la casa</li>
        <li><strong className="text-white">Paredes y techos:</strong> Condición del drywall, manchas de agua</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa el Estimador de Reparaciones</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una vez que hayas completado tu recorrido, usa el Estimador de Reparaciones para construir un desglose detallado de costos. La herramienta te permite detallar cada categoría de reparación con cantidad y costo unitario.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Wrench className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Estimador de Reparaciones</p>
            <p className="text-gray-400 text-xs mt-0.5">Construye un presupuesto de rehabilitación detallado a partir de tus notas de recorrido</p>
          </div>
        </div>
        <Link
          to="/tools/repairs_estimator"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Puntos de Referencia de Costos de Rehabilitación</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Referencias de Costos Aproximados</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Reemplazo de techo (2,000 sqft)</span><span>$8,000 – $15,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Reemplazo de sistema HVAC</span><span>$5,000 – $12,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Remodelación de cocina (cosmética)</span><span>$10,000 – $25,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Remodelación de baño (por baño)</span><span>$5,000 – $15,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Piso LVP (por sqft instalado)</span><span>$3 – $6</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Pintura interior (casa completa)</span><span>$2,500 – $6,000</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Consejos para Contratistas: Protegiendo tu Presupuesto</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Obtén Tres Cotizaciones para Todo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nunca aceptes la primera cotización. Obtén al menos tres cotizaciones para cualquier alcance de trabajo superior a $3,000. La diferencia entre cotizaciones altas y bajas suele ser del 30–50%.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Alcance de Trabajo Detallado por Escrito</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nunca des a un contratista una descripción verbal. Tu contrato debe listar cada material, nivel de acabado y entregable. Los alcances vagos llevan a disputas de "eso es extra" a mitad del trabajo.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Calendario de Pagos por Hitos, No Pagos por Adelantado</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Paga a los contratistas en pagos parciales vinculados a hitos. Una estructura común: 10% para movilizarse, 40% al completar el trabajo grueso, 40% al completar sustancialmente, 10% al cierre.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Siempre Incluye una Contingencia</h3>
      <p className="text-gray-300 leading-relaxed">
        Incluye un 10–15% de contingencia en cada presupuesto. Si no lo usas, es ganancia. Si lo necesitas, estás protegido.
      </p>
    </div>
  )
}

export function FPLesson3() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
