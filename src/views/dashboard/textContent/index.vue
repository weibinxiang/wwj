<template>
  <div class="mx-10.5 my-9 bg-white px-10 py-7 min-h-200 rounded-xl">
    <BasicTable @register="registerTable">
      <template #type="{ index }">
        <div class="text-[#FA4A82] font-bold" v-if="index">Host</div>
        <div class="font-bold" v-else>User</div>
      </template>
      <template #action>
        <div class="flex items-center justify-center">
          <a-button danger class="mr-3 w-32 h-12 rounded-lg text-lg font-bold">Reject</a-button>
          <a-button type="primary" class="w-32 h-12 rounded-lg text-lg font-bold">Accept</a-button>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  const tableColumns: BasicColumn[] = [
    {
      title: 'User / Host',
      dataIndex: 'type',
      width: 180,
      slots: { customRender: 'type' },
    },
    {
      title: 'ID',
      width: 180,
      dataIndex: 'avatar',
    },
    {
      title: 'Type',
      width: 200,
      dataIndex: 'avatar',
    },
    {
      title: 'Old Value',
      dataIndex: 'avatar',
    },
    {
      title: 'New Value',
      dataIndex: 'avatar',
    },
  ];

  const [registerTable] = useTable({
    showIndexColumn: false,
    dataSource: [{ avatar: '123895462' }, { avatar: '123895462' }],
    columns: tableColumns,
    actionColumn: {
      title: 'Action',
      dataIndex: 'action',
      width: 300,
      slots: { customRender: 'action' },
    },
  });
</script>
