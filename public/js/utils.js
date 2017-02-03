var URL = require('url');
module.exports = {
	urlParam:function(){
		var currenthttpurl = window.location.href;
		return URL.parse(currenthttpurl,true).query;
	},
	urlParamFromInparam:function(currenthttpurl){
		return URL.parse(currenthttpurl,true).query;
	},
	isEmpty:function(data){
		if(data == null || data === '' || data == undefined){
			return true;
		}
	},
	isNotEmpty:function(data){
		return !this.isEmpty(data);
	},
	isBlank:function(data){
		var data = $.trim(data)
		if(data == null || data === '' || data == undefined){
			return true;
		}
	},
	isNotBlank:function(data){
		return !this.isBlank(data);
	},
	getHHmmssFromSeconds:function(_seconds){
		var str = "";
		var hours = Math.floor(_seconds / 3600);
		var minutes = 0;
		var seconds = 0;
		if(hours <= 0){
			minutes = Math.floor(_seconds / 60);
			if(minutes <= 0){
				str = _seconds + "秒";
			}else{
				str = minutes + "分";
				seconds = _seconds - minutes * 60;
				if(seconds > 0){
					str = str + seconds + "秒";
				}
			}
		}else{
			str = hours + "小时";
			minutes = Math.floor((_seconds - hours * 3600) / 60);
			if(minutes <= 0){
				seconds = _seconds - hours*3600;
				if(seconds > 0){
					str = str + "0分" + seconds + "秒";
				}
			}else{
				str = str + minutes + "分";
				seconds = _seconds - hours*3600 - minutes*60;
				str = str + seconds + "秒";
			}
		}
		return str;
	},
	isMobileDevice:function(){
		if(/iPad|Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
			return true;
		}else{
			return false;
		}
	},
	isIOS:function(){
		if(/iPad|iPhone|iPod/i.test(navigator.userAgent)){
			return true;
		}else{
			return false;
		}
	},
	openwin:function(url){
		window.location.href = url;
	},
	opennewwin:function(url){
		window.open(url);
	},
	blobToDataURL:function(blob, callback) {
		alert("filereader start");
        var a = new FileReader();
		alert("filereader created");
        a.onload = function (e) { 
			alert("filereader onload=="+e.target.result);
			callback(e.target.result); 
		}
		alert("filereader load before");
        a.readAsDataURL(blob);
    },
	dataURLtoBlob:function(dataurl) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {type:mime});
	},
	generateMixed:function(n) {
		var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		var res = "";
		for(var i = 0; i < n ; i ++) {
			var id = Math.ceil(Math.random()*(chars.length-1));
			res += chars[id];
		}
		return res;
	}
}