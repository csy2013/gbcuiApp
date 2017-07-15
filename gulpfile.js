//在你的项目根目录下创建gulpfile.js，代码如下：

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息

var jsarr = ['www/lib/ionic/js/ionic.bundle.js','www/lib/moment/moment.js','www/lib/angular-moment/angular-moment.js','www/lib/ngmap/build/scripts/ng-map.min.js','www/lib/ng-range-slider/dist/ng-range-slider.min.js','www/lib/underscore/underscore.js','www/lib/angular-local-storage/dist/angular-local-storage.js','www/lib/angular-resource/angular-resource.min.js','www/lib/ngCordova/dist/ng-cordova.js','www/lib/angular-messages/angular-messages.js'];

var localjs = ['www/js/resource/resource.js','www/js/resource/resource-service.js','www/js/app_min.js','www/views/account/account.js','www/views/auth/auth.js','www/views/checkout/checkout.js','www/views/common/common.js','www/views/content/content.js','www/views/feed/feed.js','www/views/filters/filters.js','www/views/liked/liked.js','www/views/search/search.js','www/views/shopping-cart/shopping-cart.js','www/views/sort/sort.js','www/views/walkthrough/walkthrough.js','www/views/getting-started/getting-started.js','www/js/pingpp.js','www/js/share.js'];
// 检查js
gulp.task('lint', function() {
    return gulp.src(localjs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});


// 合并、压缩js文件
gulp.task('js', function() {
     return gulp.src(localjs)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
        .pipe(notify({ message: 'js task ok' }));
});

gulp.task('lint_global', function() {
    return gulp.src(jsarr)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js1', function() {
    return gulp.src(jsarr)
        .pipe(concat('global.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
        .pipe(notify({ message: 'js task ok' }));
});


// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('www/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dest/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dest/css'))
        .pipe(notify({ message: 'css task ok' }));
});

// 压缩html
gulp.task('html', function() {
    return gulp.src('www/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dest'))
        .pipe(notify({ message: 'html task ok' }));

});


// 压缩图片
gulp.task('img', function() {
    return gulp.src('www/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./dest/img/'))
        .pipe(notify({ message: 'img task ok' }));
});



// 默认任务
gulp.task('default', function(){
    // gulp.run('img', 'css', 'lint', 'js','lint_global', 'js1','html');

    // gulp.run('js');
    gulp.run('lint', 'js');
    // gulp.run('html');
   /* // Watch global js files
    gulp.watch('www/js/!**!/!*.js', ['lint_global', 'js1']);

    // Watch app js files
    gulp.watch('www/js/!**!/!*.js', ['lint', 'js']);



    // 监听html文件变化
    gulp.watch('www/!**!/!*.html', function(){
        gulp.run('html');
    });

    // Watch .css files
    gulp.watch('www/css/!*.css', ['css']);



    // Watch image files
    gulp.watch('www/img/!*', ['img']);*/
});