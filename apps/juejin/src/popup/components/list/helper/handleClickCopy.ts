import { ActionType } from "@src/consts";
import { MessageInstance } from "antd/es/message/interface";

const hanldeClickCopy = (api: MessageInstance) => async () => {
  // 插入脚本到 content scripts 让 content scirpts 读取 dom 节点然后返回
  // 通知注入脚本
  // 测试复制内容， 完美可用

  const resContent = await chrome.runtime.sendMessage({
    actionType: ActionType.popup2background.copy,
  });

  if (resContent) {
    navigator.clipboard
      .writeText(resContent)
      .then(() => {
        api.info("复制成功。");
      })
      .catch((e) => {
        api.error("复制失败。");
      });
  } else {
    api.warning("复制失败。请检测是否为掘金文章页面。");
  }
};

export default hanldeClickCopy;
