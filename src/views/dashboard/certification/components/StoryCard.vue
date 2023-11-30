<template>
  <div class="relative h-max" @click="play(src)">
    <view :src="src" alt="" class="w-75 h-100 rounded-lg block cursor-pointer object-cover" />
    <PlayIcon class="!w-16 !h-16 !text-3xl" />

    <div class="absolute bottom-4 w-full left-0 text-center">
      <a-button danger class="mr-3 w-32 h-12 rounded-lg text-lg font-bold">Reject</a-button>
      <a-button type="primary" class="w-32 h-12 rounded-lg text-lg font-bold">Accept</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import PlayIcon from '../../components/PlayIcon.vue';

  defineProps({
    src: {
      type: String,
      default: '',
    },
  });

  const emits = defineEmits({
    accept: () => true,
    reject: () => true,
    play: (url: string) => url,
  });

  function play(url) {
    emits('play', url);
  }
</script>
