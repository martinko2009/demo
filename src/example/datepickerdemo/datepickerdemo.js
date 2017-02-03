//pc datepicker start
require("jquery-ui/ui/widgets/datepicker.js");
require("../../../public/js/jquery.cookie.min.js");
require("../../../public/js/jqalert.js");
var echartscomponent = require("../../../public/js/echartscomponent.js");
//var echarts = require('echarts/lib/echarts');
//require('echarts/lib/chart/radar');
//require('echarts/lib/component/tooltip');
//require('echarts/lib/component/title');

//pc datepicker end
var vm;
var paramResult;
var userCode = null;
var password = null;
var rippletimer = null;
//var isScrollGetData = false;
var init = function(){	
	$.cookie("name","ma");
}

var afterrender = function(){
	vm = new Vue({
		el:"#datepickerbody",
		data:{
			
		},
		methods:{
			alertdemo:alertdemo,
			hiddendatepick:hiddendatepick,
		},
	});
	initDateTimePicker();
	console.log($.cookie("name"));
	echartscomponent.echarts_radar(_consequenceRadar, null);
//	_consequenceRadar(echarts);
}

var hiddendatepick = function(){
	$("#datepickerbody").focus();
}

var initDateTimePicker = function(){
	$(".date1").datepicker({
		changeMonth: true,
	    changeYear: true,
	    dateFormat: 'yy-mm-dd',
	    showOn: "both",
	    buttonImage: "../../../../public/img/calendar.gif",
	    buttonImageOnly: true,
		onSelect:function(dateText, inst){
			
		}
	});
}
////////////////echarts///////////////////////////
/**
 * 风险雷达echar
 */
var  _radar = function(){
   
	return {
		color :['blue'],
		title : {
			text:""
		},
		backgroundColor : null,
		tooltip : {
			trigger: 'axis',
			formatter: function (params,ticket,callback) {
				var index = params[0].dataIndex;
				var showValue = params[0].data.show[index];
				var res = params[0].name;
				var name = params[0]["3"];
				res += '<br/>' + name + ' : ' + showValue;
				res = "<div style='font-size:12px;word-break:break-all;word-wrap:break-word;white-space:normal'>"+res+"</div>"
				return res;
			}
		},
		noDataLoadingOption: {
                       text: '暂无数据',
                       textStyle:{
							color:'#ffffff',
							fontSize:12,
							fontFamily : '微软雅黑'
					    },
                        effect: 'bubble',
                        effectOption: {
							 backgroundColor:'#242730',
                            effect: {
                                n: 0
                            }
                        }
                    },
		polar : [
		   {
			   indicator : [],
			   radius : 100,
			   splitNumber : 3,
			   splitArea : {
				   show : true,
				   areaStyle : {
					   color: ['red','yellow','green']
				   }
			   },
			   name:{
					textStyle:{
						color:"#ffffff"
					}
			   }
			}
		],
		calculable : false,
		series : [
			{
				type: 'radar',
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data : [
					{
						value : [],
						name : '风险雷达',
						id : [],
						show : []
					}
				]
			}
		]
	};
}
var _consequenceRadar = function(echarts){
	var option = null;
	var param='[{"propid":"unit","propname":"安监机构","propvalue":[],"propshow":"","propplugin":"com.sms.plugin.search.unitProp","config":null,"type":"static"},{"propid":"occurredDate","propname":"发生时间","propvalue":[{"id":"prevMonth()","name":"上月","type":"prevMonth"}],"propshow":"上月","propplugin":"com.sms.plugin.search.dateProp","config":null,"type":"static"},{"propid":"temSystem","propname":"TEM系统分类","propvalue":[],"propshow":"","propplugin":"com.sms.plugin.search.temSystemProp","config":null,"type":"static"},{"propid":"status","propname":"状态","propvalue":[{"id":3,"name":"结案","category":"COMPLETE"},{"id":1505,"name":"风险分析","category":"IN_PROGRESS"},{"id":1506,"name":"制定控制措施","category":"IN_PROGRESS"},{"id":1507,"name":"验证控制措施","category":"IN_PROGRESS"}],"propshow":"结案,风险分析,制定控制措施,验证控制措施","propplugin":"com.sms.plugin.search.statusProp","config":null,"type":"static"}]';
	$.ajax({
		url: "/sms/query.do",
		type:"post",
		dataType: "json",
		data: {
			tokenid:$.cookie("tokenid"),
			method:"getConsequenceRadar",
			"query":param
		}
	}).done(function (data) {
		
		if (data.success) {
			option = _radar();
			$.each(data.data,function(key, item){
				option.polar[0].indicator.push({
					text:item.name,
					max:item.max
				});
				option.series[0].data[0].value.push(item.value);
				option.series[0].data[0].id.push(item.id);
				option.series[0].data[0].show.push(item.showValue);
			});
			setOperate1(option, echarts);
		}
	});
};

var setOperate1 = function(option, echarts){
	var timer = null;
	var a = 0;
	var sendData = null;
	var c2 = function(){
		clearTimeout(timer);
		var id = sendData.data.id[sendData.special];
		var name = sendData.name;
		var date = "no";
		a = 0;
	};
	var myChart = echarts.init(document.getElementById('general1'));
	myChart.on("click", function(param) {
		sendData = param;
		a++;
		timer = setTimeout(c2, 600);
	});
	myChart.setOption(option);
};

var alertdemo = function(){
	$.u.alert.error("alert demo");
}

$(document).ready(function(){
	init();
	afterrender();
});