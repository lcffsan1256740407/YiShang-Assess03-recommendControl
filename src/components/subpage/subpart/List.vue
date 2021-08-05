<template>
  <div>
    <!-- 列表区域 -->


    <!-- 页码区域 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="n * 10"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
      return {
          listArray:[
              {username:"保险1号",mobile:"30000"}
          ],
          n:''
      }
  },
  methods: {
    // 切换页码
    changePage() {},
  },
};
</script>

<style scoped>

</style>