import React, { useEffect, useState } from "react";
import "@src/popup/listener";
import "./style.css";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import EditButtonAndModal from "./components/EditButtonAndModal";
import { ActionType, StorageKey } from "@src/consts";
import { isEmpty } from "lodash";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const runner = async () => {
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
      }
    };

    runner();
  }, []);

  return (
    <div className="w-[100vw]" id="container">
      <header className="flex items-center justify-between p-5">
        <span className="text-3xl">掘金图床</span>
        <EditButtonAndModal setUrls={setUrls} urls={urls} />
      </header>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default App;
