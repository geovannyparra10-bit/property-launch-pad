import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The refinance is where the BRRR strategy's capital-recycling power is realized. But a poorly timed or poorly structured refinance can leave your capital trapped — or worse, expose you to a loan you can't service. This lesson covers everything you need to execute the refinance confidently and set up the next deal.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Seasoning Requirement</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        "Seasoning" refers to the length of time that must pass between your acquisition and your refinance. This is one of the most misunderstood and most commonly overlooked aspects of BRRR — and getting it wrong can stall your entire strategy.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Conventional lenders (Fannie Mae/Freddie Mac guidelines) typically require:
      </p>
      <ul className="list-none text-gray-300 space-y-2 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Cash-out refinance (investment property):</span> <strong className="text-white">6 months of ownership</strong></li>
        <li><span className="text-gray-400">Rate-and-term refinance:</span> <strong className="text-white">Often no seasoning required</strong></li>
        <li><span className="text-gray-400">Title seasoning (bought at a discount):</span> <strong className="text-white">Some lenders require 6–12 months on title</strong></li>
        <li><span className="text-gray-400">Delayed financing exception:</span> <strong className="text-white">If you paid cash, you may refinance immediately</strong></li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        The delayed financing exception is important for BRRR investors who purchase with cash (all-cash acquisition, then refinance). If you close the acquisition in cash, you can potentially refinance immediately — before any seasoning period — as long as the loan amount doesn't exceed your documented all-in acquisition costs.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Always confirm seasoning requirements with your specific lender before you acquire a property. Requirements vary by lender and portfolio product. Buying with hard money? Your exit plan depends on which conventional lender you'll refinance into — confirm their seasoning policy before you pull the trigger on acquisition.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Types of Refinance Loans for BRRR</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Conventional Investment Property Loan</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The most common exit for a BRRR. A 30-year fixed conventional loan on an investment property (non-owner-occupied) at 75% LTV. You'll need a credit score of 620+ (720+ for the best rates) and cash reserves equal to 6 months of mortgage payments.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Investment property rates are typically 0.5–1.0% higher than primary residence rates. At the time of writing, that means rates in the 7.5–8.5% range for many investors. Higher rates reduce cash flow and increase the amount left in the deal — model this carefully in your BRRR calculator.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Portfolio / Non-QM Loans</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Portfolio lenders (community banks, credit unions, and private lenders) hold loans on their own books rather than selling to Fannie/Freddie. They have more flexibility on seasoning, LTV, and qualification criteria. Some portfolio lenders will lend at 70–80% of the "as-improved" value immediately after renovation without a seasoning period.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The tradeoff: portfolio loans often have higher rates, balloon payments (5–10 years), and less standardized terms. Use them strategically when conventional options don't work.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Preparing for the Appraisal</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The appraisal determines how much you can borrow in the refinance. A low appraisal traps capital; a high one returns more. You can influence the appraisal outcome:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Prepare a comp packet for the appraiser.</strong> Gather your 5–6 best comparable sales and present them professionally. Appraisers must use their independent judgment, but they appreciate well-researched data.</li>
        <li><strong className="text-white">Ensure the property looks complete.</strong> Unfinished trim, missing light fixtures, or punch-list items left undone signal an incomplete project. The appraiser will note them.</li>
        <li><strong className="text-white">Have a list of all improvements ready.</strong> Itemized updates (new kitchen, HVAC, flooring, paint, etc.) with approximate costs help the appraiser understand the scope of the work.</li>
        <li><strong className="text-white">Be present for the appraisal walk-through.</strong> You can answer questions and provide context — within ethical limits — that helps the appraiser see the property favorably.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What If the Appraisal Comes in Low?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A low appraisal is one of the most frustrating experiences in BRRR investing. Here's your playbook:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Request a reconsideration of value (ROV).</strong> Submit a formal written request with better comps. This works when the appraiser missed a recent sale or used comps that aren't truly comparable.</li>
        <li><strong className="text-white">Wait and re-appraise.</strong> If the market is appreciating, waiting 3–6 months and re-ordering the appraisal may yield a better result.</li>
        <li><strong className="text-white">Accept the partial BRRR.</strong> If the deal still cash flows and your return on the capital left in the deal is acceptable, move on. A partial BRRR that leaves $10,000–$15,000 in the deal is still often a better outcome than a traditional 20% down payment purchase.</li>
        <li><strong className="text-white">Try a different lender.</strong> Different appraisers and lenders may reach different valuations for the same property.</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Scaling: The Repeat Phase</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        After a successful refinance, you have several levers to scale your portfolio:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Leverage 1: Recycled Capital</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The capital returned from the refinance goes directly into the next deal. If you pulled out $30,000 and the next BRRR requires $32,000, you need to save just $2,000 before you're ready again. Each successful BRRR makes the next one easier to fund.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Leverage 2: Portfolio Equity Lines</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Once you have 2–3 properties with equity, many banks will offer a line of credit (HELOC or portfolio line) secured against that equity. This gives you a revolving source of acquisition capital at rates lower than hard money — dramatically accelerating your acquisition pace.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Leverage 3: Private Money Partners</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        As you build a track record, private lenders will offer to fund your deals in exchange for a fixed return (8–12% per year). Your job is to source and execute the deal; their job is to provide the capital. This allows you to run multiple BRRRs simultaneously even if you don't have enough personal capital to fund each one independently.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Common BRRR Mistakes to Avoid</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8 ml-4">
        <li><strong className="text-white">Overestimating ARV.</strong> Always use conservative comps. Optimistic ARV estimates are the #1 reason BRRR deals fail to return capital.</li>
        <li><strong className="text-white">Underestimating rehab costs.</strong> Use the Repairs Estimator, get three contractor bids, and add 10–15% contingency. First-time rehabbers almost always go over budget.</li>
        <li><strong className="text-white">Ignoring seasoning requirements.</strong> Confirm your refinance lender's policies before acquisition — not after.</li>
        <li><strong className="text-white">Accepting any appraisal result passively.</strong> Appraisers are human and make mistakes. Fight for fair value with data.</li>
        <li><strong className="text-white">Losing discipline under scaling pressure.</strong> The second and third deal are when investors get sloppy. Apply the same analysis rigor to every deal regardless of how eager you are to grow.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Course Complete: Your BRRR Roadmap</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        You now have the complete BRRR framework from deal identification through refinancing and scaling. The strategy is systematic, replicable, and proven. What it requires is execution: disciplined deal analysis, contractor management, and patience through the seasoning period.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Use the BRRR Calculator, Repairs Estimator, and ARV Comps Analyzer on every deal. Let the tools do the heavy lifting on the math so you can focus your energy on finding deals, building relationships, and executing renovations. The first BRRR is the hardest. After that, the cycle runs itself.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        El refinanciamiento es donde se realiza el poder de reciclaje de capital de la estrategia BRRR. Pero un refinanciamiento mal programado puede dejar tu capital atrapado o exponerte a un préstamo que no puedes pagar.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Requisito de Maduración (Seasoning)</h2>
      <ul className="list-none text-gray-300 space-y-2 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Refinanciamiento con extracción de efectivo (propiedad de inversión):</span> <strong className="text-white">6 meses de propiedad</strong></li>
        <li><span className="text-gray-400">Excepción de financiamiento diferido (compra en efectivo):</span> <strong className="text-white">Puede refinanciar inmediatamente</strong></li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Siempre confirma los requisitos de maduración con tu prestamista específico antes de adquirir una propiedad. Los requisitos varían según el prestamista.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Preparándose para la Tasación</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Prepara un paquete de comparables para el tasador</li>
        <li>Asegúrate de que la propiedad luzca completa</li>
        <li>Ten una lista de todas las mejoras listas</li>
        <li>Está presente durante el recorrido de tasación</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Escalando: La Fase de Repetición</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Después de un refinanciamiento exitoso, tienes varios mecanismos para escalar tu cartera: capital reciclado del refinanciamiento para el próximo negocio, líneas de crédito de cartera garantizadas por el capital existente, y socios de dinero privado que financian negocios a cambio de un rendimiento fijo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Errores Comunes de BRRR a Evitar</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Sobreestimar el ARV</li>
        <li>Subestimar los costos de rehabilitación</li>
        <li>Ignorar los requisitos de maduración</li>
        <li>Aceptar pasivamente el resultado de cualquier tasación</li>
        <li>Perder disciplina bajo la presión de escalar</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Curso Completo: Tu Hoja de Ruta BRRR</h2>
      <p className="text-gray-300 leading-relaxed">
        Ahora tienes el marco BRRR completo desde la identificación del negocio hasta el refinanciamiento y la escala. Usa la Calculadora BRRR, el Estimador de Reparaciones y el Analizador de Comps ARV en cada negocio. ¡Felicidades por completar el Plan BRRR!
      </p>
    </div>
  )
}

export function BRLesson5() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
