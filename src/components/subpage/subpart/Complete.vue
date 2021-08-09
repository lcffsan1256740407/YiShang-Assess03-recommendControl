<template>
  <div class="complete">
    <!-- 投保人 -->
    <el-card class="box-card people">
      <div slot="header" class="clearfix">
        <span>投保人</span>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 姓名 -->
          <el-form-item label="姓名" prop="name">
            <el-input
              type="name"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 性别 -->
          <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.sex" size="small">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 身份证号 -->
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="ruleForm.idNumber"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 被保人 -->
    <el-card class="box-card bepeople">
      <div slot="header" class="clearfix">
        <span>被保人</span>
      </div>
      <ul>
        <li v-for="(item, index) in listArry" :key="item.id">
          <div>
            <span v-show="item.isEdit"
              >姓名:
              <input type="text" v-model="item.insuredName" class="names"
            /></span>
            <span v-show="!item.isEdit">姓名:{{ item.insuredName }}</span>

            <span v-show="item.isEdit"
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
            <span v-show="!item.isEdit">性别:{{ item.insuredMale == 1 ? "男" : "女" }}</span>

            <span v-show="item.isEdit"
              >身份证:
              <input type="text" v-model="item.insuredIdNo" class="number"
            /></span>
            <span v-show="!item.isEdit">身份证:{{ item.insuredIdNo }}</span>
          </div>

          <!-- 按钮区域 -->
          <div class="btns">
            <el-button
              type="success"
              size="mini"
              @click="item.isEdit = !item.isEdit"
              v-if="!item.isEdit && item.isNub && item.isName"
              >编辑</el-button
            >

            <el-button
              class="sure"
              type="success"
              size="mini"
              @click="makesure(item, index)"
              v-if="item.isEdit && index + 1 != listArry.length"
              >确定</el-button
            >

            <el-button
              class="sure"
              type="primary"
              size="mini"
              @click="makesure(item, index)"
              v-if="index + 1 == listArry.length"
              >新增</el-button
            >

            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(index)"
              v-show="index + 1 != listArry.length"
              >删除</el-button
            >
          </div>
        </li>
      </ul>

      <el-button type="primary" class="save" @click="save('ruleForm')"
        >保存</el-button
      >
      <el-button type="primary" class="save" @click="back">返回</el-button>
    </el-card>
  </div>
</template>

<script>
import { comRequest } from "../../../requestFn";

export default {
  name: "Complete",
  data() {
    // 姓名验证
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
        let reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;

        if (reg.test(value) == true) {
          callback();
        }
        callback(new Error("姓名格式错误"));
      }
    };
    // 身份证号验证
    var validateIdNumber = (rule, value, callback) => {
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
      listArry: [
        {
          insuredName: "",
          insuredMale: "1",
          insuredIdNo: "",
          isEdit: true,
          isNub: false,
          isName: false,
        },
      ],
      // 验证数据
      ruleForm: {
        name: "",
        idNumber: "",
        sex: "1",
      },
      // 验证规则
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        idNumber: [
          { required: true, validator: validateIdNumber, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //  新增被保人
    addNew() {
      this.listArry.push({
        insuredName: "",
        insuredMale: "1",
        insuredIdNo: "",
        isEdit: true,
        isNub: false,
        isName: false,
      });
    },
    //  删除按钮
    handleDelete(index) {
      this.listArry.splice(index, 1);
      //  如果数组空了,就立马给它加一个空的上去
      if (this.listArry.length == 0) {
        this.addNew();
      }
    },
    // 确定按钮
    makesure(item, index) {
      // 校验姓名和身份证号的调用
      if (
        this.checkName(item.insuredName, index, item) &&
        this.checkNumber(item.insuredIdNo, index, item)
      ) {
        item.isEdit = !item.isEdit;
        if (this.listArry[index + 1] == undefined) this.addNew();
      } else {
        this.checkNumber(item.insuredIdNo, index, item);
      }
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 需要两个参数对象  proposal,proposalInsureds
          let proposal = {
            id: this.$route.query.id,
            applicantName: this.ruleForm.name,
            applicantMale: this.ruleForm.sex,
            applicantIdNo: this.ruleForm.idNumber,
          };
          if (this.listArry.length <= 2) {
            let proposalInsureds = this.listArry.slice(
              0,
              this.listArry.length - 1
            );
            if (proposalInsureds.length == 0) {
              alert("请至少填写一名被保人");
            } else {
              comRequest(proposal, proposalInsureds).then((res) => {
                this.$router.replace({
                  name: "list",
                });
              });
            }
          } else {
            let proposalInsureds = this.listArry.slice(
              0,
              this.listArry.length - 2
            );
            if (proposalInsureds.length == 0) {
              alert("请至少填写一名被保人");
            } else {
              comRequest(proposal, proposalInsureds).then((res) => {
                this.$router.replace({
                  name: "list",
                });
              });
            }
          }
        }
      });
    },
    //  直接返回列表页
    back() {
      this.$router.replace({
        name: "list",
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.box-card {
  width: 1100px;
  margin: 50px auto;
}
::v-deep .el-input__inner {
  width: 400px;
}
.belist {
  display: flex;
}
.belist >>> .el-input__inner {
  width: 100px;
}
ul {
  list-style: none;
  border-bottom: 1px solid silver;
  padding-bottom: 20px;
}
ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}
ul li span {
  display: inline-block;
  margin: 15px;
  width: 246px;
}
ul li input {
  outline: none;
  font-size: 15px;
  padding: 2px;
}
.save {
  margin-top: 35px;
  margin-left: 500px;
}
</style>