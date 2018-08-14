<template>
    <div>
        <popup-header left-text="额度明细"></popup-header>
        <div style="padding:0 15px;">
            <p v-if="this.dataList.length==0" style="text-align: center;color: #666;margin-top: 50px;">暂无数据</p>
            <x-table :cell-bordered="false" id="table_quotas" ref="table_quotas" v-else>
                <thead>
                    <tr style="background-color: #F7F7F7;" >
                        <th>序号</th>
                        <th>时间</th>
                        <th>名称</th>
                        <th>额度</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody v-for="(items,index) in dataList" :key="index">
                    <tr  >
                        <td >{{index+1}}</td>
                        <td>{{items.create_time}}</td>
                        <td>{{items.type}}</td>
                        <td v-show="items.pay_type==1" style="color:red;">{{items.money}}</td>
                        <td v-show="items.pay_type==2" style="color:green;">{{items.money}}</td>
                        <td>{{items.remark}}</td>
                    </tr>
                </tbody>
            </x-table>
        </div>

         <div class="loadeMore" @click="showMore" v-show="addMOre && this.dataList.length !=0">
            加载更多
            <img src="../../assets/down.png" class="more_img" >
        </div>
        
    </div>
</template>

<script>
import { XHeader, TransferDom, PopupHeader,Actionsheet,XButton,Alert,Toast,Divider,Icon,XTable  } from 'vux'
import {httpUrl} from '../../http_url';
var a=2;
export default {
    directives: {
        TransferDom
    },
    data(){
        return{
            dataList:[],
            addMOre:true,
            page:1,
            length:'',
            dataListLength:''
        }
    },

     created(){
        // this.infoCheck();
        this.getDataList()
    },
    components: {
        XHeader,
        PopupHeader,
        Actionsheet,
        XButton,
        Alert,
        Toast,
        Divider,
        Icon,
        XTable
    },
    methods:{
        getDataList(){
            const _this = this;
            let postData = this.$qs.stringify({
                page:this.page,
            })
            this.$axios({
                method:'post',
                url:httpUrl.getMoneyLog,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData,
            }).then((res)=>{
                console.log(res.data)
                if(res.data.errCode==200){
                    this.length = res.data.retData.length;
                    this.dataList = res.data.retData;
                    this.dataList = res.data.retData;
                    this.dataListLength = this.dataList.length;

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

            }).catch(function(){
                 this.$vux.toast.show({
                    text: '网络异常，请稍后再试',
                    type:'warn'
                })
            })
        },
        showMore(){
            const _this = this;

            let postData = this.$qs.stringify({
                page:++this.page,
            })
            
            this.$axios({
                method:'post',
                url:httpUrl.getMoneyLog,
                 headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=>{
               
                console.log(res.data)
                if(res.data.errCode==200){
                    this.dataList.concat(res.data['retData']);
                    console.log(this.dataList)
                    console.log(this.page);

                    console.log(res.data.retData)
                    //一进来就判断这个数组的长度
                    this.length = res.data.retData.length;

                    if(this.length == 0){
                        this.$vux.toast.show({
                            text: '暂无更多数据',
                            type:'warn'
                        })
                        this.addMOre = false;
                    }
                    const data = res.data.retData;
                    const a = this.dataList.concat(data)
                    this.dataList = a;
                    this.dataListLength = this.dataList.length;

                }
            }).catch(function(){
                 this.$vux.toast.show({
                    text: '网络异常，请稍后再试',
                    type:'warn'
                })
            })
        } ,
    }
}

</script>

<style scoped>
    .vux-table:after{
        border-top: none;
    }
    .loadeMore{
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        margin-top: 40px;
        position: relative;
    }
    .more_img{
        height: 20px;
        display: inline-block;
        position: absolute;
        top: 5px;
    }
    #table_quotas{
        font-size: 12px;
    }

</style>