<template>
  <Modal :visible="visible" :footer="null" width="58rem" @cancel="close" class="host-album-modal">
    <div class="text-2xl font-bold my-9 text-center">Set Host Profile</div>
    <div class="flex items-center justify-center gap-4">
      <div
        class="relative w-30 h-40 rounded-2xl overflow-hidden"
        v-for="(item, key) in form"
        :key="key"
        @drop="onDrop($event, key)"
        @dragover="(e) => e.preventDefault()"
      >
        <img :src="item" alt="" class="w-full h-full" />
        <div
          class="absolute w-full bottom-0 left-0 h-6 flex items-center justify-center text-white text-xs font-bold bg-[#0084FF]"
          >{{ key }}</div
        >
      </div>
    </div>

    <div class="min-h-40 flex items-center mt-6">
      <div class="transform -rotate-90 w-min font-bold text-lg">Album</div>
      <div class="flex-1 overflow-hidden relative">
        <div class="absolute w-full h-full left-0 top-0 mask pointer-events-none"></div>
        <div class="flex gap-4 overflow-x-auto">
          <img
            src="https://img0.baidu.com/it/u=530426417,2082848644&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
            alt=""
            class="w-30 h-40 rounded-2xl"
            v-for="item in 10"
            :key="item"
            :draggable="true"
            @dragstart="onDragStart($event, item)"
          />
        </div>
      </div>
    </div>

    <div class="min-h-40 flex items-center mt-6">
      <div class="transform -rotate-90 w-min font-bold text-lg">Story</div>
      <div class="flex-1 overflow-hidden relative">
        <div class="absolute w-full h-full left-0 top-0 mask pointer-events-none"></div>
        <div class="flex gap-4 overflow-x-auto">
          <video
            src="https://ttmini.yizhiwechat.com/yitui/duanju/tutorial.mp4"
            alt=""
            class="w-30 h-40 rounded-2xl"
            v-for="item in 10"
            :key="item"
            :draggable="true"
            @dragstart="onDragStart($event, item)"
            @click="play('https://ttmini.yizhiwechat.com/yitui/duanju/tutorial.mp4')"
          ></video>
        </div>
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
    play: (url: string) => url,
  });

  const form = ref({
    Avatar: testImg,
    Cover: testImg,
    Video: 'https://ttmini.yizhiwechat.com/yitui/duanju/tutorial.mp4',
  });

  function close() {
    console.log(2323);
    emits('update:visible', false);
  }

  function onDragStart(e, item) {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        value:
          'https://img0.baidu.com/it/u=530426417,2082848644&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
        id: item,
      }),
    );
  }

  function onDrop(e, key) {
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    form.value[key] = data.value;
    console.log(e, JSON.parse(e.dataTransfer.getData('text/plain')));
  }

  function play(url) {
    emits('play', url);
  }
</script>

<style lang="less">
  .host-album-modal {
    .ant-modal-content {
      padding: 20px 24px !important;
    }

    .mask {
      background: linear-gradient(
        90deg,
        rgb(255 255 255 / 100%) 0%,
        rgb(0 0 0 / 0%) 3.63%,
        rgb(0 0 0 / 0%) 96.24%,
        rgb(255 255 255 / 100%) 100%
      );
    }
  }
</style>
