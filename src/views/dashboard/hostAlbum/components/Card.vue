<template>
  <div class="rounded-lg bg-[#F2F9FF] p-4 flex items-center">
    <div class="bg-[#F8F9EA] rounded-lg mr-6.5 h-92 w-60 overflow-hidden relative">
      <img
        :src="item.certification_photo_url"
        alt=""
        class="w-full h-full block cursor-pointer object-cover"
        @click="preview(item.certification_photo_url)"
      />
      <div class="flex items-center justify-center absolute bottom-7 w-full left-0">
        <img class="w-6 mr-2" src="/src/assets/images/content/icon-success.png" />
        <div
          class="text-[#FA4A82] text-base font-bold"
          style="text-shadow: 0 0 2px rgb(0 0 0 / 30%)"
          >Certification photo</div
        >
      </div>
    </div>
    <div class="bg-[#E5FAE6] rounded-lg h-92 w-60 relative overflow-hidden relative">
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

      <div class="flex justify-center absolute bottom-4 w-full left-0">
        <a-button
          danger
          class="mr-3 w-25.5 h-12 rounded-xl text-lg font-bold"
          @click="operate(false)"
          :loading="item.rejecting"
          >Reject</a-button
        >
        <a-button
          type="primary"
          class="w-25.5 h-12 rounded-xl text-lg font-bold"
          @click="operate(true)"
          :loading="item.accepting"
          >Accept</a-button
        >
      </div>
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

  function operate(accept) {
    emits('operate', Object.assign(props.item, { accept: accept }));
  }

  function play(url) {
    emits('play', url);
  }
</script>
