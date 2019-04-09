const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify-es').default;
const path = require('path');

function lessCss(src, outDir, outName) {
    return gulp
        .src(path.join('src/main/resources/site/', src))
        .pipe(less({
            relativeUrls: true
        }).on('error', err => {
            console.error(err.message);
    process.exit(1);
}))
.pipe(rename(outName))
        .pipe(gulp.dest(outDir));
}

function typescript(src, out, decl) {
    const tsResult = gulp
        .src(path.join('src/main/resources/site/', src))
        .pipe(ts({
            out: path.join('src/main/resources/site/', out),
            module: "system",
            target: 'ES5',
            lib: ['ES5', 'ES6', 'DOM'],
            declaration: decl,
            noImplicitAny: false,
            noUnusedLocals: true,
            noUnusedParameters: true
        }));

    tsResult.js
        .pipe(uglify({
            mangle: false,
            keep_fnames: true
        }))
        .pipe(gulp.dest('./'));

    return tsResult.dts
        .pipe(gulp.dest('./'));
}

gulp.task('less', () => lessCss(
    'parts/helloWorld/helloWorld.less',
    'src/main/resources/site/parts/helloWorld',
    'helloWorld.css'
));

gulp.task('ts', () => typescript('parts/helloWorld/helloWorld.ts', 'parts/helloWorld/helloWorld.js', true));

gulp.task('build', gulp.series(gulp.parallel('less', 'ts')));
