<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    background-color="white"
    text-color="black"
    active-text-color="rgb(253,76,93)"
  >
    <!-- logo部分 -->
    <div class="logo">
      <img
        src="https://ali-imgs.acfun.cn/kos/nlav10360/static/common/widget/header/img/acfunlogo.11a9841251f31e1a3316.svg"
      />
      <span>保险</span>
    </div>
    <!-- 列表一 -->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-unfold"></i>
        <span slot="title">保险汇总</span>
      </template>

      <el-menu-item-group>
        <el-menu-item index="1-1" @click="goToShowListPage">保险列表</el-menu-item>
        <el-menu-item index="1-2">其他</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "BasicMenu",
  methods:{
    goToShowListPage(){
      this.$router.replace({
        name:'list'
      })
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 238px;
  height: 100vh;
  font-family: "Helvetica Neue";
  box-shadow: 1px 0px 5px 2px rgba(165, 165, 165,0.6);
}
.logo {
  margin: 16px;
  display: flex;
  align-content: center;
  align-items: flex-end;
  color: rgb(253, 76, 93);
  font-size: 22px;
  font-weight: bold;
}
.logo img {
  margin-right: 16px;
}
.ant-layout-sider-trigger {
  background-color: rgb(0, 21, 41);
  padding-left: 20px;
  text-align: start;
}

.el-icon-s-unfold {
  color: black;
}
.el-menu-item-group .el-menu-item:hover {
  background: rgb(252,183,194) !important;
}
.el-menu-vertical-demo >>>  .el-submenu__title:hover {
    background: rgb(252,183,194) !important;
  }
</style>