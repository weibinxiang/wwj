<template>
  <div class="mx-10.5 my-8 bg-white px-12 py-8 min-h-200 rounded-xl">
    <div class="grid gap-12" style="grid-template-columns: repeat(auto-fill, 18.75rem)">
      <Card :src="testImg" v-for="item in list" :key="item" />
    </div>
    <div v-if="!list.length" class="flex justify-center items-center w-full h-full">
      <Empty />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Card from './components/Card.vue';
  import testImg from '/@/assets/images/test.png';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';
  import { Empty } from 'ant-design-vue';

  const { sendMsg } = useWebSocketStore();
  const list = ref<any[]>([]);

  sendMsg({ type: Basickey.UserAlbum }, ({ data }) => {
    console.log(data);
    list.value = data.list;
  });
</script>
