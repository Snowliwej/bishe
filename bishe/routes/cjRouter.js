var express = require('express');
var cjDB = require('../db/cjDB');
var urlM = require('url');
var querystring = require('querystring');
var cjRouter = express.Router();

cjRouter.get('/findAll',function(req,resp){
    // console.log(resp)
    cjDB.findAll(function(results){
        var sub_num = JSON.stringify(results);
        resp.send(sub_num)
    })
})

cjRouter.get('/divisionSub',function(req,resp){
    // console.log(resp)
    cjDB.divisionSub(function(results){
        var sub_num = JSON.stringify(results);
        resp.send(sub_num)
    })
})
cjRouter.get('/sameSub',function(req,resp){
    var query = req.query;
    var tableName = query.tableName;
    var columns = query.columns;
    cjDB.sameSub(columns,tableName,columns,function(results){
        var sub_num = JSON.stringify(results);
        resp.send(sub_num);
        
    })
})

cjRouter.get('/num_data',function(req,resp){
    var query = req.query;
    var tableName = query.tableName;
    cjDB.num_data(tableName,function(results){
         var sub_num = JSON.stringify(results);
        resp.send(sub_num);
    });
    tableName = ''
})

// 不同题型得分
cjRouter.get('/txde_data',function(req,resp){
    var query = req.query;
    var tableNameTx = query.tableNameTx;
    cjDB.txde_data(tableNameTx,function(results){
        var sub_num = JSON.stringify(results);
        resp.send(sub_num)
    })
})
module.exports  = cjRouter;