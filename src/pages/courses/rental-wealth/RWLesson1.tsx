import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Rental properties have created more millionaires than almost any other asset class. Not because they're exciting — they're not — but because they work through four compounding wealth-building mechanisms simultaneously. Understanding these mechanisms changes how you think about real estate from a transaction to a wealth engine.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mechanism 1: Cash Flow</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cash flow is the monthly income left over after all expenses are paid — mortgage, taxes, insurance, maintenance, vacancy, and property management. It's the most visible return, and the one most new investors focus on.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        A property that generates $200/month in net cash flow produces $2,400/year. On a $40,000 down payment, that's a 6% cash-on-cash return — before accounting for any of the other three mechanisms.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Example: Monthly Cash Flow</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Gross rent</span><span>$1,800</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Mortgage (PITI)</span><span>– $1,150</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Property management (8%)</span><span>– $144</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Maintenance reserve (5%)</span><span>– $90</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Vacancy reserve (5%)</span><span>– $90</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Net monthly cash flow</span><span className="text-green-400">$326</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Cash flow provides financial resilience. Properties with strong cash flow can weather vacancies, repairs, and market downturns without requiring you to reach into your own pocket. This is why cash flow positive properties are the foundation of sustainable portfolios.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mechanism 2: Appreciation</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        U.S. home prices have appreciated at an average of 3–4% annually over long periods, roughly matching or slightly beating inflation. In strong growth markets, annual appreciation of 5–8% or more is common. On a $250,000 property, 4% appreciation is $10,000 in equity gained in a single year — with no work required.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The leverage effect amplifies this dramatically. If you put 25% down ($62,500) on a $250,000 property and it appreciates 4% ($10,000), your return on the equity invested is 16% from appreciation alone. That's the power of owning a full asset while controlling it with a fraction of its value.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        Appreciation should be viewed as a bonus, not a plan. Build deals that work on cash flow first. Appreciation is the long-term wealth accelerator that makes rental real estate exceptional over time.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mechanism 3: Tax Benefits</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Rental real estate offers some of the most favorable tax treatment of any investment. The major benefits:
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Depreciation</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The IRS allows you to deduct the cost of a residential rental property (minus land value) over 27.5 years. On a $250,000 property where the building is worth $200,000, that's $7,272 per year in depreciation deductions — a "paper loss" you can use to offset rental income and reduce your taxable income. You collect real cash rent while deducting a phantom expense. This is one of the most powerful legal tax shelters available to individual investors.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Deductible Operating Expenses</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        All legitimate operating expenses are deductible: mortgage interest, property taxes, insurance, repairs, property management fees, utilities you pay, mileage, professional fees, and more.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">1031 Exchange</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        When you sell a rental property, you can defer capital gains taxes indefinitely by rolling proceeds into a "like-kind" replacement property under IRS Section 1031. Savvy investors have used 1031 exchanges to build multi-million dollar portfolios while deferring taxes for decades. Consult a qualified CPA before executing.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Pass-Through Deduction (QBI)</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Under current tax law, many rental property owners can deduct up to 20% of their qualified business income (QBI) from rental activities, further reducing their effective tax rate. Eligibility rules are complex — work with a real estate-focused CPA to maximize this benefit.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mechanism 4: Leverage and Debt Paydown</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Every month your tenant pays rent, a portion of that payment goes toward paying down the mortgage principal. On a 30-year loan, the early years are interest-heavy, but the debt paydown effect compounds significantly over time.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        On a $200,000 mortgage at 7%, you're paying roughly $350–$400/month in principal in year 1. By year 10, that rises to $500–$600/month. By year 20, you may be paying $800+/month in principal — all funded by tenant rent. At year 30, you own the asset free and clear, and all of that rent becomes cash flow.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        This is the compounding power of rental real estate: your tenants are paying off your mortgage while you collect the equity, the appreciation, the cash flow, and the tax benefits simultaneously. No other common investment offers this combination.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Combined Effect</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Consider a single rental property held for 10 years:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">10-Year Wealth Summary (Single Property)</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Cash flow (10 yrs × $3,600/yr)</span><span>$36,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Appreciation ($250k → ~$370k @ 4%/yr)</span><span>$120,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Principal paydown (tenant-funded)</span><span>~$35,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Tax savings (depreciation, ~$2k/yr)</span><span>~$20,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Total wealth created</span><span className="text-green-400">~$211,000</span></div>
        <div className="flex justify-between text-gray-400 text-xs"><span>Initial down payment</span><span>$62,500</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed">
        A 3× return on your initial capital — mostly funded by tenants, appreciation, and the tax code. This is why rental real estate has created generational wealth for ordinary investors across every market cycle. In the next lesson, you'll learn how to choose the right market and property type to make these numbers a reality.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Las propiedades de alquiler han creado más millonarios que casi cualquier otra clase de activos. No porque sean emocionantes, sino porque funcionan a través de cuatro mecanismos simultáneos de acumulación de riqueza. Entender estos mecanismos cambia la forma en que piensas sobre los bienes raíces.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mecanismo 1: Flujo de Efectivo</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        El flujo de efectivo es el ingreso mensual que queda después de pagar todos los gastos: hipoteca, impuestos, seguro, mantenimiento, vacantes y administración de propiedades.
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Ejemplo: Flujo de Efectivo Mensual</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Renta bruta</span><span>$1,800</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Hipoteca (PITI)</span><span>– $1,150</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Administración (8%)</span><span>– $144</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Reserva de mantenimiento (5%)</span><span>– $90</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Reserva de vacantes (5%)</span><span>– $90</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Flujo de efectivo neto mensual</span><span className="text-green-400">$326</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Las propiedades con flujo de efectivo fuerte pueden sobrellevar vacantes, reparaciones y caídas del mercado sin requerir que pongas dinero de tu bolsillo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mecanismo 2: Apreciación</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los precios de vivienda en EE.UU. han apreciado un promedio del 3–4% anual. En una propiedad de $250,000 con una entrada del 25% ($62,500), una apreciación del 4% ($10,000) representa un retorno del 16% solo por apreciación. El efecto del apalancamiento amplifica esto dramáticamente.
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        La apreciación debe verse como un bono, no como un plan. Construye negocios que funcionen con el flujo de efectivo primero.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mecanismo 3: Beneficios Fiscales</h2>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Depreciación</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        El IRS te permite deducir el costo de una propiedad de alquiler residencial (menos el valor del terreno) durante 27.5 años. En una propiedad de $250,000 donde el edificio vale $200,000, eso es $7,272 anuales en deducciones de depreciación — una "pérdida en papel" que puedes usar para compensar los ingresos por alquiler.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Gastos Operativos Deducibles</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Todos los gastos operativos legítimos son deducibles: intereses hipotecarios, impuestos sobre la propiedad, seguro, reparaciones, honorarios de administración, servicios públicos que pagas, kilometraje y honorarios profesionales.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-3">Intercambio 1031</h3>
      <p className="text-gray-300 leading-relaxed mb-8">
        Cuando vendes una propiedad de alquiler, puedes diferir los impuestos sobre las ganancias de capital indefinidamente reinvirtiendo los ingresos en una propiedad de reemplazo de "tipo similar" bajo la Sección 1031 del IRS.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Mecanismo 4: Apalancamiento y Pago de Deuda</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cada mes que tu inquilino paga la renta, una parte de ese pago va hacia el capital de la hipoteca. Con el tiempo, el efecto del pago de la deuda se compone significativamente. A los 30 años, posees el activo libre de deudas y toda esa renta se convierte en flujo de efectivo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Efecto Combinado</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Resumen de Riqueza a 10 Años (Una Propiedad)</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Flujo de efectivo (10 años × $3,600/año)</span><span>$36,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Apreciación ($250k → ~$370k @ 4%/año)</span><span>$120,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Pago de capital (financiado por inquilino)</span><span>~$35,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Ahorro fiscal (depreciación, ~$2k/año)</span><span>~$20,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Riqueza total creada</span><span className="text-green-400">~$211,000</span></div>
        <div className="flex justify-between text-gray-400 text-xs"><span>Entrada inicial</span><span>$62,500</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed">
        Un retorno 3× sobre tu capital inicial, mayormente financiado por inquilinos, apreciación y el código tributario. En la próxima lección, aprenderás cómo elegir el mercado y el tipo de propiedad correctos para hacer estos números una realidad.
      </p>
    </div>
  )
}

export function RWLesson1() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
