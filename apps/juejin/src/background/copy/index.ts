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
    markdown = generateMarkdown(articleContent, author, href);
  }

  return markdown;
};

/**
 * 生成 markdown
 * @param articleContent
 * @param author
 * @param href
 * @returns
 */
export const generateMarkdown = (articleContent: string, author: string, href: string): string => {
  const content = h2md(articleContent);

  // 写入文件
  const replaceRegexes = (content: string, regexes: [RegExp, string][]) => {
    return regexes.reduce((acc, [regex, replacement]) => {
      return acc.replace(regex, replacement);
    }, content);
  };

  const regexes: [RegExp, string][] = [
    [/javascriptCopy code/gi, ""],
    [/htmlCopy code/gi, ""],
    [/cssCopy code/gi, ""],
    [/jsCopy code/gi, ""],
    [/jsonCopy code/gi, ""],
    [/shellCopy code/gi, ""],
    [/jsxCopy code/gi, ""],
    [/```js\njs/gi, "```js\n"],
    [/```jsx\njsx/gi, "```jsx\n"],
    [/```tsx\ntsx/gi, "```tsx\n"],
    [/```sql\nsql/gi, "```sql\n"],
    [/```java\njava/gi, "```java\n"],
    [/```python\npython/gi, "```python\n"],
    [/```go\ngo/gi, "```go\n"],
    [/```c\nc/gi, "```c\n"],
    [/```c\+\+\nc\+\+/gi, "```c++\n"],
    [/```ini\nini/gi, "```ini\n"],
    [/```json\njson/gi, "```json\n"],
    [/```html\nhtml/gi, "```html\n"],
    [/```csharp\ncsharp/gi, "```csharp\n"],
    [/```javascript\njavascript/gi, "```javascript\n"],
    [/```typescript\ntypescript/gi, "```typescript\n"],
    [/\\. /gi, ". "],
    [/\\- /gi, "- "],
    [/复制代码|代码解读/gi, ""],
    [/\n## /gi, "\n### "],
  ];

  const markdown = replaceRegexes(content, regexes);
  const desc = `> 作者：${author}               
> 链接：${href}             
> 来源：稀土掘金                  
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。                    

---------

`;

  if (author) {
    return desc + markdown;
  }

  return markdown;
};

export default copyRunner;
