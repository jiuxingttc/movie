<template>
    <div>
      <div class="background1">
        <img :src="imgSrc" />
      </div>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">电影推荐系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginUser.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')">登  录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { ElMessage } from "element-plus";
import axios from 'axios';
import * as types from '@/store/types'
export default {
  name: "login",
  data() {
    return {
      imgSrc: require("@/assets/bj.jpg"),
      loginUser: {
        username: "",
        password: ""
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post("/api/users/login", this.loginUser).then(res => {
            // 登录成功
            ElMessage.success({
                message:'登录成功！',
                type:"success"
            })
            const { token } = res.data;
            localStorage.setItem("eleToken", token);

            // 解析token
            const decode = jwt_decode(token);
            console.log(decode)

            // 存储数据
            // this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.commit(types.SET_AUTHENTICATED, !this.isEmpty(decode));
            // this.$store.dispatch("setUser", decode);
            this.$store.commit(types.SET_USER, decode);

            // 页面跳转
            this.$router.push("/");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style>
.background1{
    width:100%;  
    height:100%;  
    z-index:-1;
    position: absolute;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
.form_container {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 30%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-size: 26px;
  color: rgb(51, 4, 4);
}
.loginForm {
  margin-top: 40px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>



