var gulp = require('gulp');
var Server = require('karma').Server;
var eslint = require('gulp-eslint');
var shell = require( 'gulp-shell' );

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('eslint', function () {
    return gulp.src("../Scripts/App/*.js").pipe(eslint())
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});





gulp.task('jsdoc', shell.task([
    '.\\node_modules\\.bin\\jsdoc --debug ..\\Scripts\\App'
]));

gulp.task('default', ['test']);