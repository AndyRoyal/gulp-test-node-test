//你仅仅需要知道的5个gulp命令
//
//gulp.task(name, fn)这个你应经见过了
//
//gulp.run(tasks...)尽可能多的并行运行多个task
//
//gulp.watch(glob, fn)当glob内容发生改变时，执行fn
//
//gulp.src(glob)返回一个可读的stream
//
//gulp.dest(glob)返回一个可写的stream
var express=require("express");
var app=express();
var http=require("http");
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    concat = require('gulp-concat');

var jasmine = require('gulp-jasmine');//gulp有比较多的插件，比如上面用到的gulp-jasmine就是其中的一个。

var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'src/img/1'
};

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});


app.get('/', function (req, res) {
	//加载压缩后的js,图片，css到 http://127.0.0.1:8081/   下，从控制台可以 看到的    请求 
	//除了用数组  传入task任务列表，还有什么方式可以 一次性执行多个任务
	//加一个功能，比如，压缩文件，加一个task即可
	//
	//如何对比gfe和glup之间的好坏，哪个速度更快，更好
	//如何把静态资源,js,css,picture打到 对应的域名下面。这和IP有关系吗？
	//

   res.send('express http start  -------------gulp test--------------stream----------------------------');
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("host--"+host);
	console.log("port--" + port);
	console.log("应用实例，访问地址为 http://%s:%s", host, port);

	console.log(paths.images);
})



gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});



gulp.task('default', function() {
	console.log("this is the default task");
  // 将你的默认的任务代码放在这
});
gulp.task('test1',function(){

   console.log("gulpfile.js-- 任务test1");
});



//定义一个testLess任务（自定义任务名称）
//gulp.task('testLess', function () {
//    gulp.src('src/less/index.less') //该任务针对的文件
//        .pipe(less()) //该任务调用的模块
//        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
//});
// 
//gulp.task('default',['testLess', 'elseTask'],function(){
//	console.info("进入task回调");
//}); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径


