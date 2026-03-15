import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { CertificateCard } from "@/components/certificate-card"

// Mock API response for certificate lookup by hash
// This page is for direct hash-based lookup (not used by the main verify flow)
async function getCertificateByHash(hash: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Only return mock data for the exact demo hash
  if (hash === "0xabc123def456") {
    return {
      hash: hash,
      recipient: "Naveen Patil",
      issuer: "HackIndia",
      event: "Web3 Hackathon",
      date: "2026-02-10",
      ipfsUrl: "https://ipfs.io/ipfs/QmDemo",
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
    <div 
      className="min-h-[calc(100vh-64px)] px-4 py-12 md:py-20"
      style={{
        background: 'radial-gradient(ellipse at center top, rgba(124, 58, 237, 0.1) 0%, #0a0a0f 60%)'
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 text-[#cbd5e1] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Verify
        </Link>

        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Certificate <span className="text-[#7c3aed]">Details</span>
          </h1>
          <p className="text-sm font-mono text-[#cbd5e1] break-all max-w-xl mx-auto">
            {hash}
          </p>
        </div>

        {/* Certificate Card or Not Found */}
        {certificate ? (
          <CertificateCard certificate={certificate} />
        ) : (
          <div className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#13131a] border-2 border-[#ef4444]/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 rounded-full bg-[#ef4444]/10">
                <AlertTriangle className="h-12 w-12 text-[#ef4444]" />
              </div>
              
              <h2 className="text-2xl font-bold text-[#ef4444]">Certificate Not Found</h2>
              
              <p className="text-[#e2e8f0]">
                No certificate was found with the provided hash. The certificate may not exist 
                or the hash may be incorrect.
              </p>

              <Link
                href="/verify"
                className="px-6 py-3 rounded-lg bg-[#0d9488] text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_#0d9488]"
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
