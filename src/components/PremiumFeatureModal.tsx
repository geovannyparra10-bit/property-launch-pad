import { X, Crown } from 'lucide-react';
import { getPaymentLink } from '../lib/paymentLink';

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function PremiumFeatureModal({ isOpen, onClose, featureName = 'Pro Forma PDFs' }: PremiumFeatureModalProps) {

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    window.location.href = getPaymentLink();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl border border-amber-500/30 mb-6">
            <Crown className="h-12 w-12 text-amber-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">Premium Feature</h2>

          <p className="text-slate-300 mb-6 leading-relaxed">
            <span className="font-semibold text-white">{featureName}</span> are a Premium feature.
            Upgrade to unlock professional reports you can share with lenders and partners.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={handleUpgrade}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
