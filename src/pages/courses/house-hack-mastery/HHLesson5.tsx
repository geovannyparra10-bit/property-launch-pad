import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        You've bought your house hack. Keys are in hand. Now the real work begins — and if you do this part well, it's not much work at all. Effective property management starts before you sign a lease and continues with systems that run quietly in the background. Here's how to set yourself up for a smooth first year.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Landlord-Occupant Mindset Shift</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Living on-site is both your greatest advantage and your greatest challenge. The advantage: you'll catch maintenance issues early, you can show units immediately, and you'll have a firsthand read on how the property operates. The challenge: you're always "on." A tenant who sees you daily might feel comfortable knocking on your door at 9pm about a squeaky faucet.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The solution is clear boundaries from day one. In your lease agreement, specify the exact process for maintenance requests (a written request via email or a designated phone number). State your response times. Make it clear that non-emergency issues should not result in a knock on your door. This isn't unfriendly — it's professional, and it sets the tone for the entire tenancy.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        The best landlord-occupant relationships are pleasant but professional. You can be warm and approachable without being your tenants' friend. Friendship blurs boundaries; professionalism protects everyone.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tenant Screening: Your Most Important Decision</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        More house hacks fail because of bad tenants than bad properties. A single bad tenant can cost you thousands in unpaid rent, damages, eviction fees, and the emotional toll of months of conflict. Your screening process is your first — and best — line of defense.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Set Consistent Criteria in Advance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before you advertise the unit, write down your exact qualification criteria. Fair housing laws require that you apply these criteria consistently to every applicant. Your criteria might include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Income:</strong> Gross monthly income must be at least 2.5–3x the monthly rent</li>
        <li><strong className="text-white">Credit:</strong> Minimum credit score of 600 (or your chosen threshold)</li>
        <li><strong className="text-white">Rental history:</strong> No evictions in the past 5 years; verifiable previous rental references</li>
        <li><strong className="text-white">Employment:</strong> Stable employment history for at least 6 months with the current employer</li>
        <li><strong className="text-white">Background:</strong> No violent felonies (follow your local fair housing guidelines on criminal history)</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">The Screening Process</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Run every applicant through the same process: application form, credit check, background check, income verification, and landlord reference calls. Use a paid screening service (Avail, TurboTenant, or similar) that generates a standardized report. These services are inexpensive ($30–$50 per application) and worth every cent.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Always call previous landlords — not just the current one (who may just want the tenant to leave). Ask: "Would you rent to this person again?" A moment of hesitation before "yes" tells you everything.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Lease Agreement</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Use a state-specific lease template (not a generic internet download) and have it reviewed by a local real estate attorney at least once. Key clauses to include:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Rent amount, due date, and grace period (typically 3–5 days)</li>
        <li>Late fee amount and when it triggers</li>
        <li>Maintenance request procedure (written requests only, non-emergency timeline)</li>
        <li>No-smoking and pet policies (be explicit; vague policies cause disputes)</li>
        <li>Quiet hours (especially important as an owner-occupant)</li>
        <li>Notice requirements for entry (typically 24–48 hours per state law)</li>
        <li>Lease renewal terms and rent increase notification timeline</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Handling Maintenance Like a Pro</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The fastest way to lose a good tenant is to ignore maintenance requests. Respond to every request within 24 hours (even if just to acknowledge receipt and set a timeline). Address non-emergency repairs within 7 days. For emergencies (no heat, burst pipes, electrical hazards), respond immediately.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Build a network of reliable contractors before you need them: a plumber, an electrician, an HVAC technician, and a general handyman. Get their numbers now. A good contractor at 9pm on a Saturday is worth their weight in gold.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Track every expense in a spreadsheet or property management software (Avail, TurboTenant, Stessa are all free or low-cost). This data is invaluable for tax purposes and for evaluating the property's long-term performance.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">When to Consider a Property Manager</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most house hackers self-manage for the first 1–2 years. The savings are real: 8–12% of rent per month adds up significantly. But as you scale, professional management becomes essential.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you're preparing to move out of your house hack and purchase your next property, you may want to transition the management of the first property to a professional. This frees up your attention for the next deal and ensures your first investment runs on systems, not on your personal presence.
      </p>

      <div className="my-8 p-5 bg-gray-800 border border-gray-700 rounded-2xl flex flex-col sm:flex-row items-start gap-4">
        <ExternalLink className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold mb-1">Further Reading</p>
          <p className="text-gray-400 text-sm mb-3">Our full guide on finding, vetting, and hiring a property manager — including a 20-question interview checklist.</p>
          <Link
            to="/learn/finding-a-property-manager"
            className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
          >
            How to Find and Vet a Property Manager →
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The 90-Day Milestone</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you started this course with a deal in mind and followed the framework — self-assessment, property search, financial analysis, financing, and management systems — you are ready to move. Most first-time house hackers who take deliberate action close their deal within 60–90 days of starting the search.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The 90-day timeline isn't a guarantee. Markets move differently. Some deals fall through. But the investors who close quickly share one trait: they do the analysis work first so that when the right property appears, they can act without hesitation. That's what this course has prepared you to do.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Congratulations on completing House Hack Mastery. Your next step is to apply these lessons to a real property in your target market. The House Hack Calculator, Mortgage Calculator, and all the tools on this platform are here to support your analysis every step of the way.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Compraste tu house hack. Las llaves están en tu mano. Ahora comienza el trabajo real — y si haces esta parte bien, no es mucho trabajo en absoluto. La gestión efectiva de propiedades comienza antes de firmar un contrato de arrendamiento.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Cambio de Mentalidad del Arrendador-Ocupante</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Vivir en el lugar es tu mayor ventaja y tu mayor desafío. La solución son límites claros desde el primer día. En tu contrato de arrendamiento, especifica el proceso exacto para las solicitudes de mantenimiento. La mejor relación arrendador-ocupante es agradable pero profesional.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Selección de Inquilinos: Tu Decisión Más Importante</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Más house hacks fracasan por malos inquilinos que por malas propiedades. Tus criterios podrían incluir:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Ingresos:</strong> Ingreso mensual bruto de al menos 2.5–3x el alquiler mensual</li>
        <li><strong className="text-white">Crédito:</strong> Puntaje mínimo de 600</li>
        <li><strong className="text-white">Historial de alquiler:</strong> Sin desalojos en los últimos 5 años</li>
        <li><strong className="text-white">Empleo:</strong> Historial de empleo estable por al menos 6 meses</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Siempre llama a los arrendadores anteriores. Pregunta: "¿Le volvería a alquilar a esta persona?" Un momento de duda antes del "sí" te dice todo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Manejo del Mantenimiento Como un Profesional</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La forma más rápida de perder un buen inquilino es ignorar las solicitudes de mantenimiento. Responde a cada solicitud dentro de las 24 horas. Para emergencias (sin calefacción, tuberías reventadas, peligros eléctricos), responde inmediatamente.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Construye una red de contratistas confiables antes de necesitarlos: un plomero, un electricista, un técnico de HVAC y un mantenimiento general.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Cuándo Considerar un Administrador de Propiedades</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mayoría de los house hackers se auto-administran los primeros 1–2 años. Pero al escalar, la gestión profesional se vuelve esencial.
      </p>

      <div className="my-8 p-5 bg-gray-800 border border-gray-700 rounded-2xl flex flex-col sm:flex-row items-start gap-4">
        <ExternalLink className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold mb-1">Lectura Adicional</p>
          <p className="text-gray-400 text-sm mb-3">Nuestra guía completa para encontrar, evaluar y contratar un administrador de propiedades.</p>
          <Link
            to="/learn/finding-a-property-manager"
            className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
          >
            Cómo Encontrar y Evaluar un Administrador de Propiedades →
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Hito de los 90 Días</h2>
      <p className="text-gray-300 leading-relaxed">
        Si comenzaste este curso con un negocio en mente y seguiste el marco — autoevaluación, búsqueda de propiedad, análisis financiero, financiamiento y sistemas de gestión — estás listo para actuar. ¡Felicidades por completar el Dominio del House Hack!
      </p>
    </div>
  )
}

export function HHLesson5() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
