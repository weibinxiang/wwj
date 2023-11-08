<template>
  <div class="mx-10 my-11 bg-white rounded-lg flex">
    <div class="p-6">
      <div
        class="relative w-60 rounded-lg flex flex-col items-center justify-center pt-6 pb-7 bg-[#FA4A820D] mb-6 cursor-pointer last:mb-0"
        v-for="(item, index) in 5"
        :key="item"
        :class="{ '!text-white !bg-[#0084FF]': active === index }"
        @click="select(index)"
      >
        <img
          src="/src/assets/images/content/icon-review.png"
          class="w-30 absolute left-0 top-0"
          v-if="index === 3"
        />
        <img
          src="/src/assets/images/test.png"
          alt=""
          class="w-30 h-30 rounded-full object-cover mb-6"
        />
        <div class="flex items-center mb-3.5">
          <img src="/src/assets/images/nationalFlag.png" class="w-4 h-4 mr-2" />
          <div class="text-base font-bold">India</div>
        </div>
        <div class="text-sm">Agent ID: 1009844</div>
      </div>
    </div>

    <div class="w-1px my-6 bg-black bg-opacity-10"></div>

    <div class="flex-1 px-12 py-6">
      <div
        class="flex items-center justify-between pb-6 border-b-1 border-solid border-[#273C6233]"
      >
        <div>
          <div class="flex items-center mb-3">
            <img src="/src/assets/images/nationalFlag.png" class="w-4 h-4 mr-2" />
            <div class="text-base font-bold">India</div>
          </div>
          <div class="text-sm">Agent ID: 1009844</div>
        </div>

        <a-button danger type="primary" class="w-40 h-12 text-lg font-bold rounded-lg"
          >Reject All</a-button
        >
      </div>

      <div class="pt-6 flex">
        <AlbumCard :src="testImg" />
        <Descriptions bordered class="flex-1 ml-12">
          <DescriptionsItem label="Host ID" :span="2">98542354</DescriptionsItem>
          <DescriptionsItem label="Agent ID" :span="2"
            ><span class="text-[#F00] font-bold">10059</span></DescriptionsItem
          >
          <DescriptionsItem label="Birthday" :span="2">2002-08-26 / Age: 25</DescriptionsItem>
          <DescriptionsItem label="Region" :span="2">
            <div class="flex items-center justify-center">
              <img src="/src/assets/images/nationalFlag.png" class="w-4 h-4 mr-2" />
              <div class="text-[#F00] font-bold">India</div>
            </div>
          </DescriptionsItem>
          <DescriptionsItem label="Language" :span="2">Filipino, لسان عثمانى</DescriptionsItem>
          <DescriptionsItem label="Register Time" :span="2">
            <div class="font-bold"> 2023-09-12 13:34:34 (UTC+5:30) </div>
            <div class="text-[#F00] font-bold">7Hours ago</div>
          </DescriptionsItem>
          <DescriptionsItem label="Nickname" :span="4">
            <div class="flex items-center">
              <div class="font-bold flex-1 pr-8">Candy Crush sogo</div>
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
              <div class="flex-1 pr-8"
                >The 5pm timing for the event is unusual. The company typically hosts its launches
                in the morning. The “Scary Fast” branding,
              </div>
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
        style="grid-template-columns: repeat(auto-fill, 300px)"
      >
        <AlbumCard :src="testImg" v-for="item in 5" :key="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Descriptions, DescriptionsItem } from 'ant-design-vue';
  import AlbumCard from './components/AlbumCard.vue';
  import testImg from '/@/assets/images/test.png';

  const active = ref(0);

  function select(index) {
    active.value = index;
  }
</script>

<style lang="less">
  :where(.css-dev-only-do-not-override-7wmxui).ant-btn-primary.ant-btn-dangerous {
    background-color: #fa4a82 !important;
  }

  :where(.css-dev-only-do-not-override-7wmxui).ant-descriptions.ant-descriptions-bordered
    .ant-descriptions-view,
  :where(.css-dev-only-do-not-override-7wmxui).ant-descriptions.ant-descriptions-bordered
    .ant-descriptions-item-label,
  :where(.css-dev-only-do-not-override-7wmxui).ant-descriptions.ant-descriptions-bordered
    .ant-descriptions-item-content,
  :where(.css-dev-only-do-not-override-7wmxui).ant-descriptions.ant-descriptions-bordered
    .ant-descriptions-row {
    border-color: #fff;
  }

  :where(.css-dev-only-do-not-override-7wmxui).ant-descriptions.ant-descriptions-bordered
    .ant-descriptions-item-label {
    background: rgb(0 0 0 / 10%);
  }

  .ant-descriptions-item-content {
    background: rgb(0 0 0 / 5%);
    text-align: center;
  }

  .ant-descriptions-item-label {
    padding: 28px 24px !important;
    text-align: center !important;

    span {
      color: #273c62;
      font-weight: bold;
    }
  }

  :where(.css-dev-only-do-not-override-7wmxui).ant-btn-default.ant-btn-dangerous {
    border: none !important;
  }
</style>
