<template>
  <div class="mx-10.5 my-8 bg-white px-12 py-8 min-h-200">
    <div class="flex flex-wrap gap-12" @click="visible = true">
      <Card :src="testImg" v-for="item in 10" :key="item" />
    </div>

    <SettingModal v-model:visible="visible" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Card from './components/Card.vue';
  import SettingModal from './components/SettingModal.vue';
  import testImg from '/@/assets/images/test.png';

  const visible = ref(false);
</script>
