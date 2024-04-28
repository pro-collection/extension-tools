const handleSwitch = async (checked: boolean) => {
  console.log(`[yanle] - checked`, checked);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const currentTabId = tab?.id as number;

  console.log(`[yanle] - currentTabId`, currentTabId);

  if (checked) {
    // 插入 css
    // 没有直接插入 css 的权限， 只能通知 service worker 去操作
    // await chrome.scripting.insertCSS({
    //   files: ["style/focus-mode.css"],
    //   target: { tabId: currentTabId as number },
    // });

    await chrome.runtime.sendMessage("nepbnjgiiihmemlfldbncfelglceibnh", { action: "inject", tabId: currentTabId });
  } else {
    // 移除 css
    // await chrome.scripting.removeCSS({
    //   files: ["style/focus-mode.css"],
    //   target: { tabId: currentTabId as number },
    // });

    await chrome.runtime.sendMessage("nepbnjgiiihmemlfldbncfelglceibnh", { action: "remove", tabId: currentTabId });
  }
};

export default handleSwitch;
