<template>
  <div class="add">
    <h2>新增建议书页</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 保险种类 -->
      <el-form-item label="保险种类" prop="type">
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择保险种类"
          @input="choiceType(ruleForm.type)"
        >
          <el-option
            :label="insuranceList[0].insuranceName"
            :value="insuranceList[0].id"
          ></el-option>
          <el-option
            :label="insuranceList[1].insuranceName"
            :value="insuranceList[1].id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 保险额度 -->
      <el-form-item label="保险额度">
        <el-radio-group v-model="limit" size="small">
          <el-radio label="0" border v-if="ruleForm.type">{{
            coveragePremiumList[0].coverage
          }}</el-radio>
          <el-radio label="1" border v-if="ruleForm.type">{{
            coveragePremiumList[1].coverage
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 保险费用 -->
      <el-form-item label="保险费用" prop="moeny">
        <el-input
          type="text"
          disabled
          :value="coveragePremiumList[limit].premium"
        ></el-input>
      </el-form-item>

      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即保存</el-button
        >
        <el-button type="primary" @click="cancle">立即返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { typeRequest, moneyRequest, saveRequest } from "../../../requestFn";

export default {
  name: "Add",
  data() {
    return {
      // 保险种类列表
      insuranceList: [
        { insuranceName: "", id: "" },
        { insuranceName: "", id: "" },
      ],
      // 保额保费列表
      coveragePremiumList: [
        { coverage: "", premium: "" },
        { coverage: "", premium: "" },
      ],
      limit: "0",
      ruleForm: {
        type: "",
        moeny: "",
      },
      rules: {
        type: [
          { required: true, message: "请选择保险种类", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 保存按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //保存建议书
          let id = this.ruleForm.type
          let typeName = this.insuranceList[this.ruleForm.type-1].insuranceName
          let coverage = this.coveragePremiumList[this.limit].coverage
          let premium = this.coveragePremiumList[this.limit].premium
          saveRequest(id,typeName,coverage,premium).then((res) => {
            //跳出弹窗
            this.$message({
              message: "添加成功,请完善信息",
              type: "success",
              center: true,
            });
            //跳转到完善页面
            this.$router.replace({
              name: "complete",
              query:{
                id:res.content.proposalId
              }
            });
          });
        }
      });
    },
    // 点击返回
    cancle() {
      this.$router.replace({
        name: "list",
      });
    },
    // 选择险种时,根据值查询保额
    choiceType(value) {
      moneyRequest(value).then((res) => {
        console.log(res.content.coveragePremiumList);
        this.coveragePremiumList = res.content.coveragePremiumList;
      });
    },
  },
  mounted() {
    // 开局就查询保险种类
    typeRequest().then((res) => {
      this.insuranceList = res.content.insuranceList;
    });
  },
};
</script>

<style scoped>
.add {
  width: 1200px;
  height: 600px;
  margin: 15px auto;
  padding: 50px 20px 30px 0;
  background-color: white;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add h2 {
  margin: 10px;
  margin-bottom: 60px;
}
.el-button {
  display: inline-block;
  margin-top: 20px;
}
</style>