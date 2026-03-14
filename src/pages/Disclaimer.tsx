import { TriangleAlert as AlertTriangle } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export default function Disclaimer() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Legal Disclaimer</h1>
                <p className="text-gray-600 mt-1">Important information about using Property Launch Pad</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Educational Purpose Only</h2>
                <p>
                  Property Launch Pad is an educational platform designed to help real estate investors understand and analyze potential property investments. All tools, calculators, and information provided on this platform are for educational and informational purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Not Financial, Investment, Legal, or Tax Advice</h2>
                <p>
                  Nothing on this platform constitutes financial advice, investment advice, legal advice, tax advice, or any other type of professional advice. The tools and calculators provided are simplified models that cannot account for all variables that may affect real estate investments.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Estimates and Calculations</h2>
                <p>
                  All calculations, projections, and estimates provided by Property Launch Pad are based solely on the information you input. These calculations:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Are estimates and may not reflect actual costs, returns, or outcomes</li>
                  <li>Do not account for all potential expenses or variables</li>
                  <li>Should not be relied upon as the sole basis for making investment decisions</li>
                  <li>May become outdated due to changing market conditions</li>
                  <li>Are not guaranteed to be accurate, complete, or current</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Consult Qualified Professionals</h2>
                <p>
                  Before making any real estate investment decision, you should always consult with qualified professionals, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Licensed real estate agents and brokers</li>
                  <li>Mortgage lenders and financial advisors</li>
                  <li>Certified Public Accountants (CPAs)</li>
                  <li>Real estate attorneys</li>
                  <li>Property inspectors and contractors</li>
                  <li>Insurance agents</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">No Liability</h2>
                <p>
                  Property Launch Pad and its owners, operators, and affiliates are not responsible for any financial losses, damages, or adverse outcomes resulting from:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Decisions made based on calculations or information from this platform</li>
                  <li>Errors or inaccuracies in calculations or estimates</li>
                  <li>Changes in market conditions</li>
                  <li>Unforeseen expenses or complications</li>
                  <li>Any other factors affecting real estate investments</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Investment Risks</h2>
                <p>
                  Real estate investing involves significant financial risk. You may lose some or all of your invested capital. Past performance does not guarantee future results. Market conditions, property values, rental rates, and other factors can change unpredictably.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">User Responsibility</h2>
                <p>
                  By using Property Launch Pad, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>You are solely responsible for your investment decisions</li>
                  <li>You will verify all information independently</li>
                  <li>You understand the risks involved in real estate investing</li>
                  <li>You will seek professional advice before making investment decisions</li>
                  <li>You will not rely solely on this platform for investment analysis</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">No Guarantees</h2>
                <p>
                  Property Launch Pad makes no guarantees, warranties, or representations about:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>The accuracy or completeness of any information</li>
                  <li>The reliability of calculations or estimates</li>
                  <li>The suitability of any property for investment</li>
                  <li>Future returns or performance</li>
                  <li>The availability or functionality of the platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to Disclaimer</h2>
                <p>
                  Property Launch Pad reserves the right to modify this disclaimer at any time without prior notice. Your continued use of the platform constitutes acceptance of any changes.
                </p>
              </section>

              <section className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                <h2 className="text-xl font-semibold text-amber-900 mb-3">Important Reminder</h2>
                <p className="text-amber-800">
                  Real estate investment decisions should never be made based solely on online calculators or tools. Always conduct thorough due diligence, obtain professional inspections, review all legal documents with an attorney, and consult with financial and tax professionals before proceeding with any real estate transaction.
                </p>
              </section>

              <section className="text-sm text-gray-500 mt-8 pt-6 border-t border-gray-200">
                <p>
                  Last updated: March 14, 2026
                </p>
                <p className="mt-2">
                  If you have questions about this disclaimer, please contact us through our support channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
