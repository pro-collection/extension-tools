import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Image, Button, Flex, message, Tooltip, Spin } from "antd";
import { map } from "lodash";
import { PreviewerProps } from "./interface";
import {
  CloudDownloadOutlined,
  CopyOutlined,
  DownloadOutlined,
  FileMarkdownOutlined,
} from "@ant-design/icons";
import Bricks from "bricks.js";

/**
 * 预览
 * @param props
 * @returns
 */
const Previewer: FC<PreviewerProps> = (props) => {
  const { imgStatic } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(true);

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

  useLayoutEffect(() => {
    const sizes = [
      { columns: 2, gutter: 10 },
      { mq: "768px", columns: 3, gutter: 25 },
      { mq: "1024px", columns: 4, gutter: 50 },
      { mq: "1400px", columns: 5, gutter: 30 },
    ];

    const instance = Bricks({
      sizes: sizes,
      container: "#img-bricks-container",
      packed: "data-packed",
    });

    setLoading(true);
    setTimeout(() => {
      instance.pack().resize(true);
      setLoading(false);
    }, 300);
  }, [imgStatic]);

  return (
    <Spin spinning={loading}>
      {contextHolder}
      <div id="img-bricks-container" className="flex items-center gap-2 flex-wrap">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {map(imgStatic, ({ name, url }) => (
            <div className="flex justify-start flex-col">
              <Image width={260} src={url} />

              <Flex className="mt-1" style={{ width: 260 }} wrap={"wrap"} gap="small">
                <Tooltip placement="top" title={"复制链接"}>
                  <Button icon={<CopyOutlined />} size="small" onClick={handleCopy(url)} />
                </Tooltip>
                <Tooltip placement="top" title={"复制 Markdown 链接"}>
                  <Button
                    icon={<FileMarkdownOutlined />}
                    size="small"
                    onClick={handleCopyWithMarkdown(name, url)}
                  />
                </Tooltip>
                <Button icon={<CloudDownloadOutlined />} size="small">
                  <a href={url} download={name}>
                    下载
                  </a>
                </Button>
              </Flex>
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </Spin>
  );
};

export default Previewer;
