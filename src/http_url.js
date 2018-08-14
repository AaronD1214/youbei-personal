let localhostDev = false;

//如果是本地开发测试环境，就把localhostDev 设置成true，连接就是拼成‘http://测试接口IP’
//线上生产环境，就把localhostDev 设置成false，连接就是拼成‘http://线上接口IP’
let _host= localhostDev ? 'http://192.168.1.15:7777': 'http://ybuser.youxia.com';
let httpUrl = {
    'getCode': _host + '/Index/getCode',                                                                   //短信验证码
    'bindingPhone': _host + '/Index/bindingPhone',                                                         //绑定手机 
    'wxLogin': _host + '/Index/wxLogin',                                                                   //微信登录
    'cancelAuthorization': _host + '/Vip/cancelAuthorization',                                             //解除微信授权
    'codeLogin': _host + '/Index/codeLogin',                                                               //验证码登录
    'passwordLogin': _host + '/Index/passwordLogin',                                                       //账号密码登录
    'setPassword': _host + '/Index/setPassword',                                                           //设置账号密码
    'loginOut': _host + '/Index/loginOut',                                                                 //退出登录
    'homePage': _host + '/Index/homePage',                                                                 //首页信息
    'changePhone': _host + '/Index/changePhone',                                                           //修改绑定手机
    'fenqiInfo': _host + '/order/fenqiInfo',                                                               //首页分期账单信息
    'messageList': _host + '/order/messageList',                                                           //消息列表
    'updatemessage': _host + '/order/updatemessage',                                                       //修改消息状态
    'guideInfo': _host + '/order/guideInfo',                                                               //电子签名流程页(分期详情引导页接口)
    'creditInformation': _host + '/Vip/creditInformation',                                                 //信用资料列表
    'userInformation': _host + '/Vip/userInformation',                                                     //用户资料
    'idcardUploads': _host + '/Vip/idcardUploads',                                                         //身份证图片上传
    'checkDishonest': _host + '/Vip/checkDishonest',                                                       //匹配失信人员名单
    'manualIdcard': _host + '/Vip/manualIdcard',                                                           //手动实名验证
    'bankUploads': _host + '/Vip/bankUploads',                                                             //银行卡图片上传接口
    'bankInfo': _host + '/Vip/bankInfo',                                                                   //银行卡信息显示
    'checkBank': _host + '/Vip/checkBank',                                                                 //校验银行卡
    'informationCheck': _host + '/Vip/informationCheck',                                                   //信息检测接口
    'relevantData': _host + '/Vip/relevantData',                                                           //相关信息资料
    'orderList': _host + '/order/orderList',                                                               //账单列表
    'txorderList': _host + '/order/txorderList',                                                           //同行人签名账单列表
    'orderInfo': _host + '/order/orderInfo',                                                               //订单详情
    'cancelorder': _host + '/order/cancelorder',                                                           //取消订单
    'billList': _host + '/order/billList',                                                                 //还款订单列表
    'sementList': _host + '/order/sementList',                                                             //订单还款记录列表
    'signUpload': _host + '/order/upload',                                                                 //上传合同签名
    'setVideo': _host + '/order/setVideo',                                                                 //上传视频
    'updatedata': _host + '/order/updatedata',                                                             //修改订单状态
    'zhimaCredit': _host + '/Vip/zhimaCredit',                                                             //芝麻信用授权
    'getLipCode': _host + '/Vip/getLipCode',                                                               //获取唇语验证码
    'lipCodeCheck': _host + '/Vip/lipCodeCheck',                                                           //唇语活体检测视频身份信息核验
    'buildRequest': _host + '/Pengyuan/buildRequest',                                                      //获取鹏元征信请求链接
    'pengyuanPerview': _host + '/order/pengyuanPerview',                                                   //获取鹏元征信报告
    'previewContract': _host + '/order/previewContract',                                                   //合同预览
    'getMoneyLog': _host + '/Vip/getMoneyLog',                                                             //合同预览
    'getVideoToken': _host + '/Vip/getVideoToken',                                                         //获取七牛云token

};
export {httpUrl}
