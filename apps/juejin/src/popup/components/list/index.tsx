import { Button, List, Switch } from "antd";
import React, { FC } from "react";
import { CopyOutlined } from "@ant-design/icons";
import hanldeClickCopy from "./helper/handleClickCopy";
import handleSwitch from "./helper/handleSwitch";

const ListCompoennts: FC = () => {
  return (
    <div id="list-components">
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            label: "是否开启阅读模式",
            actions: [
              <Switch onChange={handleSwitch} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />,
            ],
          },
          {
            label: "点击复制当前页面文章为 Markdown 文本格式",
            actions: [
              <Button onClick={hanldeClickCopy} type="primary" shape="round" icon={<CopyOutlined />}>
                复制到粘贴板
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
