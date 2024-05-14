import { readRunner, readUpdater } from "@src/background/focusRead";
import { ActionType } from "@src/consts";
import copyRunner from "./copy";
import getDraftContent from "./getDraftContent";

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
    case ActionType.imgStatic2background.injectIframe:
      {
        getDraftContent(["https://juejin.cn/editor/drafts/7297130301288923171"]);
        break;
      }
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
export const handleUpdatedListener = async (
  tabId: number,
  changeInfo: object,
  tab: chrome.tabs.Tab
) => {
  readUpdater(tabId, changeInfo, tab);
};
