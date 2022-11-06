import { AMMSDK } from "@ammsdk/sdk";
import Avatar from "boring-avatars";
import clsx from "clsx";
import { Suspense, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

import {
  Modal,
  ModalProps,
  NumberInput,
  useModal,
} from "../components/Elements";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { useAMM } from "../hooks/useAMM";
import { AMM } from "../libs/ammsdk";
import { AMMUpdateFlagState } from "../states/amm/atoms";
import {
  useAMMData,
  useBalances,
  useRelations,
} from "../states/amm/operations";
import { GameData } from "../states/amm/types";
import { useWeaveData } from "../states/weaveDB/operations";

const GameSelect: React.FC<
  ModalProps & {
    onSelectGame: (game: GameData) => void;
  }
> = ({ onSelectGame, ...props }) => {
  const { games } = useAMMData();

  return (
    <Modal className="p-6" {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Select a game</h1>
        <div className="flex flex-col gap-2">
          {games.map(({ data }, key) => (
            <button
              className="btn btn-ghost justify-start btn-lg gap-2 p-2"
              key={key}
              onClick={() => onSelectGame(data)}
            >
              <div className="card w-10 h-10 overflow-hidden">
                <Avatar size="100%" variant="pixel" name={data.signer} square />
              </div>
              <span className="text-xl font-bold">{data.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

const RelateModal: React.FC<
  ModalProps & {
    game: GameData;
  }
> = ({ game, ...props }) => {
  const { tempWallet } = useWeaveData();
  const setUpdate = useSetRecoilState(AMMUpdateFlagState);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!AMM || !tempWallet) return;
    setLoading(true);
    try {
      await AMM.relateUser(
        {
          game_address: game.signer,
          user_address: tempWallet.wallet,
          game_user_id: input,
        },
        tempWallet
      );
      setUpdate("related" + game.signer);
      props.onClose();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal className="p-6 flex flex-col gap-2" {...props}>
      <div>
        <h2 className="font-bold text-xl">Relate Account</h2>
        <p className="pl-2">relate wallet address to game account</p>
      </div>
      <input
        className="input bg-base-300 w-full mt-2"
        placeholder={`your game id in ${game.name}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className={clsx("btn btn-primary flex-1", loading && "loading")}
          disabled={loading}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className={clsx("btn btn-error btn-outline flex-1")}
          disabled={loading}
          onClick={props.onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const SwapCard = () => {
  const { loginWeave } = useAMM();
  const { tempWallet } = useWeaveData();
  const { pairs, games } = useAMMData();
  const setUpdate = useSetRecoilState(AMMUpdateFlagState);

  const [loading, setIsLoading] = useState(false);

  const { register: game0Register, open: game0Open } = useModal();
  const { register: game1Register, open: game1Open } = useModal();
  const { register: relate0Register, open: relate0Open } = useModal();
  const { register: relate1Register, open: relate1Open } = useModal();

  const [game0, setgame0] = useState<GameData | null>(null);
  const [game1, setgame1] = useState<GameData | null>(null);
  const relation0 = useRelations(game0);
  const relation1 = useRelations(game1);
  const balance0 = useBalances(game0);
  const balance1 = useBalances(game1);

  const [inputAmount, setInputAmount] = useState<string>("");

  const outputAmount = useMemo(() => {
    const pair = pairs.find(({ data }) => {
      const temp = (data.address0 + data.address1).toLowerCase();
      return (
        temp.includes(data.address0.toLowerCase()) &&
        temp.includes(data.address1.toLowerCase())
      );
    });
    if (!pair) return "Pair not found";

    const outputAmount = AMMSDK.getOutputAmount(
      Number(inputAmount),
      pair.data.address0.toLowerCase() === game0?.signer.toLowerCase()
        ? pair.data.amount0
        : pair.data.amount1,
      pair.data.address0.toLowerCase() === game1?.signer.toLowerCase()
        ? pair.data.amount0
        : pair.data.amount1
    );

    return outputAmount;
  }, [game0, game1, inputAmount, pairs]);

  const swap = async () => {
    if (!AMM || !game0 || !game1 || !tempWallet) return;
    if (balance0 && Number(inputAmount) > balance0) return;
    setIsLoading(true);
    try {
      await AMM.swap(
        game0.signer,
        game1.signer,
        Number(inputAmount),
        tempWallet
      );
      await setUpdate("swap" + Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GameSelect {...game0Register} onSelectGame={setgame0} />
      <GameSelect {...game1Register} onSelectGame={setgame1} />
      {game0 && <RelateModal {...relate0Register} game={game0} />}
      {game1 && <RelateModal {...relate1Register} game={game1} />}
      <div className="flex card flex-col bg-base-200 p-2">
        <div className="flex items-center">
          <div className="font-bold text-lg flex-1">From</div>
          <div className="text-base-content/75 font-bold">
            {balance0 && `Balance: ${balance0} ${game0?.symbol}`}
          </div>
        </div>
        <div className="flex items-center p-2">
          <button
            className="btn btn-outline normal-case gap-2 p-2"
            onClick={game0Open}
          >
            {game0 && (
              <div className="w-8 h-8">
                <Avatar size="100%" variant="pixel" name={game0?.signer} />
              </div>
            )}
            {game0?.symbol || "SelectGame"}
          </button>
          <NumberInput
            className="input bg-base-200 w-full text-lg"
            value={inputAmount}
            onChange={setInputAmount}
          />
        </div>
      </div>
      <div className="flex card flex-col p-2 border-2">
        <div className="flex items-center">
          <div className="font-bold text-lg flex-1">To</div>
          <div className="text-base-content/75 font-bold">
            {balance1 && `Balance: ${balance1} ${game1?.symbol}`}
          </div>
        </div>
        <div className="flex items-center p-2">
          <button
            className="btn btn-outline normal-case p-2 gap-2"
            onClick={game1Open}
          >
            {game1 && (
              <div className="w-8 h-8">
                <Avatar size="100%" variant="pixel" name={game1?.signer} />
              </div>
            )}
            {game1?.symbol || "SelectGame"}
          </button>
          <div className="py-2 px-4 w-full text-lg" onChange={() => {}}>
            {outputAmount}
          </div>
        </div>
      </div>
      {!tempWallet && (
        <button className="btn" onClick={loginWeave}>
          Connect
        </button>
      )}
      {game0 && game1 && (!relation0 || !relation1) && tempWallet && (
        <div className="flex gap-2 flex-wrap">
          {Boolean(relation0) || (
            <button className="btn btn-primary flex-1" onClick={relate0Open}>
              Relate {game0?.symbol}
            </button>
          )}
          {Boolean(relation1) || (
            <button className="btn btn-secondary flex-1" onClick={relate1Open}>
              Relate {game1?.symbol}
            </button>
          )}
        </div>
      )}
      {game0 && game1 && relation0 && relation1 && tempWallet && (
        <button
          className={clsx("btn btn-primary w-full", loading && "loading")}
          disabled={
            loading || Boolean(balance0 && Number(inputAmount) > balance0)
          }
          onClick={swap}
        >
          Swap
        </button>
      )}
    </>
  );
};

export default function Home() {
  return (
    <HomeLayout>
      <h1 className="text-2xl font-bold">SWAP</h1>
      <div className="w-full flex justify-center mt-8 sm:mt-16">
        <div className="card p-4 bg-base-100 shadow-lg w-full max-w-lg gap-4">
          <Suspense fallback={<button className=" btn btn-ghost loading" />}>
            <SwapCard />
          </Suspense>
        </div>
      </div>
    </HomeLayout>
  );
}
