require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "./backend/.env" });

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: process.env.RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length === 66
          ? [process.env.PRIVATE_KEY]
          : [],
    },
  },
};
