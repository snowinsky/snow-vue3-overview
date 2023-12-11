<script setup>
import {defineAsyncComponent} from 'vue'

const HW = {user: 'loading...', msg: 'loading...', currentTime: new Date()}

const AsyncComponentDemo1 = defineAsyncComponent(()=>{
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(import('./HelloWorld.vue'))
  })
});
</script>

<template>
<div>
  <header>I'm an async-component</header>
  <main>
    <AsyncComponentDemo1 v-bind="HW"></AsyncComponentDemo1>
  </main>
</div>
</template>



<style scoped>

</style>