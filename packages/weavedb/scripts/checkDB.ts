import fs from "fs/promises";
import path from "path";
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

  //@ts-ignore
  console.log("sdk", await sdk.getSchema("games"));
};

setup()
  .catch(console.error)
  .finally(() => process.exit(0));
