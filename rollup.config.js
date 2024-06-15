import typescript from "rollup-plugin-typescript2";
import * as pkg from "./package.json";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    terser(),
    typescript({ config: "./tsconfig.json", exclude: ["**/*.stories.*"] }),
  ],
};
