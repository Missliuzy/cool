<template>
<el-card>

  <!-- 1面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

  <!-- 2表格 -->
</el-card>
</template>

<script>
export default {
  data() {
    return {
      rightlist: []
    }
  },
  created() {
    this.getRightlist()
  },
  methods: {
    async getRightlist() {
      const res = await this.$http.get(`rights/list`)
      console.log(res)
      this.rightlist = res.data.data
    }
  }
}
</script>

<style>
</style>
