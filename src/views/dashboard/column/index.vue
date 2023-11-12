<template>
  <div class="px-10.5 py-6 flex gap-6 bg-[#eee]">
    <div
      v-for="(item, index) in column"
      :key="index"
      class="text-center flex-1 bg-[#fff] py-5 cursor-pointer"
      :class="{ '!text-white !bg-[#0084FF]': active === index }"
      @click="handleColumn(item, index)"
    >
      <div class="text-xl fon-bold">{{ item.title }}</div>
      <div
        class="text-4xl fon-bold text-[#0084FF] mt-2 mb-1"
        :class="{ '!text-white ': active === index }"
        >{{ item.number }}</div
      >
      <div class="">{{ item.status }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CloumnEnum } from '../typing';

  defineProps({
    active: {
      type: Number,
      default: CloumnEnum.first,
    },
    column: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  });

  const emits = defineEmits({
    change: (item, index: CloumnEnum) => item || index,
  });

  function handleColumn(item, index) {
    emits('change', item, index);
  }
</script>
