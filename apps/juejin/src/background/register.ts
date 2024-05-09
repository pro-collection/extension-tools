import { handleRuntimeListener, handleUpdatedListener } from "./listener";

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
 * 主要是针对 cors 域名限定的情况
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    console.log(`[yanle] - details`, details);
    // try {
    //   var macthedUrl = details.url.indexOf(ulrPrefix) > -1;
    //   if (macthedUrl) {
    //     details.requestHeaders = details?.requestHeaders?.map((_) => {
    //       if (headers?.[_.name]) {
    //         _.value = headers?.[_.name];
    //       }
    //       return _;
    //     });

    //     Object.keys(headers).forEach((name) => {
    //       var existsHeaders = details.requestHeaders.filter((_) => _.name == name);
    //       if (existsHeaders.length) {
    //       } else {
    //         details.requestHeaders.push({
    //           name: name,
    //           value: headers[name],
    //         });
    //       }
    //     });
    //   }
    //   // call
    //   if (handler) {
    //     handler(details);
    //   }
    // } catch (e) {
    //   console.log("modify headers error", e);
    // }
    return { requestHeaders: details.requestHeaders };
  },
  {
    urls: ["*://api.juejin.cn/*"],
  }
);
