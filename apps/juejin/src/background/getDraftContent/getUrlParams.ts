import { find, get } from "lodash";

/**
 * 获取请求参数
 * @returns
 */
const getUrlParams = async () => {
  const cookies = await chrome.cookies.getAll({
    url: "https://juejin.cn",
  });

  const tokens = get(
    find(cookies, (item) => item.name === "__tea_cookie_tokens_2608"),
    "value",
    ""
  );

  let result;
  try {
    result = JSON.parse(decodeURIComponent(decodeURIComponent(tokens)));
  } catch (e) {
    result = {};
  }

  const uuid = get(result, "user_unique_id", "");

  const paramsObject: Record<string, string> = {
    aid: "2608",
  };

  if (uuid) paramsObject.uuid = uuid;

  const params = new URLSearchParams(paramsObject);

  return params;
};

export default getUrlParams;
