var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var babel = require('gulp-babel');


gulp.task('sass', function () {
    return gulp.src('./component/myFirstComponent/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('component/myFirstComponent/css/'));
});

gulp.task('js', function() {
    return gulp.src('./component/myFirstComponent/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./component/myFirstComponent/js/js.js'));
});



gulp.task('default', function() {
    browserSync.init({
        proxy: "http://127.0.0.1:63342/component/"
    });

    gulp.watch("component/myFirstComponent/*.html").on('change', browserSync.reload);
    gulp.watch("component/myFirstComponent/*.js" , ['js']).on('change', browserSync.reload);
    gulp.watch("component/myFirstComponent/*.scss" ,['sass']).on('change', browserSync.reload);;
});