import { defHttp } from '/@/utils/http/axios';

/** 获取文本内容列表 */
export function getTextContent() {
  return defHttp.get({ url: '/v1/text_content/get' });
}

/** 操作文本内容 */
export function putTextContent(data) {
  return defHttp.post({ url: '/v1/text_content/put', data });
}

/** 获取工单列表 */
export function getFeedback() {
  return defHttp.get({ url: '/v1/feedback/get' });
}

/** 操作文本内容 */
export function putFeedback() {
  return defHttp.get({ url: '/v1/text_content/put' });
}
