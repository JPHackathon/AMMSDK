import { useConnectWallet, useEthereumData } from "../states/ethereum";
import { useLoginWeave, useWeaveData } from "../states/weaveDB/operations";

export const useAMM = () => {
  const ethereumData = useEthereumData();
  const weaveData = useWeaveData();

  const connectWallet = useConnectWallet();
  const loginWeave = useLoginWeave();

  return {
    ...ethereumData,
    ...weaveData,

    connectWallet,
    loginWeave,
  };
};
