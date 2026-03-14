import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Numbers don't lie. Every house hack decision should be grounded in a clear financial model, not hope or gut feel. In this lesson, we'll walk through a real-world example property step by step — and you'll use the House Hack Calculator to run your own analysis.
      </p>

      <div className="my-8 p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Calculator className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold">House Hack Calculator</p>
          <p className="text-gray-400 text-sm">Open the calculator to follow along with the example below — or run your own numbers.</p>
        </div>
        <Link
          to="/tools/house_hack"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Open Calculator
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Example Property</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Let's analyze a real deal. Here are the numbers:
      </p>
      <ul className="list-none text-gray-300 space-y-2 mb-6 ml-0 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Property type:</span> <strong className="text-white">Triplex</strong></li>
        <li><span className="text-gray-400">Purchase price:</span> <strong className="text-white">$320,000</strong></li>
        <li><span className="text-gray-400">Down payment (FHA 3.5%):</span> <strong className="text-white">$11,200</strong></li>
        <li><span className="text-gray-400">Loan amount:</span> <strong className="text-white">$308,800</strong></li>
        <li><span className="text-gray-400">Interest rate:</span> <strong className="text-white">7.0%</strong></li>
        <li><span className="text-gray-400">Loan term:</span> <strong className="text-white">30 years</strong></li>
        <li><span className="text-gray-400">Monthly P&I payment:</span> <strong className="text-white">~$2,055</strong></li>
        <li><span className="text-gray-400">FHA MIP (mortgage insurance):</span> <strong className="text-white">~$200/mo</strong></li>
        <li><span className="text-gray-400">Property taxes:</span> <strong className="text-white">$350/mo</strong></li>
        <li><span className="text-gray-400">Insurance:</span> <strong className="text-white">$150/mo</strong></li>
        <li><span className="text-gray-400">Total PITI:</span> <strong className="text-white">~$2,755/mo</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: Calculate Gross Rental Income</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is a triplex. You'll live in Unit A (1 bed/1 bath). Units B and C are identical 2-bed/1-bath units. Current market rent for those units: $1,100/month each.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">Gross monthly rental income = $1,100 + $1,100 = $2,200/month</strong>
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: Apply a Vacancy Factor</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        No property is 100% occupied 100% of the time. Use a conservative vacancy rate of 8–10% for planning. That means you assume you'll lose roughly one month of rent per unit per year to vacancies, turnover, and non-payment.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">Effective gross income = $2,200 × 0.92 = ~$2,024/month</strong>
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: Estimate Operating Expenses</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Beyond the mortgage, you have operating expenses. For a house hack where you're the owner-occupant, these are lower than a pure investment property because you're on-site and can handle small issues yourself. A reasonable estimate:
      </p>
      <ul className="list-none text-gray-300 space-y-2 mb-4 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Maintenance/repairs (5% of rent):</span> <strong className="text-white">~$110/mo</strong></li>
        <li><span className="text-gray-400">Capex reserves (5% of rent):</span> <strong className="text-white">~$110/mo</strong></li>
        <li><span className="text-gray-400">Property management (0% — you're managing):</span> <strong className="text-white">$0/mo</strong></li>
        <li><span className="text-gray-400">Total operating expenses:</span> <strong className="text-white">~$220/mo</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: Calculate Your Net Monthly Housing Cost</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is the key number: what are you actually paying to live here?
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-4">
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Total PITI</span>
          <span>$2,755</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Operating expenses</span>
          <span>+ $220</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Effective rental income</span>
          <span>– $2,024</span>
        </div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold">
          <span>Your net monthly housing cost</span>
          <span className="text-green-400">$951/mo</span>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Instead of paying $2,755/month for a mortgage on your own, you're paying <strong className="text-white">$951/month</strong> — your tenants are covering $1,804 of your total housing cost. If you were renting a comparable 1-bed apartment in this market for $1,200/month, you're now paying less AND building equity.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: Project the Numbers After Move-Out</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        When you move out (after the required 12-month FHA occupancy period) and rent your unit for $950/month, the full property generates $3,150/month in rent. Let's see what that looks like as a pure investment:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-4">
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Gross rent (all 3 units)</span>
          <span>$3,150</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Vacancy (8%)</span>
          <span>– $252</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Effective gross income</span>
          <span>$2,898</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>PITI</span>
          <span>– $2,755</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Maintenance + capex (10%)</span>
          <span>– $315</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Property management (10%)</span>
          <span>– $290</span>
        </div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold">
          <span>Monthly cash flow</span>
          <span className="text-red-400">–$462/mo</span>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Wait — negative cash flow as a full rental? Yes. And this is actually fine and expected for a house hack in many markets. You paid a 3.5% down payment on a $320,000 asset. The slightly negative cash flow is the cost of that low-leverage entry. As rents rise over time (historically 3–5% per year), this property will break even and then become positive within a few years.
      </p>
      <p className="text-gray-300 leading-relaxed">
        The cash-on-cash return also improves dramatically if you used this period to save aggressively and can put down more on the next property. The House Hack Calculator lets you model all of these scenarios — open it and try different rent assumptions and move-out timelines to see how your specific numbers play out.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Los números no mienten. Cada decisión de house hacking debe estar fundamentada en un modelo financiero claro, no en esperanzas o corazonadas. En esta lección, recorreremos un ejemplo del mundo real paso a paso.
      </p>

      <div className="my-8 p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Calculator className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold">Calculadora de House Hack</p>
          <p className="text-gray-400 text-sm">Abre la calculadora para seguir el ejemplo a continuación — o ingresa tus propios números.</p>
        </div>
        <Link
          to="/tools/house_hack"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Abrir Calculadora
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">La Propiedad de Ejemplo</h2>
      <ul className="list-none text-gray-300 space-y-2 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Tipo de propiedad:</span> <strong className="text-white">Tríplex</strong></li>
        <li><span className="text-gray-400">Precio de compra:</span> <strong className="text-white">$320,000</strong></li>
        <li><span className="text-gray-400">Enganche (FHA 3.5%):</span> <strong className="text-white">$11,200</strong></li>
        <li><span className="text-gray-400">Tasa de interés:</span> <strong className="text-white">7.0%</strong></li>
        <li><span className="text-gray-400">Pago mensual PITI total:</span> <strong className="text-white">~$2,755/mes</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 1: Calcula el Ingreso Bruto de Alquiler</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Vivirás en la Unidad A. Las Unidades B y C alquilan a $1,100/mes cada una.
        <br /><strong className="text-white">Ingreso mensual bruto = $2,200/mes</strong>
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 2: Aplica un Factor de Vacante</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Usa una tasa de vacante conservadora del 8–10%.
        <br /><strong className="text-white">Ingreso bruto efectivo = $2,200 × 0.92 = ~$2,024/mes</strong>
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 3: Estima los Gastos Operativos</h2>
      <ul className="list-none text-gray-300 space-y-2 mb-4 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Mantenimiento (5% de renta):</span> <strong className="text-white">~$110/mes</strong></li>
        <li><span className="text-gray-400">Reservas capex (5%):</span> <strong className="text-white">~$110/mes</strong></li>
        <li><span className="text-gray-400">Administración (0% — tú administras):</span> <strong className="text-white">$0</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Paso 4: Tu Costo Mensual Neto de Vivienda</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-4">
        <div className="flex justify-between text-gray-300 text-sm"><span>PITI total</span><span>$2,755</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Gastos operativos</span><span>+ $220</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Ingreso de alquiler efectivo</span><span>– $2,024</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Tu costo mensual neto</span><span className="text-green-400">$951/mes</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed">
        En lugar de pagar $2,755/mes por una hipoteca propia, pagas <strong className="text-white">$951/mes</strong> — tus inquilinos cubren $1,804 de tu costo total de vivienda. Usa la Calculadora de House Hack para modelar tus propios escenarios.
      </p>
    </div>
  )
}

export function HHLesson3() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
