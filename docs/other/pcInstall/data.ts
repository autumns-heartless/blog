import type { NavLink } from '../../.vitepress/theme/types'

type AppData = {
  title: string
  items: NavLink[]
}

/* 工作所需 teacherInfoManage */
export const WORK_SOFT: AppData[] = [
  {
    title: '',
    items: [
      {
        icon: 'https://emo112.vip/favicon.png',
        title: 'emo',
        desc: '🪜，需要💰',
        link: 'https://emo112.vip/#/Download?category=Windows',
      },
      {
        icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01eMicSg1GVD4uXMWGv_!!6000000000627-73-tps-32-32.ico',
        title: '钉钉',
        desc: '丰富的产品功能助力企业办公',
        link: 'https://www.dingtalk.com/download?spm=a213l2.13146415.0.0.7f1571e1U30QRk#/',
      },
      {
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
        title: '微信',
        desc: '微信，是一个生活方式',
        link: 'https://weixin.qq.com/',
      },
      {
        icon: 'http://wcdn.wiz.cn/favicon.ico',
        title: '为知笔记',
        desc: '能够帮助快速编写md文档并导出',
        link: 'https://www.wiz.cn/zh-cn/wiznew.html',
      },
      {
        icon: 'https://ee.wpscdn.cn/wpscn/favicon.ico',
        title: 'WPS',
        desc: '你的智能办公助手',
        link: 'https://platform.wps.cn/',
      },
      {
        icon: './images/微信开发者工具.ico',
        title: '微信开发者工具',
        desc: '开发微信小程序',
        link: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html',
      },
      {
        icon: 'https://hostbuf.net/favicon.ico',
        title: 'FinalShell',
        desc: 'SSH工具，能够帮助前端同学连接远程服务器进行打包部署',
        link: 'https://hostbuf.net/',
      },
      {
        icon: 'https://hx.dcloud.net.cn/static/favicon/favicon.png',
        title: 'HBuilderX',
        desc: '编程工具，uniapp开发时建议使用',
        link: 'https://hx.dcloud.net.cn/Tutorial/install/windows',
      },
      {
        icon: './images/GitHub代理.ico',
        title: 'GitHub代理',
        desc: '能够加速Github访问',
        link: 'https://www.dogfight360.com/blog/686/#google_vignette',
      },
      {
        icon: './images/ApiFox.ico',
        title: 'ApiFox',
        desc: 'API 设计、开发、测试一体化协作平台',
        link: 'https://apifox.com/',
      },
      {
        icon: 'https://code.visualstudio.com/apple-touch-icon.png',
        title: 'VS Code',
        desc: '常用的代码编辑器',
        link: 'https://code.visualstudio.com/Download',
      },
    ],
  },
]

/* 其他软件 */
export const OTHER_SOFT: AppData[] = [
  {
    title: '',
    items: [
      {
        icon: 'http://www.potplayercn.com/wp-content/themes/pot/images/favicon.ico',
        title: 'PotPlayer',
        desc: '万能格式影音视频播放器',
        link: 'http://www.potplayercn.com/download',
      },
      {
        icon: 'https://cdn.meeting.tencent.com/assets/next-website/logo128.png',
        title: '腾讯会议',
        desc: '随时随地发起视频会议',
        link: 'https://meeting.tencent.com/download/',
      },
      {
        icon: 'https://molunerfinn.com/PicGo/imgs/256x256--icons.png',
        title: 'PicGo',
        desc: '图床，可以用来管理你的图片',
        link: 'https://github.com/Molunerfinn/picgo/releases',
      },
      {
        icon: './images/元气桌面.ico',
        title: '元气桌面',
        desc: '140000+ 超清无水印动静态壁纸',
        link: 'https://desk.duba.com/',
      },
      {
        icon: 'https://pixpinapp.com/favicon.ico',
        title: 'PixPin',
        desc: '截图/贴图/长截图/文字识别/标注',
        link: 'https://pixpinapp.com/',
      },
      {
        icon: 'http://p0.qhimg.com/t01d5c730de3a7a5a5b.png',
        title: '桌面助手',
        desc: '全面提升办公效率，工作更轻松，心情更愉悦',
        link: 'http://www.360.cn/desktop/#firstPage',
      },
      {
        icon: 'https://www.screentogif.com/logos/favicon.ico',
        title: 'ScreenToGif',
        desc: '录制Gif图，写博客的好工具',
        link: 'https://www.screentogif.com/',
      },
      {
        icon: 'https://www.huorong.cn/favicon.png',
        title: '火绒安全',
        desc: '为您打造全面可靠的终端防护',
        link: 'https://www.huorong.cn/',
      },
    ],
  },
]

/* 内部沟通办公 软件 */
export const INTERNAL_SOFT: AppData[] = [
  {
    title: '',
    items: [
      {
        icon: 'http://www.51nwt.com/uploadfile/2016/0808/20160808020402195.png',
        title: '内网通',
        desc: '最好用的局域网办公沟通工具',
        link: 'http://www.51nwt.com/down.htm',
      },
    ],
  },
]

/* 谷歌拓展 */
export const GOOGLE_EXTENSION: AppData[] = [
  {
    title: '',
    items: [
      {
        icon: 'https://lh3.googleusercontent.com/nnMASpwJY4U5ukhKl4PfIdaOpuKXNrVvfIc9n8-NJOJIY7m3RLgsazN6ATmDkXyaMll8zADOXuBR574MwC7T71kJcQ=s60',
        title: 'Adblock Plus - 免费的广告拦截器',
        desc: '在 YouTube 和您浏览的其他网站上去除广告',
        link: 'https://chromewebstore.google.com/detail/adblock-plus-%E5%85%8D%E8%B4%B9%E7%9A%84%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/cfhdojbkjhnklbpkdaibdccddilifddb?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/ccFVGartRYZFPgHAoVO9iLeYuG_hEB-_aL236MEFb1WyYZeW3vWl3xZLY3DOn6Fe07-3Q7tF23NE-2DXc8ygMbKGrFI=s60',
        title: 'Apifox Browser Extension',
        desc: 'API 文档、API 调试、API Mock、API 自动化测试',
        link: 'https://chromewebstore.google.com/detail/apifox-browser-extension/eggdlmopfankeonchoflhfoglaakobma?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/koGniUjvTSN2MC3HnfLDJX861GuT0QDK_T6j-cgN_ol-G437vvNPezSZ9bvGIUS2D1RfZjAj7GyqGw1eJEUnWytAIQ=s60',
        title: 'Clear Cache',
        desc: '只需单击即可清除浏览器的缓存和数据',
        link: 'https://chromewebstore.google.com/detail/clear-cache/cppjkneekbjaeellbfkmgnhonkkjfpdn?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/Z6DvYg3rukQzOfQfvSLNeRhFAQPQIoqfCCbNq645AfA9uzWgsn937HWx2n2W3sH_hZIL0UvEP_21VN5dQS4U4_8Vpg=s60',
        title: 'Global Speed: 视频速度控制',
        desc: '设置视频和音频的默认速度',
        link: 'https://chromewebstore.google.com/detail/global-speed-%E8%A7%86%E9%A2%91%E9%80%9F%E5%BA%A6%E6%8E%A7%E5%88%B6/jpbjcnkcffbooppibceonlgknpkniiff?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/r9pG6yBSmqm_GGM9c2Q2JJvHQ6WXr9FTphOwvxS1PwrPpjfKeu1b9ha6OXqx8ALeGqtnRElPtZzdiCWD-4yUwA_LBVM=s60',
        title: 'OneTab',
        desc: '节省高达95％的内存，并减轻标签页混乱现象',
        link: 'https://chromewebstore.google.com/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/jajv_dbkwvtdRT8qoMJ5lU8yK1hMMJXVjzMWSopju8pYfeK2w1Wg0HrEjEJdI2hhe3Cmo3yTxjxUDvsfGIwNqP-a=s60',
        title: 'Vue.js devtools',
        desc: '用于调试 Vue.js 应用程序的浏览器 DevTools 扩展',
        link: 'https://chromewebstore.google.com/detail/vuejs-devtools/iaajmlceplecbljialhhkmedjlpdblhp?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/SuFita7azx_s5E33nJZxzP6Ox_3mrRFUK7UKiwjFkzaCYCn7slAVCzyM6cXMJEcwEX3WEl5ItNl1wA3FKS8XYBeo3A=s60',
        title: 'WeTab-AI新标签页',
        desc: '用小组件自定义你的新标签页,支持暗黑模式，已整合 WetabAI 组件',
        link: 'https://chromewebstore.google.com/detail/wetab-ai%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/aikflfpejipbpjdlfabpgclhblkpaafo?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/IVHTJU2a1JphDt6dqhpDPVcZG0SCpYAK1lS9QIIXwXIk__e5GdF0xcULafHMmH54-RCembM6OTrIB_BmZ-9b-zln=s60',
        title: 'Window Resizer',
        desc: '调整浏览器窗口大小以模拟各种屏幕分辨率',
        link: 'https://chromewebstore.google.com/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/V_gzOO1xZcuQ-F3Oq3xkhPq6_3ai26aT5w9bsa9ae-8AuWawDODYKLbBaNo1aLrY5v6ine9qjoIRP_u3GRPQzxWCUA=s60',
        title: '截屏大师：全页截图',
        desc: '简单、免费且功能齐全的截图应用，轻松捕捉、编辑和保存您的截图',
        link: 'https://chromewebstore.google.com/detail/%E6%88%AA%E5%B1%8F%E5%A4%A7%E5%B8%88%EF%BC%9A%E5%85%A8%E9%A1%B5%E6%88%AA%E5%9B%BE/ggacghlcchiiejclfdajbpkbjfgjhfol',
      },
      {
        icon: 'https://lh3.googleusercontent.com/3fQMRj3gigg_kS0CZoSYdclwWG3rjkhZGAvn7YYD0yXEPkvDfwAcCkZ1uypUmVeRo-IPoxb2ABvP0K8ZvgIr7R3uwzI=s60',
        title: '简悦 - SimpRead',
        desc: '让你瞬间进入沉浸式阅读的 Chrome 扩展，类似 Safari 的阅读模式',
        link: 'https://chromewebstore.google.com/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll',
      },
      {
        icon: 'https://lh3.googleusercontent.com/zoY8FwoOqPlBgFxcmFdNSK2Q4CcLmv-gw7vTjF2KMR9cEabwBsGNrHBTEMitn0Ba6OmCVJ0NcLnFGu3N97BP8Phu0g=s60',
        title: '篡改猴',
        desc: '使用用户脚本自由地改变网络',
        link: 'https://chromewebstore.google.com/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN&utm_source=ext_sidebar',
      },
      {
        icon: 'https://lh3.googleusercontent.com/W3l9VaL0SFEfDw1-wYB4KUUVN70QX5NKCb1rLsFD6nWeBZgOhTEvRqvKbJM3FdZ7XrGZZT54FaiXekTd35qGMO-q=s60',
        title: '飞书剪存',
        desc: '使用飞书剪存将网页正文一键保存到飞书云文档',
        link: 'https://chromewebstore.google.com/detail/%E9%A3%9E%E4%B9%A6%E5%89%AA%E5%AD%98/mofcmpgnbnnlcdkfchnggdilcelpgegn?hl=zh-CN&utm_source=ext_sidebar',
      },
    ],
  },
]

/* vscode 插件 */
export const VSCODE_EXTENSION: AppData[] = [
  {
    title: '',
    items: [
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/%E5%88%AB%E5%90%8D%E8%B7%AF%E5%BE%84%E8%B7%B3%E8%BD%AC.png',
        title: '别名路径跳转',
        desc: '别名路径跳转插件，支持任何项目，可以自由配置映射规则，自由配置可缺省后缀名列表',
        link: 'https://marketplace.visualstudio.com/items?itemName=lihuiwang.vue-alias-skip',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/%E8%8B%B1%E6%96%87%E9%A9%BC%E5%B3%B0%E5%91%BD%E5%90%8D.png',
        title: '英文驼峰命名',
        desc: '把中文名称修改为驼峰式英文 比如: 选中"中文函数" 这四个字后鼠标右键 ‘改为驼峰命名’ 可以改为 chineseFunction',
        link: 'https://marketplace.visualstudio.com/items?itemName=long-wu.humpNaming',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Better%20Comments.png',
        title: 'Better Comments',
        desc: '让代码注释颜色更加多彩！',
        link: 'https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/SpellCheck.png',
        title: 'Code Spell Checker',
        desc: '适用于代码和文档的基本拼写检查器，捕捉常见的拼写错误',
        link: 'https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/CodeSnap.png',
        title: 'CodeSnap',
        desc: '📸 在 VS Code 中截取代码的精美屏幕截图！',
        link: 'https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Colorful%20Comments.png',
        title: 'Colorful Comments',
        desc: '把注释用不同颜色来分类',
        link: 'https://marketplace.visualstudio.com/items?itemName=ParthR2031.colorful-comments',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Component%20Template.png',
        title: 'Component Template',
        desc: '可以通过创建的组件模板来新建组件或页面',
        link: 'https://marketplace.visualstudio.com/items?itemName=wuguanwen.component-template',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Console%20Ninja.png',
        title: 'Console Ninja',
        desc: 'JavaScript console.log 输出和运行时错误就在您的代码旁边',
        link: 'https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Iconify%20IntelliSense.png',
        title: 'Iconify IntelliSense',
        desc: '将图标代码图标化',
        link: 'https://marketplace.visualstudio.com/items?itemName=antfu.iconify',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Image%20preview.png',
        title: 'Image preview',
        desc: '在边缘和悬停时显示图像预览',
        link: 'https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/JavaScript%20and%20TypeScript%20Nightly.png',
        title: 'JavaScript and TypeScript Nightly',
        desc: '启用 typescript@next 来增强 VS Code 的内置 JavaScript 和 TypeScript 支持',
        link: 'https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Material%20Icon%20Theme.png',
        title: 'Material Icon Theme',
        desc: 'VSCode 的 各种文件夹和文件图标',
        link: 'https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/path-intellisense.png',
        title: 'Path Intellisense',
        desc: '路径智能感知',
        link: 'https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Prettier%20-%20Code%20formatter.png',
        title: 'Prettier - Code formatter',
        desc: '使用 Prettier 的代码格式化程序',
        link: 'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Project%20Manager.png',
        title: 'Project Manager',
        desc: '轻松在项目之间切换',
        link: 'https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/SFTP.png',
        title: 'SFTP',
        desc: '打包部署，同步远程代码',
        link: 'https://marketplace.visualstudio.com/items?itemName=Natizyskunk.sftp',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/px%20to%20rem%20%26%20rpx%20%26%20vw%20(cssrem).png',
        title: 'px to rem & rpx & vw (cssrem)',
        desc: '在 VSCode 中在 px 和 rem、rpx 和 vw 单位之间转换',
        link: 'https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/stylelint.png',
        title: 'Stylelint',
        desc: 'style校验',
        link: 'https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/svglogo.png',
        title: 'SVG',
        desc: 'svg图片预览',
        link: 'https://marketplace.visualstudio.com/items?itemName=jock.svg',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Tailwind%20CSS%20InstelliSense.png',
        title: 'Tailwind CSS IntelliSense',
        desc: '适用于 VS Code 的智能 Tailwind CSS 工具',
        link: 'https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/TODO%20Hightlight.png',
        title: 'TODO Highlight',
        desc: '突出显示 TODO、FIXME 以及任何关键字、注释......',
        link: 'https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/todo-tree.png',
        title: 'Todo Tree',
        desc: '在树视图中显示 TODO、FIXME 等注释标签',
        link: 'https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/UnoCSS.png',
        title: 'UnoCSS',
        desc: '对 UnoCSS 类名智能提示',
        link: 'https://marketplace.visualstudio.com/items?itemName=antfu.unocss',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/vscode-pdf.png',
        title: 'vscode-pdf',
        desc: '在vscode中预览pdf',
        link: 'https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Vue%20-%20Official.png',
        title: 'Vue - Official',
        desc: 'vue3必装插件',
        link: 'https://marketplace.visualstudio.com/items?itemName=Vue.volar',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/vue-peek-icon.png',
        title: 'Vue Peek',
        desc: '允许查看并转到 Vue 单文件组件的定义',
        link: 'https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/xmind-icon.png',
        title: 'Xmind Viewer',
        desc: '在vscode中预览xmind',
        link: 'https://marketplace.visualstudio.com/items?itemName=cweijan.xmind-viewer',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/Vue%20-%20Official.png',
        title: 'Vetur',
        desc: 'vue2必装插件',
        link: 'https://marketplace.visualstudio.com/items?itemName=octref.vetur',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/EditorConfig_icon.png',
        title: 'EditorConfig for VS Code',
        desc: '统一当前项目代码编写规范',
        link: 'https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/DotENV.png',
        title: 'DotENV',
        desc: '支持 dotenv 文件语法并高亮',
        link: 'https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv',
      },
      {
        icon: 'https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/gitlens-icon.png',
        title: 'GitLens — Git supercharged',
        desc: ' 一目了然地可视化代码作者身份和提交信息',
        link: 'https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens',
      },
    ],
  },
]
