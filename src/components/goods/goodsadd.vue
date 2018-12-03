<template>
  <el-card>
    <!-- 1. 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <!-- 提示 el-alert -->
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon></el-alert>

    <!-- 步骤条 el-steps -->
    <!--

      基本信息
      商品参数
      商品属性
      商品图片
      商品内容
    -->
    <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 最外层是el-form-->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px;overflow:auto;"
    >
      <el-tabs @tab-click="tabChange()" v-model="active" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            {{selectedOptions}}
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          <!-- 显示的是该三级分类的商品参数 -->
          <el-form-item :label="item1.attr_name" :key="i" v-for="(item1,i) in arrDyparams">
            <!-- 复选框组 -->
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border v-for="(item2,i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <!-- 静态参数的数据 -->
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <!-- baseUrl axios发的请求 -->
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <!-- 表单元素 -->
            <el-button type="primary" @click="addGoods()">点我-添加商品</el-button>
            <!-- 富文本 -->
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
  <!--
    <el-form-item label="名称">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
  -->
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      // 添加商品的表达数据
      // this.$http.post(url , this.form)

      // goods_name	商品名称	不能为空
      // goods_price	价格	不能为空
      // goods_weight	重量	不能为空
      // goods_number	数量	不能为空
      // goods_introduce	介绍	可以为空

      // 未处理的数据
      // goods_cat	以为','分割的分类列表	不能为空  -> 级联选择器绑定的selectedOptions
      // this.selectoption -> string

      // pics	上传的图片临时路径（对象）	可以为空
      // pics是数组 [{pic:图片临时路径}]

      // attrs	商品的参数（数组）
      // 动态参数和静态参数 -> 数组
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",

        goods_cat: "",
        pics: [],
        attrs: []
      },
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [1, 3, 6],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数的数据数组
      arrDyparams: [],
      // 静态参数的数据数组
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    // 添加商品 - 发送请求
    async addGoods() {
      // goods_cat -> 分类
      this.form.goods_cat = this.selectedOptions.join(",");

      // pics 在上传和移除图片时 进行赋值和删除 [].findIndex()

      // attrs [{attr_id:?,attr_value:?}]
      // 动态参数数组
      // 遍历 + 取值 + 放在一个新数组中
      let arr1 = this.arrDyparams.map(item => {
        // item.attr_id和item.attr_vals
        // return "abc"
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });

      // console.log(arr1);
      // 静态参数数组
      let arr2 = this.arrStaticparams.map(item => {
        // item.attr_id和item.attr_vals
        // return "abc"
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });

      this.form.attrs = [...arr1, ...arr2];

      // console.log(this.arrDyparams);

      // 在发请求之前 处理this.form中的未处理数据
      const res = await this.$http.post(`goods`, this.form);
      console.log(res);
      // 回到商品列表
      this.$router.push({ name: "goods" });
    },
    // 图片上传时的相关方法
    // file形参里面是当前操作的图片的相关信息(图片名/图片路径)
    handlePreview(file) {},
    handleRemove(file) {
      // file.response.data.tmp_path 图片临时上传的路径
      console.log("移除");
      // console.log(file)

      //从 this.form.pics 移除当前x掉的图片
      // 先获取该图片的索引
      // findIndex((item)=>{}) 遍历 把符合条件的元素的索引进行返回

      // [{pic:图片路径},{pic:图片路径2}]
      let Index = this.form.pics.findIndex(item => {
        return item.pic === file.response.data.tmp_path;
      });
      this.form.pics.splice(Index, 1);
      console.log(this.form.pics);
    },
    //
    handleSuccess(file) {
      // file.data.tmp_path 图片临时上传的路径
      // console.log('成功');
      // 给this.form.pics
      this.form.pics.push({
        pic: file.data.tmp_path
      });

      // console.log(file)
    },
    // 点击不同的tab时
    async tabChange() {
      // 如果点击的是第二个tab 同时 三级分类要有值
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        // 获取数据
        // id -> 分类id
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // console.log(res)
        // attr_name 和 attr_vals
        this.arrDyparams = res.data.data;
        // this.arrDyparams每个对象.attr_vals字符串->数组->v-for
        this.arrDyparams.forEach(item => {
          // 并不是所有的三级分类都有动态参数  -> ""->[]->v-for报错
          // if (item.attr_vals.length!==0) {
          // item.attr_vals = item.attr_vals.trim().split(',')
          // }
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      } else if (this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        //获取静态参数的数据
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        // console.log(res)
        this.arrStaticparams = res.data.data;
      }
    },
    // 级联选择器 @change触发的方法
    handleChange() {},

    // 获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res)
      this.options = res.data.data;
    }
  }
};
</script>

<style>
.alert {
  margin-top: 20px;
}

.ql-editor {
  min-height: 300px;
}
</style>
