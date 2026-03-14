import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Flipping houses — buying a distressed property, renovating it, and selling it for a profit — is one of the most visible real estate strategies. It's exciting, it's fast-paced, and it can generate significant returns. But it's also one of the most demanding strategies, and it's not right for every investor. Before you write a single offer, you need to be honest about three things: your capital, your time, and your risk tolerance.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Capital Requirements: More Than You Think</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Flipping is a capital-intensive strategy. Unlike rental investing where you might put 20–25% down and let tenants service the debt over 30 years, flipping requires you to fund both the acquisition and the renovation — often simultaneously — and then hold those costs until the property sells.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Here's a realistic capital breakdown for a modest flip:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Example Capital Requirements</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Purchase price</span><span>$120,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Down payment (hard money, 20%)</span><span>$24,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Rehab budget</span><span>$35,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Carrying costs (6 months)</span><span>$8,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Closing costs (buy + sell)</span><span>$9,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Contingency (10%)</span><span>$3,500</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Minimum liquid capital needed</span><span className="text-amber-400">~$79,500</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        That $79,500 is tied up and unavailable until the property sells. If the sale takes longer than expected, or if you hit a major surprise during demo (and you often will), you need reserves beyond that. The general rule: have at least 10–20% more capital accessible than your projected costs.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Time Commitment: It's a Part-Time Job at Minimum</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A flip is not a passive investment. From acquisition to sale, you'll be actively involved in:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Deal sourcing and analysis (ongoing)</li>
        <li>Contractor interviews, bidding, and selection</li>
        <li>Daily or weekly site visits to manage the rehab</li>
        <li>Purchasing materials, making design decisions</li>
        <li>Coordinating inspections, permits, and utilities</li>
        <li>Managing the listing, showings, and sale</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        A typical flip takes 4–8 months from purchase to close of sale. During that time, expect to spend 10–20 hours per week on the project if you're self-managing. If you're using a general contractor to manage the rehab, it drops significantly — but your margin does too.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Investors who underestimate time commitment either burn out, let the project drift (costing money in extended carrying costs), or make poor decisions under pressure. Be realistic about what your schedule can absorb before you commit.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Risk Tolerance: Every Flip Has Surprises</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Flipping has a higher variance of outcomes than long-term rental investing. A rental property with a good tenant is predictable month to month. A flip has dozens of variables that can shift your profit dramatically:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Market timing risk:</strong> You buy in a seller's market; by the time you finish, it's a buyer's market.</li>
        <li><strong className="text-white">Scope creep:</strong> You open a wall and find knob-and-tube wiring, mold, or structural issues.</li>
        <li><strong className="text-white">Contractor risk:</strong> A contractor abandons the job, does substandard work, or over-bills.</li>
        <li><strong className="text-white">Timeline risk:</strong> Permits take longer than expected; carrying costs eat your margin.</li>
        <li><strong className="text-white">Appraisal risk:</strong> Your ARV estimate was optimistic; the property appraises lower than expected.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        None of these risks are reasons not to flip — they're reasons to plan carefully, build in contingency, and only do deals where your numbers are conservative. A flip where you penciled in $30,000 profit should still be viable at $15,000. If a deal only works at maximum projected values, it's too tight.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Who Flipping Is Right For</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Flipping tends to work well for investors who:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Have access to $75,000+ in liquid capital (or strong private/hard money relationships)</li>
        <li>Can dedicate meaningful time to project management</li>
        <li>Have construction knowledge or can partner with someone who does</li>
        <li>Prefer short-term, high-activity projects over long-term passive income</li>
        <li>Can tolerate uncertainty and make quick decisions under pressure</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        If that profile sounds like you, the next lesson will show you exactly where to find flip deals and how to screen them quickly using the 70% rule.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Hacer flips de casas — comprar una propiedad en mal estado, renovarla y venderla con ganancias — es una de las estrategias inmobiliarias más visibles. Puede generar retornos significativos, pero también es una de las más exigentes. Antes de hacer una oferta, debes ser honesto sobre tres cosas: tu capital, tu tiempo y tu tolerancia al riesgo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Requisitos de Capital: Más de lo que Crees</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El flipping es una estrategia intensiva en capital. Necesitas financiar tanto la adquisición como la renovación, y mantener esos costos hasta que la propiedad se venda.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Ejemplo de Requisitos de Capital</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Precio de compra</span><span>$120,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Enganche (dinero duro, 20%)</span><span>$24,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Presupuesto de rehabilitación</span><span>$35,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costos de mantenimiento (6 meses)</span><span>$8,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costos de cierre (compra + venta)</span><span>$9,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Contingencia (10%)</span><span>$3,500</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Capital líquido mínimo necesario</span><span className="text-amber-400">~$79,500</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Esos $79,500 están inmovilizados hasta que la propiedad se venda. La regla general: ten al menos un 10–20% más de capital accesible que tus costos proyectados.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Compromiso de Tiempo: Como Mínimo, un Trabajo de Medio Tiempo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un flip no es una inversión pasiva. Durante un flip típico de 4–8 meses, espera dedicar 10–20 horas por semana si lo gestionas tú mismo: buscar negocios, gestionar contratistas, tomar decisiones de diseño, coordinar inspecciones y permisos, y gestionar la venta.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tolerancia al Riesgo: Todo Flip Tiene Sorpresas</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El flipping tiene mayor varianza de resultados que el alquiler a largo plazo. Los riesgos incluyen:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Riesgo de mercado:</strong> El mercado cambia mientras terminas la renovación.</li>
        <li><strong className="text-white">Alcance ampliado:</strong> Abres una pared y encuentras problemas ocultos costosos.</li>
        <li><strong className="text-white">Riesgo de contratistas:</strong> Un contratista abandona el trabajo o hace trabajo de baja calidad.</li>
        <li><strong className="text-white">Riesgo de tiempo:</strong> Los permisos se retrasan; los costos de mantenimiento reducen tu margen.</li>
        <li><strong className="text-white">Riesgo de tasación:</strong> Tu estimación de ARV fue optimista.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Solo haz negocios donde tus números son conservadores. Un flip donde proyectaste $30,000 de ganancia debe seguir siendo viable a $15,000.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Para Quién es Adecuado el Flipping</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El flipping tiende a funcionar bien para inversores que:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Tienen acceso a $75,000+ en capital líquido</li>
        <li>Pueden dedicar tiempo significativo a la gestión de proyectos</li>
        <li>Tienen conocimiento de construcción o pueden asociarse con alguien que lo tiene</li>
        <li>Prefieren proyectos de corto plazo y alta actividad sobre ingresos pasivos a largo plazo</li>
        <li>Pueden tolerar la incertidumbre y tomar decisiones rápidas bajo presión</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Si ese perfil suena como tú, la siguiente lección te mostrará exactamente dónde encontrar negocios de flip usando la regla del 70%.
      </p>
    </div>
  )
}

export function FPLesson1() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
