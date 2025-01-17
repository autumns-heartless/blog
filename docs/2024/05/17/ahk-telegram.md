---
title: AutoHotkey 配置 Telegram 快捷键
date: 2024/05/17
tags:
  - AutoHotkey
  - Telegram
---

# AutoHotkey 配置 Telegram 快捷键

## 目标

最近在整理快捷键，想设定按下 `Ctrl` + `Alt` + `T` 唤出 Telegram 窗口，但在 Telegram 的设置找没找到，在 [Telegram 官方快捷键列表](https://github.com/telegramdesktop/tdesktop/wiki/Keyboard-Shortcuts) 也确实没有。

搜了一下，发现 [小众软件论坛](https://meta.appinn.net/t/topic/34541/8) 有老哥说可以使用 [AutoHotkey](https://www.autohotkey.com/) 。

## AHK v2 脚本

上述 [小众软件论坛](https://meta.appinn.net/t/topic/34541/8) 的老哥给的代码用的是 AHK v1 语法，但 AutoHotkey v1 已经弃用了，得参考 v2 的参考文档重写个脚本。

::: details 相关 AHK 文档

- [Hotkeys - Definition & Usage](https://www.autohotkey.com/docs/v2/Hotkeys.htm#Symbols)
- [WinExist](https://www.autohotkey.com/docs/v2/lib/WinExist.htm)
- [WinClose](https://www.autohotkey.com/docs/v2/lib/WinClose.htm)
- [Run](https://www.autohotkey.com/docs/v2/lib/Run.htm)

:::

结合 ChatGPT 和官方手册，写了个 AHK v2 的脚本。

`telegram.ahk` :

```
^!t::
{
    if WinExist("ahk_exe Telegram.exe") {
        WinClose("ahk_exe Telegram.exe")
    } else {
        Run "C:\Users\salt\AppData\Roaming\Telegram Desktop\Telegram.exe"
    }
    return
}
```

其中

- `C:\Users\salt\AppData\Roaming\Telegram Desktop\Telegram.exe`

替换为自己的 Telegram 路径即可。

## 使用方法

1. 下载安装 [AutoHotkey](https://www.autohotkey.com/) v2
2. `Win` + `R` → `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup`

3. 将上述 `telegram.ahk` 放到这里

这样 `telegram.ahk` 就会开机自动运行了。
