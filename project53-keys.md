## Vue-项目-重点

### day-07-重点

#### 01-项目-准备-项目目录说明

1. src/
2. build/ webpack 相关代码
3. config/ 本地服务器配置
4. .eslintignore eslist 排除文件
5. .eslinttrc eslint 配置文件

#### 02-项目-准备-代码规范-自定义指令-lintfix

1. 结尾没有;
2. 必须用全等
3. 不允许出现未使用的变量
4. 不允许出现一个以上空行

> 在 package.json 中 scripts 自定义指令 : 指令很长
> npm run 自定义指令名(dev)
> npm run lintfix(自动按照规范修正全部(但是, 多余的变量这个 error 不会修正)的 js 代码)
> 自动打开浏览器 dev:'xxxxxx --open'

> 关闭 eslint build/webpack.base.conf.js 注释掉 42 行

#### 03-项目-准备-element-ui-文档分析

> element-ui 是饿了么开发团队
> 适用于 vue 项目-PC 端项目
> 在 main.js 引入

#### 04-项目-准备-element-ui-安装-引入

> npm i element-ui -S
> 在 main.js import
> Vue.use(ElementUI)

#### 05-项目-准备-项目模板简化-调整

> 删除模板中我们用不到的文件/代码

#### 06-项目-准备-git 版本控制

> git/svn

1. git init -> .git
2. git status
3. git add .
4. git commit -m "zhushi"
5. 在代码托管平台(github) 新建远程仓库
6. git remote add origin https://github.com/lzz-dragon/mallmanager53.git
7. git push -u origin master (之后再 push 直接 git push)

#### 07-项目-登录-新建分支-login 组件-配置路由

> 新建一个分支 专门写登录功能
> git branch
> git checkout -b dev-login
> 新建组件+配置路由
> 注意:

1. commit 没完成一个小功能就 commit 一次
2. push 操作 master 去完成

#### 08-项目-登录-引入表单组件

> el-form

1. 引入
2. 调整标签(h2+el-button)
   > label-position="top"

#### 09-项目-登录-样式调整

> height:100%
> 注意: div#app height:100%

#### 10-项目-登录-axios-插件

> axios 不是 Vue 插件 - Vue.use(axios)

```js
// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = Vue => {
  //  添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpServer
```

> 在 main.js 中 导入 之后 Vue.use(插件名)
> 结果: this.\$http.get()

#### 11-项目-登录-发送登录请求

> login.vue methods handleLogin()

1. this.\$http.post('login',this.formdata).then((res)=>{})
2. 对象解构赋值 res.data

```js
const {
  data,
  meta: { msg, status }
} = res.data
```

#### 12-项目-登录-引入提示框组件

> this.\$message.warning(msg)

#### 13-项目-登录-登录成功-进入 home 组件

> 登录成功 -> 来到 home 组件

1. js 编程式导航 this.\$router.push({ name: 'home' })
2. App.vue router-view
3. 新建 home 组件
4. 路由 index.js 配置路由

#### 14-项目-登录-简化登录请求代码-async 和 await

> 让异步代码 ajax 看起来像同步代码

1. 找到异步操作有结果的代码 前面加 await 同时接口异步操作的结果 res
2. 找到距离异步操作有结果的代码最近的方法 前面加 async

```js
async handleLogin() {
      // > 希望 让异步操作的代码 看起来像同步代码
      // ES7 async+await
      const res = await this.$http.post('login', this.formdata)
      // console.log(res)
      const {
        data,
        meta: { msg, status }
      } = res.data

      if (status === 200) {
        // 登录成功
        // 1. 跳转home
        this.$router.push({ name: 'home' })
        // 2. 提示成功
        this.$message.success(msg)
      } else {
        // 不成功
        // 1. 提示消息
        this.$message.warning(msg)
      }
```

#### 15-项目-登录-保存-token 值

> 目的:如果用户没登录->url 直接来到 home 组件
> 在登录成功时 保存正确用户的 token

```js
localStorage.setItem('token', data.token)
```

#### 16-项目-首页-布局容器-使用-样式调整

> 引入布局容器

#### 17-项目-首页-头部-样式调整

> layout 布局
> 行 el-row
> 列 el-col
> 注意: 24 栏

#### 18-项目-首页-侧边栏-导航组件-文档

#### 19-项目-首页-侧边栏-引入导航组件-调整

#### 20-项目-首页-进入首页的权限验证

#### 21-项目-首页-头部-退出功能

#### 22-项目-首页-合并分支-新建用户分支

#### 23-项目-用户管理-用户列表-新建组件-路由配置

### day-08-重点

#### 01-项目-用户管理-用户列表-面包屑和搜索框

#### 02-项目-用户管理-用户列表-引入表格组件

#### 03-项目-用户管理-用户列表-表头处理

#### 04-项目-用户管理-用户列表-请求数据-设置请求头

#### 05-项目-用户管理-用户列表-渲染数据-一般数据

#### 06-项目-用户管理-用户列表-渲染数据-日期格式处理

#### 07-项目-用户管理-用户列表-渲染数据-用户状态开关

#### 08-项目-用户管理-用户列表-渲染数据-操作
