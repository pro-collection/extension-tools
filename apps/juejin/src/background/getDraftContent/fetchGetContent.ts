// import { forEach, get } from "lodash";

import { ImgHTMLAttributes } from "react";
import { isStringLiteral } from "typescript";

/**
 * 通过请求来注入到 content script 里面的脚本， 用户获取 草稿文本内容
 * 注入脚本， 必定是要纯函数
 * @returns
 */
const fetchGetContent = () => {
  const pagePathName = location?.pathname || "";
  let pageId = "";

  // 正则表达式来匹配路径最后一个非数字部分
  const regex = /\/([\w-]+)$/;

  const match = pagePathName.match(regex);

  if (match) {
    pageId = match[1];
  } else {
    console.log("链接中没有找到 ID 参数");
  }

  let imgStatic: { url: string; name: string }[] = [];
  const urlsNode = document.querySelectorAll(".markdown-body img");

  urlsNode?.forEach((item: any) => {
    imgStatic.push({
      url: item?.src,
      name: item?.alt,
    });
  });

  // 获取 title
  const valueInput = document.querySelector(
    "#juejin-web-editor > div.edit-draft > div > header > input"
  ) as any;

  return {
    imgStatic,
    pageTitle: valueInput?.value || "",
    pageId,
  };
};

export default fetchGetContent;
