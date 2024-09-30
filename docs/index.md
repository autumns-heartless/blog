---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 秋天没有心的
  text: 个人博客
  tagline: 所谓秋天没有心，希望所有的前端工程师没有忧愁
  image:
    src: /logo.png
    alt: 秋天没有心
  actions:
    - text: 待办清单
      link: /todoList/
      theme: alt
    - text: 我的标签
      link: /tag/
    - text: 烟花许愿
      link: /firework/
    - text: 涨薪就是一个笑话
      link: /me/money-index
    - text: 测试一下
      link: /test-index
features:
  - icon: 📖
    title: 前端物语
    details: 整理前端常用知识点<small>（面试八股文）</small><br />如有异议按你的理解为主，不接受反驳
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 💡
    title: Workflow
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: /workflow/utils/library
    linkText: 常用工具库
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /efficiency/online-tools
    linkText: 提效工具
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: /pit/npm
    linkText: 踩坑记录
  - icon: 👬
    title: 其他成员
    details: <small class="bottom-small">一起努力成长</small>
    link: /other/
    linkText: 看看他们
  - icon: 💯
    title: 秋天没有心，即没有忧愁
    details: '<small class="bottom-small">永远会被技术所折服</small>'
    link: /me/
    linkText: 关于我
---

<!-- 纸屑效果 -->
<Confetti />

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
