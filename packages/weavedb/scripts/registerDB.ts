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

  const demoGame1 = ethers.Wallet.createRandom();
  const demoGame2 = ethers.Wallet.createRandom();
  await sdk.add(
    {
      signer: demoGame1.address,
      name: "VLスネークゲーム",
      description: "",
      symbol: "VLS",
      endpoint: "https://us-central1-tokyo-web3.cloudfunctions.net/",
    },
    "games",
    {
      privateKey: demoGame1.privateKey,
    }
  );
  await sdk.add(
    {
      signer: demoGame2.address,
      name: "パックマンゲーム",
      description: "",
      symbol: "PMG",
      endpoint: "https://us-central1-tokyo-web3.cloudfunctions.net/demo2-",
    },
    "games",
    {
      privateKey: demoGame2.privateKey,
    }
  );
  const [address0, address1] = [demoGame1.address, demoGame2.address].sort();
  await sdk.set(
    {
      address0,
      address1,
      amount0: 10000,
      amount1: 30000,
    },
    "pairs",
    `${address0}:${address1}`,
    {
      privateKey: demoGame1.privateKey,
    }
  );
};

setup()
  .catch(console.error)
  .finally(() => process.exit(0));
