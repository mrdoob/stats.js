export default {
  input: 'src/Stats.js',
  output: [
    {
      format: 'umd',
      name: 'Stats',
      file: 'build/stats.js',
      indent: ''
    },
    {
      format: 'es',
      name: 'Stats',
      file: 'build/stats.module.js',
      indent: ''
    }
  ]
  // dest: 'build/stats.js',
  // moduleName: 'Stats',
  // format: 'umd'
};
