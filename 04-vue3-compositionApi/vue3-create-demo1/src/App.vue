<script setup>
import {ref, provide} from 'vue'
import HelloWorld from './components/HelloWorld.vue';
//<!--    第一版，所有的内容都是堆在这里的，只是用横线分割一下。-->
/*import vue3SetupReturnObject from "@/components/vue3-setup-returnObject.vue";
import vue3SetupReturnFunction from "@/components/vue3-setup-returnRenderFunction.vue";
import vue3SetupRunOrder from "@/components/vue3-setup-runOrder.vue";
import vue3SetupParameters from "@/components/vue3-setup-parameters.vue";
import Vue3SlotTemplate1 from "@/components/slot/vue3-slot-template1.vue";
import SlotParent from "@/components/slot/slot-parent.vue";
import Vue3TemplateUsing from "@/components/vue3-template-using.vue";
import vue3ReactDemo from "@/components/vue3-react-demo.vue";*/

let currentDateTime = new Date();

let objHelloWorldProps = ref({
  msg: 'object.msg',
  user: 'object.user',
  currentTime: new Date()
})


import {abc} from './router/index-router'

provide('provideKeyNumber', 234234)
provide('provideKeyString', 'qwerqwr')
provide('provideKeyArray', ['aa','bb','cc'])
provide('provideKeyObject', {id:11231, enName: 'jackji', cnName: '纪'})
provide('provideKeySymbol', abc)

</script>

<template>
  <header>
    <div class="wrapper">
      <!-- 上面的写法和下面的写法是等效的-->
      <HelloWorld :="objHelloWorldProps" class="logo" style="color: darkred"/>
      <br>
      <HelloWorld msg="程序运行到这里了" user="ABC-价位" :current-time="currentDateTime"/>
    </div>
  </header>

  <main>
    <!--    第一版，所有的内容都是堆在这里的，只是用横线分割一下。-->
    <!--    <hr>1<hr>
        <vue3SetupReturnObject/>
        <hr>2<hr>
        <vue3SetupReturnFunction/>
        <hr>3<hr>
        <vue3SetupRunOrder/>
        <hr>4<hr>
        <vue3SetupParameters/>
        <hr>5<hr>
        <vue3-slot-template1/>
        <hr>6<hr>
        <slot-parent/>
        <hr>7<hr>
        <vue3-template-using/>
        <hr>8<hr>
        <vue3-react-demo>?</vue3-react-demo>-->
    <!--    第二版，每一项内容都用路由的方式切换调用-->
    <div id="routerMain">
      <div id="routerMenu">
        <!--        replace导航后没历史，append会在当前路径下新加，tag将link渲染成需要的标签，比如button-->
        <router-link to="/">Home</router-link>
        |
        <router-link to="/hello_world">Hello World</router-link>
        |
        <router-link to="/setup/return/object" tag="a">Setup返回对象</router-link>
        |
        <router-link to="/setup/return/render">Setup返回渲染函数</router-link>
        |
        <router-link to="/setup/run_order">Setup执行顺序</router-link>
        |
        <router-link to="/setup/props_context">Setup参数分析</router-link>
        |
        <router-link to="/slot/demo1">slot例子1</router-link>
        |
        <router-link to="/slot/demo2">slot例子2</router-link>
        |
        <router-link to="/template/language/demo1">vue模板语言例子1</router-link>
        |
        <router-link to="/react/demo1">vue响应式实现1</router-link>
        |
        <router-link to="/watch/demo1">watch例子1</router-link>
        |
        <router-link to="/component/async">延时组件</router-link>
      </div>
      <div id=" routerDisplay">
        <transition mode='in-out'>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
