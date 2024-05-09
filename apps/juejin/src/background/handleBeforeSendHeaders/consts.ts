import { noop } from "lodash";
import { InterceptModifyHeaderItem } from "./interface";

/**
 * 拦截需要修改的 url 场景
 */
export const interceptModifyHeaders: InterceptModifyHeaderItem[] = [
  {
    urlPrefix: "",
    headers: {},
    inspectUrls: [],
    // handler: noop,
  },
];
