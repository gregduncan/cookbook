var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge'),
    fs = require("fs"),
    del = require('del'),
    path = require('path');

eval("var project = " + fs.readFileSync("./project.json"));
var lib = "./" + project.webroot + "/lib/";

var paths = {
    npm: './node_modules/',
    tsSource: './wwwroot/app/**/*.ts',
    tsOutput: lib + 'dist/',
    tsDef: lib + 'definitions/',
    jsVendors: lib + 'js',
    jsRxJSVendors: lib + 'js/rxjs',
    cssVendors: lib + 'css',
    imgVendors: lib + 'img',
    fontsVendors: lib + 'fonts'
};

var tsProject = ts.createProject('./wwwroot/tsconfig.json');

gulp.task('vendors', function (done) {

    // JS Files
    gulp.src([
      'node_modules/jquery/dist/jquery.*js',
      'bower_components/bootstrap/dist/js/bootstrap*.js',
      'systemjs.config.js'
    ]).pipe(gulp.dest(paths.jsVendors));

    // CSS Files
    gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/components-font-awesome/css/font-awesome.css',
    ]).pipe(gulp.dest(paths.cssVendors));

    // Fonts
    gulp.src([
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
      'bower_components/components-font-awesome/fonts/FontAwesome.otf',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.eot',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.svg',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2',
    ]).pipe(gulp.dest(paths.fontsVendors));
});

gulp.task('type', function (done) {
    var tsResult = gulp.src([
       "wwwroot/app/**/*.ts"
    ])
     .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest(paths.tsOutput));
});

gulp.task('watch.ts', ['type'], function () {
    return gulp.watch('wwwroot/app/**/*.ts', ['typescript']);
});

gulp.task('watch', ['watch.ts']);

gulp.task('clean', function () {
    return del([lib]);
});

gulp.task('build', ['vendors', 'type']);