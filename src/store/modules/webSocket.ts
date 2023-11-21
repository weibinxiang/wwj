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
  success = 200,
  /** 请先登录 */
  needLogin = 500,
  /** 已在别处登陆 */
  OtherLogin = 507,
}

export enum Basickey {
  HostCertification = 'host_certification',
  HostAlbum = 'host_album',
  UserAlbum = 'user_album',
  TextContent = 'text_content',
  Feedback = 'feedback',
}

export const useWebSocketStore = defineStore('webSocket', () => {
  const { webSocketUrl } = useGlobSetting();
  const UserStore = useUserStore();
  const basicData = ref<Partial<Record<Basickey, number>>>({});

  const logining = ref(false);

  const { status, data, ws, send, close, open } = useWebSocket(webSocketUrl, {
    autoReconnect: {
      retries: 3,
      delay: 5000,
      onFailed() {
        console.log('--------心跳骤停--------');
      },
    },
    heartbeat: {
      message: 'HeartBeat',
      interval: 15000,
      pongTimeout: 5000,
    },
  });

  watch(data, () => {
    if (data.value) {
      try {
        const { code, msg, router } = JSON.parse(data.value);
        switch (code) {
          case SocketCodeEnum.success:
            // if (router === MessageType.sendMessage) {
            //   StagingStore.refreshSendStatus({ data: res, message_id });
            // } else if (router === MessageType.newMessage) {
            //   StagingStore.receiveMessages({ data: res, message_id });
            // } else if (router === MessageType.login) {
            //   logining.value = false;
            // }
            break;
          case SocketCodeEnum.OtherLogin:
            console.log('close', status.value);
            UserStore.logout(true);
            message.error(msg);

            break;
          case SocketCodeEnum.needLogin:
            sendMsg({ token: UserStore.getToken }, MessageType.login);
            break;
          default:
            if (router === MessageType.sendMessage) {
              // StagingStore.refreshSendStatus({ data: res, message_id });
            }
            message.error(msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  watch(
    () => status.value,
    () => {
      console.log('websock status', status.value, new Date());
      if (status.value === 'OPEN' && UserStore.getToken && !logining.value) {
        logining.value = true;
        sendMsg({ token: UserStore.getToken }, MessageType.login);
      }
    },
  );

  async function sendMsg(params, type: MessageType = MessageType.sendMessage) {
    if (status.value === 'CLOSED') {
      close();
      open();
    }
    delete params?.uid;
    const msg = JSON.stringify({ params, router: type });
    send(msg);
  }

  return { status, data, ws, sendMsg, close, open, MessageType, basicData };
});

export function useWebSocketStoreWithOut() {
  return useWebSocketStore(store);
}
