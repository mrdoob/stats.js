export default {
  entry: 'src/Stats.js',
  targets: [
    {
      format: 'umd',
      moduleName: 'Stats',
      dest: 'build/stats.js'
    },
    {
      format: 'es',
      dest: 'build/stats.module.js'
    }
  ]
};
