import { VerifyForm } from "@/components/verify-form"

export default function VerifyPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-12 md:py-20">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Verify a <span className="text-secondary">Certificate</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
