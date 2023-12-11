import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router_index from "./router/index-router";

createApp(App).use(router_index).mount('#app')
