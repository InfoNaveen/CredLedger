# ProofChain — Setup Guide

## Prerequisites
- Node.js 18+
- A Pinata account (free tier works): https://pinata.cloud
- A wallet with Polygon Amoy testnet MATIC (faucet: https://faucet.polygon.technology)

---

## 1. Fill in environment variables

Edit `backend/.env`:

```
PORT=5000
PINATA_API_KEY=<your pinata api key>
PINATA_SECRET_API_KEY=<your pinata secret api key>
PRIVATE_KEY=<your wallet private key, 0x-prefixed, 66 chars>
RPC_URL=https://rpc-amoy.polygon.technology
CONTRACT_ADDRESS=  # fill after step 3
```

---

## 2. Deploy the smart contract

```bash
# From project root
npm run deploy
```

This compiles and deploys `ProofChain.sol` to Polygon Amoy testnet, then auto-writes
the ABI + address to `backend/src/config/contract.js`.

Copy the printed contract address into `backend/.env` → `CONTRACT_ADDRESS`.

---

## 3. Start the backend

```bash
cd backend
npm start
# or for dev with auto-reload:
npm run dev
```

Backend runs at http://localhost:5000

---

## 4. Start the frontend

```bash
# From project root
pnpm install   # if not already done
pnpm dev
```

Frontend runs at http://localhost:3000

---

## API Endpoints

### POST /api/issue-certificate
FormData fields: `recipient`, `issuer`, `event`, `date`, `file`

```json
{ "success": true, "certificateHash": "0x...", "ipfsUrl": "https://ipfs.io/ipfs/..." }
```

### POST /api/verify-certificate
FormData fields: `file`

```json
// Verified
{ "verified": true, "recipient": "...", "issuer": "...", "event": "...", "date": "...", "ipfsUrl": "..." }

// Not found
{ "verified": false }
```

---

## Project Structure

```
ProofChain/
├── app/                    # Next.js frontend (do not modify)
├── components/             # Frontend components (wired to real API)
├── contracts/
│   └── ProofChain.sol      # Solidity smart contract
├── scripts/
│   └── deploy.js           # Hardhat deployment script
├── backend/
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── controllers/certificateController.js
│       ├── routes/certificateRoutes.js
│       ├── services/blockchainService.js
│       ├── services/ipfsService.js
│       ├── utils/hashUtil.js
│       └── config/contract.js   # auto-generated after deploy
├── hardhat.config.js
└── package.json
```
