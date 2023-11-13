<template>
  <div class="relative rounded-2xl bg-[#F2F9FF] overflow-hidden">
    <img
      :src="src"
      alt=""
      class="w-full h-full block cursor-pointer object-cover"
      @click="preview(src)"
    />
    <div class="flex justify-center absolute bottom-4 w-full left-0">
      <a-button danger class="mr-3 w-31 h-12 rounded-xl text-lg font-bold">Reject</a-button>
      <a-button type="primary" class="w-31 h-12 rounded-xl text-lg font-bold">Accept</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { createImgPreview } from '/@/components/Preview';

  defineProps({
    src: {
      type: String,
      default: '',
    },
  });

  defineEmits({
    accept: () => true,
    reject: () => true,
  });

  function preview(img) {
    createImgPreview({ imageList: [img] });
  }
</script>
