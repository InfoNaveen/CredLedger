import Link from "next/link"
import { Upload, Database, CheckCircle, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 lg:py-40">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              ProofChain
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Decentralized Credential Verification
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80 text-pretty">
            Issue tamper-proof certificates on the blockchain. Verify authenticity in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/issue"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105"
            >
              Issue Certificate
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/verify"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(13,148,136,0.6)] hover:scale-105"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                Step 1
              </div>
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Upload Your Certificate</h3>
                <p className="text-muted-foreground">
                  Submit your certificate document through our secure platform for blockchain registration.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                Step 2
              </div>
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <Database className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Blockchain Records It</h3>
                <p className="text-muted-foreground">
                  Your certificate is permanently recorded on the blockchain, creating an immutable proof of authenticity.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-secondary/50 hover:shadow-[0_0_40px_rgba(13,148,136,0.15)]">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                Step 3
              </div>
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="p-4 rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(13,148,136,0.3)]">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Instant Verification</h3>
                <p className="text-muted-foreground">
                  Anyone can verify the certificate authenticity instantly by uploading it to our verification portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>Built on blockchain technology for trustless verification.</p>
          <p className="font-mono text-xs">ProofChain v1.0</p>
        </div>
      </footer>
    </div>
  )
}
