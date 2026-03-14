import { Link } from 'react-router-dom'
import { Wrench, ChartBar as BarChart3 } from 'lucide-react'
import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Two numbers determine whether a BRRR deal works: how much the rehab costs and what the property will be worth after it's complete (the ARV). Get these right and you build equity. Get them wrong and you either leave money on the table or — worse — trap your capital in a deal you can't get out of.
      </p>

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6 text-blue-400 flex-shrink-0" />
            <p className="text-white font-semibold">Repairs Estimator</p>
          </div>
          <p className="text-gray-400 text-sm">Build a detailed scope of work with cost estimates by category.</p>
          <Link
            to="/tools/repairs_estimator"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors text-center"
          >
            Open Repairs Estimator
          </Link>
        </div>
        <div className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-400 flex-shrink-0" />
            <p className="text-white font-semibold">ARV Comps Analyzer</p>
          </div>
          <p className="text-gray-400 text-sm">Analyze comparable sales to determine post-renovation value.</p>
          <Link
            to="/tools/arv_comps"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors text-center"
          >
            Open ARV Comps Analyzer
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estimating Rehab Costs: The Walk-Through Process</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Never estimate rehab costs from photos or a drive-by. You need to walk every square foot of the property before submitting an offer. Bring a notebook, a flashlight, and a healthy skepticism. Sellers and listing agents are incentivized to minimize the appearance of problems.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">The Walk-Through Checklist</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Evaluate each system and area using the following framework:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li><strong className="text-white">Roof:</strong> Age, condition, visible damage from the attic. Replacement cost: $8,000–$20,000+ depending on size and material.</li>
        <li><strong className="text-white">HVAC:</strong> Age of unit, condition, last service date. Replacement: $4,000–$12,000 per system.</li>
        <li><strong className="text-white">Plumbing:</strong> Check under every sink, run every faucet, flush every toilet. Look for galvanized or polybutylene pipes (both need replacing). Repiping: $4,000–$15,000.</li>
        <li><strong className="text-white">Electrical:</strong> Age and condition of panel. Knob-and-tube wiring is a red flag (and often uninsurable). Panel upgrade: $2,000–$5,000. Full rewire: $8,000–$20,000.</li>
        <li><strong className="text-white">Foundation:</strong> Look for cracks, water intrusion, uneven floors. Foundation issues can be $5,000–$50,000+ to repair.</li>
        <li><strong className="text-white">Kitchen:</strong> Cabinet condition, counter surfaces, appliances, layout. Full cosmetic update: $8,000–$20,000.</li>
        <li><strong className="text-white">Bathrooms:</strong> Tile condition, fixtures, water damage under sinks and around toilet base. Update per bath: $3,000–$8,000.</li>
        <li><strong className="text-white">Flooring:</strong> Type, condition, subfloor integrity. LVP replacement: $3–$6/sqft installed.</li>
        <li><strong className="text-white">Windows/doors:</strong> Condition, single vs. double pane, seal integrity. Window replacement: $200–$600 each.</li>
        <li><strong className="text-white">Exterior:</strong> Siding, paint, gutters, grading, drainage. Varies widely.</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Building Your Scope of Work</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A scope of work (SOW) is a written, itemized list of every repair and improvement needed, along with estimated costs. This document has multiple purposes: it's the basis for contractor bids, it's what your lender's appraiser references when doing a "subject to" appraisal, and it keeps your renovation on track.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Use the Repairs Estimator to build your SOW systematically. Input each item by category and let the tool help you build a realistic total. Always add a 10–15% contingency on top of your estimate — surprises are guaranteed in any rehab.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Determining ARV: The Comparable Sales Method</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        ARV is what the property will be worth when fully renovated — not what it's worth today. To estimate ARV, you analyze recent comparable sales ("comps") of similar properties in the same neighborhood that are already in move-in-ready condition.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Finding Good Comps</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A good comp is a property that is:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Within <strong className="text-white">0.25–0.5 miles</strong> of your subject property (closer is better)</li>
        <li>Sold within the last <strong className="text-white">3–6 months</strong> (older sales carry less weight in changing markets)</li>
        <li>Similar in <strong className="text-white">size</strong> (within 10–15% square footage)</li>
        <li>Similar in <strong className="text-white">bed/bath count</strong></li>
        <li>In <strong className="text-white">updated/renovated condition</strong> (not distressed)</li>
        <li>Same <strong className="text-white">property type</strong> (single-family vs. condo vs. multifamily)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Appraisers typically want to see at least 3 good comps. If you can find 5–6, you can build a strong, defensible ARV estimate.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Adjusting for Differences</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        No two properties are identical. Appraisers make adjustments for differences between the comp and the subject property: a comp with a garage gets adjusted down if your property lacks one; a comp with an extra bathroom gets a downward adjustment, etc.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        For BRRR purposes, be conservative with your ARV. If your comps indicate a range of $175,000–$195,000, use $175,000–$180,000 as your working ARV. If the appraisal comes in higher, great. If it comes in lower than your conservative estimate, you're in trouble.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Use the ARV Comps Analyzer to organize and average your comps, apply adjustments, and arrive at a defensible ARV number before you make an offer.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Pre-Offer Analysis</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before submitting any offer on a BRRR deal, you should have:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Completed a physical walk-through of the property</li>
        <li>Built a detailed scope of work with cost estimates</li>
        <li>Analyzed at least 3–5 comparables and established a conservative ARV</li>
        <li>Run the deal through the 70% rule and your BRRR calculator</li>
        <li>Confirmed the projected rental income supports your cash flow requirements after the refinance</li>
      </ol>
      <p className="text-gray-300 leading-relaxed">
        Investors who skip these steps and rely on optimistic projections are the ones who get stuck with deals that won't refinance. Do the work before the offer, not after.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Dos números determinan si un negocio BRRR funciona: cuánto cuesta la rehabilitación y cuánto valdrá la propiedad después de completarla (el ARV). Acertar en estos te construye capital. Equivocarte puede atrapar tu capital en un negocio del que no puedes salir.
      </p>

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6 text-blue-400 flex-shrink-0" />
            <p className="text-white font-semibold">Estimador de Reparaciones</p>
          </div>
          <p className="text-gray-400 text-sm">Construye un alcance de trabajo detallado con estimaciones de costos por categoría.</p>
          <Link
            to="/tools/repairs_estimator"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors text-center"
          >
            Abrir Estimador
          </Link>
        </div>
        <div className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-400 flex-shrink-0" />
            <p className="text-white font-semibold">Analizador de Comps ARV</p>
          </div>
          <p className="text-gray-400 text-sm">Analiza ventas comparables para determinar el valor post-renovación.</p>
          <Link
            to="/tools/arv_comps"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors text-center"
          >
            Abrir Analizador
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Estimando Costos de Rehabilitación</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nunca estimes costos de rehabilitación desde fotos o desde el carro. Necesitas recorrer cada metro cuadrado de la propiedad antes de presentar una oferta. Usa el Estimador de Reparaciones para construir tu alcance de trabajo sistemáticamente. Siempre agrega un 10–15% de contingencia encima de tu estimación.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Determinando el ARV: El Método de Ventas Comparables</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El ARV es lo que valdrá la propiedad una vez totalmente renovada. Para estimarlo, analizas ventas recientes comparables de propiedades similares en el mismo vecindario que ya estén en condición lista para mudarse. Un buen comparable está a menos de 0.5 millas, se vendió en los últimos 3–6 meses, es similar en tamaño y número de habitaciones/baños, y está en condición actualizada.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Para propósitos BRRR, sé conservador con tu ARV. Usa el Analizador de Comps ARV para organizar y promediar tus comparables.
      </p>
      <p className="text-gray-300 leading-relaxed">
        En la próxima lección, ejecutarás los números de tu negocio BRRR paso a paso utilizando la Calculadora BRRR con un ejemplo de negocio real.
      </p>
    </div>
  )
}

export function BRLesson3() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
