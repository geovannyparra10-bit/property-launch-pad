import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, ChevronDown, ChevronUp, Send, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { ScenarioPanel } from '../components/ScenarioPanel'
import { PremiumFeatureModal } from '../components/PremiumFeatureModal'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface ExtractedData {
  monthlyRentalIncome: string
  annualRentalIncome: string
  numberOfUnits: string
  averageRentPerUnit: string
  vacancyAmount: string
  vacancyRate: string
  insurance: string
  propertyTax: string
  maintenance: string
  management: string
  utilities: string
  otherExpenses: string
  noi: string
  debtService: string
  cashFlow: string
}

export function DocumentAnalyzer() {
  const { user, profile } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [rawText, setRawText] = useState('')
  const [showRawText, setShowRawText] = useState(false)
  const [showCalculatorMenu, setShowCalculatorMenu] = useState(false)

  const [extractedData, setExtractedData] = useState<ExtractedData>({
    monthlyRentalIncome: '',
    annualRentalIncome: '',
    numberOfUnits: '',
    averageRentPerUnit: '',
    vacancyAmount: '',
    vacancyRate: '',
    insurance: '',
    propertyTax: '',
    maintenance: '',
    management: '',
    utilities: '',
    otherExpenses: '',
    noi: '',
    debtService: '',
    cashFlow: ''
  })

  useEffect(() => {
    if (!user) return
    if (!profile?.subscription_status || profile?.subscription_status === 'free') {
      setShowPremiumModal(true)
    }
  }, [user, profile])

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      fullText += pageText + '\n'
    }

    return fullText
  }

  const extractFinancialData = (text: string): ExtractedData => {
    const data: ExtractedData = {
      monthlyRentalIncome: '',
      annualRentalIncome: '',
      numberOfUnits: '',
      averageRentPerUnit: '',
      vacancyAmount: '',
      vacancyRate: '',
      insurance: '',
      propertyTax: '',
      maintenance: '',
      management: '',
      utilities: '',
      otherExpenses: '',
      noi: '',
      debtService: '',
      cashFlow: ''
    }

    const normalizedText = text.toLowerCase()

    const extractCurrency = (pattern: RegExp): string => {
      const match = text.match(pattern)
      if (match) {
        const value = match[1].replace(/[£$,]/g, '')
        return value
      }
      return ''
    }

    const extractPercentage = (pattern: RegExp): string => {
      const match = text.match(pattern)
      if (match) {
        return match[1].replace('%', '')
      }
      return ''
    }

    if (normalizedText.includes('rental income') || normalizedText.includes('rent roll')) {
      data.monthlyRentalIncome = extractCurrency(/(?:monthly\s+)?rental\s+income[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
      data.annualRentalIncome = extractCurrency(/(?:annual|yearly)\s+rental\s+income[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)

      if (!data.annualRentalIncome && data.monthlyRentalIncome) {
        data.annualRentalIncome = (parseFloat(data.monthlyRentalIncome) * 12).toString()
      } else if (!data.monthlyRentalIncome && data.annualRentalIncome) {
        data.monthlyRentalIncome = (parseFloat(data.annualRentalIncome) / 12).toString()
      }
    }

    data.numberOfUnits = extractCurrency(/(?:number\s+of\s+units|units|total\s+units)[:\s]+(\d+)/i)

    if (data.monthlyRentalIncome && data.numberOfUnits) {
      const avgRent = parseFloat(data.monthlyRentalIncome) / parseFloat(data.numberOfUnits)
      if (!isNaN(avgRent)) {
        data.averageRentPerUnit = avgRent.toFixed(2)
      }
    }

    data.vacancyAmount = extractCurrency(/vacancy[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.vacancyRate = extractPercentage(/vacancy\s+rate[:\s]+([\d.]+)%?/i)

    data.insurance = extractCurrency(/insurance[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.propertyTax = extractCurrency(/(?:property\s+tax|taxes)[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.maintenance = extractCurrency(/maintenance[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.management = extractCurrency(/management[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.utilities = extractCurrency(/utilities[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)

    data.noi = extractCurrency(/(?:net\s+operating\s+income|noi)[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.debtService = extractCurrency(/(?:debt\s+service|mortgage\s+payment)[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)
    data.cashFlow = extractCurrency(/(?:cash\s+flow|net\s+cash\s+flow)[:\s]+[£$]?([\d,]+(?:\.\d{2})?)/i)

    return data
  }

  const handleFileSelect = async (file: File) => {
    if (!profile?.subscription_status || profile?.subscription_status === 'free') {
      setShowPremiumModal(true)
      return
    }

    const fileType = file.type
    const fileName = file.name.toLowerCase()

    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      showToast('Please upload a PDF or image file', 'error')
      return
    }

    setIsProcessing(true)
    setRawText('')
    setExtractedData({
      monthlyRentalIncome: '',
      annualRentalIncome: '',
      numberOfUnits: '',
      averageRentPerUnit: '',
      vacancyAmount: '',
      vacancyRate: '',
      insurance: '',
      propertyTax: '',
      maintenance: '',
      management: '',
      utilities: '',
      otherExpenses: '',
      noi: '',
      debtService: '',
      cashFlow: ''
    })

    try {
      if (fileType.includes('pdf') || fileName.endsWith('.pdf')) {
        const text = await extractTextFromPDF(file)
        setRawText(text)
        const extracted = extractFinancialData(text)
        setExtractedData(extracted)
        showToast('Document processed successfully', 'success')
      } else {
        showToast('Image OCR coming soon — please upload a PDF for now', 'info')
      }
    } catch (error) {
      console.error('Error processing file:', error)
      showToast('Error processing document. Please try again.', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFieldChange = (field: keyof ExtractedData, value: string) => {
    setExtractedData(prev => ({ ...prev, [field]: value }))
  }

  const sendToCalculator = (calculator: string) => {
    const data = extractedData

    switch (calculator) {
      case 'rental_yield':
        navigate(`/tools/rental_yield?monthlyRent=${data.monthlyRentalIncome}&propertyTax=${data.propertyTax}&insurance=${data.insurance}&maintenance=${data.maintenance}&vacancyRate=${data.vacancyRate}`)
        break
      case 'mortgage_calculator':
        navigate(`/tools/mortgage_calculator?propertyTax=${data.propertyTax}&insurance=${data.insurance}`)
        break
      case 'house_hack':
        navigate(`/tools/house_hack?numberOfUnits=${data.numberOfUnits}&rentPerUnit=${data.averageRentPerUnit}&propertyTax=${data.propertyTax}&insurance=${data.insurance}`)
        break
      case 'brrr':
        navigate(`/tools/brrr?monthlyRent=${data.monthlyRentalIncome}&propertyTax=${data.propertyTax}&insurance=${data.insurance}`)
        break
      case 'deal_analyzer':
        localStorage.setItem('documentAnalyzerData', JSON.stringify(data))
        navigate('/tools/deal_analyzer')
        break
      case 'portfolio_analyzer':
        localStorage.setItem('documentAnalyzerData', JSON.stringify(data))
        navigate('/tools/portfolio_analyzer')
        break
    }
    setShowCalculatorMenu(false)
  }

  const currentInputs = {
    'Monthly Rental Income': extractedData.monthlyRentalIncome,
    'Annual Rental Income': extractedData.annualRentalIncome,
    'Number of Units': extractedData.numberOfUnits,
    'NOI': extractedData.noi,
    'Cash Flow': extractedData.cashFlow
  }

  const currentOutputs = {
    'Total Extracted Fields': Object.values(extractedData).filter(v => v !== '').length.toString()
  }

  const hasExtractedData = Object.values(extractedData).some(v => v !== '')

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Document Analyzer</h1>
          <p className="text-gray-400">
            Upload rent rolls, P&L statements, or operating statements to automatically extract financial data
          </p>
        </div>

        {user && profile?.subscription_status && profile?.subscription_status !== 'free' && (
          <ScenarioPanel
            toolSlug="document_analyzer"
            currentInputs={currentInputs}
            currentOutputs={currentOutputs}
            onLoadScenario={() => {}}
          />
        )}

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Upload Document</h2>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
              >
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                    <p className="text-gray-300">Processing document...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">
                      Drag and drop your document here
                    </p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                    <p className="text-xs text-gray-600 mt-4">
                      Supports PDF files. Image OCR coming soon.
                    </p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {rawText && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <button
                  onClick={() => setShowRawText(!showRawText)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold">Raw Extracted Text</h3>
                  </div>
                  {showRawText ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {showRawText && (
                  <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-600 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {rawText}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Extracted Data</h2>
                {hasExtractedData && (
                  <div className="relative">
                    <button
                      onClick={() => setShowCalculatorMenu(!showCalculatorMenu)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Send to Calculator
                    </button>

                    {showCalculatorMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-10">
                        <div className="p-2">
                          <button
                            onClick={() => sendToCalculator('rental_yield')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            Rental Yield Calculator
                          </button>
                          <button
                            onClick={() => sendToCalculator('mortgage_calculator')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            Mortgage Calculator
                          </button>
                          <button
                            onClick={() => sendToCalculator('house_hack')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            House Hack Calculator
                          </button>
                          <button
                            onClick={() => sendToCalculator('brrr')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            BRRR Calculator
                          </button>
                          <button
                            onClick={() => sendToCalculator('deal_analyzer')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            Deal Analyzer
                          </button>
                          <button
                            onClick={() => sendToCalculator('portfolio_analyzer')}
                            className="w-full text-left px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            Portfolio Analyzer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!hasExtractedData ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload a document to see extracted data</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Monthly Rental Income
                      </label>
                      <input
                        type="text"
                        value={extractedData.monthlyRentalIncome}
                        onChange={(e) => handleFieldChange('monthlyRentalIncome', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Annual Rental Income
                      </label>
                      <input
                        type="text"
                        value={extractedData.annualRentalIncome}
                        onChange={(e) => handleFieldChange('annualRentalIncome', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Number of Units
                      </label>
                      <input
                        type="text"
                        value={extractedData.numberOfUnits}
                        onChange={(e) => handleFieldChange('numberOfUnits', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Average Rent/Unit
                      </label>
                      <input
                        type="text"
                        value={extractedData.averageRentPerUnit}
                        onChange={(e) => handleFieldChange('averageRentPerUnit', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Vacancy Amount
                      </label>
                      <input
                        type="text"
                        value={extractedData.vacancyAmount}
                        onChange={(e) => handleFieldChange('vacancyAmount', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Vacancy Rate (%)
                      </label>
                      <input
                        type="text"
                        value={extractedData.vacancyRate}
                        onChange={(e) => handleFieldChange('vacancyRate', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Operating Expenses</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Insurance
                          </label>
                          <input
                            type="text"
                            value={extractedData.insurance}
                            onChange={(e) => handleFieldChange('insurance', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Property Tax
                          </label>
                          <input
                            type="text"
                            value={extractedData.propertyTax}
                            onChange={(e) => handleFieldChange('propertyTax', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Maintenance
                          </label>
                          <input
                            type="text"
                            value={extractedData.maintenance}
                            onChange={(e) => handleFieldChange('maintenance', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Management
                          </label>
                          <input
                            type="text"
                            value={extractedData.management}
                            onChange={(e) => handleFieldChange('management', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Utilities
                        </label>
                        <input
                          type="text"
                          value={extractedData.utilities}
                          onChange={(e) => handleFieldChange('utilities', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Net Operating Income (NOI)
                        </label>
                        <input
                          type="text"
                          value={extractedData.noi}
                          onChange={(e) => handleFieldChange('noi', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Debt Service / Mortgage Payment
                        </label>
                        <input
                          type="text"
                          value={extractedData.debtService}
                          onChange={(e) => handleFieldChange('debtService', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Cash Flow
                        </label>
                        <input
                          type="text"
                          value={extractedData.cashFlow}
                          onChange={(e) => handleFieldChange('cashFlow', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PremiumFeatureModal
        isOpen={showPremiumModal}
        onClose={() => {
          setShowPremiumModal(false)
          if (!profile?.subscription_status || profile?.subscription_status === 'free') {
            navigate('/pricing')
          }
        }}
      />
    </div>
  )
}
