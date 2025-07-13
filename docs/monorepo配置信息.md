### 1. 初始化 pnpm Workspace

首先需要在项目根目录创建 `pnpm-workspace.yaml` 文件，定义工作空间的范围：

```yaml
packages:
  - "packages/**" # 包目录
  - "apps/**" # 应用目录
  - "!**/node_modules/**" # 排除 node_modules
```

### 2. 项目结构调整

假设原项目结构为：

```
my-project/
  ├── src/
  ├── public/
  ├── package.json
  └── ...
```

改造后可以调整为：

```
my-monorepo/
  ├── packages/
  │   ├── utils/       # 工具库
  │   ├── components/  # 组件库
  │   └── shared/      # 共享模块
  ├── apps/
  │   └── web/         # 前端应用
  ├── pnpm-workspace.yaml
  └── package.json     # 根项目配置
```

### 3. 根目录 package.json 配置

根目录的 `package.json` 应包含以下配置：

```json
{
  "name": "my-monorepo",
  "private": true, // 必须设置为 private
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -r --parallel dev"
  },
  "pnpm": {
    "overrides": {
      // 统一依赖版本
    }
  }
}
```

### 4. 子项目配置

每个子项目（如 `apps/web` 和 `packages/*`）都应有自己的 `package.json`，例如：

```json
{
  "name": "@my-app/web",
  "version": "1.0.0",
  "dependencies": {
    "@my-app/components": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

### 5. 处理依赖关系

使用 `workspace:` 协议引用内部包：

```json
{
  "dependencies": {
    "@my-app/utils": "workspace:*"
  }
}
```

### 6. 安装依赖

执行以下命令安装所有依赖：

```bash
pnpm install
```

### 7. 配置构建工具

如果使用 Vite、Webpack 等构建工具，需要为每个子项目配置独立的构建配置。

### 8. 代码共享与路径映射

可以通过 TypeScript 配置实现路径映射，方便跨包引用：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@my-app/utils": ["packages/utils/src"],
      "@my-app/components": ["packages/components/src"]
    }
  }
}
```

### 9. 持续集成与部署

配置 CI/CD 流程时，需要考虑工作空间的特殊性，例如：

```yaml
# GitHub Actions 示例
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm -r build
```

### 10. 测试与 lint

配置跨项目的测试和 lint 脚本：

```json
{
  "scripts": {
    "test": "pnpm -r test",
    "lint": "pnpm -r lint"
  }
}
```

通过以上步骤，你可以将现有的前端项目改造为 pnpm monorepo 项目，实现代码共享和更高效的依赖管理。
