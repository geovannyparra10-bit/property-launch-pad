import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { FileText } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        A handshake deal and a verbal agreement aren't enough. Owner financing is a real estate transaction involving significant sums of money and legal obligations on both sides. The Owner Carry Agreement — the combination of a promissory note and security instrument — is what makes the deal legally enforceable and protects both parties if things go wrong. This lesson walks through our template clause by clause and explains what to negotiate and what to get your attorney to review before signing.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Two Core Documents</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        An owner carry transaction is documented through two instruments that work together:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-8">
        <div>
          <p className="text-white font-semibold text-sm mb-1">Promissory Note</p>
          <p className="text-gray-400 text-sm">The binding promise to pay. Contains: loan amount, interest rate, payment schedule, balloon date, late fees, prepayment terms, and default provisions. This is the contractual obligation between buyer and seller.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Mortgage / Deed of Trust</p>
          <p className="text-gray-400 text-sm">The security instrument recorded in the public record against the property. Gives the seller/lender the right to foreclose if the buyer defaults on the promissory note. Without this, the seller has no collateral — only an unsecured loan.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Key Clauses in the Promissory Note</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Principal and Interest Rate</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        States the loan amount (purchase price minus down payment) and the agreed interest rate. The rate should be fixed for the life of the note unless both parties explicitly agree to an adjustable rate — floating rates create uncertainty for buyers.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Payment Schedule</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Specifies: payment amount, due date (e.g., 1st of each month), grace period (typically 10–15 days), and late fee if payment is received after the grace period. A common late fee is 5% of the monthly payment or a flat fee (e.g., $50–$100).
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Balloon Payment Clause</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        States the balloon date and that the full outstanding principal balance, plus accrued interest, is due on that date. Negotiate a clear definition of "outstanding balance" — it should be the amortized balance calculated per the agreed schedule, not subject to reinterpretation.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        As a buyer, negotiate the right to request a balloon extension (typically 6–12 months) if you can demonstrate you've been making payments on time and are actively pursuing refinancing. Get this in writing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Prepayment Clause</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Can you pay off the loan early without penalty? Some sellers include a prepayment penalty to protect their interest income stream. As a buyer, push for either no prepayment penalty or a declining penalty (e.g., 3% in year 1, 2% in year 2, 1% in year 3, none thereafter). This flexibility matters if you want to refinance before the balloon.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Default Provisions</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Defines what constitutes default (typically: failure to make payment within the grace period, failure to maintain insurance, failure to pay property taxes) and what remedies the seller has. The seller will want a short cure period after notice; you'll want a longer one. Typical cure periods are 30 days for monetary defaults and 30–60 days for non-monetary defaults.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Due-on-Sale Clause</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        The seller may include a due-on-sale clause stating that if you sell or transfer the property, the full balance becomes due immediately. This is standard and protects the seller from having a stranger assume the obligation without their consent. Negotiate the right to sell or assign with the seller's written consent (not to be unreasonably withheld).
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Key Clauses in the Security Instrument</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Lien Position</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The seller's mortgage should be recorded in first position — meaning their claim on the property is senior to any other debt. If you later take out a HELOC or construction loan, those will be in second position behind the seller's lien. First position lien protection is non-negotiable for sellers in most deals.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Insurance and Tax Requirements</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The security instrument will require you to maintain property insurance (typically with the seller listed as an additional insured) and pay property taxes on time. Failure to do either can trigger default even if you've made every mortgage payment on time. Consider setting up automatic property tax payments.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Impound / Escrow Account</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Some sellers require an impound account — monthly deposits into an escrow that's used to pay property taxes and insurance. This is more work for the buyer but provides the seller security that those obligations are being met. This is negotiable; many deals are done without impound accounts if the buyer has good credit and a track record.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use Our Owner Carry Agreement Template</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Our Owner Carry Agreement template includes both the promissory note and the key terms you need in a security instrument. It's pre-built to cover the clauses described in this lesson and is fully customizable for your specific deal terms.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Owner Carry Agreement Template</p>
            <p className="text-gray-400 text-xs mt-0.5">Customizable promissory note and agreement template for owner finance deals</p>
          </div>
        </div>
        <Link
          to="/templates/owner-carry"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          View Template
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What to Have Your Attorney Review</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before signing any owner finance agreement, have a real estate attorney in your state review the documents. Owner finance laws vary significantly by state. Specific things to ask your attorney about:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Foreclosure process</strong> — How long does non-judicial vs. judicial foreclosure take in your state? This affects the seller's risk profile and their willingness to offer favorable terms.</li>
        <li><strong className="text-white">Usury laws</strong> — Does your state cap interest rates on private real estate loans? Some states have usury limits that affect the maximum rate the seller can legally charge.</li>
        <li><strong className="text-white">Dodd-Frank compliance</strong> — Federal rules regulate owner financing on primary residences. Investment properties are generally exempt, but confirm your specific situation.</li>
        <li><strong className="text-white">Recording requirements</strong> — Ensure the mortgage is properly drafted and recorded in the county where the property is located.</li>
        <li><strong className="text-white">Title insurance</strong> — Get a lender's title insurance policy protecting the seller's lien, and an owner's policy protecting your ownership interest.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Attorney fees for reviewing an owner finance transaction are typically $500–$1,500 — a small cost relative to the deal size and the legal exposure they prevent. Never skip this step.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Un acuerdo de palabra no es suficiente. El Acuerdo de Financiamiento del Propietario — la combinación de un pagaré e instrumento de seguridad — es lo que hace el negocio legalmente ejecutable y protege a ambas partes si algo sale mal.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Los Dos Documentos Principales</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-3 mb-8">
        <div>
          <p className="text-white font-semibold text-sm mb-1">Pagaré</p>
          <p className="text-gray-400 text-sm">La promesa vinculante de pagar. Contiene: monto del préstamo, tasa de interés, cronograma de pagos, fecha del pago global, cargos por mora y disposiciones de incumplimiento.</p>
        </div>
        <div className="h-px bg-gray-700" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">Hipoteca / Escritura de Fideicomiso</p>
          <p className="text-gray-400 text-sm">El instrumento de seguridad registrado en el registro público contra la propiedad. Da al vendedor/prestamista el derecho de ejecutar la hipoteca si el comprador incumple.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Cláusulas Clave del Pagaré</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cronograma de Pagos</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Especifica: monto del pago, fecha de vencimiento, período de gracia (típicamente 10–15 días) y cargo por mora si el pago se recibe después del período de gracia.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cláusula de Pago Global</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Negocia el derecho a solicitar una extensión del pago global (típicamente 6–12 meses) si puedes demostrar que has realizado los pagos puntualmente y estás buscando activamente refinanciar.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Cláusula de Prepago</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        ¿Puedes pagar el préstamo anticipadamente sin penalización? Negocia ya sea sin penalización de prepago o una penalización decreciente (3% en el año 1, 2% en el año 2, 1% en el año 3, ninguna después).
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Disposiciones de Incumplimiento</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Define qué constituye incumplimiento y qué recursos tiene el vendedor. Los períodos de curación típicos son 30 días para incumplimientos monetarios y 30–60 días para incumplimientos no monetarios.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa Nuestra Plantilla de Acuerdo de Financiamiento del Propietario</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nuestra plantilla incluye tanto el pagaré como los términos clave que necesitas en un instrumento de seguridad. Es completamente personalizable para los términos específicos de tu negocio.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Plantilla de Acuerdo de Financiamiento del Propietario</p>
            <p className="text-gray-400 text-xs mt-0.5">Pagaré personalizable y plantilla de acuerdo para negocios de financiamiento del propietario</p>
          </div>
        </div>
        <Link
          to="/templates/owner-carry"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Ver Plantilla
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Qué Debe Revisar tu Abogado</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Antes de firmar cualquier acuerdo de financiamiento del propietario, pide a un abogado de bienes raíces en tu estado que revise los documentos. Las leyes de financiamiento del propietario varían significativamente por estado. Puntos específicos a preguntar:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Proceso de ejecución hipotecaria</strong> — ¿Cuánto tiempo tarda en tu estado?</li>
        <li><strong className="text-white">Leyes de usura</strong> — ¿Tiene tu estado límites en las tasas de interés de préstamos inmobiliarios privados?</li>
        <li><strong className="text-white">Seguro de título</strong> — Obtén una póliza de seguro de título de prestamista y una póliza de propietario.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Los honorarios del abogado para revisar una transacción de financiamiento del propietario son típicamente $500–$1,500 — un costo pequeño en relación con el tamaño del negocio. Nunca omitas este paso.
      </p>
    </div>
  )
}

export function OFLesson4() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
