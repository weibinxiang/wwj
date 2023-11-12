<template>
  <div class="mx-10.5 my-9 bg-white px-10 py-7 min-h-200">
    <BasicTable @register="registerTable">
      <template #attachment>
        <div class="flex items-center justify-center px-10 gap-4">
          <img
            src="/src/assets/images/test.png"
            alt=""
            class="w-12 h-12 rounded-lg object-cover cursor-pointer"
            v-for="item in 3"
            :key="item"
            @click="preview(testImg)"
          />
        </div>
      </template>
      <template #action>
        <div class="flex items-center justify-center">
          <a-button type="primary" class="w-32 h-12 rounded-lg text-lg font-bold">Reply</a-button>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { createImgPreview } from '/@/components/Preview';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import testImg from '/@/assets/images/test.png';

  const tableColumns: BasicColumn[] = [
    {
      title: 'Feedback ID',
      dataIndex: 'type',
      width: 230,
    },
    {
      title: 'User ID',
      width: 180,
      dataIndex: 'avatar',
    },
    {
      title: 'Feedback Content',
      dataIndex: 'avatar',
    },
    {
      title: 'Attachment',
      dataIndex: 'avatar',
      width: 300,
      slots: { customRender: 'attachment' },
    },
  ];

  const [registerTable] = useTable({
    showIndexColumn: false,
    dataSource: [{ avatar: '123895462' }, { avatar: '123895462' }],
    columns: tableColumns,
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
</script>
