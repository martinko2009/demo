<template>
<div class="select2outerdiv">
  <input type="text" ref="inputobjajax" class="form-control input-sm popover-toggle"/>
</div>
</template>
<script>
require("./js/select2.min.js");
module.exports = {
    props: {
        allowclear:{   //是否清除输入框
	    require:false,
	    default:false
	},
	multiple:{     //是否多选
	    require:false,
	    default:false
	},
	readonly:{
	    require:false,
	    default:false
	},
	containercss:{
	    require:false,
	    default:function(){
		return {};
	    }
	},
	newmatcher:{
	    require:false
	},
	placeholder:{
	    require:false,
	    default:function(){
		return '请选择';
	    }
	},
	ajax:{
	    require:true
	},
	formatresult:{
	    require:false
	},
	formatselection:{
	    require:false
	},
	selectvalue:{
	    require:true
	}


    },

    data: function () {
        return {};
    },
    mounted : function() {
	var self = this;
	var optionList = {
		containerCss:self.containercss,
		readonly:self.readonly,
		multiple : self.multiple,//多选需设置参数
		placeholder: self.placeholder,
		allowClear : self.allowclear,//清除输入框
		ajax:self.ajax
	};
	if(self.formatresult != undefined){
		optionList.formatResult = self.formatresult;
	}
	if(self.formatselection != undefined){
		optionList.formatSelection = self.formatselection;
	}
	if(self.newmatcher != undefined){
		optionList.matcher = function(term,text,obj){
		    return self.$root[newMatcher](term,text,obj);
		};
	}
	$(this.$refs.inputobjajax).select2(optionList).on('change', function() {
	    self.$emit('select2changeajax',this.value);
	});
	if(self.selectvalue != null && self.selectvalue != undefined && self.selectvalue != ""){
		$(self.$refs.inputobjajax).val(self.selectvalue).trigger('change');
	}
    },
    beforeDestroy : function() {
	$(this.$refs.inputobjajax).off().select2('destroy');
    },
    watch:{
	"ajax":function(val, oldVal){
		var self = this;
		var optionList = {
			containerCss:self.containercss,
			readonly:self.readonly,
			multiple : self.multiple,//多选需设置参数
			placeholder: self.placeholder,
			allowClear : self.allowclear,//清除输入框
			ajax:self.ajax
		};
		if(self.formatresult != undefined){
			optionList.formatResult = self.formatresult;
		}
		if(self.formatselection != undefined){
			optionList.formatSelection = self.formatselection;
		}
		if(self.newmatcher != undefined){
			optionList.matcher = function(term,text,obj){
			    return self.$root[newMatcher](term,text,obj);
			};
		}
		$(this.$refs.inputobjajax).select2(optionList);
	},
	selectvalue:function(val, oldVal){
		var self = this;
		$(self.$refs.inputobjajax).val(self.selectvalue).trigger('change');
	}
    }
}
</script>

<style>
    .select2outerdiv{
	width:100%;
	height:auto;
	min-height:1px;
    }
    .form-control{
	width:100%;
	height:100%;
    }
    /*
    div.select2-container.select2-container-multi.form-control{
	width:100% !important;
	height:100% !important;
    }
    */
</style>