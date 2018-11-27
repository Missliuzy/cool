<template>
<el-card class="box-card">
    <!-- 1. 面包屑 -->
    <!-- / 首页/ 用户管理/ 用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2. 搜索 -->
    <el-row class="searchRow">
        <el-col>
            <el-input

            @clear="loadUserList()"
            clearable placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button
                @click="searchUser()"
                slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </el-col>
    </el-row>

    <!-- 3. 表格 -->
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>

        <!-- {{create_time | fmtdate}} -->
        <!-- <el-table-column
        prop="create_time | fmtdate"
        label="创建时间">
      </el-table-column> -->

        <el-table-column label="创建时间">
            <!-- 如果单元格内显示的内容不是字符串(文本),
        需要给被显示的内容外层包裹一个template -->

            <!--
          template内部要用数据 设置slot-scope属性
          该属性的值是要用数据create_time的数据源userlist
         -->

            <!--
           slot-scope的值userlist其实就是el-table绑定的数据userlist
           userlist.row->数组中的每个对象
          -->
            <template slot-scope="scope">
                {{scope.row.create_time | fmtdate}}
            </template>

        </el-table-column>

        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 4. 分页 -->

    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 4,6, 8]"
    :page-size="2"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>

</el-card>
</template>

<script>
export default {
  data() {
    return {
      query: '',

      // 表格绑定的数据
      // username: "admin"
      // email: "admin@aacom"
      // mobile: "12345678"
      // create_time: 1486720211
      // mg_state: true
      // id: 500
      // role_name: "主管"
      userlist: [],
      // 分页相关数据
      total: -1,
      pagenum: 1,
      pagesize: 2
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 清空搜索框 重新获取数据
    loadUserList() {
      this.getUserList()
    },

    // 搜索用户
    searchUser() {
      console.log('aaaaaaa')

      // 按照input绑定的query参数 发请求
      this.getUserList()
    },
    // 分页相关的方法
    /*
      24条
      pagenum=3
      pagesize=2
      1,2/3,4/5,6
      数据->
       */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 获取用户列表的请求
    async getUserList() {
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空

      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )

      console.log(res)
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data
      if (status === 200) {
        // 1. 给表格数据赋值
        this.userlist = users
        // 2. 给total赋值
        this.total = total
        // 3. 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
}

.inputSearch {
  width: 300px;
}

.searchRow {
  margin-top: 20px;
}
</style>
