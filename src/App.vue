<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 直接飞到登录页面
    // this.$router.replace({
    //   name:'login'
    // })

    // 直接飞到主页
    this.$router.replace({
      name: "list",
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body{
  overflow-x: hidden;
}
</style>
