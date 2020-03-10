<template>
    <el-container  style="">
        <el-aside class="el-aside" width="25%">
          <el-button type="primary" round @click="refresh" style="padding: 4px 12px;">重新拉取诊断信息</el-button>
          <el-tabs v-model="activeName1" @tab-click="handleClick" >
            <el-tab-pane label="本人" name="user" >
              <patient-list  :patientlist="patientlist" :patient="patient"></patient-list>
            </el-tab-pane>
            <el-tab-pane label="科室" name="dep"></el-tab-pane>


          </el-tabs>

        </el-aside>
        <el-main style="margin-top:-20px;">
            <el-row :gutter="20">
                <el-col :span="4"><div class="grid-content bg-purple">患者信息</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple"><i class="el-icon-user">患者姓名：</i>{{patient.name}} <i class="el-icon-star-off">病历号：</i>{{patient.medicalrecordid}} <i class="el-icon-goods"></i>年龄：{{patient.age}} <i class="el-icon-zoom-in"></i>性别：{{patient.gender}}</div></el-col>
                <el-col :span="4"><div class="grid-content " style="background: #ff0712;"><el-link :underline="false" icon="el-icon-success" @click="finishDiagnose">诊毕</el-link></div></el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="病历首页" name="first">
                  <medical-main-page :patient="this.patient" :cansee3="this.patient.medicalrecordid===''"></medical-main-page>
                </el-tab-pane>
                <el-tab-pane label="成药处方" name="third" :disabled = "canAddMedicine">
                  <prescription-pane :active="activeName" :patient="this.patient"></prescription-pane>
                </el-tab-pane>

            </el-tabs>
        </el-main>
    </el-container>
</template>
<script>
import MedicalMainPage from './component/MedicalMainPage'
import PatientList from './component/PatientList'
import PrescriptionPane from './component/PrescriptionPane'
import {getpatientlist,finishdiagnose} from '@/api/diagnose'
export default {
    components:{MedicalMainPage,PatientList,PrescriptionPane},
    data() {
        return {
          docid:"",
          activeName1:'user',
          activeName: 'first',
          patient:{
            gender:"",
            medicalrecordid:"",
            name:"",
            diagnosestate:"",
            registid:"",
            age:"",
          },
          patientlist:[
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600600,
            //   "name": "张伟",
            //   "diagnosestate": 2,
            //   "registid": 60,
            //   "age": 18
            // }
          ]
          }
    },
    methods: {
      finishDiagnose(){
        finishdiagnose(this.patient.registid).then(response=>{
          this.$message({
            message:"病人诊毕",
            type:"success",
            duration:1000,
            showClose:true
          })
        }).catch(error=>{
          console.log(error.message)
        })
      },
        handleClick(tab, event) {
            console.log(tab, event);
        },
      refresh(){
        this.docid=localStorage.getItem("name")
        getpatientlist(this.docid).then(response=>{
          if(response){
            this.patientlist=[];
            this.patientlist = response.data;
          }
        }).catch(errer=>{
          this.$message({
            message: '数据拉取失败',
            type: 'failed'
          });
        })
      }
    },
  computed:{
    canAddMedicine(){
      return this.patient.diagnosestate !=2
    }
  },
  created() {
    this.docid=localStorage.getItem("name")
    getpatientlist(this.docid).then(response=>{
      if(response){
        this.patientlist=[];
        this.patientlist = response.data;
      }
    }).catch(errer=>{
        this.$message({
          message: '数据拉取失败',
          type: 'failed'
        });
    })

  }
}
</script>

<style scoped>
.grid-content {
    border-radius: 4px;
}
.bg-purple {
    background: #8d99f7;
}

</style>

