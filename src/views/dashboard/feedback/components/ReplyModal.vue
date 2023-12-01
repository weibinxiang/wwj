<template>
  <Modal
    v-model:visible="visible"
    :footer="null"
    width="58rem"
    class="reply-modal"
    :maskClosable="false"
  >
    <div class="text-2xl font-bold my-9 text-center">Reply Feedback</div>

    <div class="h-45 rounded-2xl border border-gray-100 bg-#fafafa p-3 flex">
      <div class="overflow-y-auto h-full flex-1">
        {{ data.content }}
      </div>
      <div class="flex flex-col gap-2 flex-shrink-0 pl-3">
        <img
          :src="img"
          alt=""
          class="w-12 h-12 rounded-lg object-cover cursor-pointer"
          v-for="(img, index) in data.attachment"
          :key="index"
          @click="preview(img)"
        />
      </div>
    </div>

    <InputTextArea class="mt-6 rounded-2xl" :rows="6" v-model:value="content" />
    <div class="flex justify-center pt-9 pb-3">
      <a-button danger class="mr-12 w-75 h-12 rounded-xl text-xl font-bold" @click="visible = false"
        >Cancel</a-button
      >
      <a-button
        type="primary"
        class="w-75 h-12 rounded-xl text-xl font-bold"
        @click="submit"
        :loading="loading"
        >ok</a-button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Modal, Input, message } from 'ant-design-vue';
  import { createImgPreview } from '/@/components/Preview';
  import { putFeedback } from '/@/api/dashboard';

  const emits = defineEmits({
    success: () => true,
  });

  const InputTextArea = Input.TextArea;

  const visible = ref(false);
  const data = ref<any>({});
  const content = ref('');
  const loading = ref(false);

  function openModal(record) {
    content.value = '';
    data.value = record;
    visible.value = true;
  }

  function preview(img) {
    createImgPreview({ imageList: [img] });
  }

  function submit() {
    loading.value = true;
    putFeedback({ id: data.value.id, reply_content: content.value })
      .then(() => {
        message.success('Reply successful');
        visible.value = false;
        emits('success');
      })
      .finally(() => {
        loading.value = false;
      });
  }

  defineExpose({
    openModal,
  });
</script>

<style lang="less">
  .reply-modal {
    .ant-modal-content {
      padding: 20px 24px !important;
    }
  }
</style>
