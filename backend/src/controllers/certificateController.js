const { generateSHA256 } = require("../utils/hashUtil");
const { uploadToIPFS } = require("../services/ipfsService");
const { storeCertificateOnChain, getCertificateFromChain } = require("../services/blockchainService");

async function issueCertificate(req, res) {
  try {
    const { recipient, issuer, event, date } = req.body;
    const file = req.file;

    if (!file || !recipient || !issuer || !event || !date) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const certificateHash = generateSHA256(file.buffer);
    const ipfsUrl = await uploadToIPFS(file.buffer, file.originalname);

    await storeCertificateOnChain({
      hash: certificateHash,
      recipient,
      issuer,
      eventName: event,
      date,
      ipfsUrl,
    });

    return res.json({ success: true, certificateHash, ipfsUrl });
  } catch (err) {
    console.error("issueCertificate error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function verifyCertificate(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ verified: false, error: "No file provided" });

    const hash = generateSHA256(file.buffer);
    const cert = await getCertificateFromChain(hash);

    if (!cert.exists) {
      return res.json({ verified: false });
    }

    return res.json({
      verified: true,
      recipient: cert.recipient,
      issuer: cert.issuer,
      event: cert.eventName,
      date: cert.date,
      ipfsUrl: cert.ipfsUrl,
    });
  } catch (err) {
    console.error("verifyCertificate error:", err.message);
    return res.status(500).json({ verified: false, error: err.message });
  }
}

module.exports = { issueCertificate, verifyCertificate };
