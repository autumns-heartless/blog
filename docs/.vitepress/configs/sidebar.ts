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
        { text: 'Vue3 性能优化的 10 个硬核技巧', link: '/other/vue3/po' },
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
        { text: 'vben框架富文本的改造', link: '/other/vben/rich-text' },
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
        {
          text: '（一）之 $attrs、$listeners',
          link: '/other/vue2/componentPackage/componentPackage1',
        },
        { text: '（二）之 slot', link: '/other/vue2/componentPackage/componentPackage2' },
        { text: '（三）之 组件传值方式', link: '/other/vue2/componentPackage/componentPackage3' },
        {
          text: '（四）之 自定义组件的 v-model',
          link: '/other/vue2/componentPackage/componentPackage4',
        },
      ],
    },
  ],
  '/other/deepseek/': [
    {
      text: 'DeepSeek',
      collapsed: false,
      items: [
        { text: 'DeepSeek R1 本地部署', link: '/other/deepseek/index' },
      ],
    },
  ],
  'relationgraph': [
    {
      text: '概览',
      link: '/relationgraph/overview',
    },
    {
      text: '节点',
      collapsed: false,
      items: [
        {
          text: '节点-内容及样式5',
          link: '/relationgraph/node/models-relationship',
        },
      ],
    },
    {
      text: '线条',
      collapsed: false,
      items: [
        {
          text: '图谱颜色 & 主题',
          link: '/relationgraph/line/line-checked-style',
        },
        {
          text: '跟随线条的元素(H5 DIV)',
          link: '/relationgraph/line/div-on-line',
        },
        {
          text: '自定义连线文字位置',
          link: '/relationgraph/line/line-text-position',
        },
        {
          text: '线条高级用法-曲线上的文字',
          link: '/relationgraph/line/lineAdv2',
        },
        {
          text: '自定义全新的线条形状',
          link: '/relationgraph/line/customer-line1',
        },
        {
          text: '线条高级用法-插槽',
          link: '/relationgraph/line/adv-line-slot2',
        },
        {
          text: '线条高级用法-插槽-圆角折线',
          link: '/relationgraph/line/adv-line-slot3',
        },
      ],
    },
    {
      text: '布局',
      collapsed: false,
      items: [
        {
          text: 'tree-变化多端的树',
          link: '/relationgraph/layout/ever-changing-tree',
        },
        {
          text: 'force-节点重量与连线牵引力',
          link: '/relationgraph/layout/layout-force-options-pro',
        },
        {
          text: 'force-自定义力学布局',
          link: '/relationgraph/layout/customer-layout-force',
        },
        {
          text: 'folder-组织机构树',
          link: '/relationgraph/layout/layout-folder2',
        },
        {
          text: '使用Dagre布局算法(位置、线条)',
          link: '/relationgraph/layout/use-dagre-layout',
        },
        {
          text: '使用Dagre布局算法(仅位置)',
          link: '/relationgraph/layout/use-dagre-layout-2',
        },
        {
          text: '使用Sigma.js布局算法',
          link: '/relationgraph/layout/use-sigma-layout',
        },
      ],
    },
    {
      text: '使用场景',
      collapsed: false,
      items: [
        {
          text: '产业链图谱',
          link: '/relationgraph/usageScenarios/industry-chain',
        },
        {
          text: '投资关系探查',
          link: '/relationgraph/usageScenarios/investment-penetration',
        },
        {
          text: '展示全部按钮',
          link: '/relationgraph/usageScenarios/show-more-nodes-by-page',
        },
        {
          text: '展示更多(分页)',
          link: '/relationgraph/usageScenarios/show-more-nodes-front',
        },
        {
          text: '模型调用关系图',
          link: '/relationgraph/usageScenarios/models-relationship',
        },
        {
          text: '班级兴趣小组示意图',
          link: '/relationgraph/usageScenarios/interest-group',
        },
        {
          text: '组织架构图谱',
          link: '/relationgraph/usageScenarios/scene-org',
        },
        {
          text: '人物关系 & 操作',
          link: '/relationgraph/usageScenarios/scene-relationship-op',
        },
        {
          text: '最短路径搜索',
          link: '/relationgraph/usageScenarios/find-min-path',
        },
        {
          text: '小玩意-时钟',
          link: '/relationgraph/usageScenarios/clock-and-tank',
        },
        {
          text: '小玩意-海葵',
          link: '/relationgraph/usageScenarios/force-sea-anemone',
        },
      ],
    },
    {
      text: '图形编辑套件',
      collapsed: false,
      items: [
        {
          text: '拖拽创建预设样式的节点',
          link: '/relationgraph/graphics/drag-to-create-nodes-with-preset-styles',
        },
        {
          text: '节点批量操作',
          link: '/relationgraph/graphics/batch-operations-on-nodes',
        },
        {
          text: '自定义节点快速操作栏',
          link: '/relationgraph/graphics/custom-node-quick-actions',
        },
        {
          text: '快速创建线条',
          link: '/relationgraph/graphics/gee-line-edit',
        },
        {
          text: '界面化选择线条连接点',
          link: '/relationgraph/graphics/gee-line-edit-2',
        },
        {
          text: '拖动更改连线起点/终点',
          link: '/relationgraph/graphics/change-line-points',
        },
        {
          text: '更改连线文字/文字位置',
          link: '/relationgraph/graphics/change-line-text',
        },
        {
          text: '自定义线条操作栏',
          link: '/relationgraph/graphics/customize-line-toolbar',
        },
        {
          text: '节点对齐参考线',
          link: '/relationgraph/graphics/gee-node-alignment-guides',
        },
        {
          text: '缩略示意图（鹰眼）',
          link: '/relationgraph/graphics/gee-thumbnail-diagram',
        },
        {
          text: '节点碰撞检测与位移限制',
          link: '/relationgraph/graphics/node-dragging',
        },
      ],
    },
    {
      text: 'HTML元素连线',
      collapsed: false,
      items: [
        {
          text: '世界地图',
          link: '/relationgraph/htmlEleLine/map-world',
        },
        {
          text: '中国地图',
          link: '/relationgraph/htmlEleLine/map-china',
        },
        {
          text: '模型调用关系图',
          link: '/relationgraph/htmlEleLine/models-relationship',
        },
        {
          text: '班级兴趣小组示意图',
          link: '/relationgraph/htmlEleLine/interest-group',
        },
        {
          text: 'HTML元素 & 节点内容',
          link: '/relationgraph/htmlEleLine/node-and-element-lines',
        },
      ],
    },
    {
      text: '数据操作',
      collapsed: false,
      items: [
        {
          text: '动态追加数据',
          link: '/relationgraph/dataOperation/adv-dynamic-data',
        },
        {
          text: '动态追加数据2',
          link: '/relationgraph/dataOperation/expand-forever',
        },
        {
          text: '一种修改数据的新思路',
          link: '/relationgraph/dataOperation/relayout-after-add-nodes',
        },
        {
          text: '动态加载数据与重新布局',
          link: '/relationgraph/dataOperation/expand-button',
        },
        {
          text: '界面拖拽添加节点、关系',
          link: '/relationgraph/dataOperation/object-edit',
        },
        {
          text: '右键菜单创建节点、关系',
          link: '/relationgraph/dataOperation/create-object-from-menu',
        },
      ],
    },
    {
      text: '内置UI组件和插槽',
      collapsed: false,
      items: [
        {
          text: '自定义工具栏按钮',
          link: '/relationgraph/slot/toolbar-buttons',
        },
        {
          text: '自定义工具栏图标、英文Tooltips',
          link: '/relationgraph/slot/toolbar-tooltips',
        },
        {
          text: '展开/收缩 按钮自定义',
          link: '/relationgraph/slot/expand-holder-slot',
        },
        {
          text: '完全自定义工具栏',
          link: '/relationgraph/slot/custom-toolbar',
        },
      ],
    },
    {
      text: '事件 & 交互 & 控制',
      collapsed: false,
      items: [
        {
          text: '效果、控制',
          link: '/relationgraph/things/adv-effect',
        },
        {
          text: '人物关系 & 筛选',
          link: '/relationgraph/things/scene-relationship',
        },
        {
          text: '搜索节点 & 定位节点',
          link: '/relationgraph/things/search-and-focus',
        },
        {
          text: '【节点/连线】悬浮框+右键菜单+全屏响应式',
          link: '/relationgraph/things/visible-stuff-in-fullscreen',
        },
        {
          text: '人物关系 & 操作',
          link: '/relationgraph/things/scene-relationship-op',
        },
        {
          text: '节点/连线点击效果2',
          link: '/relationgraph/things/adv-effect2',
        },
        {
          text: '与节点相关的连线',
          link: '/relationgraph/things/line-hightlight',
        },
        {
          text: '展开/关闭所有',
          link: '/relationgraph/things/open-all-close-all',
        },
        {
          text: '展开到指定层级',
          link: '/relationgraph/things/open-by-level',
        },
        {
          text: '聚焦到节点',
          link: '/relationgraph/things/focus-node-by-id',
        },
        {
          text: '布局切换',
          link: '/relationgraph/things/before-change-layout',
        },
        {
          text: '框选多个节点',
          link: '/relationgraph/things/selections',
        },
        {
          text: '禁用拖动、缩放画布；禁用拖动、选中节点',
          link: '/relationgraph/things/disable-effect',
        },
      ],
    },
    {
      text: '样式 & 动画 & 效果',
      collapsed: false,
      items: [
        {
          text: '图谱颜色 & 主题',
          link: '/relationgraph/style/line-checked-style',
        },
        {
          text: '中心布局角度偏移',
          link: '/relationgraph/style/graph-angle-offset',
        },
      ],
    },
    {
      text: '截图 & 水印',
      collapsed: false,
      items: [
        {
          text: '支持生成图片的背景水印',
          link: '/relationgraph/screenshot/watermark-for-download-image',
        },
        {
          text: '支持生成图片的背景水印2',
          link: '/relationgraph/screenshot/watermark-for-download-image-2',
        },
        {
          text: '前景水印',
          link: '/relationgraph/screenshot/foreground-watermark',
        },
        {
          text: '获取图谱图片的Base64数据',
          link: '/relationgraph/screenshot/graph-image-base64',
        },
      ],
    },
  ],
  'elpis': [
    {
      text: 'Elpis',
      collapsed: false,
      items: [
        {
          text: '1. 简介',
          link: '/elpis/index'
        },
        {
          text: '2. elpis-core',
          link: '/elpis/elpis-core/index'
        },
        {
          text: '3. front-build',
          link: '/elpis/front-build/index'
        },
      ]
    }
  ],
}
