<template>
  <div id="app0" class="tzc_group_bt">
    <!-- 通过 `{{ 变量名 }}` 语法渲染响应式变量 -->
    <p>Hello {{ userName }}!</p>

    <!-- 通过 `v-model` 双向绑定响应式变量 -->
    <!-- 通过 `@input` 给输入框绑定输入事件，输入的时候触发的事件 -->
    <input
        type="text"
        v-model="userName"
        placeholder="输入名称打招呼"
        @input="printLog"
    />

    <!-- 通过 `@click` 给按钮绑定点击事件, click的时候触发一个叫reset的方法 -->
    <button @click="reset">重置</button>
    <button @click="register">注册</button>
  </div>
</template>

<style scoped>
.tzc_group_bt {
  font-family: "Agency FB";
}
</style>

<script>
const {createApp, ref} = Vue
createApp({
  // `setup` 是一个生命周期钩子
  setup() {
    // 默认值
    const DEFAULT_NAME = 'World'

    // 用于双向绑定的响应式变量 把一个值绑定给页面上的一个对象
    const userName = ref(DEFAULT_NAME)

    // 打印响应式变量的值到控制台
    function printLog() {
      // `ref` 变量需要通过 `.value` 操作值
      console.log(userName.value)
    }

    // 重置响应式变量为默认值
    function reset() {
      userName.value = DEFAULT_NAME
      printLog()
    }

    function register() {
      var newUser = userName.value;
      console.log('call backup server to save new user is ' + newUser)
    }

    // template中用到的所有的function，需要绑定的parameter，都需要return 出去才可以被模板使用
    return {userName, printLog, reset, register}
  },
}).mount('#app0')
</script>