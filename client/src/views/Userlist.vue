<template>
<div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="username" label="用户名" width="150" />
    <el-table-column prop="sex" label="性别" width="150" />
    <el-table-column prop="hobby" label="爱好" width="150" />
    <el-table-column prop="role" label="权限" width="150" />
    <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="updateUser(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteUser(scope.row.username)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="编辑用户信息">
     <el-form :model="user">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="user.sex">
                        <el-radio label="男" value="男"></el-radio>
                        <el-radio label="女" value="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="喜好类型">
                    <el-checkbox-group v-model="user.hobby">
                        <el-checkbox label="剧情" name="hobby"></el-checkbox>
                        <el-checkbox label="喜剧" name="hobby"></el-checkbox>
                        <el-checkbox label="动作" name="hobby"></el-checkbox>
                        <el-checkbox label="爱情" name="hobby"></el-checkbox>
                        <el-checkbox label="科幻" name="hobby"></el-checkbox>
                        <el-checkbox label="悬疑" name="hobby"></el-checkbox>
                        <el-checkbox label="历史" name="hobby"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                 <el-form-item label="选择身份">
                    <el-select v-model="user.role" placeholder="请选择身份">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="用户" value="role"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="update">修改</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from "element-plus";
export default {
  created() {
      let that = this;
      axios.get('/users/alluser').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
  },
  data() {
    return {
      dialogFormVisible: false,
      user:{
        username:'',
        sex:'',
        hobby:[],
        role:''
      },
      formLabelWidth: '120px',
      tableData: [],
    }
  },
  methods:{
    updateUser(row) {
      let that = this;
      that.dialogFormVisible = true;
      this.user = row;
    },
    update(){
      axios.post(`/users/edituser/${this.user.username}`,this.user).then(res=>{
        this.dialogFormVisible = false;
        ElMessage.success({
          message:'修改成功!',
          type:"success"
        })
      })
    },
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
