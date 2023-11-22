import { watch, ref } from 'vue';
import { defineStore } from 'pinia';
import { useWebSocket } from '@vueuse/core';
import { store } from '/@/store';
import { useGlobSetting } from '/@/hooks/setting';
import { useUserStore } from './user';
import { message } from 'ant-design-vue';

enum MessageType {
  /** 登录路由 */
  login = 'login',
  /** 发送心跳 */
  heartBeat = 'HeartBeat',
  /** 发送消息 */
  sendMessage = 'sendMessage',
  /** 接收到新消息 */
  newMessage = 'newMessage',
}

export enum SocketCodeEnum {
  /** 正常 */
  success = 1,
  /** 请先登录 */
}

export enum Basickey {
  HostCertification = 'host_certification',
  HostAlbum = 'host_album',
  UserAlbum = 'user_album',
  TextContent = 'text_content',
  Feedback = 'feedback',
  OnlineService = 'online_service',
}

export const useWebSocketStore = defineStore('webSocket', () => {
  const { webSocketUrl } = useGlobSetting();
  const UserStore = useUserStore();
  const callbackArr = ref<Partial<Record<Basickey, (val: number) => void>>>({});

  const { status, data, ws, send, close, open } = useWebSocket(webSocketUrl, {
    autoReconnect: {
      retries: 3,
      delay: 5000,
      onFailed() {
        console.log('--------心跳骤停--------');
      },
    },
    heartbeat: {
      message: JSON.stringify({ type: 'ping' }),
      interval: 15000,
      pongTimeout: 5000,
    },
    protocols: [UserStore.getToken],
  });

  watch(data, () => {
    if (data.value) {
      try {
        const { status, message: msg, type, data: res } = JSON.parse(data.value);
        switch (status) {
          case SocketCodeEnum.success:
            callbackArr.value?.[type]?.(res);
            break;
          default:
            message.error(msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  function sendMsg(params: { type: Basickey }, callback) {
    if (status.value === 'CLOSED') {
      open();
      close();
    }
    callbackArr.value[params.type] = callback;

    const msg = JSON.stringify(params);
    send(msg);
  }

  return { status, data, ws, sendMsg, close, open, MessageType };
});

export function useWebSocketStoreWithOut() {
  return useWebSocketStore(store);
}
