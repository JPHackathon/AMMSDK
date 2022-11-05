import fs from "fs/promises";
import path from "path";

import Arweave from "arweave";
import { WarpNodeFactory } from "warp-contracts";

const srcTxId = "G7aMmk1Fux6Dqw7M7CFoNQf5KZV2J1UCuZjfEn_VFVM";

const deploy = async () => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  //@ts-ignore
  const warp = WarpNodeFactory.memCachedBased(arweave).useWarpGateway().build();

  const wallet = JSON.parse(
    await fs.readFile(path.join(__dirname, "../.wallet/wallet.json"), "utf-8")
  );
  const walletAddress = await arweave.wallets.jwkToAddress(wallet);

  const stateFromFile = JSON.parse(
    await fs.readFile(
      path.join(__dirname, "../assets/initial-state.json"),
      "utf8"
    )
  );

  const initialState = {
    ...stateFromFile,
    ...{
      owner: walletAddress,
    },
  };
  console.log("initialState", initialState); // { owner: '...', ... }
  console.log("walletAddress", walletAddress); // '...'

  const res = await warp.createContract.deployFromSourceTx(
    {
      wallet,
      initState: JSON.stringify(initialState),
      srcTxId,
    },
    true
  );
  console.log(res);
};

deploy()
  .catch(console.error)
  .finally(() => process.exit(0));
