<template>
  <div class="bg-[#F7F7F7] min-h-screen text-[#273C62]">
    <div
      class="flex justify-between items-center h-25 pl-10.5 pr-14 bg-white"
      style="box-shadow: 0 2px 0 0 rgb(0 0 0 / 5%)"
    >
      <div class="flex">
        <img src="/src/assets/images/login/tiktok.png" class="w-16 h-16" />
        <div class="text-center text-[#273C62] ml-2">
          <div class="text-3xl font-bold">Victoria Studio</div>
          <div class="text-lg">Customer Service System</div>
        </div>
      </div>
      <div class="flex items-center text-center">
        <img
          src="/src/assets/images/bser-user.png"
          alt=""
          class="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div>
          <div>Andy Lau</div>
          <div class="text-black text-opacity-50 mt-2 cursor-pointer">Log out</div>
        </div>
      </div>
    </div>
    <ColumnCard v-model:active="active" @change="handleCloumnChange" />
    <PageLayout />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { CloumnEnum } from './typing';
  import ColumnCard from './column/index.vue';
  import { useRouter } from 'vue-router';
  import PageLayout from '/@/layouts/page/index.vue';

  const active = ref(CloumnEnum.first);
  const router = useRouter();

  function handleCloumnChange(item, index) {
    active.value = index;
    router.push({
      name: item.pathName,
    });
  }
</script>
