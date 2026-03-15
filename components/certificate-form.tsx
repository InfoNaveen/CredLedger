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
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-card border-2 border-success/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-success/10">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          
          <h2 className="text-2xl font-bold text-success">Certificate Issued Successfully</h2>
          
          <div className="w-full space-y-4 p-6 rounded-xl bg-muted/30">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Certificate Hash</p>
              <p className="font-mono text-sm text-foreground bg-muted/50 p-3 rounded-lg break-all">
                {issuedCertificate.certificateHash}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">View on IPFS</p>
              <a
                href={issuedCertificate.ipfsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-mono text-sm text-secondary hover:text-secondary/80 transition-colors"
              >
                {issuedCertificate.ipfsUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
          >
            Issue Another Certificate
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-card border border-border/50">
      <div className="space-y-6">
        {/* Recipient Name */}
        <div className="space-y-2">
          <label htmlFor="recipient" className="block text-sm font-medium">
            Recipient Name
          </label>
          <input
            id="recipient"
            type="text"
            value={formData.recipient}
            onChange={handleInputChange("recipient")}
            placeholder="Enter recipient's full name"
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.recipient ? "border-destructive" : "border-border/50 hover:border-primary/50"
            }`}
          />
          {errors.recipient && (
            <p className="text-sm text-destructive">{errors.recipient}</p>
          )}
        </div>

        {/* Issuer Name */}
        <div className="space-y-2">
          <label htmlFor="issuer" className="block text-sm font-medium">
            Issuer Name
          </label>
          <input
            id="issuer"
            type="text"
            value={formData.issuer}
            onChange={handleInputChange("issuer")}
            placeholder="Enter issuing organization"
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.issuer ? "border-destructive" : "border-border/50 hover:border-primary/50"
            }`}
          />
          {errors.issuer && (
            <p className="text-sm text-destructive">{errors.issuer}</p>
          )}
        </div>

        {/* Event / Credential Name */}
        <div className="space-y-2">
          <label htmlFor="event" className="block text-sm font-medium">
            Event / Credential Name
          </label>
          <input
            id="event"
            type="text"
            value={formData.event}
            onChange={handleInputChange("event")}
            placeholder="e.g., Web3 Hackathon, Blockchain Developer Certification"
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.event ? "border-destructive" : "border-border/50 hover:border-primary/50"
            }`}
          />
          {errors.event && (
            <p className="text-sm text-destructive">{errors.event}</p>
          )}
        </div>

        {/* Issue Date */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium">
            Issue Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange("date")}
            className={`w-full px-4 py-3 rounded-lg bg-muted/30 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              errors.date ? "border-destructive" : "border-border/50 hover:border-primary/50"
            } [color-scheme:dark]`}
          />
          {errors.date && (
            <p className="text-sm text-destructive">{errors.date}</p>
          )}
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label htmlFor="file" className="block text-sm font-medium">
            Upload Certificate File
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300 ${
              errors.file
                ? "border-destructive bg-destructive/5"
                : formData.file
                ? "border-primary/50 bg-primary/5"
                : "border-border/50 hover:border-primary/50 hover:bg-muted/20"
            }`}
          >
            {formData.file ? (
              <div className="flex items-center gap-3 text-primary">
                <FileText className="h-8 w-8" />
                <span className="font-medium">{formData.file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <span>Click to upload or drag and drop</span>
                <span className="text-xs">PDF, PNG, JPG up to 10MB</span>
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
            <p className="text-sm text-destructive">{errors.file}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
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
