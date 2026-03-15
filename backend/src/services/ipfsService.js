const axios = require("axios");
const FormData = require("form-data");

async function uploadToIPFS(fileBuffer, fileName) {
  const form = new FormData();
  form.append("file", fileBuffer, { filename: fileName });

  const metadata = JSON.stringify({ name: fileName });
  form.append("pinataMetadata", metadata);

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    }
  );

  const cid = response.data.IpfsHash;
  return `https://ipfs.io/ipfs/${cid}`;
}

module.exports = { uploadToIPFS };
