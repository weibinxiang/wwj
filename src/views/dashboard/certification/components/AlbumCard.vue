<template>
  <div class="relative h-max">
    <img
      :src="data.url"
      alt=""
      class="w-75 h-100 rounded-lg block cursor-pointer object-cover"
      @click="preview(data.url)"
    />
    <div class="absolute bottom-4 w-full left-0 text-center" v-if="!data.accept_status">
      <a-button
        danger
        class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
        @click="operate(false)"
        :loading="data.rejecting"
        >Reject</a-button
      >
      <a-button
        type="primary"
        class="w-32 h-12 rounded-lg text-lg font-bold"
        @click="operate(true)"
        :loading="data.accepting"
        >Accept</a-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { createImgPreview } from '/@/components/Preview';

  const props = defineProps({
    data: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  });

  const emits = defineEmits({
    operate: (data) => data,
  });

  function preview(img) {
    createImgPreview({ imageList: [img] });
  }

  function operate(accept) {
    emits('operate', Object.assign(props.data, { accept: accept }));
  }
</script>
