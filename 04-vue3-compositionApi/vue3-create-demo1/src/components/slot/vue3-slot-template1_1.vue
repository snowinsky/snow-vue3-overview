<template>
  <div id="son">
    <!-- 插槽，允许父组件里面的元素在此处插入并显示 -->
    <!-- 默认插槽 -->
    <slot>1251215315</slot>
    <!-- 具名插槽 -->
    <slot name="a"></slot>
    <slot name="b"></slot>
    <!-- 作用域插槽 -->
    <slot name="c" :msg="msg"></slot>
  </div>
</template>

<script>
import {toRef} from "vue";

export default {
  name: "vue3-slot-template1_1",
  setup () {
    const msg = toRef('child component')
    return {msg}
  }
}
</script>

<style scoped>

</style>