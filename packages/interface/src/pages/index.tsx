import { Suspense, useState } from "react";

import {
  Modal,
  ModalProps,
  NumberInput,
  useModal,
} from "../components/Elements";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { useAMMData } from "../states/amm/operations";

const GameSelect: React.FC<ModalProps & {}> = ({ ...props }) => {
  const { pairs, games } = useAMMData();

  return (
    <Modal className="p-6" {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Select a game</h1>
        <div className="flex flex-col gap-2">
          {games.map(({ data }, key) => (
            <div className="card p-2" key={key}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">{data.name}</h1>
                    <p className="text-sm">{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

const SwapCard = () => {
  const { register: game1Register, open: game1Open } = useModal();
  const [game1, setGame1] = useState<string>("");
  const [game2, setGame2] = useState<string>("");
  return (
    <>
      <GameSelect {...game1Register} />
      <div className="flex card flex-col bg-base-200 p-2">
        <div className="font-bold text-lg">From</div>
        <div className="flex items-center">
          <button
            className="btn btn-outline btn-sm normal-case"
            onClick={game1Open}
          >
            {game1 || "SelectGame"}
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
        <div className="flex items-center">
          <button className="btn btn-outline btn-sm normal-case">
            {game1 || "SelectGame"}
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
