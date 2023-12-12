<template>
  <div v-show="isAccessShow(path,limit)" class="access primary-color">
    <slot></slot>
  </div>
</template>
<script setup>
defineProps({
  path: {
    type: String,
  },
  limit: {
    type: Array
  }
});

function isAccessShow(path, limitRequest){
  if (null != limitRequest && undefined != limitRequest && limitRequest.length > 0) {
    const visible = limitRequest.some(item => path == item.path)
    return !visible;
  }
  return true;
}
</script>
<style lang="less" scoped>
.access {
  margin: 0 10px;
  display: inline-block;
}
</style>