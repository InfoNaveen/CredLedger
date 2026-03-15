import Link from "next/link"
import { Upload, Database, CheckCircle, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 lg:py-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, #0a0a0f 70%)'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#0d9488] bg-clip-text text-transparent">
              ProofChain
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-medium text-[#cbd5e1]">
            Decentralized Credential Verification
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-[#e2e8f0] text-pretty">
            Issue tamper-proof certificates on the blockchain. Verify authenticity in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/issue"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7c3aed] text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_#7c3aed] hover:scale-105"
            >
              Issue Certificate
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/verify"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0d9488] text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_#0d9488] hover:scale-105"
            >
              Verify Certificate
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group relative p-8 rounded-2xl bg-[#13131a] border border-[rgba(124,58,237,0.3)] transition-all duration-300 hover:border-[#7c3aed]/60 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-[#7c3aed] text-white text-sm font-bold">
                Step 1
              </div>
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">Upload Your Certificate</h3>
                <p className="text-[#e2e8f0]">
                  Submit your certificate document through our secure platform for blockchain registration.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative p-8 rounded-2xl bg-[#13131a] border border-[rgba(124,58,237,0.3)] transition-all duration-300 hover:border-[#7c3aed]/60 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-[#7c3aed] text-white text-sm font-bold">
                Step 2
              </div>
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">Blockchain Records It</h3>
                <p className="text-[#e2e8f0]">
                  Your certificate is permanently recorded on the blockchain, creating an immutable proof of authenticity.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative p-8 rounded-2xl bg-[#13131a] border border-[rgba(13,148,136,0.3)] transition-all duration-300 hover:border-[#0d9488]/60 hover:shadow-[0_0_40px_rgba(13,148,136,0.2)]">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-[#0d9488] text-white text-sm font-bold">
                Step 3
              </div>
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-[#0d9488]/10 text-[#0d9488] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(13,148,136,0.3)]">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">Instant Verification</h3>
                <p className="text-[#e2e8f0]">
                  Anyone can verify the certificate authenticity instantly by uploading it to our verification portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(124,58,237,0.2)] px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#cbd5e1]">
          <p>Built on blockchain technology for trustless verification.</p>
          <p className="font-mono text-xs text-[#e2e8f0]">ProofChain v1.0</p>
        </div>
      </footer>
    </div>
  )
}
