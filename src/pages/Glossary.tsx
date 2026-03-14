import { useState } from 'react'
import { Search } from 'lucide-react'

interface GlossaryTerm {
  term: string
  definition: string
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'PITI',
    definition: 'Principal, Interest, Taxes, and Insurance. The four components that make up a typical monthly mortgage payment.'
  },
  {
    term: 'Principal',
    definition: 'The amount of money borrowed in a loan, excluding interest. As you make payments, the principal balance decreases.'
  },
  {
    term: 'Interest',
    definition: 'The cost of borrowing money, typically expressed as an annual percentage rate (APR) of the loan amount.'
  },
  {
    term: 'Down Payment',
    definition: 'The initial upfront payment made when purchasing a property, typically expressed as a percentage of the purchase price.'
  },
  {
    term: 'Loan-to-Value (LTV)',
    definition: 'The ratio of the loan amount to the property value, expressed as a percentage. A lower LTV typically results in better loan terms.'
  },
  {
    term: 'Cap Rate',
    definition: 'Capitalization Rate. The ratio of Net Operating Income (NOI) to property value, used to estimate the potential return on an investment property.'
  },
  {
    term: 'Cash-on-Cash Return',
    definition: 'The ratio of annual pre-tax cash flow to the total cash invested, expressed as a percentage. Measures the return on actual cash invested.'
  },
  {
    term: 'Net Operating Income (NOI)',
    definition: 'Total rental income minus operating expenses (excluding mortgage payments). A key metric for evaluating rental property profitability.'
  },
  {
    term: 'Gross Yield',
    definition: 'Annual rental income divided by property value, expressed as a percentage. Does not account for expenses.'
  },
  {
    term: 'Net Yield',
    definition: 'Annual rental income minus expenses divided by property value, expressed as a percentage. Provides a more accurate measure of return.'
  },
  {
    term: 'ARV (After Repair Value)',
    definition: 'The estimated value of a property after renovations and repairs are completed. Used in fix-and-flip and BRRR strategies.'
  },
  {
    term: 'BRRR',
    definition: 'Buy, Rehab, Rent, Refinance, Repeat. An investment strategy where you purchase a property, renovate it, rent it out, refinance based on the new value, and use the proceeds to repeat the process.'
  },
  {
    term: 'House Hack',
    definition: 'A strategy where you live in one unit of a multi-unit property while renting out the other units to offset or eliminate your housing costs.'
  },
  {
    term: 'Vacancy Rate',
    definition: 'The percentage of time a rental property is expected to be unoccupied. Used to account for periods without rental income.'
  },
  {
    term: 'DSCR (Debt Service Coverage Ratio)',
    definition: 'The ratio of Net Operating Income to total debt service (mortgage payments). Lenders use this to assess whether a property generates sufficient income to cover its debt obligations.'
  },
  {
    term: 'Amortization',
    definition: 'The process of paying off a loan through regular payments over time. Each payment includes both principal and interest, with the proportion shifting over the loan term.'
  },
  {
    term: 'Equity',
    definition: 'The difference between a property\'s market value and the outstanding mortgage balance. Equity builds as you pay down the loan and as the property appreciates.'
  },
  {
    term: 'Cash Flow',
    definition: 'The amount of money remaining after all expenses (including mortgage, taxes, insurance, and operating costs) are paid from rental income.'
  },
  {
    term: 'Rehab',
    definition: 'The process of renovating or repairing a property to increase its value or make it rentable. Common in fix-and-flip and BRRR strategies.'
  },
  {
    term: 'Pro Forma',
    definition: 'A financial projection or forecast of a property\'s expected income and expenses. Used to estimate future performance and make investment decisions.'
  }
]

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Real Estate Glossary</h1>
          <p className="text-gray-400">
            Essential terms and definitions for real estate investing
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item) => (
              <div
                key={item.term}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  {item.term}
                </h2>
                <p className="text-gray-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No terms found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
