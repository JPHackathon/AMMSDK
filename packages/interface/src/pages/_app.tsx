import { Buffer } from "buffer";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { NoSSR } from "../components/Elements";
import "../styles/globals.css";

if (typeof window !== "undefined") window.Buffer = Buffer;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSSR>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </NoSSR>
  );
}
