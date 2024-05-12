import { contextMenusRegister } from "./contextMenus";

/**
 * 插件 install
 */
chrome.runtime.onInstalled.addListener(function () {
  /**
   * 注册菜单
   */
  contextMenusRegister();
});
