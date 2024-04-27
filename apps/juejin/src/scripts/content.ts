const $article = document.getElementById("article-root");

if ($article) {
  const wordLength = $article.innerText.length;
  const $imgs = $article.querySelectorAll("img");

  const $container = document.createElement("div");

  const $wordsElement = document.createElement("p");
  $wordsElement.innerText = `统计该文章字符：共计 ${wordLength} 个字符`;
  $container.append($wordsElement);

  const $desc = (document.createElement("p").innerText = "提取该文章的所有图片");
  $container.append($desc);

  for (const img of $imgs) {
    const src = img.getAttribute("src");
    if (src) {
      const $p = document.createElement("p");
      const $a = document.createElement("a");
      $a.setAttribute("href", src);
      $a.setAttribute("target", "_blank");
      $a.innerText = src;

      $p.append($a);

      $container.append($p);
    }
  }

  document.getElementsByClassName("author-info-block")?.[0]?.insertAdjacentElement("afterend", $container);
}
