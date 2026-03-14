import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        The BRRR strategy — Buy, Rehab, Rent, Refinance, Repeat — is the engine that has allowed thousands of investors to scale from one property to ten without proportionally growing their cash outlay. It's not magic, and it's not always easy. But when executed correctly, it's one of the most capital-efficient strategies in real estate. This lesson explains exactly how it works.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Core Idea: Recycled Capital</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Traditional real estate investing is capital-intensive. You buy a property, put 20–25% down, and that equity is "locked in." To buy the next property, you need another 20–25% down. Your pace of acquisition is limited by how fast you can save new capital.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        BRRR breaks this constraint. Instead of leaving your equity locked in the property, you force-appreciate it through renovation, achieve a higher appraised value, and then pull most or all of your original capital back out through a cash-out refinance. You now have the same property producing rental income AND your original capital back to deploy in the next deal.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Done well, a BRRR investor might only have $5,000–$10,000 of their own money permanently left in each deal — sometimes nothing at all. That's why skilled BRRR investors can acquire 5–10 properties in the same time it takes a traditional investor to acquire 2.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: BUY — Acquiring Below Market Value</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The BRRR cycle begins with buying right. You must acquire the property significantly below its post-renovation value (ARV — After Repair Value). The gap between your purchase price, rehab cost, and the ARV is where your profit (and recycled capital) lives.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        A classic BRRR acquisition target is a distressed property — one that needs cosmetic or moderate structural work that the typical retail buyer won't touch. These properties sit on the market, their sellers become motivated, and patient investors with cash or hard money financing can acquire them at a meaningful discount.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The 70% rule is a useful quick screen: don't pay more than 70% of ARV minus estimated rehab costs. So if a property has an ARV of $200,000 and needs $30,000 in repairs, your maximum purchase price is: (0.70 × $200,000) – $30,000 = <strong className="text-white">$110,000</strong>.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: REHAB — Creating Value Through Renovation</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The rehab phase is where equity is created. Unlike a speculative investment where you hope the market rises, a BRRR investor actively manufactures equity by improving the property.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Effective BRRR rehabs focus on changes that increase appraised value and justify higher rents — not cosmetic improvements that feel good but don't move the needle. The highest-ROI renovations in most markets:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Kitchen updates (new countertops, cabinets, appliances)</li>
        <li>Bathroom modernization (new fixtures, tile, vanity)</li>
        <li>Flooring replacement (LVP throughout is the investor standard)</li>
        <li>Fresh neutral paint throughout</li>
        <li>Updated electrical panel and plumbing (often required for financing)</li>
        <li>HVAC replacement (if needed — large value driver on appraisal)</li>
        <li>Curb appeal improvements (landscaping, exterior paint, new front door)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Managing rehabs effectively requires accurate cost estimation upfront and tight contractor management throughout. You'll learn the tools for this in Lesson 3.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: RENT — Stabilizing the Asset</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Once the rehab is complete, you place a qualified tenant at market rent. This stabilization step is critical for two reasons:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Rental income offsets your carrying costs (mortgage, taxes, insurance) during the seasoning period.</li>
        <li>Lenders require a stabilized, rent-producing asset for the refinance. Many lenders want to see a tenant in place for 3–6 months before they'll consider a cash-out refinance.</li>
      </ol>
      <p className="text-gray-300 leading-relaxed mb-8">
        Screen tenants carefully. A bad tenant placed in a hurry to meet a refinance timeline can cause far more damage than a few weeks of additional vacancy.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: REFINANCE — Pulling Your Capital Out</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is the step that makes BRRR work. After renovation and stabilization, the property is appraised at its new, higher value. You then take out a long-term conventional loan (typically 30-year fixed at 75–80% LTV) based on that new appraised value.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The refinance proceeds pay off your acquisition loan (hard money or private money) and return your cash to you. A perfect BRRR leaves you with $0 out of pocket — you've pulled out exactly what you put in.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Example BRRR Deal</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Purchase price</span><span>$95,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Rehab cost</span><span>$35,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>All-in cost</span><span>$130,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>ARV (after renovation)</span><span>$185,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Refinance at 75% LTV</span><span>$138,750</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Cash returned to investor</span><span className="text-green-400">$138,750 – $130,000 = +$8,750</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        In this example, not only did the investor pull out all of their initial capital, they actually received <strong className="text-white">$8,750 more than they put in</strong> — while still owning the property, earning rental income, and building long-term equity.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: REPEAT — Scaling the Machine</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        With your capital back in hand, you deploy it into the next deal. If the first BRRR took 6 months from acquisition to refinance completion, you could theoretically do 2 deals per year with the same pool of capital. With multiple sources of capital and a reliable team, sophisticated investors run multiple BRRRs simultaneously.
      </p>
      <p className="text-gray-300 leading-relaxed">
        The compounding effect is what separates BRRR investors from traditional buy-and-hold investors. Each deal builds equity, generates cash flow, and returns capital — simultaneously. In the next lesson, you'll learn how to find the distressed properties that make BRRR deals possible.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La estrategia BRRR — Comprar, Rehabilitar, Rentar, Refinanciar, Repetir — es el motor que ha permitido a miles de inversores escalar de una propiedad a diez sin aumentar proporcionalmente su desembolso de capital. En esta lección se explica exactamente cómo funciona.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Idea Central: Capital Reciclado</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La inversión inmobiliaria tradicional requiere mucho capital. Con BRRR, en lugar de dejar tu capital bloqueado en la propiedad, lo aprecias forzosamente mediante renovación y luego recuperas la mayor parte o la totalidad de tu capital original a través de un refinanciamiento con extracción de efectivo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 1: COMPRAR — Adquirir por Debajo del Valor de Mercado</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Debes adquirir la propiedad significativamente por debajo de su valor post-renovación (ARV). La regla del 70%: no pagues más del 70% del ARV menos los costos de reparación estimados. Si una propiedad tiene un ARV de $200,000 y necesita $30,000 en reparaciones: (0.70 × $200,000) – $30,000 = <strong className="text-white">$110,000</strong> precio máximo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 2: REHABILITAR — Crear Valor Mediante Renovación</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las renovaciones BRRR efectivas se centran en cambios que aumentan el valor tasado y justifican rentas más altas. Las renovaciones de mayor ROI: actualizaciones de cocina, modernización de baños, reemplazo de pisos, pintura neutral, panel eléctrico actualizado.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 3: RENTAR — Estabilizar el Activo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una vez completada la rehabilitación, colocas un inquilino calificado a la renta del mercado. Los prestamistas requieren un activo estabilizado y con ingresos de alquiler para el refinanciamiento. Muchos quieren ver un inquilino en su lugar por 3–6 meses antes de considerar un refinanciamiento con extracción de efectivo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 4: REFINANCIAR — Recuperar tu Capital</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Ejemplo de Negocio BRRR</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Precio de compra</span><span>$95,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costo de rehabilitación</span><span>$35,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costo total</span><span>$130,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>ARV (después de renovación)</span><span>$185,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Refinanciamiento al 75% LTV</span><span>$138,750</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Capital devuelto al inversor</span><span className="text-green-400">+$8,750</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 5: REPETIR — Escalar la Máquina</h2>
      <p className="text-gray-300 leading-relaxed">
        Con tu capital de regreso, lo despliegas en el próximo negocio. El efecto compuesto es lo que separa a los inversores BRRR de los inversores tradicionales de compra y retención. En la próxima lección, aprenderás cómo encontrar las propiedades en problemas que hacen posibles los negocios BRRR.
      </p>
    </div>
  )
}

export function BRLesson1() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
