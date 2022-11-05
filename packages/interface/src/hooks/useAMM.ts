import { useConnectWallet, useEthereumData } from "../states/ethereum";
import { useLoginWeave } from "../states/weaveDB/operations";

export const useAMM = () => {
  const ethereumData = useEthereumData();
  const weaveData = useLoginWeave();

  const connectWallet = useConnectWallet();
  const loginWeave = useLoginWeave();

  return { ...ethereumData, ...weaveData, connectWallet, loginWeave };
};
