// res.render()	渲染视图模板。
// res.send() 发送各种类型的响应
// res.sendFile() 以八位字节流的形式发送文件
// res.sendStatus() 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

//GET 方法
//以下实例演示了在表单中通过 GET 方法提交两个参数，我们可以使用 server.js 文件内的 process_get 路由器来处理输入：
//index.htm 文件代码如下：
var express = require('express');
var app = express();
//启动服务
app.listen(8081)
var router = express.Router();//可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误

var fs = require('fs'); // 此模板引擎依赖 fs 模块



app.use(express.static('src'));//外链调用js,css文件，可以省去 此参数  路径
app.get('/users/:name', function(req, res) {//路径中 :name 起了占位符的作用，这个占位符的名字是 name，可以通过 req.params.name 取到实际的值。
  res.send('hello, ' + req.params.name);
});

//app.listen(3000);//可以同时监听俩个端口


app.get('/',fn)
function fn(req, res){
   res.send('dfffffffffffffffffffff');//发送各种类型的响应。
}
//console.log(__dirname);
//请求页面时的  路由URL访问地址，与对应文件发送回调处理
app.get('/x.html',xfn)
function xfn(req, res){
	console.log(__dirname);
	res.sendFile(__dirname + '/views/' + 'index.html'); //以八位字节流的形式发送文件。
}
//页面中包含JS ，css;
//路由和文件对应起来。
//JS，css的路由，对应的js,css的文件，比如console.log(1);在浏览器是原样显示，不解析。因为他是针对文件的直接访问;
//以及JS，css文件中涉及到path的                                                                                    
app.get('/jscss.js',jscssfn1);
function jscssfn1(req,res){
	console.log("__dirname"+__dirname);

	res.sendFile(__dirname + '/src/js/'+ 'js1.js')

}                                                 
                             
app.get('/jscss',jscssfn2);
function jscssfn2(req,res){

	console.log(process.env.PATH);
	//issue 如何把类似于上面的路劲打印到浏览器的控制台，或者可以在前端调到
	//process.env.PATH.split(path.delimiter)

	//res.sendStatus(200);
	res.sendFile(__dirname + '/views/'+ 'jscss.html');

	//res.send('一个请求');
	//res.send('二个请求');
	//res.send('三个请求');	//res.send最多一个,和上面的sendFile只能会有一个生效
	//页面路由，对应访问解析页面，以及页面中加载CSS,JS,图片
    //页面中在载的JS，CSS会被默认执行而不是只是解析。
//直接访问静态文件才是解析。
}

//加入模板来处理复杂重复的结构，比如 列表，类似的结构，然后，
//打入在相同的结构，打入不同的数据
app.get('/temp.html',tempfn);
function tempfn(req,res){
	res.sendFile(__dirname + '/views/' + 'temp.html')
}

//发这个请求时的回调处理
app.get('/process_get',process_getfn)
function process_getfn(req,res){
	//输出JSON格式
	response = {
		first_name:req.query.first_name,
		last_name:req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));//终结响应处理流程。
}

/*var server = app.listen(8081,function(){
	//var host = server.address().address
	//var port = server.address().port

	//console.log("应用实例，访问地址为 http://%s:%s", host, port)

})*/



//使用回调函数数组处理路由：

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);



//混合使用函数和函数数组处理路由
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

//　express的use方法调用body-parser实例；且use方法没有设置路由路径；这样的body-parser实例就会对该app所有的请求进行拦截和解析。
//　
//　
//因为当前要实现的功能是静态文件服务器，那么以Apache为例，让我们回忆一下静态文件服务器都有哪些功能。 
//
//浏览器发送URL，服务端解析URL，对应到硬盘上的文件。如果文件存在，返回200状态码，并发送文件到浏览器端；如果文件不存在，返回404状态码，发送一个404的文件到浏览器端。 

//----------读取静态文件---------------//

//涉及到了文件读取的这部分，自然不能避开fs(file system)这个模块。那么引入fs模块吧。 
//var fs = require("fs");
//
//同样，涉及到了路径处理，path模块也是需要的。 
//var path = require("path");
//
//我们通过path模块的path.exists方法来判断静态文件是否存在磁盘上。不存在我们直接响应给客户端404错误。 
//
//
//