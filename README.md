# 2025 Blog

> 最新引导说明：https://www.yysuni.com/blog/readme

该项目使用 Github App 管理项目内容，请保管好后续创建的 **Private key**，不要上传到公开网上。

## 1. 安装

使用该项目可以先不做本地开发，直接部署然后配置环境变量。具体变量名请看下列大写变量

```ts
export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || 'yysuni',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || '2025-blog-public',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main',
	APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || '-'
} as const
```

也可以自己手动先调整安装，可自行 `pnpm i`

## 2. 部署

我这里熟悉 Vercel 部署，就以 Vercel 部署为例子。创建 Project => Import 这个项目

![](https://www.yysuni.com/blogs/readme/730266f17fab9717.png)

无需配置，直接点部署

![](https://www.yysuni.com/blogs/readme/95dee9a69154d0d0.png)

大约 60 秒会部署完成，有一个直接 vercel 域名，如：https://2025-blog-public.vercel.app/

到这里部署网站已经完成了，下一步创建 Github App

## 3. 创建 Github App 链接仓库

在 github 个人设置里面，找到最下面的 Developer Settings ，点击进入

![](https://www.yysuni.com/blogs/readme/0abb3b592cbedad6.png)

进入开发者页面，点击 **New Github App**

_GitHub App name_ 和 _Homepage URL_ , 输入什么都不影响。Webhook 也关闭，不需要。

![](https://www.yysuni.com/blogs/readme/71dcd9cf8ec967c0.png)

只需要注意设置一个仓库 write 权限，其它不用。

![](https://www.yysuni.com/blogs/readme/2be290016e56cd34.png)

点击创建，谁能安装这个仓库这个选择无所谓。直接创建。

![](https://www.yysuni.com/blogs/readme/aa002e6805ab2d65.png)

### 创建密钥

创建好 Github App 后会提示必须创建一个 **Private Key**，直接创建，会自动下载（不见了也不要紧，后面自己再创建再下载就行）。页面上有个 **App ID** 需要复制一下

再切换到安装页面

![](https://www.yysuni.com/blogs/readme/c122b1585bb7a46a.png)

这里一定要只**授权当前项目**。

![](https://www.yysuni.com/blogs/readme/2cf1cee3b04326f1.png)

点击安装，就完成了 Github App 管理该仓库的权限设置了。下一步就是让前端知道推送那个项目，就是最开始提到的环境变量。（如果你不会设置环境变量，直接改仓库文件 `src/consts.ts` 也行。因为是公开的，所以环境变量意义也不大）

直接输入这几个环境变量值就行，一般只用设置 OWNER 和 APP_ID。其它配置不用管，直接输入创建就行。

![](https://www.yysuni.com/blogs/readme/c5a049d737848abf.png)

设置完成后，需要手动再部署一次，让环境变量生效。

- 可以直接 push 一次仓库代码会触发部署
- 也可以手动选择创建一次部署
  ![](https://www.yysuni.com/blogs/readme/59a802ed8d1c3a13.png)

## 4. 完成

现在，部署的这个网站就可以开始使用前端改内容了。比如更改一个分享内容。

**提示**，网站前端页面删改完提示成功之后，你需要等待后台的部署完成，再刷新页面才能完成服务器内容的更新哦。

## 5. 删除

使用这个项目应该第一件事需要删除我的 blog，单独删除，批量删除已完成。

## 6. 配置

大部分页面右上角都会有一个编辑按钮，意味着你可以使用 **private key** 进行配置部署。

### 6.1 网站配置

首页有一个不显眼的配置按钮，点击就能看到现在可以配置的内容。

![](https://www.yysuni.com/blogs/readme/cddb4710e08a5069.png)

## 7. 写 blog

写 blog 的图片管理，可能会有疑惑。图片管理推荐逻辑是先点击 **+ 号** 添加图片，（推荐先压缩好，尺寸推荐宽度不超过 1200）。然后将上传好的图片直接拖入文案编辑区，这就已经添加好了，点击右上角预览就可以看到效果。

## 8. 写给非前端

非前端配置内容，还是需要一个文件指引。下面写一些更细致的代码配置。

### 8.1 移除 Liquid Grass

进入 `src/layout/index.tsx` 文件，删除两行代码，然后提交代码到你的 github

```tsx
const LiquidGrass = dynamic(() => import('@/components/liquid-grass'), { ssr: false })
// 中间省略...
<LiquidGrass /> // 第 53 行
```

![](https://www.yysuni.com/blogs/readme/f70ff3fe3a77f193.png)

### 8.2 配置首页内容

首页的内容现在只能前端配置一部分，所以代码更改在 `src/app/(home)` 目录，这个目录代表首页所有文件。首页的具体文件为 `src/app/(home)/page.tsx`

![](https://www.yysuni.com/blogs/readme/011679cd9bf73602.png)

这里可以看到有很多 `Card` 文件，需要改那个首页 Card 内容就可以点入那个具体文件修改。

比如中间的内容，为 `HiCard`，点击 `hi-card.tsx` 文件，即可更改其内容。

![](https://www.yysuni.com/blogs/readme/20b0791d012163ee.png)

## 9. 互助群

对于完全不是**程序员**的用户，确实会对于更新代码后，如何同步，如何**合并代码**手足无措。我创建了一个 **QQ群**（加群会简单点），或者 vx 群还是 tg 群会好一点可以 issue 里面说下就行。

QQ 群：[https://qm.qq.com/q/spdpenr4k2](https://qm.qq.com/q/spdpenr4k2)

> 不好意思，之前的那个qq群ID（1021438316），不知道为啥搜不到😂

微信群：刚建好了一个微信群，没有 qq 的可以用这个微信群
![](https://www.yysuni.com/blogs/readme/343f2c62035b8e23.webp)

tg 群：1月1号，才创建的 tg 群 https://t.me/public_blog_2025

应该主要是我自己亲自帮助你们遇到问题怎么办。（后续看看有没有好心人）

希望多多的非程序员加入 blogger 行列，web blog 还是很好玩的，属于自己的 blog 世界。

游戏资产不一定属于你的，你只有**使用权**，但这个 blog **网站、内容、仓库一定是属于你的**

#### 特殊的导航 Card

因为这个 Card 是全局都在的，所以放在了 `src/components` 目录

![](https://www.yysuni.com/blogs/readme/9780c38f886322fd.png)

## 10. 更新日志 (Changelog)

### 2026-02-12 - 安全加固与功能增强

#### 🔒 安全加固

- **HTTP 安全响应头**：在 `next.config.ts` 中添加了全面的安全响应头
  - `Strict-Transport-Security`: 强制 HTTPS 连接
  - `X-Frame-Options`: 防止点击劫持攻击
  - `X-Content-Type-Options`: 防止 MIME 类型嗅探
  - `Content-Security-Policy`: 限制外部资源加载来源
  - `Referrer-Policy`: 控制 Referer 信息发送
- **XSS 防护增强**：在 Markdown 渲染器中添加 HTML 转义，防止标题注入攻击

#### ✨ 功能增强

**博客文章页优化**

- **面包屑导航**：添加了返回首页的面包屑导航组件 (`src/components/blog-breadcrumbs.tsx`)
- **社交分享按钮**：集成 Twitter 分享、链接复制、原生分享功能 (`src/components/share-buttons.tsx`)
- **上一篇/下一篇导航**：文章底部添加相邻文章快速跳转按钮
  - 新增 `getAdjacentPosts()` 函数自动获取前后文章
  - 支持按发布日期排序的智能导航

**统计与广告集成**

- **Google Analytics (GA4)**：在 `src/app/layout.tsx` 中集成 GA4 跟踪代码
  - 通过 `NEXT_PUBLIC_GA_ID` 环境变量配置
  - 仅在生产环境加载，避免开发环境污染数据
- **Google AdSense 预留广告位**：
  - 创建可复用广告容器组件 (`src/components/ad-container.tsx`)
  - 文章页战略广告位：标题下方、文章中部、底部导航前
  - 通过 `NEXT_PUBLIC_ADSENSE_ID` 环境变量配置
  - 未配置时显示占位符，不影响布局
- **配置文件**：新增 `.env.local.example` 作为环境变量模板
- **站点配置**：在 `site-content.json` 中添加广告开关和位置配置

**SEO 优化**

- **Open Graph 图片修复**：修复了文章分享时 OG 图片路径错误的问题
  - 支持完整 URL、绝对路径、相对路径三种格式
  - 自动将文章缩略图 (cover) 作为社交分享图片
  - 优化了 Twitter Card 和 Facebook 分享预览效果

#### 🐛 Bug 修复

- **Markdown 渲染错误**：
  - 修复了 `Invalid attribute name` 错误（JSX 风格属性导致解析失败）
  - 修复了 `Duplicate key` 错误（代码块 ID 与其他元素冲突）
  - 优化了代码块渲染逻辑，使用自定义 HTML 标签 `<x-code-block>` 避免解析冲突
- **开发服务器端口**：将默认端口从 2025 改回 3000，符合 Next.js 标准

#### 📁 新增文件

```
.env.local.example                          # 环境变量配置模板
src/components/blog-breadcrumbs.tsx         # 面包屑导航组件
src/components/share-buttons.tsx            # 社交分享按钮组件
src/components/ad-container.tsx             # 广告容器基础组件
src/components/ads/display-ad.tsx           # 标准展示广告组件
src/components/ads/in-article-ad.tsx        # 文章内广告组件
src/app/blog/components/edit-button.tsx     # 编辑按钮独立组件
src/lib/markdown-server-render.tsx          # 服务端 Markdown 渲染器
src/components/mark-as-read.tsx             # 文章已读标记组件
```

#### 🔧 修改文件

```
next.config.ts                              # 添加安全响应头
src/app/layout.tsx                          # 集成 GA 和 AdSense 脚本
src/app/blog/[id]/page.tsx                  # 支持 SSR/SSG，添加相邻文章导航
src/app/blog/[id]/layout.tsx                # 修复 OG 图片路径处理逻辑
src/components/blog-preview.tsx             # 添加面包屑、分享按钮、广告位
src/lib/blog-server.ts                      # 新增 getAdjacentPosts 函数
src/lib/markdown-renderer.ts                # 增强 HTML 转义安全性
src/config/site-content.json                # 添加广告配置项
package.json                                # 更新 dev 脚本端口配置
```

#### 📚 部署指南

**环境变量配置**

```bash
# 复制配置模板
cp .env.local.example .env.local

# 编辑并填入你的 ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                    # Google Analytics ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX    # AdSense Publisher ID
```

**获取 Analytics 和 AdSense ID**

1. Google Analytics: https://analytics.google.com/ → 创建 GA4 属性 → 获取 Measurement ID
2. Google AdSense: https://www.google.com/adsense/ → 注册并审核 → 获取 Publisher ID

**验证部署**

- 打开浏览器 DevTools → Network 标签
- 检查是否加载了 `gtag/js` 和 `adsbygoogle.js` 脚本
- 广告位在未配置时显示为灰色占位符

## Star History

<a href="https://www.star-history.com/#YYsuni/2025-blog-public&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=YYsuni/2025-blog-public&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=YYsuni/2025-blog-public&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=YYsuni/2025-blog-public&type=date&legend=top-left" />
 </picture>
</a>
