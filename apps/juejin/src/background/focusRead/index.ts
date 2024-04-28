// // chrome.runtime.onInstalled 扩展程序加载的时候
// chrome.runtime.onInstalled.addListener((tab) => {
//   // 设置扩展程序徽标， 没有实际的功能性能理
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });

import { Action, AssetPaths, InjectCssStatusList, Pages } from "@src/consts";
import { includes } from "lodash";

// // 点击插件图标
// // ！！这个 api 和 popup 是冲突的；
// chrome.action.onClicked.addListener(async (tab) => {
//   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//   const nextState = prevState === "ON" ? "OFF" : "ON";

//   // 切换徽标描述文本
//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: nextState,
//   });

//   if (nextState === "ON") {
//     // 插入 css
//     await chrome.scripting.insertCSS({
//       files: [AssetPaths.focusModeCSS],
//       target: { tabId: tab.id as number },
//     });
//   } else if (nextState === "OFF") {
//     // 移除 css
//     await chrome.scripting.removeCSS({
//       files: [AssetPaths.focusModeCSS],
//       target: { tabId: tab.id as number },
//     });
//   }
// });

// console.log(`[yanle] - background`);

/**
 * 监听页签
 * 如果是新开启的以前，那么直接判定即可
 */
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: object, tab: chrome.tabs.Tab) => {
  console.log(`[yanle] - tabId`, tabId);
  console.log(`[yanle] - changeInfo`, changeInfo);
  console.log(`[yanle] - tab`, tab);

  // const status: chrome.tabs.TabStatus = "complete";

  if (includes(tab.url, Pages.host)) {
    if (InjectCssStatusList.includes(tab?.status as string)) {
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

chrome.runtime.onMessage.addListener((request) => {
  const { action, tabId } = request;
  const runner = () => {
    if (action === Action.injectCSS) {
      chrome.scripting.insertCSS({
        files: [AssetPaths.focusModeCSS],
        target: { tabId },
      });
    } else if (action === Action.removeCSS) {
      chrome.scripting.removeCSS({
        files: [AssetPaths.focusModeCSS],
        target: { tabId },
      });
    }
  };

  runner();

  return undefined;
});
