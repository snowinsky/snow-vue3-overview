<script setup>
import {inject, provide} from "vue";

defineProps({
  comName: {
    type: String,
    required: true
  }
})

/*provide('provideKeyNumber', 234234)
provide('provideKeyString', 'qwerqwr')
provide('provideKeyArray', ['aa','bb','cc'])
provide('provideKeyObject', {id:11231, enName: 'jackji', cnName: '纪'})
provide('provideKeySymbol', index_router)*/

const injectValueNumber = inject('provideKeyNumber')
const injectValueString = inject('provideKeyString')
const injectValueArray = inject('provideKeyArray')
const injectValueObject = inject('provideKeyObject')
const injectValueSymbol = inject('provideKeySymbol')
</script>

<template>
  <!--  注释掉template中的所有内容不会让父组件中的默认值显示出来-->
  <header>这是一个子组件:{{ comName }}</header>
  <p></p>
  <!--  写一个slot标签就可以让父组件的默认值显示出来了-->
  <!--  写多少个slot标签就会产生多少个占位符，父组件就是显示多少个默认值-->
  <!--  即使再slot标签里写多少东西都没用，父组件还是只显示默认值-->
  <!--  slot又叫插槽出口，实际上是一个输出方式。方式就是用父组件中这个自定义标签的content去replace<slot/>这个标签-->
  <slot name="abcdEfg"/>
  <p>插槽出在横线上</p>
  <hr>
  <hr>
  <p>插槽出在横线下</p>
  <slot name="hijk"/>

  <div>
    <header>下面是inject App.vue 上 provide的值</header>
    <p>{{ injectValueNumber }}</p>
    <p>{{ injectValueString }}</p>
    <p>{{ injectValueArray }}</p>
    <p>{{ injectValueObject }}</p>
    <p>{{ injectValueSymbol }}</p>
    <p>aa = {{ injectValueSymbol.aa }}</p>
  </div>
</template>

<script>
export default {
  name: "slot-child"
}
</script>

<style scoped>

</style>