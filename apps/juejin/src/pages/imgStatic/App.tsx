import React, { ReactElement, useEffect, useState } from "react";
import "@src/popup/listener";
import "./style.css";
import { Tabs, Spin, Image, Button, Flex, Input, InputNumber } from "antd";
import type { TabsProps } from "antd";
import EditButtonAndModal from "./components/EditButtonAndModal";
import { ActionType, StorageKey } from "@src/consts";
import { divide, get, isEmpty, map, toNumber } from "lodash";
import { SearchOutlined, ToolFilled } from "@ant-design/icons";
import Previewer from "./components/Previewer";

const mcok = [
  {
    imgStatic: [
      {
        name: "001.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5883f0d011474daf94cf38f56612d170~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536&h=520&s=85225&e=png&b=f8f9fa",
      },
      {
        name: "hello_extensions.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35522b6e1cd54b218c32d50c1fb100c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
      },
      {
        name: "002.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90680dbf7c98438286965873b18a9d67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=450&h=300&s=157193&e=png&a=1&b=bddfe0",
      },
      {
        name: "image.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ccbd631803149b3aaaf09b33f03299a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=1754&s=304476&e=png&b=ffffff",
      },
      {
        name: "02.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5de88edbbc6448eaa3f163d71aa9004~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=658&h=580&s=185436&e=png&b=fefefe",
      },
      {
        name: "01.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b693b02a0e94b099ccf66cd009b9ceb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=512&h=512&s=246475&e=png&b=747f81",
      },
      {
        name: "image.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f043beda7f4ce680fa28f5d7fdc101~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=914&h=576&s=74134&e=png&b=fefefe",
      },
      {
        name: "image.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f29dbc1423f4d9b94dea414f38e79b2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2940&h=1840&s=681654&e=png&b=1d1d1d",
      },
      {
        name: "001.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5883f0d011474daf94cf38f56612d170~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536&h=520&s=85225&e=png&b=f8f9fa",
      },
      {
        name: "hello_extensions.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35522b6e1cd54b218c32d50c1fb100c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
      },
      {
        name: "002.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90680dbf7c98438286965873b18a9d67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=450&h=300&s=157193&e=png&a=1&b=bddfe0",
      },
      {
        name: "image.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ccbd631803149b3aaaf09b33f03299a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=1754&s=304476&e=png&b=ffffff",
      },
      {
        name: "02.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5de88edbbc6448eaa3f163d71aa9004~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=658&h=580&s=185436&e=png&b=fefefe",
      },
      {
        name: "01.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b693b02a0e94b099ccf66cd009b9ceb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=512&h=512&s=246475&e=png&b=747f81",
      },
      {
        name: "image.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f043beda7f4ce680fa28f5d7fdc101~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=914&h=576&s=74134&e=png&b=fefefe",
      },
      {
        name: "image.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f29dbc1423f4d9b94dea414f38e79b2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2940&h=1840&s=681654&e=png&b=1d1d1d",
      },
      {
        name: "001.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5883f0d011474daf94cf38f56612d170~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536&h=520&s=85225&e=png&b=f8f9fa",
      },
      {
        name: "hello_extensions.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35522b6e1cd54b218c32d50c1fb100c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
      },
      {
        name: "002.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90680dbf7c98438286965873b18a9d67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=450&h=300&s=157193&e=png&a=1&b=bddfe0",
      },
      {
        name: "image.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ccbd631803149b3aaaf09b33f03299a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=1754&s=304476&e=png&b=ffffff",
      },
      {
        name: "02.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5de88edbbc6448eaa3f163d71aa9004~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=658&h=580&s=185436&e=png&b=fefefe",
      },
      {
        name: "01.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b693b02a0e94b099ccf66cd009b9ceb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=512&h=512&s=246475&e=png&b=747f81",
      },
      {
        name: "image.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f043beda7f4ce680fa28f5d7fdc101~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=914&h=576&s=74134&e=png&b=fefefe",
      },
      {
        name: "image.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f29dbc1423f4d9b94dea414f38e79b2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2940&h=1840&s=681654&e=png&b=1d1d1d",
      },
      {
        name: "001.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5883f0d011474daf94cf38f56612d170~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536&h=520&s=85225&e=png&b=f8f9fa",
      },
      {
        name: "hello_extensions.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35522b6e1cd54b218c32d50c1fb100c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
      },
      {
        name: "002.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90680dbf7c98438286965873b18a9d67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=450&h=300&s=157193&e=png&a=1&b=bddfe0",
      },
      {
        name: "image.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ccbd631803149b3aaaf09b33f03299a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=1754&s=304476&e=png&b=ffffff",
      },
      {
        name: "02.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5de88edbbc6448eaa3f163d71aa9004~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=658&h=580&s=185436&e=png&b=fefefe",
      },
      {
        name: "01.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b693b02a0e94b099ccf66cd009b9ceb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=512&h=512&s=246475&e=png&b=747f81",
      },
      {
        name: "image.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f043beda7f4ce680fa28f5d7fdc101~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=914&h=576&s=74134&e=png&b=fefefe",
      },
      {
        name: "image.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f29dbc1423f4d9b94dea414f38e79b2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2940&h=1840&s=681654&e=png&b=1d1d1d",
      },
      {
        name: "001.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5883f0d011474daf94cf38f56612d170~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536&h=520&s=85225&e=png&b=f8f9fa",
      },
      {
        name: "hello_extensions.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35522b6e1cd54b218c32d50c1fb100c7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=158&h=146&s=32548&e=png&b=f2f0f0",
      },
      {
        name: "002.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90680dbf7c98438286965873b18a9d67~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=450&h=300&s=157193&e=png&a=1&b=bddfe0",
      },
      {
        name: "image.png",
        url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ccbd631803149b3aaaf09b33f03299a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1106&h=1754&s=304476&e=png&b=ffffff",
      },
      {
        name: "02.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5de88edbbc6448eaa3f163d71aa9004~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=658&h=580&s=185436&e=png&b=fefefe",
      },
      {
        name: "01.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b693b02a0e94b099ccf66cd009b9ceb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=512&h=512&s=246475&e=png&b=747f81",
      },
      {
        name: "image.png",
        url: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f043beda7f4ce680fa28f5d7fdc101~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=914&h=576&s=74134&e=png&b=fefefe",
      },
      {
        name: "image.png",
        url: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f29dbc1423f4d9b94dea414f38e79b2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2940&h=1840&s=681654&e=png&b=1d1d1d",
      },
    ],
    pageId: "7369868541934764047",
    pageTitle: "图床2",
  },
];

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [imgWidth, setImgWidth] = useState(260);

  // 主要数据
  const [imgStatics, setImgStatics] = useState<TabsProps["items"]>([]);

  /**
   * 获取 图片资源 核心逻辑
   */
  const runner = async () => {
    setLoading(true);

    try {
      const { imgBaseUrlList = [] } = await chrome.storage.local.get(StorageKey.imgBaseUrlList);

      if (!isEmpty(imgBaseUrlList)) {
        setUrls(imgBaseUrlList);

        // 通过插件来获取静态图片的
        // const result = await chrome.runtime.sendMessage({
        //   actionType: ActionType.imgStatic2background.injectIframe,
        //   urls: imgBaseUrlList,
        // });

        // console.log(`[yanle] - result`, result);

        const statics: TabsProps["items"] = map(mcok, (item) => {
          return {
            key: item.pageId,
            label: item.pageTitle,
            children: <Previewer imgStatic={item.imgStatic} />,
          };
        });

        setImgStatics(statics);
      } else {
        setImgStatics([]);
      }
    } catch (e) {
      setLoading(false);
      console.log(`[yanle] - e`, e);
    }

    setLoading(false);
  };

  // 初始化
  useEffect(() => {
    runner();
  }, []);

  return (
    <div className="w-[100vw]" id="container">
      <header className="flex items-center justify-between p-5">
        <span className="text-3xl">掘金图床</span>
        <div>
          <InputNumber
            onPressEnter={(event) => {
              const imgWidth = toNumber(get(event, "target.value"));

              setImgStatics(
                map(imgStatics, (item) => {
                  return {
                    ...item,
                    children: React.cloneElement(item?.children as ReactElement, {
                      imgWidth,
                    }),
                  };
                })
              );
            }}
            className="w-[300px]"
            placeholder={"图片缩略图大小,  enter 确认， 默认 260"}
          />
          <EditButtonAndModal runner={runner} setUrls={setUrls} urls={urls} />
        </div>
      </header>

      <Spin spinning={loading}>
        <div className="p-5">
          <Tabs defaultActiveKey="1" items={imgStatics} />
        </div>
      </Spin>
    </div>
  );
};

export default App;
