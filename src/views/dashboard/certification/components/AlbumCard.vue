<template>
  <div class="relative h-max">
    <img
      :src="src"
      alt=""
      class="w-75 h-100 rounded-lg block cursor-pointer object-cover"
      @click="preview(src)"
    />
    <div class="absolute bottom-4 w-full left-0 text-center">
      <a-button danger class="mr-3 w-32 h-12 rounded-lg text-lg font-bold">Reject</a-button>
      <a-button type="primary" class="w-32 h-12 rounded-lg text-lg font-bold">Accept</a-button>
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
