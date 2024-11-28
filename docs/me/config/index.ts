export const videoConfig = {
  width: '400px', // 播放器高度
  height: '200px', // 播放器高度
  color: '#409eff', // 主题色
  title: '', // 视频名称
  muted: false, // 静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], // 播放倍速
  autoPlay: false, // 自动播放
  loop: false, // 循环播放
  mirror: false, // 镜像画面
  ligthOff: false, // 关灯模式
  volume: 0.3, // 默认音量大小
  control: true, // 是否显示控制
  controlBtns: [
    // 显示所有按钮
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen',
  ],
}

export const csszData = [
  { name: '公共内容', type: '', type1: '编写/改造组件', type2: '编写/改造方法', src: [``] },
  { name: '前端框架更换及优化', type: 'image', type1: '✅', type2: '✅', src: [`vben.gif`] },
  {
    name: '弹窗样式',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [
      `%E5%BC%B9%E7%AA%97%E6%A0%B7%E5%BC%8FV1.png`,
      `%E5%BC%B9%E7%AA%97%E6%A0%B7%E5%BC%8FV2.png`,
    ],
  },
  {
    name: '详情表单',
    type: 'image',
    type1: '✅',
    type2: '✅',
    src: [`%E8%AF%A6%E6%83%85%E5%BC%B9%E7%AA%97.png`],
  },
  {
    name: '表单校验逻辑 bug 修复',
    type: 'image',
    type1: '',
    type2: '✅',
    src: [`7761d658515a8031c98f85e105a5fdd.png`],
  },
  {
    name: '上传组件改造',
    type: 'image',
    type1: '✅',
    type2: '✅',
    src: [`6b516d12a64d099370875971354d9fd.png`],
  },
  {
    name: '管理端',
    type1: '页面开发',
    type2: '接口联调',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF%E7%99%BB%E5%BD%95%E9%A1%B5.png`],
  },
  {
    name: '登录页',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF%E7%99%BB%E5%BD%95%E9%A1%B5.png`],
  },
  {
    name: '更改项目整体风格样式',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF%E6%95%B4%E4%BD%93%E9%A3%8E%E6%A0%BC%E6%A0%B7%E5%BC%8F.png`],
  },
  {
    name: '班级信息管理',
    type: 'video',
    type1: '✅',
    type2: '✅',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF-%E7%8F%AD%E7%BA%A7%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86.mp4`],
  },
  {
    name: '教师信息管理',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF-%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86.png`],
  },
  {
    name: '学生信息管理',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF-%E5%AD%A6%E5%91%98%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86.png`],
  },
  {
    name: '资源管理',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF-%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86.mp4`],
  },
  {
    name: '题库管理',
    type: 'video',
    type1: '✅',
    type2: '',
    src: ['%E7%AE%A1%E7%90%86%E7%AB%AF-%E9%A2%98%E5%BA%93%E7%AE%A1%E7%90%86.mp4'],
  },
  {
    name: '试题管理',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF-%E8%AF%95%E9%A2%98%E7%AE%A1%E7%90%86.mp4`],
  },
  {
    name: '测试批改(已废弃)',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [`%E7%AE%A1%E7%90%86%E7%AB%AF-%E6%B5%8B%E8%AF%95%E6%89%B9%E6%94%B9.mp4`],
  },
  {
    name: '学生端',
    type: '',
    type1: '页面开发',
    type2: '接口联调',
    src: [`%E5%AD%A6%E7%94%9F%E7%AB%AF-%E7%99%BB%E5%BD%95V1.png`],
  },
  {
    name: '登录页',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [`%E5%AD%A6%E7%94%9F%E7%AB%AF-%E7%99%BB%E5%BD%95V1.png`],
  },
  {
    name: '我的课程',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [
      `%E5%AD%A6%E7%94%9F%E7%AB%AF-%E6%88%91%E7%9A%84%E8%AF%BE%E7%A8%8B.mp4`,
    ],
  },
  {
    name: '我的考试',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [
      `%E5%AD%A6%E7%94%9F%E7%AB%AF-%E6%88%91%E7%9A%84%E8%80%83%E8%AF%95.mp4`,
    ],
  },
  {
    name: '个人信息',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [
      `%E5%AD%A6%E7%94%9F%E7%AB%AF-%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF.mp4`,
    ],
  },
  {
    name: '我的成绩',
    type: 'image',
    type1: '✅',
    type2: '',
    src: [`%E5%AD%A6%E7%94%9F%E7%AB%AF-%E6%88%91%E7%9A%84%E6%88%90%E7%BB%A9.png`],
  },
  {
    name: '知识点树',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [
      `%E5%AD%A6%E7%94%9F%E7%AB%AF-%E7%9F%A5%E8%AF%86%E7%82%B9%E6%A0%91.mp4`,
    ],
  },
  {
    name: '知识图谱',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [
      `%E5%AD%A6%E7%94%9F%E7%AB%AF-%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1.mp4`,
    ],
  },
  {
    name: '我的实训',
    type: 'video',
    type1: '✅',
    type2: '',
    src: [
      `%E5%AD%A6%E7%94%9F%E7%AB%AF-%E6%88%91%E7%9A%84%E5%AE%9E%E8%AE%AD.mp4`,
    ],
  },
]
