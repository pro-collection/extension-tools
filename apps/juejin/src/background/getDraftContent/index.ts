import { find, forEach, get, map } from "lodash";
// import getUrlParams from "./getUrlParams";
import fetchGetContent from "./fetchGetContent";
import parseDraftContent from "./parseDraftContent";

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

  await chrome.windows.remove(win?.id as number);

  const mapInfo = map(res, (item) => {
    const pageTitle = get(item, "data.article_draft.title", "");
    const pageId = get(item, "data.article_draft.id", "");

    const imgStatic = parseDraftContent(get(item, "data.article_draft.mark_content", ""));

    return {
      pageTitle,
      pageId,
      imgStatic,
    };
  });

  return mapInfo;
};

export default getDraftContent;
