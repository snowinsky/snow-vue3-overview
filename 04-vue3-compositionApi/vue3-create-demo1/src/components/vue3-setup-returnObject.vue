<template>
  <h2>setup返回一个对象，并使用对象中的属性和方法</h2>
  <p>姓名：{{ student.name }}</p>
  <p>年龄：{{ student.age }}</p>
  <button @click="hello">点击查看控制台信息</button>
  <hr>
</template>

<script>
export default {
  name: "setupComponent",
  setup() {
    // 属性
    let student = {
      name: '张三',
      age: 18,
    }

    // 方法
    function hello() {
      console.log(`大家好，我叫${student.name},今年${student.age}`)
    }

    return {
      student,
      hello,
    }
  }
}
</script>

<style scoped>

</style>