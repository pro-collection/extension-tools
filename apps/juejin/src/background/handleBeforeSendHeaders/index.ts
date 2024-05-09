import { find, includes, map } from "lodash";
import { interceptModifyHeaders } from "./consts";
import { HandleBeforeSendHeaders, InterceptModifyHeaderItem } from "./interface";

const handleBeforeSendHeaders: HandleBeforeSendHeaders = (details) => {
  console.log(`[yanle] - detail`, details);

  // 找到当前匹配的请求
  const currentIntercept: InterceptModifyHeaderItem | undefined = find(interceptModifyHeaders, (item) =>
    includes(details.url, item.urlPrefix)
  );

  // 如果没有找到请求，就直接返回
  if (!currentIntercept) return undefined;

  // 替换 header
  details.requestHeaders = map(details.requestHeaders, (item) => {
    if (currentIntercept?.headers?.[item?.name]) {
      item.value = currentIntercept.headers?.[item.name];
    }
    return item;
  });

  // 支持特化处理
  const res = currentIntercept.handler?.(details) || {};

  return {
    requestHeaders: details.requestHeaders,
    ...res,
  };
};

export default handleBeforeSendHeaders;
