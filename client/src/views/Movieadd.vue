<template>
<div>
  <div class="background">
        <img :src="imgSrc" />
      </div>
<el-card class="box-card1">
    <template #header>
      <div class="card-header">
        <span>上传电影</span>
      </div>
    </template>
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
      <el-button type="primary" @click="onSubmit">上传</el-button>
      <el-button @click="resetForm('form')">取消</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      imgSrc: require("@/assets/bj1.jpg"),
      form: {
        name: '',
        director: '',
        actor:'',
        type:[],
        time: '',
        point: '',
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
        axios.post('/api/movies/addmovie',this.form).then(res=>{
            ElMessage.success({
                message:'上传成功！',
                type:"success"
            })
        })
    },
     resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}
</script>
<style>
.background{
    width:1800px;  
    height:500px;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    top: 10%;
    left: 5%;
    padding: 0px;
    position: absolute;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card1 {
  width: 600px;
  position: absolute;
  top: 15%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
</style>