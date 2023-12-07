<template>
  <div class="mx-10.5 my-8 bg-white px-12 py-8 min-h-200 rounded-xl">
    <div
      class="grid gap-12 justify-center"
      style="grid-template-columns: repeat(auto-fill, 18.75rem)"
    >
      <Card
        :item="item"
        v-for="item in list"
        :key="item"
        @play="videoPlay"
        @operate="handleOperate"
      />
    </div>
    <div v-if="!list.length" class="flex justify-center items-center w-full h-full">
      <Empty />
    </div>

    <VideoPreviewModal ref="VideoPreviewRef" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Card from './components/Card.vue';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';
  import { Empty, message } from 'ant-design-vue';
  import VideoPreviewModal from '../components/VideoPreviewModal.vue';

  const { sendMsg } = useWebSocketStore();
  const loading = ref(true);
  const list = ref<any[]>([]);
  const VideoPreviewRef = ref<typeof VideoPreviewModal>();

  sendMsg({ type: Basickey.UserAlbum }, ({ data }) => {
    console.log(data);
    list.value = list.value.concat(data.list);
    loading.value = false;
  });

  function videoPlay(url) {
    VideoPreviewRef.value?.createVideoPreview(url);
  }

  function handleOperate(data) {
    if (data.accepting || data.rejecting) return;
    const is_accept = data.accept;
    const loadingKey = is_accept ? 'accepting' : 'rejecting';
    data[loadingKey] = true;
    sendMsg({ type: Basickey.PUT, data: { ids: [data.id], is_accept } }, (res) => {
      data[loadingKey] = false;
      if (res.status) {
        data.accept_status = true;
        message.success('Successful operation');
        list.value.splice(list.value.findIndex((v) => v.id === data.id) >>> 0, 1);
      }
    });
  }
</script>
