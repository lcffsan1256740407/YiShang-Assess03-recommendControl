<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>详情页面</span>
    </div>
    <div>
        <el-form
          :model="proposal"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
      <!-- 保险类型信息 -->
      <div style="border-bottom: 1px solid silver">
        <h3>保险类型信息</h3>
          <!-- 保险种类 -->
          <el-form-item label="保险名称" prop="moeny">
            <el-input
              type="text"
              disabled
              :value="proposal.insuranceName"
            ></el-input>
          </el-form-item>

          <!-- 保险额度 -->
          <el-form-item label="保额">
            <el-radio-group
              v-model="proposal.coverage"
              size="small"
              @change="chocieMoney"
            >
              <el-radio :label="coveragePremiumList[0].coverage" border>{{
                coveragePremiumList[0].coverage
              }}</el-radio>
              <el-radio :label="coveragePremiumList[1].coverage" border>{{
                coveragePremiumList[1].coverage
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 保险费用 -->
          <el-form-item label="保费" prop="moeny">
            <el-input
              type="text"
              disabled
              :value="`${arry[0].premium} 元`"
            ></el-input>
          </el-form-item>
      
      </div>

      <!-- 投保人信息 -->
      <div style="border-bottom: 1px solid silver">
        <h3>投保人信息</h3>

          <el-form-item label="姓名" prop="applicantName">
            <el-input v-model="proposal.applicantName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group
              v-model="proposal.applicantMale"
              size="small"
              fill="#fd4c5d"
            >
              <el-radio-button label="1">男</el-radio-button>
              <el-radio-button label="0">女</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="身份证号" prop="applicantIdNo">
            <el-input v-model="proposal.applicantIdNo"></el-input>
          </el-form-item>

      </div>

      <!-- 被保人 -->
      <h3>被保人</h3>
      <ul style="border-bottom: 1px solid silver; padding-bottom: 20px">
        <li v-for="(item, index) in proposalInsureds" :key="index">
          <div>
            <span v-if="item.isEdit"
              >姓名:
              <input type="text" v-model="item.insuredName" class="names"
            /></span>

            <span v-else>姓名: {{ item.insuredName }}</span>

            <span v-if="item.isEdit"
              >性别:
              <el-radio-group
                v-model="item.insuredMale"
                size="small"
                fill="#fd4c5d"
              >
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="0">女</el-radio-button>
              </el-radio-group>
            </span>

            <span v-else>性别: {{ item.insuredMale == 1 ? "男" : "女" }}</span>

            <span v-if="item.isEdit"
              >身份证:
              <input type="text" v-model="item.insuredIdNo" class="number"
            /></span>

            <span v-else>身份证: {{ item.insuredIdNo }}</span>
          </div>

          <!-- 编辑按钮 -->
          <el-button type="success" size="mini" @click="handleEdit(item, index)"
            >编辑</el-button
          >
        </li>
      </ul>

      <!-- 确认修改按钮 -->
      <el-button type="primary" class="save" @click="save('ruleForm')">确认修改</el-button>

      </el-form>
    </div>
  </el-card>
</template>

<script>
import { detailRequest, moneyRequest , saveAllRequest } from "../../../requestFn";

export default {
  name: "Edit",
  data() {
    // 投保人身份证验证
    var validateIdNo = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("身份证号不能为空"));
      } else {
        let reg =
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

        if (reg.test(value) == true) {
          callback();
        }
        callback(new Error("身份证格式错误"));
      }
    };
    return {
      // 保额保费列表
      coveragePremiumList: [
        { coverage: "", premium: "" },
        { coverage: "", premium: "" },
      ],
      // 准确保费列表
      arry: [{ coverage: "", premium: "" }],
      // 投保人
      proposal: {},
      // 被投保人
      proposalInsureds: [],
      rules: {
        applicantName: [
          { required: true, message: "请输入投保人姓名", trigger: "blur" },
        ],
        applicantIdNo: [
          { required: true, validator: validateIdNo, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 被投保人编辑按钮
    handleEdit(item, index) {
      // 如果当前是处于编辑状态,就校验数据格式
      if (item.isEdit == true) {
        if (
          this.checkName(item.insuredName, index, item) &&
          this.checkNumber(item.insuredIdNo, index, item)
        ) {
          item.isEdit = !item.isEdit;
        } else {
          this.checkNumber(item.insuredIdNo, index, item);
        }
      } else {
        item.isEdit = !item.isEdit;
      }
    },
    // 选择准确的保费
    chocieMoney() {
      // 获取准确的保费
      let arry = this.coveragePremiumList.filter((item) => {
        return item.coverage == this.proposal.coverage;
      });
      this.arry = arry;
      this.proposal.coverage = this.arry[0].coverage
      this.proposal.premium = this.arry[0].premium
    },
    //  被保人验证身份证号
    checkNumber(number, index, item) {
      // 获取当前的input框
      let numinput = document.getElementsByClassName("number")[index];
      if (number == "") {
        this.$notify.error({
          title: "身份证号错误",
          message: "身份证号不可为空",
        });
        numinput.style.border = "1px solid red";
        item.isNub = false;
        return false;
      } else {
        // 正则匹配
        let reg =
          /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if (reg.test(number) == true) {
          numinput.style.border = "1px solid black";
          item.isNub = true;
          return true;
        } else {
          this.$notify.error({
            title: "身份证号错误",
            message: "身份证号格式错误,无效的身份证号",
          });
          numinput.style.border = "1px solid red";
          item.isNub = false;
          return false;
        }
      }
    },
    //  被保人验证姓名
    checkName(name, index, item) {
      // 获取当前的input框
      let nameinput = document.getElementsByClassName("names")[index];
      if (name == "") {
        this.$notify.error({
          title: "姓名错误",
          message: "姓名不可为空",
        });
        nameinput.style.border = "1px solid red";
        item.isName = false;
        return false;
      } else {
        // 正则匹配
        let reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
        if (reg.test(name) == true) {
          nameinput.style.border = "1px solid black";
          item.isName = true;
          return true;
        } else {
          this.$notify.error({
            title: "姓名错误",
            message: "姓名格式不正确",
          });
          nameinput.style.border = "1px solid red";
          item.isName = false;
          return false;
        }
      }
    },
    //  保存数据回到列表页
    save(formName) {
      // 验证投保人数据
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证被保人数据
          if(this.proposalInsureds.length == this.proposalInsureds.filter( item => {
            return item.isEdit == false
          }).length){
            // 发送修改建议书请求
            saveAllRequest(this.proposal,this.proposalInsureds).then(
              res => {
                this.$router.replace({
                  name:'list'
                })
              }
            )
          }else{
            alert("请先确认被保人编辑状态")
          }
        }
      });
    },
  },
  mounted() {
    detailRequest(this.$route.query.id).then((res) => {
      // 获取投保人及保险信息
      this.proposal = res.content.proposal;
      // 获取被投保人信息
      this.proposalInsureds = res.content.proposalInsureds;
      // 往被投保人信息里面添加响应式属性isEdit
      this.proposalInsureds.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
      // 获取保额保费
      moneyRequest(res.content.proposal.insuranceId).then((res) => {
        // 获取保额
        this.coveragePremiumList = res.content.coveragePremiumList;
        // 获取准确的保费
        let arry = res.content.coveragePremiumList.filter((item) => {
          return item.coverage == this.proposal.coverage;
        });
        this.arry = arry;
      });
    });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
ul li {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
ul li input {
  outline: none;
  font-size: 15px;
  padding: 2px;
}
ul li > div {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
}
h3 {
  margin: 25px;
}
.save {
  margin-top: 35px;
  margin-left: 550px;
}
</style>