
<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text">患者信息查询</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :span="4" ><div class="grid-content ">病历号</div></el-col>
        <el-col  :span="3"><div ><el-input v-model="medicalrecordid" placeholder="请输入内容"></el-input></div></el-col>
        <el-col :span="3"><div><el-button type="primary" icon="el-icon-search" @click="fetchregistmsg">搜索</el-button></div></el-col>
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
            <el-button @click="withdraw_regis(scope.row)" :disabled="scope.row.diagnosestate!=='已挂号'" type="text" size="small">退号</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
</template>
<script>
  import {getpatientmsg,getRegistMsg,withdrawRegis} from '@/api/registration'
export default {
  name:'withdraw_regis',
  //  name,  gender,  birthday,  idNumber,address
  methods: {
    //获取病人信息
    fetchregistmsg(){
      getpatientmsg(this.medicalrecordid).then(response=>{
        this.patientdetail = response.data;
        console.log("成功获取病人信息")
      }).catch(error=>{
        console.log("病人信息获取失败")
      });
      //获取挂号信息
      getRegistMsg(this.medicalrecordid).then(response=>{
        this.registmsg  = response.data;
        alert(this.registmsg)
        console.log("成功获取病人挂号信息")
      }).catch(error=>{
        console.log("病人挂号信息获取失败")
      })
    },
    withdraw_regis(row) {
      withdrawRegis(row.registid).then(response=>{
        row.diagnosestate = "已退号";
        console.log("病人已退号")
        this.$message({
          message:"病人成功退号",
          type:'success'
        })
      }).catch(error=>{
        console.log("退号失败")
      })
    }
  },

  data() {
    return {
      medicalrecordid:"",
      patientdetail:{

      },
      registmsg:[]
    }
  }
}
</script>

<style scoped>

.bg-purple {
    background: #aee6de;
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
