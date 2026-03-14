import { useState } from 'react'
import { Circle as HelpCircle } from 'lucide-react'

interface TooltipProps {
  term: string
  definition: string
}

export function Tooltip({ term, definition }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-1 text-gray-400 hover:text-blue-400 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label={`Definition of ${term}`}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 pointer-events-none">
          <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-xl border border-gray-600">
            <div className="font-semibold text-blue-400 mb-1">{term}</div>
            <div className="text-gray-300">{definition}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-8 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
