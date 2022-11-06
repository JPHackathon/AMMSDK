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
  await sdk.delete("games", "pw7JtSn1nlKdbCxddipe", {
    privateKey: tempPrivatekey,
  });
  await sdk.delete("games", "rZhAetavicqWJAoGBxKr", {
    privateKey: tempPrivatekey,
  });
  const data = await sdk.delete(
    "pairs",
    "0xe4DfB05e942eB55325978669f489F2DCEB8B0D45:0xf4A9fE0E352Fa9E77f44E69d8FA91ECe3DBA511A",
    { privateKey: tempPrivatekey }
  );
};

setup()
  .catch(console.error)
  .finally(() => process.exit(0));
