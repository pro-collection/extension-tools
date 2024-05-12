import { noop } from "lodash";
import { InterceptModifyHeaderItem } from "./interface";

/**
 * 拦截需要修改的 url 场景
 */
export const INTERCEPT_MODIFY_HEADERS: InterceptModifyHeaderItem[] = [
  {
    urlPrefix: "",
    headers: {},
    inspectUrls: [],
    // handler: noop,
  },
];
