import { readRunner, readUpdater } from "@src/background/focusRead";
import { ActionType } from "@src/consts";
import copyRunner from "./copy";

/**
 * 运行时 事件接收器
 * @param request
 * @returns
 */
export const handleRuntimeListener = (request: any, message: any, sendResponse: any) => {
  const { action, actionType } = request || {};

  // 事件分发
  switch (actionType) {
    case ActionType.popup2background.injectCSS:
      readRunner(action);
      break;
    case ActionType.popup2background.copy:
      copyRunner().then((res) => {
        sendResponse(res);
      });
      break;
    default:
      break;
  }

  return true;
};

/**
 * 标签页初始化的时候执行钩子
 * @param tabId
 * @param changeInfo
 * @param tab
 */
export const handleUpdatedListener = async (tabId: number, changeInfo: object, tab: chrome.tabs.Tab) => {
  // console.log(`[yanle] - navigator.clipboard`, navigator?.clipboard?.writeText);
  // 看看是否有复制能力？
  // navigator.clipboard
  //   .writeText("我只是测试复制内容出来")
  //   .then((res) => {
  //     console.log(`[yanle] - res`, res);
  //   })
  //   .catch((e) => {
  //     console.log(`[yanle] - e`, e);
  //   });

  readUpdater(tabId, changeInfo, tab);
};
