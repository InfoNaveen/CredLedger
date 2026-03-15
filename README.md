# CredLedger

A decentralized certificate verification system. Certificates are stored on IPFS and their cryptographic hashes are anchored on the blockchain — tamper-proof and publicly verifiable by anyone.

---

## The Problem

Fake certificates and credentials are rampant and nearly impossible to verify at scale. Traditional systems rely on centralized databases that can be manipulated or go offline.

## The Solution

CredLedger uses SHA256 hashing + IPFS storage + blockchain immutability to create a verification system that requires no trust in any central authority.

---

## How It Works

**Issuing a Certificate**
1. Issuer uploads a certificate file with metadata (recipient, event, date)
2. Backend generates a SHA256 hash of the file
3. File is pinned to IPFS via Pinata
4. Hash + metadata is stored on-chain via the `CredLedger` smart contract
5. Issuer receives the certificate hash and IPFS link

**Verifying a Certificate**
1. User uploads the certificate file
2. Backend generates the SHA256 hash
3. Hash is queried against the smart contract
4. If found → returns full metadata (verified ✅)
5. If not found → marked as invalid ❌

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Blockchain | Solidity, Hardhat, Polygon Amoy Testnet |
| Storage | IPFS via Pinata |
| Hashing | Node.js `crypto` (SHA256) |
| Web3 | Ethers.js v6 |

---

## Project Structure

```
CredLedger/
├── app/                        # Next.js frontend
├── components/                 # UI components (wired to real API)
├── hardhat/
│   ├── contracts/
│   │   └── CredLedger.sol      # Solidity smart contract
│   ├── scripts/
│   │   └── deploy.js           # Hardhat deployment script
│   ├── hardhat.config.js
│   └── package.json
├── backend/
│   ├── server.js               # Express entry point
│   ├── .env                    # Environment variables (not committed)
│   └── src/
│       ├── controllers/        # Route handlers
│       ├── routes/             # API routes
│       ├── services/           # Blockchain + IPFS logic
│       ├── utils/              # SHA256 hashing
│       └── config/             # Contract ABI + address
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Pinata](https://pinata.cloud) account (free tier works)
- MetaMask wallet with [Polygon Amoy testnet MATIC](https://faucet.polygon.technology)

### 1. Clone the repo

```bash
git clone https://github.com/InfoNaveen/NewInnovate.git
cd NewInnovate
```

### 2. Set up environment variables

Create `backend/.env`:

```env
PORT=5000
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret
PINATA_JWT=your_pinata_jwt
PRIVATE_KEY=0x_your_wallet_private_key
RPC_URL=https://rpc-amoy.polygon.technology
CONTRACT_ADDRESS=your_deployed_contract_address
```

### 3. Install dependencies

```bash
# Frontend deps (root)
pnpm install

# Backend deps
cd backend && npm install

# Hardhat deps
cd hardhat && npm install
```

### 4. Deploy the smart contract

```bash
cd hardhat
npx hardhat run scripts/deploy.js --network amoy
```

Copy the printed contract address into `backend/.env` → `CONTRACT_ADDRESS`.

### 5. Start the backend

```bash
cd backend
npm start
```

Runs at `http://localhost:5000`

### 6. Start the frontend

```bash
# From project root
pnpm dev
```

Runs at `http://localhost:3000`

---

## API Reference

### `POST /api/issue-certificate`

| Field | Type | Description |
|---|---|---|
| `recipient` | string | Recipient's full name |
| `issuer` | string | Issuing organization |
| `event` | string | Event or credential name |
| `date` | string | Issue date (YYYY-MM-DD) |
| `file` | File | Certificate file (PDF/PNG/JPG) |

```json
{
  "success": true,
  "certificateHash": "0xabc123...",
  "ipfsUrl": "https://ipfs.io/ipfs/Qm..."
}
```

### `POST /api/verify-certificate`

| Field | Type | Description |
|---|---|---|
| `file` | File | Certificate file to verify |

```json
// Verified
{
  "verified": true,
  "recipient": "Naveen Patil",
  "issuer": "HackIndia",
  "event": "Web3 Hackathon",
  "date": "2026-02-10",
  "ipfsUrl": "https://ipfs.io/ipfs/Qm..."
}

// Not found
{ "verified": false }
```

---

## Smart Contract

`CredLedger.sol` deployed on Polygon Amoy Testnet.

```solidity
function issueCertificate(string hash, string recipient, string issuer, string eventName, string date, string ipfsUrl)
function verifyCertificate(string hash) returns (hash, recipient, issuer, eventName, date, ipfsUrl, exists)
```

---

## License

MIT
