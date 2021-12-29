<template>
<div>
  <el-button class="type1" type="text" value='剧情' @click="getAll">全部类型</el-button>
  <el-button class="type1" type="text" value='剧情' @click="query('剧情')">剧情</el-button>
  <el-button class="type1" type="text" value='喜剧' @click="query('喜剧')">喜剧</el-button>
  <el-button class="type1" type="text" value='爱情' @click="query('爱情')">爱情</el-button>
  <el-button class="type1" type="text" value='悬疑' @click="query('悬疑')">悬疑</el-button>
  <el-button class="type1" type="text" value='奇幻' @click="query('奇幻')">奇幻</el-button>
  <el-button class="type1" type="text" value='动画' @click="query('动画')">动画</el-button>
  <el-button class="type1" type="text" value='犯罪' @click="query('犯罪')">犯罪</el-button>
  <el-button class="type1" type="text" value='冒险' @click="query('冒险')">冒险</el-button>
  <el-button class="type1" type="text" value='历史' @click="query('历史')">历史</el-button>
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
    <el-table-column prop="point" label="豆瓣评分" sortable />
  </el-table>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue'
import axios from 'axios';
import { ElMessage } from "element-plus";
export default defineComponent({
  created() {
      let that = this;
      axios.get('/api/movies/allmovie').then(res=>{
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
    getAll(){
      let that = this;
      axios.get('/api/movies/allmovie').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
    },
    query(value){
      let that = this;
      axios.get(`/api/movies/query/${value}`).then(res=>{
          that.tableData = res.data;
      })
    }
  }
})
</script>
<style>
.type1 {
  font-size: 20px !important;
  }
</style>
