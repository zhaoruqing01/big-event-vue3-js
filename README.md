# Vue3-big-event-admin

基于 Vue3 + Vite + Element Plus 开发的大型活动管理后台系统，提供文章管理、用户管理、分类管理等核心功能，采用现代化前端技术栈构建，具备良好的可扩展性和维护性。

## 项目简介

Vue3-big-event-admin 是一个面向活动管理场景的后台系统解决方案，旨在帮助开发者快速搭建功能完善的管理平台。系统采用前后端分离架构，前端基于 Vue3 生态，结合 Element Plus 组件库实现了美观的 UI 界面，同时集成了 Pinia 状态管理、Vue Router 路由控制、Axios 网络请求等核心工具，为复杂业务场景提供了稳定的技术支撑。

## 技术栈

- **核心框架**：Vue 3.2+
- **构建工具**：Vite 4.0+
- **UI 组件库**：Element Plus 2.10+
- **状态管理**：Pinia 2.0+
- **路由管理**：Vue Router 4.1+
- **网络请求**：Axios 1.10+
- **富文本编辑器**：@vueup/vue-quill
- **代码规范**：ESLint + Prettier
- **样式预处理器**：Sass
- **测试工具**：Vitest
- **自动化工具**：Husky + lint-staged

## 功能模块

1. **用户管理**
   - 登录 / 注册功能
   - 个人资料修改（昵称、邮箱）
   - 头像上传与更新
   - 密码修改
2. **文章管理**
   - 文章列表展示（分页、筛选、搜索）
   - 文章发布（支持富文本编辑、封面上传）
   - 文章编辑与删除
   - 文章状态管理（已发布 / 草稿）
3. **分类管理**
   - 文章分类列表展示
   - 分类添加、编辑与删除
   - 分类别名管理

## 目录结构

plaintext

```plaintext
src/
├── api/               # 接口请求封装
│   ├── article.js     # 文章相关接口
│   └── user.js        # 用户相关接口
├── assets/            # 静态资源
│   └── main.scss      # 全局样式
├── components/        # 公共组件
│   └── PageContainer.vue  # 页面容器组件
├── router/            # 路由配置
│   └── index.js       # 路由规则定义
├── stores/            # 状态管理
│   ├── index.js       # Pinia 初始化
│   └── modules/       # 模块拆分
├── utils/             # 工具函数
│   ├── request.js     # Axios 封装
│   └── format.js      # 格式化工具
├── views/             # 页面组件
│   ├── login/         # 登录页
│   ├── layout/        # 布局组件
│   ├── article/       # 文章管理相关页面
│   └── user/          # 用户管理相关页面
├── App.vue            # 根组件
└── main.js            # 入口文件
```

## 快速开始

### 环境要求

- Node.js 16.x+
- pnpm 7.x+（推荐）

### 安装步骤

1. 克隆仓库

   sh

   ```sh
   git clone https://github.com/zhaoruqing01/big-event-vue3-js.git
   cd big-event-vue3-js
   ```

2. 安装依赖

   sh

   ```sh
   pnpm install
   ```

3. 启动开发服务器（默认端口 5173）

   sh

   ```sh
   pnpm dev
   ```

4. 构建生产版本

   sh

   ```sh
   pnpm build
   ```

5. 预览生产版本

   sh

   ```sh
   pnpm preview
   ```

6. 代码检查与修复

   sh

   ```sh
   pnpm lint
   ```

7. 运行单元测试

   sh

   ```sh
   pnpm test:unit
   ```

## 配置说明

### 路由配置

- 路由模式：采用 `createWebHistory`（无哈希值 URL）
- 权限控制：通过路由守卫实现登录态校验，未登录用户自动跳转至登录页
- 路由懒加载：通过动态 import 实现组件按需加载，优化首屏性能

### 网络请求

- 基础地址：`http://big-event-vue-api-t.itheima.net`（可在 `src/utils/request.js` 中修改）
- 请求拦截器：自动添加 Token 至请求头
- 响应拦截器：统一处理错误（如 401 权限失效自动跳转登录页）、提取核心响应数据

### 状态管理

- 采用 Pinia 替代 Vuex，简化状态管理逻辑
- 集成 `pinia-plugin-persistedstate` 实现状态持久化（如 Token 本地存储）
