export const ExtensionId = "nepbnjgiiihmemlfldbncfelglceibnh";

/**
 * 用于触发事件的 动作类型， 让可以知道这个动作是谁触发的
 * 可以理解为动作的触发者是谁
 */
export const ActionType = {
  common: {},
  popup2background: {
    injectCSS: "popup2background - injectCSS - focus-mode.css", // 注入 css 脚本
  },
};

/**
 * 用户事件广播， 具体的事件是什么
 * 可以理解为动作触发者， 指明要做什么事儿
 */
export enum Action {
  unknown = 0,
  injectCSS = 1,
  removeCSS = 2,
}

/**
 * 存储 key
 */
export const StorageKey = {
  focusReadStatus: "focusReadStatus", // 掘金文章阅读的状态
};

/**
 * 需要插入 css 的 tabs 状态时机
 */
export const InjectCssStatusList = ["complete", "loading"];

/**
 * 页面常量
 */
export const Pages = {
  host: "https://juejin.cn/",
  post: "https://juejin.cn/post/",
};

/**
 * 资源路径
 */
export const AssetPaths = {
  focusModeCSS: "style/focus-mode.css",
};
