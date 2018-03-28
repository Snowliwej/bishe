var mysql = require('mysql');
//创建链接池，（保证一个项目中只有一个连接池）
var pool = global.pool;
if(!pool){
	//如果pool不存在，创建pool
	pool = mysql.createPool({
		host:'127.0.0.1',
		port:'3306',
		database:'bishe',
		user:'root',
		password:'root'
	})
	global.pool = pool;
}

module.exports = pool;
