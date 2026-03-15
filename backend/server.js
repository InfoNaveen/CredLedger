require("dotenv").config();
const express = require("express");
const cors = require("cors");
const certificateRoutes = require("./src/routes/certificateRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", certificateRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`CredLedger backend running on port ${PORT}`));
