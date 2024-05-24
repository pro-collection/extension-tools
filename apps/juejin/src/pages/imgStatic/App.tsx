import React, { ReactElement, useEffect, useState } from "react";
import "@src/popup/listener";
import "./style.css";
import { Tabs, Spin, Image, Button, Flex, Input, InputNumber } from "antd";
import type { TabsProps } from "antd";
import EditButtonAndModal from "./components/EditButtonAndModal";
import { ActionType, StorageKey } from "@src/consts";
import { divide, get, isEmpty, map, toNumber } from "lodash";
import { SearchOutlined, ToolFilled } from "@ant-design/icons";
import Previewer from "./components/Previewer";
import { mock } from "./mock";

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
        <div>
          <EditButtonAndModal runner={runner} setUrls={setUrls} urls={urls} />
        </div>
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
