import { QrCodeIcon } from "@heroicons/react/24/outline";
import Avatar from "boring-avatars";
import { QRCodeSVG } from "qrcode.react";
import { Suspense, useState } from "react";

import { Modal, ModalProps, useModal } from "../components/Elements";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { useAMMData } from "../states/amm/operations";

const QrModal: React.FC<ModalProps & { value?: string }> = ({
  value,
  ...props
}) => {
  return (
    <Modal
      className="flex flex-col items-center gap-2 bg-white max-w-64 p-6"
      {...props}
    >
      <div className="relative aspect-square h-full w-full">
        <QRCodeSVG className="h-full w-full" value={value || ""} />
      </div>
    </Modal>
  );
};

const GamesList: React.FC = () => {
  const { games } = useAMMData();
  const { register, open } = useModal();
  const [link, setLink] = useState("");

  const openModal = (url: string) => {
    setLink(url);
    open();
  };

  return (
    <>
      <QrModal value={link} {...register} />
      <div className="w-full max-w-2xl gap-4 grid grid-cols-2 lg:grid-cols-3">
        {games.map(({ data }, key) => (
          <div key={key} className="card bg-base-100 shadow-lg p-2 gap-2">
            <div className="card overflow-hidden w-12 h-12">
              <Avatar size="100%" variant="pixel" square name={data.signer} />
            </div>
            <h3 className="text-lg font-bold">{data.name}</h3>
            <p className="text-sm">{data.description}</p>

            <div className="flex gap-2">
              <a className="btn flex-1 btn-sm btn-primary" href={data.url}>
                Play
              </a>
              <button
                className="btn btn-sm btn-square btn-outline"
                onClick={() => openModal(data.url)}
              >
                <QrCodeIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default function Home() {
  return (
    <HomeLayout>
      <h1 className="text-2xl font-bold">Games</h1>
      <div className="w-full flex justify-center mt-8 sm:mt-16">
        <Suspense fallback={<button className="btn btn-ghost loading" />}>
          <GamesList />
        </Suspense>
      </div>
    </HomeLayout>
  );
}
