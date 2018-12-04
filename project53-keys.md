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

> el-menu

1. router 开启路由模式 true index 值==path 值
2. unique-opened 是否只保持一个子菜单的展开

#### 19-项目-首页-侧边栏-引入导航组件-调整

> 调整 el-menu
> index 值不能一样

#### 20-项目-首页-进入首页的权限验证

> 如果没有登录过 就不能进入到 home 组件

```js
  // newVue之前自动触发
  beforeCreate() {
    // 获取token
    const token = localStorage.getItem('token')
    if (!token) {
      // token 没有 -> 登录
      this.$router.push({ name: 'login' })
    }
    // if token 有 -> 继续渲染组件
  }
```

#### 21-项目-首页-头部-退出功能

```js
handleSignout() {
      // 1. 清除token
      localStorage.clear()
      // 2. 提示
      this.$message.success('退出成功')
      // 3. 来到login组件
      this.$router.push({ name: 'login' })
    }
```

#### 22-项目-首页-合并分支-新建用户分支

1. 切到 master
2. git merge dev-login 合并分支
3. push
4. 新建 dev-users

#### 23-项目-用户管理-用户列表-新建组件-路由配置

1. home.vue 开启了路由模式 index 值->path 值
2. home.vue main-> router-view
3. 新建 users.vue
4. router/index.js 在 home 中 children 配置 users 的路由

### day-08-重点

#### 01-项目-用户管理-用户列表-面包屑和搜索框

1. el-card 卡片 小容器
2. 面包屑
3. el-row>el-col>el-input+el-button
4. 调整样式

#### 02-项目-用户管理-用户列表-引入表格组件

> el-table(data 数据源[]) > el-table-column(label 表头/prop="数据") > 字符串数据

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期" width="180"> </el-table-column>
  <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
  <el-table-column prop="address" label="地址"> </el-table-column>
</el-table>
```

#### 03-项目-用户管理-用户列表-表头处理

> 按照效果 调整了表头的数量和 label
> type="index" -> 该列的每个单元格的内容从 1 开始的序号

#### 04-项目-用户管理-用户列表-请求数据-设置请求头

1. created(){this.getUserList()}
2. methods:{getUserlist(){发送请求}}
3. 接口文档中 除了登录之外的所有请求都需要进行授权->设置请求头
4. 找 axios 中关于请求头设置的代码

```js
const AUTH_TOKEN = localStorage.getItem('token')
this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

5. 发送请求

#### 05-项目-用户管理-用户列表-渲染数据-一般数据

1. 解构赋值 给 this.userlist = res.data.data.users
2. prop=""
   <!-- username -->
   <!-- email -->
   <!-- mobile -->
   <!-- create_time -->
   <!-- mg_state -->

#### 06-项目-用户管理-用户列表-渲染数据-日期格式处理

1. main.js 全局过滤器 fmtdate
2.

2.1 prop="create_time | fmtdate" 不行!
2.2 单元格的内容只能显示文本

```html
<el-table-column prop="create_time" label="创建时间">
  {{create_time | fmtdate}}
</el-table-column>
```

2.3 需要给该内容外层加容器 template

> 不同组件的数据不是共享 独立作用域

```html
<el-table-column prop="create_time" label="创建时间">
  <tempalte> {{create_time | fmtdate}} </tempalte>
</el-table-column>
```

2.4 最终写法

> slot-scope 作用: 传值
> slot-scope 的值会自动去上一级找最外层标签 el-table 所绑定的数据 userlist
> slot-scope="scope" 此时 "scope"==userlist 数组
> scope.row 是数组的每个对象
> scope.row.create_time 我们要用的数据

```html
<el-table-column label="创建时间">
  <template slot-scope="scope">
    {{scope.row.create_time | fmtdate}}
  </template>
</el-table-column>
```

#### 07-项目-用户管理-用户列表-渲染数据-用户状态开关

> el-switch v-model="bool"

```html
<el-table-column label="用户状态">
  <template slot-scope="scope">
    <el-switch
      v-model="scope.row.mg_state"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
  </template>
</el-table-column>
```

#### 08-项目-用户管理-用户列表-渲染数据-操作

> 操作里面不是字符串

1. template 容器 slot-scope="scope"
2. el-button
   > size="mini" plain

#### 09-项目-用户管理-用户列表-分页组件-文档-引入

> 该接口支持分页 url 参数中有 pagenum pagesize

1. @size-change 每页显示条数变化时 触发
2. @current-change 当前页改变时 触发
3. current-page 设置当前页是第几页
4. page-sizes=[2,4,6,8] 每页多少条的数据数组
5. page-size 设置显示多少条
6. total 数据总数

#### 10-项目-用户管理-用户列表-分页组件-配置数据

1. current-page="pagenum"
2. page-size=2
3. :total="total"

#### 11-项目-用户管理-用户列表-分页组件-分页请求

1. 每页显示条数改变 -> this.pagesize = val -> this.getUserList()
2. 页码改变时 -> this.pagenum = val -> this.getUserList()
   > 希望当每页条数改变时 从第一页开始显示 this.pagenum=1 -> currPage=1 ?

#### 12-项目-用户管理-用户列表-搜索用户

1. 给搜索输入框绑定 query v-model="query"
2. 点击搜索按钮 发送请求
3. 一键清除 clearable
4. 点击清除按钮 -> 重新获取数据

```html
<el-input
  @clear="loadUserList()"
  clearable
  placeholder="请输入内容"
  v-model="query"
  class="inputSearch"
>
  <el-button
    @click="searchUser()"
    slot="append"
    icon="el-icon-search"
  ></el-button>
</el-input>
```

#### 13-项目-用户管理-用户列表-添加用户-显示对话框

1. 引入对话框 > el-form
2. 点击添加用户的按钮-> 显示对话框 this.dialogFormVisibleAdd = true
3. 配置对话框
   3.1 :model=form:{看接口文档中添加用户时用哪个数据}
   3.2 dialogFormVisibleAdd:false
   3.3 el-form>el-input v-model="form.xxx"

#### 14-项目-用户管理-用户列表-添加用户-发送请求

1. post this.form
2. 关闭对话框
3. 清空文本框 this.form = {}
4. 更新视图
5. 提示框
   > post status === 201

#### 15-项目-用户管理-用户列表-添加用户-处理响应

#### 16-项目-用户管理-用户列表-删除用户-打开确认框

> this.\$confirm().then().catch()

1. 点击确定 -> .then 的参数
2. 点击取消 -> .catch 的参数

#### 17-项目-用户管理-用户列表-删除用户-处理响应

1. 点击确定 -> 发送 delete 请求
   1.1 提示
   1.2 更新数据
   1.3 回到第一页

> 注意 async 的位置

```js
this.$confirm('删除用户?', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
})
  .then(async () => {
    // 发送删除的请求 :id----> 用户id
    // 1. data中找userId  X
    // 2. 把userId以showDeleUserMsgBox参数形式传进来
    const res = await this.$http.delete(`users/${userId}`)
    console.log(res)
    if (res.data.meta.status === 200) {
      this.pagenum = 1
      // 更新视图
      this.getUserList()
      // 提示
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  })
  .catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
```

#### 18-项目-用户管理-用户列表-编辑用户-显示对话框

> 点击操作中的编辑按钮- 打开编辑对话框

0. 提供该对话框显示/隐藏控制属性 dialogFormVisibleEdit
1. 找到编辑按钮@click
1. 打开对话框
1. 把之前添加对话框进行复制 - 修改
   > form 用的是之前添加用户时的 form

#### 19-项目-用户管理-用户列表-补充

1. 之前分页 回到第一页的写法 this.pagenum=1
2. el-table 固定表头 height="250px"
   > overflow:auto

#### 20-扩展-git 的使用

1. gitbash -> 指令操作
2. gitGUI -> 图形页面 -> 一个能操作 git 的软件
   > 实际开发中 bash 频率多 ->

### day-09-重点

#### 01-项目-用户管理-用户列表-编辑用户-显示编辑数据

1. 点击 edit 编辑按钮 scope.row
2. 在 showEditUserDia 方法中 this.form = user user 其实是 scope.row
   > 用户名 禁用

#### 02-项目-用户管理-用户列表-编辑用户-发送请求

1. 找到对话框的确定按钮 - > editUser() -> 发送请求
   > this.form = user
   > id -> this.form.id
   > 先点编辑 再点添加 -> 打开添加对话框之前 this.form={}

#### 03-项目-用户管理-用户列表-修改用户状态

1. 找到开关 @change="changeMgState(scope.row)"
2. changeMgState(){发送 put 请求}
   > users/:uId/state/:type uid 用户 id

#### 04-项目-用户管理-用户列表-分配角色-功能演示

1. 点击按钮 -> 打开对话框
2. 对话框 中有下拉框
3. 修改当前用户的角色
4. 5 个角色名来源于请求
   > 每个角色的权限是不同的

#### 05-项目-用户管理-用户列表-分配角色-显示对话框

1. 点击操作中的按钮 -> 打开对话框
2. 引入对话框(有下拉框)
   > 下拉框的特性: 如果 select 绑定的数据的值和 option 的 value 值一样 此时显示的是该 option 的 label 值
3. 把 option 分成了两类 请选择(-1) 和 v-for 遍历 option
4. data 提供了 el-select 的 v-model 所绑定的数据 currRoleId = -1

#### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框

> el-select 和 el-option
> 改变 label 时 -> 该 label 显示 -> 改变了 value -> el-select v-model 绑定的数据 自动关联

#### 07-项目-用户管理-用户列表-分配角色-显示当前用户角色

1. 通过请求获取所有角色 roles
2. v-for el-option :label="item.roleName" :value="item.id"
3. 通过请求获取当前用户的 rid
4. 给 el-select 中 v-model 绑定的数据赋值 this.currRoleId = res.data.data.rid
   > rid 接口文档的参数名是 role_id

#### 08-项目-用户管理-用户列表-分配角色-修改用户角色

1. 通过视图操作->修改了 label->value 值变化->el-select v-model 绑定的数据变化
2. currRoleId
   > 在 setRole 方法中要使用用户 id 在 data 声明 currUserId:-1
3. 在 showSetUserRoleDia(){this.currUserId = user.id}

```js
 async setRole() {
      // users/:id/role
      // :id 要修改的用户的id值
      // 请求体中 rid 修改的新值角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      })
      console.log(res)
      // 关闭对话框
      this.dialogFormVisibleRol = false
    },

```

#### 09-项目-用户管理-用户列表-合并分支-推送

1. git add .
2. git commit -m "注释"
3. git branch
4. git checkout master
5. git merge dev-users
6. git push

#### 10-项目-权限管理-新建分支-功能演示

1. 权限管理
   1.1 角色列表
   > 展开行+树形结构
   > 1.2 权限列表

#### 10-项目-权限管理-权限列表-新建组件-路由配置

1. 新建 right.vue
2. home.vue 改标识
3. 配置路由

#### 11-项目-权限管理-权限列表-自定义面包屑组件

> 好多组件都有面包->二次封装了面包屑组件

1. 新建.vue 文件
2. 在自定义组件中提供数据 level1 level2 -> props:[]
3. main.js 引入
4. Vue.component(MyBread.name,MyBread)

#### 12-项目-权限管理-权限列表-获取权限列表数据

> 除了登录之外的所有请求 都需要设置头部信息
> type 参数 值 list 或者 tree

#### 13-项目-权限管理-权限列表-axios-拦截器统一设置请求头

> 除了登录之外的所有请求 都需要设置头部信息
> 在请求发起之前 要添加头部 -> axios 文档
> 请求拦截器 config.header
> 响应拦截器 (目前没使用)

#### 14-项目-权限管理-权限列表-表格展示

> 引入 el-table 绑定数据 rightlist (authName path level)

#### 15-项目-权限管理-权限列表-表格展示-层级显示

> level==='0' 一级

1. template slot-scope="scope"
2. v-if ="scope.row.level==='0'" 一级

#### 16-项目-权限管理-权限列表-表格展示-固定表头

> 给 el-table 设置固定高
> overflow:auto

#### 17-项目-权限管理-角色列表-新建组件-配置路由

1. 新建 role.vue 组件
2. 配置路由

#### 18-项目-权限管理-角色列表-面包屑和添加按钮

1. 自定义面包屑
2. 添加按钮

#### 19-项目-权限管理-角色列表-获取角色列表数据

1. 发送请求 this.\$http.get(`roles`)

#### 20-项目-权限管理-角色列表-表格展示

> 将 users.vue 中的表格进行复制 修改

1. :data="rolelist"
2. roleName
3. roleDesc
4. 操作

#### 21-项目-权限管理-角色列表-表格展示-展开行功能分析

1. type="expand"
2. template > 该角色的权限(三级)
3. 页面布局如果是行列问题 -> for 循环 -> v-for 嵌套 el-tag

#### 22-项目-权限管理-角色列表-表格展示-展开行-一级权限

1. 分析数据 rolelist > 每个对象中的 children 中 authName
2. 布局 一行>(列 A>(el-tag)+列 B>(一行 el-row)>两列((el-colA>el-tag+el)-colB>el-tag))
3. 一级权限展示 v-for 最外层的 el-row scope.row.children

### day-10-重点

#### 01-项目-权限管理-角色列表-表格展示-展开行-二级权限

> 在第一列(一级权限)的基础上 展示二级权限

```html
<el-row v-for="(item2,i) in item1.children" :key="i">
  <el-col :span="4"> <el-tag>{{item2.authName}}</el-tag> </el-col>
  <el-col :span="20"></el-col>
</el-row>
```

#### 02-项目-权限管理-角色列表-表格展示-展开行-三级权限

> 在二级权限展示完毕基础上
> v-for 遍历的是 item2.children el-tag

#### 03-项目-权限管理-角色列表-表格展示-展开行-样式调整

1. el-tag 颜色 type="success"
2. closeable 关闭按钮
3. <i class=""></i> 图标

#### 04-项目-权限管理-角色列表-表格展示-展开行-处理无权限的展示

> 角色无权限时 提示
> <span v-if="scope.row.children.length===0">未分配权限</span>

#### 05-项目-权限管理-角色列表-表格展示-展开行-取消权限

> 点击 X 按钮 取消该角色的权限

1. 给 el-tag @close="deleRight(scope.row.id,itemx.id)"
2. deleRight(roleId,rightId){发送请求}
3. this.\$http.delete(`roles/${roleId}/rights/${rightId}`)
4. 更新整个视图

#### 06-项目-权限管理-角色列表-表格展示-展开行-取消权限-优化

> 删除成功->更新整个表格 -> 没必要
> 删除成功 返回了该角色的剩余权限
> 删除成功 -> 更新了当前角色的 children

#### 07-项目-权限管理-角色列表-表格展示-修改权限-显示对话框

> 点击操作的 check 按钮->打开对话框

1. 提供对话框
2. check 按钮 @click="showSetRightDia(scope.row)"

#### 08-项目-权限管理-角色列表-表格展示-修改权限-树形结构-文档分析

> el-tree

```js
 树形结构
          data->数据源 []
          show-checkbox -> 选择框
          node-key 每个节点的唯一标识 通常时data数据源中key名id
          default-expanded-keys 默认展开 [要展开的节点的id]
          default-checked-keys [要选择的节点的id]
          props 配置项 {label,children}
          label节点的文字标题和children节点的子节点
          值都来源于data绑定的数据源中的该数据的key名 'label'和'children'
```

#### 09-项目-权限管理-角色列表-表格展示-修改权限-树形结构-配置数据

1. data 中 treelist
2. 打开对话框时 获取树形结构的权限列表数据
   > const res = awaitthis.\$http.get(`rights/tree`)
   > this.treelist = res.data.data
3. el-tree :data="treelist"
4. el-tree node-key="id"
   5 :props={label:'authName',children:'children'}
   > 默认展开和选中还没写

#### 10-项目-权限管理-角色列表-表格展示-修改权限-树形结构-展开所有项

> el-tree default-expand-all
> default-expanded-keys = [所有权限的 id] for 嵌套

#### 11-项目-权限管理-角色列表-表格展示-修改权限-树形结构-显示角色拥有的权限

> el-tree default-checked-key="arrcheck"

1. data arrcheck
2. role for 嵌套 获取最里层叶子节点 id arrtemp2
3. this.arrcheck = arrtemp2

#### 12-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-功能分析

#### 13-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-实现

1. 点击对话框的确定 发送请求
   > roleId rid
2. roleId 在打开对话框的方法中 this.roleId = role.id
3.

3.1 获取全选的节点 id 数组 getCheckedKeys
3.2 获取半选的节点 id 数组 getHalfCheckedKeys

4. 在 js 中调用 el-tree 的 js 方法
   4.1 给 el-tree 设置 ref
   4.2 this.\$refs.ref 的值 tree.js 方法(3.1 和 3.2 的方法名)
   4.3 返回两个数组 arr1 和 arr2
5. ES6 展开运算符
   > let arr = [...arr1,...arr2]
6. this.\$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')})
7. 关闭对话框+更新视图

#### 14-项目-首页-侧边栏-动态导航

> get('menus') 获取导航的所有数据

1. order
2. path 标识
3. children
4. v-for

> 在写之后的路由配置时 path 不能随便写!

#### 15-项目-效果演示-不同角色用户登录-显示对应权限

> 每个角色有不同的权限

1. 新建用户 分配角色
2. 回到登录页 登录新用户 -> token
3. 渲染 home 组件的侧边栏时 使用 header 中的 token
4. 发送 getMenus() 也会使用 header
   > 基于 token 的服务端认证流程

#### 16-项目-不同角色用户登录-显示对应权限-导航守卫

1. 在 home.vue 中判断 token 很麻烦
2. 导航守卫
   2.1 路由配置生效前 先来到路由守卫的 cb
   2.2 to 要去的路由配置 from 当前的路由配置
   2.3 next() 让 to 的路由配置继续生效

```js
router.beforeEach((to, from, next) => {
  // to  from next
  // console.log(to, from)
  // 如果要去的是登录 -> next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果要去的不是登录
    //  判断token
    const token = localStorage.getItem('token')
    if (!token) {
      //      如果token没有 -> login
      // this.$router.push({name:'login'})
      // 提示
      // this.$message.warning('回到登录')
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }

    //      如果有  -> next()
    next()
  }
})
```

#### 17-项目-权限管理-合并分支-推送-新建分支

1. git status
2. git add .
3. git commit -m ""
4. git checkout master
5. git branch
6. git status
7. git push

#### 18-项目-商品管理-功能演示

1. 商品列表-添加商品
2. 分类参数-
   2.1 动态参数(√)
   2.2 静态参数(X)
3. 商品分类
   3.1 表格中的树形结构

### day-11-重点

#### 01-项目-商品管理-商品列表-准备组件

> goods/goodslist.vue
> 配置路由 标识 path 是 goods

#### 02-项目-商品管理-添加商品-新建组件配置路由

1. goods/goodsadd.vue
2. 配置路由 path:'/goodsadd'
3. 点击列表组件中 ed 添加商品按钮 js 编程式导航

#### 03-项目-商品管理-添加商品-步骤条

1. 面包屑
2. 提示 el-alert
3. 步骤条(进度条) el-steps
   > :active="abc" 如果"abc"值=2 表示当前是第二步

#### 04-项目-商品管理-添加商品-tabs

1. 引入 el-tabs 表单元素 v-model="active"
2. 如果选中的第二个 el-tab-pane 此时 active 的值就是该 tab 的 name 值 也就是 2
3. 让 el-steps 步骤条的:active 属性的值和 v-model 绑定的属性 是同一个

```html
<el-tabs v-model="active" tab-position="left" style="height: 200px;">
  <el-tab-pane name="1" label="基本信息">基本信息</el-tab-pane>
  <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
  <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
  <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
  <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
</el-tabs>
```

#### 05-项目-商品管理-添加商品-基本信息-表单绑定数据

1. 最外层包裹 el-form 调整了样式 overflow:auto
2. v-model="form"
3. form 数据的来源 添加商品的网络请求
4. 基本信息 tab-一般表单元素的数据绑定(名称/价格/重量/数量)

#### 06-项目-商品管理-添加商品-基本信息-级联选择器-文档-引入

> el-cascader 表单元素

1. :options=数据 list[]
2. v-model="selectedOptions" 最终选择的 label 对应的 value 会在 selectedOptions 数组中
3. :props="{label:'goodsname',value:'id',children:'children'}"
4. @change="" 选择改变时触发

```js
list: [
  {
    goodsname: '家电',
    id: 1,
    children: [
      {
        goodsname: 'a家电',
        id: 100,
        children: []
      }
    ]
  }
]
```

```html
<el-cascader
  expand-trigger="hover"
  :options="options"
  v-model="selectedOptions"
  :props="defaultProp"
  @change="handleChange"
></el-cascader>
```

#### 07-项目-商品管理-添加商品-基本信息-级联选择器-获取分类数据

#### 08-项目-商品管理-添加商品-基本信息-级联选择器-配置数据

1. created(){}
2. getGoodCate(){发送请求 type=3}
3. this.options = res.data.data
4. defaultProp:{label:'cat_name',value:'id',children:'children'}
5. selectedOptions:[1,3,6] 设置默认的分类

#### 09-项目-商品管理-添加商品-商品参数-获取动态参数数据

1. 必须要先选择三级分类 -> 点击第二个 tab 才会获取数据
2. if(this.active==='2'){if(this.selectoption.length!==3){提示 return} 发送请求}
3. categories/\${this.selectedOptions[2]}/attributes?sel=many
   > sel=many 获取的是动态参数的数据

#### 10-项目-商品管理-添加商品-商品参数-复选框组-文档-引入

1. 商品参数->动态参数数据 -> this.arrDyparams
2. el-form-item +复选框组
3. v-for 遍历 el-form-item 和里面的 el-checkbox
   > this.arrDyparams 中的每个对象的 attr_vals 字符串 -> split(',')数组

```js
item.attr_vals =
  item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
```

#### 11-项目-商品管理-添加商品-商品参数-复选框组-调整样式

1. border
2. el-checkbox-group v-model="item1.attr_vals"

#### 12-项目-商品管理-添加商品-商品属性-获取静态参数数据

1. 如果选中了第三个 tab this.active==='3' 同时 分类数组 长度===3
2. sel=only
   > 静态参数的数据 是给商品属性用的

#### 13-项目-商品管理-添加商品-商品参数-布局

> v-for 遍历 arrStaticparams

```html
<el-form-item
  :label="item.attr_name"
  v-for="(item,i) in arrStaticparams"
  :key="i"
>
  <el-input v-model="item.attr_vals"></el-input>
</el-form-item>
```

#### 14-项目-商品管理-添加商品-图片上传-文档-引入

> el-upload

1. action 全路径
2. headers 头部
3. :on-remove="移除触发的方法"
4. :on-preview=""
5. :on-success=""

#### 15-项目-商品管理-添加商品-图片上传-配置属性-临时路径

1. action="http 开头全路径"
2. headers:{Authorization:localStorage.getItem('token')}
   > 除了登录请求 都需要设置头部 之前的头部设置是给 axios 发起的请求设置的
3. file.response.data.tmp_path 图片临时上传的路径
   file.data.tmp_path 图片临时上传的路径

#### 16-项目-商品管理-添加商品-商品内容-富文本编辑器

> npm install vue-quill-editor --save

1. 全局注册 + 局部注册

```js
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
```

2. 通过选项局部注册

```js
components: {
    quillEditor
  },

```

> v-model="form.goods_introduce"
> github+npm+vue 官网(生态资源>资源列表)

#### 17-项目-商品管理-添加商品-表单数据分析

```js
// 1.
// 未处理的数据
// goods_cat	以为','分割的分类列表	不能为空  -> 级联选择器绑定的selectedOptions
// this.selectoption -> string
// 2.
// pics	上传的图片临时路径（对象）	可以为空
// pics是数组 [{pic:图片临时路径}]
// 3.
// attrs	商品的参数（数组）
// 动态参数和静态参数 -> 数组
```

#### 18-项目-商品管理-添加商品-表单数据处理-分类和图片

0. this.form.goods = this.selectoption.join(',')

1. 在临时上传成功时 给 pics 添加元素
1. 在移除图片
   2.1 findIndex 找索引
   2.2 splice(索引,1)

```js
 handleRemove(file){
        // file.response.data.tmp_path 图片临时上传的路径
        console.log('移除');
        // console.log(file)

        //从 this.form.pics 移除当前x掉的图片
        // 先获取该图片的索引
        // findIndex((item)=>{}) 遍历 把符合条件的元素的索引进行返回

        // [{pic:图片路径},{pic:图片路径2}]
        let Index = this.form.pics.findIndex((item)=>{
          return item.pic === file.response.data.tmp_path
        })
        this.form.pics.splice(Index,1)
        console.log(this.form.pics)


      },
      //
      handleSuccess(file){
        // file.data.tmp_path 图片临时上传的路径
          // console.log('成功');
          // 给this.form.pics
          this.form.pics.push({
            pic:file.data.tmp_path
          })

        // console.log(file)

      },

```

### day-12-重点

#### 01-项目-商品管理-添加商品-表单数据处理-attrs

1. this.form.attrs [{attr_id:?,attr_value:?}]
2. 动态参数数组+静态参数数组 map 遍历 返回新数组 arr1 和 arr2
3. 合并数组 this.form.attrs = [...arr1,...arr2]
4. 发送请求
5. 回到商品列表页

#### 02-项目-商品管理-分类参数-新建组件-路由配置

1. goods/cateparams.vue
2. 路由配置 path:"/params"

#### 03-项目-商品管理-分类参数-动态参数-布局-配置级联选择器

1. el-form>el-form-item>el-cas 级联选择器
2. 把 goodsadd.vue 中的级联选择器进行修改
3. created(){this.getGoodsCate()}

#### 04-项目-商品管理-分类参数-动态参数-获取动态参数数据

1. 级联选择器选项发生改变时 同时 选择了三级分类
   > 获取动态参数数组 -> 把 goodsadd.vue 的代码进行修改

#### 05-项目-商品管理-分类参数-动态参数-表格渲染

1. el-table :data="arrDyparams"
2. 属性名称 prop="attr_name"
3. 第一列 type="expand"

#### 06-项目-商品管理-分类参数-动态参数-动态编辑-tag-文档-引入

1. 动态 tag 编辑
   1.1 删除
   1.2 添加
   > html(el-tag+el-input+el-button)+css+js(handleClose+showInput+handleInputConfirm)

#### 07-项目-商品管理-分类参数-动态参数-动态编辑-tag-配置-完成

1. el-tag v-for ="tag in scope.row.attr_vals"
2. "handleInputConfirm(scope.row.attr_vals)"
3. "handleClose(scope.row.attr_vals,tag)"

#### 08-项目-商品管理-分类参数-动态参数-删除-发送请求

> attr_vals 以,分割的字符串
> 删除请求的接口 put 请求体 接口文档中没有

```js
attr_name: attr_name,
attr_sel: "many",
attr_vals: attr_vals.join(",")
```

```js
 async handleClose(attr_vals, attr_id, attr_name, tag) {
      attr_vals.splice(attr_vals.indexOf(tag), 1);
      // 发送请求 1.7.5
      // categories/:id/attributes/:attrId   put
      // put请求体 { attr_name:?,attr_sel:?,attr_vals:?}
      // attr_name	参数名称	不能为空
      // attr_sel	[only,many]	不能为空
      // attr_vals	如果是 many 就需要填写值的选项，以逗号分隔
      let putData = {
        attr_name: attr_name,
        attr_sel: "many",
        attr_vals: attr_vals.join(",")
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${attr_id}`,
        putData
      );
      console.log(res);
    },

```

#### 09-项目-商品管理-分类参数-动态参数-添加-发送请求

> handleInputConfirm(attr_vals, attr_id, attr_name)
> 添加属性值和删除属性值 请求是同一个 put 请求

#### 10-项目-商品管理-分类参数-静态参数-布局-获取数据

1. 点击第二个 tab 请求静态参数数组的数据
2. el-table 布局
3. 把动态参数的表格进行修改

#### 11-项目-商品管理-商品分类-准备组件-路由配置

1. 准备组件 goods/goodscate.vue
2. 路由配置 path:'/categories'

#### 12-项目-商品管理-商品分类-准备组件-代码梳理

1. 对话框中的级联选择器的数据 还未获取

#### 13-项目-商品管理-商品分类-element-tree-grid-文档-引入

> 单元格->树形结构 -> el-table -> elementui table 插件
> 插件名 element-tree-grid -> 增强了 el-table 的单元格

1. npm i element-tree-grid
2. 导入
3. 局部注册
4. <el-tree-grid></el-tree-grid>
5. treeKey parentKey levelKey childKey

#### 14-项目-商品管理-商品分类-element-tree-grid-配置

> treeKey 等属性值的来源 el-table :data="list"

```js
<el-tree-grid
  prop="cat_name"
  label="分类名称"
  treeKey="cat_id"
  parentKey="cat_pid"
  levelKey="cat_level"
  childKey="children"
/>
```

#### 15-项目-商品管理-商品分类-添加分类-打开对话框-获取数据

1. 点击添加分类按钮 - 打开对话框
2. 获取二级分类的数据 type=2
   > 不能给三级分类子级添加四级分类

#### 16-项目-商品管理-商品分类-添加分类-发送请求

> 只能添加三级分类
> form:{cat_name:'',cat_level:-1,cat_pid:-1}

```js
if (this.selectedOptions.length === 0) {
  this.form.cat_pid = 0
  this.form.cat_level = 0
} else if (this.selectedOptions.length === 1) {
  this.form.cat_pid = this.selectedOptions[0]
  this.form.cat_level = 1
} else if (this.selectedOptions.length === 2) {
  this.form.cat_pid = this.selectedOptions[1]
  this.form.cat_level = 2
}
```

#### 17-项目-合并分支-推送分支-新建分支

1. git status
2. git add .
3. git commit -m ""
4. git branch
5. git checkout master
6. git merge dev-goods
7. git push

#### 18-项目-订单管理-订单列表-准备组件-路由配置

1. order/order.vue
2. 路由配置 path:"/orders"
   > 编辑按钮->打开对话框-> 省市区数据

#### 19-项目-订单管理-订单列表-省市区引入

> 在.vue 中可以引入.js 库 swiper.js
> vue-swiper.js 插件

#### 20-项目-数据统计-数据报表-Echarts-文档-引入

1. npm i echarts
2. 导入
3. 视图 提供一个容器 div(需要设置宽高)
4. myechart.init(容器)
5. 配置选项(配置数据) option
6. mychart.setOption(option)
   > mounted(){this.useEcharts()}

#### 22-项目-数据统计-数据报表-Echarts-配置

> reports/type/1
> option 来源于两部分
> // 1. reports/type/1
> // 2. 固定数据
> // setOption()

> npm run build 打包

### day-13-重点

#### 01-项目-补充-加载动画

> v-loading="bool"

1. bool 为 true 加载动画启动
2. bool 为 false 动画停止

#### 02-项目-补充-nextTick

> data 更新->视图变化
> this.\$nextTick(()=>{获取 dom 元素最新值的代码})
> setTimeout()也可以解决这个问题

#### 03-项目-优化-拦截器统一处理响应

> res status===200 || 201 else {提示框 msg}
> 把所有 status 不是 200 也不是 201 的情况 统一处理
> vue 组件中的所有响应是非 200 和 201 的情况都不需要写了!

```js
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // console.log(1111111);
    // console.log(response);
    let {
      meta: { status, msg }
    } = response.data
    // status === 200 status===201
    if (status !== 200 && status !== 201) {
      // 提示框
      // this.$message.warning(msg)
      Message.warning(msg)
    }

    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
```

#### 04-项目-优化-路由懒加载

> 所有组件的 js 代码都会出现在同一个 app.xxx.js 文件 -> 加载该文件很慢
> 让每个组件生成对应 js 文件
> router/index.js 把组件的导入
> const Foo = () => import ('')
> 打包时 每个组件都有自己的序号.xxxxx.js 文件

#### 05-项目-优化-cdn-引入

> 第三方资源 node_modules/ -> vender.xxx.js 变小
> cdn 引入 -> src="http://"

> 把项目依赖的第三方包 cdn 引入
> 可以去官网找 bootcdn
> 在 index.html 引入 (element-ui(.css 和.js))


#### 06-项目-优化-cdn-配置
1. webpack.base.config.js
> packjson中的包名: 该包暴露给全局变量
```js
 externals: {
        'vue': 'Vue',
        'vue-rotuer': 'VueRouter',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'echarts': 'echarts',
        'moment': 'moment'
    },
```
2. 
2.1 main.js中 Element-UI 改成 ELEMENT
2.2 rotuer/index.js Router 改成了 VueRouter
3. main.js中 把之前的element-ui的css文件引入 注释掉
4. 重新打包 npm run build


#### 07-项目-打包
1. 路由懒加载  router/index.js 组件的导入
> 不是一次加载所有资源 
2. cdn引入
2.1 index.html  link href和script src 引入了cdn资源
2.2 webpack.base.config.js 
```js
externals: {
        'vue': 'Vue',
        'vue-rotuer': 'VueRouter',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'echarts': 'echarts',
        'moment': 'moment'
    },
```
2.3 main.js
2.3.1 Element-UI 改成 ELEMENT
2.3.2 去掉了element-ui的css导入
2.4 router/index.js
2.4.1 Router 改成 VueRouter
2.5 重新打包 -> vendex.xxxx.js 文件变得很小
2.6 上线: 把dist文件夹里的所有东西放在上线的服务器的根目录


#### 08-基础-组件通信-父子组件通信-子传父
1. 父传子 props
2. slot-scope="scope"
3. 子传父
3.1 子组件中 触发事件 this.$emit(事件名xxx,值a)
3.2 在父组件中使用子组件时 绑定自定义事件@xxx="methods里面的方法名fn2"
3.3 在父组件的methods的fn2形参位置获取到子组件传过来的值a
#### 09-基础-组件通信-兄弟组件通信

#### 10-基础-vuex-状态管理流程

#### 11-基础-vuex-使用场景

#### 12-基础-vuex-state 和 mapState

#### 13-基础-vuex-getters 和 mapGetters

#### 14-基础-vuex-mutations 和 mapMutations

#### 15-基础-vuex-mutations 异步问题

#### 16-基础-vuex-actions 和 mapActions

#### 17-基础-vuex-总结


0. 培训视频
国外 免费学习的网站

1. 书
你不知道的javascript(上中下) 
js编程式导航
js设计模式

react状态管理与同构实战
vue实践
linux网站运维

web架构设计
web安全指南

<!-- 算法导论() -->




