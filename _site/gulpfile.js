const     gulp           = require('gulp'),
		plumber       = require('gulp-plumber'),
		sass          = require('gulp-sass'),
		autoprefixer  = require('gulp-autoprefixer'),
		browserSync   = require('browser-sync'),
		uglify        = require('gulp-uglify'),
		concat        = require('gulp-concat'),
		imagemin      = require('gulp-imagemin'),
		rename        = require('gulp-rename'),
		beautifycss   = require('gulp-cssbeautify'),
		cssmin        = require('gulp-cssmin'),
		gcmq  	    = require('gulp-group-css-media-queries'),
		babel	    = require('gulp-babel'),
		cp            = require('child_process');


/**
 * Files Path
 */

var paths = {
	src: {
		sass: ['assets/src/sass/**/*.sass'],
		js: 'assets/src/js/**/*.js',
		img: 'assets/src/images/**/*'
	},
	dest: {
		sass: 'assets/dist/css',
		js: 'assets/dist/js',
		img: 'assets/dist/images',
		beauty: {
			sass: 'assets/dist/css/beauty'
		}
	}
}



var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn(jekyllCommand, ['s'], {stdio: 'inherit'})
		.on('close', done);
});



gulp.task('css', function() {
	gulp.src(paths.src.sass)
	    .pipe(plumber())
	    .pipe(sass())
	    .pipe(gcmq())
	    .pipe(autoprefixer({
		   browsers: ['last 30 versions'],
		   cascade: false
	    }))
	    .pipe(cssmin())
	    .pipe(plumber.stop())
	    .pipe(rename('style.min.css'))
	    .pipe(gulp.dest(paths.dest.sass))
	    .pipe(browserSync.reload({stream:true}))
	    .pipe(beautifycss())
	    .pipe(gulp.dest(paths.dest.beauty.sass))
 });


/**
 * Javascript Task
 */
gulp.task('js', function() {
	gulp.src(['assets/src/js/jquery.js',
			'assets/src/js/libs/**.js',
			'assets/src/js/custom/**.js',
			'assets/src/js/main.js'])
	    .pipe(plumber())
	    .pipe(babel({
			presets: ['env']
	 	}))
	    .pipe(concat('concat.js'))
	    .pipe(gulp.dest(paths.dest.js))
	    .pipe(rename('main.min.js'))
	    .pipe(uglify())
	    .pipe(plumber.stop())
	    .pipe(gulp.dest(paths.dest.js));
 });

/**
 * Imagemin Task
 */
gulp.task('imagemin', function() {
	return gulp.src(paths.src.img)
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest(paths.dest.img));
});


/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
 gulp.task('watch', function () {
	gulp.watch(paths.src.sass, ['css']);
	gulp.watch(paths.src.js, ['js']);
	gulp.watch('assets/src/img/**/*.{jpg,png,gif}', ['imagemin']);
	gulp.watch(['jekyll-build']);
	// gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', [ 'jekyll-build', 'imagemin', 'js', 'css', 'watch']);
