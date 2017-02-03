var vm;
var init = function(){	

}

var afterrender = function(){
	vm = new Vue({
		el:"#vtextroot",
		data:{
			items:[1,2,3,4,5],
			changeindex:0,
			changevalue:'',
			changevaluestr:''
		},
		methods:{
			changeItemsFilter:changeItemsFilter,
			changevaluestrFilter:changevaluestrFilter,
			changeMethod:changeMethod
		},
		watch:{
			changevaluestr:function(val, oldVal){
				console.log("changevaluestr==="+val+"---oldVal==="+oldVal+"---");
			}	
		}
	});
}
var changeItemsFilter = function(str){
	return str+"a";
}

var changevaluestrFilter = function(str){
	return str+"www";
}

var changeMethod = function(){
	var index = parseInt(vm.changeindex,10);
	vm.$set(vm.items,index,vm.changevalue);
	vm.changevaluestr = vm.changevalue;
}

$(document).ready(function(){
	init();
	afterrender();
});