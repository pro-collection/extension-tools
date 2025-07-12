import * as React from "react";
import "@src/popup/listener";
import "./style.css";
import ListCompoennts from "@src/popup/components/list";
import { Button, Divider, Space } from "antd";

const App: React.FC = () => {
  return (
    <div className="w-[700px] p-[12px]" id="container">
      <ListCompoennts />
      <Divider orientation="left">关于作者</Divider>
      <Space>
        <Button type="link">
          <a href="https://juejin.cn/user/4125023357899367" target="_blank">
            作者：晴小篆
          </a>
        </Button>

        <Button type="link">
          <a
            href="https://github.com/pro-collection/extension-tools/tree/master/apps/juejin"
            target="_blank"
          >
            github 源码地址
          </a>
        </Button>
      </Space>
    </div>
  );
};

export default App;
