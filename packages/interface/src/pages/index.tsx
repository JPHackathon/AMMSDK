import Avatar from "boring-avatars";
import { Suspense, useState } from "react";

import {
  Modal,
  ModalProps,
  NumberInput,
  useModal,
} from "../components/Elements";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { useAMMData } from "../states/amm/operations";
import { GameData } from "../states/amm/types";

const GameSelect: React.FC<
  ModalProps & {
    onSelectGame: (game: GameData) => void;
  }
> = ({ onSelectGame, ...props }) => {
  const { pairs, games } = useAMMData();

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

const SwapCard = () => {
  const { register: game1Register, open: game1Open } = useModal();
  const { register: game2Register, open: game2Open } = useModal();
  const [game1, setGame1] = useState<GameData | null>(null);
  const [game2, setGame2] = useState<GameData | null>(null);
  return (
    <>
      <GameSelect {...game1Register} onSelectGame={setGame1} />
      <GameSelect {...game2Register} onSelectGame={setGame2} />
      <div className="flex card flex-col bg-base-200 p-2">
        <div className="font-bold text-lg">From</div>
        <div className="flex items-center p-2">
          <button
            className="btn btn-outline normal-case gap-2 p-2"
            onClick={game1Open}
          >
            {game1 && (
              <div className="w-8 h-8">
                <Avatar size="100%" variant="pixel" name={game1?.signer} />
              </div>
            )}
            {game1?.symbol || "SelectGame"}
          </button>
          <NumberInput
            className="input bg-base-200 w-full text-lg"
            value="100"
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex card flex-col p-2 border-2">
        <div className="font-bold text-lg">To</div>
        <div className="flex items-center p-2">
          <button
            className="btn btn-outline normal-case p-2 gap-2"
            onClick={game2Open}
          >
            {game2 && (
              <div className="w-8 h-8">
                <Avatar size="100%" variant="pixel" name={game2?.signer} />
              </div>
            )}
            {game2?.symbol || "SelectGame"}
          </button>
          <div className="py-2 px-4 w-full text-lg" onChange={() => {}}>
            100
          </div>
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <HomeLayout>
      <h1 className="text-2xl font-bold">SWAP</h1>
      <div className="w-full flex justify-center mt-16">
        <div className="card p-4 bg-base-100 shadow-lg w-full max-w-lg gap-4">
          <Suspense fallback={<button className=" btn btn-ghost loading" />}>
            <SwapCard />
          </Suspense>
        </div>
      </div>
    </HomeLayout>
  );
}
