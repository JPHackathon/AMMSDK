import { useRecoilCallback, useRecoilValue } from "recoil";

import { AMM } from "../../libs/ammsdk";
import { useConnectWallet } from "../ethereum";

import { TempWalletStates } from "./atom";
import { TempWalletSelector } from "./selector";

export const useLoginWeave = () => {
  const connectWallet = useConnectWallet();
  const loginWeave = useRecoilCallback(({ set }) => async () => {
    if (!AMM) return;
    const provider = await connectWallet();
    const address = await provider.getSigner().getAddress();
    const { tx, identity } = await AMM.weaveDB.createTempAddress(address);
    if (!tx || tx.err) throw new Error("Failed to relate address TX");

    set(TempWalletStates(address), {
      wallet: address,
      privateKey: identity.privateKey,
    });
  });
  return loginWeave;
};

export const useWeaveData = () => {
  const tempWallet = useRecoilValue(TempWalletSelector);
  return { tempWallet };
};
