import { useState } from 'react'
import { FileDown, Crown, ClipboardList } from 'lucide-react'
import { ArticleLayout, ArticleDisclaimer } from '../../components/ArticleLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { PremiumFeatureModal } from '../../components/PremiumFeatureModal'
import { getPaymentLink } from '../../lib/paymentLink'

const CHECKLIST_EN = [
  { n: 1, q: 'How many units do you currently manage?' },
  { n: 2, q: 'What is your complete fee structure (management fee, leasing fee, renewal fee, maintenance markup)?' },
  { n: 3, q: 'How do you handle maintenance requests — what is your process from tenant report to resolution?' },
  { n: 4, q: 'What is your current vacancy rate across your portfolio?' },
  { n: 5, q: 'How do you screen tenants (credit, background, income verification)?' },
  { n: 6, q: 'How do you handle the eviction process — who manages it and who pays legal costs?' },
  { n: 7, q: 'Can you provide 3–5 references from current landlord clients?' },
  { n: 8, q: 'Are you a licensed property manager in this state?' },
  { n: 9, q: 'What insurance do you carry (E&O, general liability)?' },
  { n: 10, q: 'How often do you conduct property inspections, and do you provide photos?' },
  { n: 11, q: 'What is your lease renewal process — do you recommend rent increases?' },
  { n: 12, q: 'How do you handle late payments — what is your collection process?' },
  { n: 13, q: 'How do you communicate with owners — how often and through what channels?' },
  { n: 14, q: 'Do you offer an online owner portal for reports, statements, and documents?' },
  { n: 15, q: 'What is your contract termination policy — is there a penalty to cancel?' },
  { n: 16, q: 'How do you handle after-hours emergency repairs?' },
  { n: 17, q: 'What is your average time to fill a vacancy in this market?' },
  { n: 18, q: 'Do you have experience managing properties similar to mine (SFR, multifamily, commercial)?' },
  { n: 19, q: 'What accounting reports do I receive and how frequently?' },
  { n: 20, q: 'How do you handle security deposits — how are they held and returned?' },
]

const CHECKLIST_ES = [
  { n: 1, q: '¿Cuántas unidades administra actualmente?' },
  { n: 2, q: '¿Cuál es su estructura de tarifas completa (tarifa de administración, tarifa de arrendamiento, tarifa de renovación, recargo de mantenimiento)?' },
  { n: 3, q: '¿Cómo maneja las solicitudes de mantenimiento — cuál es su proceso desde el reporte del inquilino hasta la resolución?' },
  { n: 4, q: '¿Cuál es su tasa de vacante actual en toda su cartera?' },
  { n: 5, q: '¿Cómo evalúa a los inquilinos (crédito, antecedentes, verificación de ingresos)?' },
  { n: 6, q: '¿Cómo maneja el proceso de desalojo — quién lo gestiona y quién paga los costos legales?' },
  { n: 7, q: '¿Puede proporcionar 3–5 referencias de propietarios clientes actuales?' },
  { n: 8, q: '¿Tiene licencia de administrador de propiedades en este estado?' },
  { n: 9, q: '¿Qué seguro tiene (errores y omisiones, responsabilidad general)?' },
  { n: 10, q: '¿Con qué frecuencia realiza inspecciones de propiedades y proporciona fotografías?' },
  { n: 11, q: '¿Cuál es su proceso de renovación de contratos — recomienda aumentos de renta?' },
  { n: 12, q: '¿Cómo maneja los pagos tardíos — cuál es su proceso de cobro?' },
  { n: 13, q: '¿Cómo se comunica con los propietarios — con qué frecuencia y a través de qué canales?' },
  { n: 14, q: '¿Ofrece un portal en línea para propietarios con reportes, estados de cuenta y documentos?' },
  { n: 15, q: '¿Cuál es su política de terminación de contrato — hay penalización por cancelar?' },
  { n: 16, q: '¿Cómo maneja las reparaciones de emergencia fuera del horario laboral?' },
  { n: 17, q: '¿Cuál es su tiempo promedio para llenar una vacante en este mercado?' },
  { n: 18, q: '¿Tiene experiencia administrando propiedades similares a la mía (unifamiliar, multifamiliar, comercial)?' },
  { n: 19, q: '¿Qué reportes contables recibo y con qué frecuencia?' },
  { n: 20, q: '¿Cómo maneja los depósitos en garantía — cómo se guardan y se devuelven?' },
]

const PRINT_STYLES = `
  @media print {
    body * { visibility: hidden !important; }
    #pm-checklist-print, #pm-checklist-print * { visibility: visible !important; }
    #pm-checklist-print {
      position: absolute; left: 0; top: 0; width: 100%;
      font-family: 'Times New Roman', serif;
      font-size: 12px;
      color: #000;
      padding: 24px;
    }
    .pm-print-title { font-size: 18px; font-weight: bold; margin-bottom: 6px; text-align: center; }
    .pm-print-subtitle { font-size: 12px; text-align: center; color: #555; margin-bottom: 24px; }
    .pm-print-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px; }
    .pm-print-num { font-weight: bold; min-width: 24px; }
    .pm-print-q { flex: 1; line-height: 1.5; }
    .pm-print-notes { width: 180px; border-bottom: 1px solid #aaa; margin-top: 12px; font-size: 10px; color: #888; }
    @page { margin: 20mm; }
  }
`

function ChecklistSection() {
  const { language } = useLanguage()
  const { profile } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const isPremium = profile?.subscription_status === 'active'
  const list = language === 'en' ? CHECKLIST_EN : CHECKLIST_ES

  const handlePrint = () => {
    if (!isPremium) { setShowModal(true); return }
    window.print()
  }

  const titleEn = 'Property Manager Interview Checklist'
  const titleEs = 'Lista de Verificación para Entrevistar al Administrador de Propiedades'
  const subtitleEn = '20 Questions to Ask Before Signing a Management Agreement'
  const subtitleEs = '20 Preguntas Que Hacer Antes de Firmar un Contrato de Administración'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      <div className="mt-14 bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <ClipboardList className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {language === 'en' ? titleEn : titleEs}
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                {language === 'en' ? subtitleEn : subtitleEs}
              </p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              isPremium
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            {isPremium ? (
              <>
                <FileDown className="h-4 w-4" />
                {language === 'en' ? 'Download Checklist PDF' : 'Descargar Lista PDF'}
              </>
            ) : (
              <>
                <Crown className="h-4 w-4" />
                {language === 'en' ? 'Upgrade to Download PDF' : 'Actualizar para Descargar PDF'}
              </>
            )}
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {list.map((item) => (
              <div
                key={item.n}
                className="flex items-start gap-4 p-4 bg-gray-750 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                style={{ backgroundColor: 'rgba(30,41,59,0.5)' }}
              >
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs">
                  {item.n}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed pt-0.5">{item.q}</p>
              </div>
            ))}
          </div>
        </div>

        {!isPremium && (
          <div className="px-6 pb-5">
            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <Crown className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-300 text-sm">
                {language === 'en'
                  ? <>Upgrade to Premium to download a clean, printable PDF of this checklist with space for notes. <a href={getPaymentLink()} className="underline hover:text-amber-200">Upgrade now.</a></>
                  : <>Actualice a Premium para descargar un PDF imprimible con espacio para notas. <a href={getPaymentLink()} className="underline hover:text-amber-200">Actualizar ahora.</a></>
                }
              </p>
            </div>
          </div>
        )}
      </div>

      <div id="pm-checklist-print" style={{ display: 'none' }}>
        <div className="pm-print-title">{language === 'en' ? titleEn : titleEs}</div>
        <div className="pm-print-subtitle">{language === 'en' ? subtitleEn : subtitleEs}</div>
        {list.map((item) => (
          <div key={item.n} className="pm-print-row">
            <span className="pm-print-num">{item.n}.</span>
            <div style={{ flex: 1 }}>
              <div className="pm-print-q">{item.q}</div>
              <div className="pm-print-notes">{language === 'en' ? 'Notes:' : 'Notas:'} _______________________________</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 24, fontSize: 10, color: '#888', borderTop: '1px solid #ccc', paddingTop: 10 }}>
          {language === 'en'
            ? 'This checklist is for educational purposes only. It is not a substitute for legal or professional advice.'
            : 'Esta lista es solo para fines educativos. No sustituye el asesoramiento legal o profesional.'}
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureName={language === 'en' ? 'Checklist PDF Download' : 'Descarga de Lista PDF'}
      />
    </>
  )
}

function EnglishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Owning rental property from a distance — or simply wanting to reclaim your time — means one thing: you need a great property manager. The right one will protect your asset, keep tenants happy, and deposit clean monthly statements into your account. The wrong one will bleed your cash flow, ignore your property, and create legal liability you never saw coming.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Do You Actually Need a Property Manager?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Not every landlord needs professional management, but most benefit from it at some point. Ask yourself honestly:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Do you have more than 3–5 rental units? Managing multiple properties is a part-time job that quickly becomes full-time.</li>
        <li>Do you live more than 30 minutes from your rental property? Distance makes maintenance coordination, showings, and emergency responses brutal.</li>
        <li>Are you uncomfortable with tenant confrontations, evictions, or legal notices? These require confidence and local knowledge.</li>
        <li>Do you have a demanding day job or prefer a passive investment model? If your time is worth more than the management fee, outsource it.</li>
        <li>Are you unfamiliar with fair housing laws, local landlord-tenant statutes, or security deposit regulations? Non-compliance is expensive.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        If you answered yes to any two of the above, professional management is worth serious consideration. The typical management fee of 8–12% of collected rent is often far less costly than the mistakes, vacancies, and time drain of self-managing.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where to Find Property Managers</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Finding candidates isn't hard — finding qualified ones requires targeting the right sources:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. National Association of Residential Property Managers (NARPM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        NARPM is the gold standard. Its members abide by a code of ethics and many hold designations like RMP (Residential Management Professional) or MPM (Master Property Manager). The NARPM directory at narpm.org allows you to search by location and find credentialed professionals.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Local Real Estate Investor Associations (REIAs)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        REIAs are communities of local investors who share referrals constantly. Attend a meeting (most cities have monthly meetups) and ask which property managers the experienced landlords in the room trust. Peer recommendations from battle-tested investors carry enormous weight.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Referrals from Real Estate Agents</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Investors' agents often work closely with property managers. Ask your buying agent who they refer clients to — they have direct feedback on how those managers perform after the sale.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Online Platforms</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Sites like All Property Management (allpropertymanagement.com) and Buildium's marketplace aggregate local managers with reviews. While you'll still need to vet them independently, these platforms are useful for building an initial list. Google searches for "[city] property management companies" combined with reading Google and Yelp reviews can surface red flags quickly.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Understanding Property Management Fee Structures</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Fee structures vary widely, and the stated management percentage is rarely the full picture. Understanding every line item before you sign is critical.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Monthly Management Fee</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The core fee, typically <strong className="text-white">8–12% of collected rent</strong>. Smaller portfolios often land at the top of this range; larger or multi-family portfolios may negotiate lower. Note the word "collected" — some managers charge on gross rent (whether paid or not), which is a red flag you must avoid. Always confirm the fee applies only to rent actually received.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Leasing / Placement Fee</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Charged when a new tenant is placed — typically <strong className="text-white">50–100% of one month's rent</strong>. This incentivizes the manager to fill vacancies quickly but can also incentivize churning tenants for repeat fees. Ask about their tenant retention strategy.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Lease Renewal Fee</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Some managers charge $100–$300 per lease renewal. This is a legitimate fee for administrative work, but it can add up. Negotiate a cap or have it waived if you're providing a substantial portfolio.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Maintenance Markup</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Many managers add a <strong className="text-white">10–20% markup</strong> on maintenance costs — this is how they make money on repairs beyond the management fee. It's standard practice but needs to be disclosed. Ask explicitly: "Do you mark up maintenance invoices, and by how much?" Some managers have preferred vendor relationships that also generate referral fees.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Vacancy Fee</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A monthly flat fee charged even when the unit is vacant. This should be eliminated or significantly reduced — why pay full management fees when there's nothing to manage?
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Setup and Onboarding Fee</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A one-time fee of $100–$300 to set up your account, transfer leases, and onboard existing tenants. It's reasonable but worth negotiating away, especially if you're bringing multiple units.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Red Flags to Watch Out For</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The property management industry has low barriers to entry in many states, which means bad actors exist. Watch for these warning signs:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">No NARPM membership or state license</strong> — In most states, property managers handling rent must be licensed real estate brokers or agents. Verify licensure with your state's real estate commission.</li>
        <li><strong className="text-white">Vague or verbal-only fee agreements</strong> — Everything must be in writing. If a manager hesitates to put fees in a contract, walk away.</li>
        <li><strong className="text-white">No online portal or digital reporting</strong> — Modern property management runs on software like AppFolio, Buildium, or Propertyware. Managers still doing everything by phone and spreadsheet are a liability.</li>
        <li><strong className="text-white">Can't provide references</strong> — A manager with satisfied clients will happily give you 3+ references. If they stall or give excuses, treat that as a serious warning.</li>
        <li><strong className="text-white">Too many properties per staff member</strong> — One manager handling 200+ units alone is overextended. Ask about their team structure and staff-to-unit ratio.</li>
        <li><strong className="text-white">Charges gross rent (not collected rent)</strong> — You should never pay a management fee on rent the tenant didn't pay. This practice is exploitative and signals misaligned incentives.</li>
        <li><strong className="text-white">Long, penalty-heavy cancellation clauses</strong> — A 90-day notice requirement with penalties is excessive. Aim for 30 days with no cancellation fee, or a short-term penalty that decreases over time.</li>
        <li><strong className="text-white">High current vacancy rates</strong> — Ask directly what their portfolio vacancy rate is. Compare it to the local market average. Excessive vacancy is a leading indicator of poor leasing execution.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What to Look For in a Management Contract</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The management agreement is a legally binding contract. Read every clause carefully and engage a real estate attorney if anything is unclear. Key terms to scrutinize:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Maintenance Authorization Threshold</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most contracts allow the manager to authorize repairs up to a certain amount without owner approval — typically <strong className="text-white">$200–$500</strong>. For emergencies (burst pipe, HVAC failure), you'll want to grant higher authority. But the general threshold should match your comfort level. Set it too low and you'll be bombarded with calls; set it too high and surprises show up in your statement.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Owner Disbursement Schedule</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        When do you get paid? Industry standard is disbursement between the <strong className="text-white">15th and 20th of each month</strong> after tenant rent is collected. Ask about their reconciliation process and what happens if there's a hold on funds due to maintenance.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Eviction Handling</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        How are evictions managed? Who pays filing fees, court costs, and attorney fees? Some managers handle evictions in-house and charge a flat fee ($300–$500); others coordinate through an outside attorney. Clarify this before you're in the middle of one.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Exclusive vs. Non-Exclusive Agreement</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        An exclusive management agreement means you cannot hire another manager or lease the property yourself. Non-exclusive agreements exist but are rare. If you sign exclusive, make sure the cancellation terms are reasonable so you're not locked in indefinitely.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Liability and Indemnification</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The contract will limit the manager's liability for errors and require you to indemnify them in certain situations. This is standard, but ensure you understand exactly what you're responsible for and that the manager carries errors & omissions (E&O) insurance to cover their own negligence.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Evaluating Multiple Bids</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Never hire the first manager you speak to. Interview at least three candidates. When comparing proposals, don't just compare the headline percentage — create a total cost comparison that includes all fees across a 12-month period assuming typical scenarios (one lease renewal, one maintenance issue, one turnover).
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        A manager at 8% who charges 100% of first month's rent for placement, a $300 renewal fee, and a 15% maintenance markup may cost significantly more over the year than a manager at 10% with no placement fee, $100 renewals, and no markup. Do the math.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Also evaluate responsiveness during the sales process. If a company takes 3 days to return your call when they're trying to win your business, imagine how quickly they'll respond to a 2 a.m. emergency call from your tenant. The sales experience predicts the service experience.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Building a Long-Term Relationship</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The best landlord-PM relationships are partnerships. Once you've hired someone good, invest in the relationship. Respond to their communications quickly, approve reasonable maintenance requests promptly, and don't nickel-and-dime repairs on a $2,000/month rental. A well-maintained property attracts and retains better tenants, which is worth more than any management fee savings.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Review your management statements monthly and your property annually. Set KPIs you care about: vacancy days, time to resolve maintenance requests, rent collection rate, tenant turnover frequency. A great manager will welcome this accountability; a bad one will resent it.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Ask for annual performance reviews and use that conversation to discuss rent increases, capital improvements, and portfolio expansion. The best property managers become trusted advisors who help you grow — not just people who collect checks on your behalf.
      </p>
    </div>
  )
}

function SpanishContent() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Poseer propiedades de alquiler desde lejos — o simplemente querer recuperar su tiempo — significa una sola cosa: necesita un excelente administrador de propiedades. El correcto protegerá su activo, mantendrá a los inquilinos satisfechos y depositará estados de cuenta mensuales claros en su cuenta. El equivocado drenará su flujo de caja, descuidará su propiedad y creará responsabilidades legales que nunca anticipó.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">¿Realmente Necesita un Administrador de Propiedades?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        No todo arrendador necesita administración profesional, pero la mayoría se beneficia de ella en algún momento. Pregúntese honestamente:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>¿Tiene más de 3–5 unidades de alquiler? Administrar múltiples propiedades es un trabajo de medio tiempo que rápidamente se convierte en tiempo completo.</li>
        <li>¿Vive a más de 30 minutos de su propiedad de alquiler? La distancia hace que la coordinación de mantenimiento, las visitas y las respuestas de emergencia sean muy difíciles.</li>
        <li>¿Se siente incómodo con confrontaciones con inquilinos, desalojos o avisos legales? Estos requieren confianza y conocimiento local.</li>
        <li>¿Tiene un trabajo exigente o prefiere un modelo de inversión pasiva? Si su tiempo vale más que la tarifa de administración, subcontrate.</li>
        <li>¿Desconoce las leyes de vivienda justa, los estatutos locales de arrendador-arrendatario o los reglamentos de depósitos en garantía? El incumplimiento es costoso.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Si respondió sí a dos o más de las anteriores, la administración profesional merece consideración seria. La tarifa de administración típica del 8–12% de la renta cobrada suele ser mucho menos costosa que los errores, las vacantes y el tiempo perdido al auto-administrar.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Dónde Encontrar Administradores de Propiedades</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Encontrar candidatos no es difícil — encontrar candidatos calificados requiere enfocarse en las fuentes correctas:
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">1. Asociación Nacional de Administradores de Propiedades Residenciales (NARPM)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        NARPM es el estándar de oro. Sus miembros adhieren a un código de ética y muchos tienen designaciones como RMP (Profesional de Administración Residencial) o MPM (Maestro en Administración de Propiedades). El directorio de NARPM en narpm.org permite buscar por ubicación y encontrar profesionales acreditados.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">2. Asociaciones Locales de Inversores en Bienes Raíces (REIAs)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las REIAs son comunidades de inversores locales que comparten referencias constantemente. Asista a una reunión (la mayoría de las ciudades tienen reuniones mensuales) y pregunte en qué administradores de propiedades confían los arrendadores experimentados de la sala.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">3. Referencias de Agentes Inmobiliarios</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los agentes de inversores trabajan estrechamente con administradores de propiedades. Pregúntele a su agente de compra a quién refiere a sus clientes — tienen retroalimentación directa sobre cómo se desempeñan esos administradores después de la venta.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">4. Plataformas en Línea</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Sitios como All Property Management y el mercado de Buildium agrupan administradores locales con reseñas. Aunque igual necesitará evaluarlos de forma independiente, estas plataformas son útiles para crear una lista inicial. Las búsquedas en Google de "administración de propiedades en [ciudad]" combinadas con la lectura de reseñas de Google y Yelp pueden revelar señales de alerta rápidamente.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Entendiendo las Estructuras de Tarifas</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las estructuras de tarifas varían ampliamente, y el porcentaje de administración declarado rara vez es el cuadro completo. Entender cada elemento antes de firmar es fundamental.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Tarifa de Administración Mensual</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        La tarifa principal, normalmente del <strong className="text-white">8–12% de la renta cobrada</strong>. Las carteras más pequeñas suelen estar en el extremo superior de este rango; las carteras más grandes o multifamiliares pueden negociar porcentajes más bajos. Note la palabra "cobrada" — algunos administradores cobran sobre la renta bruta (cobrada o no), lo cual es una señal de alerta que debe evitar.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Tarifa de Arrendamiento / Colocación</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Se cobra cuando se coloca un nuevo inquilino — normalmente del <strong className="text-white">50–100% de un mes de renta</strong>. Esto incentiva al administrador a llenar las vacantes rápidamente, pero también puede incentivar la rotación de inquilinos para cobrar tarifas repetidas. Pregunte sobre su estrategia de retención de inquilinos.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Tarifa de Renovación de Contrato</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Algunos administradores cobran $100–$300 por cada renovación de contrato. Es una tarifa legítima por trabajo administrativo, pero puede sumarse. Negocie un límite máximo o que sea eliminada si aporta una cartera sustancial.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Recargo de Mantenimiento</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Muchos administradores agregan un <strong className="text-white">recargo del 10–20%</strong> sobre los costos de mantenimiento. Es una práctica estándar pero debe ser divulgada. Pregunte explícitamente: "¿Recarga las facturas de mantenimiento y en cuánto?" Algunos administradores tienen relaciones con proveedores preferidos que también generan honorarios de referencia.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Tarifa por Vacante</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una tarifa mensual fija cobrada incluso cuando la unidad está vacante. Esto debe eliminarse o reducirse significativamente — ¿por qué pagar tarifas de administración completas cuando no hay nada que administrar?
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Señales de Alerta que Debe Vigilar</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8 ml-4">
        <li><strong className="text-white">Sin membresía en NARPM ni licencia estatal</strong> — En la mayoría de los estados, los administradores de propiedades que manejan rentas deben ser corredores o agentes inmobiliarios con licencia.</li>
        <li><strong className="text-white">Acuerdos de tarifas vagos o solo verbales</strong> — Todo debe estar por escrito. Si un administrador duda en plasmar las tarifas en un contrato, retírese.</li>
        <li><strong className="text-white">Sin portal en línea ni informes digitales</strong> — La administración moderna funciona con software. Los administradores que siguen haciendo todo por teléfono y hojas de cálculo son una responsabilidad.</li>
        <li><strong className="text-white">No puede proporcionar referencias</strong> — Un administrador con clientes satisfechos le dará de inmediato 3+ referencias. Si titubea o pone excusas, trátelo como una señal de advertencia seria.</li>
        <li><strong className="text-white">Demasiadas propiedades por miembro del personal</strong> — Un administrador manejando 200+ unidades solo está sobrecargado.</li>
        <li><strong className="text-white">Cobra renta bruta (no renta cobrada)</strong> — Nunca debería pagar una tarifa de administración sobre renta que el inquilino no pagó.</li>
        <li><strong className="text-white">Cláusulas de cancelación largas con penalizaciones severas</strong> — Un período de aviso de 90 días con penalizaciones es excesivo. Apunte a 30 días sin tarifa de cancelación.</li>
        <li><strong className="text-white">Altas tasas de vacante actuales</strong> — Pregunte directamente cuál es la tasa de vacante de su cartera. Compárela con el promedio del mercado local.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Qué Buscar en un Contrato de Administración</h2>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Umbral de Autorización de Mantenimiento</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        La mayoría de los contratos permiten al administrador autorizar reparaciones hasta cierta cantidad sin aprobación del propietario — típicamente <strong className="text-white">$200–$500</strong>. El umbral general debe coincidir con su nivel de comodidad.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Calendario de Desembolso al Propietario</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        ¿Cuándo le pagan? El estándar de la industria es el desembolso entre el <strong className="text-white">15 y el 20 de cada mes</strong> después de que se cobra la renta del inquilino.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Manejo de Desalojos</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        ¿Cómo se gestionan los desalojos? ¿Quién paga los honorarios de presentación, costos judiciales y honorarios de abogados? Aclare esto antes de estar en medio de uno.
      </p>

      <h3 className="text-xl font-semibold text-blue-400 mt-6 mb-3">Responsabilidad e Indemnización</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El contrato limitará la responsabilidad del administrador por errores. Asegúrese de entender exactamente de qué es responsable usted y de que el administrador tenga un seguro de errores y omisiones para cubrir su propia negligencia.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Evaluando Múltiples Propuestas</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nunca contrate al primer administrador con el que hable. Entreviste al menos a tres candidatos. Al comparar propuestas, no solo compare el porcentaje principal — cree una comparación de costo total que incluya todas las tarifas durante un período de 12 meses.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Un administrador al 8% que cobra el 100% del primer mes de renta por colocación, una tarifa de renovación de $300 y un recargo de mantenimiento del 15% puede costar significativamente más durante el año que un administrador al 10% sin tarifa de colocación, renovaciones de $100 y sin recargo. Haga los cálculos.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        También evalúe la capacidad de respuesta durante el proceso de venta. Si una empresa tarda 3 días en devolverle la llamada cuando están intentando ganar su negocio, imagine qué tan rápido responderán a una llamada de emergencia a las 2 a.m. de su inquilino.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Construyendo una Relación a Largo Plazo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Las mejores relaciones propietario-administrador son asociaciones. Una vez que haya contratado a alguien bueno, invierta en la relación. Responda rápidamente a sus comunicaciones, apruebe solicitudes de mantenimiento razonables con prontitud y no escatime en reparaciones en una propiedad que genera $2,000/mes.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Revise sus estados de cuenta de administración mensualmente y su propiedad anualmente. Establezca KPIs que le importen: días de vacante, tiempo para resolver solicitudes de mantenimiento, tasa de cobro de renta, frecuencia de rotación de inquilinos.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Solicite revisiones anuales de desempeño y use esa conversación para discutir aumentos de renta, mejoras de capital y expansión de cartera. Los mejores administradores de propiedades se convierten en asesores de confianza que lo ayudan a crecer — no solo en personas que cobran cheques en su nombre.
      </p>
    </div>
  )
}

export function FindingAPropertyManager() {
  const { language } = useLanguage()

  return (
    <ArticleLayout
      titleEn="How to Find and Vet a Property Manager: The Complete Guide"
      titleEs="Cómo Encontrar y Evaluar un Administrador de Propiedades: La Guía Completa"
      readTimeEn="12 min read"
      readTimeEs="12 min de lectura"
      categoryEn="Management"
      categoryEs="Administración"
    >
      {language === 'en' ? <EnglishContent /> : <SpanishContent />}
      <ChecklistSection />
      <ArticleDisclaimer />
    </ArticleLayout>
  )
}
