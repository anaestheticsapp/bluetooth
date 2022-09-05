import rimraf from 'rimraf';
import resolve from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy'
import html from "@open-wc/rollup-plugin-html";
//import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import serve from 'rollup-plugin-serve';

import { readFileSync } from 'fs';

import { LOCATION_TO_KEY } from './env.js';

const dir = 'public';

const config = {
  input: "src/index.html",
  output: {
    dir,
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    copy({
      targets: [
        { src: 'src/assets/mp3/*', dest: 'public/assets/mp3' },
        { src: 'src/assets/img/*', dest: 'public/assets/img' },
      ]
    }),
    html(),
    //typescript(),
    terser(),
    serve({
      contentBase: dir,
      host: 'localhost',
      port: 20001,
      https: {
        key: readFileSync(LOCATION_TO_KEY + 'localhost-key.pem'),
        cert: readFileSync(LOCATION_TO_KEY + 'localhost.pem'),
        ca: readFileSync(LOCATION_TO_KEY + 'rootCA.pem'),
      },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      historyApiFallback: true,
    }),
  ],
  preserveEntrySignatures: 'strict',
};

rimraf.sync('./public/');

export default config;
