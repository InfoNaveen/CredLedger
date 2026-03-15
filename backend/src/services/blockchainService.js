const { ethers } = require("ethers");
const { CONTRACT_ADDRESS, ABI } = require("../config/contract");

function getContract() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
}

async function storeCertificateOnChain({ hash, recipient, issuer, eventName, date, ipfsUrl }) {
  const contract = getContract();
  const tx = await contract.issueCertificate(hash, recipient, issuer, eventName, date, ipfsUrl);
  await tx.wait();
  return tx.hash;
}

async function getCertificateFromChain(hash) {
  const contract = getContract();
  const result = await contract.verifyCertificate(hash);
  return {
    hash: result[0],
    recipient: result[1],
    issuer: result[2],
    eventName: result[3],
    date: result[4],
    ipfsUrl: result[5],
    exists: result[6],
  };
}

module.exports = { storeCertificateOnChain, getCertificateFromChain };
