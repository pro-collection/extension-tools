import React, { FC } from "react";
import { Image, Button, Flex, message } from "antd";
import { map } from "lodash";

/**
 * 预览
 * @param props
 * @returns
 */
const Previewer: FC<{ imgStatic: { name: string; url: string }[] }> = (props) => {
  const { imgStatic } = props;

  const [messageApi, contextHolder] = message.useMessage();

  // 复制链接
  const handleCopy = (url: string) => () => {
    navigator.clipboard.writeText(url).then(() => {
      messageApi.open({
        type: "success",
        content: "复制链接成功",
      });
    });
  };

  const handleCopyWithMarkdown = (name: string, url: string) => () => {
    const str = `![name](${url})`;
    navigator.clipboard.writeText(str).then(() => {
      messageApi.open({
        type: "success",
        content: "复制链接成功",
      });
    });
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center gap-2 flex-wrap">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {map(imgStatic, ({ name, url }) => (
            <div className="flex justify-start flex-col">
              <Image width={260} src={url} />

              <Flex className="mt-1" wrap={"wrap"} gap="small">
                <Button size="small" onClick={handleCopy(url)}>
                  复制
                </Button>
                <Button size="small" onClick={handleCopyWithMarkdown(name, url)}>
                  复制 Markdown 链接
                </Button>
                <Button size="small">
                  <a href={url} download={name}>
                    下载
                  </a>
                </Button>
              </Flex>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default Previewer;
