import { map, flatMap } from "lodash";
import { handleRuntimeListener, handleUpdatedListener } from "./listener";
import { interceptModifyHeaders } from "./handleBeforeSendHeaders/consts";
import handleBeforeSendHeaders from "./handleBeforeSendHeaders";

/**
 * 页签更新的监听器
 */
chrome.tabs.onUpdated.addListener(handleUpdatedListener);

/**
 * 事件接收器
 */
chrome.runtime.onMessage.addListener(handleRuntimeListener);

/**
 * 修改 header
 * 主要是针对 cors 域名限定的情况， 支持 background 发起请求即可
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
  handleBeforeSendHeaders,
  {
    // 处理拦截的请求
    urls: flatMap(map(interceptModifyHeaders, (item) => item.inspectUrls)),
  },
  ["extraHeaders", "requestHeaders"]
);
