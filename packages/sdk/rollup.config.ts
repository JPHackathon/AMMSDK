import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
    },
    plugins: [typescript(), json(), resolve(), commonjs()],
  },
];
