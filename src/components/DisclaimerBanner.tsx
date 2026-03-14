import { CircleAlert as AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="mt-8 mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-700">Disclaimer:</span> Property Launch Pad provides educational tools and estimates only. Nothing on this platform constitutes financial, investment, legal, or tax advice. All calculations are estimates based on the information you provide and may not reflect actual costs, returns, or outcomes. Always consult with qualified professionals — including licensed real estate agents, mortgage lenders, CPAs, and attorneys — before making any investment decisions. Property Launch Pad is not responsible for any financial losses resulting from decisions made using these tools.
        </div>
      </div>
    </div>
  );
}
