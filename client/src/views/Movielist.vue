<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="expand">
        <template #default="props">
            <p>导演: {{ props.row.director }}</p>
            <p>演员: {{ props.row.actor}}</p>
            <p>上映时间: {{ props.row.time }}</p>
        </template>
    </el-table-column>
    <el-table-column prop="rank" label="排名" width="100" />
    <el-table-column prop="name" label="电影" width="100" />
    <el-table-column prop="type" label="类型" width="100" />
    <el-table-column prop="point" label="豆瓣评分" width="100" />
    <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="updateMusic(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteMusic(scope.row.song)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
export default {
  created() {
      let that = this;
      axios.get('/movies/allmovie').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
  },
  data() {
    return {
      tableData: [],
    }
  },
}
</script>
