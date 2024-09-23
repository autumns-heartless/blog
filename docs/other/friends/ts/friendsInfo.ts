interface Friend {
  avatar: string; // 头像链接
  name: string; // 用户 id
  link: string; // 博客链接
  title?: string; // 用户头衔
  tag?: string; // 用户标签
  color?: string; // 标签颜色
}

/**
 * TODO: 缺项处理
 * 在此处填写你的友情链接
 */
export const friendsInfo: Friend[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/116859018?s=64&v=4",
    name: "唐佳琪",
    title: "🚀 努力 🐳",
    link: "https://github.com/tjq-123",
    tag: "喝酒喝酒",
    color: "indigo",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/153715078?s=64&v=4",
    name: "章家龙",
    title: "🚀 努力 🐳",
    link: "https://github.com/kebi81",
    tag: "完了，弄坏了",
    color: "indigo",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/133222124?s=64&v=4",
    name: "井文超",
    title: "🚀 努力 🐳",
    link: "https://github.com/jingwenchao",
    tag: "你是师傅",
    color: "indigo",
  },
];
