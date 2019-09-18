<template>
  <div  >
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple text">患者信息查询</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col  :span="4" ><div class="grid-content ">病历号</div></el-col>
      <el-col  :span="3"><div ></div>
        <el-autocomplete   popper-class="my-autocomplete" placeholder="输入病历号查找" v-model="medicalrecordid" :fetch-suggestions="querySearch"
                           @select="fetchPreMsg" :disabled="canEdit">
          <i  class="el-icon-edit el-input__icon"
              slot="suffix">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.inde }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col :span="3"><div><el-button type="primary" icon="el-icon-search" @click="etchPreMsg">搜索</el-button></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple text">患者信息确认</div></el-col>
    </el-row>
    <el-row :gutter="4">
      <el-col :span="3"><div class="grid-content ">姓名</div></el-col>
      <el-col :span="4"><div class="iinput"><el-input v-model="patientdetail.name" placeholder="" :disabled="true"></el-input></div></el-col>
      <el-col :span="3"><div class="grid-content">身份证号</div></el-col>
      <el-col :span="4"><div class="iinput"><el-input v-model="patientdetail.idNumber" placeholder="" :disabled="true"></el-input></div></el-col>
      <el-col :span="3"><div class="grid-content">家庭住址</div></el-col>
      <el-col :span="4"><div class="iinput"><el-input v-model="patientdetail.address" placeholder="" :disabled="true"></el-input></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple text">患者消费信息</div></el-col>
    </el-row>

    <el-table v-loading="loading"
      :data="prescriptionmsg"
      border
      size="mini"
      @selection-change="handleSelectRegistmsg"
      style="width: 100%;opacity:0.6;">
      <el-table-column
        type="selection"

      >
      </el-table-column>
      <el-table-column
        prop="medicalrecordid"
        label="病历号"
      >

      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="fee"
        label="费用"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="挂号日期"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量">
      </el-table-column>
      <el-table-column
      prop="proname"
      label="名称">

      </el-table-column>
      <el-table-column
        prop="createtime"
        label="开立时间"
      >
      </el-table-column>
      <el-table-column
      prop="drugname"
      label="药品名称"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
      </el-table-column>
    </el-table>
    <el-row >
      <el-col :span="4" style="text-align:left" ><el-button  type="warning" @click="feeSettlement">费用结算</el-button></el-col>
    </el-row>

    <el-dialog
      title="发票信息(缴费)"
      :visible.sync="settlementVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="invoiceid" label="发票号">
              <el-input v-model="form.invoiceid" placeholder="发票号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="medicalrecordid" label="病历号">
              <el-input v-model="form.medicalrecordid" placeholder="病历号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="name" label="患者姓名">
              <el-input v-model="form.name" placeholder="患者姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="paytype" label="支付方式">
              <el-select v-model="form.paytype" placeholder="支付方式">
                <el-option
                v-for="item in paytypes"
                :key="item.inde"
                :label="item.label"
                :value="item.inde"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="fee" label="应收金额">
              <el-input v-model="form.fee" placeholder="应收金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="relpay" label="实收金额">
              <el-input v-model="form.relpay" placeholder="实收金额" @keyup.enter.native="calculate_refee"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="refee" label="找零金额">
              <el-input v-model="form.refee" placeholder="找零金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settlementVisible = false">取 消</el-button>
        <el-button type="primary" @click="settlement">收费</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getrequiremsg} from '@/api/registration'
import {getPayType,startinvoice,feeSettlement,settlement,getpatientmsg,getPreMsg,settlement_1,} from "@/api/registration"
  export default {

    data() {
      return {
        baseData:{},
        loading:false,
        medicalrecordid:"",
        registSelection: [],
        fee:"",
        settlementVisible:false,
        patientdetail:{},
        prescriptionmsg:[],
        form:{
          invoiceid:"",
          medicalrecordid:"",
          name:"",
          paytype:"",
          fee:"",
          relpay:"",
          refee:""
        },
        rules:{
          invoiceid:[{required:true,trigger:'blur'}],
          medicalrecordid:[{required:true,trigger:'blur'}],
          name:[{required:true,trigger:'blur'}],
          paytype:[{required:true,trigger:'blur'}],
          fee:[{required:true,trigger:'blur'}],
          relpay:[{required:true,trigger:'blur'}],
          refee:[{required:true,trigger:'blur'}]
        },
        paytypes:[]
      }
    },
    methods: {
      //获取病人信息
      etchPreMsg(){
        getpatientmsg(this.medicalrecordid).then(response=>{
          this.patientdetail = response.data;
          console.log("成功获取病人信息")
        }).catch(error=>{
          console.log("病人信息获取失败")
        });
        this.loading=true;
        getPreMsg(this.medicalrecordid).then(response=>{

          this.prescriptionmsg  = response.data;
          for(var a in this.prescriptionmsg){
            this.prescriptionmsg[a].name=this.patientdetail.name;
          }
          this.loading=false;
          console.log("成功获取病人处方信息")
        }).catch(error=>{
          console.log("病人处方信息获取失败")
        })

      },
      fetchPreMsg(item){
        this.medicalrecordid = item.inde;
        item = item.inde;
        getpatientmsg(item).then(response=>{
          this.patientdetail = response.data;
          console.log("成功获取病人信息")
        }).catch(error=>{
          console.log("病人信息获取失败")
        });
        this.loading=true;
        getPreMsg(item).then(response=>{

          this.prescriptionmsg  = response.data;
          for(var a in this.prescriptionmsg){
            this.prescriptionmsg[a].name=this.patientdetail.name;
          }
          this.loading=false;
          console.log("成功获取病人处方信息")
        }).catch(error=>{
          console.log("病人处方信息获取失败")
        })

      },
      settlement(){
        this.$refs.form.validate(validate=>{
          if(validate){
            var docid=localStorage.getItem("name");
            if(docid==null){
              this.message.error("医生信息有误，请重新登录")
              return
            }
            if(this.form.relpay<this.form.fee){
              this.$message.error("无法结算，金额错误")
              return
            }else{
              for(var a in this.registSelection){
                var registid = this.registSelection[a].registid;

                // alert(registid+"   "+medicalrecordid+"   "+docid+"   "+this.form.paytype+"   "+this.form.invoiceid);
                settlement_1(registid,docid,this.form,this.registSelection[a]).then(response=>{

                  console.log("结算完毕")
                }).catch(error=>{
                  console.log("结算错误")
                })
              }
              startinvoice(this.form,docid).then(response=>{
                console.log("发票结算成功")
              }).catch(error=>{
                console.log("发票结算错误")
              })
              this.settlementVisible = false;
            }
          }
        })
      },
      calculate_refee(){
        this.form.refee = this.form.relpay-this.form.fee;
      },
      handleSelectRegistmsg(val){
        this.registSelection = val;
      },
      querySearch(queryString,cb){
        var medicalNums = this.baseData.medicalNum;
        var results = queryString? medicalNums.filter(
          (str)=>{
            return (str.inde.toString().indexOf(queryString))===0;
          }
        ):medicalNums;
        //调用callback返回建议列表数据
        results.forEach(e=>{
          e.inde = e.inde.toString()
        })
        cb(results);
      },
      feeSettlement(){

        if(this.registSelection.length===0){
          this.$message({
            message:"请先选中要缴费的项目",
            type:'warning'
          });
        }else{
          this.form.fee = 0;
          for(var a in this.registSelection){
            this.form.fee+=this.registSelection[a].num*this.registSelection[a].fee
          }
          this.form.medicalrecordid =this.registSelection[0].medicalrecordid;
          this.form.name=this.registSelection[0].name;
          this.settlementVisible=true;
        }
      }
    },

    created() {
      getPayType().then(response=>{
        this.paytypes=response.data;
        console.log("成功获取支付方式")
      }).catch(error=>{
        console.log("支付方式获取失败")
      })
    },
    mounted() {
      getrequiremsg().then(response=>{
        var data = response.data;
        this.baseData.gender = data.gender;
        this.baseData.regType = data.regType;
        this.baseData.depMsg = data.depMsg;
        this.baseData.medicalNum=data.medicalNum;
        this.baseData.chargeType=data.chargeType;
      })
    }

  };

</script>
<style scoped>
.el-col{
  margin-top: 10px;
}
.bg-purple {
    background: #a5e67f;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 20px;
    padding-top: 3px;
  margin-top: 9px;
}
  .text-left{
    text-align: left;
  }
  .iinput{
    margin-top: 3px;
  }
</style>
