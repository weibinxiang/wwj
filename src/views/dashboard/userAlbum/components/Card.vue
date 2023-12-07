<template>
  <div class="relative rounded-2xl bg-[#F2F9FF] overflow-hidden h-100">
    <template v-if="item.is_mp4">
      <video
        :src="item.url"
        alt=""
        class="w-full h-full block cursor-pointer object-cover"
        @click="play(item.url)"
      ></video>
      <PlayIcon class="!w-16 !h-16 !text-3xl" @click="play(item.url)" />
    </template>
    <template v-else>
      <img
        :src="item.url"
        alt=""
        class="w-full h-full block cursor-pointer object-cover"
        @click="preview(item.url)"
      />
    </template>
    <div class="flex justify-center absolute bottom-4 w-full left-0" v-if="!item.accept_status">
      <a-button
        danger
        class="mr-3 w-31 h-12 rounded-xl text-lg font-bold"
        @click="operate(false)"
        :loading="item.rejecting"
        >Reject</a-button
      >
      <a-button
        type="primary"
        class="w-31 h-12 rounded-xl text-lg font-bold"
        @click="operate(true)"
        :loading="item.accepting"
        >Accept</a-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { createImgPreview } from '/@/components/Preview';
  import PlayIcon from '../../components/PlayIcon.vue';

  const props = defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
  });

  const emits = defineEmits({
    operate: (data) => data,
    play: (url: string) => url,
  });

  function preview(img) {
    createImgPreview({ imageList: [img] });
  }

  function play(url) {
    emits('play', url);
  }

  function operate(accept) {
    emits('operate', Object.assign(props.item, { accept: accept }));
  }
</script>
