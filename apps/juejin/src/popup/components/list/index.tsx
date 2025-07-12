import { List } from "antd";
import React, { FC } from "react";
import SwitchComponent from "./SwitchComponent";
import CopyButtonComponent from "./CopyButtonComponent";
import ImgStaticComponent from "./ImgStaticComponent";
import QuerySelectorInput from "./CopyButtonComponent/QuerySelectorInput";

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
            description: <QuerySelectorInput />,
          },
          {
            label: "图床",
            actions: [<ImgStaticComponent />],
          },
        ]}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{item.label}</span>
              <span>{item.description}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListCompoennts;
