import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/bind_phone'
    },
    {
      path: '/login',
      component: resolve => require(['../components/login/Login.vue'], resolve)
    },
    {
      path: '/quick_login',
      component: resolve => require(['../components/login/QuickLogin.vue'], resolve)
    },
    {
        path: '/bind_phone',
        component: resolve => require(['../components/login/BindPhone.vue'], resolve)
      },
    {
      path: '/forget_psd',
      component: resolve => require(['../components/login/ForgetPsd.vue'], resolve)
    },
      {
          path: '/index',
          component: resolve => require(['../components/home/Index.vue'], resolve),
          children:[
              {
                  path: '/home',
                  component: resolve => require(['../components/home/Home.vue'], resolve)
              },
              {
                  path: '/set_password',
                  component: resolve => require(['../components/home/SetPsd.vue'], resolve)
              },
              {
                  path: '/edit_phone',
                  component: resolve => require(['../components/home/EditPhone.vue'], resolve)
              },
              {
                  path: '/message_list',
                  component: resolve => require(['../components/home/MessageList.vue'], resolve)
              },
              {
                  path: '/verify_step',
                  component: resolve => require(['../components/credit_info/VerifyStep.vue'], resolve)
              },
              {
                  path: '/credit_info_list',
                  component: resolve => require(['../components/credit_info/CreditInfoList.vue'], resolve)
              },
              {
                  path: '/certification',
                  component: resolve => require(['../components/credit_info/Certification.vue'], resolve)
              },
              {
                  path: '/camera_test',
                  component: resolve => require(['../components/credit_info/CameraTest.vue'], resolve)
              },
              {
                  path: '/live_face',
                  component: resolve => require(['../components/credit_info/LiveFace.vue'], resolve)
              },
              {
                  path: '/live_face_suc',
                  component: resolve => require(['../components/credit_info/LiveFaceSuc.vue'], resolve)
              },
              {
                  path: '/live_face_fail',
                  component: resolve => require(['../components/credit_info/LiveFaceFail.vue'], resolve)
              },
              {
                  path: '/certification_info',
                  component: resolve => require(['../components/credit_info/CertificationInfo.vue'], resolve)
              },
              {
                  path: '/handle_certification',
                  component: resolve => require(['../components/credit_info/HandleCertification.vue'], resolve)
              },
              {
                  path: '/bank_certify',
                  component: resolve => require(['../components/credit_info/BankCertify.vue'], resolve)
              },
              {
                  path: '/bank_edit',
                  component: resolve => require(['../components/credit_info/BankEdit.vue'], resolve)
              },
              {
                  path: '/bank_info',
                  component: resolve => require(['../components/credit_info/BankInfo.vue'], resolve)
              },
              {
                  path: '/information_edit',
                  component: resolve => require(['../components/credit_info/InformationEdit.vue'], resolve)
              },
              {
                  path: '/information_preview',
                  component: resolve => require(['../components/credit_info/InformationPreview.vue'], resolve)
              },
              {
                  path: '/bill_list',
                  component: resolve => require(['../components/bill/BillList.vue'], resolve)
              },
              {
                  path: '/bill_detail',
                  component: resolve => require(['../components/bill/BillDetail.vue'], resolve)
              },
              {
                  path: '/sign_ht',
                  component: resolve => require(['../components/bill/SignHt.vue'], resolve)
              },
              {
                  path: '/ht_preview',
                  component: resolve => require(['../components/bill/HtPreview.vue'], resolve)
              },
              {
                  path: '/video',
                  component: resolve => require(['../components/bill/Video.vue'], resolve)
              },
              {
                  path: '/video_play',
                  component: resolve => require(['../components/bill/VideoPlay.vue'], resolve)
              },
              {
                  path: '/fenqi_info',
                  component: resolve => require(['../components/bill/FenqiInfo.vue'], resolve)
              },
              {
                  path: '/order_list',
                  component: resolve => require(['../components/order/OrderList.vue'], resolve)
              },
              {
                  path: '/repayment_record',
                  component: resolve => require(['../components/order/RepaymentRecord.vue'], resolve)
              },
              {
                  path:'/signe_list',
                  component: resolve => require(['../components/signe/SigneList.vue'],resolve)
              },
              {
                  path:'/txr_sign_ht',
                  component: resolve => require(['../components/signe/SignHt.vue'],resolve)
              },
              {
                  path:'/credit_login',
                  component: resolve => require(['../components/credit_info/CreditLogin.vue'],resolve)
              },
              {
                  path:'/credit_register2',
                  component: resolve => require(['../components/credit_info/CreditRegister2.vue'],resolve)
              },
              {
                  path:'/py_credit',
                  component: resolve => require(['../components/credit_info/PengYuanCredit.vue'],resolve)
              },
              {
                  path:'/py_report',
                  component: resolve => require(['../components/credit_info/PengYuanReport.vue'],resolve)
              },
              {
                  path:'/credit_report',
                  component: resolve => require(['../components/credit_info/CreditReport.vue'],resolve)
              },
              {
                  path:'/renhang_credit_msg',
                  component: resolve => require(['../components/msg/Renhangcredit.vue'],resolve)
              },
              {
                  path:'/cr_suc',
                  component: resolve => require(['../components/credit_info/CreditReportSuc.vue'],resolve)
              },
              {
                  path:'/cr_reportcheck',
                  component: resolve => require(['../components/credit_info/CreditReportcheck.vue'],resolve)
              },
             
              {
                  path:'/cr_suc2',
                  component: resolve => require(['../components/credit_info/CreditReportSuc2.vue'],resolve)
              },
              {
                  path:'/bc_report',
                  component: resolve => require(['../components/credit_info/BankCardReport.vue'],resolve)
              },
              {
                  path:'/zm_index',
                  component: resolve => require(['../components/credit_info/ZmIndex.vue'],resolve)
              },
              {
                  path:'/zm_score',
                  component: resolve => require(['../components/credit_info/ZmCreditScore.vue'],resolve)
              },
              {
                path:'/py_report',
                component: resolve => require(['../components/credit_info/PengYuanReport.vue'],resolve)
              },
              {
                  path:'/qiniu_upload',
                  component: resolve => require(['../components/credit_info/QiniuUpload.vue'],resolve)
              },
              {
                path:'/quotas',
                component: resolve => require(['../components/bill/Quotas.vue'],resolve)
            },
          ]
      },
      {
          path: '/signature',
          component: resolve => require(['../components/bill/Signature.vue'], resolve)
      },
      {
          path:'/txr_signature',
          component: resolve => require(['../components/signe/Signature.vue'],resolve)
      }

  ]
})
