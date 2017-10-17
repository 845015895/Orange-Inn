/**
 * Created by 易子程 on 2017/10/17.
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var connect = require("gulp-connect");
var htmlbeautify = require('gulp-html-beautify');
var rename = require("gulp-rename");

var ejs = require("gulp-ejs");


var gutil = require('gulp-util');

var gulpLoadPlugins = require("gulp-load-plugins");

var plugins = gulpLoadPlugins();

var livereload = require('gulp-livereload');



gulp.task("js", function () {
    gulp.src("./js/**/*.js")
        .pipe(connect.reload());
});

var postcssConfig = [
    autoprefixer({
        browsers: [">1%"]
    })
];

gulp.task('sass', function () {
    return gulp.src('./style/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss(postcssConfig))
        .pipe(rename(function (path) {
            // console.log(path);
            path.dirname = "css"
        }))
        
        .pipe(gulp.dest('./style'))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch('./style/**/*.scss', ['sass']);
});


gulp.task("webServer", function () {
    connect.server({
        livereload: true
    });
});

gulp.task("default", ['watch', "webServer", "sass"]);