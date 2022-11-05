import { AMMSDK } from "@ammsdk/sdk";

export const AMM = typeof window !== "undefined" ? new AMMSDK({}) : null;
