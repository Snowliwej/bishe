
var h = $(window).height(),
	baseUrl = 'http://192.168.174.130:3000',
	data_info={
		tableNameTx:'cLlcj_txfs',
		columns : 'x',
		tableName : 'cLlcj_info'
	},
	color_5 = ['#0dc884','#40c4ff','#a3e9a4','#0091ea','#8bc34a','#81affe','#01579b','#84ffff','#00cdb9','#00806f','#00e892'],
	num={
		excellent_num : 0,
		pass_num : 0,
		Total_num : 0
	};
	//个分数段人数统计对象
	var obj1 = {
		name:[],
		wjg:[],
		jg:[],
		yx:[]
	};
	//不同科目平均分对象
	var obj2 = {
		name:[],
		pjf:[]
	};
	//印象因素对象
	var obj3 = {
		name:[],
		pjf:[]
	}
	//不同题型得分对象
	var obj4 = {
		tk:0,
		pd:0,
		dx:0,
		cxtk:0,
		cxsj:0,
		ctsj:0,
		bdsj:0,
		Word:0,
		Excel:0,
		PowerPoint:0
	}
$(function(){
	$('.section').css('height',h-57);
	$('.button_box').css('height',(h-57)/4);
	$('.factor').css('height',3*(h-57)/4);
	$('.score').css('height',(h-57)/2);
	$('.statistics').css('height',(h-57)/2);
	$('.link p').first().css('color','#b8fdfd')
	$('.modal_box ul li').first().css('color','#b8fdfd')
	
})

//数据请求
	mainData();
	btkmpjf();
	rstj(data_info);
	tykmbtlx(data_info)
	bttxdf(data_info)


function course(item){
	$('.type table tbody').empty();
	data_info.tableName = $(item).eq(0).attr('name');
	data_info.tableNameTx = $(item).eq(0).attr('txname');
	$('.button_left p').css('color','');
	$(item).eq(0).css('color','#b8fdfd');	
	rstj(data_info);
	tykmbtlx(data_info)
	bttxdf(data_info)
}
function factor(item){
	data_info.columns = $(item).eq(0).attr('name');
	$(item).eq(0).siblings().css('color','')
	$(item).eq(0).css('color','#b8fdfd');
	tykmbtlx(data_info)
}


//不同分数段的人数统计
function mainData(){
	$.ajax({
		type:"get",
		url: baseUrl + '/findAll',
		async:true,
		beforeSend: function(){
			
        },
        success:function(data){
        	for(var i=0;i<data.length;i++){
        		obj1.name.push(data[i].km);
        		obj1.wjg.push(data[i].fail);
        		obj1.jg.push(data[i].pass);
        		obj1.yx.push(data[i].excellent)
        	}
        	option2(obj1)
        },
        error:function(){
        }
	});
}

//不同科目平均分
function btkmpjf(){
	$.ajax({
		type:"get",
		url: baseUrl + '/divisionSub',
		async:true,
		beforeSend: function(){
        },
        success:function(data){
        	for(var i=0;i<data.length;i++){
        		obj2.name.push(data[i].km);
        		obj2.pjf.push(data[i].pjf)
        	}
        	option3(obj2)
        },
        error:function(){
        }
	});
}

//不同科目，总人数，及格人数，优秀人数
function rstj(data){
	$.ajax({
		type:"get",
		url: baseUrl + '/num_data',
		async:true,
		data:{
			tableName:data.tableName,
		},
		beforeSend: function(){
        },
        success:function(data){
        	for(var i=0;i<data.length;i++){
        		num.Total_num = data[i].zrs;
        		num.pass_num = data[i].jgrs;
        		num.excellent_num = data[i].yxrs
        	}
        	//数字滚动
			totalamount(num);
			passamount(num);
			excellentamount(num);
        },
        error:function(){
        }
	});
}

//同一科目，不同类型的平均分
function tykmbtlx(data){
	obj3 = {
		name:[],
		pjf:[]
	}
	$.ajax({
		type:"get",
		url: baseUrl + '/sameSub',
		async:true,
		data:{
			tableName:data.tableName,
			columns:data.columns
		},
		beforeSend: function(){
        },
        success:function(data){
        	for(var i=0;i<data.length;i++){
        		obj3.name.push(data[i].name);
        		obj3.pjf.push(data[i].pjf)
        	}
        	option1(obj3)
        },
        error:function(){
        }
	});
}



//不同题型得分
function bttxdf(data){
	obj4 = {
		tk:0,
		pd:0,
		dx:0,
		cxtk:0,
		cxsj:0,
		ctsj:0,
		bdsj:0,
		Word:0,
		Excel:0,
		PowerPoint:0
	};
	$.ajax({
		type:"get",
		url:baseUrl + '/txde_data',
		async:true,
		data:{
			tableNameTx:data.tableNameTx
		},
		beforeSend: function(){
       },
        success:function(data){
        	for(var i=0;i<data.length;i++){
        		var tr = '<tr>'
							+'<td>填空</td>'
							+'<td>'+data[i].tk+'</td>'
							+'<td>'+((data[i].tk)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>判断</td>'
							+'<td>'+data[i].pd+'</td>'
							+'<td>'+((data[i].pd)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>单选</td>'
							+'<td>'+data[i].dx+'</td>'
							+'<td>'+((data[i].dx)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>程序填空</td>'
							+'<td>'+data[i].cxtk+'</td>'
							+'<td>'+((data[i].cxtk)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>程序设计</td>'
							+'<td>'+data[i].cxsj+'</td>'
							+'<td>'+((data[i].cxsj)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>窗体设计</td>'
							+'<td>'+data[i].ctsj+'</td>'
							+'<td>'+((data[i].ctsj)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>表单设计</td>'
							+'<td>'+data[i].bdsj+'</td>'
							+'<td>'+((data[i].bdsj)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>Word</td>'
							+'<td>'+data[i].Word+'</td>'
							+'<td>'+((data[i].Word)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>Excel</td>'
							+'<td>'+data[i].Excel+'</td>'
							+'<td>'+((data[i].Excel)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>PowerPoint</td>'
							+'<td>'+data[i].PowerPoint+'</td>'
							+'<td>'+((data[i].PowerPoint)*100/(data[i].cj)).toFixed(2) +'%'+'</td>'
						+'</tr>';
						
				$('.type table tbody').append(tr);
				obj4.tk = data[i].tk;
				obj4.pd = data[i].pd;
				obj4.dx = data[i].dx;
				obj4.cxsj = data[i].cxsj;
				obj4.cxtk = data[i].cxtk;
				obj4.ctsj = data[i].ctsj;
				obj4.bdsj = data[i].bdsj;
				obj4.Word = data[i].Word;
				obj4.Excel = data[i].Excel;
				obj4.PowerPoint = data[i].PowerPoint;
        	}
        	option4(obj4)
        },
        error:function(){
        }
	});
}

//数字滚动
var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
function totalamount(item){
    $('#total_num').animateNumber(
        {
            number: item.Total_num,
            numberStep: comma_separator_number_step
        }
    );
};
function passamount(item){
    $('#pass_num').animateNumber(
        {
            number: item.pass_num,
            numberStep: comma_separator_number_step
        }
    );
}
function excellentamount(item){
    $('#excellent_num').animateNumber(
        {
            number:item.excellent_num,
            numberStep: comma_separator_number_step
        }
    );
}



//成绩的影响因素
function option1(obj){
	option = {
		backgroundColor:'rgba(23,83,93,0.5)',
		animationDuration:10000,
	    tooltip : {
	        trigger: 'axis'
	    },
	    grid: {
	        top:'18%',
	        left: '3%',
	        right: '6%',
	        bottom: '20%',
	        containLabel: true
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : obj.name,
	            axisLine: {
	            	lineStyle: {
		                color: "#b0f3f3",
		                size:10
		            }
		        },
		        axisLabel:{
		            color:'red',
		            rotate:'45',
		            interval:'0'
		        }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLine: {
	                lineStyle: {
	                    color: "#b0f3f3"
	                }
	            },
	            splitLine:{
	                show:true,
	                lineStyle:{
	                    color:'rgba(255,255,255,0.3)'
	                }
	            }
	        }
	    ],
	    series : [
	        {
	            name:'平均分',
	            type:'bar',
	            data:obj.pjf,
	            barWidth:10,
	            itemStyle:{ 
	            	normal:{
	            		label :{
	            			show: true,
	            			position: 'top'
	            		}
	            	}
	            }
	        }
	        
	    ]
	};
	var myChart_1 = echarts.init(document.getElementById('type_score'));
	myChart_1.setOption(option);
	    
}


//各分数段人数统计
function option2(obj){
	option = {
		backgroundColor:'rgba(23,83,93,0.5)',
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        top:'10%',
	        left: '3%',
	        right: '6%',
	        bottom: '10%',
	        containLabel: true,
	        backgroundColor:'rgba(23, 83, 93, 0.4)'
	    },
	    legend: {
	    	textStyle:{
	            color:'#fff'
	        },
	        data:['0~60分数段','60~80分数段','80~100分数段']
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : obj.name,
	           	axisLine: {
	            	lineStyle: {
		                color: "#b0f3f3",
		                size:10
		            }
		        },
		        axisLabel:{
		            color:'red',
		            rotate:'45',
		            interval:'0'
		        }
		       
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLine: {
	                lineStyle: {
	                    color: "#b0f3f3"
	                }
	            },
	            splitLine:{
	                show:true,
	                lineStyle:{
	                    color:'rgba(255,255,255,0.3)'
	                }
	            }
	        }
	    ],
	    series : [
	        
	        {
	            name:'0~60分数段',
	            type:'bar',
	            data:obj.wjg,
	            barWidth:15,
	            itemStyle:{
	                normal: {
	                    barBorderRadius:[10, 10, 0, 0],
	                    color:'#0dc884',
	                }
	           },
	        },
	        {
	        	name:'60~80分数段',
	        	type:'bar',
	        	data:obj.jg,
	        	barWidth:15,
	        	itemStyle:{
	                normal: {
	                    barBorderRadius:[10, 10, 0, 0],
	                    color:'#02fdda',
	                }
	           }
	        },
	        {
	        	name:'80~100分数段',
	        	type:'bar',
	        	data:obj.yx,
	        	barWidth:15,
	        	itemStyle:{
	                normal: {
	                    barBorderRadius:[10, 10, 0, 0],
	                    color:'#238c75'
	                }
	           }
	        },
	    ]
	};
	var myChart_2 = echarts.init(document.getElementById('score'));
	myChart_2.setOption(option);	
}


//不同科目平均分
function option3(obj){
	option = {
		backgroundColor:'rgba(23,83,93,0.5)',
		animationDuration:10000,
	    tooltip : {
	        trigger: 'axis'
	    },
	    grid: {
	        top:'18%',
	        left: '3%',
	        right: '6%',
	        bottom: '10%',
	        containLabel: true
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : obj.name,
	            axisLine: {
	            	lineStyle: {
		                color: "#b0f3f3",
		                size:10
		            }
		        },
		        axisLabel:{
		            color:'red',
		            rotate:'45',
		            interval:'0'
		        }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLine: {
	                lineStyle: {
	                    color: "#b0f3f3"
	                }
	            },
	            splitLine:{
	                show:true,
	                lineStyle:{
	                    color:'rgba(255,255,255,0.3)'
	                }
	            }
	        }
	    ],
	    series : [
	        {
	            name:'平均分',
	            type:'bar',
	            data:obj.pjf,
	            barWidth:15,
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            itemStyle:{
	                normal: {
	                    barBorderRadius:[10, 10, 0, 0],
	                    color:'#238c75',
	                },
	
	           }
	        }
	        
	    ]
	};
	var myChart_3 = echarts.init(document.getElementById('subject'));
	myChart_3.setOption(option);
}


//不同题型得分
function option4(obj){
	option= {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    grid: {
	        top:'4%',
	        left: '6%',
	        right: '6%',
	        bottom: '0%',
	        containLabel: true
	    },
//	    legend: {
//	        orient : 'horizontal',
//	//      x : 'right',
//			textStyle:{
//	            color:'#fff'
//	        },
//	        data:['填空','判断','单选','窗体设计','程序设计','程序填空','表单设计','Word','Excel','PowerPoint']
//	    },
	    
	    calculable : true,
	    series : [
	        {
	            name:'题型得分',
	            type:'pie',
	            radius : '75%',
	            center: ['50%', '60%'],
	            itemStyle : {
	                normal : {
	                    label : {
	                        show : true
	                    },
	                    labelLine : {
	                        show : true
	                    }
	                }
	            },
	            data:[
	                {
	                	value:obj.tk,
	                	name:'填空',
	                	itemStyle:{
			                normal: {
			                    color:color_5[0],
			                }
			           }
	               	},
	                {
	                	value:obj.pd,
	                	name:'判断',
	                	itemStyle:{
			                normal: {
			                    color:color_5[1],
			                }
			           }
	                },
	                {
	                	value:obj.dx, 
	                	name:'单选',
	                	itemStyle:{
			                normal: {
			                    color:color_5[2],
			                }
			           }
	                },
	                {
	                	value:obj.ctsj,
	                	name:'窗体设计',
	                	itemStyle:{
			                normal: {
			                    color:color_5[3],
			                }
			           }
	                },
	                {
	                	value:obj.cxsj,
	               		name:'程序设计',
	               		itemStyle:{
			                normal: {
			                    color:color_5[4],
			                }
			           }
	               	},
	                {
	                	value:obj.cxtk,
	                	name:'程序填空',
	                	itemStyle:{
			                normal: {
			                    color:color_5[5],
			                }
			           }
	                },
	                {
	                	value:obj.bdsj,
	               		name:'表单设计',
	               		itemStyle:{
			                normal: {
			                    color:color_5[6],
			                }
			           }
	               	},
	               	 {
	                	value:obj.Word,
	               		name:'Word',
	               		itemStyle:{
			                normal: {
			                    color:color_5[7],
			                }
			           }
	               	},
	                {
	                	value:obj.Excel,
	                	name:'Excel',
	                	itemStyle:{
			                normal: {
			                    color:color_5[8],
			                }
			           }
	                },
	                {
	                	value:obj.PowerPoint,
	               		name:'PowerPoint',
	               		itemStyle:{
			                normal: {
			                    color:color_5[9],
			                }
			           }
	               	}
	            ]
	        }
	    ]
	};
	
	var myChart_4 = echarts.init(document.getElementById('main'));
	myChart_4.setOption(option);

}


                    

