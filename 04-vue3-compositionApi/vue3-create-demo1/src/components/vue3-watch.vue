<script setup lang="ts">
import {ref, computed, watch, watchEffect, reactive} from "vue";

let calcLeft = ref('')
let calcType = ref('')
let calcRight = ref('')

let calcResult = computed(() => {
      let calcLeftValue: number = Number(calcLeft.value);
      let calcRightValue: number = Number(calcRight.value);
      let calcTypeValue: string = calcType.value;
      switch (calcTypeValue) {
        case '+':
          return calcLeftValue + calcRightValue
        case '-':
          return calcLeftValue - calcRightValue
        case '*':
          return calcLeftValue * calcRightValue
        case '/':
          return calcLeftValue / calcRightValue
        default:
          return ''
      }
    }
)

/* watch监听器共三个参数，第一个是监听对象，第二个是监听对象变化时的回调函数，第三个是配置参数(默认深度监听，默认懒执行)*/
/* 默认创建的都是deep=true的深层监听器，监听的是响应对象的所有的属性变化，对于大型对象性能会很差。建议谨慎使用。*/
/* 默认创建的都是immediate=false的非创建时执行的监听器，也就是没法回调监听对象的初始值。*/

//监听器方法，可以监听一个响应式值得变化，当值变化时，可以触发后面的回调函数，回调函数的参数第一个是最新的值，第二个是旧的值
watch(calcType, async (newCalcType, oldCalcType) => {
  console.log("calcType changed from %s to %s", oldCalcType, newCalcType)
})

//监听器方法可以一次监听多个值
watch([calcLeft, calcRight], (newNum, oldNum) => {
  console.log('a' + newNum[0])
  console.log('b' + newNum[1])
})

/*watchEffect是watch的子集，它会立即执行获取初始值，它只会监听所有的对象类型，它只能获取到最新值*/
const objA = reactive({id: 11, enName: 'jackji', cnName: '纪', com: 'abc'})
const changeObjACom = function changeObjACom() {
  //console.log('objA='+objA.com)
  objA.com = objA.com + new Date()
}
//watchEffect里边可以直接写需要监控的值
/*watchEffect有两个参数，第一个就是回调函数，第二个就是配置项(什么时候触发flush)*/
watchEffect(() => {
  console.log("go here" + objA.com)
}, {flush: 'pre'})

</script>


<template>
  <table>
    <tr>
      <td><label>第一个数</label></td>
      <td><label>计算符号</label></td>
      <td><label>第二个数</label></td>
      <td>&nbsp</td>
      <td><label>结果</label></td>
    </tr>
    <tr>
      <td><input v-model="calcLeft"/></td>
      <td><select v-model="calcType">
        <option>+</option>
        <option>-</option>
        <option>*</option>
        <option>/</option>
      </select></td>
      <td><input v-model="calcRight"/></td>
      <td></td>
      <td><input type="text" readonly="readonly" :value="calcResult"/></td>
    </tr>
  </table>
  <button @click="changeObjACom">changeObjAComValue</button>
</template>


<style scoped>

</style>