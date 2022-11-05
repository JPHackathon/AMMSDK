import { ethers } from "ethers";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { AddressState, ProviderState } from "./atoms";

let handleAccountsChanged: ((accounts: string[]) => void) | null = null;

export const useConnectWallet = () => {
  const connectWallet = useRecoilCallback(({ set }) => async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);

    if (handleAccountsChanged)
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);

    handleAccountsChanged = (accounts: string[]) =>
      set(AddressState, accounts[0]);

    set(ProviderState, provider);
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return provider;
  });
  return connectWallet;
};

export const useEthereumData = () => {
  const provider = useRecoilValue(ProviderState);
  const address = useRecoilValue(AddressState);
  return { provider, address };
};
