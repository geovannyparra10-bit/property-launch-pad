import { useState, useEffect } from 'react';
import { RefreshCw, TrendingDown, Clock, CircleCheck as CheckCircle, DollarSign, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { PremiumFeatureModal } from '../components/PremiumFeatureModal';
import { Tooltip } from '../components/Tooltip';
import { generateProFormaPDF } from '../utils/pdfGenerator';
import DisclaimerBanner from '../components/DisclaimerBanner';

interface RefinanceInputs {
  currentBalance: string;
  currentRate: string;
  currentMonthsRemaining: string;
  newRate: string;
  newLoanTerm: string;
  closingCosts: string;
  closingCostsPct: string;
  usePercentage: 'yes' | 'no';
}

interface RefinanceResults {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  annualSavings: number;
  closingCostsAmount: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalInterestCurrent: number;
  totalInterestNew: number;
  lifetimeInterestSavings: number;
  worthRefinancing: boolean;
}

export default function RefinanceCalculator() {
  const { user, profile } = useAuth();
  const [inputs, setInputs] = useState<RefinanceInputs>({
    currentBalance: '280000',
    currentRate: '7.5',
    currentMonthsRemaining: '324',
    newRate: '6.25',
    newLoanTerm: '30',
    closingCosts: '0',
    closingCostsPct: '2.5',
    usePercentage: 'yes',
  });
  const [results, setResults] = useState<RefinanceResults | null>(null);
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const calcMonthlyPayment = (principal: number, annualRate: number, months: number) => {
    if (months <= 0 || principal <= 0) return 0;
    if (annualRate === 0) return principal / months;
    const r = annualRate / 100 / 12;
    return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  };

  const calculateResults = (): RefinanceResults => {
    const balance = parseFloat(inputs.currentBalance) || 0;
    const currentRate = parseFloat(inputs.currentRate) || 0;
    const currentMonths = parseInt(inputs.currentMonthsRemaining) || 0;
    const newRate = parseFloat(inputs.newRate) || 0;
    const newTermYears = parseInt(inputs.newLoanTerm) || 30;
    const newMonths = newTermYears * 12;

    const closingCostsAmount = inputs.usePercentage === 'yes'
      ? balance * ((parseFloat(inputs.closingCostsPct) || 0) / 100)
      : parseFloat(inputs.closingCosts) || 0;

    const currentMonthlyPayment = calcMonthlyPayment(balance, currentRate, currentMonths);
    const newMonthlyPayment = calcMonthlyPayment(balance, newRate, newMonths);

    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const annualSavings = monthlySavings * 12;

    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCostsAmount / monthlySavings) : Infinity;
    const breakEvenYears = breakEvenMonths / 12;

    const totalInterestCurrent = (currentMonthlyPayment * currentMonths) - balance;
    const totalInterestNew = (newMonthlyPayment * newMonths) - balance;
    const lifetimeInterestSavings = totalInterestCurrent - totalInterestNew;

    const worthRefinancing = monthlySavings > 0 && breakEvenMonths <= 36;

    return {
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings,
      annualSavings,
      closingCostsAmount,
      breakEvenMonths: isFinite(breakEvenMonths) ? breakEvenMonths : 0,
      breakEvenYears: isFinite(breakEvenYears) ? breakEvenYears : 0,
      totalInterestCurrent,
      totalInterestNew,
      lifetimeInterestSavings,
      worthRefinancing,
    };
  };

  useEffect(() => {
    const r = calculateResults();
    setResults(r);
    setCurrentOutputs({
      monthlySavings: r.monthlySavings,
      breakEvenMonths: r.breakEvenMonths,
      lifetimeInterestSavings: r.lifetimeInterestSavings,
      worthRefinancing: r.worthRefinancing,
    });
  }, [inputs]);

  const handleInputChange = (field: keyof RefinanceInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyDecimal = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'premium' || profile?.subscription_status === 'active';
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    if (!results) return;
    generateProFormaPDF({
      toolName: 'Refinance Break-Even Calculator',
      inputs: {
        'Current Loan Balance': formatCurrency(parseFloat(inputs.currentBalance) || 0),
        'Current Interest Rate': `${inputs.currentRate}%`,
        'Months Remaining': inputs.currentMonthsRemaining,
        'New Interest Rate': `${inputs.newRate}%`,
        'New Loan Term': `${inputs.newLoanTerm} years`,
        'Estimated Closing Costs': formatCurrency(results.closingCostsAmount),
      },
      outputs: {
        'Current Monthly Payment': formatCurrencyDecimal(results.currentMonthlyPayment),
        'New Monthly Payment': formatCurrencyDecimal(results.newMonthlyPayment),
        'Monthly Savings': formatCurrencyDecimal(results.monthlySavings),
        'Annual Savings': formatCurrency(results.annualSavings),
        'Break-Even Point': results.breakEvenMonths > 0 ? `${results.breakEvenMonths} months (${results.breakEvenYears.toFixed(1)} years)` : 'N/A',
        'Lifetime Interest Savings': formatCurrency(results.lifetimeInterestSavings),
        'Recommendation': results.worthRefinancing ? 'Worth Refinancing' : 'May Not Be Worth It',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <RefreshCw className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Refinance Break-Even Calculator</h1>
              <p className="text-slate-400 mt-1">Find out if refinancing saves you money — and when you break even</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <FileDown className="h-5 w-5" />
            Download PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Your Current Loan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 inline-flex items-center gap-1">
                    Remaining Loan Balance
                    <Tooltip term="Remaining Balance" definition="The principal amount you still owe on your current mortgage." />
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.currentBalance}
                      onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Current Interest Rate</label>
                  <div className="relative">
                    <input type="number" step="0.125" value={inputs.currentRate}
                      onChange={(e) => handleInputChange('currentRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2 inline-flex items-center gap-1">
                    Months Remaining on Current Loan
                    <Tooltip term="Months Remaining" definition="How many monthly payments you have left. A 30-year loan started 3 years ago = 324 months remaining." />
                  </label>
                  <div className="relative">
                    <input type="number" value={inputs.currentMonthsRemaining}
                      onChange={(e) => handleInputChange('currentMonthsRemaining', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">months</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {inputs.currentMonthsRemaining ? `= ${(parseInt(inputs.currentMonthsRemaining) / 12).toFixed(1)} years remaining` : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">New Loan Terms</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New Interest Rate</label>
                  <div className="relative">
                    <input type="number" step="0.125" value={inputs.newRate}
                      onChange={(e) => handleInputChange('newRate', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New Loan Term</label>
                  <select value={inputs.newLoanTerm} onChange={(e) => handleInputChange('newLoanTerm', e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Closing Costs</h2>
              <div className="flex gap-3 mb-4">
                <button onClick={() => handleInputChange('usePercentage', 'yes')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${inputs.usePercentage === 'yes' ? 'bg-cyan-500 text-white' : 'bg-slate-900/50 text-slate-400 border border-slate-600'}`}>
                  % of Balance
                </button>
                <button onClick={() => handleInputChange('usePercentage', 'no')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${inputs.usePercentage === 'no' ? 'bg-cyan-500 text-white' : 'bg-slate-900/50 text-slate-400 border border-slate-600'}`}>
                  Fixed Amount
                </button>
              </div>
              {inputs.usePercentage === 'yes' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Closing Costs as % of Loan Balance</label>
                  <div className="relative">
                    <input type="number" step="0.1" value={inputs.closingCostsPct}
                      onChange={(e) => handleInputChange('closingCostsPct', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Typical refinance closing costs are 2–3% of the loan balance</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Closing Costs (Fixed)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={inputs.closingCosts}
                      onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className={`p-6 rounded-2xl border-2 ${results.worthRefinancing ? 'bg-green-500/20 border-green-500/50' : 'bg-yellow-500/20 border-yellow-500/50'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {results.worthRefinancing
                      ? <CheckCircle className="h-6 w-6 text-green-400" />
                      : <Clock className="h-6 w-6 text-yellow-400" />}
                    <p className={`font-semibold ${results.worthRefinancing ? 'text-green-300' : 'text-yellow-300'}`}>
                      {results.worthRefinancing ? 'Worth Refinancing' : 'Consider Carefully'}
                    </p>
                  </div>
                  <p className="text-sm text-slate-300">
                    {results.monthlySavings > 0
                      ? `You'll save ${formatCurrencyDecimal(results.monthlySavings)}/month and break even in ${results.breakEvenMonths} months.`
                      : 'The new rate does not reduce your monthly payment.'}
                  </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Payment Comparison</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Current Payment</span>
                      <span className="text-white font-medium">{formatCurrencyDecimal(results.currentMonthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">New Payment</span>
                      <span className="text-white font-medium">{formatCurrencyDecimal(results.newMonthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                      <span className="text-slate-300 font-medium text-sm">Monthly Savings</span>
                      <span className={`font-bold text-lg ${results.monthlySavings > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrencyDecimal(results.monthlySavings)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Annual Savings</span>
                      <span className={`font-semibold ${results.annualSavings > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(results.annualSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Break-Even Analysis</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Closing Costs</span>
                      <span className="text-white font-medium">{formatCurrency(results.closingCostsAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm inline-flex items-center gap-1">
                        Break-Even Point
                        <Tooltip term="Break-Even Point" definition="How many months until your cumulative monthly savings exceed what you paid in closing costs." />
                      </span>
                      <span className={`font-bold ${results.breakEvenMonths <= 36 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {results.breakEvenMonths > 0 ? `${results.breakEvenMonths} mo` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Break-Even in Years</span>
                      <span className="text-white font-medium">
                        {results.breakEvenYears > 0 ? `${results.breakEvenYears.toFixed(1)} yrs` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    <h2 className="text-lg font-semibold text-white">Lifetime Interest</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Interest on Current Loan</span>
                      <span className="text-red-400 font-medium">{formatCurrency(results.totalInterestCurrent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Interest on New Loan</span>
                      <span className="text-red-400 font-medium">{formatCurrency(results.totalInterestNew)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                      <span className="text-slate-300 font-medium text-sm inline-flex items-center gap-1">
                        Total Interest Savings
                        <TrendingDown className="h-4 w-4 text-green-400" />
                      </span>
                      <span className={`font-bold text-lg ${results.lifetimeInterestSavings > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(results.lifetimeInterestSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                {user && (
                  <ScenarioPanel
                    toolSlug="refinance"
                    currentInputs={inputs}
                    currentOutputs={currentOutputs}
                    onLoadScenario={(s: Record<string, any>) => setInputs(s as RefinanceInputs)}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <DisclaimerBanner />
      </div>

      <PremiumFeatureModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  );
}
