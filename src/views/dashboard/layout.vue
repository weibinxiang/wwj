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
    <ColumnCard v-model:active="active" :column="column" @change="handleCloumnChange" />
    <PageLayout />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { CloumnEnum } from './typing';
  import ColumnCard from './column/index.vue';
  import { useRouter } from 'vue-router';
  import PageLayout from '/@/layouts/page/index.vue';

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
  const router = useRouter();
  const active = ref(
    column.value.findIndex((item) => item.pathName === router.currentRoute.value.name) ||
      CloumnEnum.first,
  );

  function handleCloumnChange(item, index) {
    console.log(router.currentRoute.value.name);
    active.value = index;
    router.push({
      name: item.pathName,
    });
  }
</script>

<style lang="less">
  .ant-btn-default.ant-btn-dangerous {
    border: 1px solid rgb(0 0 0 / 20%) !important;
  }
</style>
