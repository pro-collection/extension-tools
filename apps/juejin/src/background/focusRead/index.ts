import { Action, AssetPaths, InjectCssStatusList, Pages, StorageKey } from "@src/consts";
import { forEach, get, includes, map } from "lodash";

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
  const tabs = await chrome.tabs.query({});
  const { focusReadStatus } = await chrome.storage.local.get(StorageKey.focusReadStatus);

  const list: Promise<any>[] = [];

  forEach(tabs, (item) => {
    const url = get(item, "url", "");
    const tabId = get(item, "id", -1);
    if (includes(url, Pages.post)) {
      if (focusReadStatus) {
        console.log(`[yanle] - init insert css`, tabId);

        list.push(
          chrome.scripting.insertCSS({
            files: [AssetPaths.focusModeCSS],
            target: { tabId },
          })
        );
      } else {
        console.log(`[yanle] - init remove css`, tabId);
        list.push(
          chrome.scripting.removeCSS({
            files: [AssetPaths.focusModeCSS],
            target: { tabId },
          })
        );
      }
    }
  });

  Promise.all(list);

  console.log(`[yanle] - tabs`, tabs);

  // if (includes(tab.url, Pages.post) && InjectCssStatusList.includes(tab?.status as string)) {
  //   if (focusReadStatus) {
  //     chrome.scripting.insertCSS({
  //       files: [AssetPaths.focusModeCSS],
  //       target: { tabId },
  //     });
  //   } else {
  //     chrome.scripting.removeCSS({
  //       files: [AssetPaths.focusModeCSS],
  //       target: { tabId },
  //     });
  //   }
  // }

  // const;
});

/**
 * 从 oppup 页面传递过来的事件
 * 也能接受来自于 content script 的事件
 */
chrome.runtime.onMessage.addListener((request) => {
  const { action, actionType } = request;

  const runner = async () => {
    const tabs = await chrome.tabs.query({});

    const list: Promise<any>[] = [];

    forEach(tabs, (item) => {
      if (includes(item.url, Pages.post)) {
        if (action === Action.injectCSS) {
          console.log(`[yanle] - inject`, item?.id);
          list.push(
            chrome.scripting.insertCSS({
              files: [AssetPaths.focusModeCSS],
              target: { tabId: item.id as number },
            })
          );
        } else {
          console.log(`[yanle] - remove`, item?.id);
          list.push(
            chrome.scripting.removeCSS({
              files: [AssetPaths.focusModeCSS],
              target: { tabId: item.id as number },
            })
          );
        }
      }
    });

    if (action === Action.injectCSS) {
      chrome.storage.local.set({ [StorageKey.focusReadStatus]: true });
    } else if (action === Action.removeCSS) {
      chrome.storage.local.set({ [StorageKey.focusReadStatus]: false });
    }

    Promise.all(list);
  };

  runner();

  return true;
});
