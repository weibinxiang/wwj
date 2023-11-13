<template>
  <Modal :visible="visible" :footer="null" width="58rem" @cancel="close" class="host-album-modal">
    <div class="text-2xl font-bold my-9 text-center">Set Host Profile</div>
    <div class="flex items-center justify-center gap-4">
      <div
        class="relative w-30 h-40 rounded-2xl overflow-hidden"
        v-for="(item, index) in form"
        :key="index"
      >
        <img :src="item" alt="" class="w-full h-full" />
        <div
          class="absolute w-full bottom-0 left-0 h-6 flex items-center justify-center text-white text-xs font-bold bg-[#0084FF]"
          >{{ index }}</div
        >
      </div>
    </div>

    <div class="flex justify-center pt-9 pb-3">
      <a-button danger class="mr-12 w-75 h-12 rounded-xl text-xl font-bold">Cancel</a-button>
      <a-button type="primary" class="w-75 h-12 rounded-xl text-xl font-bold">ok</a-button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import testImg from '/@/assets/images/test.png';

  defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits({
    'update:visible': (val) => val,
  });

  const form = ref({
    Avatar: testImg,
    Cover: testImg,
    Video: testImg,
  });

  function close() {
    console.log(2323);
    emits('update:visible', false);
  }
</script>

<style lang="less">
  .host-album-modal {
    .ant-modal-content {
      padding: 20px 24px !important;
    }
  }
</style>
