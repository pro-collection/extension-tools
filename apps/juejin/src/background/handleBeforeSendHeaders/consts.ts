import { noop } from "lodash";

/**
 * 拦截需要修改的 url 场景
 */
export const interceptModifyHeaders = [
  {
    ulrPrefix: "",
    headers: {},
    inspectUrls: [],
    handler: noop,
  },
];
