import { VerifyForm } from "@/components/verify-form"

export default function VerifyPage() {
  return (
    <div 
      className="min-h-[calc(100vh-64px)] px-4 py-12 md:py-20"
      style={{
        background: 'radial-gradient(ellipse at center top, rgba(13, 148, 136, 0.1) 0%, #0a0a0f 60%)'
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Verify a <span className="text-[#0d9488]">Certificate</span>
          </h1>
          <p className="text-lg text-[#e2e8f0] max-w-2xl mx-auto">
            Upload a certificate to verify its authenticity on the blockchain. 
            Instantly check if a credential is genuine and registered.
          </p>
        </div>

        {/* Verify Form */}
        <VerifyForm />
      </div>
    </div>
  )
}
