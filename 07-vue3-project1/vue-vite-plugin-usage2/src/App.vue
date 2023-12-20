<script setup lang="ts">
//import {RouterLink, RouterView} from 'vue-router'
</script>
<template>

  <header>
    <div>
      <nav>
        <RouterLink to="/homeview">Home</RouterLink>
        &nbsp;
        <RouterLink to="/aboutview">About</RouterLink>
        &nbsp;
        <RouterLink to="/menu/mainmenu">MainMenu</RouterLink>
        &nbsp;
        <RouterLink to="/elplus/demo1">Element-Plus-Demo1</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <div>
      <RouterView/>
    </div>
  </main>
</template>

<style scoped>
</style>
