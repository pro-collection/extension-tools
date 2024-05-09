export interface HandleBeforeSendHeadersOptions {
  /**
   * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
   */
  requestId: string;

  url: string;

  /**
   * Standard HTTP method.
   */
  method: string;

  /**
   * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
   */
  frameId: number;

  /**
   * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
   */
  parentFrameId: number;

  /**
   * The UUID of the document making the request.
   *
   * @since Chrome 106
   */
  documentId: string;

  /**
   * The UUID of the parent document owning this frame. This is not set if there is no parent.
   *
   * @since Chrome 106
   */
  parentDocumentId?: string;

  /**
   * The lifecycle the document is in.
   *
   * @since Chrome 106
   */
  documentLifecycle: chrome.extensionTypes.DocumentLifecycle;

  /**
   * The type of frame the request occurred in.
   *
   * @since Chrome 106
   */
  frameType: chrome.extensionTypes.FrameType;

  /**
   * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
   */
  tabId: number;

  /**
   * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
   *
   * @since Chrome 63
   */
  initiator?: string;

  /**
   * How the requested resource will be used.
   */
  type: chrome.webRequest.ResourceType;

  /**
   * The time when this signal is triggered, in milliseconds since the epoch.
   */
  timeStamp: number;

  /**
   * The HTTP request headers that are going to be sent out with this request.
   */
  requestHeaders?: chrome.webRequest.HttpHeaders;
}

export type Response = chrome.webRequest.BlockingResponse | undefined;

/**
 * chrome.webRequest.onBeforeSendHeaders.addListener callback function 类型
 */
export type HandleBeforeSendHeaders = (options: HandleBeforeSendHeadersOptions) => Response;

type Handler = (options: HandleBeforeSendHeadersOptions) => void;

/**
 * 单个拦截的场景
 */
export interface InterceptModifyHeaderItem {
  ulrPrefix: string;
  headers: Record<string, string>;
  inspectUrls: string[];
  handler: Noop | Handler;
}
