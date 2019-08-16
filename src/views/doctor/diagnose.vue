<template>
    <el-container>
        <el-aside class="el-aside" width="25%">
          <el-button type="primary" @click="refresh" style="padding: 4px 12px;">重新拉取诊断信息</el-button>
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
                <el-col :span="20"><div class="grid-content bg-purple"><i class="el-icon-user">患者姓名：</i>{{patient.name}} <i class="el-icon-star-off">病历号：</i>{{patient.medicalrecordid}} <i class="el-icon-goods"></i>年龄：{{patient.age}} <i class="el-icon-zoom-in"></i>性别：{{patient.gender}}</div></el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="病历首页" name="first">
                  <medical-main-page :patient="this.patient" :cansee3="this.patient.medicalrecordid===''"></medical-main-page>
                </el-tab-pane>
                <el-tab-pane label="检查申请" name="second">检查申请</el-tab-pane>
                <el-tab-pane label="成药处方" name="third">
                  <prescription-pane :patient="this.patient"></prescription-pane>
                </el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">..</el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>
<script>
import MedicalMainPage from './component/MedicalMainPage'
import PatientList from './component/PatientList'
import PrescriptionPane from './component/PrescriptionPane'
import {getpatientlist} from '@/api/diagnose'
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
          // "gender": "男",
          // "medicalrecordid": 600600,
          // "name": "张伟",
          // "diagnosestate": 2,
          // "registid": 60,
          // "age": 18
          patientlist:[
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600600,
            //   "name": "张伟",
            //   "diagnosestate": 2,
            //   "registid": 60,
            //   "age": 18
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600601,
            //   "name": "赵建东",
            //   "diagnosestate": 1,
            //   "registid": 61,
            //   "age": 17
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600602,
            //   "name": "王健林",
            //   "diagnosestate": 1,
            //   "registid": 62,
            //   "age": 11
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600603,
            //   "name": "杜克拉",
            //   "diagnosestate": 2,
            //   "registid": 63,
            //   "age": 11
            // },
            // {
            //   "gender": "女",
            //   "medicalrecordid": 600604,
            //   "name": "张子",
            //   "diagnosestate": 1,
            //   "registid": 64,
            //   "age": 56
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600605,
            //   "name": "赵杰",
            //   "diagnosestate": 1,
            //   "registid": 65,
            //   "age": 67
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600606,
            //   "name": "李沐",
            //   "diagnosestate": 2,
            //   "registid": 66,
            //   "age": 33
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600607,
            //   "name": "张军",
            //   "diagnosestate": 2,
            //   "registid": 67,
            //   "age": 33
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600613,
            //   "name": "王勃",
            //   "diagnosestate": 2,
            //   "registid": 73,
            //   "age": 22
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600615,
            //   "name": "陶渊明",
            //   "diagnosestate": 2,
            //   "registid": 75,  
            //   "age": 33
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600617,
            //   "name": "苏洵",
            //   "diagnosestate": 1,
            //   "registid": 76,
            //   "age": 8
            // },
            // {
            //   "gender": "女",
            //   "medicalrecordid": 600653,
            //   "name": "张望",
            //   "diagnosestate": 1,
            //   "registid": 152,
            //   "age": 21
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600654,
            //   "name": "张文",
            //   "diagnosestate": 2,
            //   "registid": 153,
            //   "age": 21
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600654,
            //   "name": "张三",
            //   "diagnosestate": 1,
            //   "registid": 155,
            //   "age": 21
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600655,
            //   "name": "王杰",
            //   "diagnosestate": 1,
            //   "registid": 156,
            //   "age": 20
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600657,
            //   "name": "李四",
            //   "diagnosestate": 1,
            //   "registid": 158,
            //   "age": 21
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600658,
            //   "name": "王五",
            //   "diagnosestate": 1,
            //   "registid": 159,
            //   "age": 21
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600662,
            //   "name": "张伟",
            //   "diagnosestate": 1,
            //   "registid": 163,
            //   "age": 21
            // },
            // {
            //   "gender": "男",
            //   "medicalrecordid": 600663,
            //   "name": "李玉欢",
            //   "diagnosestate": 1,
            //   "registid": 167,
            //   "age": 21
            // }
          ]
          }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
      refresh(){
        this.docid=localStorage.getItem("docid")
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
  created() {
    this.docid=localStorage.getItem("docid")
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
    background: #a6ddf7;
}

</style>

