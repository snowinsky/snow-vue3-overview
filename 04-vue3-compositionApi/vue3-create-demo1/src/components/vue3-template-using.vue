<template>
  <header>vue的模板语法的简单使用</header>

  <p>显示变量a={{ a }}</p>

  <p>显示变量b={{ b }}, b如果是html=<span v-html="b"></span></p>

  <p><input type="button" value="{{c}}"/> c没有办法用于html标签的属性值，想绑定属性值得用v-bind
    <input type="button" v-bind:value="c"/>
    可以简写<input type="button" :value="c"></p>

  <p><input type="checkbox" name="sex" :checked="d"/>这种boolean类型的变量直接决定这个属性要不要存在 </p>

  <p v-bind="objA">
    直接用v-bind=“变量名”可以直接绑定一个对象，但不知道有什么用。好像只是为了扩展其绑定css样式用的。{{ objA.enName }}</p>

  <p>{{ e }}被按逗号拆分再按->组合={{ e.split(',').reverse().join("->") }}
    也就是vue里可以用javascript的所有表达式。所有的{{}}和v-XXX=''里都可以用javascript的表达式</p>

  <p><input type="button" :value="fun1(d)"/> {{ fun1(e) }} v-xxx和{{}}里面也可以用方法名</p>

  <div>
    <p>v指令就是vue特有的属性，v指令是用来替换原有html的某些没有响应式功能的标签属性的。</p>
    <ul>
      <li>v-html='value' 变量的值按html样式展示</li>
      <li>v-bind:key='value' v-bind='value' 变量的值绑定给一个key</li>
          <p>v-bind:class  这个不太懂，等遇上再说吧</p>
      <li>v-slot:key='value' v-slot='value' 父组件上指定传入的值的显示位置</li>
      <li>v-model:key='value' v-model='value'  为了绑定表单上的某一个输入值</li>
      <div>text:{{inputText}} <input v-model="inputText"/></div>
      v-model="textName" 相当于v-model:name="textName"
      <li>v-on: v-on  这是监听页面上的事件的</li>
      <li>v-cloak</li>
      <li>v-if v-else-if v-else  这是条件判断，符合条件就渲染，不符合就不渲染</li>
          <div v-if="ifParam === 'A'">
            A
          </div>
          <div v-else-if="ifParam === 'B'">
            B
          </div>
          <div v-else-if="ifParam === 'C'">
            C
          </div>
          <div v-else>
            Not A/B/C
          </div>
      <li>v-for  这是循环渲染同一元素</li>
          <span v-for="l in demoList">{{l.aa}},</span>
      <li>v-memo</li>
      <li>v-once</li>
      <li>v-pre</li>
      <li>v-show 这个只能传入true或者false，来确认每一个元素显示还是不显示</li>
            <h1 v-show="showOk">Hello!</h1>
      <li>v-text</li>
    </ul>
    <p>v指令冒号后面的key就是参数，冒号前面的内容可以省略</p>
    <p>v-on:可以被简写成@来说明是个动作</p>
    <p>如果v指令冒号后面的key参数是动态的，则用[动态参数值]来表示。（不能用javascript表达式）</p>
    <p>v指令冒号后面的key后面如果还有点，那个点后面就是修饰符。表示动作在哪些场景下成立，例如：</p>
    <p>v-on:click.prevent="onClickPrevent('abc')"</p>
  </div>


</template>

<script>
import {ref} from 'vue';

export default {
  name: "vue3-template-using",
  setup() {
    let a = ref('变量值')
    let b = ref('<input type="button" value="假按钮">')
    let c = '按钮的value值来源于一个{{}}的变量c'
    let d = false
    let objA = {
      id: 1,
      enName: 'JackJi',
      cnName: '纪',
      nowDate: new Date()
    }
    let e = 'a,b,c,d'
    let fun1 = function (param1) {
      console.log(param1);
      //alert('请确认你的输入：' + param1)
      return param1
    }

    const isActive = ref(true)
    const hasError = ref(false)

    const ifParam = ref('B')

    const showOk = ref(true)

    const demoList = ref([{aa:'aa'},{aa:'bb'},{aa:'cc'}])

    return {a, b, c, d, objA, e, fun1, isActive, hasError, ifParam, showOk, demoList}
  }
}
</script>

<style scoped>

</style>