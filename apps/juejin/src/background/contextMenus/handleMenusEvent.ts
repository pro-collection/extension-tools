import { ActionType, Pages } from "@src/consts";
import axios from "axios";
import { isEmpty } from "lodash";

// A generic onclick callback function.
const handleMenusEvent = async (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  switch (info.menuItemId) {
    case "image": {
      // 图片场景
      // 拿到图片之后， 直接校验该图片链接， 如果是 juejin 的图片域名场景， 那么直接到粘贴板
      // 尝试一下通知

      /* ==============================  注入 content script , 获取 复制的文本 - Start ============================== */
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab) {
        return "";
      }

      await chrome.scripting.executeScript({
        target: { tabId: tab?.id as number },
        func: function () {
          navigator.clipboard.writeText("2312312312312312");
        },
        injectImmediately: true,
      });
      /* ==============================  注入 content script , 获取 复制的文本 - End   ============================== */

      // 发起请求
      // userInfo 判定用户的登录情况
      let userInfo;
      try {
        userInfo = await fetch("https://api.juejin.cn/user_api/v1/user/get", {
          method: "GET",
        }).then((res) => res.json());
      } catch (e) {
        console.log(`[yanle] - e`, e);
      }

      // 保存 图片 url 链接
      let saveImg;
      try {
        saveImg = await fetch("https://juejin.cn/image/urlSave", {
          method: "POST",
          body: JSON.stringify({
            url: info?.srcUrl,
          }),
          headers: {
            // 设置请求头，告诉服务器我们发送的是JSON数据
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      } catch (e) {
        console.log(`[yanle] - save url error`, e);
      }

      return;
    }
    default:
      // Standard context menu item function
      console.log("Standard context menu item clicked.");
  }
};

export default handleMenusEvent;
