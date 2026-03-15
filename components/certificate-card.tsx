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
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-card border border-border/50 shadow-[0_0_40px_rgba(124,58,237,0.1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">ProofChain Certificate</h2>
            <p className="text-sm text-muted-foreground">Blockchain Verified</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          Verified
        </div>
      </div>

      {/* Certificate Details */}
      <div className="space-y-6">
        {/* Hash */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Certificate Hash</p>
          <p className="font-mono text-sm bg-muted/30 p-3 rounded-lg break-all">
            {certificate.hash}
          </p>
        </div>

        {/* Grid of details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Recipient</p>
            <p className="font-medium text-lg">{certificate.recipient}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Issuer</p>
            <p className="font-medium text-lg">{certificate.issuer}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Event / Credential</p>
            <p className="font-medium text-lg">{certificate.event}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Issue Date</p>
            <p className="font-medium text-lg">{formatDate(certificate.date)}</p>
          </div>
        </div>

        {/* IPFS Link */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">IPFS URL</p>
          <a
            href={certificate.ipfsUrl.startsWith("ipfs://") 
              ? `https://ipfs.io/ipfs/${certificate.ipfsUrl.replace("ipfs://", "")}`
              : certificate.ipfsUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-secondary/80 transition-colors bg-muted/30 p-3 rounded-lg"
          >
            <span className="break-all">{certificate.ipfsUrl}</span>
            <ExternalLink className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  )
}
