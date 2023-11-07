<template>
  <div class="px-10.5 py-6 flex gap-6 bg-[#eee]">
    <div
      v-for="(item, index) in column"
      :key="index"
      class="text-center text-[#273C62] flex-1 bg-[#fff] py-5 cursor-pointer"
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
  import { ref } from 'vue';
  import { CloumnEnum } from '../typing';

  defineProps({
    active: {
      type: Number,
      default: CloumnEnum.first,
    },
  });

  const emits = defineEmits({
    change: (item, index: CloumnEnum) => item || index,
  });

  const column = ref([
    {
      title: 'Host Certification',
      number: 689,
      new: false,
      status: 'pending',
      pathName: 'Certification',
    },
    {
      title: 'Host Album & Story',
      number: 9085,
      new: false,
      status: 'pending',
      pathName: 'HostAlbum',
    },
    {
      title: 'User Album & Story',
      number: 7,
      new: false,
      status: 'pending',
      pathName: 'UserAlbum',
    },
    {
      title: 'Text Content',
      number: 42,
      new: false,
      status: 'pending',
      pathName: 'TextContent',
    },
    {
      title: 'Feedback',
      number: 689,
      new: false,
      status: 'pending',
      pathName: 'Feedback',
    },
    {
      title: 'Online Service',
      number: 689,
      new: false,
      status: 'pending',
      pathName: 'Service',
    },
  ]);

  function handleColumn(item, index) {
    emits('change', item, index);
  }
</script>
