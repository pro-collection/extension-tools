import { generateMarkdown } from "@src/background/copy";
import { ActionType, StorageKey } from "@src/consts";
import { getStorageItem } from "@src/popup/store";
import { MessageInstance } from "antd/es/message/interface";
import { load } from "cheerio";
import { trim } from "lodash";

/**
 * 直接通过最近简单的获取 html 的方式来获取当前 文章内容
 * @param api
 * @returns
 */
const hanldeClickCopy = (api: MessageInstance) => async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const query = getStorageItem<string>(StorageKey.SELECTED_QUERY_SELECTOR);
  if (tab) {
    const pageUrl = tab.url as string;
    const resContent = await chrome.scripting.executeScript({
      target: { tabId: tab.id as number },
      func: () => document.documentElement.outerHTML,
    });

    // html content
    const htmlContent = resContent[0].result;

    const $ = load(htmlContent);
    // 移除 code 块的 header
    $(".code-block-extension-header").remove();

    const articleKey = query ? query : "#article-root";
    const $article = $(articleKey);
    const articleContent = $article?.html() || "";
    const author = trim($(".author-info-box span.name").text());

    const content = generateMarkdown(articleContent, author, pageUrl);

    if (htmlContent && content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          api.info("复制成功。");
        })
        .catch((e) => {
          api.error("复制失败。");
        });
    } else {
      api.warning("复制失败。请检测是否为有效页面。");
    }
  } else {
    api.warning("未找到激活的标签页。");
  }
};

export default hanldeClickCopy;
