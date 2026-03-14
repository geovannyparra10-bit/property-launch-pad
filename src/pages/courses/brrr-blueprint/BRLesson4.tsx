import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import { useLanguage } from '../../../contexts/LanguageContext'

function English() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Theory is worthless without execution. In this lesson, we'll run a complete BRRR analysis on a real deal, step by step, using the BRRR Calculator. By the end, you'll be able to evaluate any BRRR opportunity in under 15 minutes — and know instantly whether it passes your criteria.
      </p>

      <div className="my-8 p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Calculator className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold">BRRR Calculator</p>
          <p className="text-gray-400 text-sm">Open the BRRR Calculator and follow along with the deal analysis below.</p>
        </div>
        <Link
          to="/tools/brrr"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Open BRRR Calculator
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Example Deal</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Here's the property we're analyzing:
      </p>
      <ul className="list-none text-gray-300 space-y-1.5 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Property type:</span> <strong className="text-white">Single-family, 3 bed / 1.5 bath, 1,400 sqft</strong></li>
        <li><span className="text-gray-400">Market / city:</span> <strong className="text-white">Secondary Midwest market</strong></li>
        <li><span className="text-gray-400">Purchase price:</span> <strong className="text-white">$85,000</strong></li>
        <li><span className="text-gray-400">Estimated rehab:</span> <strong className="text-white">$38,000</strong></li>
        <li><span className="text-gray-400">ARV (per comps):</span> <strong className="text-white">$165,000</strong></li>
        <li><span className="text-gray-400">Market rent (post-rehab):</span> <strong className="text-white">$1,400/month</strong></li>
        <li><span className="text-gray-400">Acquisition financing:</span> <strong className="text-white">Hard money loan @ 12%, interest-only</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: Quick Screen with the 70% Rule</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before going further, run the 70% rule:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <div className="flex justify-between text-gray-300 text-sm"><span>ARV × 70%</span><span>$165,000 × 0.70 = $115,500</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Minus estimated rehab</span><span>– $38,000</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between font-bold"><span className="text-white">Maximum purchase price</span><span className="text-green-400">$77,500</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        Our offer price of $85,000 is slightly above the 70% rule threshold. This doesn't automatically kill the deal — the 70% rule is a quick screen, not a hard cutoff. Let's see what the full analysis shows.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: All-In Cost</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <div className="flex justify-between text-gray-300 text-sm"><span>Purchase price</span><span>$85,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Rehab cost</span><span>$38,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Closing costs (acquisition, ~2%)</span><span>$1,700</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Holding costs (5 months × $1,020)</span><span>$5,100</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Refinance closing costs (~2%)</span><span>$2,475</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Total all-in cost</span><span>$132,275</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: Refinance Analysis</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        After renovation and 3 months of stabilized tenancy, the property is appraised at $162,000 (slightly below our conservative ARV estimate). The lender offers a conventional 30-year loan at 75% LTV:
      </p>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <div className="flex justify-between text-gray-300 text-sm"><span>Appraised value</span><span>$162,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>75% LTV refinance loan</span><span>$121,500</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Total all-in cost</span><span>– $132,275</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between font-bold"><span className="text-white">Cash left in deal</span><span className="text-amber-400">$10,775</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed mb-8">
        We couldn't fully recycle our capital on this one — $10,775 stays in the deal. That's not a failed BRRR; it's a partial BRRR. Whether this is acceptable depends on the cash flow the property generates. Let's check.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: Post-Refinance Cash Flow</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <div className="flex justify-between text-gray-300 text-sm"><span>Gross monthly rent</span><span>$1,400</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Vacancy (8%)</span><span>– $112</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Effective gross income</span><span>$1,288</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Mortgage (P&I at 7.0%, 30yr)</span><span>– $809</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Taxes + insurance</span><span>– $175</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Maintenance + capex (10%)</span><span>– $140</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Property management (10%)</span><span>– $129</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Monthly cash flow</span><span className="text-green-400">+$35/mo</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: Evaluating the Return</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Cash flow of $35/month ($420/year) on $10,775 left in the deal = <strong className="text-white">3.9% cash-on-cash return</strong>. That's modest, but this deal has two other return drivers:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        <li><strong className="text-white">Equity position:</strong> $162,000 appraised value vs. $121,500 loan = $40,500 in equity at close of refinance</li>
        <li><strong className="text-white">Principal paydown:</strong> Each monthly mortgage payment builds additional equity</li>
        <li><strong className="text-white">Long-term appreciation:</strong> Rents and values historically increase over time</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        Total return including equity = ($40,500 equity + $420 annual cash flow) / $10,775 = <strong className="text-white">383% return on invested capital in year one</strong>. That's the power of the BRRR model — leveraged, tax-advantaged real estate with recycled capital.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Open the BRRR Calculator and input these numbers to confirm the analysis. Then try varying the purchase price, rehab cost, and ARV to understand how the deal sensitivity works. In the final lesson, you'll learn how to execute the refinance and position yourself for the next deal.
      </p>
    </div>
  )
}

function Spanish() {
  return (
    <div className="article-body">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        La teoría no tiene valor sin ejecución. En esta lección, ejecutaremos un análisis BRRR completo en un negocio real, paso a paso, utilizando la Calculadora BRRR.
      </p>

      <div className="my-8 p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <Calculator className="h-8 w-8 text-blue-400 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-semibold">Calculadora BRRR</p>
          <p className="text-gray-400 text-sm">Abre la Calculadora BRRR y sigue el análisis del negocio a continuación.</p>
        </div>
        <Link
          to="/tools/brrr"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Abrir Calculadora BRRR
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">El Negocio de Ejemplo</h2>
      <ul className="list-none text-gray-300 space-y-1.5 mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700">
        <li><span className="text-gray-400">Tipo de propiedad:</span> <strong className="text-white">Unifamiliar, 3 habitaciones / 1.5 baños, 1,400 sqft</strong></li>
        <li><span className="text-gray-400">Precio de compra:</span> <strong className="text-white">$85,000</strong></li>
        <li><span className="text-gray-400">Rehabilitación estimada:</span> <strong className="text-white">$38,000</strong></li>
        <li><span className="text-gray-400">ARV (según comparables):</span> <strong className="text-white">$165,000</strong></li>
        <li><span className="text-gray-400">Renta de mercado:</span> <strong className="text-white">$1,400/mes</strong></li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Análisis del Refinanciamiento</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <div className="flex justify-between text-gray-300 text-sm"><span>Valor tasado</span><span>$162,000</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Préstamo de refinanciamiento (75% LTV)</span><span>$121,500</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Costo total invertido</span><span>– $132,275</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between font-bold"><span className="text-white">Capital restante en el negocio</span><span className="text-amber-400">$10,775</span></div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Flujo de Caja Post-Refinanciamiento</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 space-y-2 mb-6">
        <div className="flex justify-between text-gray-300 text-sm"><span>Renta bruta mensual</span><span>$1,400</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Vacante (8%)</span><span>– $112</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Hipoteca (P&I al 7.0%, 30 años)</span><span>– $809</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Impuestos + seguro</span><span>– $175</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Mantenimiento + capex (10%)</span><span>– $140</span></div>
        <div className="flex justify-between text-gray-300 text-sm"><span>Administración (10%)</span><span>– $129</span></div>
        <div className="h-px bg-gray-600 my-2" />
        <div className="flex justify-between text-white font-bold"><span>Flujo de caja mensual</span><span className="text-green-400">+$35/mes</span></div>
      </div>
      <p className="text-gray-300 leading-relaxed">
        Abre la Calculadora BRRR e ingresa estos números para confirmar el análisis. Luego intenta variar el precio de compra, el costo de rehabilitación y el ARV para entender la sensibilidad del negocio.
      </p>
    </div>
  )
}

export function BRLesson4() {
  const { language } = useLanguage()
  return language === 'en' ? <English /> : <Spanish />
}
