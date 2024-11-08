import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import type { ThemeConfig } from './theme/types'
import { head, nav, sidebar } from './configs'

/* RSS */
import { genFeed, RSSSVG } from './genFeed.js'
/* todo */
import taskLists from 'markdown-it-task-checkbox'
/* Markdown 文件预览 */
import MarkdownPreview from 'vite-plugin-markdown-preview'
/* 插件 codeInspector */
// import { codeInspectorPlugin } from 'code-inspector-plugin'
/* 插件 pagefind 搜索 */
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
/* 大图预览 */
import mdItCustomAttrs from 'markdown-it-custom-attrs'

/* 引入 themeConfig 之 music */
import { music } from './configs/music'
/* 引入 themeConfig 之 website */
import { website } from './configs/website'
/* 引入 themeConfig 之 search */
import { search } from './configs/search'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig<ThemeConfig>({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: '秋天没有心',
  description: '成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
  head,

  lastUpdated: true,
  cleanUrls: true,

  // 启用深色模式
  appearance: 'dark',

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(taskLists, {
        disabled: true,
        divWrap: false,
        divClass: 'checkbox',
        idPrefix: 'cbx_',
        ulClass: 'task-list',
        liClass: 'task-list-item',
      })
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery',
      })
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata :article="{}" />`
        return htmlResult
      }
    },
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,
    music,
    website,
    // search,
    logo: '/logo.png',
    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    /* 社交链接 */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/autumns-heartless/blog' },
      { icon: { svg: RSSSVG }, link: 'https://qtmyx.netlify.app/feed.rss' },
    ],

    /* 脚部 */
    footer: {
      message: '本站搭建特别鸣谢【茂神大佬】',
      copyright: 'Copyright © 2024-present qtmyx',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'autumns-heartless/blog',
    },

    /* 评论 */
    comment: {
      repo: 'autumns-heartless/blog',
      repoId: 'R_kgDOMPIiKQ',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMPIiKc4Cgcet',
    },
  },

  vite: {
    esbuild: {
      pure: ['console.log'], // 删除 console.log
      drop: ['debugger'], // 删除 debugger
    },
    plugins: [
      MarkdownPreview(),
      // codeInspectorPlugin({ bundler: 'vite' }),
      pagefindPlugin({
        //使用 pagefind搜索插件 https://www.npmjs.com/package/vitepress-plugin-pagefind
        customSearchQuery: chineseSearchOptimize,
        resultOptimization: false,
        btnPlaceholder: '搜索文档',
        placeholder: '搜索文档',
        emptyText: '没有内容',
        heading: '共 {{searchResult}} 条结果',
      }),
    ],
  },

  buildEnd: genFeed,
})
