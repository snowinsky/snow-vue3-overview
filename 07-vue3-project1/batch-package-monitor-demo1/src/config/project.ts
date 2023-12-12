const API_CONF = {
  baseUrl: "/",
  jobName: "boss-bff-web",
  dnsSuffix: ".hccn"
};
/**
 * 是否是线上环境
 * @type {boolean}
 */
const PROD_ENV: boolean =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod";


/**
 * 引入 mock 数据
 * @constructor
 */
const mockData = (flag) => {
  if (flag) {
    require("@/config/mock");
  }
};
/**
 * 初始化发送的请求的列表
 */
const initAxiosResArr = () => {
  let reqArr = window["_axiosPromiseArr"];
  if (undefined == reqArr || null == reqArr) {
    window["_axiosPromiseArr"] = [];
  }
}
initAxiosResArr()

/**
 * 根据引入的conf中env.js中的window.env获取当前环境
 * @constructor
 */
const onlineEnvOfFile = () => {
  if (!PROD_ENV) {
    window["env"] = "uat";
  } else if (undefined === window["env"] || null === window["env"]) {
    window["env"] = "prod";
  }
};
onlineEnvOfFile();

/**
 * 设置axios的请求路径
 * @param middle 当前环境
 * @constructor
 */
const apiDnsConf = (middle: any) => {
  if (PROD_ENV) { //线上环境 uat/prod/sit
    window["dns"] = API_CONF["jobName"] + "." + middle + API_CONF["dnsSuffix"];
    window["AXIOS_URL"] = "https://" + window["dns"] + API_CONF["baseUrl"];
    // window["wsURI"] = 'wss://' + window["dns"];
  } else { //开发环境 develop
    window["dns"] = API_CONF["jobName"] + ".sit" + API_CONF["dnsSuffix"];
    if ((window as any).__POWERED_BY_QIANKUN__) {
      window["AXIOS_URL"] = "https://" + API_CONF["jobName"] + ".sit" + API_CONF["dnsSuffix"] + API_CONF["baseUrl"];
    } else {
      window["AXIOS_URL"] = API_CONF["baseUrl"];
    }
    // window["wsURI"] = 'ws://' + window["dns"];
  }
};

apiDnsConf(window["env"]);

//项目的各项配置信息
const PROJECT = {
  chinessName: "",
  englishName: "",
  env: "uat", //uat /prod 线上环境//window["env"]
  themeMode: "dark",
  themeColor: "#206FE6",//设置主题色
  lang: "zh_CN",//国际化
  version: 'common', //项目是否是区分了版本的 al commons
  accessSW: PROD_ENV ? true : true, //是否开启权限校验 440等状态是否直接退出登录
  mockSW: PROD_ENV ? false : true, //是否开启mock 配置是否开启mock功能
};

//mockData(PROJECT.mockSW);

export { PROJECT };
