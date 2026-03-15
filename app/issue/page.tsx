import { CertificateForm } from "@/components/certificate-form"

export default function IssuePage() {
  return (
    <div 
      className="min-h-[calc(100vh-64px)] px-4 py-12 md:py-20"
      style={{
        background: 'radial-gradient(ellipse at center top, rgba(124, 58, 237, 0.1) 0%, #0a0a0f 60%)'
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Issue a <span className="text-[#7c3aed]">Certificate</span>
          </h1>
          <p className="text-lg text-[#e2e8f0] max-w-2xl mx-auto">
            Create a tamper-proof certificate on the blockchain. Once issued, the certificate 
            will be permanently recorded and verifiable by anyone.
          </p>
        </div>

        {/* Certificate Form */}
        <CertificateForm />
      </div>
    </div>
  )
}
