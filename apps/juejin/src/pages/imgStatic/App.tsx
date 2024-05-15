import React, { useEffect, useState } from "react";
import "@src/popup/listener";
import "./style.css";
import { Tabs, Spin, Image, Button, Flex } from "antd";
import type { TabsProps } from "antd";
import EditButtonAndModal from "./components/EditButtonAndModal";
import { ActionType, StorageKey } from "@src/consts";
import { divide, isEmpty, map } from "lodash";
import { SearchOutlined, ToolFilled } from "@ant-design/icons";
import Previewer from "./components/Previewer";

const mock = [
  {
    pageTitle: "图床",
    pageId: "7297130301288923171",
    imgStatic: [
      {
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5883f0d011474daf94cf38f56612d170~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536&h=520&s=85225&e=png&b=f8f9fa",
        name: "001.png",
      },
      {
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35522b6e1cd54b218c32d50c1fb100c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
        name: "hello_extensions.png",
      },
      {
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5021dcd4bf1a4b4fa3a3d563587bfb8b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
        name: "hello_extensions.png",
      },
    ],
  },
];

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 主要数据
  const [imgStatics, setImgStatics] = useState<TabsProps["items"]>([]);

  /**
   * 获取 图片资源 核心逻辑
   */
  const runner = async () => {
    setLoading(true);

    try {
      const { imgBaseUrlList = [] } = await chrome.storage.local.get(StorageKey.imgBaseUrlList);
      console.log(`[yanle] - imgbaseurllist`, imgBaseUrlList);

      if (!isEmpty(imgBaseUrlList)) {
        setUrls(imgBaseUrlList);

        // 通过插件来获取静态图片的
        // const result = await chrome.runtime.sendMessage({
        //   actionType: ActionType.imgStatic2background.injectIframe,
        //   urls: imgBaseUrlList,
        // });

        // console.log(`[yanle] - result`, result);

        const statics: TabsProps["items"] = map(mock, (item) => {
          return {
            key: item.pageId,
            label: item.pageTitle,
            children: <Previewer imgStatic={item.imgStatic} />,
          };
        });

        setImgStatics(statics);

        // console.log(`[yanle] - result`, result);
      } else {
        setImgStatics([]);
      }
    } catch (e) {
      setLoading(false);
      console.log(`[yanle] - e`, e);
    }

    setLoading(false);
  };

  // 初始化
  useEffect(() => {
    runner();
  }, []);

  return (
    <div className="w-[100vw]" id="container">
      <header className="flex items-center justify-between p-5">
        <span className="text-3xl">掘金图床</span>
        <EditButtonAndModal runner={runner} setUrls={setUrls} urls={urls} />
      </header>

      <Spin spinning={loading}>
        <div className="p-5">
          <Tabs defaultActiveKey="1" items={imgStatics} />
        </div>
      </Spin>
    </div>
  );
};

export default App;
