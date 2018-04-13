const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// MongoClient.connect(url, function(err, db){
// 	if(err) throw err;
// 	var dbo = db.db('runoob');

// 	dbo.collection('site').find().toArray(function(err, result) {
// 		if(err) throw err;
// 		app.get('/', function(req, res){
// 			console.log(req.ip);
// 			console.log('协议类型:'+req.protocol);
// 			console.log('匹配的路由:' + req.query);
// 			console.log("请求文档的类型："+ req.accepts);
// 			// console.log('http请求头：' + req.get());
// 			console.log('content-type的MIME类型:' + req.is());
// 			res.header("Access-Control-Allow-Origin", "*");
//     		// res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     		// res.header("X-Powered-By",' 3.2.1')
//     		res.header("Content-Type", "application/json;charset=utf-8");
// 			res.send(result)
// 		})
// 		var server = app.listen(10001, function (){
// 			console.log('发起了请求')
// 		})
// 	})
// })

// 请求连接数据库
MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbo = db.db('userInfo');
	
		// 登录接口
		app.post('/login', function(req, res) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
			res.header("Content-Type", "application/json;charset=utf-8");
			var reqBody = req.body;
			console.log(reqBody);
			console.log(typeof reqBody);
			var name = reqBody.name;
			var password = reqBody.password;
			console.log(111111111111111111)
			
			//输入验证
			if(!name || name == "") {
			  console.log("用户名不能为空");
			  res.send({success: false, msg: '用户名不能为空'});
			  return;
			}
			if(!password || password == "") {
			  console.log("密码不能为空");
			  res.send({success: false, msg: '密码不能为空'});
			  return;
			}
			dbo.collection('userInfo').find().toArray(function(err, result){
				console.log(result);
				var switchs = result.some(function(val){
					return val.name === name && val.password === password;
				});
				console.log(switchs);
				if(!switchs) {
					res.send({success: false, msg: '用户名或密码错'});
				} else {
					res.send({success: true, msg: '登录成功'});
				}
			});
			
		});
		// 注册接口
		app.post('/signUp', function(req, res) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
			res.header('Content-Type', 'application/json;charset=utf-8');
			var requestBody = req.body; // post请求体内容 需要body-parser插件解析，分不同类型的数据
			console.log(requestBody);
			var name = requestBody.name;
			var password = requestBody.password;
			//输入验证
			if(!name || name == "") {
			  console.log("用户名不能为空");
			  res.send({success: false, msg: '用户名不能为空'});
			  return;
			}
			if(!password || password == "") {
			  console.log("密码不能为空");
			  res.send({success: false, msg: '密码不能为空'});
			  return;
			}
			dbo.collection('userInfo').find().toArray(function(err, result){
				if(err) throw err;
				var switchs = false;
				result.forEach(function(val){
					if (val.name === name){
						switchs = true;
					}
				})
				if (switchs) {
					res.send({success: false, msg: '用户名已经被注册'});
				} else {
					dbo.collection('userInfo').insertOne(requestBody, function(err, result){
						if(err) throw err;
						res.send({success: true, msg: '注册成功'});
					})
				}
			})
		});
		var server = app.listen(10002, function (){
			console.log('发起了请求')
		})

})



/***
1.nodejs创建数据库
var MongoClient = require('mongodb').MongodClient;
var url = 'mongodb://localhost:27017/runoob';  这个是创建 runoob库
MongoClient.connect(url, function(err, db){})
2.创建集合（表）
在回调中：
var dbase = db.db.('runoob');
dbase.createCollection('site', function(err, res){
	//创建了 site 的表（集合）
})

3.数据库的curd(增删改查)
插入数据
dbase.collection('site').insertOne({a: 11}, function(err, res){
	//添加数据的回调函数
})
insertOne()// 插入一条数据，参数1是对象
insertMany()//插入多条数据， 参数1是 数组，其中每一项都是数据

查询数据库
dbase.collection('site').find().toArray(function(err, res){
	//res: 是site表中的数据
})
find()中的参数，指条件查询

更新数据
dbase.collection('site').updateOne(olddate,新数据，callback)  同updateManny()


删除数据
dbase.collection('site').deleteOne({}, callback)
同 deleteMany()



4.删除集合
dbase.collection('site').drop(callback)


*/ 