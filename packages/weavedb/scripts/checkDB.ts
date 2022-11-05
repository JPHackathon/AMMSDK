import fs from "fs/promises";
import path from "path";

import { ethers } from "ethers";
import SDK from "weavedb-sdk";

const contractTxId = "xwYOmTylx4j0MZz5FbDNxuhyZefkzPsBJ679raFF_CM"; // maybe

const setup = async () => {
  const wallet = JSON.parse(
    await fs.readFile(path.join(__dirname, "../.wallet/wallet.json"), "utf-8")
  );
  const sdk = new SDK({
    wallet,
    name: "weavedb",
    version: "1",
    contractTxId,
    arweave: {
      host: "arweave.net",
      port: 443,
      protocol: "https",
      timeout: 200000,
    },
  });
  const tempPrivatekey = ethers.Wallet.createRandom().privateKey;
  const data = await sdk.delete(
    "pairs",
    "0x42Eb61f392cF008D998Fe09D400b07566B046384:0xa85b5e58dA6e57fb8e1ebbe75492d6CB878C5A0b",
    { privateKey: tempPrivatekey }
  );
};

setup()
  .catch(console.error)
  .finally(() => process.exit(0));
