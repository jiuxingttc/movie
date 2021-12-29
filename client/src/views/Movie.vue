<template>
 <div>
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
          <el-button @click="editMovie(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteMovie(scope.row.name)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  <el-dialog v-model="dialogTableVisible" title="评分">
    <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="电影名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="导演">
      <el-input v-model="form.director"></el-input>
    </el-form-item>
    <el-form-item label="主演">
      <el-input v-model="form.actor"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="剧情" name="type"></el-checkbox>
        <el-checkbox label="喜剧" name="type"></el-checkbox>
        <el-checkbox label="动作" name="type"></el-checkbox>
        <el-checkbox label="爱情" name="type"></el-checkbox>
        <el-checkbox label="悬疑" name="type"></el-checkbox>
        <el-checkbox label="冒险" name="type"></el-checkbox>
        <el-checkbox label="历史" name="type"></el-checkbox>
        <el-checkbox label="奇幻" name="type"></el-checkbox>
        <el-checkbox label="动画" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="上映日期">
        <el-date-picker
          v-model="form.time"
          type="date"
          placeholder="选择上映时间"
          style="width: 80%"
        ></el-date-picker>
    </el-form-item>
    <el-form-item label="豆瓣评分">
      <el-input v-model="form.point"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="edit">编辑</el-button>
      <el-button @click="this.dialogTableVisible = false">取消</el-button>
    </el-form-item>
  </el-form>
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
      axios.get('/api/movies/allmovie0').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
  },
  data() {
    return {
      queryString: "",
      dialogTableVisible: false,
      form: {
        name: '',
        director: '',
        actor:'',
        type:[],
        time: '',
        point: '',
      },
      tableData: [],
    }
  },
  methods:{
    editMovie(row) {
      let that = this;
      that.dialogTableVisible = true;
      this.form = row;
    },
    edit(){
      axios.post(`/api/movies/editMovie/${this.form.name}`,this.form).then(res=>{
        this.dialogTableVisible = false;
        ElMessage.success({
          message:'修改成功!',
          type:"success"
        })
      })
    },
    deleteMovie(name){
      axios.post(`/api/movies/deletemovie/${name}`).then(res=>{
        ElMessage.success({
          message:'删除成功!',
          type:"success"
        })
        let that = this;
        axios.get('/api/movies/allmovie0').then(res=>{
          console.log(res.data)
          that.tableData = res.data;
      })
      })
    }
  }
})
</script>
