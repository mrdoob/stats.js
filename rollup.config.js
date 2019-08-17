import closure from '@ampproject/rollup-plugin-closure-compiler';
import banner from 'rollup-plugin-banner';

export default [
  {
    input: 'src/Stats.js',
    output: [
      { file: 'build/stats.js', name: 'Stats', format: 'umd' },
      { file: 'build/stats.module.js', format: 'esm' },
    ],
  },
  {
    input: 'src/Stats.js',
    output: { file: 'build/stats.min.js', name: 'Stats', format: 'iife' },
    plugins: [
      closure({ language_in: 'ECMASCRIPT6_STRICT', language_out: 'ECMASCRIPT5_STRICT' }),
      banner('stats.js - http://github.com/mrdoob/stats.js'),
    ],
  },
]
