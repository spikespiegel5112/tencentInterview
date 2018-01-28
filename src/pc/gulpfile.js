'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');

gulp.task('sprite', function () {
    gulp.src('image/sprite-fragment/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '../css/sprite.css',
            padding: 5,
            algorithm: 'binary-tree'
        }))
        .pipe(gulp.dest('image')) //输出目录
});

gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('sprite');
});