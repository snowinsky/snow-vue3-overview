<script setup>
import vue3SlotTemplate1_1 from './vue3-slot-template1_1.vue'
</script>

<template>
  <div id="father">
    <p>这是个slot的实例</p>
    <vue3SlotTemplate1_1>
      <!-- 下面的节点如果没有使用插槽，将不会显示 -->
<!--      // 新版本中的写法：v-slot:插槽名 或 #插槽名-->
      <template v-slot:c="slotProps">
        {{slotProps.msg}}
      </template>
      <!-- 也可以缩写为 #插槽名 -->
<!--      <template #c="slotProps">
        {{slotProps.msg}}
      </template>-->
    </vue3SlotTemplate1_1>
  </div>
</template>

<script>
export default {
  name: "vue3-slot-template1"
}
</script>

<style scoped>

</style>