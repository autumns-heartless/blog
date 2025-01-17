---
title: Typecho首页文章没排满就换页
date: 2024/03/02
tags:
  - Typecho
---

# Typecho 首页文章没排满就换页

## 问题及解决

如图，今天又在 [盐之](https://story.tangjiayan.cn/) 上又写了一篇文章，文章总数现在是 6。

然后发现 Typecho 首页显示 5 篇文章就换页了，应该显示 8 篇再换页才对。

![首页没排满就换页](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/03/02/typecho-page-change/5-articles-page-change.png)

第一反应是 Story 这个主题的什么参数没设置对，参照其 [README](https://github.com/txperl/Story-for-Typecho) 改了几个参数试了试，结果还是没变化。

以「Typecho 换页」为关键词搜了一下 Google，一眼看过去搜索结果的都是些主题开发相关的。

然后我想着说不定问题其实很简单，说不定是 Typecho 本身就有首页显示文章数量的设置呢？

在 Typecho 后台找了找，结果还真有 (￣ i ￣;)

![Typecho 后台设置翻页数量](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/03/02/typecho-page-change/typecho-setting.png)

改成 `8`，就 OK 了。

![首页正常了](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/03/02/typecho-page-change/8-articles-page-change.png)

## 总结

1. > 看上去相当不合理的问题，说不定答案很简单。(o ゜ ▽ ゜)o <br>—— 糖加盐
2. 做了两三个月的游戏测试工作，看到 `每页文章数目` 时，脑中自然地想到了 `上限是多少` 之类的问题。

   比如文章数量很多，有 100 篇，把 `每页文章数目` 设置为 `100`，会怎么样？

   看来，在测试岗位工作，还有点用。。
