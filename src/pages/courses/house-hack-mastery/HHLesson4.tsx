import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Financing makes or breaks a house hack. The wrong loan structure can turn a profitable deal into a cash flow drain. The right one can get you into a $350,000 investment with less than $15,000 out of pocket. In this lesson, you'll understand every financing option available to house hackers.
      </p>

      <div className="my-8 p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Calculator className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold">Mortgage Calculator</p>
          <p className="text-gray-400 text-sm">Model different loan structures to see how rate, term, and down payment affect your monthly payment.</p>
        </div>
        <Link
          to="/tools/mortgage_calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Open Calculator
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">FHA Loans: The House Hacker's Default</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        FHA loans are backed by the Federal Housing Administration and are purpose-built for owner-occupants. They allow lower down payments and are more forgiving on credit scores than conventional loans. For house hacking, they're almost always the first option to consider.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Key FHA Terms</h3>
      <ul className="list-none text-gray-300 space-y-2 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Minimum down payment:</span> <strong className="text-white">3.5% (credit score 580+)</strong></li>
        <li><span className="text-gray-400">Down payment at 500–579 score:</span> <strong className="text-white">10%</strong></li>
        <li><span className="text-gray-400">Maximum units (FHA eligible):</span> <strong className="text-white">4 units</strong></li>
        <li><span className="text-gray-400">Upfront MIP:</span> <strong className="text-white">1.75% of loan amount (rolled into loan)</strong></li>
        <li><span className="text-gray-400">Annual MIP (monthly):</span> <strong className="text-white">0.55–0.85% of loan balance</strong></li>
        <li><span className="text-gray-400">Occupancy requirement:</span> <strong className="text-white">12 months as primary residence</strong></li>
        <li><span className="text-gray-400">Loan limits:</span> <strong className="text-white">Vary by county — check HUD website</strong></li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">The MIP Reality</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        FHA loans require mortgage insurance premium (MIP) for the life of the loan if you put less than 10% down. On a $308,000 loan at the current 0.55% annual MIP rate, that's about $141/month added to your payment indefinitely — unless you refinance into a conventional loan once you have 20% equity.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        This is a real cost. But for a first house hack where you're putting 3.5% down on a $320,000 property and your tenants are covering most of the mortgage, it's a trade-off worth making. Plan to refinance out of FHA once you hit 20% equity.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Conventional Loans: When They Beat FHA</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Conventional loans (Fannie Mae/Freddie Mac) have stricter credit requirements but no lifetime MIP. Once you reach 20% equity, PMI (private mortgage insurance) is automatically cancelled. For borrowers with strong credit (720+) and 10–15% down, conventional can be cheaper than FHA over the life of the loan.
      </p>
      <ul className="list-none text-gray-300 space-y-2 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Minimum down payment:</span> <strong className="text-white">3% (Fannie Mae HomeReady)</strong></li>
        <li><span className="text-gray-400">Typical credit score requirement:</span> <strong className="text-white">620+ (720+ for best rates)</strong></li>
        <li><span className="text-gray-400">PMI:</span> <strong className="text-white">Required below 20% LTV; cancels at 20%</strong></li>
        <li><span className="text-gray-400">Maximum units:</span> <strong className="text-white">4 units (owner-occupant)</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">VA Loans: The Veteran's Superpower</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you're an eligible veteran, active duty service member, or surviving spouse, the VA loan is one of the most powerful financial tools in existence. For house hacking, it's extraordinary.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li><strong className="text-white">0% down payment</strong> with no PMI</li>
        <li>Competitive interest rates (often better than conventional)</li>
        <li>Available for properties up to 4 units (you must occupy one unit)</li>
        <li>No loan limits for eligible veterans with full entitlement</li>
        <li>VA funding fee applies (1.25–3.3% of loan), but can be financed into the loan</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        A veteran using a VA loan on a $350,000 fourplex with $0 down, covering their mortgage with rental income, is in an almost unbeatable financial position. If you have this benefit available, use it.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">House Hack-Specific Lending Tips</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Rental Income on Your Loan Application</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is one of the most misunderstood aspects of house hack financing. When you apply for a loan on a 2–4 unit property as an owner-occupant, lenders will typically allow you to count <strong className="text-white">75% of the projected rent from the non-owner units</strong> as income on your application.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Why 75%? Lenders assume a 25% vacancy/expense factor. But the key point is that this projected income can help you qualify for a larger loan than your W-2 income alone would support. Ask your lender specifically: "Can I use projected rental income from the other units to help me qualify?"
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Repeat House Hacking with FHA</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        After living in your first house hack for 12 months, you can in many cases obtain a new FHA loan on a new primary residence — effectively doing it again. FHA allows borrowers to have one FHA loan at a time, but you can move out of the first property and get a new FHA loan under specific circumstances (like the distance requirement for job relocation, or if your family size has increased and the current property is inadequate).
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Conventional loans are more straightforward for repeat house hacking — you can use the same qualification pathway each time you move to a new owner-occupied property.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Finding the Right Lender</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Not all lenders understand house hacking. Work with a loan officer who has experience with investor-friendly lending — preferably one who has been referred by a local REIA or real estate investor network. They'll know how to structure your application to maximize rental income credit and navigate the nuances of 2–4 unit financing.
      </p>
      <p className="text-gray-300 leading-relaxed">
        In the final lesson, you'll learn how to manage your property well, screen tenants effectively, and set yourself up for a smooth first year as a landlord-occupant.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        El financiamiento puede hacer o deshacer un house hack. La estructura de préstamo incorrecta puede convertir un negocio rentable en un drenaje de flujo de caja. La correcta puede llevarte a una inversión de $350,000 con menos de $15,000 de tu bolsillo.
      </p>

      <div className="my-8 p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Calculator className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold">Calculadora de Hipoteca</p>
          <p className="text-gray-400 text-sm">Modela diferentes estructuras de préstamo para ver cómo la tasa, el plazo y el enganche afectan tu pago mensual.</p>
        </div>
        <Link
          to="/tools/mortgage_calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Abrir Calculadora
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Préstamos FHA: El Predeterminado del House Hacker</h2>
      <ul className="list-none text-gray-300 space-y-2 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Enganche mínimo:</span> <strong className="text-white">3.5% (puntaje 580+)</strong></li>
        <li><span className="text-gray-400">Unidades máximas elegibles:</span> <strong className="text-white">4 unidades</strong></li>
        <li><span className="text-gray-400">MIP anual (mensual):</span> <strong className="text-white">0.55–0.85% del saldo</strong></li>
        <li><span className="text-gray-400">Requisito de ocupación:</span> <strong className="text-white">12 meses como residencia principal</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Préstamos Convencionales: Cuándo Superan al FHA</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los préstamos convencionales tienen requisitos de crédito más estrictos pero sin MIP de por vida. Una vez que alcanzas el 20% de capital, el PMI se cancela automáticamente. Para prestatarios con buen crédito (720+) y 10–15% de enganche, el convencional puede ser más barato que el FHA a lo largo de la vida del préstamo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Préstamos VA: El Superpoder del Veterano</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Si eres un veterano elegible, el préstamo VA ofrece <strong className="text-white">0% de enganche sin PMI</strong>, tasas competitivas, y está disponible para propiedades de hasta 4 unidades. Un veterano usando un préstamo VA en un fourplex de $350,000 con $0 de enganche está en una posición financiera casi imbatible.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Consejos de Préstamo Específicos para House Hacking</h2>
      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Ingresos de Alquiler en tu Solicitud</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los prestamistas típicamente permiten contar el <strong className="text-white">75% de la renta proyectada</strong> de las unidades no ocupadas por el propietario como ingreso en tu solicitud. Esto puede ayudarte a calificar para un préstamo más grande del que tu ingreso W-2 solo soportaría.
      </p>
      <p className="text-gray-300 leading-relaxed">
        En la lección final, aprenderás cómo administrar bien tu propiedad, evaluar inquilinos de manera efectiva y prepararte para un primer año tranquilo como arrendador-ocupante.
      </p>
    </div>
  )
}

export function HHLesson4() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
