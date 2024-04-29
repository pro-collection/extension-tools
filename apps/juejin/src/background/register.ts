import { handleRuntimeListener, handleUpdatedListener } from "./listener";

/**
 * 页签更新的监听器
 */
chrome.tabs.onUpdated.addListener(handleUpdatedListener);

/**
 * 事件接收器
 */
chrome.runtime.onMessage.addListener(handleRuntimeListener);
