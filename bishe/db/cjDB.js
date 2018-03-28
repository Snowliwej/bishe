var pool = require('./pool');
//查询全校不同科目，不同分数段的个数统计
function findAll(handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql = 'select'
 			+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "excellent",'
			+' sum(CASE when cj >= 60 and cj < 80 then 1 else 0 end)   AS "pass",'
			+' sum(CASE when cj < 60 then 1 else 0 end)   AS "fail",'
			+' "c程序" as km'
			+' from cLlcj_info'
			+' union'
			+' SELECT'	
			+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "excellent",'
			+' sum(CASE when cj >= 60 and cj < 80 then 1 else 0 end)   AS "pass",'
			+' sum(CASE when cj < 60 then 1 else 0 end)   AS "fail",'
			+' "vf" as km'
			+' from vfLlcj_info'
			+' union'
			+' SELECT'	
			+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "excellent",'
			+' sum(CASE when cj >= 60 and cj < 80 then 1 else 0 end)   AS "pass",'
			+' sum(CASE when cj < 60 then 1 else 0 end)   AS "fail",'
			+' "计算机A" as km'
			+' from jsjA_info'
			+' union'
			+' SELECT'	
			+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "excellent",'
			+' sum(CASE when cj >= 60 and cj < 80 then 1 else 0 end)   AS "pass",'
			+' sum(CASE when cj < 60 then 1 else 0 end)   AS "fail",'
			+' "计算机B" as km'
			+' from jsjB_info'
			+' union'
			+' SELECT'	
			+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "excellent",'
			+' sum(CASE when cj >= 60 and cj < 80 then 1 else 0 end)   AS "pass",'
			+' sum(CASE when cj < 60 then 1 else 0 end)   AS "fail",'
			+' "计算机C" as km'
			+' from jsjC_info'
			+' union'
			+' SELECT'	
			+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "excellent",'
			+' sum(CASE when cj >= 60 and cj < 80 then 1 else 0 end)   AS "pass",'
			+' sum(CASE when cj < 60 then 1 else 0 end)   AS "fail",'
			+' "vb" as km'
			+' from vbLlcj_info';
			conn.query(sql,function(err,results){
				if(err){
					throw err;
				}else{
					handler.call(this,results);
				}
				//释放链接对象（一定要在query的毁掉函数中释放）
				conn.release();
			})
		}
	})
}


//不同科目的平均分
function divisionSub(handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql = 'select' 
					+' ROUND(avg(cj),2) as "pjf",'
					+' "c程序" as km'
					+' from cLlcj_info'
					+' UNION'
					+' select' 
					+' ROUND(avg(cj),2) as "pjf",'
					+' "vf" as km'
					+' from vfLlcj_info'
					+' UNION'
					+' select' 
					+' ROUND(avg(cj),2) as "pjf",'
					+' "计算机A" as km'
					+' from jsjA_info'
					+' UNION'
					+' select' 
					+' ROUND(avg(cj),2) as "pjf",'
					+' "计算机B" as km'
					+' from jsjB_info'
					+' UNION'
					+' select' 
					+' ROUND(avg(cj),2) as "pjf",'
					+' "计算机C" as km'
					+' from jsjC_info'
					+' UNION'
					+' select' 
					+' ROUND(avg(cj),2) as "pjf",'
					+' "vb" as km'
					+' from vbLlcj_info';
			conn.query(sql,function(err,results){
				if(err){
					throw err;
				}else{
					handler.call(this,results);
				}
				//释放链接对象（一定要在query的回调函数中释放）
				conn.release();
				
			})
		}
	})
}
//同一科目，不同班级，教师，学院平均分统计
function sameSub(columns,tableName,columns,handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql ='select' 
					+' ?? as "name",'
					+' ROUND(avg(cj),2) as "pjf"'
					+' from ?? GROUP BY ?? order by pjf desc';
			conn.query(sql,[columns,tableName,columns],function(err,results){
				if(err){
					throw err;
				}else{
					handler.call(this,results);
				}
				//释放链接对象（一定要在query的回调函数中释放）
				conn.release();
			})

		}
	})
}

// 每门科目的总人数，及格人数，优秀人数
function num_data(tableName,handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql ='SELECT'	
					+' sum(CASE when cj >= 0 and cj <= 100 then 1 else 0 end)   AS "zrs",'
					+' sum(CASE when cj >= 80 and cj < 100 then 1 else 0 end)   AS "yxrs",'
					+' sum(CASE when cj >= 60 then 1 else 0 end)   AS "jgrs"'
					+' from ??';
			conn.query(sql,[tableName],function(err,results){
				if(err){
					throw err;
				}else{
					handler.call(this,results);
				}
				//释放链接对象（一定要在query的回调函数中释放）
				conn.release();
			})

		}
	})
}


//不同体型得分统计
function txde_data(tableNameTx,handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql ='select'
						+' ROUND(avg(cj),2)as "cj",'
						+' ROUND(avg(tk),2)as "tk",'
						+' ROUND(avg(dx),2)as "dx",'
						+' ROUND(avg(pd),2)as "pd",'
						+' ROUND(avg(cxsj),2)as "cxsj",'
						+' ROUND(avg(cxtk),2)as "cxtk",'
						+' ROUND(avg(ctsj),2)as "ctsj",'
						+' ROUND(avg(bdsj),2)as "bdsj",'
						+' ROUND(avg(Word),2)as "Word",'
						+' ROUND(avg(Excel),2)as "Excel",'
						+' ROUND(avg(PowerPoint),2)as "PowerPoint",'
						+' from ??';			
			conn.query(sql,[tableNameTx],function(err,results){
				if(err){
					throw err;
				}else{
					handler.call(this,results);
				}
				//释放链接对象（一定要在query的回调函数中释放）
				conn.release();
			})

		}
	})
}

module.exports = {
	findAll:findAll,
	divisionSub:divisionSub,
	sameSub:sameSub,
	num_data:num_data,
	txde_data:txde_data
}
