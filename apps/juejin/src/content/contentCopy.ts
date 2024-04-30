/**
 * 在 content script 需要执行的脚本
 * @returns
 */
const contentCopy = () => {
  const $article = document.getElementById("article-root");

  const articleContent = $article?.innerHTML || "";

  const author = document.querySelector<HTMLElement>(".author-info-box span.name")?.innerText as string;

  const href = window.location.href;

  return {
    articleContent,
    author,
    href,
  };
};

export default contentCopy;
