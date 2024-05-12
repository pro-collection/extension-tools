// 用于接受来自 background 的信息

import { ActionType } from "@src/consts";

/**
 * 一旦 popup 页面关闭， 也就意味着该功能是失效的。
 */
chrome.runtime.onMessage.addListener((request: any, message: any, sendResponse: any) => {
  console.log(`[yanle] - pupup chrome.runtime.onMessage - 接受到消息`, {
    request,
    message,
    sendResponse,
  });

  const { actionType, url } = request || {};

  if (actionType === ActionType.background2pupup.contextMenuWithImage && url) {
    navigator.clipboard.writeText(url);
  }

  return undefined;
});
