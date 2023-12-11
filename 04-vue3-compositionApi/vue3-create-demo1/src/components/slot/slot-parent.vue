<script setup>
//import SlotChild from "@/components/slot/slot-child.vue"; 只有当这个导入子组件的语句被注释吊的时候，那么默认的slot内容才会被显示出来
import SlotChild from "@/components/slot/slot-child.vue";
</script>
<template>
  <header>这是一个父组件</header>
  <p>slot插槽其实就是一个组件引用另一个组件，并往另一个组件里传参数值的一种方式。</p>
  <p>slot插槽其实是指的父组件传入子组件的值放到子组件的哪个位置，也就是说插槽是针对子组件来说的。子组件给父组件传入的值找一个合适的位置展示。</p>
  <i>下面就是具体的槽的内容了</i>
  <li>slot1==|
    <slot-child com-name="slot1..." #hijk>
      这是标签包含的具体的内容，属于一个子组件自定义标签的content部分，在尖括号里边设定的key value值是子组件的输入参数props。
    </slot-child>
  </li>
  <li>slot2==|
    <slot-child com-name="slot2..." #abcdEfg="slotProps">
      <input type="button" value="这是标签包含的具体的内容，属于一个子组件自定义标签的content部分，在尖括号里边设定的key value值是子组件的输入参数props">
    </slot-child>
  </li>


</template>

<script>
export default {
  name: "slot-parent"
}
</script>

<style scoped>

</style>