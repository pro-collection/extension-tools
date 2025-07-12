import { expect } from 'chai';
import cheerio from 'cheerio';
import hanldeClickCopy from './handleClickCopy';
import { MessageInstance } from 'antd/es/message/interface';

// 模拟 MessageInstance
const mockMessageApi: MessageInstance = {} as MessageInstance;

describe('handleClickCopy', () => {
  it('should copy content successfully', async () => {
    // 模拟 chrome.tabs.query 和 chrome.scripting.executeScript
    const mockTab = { id: 1 };
    const mockResult = { result: '<html><body>Test Content</body></html>' };
    (chrome.tabs.query as any) = jest.fn().mockResolvedValue([mockTab]);
    (chrome.scripting.executeScript as any) = jest.fn().mockResolvedValue([mockResult]);
    (navigator.clipboard.writeText as any) = jest.fn().mockResolvedValue();

    const copyFunction = hanldeClickCopy(mockMessageApi);
    await copyFunction();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockResult.result);
  });

  it('should show warning if no active tab', async () => {
    (chrome.tabs.query as any) = jest.fn().mockResolvedValue([]);
    const copyFunction = hanldeClickCopy(mockMessageApi);
    await copyFunction();

    expect(mockMessageApi.warning).toHaveBeenCalledWith('未找到激活的标签页。');
  });

  it('should show warning if no valid content', async () => {
    const mockTab = { id: 1 };
    const mockResult = { result: '' };
    (chrome.tabs.query as any) = jest.fn().mockResolvedValue([mockTab]);
    (chrome.scripting.executeScript as any) = jest.fn().mockResolvedValue([mockResult]);

    const copyFunction = hanldeClickCopy(mockMessageApi);
    await copyFunction();

    expect(mockMessageApi.warning).toHaveBeenCalledWith('复制失败。请检测是否为有效页面。');
  });
});