---
title: 运行 `hexo server` 时提示 `此系统上禁止运行脚本`
date: 2024/05/02
tags:
  - hexo
  - debug
---

# 运行 `hexo server` 时提示 `此系统上禁止运行脚本`

## 问题

在 VS Code 的 [Terminal](https://code.visualstudio.com/docs/terminal/basics) 运行 `hexo server` 时，提示 `此系统上禁止运行脚本`

```
$ hexo server

hexo : 无法加载文件 C:\Users\salt\AppData\Roaming\npm\hexo.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execu
tion_Policies。
所在位置 行:1 字符: 1
+ hexo server
+ ~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess

```

## 解决

根据提示信息，参阅 [https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execu](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4#change-the-execution-policy)，找到了解决方法。

> To change the PowerShell execution policy on your Windows computer, use the Set-ExecutionPolicy cmdlet. The change is effective immediately. You don't need to restart PowerShell.

打开 Windows 的 [Powershell](https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.4)，运行如下指令

```shell
Set-ExecutionPolicy -ExecutionPolicy Bypass
```

::: tip
不是 [终端](https://learn.microsoft.com/en-us/windows/terminal/)，也不是 [命令提示符](https://en.wikipedia.org/wiki/Cmd.exe)，而是 [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.4) 。
:::

然后回到 VS Code 的 Terminal，就可以成功运行 `hexo server` 了。

```shell
$ hexo server

INFO  Validating config
INFO
  ===================================================================
      #####  #    # ##### ##### ###### #####  ###### #      #   #
      #    # #    #   #     #   #      #    # #      #       # #
      #####  #    #   #     #   #####  #    # #####  #        #
      #    # #    #   #     #   #      #####  #      #        #
      #    # #    #   #     #   #      #   #  #      #        #
      #####   ####    #     #   ###### #    # #      ######   #
                            4.12.0
  ===================================================================
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/ . Press Ctrl+C to stop.

```
