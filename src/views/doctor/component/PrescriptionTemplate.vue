<template>
    <el-row style="height: 100%;" :gutter="10">
      <el-col :span="8">
        <el-card shadow="hover" class="box-card" :body-style="{ padding: '1px' }" >
          <div style="text-align: left;">
            <el-row :gutter="10">
              <el-col :span="6"><div style="text-align: center;margin-top: 10px;">名称：</div></el-col>
              <el-col :span="9"><el-input v-model="temp_prescriptionname" placeholder="请输入处方名称"  prefix-icon="el-icon-search"></el-input></el-col>
              <el-col :span="8"><el-button type="primary" @click="filterprescription">查询</el-button></el-col>
            </el-row>
          </div>
          <el-table
            @row-dblclick="show_temp_detail"
            size="mini"
            :data="show_temp_prescriptionlist"
            >
            <el-table-column
              prop="name"
              label="模板名称"
              >
            </el-table-column>
            <el-table-column
              prop="scope"
              label="范围"
             >
            </el-table-column>

          </el-table>
        </el-card>

      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" class="box-card" :body-style="{ padding: '1px' }" >
          <div style="text-align: left;">
            <el-row >
             <el-col :span="6"><el-alert type="success" style=" padding: 7px 15px" :closable="false">处方模板明细</el-alert></el-col>
              <el-col :span="18"><el-alert type="success" style=" padding: 5px 15px;" :closable="false"><el-link  style="text-align: right;" :underline="false" icon="el-icon-position" @click="usetemplate">使用该模板</el-link></el-alert></el-col>
            </el-row>

          </div>
        <el-table
          size="mini"
          :data="temp_prescriptiondetaillist"
          style="width: 100%">
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
            label="费用">
          </el-table-column>
          <el-table-column
            prop="usage"
            label="用法">
          </el-table-column>
          <el-table-column
            prop="uselevel"
            label="用量">
          </el-table-column>
          <el-table-column
            prop="freq"
            label="频次">
          </el-table-column>
        </el-table>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
  import {getPrescriptionList,getprescriptionDetail} from '@/api/diagnose'
    export default {
        name: "PrescriptionTemplate",
      props:{
        prescriptiondetaillist: {
          type: Array
        },
        prescriptionlist:{
          type: Array
        }
      },
      data(){
          return{
            name:"",
            temp_prescriptionname:"",
            temp_prescriptionlist:[],
            temp_prescriptiondetaillist:[],
            show_temp_prescriptionlist:[]
          }
      },
      methods:{
        usetemplate(){
          if(this.name!==""){

            var pname = "模板:"+this.name;
            for(var a in this.prescriptionlist){
              if(this.prescriptionlist[a]==pname){
                this.$message.error("该处方模板已增加，不可重复添加")
                return;
              }
            }
            this.prescriptionlist.push({
                prescriptionname:"模板:"+this.name,
                status:"未开立"
            });
            // "drugid": 60,
            //   "drugname": "重组人粒细胞(特尔立)巨噬细胞集落冻干粉针",
            //   "drugstd": "150ug×1瓶",
            //   "drugfee": 32.97,
            //   "usage": "22",
            //   "uselevel": "22",
            //   "freq": "22"
            for(var a in this.temp_prescriptiondetaillist){
              var drugdetail = this.temp_prescriptiondetaillist[a];

              this.prescriptiondetaillist.push({
                drugid:drugdetail.drugid,
                prescriptionname:pname,
                drugname:drugdetail.drugname,
                drugstd:drugdetail.drugstd,
                drugfee:drugdetail.drugfee,
                usage:drugdetail.usage,
                uselevel:drugdetail.uselevel,
                freq:drugdetail.freq,
                num:1
              })
            }
          }else{
            this.$message({
              message: '请先选择处方模板',
              type: 'warning'
            });
          }
        },
        filterprescription(){
          this.show_temp_prescriptionlist = this.temp_prescriptionlist.filter(data=>{
            return data.name.indexOf(this.temp_prescriptionname)>-1
          })
        },
        show_temp_detail(row){
          this.name=row.name;
          getprescriptionDetail(row.prescriptiontemplateid).then(response=>{
            this.temp_prescriptiondetaillist=[];
            this.temp_prescriptiondetaillist=response.data;
          }).catch(error=>{
            console.log(error.message)
          })
        }
      },
      created() {
          getPrescriptionList().then(response=>{
            var data = response.data;
            this.temp_prescriptionlist = data;
            this.show_temp_prescriptionlist = data;
          }).catch(error=>{
            console.log(error.message)
          })
      }
    }
</script>

<style scoped>

</style>
