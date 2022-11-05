import fs from "fs/promises";
import path from "path";

import { ethers } from "ethers";
import SDK from "weavedb-sdk";

import { GameRules, PairRules, UserMappingRules } from "../schema/amm.rules";
import {
  GameSchema,
  PairSchema,
  UserMappingSchema,
} from "../schema/amm.schema";

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
  await sdk.setSchema(GameSchema, "games", {
    privateKey: tempPrivatekey,
  });
  await sdk.setSchema(PairSchema, "pairs", { privateKey: tempPrivatekey });
  await sdk.setSchema(UserMappingSchema, "user_mappings", {
    privateKey: tempPrivatekey,
  });
  await sdk.setRules(GameRules, "games", { privateKey: tempPrivatekey });
  await sdk.setRules(PairRules, "pairs", { privateKey: tempPrivatekey });
  await sdk.setRules(UserMappingRules, "user_mappings", {
    privateKey: tempPrivatekey,
  });
};

setup()
  .catch(console.error)
  .finally(() => process.exit(0));
