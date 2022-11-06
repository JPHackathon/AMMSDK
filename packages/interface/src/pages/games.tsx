import { HomeLayout } from "../components/Layout/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <h1 className="text-2xl font-bold">Games</h1>
      <div className="w-full flex justify-centｓer mt-8 sm:mt-16">
        <div className="shadow-lg w-full max-w-lg gap-4 grid grid-cols-3"></div>
      </div>
    </HomeLayout>
  );
}
