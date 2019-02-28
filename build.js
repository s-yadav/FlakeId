const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');

rollup({
  input: './src/flakeid.js',
  plugins: [babel({
    babelrc: false,
    presets: [['@babel/preset-env', {
      modules: false,
    }]],
    plugins: ['@babel/plugin-external-helpers'],
  })]
  }).then(bundle => {
  return bundle.write({
    file: './dist/flakeid.js',
    format: 'umd',
    name: 'FlakeId',
  });
});
