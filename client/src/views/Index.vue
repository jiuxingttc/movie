<template>
  <el-container style="height: 100%; border: 0px solid #eee">
      <el-header style="text-align: right;color:#fff; font-size: 12px">
        <el-col :span="6" class='logo-container'>
                <span class='title'>电影推荐系统</span>
        </el-col>
         <el-dropdown trigger="click" @command="handleCommand">
          <el-icon style="margin-right: 20px"><setting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command='info'>个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>
          <div class="user">
                <div class='welcome'>
                    <p class='name comename'>欢迎</p>
                    <p class='name avatarname'>{{$store.getters.user.username}}</p>
                </div>
          </div>
        </span>
      </el-header>
      <el-container>
      <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#324057"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :default-openeds="[
        'main',
        'login',
        'register',
        'movielist',
        'movieclass',
        'userlist',
        'movieadd',
        'userinfo',
        'movie'
      ]"
       router="true"
      >
      <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>电影管理</span>
          </template>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="movielist">推荐榜单</el-menu-item>
            <el-menu-item index="movieclass">电影分类</el-menu-item>
            <el-menu-item index="userinfo">个人信息</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
          <span>用户管理</span>
          </template>
            <el-menu-item index="login">用户登录</el-menu-item>
            <el-menu-item index="register">用户注册</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
          <template #title>
             <el-icon><setting /></el-icon>
          <span>管理员</span>
          </template>
            <el-menu-item index="userlist">用户管理</el-menu-item>
            <el-menu-item index="movieadd">上传电影</el-menu-item>
            <el-menu-item index="movie">更新榜单</el-menu-item>
          </el-sub-menu>
      </el-menu>
    </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent} from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
    methods: {
     handleCommand(cmditem) {
      if (!cmditem) {
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/userinfo");
    },
    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      // 页面跳转
      this.$router.push("/login");
    }
    }
  
});
</script>


<style>
.el-header {
  background-color: #324057;
  color: var(--el-text-color-primary);
  line-height: 70px;
}
.el-aside {
  color: #333;
}
.el-menu {
  background-color: #324057;
  width: 250px;
  height: 100vh;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  color: #fff;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 2px;
}
.name {
  line-height: 15px;
  text-align: center;
  font-size: 16px;
}
.comename {
  font-size: 10px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.el-dropdown {
  color: #fff;
}
</style>