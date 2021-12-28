<template>
<div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="用户名" width="150" />
    <el-table-column prop="moviename" label="电影名称" width="150" />
    <el-table-column prop="score" label="评分" width="150" />
    <el-table-column prop="comment" label="评论" width="150" />
    <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="deleteUser(scope.row.username)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from "element-plus";
export default {
  created() {
      let that = this;
      axios.get('/ums//getScore').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
  },
  data() {
    return {
      tableData: [],
    }
  },
  methods:{
    deleteUser(username){
      axios.post(`/users/deleteuser/${username}`).then(res=>{
        ElMessage.success({
          message:'删除成功!',
          type:"success"
        })
        let that = this;
        axios.get('/users/alluser').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
        })
      })
    }
  }
}
</script>
