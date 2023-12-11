import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue';
import vue3SetupReturnObject from "../components/vue3-setup-returnObject.vue";
import vue3SetupReturnFunction from "../components/vue3-setup-returnRenderFunction.vue";
import vue3SetupRunOrder from "../components/vue3-setup-runOrder.vue";
import vue3SetupParameters from "../components/vue3-setup-parameters.vue";
import Vue3SlotTemplate1 from "../components/slot/vue3-slot-template1.vue";
import SlotParent from "../components/slot/slot-parent.vue";
import Vue3TemplateUsing from "../components/vue3-template-using.vue";
import vue3ReactDemo from "../components/vue3-react-demo.vue";
import vue3Watch from "../components/vue3-watch.vue"
import vue3AsyncComponent from "../components/vue3-async-component.vue"

import {computed} from "vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/hello_world',
        name: 'helloWorld',
        component: HelloWorld,
        props: {
            msg: 'come from router hello',
            user: 'router-user',
            currentTime: new Date()
        }
    },
    {
        path: '/setup/return/object',
        name: 'setupReturnObject',
        component: vue3SetupReturnObject
    },
    {
        path: '/setup/return/render',
        name: 'setupReturnRender',
        component: vue3SetupReturnFunction
    },
    {
        path: '/setup/run_order',
        name: 'setupRunOrder',
        component: vue3SetupRunOrder
    },
    {
        path: '/setup/props_context',
        name: 'setupPropsContext',
        component: vue3SetupParameters
    },
    {
        path: '/slot/demo1',
        name: 'slotDemo1',
        component: Vue3SlotTemplate1
    },
    {
        path: '/slot/demo2',
        name: 'slotDemo2',
        component: SlotParent
    },
    {
        path: '/template/language/demo1',
        name: 'templateLanguage',
        component: Vue3TemplateUsing
    },
    {
        path: '/react/demo1',
        name: 'reactDemo1',
        component: vue3ReactDemo
    },
    {
        path: '/',
        name: 'home',
        component: HelloWorld
    },
    {
        path: '/watch/demo1',
        name: 'watchDemo1',
        component: vue3Watch
    },
    {
        path: '/component/async',
        name: 'AsyncComponent',
        component: vue3AsyncComponent
    },
]

const index_router = createRouter({
    history: createWebHistory(),
    routes
})

export const abc:object = computed(()=>{return {'aa':234234,'bb':'asfqwfqf'}});

export default index_router;