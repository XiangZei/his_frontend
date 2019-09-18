
<template>
    <div  >
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text">患者信息查询</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :span="4" ><div class="grid-content ">病历号</div></el-col>
        <el-col  :span="3"><div >
          <el-autocomplete   popper-class="my-autocomplete" placeholder="输入病历号查找" v-model="medicalrecordid" :fetch-suggestions="querySearch"
                             @select="fetchregistmsg" :disabled="canEdit">
            <i  class="el-icon-edit el-input__icon"
                slot="suffix">
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.inde }}</div>
            </template>
          </el-autocomplete>

        </div></el-col>
        <el-col :span="3"><div><el-button type="primary" icon="el-icon-search" @click="etchregistmsg">搜索</el-button></div></el-col>
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
        <el-col :span="4"><div class="grid-content bg-purple text">患者挂号信息</div></el-col>
      </el-row>

      <el-table
        :data="registmsg"
        border
        style="width: 100%">
        <el-table-column
          fixed
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
          prop="idnumber"
          label="身份证号"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="挂号日期"
          >
        </el-table-column>
        <el-table-column
          prop="apm"
          label="挂号午别">
        </el-table-column>
        <el-table-column
          prop="dep"
          label="看诊科室"
          >
        </el-table-column>
        <el-table-column
          prop="diagnosestate"
          label="看诊状态"
         >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button  type="danger" @click="withdraw_regis(scope.row)" :disabled="scope.row.diagnosestate!=='已挂号'"  size="small">退号</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
</template>
<script>

  import {getrequiremsg} from '@/api/registration'
  import {getpatientmsg,getRegistMsg,withdrawRegis} from '@/api/registration'
export default {
  name:'withdraw_regis',
  //  name,  gender,  birthday,  idNumber,address
  methods: {
    //获取病人信息
    etchregistmsg(){
      getpatientmsg(this.medicalrecordid).then(response=>{
        this.patientdetail = response.data;
        console.log("成功获取病人信息")
      }).catch(error=>{
        console.log("病人信息获取失败")
      });
      //获取挂号信息
      getRegistMsg(this.medicalrecordid).then(response=>{
        this.registmsg  = response.data;
        console.log("成功获取病人挂号信息")
      }).catch(error=>{
        console.log("病人挂号信息获取失败")
      })
    },
    fetchregistmsg(item){
      item = item.inde;
      this.medicalrecordid = item;
      getpatientmsg(item).then(response=>{
        this.patientdetail = response.data;
        console.log("成功获取病人信息")
      }).catch(error=>{
        console.log("病人信息获取失败")
      });
      //获取挂号信息
      getRegistMsg(item).then(response=>{
        this.registmsg  = response.data;
        console.log("成功获取病人挂号信息")
      }).catch(error=>{
        console.log("病人挂号信息获取失败")
      })
    },
    withdraw_regis(row) {
      this.$confirm("是否进行退号操作？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
          withdrawRegis(row.registid).then(response=>{
            row.diagnosestate = "已退号";
            console.log("病人已退号")
            this.$message({
              message:"病人成功退号",
              type:'success'
            })
          }).catch(error=>{
            console.log("退号失败")
          });
      }).catch(()=>{
        console.log("cancel")
      });
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
  },

  data() {
    return {
      canEdit:false,
      baseData:{},
      medicalrecordid:"",
      patientdetail:{

      },
      registmsg:[]
    }
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
}
</script>

<style scoped>
.el-col{
  margin-top: 10px;
}
.bg-purple {
    background: #9980e6;
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
