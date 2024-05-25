import { get, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { StorageKey } from "@src/consts";

/**
 * 初始化， 判定用户是否登录， 判定是否有图床链接
 * @returns
 */
const useMountInit = () => {
  const [user, setUser] = useState({ userName: "", id: "" });
  const [loading, setLoading] = useState(true);
  // urls
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      // chrome-extension://bhhfofpcngphanfejfkbojbgcfhijnca/popup/index.html
      let userInfo;
      try {
        userInfo = await fetch("https://api.juejin.cn/user_api/v1/user/get", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => res);
      } catch (e) {
        setLoading(false);
        console.log(`[yanle] - e`, e);
      }

      setLoading(false);
      setUser({
        userName: get(userInfo, "data.user_name", ""),
        id: get(userInfo, "data.user_id", ""),
      });

      /* ==============================  获取图床列表 - Start ============================== */
      let imgBaseUrlList: string[] = [];
      try {
        const res = await chrome.storage.local.get(StorageKey.imgBaseUrlList);

        imgBaseUrlList = res.imgBaseUrlList || [];
      } catch (e) {
        console.log(`[yanle] - 没有获取到图库链接`, e);
      }

      if (isEmpty(imgBaseUrlList)) {
        setLoading(false);
        return;
      } else {
        setUrls(imgBaseUrlList);
      }
      /* ==============================  获取图床列表 - End   ============================== */
    };

    init();
  }, []);

  return {
    user,
    loading,
    urls,
  };
};

export default useMountInit;
