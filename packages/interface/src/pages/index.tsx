import { Suspense } from "react";

import { NumberInput } from "../components/Elements";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { useAMMData } from "../states/amm/operations";

const Test = () => {
  const { pairs, games } = useAMMData();
  console.log(pairs, games);
  return <></>;
};

export default function Home() {
  return (
    <HomeLayout>
      <h1 className="text-2xl font-bold">SWAP</h1>
      <div className="w-full flex justify-center mt-16">
        <div className="card p-4 bg-base-100 shadow-lg w-full max-w-lg">
          <div className="flex card flex-col bg-base-200 p-2">
            <div className="font-bold text-lg">From</div>
            <div className="flex">
              <NumberInput
                className="input bg-base-200 w-full"
                value="100"
                onChange={() => {}}
              />
              <Suspense>
                <Test />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
