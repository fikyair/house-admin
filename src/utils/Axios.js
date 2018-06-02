import axios from 'axios';
import qs from 'qs';
export const Axios = axios.create({
    baseURL: "http://localhost:8085/", // 因为我本地做了反向代理 需要设置为 / 根目录才能实现
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    // headers: {
    //     "Content-Type": "application/json;charset=utf-8"
    // }
    headers: {
         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
     }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        //  console.log("请求数据中。。。。。。。");
        // 在发送请求之前做某件事
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }
        // 若是有做鉴权token , 就给头部带上token
        return config;
    },
    error => {
        return Promise.reject(error.data.message);
    }
);
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        console.log("请求获取到的数据：");
        console.log(res);
        //对响应数据做些事
        if (res.status != "200") {
            console.log("请求失败了");
            return Promise.reject(res.data.message);
        } else {
            return res;
        }
    },
    error => {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        // if (error.response.status === 403) {
        //     //router.push({path: "/error/403"});
        // }
        // if (error.response.status === 500) {
        //   //  router.push({path: "/error/500"});
        // }
        // if (error.response.status === 502) {
        //    // router.push({path: "/error/502"});
        // }
        // if (error.response.status === 404) {
        //     //router.push({path: "/error/404"});
        // }
// 返回 response 里的错误信息
//         let errorInfo =  error.data.code==="200" ? error.data : error.data.message;
//         return Promise.reject(errorInfo);
    }
);
