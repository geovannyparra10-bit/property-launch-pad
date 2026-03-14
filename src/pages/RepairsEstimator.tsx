import { useState, useEffect } from 'react';
import { Wrench, Hop as Home, DollarSign, TrendingUp, FileDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { PremiumFeatureModal } from '../components/PremiumFeatureModal';
import { generateProFormaPDF } from '../utils/pdfGenerator';
import DisclaimerBanner from '../components/DisclaimerBanner';

interface RepairCategory {
  id: string;
  name: string;
  diyRate: number;
  proRate: number;
  type: 'sqft' | 'fixed' | 'per_bath';
  checked: boolean;
}

export default function RepairsEstimator() {
  const { user, profile } = useAuth();
  const [squareFootage, setSquareFootage] = useState('1500');
  const [propertyAge, setPropertyAge] = useState('20');
  const [condition, setCondition] = useState<'Good' | 'Fair' | 'Poor'>('Fair');
  const [bathrooms, setBathrooms] = useState('2');
  const [viewMode, setViewMode] = useState<'DIY' | 'Pro'>('Pro');
  const [currentOutputs, setCurrentOutputs] = useState<Record<string, any>>({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const [categories, setCategories] = useState<RepairCategory[]>([
    { id: 'roof', name: 'Roof', diyRate: 3.50, proRate: 7.00, type: 'sqft', checked: true },
    { id: 'hvac', name: 'HVAC', diyRate: 2.50, proRate: 6.00, type: 'sqft', checked: true },
    { id: 'plumbing', name: 'Plumbing', diyRate: 2.00, proRate: 5.00, type: 'sqft', checked: true },
    { id: 'electrical', name: 'Electrical', diyRate: 1.50, proRate: 4.00, type: 'sqft', checked: true },
    { id: 'flooring', name: 'Flooring', diyRate: 2.00, proRate: 6.00, type: 'sqft', checked: true },
    { id: 'kitchen', name: 'Kitchen', diyRate: 5000, proRate: 15000, type: 'fixed', checked: true },
    { id: 'bathrooms', name: 'Bathrooms', diyRate: 2500, proRate: 8000, type: 'per_bath', checked: true },
    { id: 'paint', name: 'Paint & Drywall', diyRate: 1.00, proRate: 3.00, type: 'sqft', checked: true },
    { id: 'windows', name: 'Windows & Doors', diyRate: 2.00, proRate: 5.50, type: 'sqft', checked: true },
    { id: 'foundation', name: 'Foundation', diyRate: 3.00, proRate: 8.00, type: 'sqft', checked: true },
    { id: 'landscaping', name: 'Landscaping', diyRate: 0.50, proRate: 2.00, type: 'sqft', checked: true },
  ]);

  const getConditionMultiplier = () => {
    switch (condition) {
      case 'Good': return 0.5;
      case 'Fair': return 1.0;
      case 'Poor': return 1.5;
      default: return 1.0;
    }
  };

  const getAgeMultiplier = () => {
    const age = parseFloat(propertyAge) || 0;
    if (age < 10) return 0.7;
    if (age <= 30) return 1.0;
    return 1.3;
  };

  const calculateCategoryCost = (category: RepairCategory, isDIY: boolean) => {
    if (!category.checked) return 0;

    const sqft = parseFloat(squareFootage) || 0;
    const baths = parseFloat(bathrooms) || 0;
    const rate = isDIY ? category.diyRate : category.proRate;

    switch (category.type) {
      case 'sqft':
        return sqft * rate;
      case 'fixed':
        return rate;
      case 'per_bath':
        return baths * rate;
      default:
        return 0;
    }
  };

  const calculateTotals = () => {
    let diySubtotal = 0;
    let proSubtotal = 0;

    categories.forEach(category => {
      diySubtotal += calculateCategoryCost(category, true);
      proSubtotal += calculateCategoryCost(category, false);
    });

    const conditionMultiplier = getConditionMultiplier();
    const ageMultiplier = getAgeMultiplier();

    const diyTotal = diySubtotal * conditionMultiplier * ageMultiplier;
    const proTotal = proSubtotal * conditionMultiplier * ageMultiplier;

    return {
      diySubtotal,
      proSubtotal,
      conditionMultiplier,
      ageMultiplier,
      diyTotal,
      proTotal,
    };
  };

  const totals = calculateTotals();

  useEffect(() => {
    const categoryStates: Record<string, boolean> = {};
    categories.forEach(cat => {
      categoryStates[cat.id] = cat.checked;
    });

    setCurrentOutputs({
      squareFootage,
      propertyAge,
      condition,
      bathrooms,
      viewMode,
      categories: categoryStates,
      diyTotal: totals.diyTotal,
      proTotal: totals.proTotal,
    });
  }, [squareFootage, propertyAge, condition, bathrooms, viewMode, categories, totals.diyTotal, totals.proTotal]);

  const handleCategoryToggle = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const handleLoadScenario = (inputs: Record<string, any>) => {
    setSquareFootage(inputs.squareFootage || '1500');
    setPropertyAge(inputs.propertyAge || '20');
    setCondition(inputs.condition || 'Fair');
    setBathrooms(inputs.bathrooms || '2');
    setViewMode(inputs.viewMode || 'Pro');

    if (inputs.categories) {
      setCategories(prev =>
        prev.map(cat => ({
          ...cat,
          checked: inputs.categories[cat.id] !== undefined ? inputs.categories[cat.id] : true,
        }))
      );
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDownloadPDF = () => {
    const isPremium = profile?.subscription_status === 'active'

    if (!isPremium) {
      setShowPremiumModal(true)
      return
    }

    const selectedCategories: Record<string, string> = {}
    categories.forEach(cat => {
      if (cat.checked) {
        selectedCategories[cat.name] = formatCurrency(calculateCategoryCost(cat, viewMode === 'DIY'))
      }
    })

    generateProFormaPDF({
      toolName: 'Repairs Estimator',
      inputs: {
        'Square Footage': `${squareFootage} sq ft`,
        'Property Age': `${propertyAge} years`,
        'Condition': condition,
        'Number of Bathrooms': bathrooms,
        'View Mode': viewMode,
      },
      outputs: {
        ...selectedCategories,
        'Subtotal (Before Multipliers)': formatCurrency(viewMode === 'DIY' ? totals.diySubtotal : totals.proSubtotal),
        'Condition Multiplier': `${totals.conditionMultiplier.toFixed(1)}x`,
        'Age Multiplier': `${totals.ageMultiplier.toFixed(1)}x`,
        [`${viewMode} Total`]: formatCurrency(viewMode === 'DIY' ? totals.diyTotal : totals.proTotal),
        'DIY Total': formatCurrency(totals.diyTotal),
        'Pro Total': formatCurrency(totals.proTotal),
        'Savings with DIY': formatCurrency(totals.proTotal - totals.diyTotal),
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Wrench className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Repairs Estimator</h1>
              <p className="text-slate-400 mt-1">Estimate property repair costs with DIY vs Pro pricing</p>
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
              <h2 className="text-xl font-semibold text-white mb-6">Property Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Square Footage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={squareFootage}
                      onChange={(e) => setSquareFootage(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">sq ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Property Age
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={propertyAge}
                      onChange={(e) => setPropertyAge(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Condition
                  </label>
                  <div className="flex gap-2">
                    {(['Good', 'Fair', 'Poor'] as const).map((cond) => (
                      <button
                        key={cond}
                        onClick={() => setCondition(cond)}
                        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                          condition === cond
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-900/50 text-slate-400 border border-slate-600 hover:border-cyan-500/50'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Number of Bathrooms
                  </label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  View Mode
                </label>
                <div className="flex gap-2">
                  {(['DIY', 'Pro'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                        viewMode === mode
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                          : 'bg-slate-900/50 text-slate-400 border border-slate-600 hover:border-cyan-500/50'
                      }`}
                    >
                      {mode === 'DIY' ? 'DIY' : 'Hire a Pro'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Repair Categories</h2>

              <div className="space-y-3">
                {categories.map((category) => {
                  const cost = calculateCategoryCost(category, viewMode === 'DIY');
                  return (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        category.checked
                          ? 'bg-slate-900/50 border-slate-600'
                          : 'bg-slate-900/20 border-slate-700/30 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={category.checked}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900 bg-slate-800"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-white">{category.name}</p>
                          <p className="text-xs text-slate-500">
                            {category.type === 'sqft' && `${viewMode === 'DIY' ? `£${category.diyRate.toFixed(2)}` : `£${category.proRate.toFixed(2)}`}/sq ft`}
                            {category.type === 'fixed' && `${formatCurrency(viewMode === 'DIY' ? category.diyRate : category.proRate)} fixed`}
                            {category.type === 'per_bath' && `${formatCurrency(viewMode === 'DIY' ? category.diyRate : category.proRate)} per bath`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${category.checked ? 'text-white' : 'text-slate-600'}`}>
                          {formatCurrency(cost)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Cost Breakdown</h2>

              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400">Subtotal (Before Multipliers)</p>
                      <p className="text-xl font-bold text-white">
                        {formatCurrency(viewMode === 'DIY' ? totals.diySubtotal : totals.proSubtotal)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-slate-400" />
                      <p className="text-sm text-slate-400">Condition Multiplier</p>
                    </div>
                    <p className="text-lg font-bold text-cyan-400">{totals.conditionMultiplier.toFixed(1)}x</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {condition === 'Good' && 'Property in good condition'}
                    {condition === 'Fair' && 'Property in fair condition'}
                    {condition === 'Poor' && 'Property in poor condition'}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-slate-400" />
                      <p className="text-sm text-slate-400">Age Multiplier</p>
                    </div>
                    <p className="text-lg font-bold text-orange-400">{totals.ageMultiplier.toFixed(1)}x</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {parseFloat(propertyAge) < 10 && 'Property under 10 years'}
                    {parseFloat(propertyAge) >= 10 && parseFloat(propertyAge) <= 30 && 'Property 10-30 years'}
                    {parseFloat(propertyAge) > 30 && 'Property over 30 years'}
                  </p>
                </div>

                <div className="h-px bg-slate-700/50 my-4"></div>

                <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border-2 border-cyan-500/50">
                  <p className="text-sm font-medium text-slate-300 mb-2">{viewMode} Total</p>
                  <p className="text-4xl font-bold text-white mb-4">
                    {formatCurrency(viewMode === 'DIY' ? totals.diyTotal : totals.proTotal)}
                  </p>
                </div>

                <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-700/30">
                  <p className="text-xs font-medium text-slate-400 mb-3">Side-by-Side Comparison</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                      <p className="text-xs text-green-400 font-medium mb-1">DIY Total</p>
                      <p className="text-lg font-bold text-green-400">{formatCurrency(totals.diyTotal)}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <p className="text-xs text-blue-400 font-medium mb-1">Pro Total</p>
                      <p className="text-lg font-bold text-blue-400">{formatCurrency(totals.proTotal)}</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 text-center">
                    <p className="text-xs text-purple-400 font-medium mb-1">Savings with DIY</p>
                    <p className="text-lg font-bold text-purple-400">
                      {formatCurrency(totals.proTotal - totals.diyTotal)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {user && (
              <ScenarioPanel
                toolSlug="repairs_estimator"
                currentInputs={{
                  squareFootage,
                  propertyAge,
                  condition,
                  bathrooms,
                  viewMode,
                  categories: categories.reduce((acc, cat) => {
                    acc[cat.id] = cat.checked;
                    return acc;
                  }, {} as Record<string, boolean>),
                }}
                currentOutputs={currentOutputs}
                onLoadScenario={handleLoadScenario}
              />
            )}
          </div>
        </div>

        <DisclaimerBanner />
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}
