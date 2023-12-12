import { Modal } from "ant-design-vue";
import { deepClone } from "./clone";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

const All_Option = {
    label: "所有",
    value: ""
};

const confirm = (callback, param) => {
    const obj: any = {
        title: "确认",
        content: "是否确认删除",
        icon: createVNode(ExclamationCircleOutlined),
        okText: "确认",
        cancelText: "取消",
        onOk() {
            callback(param);
        }
    };
    Modal.confirm(obj);
};

const confirmModal = (obj: any) => {
    Modal.confirm(obj);
};

const errorModal = (obj: any) => {
    Modal.error(obj);
};

const infoModal = (obj: any) => {
    Modal.info(obj);
};

const successModal = (obj: any) => {
    Modal.success(obj);
};

const destroyAllModal = () => {
    Modal.destroyAll();
};
/**
 * 从数组arr中删除数组delArr中的值
 * @param arr
 * @param delArr
 */
const delArr = (arr, delArr) => {
    if (Array.isArray(arr)) {
        return arr.filter((item) => delArr.indexOf(item) < 0);
    } else {
        return arr;
    }
};

/**
 * 获取数组的交集
 * @param arr
 * @param delArr
 */
const crosArr = (arr, anotherArr) => {
    if (Array.isArray(arr)) {
        return arr.filter((item) => anotherArr.some((one) => item == one));
    } else {
        return arr;
    }
};
/**
 * 内嵌数组的处理
 * @param arr
 * @param delArr
 */
const inArray = (arr, key) => {
    if (Array.isArray(arr)) {
        arr.map((item) => {
            item.title = item.title + item[key];
            if (Array.isArray(item.children) && item.children.length > 0) {
                inArray(item.children, key);
            }
            return item;
        });
    }
    return arr;
};
/**
 * 判断数据是否为空
 * @param data 空 true
 * @returns 
 */
const isEmpty = (data) => {
    return !(null != data && undefined != data && '' != data)
};
/**
 * 判断是否是IE浏览器
 * @returns 
 */
const isIE = () => {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
};
/**
 * 浏览器兼容性提示页面
 */
const compatibleTip = () => {
    if (isIE()) {//IE进入浏览器兼容性提示页面
        window.location.href = "/noie/index.html";
    }
}
const getLgChar = (char, length) => {
    let res = "";
    for (let i = 0; i < length; i++) {
        res += char;
    }
    return res;
};

/**
 * 取消路由跳转时已经发出的请求
 * 请求取消，响应会报对应错误
 * @param excludeList 不取消的列表
 */
const cancelReq = (excludeList) => {
    let axiosArray = window["_axiosPromiseArr"];
    let exclueCancel = []
    if (Array.isArray(axiosArray) && axiosArray.length > 0) {
        axiosArray.forEach((req, index) => {
            if (excludeList.indexOf(req.url) < 0) {
                if (!isEmpty(req.controller) && !isEmpty(req.controller.signal) && !req.controller.signal.aborted) {//signal
                    req.controller.abort();
                } else if (!isEmpty(req.cancel)) {//signal
                    req.cancel();
                }
            } else {
                exclueCancel.push(req);
            }
        });
        window["_axiosPromiseArr"] = exclueCancel;
        // console.debug("not canceled req:", exclueCancel)
    }
};

/**
 * 删除已经完成的请求，已经完成不需要取消
 * @param url 
 */
const delReq = (url) => {
    let axiosReq = window["_axiosPromiseArr"];
    // console.debug("Complete req is :", url)
    if (Array.isArray(axiosReq) && axiosReq.length > 0) {
        const num = axiosReq.findIndex((one) => {
            return one.url == url;
        });
        axiosReq.splice(num, 1);
        // console.debug("Del complete Req:", axiosReq)
    }
};
export {
    deepClone,
    confirm,
    confirmModal,
    errorModal,
    infoModal,
    successModal,
    destroyAllModal,
    delArr,
    inArray,
    crosArr,
    isIE,
    getLgChar,
    isEmpty,
    compatibleTip,
    cancelReq,
    delReq,
    All_Option
};
