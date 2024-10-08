import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  /* 关注博客 */
  {
    title: '关注博客',
    items: [
      {
        icon: 'https://maomao1996.github.io/mm-notes/favicon.ico',
        title: '茂神的博客',
        desc: '知识是进步的阶梯，争取每天都有知识点更新',
        link: 'https://maomao1996.github.io/mm-notes/',
      },
      {
        icon: 'https://blog.goalonez.site/logo.ico',
        title: 'Goalonez 的博客',
        desc: '万变不离其宗',
        link: 'https://blog.goalonez.site'
      },
      {
        icon: 'https://blog.code520.com.cn/medias/logo.png',
        title: 'jokereven的博客',
        desc: '酷炫的博客',
        link: 'https://blog.code520.com.cn/',
      },
      {
        icon: 'https://docs.ffffee.com/logo.png',
        title: '李钟意讲前端',
        desc: '关于前端技术的各种干货',
        link: 'https://docs.ffffee.com/',
      },
      {
        icon: 'https://aiyo.space/my1.png',
        title: '叁聖涅的博客',
        desc: 'vitepress教程',
        link: 'https://aiyo.space/',
      },
      {
        icon: 'https://images.bddxg.top/blog/logo.webp',
        title: '冰冻大西瓜的博客',
        desc: '前端的一些技术知识点',
        link: 'https://bddxg.top/',
      },
      {
        icon: 'https://vitepress.yiov.top/logo.png',
        title: 'vitepress快速上手',
        desc: 'vitepress快速上手中文教程 ',
        link: 'https://vitepress.yiov.top/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/mqyqingfeng.jpeg',
        title: '冴羽的博客',
        desc: '四个系列：JavaScript深入系列、JavaScript专题系列、ES6系列、React系列',
        link: 'https://github.com/mqyqingfeng/Blog',
      },
      {
        icon: 'https://theme.sugarat.top/logo.png',
        title: '粥里有勺糖的博客',
        desc: '你的指尖,拥有改变世界的力量',
        link: 'https://sugarat.top/',
      },
      {
        icon: 'https://oml2d.com/favicon.ico',
        title: 'OhMyLive2D',
        desc: '高可自定义且开箱即用的 Live2D For Web 组件, 快速为您的个人网站加入Live2D看板娘',
        link: 'https://oml2d.com/',
      },
      {
        icon: 'https://mondaylab.github.io/mondaylab-blog/common/avatar.png',
        title: '周一同学的博客',
        desc: '大厂程序媛',
        link: 'https://mondaylab.github.io/mondaylab-blog/',
        badge: '干货',
      },
      {
        icon: 'https://www.stucoding.com/wp-content/uploads/2024/09/千城资源网logonew.png',
        title: '千城资源网',
        desc: '全网高质量资源整合首发站',
        link: 'https://www.stucoding.com/',
        badge: '全能',
      },
      {
        icon: 'https://liubing.me/logo.svg',
        title: 'Bing🐣 个人博客',
        desc: '一个基于 VuePress 的个人博客，主要记录日常开发问题和一些代码笔记',
        link: 'https://liubing.me/',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726724566892%E5%89%8D%E7%AB%AF%E8%80%81%E9%81%93.ico',
        title: '前端老道的CSDN博客',
        desc: '一个写代码有点嘚儿的程序猿~，希望和大家一起学习，一起进步',
        link: 'https://blog.csdn.net/weixin_44991965?type=blog',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726724800557chengpeiquan.jpg',
        title: '程沛权的博客',
        desc: '养了3支🐱会做饭的广东人',
        link: 'https://chengpeiquan.com/category/tech',
      },
      {
        icon: 'https://www.haiweilian.com/logo.png',
        title: 'HaiWeiLian的博客',
        desc: '记录了好多项目和笔记📒',
        link: 'https://www.haiweilian.com/',
      },
      {
        icon: 'https://www.91temaichang.com/img/logo.png',
        title: 'online阳光的博客',
        desc: '专注于大前端行业领域',
        link: 'https://www.91temaichang.com/',
      },
      {
        icon: 'https://maomao.ink/usr/headico.png',
        title: '毛大姑娘的博客',
        desc: '90后程序媛，写代码，也写软文',
        link: 'https://maomao.ink/',
      },
      {
        icon: 'https://loyer.wang/docs/favicon.ico',
        title: '巨人之踵的博客',
        desc: '记录了日常总结、面试总结等各种实用干货',
        link: 'https://loyer.wang/docs/',
      },
      {
        icon: 'https://example.zbwer.work/logo.svg',
        title: '格温小姐的博客',
        desc: '轻松构建你的个人博客',
        link: 'https://example.zbwer.work/',
      },
      {
        icon: 'https://www.appbeebee.com/favicon.ico',
        title: 'APP比比',
        desc: '能够播放音乐、创意十足的个人博客',
        link: 'https://www.appbeebee.com/',
      },
      {
        icon: 'https://theme.sugarat.top/logo.png',
        title: '@sugarat/theme',
        desc: '粥里有勺糖的博客主题',
        link: 'https://theme.sugarat.top/',
      },
      {
        icon: 'https://taozuidesongshu.github.io/LonelyCityHallucination/logo.jpg',
        title: '陶醉的松鼠的博客',
        desc: '记录了很多前端常用知识点以及浏览器的相关内容',
        link: 'https://taozuidesongshu.github.io/LonelyCityHallucination/',
      },
      {
        icon: 'https://www.liuzepeng.com/favicon.ico',
        title: '刘泽鹏的博客',
        desc: '采用Vue3 + element-plus、next.js做的个人博客',
        link: 'https://www.liuzepeng.com/home',
        badge: '推荐',
      },
      {
        icon: 'https://blog.imsyy.top/favicon.ico',
        title: '無名小栈',
        desc: '个性化十足、配置高大上的博客网站',
        link: 'https://blog.imsyy.top/',
      },
      {
        icon: 'https://www.yuzaicn.com/logo.png',
        title: 'Yuzai Blog',
        desc: '记录了博客的搭建流程、提升办公效率的一些内容及开发干货知识',
        link: 'https://www.yuzaicn.com/',
      },
      {
        icon: 'https://oss.justin3go.com/justin3goAvatar.ico',
        title: 'Justin3go Blog-🖊',
        desc: '喜欢折腾一些效率工具，尝试各种工具软件和工具网站，热爱开源、分享、探索、用代码创造价值',
        link: 'https://justin3go.com/',
        badge: '开场炸裂',
      },
    ],
  },
  /* 开发工具 */
  {
    title: '开发工具',
    items: [
      {
        icon: 'https://tinypng.com/images/apple-touch-icon.png',
        title: 'TinyPNG',
        desc: '在线图片压缩工具',
        link: 'https://tinypng.com',
      },
      {
        icon: 'https://devtool.tech/logo.svg',
        title: '开发者武器库',
        desc: '开发者武器库，做开发者最专业最好用的专业工具箱',
        link: 'https://devtool.tech',
      },
      {
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        desc: '开发人员的工具箱',
        link: 'https://tool.lu',
      },
      {
        icon: 'https://indiehackertools.net/favicon.ico',
        title: '独立开发者出海工具箱',
        desc: '需求挖掘、设计、开发、营销、商业分析一网打尽😎',
        link: 'https://indiehackertools.net/',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725202558json-cn.ico',
        title: 'Json 中文网',
        desc: 'JSON 在线解析及格式化验证',
        link: 'https://www.json.cn',
      },
      {
        icon: 'https://transform.tools/static/favicon.png',
        title: 'transform',
        desc: '一个支持多语言的在线转换器',
        link: 'https://transform.tools/',
      },
      {
        icon: 'https://shields.io/img/favicon.ico',
        title: 'Shields.io',
        desc: '制作简洁、一致、易读的徽章',
        link: 'https://shields.io/',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725231558quickReference.svg',
        title: 'Quick Reference',
        desc: '为开发人员分享快速参考备忘清单【速查表】',
        link: 'https://wangchujiang.com/reference/',
      },
    ],
  },
  /* 其他工具 */
  {
    title: '其他工具',
    items: [
      {
        icon: 'https://www.h-ui.net/favicon.ico',
        title: 'IT网址导航',
        desc: '收集最有价值的网站(排名不分先后，部分国外站需要翻墙查看)',
        link: 'https://www.h-ui.net/site.shtml',
      },
      {
        icon: 'https://www.tudingyy.com/wp-content/uploads/2023/02/tudinglogo80.png',
        title: '图钉办公',
        desc: '天选打工人必备网站',
        link: 'https://www.tudingyy.com/',
      },
      {
        icon: '/logo.png',
        title: '办公人导航',
        desc: '办公人导航-实用的办公生活导航网站！',
        link: 'https://www.bgrdh.com/',
      },
      {
        icon: '/logo.png',
        title: '免抠PNG图片',
        desc: '空白透明背景免抠PNG图片素材免费下载网站',
        link: 'https://www.pngdirs.com/',
      },
      {
        icon: 'https://www.nuantang.net/favicon.ico',
        title: '暖糖电脑桌面壁纸',
        desc: '高清全屏 - 暖糖壁纸',
        link: 'https://www.nuantang.net/',
      },
      {
        icon: 'https://tool.browser.qq.com/favicon.ico',
        title: '帮小忙',
        desc: '腾讯QQ浏览器在线工具箱平台',
        link: 'https://tool.browser.qq.com/',
      },
      {
        icon: 'https://www.soogif.com/favicon.ico',
        title: 'SOOGIF-gif制作',
        desc: 'gif图片合成,gif在线制作工具,gif动图网-搜搜Gif',
        link: 'https://www.soogif.com/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/lanrenexcel.png',
        title: '懒人 Excel',
        desc: 'Excel 函数公式、操作技巧、数据分析、图表模板、VBA、数据透视表教程',
        link: 'https://www.lanrenexcel.com/excel-shortcuts/',
      },
    ],
  },
  /* AI 导航 */
  {
    title: 'AI 导航',
    items: [
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725273557chatgpt.png',
        title: 'ChatGPT',
        link: 'https://chat.openai.com/chat',
        badge: '对话',
      },
      {
        icon: 'https://www.notion.so/images/logo-ios.png',
        title: 'Notion AI',
        link: 'https://www.notion.so',
        badge: '笔记',
      },
      {
        icon: 'https://www.midjourney.com/apple-touch-icon.png',
        title: 'Midjourney',
        link: 'https://www.midjourney.com',
        badge: '绘画',
      },
      {
        icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
        title: 'Beautiful.ai',
        link: 'https://www.beautiful.ai',
        badge: 'PPT',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/kimi.ico',
        title: 'Kimi.ai',
        link: 'https://kimi.moonshot.cn/',
        badge: '超长文本对话',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/chatglm.png',
        title: '智谱清言',
        link: 'https://chatglm.cn/',
        badge: '超长文本对话',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/yiyan.png',
        title: '文心一言',
        link: 'https://yiyan.baidu.com/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/doubao.png',
        title: '豆包',
        link: 'https://www.doubao.com/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/tongyi.png',
        title: '通义千问',
        link: 'https://tongyi.aliyun.com/qianwen/',
      },
      {
        icon: 'http://chat.taosha.club/favicon.svg',
        title: '淘沙智聊',
        link: 'http://chat.taosha.club/#/chat/1719198456283',
      },
      {
        icon: 'https://chat18.aichatos8.com/favicon.svg',
        title: 'AIchatOS',
        link: 'https://chat18.aichatos8.com/#/chat/1719576837667',
      },
      {
        icon: 'https://hetao-1306534873.cos.ap-shanghai.myqcloud.com/uploads/images/20240103/2024010323342739c2b0683.png',
        title: '小核桃AI Plus',
        link: 'https://smartwritegpt.com/',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725303558%E5%A4%A9%E5%B7%A5AI.webp',
        title: '天工AI',
        link: 'https://www.tiangong.cn/chat/universal/016',
      },
      {
        icon: 'https://yuewen.cn/svg/favicon.svg',
        title: '跃问',
        link: 'https://yuewen.cn/chats',
      },
    ],
  },
  /* 茂神的站点导航 */
  {
    title: '茂神的站点导航',
    items: [
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/femm.png',
        title: '前端日常笔记',
        desc: '日常笔记记录（零零散散啥都记系列）',
        link: 'https://github.com/maomao1996/daily-notes',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/femm.png',
        title: '前端思维导图',
        desc: '用思维导图的方式总结个人所学知识',
        link: 'https://mindmap.fe-mm.com',
      },
      {
        icon: 'https://qwerty.fe-mm.com/apple-touch-icon.png',
        title: 'Qwerty Learner',
        desc: '为键盘工作者设计的单词记忆与英语肌肉记忆锻炼软件',
        link: 'https://qwerty.fe-mm.com',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/femm.png',
        title: 'mmPlayer',
        desc: 'mmPlayer 在线音乐播放器',
        link: 'https://netease-music.fe-mm.com',
      },
    ],
  },
  /* CSS 相关 */
  {
    title: 'CSS 相关',
    items: [
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/postcss.svg',
        title: 'PostCSS',
        desc: '一个用 JavaScript 转换 CSS 的工具',
        link: 'https://postcss.org',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/sass.svg',
        title: 'Sass',
        desc: '一个成熟，稳定，功能强大的专业级 CSS 扩展语言',
        link: 'https://sass-lang.com',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/tailwindcss.png',
        title: 'TailwindCSS 中文网',
        desc: '一个功能类优先的 CSS 框架',
        link: 'https://www.tailwindcss.cn',
      },
      {
        icon: 'https://unocss.dev/logo.svg',
        title: 'UnoCSS',
        desc: '一个即时的原子化 CSS 引擎',
        link: 'https://unocss.nodejs.cn/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/you-need-to-know-css.ico',
        title: 'You-need-to-know-css',
        desc: 'Web开发者应该掌握的CSS tricks',
        link: 'https://lhammer.cn/You-need-to-know-css/#/zh-cn/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/qishaoxuan-css-tricks.png',
        title: 'CSS 常用样式',
        desc: 'CSS 常用样式和奇技淫巧总结',
        link: 'https://qishaoxuan.github.io/css_tricks/',
      },
      {
        icon: '/logo.png',
        title: 'CSS 常见布局',
        desc: 'CSS 各种常见的布局实现',
        link: 'https://sweet-kk.github.io/css-layout/#/',
      },
      {
        icon: '/logo.png',
        title: 'Houdini.how',
        desc: 'CSS Houdini worklets 的社区驱动资源库',
        link: 'https://houdini.how/',
      },
      {
        icon: 'https://css.bqrdh.com/favicon.ico',
        title: 'Web安全色',
        desc: 'CSS可视化',
        link: 'https://css.bqrdh.com/safety-color',
      },
      {
        icon: 'https://css-loaders.com/fav.png',
        title: 'The Classic CSS Loaders Collection',
        desc: 'css效果网站',
        link: 'https://css-loaders.com/classic/',
      },
      {
        icon: 'https://www.transition.style/favicon.png',
        title: 'Transition.css',
        desc: 'Transition.css - easy transitions with clip-path',
        link: 'https://www.transition.style/',
      },
    ],
  },
  /* 可视化 */
  {
    title: '可视化',
    items: [
      {
        icon: 'https://echarts.apache.org/zh/images/favicon.png',
        title: 'ECharts',
        desc: '一个基于 JavaScript 的开源可视化图表库',
        link: 'https://echarts.apache.org/zh/index.html',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/antv.png',
        title: 'AntV',
        desc: '蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。',
        link: 'https://antv.vision/zh/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/d3js.svg',
        title: 'D3.js',
        desc: '一个遵循 Web 标准用于可视化数据的 JavaScript 库',
        link: 'https://d3js.org',
      },
      {
        icon: 'https://www.chartjs.org/favicon.ico',
        title: 'Chart.js',
        desc: '一个简单而灵活的 JavaScript 图表库',
        link: 'https://www.chartjs.org',
      },
      {
        icon: 'https://threejs.org/files/favicon.ico',
        // icon: 'https://threejs.org/files/favicon_white.ico',
        title: 'Three.js',
        desc: 'JavaScript 3d 库',
        link: 'https://threejs.org',
      },
    ],
  },
  /* 编译&构建&打包 */
  {
    title: '编译&构建&打包',
    items: [
      {
        icon: 'https://www.webpackjs.com/icon_180x180.png',
        title: 'Webpack 中文网',
        desc: '一个用于现代 JavaScript 应用程序的静态模块打包工具',
        link: 'https://www.webpackjs.com',
      },
      {
        icon: 'https://cn.vitejs.dev/logo.svg',
        title: 'Vite 中文文档',
        desc: '下一代前端工具链',
        link: 'https://cn.vitejs.dev',
      },
      {
        icon: 'https://www.rollupjs.com/img/favicon.png',
        title: 'Rollup',
        desc: 'Rollup 是一个 JavaScript 模块打包器',
        link: 'https://www.rollupjs.com',
      },
      {
        icon: 'https://turbo.build/images/favicon-dark/apple-touch-icon.png',
        title: 'Turbo',
        desc: 'Turbo is an incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust',
        link: 'https://turbo.build',
      },
      {
        icon: 'https://www.babeljs.cn/img/favicon.png',
        title: 'Babel',
        desc: 'Babel 是一个 JavaScript 编译器',
        link: 'https://www.babeljs.cn',
      },
      {
        icon: 'https://esbuild.github.io/favicon.svg',
        title: 'esbuild',
        desc: 'An extremely fast bundler for the web',
        link: 'https://esbuild.github.io',
      },
      {
        icon: 'https://swc.rs/favicon/apple-touch-icon.png',
        title: 'SWC',
        desc: 'Rust-based platform for the Web',
        link: 'https://swc.rs',
      },
    ],
  },
  /* 站点生成器 */
  {
    title: '站点生成器',
    items: [
      {
        icon: 'https://astro.build/favicon.svg',
        title: 'Astro',
        desc: '一个现代化的轻量级静态站点生成器',
        link: 'https://astro.build',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VitePress',
        desc: '由 Vite 和 Vue 驱动的静态网站生成器',
        link: 'https://vitepress.dev',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器',
        link: 'https://vuepress.vuejs.org/zh',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '基于 Umi 为组件研发而生的静态站点框架',
        link: 'https://d.umijs.org',
      },
      {
        icon: 'https://docusaurus.io/zh-CN/img/docusaurus.ico',
        title: 'Docusaurus',
        desc: '基于 React 的静态网站生成器',
        link: 'https://docusaurus.io/zh-CN',
      },
    ],
  },
  /* 图标库 */
  {
    title: '图标库',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        title: 'iconfont',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
        link: 'https://www.iconfont.cn',
      },
      {
        icon: 'https://yesicon.app/favicon-32x32.png',
        title: '矢量图标库',
        desc: '精选全球高品质、开源、免费的矢量图标库',
        link: 'https://yesicon.app/',
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        title: 'IconPark 图标库',
        desc: 'IconPark图标库是一个通过技术驱动矢量图标样式的开源图标库，可以实现根据单一 SVG 源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源，让大多数人都能够选择适合自己的风格图标',
        link: 'https://iconpark.oceanengine.com/official',
      },
      {
        icon: 'https://emoji.muan.co/appicon.png',
        title: 'Emoji searcher',
        desc: 'Emoji 表情大全',
        link: 'https://emoji.muan.co/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/iconify.png',
        title: 'Iconify',
        desc: '一个开源的图标集合和图标工具',
        link: 'https://iconify.design/',
      },
      {
        icon: 'https://icones.js.org/favicon.svg',
        title: 'Icônes',
        desc: '基于 Iconify 的图标浏览器',
        link: 'https://icones.js.org/favicon.svg',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/simpleicons.svg',
        title: 'Simple Icons',
        desc: '包含 2457 种流行品牌的免费 SVG 图标库',
        link: 'https://simpleicons.org',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/unicornicons.svg',
        title: 'Animated icons',
        desc: '自带动画的 Icon 图标库',
        link: 'https://unicornicons.com/icons',
      },
      {
        icon: 'https://www.webfx.com/wp-content/uploads/2021/10/favicon.png',
        title: 'Emoji Cheat Sheet',
        desc: '可以在 GitHub 中使用的 emoji 表情',
        link: 'https://www.webfx.com/tools/emoji-cheat-sheet/',
      },
      {
        icon: 'https://gitmoji.dev/static/apple-icon-144x144.png',
        title: 'gitmoji',
        desc: '可以在 git 中使用的 emoji 表情',
        link: 'https://gitmoji.dev/',
      },
    ],
  },
  /* 前端学习资料 */
  {
    title: '前端学习资料',
    items: [
      {
        icon: 'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png',
        title: 'MDN | Web 开发者指南',
        desc: 'Mozilla 的开发者平台，提供了大量关于 HTML、CSS 和 JavaScript 的详细文档以及广泛的 Web API 参考资',
        link: 'https://developer.mozilla.org/zh-CN',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725331556cainiao.ico',
        title: '菜鸟教程',
        desc: '学的不仅是技术，更是梦想！',
        link: 'https://www.runoob.com',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725348556es6.svg',
        title: 'ES6 入门教程',
        desc: '阮一峰的网络日志',
        link: 'http://es6.ruanyifeng.com',
      },
      {
        icon: 'https://www.typescriptlang.org/icons/icon-72x72.png?v=8944a05a8b601855de116c8a56d3b3ae',
        title: 'TypeScript',
        desc: 'TypeScript 是具有类型语法的 JavaScript',
        link: 'https://www.typescriptlang.org/zh/',
      },
      {
        icon: 'https://wangdoc.com/typescript/assets/icons/android-icon-192x192.png',
        title: 'TypeScript 教程',
        desc: 'TypeScript 开源教程，介绍基本概念和用法，面向初学者',
        link: 'https://wangdoc.com/typescript/',
      },
      {
        icon: 'http://nav.poetries.top/wp-content/uploads/2021/12/bitbug_favicon-1.ico',
        title: '前端导航',
        desc: '专为前端开发、设计、产品、自媒体人员打造，最全面的网址导航',
        link: 'https://nav.poetries.top/',
      },
    ],
  },
  /* Vue 生态 */
  {
    title: 'Vue 生态',
    items: [
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 3',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 2',
        desc: '渐进式 JavaScript 框架',
        link: 'https://v2.cn.vuejs.org',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue Router',
        desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link: 'https://router.vuejs.org/zh',
      },
      {
        icon: 'https://pinia.vuejs.org/logo.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh',
      },
      {
        icon: 'https://nuxt.com/icon.png',
        title: 'Nuxt.js',
        desc: '一个基于 Vue.js 的通用应用框架',
        link: 'https://nuxt.com',
      },
      {
        icon: 'https://vueuse.org/favicon.svg',
        title: 'VueUse',
        desc: 'Vue Composition API 的常用工具集',
        link: 'https://vueuse.org',
      },
      {
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        title: 'Element Plus',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        link: 'https://element-plus.org',
      },
      {
        icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        title: 'Ant Design Vue',
        desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
        link: 'https://antdv.com',
      },
      {
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        title: 'Vant',
        desc: '轻量、可定制的移动端 Vue 组件库',
        link: 'https://vant-ui.github.io/vant',
      },
      {
        icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
        title: 'Cube UI',
        desc: '基于 Vue.js 实现的精致移动端组件库',
        link: 'https://didi.github.io/cube-ui',
      },
      {
        icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
        title: 'NutUI',
        desc: '京东风格的轻量级移动端组件库',
        link: 'https://nutui.jd.com',
      },
    ],
  },
  /* JavaScript 框架类库 */
  {
    title: 'JavaScript 框架类库',
    items: [
      {
        icon: 'https://svelte.dev/svelte-logo-horizontal.svg',
        title: 'Svelte',
        desc: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码',
        link: 'https://svelte.dev',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725370556jquery.svg',
        title: 'jQuery API 中文文档',
        desc: '一个兼容多浏览器的 JavaScript 框架',
        link: 'https://jquery.cuishifeng.cn',
      },
    ],
  },
  /* 小程序相关 */
  {
    title: '小程序相关',
    items: [
      {
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
        title: '微信小程序文档',
        desc: '微信小程序官方开发者文档',
        link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/alipay.svg',
        title: '支付宝小程序文档',
        desc: '支付宝小程序官方开发者文档',
        link: 'https://opendoc.alipay.com/mini/',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725396556taro.svg',
        title: 'Taro',
        desc: '多端统一开发解决方案',
        link: 'https://taro.jd.com',
      },
      {
        icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/icon.png',
        title: 'uni-app',
        desc: '一个使用 Vue.js 开发所有前端应用的框架',
        link: 'https://uniapp.dcloud.net.cn',
      },
      {
        icon: 'https://mpxjs.cn/favicon.ico',
        title: 'Mpx',
        desc: '增强型跨端小程序框架',
        link: 'https://mpxjs.cn',
      },
    ],
  },
  /* 跨平台 */
  {
    title: '跨平台',
    items: [
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/electron.svg',
        title: 'Electron',
        desc: '使用 Web 技术构建跨平台桌面应用程序',
        link: 'https://www.electronjs.org/zh/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/tauri.png',
        title: 'Tauri',
        desc: '使用 Web 技术构建更小、更快、更安全的桌面应用程序',
        link: 'https://tauri.app/zh-cn/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/taro.svg',
        title: 'Taro',
        desc: '多端统一开发解决方案',
        link: 'https://taro.jd.com/',
      },
      {
        icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/icon.png',
        title: 'uni-app',
        desc: '一个使用 Vue.js 开发所有前端应用的框架',
        link: 'https://uniapp.dcloud.net.cn/',
      },
      {
        icon: 'https://tmui.design/images/logoGreat.png',
        title: 'tmui',
        desc: 'Uni App通用组件库跨端组件库',
        link: 'https://tmui.design/',
      },
      {
        icon: 'https://mpxjs.cn/favicon.ico',
        title: 'Mpx',
        desc: '增强型跨端小程序框架',
        link: 'https://mpxjs.cn/',
      },
    ],
  },
  /* Node 相关 */
  {
    title: 'Node 相关',
    items: [
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725417557nodejs.svg',
        title: 'Node.js',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
        link: 'https://nodejs.org/zh-cn',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/npm.svg',
        title: 'npm',
        desc: 'JavaScript 的包管理和分发工具',
        link: 'https://docs.npmjs.com/cli/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/pnpm.svg',
        title: 'pnpm',
        desc: '快速的、节省磁盘空间的包管理工具',
        link: 'https://pnpm.io/zh',
      },
      {
        icon: 'https://expressjs.com/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        link: 'https://expressjs.com',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725434556koa.svg',
        title: 'Koa',
        desc: '基于 Node.js 平台的下一代 web 开发框架',
        link: 'https://koajs.com',
      },
      {
        icon: 'https://www.eggjs.org/favicon.png',
        title: 'Egg',
        desc: '为企业级框架和应用而生',
        link: 'https://www.eggjs.org/zh-CN',
      },
      {
        icon: 'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
        title: 'Nest.js 中文文档',
        desc: '用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架',
        link: 'https://docs.nestjs.cn',
      },
    ],
  },
  /* React 生态 */
  {
    title: 'React 生态',
    items: [
      {
        icon: 'https://zh-hans.reactjs.org/favicon.ico',
        title: 'React',
        desc: '用于构建用户界面的 JavaScript 库',
        link: 'https://zh-hans.reactjs.org',
      },
      {
        icon: 'https://reactrouter.com/favicon-light.png',
        title: 'React Router',
        desc: 'React 的声明式路由',
        link: 'https://reactrouter.com',
      },
      {
        icon: 'https://nextjs.org/static/favicon/safari-pinned-tab.svg',
        title: 'Next.js',
        desc: '一个用于 Web 的 React 框架',
        link: 'https://nextjs.org',
      },
      {
        icon: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        title: 'UmiJS',
        desc: '插件化的企业级前端应用框架',
        link: 'https://umijs.org',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
        title: 'Ant Design',
        desc: '一套企业级 UI 设计语言和 React 组件库',
        link: 'https://ant.design',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg',
        title: 'Ant Design Mobile',
        desc: '构建移动 WEB 应用程序的 React 组件库',
        link: 'https://mobile.ant.design',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/mui.svg',
        title: 'Material UI',
        desc: '基于 Google Material Design 设计语言的 React 组件库',
        link: 'https://mui.com/',
      },
      {
        icon: 'https://maomao1996.github.io/mm-notes/icons/mantine.svg',
        title: 'Mantine UI',
        desc: '一套功能齐全的 React 组件库',
        link: 'https://mantine.dev/',
      },
      {
        icon: 'https://docs.pmnd.rs/apple-touch-icon.png',
        title: 'Zustand',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
      },
      {
        icon: 'https://valtio.pmnd.rs/favicon.ico',
        title: 'Valtio',
        desc: 'makes proxy-state simple for React and Vanilla',
        link: 'https://valtio.pmnd.rs',
      },
      {
        icon: 'https://jotai.org/favicon.svg',
        title: 'Jotai',
        desc: 'primitive and flexible state management for React',
        link: 'https://jotai.org',
      },
      {
        icon: 'https://cn.redux.js.org/img/redux.svg',
        title: 'Redux',
        desc: 'JavaScript 应用的状态容器，提供可预测的状态管理',
        link: 'https://cn.redux.js.org',
      },
      {
        icon: 'https://zh.mobx.js.org/assets/mobx.png',
        title: 'MobX',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://zh.mobx.js.org',
      },
      {
        icon: 'https://ahooks.js.org/simple-logo.svg',
        title: 'ahooks',
        desc: '一套高质量可靠的 React Hooks 库',
        link: 'https://ahooks.js.org/zh-CN',
      },
    ],
  },
  /* 社区 */
  {
    title: '社区',
    items: [
      {
        title: 'Github',
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
        },
        desc: '一个面向开源及私有软件项目的托管平台',
        link: 'https://github.com',
      },
      {
        icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
        title: 'Stack Overflow',
        desc: '全球最大的技术问答网站',
        link: 'https://stackoverflow.com',
      },
      {
        title: '稀土掘金',
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
        desc: '面向全球中文开发者的技术内容分享与交流平台',
        link: 'https://juejin.cn',
      },
      {
        title: 'V2EX',
        icon: 'https://www.v2ex.com/static/icon-192.png',
        desc: '一个关于分享和探索的地方',
        link: 'https://www.v2ex.com',
      },
      {
        title: 'SegmentFault 思否',
        icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
        desc: '技术问答开发者社区',
        link: 'https://segmentfault.com',
      },
      {
        title: '博客园',
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725461556cnblogs.svg',
        desc: '博客园是一个面向开发者的知识分享社区',
        link: 'https://www.cnblogs.com',
      },
      {
        title: '知乎',
        icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
        desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
        link: 'https://juejin.cn',
      },
    ],
  },
  /* 摸鱼专用 */
  {
    title: '摸鱼专用',
    items: [
      {
        icon: 'https://momoyu.cc/icon-192.png',
        title: '摸摸鱼热榜',
        // desc: '聚合每日热门、搞笑、有趣、适合摸鱼的资讯',
        link: 'https://momoyu.cc',
      },
      {
        icon: 'https://v.qq.com/favicon.ico',
        title: '腾讯视频',
        // desc: '中国领先的在线视频媒体平台，海量高清视频在线观看',
        link: 'https://v.qq.com',
      },
      {
        icon: 'https://static.hdslb.com/mobile/img/512.png',
        title: '哔哩哔哩',
        // desc: '',
        link: 'https://www.bilibili.com',
      },
      {
        icon: 'https://www.youtube.com/s/desktop/014dbbed/img/favicon_48x48.png',
        title: 'YouTube',
        // desc: '',
        link: 'https://www.youtube.com',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725487558twitter.svg',
        title: 'Twitter',
        // desc: '',
        link: 'https://twitter.com',
      },
      {
        icon: 'https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/1726725501557pixiv.png',
        title: 'Pixiv',
        // desc: '',
        link: 'https://www.pixiv.net',
      },
    ],
  },
]
