<!--这种写法就是把这一段里边的方法和变量都return出去了。这个和下面的export default中的setup不能共存，互相影响。-->
<script setup>
/*ref是拦截了变量的get set方法，从而实时改变页面对应的值。因此它对于新增值，删除值没什么效果*/
import {nextTick, ref, shallowRef, watch} from 'vue';

const b = ref('b');
let a = ref('a')
/*ref关联的变量是深层次的，如果想放弃深层次响应，shallowRef()来放弃*/
/*ref引起的页面更新也不是实时的，nextTick() 会缓冲修改 如果需要等待某个值页面必须变过来才能进行下一个动作，请用await nextTick()*/
/*例如，某些保险条款，必须等客户看完了，签完字，让用户看完了，然后再显示签字按钮*/

/*reactive会把一个对象搞成响应式的，也有深层响应机制，放弃的话，也有类似的方法*/
import {reactive, shallowReactive} from "vue";
/*reactive()返回的并不是对象的原始值，而是返回的对象的代理值，对同一对象不论代理多少次，返回的值都是同一个，就是同一个代理值*/
let objA = reactive({id: 2, enName: 'jackji', cnName: '纪'})
/*reactive方法只能用于对象类型，不能替换整个对象，且一旦被调用对象中的属性就不再有响应性了*/


//计算属性
import {computed} from "vue";

let aa = ref('')
const bb = computed(() => {
  return aa == '123' ? '这是123' : '这不是123'
})


let msg1 = ref('msg1...')

</script>

<template>
  <header>vue3的响应式原理，其实就是ref和reactive两个方法，一个包装基础类型，一个包装对象</header>
  <p>a={{ a }}</p>
  <p>b={{ b }}</p>
  <p>objectA={{ objA }}</p>
  <header>vue3的html里虽然能用javascript表达式，但是不好，最好用computed方法来计算出值来，直接用值</header>
  <input type="text" v-model="aa"/>
  <p>{{ aa == '123' ? '这是123' : '这不是123' }}</p>
  <p>{{ bb }}</p>

  <br>
  @@@@@@@@@@@@@@@@
  <br>
  <input type="text" v-model="msg1">
  <p>{{ msg1 }}</p>
</template>

<!-- 因为和上面的script setup冲突，所以只能留一个，就留个写代码比较省事的
<script>
/*ref是一个桥，让一个普通的常量或者变量可以和页面上的变量自动变化，则就叫响应式*/
import {ref} from 'vue';
export default {
  name: "vue3-react-demo",

  setup(){
    const a = ref("a");



    return {a}
  }
}
</script>-->

<style scoped>

</style>