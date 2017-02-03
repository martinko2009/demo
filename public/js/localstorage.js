(function($) {
    $.localstorage = function() {
        
      var lcstor = window.localStorage;

      this.setStorage = function (key, value) {
            if (lcstor)
                lcstor[key] = value;
        };

        this.getStorage = function (key) {
            if (lcstor) {
                for (var i in lcstor) {
                    if (i == key)
                        return lcstor[i];
                }
            }
        };

        this.clearStorage = function(key) {
            if (lcstor) {
                if (key)
                    lcstor.removeItem(key);
                else
                    lcstor.clear();
            }
        };
        // 存储 json对象
        this.setJson4Storage = function(key, value) {
            var s = JSON.stringify(value);
            this.setStorage(key, s);
        };
        // 获取 json对象
        this.getJson4Storage = function(key) {
            var v = this.getStorage(key);
            if (typeof (v) == 'undefined') {
                return null;
            }
            return JSON.parse(v);
        };
 
        return this;
    };

    
    
})(jQuery);