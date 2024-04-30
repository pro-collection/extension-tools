import { StorageKey } from "@src/consts";
import { Switch } from "antd";
import React, { FC, useEffect, useState } from "react";
import handleSwitch from "../helper/handleSwitch";

const SwitchComponent: FC = () => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = (value: boolean) => handleSwitch(value, setChecked);

  useEffect(() => {
    chrome.storage.local.get(StorageKey.focusReadStatus).then((res) => {
      setChecked(res?.focusReadStatus);
    });

    chrome.runtime.onMessage.addListener((query) => {
      console.log(`[yanle] - query`, query);
      return undefined;
    });
  }, []);

  return (
    <Switch
      onChange={(value) => handleOnChange(value)}
      checkedChildren="开启"
      unCheckedChildren="关闭"
      checked={checked}
    />
  );
};

export default SwitchComponent;
