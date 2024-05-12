import React, { useState } from "react";
import "@src/popup/listener";
import "./style.css";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import EditButtonAndModal from "./components/EditButtonAndModal";

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
  const [] = useState();

  return (
    <div className="w-[100vw]" id="container">
      <header className="flex items-center justify-between p-5">
        <span className="text-3xl">掘金图床</span>
        <EditButtonAndModal />
      </header>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default App;
