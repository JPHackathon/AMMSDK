import { useConnectWallet, useEthereumData } from "../states/ethereum";

export const useEthereum = () => {
  const { provider, address } = useEthereumData();
  const connectWallet = useConnectWallet();
  return { provider, address, connectWallet };
};
