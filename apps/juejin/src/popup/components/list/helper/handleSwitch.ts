import { ActionType, ExtensionId } from "@src/consts";

/**
 * 开关
 * @param checked
 */
const handleSwitch = async (checked: boolean) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const currentTabId = tab?.id as number;

  if (checked) {
    // 插入 css
    // 没有直接插入 css 的权限， 只能通知 service worker 去操作
    await chrome.runtime.sendMessage(ExtensionId, {
      action: "inject",
      tabId: currentTabId,
      actionType: ActionType.popup2background.injectCSS,
    });
  } else {
    // 移除 css
    await chrome.runtime.sendMessage(ExtensionId, {
      action: "remove",
      tabId: currentTabId,
      actionType: ActionType.popup2background.injectCSS,
    });
  }
};

export default handleSwitch;
