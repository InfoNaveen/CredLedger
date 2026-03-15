"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, FileText, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface VerificationResult {
  verified: boolean
  recipient?: string
  issuer?: string
  event?: string
  date?: string
}

export function VerifyForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
    setResult(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    handleFileChange(selectedFile)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0] || null
    handleFileChange(droppedFile)
  }, [])

  const handleVerify = async () => {
    if (!file) return

    setIsVerifying(true)

    try {
      const formPayload = new FormData()
      formPayload.append('file', file)
      const res = await fetch(`${BACKEND_URL}/api/verify-certificate`, { method: 'POST', body: formPayload })
      const response = await res.json()
      setResult(response)
    } catch (error) {
      console.error("Failed to verify certificate:", error)
      setResult({ verified: false })
    } finally {
      setIsVerifying(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Verified Result
  if (result?.verified) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#13131a] border-2 border-[#22c55e]/50 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-[#22c55e]/10">
            <CheckCircle className="h-12 w-12 text-[#22c55e]" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#22c55e]">Certificate Verified</h2>
          
          <div className="w-full space-y-4 p-6 rounded-xl bg-[#1a1a2e]">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Recipient</p>
                <p className="font-medium text-white">{result.recipient}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Issuer</p>
                <p className="font-medium text-white">{result.issuer}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Event</p>
                <p className="font-medium text-white">{result.event}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Date</p>
                <p className="font-medium text-white">{result.date && formatDate(result.date)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-lg bg-[#0d9488] text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_#0d9488]"
          >
            Verify Another Certificate
          </button>
        </div>
      </div>
    )
  }

  // Not Verified Result
  if (result && !result.verified) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#13131a] border-2 border-[#ef4444]/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-[#ef4444]/10">
            <XCircle className="h-12 w-12 text-[#ef4444]" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#ef4444]">Certificate Not Found</h2>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#ef4444]/10">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-[#ef4444]" />
            <p className="text-sm text-left text-[#fca5a5]">
              This certificate may be fake or not registered on the blockchain. 
              Please verify the source of this document.
            </p>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-lg bg-[#0d9488] text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_#0d9488]"
          >
            Try Another Certificate
          </button>
        </div>
      </div>
    )
  }

  // Upload Form
  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#13131a] border border-[rgba(13,148,136,0.3)]">
      <div className="space-y-6">
        {/* Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-[#0d9488] bg-[#0d9488]/10"
              : file
              ? "border-[#0d9488]/50 bg-[#0d9488]/5"
              : "border-[rgba(13,148,136,0.3)] hover:border-[#0d9488]/60 hover:bg-[#1a1a2e]"
          }`}
        >
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-[#0d9488]/10">
                <FileText className="h-10 w-10 text-[#0d9488]" />
              </div>
              <div className="text-center">
                <p className="font-medium text-[#0d9488]">{file.name}</p>
                <p className="text-sm text-[#cbd5e1] mt-1">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-[#1a1a2e]">
                <Upload className="h-10 w-10 text-[#cbd5e1]" />
              </div>
              <div className="text-center">
                <p className="font-medium text-white">Drop certificate here or click to upload</p>
                <p className="text-sm mt-1 text-[#64748b]">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!file || isVerifying}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#0d9488] text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_#0d9488] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying Certificate...
            </>
          ) : (
            "Verify Certificate"
          )}
        </button>
      </div>
    </div>
  )
}
