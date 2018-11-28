<template>
<el-card>
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>

    <el-row class="addrolebtn">
        <el-col>

            <el-button type="info">添加角色</el-button>
        </el-col>
    </el-row>

    <el-table :data="rolelist" style="width: 100%">

        <el-table-column type="index" label="#" width="150">
        </el-table-column>

      <!--
        roleName: "主管"
        roleDesc: "技术负责人"
 -->
        <el-table-column prop="roleName" label="角色名称" width="200">
        </el-table-column>

        <el-table-column prop="roleDesc" label="角色描述" width="200">
        </el-table-column>

        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)"></el-button>
                <el-button @click="showSetUserRoleDia(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>

</el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: []
    }
  },
  created() {
    this.getRolelist()
  },
  methods: {
    async getRolelist() {
      const res = await this.$http.get(`roles`)
      console.log(res)
      this.rolelist = res.data.data
    }
  }
}
</script>

<style>
.addrolebtn {
  margin-top: 20px;
}
</style>
