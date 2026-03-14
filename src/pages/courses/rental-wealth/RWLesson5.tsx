import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { FileText, BookOpen, ChartBar as BarChart2 } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Acquiring a rental property is a milestone — but it's the ongoing management that determines whether it actually builds wealth. Poorly screened tenants, sloppy lease agreements, deferred maintenance, and a disorganized portfolio can erase all the returns your deal analysis projected. This final lesson covers the fundamentals of long-term rental management, from placing your first tenant to scaling a multi-property portfolio.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tenant Screening: Your Most Important Decision</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A bad tenant costs more than vacancy. Eviction proceedings can take 60–180 days depending on your state, during which you may still be owed rent you'll never collect. Then there's potential damage beyond the deposit, legal fees, and the cost of re-leasing. The cost of a single bad tenant can easily reach $10,000–$20,000 when all factors are tallied.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Screen every applicant using the same objective criteria applied consistently. Your screening criteria should include:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Income Verification</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Standard requirement: gross monthly income of at least 3× the monthly rent. If rent is $1,500, the tenant should earn at least $4,500/month gross. Verify with recent pay stubs, W-2s, or bank statements. Self-employed applicants should provide two years of tax returns or business bank statements.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Credit Report</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Pull a full credit report through a tenant screening service (e.g., TransUnion SmartMove, RentPrep). Look for:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Credit score: 620+ is a common minimum; 680+ indicates lower risk</li>
        <li>Prior evictions (automatic disqualification for most landlords)</li>
        <li>Patterns of missed payments or collections</li>
        <li>Outstanding utility balances (a red flag for rental properties)</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Rental History</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Contact prior landlords directly — not just the references provided by the applicant. Ask: Did they pay on time? Did they give proper notice? Would you rent to them again? A hesitation or a vague answer to that last question tells you everything.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Background Check</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Run a criminal background check and eviction history search. Know the Fair Housing Act requirements in your state — certain criminal history inquiries may be restricted. Use a tenant screening service that stays current with local fair housing compliance.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Lease Agreement: Protecting Your Asset</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A comprehensive, legally sound lease agreement is your first line of legal protection. It defines the rules of the tenancy, sets expectations, and gives you the contractual basis to enforce them.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Every lease should clearly cover:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>Rent amount, due date, grace period, and late fee structure</li>
        <li>Security deposit amount and conditions for deductions</li>
        <li>Lease term (start and end date) and renewal terms</li>
        <li>Occupancy limits (who is authorized to live in the property)</li>
        <li>Pet policy (no pets, or specific size/breed restrictions with pet deposit)</li>
        <li>Maintenance responsibilities (tenant vs. landlord)</li>
        <li>Smoking policy</li>
        <li>Entry notice requirements (typically 24–48 hours)</li>
        <li>Utilities — which party is responsible for each</li>
        <li>Early termination conditions and penalties</li>
      </ul>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Lease Agreement Template</p>
            <p className="text-gray-400 text-xs mt-0.5">Customizable lease template with all essential clauses included</p>
          </div>
        </div>
        <Link
          to="/templates/lease-agreement"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          View Template
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Self-Manage vs. Hire a Property Manager</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Self-managing saves money — typically 8–12% of monthly rent. But it costs time, creates availability demands (tenants call at midnight when the heat goes out), and requires local presence.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        A professional property manager handles tenant communication, maintenance coordination, rent collection, and lease enforcement. Their fee is a business expense — deductible against rental income — and their expertise often reduces vacancy periods, costly mistakes, and legal exposure.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Consider hiring a property manager if:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>You own property out-of-state or more than 30–45 minutes from your home</li>
        <li>You have a demanding job or other obligations that limit your availability</li>
        <li>You own 3+ properties and the management workload is becoming significant</li>
        <li>You want to treat your portfolio as a truly passive investment</li>
      </ul>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Finding a Property Manager</p>
            <p className="text-gray-400 text-xs mt-0.5">How to interview, hire, and work with a property management company</p>
          </div>
        </div>
        <Link
          to="/learn/finding-a-property-manager"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Read Article
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Scaling Your Portfolio</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        One property builds cash flow. A portfolio of 5–10 properties builds wealth that can replace a salary. Scaling requires:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Systems and Processes</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Document your tenant screening criteria, lease clauses, move-in checklist, and maintenance response procedures. Consistent systems prevent costly mistakes as your portfolio grows.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cash Flow Reinvestment</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Every dollar of cash flow reinvested into maintenance reserves and future down payments accelerates your next acquisition. Resist the temptation to spend cash flow early in your portfolio-building phase.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Equity Harvesting</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        As properties appreciate, equity builds. Cash-out refinances and HELOCs (Home Equity Lines of Credit) allow you to access that equity for new acquisitions without selling. This is how experienced investors scale from 3 properties to 10 without needing proportionally more new savings.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Track Your Portfolio Performance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        As your portfolio grows, tracking performance across multiple properties becomes essential. The Portfolio Analyzer lets you monitor cash flow, equity, and return metrics across all your properties in one view.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <BarChart2 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Portfolio Analyzer</p>
            <p className="text-gray-400 text-xs mt-0.5">Monitor cash flow, equity, and returns across your entire portfolio</p>
          </div>
        </div>
        <Link
          to="/tools/portfolio_analyzer"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <p className="text-gray-300 leading-relaxed">
        You've now covered the full arc of rental property investing — from understanding why it builds wealth, to choosing markets, analyzing deals, securing financing, and managing your portfolio for the long term. The investors who succeed in this asset class are not the ones who know the most — they're the ones who take consistent, disciplined action. Go find your first deal.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Adquirir una propiedad de alquiler es un hito, pero es la gestión continua lo que determina si realmente genera riqueza. Esta lección final cubre los fundamentos de la gestión de alquileres a largo plazo, desde colocar a tu primer inquilino hasta escalar una cartera de múltiples propiedades.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Selección de Inquilinos: Tu Decisión Más Importante</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un mal inquilino cuesta más que la vacante. Los procedimientos de desalojo pueden tardar 60–180 días, y el costo total de un solo mal inquilino puede alcanzar fácilmente $10,000–$20,000. Evalúa a cada solicitante usando los mismos criterios objetivos aplicados de manera consistente:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Verificación de Ingresos</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Requisito estándar: ingresos mensuales brutos de al menos 3× la renta mensual. Si la renta es $1,500, el inquilino debe ganar al menos $4,500/mes brutos.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Reporte de Crédito</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Obtén un reporte de crédito completo a través de un servicio de selección de inquilinos. Busca: puntaje de crédito 620+, desalojos previos (descalificación automática para la mayoría), patrones de pagos atrasados y saldos de servicios pendientes.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Historial de Alquiler</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Contacta directamente a los propietarios anteriores. Pregunta: ¿Pagaron a tiempo? ¿Dieron el aviso apropiado? ¿Volvería a alquilarles? Una vacilación o respuesta vaga a esa última pregunta te dice todo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Contrato de Arrendamiento: Protegiendo tu Activo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un contrato de arrendamiento legalmente sólido es tu primera línea de protección legal. Cada contrato debe cubrir claramente: monto de renta, fecha de vencimiento, política de mascotas, responsabilidades de mantenimiento, política de fumadores, y condiciones de terminación anticipada.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Plantilla de Contrato de Arrendamiento</p>
            <p className="text-gray-400 text-xs mt-0.5">Plantilla personalizable con todas las cláusulas esenciales incluidas</p>
          </div>
        </div>
        <Link
          to="/templates/lease-agreement"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Ver Plantilla
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Auto-Gestión vs. Contratar un Administrador</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La auto-gestión ahorra dinero (típicamente 8–12% de la renta mensual), pero cuesta tiempo. Considera contratar un administrador de propiedades si posees propiedades fuera del estado, tienes un trabajo exigente que limita tu disponibilidad, o tienes 3+ propiedades con una carga de trabajo significativa.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Encontrar un Administrador de Propiedades</p>
            <p className="text-gray-400 text-xs mt-0.5">Cómo entrevistar, contratar y trabajar con una empresa de administración</p>
          </div>
        </div>
        <Link
          to="/learn/finding-a-property-manager"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Leer Artículo
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Escalar tu Cartera</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Reinversión del Flujo de Efectivo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cada dólar de flujo de efectivo reinvertido en reservas de mantenimiento y enganches futuros acelera tu próxima adquisición.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cosecha de Capital</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A medida que las propiedades se aprecian, se acumula capital. Los refinanciamientos con extracción de efectivo y las líneas de crédito de capital (HELOC) te permiten acceder a ese capital para nuevas adquisiciones sin vender.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Monitorea el Rendimiento de tu Cartera</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A medida que tu cartera crece, rastrear el rendimiento en múltiples propiedades es esencial. El Analizador de Cartera te permite monitorear el flujo de efectivo, el capital y las métricas de retorno en todas tus propiedades en una vista.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <BarChart2 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Analizador de Cartera</p>
            <p className="text-gray-400 text-xs mt-0.5">Monitorea flujo de efectivo, capital y retornos en toda tu cartera</p>
          </div>
        </div>
        <Link
          to="/tools/portfolio_analyzer"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <p className="text-gray-300 leading-relaxed">
        Ya has cubierto el arco completo de la inversión en propiedades de alquiler — desde entender por qué genera riqueza, hasta elegir mercados, analizar negocios, asegurar financiamiento y gestionar tu cartera a largo plazo. Los inversores que triunfan no son los que más saben — son los que toman acción consistente y disciplinada. Ve a encontrar tu primer negocio.
      </p>
    </div>
  )
}

export function RWLesson5() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
