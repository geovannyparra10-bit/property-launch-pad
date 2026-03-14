import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const articles = [
  {
    slug: 'house-hacking-101',
    titleEn: 'House Hacking 101: How to Live for Free While Building Wealth',
    titleEs: 'House Hacking 101: Cómo Vivir Gratis Mientras Construyes Riqueza',
    summaryEn: 'Learn how to use FHA loans and multi-unit properties to eliminate your housing costs while building equity and generating rental income.',
    summaryEs: 'Aprende cómo usar préstamos FHA y propiedades con varias unidades para eliminar tus costos de vivienda mientras construyes capital y generas ingresos por alquiler.',
    readTimeEn: '9 min read',
    readTimeEs: '9 min de lectura',
    categoryEn: 'Strategy',
    categoryEs: 'Estrategia',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'brrr-strategy',
    titleEn: 'The BRRR Strategy Explained: Buy, Rehab, Rent, Refinance, Repeat',
    titleEs: 'La Estrategia BRRR Explicada: Comprar, Rehabilitar, Rentar, Refinanciar, Repetir',
    summaryEn: 'A step-by-step guide to the BRRR method — how investors recycle their capital to scale a rental portfolio with minimal money left in each deal.',
    summaryEs: 'Una guía paso a paso del método BRRR: cómo los inversores reciclan su capital para escalar una cartera de alquileres con el mínimo dinero inmovilizado en cada negocio.',
    readTimeEn: '10 min read',
    readTimeEs: '10 min de lectura',
    categoryEn: 'Strategy',
    categoryEs: 'Estrategia',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'fix-and-flip',
    titleEn: 'Fix and Flip Guide: How to Profit from Property Renovation',
    titleEs: 'Guía de Fix and Flip: Cómo Obtener Ganancias con la Renovación de Propiedades',
    summaryEn: 'Everything you need to know about finding deals, estimating rehab costs, the 70% rule, managing holding costs, and executing a profitable flip.',
    summaryEs: 'Todo lo que necesitas saber sobre cómo encontrar negocios, estimar costos de rehabilitación, la regla del 70%, gestionar los costos de tenencia y ejecutar un flip rentable.',
    readTimeEn: '10 min read',
    readTimeEs: '10 min de lectura',
    categoryEn: 'Strategy',
    categoryEs: 'Estrategia',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'rental-property-investing',
    titleEn: "Beginner's Guide to Rental Property Investing",
    titleEs: 'Guía para Principiantes en la Inversión en Propiedades de Alquiler',
    summaryEn: 'Master cash flow basics, cap rates, cash-on-cash returns, tenant screening, property management, and the repeatable system for building a rental portfolio.',
    summaryEs: 'Domina los fundamentos del flujo de caja, tasas de capitalización, retornos cash-on-cash, selección de inquilinos, administración y el sistema repetible para construir una cartera de alquileres.',
    readTimeEn: '11 min read',
    readTimeEs: '11 min de lectura',
    categoryEn: 'Fundamentals',
    categoryEs: 'Fundamentos',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'understanding-mortgages',
    titleEn: 'Understanding Mortgages: What Every Investor Needs to Know',
    titleEs: 'Entendiendo las Hipotecas: Lo que Todo Inversor Necesita Saber',
    summaryEn: 'Fixed vs. adjustable rates, conventional vs. FHA vs. VA loans, how interest rates affect payments, amortization explained, and when to refinance.',
    summaryEs: 'Tasas fijas vs. ajustables, préstamos convencionales vs. FHA vs. VA, cómo las tasas de interés afectan los pagos, la amortización explicada y cuándo refinanciar.',
    readTimeEn: '10 min read',
    readTimeEs: '10 min de lectura',
    categoryEn: 'Financing',
    categoryEs: 'Financiamiento',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'analyzing-deals',
    titleEn: 'How to Analyze a Real Estate Deal in 15 Minutes',
    titleEs: 'Cómo Analizar un Negocio Inmobiliario en 15 Minutos',
    summaryEn: 'A systematic framework for calculating NOI, cap rate, cash flow, DSCR, and cash-on-cash return — plus how to read pro formas and spot red flags.',
    summaryEs: 'Un marco sistemático para calcular NOI, cap rate, flujo de caja, DSCR y retorno cash-on-cash — más cómo leer pro formas y detectar señales de alerta.',
    readTimeEn: '10 min read',
    readTimeEs: '10 min de lectura',
    categoryEn: 'Analysis',
    categoryEs: 'Análisis',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'estimating-repairs',
    titleEn: 'How to Estimate Repair Costs Like a Pro',
    titleEs: 'Cómo Estimar los Costos de Reparación Como un Profesional',
    summaryEn: 'Inspection walk-through tips, the 8 major cost categories, DIY vs. contractor guidance, the most common budget-busters, and contingency planning for any rehab.',
    summaryEs: 'Consejos para el recorrido de inspección, las 8 categorías principales de costos, guía de hazlo tú mismo vs. contratista, los errores de presupuesto más comunes y planificación de contingencias.',
    readTimeEn: '12 min read',
    readTimeEs: '12 min de lectura',
    categoryEn: 'Renovation',
    categoryEs: 'Renovación',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'building-a-portfolio',
    titleEn: 'From 1 to 15 Properties: How to Build a Real Estate Portfolio',
    titleEs: 'De 1 a 15 Propiedades: Cómo Construir una Cartera Inmobiliaria',
    summaryEn: 'Scaling strategies, leveraging equity, 1031 exchanges, portfolio analysis, and how to manage multiple properties like a business — not a hobby.',
    summaryEs: 'Estrategias de escalado, apalancamiento de capital, intercambios 1031, análisis de cartera y cómo gestionar múltiples propiedades como un negocio, no como un pasatiempo.',
    readTimeEn: '13 min read',
    readTimeEs: '13 min de lectura',
    categoryEn: 'Portfolio',
    categoryEs: 'Cartera',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'finding-a-property-manager',
    titleEn: 'How to Find and Vet a Property Manager: The Complete Guide',
    titleEs: 'Cómo Encontrar y Evaluar un Administrador de Propiedades: La Guía Completa',
    summaryEn: 'When you need a PM, where to find them, typical fee structures (8–12% + leasing fees + markups), red flags to avoid, what to look for in a contract, and a 20-question interview checklist.',
    summaryEs: 'Cuándo necesita un administrador, dónde encontrarlos, estructuras de tarifas típicas (8–12% + tarifas de arrendamiento + recargos), señales de alerta, qué buscar en un contrato y una lista de 20 preguntas para la entrevista.',
    readTimeEn: '12 min read',
    readTimeEs: '12 min de lectura',
    categoryEn: 'Management',
    categoryEs: 'Administración',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export function Learn() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('Learn Real Estate Investing', 'Aprende a Invertir en Bienes Raíces')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t(
              'In-depth guides to help you understand the strategies, tools, and concepts behind profitable real estate investing.',
              'Guías detalladas para ayudarte a entender las estrategias, herramientas y conceptos detrás de la inversión rentable en bienes raíces.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/learn/${article.slug}`}
              className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={t(article.titleEn, article.titleEs)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <span className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                  {t(article.categoryEn, article.categoryEs)}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                  {t(article.titleEn, article.titleEs)}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                  {t(article.summaryEn, article.summaryEs)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-700">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {t(article.readTimeEn, article.readTimeEs)}
                  </span>
                  <span className="flex items-center gap-1 text-blue-400 font-medium group-hover:gap-2 transition-all">
                    {t('Read', 'Leer')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
