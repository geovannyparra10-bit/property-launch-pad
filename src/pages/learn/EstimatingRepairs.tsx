import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        One of the biggest mistakes new real estate investors make is underestimating repair costs. An optimistic rehab budget that balloons mid-project can turn a promising deal into a money pit. Whether you're flipping a property, running a BRRR, or simply buying a rental that needs work, accurate repair estimation is a non-negotiable skill. This guide walks you through how experienced investors approach an inspection, how to build a reliable cost estimate, and what always seems to go over budget.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Repair Estimates Go Wrong</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        New investors tend to make the same mistakes when estimating repairs:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Relying on seller disclosures alone.</strong> Sellers often don't know — or don't disclose — the full extent of needed repairs. Never trust a disclosure; always verify in person.</li>
        <li><strong className="text-white">Estimating based on cosmetics.</strong> Fresh paint and new fixtures can hide serious structural, electrical, or plumbing issues lurking beneath the surface.</li>
        <li><strong className="text-white">Skipping the inspection walkthrough.</strong> A 15-minute drive-by is not enough. You need to open every closet, run every faucet, and flip every breaker.</li>
        <li><strong className="text-white">Forgetting soft costs.</strong> Permits, architectural plans, inspections, and carrying costs (mortgage, taxes, insurance during rehab) are real expenses that must be budgeted.</li>
        <li><strong className="text-white">No contingency.</strong> Experienced rehabbers always add a contingency buffer — typically 10–20% of the hard rehab cost.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Accurate repair estimation comes from experience and a structured process, not guesswork. The good news: you can build that process deliberately, starting with your first property.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Pre-Inspection Walkthrough: What to Bring</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before you set foot on the property, come prepared:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li>Flashlight (for attics, crawlspaces, basements, and dark corners)</li>
        <li>Screwdriver (to test for soft wood indicating rot or termite damage)</li>
        <li>Phone camera (photograph everything — create a visual record room by room)</li>
        <li>Outlet tester (plugs into outlets to check wiring polarity)</li>
        <li>Laser measuring tape or tape measure (for flooring and room dimensions)</li>
        <li>Repair estimation checklist (covered below)</li>
        <li>A contractor or experienced investor (ideally bring someone who prices work regularly)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        If you can, bring a general contractor on your first few walkthroughs, even if you pay them for their time. The calibration you gain from watching an experienced tradesperson assess a property is invaluable and will pay dividends for years.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The 8 Major Cost Categories</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        When doing your inspection walkthrough, systematically evaluate each of these categories:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Roof</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The roof is one of the most expensive single items and one of the most commonly misrepresented. Look for: missing or curling shingles, sagging deck boards, staining on the interior ceiling (water intrusion), age (most asphalt shingle roofs last 20–25 years), and condition of flashing around chimneys and vents.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <p className="text-gray-400 text-sm font-semibold mb-2">Typical Cost Ranges</p>
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Roof repair (minor patching)</span><span className="text-white">$500 – $2,000</span></div>
          <div className="flex justify-between"><span>Full reroof (1,500 sq ft house)</span><span className="text-white">$8,000 – $15,000</span></div>
          <div className="flex justify-between"><span>Full reroof with decking replacement</span><span className="text-white">$12,000 – $22,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Foundation and Structural</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Foundation issues are the most feared repair — rightfully so. Warning signs include: cracks in exterior masonry (especially stair-step cracks in brick), doors or windows that stick or don't close properly, uneven floors, and visible bowing in basement walls. Not all cracks are catastrophic, but a structural engineer's report ($300–$600) is mandatory before pricing any foundation work.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Crack injection / minor repair</span><span className="text-white">$1,000 – $5,000</span></div>
          <div className="flex justify-between"><span>Crawlspace encapsulation</span><span className="text-white">$3,000 – $8,000</span></div>
          <div className="flex justify-between"><span>Full foundation stabilization (piers)</span><span className="text-white">$10,000 – $30,000+</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Electrical</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Electrical issues are a safety hazard and a lender red flag. Look for: aluminum wiring (common in homes built 1965–1973), knob-and-tube wiring (pre-1940s), a panel smaller than 100 amps, double-tapped breakers, and absence of GFCI outlets in bathrooms and kitchens.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Panel upgrade (100A to 200A)</span><span className="text-white">$1,500 – $4,000</span></div>
          <div className="flex justify-between"><span>Full rewire (1,000 sq ft)</span><span className="text-white">$8,000 – $15,000</span></div>
          <div className="flex justify-between"><span>GFCI outlet upgrades</span><span className="text-white">$50 – $150 each</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Plumbing</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Run every faucet, flush every toilet, and check under every sink. Look for: galvanized steel pipes (prone to corrosion and low pressure), polybutylene pipe (prone to failure — orange or grey flexible plastic, common 1978–1995), slow drains, water pressure issues, and water heater age (lifespan 8–12 years).
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Water heater replacement</span><span className="text-white">$900 – $2,000</span></div>
          <div className="flex justify-between"><span>Partial repipe (one bathroom)</span><span className="text-white">$1,500 – $4,000</span></div>
          <div className="flex justify-between"><span>Full repipe (1,500 sq ft house)</span><span className="text-white">$8,000 – $18,000</span></div>
          <div className="flex justify-between"><span>Sewer line replacement</span><span className="text-white">$3,000 – $12,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">5. HVAC</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Check the age and condition of the furnace, air handler, and condenser (outside AC unit). A functioning HVAC system has a lifespan of 15–20 years. Check all vents for airflow and listen for unusual noises when the system runs. Note whether there's a central system, window units, or no AC at all.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Furnace replacement</span><span className="text-white">$2,500 – $5,500</span></div>
          <div className="flex justify-between"><span>Central AC replacement</span><span className="text-white">$3,500 – $7,500</span></div>
          <div className="flex justify-between"><span>Full HVAC system (new install)</span><span className="text-white">$7,000 – $15,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">6. Interior Cosmetics</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        This category includes flooring, drywall, paint, kitchen and bathroom updates, doors, trim, and light fixtures. Cosmetic repairs are the most variable — you can spend $5,000 or $50,000 on a kitchen depending on the target price point and buyer/renter demographic.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Interior paint (per room)</span><span className="text-white">$300 – $700</span></div>
          <div className="flex justify-between"><span>LVP flooring (per sq ft installed)</span><span className="text-white">$3 – $6</span></div>
          <div className="flex justify-between"><span>Budget kitchen renovation</span><span className="text-white">$8,000 – $20,000</span></div>
          <div className="flex justify-between"><span>Bathroom renovation (full)</span><span className="text-white">$6,000 – $18,000</span></div>
          <div className="flex justify-between"><span>Drywall repair (per room)</span><span className="text-white">$500 – $2,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">7. Exterior and Landscaping</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Curb appeal matters — especially for flips. Evaluate the condition of siding, windows, gutters, driveway, deck or porch, and landscaping. Rotting wood siding, single-pane windows, and damaged gutters are common and often overlooked.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Exterior paint (1,500 sq ft house)</span><span className="text-white">$3,000 – $7,000</span></div>
          <div className="flex justify-between"><span>Window replacement (per window)</span><span className="text-white">$300 – $800</span></div>
          <div className="flex justify-between"><span>Gutter replacement (full house)</span><span className="text-white">$1,000 – $2,500</span></div>
          <div className="flex justify-between"><span>Deck replacement</span><span className="text-white">$6,000 – $20,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">8. Permits, Soft Costs, and Carrying Costs</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        These are the costs that don't show up on the contractor's invoice but absolutely affect your profit. Building permits (required for structural, electrical, and plumbing work) range from $500 to $3,000+ depending on municipality and scope. For flips, carrying costs — mortgage interest, property taxes, insurance, and utilities during the rehab period — can run $1,500–$4,000 per month depending on loan balance and market.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">DIY vs. Contractor: What to Outsource</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Being handy can save money, but DIY has real limits — especially in investment properties:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
          <h4 className="text-green-400 font-semibold mb-3">Good DIY Candidates</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Interior paint</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Landscaping and cleanup</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Light fixture and hardware swap</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Minor drywall patches</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Flooring installation (LVP)</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Cabinet hardware and faucets</li>
          </ul>
        </div>
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
          <h4 className="text-red-400 font-semibold mb-3">Always Hire a Pro</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Electrical panel work</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Plumbing rough-in</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Structural modifications</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Roofing (safety and warranty)</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Foundation work</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>HVAC installation</li>
          </ul>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Permitted work done without a licensed contractor can void homeowner's insurance, cause issues with lenders, and create liability in resale. The cost savings rarely justify the risk.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Common Budget-Busters</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        These items catch investors off guard repeatedly:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8 ml-4">
        <li><strong className="text-white">Hidden water damage.</strong> A small ceiling stain often indicates a much larger problem — rot, mold, or failed pipe junctions hidden inside walls. Budget to open walls and investigate before pricing.</li>
        <li><strong className="text-white">Mold remediation.</strong> If a property has had moisture intrusion, mold may be present behind drywall. Professional remediation ranges from $1,500 to $15,000+ depending on scope.</li>
        <li><strong className="text-white">Asbestos and lead paint.</strong> Common in homes built before 1980. Testing costs $300–$800 per area. Remediation or encapsulation can add $5,000–$30,000+ depending on scope and location.</li>
        <li><strong className="text-white">Pest damage.</strong> Termites and carpenter ants can silently destroy structural members. Always probe wood framing in crawlspaces and basements.</li>
        <li><strong className="text-white">Septic system issues.</strong> If the property is not on municipal sewer, inspect the septic system. A failing septic tank can cost $8,000–$20,000 to replace.</li>
        <li><strong className="text-white">Scope creep.</strong> Once walls are open, you often find additional repairs that need addressing. Budget 10–20% contingency on every project, no exceptions.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Contingency Rule: Always Budget Extra</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        No matter how thorough your inspection, surprises will happen. Standard practice:
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <span className="text-gray-300">Light cosmetic project (paint, floors, fixtures)</span>
            <span className="text-blue-400 font-semibold">10% contingency</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <span className="text-gray-300">Mid-range renovation (kitchen, baths, systems)</span>
            <span className="text-blue-400 font-semibold">15% contingency</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Full gut renovation or older property (&lt;1970)</span>
            <span className="text-blue-400 font-semibold">20–25% contingency</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Getting Contractor Quotes</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Always get at least 3 bids for any significant project. When reviewing bids:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Ensure all bids cover the same exact scope of work — compare apples to apples.</li>
        <li>Beware the lowest bid — it often means corners will be cut, unlicensed subs, or cheap materials.</li>
        <li>Ask for references and call them. Ask specifically: "Did they stay on budget and on schedule?"</li>
        <li>Require proof of license and insurance before signing any contract.</li>
        <li>Never pay more than 10–25% upfront. Draw payments tied to completed milestones protect you from a contractor disappearing after a deposit.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Building a reliable contractor network is one of the most valuable things a real estate investor can do. A trustworthy GC who knows your standards is worth more than any app or software tool in your arsenal.
      </p>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Uno de los errores más comunes de los nuevos inversores inmobiliarios es subestimar los costos de reparación. Un presupuesto de rehabilitación optimista que se desborda a mitad del proyecto puede convertir un negocio prometedor en un pozo sin fondo. Ya sea que estés haciendo un flip, ejecutando una estrategia BRRR o simplemente comprando un alquiler que necesita trabajo, estimar con precisión los costos de reparación es una habilidad innegociable. Esta guía te explica cómo los inversores con experiencia realizan una inspección, cómo construir una estimación confiable y qué es lo que siempre se sale del presupuesto.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Por Qué las Estimaciones de Reparación Fallan</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los nuevos inversores tienden a cometer los mismos errores al estimar reparaciones:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Confiar solo en las divulgaciones del vendedor.</strong> Los vendedores a menudo no saben — o no revelan — el alcance total de las reparaciones necesarias. Nunca confíes en una divulgación; siempre verifica en persona.</li>
        <li><strong className="text-white">Estimar basándose en lo cosmético.</strong> Pintura fresca y accesorios nuevos pueden ocultar problemas estructurales, eléctricos o de plomería graves que se esconden debajo.</li>
        <li><strong className="text-white">Omitir el recorrido de inspección.</strong> Un paseo de 15 minutos en carro no es suficiente. Necesitas abrir cada closet, hacer correr cada grifo y activar cada interruptor.</li>
        <li><strong className="text-white">Olvidar los costos indirectos.</strong> Permisos, planos arquitectónicos, inspecciones y costos de mantenimiento durante la rehabilitación son gastos reales que deben presupuestarse.</li>
        <li><strong className="text-white">Sin contingencia.</strong> Los rehabilitadores con experiencia siempre añaden un margen de contingencia — típicamente el 10–20% del costo duro de rehabilitación.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        La estimación precisa de reparaciones viene de la experiencia y un proceso estructurado, no de suposiciones. La buena noticia: puedes construir ese proceso deliberadamente, comenzando desde tu primera propiedad.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Recorrido Previo a la Inspección: Qué Llevar</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Antes de poner un pie en la propiedad, ven preparado:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li>Linterna (para áticos, espacios de rastreo, sótanos y rincones oscuros)</li>
        <li>Destornillador (para probar madera blanda que indica pudrición o daño de termitas)</li>
        <li>Cámara del teléfono (fotografía todo — crea un registro visual cuarto por cuarto)</li>
        <li>Probador de tomacorrientes (para verificar el cableado)</li>
        <li>Cinta métrica (para pisos y dimensiones de cuartos)</li>
        <li>Lista de verificación de estimación de reparaciones</li>
        <li>Un contratista o inversor con experiencia (idealmente trae a alguien que cotiza trabajo regularmente)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Si puedes, lleva a un contratista general en tus primeros recorridos, aunque sea pagándole por su tiempo. La calibración que obtienes al ver a un profesional con experiencia evaluar una propiedad es invaluable y te beneficiará durante años.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Las 8 Categorías Principales de Costos</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Al hacer tu recorrido de inspección, evalúa sistemáticamente cada una de estas categorías:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Techo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El techo es uno de los artículos individuales más costosos y uno de los más comúnmente mal representados. Busca: tejas faltantes o curvadas, tablas del deck hundidas, manchas en el techo interior (intrusión de agua), antigüedad (la mayoría de los techos de tejas asfálticas duran 20–25 años) y el estado de las tapajuntas alrededor de chimeneas y ventilaciones.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <p className="text-gray-400 text-sm font-semibold mb-2">Rangos de Costo Típicos</p>
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Reparación de techo (parcheado menor)</span><span className="text-white">$500 – $2,000</span></div>
          <div className="flex justify-between"><span>Retejado completo (casa 1,500 pies cuadrados)</span><span className="text-white">$8,000 – $15,000</span></div>
          <div className="flex justify-between"><span>Retejado completo con reemplazo del deck</span><span className="text-white">$12,000 – $22,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Cimentación y Estructura</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los problemas de cimentación son los más temidos — con razón. Las señales de advertencia incluyen: grietas en la mampostería exterior (especialmente grietas en escalera en ladrillo), puertas o ventanas que se atoran o no cierran correctamente, pisos desiguales y pandeo visible en paredes del sótano. Un informe de ingeniero estructural ($300–$600) es obligatorio antes de cotizar cualquier trabajo de cimentación.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Inyección de grietas / reparación menor</span><span className="text-white">$1,000 – $5,000</span></div>
          <div className="flex justify-between"><span>Encapsulamiento del espacio de rastreo</span><span className="text-white">$3,000 – $8,000</span></div>
          <div className="flex justify-between"><span>Estabilización completa de cimentación</span><span className="text-white">$10,000 – $30,000+</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Electricidad</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los problemas eléctricos son un peligro de seguridad. Busca: cableado de aluminio (común en casas 1965–1973), cableado de botón y tubo (anterior a 1940), un panel menor de 100 amperios, disyuntores con doble conexión y ausencia de tomacorrientes GFCI en baños y cocinas.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Actualización de panel (100A a 200A)</span><span className="text-white">$1,500 – $4,000</span></div>
          <div className="flex justify-between"><span>Recableado completo (1,000 pies cuadrados)</span><span className="text-white">$8,000 – $15,000</span></div>
          <div className="flex justify-between"><span>Actualización de tomacorrientes GFCI</span><span className="text-white">$50 – $150 c/u</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Plomería</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Abre todas las llaves, descarga todos los baños y revisa debajo de todos los lavabos. Busca: tuberías de acero galvanizado (propensas a corrosión), tubería de poliebutileno (propensa a fallas — plástico flexible naranja o gris, común 1978–1995), desagües lentos, problemas de presión de agua y la antigüedad del calentador de agua.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Reemplazo de calentador de agua</span><span className="text-white">$900 – $2,000</span></div>
          <div className="flex justify-between"><span>Retuberización parcial (un baño)</span><span className="text-white">$1,500 – $4,000</span></div>
          <div className="flex justify-between"><span>Retuberización completa (1,500 pies cuadrados)</span><span className="text-white">$8,000 – $18,000</span></div>
          <div className="flex justify-between"><span>Reemplazo de línea de alcantarillado</span><span className="text-white">$3,000 – $12,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">5. HVAC (Calefacción y Aire Acondicionado)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Revisa la edad y condición del horno, el manejador de aire y el condensador (unidad exterior de A/C). Un sistema HVAC en funcionamiento tiene una vida útil de 15–20 años. Verifica todas las rejillas de ventilación y escucha ruidos inusuales cuando el sistema funciona.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Reemplazo de horno</span><span className="text-white">$2,500 – $5,500</span></div>
          <div className="flex justify-between"><span>Reemplazo de A/C central</span><span className="text-white">$3,500 – $7,500</span></div>
          <div className="flex justify-between"><span>Sistema HVAC completo (instalación nueva)</span><span className="text-white">$7,000 – $15,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">6. Cosmética Interior</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Esta categoría incluye pisos, drywall, pintura, actualizaciones de cocina y baño, puertas, molduras y luminarias. Las reparaciones cosméticas son las más variables — puedes gastar $5,000 o $50,000 en una cocina dependiendo del punto de precio objetivo.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Pintura interior (por cuarto)</span><span className="text-white">$300 – $700</span></div>
          <div className="flex justify-between"><span>Piso LVP (por pie cuadrado instalado)</span><span className="text-white">$3 – $6</span></div>
          <div className="flex justify-between"><span>Renovación de cocina básica</span><span className="text-white">$8,000 – $20,000</span></div>
          <div className="flex justify-between"><span>Renovación de baño completa</span><span className="text-white">$6,000 – $18,000</span></div>
          <div className="flex justify-between"><span>Reparación de drywall (por cuarto)</span><span className="text-white">$500 – $2,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">7. Exterior y Paisajismo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El atractivo exterior importa, especialmente para los flips. Evalúa el estado del revestimiento, ventanas, canaletas, entrada para carros, terraza o porche y paisajismo.
      </p>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
        <div className="space-y-1.5 text-sm text-gray-300">
          <div className="flex justify-between"><span>Pintura exterior (casa 1,500 pies cuadrados)</span><span className="text-white">$3,000 – $7,000</span></div>
          <div className="flex justify-between"><span>Reemplazo de ventanas (por ventana)</span><span className="text-white">$300 – $800</span></div>
          <div className="flex justify-between"><span>Reemplazo de canaletas (casa completa)</span><span className="text-white">$1,000 – $2,500</span></div>
          <div className="flex justify-between"><span>Reemplazo de terraza</span><span className="text-white">$6,000 – $20,000</span></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">8. Permisos, Costos Indirectos y Costos de Mantenimiento</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Estos son los costos que no aparecen en la factura del contratista pero que definitivamente afectan tus ganancias. Los permisos de construcción van de $500 a $3,000+ según el municipio. Para los flips, los costos de mantenimiento — intereses hipotecarios, impuestos a la propiedad, seguros y servicios durante el período de rehabilitación — pueden ascender a $1,500–$4,000 al mes.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Hazlo Tú Mismo vs. Contratista: Qué Externalizar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
          <h4 className="text-green-400 font-semibold mb-3">Buenos Candidatos para Hacerlo Tú Mismo</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Pintura interior</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Paisajismo y limpieza</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Cambio de luminarias y herrajes</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Parches menores de drywall</li>
            <li className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>Instalación de pisos LVP</li>
          </ul>
        </div>
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
          <h4 className="text-red-400 font-semibold mb-3">Siempre Contrata un Profesional</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Trabajo en el panel eléctrico</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Instalación de plomería</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Modificaciones estructurales</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Tejado (seguridad y garantía)</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Trabajo de cimentación</li>
            <li className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>Instalación de HVAC</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Errores Comunes que Rompen el Presupuesto</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8 ml-4">
        <li><strong className="text-white">Daños ocultos por agua.</strong> Una pequeña mancha en el techo a menudo indica un problema mucho mayor — pudrición, moho o juntas de tuberías fallidas escondidas dentro de las paredes.</li>
        <li><strong className="text-white">Remediación de moho.</strong> Si una propiedad ha tenido intrusión de humedad, puede haber moho detrás del drywall. La remediación profesional oscila entre $1,500 y $15,000+.</li>
        <li><strong className="text-white">Asbesto y pintura con plomo.</strong> Comunes en casas construidas antes de 1980. Las pruebas cuestan $300–$800 por área. La remediación puede agregar $5,000–$30,000+.</li>
        <li><strong className="text-white">Daño de plagas.</strong> Las termitas y las hormigas carpinteras pueden destruir silenciosamente los miembros estructurales. Siempre sondea la madera en espacios de rastreo y sótanos.</li>
        <li><strong className="text-white">Problemas con el sistema séptico.</strong> Si la propiedad no está conectada a la alcantarilla municipal, inspecciona el sistema séptico. Reemplazarlo puede costar $8,000–$20,000.</li>
        <li><strong className="text-white">Expansión del alcance.</strong> Una vez que las paredes están abiertas, a menudo encuentras reparaciones adicionales. Presupuesta siempre un 10–20% de contingencia, sin excepciones.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Regla de Contingencia: Siempre Presupuesta Extra</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <span className="text-gray-300">Proyecto cosmético ligero (pintura, pisos, accesorios)</span>
            <span className="text-blue-400 font-semibold">10% contingencia</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <span className="text-gray-300">Renovación media (cocina, baños, sistemas)</span>
            <span className="text-blue-400 font-semibold">15% contingencia</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Renovación completa o propiedad antigua (&lt;1970)</span>
            <span className="text-blue-400 font-semibold">20–25% contingencia</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Obtener Cotizaciones de Contratistas</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Siempre obtén al menos 3 ofertas para cualquier proyecto significativo. Al revisar las ofertas:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Asegúrate de que todas las ofertas cubran exactamente el mismo alcance de trabajo.</li>
        <li>Cuidado con la oferta más baja — a menudo significa que se recortarán costos, subcontratistas sin licencia o materiales baratos.</li>
        <li>Pide referencias y llámalas. Pregunta específicamente: "¿Cumplieron con el presupuesto y el cronograma?"</li>
        <li>Exige prueba de licencia y seguro antes de firmar cualquier contrato.</li>
        <li>Nunca pagues más del 10–25% por adelantado. Los pagos vinculados a hitos completados te protegen.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Construir una red confiable de contratistas es una de las cosas más valiosas que un inversor inmobiliario puede hacer. Un contratista general de confianza que conoce tus estándares vale más que cualquier aplicación o herramienta de software en tu arsenal.
      </p>
    </div>
  )
}

export function EstimatingRepairs() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="How to Estimate Repair Costs Like a Pro"
      titleEs="Cómo Estimar los Costos de Reparación Como un Profesional"
      readTimeEn="12 min read"
      readTimeEs="12 min de lectura"
      categoryEn="Renovation"
      categoryEs="Renovación"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-700/30 rounded-xl">
        <h3 className="text-white font-bold text-lg mb-2">
          {language === 'en' ? 'Ready to Build Your Repair Budget?' : '¿Listo para Construir tu Presupuesto de Reparaciones?'}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {language === 'en'
            ? 'Use our Repairs Estimator to line-item every cost category, add your contingency, and calculate the full rehab budget before you make an offer.'
            : 'Usa nuestro Estimador de Reparaciones para desglosar cada categoría de costo, agregar tu contingencia y calcular el presupuesto completo de rehabilitación antes de hacer una oferta.'}
        </p>
        <Link
          to="/tools/repairs_estimator"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {language === 'en' ? 'Open Repairs Estimator' : 'Abrir Estimador de Reparaciones'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
