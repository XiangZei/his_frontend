<template>
  <el-container style="opacity:0.9;">
    <el-tag type="success" style="text-align: right">待诊病人信息<el-link @click="refresh1" style="margin-left: 110px;">刷新</el-link></el-tag>
    <el-container>
      <el-main style=" padding:0 ;">
        <el-table size="mini" :stripe=true @row-dblclick ="starttodiagnose" border height="250"
                  :data="tableDataEnd1"
                  style="width: 100%">
          <el-table-column
            label="病历号"
            prop="medicalrecordid">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search1"
                size="mini"

                placeholder="关键字搜索"></el-input>
            </template>
            <template slot-scope="scope">
              <el-row>
                <el-button
                  size="mini"
                  @click="showDetail(scope.$index, scope.row)">查看详细信息</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="handleCurrentChange1"
          layout="prev, pager, next"
          :page-size="pageSize1"
          :total="total1"
          :current-page="currentPage1"
          >
        </el-pagination>
      </el-main>
    </el-container>
    <el-header style="height:0px;">
    </el-header>
    <el-tag type="success" style="text-align: right">已诊病人信息<el-link @click="refresh2" style="margin-left: 110px;">刷新</el-link></el-tag>

    <el-container>
      <el-main style="padding:0 ;">
        <el-table size="mini" :stripe=true  border  height="250"
                  :data="tableDataEnd2"
                  style="width: 100%">
          <el-table-column
            label="病历号"
            prop="medicalrecordid">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search2"
                size="mini"
                placeholder="关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-row>
                <el-button
                  size="mini"
                  @click="showDetail(scope.$index, scope.row)">查看详细信息</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="handleCurrentChange2"
          layout="prev, pager, next"
          :current-page="currentPage2"
          :page-size="pageSize2"
          :total="total2">
        </el-pagination>
      </el-main>
    </el-container>

    <el-dialog
    title="病人详细信息"
    :visible.sync="patientdetailvisiable">

        <div v-for="(key,index) in p" :index="key">
          <el-row :gutter="20" style="text-align: left;margin-left: 200px;margin-top: 10px;">
            <el-col :span="5"></el-col>
            <el-col :span="7" style="background: #0fe2ad ;height: 20px;  border-radius: 4px;">{{index}}</el-col>
            <el-col :span="7"style="background: #0fe2ad;height: 20px; border-radius: 4px;">{{key}}</el-col>
            <el-col :span="5"></el-col>
          </el-row>
        </div>

    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="patientdetailvisiable = false">确 定</el-button>
    </span>
    </el-dialog>
  </el-container>
</template>

<script>
  // "gender": "男",
  // "medicalrecordid": 600600,
  // "name": "张伟",
  // "diagnosestate": 2,
  // "registid": 60,
  // "age": 18
    export default {
      name: "PatientList",
      props:{
        patient:{
          type:Object,
          default:()=>{
            return{
              gender:"",
              mdeicalrecordid:"",
              name:"",
              diagnosestate:"",
              registid:"",
              age:""
              }
            }
        },
        patientlist:{
          type:Array
        }
      },
      data(){
        return{
          p:{},
          currentPage1:1,
          tableDataEnd1:[],
          pageSize1:4,
          currentPage2:1,
          tableDataEnd2:[],
          pageSize2:4,
          patientdetailvisiable:false,
          search1: '',
          search2:''
        }
      },
      computed:{
        tableData1:function () {
          return this.patientlist.filter(data =>( !this.search1 || data.name.toLowerCase().includes(this.search1.toLowerCase()))&&(data.diagnosestate==1||data.diagnosestate==2))
        },
        tableData2:function () {
          return this.patientlist.filter(data => (!this.search2 || data.name.toLowerCase().includes(this.search2.toLowerCase()))&&data.diagnosestate==4)
        },
        total2:function(){
          if(this.tableData2.length<=this.pageSize2){
            this.tableDataEnd2=[];
            this.tableDataEnd2=this.tableData2;
          }
          return this.tableData2.length;
        },
        total1:function () {
          if(this.tableData1.length<=this.pageSize1){
            this.tableDataEnd1=[];
            this.tableDataEnd1=this.tableData1;
          }
          return this.tableData1.length;
        }
      },
      methods:{
        refresh1(){
          this.search1="";
          this.currentPage1=1;
          this.tableDataEnd1=[];
          if(this.total1>this.pageSize1){
            for(let i=0;i<this.pageSize1;i++){
              this.tableDataEnd1.push(this.tableData1[i])
            }
          }else{
            this.tableDataEnd1=this.tableData1;
          }
        },
        refresh2(){
          this.search2="";
          this.currentPage2=1;
          this.tableDataEnd2=[];
          if(this.total2>this.pageSize2){
            for(let i=0;i<this.pageSize2;i++){
              this.tableDataEnd2.push(this.tableData2[i])
            }
          }else{
            this.tableDataEnd2=this.tableData2;
          }
        },
        handleCurrentChange1(val){
            this.currentPage1=val;
            let from = (this.currentPage1-1)*this.pageSize1;
            let to =this.currentPage1*this.pageSize1;
            this.tableDataEnd1=[];
            if(this.total1<this.pageSize1){

              this.tableDataEnd1=this.tableData1;
            }else{

              for(;from<to;from++){
                if(this.tableData1[from]){
                  this.tableDataEnd1.push(this.tableData1[from]);
                }
              }
            }
        },
        handleCurrentChange2(val){
          this.currentPage2=val;
          let from = (this.currentPage2-1)*this.pageSize2;
          let to = this.currentPage2*this.pageSize2;
          this.tableDataEnd2=[];
          if(this.total2<this.pageSize2){
            this.tableDataEnd2=this.tableData2;

          }else{
            for(;from<to;from++){
              if(this.tableData2[from]){
                this.tableDataEnd2.push(this.tableData2[from]);
              }
            }
          }
        },
        starttodiagnose(row,col){

          this.patient.gender=row.gender;
          this.patient.medicalrecordid=row.medicalrecordid;
          this.patient.name=row.name;
          this.patient.diagnosestate=row.diagnosestate;
          this.patient.registid=row.registid;
          this.patient.age=row.age;
          this.$message({
            message:'开始诊断'+row.name,
            duration:500
          });
        },

        showDetail(index, row) {
          this.p.gender=row.gender;
          this.p.medicalrecordid=row.medicalrecordid;
          this.p.name=row.name;
          this.p.diagnosestate=row.diagnosestate;
          this.p.registid=row.registid;
          this.p.age=row.age;
          this.patientdetailvisiable=true;


        }
      },
      created() {
          if(this.total1>this.pageSize1){
            for(let i=0;i<this.pageSize1;i++){
              this.tableDataEnd1.push(this.tableData1[i])
            }
          }else{
            this.tableDataEnd1=this.tableData1;
          }

        if(this.total2>this.pageSize2){
          for(let i=0;i<this.pageSize2;i++){
            this.tableDataEnd2.push(this.tableData2[i])
          }
        }else{
          this.tableDataEnd2=this.tableData2;
        }
      }
    }
</script>

<style scoped>

</style>
