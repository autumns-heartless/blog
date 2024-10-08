import type { NavLink } from '../../.vitepress/theme/types'

type AppData = {
  title: string
  items: NavLink[]
}

/* 工作所需 */
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
