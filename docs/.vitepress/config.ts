import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
/* todo */
import taskLists from 'markdown-it-task-checkbox'

import type { ThemeConfig } from './theme/types'
import { head, nav, sidebar } from './configs'

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
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata :article="{}" />`;
          return htmlResult;
      }
    },
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    music: [
      //音乐列表，音乐播放器参数在.vitepress/store/player.ts。封面和歌词不支持可自行按照文章教程修改
      // {
      //     "id": 1,
      //     "title": "陷落Falling",
      //     "author": "不知名选手Au / 马也_Crabbit",
      //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0Nzk=",
      //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/01.jpg",
      //     "lrc": ""
      // },
      {
        id: 2,
        title: '金玉良缘',
        author: '贾青',
        url: 'https://ting8.yymp3.com/new26/jinyulangyuan/2.mp3',
        pic: 'https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/02.jpg',
        lrc: '',
      },
      // {
      //     "id": 3,
      //     "title": "夜车（Cover 曾轶可）",
      //     "author": "姜铭杨",
      //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODE=",
      //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/03.jpg",
      //     "lrc": ""
      // },
      // {
      //   id: 4,
      //   title: '迎春花 / 財神到 / 祝福你 (廣東)',
      //   author: '邓丽君 / 林子祥 / 甄妮',
      //   url: 'https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTI=',
      //   pic: '',
      //   lrc: '',
      // },
    ],

    website: {
      showSnow: true, // 是否开启雪花。开启后仅在暗黑模式下显示
      cardMusic: true, // 是否显示播放音乐，音乐列表在上面 music中配置
      showFirework: true, // 是否显示侧栏烟花特效
      fireworkTitle: '🧨烟花许愿🧨｜②⓪②④新年', //烟花许愿标题
      fireworkWords: [
        '恭贺新禧',
        '万事如意',
        '新年快乐',
        '恭喜发财',
        '岁岁平安',
        '吉祥如意',
        '心想事成',
        '万事顺遂',
        '一帆风顺',
        '二龙腾飞',
        '三羊开泰',
        '四季平安',
        '五福临门',
        '六六大顺',
        '七星高照',
        '八方来财',
        '九九同心',
        '十全十美',
        '荣华富贵',
        '金玉满堂',
        '龙凤呈祥',
        '喜气洋洋',
        '鸿运当头',
        '财源广进',
        '笑口常开',
        '幸福安康',
        '日进斗金',
        '生意兴隆',
        '步步高升',
        '年年有余',
        '迎春接福',
        '喜气盈门',
        '花团锦簇',
        '前程似锦',
        '福满人间',
        '春回大地',
        '辞旧迎新',
        '万象更新',
        '吉祥如意',
        '万事大吉',
        '马到成功',
        '功成名就',
        '鱼跃龙门',
        '一飞冲天',
        '瑞气盈门',
        '福寿康宁',
        '时来运转',
        '鸿运高照',
        '三阳开泰',
        '否极泰来',
        '鸿运亨通',
        '一帆风顺',
        '出入平安',
        '顺风顺水',
        '龙凤呈祥',
        '花好月圆',
        '张灯结彩',
        '欢天喜地',
        '合家欢乐',
        '幸福美满',
        '和气致祥',
        '招财进宝',
        '开门大吉',
        '迎春接福',
        '福泽满门',
        '花开富贵',
        '竹报平安',
        '大吉大利',
        '恭喜发财',
      ], //烟花许愿关键词
    },

    /* 广告 */
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement',
    // },

    //本地搜索
    // search: {
    //   provider: 'local',
    //   options: {
    //     translations: {
    //       button: {
    //         buttonText: '搜索文档',
    //         buttonAriaLabel: '搜索文档',
    //       },
    //       modal: {
    //         noResultsText: '无法找到相关结果',
    //         resetButtonTitle: '清除查询条件',
    //         displayDetails: '显示明细列表',
    //         footer: {
    //           selectText: '选择',
    //           navigateText: '切换',
    //           closeText: '关闭',
    //         },
    //       },
    //     },
    //   },
    // },

    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/autumns-heartless/blog' },
    ],

    footer: {
      message: '本站搭建特别鸣谢【茂神大佬】',
      copyright: 'Copyright © 2024-present autumns-heartless',
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

    comment: {
      repo: 'autumns-heartless/blog',
      repoId: 'R_kgDOMPIiKQ',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMPIiKc4Cgcet',
    },
  },

  vite: {
    esbuild: {
      pure: ["console.log"], // 删除 console.log
      drop: ["debugger"], // 删除 debugger
    },
    plugins: [
      MarkdownPreview(),
      codeInspectorPlugin({ bundler: 'vite' }),
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
})
