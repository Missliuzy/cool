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


        <el-table-column type="expand"  width="150">
          <template slot-scope="scope">
                <el-row v-for="(item1,i) in scope.row.children" :key="i">
                  <el-col :span="4">
                    <!-- 传角色id 和 权限id -->
                    <el-tag @close="deleRight(scope.row,item1.id)" closable type="success">{{item1.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-row v-for="(item2,i) in item1.children" :key="i">

                      <el-col :span="4">
                          <el-tag @close="deleRight(scope.row,item2.id)" closable type="info">{{item2.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                      </el-col>

                      <el-col :span="20">
                        <el-tag @close="deleRight(scope.row,item3.id)" closable type="warning" v-for="(item3,i) in item2.children" :key="i">
                          {{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>

              <!-- 无权限的提示 -->
              <span v-if="scope.row.children.length===0">未分配权限</span>

          </template>
        </el-table-column>


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
                <el-button
                @click="showSetRightDia(scope.row)"
                size="mini" plain type="success"
                icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
        <!-- 树形结构 -->

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleRight = false">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      dialogFormVisibleRight: false
    }
  },
  created() {
    this.getRolelist()
  },
  methods: {
    // 修改/分配 权限 - 打开对话框
    showSetRightDia(role) {
      this.dialogFormVisibleRight = true
    },
    // 取消权限
    async deleRight(role, rightId) {
      // roles/:roleId/rights/:rightId
      // roleId 当前角色的id
      // rightId 要删除的权限id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      // 删除成功 返回了200和该角色的剩余权限

      role.children = res.data.data
      // this.getRolelist()
    },
    async getRolelist() {
      const res = await this.$http.get(`roles`)
      // console.log(res)
      this.rolelist = res.data.data
      console.log(this.rolelist)
    }
  }
}
</script>

<style>
.addrolebtn {
  margin-top: 20px;
}
</style>


// 布局是行列布局 -> for嵌套
// v-for嵌套 渲染el-tag

// 请在控制台输出以下图形
    *
  *   *
*   *   *
// for
