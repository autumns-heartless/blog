# vitepress-nav-template

<p align="center">
  <img src="./docs/public/index.webp" alt="home" />
</p>
<p align="center"> 基于 <b>VitePress</b> 的个人博客 </p>
<p align='center'><a href="/guide.md">基础教程</a> | <a href="https://autumns-heartless.github.io/blog/">作者博客</a></p>

---

## 预览地址

- <https://qtmyx.netlify.app/>
- <https://autumns-heartless.github.io/blog/>

## 功能

- 新增 `layout-class` 方便更好的自定义样式
- 默认中文
- 自带前端导航模块
- 支持访客统计
- 支持 [giscus 评论](https://giscus.app/zh-CN)
- 支持日夜颜色模式自适应切换
- 支持 Github Pages 直接部署上线
  - 1. 开启 github actions
  - 2. 配置 Pages 为 `gh-pages` 分支
  - 3. 访问地址为 `https://<username>.github.io/<repository>/`
- 支持 [tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- 支持查看 vue 示例组件源码（使用 [vite-plugin-markdown-preview](https://github.com/jaskang/vite-plugin-markdown-preview)）

### 开启访客统计

需在 `docs/.vitepress/config.ts` 中配置 `themeConfig.visitor`

```ts
export default defineConfig({
  themeConfig: {
    /* 访客统计 */
    visitor: {
      /** 统计 id（单独页面的统计会作为前缀使用）*/
      badgeId: 'autumns-heartless.blog',
    },
  },
})
```

### 开启 giscus 评论

需在 `docs/.vitepress/config.ts` 中配置 `themeConfig.comment`

```ts
export default defineConfig({
  themeConfig: {
    /**
     * giscus 评论配置
     *  请根据 https://giscus.app/zh-CN 生成内容填写
     */
    comment: {
      /** github 仓库地址 */
      repo: '',
      /** giscus 仓库 ID */
      repoId: '',
      /** Discussion 分类 */
      category: '',
      /** giscus 分类 ID */
      categoryId: '',
    },
  },
})
```

#### 在指定页面关闭评论

需在指定页面的 `markdown` 文件中添加如下 `frontmatter` 配置

```md
---
comment: false
---

# 功能测试页
```

docs: 更新 README

## 说明

前端导航模块借鉴 [茂茂 | maomao](https://github.com/maomao1996) 开发，如有引用、借鉴的请保留版权声明：<https://github.com/maomao1996/vitepress-nav-template>
