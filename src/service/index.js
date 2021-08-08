import axios from 'axios'


//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: "http://localhost:8083",
  method: 'post'
})

// 添加请求拦截器
Service.interceptors.request.use(config => {
    console.log(config)
    let token = localStorage.getItem("token")
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.token = token;   
        return config;
    }

    return config
})


// 添加响应拦截器
Service.interceptors.response.use(

 response => {
        return response.data
    },
 error => {
        return Promise.reject(error)
})