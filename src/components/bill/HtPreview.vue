<template>
  <div>
      <!--<popup-header left-text="合同预览"></popup-header>-->
      <div style="margin:0 10px 80px 10px;">
          <p style="text-align: center;margin: 15px 0;font-size: 16px;font-weight: bold;">委托服务合同</p>
          <p style="text-align: right;font-size: 12px;">编号：{{yx_ht_id}}</p>
          <p style="font-size: 14px;margin-top: 10px;"><b>甲方（委托人）：</b><u>{{idcard_name}}</u>（详见附件1）</p>
          <p style="font-size: 14px;margin-left: 10px;">身份证号：{{idcard_num}}</p>
          <p style="font-size: 14px;margin-left: 10px;">电子邮箱：{{email}}</p>
          <p style="font-size: 14px;margin-left: 10px;">通讯地址：{{mailing_address}}</p>
          <p style="font-size: 14px;margin-left: 10px;">联系电话：{{phone}}</p>
          <p style="font-size: 14px;margin-top: 10px;"><b>乙方（受托旅行社）：</b>{{company_name}}</p>
          <p style="font-size: 14px;margin-left: 10px;">经营许可证编号：{{licence_number}}</p>
          <p style="font-size: 14px;margin-left: 10px;">经营地址：{{address}}</p>
          <p style="font-size: 14px;margin-left: 10px;">联系电话：{{supervise_tel}}</p>
          <p style="font-size: 14px;margin-top: 10px;"><b>丙方：</b>深圳前海游侠金融服务有限公司</p>
          <p style="font-size: 14px;margin-left: 10px;">经营地址：深圳市前海深港合作区前湾一路1号</p>
          <p style="font-size: 14px;margin-left: 10px;">联系电话：0755-22211333</p>
          <p style="font-size: 14px;margin-top: 15px;">根据《中华人民共和国合同法》等有关法律、法规及规章之规定，甲方与乙方在平等、自愿、协商一致的基础上，就
              下列委托事项达成如下协议：
          </p>
          <h5 style="margin-top: 15px;">一、委托范围</h5>
          <p style="font-size: 14px;">甲方委托乙方办理下述一项或几项服务，乙方按照甲方选择的组合内容代为办理。委托事项包含：代订机票、代订酒
              店、代办签证、代租交通工具、代订门票等代订、代办服务。
          </p>
          <h5 style="margin-top: 15px;">二、委托人信息</h5>
          <p style="font-size: 14px;">委托人人数合计为 <u>{{people}}</u> 人。（详见附件1）
          </p>
          <h5 style="margin-top: 15px;">三、委托事项</h5>
          <p style="font-size: 14px;">1、机票（详见附件1）</p>
          <p style="font-size: 14px;">2、酒店（详见附件1）</p>
          <p style="font-size: 14px;">3、其他委托事项（详见附件1）</p>
          <h5 style="margin-top: 15px;">四、委托费用与支付方式</h5>
          <p style="font-size: 14px;">1、委托费用：</p>
          <p style="font-size: 14px;">以上预定机票费用共计人民币{{flight_price}}元，大写：{{big_flight_price}};</p>
          <p style="font-size: 14px;">以上预定酒店费用共计人民币{{hotel_price}}元，大写：{{big_hotel_price}};</p>
          <p style="font-size: 14px;">其他委托事项费用共计人民币{{other_price}}元，大写：{{big_other_price}};</p>
          <p style="font-size: 14px;">费用总计人民币{{totalprice}}元，大写：{{big_totalprice}}</p>
          <p style="font-size: 14px;margin-top: 15px;">
              2、支付方式：分期付款。甲方选择乙方提供的分期付款方式，通过乙方指定的渠道（即丙方的APP平台）实现分期
              付款，具体内容如下：
          </p>
          <p style="font-size: 14px;">（1）委托费用总金额为人民币{{totalprice}}元，甲方申请分{{stage}}期偿还，分期手续费人民币{{fenqi_price}}元。</p>
          <p style="font-size: 14px;">（2）首付款金额为人民币{{paymoney}}元（包括第一期金额人民币{{per_price}}元,分期手续费人民币{{fenqi_price}}
              元），之后每期的还款金额为{{per_price}}元，每期的还款日为每月8日，至{{year}}年{{month}}月08日最后一期止。</p>
          <p style="font-size: 14px;">（3）甲方授权丙方用自动扣款的方式进行还款，即甲方同意丙方通过委托银行扣款的方式，在每个应还款日（遇节
              假日提前）自甲方指定的银行账户中扣收应还款金额及相应费用（如有）。甲方应在每个还款日或之前，将应还款金
              额及相应费用（如有）足额存入如下银行账户中。
          </p>
          <p style="font-size: 14px;">甲方指定的每月扣款银行账户信息如下：</p>
          <p style="font-size: 14px;margin-left: 10px;">户名：{{idcard_name}}</p>
          <p style="font-size: 14px;margin-left: 10px;">帐号：{{bank_1_number}}</p>
          <p style="font-size: 14px;margin-left: 10px;">开户行：{{bank_1_name}}</p>
          <h5 style="margin-top: 15px;">五、逾期提醒</h5>
          <p style="font-size: 14px;">
              1、如甲方未按照本合同约定及时偿还款项即视为违约，应每日按合同余款千分之一的标准承担迟延履行违约金；如甲方连续2次逾期或1次逾期超过7天不还款，乙方有权要求甲方一次性结清剩余全部款项（包括迟延履行违约金，偿还本金等）；如甲方逾期超过1个月，即构成严重违约，乙方有权单方解除合同。
          </p>
          <p style="font-size: 14px;">
              2、如甲方逾期偿还款项，乙方有权采取包括但不限于下述措施： 1）采取短信、致电甲方亲友劝说还款；委托代理
              机构催收；向法院提起诉讼等方式催收；2）要求甲方承担乙方为实现债权而实际发生的费用（包括但不限于诉讼/仲
              裁费用、保全费，律师费、调查取证费、差旅费及其他合理费用）。
          </p>
          <p style="font-size: 14px;">
              3、乙方有权按照我国法律法规之规定或征信机构的要求，将有关本合同的信息及甲方的其他基本信息，录入中国人
              民银行个人信用信息基础数据库以及其他经政府有权部门批准合法设立的信息库，供有适当资格的单位/个人查询和
              使用；当甲方发生本合同下的违约时，乙方有权根据违约情况酌情决定公开甲方的违约信息，并为催收甲方欠款之目
              的将有关信息提供给催收机构。
          </p>
          <h5 style="margin-top: 15px;">六、债权转让通知</h5>
          <h5>
              乙方为甲方办理委托事项应收取的款项（以下称“应收账款债权”），乙方全额转让于丙方；甲方已完全知悉该应收
              账款债权转让事项。
          </h5>
          <h5 style="margin-top: 15px;">七、争议解决</h5>
          <h5>
              1、本合同在签订、履行过程中发生争议的、各方应协商解决；协商不成的，任何一方均有权向丙方所在地人民法院
              提起诉讼。
          </h5>
          <h5>
              2、甲、乙双方对委托事项发生争议时的管辖另有约定的，如该管辖约定与本合同的管辖约定不一致的，以本合同的
              管辖约定为准。
          </h5>
          <h5 style="margin-top: 15px;">八、合同的生效及其他</h5>
          <p style="font-size: 14px;">
              1、本合同自各方签章之日起生效，对合同各方均产生法律约束力。
          </p>
          <p style="font-size: 14px;">
              2、本合同项下的附件1《委托人及委托事项信息表》、附件2《出行安全提醒及补充协议》是本合同的重要组成部分，自本合同签订之日起与本合同同时生效，具有同等法律效力。
          </p>
          <p style="font-size: 14px;margin-top: 15px;margin-left: 20px;">
             甲方（签章）：
          </p>
          <div style="margin-left: 50px;width: 60px;height: 60px;">
              <img style="width: 100%;" src="">
          </div>
          <p style="font-size: 14px;margin-top: 15px;margin-left: 20px;">
              日期：
          </p>
          <p style="font-size: 14px;margin-top: 15px;margin-left: 20px;">
              乙方（签章）：
          </p>
          <div style="margin-left: 50px;width: 60px;height: 60px;">
              <img style="width: 100%;" src="">
          </div>
          <p style="font-size: 14px;margin-top: 15px;margin-left: 20px;">
              日期：
          </p>
          <p style="font-size: 14px;margin-top: 15px;margin-left: 20px;">
              丙方（签章）：
          </p>
          <div style="margin-left: 50px;width: 60px;height: 60px;">
              <img style="width: 100%;" src="">
          </div>
          <p style="font-size: 14px;margin-top: 15px;margin-left: 20px;">
              日期：
          </p>
      </div>
      <hr />
      <div class="fujian01">
          <p style="font-size: 14px;"><i>附件一：</i></p>
          <p style="text-align: center;margin: 15px 0;font-size: 16px;font-weight: bold;">委托人及委托事项信息表</p>
          <h5>一、委托人信息（12岁以下儿童或2岁以下婴儿需要标注）</h5>
          <Table border :columns="columns1" :data="data1"></Table>
          <h5 style="margin-top: 15px;">二、委托事项</h5>
          <p style="font-size: 14px;">（一）机票预订信息（12岁以下儿童或2岁以下婴儿需要标注）</p>
          <Table border :columns="columns2" :data="data2"></Table>
          <p style="font-size: 14px;margin-top: 15px;">（二）酒店预订信息（12岁以下儿童或2岁以下婴儿需要标注）</p>
          <Table border :columns="columns3" :data="data3"></Table>
          <p style="font-size: 14px;margin-top: 15px;">（三）其他委托事项：</p>
          <p style="font-size: 14px;margin-top: 15px;">{{other_info}}</p>
      </div>
      <div class="fujian02">
          <p style="font-size: 14px;margin-top: 30px;"><i>附件二：</i></p>
          <p style="text-align: center;margin: 15px 0;font-size: 16px;font-weight: bold;">出行安全提醒及补充协议</p>
          <h5>协议说明：</h5>
          <p style="font-size: 14px;">1、《出行安全提醒及补充协议》由安全提醒、重要提示、委托合同补充条款三部分组成。</p>
          <p style="font-size: 14px;">2、《出行安全提醒及补充协议》为受托旅行社和委托人签署的《委托服务合同》（以下简称“委托合同”）的附件
              ，由双方自愿签署，双方对该协议所列信息有充分认知和理解，与委托合同具有同等法律效力。
          </p>
          <h5 style="margin-top: 30px;">一、安全提醒</h5>
          <p style="font-size: 14px;">1、购买保险说明：乙方提示甲方投保人身意外伤害保险。乙方郑重提醒甲方应安排好自己的活动项目，谨慎参加高
              风险运动，如需参加上述活动，建议投保包含高风险项目的人身意外伤害险种。
          </p>
          <p style="font-size: 14px;">
              2、携带安全信息卡：甲方应填写完整乙方提供的安全信息卡，并在出行行程中全程随身携带。
          </p>
          <p style="font-size: 14px;">
              3、人身财产安全提示：
          </p>
          <p style="font-size: 14px;">
              （1）注意人身安全：甲方应根据自身情况选择能够控制风险的活动，如有心脏病、高血压、恐高症等勿选择刺激性
              或高风险活动。潜水、跳伞、攀岩、蹦极、骑马、热气球、快艇等高空、高速、水上、水下，具有危险性，请充分了
              解活动知识，应加倍注意安全,听从景区工作人员的指挥与合理劝阻。
          </p>
          <p style="font-size: 14px;">
              （2）做好个人防护：如旅途涉及热带、高原、海滨、草原等特殊气候、地理条件，应采取必要的防护措施，充分了
              解目的地情况，备好相应的服装鞋、帽，做好防晒、防蚊虫、防高原反应等工作。晕车的旅游者，备好有效药物，旅
              途中有不良反应及时说明。
          </p>
          <h5 style="margin-top: 15px;">二、重要提示</h5>
          <p style="font-size: 14px;">
              1、委托人信息确认：
          </p>
          <p style="font-size: 14px;">
              （1）甲方需仔细核对委托人的姓名与证件号，并有向乙方如实告知与出行活动相关的个人健康信息的义务；
          </p>
          <p style="font-size: 14px;">
              （2）鉴于委托人的健康状况，乙方有决定是否办理委托事项的权利。
          </p>
          <p style="font-size: 14px;">
              2、机票、酒店预订信息及其他委托事项信息确认：
          </p>
          <p style="font-size: 14px;">
              （1）黄金周、特殊节日等旅游旺季，机票、酒店预订及其他委托事项的办理，以款到确认为准，一经确认不得随意
              变更；若甲方未能在最后付款期限之前确认并付款（分期付款只需支付首付款），所有的预订将自动取消，乙方不再
              做任何预先通知，由此产生的一切经济损失由甲方自行承担。
          </p>
          <p style="font-size: 14px;">
              （2）如预订机票为团票或特价机票，一经预定不能退改签；散客票的更改或取消，按照航空公司的退改签规定执行
              ；航班时间以出票的电子客票上的时间为准，如通知后航班有变化，乙方需及时告知甲方。
          </p>
          <p style="font-size: 14px;">
              （3）酒店一经预定，不能退或换，如预订酒店无法入住或无房，经甲方同意，乙方另行预订其他酒店，差价多退少
              补；甲方不同意另行预订的，乙方及时退回甲方已支付款项；酒店凭证件或护照名字入住，若办理提前入住或延迟退
              房，甲方需自行与酒店协商，产生的费用由甲方自理。
          </p>
          <p style="font-size: 14px;">
              3、如乙方遇紧急情况或其他原因无法与甲方进行书面往来确认事项，甲方同意采用电话、短信、电子邮件等方式
              与乙方确认。
          </p>
          <h5 style="margin-top: 15px;">三、委托合同补充条款</h5>
          <p style="font-size: 14px;">
              （一）甲乙双方权利、义务
          </p>
          <p style="font-size: 14px;">
              甲方权利、义务：
          </p>
          <p style="font-size: 14px;">
              1、甲方有权要求乙方按照合同约定的内容和标准，履行合同约定义务。
          </p>
          <p style="font-size: 14px;">
              2、甲方应当确保所提供的证件、资料及联系电话真实有效，否则造成损失由甲方自行负责。
          </p>
          <p style="font-size: 14px;">
              3、甲方应按约定向乙方支付委托事项费用及分期手续费等。
          </p>
          <p style="font-size: 14px;">
              4、甲方应当及时受领乙方办理委托事项的结果。
          </p>
          <p style="font-size: 14px;">
              5、因不可归责于乙方的事由，委托合同解除或者委托事项不能完成的，甲方应当向乙方支付约定的委托费用。
          </p>
          <p style="font-size: 14px;margin-top: 15px;">
              乙方权利、义务：
          </p>
          <p style="font-size: 14px;">
              1、乙方有权拒绝甲方超出合同约定的要求；
          </p>
          <p style="font-size: 14px;">
              2、乙方应亲自处理甲方的委托事项，如乙方无法独立完成，而需要将委托事项委托其他旅行社的，甲方同意委托。
          </p>
          <p style="font-size: 14px;">
              3、甲方在接受委托事项服务方服务期间遭受人身、财产损失的，乙方应当协助甲方向服务方索赔。
          </p>
          <p style="font-size: 14px;margin-top: 15px;">（二）违约责任</p>
          <p style="font-size: 14px;"><b>甲方违约责任：</b><br />
              1、甲方临时要求取消、变更机票、酒店或其他委托事项的，或出现其他违反合同约定的行为，即视为甲方违约，甲
              方应按照委托费用总金额10%的标准向乙方支付违约金。<br>
              2、甲方未按合同约定或未经乙方同意，临时要求取消、变更机票、酒店或其他委托事项的，费用由甲方自行承担，
              并不得要求退回已支付委托费用，同时应向乙方支付违约金。<br>
              3、甲方要求取消、变更机票、酒店或其他委托事项且经乙方同意的，乙方在扣除办理委托事项而发生的业务损失费
              及违约金后，应在办理完变更后的委托事项之日起15个工作日内退还剩余委托费用。<br>
              4、甲方未按约定的时间提供证件及资料，或者提供的证件及资料不真实，造成乙方无法为甲方提供约定服务的，乙
              方不承担赔偿责任，甲方应承担乙方已发生的业务损失费及应向乙方支付违约金。
          </p>
          <p style="font-size: 14px;margin-top: 15px;"><b>乙方违约责任：</b><br />
              1、乙方未按照合同约定为甲方办理代订机票、酒店或其他委托事项的，退还甲方已支付的费用，并应按委托费用总
              金额10%的标准向甲方支付违约金。<br>
              2、乙方未经甲方同意擅自降低机票仓位、住宿酒店及其他委托事项标准的，应向甲方支付违约金，并退还降低标准
              的差额。<br>
              3、乙方未经甲方同意擅自取消机票、酒店及其他委托事项的，应向甲方支付违约金，并退还已收取的费用。
          </p>
          <h5 style="margin-top: 15px;">（三）免责条款</h5>
          <p style="font-size: 14px;margin-bottom: 80px;"><b>1、甲乙双方因不可抗力（包括但不限于因自然原因和社会原因引起的，如自然灾害、战争、恐怖活动、动乱、骚乱
              、罢工、突发公共事件、政府行为等）不能履行合同的，且双方又未能达成变更协议的，双方均不承担违约责任。<br />
              2、因飞机、火车、客运汽车等公共交通工具延误或取消，乙方应当协助甲方向公共交通经营者索赔；因第三方侵害
              等不可归责于乙方的原因导致甲方人身、财产权益受到损害的，乙方不承担赔偿责任。</b></p>
      </div>
      <x-button class="signBtn" type="primary" @click.native="goLiveFace">人脸实名验证</x-button>
  </div>
</template>

<script>
    import { XHeader,PopupHeader,Actionsheet , TransferDom, Card ,Tab, TabItem,XButton,XTable  } from 'vux'
    import {httpUrl} from '../../http_url';
    import iView from 'iview';
    import 'iview/dist/styles/iview.css';
    import { Table } from 'iview';

export default {
    directives: {
        TransferDom
    },
  data () {
    return {
        menus: {
            menu1: '退出登录'
        },
        showMenus: false,
        pdfurls:'',
        isIOS:true,
        transfinite:'',      //活体检测次数  0:没有超过校验次数  1:超过校验次数
        yx_ht_id:'',
        idcard_name:'',
        idcard_num:'',
        email:'',
        mailing_address:'',
        phone:'',
        company_name:'',
        licence_number:'',
        address:'',
        supervise_tel:'',
        people:'',
        flight_price:'',
        big_flight_price:'',
        hotel_price:'',
        big_hotel_price:'',
        other_price:'',
        big_other_price:'',
        totalprice:'',
        big_totalprice:'',
        stage:'',
        fenqi_price:'',
        paymoney:'',
        per_price:'',
        year:'',
        month:'',
        bank_1_number:'',
        bank_1_name:'',
        other_info:'',
        columns1:[
            {
                title: '委托人姓名',
                key: 'name',
                minWidth:100,
            },
            {
                title: '委托人英文姓名',
                key: 'engname',
                minWidth:150,
            },
            {
                title: '性别',
                key: 'gender',
                minWidth:80,
            },
            {
                title: '有效身份证/护照号',
                key: 'passportid',
                minWidth:180,
            },
            {
                title: '证件有效期',
                key: 'cardtime',
                minWidth:100,
            },
            {
                title: '联系方式',
                key: 'tel',
                minWidth:120,
            }],
        data1:[],
        columns2:[
            {
                title: '航段',
                key: 'segment',
                minWidth:100,
            },
            {
                title: '承运航空公司',
                key: 'airways',
                minWidth:150,
            },
            {
                title: '航班号',
                key: 'flight',
                minWidth:80,
            },
            {
                title: '起飞时间(当地时间)',
                key: 'qdate',
                minWidth:160,
            },
            {
                title: '抵达时间(当地时间)',
                key: 'tdate',
                minWidth:160,
            },
            {
                title: '座位等级',
                key: 'grade',
                minWidth:120,
            },
            {
                title: '行李',
                key: 'baggage_weight',
                minWidth:80,
            }],
        data2:[],
        columns3:[
            {
                title: '预订酒店名称',
                key: 'hname',
                minWidth:120,
            },
            {
                title: '预订房型',
                key: 'type',
                minWidth:100,
            },
            {
                title: '入住日期',
                key: 'sdate',
                minWidth:100,
            },
            {
                title: '离店日期',
                key: 'edate',
                minWidth:100,
            },
            {
                title: '间夜数量',
                key: 'num',
                minWidth:100,
            },
            {
                title: '用餐包含',
                key: 'meal_contains',
                minWidth:120,
            },
            {
                title: '酒店接送',
                key: 'hotel_pickup',
                minWidth:100,
            },
            {
                title: '特殊申请',
                key: 'special_application',
                minWidth:120,
            }
        ],
        data3:[],

    }
  },
    created(){
        this.getData();
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        XTable,
        Table
    },
    methods:{
        //获取合同内容数据
        getData(){
            let orderid = this.$route.query.orderid;
            const _this = this;
            let postData = this.$qs.stringify({
                orderid:orderid
            })
            this.$axios({
                method: 'post',
                url:httpUrl.previewContract,
                data:postData
            }).then((res)=>{
                console.log(res.data)
                let data =res.data.retData;
                if(res.data.errCode==200){
                    this.yx_ht_id = data.cost.yx_ht_id;
                    this.idcard_name = data.traveler.idcard_name;
                    this.idcard_num = data.traveler.idcard_num;
                    this.email = data.traveler.email;
                    this.mailing_address = data.traveler.mailing_address;
                    this.phone = data.traveler.phone;
                    this.company_name = data.seller.company_name;
                    this.licence_number = data.seller.licence_number;
                    this.address = data.seller.address;
                    this.supervise_tel = data.seller.supervise_tel;
                    this.people = data.traveler.people;
                    this.flight_price = data.cost.flight_price;
                    this.big_flight_price = data.cost.big_flight_price;
                    this.hotel_price = data.cost.hotel_price;
                    this.big_hotel_price = data.cost.big_hotel_price;
                    this.other_price = data.cost.other_price;
                    this.big_other_price = data.cost.big_other_price;
                    this.totalprice = data.cost.totalprice;
                    this.big_totalprice = data.cost.big_totalprice;
                    this.stage = data.cost.stage;
                    this.fenqi_price = data.cost.fenqi_price;
                    this.paymoney = data.cost.paymoney;
                    this.per_price = data.cost.per_price;
                    this.year = data.cost.year;
                    this.month = data.cost.month;
                    this.bank_1_number = data.traveler.bank_1_number;
                    this.bank_1_name = data.traveler.bank_1_name;
                    this.other_info = data.cost.other_info;
                    this.data1 = data.chuxingren;
                    this.data2 = data.flight;
                    this.data3 = data.hotel;
                    this.transfinite = data.transfinite;

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
        goSignature(){
            let step_type = this.$route.query.step_type;
            let orderid = this.$route.query.orderid;
            this.$router.push({
                path:'/signature',
                query: {
                    step_type: step_type,
                    orderid:orderid
                }
            });
        },
        goLiveFace(){
            const _this = this;
            let step_type = this.$route.query.step_type;
            let orderid = this.$route.query.orderid;

            if(this.transfinite == 1){
                this.$vux.alert.show({
                    title: '错误提示',
                    content: '失败次数过多，请联系客服：0755-22211333',
                    onHide () {
                        _this.$router.push('/home');
                    }
                })
            }else {
                this.$router.push({
                    path:'/qiniu_upload',
                    query: {
                        step_type: step_type,
                        orderid:orderid
                    }
                });
            }

        }
    }
}
</script>

<style scoped>
    .fujian01,.fujian02{
        margin: 15px 10px 0 15px;
    }
    .signBtn{
        width: 90%;
        height: 36px;
        line-height: 36px;
        position: fixed;
        z-index: 9999;
        bottom: 15px;
        left: 0;
        right:0;
        margin: auto;
        text-align: center;
    }

</style>
