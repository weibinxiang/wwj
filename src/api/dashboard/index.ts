import { defHttp } from '/@/utils/http/axios';

/** 获取文本内容列表 */
export function getTextContent() {
  return defHttp.get({ url: '/v1/text_content/get' });
}

/** 操作文本内容 */
export function putTextContent(data: { id: number; is_accept: string }) {
  return defHttp.put({ url: '/v1/text_content/put', data });
}

/** 获取工单列表 */
export function getFeedback() {
  return defHttp.get({ url: '/v1/feedback/get' });
}

/** 操作文本内容 */
export function putFeedback(data: { id: number; reply_content: string }) {
  return defHttp.put({ url: '/v1/feedback/put', data });
}
