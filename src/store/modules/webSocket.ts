import { watch, ref } from 'vue';
import { defineStore } from 'pinia';
import { useWebSocket } from '@vueuse/core';
import { store } from '/@/store';
import { useGlobSetting } from '/@/hooks/setting';
import { useUserStore } from './user';
import { message } from 'ant-design-vue';
import { buildUUID } from '/@/utils/uuid';

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
  TopCount = 'top_count',
  PUT = 'put',
}

export const useWebSocketStore = defineStore('webSocket', () => {
  // const init = ref(false);
  const { webSocketUrl } = useGlobSetting();
  const UserStore = useUserStore();
  const callbackArr = ref<Partial<Record<Basickey, (val: any) => void>>>({});
  const waitResQueue = ref<Partial<Record<number, (val: any) => void>>>({});

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
        const result = JSON.parse(data.value);
        const { status, message: msg, type, data: res } = result;
        if (type === Basickey.PUT) {
          waitResQueue.value[res.key]?.(result);
          delete waitResQueue.value[res.key];
        } else {
          callbackArr.value?.[type]?.(result);
        }
        if (!status) {
          message.error(msg);
        }
        // switch (status) {
        //   case SocketCodeEnum.success:
        //     if (type === Basickey.PUT) {
        //       waitResQueue.value[res.data.key]?.(res);
        //       delete waitResQueue.value[res.data.key];
        //     } else {
        //       callbackArr.value?.[type]?.(res);
        //     }
        //     break;
        //   default:
        //     message.error(msg);
        // }
      } catch (error) {
        console.log(error);
      }
    }
  });

  /**
   * websocket发送消息
   * @param params 发送参数
   * @param callback 接收回调
   */
  function sendMsg(params: { type: Basickey; [key: string]: any }, callback) {
    if (status.value === 'CLOSED') {
      open();
    }

    if (params.type === Basickey.PUT) {
      const key = buildUUID();
      waitResQueue.value[key] = callback;
      params.data ? (params.data.key = key) : (params.data = { key });
    } else {
      callbackArr.value[params.type] = callback;
    }

    const msg = JSON.stringify(params);
    send(msg);
  }

  function setTypeCallback({ type, callback }) {
    callbackArr.value[type] = callback;
  }

  return { status, data, ws, sendMsg, close, open, MessageType, setTypeCallback };
});

export function useWebSocketStoreWithOut() {
  return useWebSocketStore(store);
}
