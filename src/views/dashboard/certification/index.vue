<template>
  <div class="mx-10 my-11 bg-white rounded-xl flex" v-loading="loading">
    <template v-if="list.length">
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
            v-if="item.info.is_review"
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

          <a-button
            danger
            type="primary"
            class="w-40 h-12 text-lg font-bold rounded-lg"
            :loading="data.info?.loading"
            @click="rejectAll(data.info)"
            >Reject All</a-button
          >
        </div>

        <div class="pt-6 flex">
          <AlbumCard :data="data.photo" @operate="handleOperate" />
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
            <DescriptionsItem label="Language" :span="2">{{
              data.info?.language
            }}</DescriptionsItem>
            <DescriptionsItem label="Register Time" :span="2">
              <div class="font-bold"> {{ data.info?.register_time }} </div>
              <!-- <div class="text-[#F00] font-bold">7Hours ago</div> -->
            </DescriptionsItem>
            <DescriptionsItem label="Nickname" :span="4">
              <div class="flex items-center min-h-14">
                <div class="font-bold flex-1 pr-8">{{ data.nickname?.text }}</div>
                <div v-if="!data.nickname.accept_status">
                  <a-button
                    danger
                    class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
                    :loading="data.nickname.rejecting"
                    @click="handleOperate(Object.assign(data.nickname, { accept: false }))"
                    >Reject</a-button
                  >
                  <a-button
                    type="primary"
                    class="w-32 h-12 rounded-lg text-lg font-bold"
                    :loading="data.nickname.accepting"
                    @click="handleOperate(Object.assign(data.nickname, { accept: true }))"
                    >Accept</a-button
                  >
                </div>
              </div>
            </DescriptionsItem>
            <DescriptionsItem label="About Me" :span="4">
              <div class="flex items-center min-h-15">
                <div class="flex-1 pr-8">{{ data.intro?.text }} </div>
                <div v-if="!data.intro.accept_status">
                  <a-button
                    danger
                    class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
                    :loading="data.intro.rejecting"
                    @click="handleOperate(Object.assign(data.intro, { accept: false }))"
                    >Reject</a-button
                  >
                  <a-button
                    type="primary"
                    class="w-32 h-12 rounded-lg text-lg font-bold"
                    :loading="data.intro.accepting"
                    @click="handleOperate(Object.assign(data.intro, { accept: true }))"
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
          <AlbumCard
            :data="item"
            v-for="item in data.album || []"
            :key="item"
            @operate="handleOperate"
          />
        </div>
        <div class="text-2xl font-bold mt-12 mb-6">Story</div>
        <div
          class="py-6 grid gap-12 bg-gray-100 px-12 rounded-lg"
          style="grid-template-columns: repeat(auto-fill, 18.75rem)"
        >
          <StoryCard
            :data="item"
            v-for="item in data.story || []"
            :key="item.id"
            @play="videoPlay"
            @operate="handleOperate"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center items-center w-full h-full">
        <Empty />
      </div>
    </template>
    <VideoPreviewModal ref="VideoPreviewRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Descriptions, DescriptionsItem, Empty, message } from 'ant-design-vue';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';
  import AlbumCard from './components/AlbumCard.vue';
  import StoryCard from './components/StoryCard.vue';
  import VideoPreviewModal from '../components/VideoPreviewModal.vue';
  import { isNumber } from '/@/utils/is';

  const { sendMsg } = useWebSocketStore();
  const active = ref();
  const list = ref<any[]>([]);
  const data = computed(() => list.value[active.value] || {});
  const loading = ref(true);
  const VideoPreviewRef = ref<typeof VideoPreviewModal>();
  const auditIds = ref<number[]>([]);

  function select(index) {
    active.value = index;
    getAuditIds();
  }

  sendMsg({ type: Basickey.HostCertification }, ({ data }) => {
    list.value = list.value.concat(data.list);
    loading.value = false;
    if (!isNumber(active.value)) {
      active.value = 0;
      getAuditIds();
    }
  });

  // 获取未审核id
  function getAuditIds() {
    const info = list.value[active.value];
    let ids = [] as number[];

    const objKey = ['photo', 'nickname', 'intro'];
    for (const key in objKey) {
      const obj = info[objKey[key]];
      if (!obj.accept_status) {
        ids.push(obj.id);
      }
    }

    const arrKey = ['album', 'story'];
    for (const key in arrKey) {
      const arr = info[arrKey[key]];
      arr.forEach((item) => {
        if (!item.accept_status) {
          ids.push(item.id);
        }
      });
    }

    auditIds.value = ids;
  }

  function videoPlay(url) {
    VideoPreviewRef.value?.createVideoPreview(url);
  }

  function handleOperate(data) {
    if (data.accepting || data.rejecting) return;
    const is_accept = data.accept;
    const loadingKey = is_accept ? 'accepting' : 'rejecting';
    data[loadingKey] = true;
    sendMsg({ type: Basickey.PUT, data: { ids: [data.id], is_accept } }, (res) => {
      data[loadingKey] = false;
      if (res.status) {
        data.accept_status = true;
        // 删除待审核id，如果没有则删除这条数据
        auditIds.value.splice(auditIds.value.indexOf(data.id) >>> 0, 1);
        message.success('Successful operation');
        if (!auditIds.value.length) {
          list.value.splice(active.value, 1);
          if (active.value >= list.value.length) active.value = list.value.length - 1;
        }
      }
    });
  }

  function rejectAll(info) {
    info.loading = true;
    sendMsg({ type: Basickey.PUT, data: { ids: auditIds.value, is_accept: false } }, (res) => {
      info.loading = false;
      if (res.status) {
        list.value.splice(active.value, 1);
        if (active.value >= list.value.length) active.value = list.value.length - 1;
        message.success('Successful operation');
      }
    });
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
