var gulp = require('gulp'),
    install = require('gulp-install'),
    exec = require('gulp-exec'),
    replace = require('gulp-replace');

gulp.task('install', () => {
    return gulp.src(['web/ui/package.json'])
        .pipe(install());
});

gulp.task('build', () => {
    return gulp.src(['web/ui/package.json'])
        .pipe(exec('cd web/ui && npm run build'))
        .pipe(exec.reporter());
});

gulp.task('insertGoogleKey', () => {
    return gulp.src(['web/ui/build/index.html'])
        .pipe(replace('maps/api/js', `maps/api/js?key=${process.env.GOOGLE_KEY}`))
        .pipe(gulp.dest('web/ui/build/'));
});

gulp.task('default', gulp.series('install', 'build', 'insertGoogleKey'));