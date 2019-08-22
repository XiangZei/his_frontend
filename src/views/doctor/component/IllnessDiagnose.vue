<template>
  <div>
    <el-row :gutter="20" style="margin-top: 5px;width: 30%;">
      <el-col :span="10"><div class="grid-content bg-purple">评估/诊断</div></el-col>
      <el-col :span="4" v-show="cansee11"><div class="grid-content bg-purple"><el-link  @click="choosetype1">中医</el-link></div></el-col>
      <el-col :span="4" v-show="cansee22" ><div class="grid-content bg-purple"><el-link @click="choosetype2">西医</el-link></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"><el-link @click="refresh">刷新</el-link></div></el-col>
    </el-row>

    <el-container v-show="cansee1">
      <el-main style="padding-left: 0px;padding-right: 0px; padding-top: 4px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header"  style="text-align: left;height: 7px;">
            <span>中医诊断</span>
            <el-button style="float: right; padding: 3px 5px"  type="text" @click="delill">删除</el-button>
            <el-button style="float: right; padding: 3px 5px"  type="text" @click="visible = true">增加</el-button>
          </div>
          <div >
            <el-table
              ref="multipleTable"
              :data="diagnoseill"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
              >
              </el-table-column>
              <el-table-column
                prop="icdcode"
                label="ICD编码"
              >
              </el-table-column>
              <el-table-column
                prop="illname"
                label="名称">
              </el-table-column>
              <el-table-column  align="right"
                                label="发病日期">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
    </el-container>

    <el-container v-show="cansee2">
      <el-main style="padding-left: 0px;padding-right: 0px; padding-top: 4px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header"  style="text-align: left;height: 7px;">
            <span>西医诊断</span>
            <el-button style="float: right; padding: 3px 5px" :disabled="true"  type="text">删除</el-button>
            <el-button style="float: right; padding: 3px 5px" type="text">增加</el-button>
          </div>
          <div >
            <el-table
              :data="diagnoseill"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
              >
              </el-table-column>
              <el-table-column
                prop="code"
                label="ICD编码"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称">
              </el-table-column>
              <el-table-column  align="right"
                                label="发病日期">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              small
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </el-card>
      </el-main>
    </el-container>


    <el-dialog
      title="选择疾病信息"
      :visible.sync="visible"
      width="30%">
      <el-row :gutter="10" style="margin-left: 69px;">
        <el-col :span="12">
          <el-select v-model="cataid" filterable placeholder="请选择疾病分类" @change="searchIll">
            <el-option
              v-for="item in catalist"
              :key="item.cataid"
              :label="item.cataname"
              :value="item.cataid">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table size="mini" :stripe=true border height="250"
                :data="illList"
                style="width: 100%">
        <el-table-column
          label="疾病助记码"
          prop="illcode">
        </el-table-column>
        <el-table-column
          label="疾病名称"
          prop="illname">
        </el-table-column>
        <el-table-column
          label="ICD编码"
          prop="icdcode">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                @click="addill(scope.$index, scope.row)">添加疾病</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getIllnessCata,searchill} from '@/api/diagnose'
    export default {
      name: "IllnessDiagnose",
      props:{
        diagnoseill:{
          type:Array
        }
      },
      data(){
          return{
            visible:false,
            cataid:"",
            // "cataid": 95,
            // "cataname": "感染"
            catalist:[
              // {
              //   cataname:"败血症",
              //   cataid:""
              // }
            ],
            // "illcode": "SH",
            // "illname": "伤寒",
            // "icdcode": "A01.001"
            // "illid":1
            illList:[],
            diagnosetype:1,
            cansee1:false,
            cansee2:false,
            cansee11:true,
            cansee22:true,
            multipleSelection: []
          }
      },
      methods:{
        addill(index,row){
          this.diagnoseill.push({
            illname:row.illname,
            icdcode:row.icdcode,
            illid:row.illid,
            illcode:row.illcode,
            diagnosetype:this.diagnosetype
          });
          this.$message({
            message:'成功增添疾病：'+row.illname,
            type:'success',
            duration:900
          })
        },
        delill(){

          for(var a in this.multipleSelection){
            var index=-1;
            for (var i = 0; i < this.diagnoseill.length; i++) {
              if (this.diagnoseill[i].illid=== this.multipleSelection[a].illid) index = i;
            }
            if (index > -1) {
              this.diagnoseill.splice(index, 1);
            }
          }
        },
        searchIll(val){
          searchill(val).then(response=>{
            this.illList = response.data;
            this.$message({
              message:"疾病信息拉取成功",
              type:'success',
              duration:500
            })
          }).catch(error=>{
            console.log(error.message);
          })
        },
        refresh(){
          this.cansee1=false;
          this.cansee2=false;
          this.cansee11=true;
          this.cansee22=true;
        },
        choosetype1(){
          this.cansee1=true;
          this.cansee22=false;
          //拉取中医诊断疾病列表中的疾病
          getIllnessCata().then(response=>{
            this.catalist = response.data;
            console.log("病人信息拉取成功")
          }).catch(error=>{
            console.log("疾病信息拉取失败")
          })
          this.diagnosetype=1
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        choosetype2(){
          this.cansee2=true;
          this.cansee11=false;
        }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
