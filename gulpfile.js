var gulp = require('gulp');
var eslint = require('gulp-eslint');
var zip = require('gulp-zip');

var JS = [
  'public/js/collections/*.js',
  'public/js/routers/*.js',
  'public/js/views/*.js',
  'public/js/models/*.js',
  'public/js/indexPage.js',
  'public/js/init.js',
  'app.js',
  'bin/*.js',
  'db/*.js',
  'middlewares/*.js',
];

var FILES = [
  'js/**/*'
];

var options = {
  rulePaths: ['.eslint_rules']
};

gulp.task('eslint', function () {
  return gulp.src(JS)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('zip', function () {
  return gulp.src(FILES, {base: '.'})
    .pipe(zip('files.zip'))
    .pipe(gulp.dest(''));
});
