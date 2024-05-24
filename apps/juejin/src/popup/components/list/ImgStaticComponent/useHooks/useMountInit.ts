import { get, isEmpty } from "lodash";
import { useEffect } from "react";
import { UseMountInitOptions } from "../interface";
import { StorageKey } from "@src/consts";

const useMountInit = (options: UseMountInitOptions) => {
  const { setLoading, setUrls, setUser } = options;
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      /* ==============================  获取图床列表 - Start ============================== */
      const { imgBaseUrlList = [] } = await chrome.storage.local.get(StorageKey.imgBaseUrlList);

      if (isEmpty(imgBaseUrlList)) {
        setLoading(false);
        return;
      } else {
        setUrls(imgBaseUrlList);
      }
      /* ==============================  获取图床列表 - End   ============================== */

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

      console.log(`[yanle] - uesrinfo`, userInfo);
      setLoading(false);
      setUser({
        userName: get(userInfo, "data.user_name", ""),
        id: get(userInfo, "data.user_id", ""),
      });
    };

    init();
  }, []);
};

export default useMountInit;
