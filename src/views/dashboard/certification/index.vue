<template>
  <div class="mx-10 my-11 bg-white rounded-xl flex">
    <div class="p-6">
      <div
        class="relative w-60 rounded-lg flex flex-col items-center justify-center pt-6 pb-7 bg-[#FA4A820D] mb-6 cursor-pointer last:mb-0"
        v-for="(item, index) in list"
        :key="item"
        :class="{ '!text-white !bg-[#0084FF]': active === index }"
        @click="select(index)"
      >
        <img
          src="/src/assets/images/content/icon-review.png"
          class="w-30 absolute left-0 top-0"
          v-if="index === 3"
        />
        <img :src="item.info?.head_pic" alt="" class="w-30 h-30 rounded-full object-cover mb-6" />
        <div class="flex items-center mb-3.5">
          <img :src="item.country?.country_flag" class="w-4 h-4 mr-2" />
          <div class="text-base font-bold">{{ item.country?.country }}</div>
        </div>
        <div class="text-sm">Agent ID: {{ item.info?.uid }}</div>
      </div>
    </div>

    <div class="w-1px my-6 bg-black bg-opacity-10"></div>

    <div class="flex-1 px-12 py-6">
      <div
        class="flex items-center justify-between pb-6 border-b-1 border-solid border-[#273C6233]"
      >
        <div>
          <div class="flex items-center mb-3">
            <img :src="data.country?.country_flag" class="w-4 h-4 mr-2" />
            <div class="text-base font-bold">{{ data.country?.country }}</div>
          </div>
          <div class="text-sm">Agent ID: {{ data.info?.uid }}</div>
        </div>

        <a-button danger type="primary" class="w-40 h-12 text-lg font-bold rounded-lg"
          >Reject All</a-button
        >
      </div>

      <div class="pt-6 flex">
        <AlbumCard :src="data.info?.head_pic" />
        <Descriptions bordered class="flex-1 ml-12">
          <DescriptionsItem label="Host ID" :span="2">{{ data.info?.guild_id }}</DescriptionsItem>
          <DescriptionsItem label="Agent ID" :span="2"
            ><span class="text-[#F00] font-bold">{{ data.info?.uid }}</span></DescriptionsItem
          >
          <DescriptionsItem label="Birthday" :span="2">{{
            data.info?.register_time
          }}</DescriptionsItem>
          <DescriptionsItem label="Region" :span="2">
            <div class="flex items-center justify-center">
              <img :src="data.country?.country_flag" class="w-4 h-4 mr-2" />
              <div class="text-[#F00] font-bold">{{ data.country?.country }}</div>
            </div>
          </DescriptionsItem>
          <DescriptionsItem label="Language" :span="2">{{ data.info?.language }}</DescriptionsItem>
          <DescriptionsItem label="Register Time" :span="2">
            <div class="font-bold"> {{ data.info?.register_time }} </div>
            <!-- <div class="text-[#F00] font-bold">7Hours ago</div> -->
          </DescriptionsItem>
          <DescriptionsItem label="Nickname" :span="4">
            <div class="flex items-center">
              <div class="font-bold flex-1 pr-8">{{ data.info?.nickname }}</div>
              <div>
                <a-button danger class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
                  >Reject</a-button
                >
                <a-button type="primary" class="w-32 h-12 rounded-lg text-lg font-bold"
                  >Accept</a-button
                >
              </div>
            </div>
          </DescriptionsItem>
          <DescriptionsItem label="About Me" :span="4">
            <div class="flex items-center">
              <div class="flex-1 pr-8">{{ data.info?.intro }} </div>
              <div>
                <a-button danger class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
                  >Reject</a-button
                >
                <a-button type="primary" class="w-32 h-12 rounded-lg text-lg font-bold"
                  >Accept</a-button
                >
              </div>
            </div>
          </DescriptionsItem>
        </Descriptions>
      </div>

      <div class="text-2xl font-bold mt-12 mb-6">Album</div>
      <div
        class="py-6 grid gap-12 bg-gray-100 px-12 rounded-lg"
        style="grid-template-columns: repeat(auto-fill, 18.75rem)"
      >
        <AlbumCard :src="item.url" v-for="item in data.album || []" :key="item" />
      </div>
      <div class="text-2xl font-bold mt-12 mb-6">Story</div>
      <div
        class="py-6 grid gap-12 bg-gray-100 px-12 rounded-lg"
        style="grid-template-columns: repeat(auto-fill, 18.75rem)"
      >
        <StoryCard :src="item.url" v-for="item in data.story || []" :key="item" @play="videoPlay" />
      </div>
    </div>
    <VideoPreviewModal ref="VideoPreviewRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Descriptions, DescriptionsItem } from 'ant-design-vue';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';
  import AlbumCard from './components/AlbumCard.vue';
  import StoryCard from './components/StoryCard.vue';
  import VideoPreviewModal from '../components/VideoPreviewModal.vue';

  const { setTypeCallback } = useWebSocketStore();
  const active = ref(0);
  const list = ref<any[]>([]);
  const data = computed(() => list.value[active.value] || {});
  const VideoPreviewRef = ref<typeof VideoPreviewModal>();

  function select(index) {
    active.value = index;
  }

  setTypeCallback({
    type: Basickey.HostCertification,
    callback: (res) => {
      console.log(res);
      list.value = res.list;
    },
  });

  function videoPlay(url) {
    VideoPreviewRef.value?.createVideoPreview(url);
  }
</script>

<style lang="less">
  .ant-btn-primary.ant-btn-dangerous {
    background-color: #fa4a82 !important;
  }

  .ant-descriptions-view,
  .ant-descriptions-item-content,
  .ant-descriptions-row {
    border-color: #fff !important;
  }

  .ant-descriptions-item-content {
    background: rgb(0 0 0 / 5%);
    text-align: center;
  }

  .ant-descriptions-item-label {
    @apply !py-7 !px-6;

    border-color: #fff !important;
    background: rgb(0 0 0 / 10%) !important;
    text-align: center !important;

    span {
      color: #273c62;
      font-weight: bold;
    }
  }
</style>
