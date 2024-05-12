import { ActionType } from "@src/consts";

// A generic onclick callback function.
const handleMenusEvent = async (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  console.log(`[yanle] - info`, info);
  switch (info.menuItemId) {
    case "image": {
      // 图片场景
      // 拿到图片之后， 直接校验该图片链接， 如果是 juejin 的图片域名场景， 那么直接到粘贴板
      // 尝试一下通知

      console.log(`[yanle] - background 向 popup 发送信息`);

      await chrome.runtime.sendMessage({
        actionType: ActionType.background2pupup.contextMenuWithImage,
        url: info?.srcUrl,
      });
      return;
    }
    default:
      // Standard context menu item function
      console.log("Standard context menu item clicked.");
  }
};

export default handleMenusEvent;
