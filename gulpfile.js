var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var packageJson = require('./package.json');
var express = require('express');
var glob = require('glob');
var ts = require('gulp-typescript'); // Does not work with gulp-load-plugins?
var httpProxy = require('http-proxy');

var app         = express();
var proxy       = httpProxy.createProxyServer();
var enonic      = 'http://localhost:8080';
var expressPort = 8889;

//__dirname
var srcResourcesDir = 'src/main/resources';
var dstResourcesDir = 'build/resources/main';
var dstSiteDir      = dstResourcesDir + '/site';


var srcGlob = srcResourcesDir + '/**/*.*'; // Not folders
var srcFiles = glob.sync(srcGlob, { absolute: true });
var ignoreGlob = srcResourcesDir + '/**/*.{js,scss,ts}';
var copyFiles = glob.sync(srcGlob, { absolute: true, ignore: ignoreGlob });
var copyTasks = copyFiles.map(f => 'copy:'+ f);

var tsGlob = srcResourcesDir + '/**/*.ts';
var dtsGlob = srcResourcesDir + '/**/*.d.ts';
var tsFiles = glob.sync(tsGlob, { absolute: true, ignore: dtsGlob });
var dtsFiles = glob.sync(dtsGlob, { absolute: true });
var tsBuildTasks = tsFiles.map(f => 'build:'+ f);
var watchFiles = copyFiles.concat(tsFiles);
//console.log('dtsFiles:' + JSON.stringify(dtsFiles, null, 4));
//process.exit()

copyFiles.forEach(function (filePath) {
    function copyFile() {
        return gulp.src(filePath, { base: srcResourcesDir })
            .pipe(gulp.dest(dstResourcesDir));
    }
    gulp.task('copy:' + filePath, (done) => {
        copyFile();
        done();
    });
    gulp.task('watch:' + filePath, (done) => {
        copyFile().pipe($.livereload());
        done();
    });
});

tsFiles.forEach(function(tsFile) {

    function buildTsFile() {
        var tsProject = ts.createProject('tsconfig.json');
        return gulp.src([tsFile, dtsGlob], { base: srcResourcesDir })
        //.pipe($.debug({ title: 'tsFile:'}))
        .pipe($.plumber())
        .pipe(tsProject())
        .pipe(gulp.dest(dstResourcesDir));
    }

    gulp.task('build:' + tsFile, (done) => {
        buildTsFile();
        done();
    });

    gulp.task('watch:' + tsFile, (done) => {
        buildTsFile().pipe($.livereload());
        done();
    });

}); // tsFiles.forEach

gulp.task('build:node_modules', function () {
    return gulp.src(
        Object.keys(packageJson.dependencies).map(function (module) {
            return './node_modules/' + module + '/**/*.js';
        })
        , { base: 'node_modules'}
        )
        //.pipe($.debug({ title: 'nodeModules:'}))
        .pipe(gulp.dest(dstSiteDir + '/lib'));
});

gulp.task('build', ['build:node_modules'].concat(copyTasks, tsBuildTasks));

gulp.task('watch', ['build'], function() {
    $.livereload({ start: true });
    app.all(/^(?!\/dist).*$/, (req, res) => proxy.web(req, res, { target: enonic }));
    app.use(express.static(__dirname)).listen(expressPort);
    //gulp.watch(sassFiles   , ['distCssTask']);
    //gulp.watch(assetJsFiles, ['distJsTask']);
    gulp.watch(watchFiles, event => { gulp.start('watch:' + event.path); });
});

gulp.task('default', ['build']);
