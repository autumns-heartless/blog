> 你还在用 xftp 部署你的项目和个人博客？那耗费的时间和手速用来摸鱼它不香吗？我的同事曹 mou 斌用他神秘的微笑告诉我，真的很香。

## 一、他的手法熟练到让人心疼

曹 mou 斌是个博客爱好者，他几乎每周都要更新好几篇博客。

他娴熟地掌握着更新自己博客的`一条龙`手法：

- npm run build
- 打开 `xftp` 软件
- 进入相应的目录
- 删除现存的 `html` 目录
- 把打包出来的 `dist`重命名为 `html
- 在 `xftp` 上传新打包的目录

有这手速，干点啥不好，非得在这点鼠标？

> 曹 mou 斌的女朋友听了连连点头。

为了曹 mou 斌的幸福，我给他推荐了 ~XX 肾宝 (误)~ `"ssh2-sftp-client"`。

## 二、ssh2-sftp-client 是什么？

顾名思义，ssh2-sftp-client 是一款：

**为`node.js`基于`ssh2`封装的，`SFTP客户端`**。
三个关键词：

1. **node.js**：OK，这是目前几乎所有前端都会用到的一门语言，你也不例外。
2. **ssh2**: 这里的 ssh2 不是指协议，而是指一个 `node.js` 为 `ssh2 client`（ssh2 客户端）的实现; [github/ssh2](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmscdex%2Fssh2 'https://github.com/mscdex/ssh2')
3. **SFTP 客户端**: SSH File Transfer Protocol 的缩写，安全文件传送协议

简单来说：
`ssh2-sftp-client` 基于 `ssh2` 库进行了封装，让 `文件传输` 相关的方法变得更为简洁，还支持了 `Promise` 。

这就是为什么我推荐 `ssh2-sftp-client`，而不是直接使用 `ssh2`，因为它在文件传输这件事上——**对开发者而言，更友好！**

## 三、怎么用？

> 就像你用 `xftp` 客户端那样用。真的，一模一样，不信往下看....

### 1. 安装依赖

> 就像你下载 .exe 安装包那样

```
npm install ssh2-sftp-client -dev
# or
yarn add ssh2-sftp-client -D
```

### 2. 先打开客户端

> 就想你双击快捷方式那样

```
let Client = require('ssh2-sftp-client');
let sftp = new Client();
```

### 3. 新建一个 ftp 链接

> 就像你在 `xftp` 客户端里新建链接那样。你需要输入`远程host`，`端口`，`用户名`,`密码`。

```
await sftp.connect({
  host: 'nn.nnn.nn.n',
  port: '22',
  username: 'root',
  password: '******'
})
```

### 4. 删掉老的目录

> 就像你在可视化页面找到目录，进行删除那样。

```
// 先看那个目录存不存在
if (await client.exists(remotePath)) {
  // 存在的话��👴删掉
  await client.rmdir(remotePath, true)
  console.log('删除成功')
}
```

### 5. 把`博客/网站` 复制粘贴上去

> 就和你的复制粘贴一模一样（`不，比那还容易`）

```
let rslt = await client.uploadDir(localPath, remotePath);
console.log('上传成功')
```

### 6. 脚本写完啦~执行它吧~

在 package.json 的 scripts 标签中加入一条：

```
"deploy": "vue-cli-service build && node ./scripts/deploy.js"
```

这样，在你执行完 `npm run deploy` 之后，你的构建产物就能 `嗖` 地一声传到远程服务器的目标路径啦~

## 四、 如果你的代码是要提交 git 的，别忘了这步

> 任何时候，把你的账号密码 `git commit` 都是一件危险的事情。

所以，在 `项目根目录` 下创建 `.auth/ftp.json` 文件，并把它加入 `.gitignore`:

```
.auth
```

其中，`ftp.json` 用来存储你的敏感信息：

```
{
  "host": "139.9.1xx.xxx",
  "port": 22,
  "user": "root",
  "password": "**********"
}
```

然后，在你的脚本文件 `scripts/deploy.js` 中引入 `json`，而不是 `硬编码` 的方式记录 `账号密码ip`。

```
const config = require('../.auth/ftp.json')
await sftp.connect(config) // 很重要！万事安全第一！
```

## 五、把我的源码送给你吧

接码：
`scripts/deploy.js`

```
let Client = require('ssh2-sftp-client');
let path = require('path');

let client = new Client();
const config = require('../.auth/ftp.json');
const localPath = path.resolve(__dirname, '../dist');
const remotePath = '/usr/local/dwxcb/rc/dist';
const main = async () => {
  try {
    await client.connect(config);
    if (await client.exists(remotePath)) {
      await client.rmdir(remotePath, true);
      console.log('删除成功');
    }
    let result = await client.uploadDir(localPath, remotePath);
    console.log('上传成功');
    return result;
  } finally {
    client.end();
  }
};

main();
```
