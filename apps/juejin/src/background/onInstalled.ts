import { contextMenusRegister } from "./contextMenus";

/**
 * 插件 install
 */
chrome.runtime.onInstalled.addListener(function () {
  /**
   * 注册菜单
   */
  contextMenusRegister();

  // 发起请求
  // console.log(`[yanle] - 发起请求`);
  // fetch(
  //   "https://api.juejin.cn/content_api/v1/article_draft/detail?aid=2608&uuid=7203748436654097955",
  //   {
  //     headers: {
  //       accept: "*/*",
  //       "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  //       "content-type": "application/json",
  //       priority: "u=1, i",
  //       "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-ch-ua-platform": '"macOS"',
  //       "sec-fetch-dest": "empty",
  //       "sec-fetch-mode": "cors",
  //       "sec-fetch-site": "same-site",
  //       "x-secsdk-csrf-token":
  //         "0001000000018c2c02377ce4f96a7e60be8d4c6a62fb33f25da327725a62de2714044800f53a17cecd0d2548fb1d",
  //       origin: "https://juejin.cn",
  //       referrer: "https://juejin.cn/",
  //     },
  //     referrer: "https://juejin.cn/",
  //     referrerPolicy: "strict-origin-when-cross-origin",
  //     body: '{"draft_id":"7297130301288923171"}',
  //     method: "POST",
  //     mode: "cors",
  //     credentials: "include",
  //   }
  // )
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((res) => {
  //     console.log(`[yanle] - res`, res);
  //   })
  //   .catch((e) => {
  //     console.log(`[yanle] - request error e`, e);
  //   });
});
