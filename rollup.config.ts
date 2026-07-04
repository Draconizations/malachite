import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"

export default {
  input: "./src/api.ts",
  output: [
    {
      file: "./dist/types/malachite.d.ts",
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
  ]
}