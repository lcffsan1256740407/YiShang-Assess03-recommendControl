// 引入封装的axios
import { Service } from "./service";

// 1.封装登录请求

let loginRequest = (account, password) => {
  return Service({
    url: '/user/login',
    data: {
      username: account,
      password: password
    }
  })
}

// ===============================================

// 2.封装获取建议书列表请求

let bookListRequest = (pageNum, insuranceName) => {

  return Service({
    url: "/proposal/listProposal",
    data: {
      pageNum: pageNum,
      insuranceName: insuranceName,
      pageSize: 5,
    },
  });
}

// ===============================================

// 3.获取保险种类请求

let typeRequest = () => {
  return Service({
    url: `/insurance/listInsurance`,
    method: "get"
  });
}

// ===============================================

// 4.根据保险种类ID查询保额保费

let moneyRequest = (insuranceId) => {
  return Service({
    url: "/coveragePremium/listCoveragePremium",
    method: "get",
    params: {
      insuranceId: insuranceId
    }
  })
}

// ===============================================

// 5.保存建议书

let saveRequest = (insuranceId, insuranceName, coverage, premium) => {
  return Service({
    url: "/proposal/saveProposal",
    data: {
      insuranceId,
      insuranceName,
      coverage,
      premium
    }
  })
}

// ===============================================

// 6.完善投被保人信息

let comRequest = (proposal, proposalInsureds) => {
  return Service({
    url: '/proposal/saveProposalDetail',
    data: {
      proposal,
      proposalInsureds
    }
  })
}

// ===============================================

// 7.删除建议书

let deleteRequest = (proposalId) => {
  return Service({
    url: `/proposal/delProposal?proposalId=${proposalId}`,
    method: "get"
  })
}

// ===============================================

// 8.根据建议书id获取建议书详情

let detailRequest = (proposalId) => {
   return Service({
     url:`/proposal/getProposalById?proposalId=${proposalId}`,
     method:"get"
   })
}

// ===============================================

// 9.修改建议书信息接口

let saveAllRequest = (proposal, proposalInsureds) => {
  return Service({
    url:"/proposal/updateProposal",
    data:{
      proposal,
      proposalInsureds
    }
  })
}

export { loginRequest, bookListRequest, typeRequest, moneyRequest, saveRequest, comRequest, deleteRequest ,detailRequest,saveAllRequest}