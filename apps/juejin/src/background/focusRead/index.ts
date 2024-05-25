import {
  Action,
  ActionType,
  AssetPaths,
  InjectCssStatusList,
  Pages,
  StorageKey,
} from "@src/consts";
import { filter, forEach, get, includes, isEmpty, map } from "lodash";

const getPostTabs = async () => {
  const tabs = await chrome.tabs.query({});
  return filter(tabs, (item) => includes(item.url, Pages.post));
};

/**
 * 监听页签
 * 如果是新开启的以前，那么直接判定即可
 *
 * 标签初始化
 *
 * 存在的问题： 如果当前是阅读模式， 刷新页面之后， 确实是大家都在阅读模式
 * 但是关闭阅读模式的时候， 非多动页签没有办法取消阅读模式.
 * 原因： 因为 css 可以多从叠加， 如果多次叠加了之后，移除也需要多次移除才行。
 */
export const readUpdater = async (tabId: number, changeInfo: object, tab: chrome.tabs.Tab) => {
  const { focusReadStatus } = await chrome.storage.local.get(StorageKey.focusReadStatus);

  if (tab?.status !== "complete") {
    return;
  }

  if (focusReadStatus) {
    chrome.scripting.insertCSS({
      files: [AssetPaths.focusModeCSS],
      target: { tabId },
    });
  }
};

/**
 * 从 oppup 页面传递过来的事件
 */
export const readRunner = async (action: Action) => {
  const tabs = await getPostTabs();

  const list: Promise<any>[] = [];

  forEach(tabs, (item) => {
    if (action === Action.injectCSS) {
      list.push(
        chrome.scripting.insertCSS({
          files: [AssetPaths.focusModeCSS],
          target: { tabId: item.id as number },
        })
      );
    } else {
      list.push(
        chrome.scripting.removeCSS({
          files: [AssetPaths.focusModeCSS],
          target: { tabId: item.id as number },
        })
      );
    }
  });

  chrome.storage.local.set({ [StorageKey.focusReadStatus]: action === Action.injectCSS });
  Promise.all(list);
};
