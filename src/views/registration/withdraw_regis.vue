
<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text">患者信息查询</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :span="4" ><div class="grid-content ">病历号</div></el-col>
        <el-col  :span="3"><div ><el-input v-model="input" placeholder="请输入内容"></el-input></div></el-col>
        <el-col :span="3"><div><el-button type="primary" icon="el-icon-search">搜索</el-button></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text">患者信息确认</div></el-col>
      </el-row>
      <el-row :gutter="4">
        <el-col :span="3"><div class="grid-content ">姓名</div></el-col>
        <el-col :span="4"><div class="iinput"><el-input v-model="input" placeholder="" :disabled="true"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content">身份证号</div></el-col>
        <el-col :span="4"><div class="iinput"><el-input v-model="input" placeholder="" :disabled="true"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content">家庭住址</div></el-col>
        <el-col :span="4"><div class="iinput"><el-input v-model="input" placeholder="" :disabled="true"></el-input></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple text">患者挂号信息</div></el-col>
      </el-row>

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
</template>
<script>
export default {
  name:'withdraw_regis',
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      input:"",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
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
