import { CertificateForm } from "@/components/certificate-form"

export default function IssuePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-12 md:py-20">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Issue a <span className="text-primary">Certificate</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
