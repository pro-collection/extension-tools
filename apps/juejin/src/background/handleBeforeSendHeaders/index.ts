import { cloneDeep, find, forEach, includes, map } from "lodash";
import { INTERCEPT_MODIFY_HEADERS } from "./consts";
import { HandleBeforeSendHeaders, InterceptModifyHeaderItem } from "./interface";

const handleBeforeSendHeaders: HandleBeforeSendHeaders = (details) => {
  // 找到当前匹配的请求
  const currentIntercept: InterceptModifyHeaderItem | undefined = find(
    INTERCEPT_MODIFY_HEADERS,
    (item) => includes(details.url, item.urlPrefix)
  );

  // 如果没有找到请求，就直接返回
  if (!currentIntercept) return undefined;

  // 替换 header
  const newHeader: chrome.webRequest.HttpHeaders = (details.requestHeaders = map(
    details.requestHeaders,
    (item) => {
      if (currentIntercept?.headers?.[item?.name]) {
        item.value = currentIntercept.headers?.[item.name];
      }
      return item;
    }
  ));

  // 处理新增的 header
  const currentHeaderKeys = Object.keys(currentIntercept.headers);
  const headerKeys = map(newHeader, (item) => item?.name);

  forEach(currentHeaderKeys, (item) => {
    if (!includes(headerKeys, item)) {
      newHeader.push({
        name: item,
        value: currentIntercept?.headers?.[item],
      });
    }
  });

  // 支持特化处理
  const res = currentIntercept.handler?.(details) || {};

  return {
    ...details,
    requestHeaders: newHeader,
    ...res,
  };
};

export default handleBeforeSendHeaders;
