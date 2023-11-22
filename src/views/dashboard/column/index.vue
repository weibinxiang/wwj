<template>
  <div class="px-10.5 py-6 flex gap-6 bg-[#eee]">
    <div
      v-for="(item, index) in column"
      :key="index"
      class="text-center flex-1 bg-[#fff] py-5 cursor-pointer"
      :class="{ '!text-white !bg-[#0084FF]': active === item.pathName }"
      @click="handleColumn(item)"
    >
      <div class="text-xl fon-bold">{{ item.title }}</div>
      <div
        class="text-4xl fon-bold text-[#0084FF] mt-2 mb-1 flex justify-center"
        :class="{ '!text-white ': active === item.pathName }"
      >
        <CountTo :startVal="0" :endVal="item.number" :duration="1000" />
        <div class="w-2.5 h-2.5 rounded-full bg-#F00"></div>
      </div>
      <div class="">{{ item.status }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CloumnEnum } from '../typing';
  import { CountTo } from '/@/components/CountTo/index';

  defineProps({
    active: {
      type: String,
      default: CloumnEnum.first,
    },
    column: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  });

  const emits = defineEmits({
    change: (item) => item,
  });

  function handleColumn(item) {
    emits('change', item);
  }
</script>
