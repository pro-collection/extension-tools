# 掘金插件工具

## 功能

1. 一键开启阅读模式
2. 一键复制当前掘金文章为 markdown 文档

## 环境配置

1. 支持 TypeScript 编写 `content script、background`
2. 支持 TypeScript + React 编写 popup 界面
3. 支持 antd + tailwindcss
4. webpack 工程化

## 构建

```
// 开发模式
pnpm dev

// 构建模式
pnpm prod
```

## 使用插件

按照以下步骤来即可

下载本仓库的项目， 然后进入到 `apps/juejin` 目录下面, 直接运行 `pnpm prod` ；

然后回得到 dist 的一个产物目录， 将产物目录导入到浏览器扩展程序页面即可（【添加已解压的扩展程序】）。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b68bdb1ddfd64df0bc1955f0dfb42db2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2936&h=472&s=101093&e=png&b=ffffff)
