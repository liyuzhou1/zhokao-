//引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var server = require('gulp-webserver');

var url = require('url');
var path = require('path');
var fs = require('fs');

var data = require('./data/data.json');

//css
gulp.task('minCss', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('src/css'));
});

//server 服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            lieveload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});