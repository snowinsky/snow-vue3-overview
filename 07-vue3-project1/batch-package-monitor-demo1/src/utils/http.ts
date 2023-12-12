import { PROJECT } from "../config/project";
import axios from "../config/axios";
import { errorModal, destroyAllModal, isEmpty } from "./common";

const serverCodeMessage: { [key: number]: string } = {
    200: "服务器成功返回请求的数据",
    400: "错误的请求",
    401: "未授权",
    403: "禁止请求",
    404: "接口错误",
    500: "服务器发生错误，请检查服务器(Internal Server Error)",
    502: "网关错误(Bad Gateway)",
    503: "服务不可用，服务器暂时过载或维护(Service Unavailable)",
    504: "网关超时(Gateway Timeout)"
};

/**
 * 错误的通用处理函数
 * @param error
 * @constructor
 */
const AXIOS_ERROR_HANDLE = (error: any) => {
    //默认操作
    if (error != undefined && error.status != 403) {
        destroyAllModal();
        const mes = serverCodeMessage[error.status] || error.data?.resMessage;
        errorModal({ title: mes });
    } else {
        destroyAllModal();
        errorModal({ title: "网络错误，请稍后再试" });
    }
};
/**
 * 成功的通用处理函数
 * @param successCallback
 * @param res
 * @constructor
 */
const AXIOS_SUCCESS_HANDLE = (res: any) => {
    //默认操作
    if (!isSuccess(res)) {
        if (!isEmpty(res.resMessage)) {
            destroyAllModal();
            errorModal({ title: res.resMessage });
        } else {
            destroyAllModal();
            errorModal({ title: serverCodeMessage[500] });
        }
    }
};
/**
 * 直接获取返回数据
 * @param path
 * @param param
 * @returns {Promise<unknown>}
 */
const get = async (path: string, param?: any) => {
    return new Promise((resolve, reject) => {
        axios.get(path, param)
            .then((res) => {
                resolve(res);
                AXIOS_SUCCESS_HANDLE(res);
            }).catch((error) => {
                if ((error.status && "403" != error.status.toString()) || isEmpty(error.status)) {
                    reject(error);
                }
                AXIOS_ERROR_HANDLE(error);
            });
    });
};

const post = (path: string, param?: any) => {
    return new Promise((resolve, reject) => {
        axios.post(path, param).then((res) => {
            resolve(res);
            AXIOS_SUCCESS_HANDLE(res);
        }).catch((error) => {
            reject(error);
            AXIOS_ERROR_HANDLE(error);
        });
    });
};
const del = (path: string, param?: any) => {
    return new Promise((resolve, reject) => {
        axios.delete(path, param)
            .then((res) => {
                resolve(res);
                AXIOS_SUCCESS_HANDLE(res);
            }).catch((error) => {
                reject(error);
                AXIOS_ERROR_HANDLE(error);
            });
    });
};
const config = (param: any) => {
    return new Promise((resolve, reject) => {
        axios(param).then((res) => {
            resolve(res);
            AXIOS_SUCCESS_HANDLE(res);
        }).catch((error) => {
            reject(error);
            AXIOS_ERROR_HANDLE(error);
        });
    });
};
// @ts-ignore
const all = (config) => {
    // @ts-ignore
    const list = config.map((one) => {
        return axios(one); //.catch(error=>({error}))
    });
    return new Promise((resolve, reject) => {
        axios.all(list).then((...res) => {
            const someError = res.some((every: any) => every.error);
            if (someError) {
                throw res;
            }
            resolve(res);
        }).catch((error: any) => {
            reject(error);
            AXIOS_ERROR_HANDLE(error);
        });
    });
};
/**
 * let formFile = new FormData()
   formFile.append('ruleContent', this.uploadData.file)//文件
 * @param {{
    method: 'post',
    url: '',
    async: false,
    timeout: 60000,
    cache: false,//上传文件无需缓存
    processData: false,//用于对data参数进行序列化处理 这里必须false
    contentType: false, //必须
    data: formFile
  }} config 
 */
const upload = (param: any, formData: any) => {
    return new Promise((resolve, reject) => {
        axios({
            async: false,
            timeout: 60000,
            cache: false, //上传文件无需缓存
            processData: false, //用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            data: formData,
            ...param
        }).then((res) => {
            resolve(res);
            AXIOS_SUCCESS_HANDLE(res);
        }).catch((error) => {
            reject(error);
            AXIOS_ERROR_HANDLE(error);
        });
    });
};
const downFileDirectly = (blob: Blob, fileName: string) => {
    const downloadElement = document.createElement("a");
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //this.recordData.fileName;//下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
};
/**
 * 交互的响应blob处理
 * @param res 
 * @param splitSymbol 
 * @returns 
 */
// @ts-ignore
const blobFile = (res, splitSymbol) => {
    if (PROJECT.mockSW) {
        //mockjs 引用导致responseType:"blob"被重写为json了，因此需要把转成json的数据重新转为想要的格式
        res.data = new Blob([JSON.stringify(res.data)], { type: "application/json" })
    }
    const docType = res.headers["content-type"]?.toLowerCase() || '';
    if (200 == res.status && res.data && res.data instanceof Blob) {//数据是以blob格式接收
        const blob = new Blob([res.data], { type: docType });
        const fileAttr = "Content-Disposition";
        const contentDis = res.headers[fileAttr] || res.headers[fileAttr.toLowerCase()];
        if (isEmpty(contentDis)) {
            errorModal({ title: "下载错误,'content-disposition'服务端未授权" });
            return;
        }
        // @ts-ignore
        if (!!window.ActiveXObject || "ActiveXObject" in window) {      //兼容IE10 11
            try {
                // window.open(url);
                // navigator.msSaveOrOpenBlob(blob, this.recordData.fileName);//下载没有后缀名的文件存在安全限制，需要调低安全级别
                const fileName = contentDis.split(splitSymbol)[1];
                // let name = unescape(fileName.replace(/&#x/g, '%u').replace(/;/g, ''));
                (navigator as any).msSaveBlob(blob, fileName);
            } catch (e) {
                console.error("IE problem", e);
            }
        } else {
            try {
                console.info(res.headers[fileAttr], res.headers[fileAttr.toLowerCase()]);
                let fileName = contentDis.split(splitSymbol)[1];
                if (docType.includes("utf-8")) {
                    fileName = decodeURIComponent(fileName);
                }
                downFileDirectly(blob, fileName);
            } catch (e) {
                console.error("Chrome problem", e);
            }
        }
    } else {
        errorModal({ title: "未能正常接收文件流，下载失败" });
    }
}
// @ts-ignore
const downloadHttp = (param, splitSymbol = "filename=") => {
    axios(param).then((res: any) => {
        blobFile(res, splitSymbol)
    }).catch((e) => {
        console.error(e);
        if (!isEmpty(e) && !isEmpty(e.response) && 404 === e.status) {
            errorModal({ title: "下载文件未找到" });
        } else {
            errorModal({ title: "下载错误，请稍后再试" });
        }
    });
};

/**
 * 用来统一判断是否成功返回的方法
 * @param res
 */
// @ts-ignore
const isSuccess = (res) => {
    if (res.resCode?.toString() == "200") {
        return true;
    } else {
        return false;
    }
};

export default {
    get: get,
    post: post,
    delete: del,
    all: all,
    config: config,
    upload: upload,
    down: downloadHttp,
    isSuccess: isSuccess,
    blobFile: blobFile
};
