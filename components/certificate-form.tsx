"use client"

import { useState, useRef } from "react"
import { Upload, FileText, Loader2, CheckCircle, ExternalLink } from "lucide-react"

// Mock API response for certificate issuance
// TODO: Replace with real Axios call to POST /api/issue-certificate
const mockIssueCertificate = async (): Promise<{
  success: boolean
  certificateHash: string
  ipfsUrl: string
}> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  
  return {
    success: true,
    certificateHash: "0xabc123def456",
    ipfsUrl: "https://ipfs.io/ipfs/mockxyz123",
  }
}

interface FormData {
  recipient: string
  issuer: string
  event: string
  date: string
  file: File | null
}

interface FormErrors {
  recipient?: string
  issuer?: string
  event?: string
  date?: string
  file?: string
}

interface IssuedCertificate {
  certificateHash: string
  ipfsUrl: string
}

export function CertificateForm() {
  const [formData, setFormData] = useState<FormData>({
    recipient: "",
    issuer: "",
    event: "",
    date: "",
    file: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [issuedCertificate, setIssuedCertificate] = useState<IssuedCertificate | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.recipient.trim()) {
      newErrors.recipient = "Recipient name is required"
    }
    if (!formData.issuer.trim()) {
      newErrors.issuer = "Issuer name is required"
    }
    if (!formData.event.trim()) {
      newErrors.event = "Event / Credential name is required"
    }
    if (!formData.date) {
      newErrors.date = "Issue date is required"
    }
    if (!formData.file) {
      newErrors.file = "Certificate file is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Mock API call - replace with real Axios call
      // const formPayload = new FormData()
      // formPayload.append('recipient', formData.recipient)
      // formPayload.append('issuer', formData.issuer)
      // formPayload.append('event', formData.event)
      // formPayload.append('date', formData.date)
      // formPayload.append('file', formData.file!)
      // const response = await axios.post('/api/issue-certificate', formPayload)

      const response = await mockIssueCertificate()

      if (response.success) {
        setIssuedCertificate({
          certificateHash: response.certificateHash,
          ipfsUrl: response.ipfsUrl,
        })
      }
    } catch (error) {
      console.error("Failed to issue certificate:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
    if (file) {
      setErrors((prev) => ({ ...prev, file: undefined }))
    }
  }

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const resetForm = () => {
    setFormData({
      recipient: "",
      issuer: "",
      event: "",
      date: "",
      file: null,
    })
    setIssuedCertificate(null)
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (issuedCertificate) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#13131a] border-2 border-[#22c55e]/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-[#22c55e]/10">
            <CheckCircle className="h-12 w-12 text-[#22c55e]" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#22c55e]">Certificate Issued Successfully</h2>
          
          <div className="w-full space-y-4 p-6 rounded-xl bg-[#1a1a2e]">
            <div className="space-y-2">
              <p className="text-sm text-[#cbd5e1]">Certificate Hash</p>
              <p className="font-mono text-sm text-white bg-[#0a0a0f] p-3 rounded-lg break-all">
                {issuedCertificate.certificateHash}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-[#cbd5e1]">View on IPFS</p>
              <a
                href={issuedCertificate.ipfsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-mono text-sm text-[#0d9488] hover:text-[#14b8a6] transition-colors"
              >
                {issuedCertificate.ipfsUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-lg bg-[#7c3aed] text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_#7c3aed]"
          >
            Issue Another Certificate
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#13131a] border border-[rgba(124,58,237,0.3)]">
      <div className="space-y-6">
        {/* Recipient Name */}
        <div className="space-y-2">
          <label htmlFor="recipient" className="block text-sm font-medium text-[#e2e8f0]">
            Recipient Name
          </label>
          <input
            id="recipient"
            type="text"
            value={formData.recipient}
            onChange={handleInputChange("recipient")}
            placeholder="Enter recipient's full name"
            className={`w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white placeholder-[#64748b] border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] ${
              errors.recipient ? "border-[#ef4444]" : "border-[rgba(124,58,237,0.3)] hover:border-[#7c3aed]/60"
            }`}
          />
          {errors.recipient && (
            <p className="text-sm text-[#ef4444]">{errors.recipient}</p>
          )}
        </div>

        {/* Issuer Name */}
        <div className="space-y-2">
          <label htmlFor="issuer" className="block text-sm font-medium text-[#e2e8f0]">
            Issuer Name
          </label>
          <input
            id="issuer"
            type="text"
            value={formData.issuer}
            onChange={handleInputChange("issuer")}
            placeholder="Enter issuing organization"
            className={`w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white placeholder-[#64748b] border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] ${
              errors.issuer ? "border-[#ef4444]" : "border-[rgba(124,58,237,0.3)] hover:border-[#7c3aed]/60"
            }`}
          />
          {errors.issuer && (
            <p className="text-sm text-[#ef4444]">{errors.issuer}</p>
          )}
        </div>

        {/* Event / Credential Name */}
        <div className="space-y-2">
          <label htmlFor="event" className="block text-sm font-medium text-[#e2e8f0]">
            Event / Credential Name
          </label>
          <input
            id="event"
            type="text"
            value={formData.event}
            onChange={handleInputChange("event")}
            placeholder="e.g., Web3 Hackathon, Blockchain Developer Certification"
            className={`w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white placeholder-[#64748b] border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] ${
              errors.event ? "border-[#ef4444]" : "border-[rgba(124,58,237,0.3)] hover:border-[#7c3aed]/60"
            }`}
          />
          {errors.event && (
            <p className="text-sm text-[#ef4444]">{errors.event}</p>
          )}
        </div>

        {/* Issue Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-[#e2e8f0]">
            Issue Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange("date")}
            className={`w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] ${
              errors.date ? "border-[#ef4444]" : "border-[rgba(124,58,237,0.3)] hover:border-[#7c3aed]/60"
            } [color-scheme:dark]`}
          />
          {errors.date && (
            <p className="text-sm text-[#ef4444]">{errors.date}</p>
          )}
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label htmlFor="file" className="block text-sm font-medium text-[#e2e8f0]">
            Upload Certificate File
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300 ${
              errors.file
                ? "border-[#ef4444] bg-[#ef4444]/5"
                : formData.file
                ? "border-[#7c3aed]/50 bg-[#7c3aed]/5"
                : "border-[rgba(124,58,237,0.3)] hover:border-[#7c3aed]/60 hover:bg-[#1a1a2e]"
            }`}
          >
            {formData.file ? (
              <div className="flex items-center gap-3 text-[#7c3aed]">
                <FileText className="h-8 w-8" />
                <span className="font-medium text-white">{formData.file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#cbd5e1]">
                <Upload className="h-8 w-8" />
                <span className="text-white">Click to upload or drag and drop</span>
                <span className="text-xs text-[#64748b]">PDF, PNG, JPG up to 10MB</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
          />
          {errors.file && (
            <p className="text-sm text-[#ef4444]">{errors.file}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#7c3aed] text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Issuing Certificate...
            </>
          ) : (
            "Issue Certificate"
          )}
        </button>
      </div>
    </form>
  )
}
