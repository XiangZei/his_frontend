<template>
  <div  >
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple text">患者信息查询</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col  :span="4" ><div class="grid-content ">病历号</div></el-col>
      <el-col  :span="3"><div >
        <el-autocomplete   popper-class="my-autocomplete" placeholder="输入病历号查找" v-model="medicalrecordid" :fetch-suggestions="querySearch"
                           @select="fetchPreMsg" :disabled="canEdit">
          <i  class="el-icon-edit el-input__icon"
              slot="suffix">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.inde }}</div>
          </template>
        </el-autocomplete>

      </div></el-col>
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

    <el-table
      :data="prescriptionmsg"
      border
      size="mini"
      @selection-change="handleSelectRegistmsg"
      style="width: 100%">
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
      <el-col :span="4" style="text-align:left"><el-button type="primary" @click="dis_medicine">发药</el-button></el-col>
    </el-row>



  </div>
</template>

<script>
  import {getrequiremsg} from '@/api/registration'
import {distributemedicine,getpatientmsg,getPreMsg_medicine} from "@/api/registration"
  export default {

    data() {
      return {
        canEdit:false,
        baseData:{},
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
        }
      }
    },
    methods: {
      fetchPreMsg(item){
        item = item.inde;
        this.medicalrecordid = item;
        getpatientmsg(this.medicalrecordid).then(response=>{
          this.patientdetail = response.data;
          console.log("成功获取病人信息")
        }).catch(error=>{
          console.log("病人信息获取失败")
        });
        getPreMsg_medicine(this.medicalrecordid).then(response=>{
          this.prescriptionmsg  = response.data;
          for(var a in this.prescriptionmsg){
            this.prescriptionmsg[a].name=this.patientdetail.name;
          }
          console.log("成功获取病人处方信息")
        }).catch(error=>{
          console.log("病人处方信息获取失败")
        })
      },
      //获取病人信息
      etchPreMsg(){
        getpatientmsg(this.medicalrecordid).then(response=>{
          this.patientdetail = response.data;
          console.log("成功获取病人信息")
        }).catch(error=>{
          console.log("病人信息获取失败")
        });
        getPreMsg_medicine(this.medicalrecordid).then(response=>{
          this.prescriptionmsg  = response.data;
          for(var a in this.prescriptionmsg){
            this.prescriptionmsg[a].name=this.patientdetail.name;
          }
          console.log("成功获取病人处方信息")
        }).catch(error=>{
          console.log("病人处方信息获取失败")
        })
      },
      dis_medicine(){
            var docid=localStorage.getItem("name");
            if(docid==null){
              this.message.error("医生信息有误，请重新登录")
              return
            }

            for(var a in this.registSelection){
              var registid = this.registSelection[a].registid;

              // alert(registid+"   "+medicalrecordid+"   "+docid+"   "+this.form.paytype+"   "+this.form.invoiceid);
              distributemedicine(registid,docid,this.form,this.registSelection[a]).then(response=>{

                console.log("结算完毕")
              }).catch(error=>{
                this.$message.error("发药处理错误")
              })
            }
            this.$message({
              message:"发药成功",
              type:"success",
              duration:1000
            })

      },
      calculate_refee(){
        this.form.refee = this.form.relpay-this.form.fee;
      },
      handleSelectRegistmsg(val){
        this.registSelection = val;
      },
      feeSettlement(){

        if(this.registSelection.length===0){
          this.$message({
            message:"请先选中发药的项目",
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
      ,
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
    background: #34e6ce;
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
