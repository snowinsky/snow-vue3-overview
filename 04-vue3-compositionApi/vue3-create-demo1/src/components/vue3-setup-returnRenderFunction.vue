<template>
  <p>下面是一行文字</p>
  <h1>setup返回一个函数1</h1>
  <h1>setup返回一个函数2</h1>
  <p>上面是一行文字</p>
  <p>如果看不到这行文字，就表示这里被渲染了</p>
</template>

<script>
import {h, ref} from 'vue'
export default {
  name: "setupComponent1",
  setup(){
    const msg = ref(545455)
    /*确实没有弄明白这个有什么用*/
    return()=>h('h1','<p>'+msg.value+'</p>')
  }
}
</script>

<style scoped>

</style>