// chrome.runtime.onInstalled 扩展程序加载的时候
chrome.runtime.onInstalled.addListener((tab) => {
  // 设置扩展程序徽标， 没有实际的功能性能理
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

// 点击插件图标
// ！！这个 api 和 popup 是冲突的；
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  // 切换徽标描述文本
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "ON") {
    // 插入 css
    await chrome.scripting.insertCSS({
      files: ["style/focus-mode.css"],
      target: { tabId: tab.id as number },
    });
  } else if (nextState === "OFF") {
    // 移除 css
    await chrome.scripting.removeCSS({
      files: ["style/focus-mode.css"],
      target: { tabId: tab.id as number },
    });
  }
});

console.log(`[yanle] - background`);
