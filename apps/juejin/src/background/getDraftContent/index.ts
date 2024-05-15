import { find, forEach, get } from "lodash";
import getUrlParams from "./getUrlParams";
import fetchGetContent from "./fetchGetContent";

/**
 *
 * @param urls 请求链接组
 */
const getDraftContent = async (urls: string[]) => {
  // const urlParams = await getUrlParams();

  // 通过创建 tabs 的方式来进行获取文件
  // const win = await chrome.windows.create({
  //   url: ["https://juejin.cn/editor/drafts/7297130301288923171"],
  //   focused: false,
  //   // state: "minimized",
  //   // type: "popup",
  //   left: 0,
  //   top: 0,
  //   height: 200,
  //   width: 200,
  // });

  // const getContentList: Promise<any>[] = [];

  // console.log(`[yanle] - win`, win);
  // forEach(win?.tabs, (tab) => {
  //   const func = fetchGetContent(tab?.url || (tab?.pendingUrl as string), urlParams);

  //   getContentList.push(
  //     chrome.scripting.executeScript({
  //       target: { tabId: tab?.id as number },
  //       func,
  //       injectImmediately: true,
  //     })
  //   );
  // });

  // const res = await Promise.all(getContentList);
  // console.log(`[yanle] - res`, res);

  // await chrome.windows.remove(win?.id as number);

  // 获取 cookies

  // console.log(`[yanle] - tabs`, tabs);

  // 判定是否登录  https://api.juejin.cn/user_api/v1/user/get
  const tab = await chrome.tabs.create({
    url: "https://juejin.cn/editor/drafts/7297130301288923171",
    active: false,
    selected: false,
  });

  // cosnt func = fetchGetContent(tab?.url || (tab?.pendingUrl as string), urlParams);

  const [res] = await chrome.scripting.executeScript({
    target: { tabId: tab?.id as number },
    func: () => {
      return fetch(
        "https://api.juejin.cn/content_api/v1/article_draft/detail?aid=2608&uuid=7203748436654097955",
        {
          headers: {
            accept: "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            "content-type": "application/json",
            priority: "u=1, i",
            "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            // "x-secsdk-csrf-token":
            //   "0001000000018c2c02377ce4f96a7e60be8d4c6a62fb33f25da327725a62de2714044800f53a17cecd0d2548fb1d",
            origin: "https://juejin.cn",
            referrer: "https://juejin.cn/",
          },
          referrer: "https://juejin.cn/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: '{"draft_id":"7297130301288923171"}',
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(`[yanle] - res`, res);
          return res;
        })
        .catch((e) => {
          console.log(`[yanle] - request error e`, e);
        });
    },
    injectImmediately: true,
  });

  console.log(`[yanle] - res`, res);
  console.log(`[yanle] - res`, res?.result);

  await chrome.tabs.remove(tab?.id as number);
};

export default getDraftContent;
