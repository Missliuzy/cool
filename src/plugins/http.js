// 插件模块

import axios from 'axios'

import {
    Message
} from 'element-ui'


const MyHttpServer = {}

MyHttpServer.install = (Vue) => {

    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

    // .在请求发起之前 会先来到下面的回调函数
    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // console.log('拦截器被触发')

        // console.log(config.url)
        if (config.url !== 'login') {
            const AUTH_TOKEN = localStorage.getItem('token')
            config.headers['Authorization'] = AUTH_TOKEN
        }


        // 在发送请求之前做些什么
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function(response) {
        // console.log(1111111);
        // console.log(response);
        let {
            meta: {
                status,
                msg
            }
        } = response.data
            // status === 200 status===201
        if (status !== 200 && status !== 201) {
            // 提示框
            // this.$message.warning(msg)
            Message.warning(msg)


        }

        // 对响应数据做点什么
        return response;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });










    // 在请求发起之前 设置头部


    // 小明     去超市买东西

    //  添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer