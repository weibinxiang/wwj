<template>
  <Modal :visible="visible" :footer="null" width="58rem" @cancel="close">
    <div class="text-2xl font-bold my-9 text-center">Set Host Profile</div>
    <div> </div>

    <div class="flex justify-center pt-9 pb-3">
      <a-button danger class="mr-12 w-75 h-12 rounded-xl text-xl font-bold">Cancel</a-button>
      <a-button type="primary" class="w-75 h-12 rounded-xl text-xl font-bold">ok</a-button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { Modal } from 'ant-design-vue';

  defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits({
    'update:visible': (val) => val,
  });

  function close() {
    console.log(2323);
    emits('update:visible', false);
  }
</script>
