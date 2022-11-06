const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');

const pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'auto',
    },
    {
      file: pkg.browser,
      format: 'umd',
      exports: 'auto',
      name: 'js-collection-operations',
    },
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    resolve(),
    commonjs(),
    terser(),
  ],
};
