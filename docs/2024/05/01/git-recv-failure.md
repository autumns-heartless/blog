---
title: Git Recv failure Connection was reset
date: 2024/05/01
tags:
  - debug
  - git
  - 翻墙
---

# Git Recv failure: Connection was reset

## 问题

今天在撰写 VitePress 草稿的时候，想 [pull](https://git-scm.com/docs/git-pull) 一下 GitHub 的远程私有库。

连着运行了三次 `git pull origin main`，每次都是不同的错误

第 1 次：`Recv failure: Connection was reset`

```
$ git pull origin main

fatal: unable to access 'https://github.com/tangjan/vitepress-draft.git/': Recv failure: Connection was reset
```

第 2 次：`HTTP/2 stream 1 was not closed cleanly before end of the underlying stream`

```
$ git pull origin main

fatal: unable to access 'https://github.com/tangjan/vitepress-draft.git/': HTTP/2 stream 1 was not closed cleanly before end of the underlying stream
```

第 3 次：`Failed to connect to github.com port 443 after 21047 ms: Couldn't connect to server`

```
$ git pull origin main

fatal: unable to access 'https://github.com/tangjan/vitepress-draft.git/': Failed to connect to github.com port 443 after 21047 ms: Couldn't connect to server
```

## 解决

参考

- [How to resolve "Recv failure: Connection was reset" · community · Discussion #49456](https://github.com/orgs/community/discussions/49456#discussioncomment-5550697)

执行以下两条指令：

```bash
git config --global --unset http.proxy
```

```bash
git config --global --unset https.proxy
```

然后再执行 `git pull origin main`，就能成功 pull 了。
