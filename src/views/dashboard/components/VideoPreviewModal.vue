<template>
  <Modal
    :visible="visible"
    :footer="null"
    class="video-preview-modal"
    centered
    :width="0"
    @cancel="visible = false"
    destroyOnClose
  >
    <video
      :src="url"
      controls
      autoplay
      class="object-contain absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 w-60vw"
    ></video>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Modal } from 'ant-design-vue';

  const visible = ref(false);
  const url = ref('');

  function createVideoPreview(src: string) {
    visible.value = true;
    url.value = src;
  }

  defineExpose({
    createVideoPreview,
  });
</script>

<style lang="less">
  .video-preview-modal {
    .ant-modal-content {
      background: transparent;
      box-shadow: none;

      .ant-modal-close {
        display: none;
      }
    }
  }
</style>
