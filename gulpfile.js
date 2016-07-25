'use strict';

var source = 'src/Stats.js';
var output_file = 'stats.min.js';
var output_dir  = 'build';

var watch  = require('gulp-watch');
var gulp   = require('gulp');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');

gulp.task('minify', function() {
	return gulp.src(source)
		.pipe(uglify({preserveComments: 'license'}))
		.pipe(rename(output_file))
		.pipe(gulp.dest(output_dir));
});

gulp.task('watch', function() {
	gulp.watch(source, ['minify']);
});
