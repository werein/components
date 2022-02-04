const packageJson = require("./package.json");

import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        globals,
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        globals,
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: Object.keys(packageJson.devDependencies),
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
