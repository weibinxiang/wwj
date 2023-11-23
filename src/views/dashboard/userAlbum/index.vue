<template>
  <div class="mx-10.5 my-8 bg-white px-12 py-8 min-h-200 rounded-xl">
    <div class="grid gap-12" style="grid-template-columns: repeat(auto-fill, 18.75rem)">
      <Card :src="testImg" v-for="item in 10" :key="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Card from './components/Card.vue';
  import testImg from '/@/assets/images/test.png';
</script>
