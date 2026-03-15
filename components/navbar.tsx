"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// MetaMask wallet connection logic is fully contained in this component
// Uses ethers.js for wallet connection

export function Navbar() {
  const pathname = usePathname()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask to connect your wallet")
      return
    }

    setIsConnecting(true)
    try {
      // Request account access via MetaMask
      const { BrowserProvider } = await import("ethers")
      const provider = new BrowserProvider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", [])
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/issue", label: "Issue" },
    { href: "/verify", label: "Verify" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-[#0a0a0f]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-[#7c3aed] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ProofChain</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300",
                  pathname === link.href
                    ? "text-[#7c3aed] drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]"
                    : "text-[#e2e8f0] hover:text-[#7c3aed] hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="flex items-center gap-4">
            {walletAddress ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#7c3aed]/30">
                <div className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="font-mono text-sm text-[#e2e8f0]">
                  {shortenAddress(walletAddress)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="hidden md:inline-flex px-4 py-2 rounded-lg bg-transparent border border-[#7c3aed] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:bg-[#7c3aed]/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#7c3aed]/20 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  pathname === link.href
                    ? "text-[#7c3aed] bg-[#7c3aed]/10"
                    : "text-[#e2e8f0] hover:text-white hover:bg-[#1a1a2e]"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!walletAddress && (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full px-4 py-2 rounded-lg bg-transparent border border-[#7c3aed] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:bg-[#7c3aed]/10 disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      isMetaMask?: boolean
    }
  }
}
