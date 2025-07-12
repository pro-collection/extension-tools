/**
 * 本地存储工具模块
 * 提供统一的本地存储操作接口，包含添加、获取、更新和删除方法
 * 使用枚举管理存储键，避免硬编码字符串
 */

import { StorageKey } from "@src/consts";

/**
 * 设置本地存储项
 * @param key - 存储键（必须是StorageKey枚举成员）
 * @param value - 要存储的值（会自动序列化为JSON）
 * @returns 是否存储成功
 */
export const setStorageItem = <T>(key: StorageKey, value: T): boolean => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Failed to set storage item with key ${key}:`, error);
    return false;
  }
};

/**
 * 获取本地存储项
 * @param key - 存储键（必须是StorageKey枚举成员）
 * @returns 解析后的存储值，若不存在或解析失败则返回null
 */
export const getStorageItem = <T>(key: StorageKey): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Failed to get storage item with key ${key}:`, error);
    return null;
  }
};

/**
 * 删除本地存储项
 * @param key - 存储键（必须是StorageKey枚举成员）
 * @returns 是否删除成功
 */
export const removeStorageItem = (key: StorageKey): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove storage item with key ${key}:`, error);
    return false;
  }
};
