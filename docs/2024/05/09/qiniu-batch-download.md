---
title: 七牛云图床同步到本地
date: 2024/05/09
tags:
  - 七牛云
---

# 七牛云图床同步到本地

## 序

1. 在整理七牛云图床的时候，发现 web 端七牛云控制台不能重命名文件夹、不能下载文件夹

::: info
尝试过使用 [七牛云文件同步图形化工具](https://github.com/qiniu/QSunSync?tab=readme-ov-file)，但它只能上传，不能下载。
:::

2. 七牛云图床的数据备份问题

3. 本地管理图床更方便

综上，我调研了一番如何将七牛云图床同步到本地，撰写成此笔记。

## qshell 的下载、配置

[qshell](https://github.com/qiniu/qshell) 是七牛云 API 的命令行工具。

### 1. 下载 qshell

在 [Releases](https://github.com/qiniu/qshell/releases) 页面下载最新版本的 qshell，解压。

### 2. 添加环境变量

为了方便在任何目录下执行 `qshell` 指令，需要添加 Windows 的环境变量。

找到了两种方法，分别是 [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) 和 [CLI](https://en.wikipedia.org/wiki/Command-line_interface) 。

::: details 方法一：GUI

① 在 Windows [开始菜单](https://en.wikipedia.org/wiki/Start_menu) 界面的搜索栏搜索 `env`<br>
② 点击 `编辑账户的环境变量`<br>
③ 在 `用户变量` 的 `Path` 里添加 qshell 的路径，我的是 `Y:\repositories\Github-Repos\zip\qshell`<br>

![start-search](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/05/09/qiniu-batch-download/1-start-search.png)

![env-variables](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/05/09/qiniu-batch-download/2-env-variables.png)

添加好后，可以重开一个 cmd 测试一下

```
C:\Users\salt>qshell -v
qshell version v2.14.0
```

:::

::: details 方法二：CLI

使用 [setx](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1) 指令可以代替 GUI 添加环境变量。

但我在执行时出现了 `裁断到 1024 字符` 的问题。

```
$ setx PATH "%PATH%;Y:\repositories\Github-Repos\zip\qshell"

警告: 正保存的数据被裁断到 1024 字符。

成功: 指定的值已得到保存。
```

使用 GUI 方式已经够用了，就懒得深究了。

也可以深究、解决这个问题，参考：

- [警告: 正保存的数据被裁断到 1024 字符。 错误: 拒绝访问注册表路径。 - feiquan - 博客园](https://www.cnblogs.com/feiquan/p/10468551.html)
- [命令行配置 Windows 环境变量报错 - gkgggq - 博客园](https://www.cnblogs.com/gkgggq/p/11797382.html)

:::

::: details 关于 `用户变量` 和 `系统变量`

也可以添加 `系统变量`，而不是 `用户变量`，参考：

- [windows - What is the difference between user variables and system variables? - Stack Overflow](https://stackoverflow.com/questions/4477660/what-is-the-difference-between-user-variables-and-system-variables)
- [Environment Variables - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/procthread/environment-variables)
- [Environment variable - Wikipedia](https://en.wikipedia.org/wiki/Environment_variable)

:::

### 3. 添加密钥

```shell
qshell account <Your AccessKey> <Your SecretKey> <Your Name>
```

其中 `AccessKey` 和 `SecretKey` 在 [七牛云 - 个人中心 - 密钥管理](https://portal.qiniu.com/developer/user/key) 界面查询。

添加好之后可以使用 `qshell account` 指令确认一下。

```
$ qshell account

Name: <Your Name>
AccessKey: <Your AccessKey>
SecretKey: <Your SecretKey>
```

## 图床批量下载脚本

### 脚本

参考 [批量下载与空间备份](https://developer.qiniu.com/kodo/kb/3744/batch-download-and-backup-space) 和 [资源列举](https://developer.qiniu.com/kodo/1284/list)，改写了个脚本。

::: details `qiniu-batch-download.py`

```py
from qiniu import Auth
from qiniu import BucketManager
import requests
import os

access_key = '**************'
secret_key = '**************'

q = Auth(access_key, secret_key)
bucket = BucketManager(q)

bucket_name = '******'
prefix = None
marker = None
limit = 1000
delimiter = None

path = '/repositories/qiniu-imgBed/'

ret, eof, info = bucket.list(bucket_name, prefix, marker, limit, delimiter)
for i in ret['items']:
    print(i['key'])
    base_url = 'https://cdn.tangjiayan.com/'+i['key']
    print(base_url)

    r = requests.get(base_url)
    pass
    if r.content:
        file_path = os.path.join(path, i['key'])
        if not os.path.exists(file_path):
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "wb") as file:
            file.write(r.content)
```

::: tip
`***` 表示私密信息，不作展示，下同。

:::

在运行这个 `.py` 脚本之前需要安装七牛云的 [python-sdk](https://github.com/qiniu/python-sdk)，运行 `pip install qiniu` 安装即可。

执行脚本即可批量下载七牛云图床的文件。

::: details 执行 `qini-batch-download.py`

```
PS Y:\repositories\Github-Repos\Programming-Practice> & y:/repositories/Github-Repos/Programming-Practice/.venv/Scripts/python.exe y:/repositories/Github-Repos/Programming-Practice/python/hello.py
Blog/
https://cdn.tangjiayan.com/Blog/
Blog/about-me/
https://cdn.tangjiayan.com/Blog/about-me/
Blog/about-me/Optimistic-Nihilism.png
https://cdn.tangjiayan.com/Blog/about-me/Optimistic-Nihilism.png
Blog/web-open/
https://cdn.tangjiayan.com/Blog/web-open/
Blog/web-open/racknerd.png
https://cdn.tangjiayan.com/Blog/web-open/racknerd.png
Blog/web-open/tencent-cloud.png
https://cdn.tangjiayan.com/Blog/web-open/tencent-cloud.png
Local-Wordpress/
https://cdn.tangjiayan.com/Local-Wordpress/
Local-Wordpress/1-move-wordpress-to-xampp-folder.png
https://cdn.tangjiayan.com/Local-Wordpress/1-move-wordpress-to-xampp-folder.png
Local-Wordpress/2-create-mysql-database.png
https://cdn.tangjiayan.com/Local-Wordpress/2-create-mysql-database.png
Local-Wordpress/3-add-mysql-user.png
https://cdn.tangjiayan.com/Local-Wordpress/3-add-mysql-user.png
Local-Wordpress/4-set-wordpres-user-privileges.png
https://cdn.tangjiayan.com/Local-Wordpress/4-set-wordpres-user-privileges.png
Local-Wordpress/5.png
https://cdn.tangjiayan.com/Local-Wordpress/5.png
Local-Wordpress/6.png
https://cdn.tangjiayan.com/Local-Wordpress/6.png
Local-Wordpress/7.png
https://cdn.tangjiayan.com/Local-Wordpress/7.png
Local-Wordpress/8.png
https://cdn.tangjiayan.com/Local-Wordpress/8.png
Local-Wordpress/9.png
https://cdn.tangjiayan.com/Local-Wordpress/9.png
Local-Wordpress/XMAPP.png
https://cdn.tangjiayan.com/Local-Wordpress/XMAPP.png
bg.png
https://cdn.tangjiayan.com/bg.png
gongan.png
https://cdn.tangjiayan.com/gongan.png
hover-cite/
https://cdn.tangjiayan.com/hover-cite/
hover-cite/1-wikipedia-hover-cite.png
https://cdn.tangjiayan.com/hover-cite/1-wikipedia-hover-cite.png
image/WorkStation.jpg
https://cdn.tangjiayan.com/image/WorkStation.jpg
image/linux/linux1/linux1-1.jpg
https://cdn.tangjiayan.com/image/linux/linux1/linux1-1.jpg
image/linux/linux1/linux1-2.png
https://cdn.tangjiayan.com/image/linux/linux1/linux1-2.png
image/linux/linux1/linux1-3.png
https://cdn.tangjiayan.com/image/linux/linux1/linux1-3.png
image/linux/linux1/linux1-4.png
https://cdn.tangjiayan.com/image/linux/linux1/linux1-4.png
image/linux/linux1/linux1-5.png
https://cdn.tangjiayan.com/image/linux/linux1/linux1-5.png
image/linux/linux1/linux1-6.png
https://cdn.tangjiayan.com/image/linux/linux1/linux1-6.png
matlab-jigsaw/
https://cdn.tangjiayan.com/matlab-jigsaw/
notes/
https://cdn.tangjiayan.com/notes/
notes/Cpp/
https://cdn.tangjiayan.com/notes/Cpp/
notes/Cpp/debug/
https://cdn.tangjiayan.com/notes/Cpp/debug/
notes/Cpp/debug/nowcoder-char-array.png
https://cdn.tangjiayan.com/notes/Cpp/debug/nowcoder-char-array.png
notes/HTML/
https://cdn.tangjiayan.com/notes/HTML/
notes/HTML/svg-misaligned.png
https://cdn.tangjiayan.com/notes/HTML/svg-misaligned.png
notes/common/
https://cdn.tangjiayan.com/notes/common/
notes/common/YUEZHENGLING.png
https://cdn.tangjiayan.com/notes/common/YUEZHENGLING.png
notes/common/bitvise-access-denied-solution.png
https://cdn.tangjiayan.com/notes/common/bitvise-access-denied-solution.png
notes/common/bitvise-access-denied.png
https://cdn.tangjiayan.com/notes/common/bitvise-access-denied.png
notes/common/chara_serika.png
https://cdn.tangjiayan.com/notes/common/chara_serika.png

……
```

:::

### 文件名引起的一个小错误

在下载过程中出现了一个错误

```
Traceback (most recent call last):
  File "y:\repositories\Github-Repos\Programming-Practice\python\hello.py", line 34, in <module>
    with open(file_path, "wb") as file:
         ^^^^^^^^^^^^^^^^^^^^^
OSError: [Errno 22] Invalid argument: '/repositories/qiniu-imgBed/notes/undergraduate/matlab-jigsaw/10*10-jigsaw.png'
```

估计是 `10*10-jigsaw.png` 文件名中含有星号 `*` 导致的。

我先在七牛云 web 控制台把 `10*10-jigsaw.png` 文件名改为 `10_10-jigsaw.png`。

然后，虽然中断了下载，但也不应该从头重新下载，浪费时间，也浪费流量。

根据 [资源列举](https://developer.qiniu.com/kodo/1284/list)，`marker` 参数就是用来记录列举位置的，因此需要查询一下 `notes/undergraduate/matlab-jigsaw/` 的 `marker`，以传入到下次的脚本中继续下载。

又简单写了个脚本以获得 `notes/undergraduate/matlab-jigsaw/` 的 `marker`

::: details `get-marker.py`

```py
from qiniu import Auth
from qiniu import BucketManager

access_key = '**************'
secret_key = '**************'

q = Auth(access_key, secret_key)
bucket = BucketManager(q)

ret, eof, info = bucket.list('*******', 'notes/undergraduate/matlab-jigsaw/', None, 1, None)
print(ret)
```

:::

执行得到结果

```
{'marker': 'eyJjIjowLCJrIjoibm90ZXMvdW5kZXJncmFkdWF0ZS9tYXRsYWItamlnc2F3LyJ9', 'items': [{'key': 'notes/undergraduate/matlab-jigsaw/', 'hash': 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ', 'fsize': 0, 'mimeType': 'application/qiniu-object-manager', 'putTime': 16942710672072363, 'type': 0, 'status': 0, 'md5': 'd41d8cd98f00b204e9800998ecf8427e'}]}
```

然后把得到的 `marker` 传入 `qiniu-batch-download.py`，再次执行即可

```py
marker = 'eyJjIjowLCJrIjoibm90ZXMvdW5kZXJncmFkdWF0ZS9tYXRsYWItamlnc2F3LyJ9'
```

::: details 再次执行 `qiniu-batch-download.py`

```
PS Y:\repositories\Github-Repos\Programming-Practice> & y:/repositories/Github-Repos/Programming-Practice/.venv/Scripts/python.exe y:/repositories/Github-Repos/Programming-Practice/python/hello.py
notes/undergraduate/matlab-jigsaw/1-pixel-info.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/1-pixel-info.png
notes/undergraduate/matlab-jigsaw/10_10-jigsaw.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/10_10-jigsaw.png
notes/undergraduate/matlab-jigsaw/WindowButtonDownFcn.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/WindowButtonDownFcn.png
notes/undergraduate/matlab-jigsaw/assuming-drawmap.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/assuming-drawmap.png
notes/undergraduate/matlab-jigsaw/axis-on.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/axis-on.png
notes/undergraduate/matlab-jigsaw/broken-jigsaw.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/broken-jigsaw.png
notes/undergraduate/matlab-jigsaw/click-jigsaw.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/click-jigsaw.png
notes/undergraduate/matlab-jigsaw/complete-jigsaw.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/complete-jigsaw.png
notes/undergraduate/matlab-jigsaw/cumt-numbering.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/cumt-numbering.png
notes/undergraduate/matlab-jigsaw/drawmap.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/drawmap.png
notes/undergraduate/matlab-jigsaw/shuzi-huarongdao.jpg
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/shuzi-huarongdao.jpg
notes/undergraduate/matlab-jigsaw/tic-toc.png
https://cdn.tangjiayan.com/notes/undergraduate/matlab-jigsaw/tic-toc.png
notes/undergraduate/yolo-insulator/
https://cdn.tangjiayan.com/notes/undergraduate/yolo-insulator/
notes/undergraduate/yolo-insulator/CBAM.png
https://cdn.tangjiayan.com/notes/undergraduate/yolo-insulator/CBAM.png
notes/undergraduate/yolo-insulator/f1.png
https://cdn.tangjiayan.com/notes/undergraduate/yolo-insulator/f1.png
notes/undergraduate/yolo-insulator/heatmap.png
https://cdn.tangjiayan.com/notes/undergraduate/yolo-insulator/heatmap.png
notes/undergraduate/yolo-insulator/labelImg.png
https://cdn.tangjiayan.com/notes/undergraduate/yolo-insulator/labelImg.png
notes/undergraduate/yolo-insulator/loss.png

……
```

:::

小 功 告 成 ~ ( •̀ ω •́ )✧

## 下期预告

《本地图床同步到七牛云》
