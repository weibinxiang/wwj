<template>
  <div class="relative h-max" @click="play(data.url)">
    <video
      :src="data.url"
      alt=""
      class="w-75 h-100 rounded-lg block cursor-pointer object-cover"
    ></video>
    <PlayIcon class="!w-16 !h-16 !text-3xl" />

    <div class="absolute bottom-4 w-full left-0 text-center" v-if="!data.accept_status">
      <a-button
        danger
        class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
        @click.stop="operate(false)"
        :loading="data.rejecting"
        >Reject</a-button
      >
      <a-button
        type="primary"
        class="w-32 h-12 rounded-lg text-lg font-bold"
        @click.stop="operate(true)"
        :loading="data.accepting"
        >Accept</a-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import PlayIcon from '../../components/PlayIcon.vue';

  const props = defineProps({
    data: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  });

  const emits = defineEmits({
    operate: (data) => data,
    play: (url: string) => url,
  });

  function play(url) {
    emits('play', url);
  }

  function operate(accept) {
    emits('operate', Object.assign(props.data, { accept: accept }));
  }
</script>
