<template>
  <div class="mx-10.5 my-8 bg-white px-12 py-8 min-h-200 host-album">
    <div class="flex flex-wrap gap-12">
      <Card
        :src="testImg"
        v-for="item in 10"
        :key="item"
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
  import testImg from '/@/assets/images/test.png';

  const visible = ref(false);
  const VideoPreviewRef = ref<typeof VideoPreviewModal>();

  function videoPlay(url) {
    VideoPreviewRef.value?.createVideoPreview(url);
  }
</script>
