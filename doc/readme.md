# 基于nodejs+vue+express+mongodb实现的电影推荐系统

### 1.项目设计部分

##### 1.1  项目总体构成：

管理员：管理员可以进行用户管理，上传电影和榜单的管理；

用户：用户通过注册登陆后可以查看推荐榜单，模糊查询电影名称，按照分类查询，对电影进行评分和评价，查看个人信息；

##### 1.2  引入的包的说明：

（1）express : 基于node.js的后端开发框架；

（2）mongoose：操作mongodb；

（3）vue：交互前端框架；

（4）element-plus：前端样式，方便快捷，简化流程；

（5）axios：拦截请求和响应，转换请求数据和响应数据，取消请求，自动转换json数据；

（6）bcrypt：加密工具，加密注册的密码，登录时解密；

（7）jsonwebtoken：创建token，保存登陆的用户信息；

（8）jwt-decode：解析token；

（9)   nodemon：检测项目中的所有文件，一旦发现文件有改动，nodemon会重启；

（10）concurrently：同时运行前后端的命令；

（11）passport ：提供了易于实现的各种不同的请求身份验证策略，和jwt一起验证用户身份

（12）passport-jwt：和passport一起验证token；

（13）core-js：使用API；

（14）vue-router：ue前端的路由；

（15）vuex：管理vue的状态；

##### 1.3  项目目录结构和各个部分的说明

![image-20211228050731606](image-20211228050731606.png)

![image-20211228050932664](image-20211228050932664.png)
