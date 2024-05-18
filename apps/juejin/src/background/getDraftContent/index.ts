import { find, flatMap, forEach, get, includes, map } from "lodash";
// import getUrlParams from "./getUrlParams";
import fetchGetContent from "./fetchGetContent";
import { INTERCEPT_MODIFY_HEADERS } from "../handleBeforeSendHeaders/consts";
import Deferred from "@src/utils/deferred";

let tabCount = 0;
let completeCount = 0;

const listenerFunctionWrapper = (deferredWithDraft: any) => (details: any) => {
  if (includes(details?.url, "https://api.juejin.cn/content_api/v1/article_draft/detail")) {
    completeCount = completeCount + 1;
    if (completeCount === tabCount) {
      deferredWithDraft?.resolve?.();
    }
  }
};

/**
 *
 * @param urls 请求链接组
 */
const getDraftContent = async (urls: string[]) => {
  // 通过创建 tabs 的方式来进行获取文件
  const win = await chrome.windows.create({
    url: urls,
    focused: false,
    // state: "minimized",
    // type: "popup",
    left: 0,
    top: 0,
    height: 200,
    width: 200,
  });

  tabCount = urls.length;

  const deferredWithDraft = Deferred();

  const listenerFunction = listenerFunctionWrapper(deferredWithDraft);

  chrome.webRequest.onCompleted.addListener(
    listenerFunction,
    {
      // 处理拦截的请求
      urls: flatMap(map(INTERCEPT_MODIFY_HEADERS, (item) => item.inspectUrls)),
      windowId: win?.id,
    } as any,
    ["extraHeaders"]
  );

  // 超时时间
  setTimeout(() => {
    deferredWithDraft?.resolve?.();
  }, 7 * 1000);

  // 等待监听返回
  await deferredWithDraft?.promise;

  const getContentList: Promise<any>[] = [];
  forEach(win?.tabs, (tab) => {
    getContentList.push(
      chrome.scripting
        .executeScript({
          target: { tabId: tab?.id as number },
          func: fetchGetContent,
          injectImmediately: true,
        })
        .then(([{ result }]) => result)
    );
  });

  const res = await Promise.all(getContentList);

  console.log(`[yanle] - res`, res);

  // 关闭
  // await chrome.windows.remove(win?.id as number);

  // const mapInfo = map(res, (item) => {
  //   const pageTitle = get(item, "data.article_draft.title", "");
  //   const pageId = get(item, "data.article_draft.id", "");

  //   const imgStatic = parseDraftContent(get(item, "data.article_draft.mark_content", ""));

  //   return {
  //     pageTitle,
  //     pageId,
  //     imgStatic,
  //   };
  // });

  chrome.webRequest.onCompleted.removeListener(listenerFunction);
  tabCount = 0;
  completeCount = 0;

  return res;
};

export default getDraftContent;
