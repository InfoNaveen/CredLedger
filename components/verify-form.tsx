"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, FileText, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

// Mock API response for certificate verification
// TODO: Replace with real Axios call to POST /api/verify-certificate
const mockVerifyCertificate = async (): Promise<{
  verified: boolean
  recipient?: string
  issuer?: string
  event?: string
  date?: string
}> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  
  // Default to verified state for demo purposes
  return {
    verified: true,
    recipient: "Naveen Patil",
    issuer: "HackIndia",
    event: "Web3 Hackathon",
    date: "2026-02-10",
  }
  
  // Not verified response (uncomment to test):
  // return { verified: false }
}

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
      // Mock API call - replace with real Axios call
      // const formPayload = new FormData()
      // formPayload.append('file', file)
      // const response = await axios.post('/api/verify-certificate', formPayload)

      const response = await mockVerifyCertificate()
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
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-card border-2 border-success/50 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-success/10">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          
          <h2 className="text-2xl font-bold text-success">Certificate Verified</h2>
          
          <div className="w-full space-y-4 p-6 rounded-xl bg-muted/30">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Recipient</p>
                <p className="font-medium">{result.recipient}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Issuer</p>
                <p className="font-medium">{result.issuer}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Event</p>
                <p className="font-medium">{result.event}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                <p className="font-medium">{result.date && formatDate(result.date)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(13,148,136,0.5)]"
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
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-card border-2 border-destructive/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-destructive/10">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          
          <h2 className="text-2xl font-bold text-destructive">Certificate Not Found</h2>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm text-left">
              This certificate may be fake or not registered on the blockchain. 
              Please verify the source of this document.
            </p>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(13,148,136,0.5)]"
          >
            Try Another Certificate
          </button>
        </div>
      </div>
    )
  }

  // Upload Form
  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-card border border-border/50">
      <div className="space-y-6">
        {/* Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-secondary bg-secondary/10"
              : file
              ? "border-secondary/50 bg-secondary/5"
              : "border-border/50 hover:border-secondary/50 hover:bg-muted/20"
          }`}
        >
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-secondary/10">
                <FileText className="h-10 w-10 text-secondary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-secondary">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <div className="p-4 rounded-full bg-muted/30">
                <Upload className="h-10 w-10" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Drop certificate here or click to upload</p>
                <p className="text-sm mt-1">PDF, PNG, JPG up to 10MB</p>
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
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(13,148,136,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
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
