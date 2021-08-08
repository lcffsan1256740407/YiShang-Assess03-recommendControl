<template>
  <el-container>
    <!-- 菜单 -->
    <el-aside><BasicMenu/></el-aside>

      <el-main>
        <BasicHeader/>
          <router-view></router-view>
      </el-main>

  </el-container>
</template>

<script>
import BasicMenu from "../components/basics/BasicMenu.vue";
import BasicHeader from "../components/basics/BasicHeader.vue";
import BasicFooter from "../components/basics/BasicFooter.vue";

export default {
  name: "HomePage",
  components: { BasicMenu , BasicHeader , BasicFooter },
  mounted(){
    this.$router.replace({
      name:'showlist'
    })
  }
};
</script>

<style scoped>
.el-aside{
    height: 100vh;
    position: fixed;
    z-index: 1;
}
.el-main{
    position: absolute;
    padding: 0;
    left: 238px;
    width: 85%;
}
</style>