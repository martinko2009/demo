require("../../../public/js/jqalert.js");
require("../../../public/js/jquery.cookie.min.js");
//vuedatetimepicker start
require("moment/moment.js");
require("bootstrap/dist/js/bootstrap.min.js");
var vuedatetimepicker = require("../../../public/js/vuedatetimepicker/js/vue-datetime-picker.js");
//vuedatetimepicker end
var jcutils = require("jcutils");

var vm;
var init = function(){

}

var afterrender = function(){
	vm = new Vue({
		el:"#vuedatetimepickerdemo",
		data:{
			vuedatetimeoptions:{
				language:'zh-CN',
       			type:'time',
       			timeFormat:'YYYY-MM-DD HH:mm:00',
				timeFormatEnd:'YYYY-MM-DD HH:mm:59'
			},
			changedatetimevalue1:''
		},
		methods:{
			changedatetime1:function(value){
				this.changedatetimevalue1 = value;
			}
		},
		components:{
			vuedatetimepicker:vuedatetimepicker,
		}
	});
	Vue.nextTick(function(){
		initData();
	});
	
}

var initData = function(){
	
}

$(document).ready(function(){
	init();
	afterrender();
});