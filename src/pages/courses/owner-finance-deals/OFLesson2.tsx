import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Owner financing deals don't show up on the MLS. You won't find them in a Zillow search. They require you to identify motivated sellers who have both the ability (free-and-clear ownership) and the reason to carry a note. This lesson covers exactly where to find them — and how to pitch the idea in a way that gets a yes.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Ideal Owner Finance Seller Profile</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Not every seller is a candidate. You're looking for a specific combination of circumstances:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Free and clear ownership</strong> — no existing mortgage to trigger a due-on-sale clause</li>
        <li><strong className="text-white">Long-time ownership</strong> — they've held the property 10+ years and have a large embedded gain (installment sale is attractive)</li>
        <li><strong className="text-white">Desire for passive income</strong> — retired or semi-retired, interested in monthly cash flow without property management</li>
        <li><strong className="text-white">Motivated but not desperate</strong> — they want to sell but aren't under pressure to close tomorrow</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        This profile most commonly fits: tired landlords, retirees who inherited property, long-time homeowners who've paid off their mortgage, and small commercial property owners looking to exit.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where to Find Owner Finance Sellers</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Tired Landlords</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Landlords who've owned rental properties for 10–20 years are often ready to exit — but a traditional sale creates a large capital gains bill. When you offer owner financing, you're offering them a way out that also spreads their tax burden and keeps money flowing monthly.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        How to find them: Search public records for landlords who have owned rental properties for 10+ years with no mortgage recorded. County assessor websites often allow property searches filtered by owner type and acquisition date. Many counties provide this data in bulk — investor-focused data providers like PropStream, BatchLeads, and ATTOM compile it for easy filtering.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Expired MLS Listings</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A property that sat on the MLS for 90–180 days and expired unsold tells you the seller couldn't find a buyer at their price. They're frustrated. They may be more open to creative terms. Contact expired listings directly — your real estate agent can pull these, or you can use services like REDX or Vulcan7 that specialize in expired listing leads.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Your pitch: "I noticed your property didn't sell. I'd love to discuss a creative purchase structure that could get you your price and create a monthly income stream at the same time."
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">For Sale by Owner (FSBO) Listings</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        FSBO sellers are already open to non-traditional deals — they've chosen to avoid the real estate agent system. Many are long-time owners who know the property well. Find them on Zillow, Craigslist, and Facebook Marketplace under FSBO listings.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Direct Mail Campaigns</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        A targeted direct mail campaign to free-and-clear property owners in your target market is one of the most effective owner finance lead generation strategies. The process:
      </p>
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Pull a list of properties owned free and clear (no mortgage on title) from a data provider like PropStream or ListSource</li>
        <li>Filter for long-term ownership (10+ years) and property type</li>
        <li>Mail a simple, personal letter — handwritten-style or typed with a personal tone — explaining who you are and that you're interested in purchasing with flexible terms</li>
        <li>Include a phone number and/or a simple landing page</li>
        <li>Mail consistently — most responses come after the 3rd–5th contact</li>
      </ol>
      <p className="text-gray-300 leading-relaxed mb-8">
        Response rates on targeted direct mail campaigns to free-and-clear owners typically run 1–3%. On a list of 500 properties, that's 5–15 conversations — and even one good owner finance deal can generate years of returns.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">How to Pitch Owner Financing to Sellers</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The seller's first reaction to "owner financing" is often skepticism or confusion. Your job is to reframe it in terms of what's in it for them.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Frame It Around Their Benefits</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Never open with "I want to do owner financing." Open with their situation and their interests:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Sample Conversation Opener</p>
        <p className="text-gray-300 text-sm leading-relaxed italic">
          "I understand you've been thinking about selling. A lot of sellers in your position find that a traditional sale creates a large tax bill all in one year. Have you ever looked at a structure where you receive payments over time and only pay taxes as you receive the money? It's called an installment sale, and it can actually put more money in your pocket over the long run — plus you'd be earning interest on the balance. Would you be open to exploring that?"
        </p>
      </div>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Ask About Their Goals Before You Pitch</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before you present any structure, ask questions:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>"What are you planning to do with the proceeds from the sale?"</li>
        <li>"Is getting a lump sum important, or would monthly income be useful?"</li>
        <li>"How long have you owned the property? Do you know roughly what you paid?"</li>
        <li>"Are you working with a CPA on the tax side of this?"</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        Their answers tell you exactly which benefits to emphasize. A seller who needs a lump sum for a medical expense or to pay off debt is not a good owner finance candidate — don't force it. A seller who says "I just want to stop dealing with tenants but I don't really need a big check right now" is a perfect candidate.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Be Transparent and Professional</h3>
      <p className="text-gray-300 leading-relaxed">
        Owner financing requires trust. Be clear about how the deal works, what the seller's security interest is (the recorded mortgage), and recommend they involve their own attorney and CPA in reviewing the terms. Sellers who feel well-informed and protected are far more likely to say yes — and to follow through to closing.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Los negocios de financiamiento del propietario no aparecen en el MLS. Requieren que identifiques vendedores motivados que tengan tanto la capacidad (propiedad sin deudas) como la razón para mantener un pagaré.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Perfil Ideal del Vendedor con Financiamiento del Propietario</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8 ml-4">
        <li><strong className="text-white">Propiedad libre de deudas</strong> — sin hipoteca existente</li>
        <li><strong className="text-white">Propietario a largo plazo</strong> — han tenido la propiedad 10+ años con una gran ganancia acumulada</li>
        <li><strong className="text-white">Deseo de ingresos pasivos</strong> — jubilados o semi-jubilados interesados en flujo de efectivo mensual</li>
        <li><strong className="text-white">Motivados pero no desesperados</strong> — quieren vender pero no están bajo presión de cerrar inmediatamente</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Dónde Encontrar Vendedores</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Propietarios Cansados</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los propietarios que han tenido propiedades de alquiler durante 10–20 años a menudo están listos para salir, pero una venta tradicional crea una gran factura de impuestos sobre las ganancias de capital. El financiamiento del propietario les ofrece una salida que también distribuye su carga fiscal y mantiene el dinero fluyendo mensualmente.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Listados MLS Vencidos</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una propiedad que estuvo en el MLS durante 90–180 días sin venderse indica un vendedor frustrado que puede estar más abierto a términos creativos. Contacta los listados vencidos directamente.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Campañas de Correo Directo</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Una campaña de correo directo dirigida a propietarios con propiedades libres de deudas es una de las estrategias más efectivas. Busca propiedades sin hipoteca registrada, filtra por propiedad a largo plazo (10+ años), y envía una carta simple y personal explicando quién eres y que estás interesado en comprar con términos flexibles. Las tasas de respuesta típicamente son del 1–3%.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Cómo Presentar el Financiamiento del Propietario</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Enmarca la Conversación en Sus Beneficios</h3>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">Ejemplo de Apertura de Conversación</p>
        <p className="text-gray-300 text-sm leading-relaxed italic">
          "Entiendo que has estado pensando en vender. Muchos vendedores en tu posición encuentran que una venta tradicional crea una gran factura de impuestos en un solo año. ¿Alguna vez has considerado una estructura donde recibes pagos a lo largo del tiempo y solo pagas impuestos a medida que recibes el dinero? Se llama venta a plazos, y puede poner más dinero en tu bolsillo a largo plazo — además ganarías intereses sobre el saldo."
        </p>
      </div>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Pregunta Sobre Sus Objetivos Primero</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 ml-4">
        <li>"¿Qué planes tienes con los ingresos de la venta?"</li>
        <li>"¿Es importante obtener una suma global, o sería útil un ingreso mensual?"</li>
        <li>"¿Cuánto tiempo llevas siendo propietario? ¿Sabes aproximadamente cuánto pagaste?"</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Sé Transparente y Profesional</h3>
      <p className="text-gray-300 leading-relaxed">
        El financiamiento del propietario requiere confianza. Sé claro sobre cómo funciona el negocio, cuál es el interés de seguridad del vendedor (la hipoteca registrada), y recomiéndales que involucren a su propio abogado y contador en la revisión de los términos.
      </p>
    </div>
  )
}

export function OFLesson2() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
