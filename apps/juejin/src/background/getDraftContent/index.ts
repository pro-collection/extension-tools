import { find, forEach, get } from "lodash";
// import getUrlParams from "./getUrlParams";
import fetchGetContent from "./fetchGetContent";

/**
 *
 * @param urls 请求链接组
 */
const getDraftContent = async (urls: string[]) => {
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

  const [res] = await chrome.scripting.executeScript({
    target: { tabId: tab?.id as number },
    func: fetchGetContent,
    injectImmediately: true,
  });

  console.log(`[yanle] - res`, res?.result);

  await chrome.tabs.remove(tab?.id as number);
};

export default getDraftContent;
