<template>
<div class="select2outerdiv">
  <input type="text" ref="inputobj" class="form-control input-sm popover-toggle"/>
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
	options:{
	    require:true
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
	selectvalue:{
	    require:true
	}
    },

    data: function () {
        return {
    
	};
    },    
    mounted : function() {
	var self = this;
	var optionList = {
		containerCss:self.containercss,
		readonly:self.readonly,
		data : self.options,
		multiple : self.multiple,//多选需设置参数
		placeholder: self.placeholder,
		allowClear : self.allowclear,//清除输入框
		formatNoMatches:function(){
			return "未找到匹配的数据";
		},
		matcher:function(term,text,obj){
		    var newMatcher = self.newmatcher;
		    if(newMatcher!=undefined){
			return self.$root[newMatcher](term,text,obj);
		    }
		    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
		}
	};
	$(self.$refs.inputobj).select2(optionList).on('change', function() {
	    self.$emit('select2change',this.value);
	});
	if(self.selectvalue != null && self.selectvalue != undefined && self.selectvalue != ""){
		$(self.$refs.inputobj).val(self.selectvalue).trigger('change');
	}
    },
    beforeDestroy : function() {
	$(self.$refs.inputobj).off().select2('destroy');
    },
    watch: {
	options: function (val, oldVal) {
	    var self = this;
	    $(self.$refs.inputobj).select2({
		data : val,
		multiple : self.multiple,
		placeholder: "请选择",
		allowClear : self.allowclear,
		formatNoMatches:function(){
		   return "未找到匹配的数据";
		},
		matcher:function(term,text,obj){
		    var newMatcher = self.newmatcher;
		    if(newMatcher!=undefined){
			return self.newMatcher(term,text,obj);
		    }
		    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
		}
	    });
	},
	selectvalue:function(val, oldVal){
		var self = this;
		$(self.$refs.inputobj).val(self.selectvalue).trigger('change');
	}
    },
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