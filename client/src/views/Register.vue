<template>
  <div>
    <div class="background1">
      <img :src="imgSrc" />
    </div>
    <div class="register">
      <section class="form_container">
        <div class="manage_tip">
          <span class="title">电影推荐系统</span>
          <el-form
            :model="registerUser"
            :rules="rules"
            ref="registerForm"
            label-width="80px"
            class="registerForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="registerUser.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerUser.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input
                type="password"
                v-model="registerUser.password2"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="registerUser.sex">
                <el-radio label="男" value="男"></el-radio>
                <el-radio label="女" value="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="喜好类型">
              <el-checkbox-group v-model="registerUser.hobby">
                <el-checkbox label="剧情" name="hobby"></el-checkbox>
                <el-checkbox label="喜剧" name="hobby"></el-checkbox>
                <el-checkbox label="动作" name="hobby"></el-checkbox>
                <el-checkbox label="爱情" name="hobby"></el-checkbox>
                <el-checkbox label="科幻" name="hobby"></el-checkbox>
                <el-checkbox label="悬疑" name="hobby"></el-checkbox>
                <el-checkbox label="历史" name="hobby"></el-checkbox>
                <el-checkbox label="动画" name="动画"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择身份">
              <el-select v-model="registerUser.role" placeholder="请选择身份">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('registerForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
    imgSrc: require("@/assets/bj.jpg"),
      registerUser: {
        username: "",
        password: "",
        password2: "",
        sex: "",
        hobby: [],
        role: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 16,
            message: "长度需在2-16位之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度需在3-10位之间",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度需在3-10位之间",
            trigger: "blur",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证通过
          axios.post("/api/users/register", this.registerUser).then((res) => {
            ElMessage.success({
              message: "注册成功",
              type: "success",
            });
            this.$router.push("/login");
          });
        } else {
          console.log("error 没有通过校验");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.background1{
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
.register {
  position: relative;
  width: 100%;
  height: 100%;
}

.form_container {
  width: 500px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-weight: bold;
  font-size: 26px;
  color: rgb(46, 2, 2);
}

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  height:600px;
}
</style>

