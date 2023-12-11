<template>
  <h2>测试setup方法的输入参数</h2>
  <hr>
</template>

<script>
import {toRefs} from 'vue'

export default {
  name: "setupComponent",
  props: {
    msg: String,
    ans: String,
  },
  setup(props, context) {
    // ************* 这些是响应式的，不能直接解析出值来 *********************
    console.log(props);
    const {msg, ans} = toRefs(props)
    console.log(msg.value);
    console.log(ans.value);
    // **********************************
    // **************** 这些不是响应式的，可以直接解析******************
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log('透传的request中的attributes $attrs' + context.attrs)

    // 插槽（非响应式的对象，等价于 $slots）
    console.log('插槽(<slot>vue3内置的标签，相当于给子组件挖了一个槽，父组件引用子组件时，付给子组件的值会被显示在子组件的那个slot的位置)' + context.slots)

    // 触发事件（函数，等价于 $emit）
    console.log('触发的事件' + context.emit)

    // 暴露公共属性（函数）
    console.log('暴露的公共属性或者函数' + context.expose)
  }
}
</script>

<style scoped>

</style>