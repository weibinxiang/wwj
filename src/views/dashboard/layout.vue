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
          :src="UserStore.getUserInfo.avatar"
          alt=""
          class="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div>
          <div>{{ UserStore.getUserInfo.nickname }}</div>
          <div class="text-black text-opacity-50 mt-2 cursor-pointer" @click="handleLoginOut"
            >Log out</div
          >
        </div>
      </div>
    </div>
    <ColumnCard v-model:active="active" :column="column" @change="handleCloumnChange" />
    <PageLayout />
  </div>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import ColumnCard from './column/index.vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '/@/store/modules/user';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';
  import PageLayout from '/@/layouts/page/index.vue';

  const UserStore = useUserStore();
  const { sendMsg } = useWebSocketStore();
  const column = ref({
    [Basickey.HostCertification]: {
      title: 'Host Certification',
      number: 689,
      new: false,
      status: 'pending',
      pathName: 'Certification',
    },
    [Basickey.HostAlbum]: {
      title: 'Host Album & Story',
      number: 9085,
      new: false,
      status: 'pending',
      pathName: 'HostAlbum',
    },
    [Basickey.UserAlbum]: {
      title: 'User Album & Story',
      number: 7,
      new: false,
      status: 'pending',
      pathName: 'UserAlbum',
    },
    [Basickey.TextContent]: {
      title: 'Text Content',
      number: 42,
      new: false,
      status: 'pending',
      pathName: 'TextContent',
    },
    [Basickey.Feedback]: {
      title: 'Feedback',
      number: 689,
      new: false,
      status: 'pending',
      pathName: 'Feedback',
    },
    [Basickey.OnlineService]: {
      title: 'Online Service',
      number: 689,
      new: false,
      status: 'pending',
      pathName: 'Service',
    },
  });

  nextTick(() => {
    sendMsg({ type: Basickey.HostCertification }, (data) => {
      console.log(data);
    });
  });

  const router = useRouter();
  const active = ref<string>(
    (router.currentRoute.value.name as string) || column.value[Basickey.HostCertification].pathName,
  );

  function handleCloumnChange(item) {
    active.value = item.pathName;
    router.push({
      name: item.pathName,
    });
  }

  function handleLoginOut() {
    UserStore.confirmLoginOut();
  }
</script>

<style lang="less">
  .ant-btn-default.ant-btn-dangerous {
    border: 1px solid rgb(0 0 0 / 20%) !important;
  }
</style>
