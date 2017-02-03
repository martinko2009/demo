<template>
  <div class="pagebars_vue">
      <div v-if="showFirst" style="display:inline;">
          <a v-on:click="btnFirstClick(pagemsg.cur--)">上一页&nbsp;</a>
      </div>
      <div v-if="showStart" style="display:inline;">
          <a v-on:click="btnStartClick()">1...&nbsp;</a>
      </div>
      <div v-for="index in indexs" style="display:inline;">
          <a v-on:click="btnClick(index)" v-bind:class="{'onpagebars':pagemsg.cur == index}" >{{ index }}&nbsp;</a>
      </div>
      <div v-if="showEnd" style="display:inline;">
          <a v-on:click="btnEndClick()">...{{total}}&nbsp;</a>
      </div>
      <div v-if="showLast" style="display:inline;">
          <a v-on:click="btnLastClick(pagemsg.cur++)">下一页&nbsp;</a>
      </div>
      <div style="display:inline;">共{{total}}页&nbsp;</div>
      <div style="display:inline;">共{{pagemsg.all}}条数据</div>
      <div style="display:inline;">每页
  	      <select v-model="pagemsg.length">
  	          <option>5</option>
  	          <option>10</option>
  	          <option>30</option>
  	          <option>50</option>
  	      </select>条
  	  </div>
  </div>
</template>

<script>
module.exports = {
    props: {
        pagemsg: Object,  // 总条数all,当前页码cur,当前条数start,单页条数length,
        pagefun: Function,
    },

    data: function () {
        return {
            total: 1,
        };
    },

    computed: {
        indexs: function () {
            var left = 1;
            var right = this.total;
            var ar = [];
            if (this.total >= 8) {
                if (this.pagemsg.cur > 4 && this.pagemsg.cur < this.total - 3) {
                    left = this.pagemsg.cur - 2;
                    right = this.pagemsg.cur + 2;
                } else {
                    if (this.pagemsg.cur <= 4) {
                        left = 1;
                        right = 5;
                    } else {
                        right = this.total;
                        left = this.total - 4;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
        showLast: function () {
            if (this.pagemsg.cur != this.total && this.total > 1) {
                return true;
            }
            return false;
        },
        showFirst: function () {
            if (this.pagemsg.cur > 1) {
                return true;
            }
            return false;
        },
        showStart: function () {
            var length = this.pagemsg.length;
            this.total = this.pagemsg.all % length == 0 ? this.pagemsg.all / length : parseInt(this.pagemsg.all / length) + 1; //总条数计算出总页数
            if (this.pagemsg.cur > 4 && this.total >= 8) {
                return true;
            }
            return false;
        },
        showEnd: function () {
            if (this.pagemsg.cur <= this.total - 4 && this.total >= 8) {
                return true;
            }
            return false;
        },
    },

    methods: {
        btnClick: function (data) {// 页码点击事件
            if (data != this.pagemsg.cur) {
                this.pagemsg.cur = data;
                this.pagemsg.start = (this.pagemsg.cur - 1) * this.pagemsg.length;
                var fun = this.pagefun;
		this.$emit("pagebarsdatachange",this.pagemsg)
                fun();
            }
        },
        btnStartClick: function () {
            this.pagemsg.cur = 1;
            this.pagemsg.start = (this.pagemsg.cur - 1) * this.pagemsg.length;
            var fun = this.pagefun;
	    this.$emit("pagebarsdatachange",this.pagemsg)
            fun();
        },
        btnEndClick: function () {
            this.pagemsg.cur = this.total;
            this.pagemsg.start = (this.pagemsg.cur - 1) * this.pagemsg.length;
            var fun = this.pagefun;
	    this.$emit("pagebarsdatachange",this.pagemsg)
            fun();
        },
        btnFirstClick: function (cur) {//上一页
            this.pagemsg.start = (this.pagemsg.cur - 1) * this.pagemsg.length;
            var fun = this.pagefun;
	    this.$emit("pagebarsdatachange",this.pagemsg)
            fun();
        },
        btnLastClick: function (cur) {//下一页
            this.pagemsg.start = (this.pagemsg.cur - 1) * this.pagemsg.length;
            var fun = this.pagefun;
	    this.$emit("pagebarsdatachange",this.pagemsg)
            fun();
        },
    },

    watch: {
        'pagemsg.length': function (val, oldVal) {
            this.pagemsg.cur = 1;
            this.pagemsg.start = (this.pagemsg.cur - 1) * this.pagemsg.length;
            var fun = this.pagefun;
	    this.$emit("pagebarsdatachange",this.pagemsg)
            fun();
        },
    },
}
</script>

<style>
    a {
        color: #fff;
    }
    a:hover {
        color: #fff;
    }
    .pagebars_vue {
        cursor:pointer;
        float:right;
    }
    .onpagebars {
    	font-weight: bold;
    	color: #AAAAAA;
    }
</style>