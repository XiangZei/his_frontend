<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="2"> <el-link class="textleft color pos" @click="getDiagnose" >门诊诊断</el-link></el-col>
      <el-col :span="22"><div class="textleft color pos">{{diagnosemsg}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"><el-link @click="dialogVisible = true">增方</el-link></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"><el-link @click="deletepre">删方</el-link></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"><el-link @click="openpre" :disabled="show">开立</el-link></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"><el-link @click="cancel">作废</el-link></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple-light"><el-link>刷新</el-link></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple" style="text-align: right"  ><el-link @click="beforeadddrug" :disabled="show">增药</el-link></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-light"style="text-align: left;padding-left: 30px;"><el-link @click="deletedrug" :disabled="show">删药</el-link></div></el-col>

    </el-row>

    <el-row >
     <el-col :span="8">
       <el-card shadow="hover" class="box-card" :body-style="{ padding: '1px' }" >
          <div style="text-align: left;">
            <span><el-alert type="success" style=" padding: 7px 15px" :closable="false">门诊处方</el-alert></span>
          </div>
          <div >
            <el-table
              :data="prescriptionlist"
              size="mini"
              @row-dblclick="changprescriptionname"
            @selection-change="handleSelectPrescription">
              <el-table-column
                type="selection">
              </el-table-column>
              <el-table-column
                prop="prescriptionname"
                label="处方名称"
                >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                >
              </el-table-column>
            </el-table>
          </div>
       </el-card>
     </el-col>
      <el-col :span="16">
        <el-card   shadow="hover" class="box-card" :body-style="{ padding: '1px' }">
          <div style="text-align: left">
            <el-row>
              <el-col :span="6">
                <span>
                <el-alert
                  title="本次处方合计"
                  type="success"
                  :closable="false">
                </el-alert>
              </span>
              </el-col>
              <el-col :span="3">
                <span >
                  <el-alert
                    :title="prescriptionfee.toString()"
                    type="warning"
                    :closable="false">
                </el-alert>
            </span>
              </el-col>
              <el-col :span="9">
                <span >
                  <el-alert
                    :title="'处方名称：'+prescriptionname"
                    type="warning"
                    :closable="false">
                </el-alert>
            </span>
              </el-col>

            </el-row>

          </div>
          <div  >
            <el-table
              :data="prescriptiondetaillistcomputed"
              size="mini"
              @selection-change="handledrug"
            >
              <el-table-column
                type="selection">
              </el-table-column>
              <el-table-column
                prop="drugname"
                label="药品名称"
              >
              </el-table-column>
              <el-table-column
                prop="drugstd"
                label="规格"
              >
              </el-table-column>
              <el-table-column
                prop="drugfee"
                label="单价"
              >
              </el-table-column>
              <el-table-column
                prop="usage"
                label="用法"
              >
              </el-table-column>
              <el-table-column
                prop="uselevel"
                label="用量"
              >
              </el-table-column>
              <el-table-column
                prop="freq"
                label="频次"
              >
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
              >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="changedrug(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <el-tabs type="card" v-model="activeName" >
      <el-tab-pane label="处方模板" name="first">
        <prescription-template :prescriptionlist="prescriptionlist" :prescriptiondetaillist="prescriptiondetaillist"></prescription-template>
      </el-tab-pane>
      <el-tab-pane label="常用药品" name="second">配置管理</el-tab-pane>
    </el-tabs>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span><el-input v-model="newprescriptionname" placeholder="请输入新的处方名称"></el-input></span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addprescription">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="添加药品"
      :visible.sync="adddrugVisible"
      width="30%">
      <el-row :gutter="10" style="margin-left: 69px;">
       <el-col :span="12">
         <el-input v-model="drugcode" placeholder="请输入药品助记码" @keyup.enter.native="searchdrug(drugcode)"></el-input>
       </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="searchdrug(drugcode)">搜索</el-button>
      </el-col>
      </el-row>
      <el-table size="mini" :stripe=true border height="250"
                :data="druglist"
                style="width: 100%">
        <el-table-column
          label="药品名称"
          prop="drugname">
        </el-table-column>
        <el-table-column
          label="规格"
          prop="drugstd">
        </el-table-column>
        <el-table-column
          label="费用"
          prop="drugfee">
        </el-table-column>
        <el-table-column
        label="药品助记码"
        prop="code">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                @click="adddrug(scope.$index, scope.row)">添加药品</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="adddrugVisible = false">取 消</el-button>
        <el-button type="primary" @click="adddrugVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="药品使用及数量"
      :visible.sync="drugusageVisible"
      width="30%">
      <el-row :gutter="10">
       <el-col :span="24" style="text-align: center;">{{row.drugname}}</el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 10px;">
        <el-col :span="6">
          <el-select v-model="row.usage" filterable placeholder="用法">
            <el-option label="口服" value="口服"></el-option>
            <el-option label="外敷" value="外敷"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="row.uselevel" filterable placeholder="用量">
            <el-option label="1勺" value="1勺"></el-option>
            <el-option label="2勺" value="2勺"></el-option>
            <el-option label="10g" value="10g"></el-option>
            <el-option label="20g" value="20g"></el-option>
            <el-option label="15g" value="15g"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="row.freq" filterable placeholder="频次">
            <el-option label="一日三次" value="一日三次"></el-option>
            <el-option label="一日二次" value="一日二次"></el-option>
            <el-option label="一日一次" value="一日一次"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="row.num" filterable placeholder="数量">
            <el-option
              v-for="item in 10"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="drugusageVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmdrugdetail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import PrescriptionTemplate from './PrescriptionTemplate'
  import {openpre,filldetail,cancel,searchdrug,getdiagnose} from '@/api/diagnose'
    export default {
      name: "PrescriptionPane",
      components:{PrescriptionTemplate},
      props:{
        patient:{
          type:Object,
          default:()=>{
            return{
              gender:"",
              medicalrecordid:"",
              name:"",
              diagnosestate:"",
              registid:"",
              age:""
            }
          }
        }
      },
      data(){
        return{
          drugusageVisible:false,
          drugcode:"",
          show:false,
          adddrugVisible:false,
          newprescriptionname:"",
          diagnosemsg:"",
          activeName:"first",
          prescriptionname:"",
          prescriptionlist:[
            // {
            // prescriptionname:"感冒1",
            // status:"未开立"
            // },
            // {
            //   prescriptionname:"感冒2",
            //   status:"未开立"
            // },
            // {
            //   prescriptionname:"感冒2",
            //   status:"未开立"
            // }
          ],
          //   prescriptionname:"感冒2",
          //   status:"未开立"
          prescriptiondetaillist:[
            // {
            //   drugid:1,
            //   prescriptionname:"感冒1",
            //   drugname:"注射用甲氨喋呤",
            //   drugstd:"25g/瓶",
            //   drugfee:10,
            //   usage:"口服",
            //   uselevel:"5g",
            //   freq:"一日二次",
            //   num:10
            // },
            // {
            //   drugid:1,
            //   prescriptionname:"感冒2",
            //   drugname:"注射用甲氨喋呤",
            //   drugstd:"25g/瓶",
            //   drugfee:10,
            //   usage:"口服",
            //   uselevel:"5g",
            //   freq:"一日二次",
            //   num:10
            // },{
            //   drugid:1,
            //   prescriptionname:"感冒2",
            //   drugname:"注射用甲氨喋呤",
            //   drugstd:"25g/瓶",
            //   drugfee:10,
            //   usage:"口服",
            //   uselevel:"5g",
            //   freq:"一日二次",
            //   num:10
            // }
          ],
          //   drugid:1,
          //   prescriptionname:"感冒1",
          //   drugname:"注射用甲氨喋呤",
          //   drugstd:"25g/瓶",
          //   drugfee:10,
          //   usage:"口服",
          //   uselevel:"5g",
          //   freq:"一日二次",
          //   num:10
          druglist:[
            // {
            //   drugid:1,
            //   drugname:"注射用甲氨喋呤",
            //   drugstd:"25g/瓶",
            //   drugfee:10
            // },{
            //   drugid:2,
            //   drugname:"伺机待发",
            //   drugstd:"25g/瓶",
            //   drugfee:10
            // },{
            //   drugid:3,
            //   drugname:"敌敌畏",
            //   drugstd:"25g/瓶",
            //   drugfee:10
            // },{
            //   drugid:4,
            //   drugname:"领事馆",
            //   drugstd:"25g/瓶",
            //   drugfee:10
            // }
          ],
          //   drugid:1,
          //   drugname:"注射用甲氨喋呤",
          //   drugstd:"25g/瓶",
          //   drugfee:10
          dialogVisible:false,
          prescriptionSelection:[],
          drugSelection:[],

          row:{}
        }
      },
      methods:{
        getDiagnose(){
          //拉取处方模板和处方明细信息
          getdiagnose(this.patient.medicalrecordid,this.patient.registid).then(response=>{
            var data = response.data;
            this.diagnosemsg="";
            for(var a in data){
              this.diagnosemsg+=data[a].illname;
            }
          }).catch(error=>{
            console.log(error.message)
          })
        },
        changedrug(row){
          this.row.prescriptionname = row.prescriptionname;
          this.row.drugid=row.drugid;
          this.row.drugname=row.drugname;
          this.row.drugstd=row.drugstd;
          this.row.drugfee=row.drugfee;
          this.row.usage=row.usage;
          this.row.uselevel=row.uselevel;
          this.row.freq=row.freq;
          this.row.num=row.num;
          this.drugusageVisible=true;
          this.drugSelection=[];
          this.drugSelection[0]=row;
          this.deletedrug(row);
        },
        beforeadddrug(){
          if(this.prescriptionname!==""){
            this.adddrugVisible = true;
          }else{
            this.$message.error("请先选择处方再进行开药")
          }
        },
        deletedrug(row){
          for(var a in this.drugSelection){
            var index = -1;
            for (var i = 0; i < this.prescriptiondetaillist.length; i++) {
              if ((this.prescriptiondetaillist[i].prescriptionname === this.drugSelection[a].prescriptionname)&&(this.prescriptiondetaillist[i].drugid === this.drugSelection[a].drugid)) index = i;
            }
            if (index > -1) {
              this.prescriptiondetaillist.splice(index, 1);
            }

          }
        },
        changprescriptionname(row){
          this.prescriptionname=row.prescriptionname;
          if(row.status==="已开立"){
            this.show = true;
          }else{
            this.show = false;
          }
        },
        confirmdrugdetail(){
          this.row.prescriptionname = this.prescriptionname;
          this.prescriptiondetaillist.push({
            drugid:this.row.drugid,
            prescriptionname:this.row.prescriptionname,
            drugname:this.row.drugname,
            drugstd:this.row.drugstd,
            drugfee:this.row.drugfee,
            usage:this.row.usage,
            uselevel:this.row.uselevel,
            freq:this.row.freq,
            num:this.row.num
          });
          for(var e in this.row){
            this.row[e]="";
          }
          this.drugusageVisible = false;
        },
        searchdrug(val){
          console.log("开始搜索药品列表");
          searchdrug(val).then(response=>{
            var data = response.data;
            this.druglist = data;
          }).catch(error=>{
            console.log("搜索药品列表出错误")
          })
        },
        adddrug(index,row){
          this.row.drugid = row.drugid;
          this.row.drugname= row.drugname;
          this.row.drugstd=row.drugstd;
          this.row.drugfee = row.drugfee;
          this.drugusageVisible=true;

        },
        cancel(){
          for(var a in this.prescriptionSelection){
            if(this.prescriptionSelection[a].status==="已开立"){
              this.prescriptionSelection[a].status="已作废"
              cancel(this.prescriptionSelection[a].prescriptionname,this.patient.registid,this.patient.mdeicalrecordid).then(response=>{
                this.$message({
                  message:"处方已经作废",
                  type:'success'
                })
              }).catch(error=>{
                this.$message.error("error")
              })
            }
          }
        },
        addprescription(){
          for(var index in this.prescriptionlist){
            if(this.prescriptionlist[index].prescriptionname===this.newprescriptionname){
              this.$message.error("处方名称重复，请重新输入");
              return
            }
          }
          if(this.newprescriptionname===""){
            this.$message.error("处方名称不能未空，请重新输入");
            return
          }
          this.prescriptionlist.push({
            prescriptionname:this.newprescriptionname,
            status:"未开立"
          });
          this.$message({
            message:"处方添加成功",
            type:"success"
          })
          this.dialogVisible = false
        },
        deletepre(){
          for(var a in this.prescriptionSelection){
            if(this.prescriptionSelection[a].status==="未开立"){
              var index = -1;
              for (var i = 0; i < this.prescriptionlist.length; i++) {
                if (this.prescriptionlist[i].prescriptionname === this.prescriptionSelection[a].prescriptionname) index = i;
              }
              if (index > -1) {
                this.prescriptionlist.splice(index, 1);
                this.prescriptionname="";

              }
            }else if(this.prescriptionSelection[a].status==="已开立"){
              this.$message.error("已开立的处方无法删除");
            }
          }
        },
        openpre(){
          alert("开立处方")
          for(var prescrip in this.prescriptionSelection){
            var docid = localStorage.getItem("name");
            var medicalrecordid = this.patient.medicalrecordid;
            var registid = this.patient.registid;
            alert("处方开立信息：医生id="+docid+"  病历号="+medicalrecordid+"   挂号="+registid+"    处方名称="+this.prescriptionSelection[prescrip].prescriptionname)
            openpre(medicalrecordid,registid,docid,this.prescriptionSelection[prescrip].prescriptionname).then(response=>{
              var data = response.data;
              var id = data.id;
              this.$message({
                message:"成功添加处方",
                type:"success"
              })
              var druglist = this.prescriptiondetaillist.filter(data=>{
                return data.prescriptionname === this.prescriptionSelection[prescrip].prescriptionname
              })
              var er = true;
              for(var drug in druglist){
                filldetail(id,druglist[drug]).then(response=>{
                  this.$message({
                    message:"成功添加药品明细",
                    type:"success"
                  })
                }).catch(error=>{
                  er = false;
                  alert("error")
                })
              }
              if(er){
                this.prescriptionSelection[prescrip].status = "已开立";
                this.show=true;
              }
            }).catch(error=>{
              this.$message.error("处方添加错误")
            })




          }
        },
        handleSelectPrescription(val){
          this.prescriptionSelection=val;
        },
        handledrug(val){
          this.drugSelection = val;
        }
      },
      computed:{
        prescriptiondetaillistcomputed:function(){
          return this.prescriptiondetaillist.filter(data=>{
            return data.prescriptionname===this.prescriptionname;
          })
        },
        prescriptionfee:function () {
          var fee=0;

          for(var key in this.prescriptiondetaillistcomputed){
            fee+=this.prescriptiondetaillistcomputed[key].drugfee
          }
          return fee;
        }
      },
      created() {

      }
    }
</script>

<style scoped>
.textleft{
  text-align: left;
}
  .color{
    background: #0fe2ad;

  }
  .pos{
    border-radius: 4px;
    padding: 2px;
  }
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  padding-top: 5px;
  border-radius: 4px;
  margin-top: 3px;
  min-height: 22px;
}
</style>
