<script setup lang="ts">
const abc = ()=>{
  alert('sssss')
}
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div>
      <p class="text-4xl">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <RouterView />
    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="abc"
      >[404]点击报告错误
      </button>
    </div>
  </main>
</template>
