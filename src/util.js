//公共方法
export default{
    install(Vue,options)
    {
        Vue.prototype.isEmpty = function (str){
            return str==null || str=="" || str=="null" || str == "NULL" || typeof(str)=="undefined" || typeof(str) == "null";
        };

        Vue.prototype.Val={
            isIdCardNo:function(s){return this.test(s,/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)},
            isPhoneNum:function(s){return this.test(s,/^1[3456789]\d{9}$/)},
            isEngName:function(s){return this.test(s,/^[A-Za-z]{1,30}$/)},
            isPassWord:function(s){return this.test(s,/^[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/)},
            isEmail:function(s){return this.test(s,/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)},
            isChnEng:function(s){return this.test(s,/^[A-Za-z\u4e00-\u9fa5]/)},
            isChnName:function(s){return this.test(s,/^[\u4e00-\u9fa5]{1,10}$/)},
            isMoney:function(s){return this.test(s,/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)},
            isPlaneNum:function(s){return this.test(s,/^[A-Za-z0-9]+$/)},
            isName:function(s){return this.test(s,/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z\u4e00-\u9fa5\s]*[a-zA-Z\u4e00-\u9fa5]{1,30}$/)},
            isChar:function(s){return this.test(s,/^[a-zA-Z\u4e00-\u9fa5]{1,30}$/)},
            isCharNum:function(s){return this.test(s,/^[0-9\u4e00-\u9fa5]{4,16}$/)},
            isNumber:function(s){return this.test(s,/^[0-9]{4,16}$/)},
            isSpecialChar:function(s){return this.test(s,/[^!@#^*_=%&',;=?$\x22]+/)},
            isEmpty:function(s){return !jQuery.isEmptyObject(s)},test:function(s,p){s=s.nodeType==1?s.value:s;return new RegExp(p).test(s)}
        };

        Vue.prototype.datetime = function(str) {
            var str = new Date(str);
            str=str.getFullYear() + '-' + (str.getMonth() + 1) + '-' + str.getDate() + ' ' + str.getHours() + ':' + str.getMinutes() + ':' + str.getSeconds();
            return str;
        };

        //日期字符串转时间戳
        Vue.prototype.timestamp = function(stringTime) {
            var timestamp = Date.parse(new Date(stringTime));
            return timestamp;
        };

        //去掉字符串的空格
        Vue.prototype.SpaceTransformation = function(str) {
            return str.replace(/\s/gi,'');
        };

        //生成接口请求参数签名加密
        Vue.prototype.paramsStrSort = function(paramsStr) {
            var urlStr = paramsStrSort.split("&").sort().join("&");
            return md5(urlStr);
        };

        //判断移动终端是安卓还是iOS
        Vue.prototype.checkIOS = function() {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isiOS
        };

        //图片压缩
        Vue.prototype.compress = function(img,Orientation) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 4000000) > 1) {
                // console.log("大于400万像素")
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = width * height / 1000000) > 1) {
                // console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //            计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', 0.2);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        };
    }
}

