import h2md from "html-to-md";
import { flow } from "lodash";

const $article = document.getElementById("article-root");

const content = $article?.innerHTML;
if (content) {
  let markdown = h2md(content);

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
  )(markdown);

  const author = document.querySelector<HTMLElement>(".author-info-box span.name")?.innerText as string;

  const desc = `> 作者：${author}
> 链接：${window.location.href}
> 来源：稀土掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---------

`;
  markdown = desc + markdown;
  console.log(`[yanle] - markdown\n`, markdown);
} else {
  console.log(`[yanle] - 没有 content`);
}
