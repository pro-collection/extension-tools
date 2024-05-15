import React, { useEffect, useState } from "react";
import "@src/popup/listener";
import "./style.css";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import EditButtonAndModal from "./components/EditButtonAndModal";
import { ActionType, StorageKey } from "@src/consts";

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
  useEffect(() => {
    chrome.storage.local.get(StorageKey.imgBaseUrlList).then(({ imgBaseUrlList = [] }) => {
      console.log(`[yanle] - imgBaseUrlList`, imgBaseUrlList);
    });

    // 通知插入脚本
    // chrome.runtime.sendMessage({
    //   actionType: ActionType.imgStatic2background.injectIframe,
    // });
  }, []);

  return (
    <div className="w-[100vw]" id="container">
      <header className="flex items-center justify-between p-5">
        <span className="text-3xl">掘金图床</span>
        <EditButtonAndModal />
      </header>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

      <div style={{ display: "none" }}>
        <iframe
          id="7297130301288923171"
          src="https://juejin.cn/editor/drafts/7297130301288923171"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
