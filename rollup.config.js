import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: false,
      plugins: [terser()],
    },
    // Disabling CJS output
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   exports: 'named',
    //   sourcemap: true,
    //   strict: false,
    // },
  ],
  plugins: [typescript()],
  external: [ 'solid-js', 'motion'],
};
