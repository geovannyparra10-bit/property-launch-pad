import { Link } from 'react-router-dom'
import { useLanguage } from '../../../contexts/LanguageContext'
import { Calculator } from 'lucide-react'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Financing is what turns a down payment into a wealth-building asset. The terms of your loan — rate, length, down payment, and loan type — directly determine your monthly cash flow and long-term return. Understanding your financing options is not optional: it's the difference between a deal that works and one that doesn't.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Conventional Investment Property Loans</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The most common way to finance 1–4 unit rental properties is a conventional loan through Fannie Mae or Freddie Mac guidelines. These are the same loans used for primary residences, but with investment property requirements:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Down payment:</strong> 15–25% depending on property type (15% minimum for SFH, 25% for multi-family)</li>
        <li><strong className="text-white">Interest rate:</strong> Typically 0.5–1% higher than owner-occupied rates</li>
        <li><strong className="text-white">Credit score:</strong> Generally 680+ preferred; 700+ for best rates</li>
        <li><strong className="text-white">Debt-to-income (DTI):</strong> Lenders typically allow up to 45% DTI, sometimes higher with strong reserves</li>
        <li><strong className="text-white">Rental income qualification:</strong> Lenders may allow you to count 75% of market rent toward qualifying income</li>
        <li><strong className="text-white">Loan limits:</strong> Conventional conforming limits (2025: $806,500 in most markets)</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        The 30-year fixed conventional loan is the gold standard for rental properties. The long amortization keeps monthly payments low, maximizing cash flow. Rate locks protect you from rate volatility. These loans are assumable in some circumstances, which can be a selling point in high-rate environments.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">DSCR Loans: Finance Based on the Property, Not You</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        DSCR (Debt Service Coverage Ratio) loans are a game-changer for investors who don't qualify through traditional income verification — self-employed investors, those who've already maxed conventional loan limits, or those with complex tax returns.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Instead of verifying your personal income, the lender evaluates whether the property's rental income covers the mortgage payment. A DSCR of 1.0 means rent equals the mortgage payment. Most DSCR lenders require a ratio of 1.0–1.25 to approve a loan.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        DSCR loan characteristics:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>No personal income verification (no W-2s, tax returns, or pay stubs)</li>
        <li>Rates typically 0.5–1.5% higher than conventional loans</li>
        <li>Down payment: typically 20–25%</li>
        <li>Higher credit score requirements (typically 680+)</li>
        <li>No limit on number of financed properties (unlike conventional loans which cap at 10)</li>
        <li>Available for short-term rental (Airbnb/VRBO) properties using projected rent</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        DSCR loans are offered through portfolio lenders and specialized non-QM lenders — not traditional banks. Search for "DSCR lender" or "investment property DSCR loan" to find providers in your market.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Portfolio Loans</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Community banks and credit unions sometimes offer "portfolio loans" — loans they hold on their own books rather than selling to Fannie/Freddie. These can have more flexible underwriting, especially for investors with multiple properties or unique situations. Build relationships with local community banks; they're often the most creative financing partners for growing landlords.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Impact of Rate on Cash Flow</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Interest rate is the single biggest lever on monthly cash flow. On a $150,000 loan:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Monthly P&I Payment by Rate ($150,000 Loan, 30-Year)</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>5.0% interest rate</span><span>$805/month</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>6.0% interest rate</span><span>$899/month</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>7.0% interest rate</span><span>$998/month</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>8.0% interest rate</span><span>$1,101/month</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-gray-400 text-xs"><span>Difference: 5% vs 8%</span><span className="text-red-400">– $296/month in cash flow</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        A 3% rate difference costs nearly $300/month in cash flow on a $150,000 loan. This is why purchase price negotiation and buying down your rate can be worth tens of thousands over the life of a deal.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Use the Mortgage Calculator</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before analyzing any deal, model your financing with the Mortgage Calculator. Adjust loan amount, interest rate, and term to see how each scenario affects your monthly payment — and therefore your cash flow.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Mortgage Calculator</p>
            <p className="text-gray-400 text-xs mt-0.5">Model loan payments, amortization, and total interest across scenarios</p>
          </div>
        </div>
        <Link
          to="/tools/mortgage_calculator"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Open Tool
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Building Your Lender Relationships</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        The best financing terms don't come from rate shopping online — they come from established lender relationships. Recommendations for building your lending team:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Find a mortgage broker who specializes in investment property (not just primary residences). They have access to multiple lender programs.</li>
        <li>Build a relationship with 1–2 local community banks for portfolio and DSCR-style lending.</li>
        <li>Connect with other investors at local real estate meetups — experienced investors are your best source for lender referrals.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed">
        Having your financing team assembled before you find a deal puts you in a position to move quickly. In a competitive market, the ability to close in 20–30 days is a significant advantage over buyers who need 45–60 days to get financing approved.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        El financiamiento convierte un enganche en un activo que genera riqueza. Los términos de tu préstamo — tasa, plazo, enganche y tipo de préstamo — determinan directamente tu flujo de efectivo mensual y el retorno a largo plazo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Préstamos Convencionales para Propiedades de Inversión</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        La forma más común de financiar propiedades de alquiler de 1–4 unidades es con un préstamo convencional. Requisitos para propiedades de inversión:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Enganche:</strong> 15–25% según el tipo de propiedad</li>
        <li><strong className="text-white">Tasa de interés:</strong> Típicamente 0.5–1% más alta que las tasas de residencia principal</li>
        <li><strong className="text-white">Puntaje crediticio:</strong> Generalmente 680+ preferido; 700+ para las mejores tasas</li>
        <li><strong className="text-white">Ingreso de alquiler:</strong> Los prestamistas pueden permitirte contar el 75% de la renta del mercado como ingreso calificado</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-8">
        El préstamo convencional a 30 años de tasa fija es el estándar de oro para propiedades de alquiler. La larga amortización mantiene bajos los pagos mensuales, maximizando el flujo de efectivo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Préstamos DSCR: Financia Basado en la Propiedad, No en Ti</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Los préstamos DSCR son revolucionarios para inversores que no califican a través de la verificación de ingresos tradicional. En lugar de verificar tu ingreso personal, el prestamista evalúa si el ingreso de alquiler de la propiedad cubre el pago hipotecario.
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li>Sin verificación de ingresos personales (sin W-2s, declaraciones de impuestos)</li>
        <li>Tasas típicamente 0.5–1.5% más altas que los préstamos convencionales</li>
        <li>Sin límite en el número de propiedades financiadas</li>
        <li>Disponibles para propiedades de alquiler a corto plazo (Airbnb/VRBO)</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Impacto de la Tasa en el Flujo de Efectivo</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Pago Mensual P&I por Tasa (Préstamo $150,000, 30 Años)</p>
        <div className="flex justify-between text-gray-300 text-sm"><span>Tasa de interés 5.0%</span><span>$805/mes</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Tasa de interés 6.0%</span><span>$899/mes</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Tasa de interés 7.0%</span><span>$998/mes</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Tasa de interés 8.0%</span><span>$1,101/mes</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-gray-400 text-xs"><span>Diferencia: 5% vs 8%</span><span className="text-red-400">– $296/mes en flujo de efectivo</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Usa la Calculadora de Hipotecas</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Antes de analizar cualquier negocio, modela tu financiamiento con la Calculadora de Hipotecas. Ajusta el monto del préstamo, la tasa de interés y el plazo para ver cómo cada escenario afecta tu pago mensual y, por tanto, tu flujo de efectivo.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Calculadora de Hipotecas</p>
            <p className="text-gray-400 text-xs mt-0.5">Modela pagos del préstamo, amortización e interés total</p>
          </div>
        </div>
        <Link
          to="/tools/mortgage_calculator"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Abrir Herramienta
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Construir tus Relaciones con Prestamistas</h2>
      <p className="text-gray-300 leading-relaxed">
        Encuentra un corredor hipotecario especializado en propiedades de inversión. Construye una relación con bancos comunitarios locales para préstamos de cartera. Conéctate con otros inversores en reuniones locales de bienes raíces. Tener tu equipo de financiamiento listo antes de encontrar un negocio te permite actuar rápidamente en mercados competitivos.
      </p>
    </div>
  )
}

export function RWLesson4() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
