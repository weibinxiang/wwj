<template>
  <div>
    <ColumnCard v-model:active="active" @change="handleCloumnChange" />
    <RouterView />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { CloumnEnum } from './typing';
  import ColumnCard from './column/index.vue';
  import { useRouter } from 'vue-router';

  const active = ref(CloumnEnum.first);
  const router = useRouter();

  function handleCloumnChange(item, index) {
    active.value = index;
    router.push({
      name: item.pathName,
    });
  }
</script>
