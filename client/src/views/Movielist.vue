<template>
 <div>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="电影名称">
       <el-input v-model="queryString" placeholder="请输入您要查询的电影名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" :default-sort="{ prop: 'point', order: 'descending' }" stripe style="width: 100%">
    <el-table-column type="expand">
        <template #default="props">
            <p>导演: {{ props.row.director }}</p>
            <p>演员: {{ props.row.actor}}</p>
            <p>上映时间: {{ props.row.time }}</p>
        </template>
    </el-table-column>
    <el-table-column prop="name" label="电影" width="150" />
    <el-table-column prop="type" label="类型" width="150" />
    <el-table-column prop="point" label="豆瓣评分" sortable width="100" />
    <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="scoreMovie(scope.row)" type="primary" size="small">评分</el-button>
          <el-button @click="commentMovie(scope.row)" type="primary" size="small">评论</el-button>
        </template>
      </el-table-column>
  </el-table>
  <el-dialog v-model="dialogTableVisible" title="评分">
    <el-rate
    v-model="um.score"
    allow-half
    show-score
  >
  </el-rate>
  <el-button type="success" @click="score" plain>提交</el-button>
  </el-dialog>
  <el-dialog v-model="dialogInputVisible" title="评论">
   <el-input
    v-model="um.comment"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  />
  <el-button type="success" @click="comment" plain>提交</el-button>
  </el-dialog>
 </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from "element-plus";
import { defineComponent, ref } from 'vue'
export default defineComponent({
  created() {
      let that = this;
      axios.get('/movies/allmovie').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
  },
  data() {
    return {
      queryString: "",
      dialogTableVisible: false,
      dialogInputVisible: false,
      tableData: [],
      rateValue:'',
      um:{
        moviename:'',
        score:'',
        comment:''
      },
    }
  },
  methods:{
    query(){
      let that = this;
      axios.get(`/movies/querymovie/${this.queryString}`).then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
    },
    scoreMovie(row) {
      let that = this;
      that.dialogTableVisible = true;
      this.um.moviename = row.name;
      this.um.score = this.um.score;
    },
    score(){
      axios.post(`/ums/score/${this.um.moviename}`,this.um).then(res=>{
        this.dialogTableVisible  = false;
        ElMessage.success({
          message:'提交成功!',
          type:"success"
        })
      })
    },
    commentMovie(row) {
      let that = this;
      that.dialogInputVisible = true;
      this.um.moviename = row.name;
      this.um.comment = this.um.comment;
    },
    comment(){
      axios.post(`/ums/comment/${this.um.moviename}`,this.um).then(res=>{
        this.dialogInputVisible  = false;
        ElMessage.success({
          message:'提交成功!',
          type:"success"
        })
      })
    },
  }
})
</script>
