---
title: VS Code 运行 python 代码输出乱码
date: 2024/05/07
tags:
  - VS Code
  - Python
---

# VS Code 运行 python 代码输出乱码

## 问题

按照 [Getting Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial#__install-a-python-interpreter) 配置好了 VS Code 的 python 环境，编写好了 [Hello, World](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) 代码

```py
msg = "Hello, world!"
print(msg)
```

在点击 `Run Code` 按钮的时候，VS Code 的 `OUTPUT` 窗口输出了乱码

```
[Running] python -u "y:\repositories\Github-Repos\Programming-Practice\python\hello.py"
'python' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
���������ļ���

[Done] exited with code=1 in 0.034 seconds
```

但点击 `Run Python File in Dedicated Terminal`，在 `TERMINAL` 窗口生成的就是正常的输出

```
PS Y:\repositories\Github-Repos\Programming-Practice> & y:/repositories/Github-Repos/Programming-Practice/.venv/Scripts/python.exe y:/repositories/Github-Repos/Programming-Practice/python/hello.py
Hello, world!
```

## 解决

有两个关键点

1. 在 OUTPUT 窗口输出乱码，但在 TERMINAL 窗口就正常。<br>而 TERMINAL 窗口打开时有一段加载时间，说明它是新开的，加载了最新的环境变量。

2. 在 OUPUT 窗口输出的乱码中，有个 `'python'` 字眼。<br>合理猜测，这段乱码的主要意思大概是 `无法找到 'python' 命令`，也就是在 OUTPUT 窗口中，刚配置的环境变量未生效。

结论：我刚配置的环境变量在 VS Code 的 `OUTPUT` 窗口还没生效。

我试着关掉所有 VS Code 窗口，重新打开，点击 `Run Code` 再次运行代码。

嘿，成了。`o(*￣︶￣*)o`

```
[Running] python -u "y:\repositories\Github-Repos\Programming-Practice\python\hello.py"
Hello, world!

[Done] exited with code=0 in 0.061 seconds
```
