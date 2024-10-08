---
  author: Write λ Code
  reprinted: true
  title: code-inspector 之 API
  date: 2024/10/08
  words: 1571
  duration: 6
  categories:
    - 项目依赖
  tags:
    - 项目依赖
---

<BackTop />

# nvm 与 volta

我们做前端开发的都会需要 node.js 环境，而当你为多个项目所使用的 node 版本不同不兼容而感到烦恼时，可以通过工具帮助我们更改 node 版本。

我可以直接告诉你安装 volta 及 nrm 是最优的选择，但我还是希望你了解一些本质及为什么要选择他们，下面是我针对管理工具的总结，相信看完你会有所收获。

## 简单描述 [nvm](https://github.com/coreybutler/nvm-windows/releases 'nvm') 与 [volta](https://docs.volta.sh/guide/getting-started 'volta')

这里就不详细描述其每个工具的优点，详细看官网；只说重点方便大家理解并选择合适的工具；nvm 与 volta 都是为了解决 node 版本切换的管理工具，但它们的设计理念有所不同

> - nvm 的设计理念：
>
> 1. 多版本管理：nvm 允许您在同一台计算机上安装和切换多个不同版本的 Node.js。
> 2. 简单易用：nvm 提供了命令行界面，使得安装、切换和管理 Node.js 版本变得简单直观。
> 3. 独立性：nvm 不依赖于任何特定的构建工具或软件包管理器，可以与不同的操作系统和环境兼容。
>
> - Volta 的设计理念：
>
> 1. 项目级别管理：Volta 的重点是在项目级别上管理 Node.js 版本。它将每个项目与其所需的 Node.js 版本绑定在一起，确保每个项目都能使用正确的 Node.js 版本。
> 2. 自动化：Volta 通过检测项目中的配置文件（如 package.json）来自动选择适当的 Node.js 版本。这样，在切换项目时就不需要手动更改 Node.js 版本。
> 3. 集成工具链：除了版本管理外，Volta 还提供了集成的工具链来管理全局安装的 CLI 工具，以及各种包管理器（如 npm、Yarn 等）。
>
> - 总结下：
>
> 1. nvm 注重于为用户提供更大的灵活性和独立性，允许在同一台计算机上安装和切换多个 Node.js 版本。
> 2. 而 Volta 则更注重于项目级别的管理，自动选择适当的 Node.js 版本，并提供集成的工具链来简化开发流程。这两个工具可以根据个人需求和偏好进行选择和使用。
>
> - 大白话：
>
> 1. nvm 是将多个 node 安装到你的电脑上，用那个版本，切换哪个版本，但他改的是全局的所以不能同时使用多个 node 版本；相比反复安装卸载 node 不可否认 nvm 还是有很大贡献。
> 2. 而 Volta 不但能全局切换 node 版本，还可以细化到项目中，根据不同的项目使用不同版本的 node 版本，解决了项目所使用的 node 版本问题

## 安装使用

看完上述解释根据自己的理解 nvm 与 volta 二选一，安装工具前，需要卸载以前安装的 node.js (第一次安装忽略)

## nvm 的安装与使用

<a class="has-card" href="https://github.com/coreybutler/nvm-windows/releases" title="nvm-windows">
  <span class="link-card-box">
    <span class="link-title">nvm-windows</span>
      <br/>
      <span class="link-link">🔗 https://github.com/coreybutler/nvm-windows/releases</span>
  </span>
</a>

以 1.19 为例: 下载 对应版本 .exe 文件

关于访问慢的问题=>这里是 1.1.9 的版本：https://polite.lanzouw.com/b09ibtncd  统一密码:0809

![nvm-1.1.9](https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/nvm-1.1.9.png)

下载后进行安装，一共有两个安装路径，均可自定义盘符

安装完成后 以行 ✨ 管理员身份 ✨ 运行 命令提示符 | 利用 nvm 安装 node.js

1\. 配置 taobao 镜像

```javascript
// node
nvm node_mirror:npm.taobao.org/mirrors/node
// npm
nvm npm_mirror:npm.taobao.org/mirrors/npm/
```

2.通过 nvm 安装 node

```javascript
nvm list available // 查看所有 node 版本 建议选择 LTS 中的版本进行安装 LTS 即(Long Term Support)长期支持版本
```

![LTS](https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/LTS.png)

```javascript
nvm install // 下载指定 node 版本 例: nvm install 16.14.2
nvm use // 使用或切换指定 node 版本 例: nvm use 16.14.2
nvm list // 查看所有已下载版本
```

> 关于通过上述第一条配置 taobao 镜像后仍然下载失败的问题：​Could not retrieve https://nodejs.org/dist/latest/SHASUMS256.txt.​
>
> nvm 安装目录找到 settings.txt 文件打开添加配置并保存
>
> 配置如下：

```javascript
node_mirror: npm.taobao.org/mirrors/node/
npm_mirror: npm.taobao.org/mirrors/npm/
```

切换 node 版本后，可查看对应 node 及 npm 版本

```javascript
node - v // 查看当前使用版本
npm - v // 查看当前使用版本
```

在项目根目录中添加  .nvmrc 记录项目使用的 node 版本

在终端直接 nvm use 自动读取.nvmrc 文件中的版本并进行下载切换

```javascript
v14.21.3
```

## volta 的安装与使用

<a class="has-card" href="https://docs.volta.sh/guide/getting-started" rel="nofollow" title="Getting Started | Volta">
  <span class="link-card-box">
    <span class="link-title">Getting Started | Volta</span>
    <br />
    <span class="link-link">🔗 https://docs.volta.sh/guide/getting-started</span>
  </span>
</a>

以 1.1.1 为例

![volta-1.1.1](https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/volta-1.1.1.png)

下载后安装即可，不能自定义盘符安装

安装完成后 以行 ✨ 管理员身份 ✨ 运行 命令提示符 | 利用 volta  安装 node.js

```javascript
// 默认安装最新的LTS稳定版可通过@xxx的方式安装对应版本
volta install node
```

可能会遇到下载失败或慢的问题，解决方案

优先推荐(更改镜像配置)：

> 在安装 volta 的目录（C:\\Users\\你的用户名\\AppData\\Local\\Volta）中创建或编辑 hooks.json 添加或替换如下内容（配置内容可能会更新，请以[nodejs-release | 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/nodejs-release/ 'nodejs-release | 清华大学开源软件镜像站')最新配置为准）：

```javascript
{
  "node": {
    "index": {
      "template": "https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/index.json"
    },
    "distro": {
      "template": "https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/v{{version}}/{{filename}}"
    }
  }
}
```

方案二（若上述方案失效则手动下载对应 node）：

> Node.js 官网原话：版本进入当前版本状态六个月，这让库作者有时间添加对它们的支持。 六个月后，奇数版本（9、11 等）将不受支持，偶数版本（10、12 等）将变为活动 LTS 状态并可供常规使用。LTS 版本状态为“长期支持”，这通常保证关键 bug 将在总共 30 个月内得到修复。 生产应用程序应仅使用活动 LTS 或维护 LTS 版本。
>
> 根据 Node.js 官网我们得知：每个版本的偶数版本是 LTS 稳定版，打开[以前的版本(nodejs.org)](https://nodejs.org/en/about/previous-releases '以前的版本(nodejs.org)')官网辨别每个大版本的稳定版，复制版本号去[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/ '清华大学开源软件镜像站')中 ctrl+f 搜索并点击下载对应的 node-vxx.xx.xx-win-64.zip (以 win 举例，mac | linux 自行选择)

## ![node](https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/node.png)

下载完成后放到 C:\\Users\\你的用户名\\AppData\\Local\\Volta\\tools\\inventory\\node 目录中，再次运行并指定压缩包上的版本即可将此版本作为默认版本(还是不行的重启电脑再次执行)：

```javascript
volta install node@xx.xx.xx
```

安装完成后每个 node 版本中都有对应的 npm，你也可以安装 yarn 和 pnpm

> 当你安装完 yarn 后，而使用报错时，在 Windows 上，配置环境变量 YARN_IGNORE_NODE 设置为 1。可以将其添加到系统设置中的用户或系统环境变量中并重启电脑。

```javascript
volta install yarn
```

> 安装 pnpm 需要 node 版本 16 以上
>
> 值得注意的是 pnpm 目前处于实验阶段(如果你通过 volta 安装 pnpm 失败时)。你需要单独配置启用它
>
> 在 Windows 上，配置环境变量 VOLTA_FEATURE_PNPM 设置为 1。可以将其添加到系统设置中的用户或系统环境变量中并重启电脑。
>
> 在 Linux/Mac 上，您可以在配置文件脚本中设置值（如.bash_profile、.zshrc 或类似的）。
>
> 由于此支持是实验性的（后续应该会做包管理工具兼容），暂时不支持 pnpm 的

```javascript
volta install pnpm
```

![volta-node](https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/volta-node.png)

管理项目的 node 版本(在项目根目录中安装依赖前先在终端执行再安装项目依赖)

```javascript
volta pin node@xx.xx.xx
// 程序包管理器 cnpm yarn pnpm 等
volta pin npm@xx.xx.xx
```

Volta 会把这个放在你的 package.json，这样你就可以把你选择的工具提交到版本控制:

```json
"volta": {
  "node": "xx.xx.xx",
  "npm": "x.xx.x"
}
```

其他相关指令

> volta fetch 将工具缓存到本地机器以供离线使用
>
> volta install 设置工具的默认版本
>
> volta uninstall 从工具链中卸载工具
>
> volta pin 固定项目的运行时或包管理器
>
> volta list 显示当前工具链
>
> volta list all 显示所有工具链
>
> volta completions 命令补全
>
> volta which 查看 volta 安装的工具的目录
>
> volta setup 为当前用户/shell 启用 volta
>
> volta run 运行带有自定义 Node、npm、pnpm 和/或 Yarn 版本的命令
>
> volta help 输出帮助信息

## 镜像 包管理工具 脚手架 [Git](https://so.csdn.net/so/search?q=Git&spm=1001.2101.3001.7020) 相关

## 修改 npm 镜像

> npm 镜像源是指用于下载和安装 Node.js 包（package）的服务器地址。由于网络环境的差异，有时候直接从默认的 npm 官方源下载包可能会比较慢或者不稳定。为了解决这个问题，npm 提供了一些其他的镜像源供用户选择

```TypeScript
// npm 镜像源相关指令
// 查看当前使用的镜像源
npm get registry
// npm默认镜像源: https://registry.npmjs.org/

// 全局设置taobao镜像源
npm config set registry http://registry.npmmirror.org
```

手动配置镜像源还需要去搜索相关镜像源地址，这里推荐使用[NRM](https://www.npmjs.com/package/nrm 'NRM')管理和切换镜像源

```TypeScript
// 安装npm install -g nrm

// 查看可选的源 符号*表示当前正在使用的镜像源
nrm ls

C:\Windows\system32>nrm ls

* npm --npm官方镜像------- https://registry.npmjs.org/
  yarn --yarn官方镜像----- https://registry.yarnpkg.com/
  tencent --腾讯镜像------ https://mirrors.cloud.tencent.com/npm/
  cnpm --cnpm官方镜像----- https://r.cnpmjs.org/
  taobao --淘宝镜像------- https://registry.npmmirror.com/
  npmMirror --阿里云镜像-- https://skimdb.npmjs.com/registry/

// 通过 nrm use xxx 切换镜像源
nrm use taobao

// 增加定制镜像源，例如你可以去搜索清华大学的镜像站进行配置，亦或者使用公司企业内部的私有源，执行命令nrm add <registry> <url>，其中registry为源名，url为源的路径
// 示例
nrm add demo https://skimdb.demo.com/registry/

// 删除镜像源
nrm del demo

// 测试速度
nrm test npm

// 其他相关指令通过nrm 或nrm help自行查看

C:\Windows\system32>nrm help
Usage: cli [options] [command]

Options:
  -V, --version                    output the version number
  -h, --help                       display help for command

Commands:
  ls                               List all the registries
  current [options]                Show current registry name or URL
  use <name>                       Change current registry
  add <name> <url> [home]          Add custom registry
  login [options] <name> [base64]  Set authorize information for a custom registry with a base64 encoded string or username and password
  set-hosted-repo <name> <repo>    Set hosted npm repository for a custom registry to publish package
  set-scope <scopeName> <url>      Associating a scope with a registry
  del-scope <scopeName>            Remove a scope
  set [options] <name>             Set a custom registry attribute
  rename <name> <newName>          Change custom registry name
  del <name>                       Delete custom registry
  home <name> [browser]            Open the homepage of registry with optional browser
  test [registry]                  Show response time for specific or all registries
  help [command]                   display help for command
```

## 包管理工具

安装  [cnpm - npm (npmjs.com)](https://www.npmjs.com/package/cnpm 'cnpm - npm (npmjs.com)')

```TypeScript
npm install -g cnpm
```

安装  [Yarn 中文文档](https://www.yarnpkg.cn/getting-started/install 'Yarn中文文档')

```TypeScript
npm install yarn -g
```

安装  [pnpm 中文文档](https://www.pnpm.cn/installation 'pnpm中文文档')

```coffeescript
npm install -g pnpm
```

## 脚手架

安装 vue cli 脚手架

```coffeescript
npm install -g @vue/cli
```

安装 react 脚手架

```sql
npm install -g create-react-app
```

安装 TypeScript

```coffeescript
npm install -g typescript
```

## git 相关

安装  [Git](https://git-scm.com/ 'Git')、[ortoiseGit](https://tortoisegit.org/download/ 'ortoiseGit')

## 执行 yarn 报错： yarn.ps1，因为在此系统上禁止运行脚本

解决方案：

1、在 Windows 中搜索 powershell，右键以管理员身份运行

2、若要在本地计算机上运行您编写的未签名脚本和来自其他用户的签名脚本，请使用以下命令将计算机上的 执行策略更改为 RemoteSigned

执行：set-ExecutionPolicy RemoteSigned

输入 :y(确认)

```javascript
PS C:\WINDOWS\system32> set-ExecutionPolicy RemoteSigned

执行策略更改

执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险

如 https:/go.microsoft.com/fwlink/?LinkID=135170

中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?

[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?]

帮助 (默认值为“N”): Y

PS C:\WINDOWS\system32>
```
