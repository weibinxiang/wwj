<template>
  <div class="relative rounded-lg bg-[#F2F9FF] p-4 flex items-center">
    <div class="pt-8 px-1 bg-[#F8F9EA] rounded-lg mr-6.5 h-92">
      <img
        :src="src"
        alt=""
        class="w-60 h-60 block cursor-pointer object-cover"
        @click="preview(src)"
      />
      <div class="flex items-center justify-center pt-11">
        <img class="w-6 mr-2" src="/src/assets/images/content/icon-success.png" />
        <div class="text-[#FA4A82] text-base font-bold">Certification photo</div>
      </div>
    </div>
    <div class="pt-8 px-1 bg-[#E5FAE6] rounded-lg h-92">
      <video :src="src" alt="" class="w-60 h-60 block cursor-pointer object-cover"></video>
      <div class="flex justify-center pt-8">
        <a-button danger class="mr-3 w-25.5 h-12 rounded-xl text-lg font-bold">Reject</a-button>
        <a-button type="primary" class="w-25.5 h-12 rounded-xl text-lg font-bold">Accept</a-button>
      </div>
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
