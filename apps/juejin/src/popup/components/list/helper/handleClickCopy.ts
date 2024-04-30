const hanldeClickCopy = () => {
  // 插入脚本到 content scripts 让 content scirpts 读取 dom 节点然后返回

  //

  // 测试复制内容， 完美可用
  navigator.clipboard
    .writeText("我只是测试复制内容出来")
    .then((res) => {
      console.log(`[yanle] - res`, res);
    })
    .catch((e) => {
      console.log(`[yanle] - e`, e);
    });
};

export default hanldeClickCopy;
