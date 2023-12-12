import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'

// @ts-ignore
import router_index from "./router/index";
//ant-design-vue components 导入ant design常用的组件，并全局注册，避免每个组件都重复注册了
//可以一次性把ant-design-vue中的常用组件都注册了 import Antd from ‘ant-design-vue’; 然后app.use(Antd)
//也可以如下面所示，只注册用到的组件，这样更清晰。
/*import {
    Layout, Table, Result, Form, Radio, Modal, Divider, TimePicker,
    Card, Input, Button, DatePicker, Select, InputNumber,
    Checkbox, Upload, ConfigProvider
} from "ant-design-vue";*/

import Antd from "ant-design-vue";

const thisApp = createApp(App);

/*[Layout, Table, Result, Form, Radio, Modal, Divider, TimePicker,
    Card, Input, Button, DatePicker, Select, InputNumber,
    Checkbox, Upload, ConfigProvider].forEach(c=>thisApp.component(String(c.name), c))*/
thisApp.use(Antd);

thisApp.use(router_index).mount('#app')
