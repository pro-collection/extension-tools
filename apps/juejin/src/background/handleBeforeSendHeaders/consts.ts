import { noop } from "lodash";
import { InterceptModifyHeaderItem } from "./interface";

/**
 * 拦截需要修改的 url 场景
 */
export const INTERCEPT_MODIFY_HEADERS: InterceptModifyHeaderItem[] = [
  {
    urlPrefix: "api.juejin.cn",
    headers: {
      Origin: "https://juejin.cn",
      Referer: "https://juejin.cn/",
      "Content-Type": "application/json",
    },
    inspectUrls: ["*://api.juejin.cn/*"],
    // handler: noop,
  },
];
