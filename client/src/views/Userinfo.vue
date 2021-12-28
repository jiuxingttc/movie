<template>
  <div class="info">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-descriptions
            class="margin-top"
            title="个人信息"
            :column="1"
            border
          >
            <template #extra> </template>
            <el-descriptions-item label-class-name="cn">
              <template #label>用户昵称</template>
              {{ user.username }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>性别</template>
              {{ user.sex }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>偏好</template>
              {{ user.hobby }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>用户权限</template>
              {{ user.role }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人评分评价</span>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="moviename" label="电影名称" width="150" />
            <el-table-column prop="score" label="评分" width="100" />
            <el-table-column prop="comment" label="评论" width="150" />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  @click="deleteUm(scope.row.moviename)"
                  type="primary"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
      let that = this;
      axios.get('/ums/getUm').then(res=>{
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
    deleteUm(moviename){
      axios.post(`/ums/deleteUm/${moviename}`).then(res=>{
        ElMessage.success({
          message:'删除成功!',
          type:"success"
        })
        let that = this;
       axios.get('/ums/getUm').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
        })
      })
    }
  }
};
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.cn {
  width: 200px;
}
.box-card {
  height: 600px;
}
</style>
