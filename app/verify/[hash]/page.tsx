import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { CertificateCard } from "@/components/certificate-card"

// Mock API response for certificate lookup by hash
// TODO: Replace with real Axios call to GET /api/certificate/:hash
async function getCertificateByHash(hash: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Mock response - return certificate data for demo hash
  if (hash === "0xabc123def456" || hash.length > 10) {
    return {
      hash: hash,
      recipient: "Naveen Patil",
      issuer: "HackIndia",
      event: "Web3 Hackathon",
      date: "2026-02-10",
      ipfsUrl: "ipfs://mockxyz123",
    }
  }
  
  return null
}

interface CertificateDetailPageProps {
  params: Promise<{ hash: string }>
}

export default async function CertificateDetailPage({ params }: CertificateDetailPageProps) {
  const { hash } = await params
  const certificate = await getCertificateByHash(hash)

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-12 md:py-20">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Verify
        </Link>

        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Certificate <span className="text-primary">Details</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground break-all max-w-xl mx-auto">
            {hash}
          </p>
        </div>

        {/* Certificate Card or Not Found */}
        {certificate ? (
          <CertificateCard certificate={certificate} />
        ) : (
          <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-card border-2 border-destructive/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 rounded-full bg-destructive/10">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              
              <h2 className="text-2xl font-bold text-destructive">Certificate Not Found</h2>
              
              <p className="text-muted-foreground">
                No certificate was found with the provided hash. The certificate may not exist 
                or the hash may be incorrect.
              </p>

              <Link
                href="/verify"
                className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(13,148,136,0.5)]"
              >
                Verify a Certificate
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
