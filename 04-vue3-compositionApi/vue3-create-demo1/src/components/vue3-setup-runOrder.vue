<template>
  <h2>测试setup方法的执行的顺序</h2>
  <hr>
</template>

<script>
export default {
  name: "setupComponent",
  /*整个vue模板组件的生命周期的第一项，可以说在源码加载到内存实例化时执行*/
  setup() {
     console.log("this is setup...")
  },
  /*组件实例化之后立即执行*/
  beforeCreate() {
    console.log("beforeCreate")
  },
  /*组件处理完所有和状态相关的选项之后*/
  created() {
    console.log("created")
  },
  /*模板被挂到html中之前*/
  beforeMount() {
    console.log("beforeMount")
  },
  /*模板被挂到html中之后*/
  mounted() {
    console.log("mounted")
  },
  /*dom树变更之前*/
  beforeUpdate() {
    console.log("beforeUpdate")
  },
  /*dom树变更之后*/
  updated() {
    console.log("updated")
  },
  /*模板从html摘下来之前*/
  beforeUnmount() {
    console.log("beforeUnmount")
  },
  /*模板从html摘下来之后*/
  unmounted() {
    console.log("unmounted")
  },
  /*捕获到错误之后*/
  errorCaptured() {
    console.log("errorCaptured")
  },
  renderTracked () {
    console.log("renderTracked ")
  },
  renderTriggered () {
    console.log("renderTriggered ")
  },
  activated() {
    console.log("activated")
  },
  deactivated() {
    console.log("deactivated")
  },
  serverPrefetch () {
    console.log("serverPrefetch ")
  }


}
</script>

<style scoped>

</style>