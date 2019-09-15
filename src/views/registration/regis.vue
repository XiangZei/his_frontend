<template>
    <div>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="4">
          <el-button v-on:click="clearmsg">清空表单数据</el-button>
        </el-col>
      </el-row>
        <el-form   size="medium" ref="form" :model="form" :rules="formRules"  label-width="100px">

            <el-row>
                    <el-col :span="7">
                        <el-form-item label="病历号">
                            <el-autocomplete   popper-class="my-autocomplete" placeholder="输入病历号查找" v-model="form.medicalNum" :fetch-suggestions="querySearch"
                            @select="getPatientMsg" :disabled="canEdit">
                                <i  class="el-icon-edit el-input__icon"
                                    slot="suffix">
                                </i>
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.inde }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="挂号ID">
                            <el-input
                                placeholder="待显示"
                                v-model="form.registNum"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item  label="发票号">
                            <el-input
                                placeholder="待显示"
                                v-model="form.invoiceNum"
                                :disabled="true">
                                </el-input>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>

                    <el-col :span="7">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入内容" style="width:219px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="性别" prop="gender" >
                            <el-radio-group v-model="form.gender">
                                <el-radio v-for="item in baseData.gender" v-bind:key="item.inde" :label="item.inde">{{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="年龄" prop="age">
                                <el-input v-model="form.age" placeholder="请输入内容">
                                </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" v-show=false>
                        <el-form-item style="">
                            <el-select v-model="form.ageType" placeholder="岁">
                                <el-option v-for="item in baseData.ageType" v-bind:key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

            </el-row>
            <el-row>

                    <el-col :span="7">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期" @change="getage">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="身份证号" prop="idNumber">
                            <el-input
                            type="text"
                            placeholder="请输入内容"
                            v-model="form.idNumber"
                            maxlength="18"
                            show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="家庭住址" prop="address">
                            <el-input type="text" v-model="form.address"></el-input>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>

                    <el-col :span="7">
                        <el-form-item label="结算类别" prop="settlementType">
                            <el-select v-model="form.settlementType" placeholder="请选择结算类别">
                                <el-option v-for="item in baseData.settlementType" v-bind:key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="看诊日期" prop="date1">
                            <el-date-picker
                                v-model="form.date1"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="午别" prop="apm">
                            <el-select v-model="form.apm" placeholder="请选择午别">
                                <el-option v-for="item in baseData.apm" v-bind:key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

            </el-row>
            <el-row>

                    <el-col :span="7">
                        <el-form-item label="号别" prop="regType">
                            <el-select v-model="form.regType" placeholder="请选择挂号级别" @change="getDocList">
                                <el-option v-for="item in baseData.regType" v-bind:key="item.inde" :label="item.label" :value="item.inde"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="科室" prop="depName">
                            <el-select  filterable v-model="form.depName" placeholder="请选择科室名称" @change="getDocList">
                                <el-option v-for="item in baseData.depMsg" v-bind:key="item.label" :label="item.label" :value="item.inde"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="医生" prop="docName">
                            <el-select v-model="form.docName" placeholder="请选择医生姓名" @change="getLeft">
                                <el-option v-for="item in baseData.docList" v-bind:key="item.inde" :label="item.label" :value="item.inde"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

            </el-row>
            <el-row>

                    <el-col :span="7">
                        <el-form-item label="初始号额">
                            <el-input
                                placeholder="待显示"
                                v-model="form.initNum"
                                :disabled="true">
                                </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="已用号额">
                            <el-input
                                placeholder="待显示"
                                v-model="form.left"
                                :disabled="true">
                                </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="病历本" prop="medicalRecord">
                            <el-switch
                                v-model="form.medicalRecord"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>

            </el-row>
            <el-row>

                    <el-col :span="7">
                        <el-form-item label="应收金额" prop="fee">
                            <el-input
                                placeholder="待显示"
                                v-model="form.fee"
                                :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="收费方式" prop="chargeType">
                            <el-select  filterable v-model="form.chargeType" placeholder="选择收费方式">
                                <el-option v-for="item in baseData.chargeType" v-bind:key="item.label" :label="item.label" :value="item.inde"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item size="large">
                            <el-button type="primary" @click.native.prevent="onSubmit">立即创建</el-button>
                        </el-form-item>
                    </el-col>

            </el-row>


        </el-form>

    </div>
</template>
<script>
import {getdoclist,getrequiremsg,getpatientmsg,getleft,regis} from '@/api/registration'
export default {
    name:"regis",
    data(){
        return{
            canEdit:false,
            form:{
                gender:"",
                regType:"",
                depName:"",
                docName:"",
                medicalNum:'',
                name:"",
                ageType:"岁",
                age:"",
                birthday:"",
                idNumber:"",
                address:"",
                settlementType:"",
                date1:"",
                apm:"",
                initNum:"",
                left:"",
                medicalRecord:false,
                fee:"",
                chargeType:"",
                registNum:"",
                invoiceNum:"",
                registor:""
            },
            formRules:{
                gender:[{required:true,trigger:'blur'}],
                regType:[{required:true,trigger:'blur'}],
                name:[{required:true,trigger:'blur'}],
                depName:[{required:true,trigger:'blur'}],
                docName:[{required:true,trigger:'blur'}],
                age:[{required:true,trigger:'blur'}],
                birthday:[{required:true,trigger:'blur'}],
                idNumber:[{required:true,trigger:'blur'}],
                address:[{required:true,trigger:'blur'}],
                settlementType:[{required:true,trigger:'blur'}],
                date1:[{required:true,trigger:'blur'}],
                apm:[{required:true,trigger:'blur'}],
                chargeType:[{required:true,trigger:'blur'}]
            },
            baseData:{
                    "gender": [],
                    "regType": [],
                    "depMsg": [],
                    "docList": [],
                    "medicalNum":[],
                    "ageType":[
                        {"label":"岁"},
                        {"label":"月"}
                    ],
                    "settlementType":[
                        {"label":"自费"},
                        {"label":"医保"},
                        {"label":"新农合"},
                        {"label":"公费"}
                    ],
                    "apm":[
                        {"label":"上午"},
                        {"label":"下午"}
                    ]
                }
        }
    },
    /**
     * "regType":
     * [{"inde": 1,
        "fee": 50,
        "label": "专家号",
        "limi": 20}]
     */
    methods:{
        onSubmit(){
            this.form.registor = this.$store.state.user.id;
            this.$refs.form.validate(validate=>{
                if(validate){
                    regis(this.form).then(response=>{
                            var data = response.data;
                            this.form.registNum =data.registNum;
                            this.form.medicalNum = data.medicalNum.toString();
                            this.form.invoiceNum = data.invoiceNum;

                            this.$alert(this.form.name+'\n挂号ID为：'+data.registNum+'\n发票号为：'+data.invoiceNum+'\n病历号: '+data.medicalNum,
                            '挂号成功',{
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'success',
                                message: `确认成功`
                                });
                            }
                            });
                    }).catch(error=>{
                        alert(error.message)
                    })
                }
            })
        },
        getLeft(){
            getleft(this.form.docName).then(response=>{
                this.form.left = response.data;
            }).catch(error=>{
                alert(error.message)
            })
        },
        getDocList(){
            if(this.form.depName==""||this.form.regType==""){
                return
            }
            if(this.form.regType!==""){
                var a= this.baseData.regType
                .filter((te)=>{return te.inde===this.form.regType;})[0];
                this.form.initNum  = a.limi;
                this.form.fee = a.fee;
            }
            getdoclist(this.form.depName,this.form.regType).then(response=>{
                var data = response.data;
                this.baseData.docList = data;
            }).catch(error=>{
                alert(error.message);
            })
        },
        getPatientMsg(item){
            this.form.medicalNum = item.inde;
            getpatientmsg(item.inde).then(response=>{
                var data = response.data;
                this.form.name = data.name;
                this.form.gender = data.gender;
                this.form.birthday = data.birthday;
                this.form.idNumber = data.idNumber;
                this.form.address = data.address;
                this.getage();
            }).catch(error=>{
                alert(error.message)
            })
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
        clearmsg(){
            for(var key in this.form){
                this.form[key]='';
            }
            this.form["medicalRecord"]=false;
            this.form["ageType"]="岁";
        },
        getage() {
                var birthdays = new Date(this.form.birthday.replace(/-/g, "/"));
                var d = new Date();
                var age =
                    d.getFullYear() -
                    birthdays.getFullYear() -
                    (d.getMonth() < birthdays.getMonth() ||
                    (d.getMonth() == birthdays.getMonth() &&
                    d.getDate() < birthdays.getDate())
                    ? 1
                    : 0);
                this.form.age= age;
            }
    },
    mounted(){
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

</style>
