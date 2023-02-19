const rollup = require('rollup').rollup;
const buble = require('@rollup/plugin-buble');

rollup({
  input: './src/flakeid.js',
  plugins: [buble({
    objectAssign: true,
  })]
  }).then(bundle => {
  return bundle.write({
    file: './dist/flakeid.js',
    format: 'umd',
    name: 'FlakeId',
  });
});
