# EdgeOne Pages 部署指南

## 概述

本项目已配置支持腾讯云EdgeOne Pages静态部署。EdgeOne Pages是一个边缘计算平台，支持全球CDN加速。

## 部署配置

### 构建设置

在EdgeOne Pages控制台配置以下构建参数：

| 配置项           | 值                       |
| ---------------- | ------------------------ |
| **框架预设**     | Next.js                  |
| **构建命令**     | `pnpm run build:edgeone` |
| **构建输出目录** | `out`                    |
| **Node.js版本**  | 20.x                     |
| **安装命令**     | `pnpm install`           |

### 环境变量配置

在EdgeOne Pages控制台的"环境变量"中添加以下变量（可选）：

```bash
# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (可选)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

> 💡 **提示**：这些环境变量是可选的。如果不配置，相关功能会被禁用。

## 本地测试

在部署前，建议先在本地测试静态构建：

```bash
# 1. 安装依赖
pnpm install

# 2. 构建静态版本
pnpm run build:edgeone

# 3. 检查输出目录
ls -la out/

# 4. 本地预览（可选）
npx serve out
```

## 配置文件说明

### next.config.edgeone.ts

EdgeOne Pages专用配置文件，主要特点：

- ✅ `output: 'export'` - 启用静态导出
- ✅ `images.unoptimized: true` - 禁用图片优化（静态导出必需）
- ❌ 移除了 `headers()` 和 `redirects()` - 静态导出不支持

### 与Cloudflare配置的区别

项目同时支持两种部署方式：

| 特性     | EdgeOne Pages            | Cloudflare Pages    |
| -------- | ------------------------ | ------------------- |
| 配置文件 | `next.config.edgeone.ts` | `next.config.ts`    |
| 构建命令 | `pnpm run build:edgeone` | `pnpm run build:cf` |
| 输出目录 | `out/`                   | `.open-next/`       |
| 运行时   | 静态HTML                 | Cloudflare Workers  |

## 注意事项

### 🔴 静态导出的限制

使用EdgeOne Pages时，以下Next.js功能**不可用**：

1. **服务端渲染 (SSR)** - 所有页面在构建时生成
2. **API路由** - `/app/api/*` 不会工作
3. **服务端Headers** - 需在EdgeOne控制台配置
4. **服务端Redirects** - 使用客户端重定向或元标签
5. **Image Optimization** - 图片不会自动优化

### ⚠️ 安全Headers配置

由于静态导出不支持`headers()`配置，你需要在EdgeOne控制台手动配置安全Headers：

```
X-DNS-Prefetch-Control: on
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com https://www.google-analytics.com;
```

## 常见问题

### 1. 构建失败：Module not found

**原因**：TypeScript错误或缺少依赖

**解决**：

```bash
# 检查TypeScript错误
pnpm run build:edgeone

# 如果是依赖问题
pnpm install
```

### 2. 部署后页面404

**原因**：路由配置问题或动态路由未预渲染

**解决**：确保所有动态路由都有`generateStaticParams()`函数

### 3. 图片不显示

**原因**：使用了Next.js Image组件但未配置unoptimized

**解决**：配置文件已设置`images.unoptimized: true`

## 部署流程

1. **连接仓库** - 在EdgeOne Pages控制台连接GitHub仓库
2. **配置构建** - 按照上述"构建设置"配置
3. **添加环境变量** - （可选）配置GA和AdSense ID
4. **触发部署** - 推送代码到GitHub自动触发部署
5. **配置Headers** - 在EdgeOne控制台配置安全Headers
6. **绑定域名** - 绑定自定义域名并配置SSL

## 相关链接

- [EdgeOne Pages 文档](https://cloud.tencent.com/document/product/1552)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [项目仓库](https://github.com/mjiagou/2025-blog-public)
