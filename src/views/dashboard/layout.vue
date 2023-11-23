<template>
  <div class="bg-[#F7F7F7] min-h-screen text-[#273C62]">
    <div class="fixed left-0 top-0 w-full z-50">
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
    </div>
    <div class="pt-71.5">
      <PageLayout />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
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
      count: 689,
      new: false,
      status: 'pending',
      pathName: 'Certification',
      list: [],
    },
    [Basickey.HostAlbum]: {
      title: 'Host Album & Story',
      count: 9085,
      new: false,
      status: 'pending',
      pathName: 'HostAlbum',
      list: [],
    },
    [Basickey.UserAlbum]: {
      title: 'User Album & Story',
      count: 7,
      new: false,
      status: 'pending',
      pathName: 'UserAlbum',
      list: [],
    },
    [Basickey.TextContent]: {
      title: 'Text Content',
      count: 42,
      new: false,
      status: 'pending',
      pathName: 'TextContent',
      list: [],
    },
    [Basickey.Feedback]: {
      title: 'Feedback',
      count: 689,
      new: false,
      status: 'pending',
      pathName: 'Feedback',
      list: [],
    },
    [Basickey.OnlineService]: {
      title: 'Online Service',
      count: 689,
      new: false,
      status: 'pending',
      pathName: 'Service',
      list: [],
    },
  });

  for (const key in column.value) {
    if (key !== Basickey.OnlineService) {
      sendMsg({ type: key as Basickey }, (data) => {
        column.value[key].count = data.count;
        column.value[key].list = data.list;
        column.value[key].new = true;
      });
    }
  }

  const router = useRouter();
  const active = ref<string>(
    (router.currentRoute.value.name as string) || column.value[Basickey.HostCertification].pathName,
  );

  function handleCloumnChange(item) {
    active.value = item.pathName;
    router.push({
      name: item.pathName,
    });
    item.new = false;
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
