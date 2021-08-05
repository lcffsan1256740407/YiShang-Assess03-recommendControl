// 引入封装的axios
import { Service } from "./service";

// 1.封装登录请求

let loginRequest = (account,password) => {
    return Service({
      url: 'login',
      params: {
        username:account,
        password:password
      }
    })
  }

// ===============================================

// 2.封装获取用户列表请求

let userListRequest = (pagenum,pagesize) => {

  return Service({
    url: "users",
    method: "get",
    params: {
      pagenum: pagenum,
      pagesize: pagesize,
    },
  });
}

// ==============================================

// 3.封装删除用户请求

let deleteRequest = (id) => {
  return Service({
    url: `users/${id}`,
    method:"delete"
  });
}

// =============================================

// 4.封装添加用户请求

let addRequest = (ruleForm1) => {
  return Service({
    url: "users",
    data: ruleForm1
  });
}

// ==============================================

// 5.封装编辑用户请求

let editRequest = (msg,msg1,msg2) => {
  return Service({
    url: `users/${msg}`,
    method: "put",
    data: {
      mobile: msg1,
      email: msg2
    },
  });
}

// ==============================================

// 6.封装根据id查询用户信息请求

let lookRequest = (msg) => {
  return Service({
    url: `users/${msg}`,
    method: "get",
  });
}

export {loginRequest,userListRequest,deleteRequest,addRequest,editRequest,lookRequest}