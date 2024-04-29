import { Action, AssetPaths, InjectCssStatusList, Pages, StorageKey } from "@src/consts";
import { includes } from "lodash";

/**
 * 首先预先存储一个用于表示是否全品阅读掘金
 */
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.set({
//     [StorageKey.focusReadStatus]: false,
//   });
// });

/**
 * 监听页签
 * 如果是新开启的以前，那么直接判定即可
 *
 * 标签初始化
 *
 * 关键问题在于
 */
chrome.tabs.onUpdated.addListener(async (tabId: number, changeInfo: object, tab: chrome.tabs.Tab) => {
  if (includes(tab.url, Pages.host) && InjectCssStatusList.includes(tab?.status as string)) {
    const { focusReadStatus } = await chrome.storage.local.get(StorageKey.focusReadStatus);

    if (focusReadStatus) {
      chrome.scripting.insertCSS({
        files: [AssetPaths.focusModeCSS],
        target: { tabId },
      });
    } else {
      chrome.scripting.removeCSS({
        files: [AssetPaths.focusModeCSS],
        target: { tabId },
      });
    }
  }
});

/**
 * 从 oppup 页面传递过来的时间
 */
chrome.runtime.onMessage.addListener((request) => {
  const { action, tabId } = request;
  const runner = () => {
    if (action === Action.injectCSS) {
      chrome.storage.local.set({ [StorageKey.focusReadStatus]: true });
      chrome.scripting.insertCSS({
        files: [AssetPaths.focusModeCSS],
        target: { tabId },
      });
    } else if (action === Action.removeCSS) {
      chrome.storage.local.set({ [StorageKey.focusReadStatus]: false });
      chrome.scripting.removeCSS({
        files: [AssetPaths.focusModeCSS],
        target: { tabId },
      });
    }
  };

  runner();

  return undefined;
});
