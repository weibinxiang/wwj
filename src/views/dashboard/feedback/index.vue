<template>
  <div class="mx-10.5 my-9 bg-white px-10 py-7 min-h-200 rounded-xl">
    <BasicTable @register="registerTable">
      <template #attachment="{ record }">
        <div class="flex items-center justify-center px-10 gap-4">
          <img
            :src="img"
            alt=""
            class="w-12 h-12 rounded-lg object-cover cursor-pointer"
            v-for="(img, index) in record.attachment"
            :key="index"
            @click="preview(img)"
          />
        </div>
      </template>
      <template #action="{ record }">
        <div class="flex items-center justify-center">
          <a-button
            type="primary"
            class="w-32 h-12 rounded-lg text-lg font-bold"
            @click="reply(record)"
            >Reply</a-button
          >
        </div>
      </template>
    </BasicTable>

    <ReplyModal ref="ReplyModalRef" @success="reload" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { createImgPreview } from '/@/components/Preview';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { getFeedback } from '/@/api/dashboard';
  import ReplyModal from './components/ReplyModal.vue';

  const ReplyModalRef = ref();
  const tableColumns: BasicColumn[] = [
    {
      title: 'Feedback ID',
      dataIndex: 'operation_account_id',
      width: 230,
    },
    {
      title: 'User ID',
      width: 180,
      dataIndex: 'uid',
    },
    {
      title: 'Feedback Content',
      dataIndex: 'content',
    },
    {
      title: 'Attachment',
      dataIndex: 'avatar',
      width: 300,
      slots: { customRender: 'attachment' },
    },
  ];

  const [registerTable, { reload }] = useTable({
    showIndexColumn: false,
    columns: tableColumns,
    api: getFeedback,
    actionColumn: {
      title: 'Action',
      dataIndex: 'action',
      width: 200,
      slots: { customRender: 'action' },
    },
  });

  function preview(img) {
    createImgPreview({ imageList: [img] });
  }

  function reply(record) {
    ReplyModalRef.value?.openModal(record);
  }
</script>
