import { HandleBeforeSendHeaders } from "./interface";

const handleBeforeSendHeaders: HandleBeforeSendHeaders = (detail) => {
  console.log(`[yanle] - detail`, detail);
  return undefined;
};

export default handleBeforeSendHeaders;
