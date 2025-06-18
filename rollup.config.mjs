import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  resolve({ extensions: ['.js', '.ts'] }),
  commonjs(),
  typescript(),
  json(),
  babel({
    babelHelpers: 'bundled',
    extensions: ['.js', '.ts'],
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript'
    ],
    exclude: 'node_modules/**',
  }),
  dev && serve(serveopts),
  !dev && terser({ ecma: 2020 }),
];

export default [
  {
    input: 'src/DigitalClock.ts',
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
    },
    plugins: plugins.filter(Boolean),
  },
];
