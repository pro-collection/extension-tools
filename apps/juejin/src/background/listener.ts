import { readRunner, readUpdater } from "@src/background/focusRead";
import { ActionType } from "@src/consts";

/**
 * 运行时 事件接收器
 * @param request
 * @returns
 */
export const handleRuntimeListener = (request: any) => {
  const { action, actionType } = request || {};
  console.log(`[yanle] - request`, request);

  // 事件分发
  switch (actionType) {
    case ActionType.popup2background.injectCSS:
      readRunner(action);
      break;
    default:
      break;
  }

  return undefined;
};

/**
 * 标签页初始化的时候执行钩子
 * @param tabId
 * @param changeInfo
 * @param tab
 */
export const handleUpdatedListener = async (tabId: number, changeInfo: object, tab: chrome.tabs.Tab) => {
  readUpdater(tabId, changeInfo, tab);
};
