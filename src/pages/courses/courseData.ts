export interface Lesson {
  slug: string
  titleEn: string
  titleEs: string
  durationEn: string
  durationEs: string
}

export interface Course {
  slug: string
  titleEn: string
  titleEs: string
  descriptionEn: string
  descriptionEs: string
  lessons: Lesson[]
  estimatedTimeEn: string
  estimatedTimeEs: string
  image: string
  categoryEn: string
  categoryEs: string
}

export const COURSES: Course[] = [
  {
    slug: 'house-hack-mastery',
    titleEn: 'House Hack Mastery: Your First Deal in 90 Days',
    titleEs: 'Dominio del House Hack: Tu Primer Negocio en 90 Días',
    descriptionEn: 'A complete step-by-step course to find, finance, and close your first house hack — even with limited capital. From self-assessment to tenant screening, you\'ll be ready to act in 90 days.',
    descriptionEs: 'Un curso completo paso a paso para encontrar, financiar y cerrar tu primer house hack, incluso con capital limitado. Desde la autoevaluación hasta la selección de inquilinos, estarás listo para actuar en 90 días.',
    estimatedTimeEn: '~2 hours',
    estimatedTimeEs: '~2 horas',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    categoryEn: 'Strategy',
    categoryEs: 'Estrategia',
    lessons: [
      {
        slug: 'lesson-1',
        titleEn: 'Is House Hacking Right for You?',
        titleEs: '¿Es el House Hacking Adecuado para Ti?',
        durationEn: '20 min',
        durationEs: '20 min',
      },
      {
        slug: 'lesson-2',
        titleEn: 'Finding the Right Property',
        titleEs: 'Encontrar la Propiedad Correcta',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-3',
        titleEn: 'Running the Numbers',
        titleEs: 'Analizando los Números',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-4',
        titleEn: 'Financing Your House Hack',
        titleEs: 'Financiando tu House Hack',
        durationEn: '20 min',
        durationEs: '20 min',
      },
      {
        slug: 'lesson-5',
        titleEn: 'Managing Your Property',
        titleEs: 'Administrando tu Propiedad',
        durationEn: '20 min',
        durationEs: '20 min',
      },
    ],
  },
  {
    slug: 'flip-profits',
    titleEn: 'Flip Profits: From Purchase to Payday',
    titleEs: 'Ganancias de Flip: De la Compra al Día de Pago',
    descriptionEn: 'A complete guide to buying, rehabbing, and selling properties for profit. From evaluating whether flipping is right for you, to finding deals, estimating costs, and executing your exit strategy.',
    descriptionEs: 'Una guía completa para comprar, rehabilitar y vender propiedades con ganancias. Desde evaluar si el flipping es para ti, hasta encontrar negocios, estimar costos y ejecutar tu estrategia de salida.',
    estimatedTimeEn: '~2 hours',
    estimatedTimeEs: '~2 horas',
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
    categoryEn: 'Strategy',
    categoryEs: 'Estrategia',
    lessons: [
      {
        slug: 'lesson-1',
        titleEn: 'Is Flipping Right for You?',
        titleEs: '¿Es el Flipping Adecuado para Ti?',
        durationEn: '20 min',
        durationEs: '20 min',
      },
      {
        slug: 'lesson-2',
        titleEn: 'Finding Flip Deals',
        titleEs: 'Encontrar Negocios de Flip',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-3',
        titleEn: 'Estimating Rehab Costs',
        titleEs: 'Estimar los Costos de Rehabilitación',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-4',
        titleEn: 'Running Your Flip Numbers',
        titleEs: 'Calculando tus Números de Flip',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-5',
        titleEn: 'Executing the Flip',
        titleEs: 'Ejecutando el Flip',
        durationEn: '20 min',
        durationEs: '20 min',
      },
    ],
  },
  {
    slug: 'rental-wealth',
    titleEn: 'Rental Wealth: Building Passive Income',
    titleEs: 'Riqueza con Alquileres: Construyendo Ingresos Pasivos',
    descriptionEn: 'A complete guide to building lasting wealth through rental properties. From choosing the right market to screening tenants, financing deals, and scaling your portfolio for long-term passive income.',
    descriptionEs: 'Una guía completa para construir riqueza duradera a través de propiedades de alquiler. Desde elegir el mercado correcto hasta seleccionar inquilinos, financiar negocios y escalar tu cartera para obtener ingresos pasivos a largo plazo.',
    estimatedTimeEn: '~2 hours',
    estimatedTimeEs: '~2 horas',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    categoryEn: 'Investing',
    categoryEs: 'Inversión',
    lessons: [
      {
        slug: 'lesson-1',
        titleEn: 'Why Rental Properties Build Wealth',
        titleEs: 'Por Qué las Propiedades de Alquiler Generan Riqueza',
        durationEn: '20 min',
        durationEs: '20 min',
      },
      {
        slug: 'lesson-2',
        titleEn: 'Choosing Your Market and Property',
        titleEs: 'Elegir tu Mercado y Propiedad',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-3',
        titleEn: 'Analyzing Rental Deals',
        titleEs: 'Analizar Negocios de Alquiler',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-4',
        titleEn: 'Financing Rental Properties',
        titleEs: 'Financiar Propiedades de Alquiler',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-5',
        titleEn: 'Managing for Long-Term Success',
        titleEs: 'Gestión para el Éxito a Largo Plazo',
        durationEn: '20 min',
        durationEs: '20 min',
      },
    ],
  },
  {
    slug: 'owner-finance-deals',
    titleEn: 'Owner Finance Deals: Creative Buying Without Banks',
    titleEs: 'Financiamiento del Propietario: Compras Creativas Sin Bancos',
    descriptionEn: 'Master the art of owner financing — buying properties directly from sellers without traditional bank loans. From pitching the idea to structuring terms, drafting agreements, and planning your exit.',
    descriptionEs: 'Domina el arte del financiamiento del propietario — compra propiedades directamente de vendedores sin préstamos bancarios tradicionales. Desde presentar la idea hasta estructurar términos, redactar acuerdos y planificar tu salida.',
    estimatedTimeEn: '~2 hours',
    estimatedTimeEs: '~2 horas',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    categoryEn: 'Creative Finance',
    categoryEs: 'Finanzas Creativas',
    lessons: [
      {
        slug: 'lesson-1',
        titleEn: 'What is Owner Financing?',
        titleEs: '¿Qué es el Financiamiento del Propietario?',
        durationEn: '20 min',
        durationEs: '20 min',
      },
      {
        slug: 'lesson-2',
        titleEn: 'Finding Owner Finance Opportunities',
        titleEs: 'Encontrar Oportunidades de Financiamiento del Propietario',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-3',
        titleEn: 'Structuring the Deal',
        titleEs: 'Estructurar el Negocio',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-4',
        titleEn: 'The Owner Carry Agreement',
        titleEs: 'El Acuerdo de Financiamiento del Propietario',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-5',
        titleEn: 'Exit Strategies',
        titleEs: 'Estrategias de Salida',
        durationEn: '20 min',
        durationEs: '20 min',
      },
    ],
  },
  {
    slug: 'brrr-blueprint',
    titleEn: 'BRRR Blueprint: Recycle Your Capital',
    titleEs: 'Plan BRRR: Recicla Tu Capital',
    descriptionEn: 'Master the Buy, Rehab, Rent, Refinance, Repeat strategy from deal sourcing through refinancing. Learn to pull your equity back out so you can scale your portfolio without running out of cash.',
    descriptionEs: 'Domina la estrategia de Comprar, Rehabilitar, Rentar, Refinanciar y Repetir, desde la búsqueda de negocios hasta el refinanciamiento. Aprende a recuperar tu capital para escalar tu cartera sin quedarte sin efectivo.',
    estimatedTimeEn: '~2 hours',
    estimatedTimeEs: '~2 horas',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    categoryEn: 'Strategy',
    categoryEs: 'Estrategia',
    lessons: [
      {
        slug: 'lesson-1',
        titleEn: 'Understanding the BRRR Cycle',
        titleEs: 'Entendiendo el Ciclo BRRR',
        durationEn: '20 min',
        durationEs: '20 min',
      },
      {
        slug: 'lesson-2',
        titleEn: 'Finding Deals Below Market Value',
        titleEs: 'Encontrar Negocios por Debajo del Valor de Mercado',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-3',
        titleEn: 'Estimating Rehab and ARV',
        titleEs: 'Estimar la Rehabilitación y el ARV',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-4',
        titleEn: 'Running Your BRRR Numbers',
        titleEs: 'Calculando tus Números BRRR',
        durationEn: '25 min',
        durationEs: '25 min',
      },
      {
        slug: 'lesson-5',
        titleEn: 'The Refinance and Repeat',
        titleEs: 'El Refinanciamiento y Repetir',
        durationEn: '20 min',
        durationEs: '20 min',
      },
    ],
  },
]
