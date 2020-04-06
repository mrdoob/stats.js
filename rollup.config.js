export default {
	input: 'src/Stats.js',
	output: [
		{
			format: 'umd',
			name: 'Stats',
			file: 'build/stats.js',
			indent: '\t'
		},
		{
			format: 'es',
			name: 'Stats',
			file: 'build/stats.module.js',
			indent: '\t'
		}
	]
};
