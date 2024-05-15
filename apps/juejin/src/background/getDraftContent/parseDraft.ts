const parseDraft = (content = "") => {
  // 正则表达式用于匹配 Markdown 中的图片 alt 文本和链接
  const regex = /!\[(.*?)\]\((http.+?)\)/gi;

  let match;
  const images: Record<string, string> = {};

  // 使用正则表达式搜索并迭代匹配
  while ((match = regex.exec(content)) !== null) {
    // match[1] 是 alt 文本
    // match[2] 是图片 URL
    const altText = match?.[1];
    const url = match?.[2];

    images[altText] = url;
  }

  return images;
};
