// @ts-ignore
function deepClone(target) {
    // 定义一个变量
    let result;
    if (typeof target !== 'object') {
        result = target;
        return result;
    }
    if (target === null) {
        return null;
    }
    if (target.constructor === RegExp) {
        result = target;
        return result;
    }
    if (target._isAMomentObject === true || target.$L == 'en') {
        result = target;
        return result;
    }
    if (Array.isArray(target)) {
        result = []; // 将result赋值为一个数组，并且执行遍历
        for (let i in target) {
            // 递归克隆数组中的每一项
            result.push(deepClone(target[i]))
        }
        return result;
    }
    //complex object
    result = {};
    for (let i in target) {
        // @ts-ignore
        result[i] = deepClone(target[i]);
    }
    return result;
}

export {deepClone}