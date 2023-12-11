<script setup>
/*每一个vue文件就是一块可以复用的html。相当于一个自定义标签。这是给这个自定义标签定义输入参数*/
defineProps({
  msg: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  currentTime:{
    type: Date,
    required: false
  }
})

/*
继承来的透传attributes会直接merge到template下的第一个元素上。
如果不想继承这东西，
可以如下面那么配置，
然后用$attrs[html中的属性名xxx-yyy]来获取
*/
defineOptions({
  inheritAttrs:false
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">I'm [{{user}}]: "[{{ msg }}]"</h1>
    <p>Now the time is [{{currentTime}}]</p>
    <hr>
    <p>{{$attrs}}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
