const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const pkg = require('./package.json');

// CommonJS (for Node) and ES module (for bundlers) build.
module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'esm',
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
  plugins: [resolve(), commonjs(), terser()],
};
