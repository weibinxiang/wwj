<template>
  <div class="mx-10.5 my-8 bg-white px-12 py-8 min-h-200 host-album rounded-xl">
    <div class="flex flex-wrap gap-12">
      <Card
        :item="item"
        v-for="item in list"
        :key="item.id"
        @accept="visible = true"
        @play="videoPlay"
      />
    </div>

    <SettingModal v-model:visible="visible" @play="videoPlay" />

    <VideoPreviewModal ref="VideoPreviewRef" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Card from './components/Card.vue';
  import SettingModal from './components/SettingModal.vue';
  import VideoPreviewModal from '../components/VideoPreviewModal.vue';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';

  const visible = ref(false);
  const list = ref<any[]>([]);
  const { setTypeCallback } = useWebSocketStore();
  const VideoPreviewRef = ref<typeof VideoPreviewModal>();

  setTypeCallback({
    type: Basickey.HostAlbum,
    callback: (res) => {
      console.log(res);
      list.value = res.list;
    },
  });

  function videoPlay(url) {
    VideoPreviewRef.value?.createVideoPreview(url);
  }
</script>
