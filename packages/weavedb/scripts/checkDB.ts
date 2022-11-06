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
  await sdk.update(
    {
      description: "VeryLongなスネークゲーム！！スマホから遊べます！！",
      url: "https://melodic-toffee-b33dc3.netlify.app/#/",
    },
    "games",
    "0x52f1b24E957E02ed345433E718Ce1d9dB0c3dFC8",
    { privateKey: tempPrivatekey }
  );
  await sdk.update(
    {
      description: "パックマンがGameFiに！！パソコンから遊べます！！",
      url: "https://playful-pothos-3b3146.netlify.app/#/",
    },
    "games",
    "0xe9492f658E32C1936dFb6fbF08d85b08CaD4B795",
    { privateKey: tempPrivatekey }
  );
};

setup()
  .catch(console.error)
  .finally(() => process.exit(0));
