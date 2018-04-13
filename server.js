const  mongodb = require('mongodb');
const http = require('http');
// const url = require('url');
const querystring = require('querystring');
const express = require('express');


const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/'
const app = express();


// 连接数据库
MongoClient.connect(url, function(err, db){
	// db就是连接的数据库对象，在其中可以进行数据库的曾删改查操作
	if(err) throw err;
	var dbo = db.db('local');
	// var myobj = [
	// 	{name: 'javascript', url: 'www.js.com'},
	// 	{name: 'java', url: 'www.java.com'},
	// 	{name: 'php', url: 'www.php.com'},
	// ];
	// dbo.collection('site').insertMany(myobj, function(err, res){
	// 	if(err) throw err;
	// 	// console.log(res);
	// 	console.log('插入问单数量为：' + res.insertedCount);
	// })
	dbo.collection('col').find().toArray(function(err, result){
		if(err) throw err;
		console.log(result)
		result = JSON.stringify(result);
		console.log('总共'+ result.length + '条数据');
		http.createServer(function(req, res){
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader('Content-Type', 'application/json');
			res.write(result)
			res.end();
		}).listen(9898)
	})
})


var html = `
<h1>请输入正确的参数</h1>

`

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db('local');
	dbo.collection('mycol').find().toArray(function(err, result){
		if(err) throw err;
		console.log(result)
		result = JSON.stringify(result);
		http.createServer(function(req, res){
			console.log(req)
			var body = '';
			req.on('data', function(chunk){
				console.log(chunk);
				body += chunk;
			});
			req.on('end', function(){
				body =querystring.parse(body);
				console.log(body)
				console.log(body);
				if(body.name) {
					if (body.name === 'guokeke') {
						res.setHeader('Content-Type', 'application/json;charset=utf8');
						res.setHeader("Access-Control-Allow-Origin", "*");
						res.write(result);
					}else {
						res.setHeader("Access-Control-Allow-Origin", "*");
						res.setHeader('Content-Type', 'text/html;charset=utf8');
						res.write(html)
					}
				} else {
					res.writeHead(404, {'Content-Type': 'text/html'});
				}
				res.end();
			});
		}).listen(9999)
	})
})
