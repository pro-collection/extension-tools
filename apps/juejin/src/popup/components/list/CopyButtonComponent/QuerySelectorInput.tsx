import React, { useRef, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import type { InputRef } from "antd";
import { Tooltip } from "antd";
import { setStorageItem, getStorageItem, removeStorageItem } from "../../../store/index";
import { StorageKey } from "@src/consts";

/**
 * CSS查询选择器管理组件
 * 提供添加、选择和清除CSS选择器的功能，支持本地存储持久化
 * 用于管理页面元素选择器并保存用户偏好设置
 */
const QuerySelectorInput: React.FC = () => {
  /**
   * 已添加的CSS查询选择器列表
   * 从localStorage加载初始化数据，保存用户之前添加的所有选择器
   */
  const [queries, setQueries] = useState<string[]>(() => {
    try {
      return getStorageItem<string[]>(StorageKey.QUERY_SELECTORS) || [];
    } catch (e) {
      console.error("Failed to parse saved queries", e);
      return [];
    }
  });
  /**
   * 当前输入框中的查询选择器文本
   * 临时存储用户正在输入的新选择器内容
   */
  const [currentQuery, setCurrentQuery] = useState("");
  /**
   * 当前选中的查询选择器值
   * 从localStorage加载初始化，保存用户上次选择的选择器
   */
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    try {
      return getStorageItem<string>(StorageKey.SELECTED_QUERY_SELECTOR) || "";
    } catch (e) {
      console.error("Failed to parse saved selected value:", e);
      return "";
    }
  });
  /**
   * 输入框的引用
   * 用于在添加新选择器后聚焦回输入框
   */
  const inputRef = useRef<InputRef>(null);

  /**
   * 处理输入框内容变化事件
   * @param event - 输入框变化事件对象
   */
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(event.target.value);
  };

  /**
   * 添加新的查询选择器
   * 验证输入不为空且不存在重复后，更新选择器列表并保存到localStorage
   * 清空输入框并重新聚焦
   */
  const addQuery = () => {
    if (currentQuery.trim() && !queries.includes(currentQuery.trim())) {
      const newQueries = [...queries, currentQuery.trim()];
      setQueries(newQueries);
      setStorageItem(StorageKey.QUERY_SELECTORS, newQueries);
      setCurrentQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  /**
   * 处理添加按钮点击事件
   * @param e - 鼠标事件对象
   */
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    addQuery();
  };

  /**
   * 处理输入框键盘事件
   * 当按下Enter键时添加新选择器
   * @param e - 键盘事件对象
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addQuery();
    }
  };

  /**
   * 处理选择器选择变化事件
   * 更新选中值并保存到localStorage
   * @param value - 选中的选择器值
   */
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    try {
      setStorageItem(StorageKey.SELECTED_QUERY_SELECTOR, value);
    } catch (e) {
      console.error("Failed to save selected value to localStorage:", e);
    }
  };

  /**
   * 清除所有查询选择器
   * 重置状态并从localStorage中移除保存的数据
   */
  const handleClearAll = () => {
    setQueries([]);
    setCurrentQuery("");
    setSelectedValue("");
    removeStorageItem(StorageKey.QUERY_SELECTORS);
    removeStorageItem(StorageKey.SELECTED_QUERY_SELECTOR);
  };

  return (
    <Select
      className="w-[450px]"
      placeholder="选择具体的文章的 dom querySelector 选择器"
      allowClear
      value={selectedValue}
      onChange={handleSelectChange}
      dropdownRender={(menu: React.ReactNode) => (
        <div className="max-h-[150px] overflow-auto">
          {menu}
          <Divider className="my-2" />
          <Space className="p-1 px-2">
            <Input
              placeholder="输入 querySelector 选择器"
              ref={inputRef}
              value={currentQuery}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              className="w-[350px]"
            />
            <Tooltip title="添加查询选择器">
              <Button type="text" icon={<PlusOutlined />} onClick={handleButtonClick} />
            </Tooltip>

            <Tooltip title="清空所有查询选择器">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={handleClearAll}
              />
            </Tooltip>
          </Space>
        </div>
      )}
      options={queries.map((query) => ({ label: query, value: query }))}
    />
  );
};

export default QuerySelectorInput;
