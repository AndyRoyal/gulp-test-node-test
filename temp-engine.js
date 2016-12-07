//为 Express 开发模板引擎

//通过 app.engine(ext, callback) 方法即可创建一个你自己的模板引擎。其中，ext 指的是文件扩展名、callback 是模板引擎的主函数，接受文件路径、参数对象和回调函数作为其参数。

var http = require('http');
var swig=require("swig");
var express = require('express');
var app = express();

var server = app.listen(8081,function(){
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
//----------------模板引擎 使用----------------------//

//app.set("view engine","xpl");// 对于一个类型是布尔型的属性调用app.set('foo', ture)等价于调用app.enable('foo')。同样的，调用app.set('foo', false)等价于调用app.disable('foo')。 可以使用app.get()来取得设置的值
//app.engine("xpl",swig.renderFile);//注册给定引擎的回调，用来渲染处理ext文件。tpl

//模板引擎 测试 页
function swigdemo(req,res){
	//res.send('swigdemo test');
	//res.sendFile('xpl.xpl');
	res.render('xpl.xpl');
};
app.use(express.static('src'));
//demo  提出去回调函数
function routedemo(req,res){
	console.log(__dirname);

	res.sendFile(__dirname + '/views/' + 'index.html'); //以八位字节流的形式发送文件。
	res.send(res.sendFile(__dirname + '/views/' + 'index.html')+'routedemo OK');
};
app.get('/routedemo',routedemo)
app.get('/swigdemo',swigdemo)

app.get('/',fn)
function fn(req, res){
   res.send('Hello World');//发送各种类型的响应。
}
console.log("temp-engine.js入口启动文件");
//----------------模板引擎 使用----------------------//

//----------------下面的代码演示的是一个非常简单的能够渲染 “.ntl” 文件的模板引擎。----------------------//
/*var fs = require('fs');//此模板引擎以来fs 模块
app.engine('xpl', function(filePath,options,callback){//定义模板引擎
	fs.readFile(filePath,function(err,content){
		if(err) return callback(new Error(err));
		//这是一个功能极其简单的模板引擎
		var rendered = content.toString().replace('#title#', '<title>' + options.title + '</title>')
		.replace('#message#','<h1>'+ options.message + '</h1>');
		return callback(null,rendered);
	})
});
app.set('views','views');//指定视图所在位置
app.set('view engine','xpl');//注册模板引擎

app.get('/',function(req,res){
	res.render('xpl',{ title: 'Hey', message: 'Hello there!'});
})*/
//----------------上面的代码演示的是一个非常简单的能够渲染 “.ntl” 文件的模板引擎。----------------------//