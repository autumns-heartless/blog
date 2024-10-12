import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript 基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types' },
        { text: '引用类型的拷贝', link: '/fe/javascript/clone' },
        { text: '类型转换', link: '/fe/javascript/conversions' },
        { text: '原型和原型链', link: '/fe/javascript/prototype' },
        { text: '继承', link: '/fe/javascript/inherit' },
      ],
    },
    {
      text: 'ES6 常用知识点',
      link: '/fe/es6/',
    },
    {
      text: 'TypeScript',
      link: '/fe/typescript/base',
    },
    {
      text: 'HTML / CSS',
      collapsed: false,
      items: [
        { text: 'HTML 理论知识点', link: '/fe/html/' },
        { text: 'CSS 理论知识点', link: '/fe/css/' },
      ],
    },
    {
      text: '浏览器与网络',
      collapsed: false,
      items: [
        { text: '浏览器相关知识点', link: '/fe/browser/' },
        { text: 'TCP', link: '/fe/network/tcp' },
        { text: 'HTTP', link: '/fe/network/http' },
      ],
    },
    {
      text: '概念知识点',
      collapsed: false,
      items: [
        { text: '模块化', link: '/fe/concept/module' },
        { text: '前端页面渲染方式', link: '/fe/concept/page-rendering' },
      ],
    },
    {
      text: '编程题',
      link: '/fe/coding/',
    },
  ],
  '/workflow/': [
    {
      text: '常用工具/方法',
      collapsed: false,
      items: [
        { text: '工具库整理', link: '/workflow/utils/library' },
        { text: '常用正则整理', link: '/workflow/utils/regexp' },
        { text: '常用方法整理', link: '/workflow/utils/function' },
      ],
    },
    {
      text: 'CSS 相关',
      collapsed: false,
      items: [
        { text: 'CSS 语法', link: '/workflow/css/spec' },
        { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
        { text: 'Sass 常用技巧', link: '/workflow/sass/' },
      ],
    },
    {
      text: 'Vue 相关',
      link: '/workflow/vue/',
    },
    {
      text: 'Node 相关',
      // collapsed: false,
      items: [{ text: 'npm 常用命令', link: '/workflow/node/npm' }],
    },
    {
      text: '终端相关',
      collapsed: false,
      items: [
        { text: 'Zsh 配置', link: '/workflow/terminal/zsh' },
        { text: '命令行工具', link: '/workflow/terminal/toolkit' },
        { text: 'Shell 命令', link: '/workflow/terminal/shell' },
      ],
    },
    {
      text: 'Git 相关',
      collapsed: false,
      items: [
        { text: 'Git 相关技巧', link: '/workflow/git/' },
        { text: 'Git 命令清单', link: '/workflow/git/command' },
      ],
    },
    {
      text: '开源网站',
      items: [{ text: 'v3后台', link: '/workflow/openSource/V3Admin' }],
    },
  ],
  '/efficiency/': [
    {
      text: '软件推荐与配置',
      // collapsed: false,
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
  '/pit/': [
    {
      text: '踩坑记录',
      // collapsed: false,
      items: [
        { text: 'npm 踩坑记录', link: '/pit/npm' },
        { text: 'PC 踩坑记录', link: '/pit/pc' },
        { text: 'H5 踩坑记录', link: '/pit/h5' },
      ],
    },
  ],
  '/other/codeInspector/': [
    {
      text: 'Code Inspector',
      collapsed: false,
      items: [
        { text: '介绍', link: '/other/codeInspector/introduced' },
        { text: '使用', link: '/other/codeInspector/use' },
        { text: '指定 IDE', link: '/other/codeInspector/ide' },
        { text: 'API', link: '/other/codeInspector/api' },
      ],
    },
  ],
  '/other/deploy/': [
    {
      text: '打包部署',
      collapsed: false,
      items: [
        { text: 'VSCode插件之SFTP', link: '/other/deploy/vscode-sftp' },
        { text: 'ssh2-sftp-client', link: '/other/deploy/ssh2-sftp-client' },
      ],
    },
  ],
  '/other/tjq/': [
    {
      text: '效率神器',
      collapsed: false,
      items: [
        { text: '函数地图', link: '/other/tjq/fnMap' },
        { text: 'utools', link: '/other/tjq/utools' },
      ],
    },
  ],
  '/other/vue3/': [
    {
      text: 'Vue3',
      collapsed: false,
      items: [
        { text: '写给懒人的Vue3速查宝典', link: '/other/vue3/quickSearchTreasureBook-index' },
        { text: 'vue3 Api 盘点', link: '/other/vue3/api-index' },
        { text: 'vue3教程 - 1', link: '/other/vue3/tutorial-1-index' },
        { text: 'vue3教程 - 2', link: '/other/vue3/tutorial-2-index' },
        { text: '组件注册', link: '/other/vue3/component-registration' },
        { text: '透传 Attributes', link: '/other/vue3/fallthrough-attributes' },
        { text: '组合式函数', link: '/other/vue3/composables' },
      ],
    },
  ],
  '/other/vben/': [
    {
      text: 'vben',
      collapsed: false,
      items: [
        { text: 'vben框架的使用', link: '/other/vben/vben-frame-use' },
        { text: 'vben框架的使用-示例页面', link: '/other/vben/example-index' },
        { text: 'vben框架的使用', link: '/other/vben/import-modal' },
        { text: 'vben框架多表单的展示', link: '/other/vben/vben-forms' },
      ],
    },
  ],
  '/other/zjl/': [
    {
      text: 'vben框架的使用',
      collapsed: false,
      items: [{ text: 'vben框架中如何引入Modal', link: '/other/vben/import-modal' }],
    },
  ],
  '/other/jwc/': [
    {
      text: '文超笔录',
      collapsed: false,
      items: [{ text: 'app问题记录', link: '/other/jwc/app' }],
    },
  ],
  '/other/vue2/componentPackage': [
    {
      text: '📦 组件分封装',
      collapsed: false,
      items: [
        { text: '（零）之 前言', link: '/other/vue2/componentPackage/componentPackage0' },
        { text: '（一）之 \$attrs、\$listeners', link: '/other/vue2/componentPackage/componentPackage1' },
        { text: '（二）之 slot', link: '/other/vue2/componentPackage/componentPackage2' },
        { text: '（三）之 组件传值方式', link: '/other/vue2/componentPackage/componentPackage3' },
        { text: '（四）之 自定义组件的 v-model', link: '/other/vue2/componentPackage/componentPackage4' },
      ],
    },
  ],
}
