# thread-loader、HappyPack 和 Worker 的大白话解释

可以把 Webpack 打包想象成“翻译一叠文件”。

假设项目里有 100 个 JS 文件，都需要通过 Babel 翻译成浏览器能够运行的代码。

## 1. 没有多进程时

```text
100 个 JS 文件
      ↓
一个 babel-loader 挨个处理
      ↓
文件1 → 文件2 → 文件3 → …… → 文件100
```

这就像只有一个翻译员，必须一本一本翻译。

## 2. Worker 是什么

Worker 就是临时请来的“额外翻译员”。

```text
100 个 JS 文件
      ↓
分给 4 个 worker
      ↓
worker 1：文件1、5、9……
worker 2：文件2、6、10……
worker 3：文件3、7、11……
worker 4：文件4、8、12……
```

在 thread-loader 中，一个 worker 通常就是一个独立的 Node.js 工作进程。

可以这样理解：

| Webpack 概念  | 大白话解释             |
| ------------- | ---------------------- |
| JS 文件       | 等待翻译的资料         |
| babel-loader  | 翻译方法               |
| worker        | 翻译员                 |
| worker pool   | 翻译小组               |
| thread-loader | 给翻译员分配任务的主管 |
| CPU 核心      | 翻译员使用的办公桌     |

下面的配置：

```js
workers: 4
```

相当于：

```text
最多安排 4 个翻译员同时工作
```

需要注意，worker 不是 CPU 核心。

CPU 核心是电脑提供的计算资源，worker 是运行在这些 CPU 核心上的 Node.js 工作进程。

开 20 个 worker 不代表一定更快，因为这些 worker 还要争抢 CPU 和内存。

## 3. thread-loader 做了什么

下面这个配置：

```js
use: ['thread-loader', 'babel-loader']
```

大白话就是：

```text
thread-loader：我负责安排人手。
babel-loader：我负责告诉这些人怎么处理 JS。
```

处理过程大致如下：

```text
Webpack 发现很多 JS 文件
        ↓
thread-loader 创建几个 worker
        ↓
把 JS 文件分给这些 worker
        ↓
每个 worker 使用 babel-loader 处理文件
        ↓
处理结果交还给 Webpack
```

thread-loader 自己不会转换 JS。

真正转换 JS 的仍然是 `babel-loader`。thread-loader 只是把 Babel 的工作分发给多个 worker。

## 4. HappyPack 做了什么

HappyPack 的目的也是创建多个 worker，然后把 loader 的工作分发出去。

但它的写法更像一家老式外包公司。

首先创建一个名为 `js` 的工作小组：

```js
new HappyPack({
  id: 'js',
  loaders: ['babel-loader'],
})
```

然后在 Webpack 规则里写：

```js
use: ['happypack/loader?id=js']
```

大白话就是：

```text
Webpack：这批 JS 文件交给编号为 js 的外包小组。
HappyPack：js 小组使用 babel-loader 处理。
```

HappyPack 把真正使用的 loader 配置放在另外一个插件配置中。

## 5. HappyPack 和 thread-loader 的执行过程

### HappyPack

```text
Webpack
  ↓
把任务交给 js 小组
  ↓
HappyPack 查找 js 小组配置
  ↓
发现这个小组使用 babel-loader
  ↓
交给 worker 处理
```

### thread-loader

```text
Webpack
  ↓
thread-loader 分配任务
  ↓
worker 直接使用 babel-loader
```

## 6. 相同点

HappyPack 和 thread-loader 都具有以下特点：

- 都可以创建多个 worker。
- 都可以并行处理多个文件。
- 都只能并行处理 loader 阶段的任务。
- 都不能让整个 Webpack 完全并行。
- 都有创建 worker 和进程通信的额外成本。
- 都不会自动提供构建缓存。

它们主要处理的是：

- `babel-loader`
- `css-loader`
- 其他耗费 CPU 的 loader

它们不负责：

- Webpack 插件执行
- 模块解析
- 代码分包
- 文件输出
- Terser 代码压缩

例如，Terser 是否并行，由 Terser 自己的 `parallel` 配置决定。

## 7. 不同点

| 对比项           | HappyPack                 | thread-loader          |
| ---------------- | ------------------------- | ---------------------- |
| 配置方式         | 插件、ID 和代理 loader    | 直接写在 loader 链中   |
| loader 所在位置  | 放在 HappyPack 插件中     | 放在 `module.rules` 中 |
| 是否需要插件实例 | 需要 `new HappyPack()`    | 不需要                 |
| loader 链可读性  | loader 被隐藏在插件配置中 | 可以直接看到执行关系   |
| worker 配置      | `HappyPack.ThreadPool`    | `workers` 等配置       |
| Webpack 5 支持   | 旧式方案                  | 明确支持 Webpack 5     |
| 排查问题         | 需要同时查看规则和插件    | 主要查看 loader 链即可 |

简单来说：

```text
HappyPack：
loader 配置藏在 HappyPack 插件中，需要通过 id 查找。

thread-loader：
loader 直接写在 module.rules 中，执行关系更加清楚。
```

## 8. CSS 为什么这样配置

当前 CSS 的 thread-loader 配置类似：

```js
use: [MiniCssExtractPlugin.loader, 'thread-loader', 'css-loader']
```

它的职责分工是：

```text
css-loader：
负责解析 CSS，在 worker 中执行。

thread-loader：
负责把 css-loader 的任务分配给 worker。

MiniCssExtractPlugin.loader：
负责输出独立 CSS 文件，留在主进程执行。
```

`MiniCssExtractPlugin.loader` 不能放进 worker，是因为 thread-loader 的 worker 不能直接输出文件。

## 9. 为什么 Worker 不一定越多越快

假设只有 8 页资料需要翻译。

只请一个人：

```text
马上开始翻译，10 分钟完成。
```

请 20 个人：

```text
先联系 20 个人
给 20 个人安排座位
把资料拆分并发给他们
最后再收集所有人的结果
```

可能光安排人员就花了很长时间。

Worker 也是一样。

创建工作进程、加载 loader、传递文件内容和收集处理结果都有额外成本。

当前 Elpis 项目大约只有：

```text
7 个 JS 文件
3 个 Vue 文件
1 个 CSS 文件
```

所以 4 个 worker 已经足够。

如果创建 19 个 worker，很可能只是增加启动时间、内存占用和通信成本。

## 10. 总结

Worker 是帮助 Webpack 处理文件的额外 Node.js 工作进程。

HappyPack 和 thread-loader 都负责把 loader 工作分给这些 worker。

二者的主要区别是：

```text
HappyPack：
通过插件、工作组和 id 管理 loader。

thread-loader：
直接放在 loader 链中，把后面的 loader 放进 worker 执行。
```

因此，thread-loader 的配置更加简单、透明，也更适合当前 Webpack 5 项目。
