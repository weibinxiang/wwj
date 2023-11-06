<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4">
      <AppDarkModeToggle class="enter-x mr-2" v-if="!sessionTimeout" />
      <AppLocalePicker
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
        v-if="!sessionTimeout && showLocale"
      />
    </div>

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full flex justify-center items-center py-2 mx-auto sm:px-10">
      <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
        <div
          :class="`${prefixCls}-form`"
          class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
        >
          <LoginForm />
          <ForgetPasswordForm />
          <RegisterForm />
          <MobileForm />
          <QrCodeForm />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { AppLogo, AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';
  import LoginForm from './LoginForm.vue';
  import ForgetPasswordForm from './ForgetPasswordForm.vue';
  import RegisterForm from './RegisterForm.vue';
  import MobileForm from './MobileForm.vue';
  import QrCodeForm from './QrCodeForm.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const { prefixCls } = useDesign('login');
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      &::before {
        background-image: url('/@/assets/svg/login-bg-dark.svg');
      }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }

    .ant-divider-inner-text {
      color: @text-color-secondary;
      font-size: 12px;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    .@{prefix-cls}-form {
      border-radius: 16px;
      background: rgb(255 255 255 / 50%);
      box-shadow: 0 4px 4px 0 rgb(0 0 0 / 10%);
      backdrop-filter: blur(2px);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/@/assets/svg/login-bg.svg');
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: auto 100%;
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #fff;
        font-size: 16px;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #fff;
          font-size: 24px;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        color: #888;
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-xl) {
        min-width: 320px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-lg) {
        min-width: 260px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-md) {
        min-width: 240px;
      }
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }
  }
</style>
