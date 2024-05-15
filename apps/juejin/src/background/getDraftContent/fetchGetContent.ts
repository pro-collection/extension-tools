// import { forEach, get } from "lodash";

/**
 * 通过请求来注入到 content script 里面的脚本， 用户获取 草稿文本内容
 * 注入脚本， 必定是要纯函数
 * @returns
 */
const fetchGetContent = () => {
  const cookieString = document.cookie || "";

  const cookiesObj: Record<string, string> = {};
  const cookiesArray = cookieString.split(";") || [];

  cookiesArray.forEach((cookie) => {
    const list = cookie?.trim()?.split?.("=");
    const name = list?.[0];
    const value = list?.[1];
    cookiesObj[name] = value;
  });

  // const tokens = get(cookiesObj, "__tea_cookie_tokens_2608", "");
  const tokens = cookiesObj?.__tea_cookie_tokens_2608 || "";

  let result;
  try {
    result = JSON.parse(decodeURIComponent(decodeURIComponent(tokens)));
  } catch (e) {
    result = {};
  }

  // const uuid = get(result, "user_unique_id", "");
  const uuid = result?.user_unique_id || "";

  const paramsObject: Record<string, string> = {
    aid: "2608",
  };

  if (uuid) paramsObject.uuid = uuid;

  const params = new URLSearchParams(paramsObject);

  const reqUrl = `https://api.juejin.cn/content_api/v1/article_draft/detail?${params}`;

  const pagePathName = location?.pathname || "";

  let draftId = "";

  // 正则表达式来匹配路径最后一个非数字部分
  const regex = /\/([\w-]+)$/;

  const match = pagePathName.match(regex);

  if (match) {
    draftId = match[1];
  } else {
    console.log("链接中没有找到 ID 参数");
  }

  if (!draftId) return "";

  const body = JSON.stringify({
    draft_id: draftId,
  });

  return fetch(reqUrl, {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      // "x-secsdk-csrf-token":
      //   "0001000000018c2c02377ce4f96a7e60be8d4c6a62fb33f25da327725a62de2714044800f53a17cecd0d2548fb1d",
      origin: "https://juejin.cn",
      referrer: "https://juejin.cn/",
    },
    referrer: "https://juejin.cn/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: body,
    // body: '{"draft_id":"7297130301288923171"}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(`[yanle] - request error e`, e);
    });
};

export default fetchGetContent;
