import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, Calculator, CircleAlert as AlertCircle, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { PremiumFeatureModal } from '../components/PremiumFeatureModal';
import { Tooltip } from '../components/Tooltip';
import { generateProFormaPDF } from '../utils/pdfGenerator';

interface FlipInputs {
  purchasePrice: string;
  rehabBudget: string;
  afterRepairValue: string;
  holdingPeriod: string;
  monthlyHoldingCosts: string;
  sellingCostPercentage: string;
}

interface FlipResults {
  totalCost: number;
  sellingCosts: number;
  totalInvestment: number;
  netProfit: number;
  roi: number;
  profitPerMonth: number;
  isProfitable: boolean;
}

export default function FlipCalculator() {
  const { user, profile } = useAuth();
  const [inputs, setInputs] = useState<FlipInputs>({
    purchasePrice: '180000',
    rehabBudget: '40000',
    afterRepairValue: '280000',
    holdingPeriod: '6',
    monthlyHoldingCosts: '2500',
    sellingCostPercentage: '8',
  });
  const [results, setResults] = useState<FlipResults | null>(null);
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const calculateResults = (): FlipResults => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const rehabBudget = parseFloat(inputs.rehabBudget) || 0;
    const arv = parseFloat(inputs.afterRepairValue) || 0;
    const holdingPeriod = parseFloat(inputs.holdingPeriod) || 0;
    const monthlyHoldingCosts = parseFloat(inputs.monthlyHoldingCosts) || 0;
    const sellingCostPercentage = parseFloat(inputs.sellingCostPercentage) || 8;

    const totalHoldingCosts = monthlyHoldingCosts * holdingPeriod;
    const totalCost = purchasePrice + rehabBudget + totalHoldingCosts;
    const sellingCosts = arv * (sellingCostPercentage / 100);
    const totalInvestment = totalCost + sellingCosts;
    const netProfit = arv - totalInvestment;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    const profitPerMonth = holdingPeriod > 0 ? netProfit / holdingPeriod : 0;
    const isProfitable = netProfit > 0;

    return {
      totalCost,
      sellingCosts,
      totalInvestment,
      netProfit,
      roi,
      profitPerMonth,
      isProfitable,
    };
  };

  useEffect(() => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setCurrentOutputs({
      totalCost: calculatedResults.totalCost,
      sellingCosts: calculatedResults.sellingCosts,
      totalInvestment: calculatedResults.totalInvestment,
      netProfit: calculatedResults.netProfit,
      roi: calculatedResults.roi,
      profitPerMonth: calculatedResults.profitPerMonth,
      isProfitable: calculatedResults.isProfitable,
    });
  }, [inputs]);

  const handleInputChange = (field: keyof FlipInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    if (!results) return

    generateProFormaPDF({
      toolName: 'Flip Calculator',
      inputs: {
        'Purchase Price': formatCurrency(parseFloat(inputs.purchasePrice) || 0),
        'Rehab Budget': formatCurrency(parseFloat(inputs.rehabBudget) || 0),
        'After Repair Value (ARV)': formatCurrency(parseFloat(inputs.afterRepairValue) || 0),
        'Holding Period': `${inputs.holdingPeriod} months`,
        'Monthly Holding Costs': formatCurrency(parseFloat(inputs.monthlyHoldingCosts) || 0),
        'Selling Cost Percentage': `${inputs.sellingCostPercentage}%`,
      },
      outputs: {
        'Total Cost': formatCurrency(results.totalCost),
        'Selling Costs': formatCurrency(results.sellingCosts),
        'Total Investment': formatCurrency(results.totalInvestment),
        'Net Profit': formatCurrency(results.netProfit),
        'Return on Investment (ROI)': formatPercent(results.roi),
        'Profit Per Month': formatCurrency(results.profitPerMonth),
        'Deal Status': results.isProfitable ? 'Profitable Flip' : 'Not Profitable',
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Flip Calculator</h1>
              <p className="text-slate-400 mt-1">Analyze fix-and-flip property investments</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <FileDown className="h-5 w-5" />
            Download Pro Forma PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Purchase & Rehab</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Rehab Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.rehabBudget}
                      onChange={(e) => handleInputChange('rehabBudget', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2 inline-flex items-center">
                    After Repair Value (ARV)
                    <Tooltip
                      term="ARV (After Repair Value)"
                      definition="The estimated value of a property after renovations and repairs are completed. Used in fix-and-flip and BRRR strategies."
                    />
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.afterRepairValue}
                      onChange={(e) => handleInputChange('afterRepairValue', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Holding & Selling</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Estimated Holding Period
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.holdingPeriod}
                      onChange={(e) => handleInputChange('holdingPeriod', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">months</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Monthly Holding Costs
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                    <input
                      type="number"
                      value={inputs.monthlyHoldingCosts}
                      onChange={(e) => handleInputChange('monthlyHoldingCosts', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Loan, taxes, insurance, utilities</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Selling Costs Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.sellingCostPercentage}
                      onChange={(e) => handleInputChange('sellingCostPercentage', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Agent fees + closing costs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Flip Analysis</h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Calculator className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Total Cost</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.totalCost)}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Purchase + Rehab + Holding</p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <DollarSign className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Selling Costs</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.sellingCosts)}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{inputs.sellingCostPercentage}% of ARV</p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                          <Calculator className="h-5 w-5 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Total Investment</p>
                          <p className="text-xl font-bold text-white">{formatCurrency(results.totalInvestment)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-700/50 my-4"></div>

                    <div className={`p-6 rounded-xl border-2 ${results.isProfitable ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'}`}>
                      <div className="text-center mb-4">
                        <p className="text-sm font-medium mb-2 text-slate-300">Net Profit</p>
                        <p className={`text-4xl font-bold ${results.isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(results.netProfit)}
                        </p>
                      </div>
                      <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${results.isProfitable ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                        {results.isProfitable ? (
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className={`font-semibold ${results.isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                          {results.isProfitable ? 'Profitable Flip' : 'Not Profitable'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Return on Investment (ROI)</p>
                          <p className={`text-2xl font-bold ${results.roi >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                            {formatPercent(results.roi)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                          <Clock className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-400">Profit Per Month</p>
                          <p className={`text-xl font-bold ${results.profitPerMonth >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                            {formatCurrency(results.profitPerMonth)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {user && (
                  <ScenarioPanel
                    toolSlug="flip"
                    currentInputs={inputs}
                    currentOutputs={currentOutputs}
                    onLoadScenario={(inputs: Record<string, any>) => setInputs(inputs as FlipInputs)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}
