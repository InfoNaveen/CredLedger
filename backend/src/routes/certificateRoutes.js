const express = require("express");
const multer = require("multer");
const { issueCertificate, verifyCertificate } = require("../controllers/certificateController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/issue-certificate", upload.single("file"), issueCertificate);
router.post("/verify-certificate", upload.single("file"), verifyCertificate);

module.exports = router;
