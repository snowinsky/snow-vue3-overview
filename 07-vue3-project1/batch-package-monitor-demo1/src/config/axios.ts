import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { storage } from '../utils/storage';
import { PROJECT } from './project';
import { delReq, isEmpty } from '../utils/common';

axios.defaults.timeout = 60000;
// axios.defaults.baseURL ='';

// 请求拦截器：在发送请求前拦截
// @ts-ignore
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // @ts-ignore
    config.headers["Pragma"] = "no-cache";
    // @ts-ignore
    config.headers["token"] = storage.getItem("token");

    // @ts-ignore
    let axiosArray = window["_axiosPromiseArr"] || [];
    let controller = new AbortController();
    config.signal = controller.signal;
    axiosArray.push({ url: config.url, controller });

    if ("get" === config.method) {
        if (undefined == config.params) {
            config.params = {};
        }
        config.params.timestamp = new Date();
    } else if ("post" === config.method) {
        if (undefined == config.data) {
            config.data = {};
        }
        config.data.timestamp = new Date();
    }

    return config
}, error => {
    return Promise.reject(error)
});

// 响应拦截器：在请求响应之后拦截
axios.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('请求响应后处理')
        delReq(response.config.url);
        const contentType = response.headers["content-type"]?.toLowerCase() || '';
        if (!PROJECT.mockSW && contentType.indexOf('json') < 0) {
            return response
        } else {
            return response.data
        }
    },
    error => {
        console.error('请求响应后error', error)
        if (!isEmpty(error) && !isEmpty(error.response)) {
            //440   暂未登录或token已经过期或无效，请重新登录，谢谢。
            //401 界面接口无权限
            if (PROJECT.accessSW && "440" == error.response.status?.toString()) {
                storage.clear()
                window.location.href = '#/login';
            }
            return Promise.reject(error.response)
        } else if ("CanceledError" == error.name) {
            // console.error("CanceledError:", error.code);
            return error;//cache 不捕捉该类型返回，捕捉Promise
        } else {
            return Promise.reject(error)
        }

    }
);
// @ts-ignore
const setAxiosBaseURL = (flag) => {
    if (!flag) {
        // @ts-ignore
        axios.defaults.baseURL = window["AXIOS_URL"];
    }
}
export { setAxiosBaseURL }
export default axios;
