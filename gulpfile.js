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

var tsGlob = srcResourcesDir + '/**/*.ts';
var dtsGlob = srcResourcesDir + '/**/*.d.ts';
var tsFiles = glob.sync(tsGlob, { absolute: true, ignore: dtsGlob });
var dtsFiles = glob.sync(dtsGlob, { absolute: true });
var tsBuildTasks = tsFiles.map(f => 'build:'+ f);
//console.log('tsFiles:' + JSON.stringify(tsFiles, null, 4));
//console.log('dtsFiles:' + JSON.stringify(dtsFiles, null, 4));
//process.exit()

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

gulp.task('build', ['build:node_modules'].concat(tsBuildTasks));

gulp.task('watch', ['build'], function() {
    $.livereload({ start: true });
    //app.all(/^(?!\/dist).*$/, (req, res) => proxy.web(req, res, { target: enonic }));
    app.use(express.static(__dirname)).listen(expressPort);
    //gulp.watch(sassFiles   , ['distCssTask']);
    //gulp.watch(assetJsFiles, ['distJsTask']);
    gulp.watch(tsFiles, event => { gulp.start('watch:' + event.path); });
});

gulp.task('default', ['build']);
