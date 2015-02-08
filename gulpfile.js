var gulp        = require('gulp'),
    uglify      = require('gulp-uglify');
    sass        = require('gulp-ruby-sass');
    plumber     = require('gulp-plumber');
    webserver   = require('gulp-webserver');
    beeper      = require('beeper');

/*
    SCRIPTS TASK
*/
// Uglify JS
gulp.task('scripts', function(){
    gulp.src('assets/source/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('assets/build/js'));
        //beeper(2);
});

/*
    STYLES TASK
*/
// Compiles sass into css
gulp.task('styles', function(){
    return sass('assets/source/sass/')
        //.pipe(plumber())
        .on('error', function (err) {
            console.error('Error', err.message);
        })
        .pipe(gulp.dest('assets/build/css'));
        //beeper(2);
});

gulp.task('beeper', function(){
    beeper(3);
});

/*
    SETUP SERVER FOR TINY LIVERELOAD
*/
var server = {
    host: 'localhost',
    port: '8001'
};

gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

/*
    WATCH TASK
*/
gulp.task('watch', function(){
    gulp.watch('assets/source/sass/**/*.scss', ['styles']);
    gulp.watch('assets/source/js/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'webserver', 'scripts', 'beeper', 'watch']);
