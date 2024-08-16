import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '白酒找我', link: 'https://www.baidu.com' },
  { text: '前端导航', link: '/nav/', activeMatch: '^/nav/' },
  { text: '待办清单', link: '/todoList/', activeMatch: '^/todoList/' },
  {
    text: '前端物语',
    items: [
      { text: 'JavaScript 基础知识', link: '/fe/javascript/types' },
      { text: 'ES6 常用知识', link: '/fe/es6/' },
      { text: 'TypeScript 基础知识', link: '/fe/typescript/base' },
      { text: '浏览器相关知识', link: '/fe/browser/' },
    ],
    activeMatch: '^/fe',
  },
  {
    text: 'Workflow',
    items: [
      {
        text: '常用工具/方法',
        items: [
          { text: '工具库整理', link: '/workflow/utils/library' },
          { text: '常用正则整理', link: '/workflow/utils/regexp' },
          { text: '常用方法整理', link: '/workflow/utils/function' },
        ],
      },
      {
        text: 'CSS 相关',
        items: [
          { text: 'CSS 语法', link: '/workflow/css/spec' },
          { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
          { text: 'Sass 常用技巧', link: '/workflow/sass/' },
        ],
      },
      {
        text: 'Vue 小技巧',
        link: '/workflow/vue/',
      },
      { text: 'npm 常用命令', link: '/workflow/node/npm' },
      {
        text: '终端相关',
        items: [
          { text: 'Zsh 配置', link: '/workflow/terminal/zsh' },
          { text: '命令行工具', link: '/workflow/terminal/toolkit' },
          { text: 'Shell 命令', link: '/workflow/terminal/shell' },
        ],
      },
      { text: 'Git 相关技巧', link: '/workflow/git/' },
      { text: 'Git 命令清单', link: '/workflow/git/command' },
      {
        text: '开源网站',
        items: [{ text: 'v3后台', link: '/workflow/openSource/V3Admin' }],
      },
    ],
    activeMatch: '^/workflow',
  },
  { text: '踩坑记录', link: '/pit/npm', activeMatch: '^/pit' },
  {
    text: '提效工具',
    items: [
      {
        text: '软件推荐与配置',
        items: [
          { text: '多平台软件', link: '/efficiency/software/cross-platform' },
          { text: 'Mac 平台', link: '/efficiency/software/mac' },
          { text: 'Windows 平台', link: '/efficiency/software/windows' },
          { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
          { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
          { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' },
        ],
      },
      { text: '在线工具', link: '/efficiency/online-tools' },
      { text: '书签脚本', link: '/efficiency/bookmark-scripts' },
    ],
    activeMatch: '^/efficiency',
  },
  {
    text: '其他成员',
    items: [
      {
        text: '张鑫',
        items: [
          { text: 'Code Inspector', link: '/other/codeInspector/index' },
          { text: '打包部署', link: '/other/deploy/index' },
          { text: 'vben框架的示例页面', link: '/other/vben/example' },
        ],
      },
      {
        text: '郭春艳',
        items: [
          { text: '组件注册', link: '/other/vue3/component-registration' },
          { text: '透传 Attributes', link: '/other/vue3/fallthrough-attributes' },
          { text: 'vben框架的使用', link: '/other/vben/vben-frame-use' },
        ],
      },
      {
        text: '井文超',
        items: [{ text: '组合式函数', link: '/other/vue3/composables' }],
      },
      {
        text: '章家龙',
        items: [{ text: 'vben框架中如何引入Modal', link: '/other/vben/import-modal' }],
      },
      {
        text: '唐佳琪',
        items: [
          { text: 'FnMap', link: '/other/tjq/fnMap' },
          { text: 'utools', link: '/other/tjq/utools' },
        ],
      },
    ],
    activeMatch: '^/other/',
  },
  { text: '关于我', link: '/me/', activeMatch: '^/me/' },
]
