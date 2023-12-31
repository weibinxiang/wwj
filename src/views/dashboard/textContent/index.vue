<template>
  <div class="mx-10.5 my-9 bg-white px-10 py-7 min-h-200 rounded-xl">
    <BasicTable @register="registerTable">
      <template #type="{ record }">
        <div class="text-[#FA4A82] font-bold" v-if="!record?.is_user">Host</div>
        <div class="font-bold" v-else>User</div>
      </template>
      <template #action="{ record }">
        <div class="flex items-center justify-center">
          <Popconfirm
            title="Are you sure reject this?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleExamine(false, record)"
          >
            <a-button
              danger
              class="mr-3 w-32 h-12 rounded-lg text-lg font-bold"
              :loading="record.loading"
              >Reject</a-button
            >
          </Popconfirm>
          <Popconfirm
            title="Are you sure accept this?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleExamine(true, record)"
          >
            <a-button
              type="primary"
              class="w-32 h-12 rounded-lg text-lg font-bold"
              :loading="record.loading"
              >Accept</a-button
            >
          </Popconfirm>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Popconfirm, message } from 'ant-design-vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  // import { putTextContent } from '/@/api/dashboard';
  import { useWebSocketStore, Basickey } from '/@/store/modules/webSocket';

  const { sendMsg } = useWebSocketStore();
  const loading = ref(true);
  const list = ref<any[]>([]);

  sendMsg({ type: Basickey.TextContent }, ({ data }) => {
    list.value = list.value.concat(data.list);
    loading.value = false;
  });

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
      dataIndex: 'id',
    },
    {
      title: 'Type',
      width: 200,
      dataIndex: 'type',
      format: (text) => (+text === 1 ? 'Nickname' : 'About me'),
    },
    {
      title: 'Old Value',
      dataIndex: 'old_value',
    },
    {
      title: 'New Value',
      dataIndex: 'new_value',
    },
  ];

  const [registerTable, { deleteTableDataRecord }] = useTable({
    rowKey: 'id',
    showIndexColumn: false,
    columns: tableColumns,
    dataSource: list,
    pagination: false,
    loading: loading,
    actionColumn: {
      title: 'Action',
      dataIndex: 'action',
      width: 300,
      slots: { customRender: 'action' },
    },
  });

  function handleExamine(is_accept, record) {
    record.loading = true;
    sendMsg({ type: Basickey.PUT, data: { ids: [record.id], is_accept } }, ({ status }) => {
      if (status) {
        deleteTableDataRecord(record.id);
        message.success('Successful operation');
      }
      record.loading = false;
    });
  }
</script>
