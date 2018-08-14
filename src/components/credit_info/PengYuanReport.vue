<template>
  <div>
      <popup-header left-text="鹏元信用报告"></popup-header>
        <div class="report_personal">
            <p>
                <span >查询日期：{{time}}</span>
            </p>
            <p style="font-size:16px;">
                <span>{{Name}}</span>
                <span style="margin-left: 20px;">{{Age}}岁</span>
            </p>
            <p>来自{{Place}}</p>
            <p>{{IdNo}}</p>
        </div>

      
        <p class="bh">
            <span class="b_NO">报告编号：{{reportNo}}</span>
        </p>

        <div class="details" v-for="(item,index) in summaryInfoList" >
            <icon class="Icon" type="success" ></icon>
            {{item.content}}
        </div>

        <div class="report_block">
            <p class="fx_title">行为风险评估</p>
            <div class="report_disc" v-show="show==true">
                行为风险等级：
                <span v-if="riskCheckInfo==0" style="color: green">低</span>
                <span v-else style="color: red">高</span>
            </div>
            <p class="remind">注：行为风险测评反映个人命中风险名单概率，是通过科学的数据模型计算得出，仅供参考。</p>
        </div>

        <div class="report_block">
            <p class="fx_title"> 风险信息扫描</p>
          
            <div class="report_disc">
                <p class="riskScanInfo">
                    手机运营商黑名单
                    <span v-show="mobileBlacklist==0" class="align_left">未命中</span>
                    <span v-show="mobileBlacklist==1" class="align_left">命中</span>
                    <span v-show="mobileBlacklist==2" class="align_left">疑似命中</span>
                </p>
                <p class="riskScanInfo">
                    手机号码状态异常
                    <span v-show="phoneStatus==0" class="align_left">未命中</span>
                    <span v-show="phoneStatus==1" class="align_left">命中</span>
                    <span v-show="phoneStatus==2" class="align_left">疑似命中</span>
                </p>
                <p class="riskScanInfo">
                    羊毛党名单
                    <span v-show="econnoisseur==0" class="align_left">未命中</span>
                    <span v-show="econnoisseur==1" class="align_left">命中</span>
                    <span v-show="econnoisseur==2" class="align_left">疑似命中</span>
                </p>

                <p class="riskScanInfo">
                    欺诈风险名单
                    <span v-show="cheatRisk==0" class="align_left">未命中</span>
                    <span v-show="cheatRisk==1" class="align_left">命中</span>
                    <span v-show="cheatRisk==2" class="align_left">疑似命中</span>
                </p>
                <p class="riskScanInfo">
                    逾期名单
                    <span v-show="creditOverdue==0" class="align_left">未命中</span>
                    <span v-show="creditOverdue==1" class="align_left">命中</span>
                    <span v-show="creditOverdue==2" class="align_left">疑似命中</span>
                </p>
                <p class="riskScanInfo">
                    个人风险信息
                    <span v-show="personRisk==0" class="align_left">未命中</span>
                    <span v-show="personRisk==1" class="align_left">命中</span>
                    <span v-show="personRisk==2" class="align_left">疑似命中</span>
                </p>
            </div>
            <p class="remind">注：以上信息基于个人金融行为分析得出，仅供参考。</p>
        </div>

        <div class="report_block">
                <p class="fx_title"> 信贷指数</p>
                <div class="report_disc">
                    <p>
                        <span>信贷需求评分：{{score}} </span> 
                    </p>
                    <p>
                        <span>信贷需求等级：{{grade}} </span>
                    </p>
                </div>
                
                <p class="remind">注：财富估值是根据科学的数据模型计算得出，仅供参考。</p>
        </div>

        <div class="report_block">
            <p class="fx_title">多平台借贷检测</p>
            <div class="report_disc" v-if="show1==true" >
               <p>信贷指数：{{multiScore}}</p>
               <p>查询检测:{{queryNum}}</p>
               <p>平均授信额度：{{avgLimit}} </p>
            </div>
            <div class="report_disc" v-else >
               没有检测到多平台借贷信息
            </div>
        </div>

        <div class="report_block">
            <p class="fx_title">风险信息</p>
            <div class="dangerInfo">
                 <p>司法案例</p>
                <div class="report_disc" v-if='show2==true' >
                    <p>标题:{{sftitle}}</p>
                    <p>当事人类型：{{clientType}}</p>
                    <p>案件类型：{{caseType}} </p>
                    <p>审结日期：{{decisionDate}} </p>
                </div>
                 <div class="report_disc" v-else>
                     没有查到司法案例信息
                </div>
            </div>

            <div class="dangerInfo">
                 <p>司法执行</p>
                <div class="report_disc" v-if='show3==true'>
                    <P>标题：{{zxtitle}} </P>
                    <p>执行标的：{{zxexecution}} </p>
                    <p>立案日期：{{zxfilingTime}} </p>
                </div>
                 <div class="report_disc" v-else>
                     没有查到司法之行信息
                </div>
            </div>

            <div class="dangerInfo">
                 <p>失信信息</p>
                <div class="report_disc" v-if='show4==true'>
                    <p>标题：{{sxtitle}} </p>
                    <p>立案时间：{{sxfilingTime}} </p>
                    <p>发布时间：{{sxpublishTime}} </p>
                </div>
                <div class="report_disc" v-else>
                    没有查到失信信息
                </div>
            </div>
           
           <div class="dangerInfo">
                 <p>税务执法</p>
                <div class="report_disc" v-if='show5==true'>
                    <p>标题：{{swtitle}} </p>
                    <p>公告时间：{{swpublishTime}} </p>
                </div>
                 <div class="report_disc" v-else>
                     没有查到税务执法信息
                </div>
            </div>

            <div class="dangerInfo">
                 <p>催欠公告</p>
                 <div class="report_disc" v-if='show6==true'>
                     <p>标题：{{cqtitle}} </p>
                    <p>发布时间：{{cqpublishTime}} </p>
                </div>
                <div class="report_disc" v-else>
                  没有查到催欠公告信息
                </div>
            </div>

            <div class="dangerInfo">
                 <p>网贷逾期</p>
                <div class="report_disc" v-if='show7==true'>
                    <p>标题：{{yqtitle}} </p>
                    <p>发布时间：{{yqpublishTime}} </p>
                </div>
                <div class="report_disc" v-else>
                    没有查到网贷逾期信息
                </div>
            </div>

        </div>

        <div class="report_block">
            <p class="fx_title">涉金融严重失信行为</p>
            <div class="report_disc" v-if='show8==true'>
                <p class="riskScanInfo">
                    案件编号:
                    <span class="align_left">{{caseNo}}</span>
                </p>
            <p class="riskScanInfo">
                类型、罪名：
                <span class="align_left">{{accusation}}</span>
            </p>
            <p class="riskScanInfo">
                执行法院名称：
                <span class="align_left">{{court}}</span>
            </p>
            </div>
            <div class="report_disc" v-else>
                没有查到涉金融严重失信行为。
            </div>
        </div>

        <div class="report_block">
            <p class="fx_title">职业身份</p>
            <div class="report_disc" v-if='show9==true'>
                <p class="riskScanInfo">
                    职业身份
                    <span class="align_left">{{jobName}}</span>
                </p>
            </div>
            <p class="remind">注：职业身份是通过大数据分析得出，仅供参考。</p>
        </div>

        <div class="report_block">
            <p class="fx_title">个人行为特征</p>
            <div class="report_disc" v-show="show10">
              <span v-for="(item,index) in bigDataTag"  style="color:green;margin-left:5px;"> {{item}} </span>
            </div>
            <p class="remind">注：个人行为特征是基于个人信息和网络行为分析得出，仅供参考。</p>
        </div>

        <div class="report_block">
            <p class="fx_title">工作单位</p>
            <div class="report_disc" v-show="show11">
                <div class="riskScanInfo" v-for="(item,index) in workUnitList" :key="index" style="margin: 10px 0;">
                    <p>
                        <span> {{item.corpName}}</span> 
                        <!-- <span class="align_left"> {{item.isCurrent}}</span> -->
                        <span class="align_left" v-show="item.isCurrent==1">当前工作单位</span> 
                    </p>
                    <p>
                        <span>职务：{{item.positionCaption}}</span> <span class="align_left">工作年限：{{item.workingLife}}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="report_block">
            <p class="fx_title">公积金</p>
            <div class="report_disc" v-show="show12">
                <p class="riskScanInfo">
                    <span>账号</span> <span class="align_left">{{accountNo}}</span> 
                </p>
                <p class="riskScanInfo">
                    <span>当前状态</span> <span class="align_left">{{gjstatus}}</span>
                </p>
                <p class="riskScanInfo">
                    <span>账户余额</span> <span class="align_left">{{totalAmont}}</span>
                </p>
            </div>
            <p class="remind">公积金状态共有四种，分别为：正常、封存、销户、未生效。</p>
        </div>

        <div class="report_block">
            <p class="fx_title">财富估值</p>
            <div class="report_disc" v-show="show13">
                <p class="riskScanInfo">
                    <span>当前财富估值</span> <span class="align_left">{{wealth}}{{cfunit}}</span>
                </p>
            </div>
            <p class="remind">注：财富估值是根据科学的数据模型计算得出，仅供参考</p>
        </div>
        <div class="report_block">
            <p class="fx_title">偿债评估</p>
            <div class="report_disc" v-show="show14">
                <p>
                    预计未来
                    <span style="color:red; margin:0 5px;">{{czFrom}}</span>年，您的偿债能力不低于
                    <span style="font-size:14px;color:red;">{{czMinAmount}}{{czUnit}}</span>
               </p>
            </div>
        </div>
        <div class="report_block">
            <p class="fx_title">对外投资</p>
            <div v-if='show15==true' class="report_disc" v-for="(item,index) in tzDataList">
                <p >{{item.corpName}}</p>
                <p class="riskScanInfo">
                    工商注册号
                    <span class="align_left" > {{item.registNo}}</span>
                </p>
                <p class="riskScanInfo">
                    企业类型
                    <span class="align_left">{{item.corpTypeDesc}}</span>
                </p>
                <p class="riskScanInfo" >
                    注册资本
                    <span class="align_left">{{item.registFund}}</span>
                </p>
                <p class="riskScanInfo">
                    认缴出资额
                    <span class="align_left">{{item.contributiveFund}}</span>
                </p>
                <p class="riskScanInfo">
                   出资比例
                    <span class="align_left">{{item.contributivePercent}}</span>
                </p>
            </div>
             <div class="report_disc" v-else>
                投资风格稳健，是不是都存银行了？
            </div>
        </div>


        <div class="report_block">
            <p class="fx_title">航空出行</p>
            <div class="report_disc" v-if="show16==true">
                <p class="riskScanInfo">
                    出行指数
                    <span class="align_left">{{hkScore}}</span>
                </p>
                <p class="riskScanInfo">
                    客户等级
                    <span class="align_left">{{hkLevel}}</span>
                </p>
                <p class="riskScanInfo">
                    出行频次
                    <span class="align_left">{{hkFrequencyDesc}}</span>
                </p>
                <p class="riskScanInfo">
                    平均票价
                    <span class="align_left">{{hkAvgPrice}}</span>
                </p>
            </div>
             <div class="report_disc" v-else>
               还没在国内航班上相遇哦，期待下一次邂逅。
            </div>
        </div>

        <div class="report_block">
            <p class="fx_title">专业能力分布</p>
            <div v-if="show17==true" class="report_disc">
               <span style="margin-left:5px;" v-for="(item,index) in jobDataList">{{item.description}}{{item.title}}</span>
            </div>
             <div class="report_disc" v-else>
               还需提高自己呢~
            </div>
        </div>

        <div class="report_block">
            <p class="fx_title">驾驶证</p>
            <div class="report_disc" v-if="show18==true">
               <p class="riskScanInfo">驾驶证状态
                   <span class="align_left">{{driversLicenseStatus}}</span>
               </p>

               <p class="riskScanInfo">准驾车型
                   <span class="align_left">{{quasiDrivingType}}</span>
               </p>
               
               <p class="riskScanInfo">
                   驾龄
                   <span class="align_left">{{issueDate}}</span>
               </p>
            </div>
             <div class="report_disc" v-else>
               还没有驾驶证呢。
            </div>
        </div>

        <div class="report_block">
            <p class="fx_title">手机行为分析</p>
            <div class="report_disc" v-if="show19==true">
                <p class="riskScanInfo">手机号码
                    <span class="align_left">{{phoneNO}}</span>
                </p>
                 <p class="riskScanInfo">使用状态
                    <span class="align_left">{{phMobileStatusDesc}}</span>
                </p>
                <p class="riskScanInfo">
                    运营商
                    <span class="align_left">{{phCarrierDesc}}</span>
                </p>
                <p class="riskScanInfo">
                    会员级别
                    <span class="align_left">{{phMemberLevel}}</span>
                </p>
                 <p class="riskScanInfo">
                    月均话费
                    <span class="align_left">{{phFeeLevel}}</span>
                </p>

                 <p class="riskScanInfo">
                    终端品牌
                    <span class="align_left">{{phTerminalBrand}}</span>
                </p>
                <p class="riskScanInfo">
                    终端上市价
                    <span class="align_left">{{phTerminalPrice}}</span>
                </p>
            </div>
        </div>


        <div class="footer_tips">
            <p >报告使用说明</p>
            <p>1.本报告著作权属于天下信用，未经书面许可，不得复制、摘录、转载、和发表</p>
            <p>2.本报告是天下信用大数据分析引擎基于大数据挖掘的成果，仅供参考。</p>
            <p>3.本报告仅供参考，据此作出的决策均基于您独立的判断，如产生不利后果，天下信用不承担任何责任。</p>
        </div>

        <p class="tips">鹏元征信有限公司 &nbsp;&nbsp;&nbsp;&nbsp;版权所有</p>
        <div style="height: 100px;"></div>
        <div class="gohome">
            <x-button type="primary" @click.native="gohome">返回首页</x-button>
        </div>

  </div>
</template>

<script>
    import { XHeader, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider,Icon  } from 'vux'
    import {httpUrl} from '../../http_url';

export default {
    directives: {
        TransferDom
    },
    
  data () {
    return {
       
        Name:'',
        Age:'',
        IdNo:'',
        BirthDate:'',
        time:'',
        Mobile:'',
        Place:'',
        reportNo:'',
        //个人综述
        summaryInfoList:[],
        riskCheckInfo:'',

        //风险信息扫描
        cheatRisk:'',
        creditOverdue:'',
        econnoisseur:'',
        mobileBlacklist:'',
        personRisk:'',
        phoneStatus:'',

        //行为风险测评
        riskCheckInfo:'',
         show:false,

        //信贷指数
        grade:'',
        score:'',

        //多平台借贷检测
        multiScore:'',
        queryNum:'',
        avgLimit:'',
        show1:false,

        //司法信息
        sftitle:'',
        clientType:'',
        caseType:'',
        decisionDate:'',
        show2:false,

        //执行信息概要
        zxtitle:'',
        zxexecution:'',
        zxfilingTime:'',
        show3:false,
        //失信信息概要
        sxtitle:'',
        sxfilingTime:'',
        sxpublishTime:'',
        show4:false,

        //税务信息概要
        swtitle:'',
        swpublishTime:'',
        show5:false,

        //催欠公告概要
        cqtitle:'',
        cqpublishTime:'',
        show6:false,
        //逾期信息概要
        yqtitle:'',
        yqpublishTime:'',
        show7:false,

        //金融失信
        caseNo:'',
        accusation:'',
        court:'',
        show8:false,

        //职业身份
        jobName:'',
        show9:false,

        //个人行为特征（数组）
        bigDataTag:[],
        show10:false,
        //工作单位
        workUnitList:[{}],
        corpName:'',
        isCurrent:'',
        positionCaption:'',
        workingLife:'',
        show11:false,

        //社保信息
        // socialSecurityNO:'',
        // insStatus:'',
        // company:'',
        // endowmentBalance:'',
        // medicareBalance:'',
        // claimedSalary:'',
        // unit:'',
        // lastMonth:'',
        // show13:false,

        //公积金
        gjstatus:'',
        accountNo:'',
        totalAmont:'',
        show12:false,

        //财富估值
        wealth:'',
        cfunit:'',
        show13:false,

        //偿债能力：
        amount:'',
        czUnit:'',
        czMinAmount:'',
        czFrom:'',
        show14:false,

        //房产信息
        fcStatus:'',
        fcRate:'',
        totalAmount:'',
        fcUnit:'',

        //对外投资
        tzDataList:[{}],
        show15:false,

        //航空信息
        hkScore:'',
        hkLevel:'',
        hkFrequencyDesc:'',
        hkMilesDesc:'',
        hkAvgPrice:'',
        show16:false,

        //职业能力或个人发展历程
        jobDataList:[{}],
        // jobTitle:'',
        // jobDescription:'',
        show17:false,

        //手机行为分析
        phoneNO:'',
        phCarrierDesc:'',
        phMobileStatus:'',
        phMobileStatusDesc:'',
        phTimeLength:'',
        phTimeLengthDesc:'',
        phCheckResult:'',
        phMemberLevel:'',
        phFeeLevel:'',
        phTerminalBrand:'',
        phTerminalPrice:'',
        show19:false,

        //驾驶证
        driversLicenseStatus:'',
        infoDate:'',
        quasiDrivingType:'',
        issueDate:'',
        show18:false,

    }
  },
    created(){
        // this.infoCheck();
        this.getReport();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        Alert,
        Toast,
        Divider,
        Icon
    },
    methods:{
        infoCheck(){
            const _this = this;
             this.$axios({
                 method: 'post',
                 url:httpUrl.informationCheck,
             }).then((res)=>{
                 console.log(res.data)
                 let data = res.data.retData;
                 if(res.data.errCode==200){
                     let personType = data.person;
                     let bankType = data.bank;
                     if(personType == 1){
                         this.$vux.alert.show({
                             title: '错误提示',
                             content: '已实名认证',
                             onHide () {
                                 _this.$router.push('/credit_info_list');
                             }
                         })
                         return
                     }
                 }else if(res.data.errCode==201){
                     this.$vux.toast.show({
                         type:'warn',
                         text: res.data.retMsg
                     })
                 }else if(res.data.errCode==401){
                     this.$vux.alert.show({
                         title: '错误提示',
                         content: '未登录，请先登录',
                         onHide () {
                             _this.$router.push('/quick_login');
                         }
                     })
                 }
             }).catch(function () {
                 this.$vux.toast.show({
                     text: '网络异常，请稍后再试',
                     type:'warn'
                 })
             });
        },
        getReport(){
            const _this = this;
            this.$axios({
                method:'post',
                url:httpUrl.pengyuanPerview,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    //个人身份信息
                    let personIdcInfo= res.data.retData.personIdcInfo.data
                    this.Name = personIdcInfo.name;
                    this.Age = personIdcInfo.age;
                    this.IdNo = personIdcInfo.idcNo;
                    this.BirthDate = personIdcInfo.birthDate;
                    this.Mobile = personIdcInfo.mobile;
                    this.Place = personIdcInfo.placeOfIssue;
                    this.reportNo = res.data.retData.reportNo;
                    this.time = res.data.retData.pengyuan_time;
                    //个人综述
                    let summaryInfo = res.data.retData.summaryInfo.data
                    if(res.data.retData.summaryInfo.code==0){
                        this.summaryInfoList = summaryInfo;
                    }
                    console.log(typeof(res.data.retData.riskCheckInfo));
                    //行为风险测评
                    if(typeof(res.data.retData.riskCheckInfo)!='undefined'){
                        this.show = true;
                         if(res.data.retData.riskCheckInfo.code =0){
                            this.riskCheckInfo = res.data.retData.riskCheckInfo.data.riskLevel;
                        }
                    }
                   
                    
                    

                     //风险信息扫描
                    //  console.log(res.data.retData.riskScanInfo.data)
                     if( typeof(res.data.retData.riskScanInfo)  != 'undefined'){
                         let riskScanInfoData = res.data.retData.riskScanInfo.data;
                        if(res.data.retData.riskScanInfo.code==0){
                            this.cheatRisk = riskScanInfoData.cheatRisk;
                            this.creditOverdue = riskScanInfoData.creditOverdue;
                            this.econnoisseur = riskScanInfoData.econnoisseur;
                            this.mobileBlacklist = riskScanInfoData.mobileBlacklist;
                            this.personRisk = riskScanInfoData.personRisk;
                            this.phoneStatus = riskScanInfoData.phoneStatus;
                        }
                     }
                     
                     //信贷指数
                      if( typeof(res.data.retData.creditIndexInfo)  != 'undefined'){
                          let creditIndexInfoData= res.data.retData.creditIndexInfo.data;
                        if(res.data.retData.creditIndexInfo.code==0){
                            this.grade = creditIndexInfoData.grade;
                            this.score = creditIndexInfoData.score;
                        }
                      }
                     

                     //多平台借贷检测
                     if( typeof(res.data.retData.multiLoanCheckInfo)  != 'undefined'){
                        let multiLoanCheckInfo = res.data.retData.multiLoanCheckInfo;
                        // console.log(multiLoanCheckInfo.code)undefind
                        if(multiLoanCheckInfo.code ==0){
                            this.show1 = true;
                            this.multiScore = multiLoanCheckInfo.data.score;
                            this.queryNum = multiLoanCheckInfo.data.queryNum;
                            this.avgLimit = multiLoanCheckInfo.data.avgLimit;
                        }
                     }
                     

                     //司法案例
                     if(typeof(res.data.retData.riskCaseInfo)  != 'undefined'){
                         let riskCaseInfo =  res.data.retData.riskCaseInfo;
                        if(riskCaseInfo.code==0){
                            this.show2 = true;
                            this.sftitle = riskCaseInfo.data.title;
                            this.clientType = riskCaseInfo.data.clientType;
                            this.caseType = riskCaseInfo.data.caseType;
                            this.decisionDate = riskCaseInfo.data.decisionDate;
                        }
                     }
                    

                    //执行概要
                    if(typeof(res.data.retData.riskJusticeInfo)  != 'undefined'){
                        let riskJusticeInfo =  res.data.retData.riskJusticeInfo;
                        if(riskJusticeInfo.code==0){
                            this.show3 = true;
                            this.zxtitle = riskJusticeInfo.data.title;
                            this.zxexecution = riskJusticeInfo.data.execution;
                            this.zxfilingTime = riskJusticeInfo.data.filingTime
                        }
                    }
                    

                    //失信信息
                    if(typeof(res.data.retData.riskPromiseInfo)  != 'undefined'){
                         let riskPromiseInfo = res.data.retData.riskPromiseInfo;
                        if(riskPromiseInfo.code==0){
                            this.show4 = true;
                            this.sxtitle = riskPromiseInfo.data.title;
                            this.sxfilingTime = riskPromiseInfo.data.filingTime;
                            this.sxpublishTime = riskPromiseInfo.data.publishTime;
                        }
                    }
                   

                    //税务信息
                    if(typeof(res.data.retData.riskTaxInfo) != 'undefined'){
                         let riskTaxInfo = res.data.retData.riskTaxInfo;
                        if(riskTaxInfo.code==0){
                            this.show5 = true;
                            this.swtitle = riskTaxInfo.data.title;
                            this.swpublishTime = riskTaxInfo.data.publishTime;
                        }
                    }
                    

                    //催欠公告
                     if(typeof(res.data.retData.riskDebtInfo) != 'undefined'){
                         let riskDebtInfo = res.data.retData.riskDebtInfo;
                        if(riskDebtInfo.code==0){
                            this.show6 = true;
                            this.cqtitle = riskDebtInfo.data.title;
                            this.cqpublishTime = riskDebtInfo.data.publishTime;
                        }
                     }
                     

                    //逾期信息
                    if(typeof(res.data.retData.riskOverdueInfo) != 'undefined'){
                        let riskOverdueInfo = res.data.retData.riskOverdueInfo;
                        if(riskOverdueInfo.code==0){
                            this.show7 = true;
                            this.yqtitle = riskOverdueInfo.data.title;
                            this.yqpublishTime = riskOverdueInfo.data.publishTime;
                        }
                    }
                     

                    //金融失信
                    if(typeof(res.data.retData.financeBreakFailthInfo) != 'undefined'){
                        let financeBreakFailthInfo = res.data.retData.financeBreakFailthInfo;
                        if(financeBreakFailthInfo.code==0){
                            this.show8 = true;
                            this.caseNo = financeBreakFailthInfo.data.caseNo;
                            this.accusation = financeBreakFailthInfo.data.accusation;
                            this.court = financeBreakFailthInfo.data.court;
                        }
                    }
                    
                    
                    //职业身份
                    if(typeof(res.data.retData.workingIndentityInfo) != 'undefined'){
                        let workingIndentityInfo = res.data.retData.workingIndentityInfo;
                        if(workingIndentityInfo.code==0){
                            this.show9 = true;
                            this.jobName = workingIndentityInfo.data.name;
                        }
                    }
                    

                    //个人行为特征
                    if(typeof(res.data.retData.bigDataTagInfo) != 'undefined'){
                        let bigDataList= res.data.retData.bigDataTagInfo;
                        if(bigDataList.code==0){
                                this.show10 = true;
                            this.bigDataTag = bigDataList.data.bigDataTag;
                        }
                    }
                   

                   //工作单位
                   if(typeof(res.data.retData.workUnitInfo) != 'undefined'){
                        let workUnitInfo = res.data.retData.workUnitInfo;
                        //    console.log(workUnitInfo.data.corpName);
                        if(workUnitInfo.code==0){
                                this.show11 = true;
                            this.workUnitList = workUnitInfo.data;
                        }
                   }
                  

                   //公积金
                   if(typeof(res.data.retData.fundInfo) != 'undefined'){
                       let fundInfo = res.data.retData.fundInfo;
                        if(fundInfo.code==0){
                            this.show12 = true;
                            this.accountNo = fundInfo.data.accountNo;
                            this.gjstatus = fundInfo.data.status;
                            this.totalAmont = fundInfo.data.totalAmont;
                        }
                   }
                   

                   //财富估值
                   if(typeof(res.data.retData.wealthInfo) != 'undefined'){
                       let wealthInfo = res.data.retData.wealthInfo;
                        if(wealthInfo.code==0){
                        this.show13 = true;
                            this.wealth = wealthInfo.data.wealth
                            this.cfunit = wealthInfo.data.unit;
                        }
                   }
                    

                    //偿债能力
                    if(typeof(res.data.retData.incomeInfo) != 'undefined'){
                         let incomeInfo = res.data.retData.incomeInfo;
                        if(incomeInfo.code==0){
                            this.show14 = true;
                            this.czFrom = incomeInfo.data.from;
                            this.czMinAmount = incomeInfo.data.minAmount;
                            this.czUnit = incomeInfo.data.unit;
                        }
                    }
                   

                    //对外投资
                    if(typeof(res.data.retData.shareholderInfo) != 'undefined'){
                        let shareholderInfo = res.data.retData.shareholderInfo;
                         console.log(shareholderInfo)
                        if(shareholderInfo.code==0){
                            console.log(222)
                            this.show15 = true;
                            this.tzDataList = shareholderInfo.data
                        }//else{
                            // this.show15 = false;
                        // }
                    }
                    

                    //航空出行
                    if(typeof(res.data.retData.airtktInfo) != 'undefined'){
                         let airtktInfo = res.data.retData.airtktInfo;
                        if(airtktInfo.code==0){
                        this.show16 = true;
                            this.hkScore = airtktInfo.data.score;
                            this.hkLevel = airtktInfo.data.level;
                            this.hkFrequencyDesc = airtktInfo.data.frequencyDesc;
                            this.hkAvgPrice = airtktInfo.data.avgPrice;
                        }
                    }
                   

                    //职业能力分布
                    if(typeof(res.data.retData.professionInfo) != 'undefined'){
                        let professionInfo = res.data.retData.professionInfo;
                        if(professionInfo.code==0){
                            this.show17 = true;
                            this.jobDataList = professionInfo.data;
                        }
                    }
                    

                    //驾驶证
                    if(typeof(res.data.retData.driversLicenseInfo) != 'undefined'){
                        let driversLicenseInfo = res.data.retData.driversLicenseInfo;
                        console.log(driversLicenseInfo.code==0)
                        if(driversLicenseInfo.code==0){
                            this.show18 = true;
                            this.driversLicenseStatus =driversLicenseInfo.data.driversLicenseStatusDesc;
                            this.infoDate = driversLicenseInfo.data.infoDate;
                            this.quasiDrivingType= driversLicenseInfo.data.quasiDrivingType;
                            this.issueDate = driversLicenseInfo.data.issueDate;
                        }
                    }
                    

                    //手机行为分析
                    if(typeof(res.data.retData.contactInfo) != 'undefined'){
                         let contactInfo =  res.data.retData.contactInfo;
                        if(contactInfo.code==0){
                            this.show19 = true;
                            this.phoneNO = contactInfo.data.mobile;
                            this.phCarrierDesc = contactInfo.data.carrierDesc;
                            this.phMemberLevel = contactInfo.data.memberLevel;
                            this.phMobileStatusDesc = contactInfo.data.mobileStatusDesc;
                            this.phFeeLevel = contactInfo.data.feeLevel;
                            this.phTerminalBrand = contactInfo.data.terminalBrand;
                            this.phTerminalPrice = contactInfo.data.terminalPrice;
                        }
                    }
                }else if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg,
                        onHide () {
                            _this.$router.push('/credit_info_list');
                        }
                    })
                }else if(res.data.errCode==401){
                    this.$vux.alert.show({
                        title: '错误提示',
                        content: '未登录，请先登录',
                        onHide () {
                            _this.$router.push('/quick_login');
                        }
                    })
                }
            })
        },
        gohome(){
             this.$router.push('/home');
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .report_personal{
            background: #325fa5;
            color: #fff;
            padding:5px 15px;
            font-size: 12px;
        }
        .report_personal p{
            line-height: 25px;
        }
        .bh {
            font-size: 12px;
            background:	#cccccc7a;
            margin: 0;
            padding: 10px;
        }
        .b_NO{
            font-size: 10px;
        }
        .details{
            padding: 10px;
            font-size: 10px;
            /* line-height:15px; */
        }
        
      .fx_title {
         padding: 5px;
         border-bottom: 0.5px solid hsla(0, 0%, 80%, 0.45);
         color: #325fa5;
         font-size: 13px;
      }
    .report_disc {
        font-size: 12px;
        margin: 10px 2px;
    }
    .report_block{
        margin-bottom: 10px;
        margin-top: 20px;
        padding: 0 10px;
    }
    .footer_tips{
        font-size: 12px;
        line-height: 26px;
        padding: 0 10px;
    }
    .tips{
        margin-top: 10px;
        text-align: center;
        font-size: 12px;
        /*margin-bottom: 100px;*/
    }
    .riskScanInfo{
        position: relative;
        font-size: 12px;
    }
    .align_left{
        position: absolute;
        right: 8px;
    }
    .dangerInfo{
        font-size: 13px;
        margin-left: 10px;

    }
    .gohome{
        height: 40px;
        width: 100%;
        background: #325fa5;
        margin: 0 auto;
        text-align: center;
        line-height: 40px;
        position: fixed;
        bottom: 0px;
    }
    .gohome a {
        color: #fff;
        text-decoration: none;
        display: block;
    }
    .remind{
        color: #515151;
        font-size: 10px;
        padding: 6px 10px;
    }
</style>
