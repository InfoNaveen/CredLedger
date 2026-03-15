import { Shield, ExternalLink, CheckCircle } from "lucide-react"

interface CertificateData {
  hash: string
  recipient: string
  issuer: string
  event: string
  date: string
  ipfsUrl: string
}

interface CertificateCardProps {
  certificate: CertificateData
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-[#13131a] border border-[rgba(124,58,237,0.3)] shadow-[0_0_40px_rgba(124,58,237,0.1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[rgba(124,58,237,0.2)]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#7c3aed]/10">
            <Shield className="h-6 w-6 text-[#7c3aed]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">CredLedger Certificate</h2>
            <p className="text-sm text-[#cbd5e1]">Blockchain Verified</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          Verified
        </div>
      </div>

      {/* Certificate Details */}
      <div className="space-y-6">
        {/* Hash */}
        <div className="space-y-2">
          <p className="text-xs text-[#64748b] uppercase tracking-wider">Certificate Hash</p>
          <p className="font-mono text-sm bg-[#0a0a0f] text-white p-3 rounded-lg break-all">
            {certificate.hash}
          </p>
        </div>

        {/* Grid of details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs text-[#64748b] uppercase tracking-wider">Recipient</p>
            <p className="font-medium text-lg text-white">{certificate.recipient}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#64748b] uppercase tracking-wider">Issuer</p>
            <p className="font-medium text-lg text-white">{certificate.issuer}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#64748b] uppercase tracking-wider">Event / Credential</p>
            <p className="font-medium text-lg text-white">{certificate.event}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#64748b] uppercase tracking-wider">Issue Date</p>
            <p className="font-medium text-lg text-white">{formatDate(certificate.date)}</p>
          </div>
        </div>

        {/* IPFS Link */}
        <div className="space-y-2">
          <p className="text-xs text-[#64748b] uppercase tracking-wider">IPFS URL</p>
          <a
            href={certificate.ipfsUrl.startsWith("ipfs://") 
              ? `https://ipfs.io/ipfs/${certificate.ipfsUrl.replace("ipfs://", "")}`
              : certificate.ipfsUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-[#0d9488] hover:text-[#14b8a6] transition-colors bg-[#0a0a0f] p-3 rounded-lg"
          >
            <span className="break-all">{certificate.ipfsUrl}</span>
            <ExternalLink className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  )
}
