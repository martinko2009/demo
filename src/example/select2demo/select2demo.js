require("../../../public/js/jqalert.js");
require("../../../public/js/jquery.cookie.min.js");
var select2 = require("../../../public/js/components/select2/select2.vue");
var select2ajax = require("../../../public/js/components/select2/select2ajax.vue");
var jcutils = require("jcutils");

var vm;
var init = function(){

}

var afterrender = function(){
	vm = new Vue({
		el:"#select2demo",
		data:{
			options1:[
				{id:0, text:'aaa'},
				{id:1, text:'bbb'}
			],
			options2:[
				{id:2, text:'ccc'},
				{id:3, text:'ddd'}
			],
			containerCss1:{'border-radius':'5px'},
			selectvalue1:'',
			selectvalue2:'',
			selectenable1:false,
			selectenable2:true,
			selectvalue3:'',
			allowclear:true,
			multiple:true,
			ajax:ajax(),
			formatresult:formatresult,
			formatselection:formatselection
			
		},
		methods:{
			selectonchange1:function(value){
				this.selectvalue1 = value;
			},
			selectonchange2:function(value){
				this.selectvalue2 = value;
			},
			selectonchange2ajax:function(value){
				this.selectvalue3 = value;
			}
		},
		components:{
			select2:select2,
			select2ajax:select2ajax
		}
	});
	Vue.nextTick(function(){
		initData();
	});
	
}

var initData = function(){
	
}

var ajax = function(){
	return {
		url: "/sms/query.do",
		type: "post",
		dataType: "json",
		data: function(term, page){
			return {
				 tokenid: $.cookie("tokenid"),
				 method: "stdcomponent.getbysearch",
				 dataobject:"auditReason"
			};
		},
		results:function(data,page){
			if(data.success){
				return {results:$.map(data.data.aaData,function(item,idx){
					return item;
				})};
			}
		}
	};
}

var formatresult = function(item){
	return  "<b>"+item.name+"</b> : <samp>"+(item.description||"")+"</samp>";      		
}

var formatselection = function(item){
	return item.name;
}

$(document).ready(function(){
	init();
	afterrender();
});