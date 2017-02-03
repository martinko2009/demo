module.exports = {
	echarts_bar:function(_cb, obj){
		require.ensure(["echarts/lib/echarts", "echarts/lib/chart/bar","echarts/lib/component/tooltip","echarts/lib/component/title"], function(require){
			var echarts = require("echarts/lib/echarts");
			require("echarts/lib/chart/bar");
			require("echarts/lib/component/tooltip");
			require("echarts/lib/component/title");
			_cb.call(obj||null, echarts);
		},'echarts_bar_chunk');
	},
	echarts_pie:function(_cb, obj){
		require.ensure(["echarts/lib/echarts", "echarts/lib/chart/pie"], function(require){
			var echarts = require("echarts/lib/echarts");
			require("echarts/lib/chart/pie");
			_cb.call(obj||null, echarts);
		},'echarts_pie_chunk');
	},
	echarts_radar:function(_cb, obj){
		require.ensure(["echarts/lib/echarts","echarts/lib/chart/radar"], function(require){
			var echarts = require("echarts/lib/echarts");
			require("echarts/lib/chart/radar");
			_cb.call(obj||null, echarts);
		},'echarts_radar_chunk');
	},
	echarts_line:function(_cb, obj){
		require.ensure(["echarts/lib/echarts", "echarts/lib/chart/line"], function(require){
			var echarts = require("echarts/lib/echarts");
			require("echarts/lib/chart/line");
			_cb.call(obj||null, echarts);
		},'echarts_line_chunk');
	}
}