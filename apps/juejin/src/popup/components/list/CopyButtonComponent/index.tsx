import { Button, message } from "antd";
import React, { FC } from "react";
import hanldeClickCopy from "../helper/handleClickCopy";
import { CopyOutlined } from "@ant-design/icons";

const CopyButtonComponent: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div>
      {contextHolder}
      <Button
        onClick={hanldeClickCopy(messageApi)}
        type="primary"
        shape="round"
        icon={<CopyOutlined />}
      >
        复制到粘贴板
      </Button>
    </div>
  );
};

export default CopyButtonComponent;
