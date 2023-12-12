import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from "vue-router";

// @ts-ignore
import PackageMonitorIndex from '../views/index.vue';

const routers: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/index",
    },
    {
        path: "/index",
        component: () => PackageMonitorIndex
    }
]

const router_index: Router = createRouter({
    history: createWebHashHistory(),
    routes: routers
});

export default router_index;