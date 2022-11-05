import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: { dir: "dist", format: "es" },
    external: ["weavedb-sdk", "ethers", "axios"],
    plugins: [typescript(), json(), commonjs(), resolve({ browser: true })],
  },
];
