import { Button, List, Switch, notification } from "antd";
import React, { FC, useEffect, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import hanldeClickCopy from "./helper/handleClickCopy";
import handleSwitch from "./helper/handleSwitch";
import { StorageKey } from "@src/consts";
import SwitchComponent from "./SwitchComponent";
import CopyButtonComponent from "./CopyButtonComponent";

const ListCompoennts: FC = () => {
  return (
    <div id="list-components">
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            label: "是否开启阅读模式",
            actions: [<SwitchComponent />],
          },
          {
            label: "点击复制当前页面文章为 Markdown 文本格式",
            actions: [<CopyButtonComponent />],
          },
          {
            label: "图床",
            actions: [
              <Button
                onClick={() => {
                  window.open("chrome-extension://nepbnjgiiihmemlfldbncfelglceibnh/pages/imgStatic/index.html");
                }}
              >
                跳转
              </Button>,
            ],
          },
        ]}
        renderItem={(item) => <List.Item actions={item.actions}>{item.label}</List.Item>}
      />
    </div>
  );
};

export default ListCompoennts;
