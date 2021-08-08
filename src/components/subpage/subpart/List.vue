<template>
  <div class="list">
    <h2>保险建议书</h2>

    <!-- 列表区域 -->

    <el-table :data="listArray" style="width: 100%">
      <el-table-column label="保险种类" prop="insuranceName"> </el-table-column>
      <el-table-column label="保额" prop="coverage"> </el-table-column>
      <el-table-column label="保费" prop="premium"> </el-table-column>
      <el-table-column label="投保人" prop="applicantName"> </el-table-column>
      <el-table-column label="性别" prop="applicantMale"> </el-table-column>

      <el-table-column align="right" width="250">
        <template slot="header" slot-scope="scope">
          <el-input
            prefix-icon="el-icon-search"
            v-model="search"
            @change="searchFn"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row.id)"
            v-if="scope.row.proposalState == 2"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="handleComplete(scope.row.id)"
            v-else
            >完善</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部区域 -->
    <div class="btm">
      <!-- 页码区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="n * 10"
        @current-change="changePage"
        :current-page.sync="page"
      >
      </el-pagination>

      <!-- 新增按钮 -->
      <el-button type="primary" @click="handleAdd">+ 点击新增</el-button>
    </div>
  </div>
</template>

<script>
import { bookListRequest , deleteRequest } from "../../../requestFn";

export default {
  name: "List",
  data() {
    return {
      listArray: [],
      n: "",
      search: "",
      page:1
    };
  },
  methods: {
    // 搜索
    searchFn() {
      this.changePage(1)
      this.page = 1
    },
    // 切换页码
    changePage(number) {
      this.page = number
      bookListRequest(number,this.search).then((res) => {
        this.listArray = res.content.list;
        this.listArray.forEach((item) => {
          item.applicantMale = item.applicantMale == 1 ? "男" : "女";
        });
        this.n = res.content.total / 5;
      });
    },

    // 添加按钮
    handleAdd() {
      this.$router.replace({
        name: "add",
      });
    },
    // 完善按钮
    handleComplete(id) {
      this.$router.replace({
        name:'complete',
        query:{
          id
        }
      })
    },
    // 修改按钮
    handleEdit(id) {
      this.$router.replace({
        name: "edit",
        query:{
          id
        }
      });
    },
    // 删除按钮
    handleDelete(id) {
      deleteRequest(id).then(
        res => {
          this.changePage(1)
        }
      )
    },
  },
  mounted() {
    // 查询建议书列表第一页(默认设置成一页最多5条)
    bookListRequest(1).then((res) => {
      this.listArray = res.content.list;
      this.listArray.forEach((item) => {
        item.applicantMale = item.applicantMale == 1 ? "男" : "女";
      });
      this.n = res.content.total / 5;
    });
  },
};
</script>

<style scoped>
.list {
  margin: 15px auto;
  width: 1200px;
  padding: 10px;
  padding-bottom: 50px;
  border-radius: 5px;
  /* box-shadow: 1px 1px 10px 2px rgb(180, 178, 178); */
  background-color: white;
}
.list h2 {
  margin: 20px 10px;
  border-bottom: 1px solid silver;
  padding-bottom: 50px;
}
.btm {
  margin-top: 125px;
  padding-right: 10px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(253, 76, 93);
}
</style>