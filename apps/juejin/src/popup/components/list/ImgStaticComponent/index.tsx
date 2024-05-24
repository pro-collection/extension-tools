import { StorageKey } from "@src/consts";
import { Button } from "antd";
import { get, isEmpty, map } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { Spin } from "antd";
import useMountInit from "./useHooks/useMountInit";

const ImgStaticComponent: FC = () => {
  const [user, setUser] = useState({ userName: "", id: "" });
  const [loading, setLoading] = useState(true);

  // urls
  const [urls, setUrls] = useState<string[]>([]);

  useMountInit({
    setUrls,
    setLoading,
    setUser,
  });

  return (
    <Spin spinning={loading}>
      {!!user.id ? (
        <div>
          <div>
            {
              <Button type="link">
                <a href={`https://juejin.cn/user/${user.id}`} target="_blank">
                  用户：{user.userName}
                </a>
              </Button>
            }
            -
            <Button
              type="link"
              onClick={() => {
                window.open(
                  "chrome-extension://nepbnjgiiihmemlfldbncfelglceibnh/pages/imgStatic/index.html"
                );
              }}
            >
              跳转图库
            </Button>
          </div>
          <div>
            {map(urls, (item) => {
              return (
                <p key={item}>
                  <Button type="link">
                    <a href={item} target="_blank">
                      {item}
                    </a>
                  </Button>
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <span>请先登录掘金</span>
      )}
    </Spin>
  );
};

export default ImgStaticComponent;
