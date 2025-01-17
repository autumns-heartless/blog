---
title: VS Code 同步扩展
date: 2024/04/28
tags:
  - VS Code
---

# VS Code 同步扩展

在公司使用 VS Code 编写 markdown 文件时，发现没有 [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) 的提示，于是意识到公司电脑上的 VS Code 没有同步安装账号的扩展。

有点纳闷的是，公司电脑上的 VS Code 已经登录了账号，也开启了 `Cloud Changes`（如下图），为什么还没同步扩展呢？

![already-logged-in](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/04/28/vscode-sync-extensions/1-already-logged-in.png)

于是调查了一圈，找到了答案。

## `Clound Changes` 和 `Settings Sync` 是两码事

`Cloud Changes`: 参见 [Continue Working On...](https://code.visualstudio.com/docs/sourcecontrol/github#_continue-working-on) ，是用来进行项目跟踪的。

`Settings Sync`: 参见 [Settings Sync in Visual Studio Code](https://code.visualstudio.com/docs/editor/settings-sync)，这个才是我需要的扩展同步功能。

## 如何同步扩展

参考的 [这篇文章](https://betterprogramming.pub/sync-visual-studio-code-settings-extensions-shortcuts-across-multiple-devices-9fa6a980f25e)，用 [Google Slides](https://www.google.com/slides/about/) 做了一张图来表述步骤。

![步骤图示](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/04/28/vscode-sync-extensions/2-steps.png)

::: details VS Code 搜索内容开头的 `>`

VS Code 搜索框内容以 [>](https://en.wikipedia.org/wiki/Greater-than_sign) 开头时表示 `Show and Run Commands`，参见 [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)。

:::
