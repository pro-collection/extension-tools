import contentCopy from "@src/content/contentCopy";
import { flow } from "lodash";
import h2md from "html-to-md";

const copyRunner = async () => {
  // 注入 content script , 获取 复制的文本， 然后将这个文本 给 popup
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab) {
    return "";
  }

  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab?.id as number },
    func: contentCopy,
    injectImmediately: true,
  });

  const { articleContent, author, href } = result || {};

  let markdown = "";

  if (articleContent) {
    const content = h2md(articleContent);

    // 写入文件
    markdown = flow(
      (value) => value.replace(/javascriptCopy code/gi, ""),
      (value) => value.replace(/htmlCopy code/gi, ""),
      (value) => value.replace(/cssCopy code/gi, ""),
      (value) => value.replace(/jsCopy code/gi, ""),
      (value) => value.replace(/jsonCopy code/gi, ""),
      (value) => value.replace(/shellCopy code/gi, ""),
      (value) => value.replace(/jsxCopy code/gi, ""),
      (value) => value.replace(/```js\njs/gi, "```js\n"),
      (value) => value.replace(/```javascript\njs/gi, "```javascript\n"),
      (value) => value.replace(/```typescript\ntypescript/gi, "```typescript\n"),
      (value) => value.replace(/\\. /gi, ". "),
      (value) => value.replace(/\\- /gi, "- "),
      (value) => value.replace(/复制代码/gi, ""),
      // value => value.replace(/\n### /gi, "\n#### "),
      (value) => value.replace(/\n## /gi, "\n### ")
    )(content);

    const desc = `> 作者：${author}
> 链接：${href}
> 来源：稀土掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---------

`;
    markdown = desc + markdown;
  }

  return markdown;
};

export default copyRunner;
