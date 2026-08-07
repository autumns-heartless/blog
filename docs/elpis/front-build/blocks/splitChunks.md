---
title: front-build
date: 2026/08/03
author: '张开朗呀~'
words: 4201
duration: 16
categories:
  - 学习
tags:
  - 学习
aside: true
editLink: false
lastUpdated: false
sidebar: true
prev: true
next: true
annotations: true
---

# Webpack splitChunks 配置详解（多页面应用）

## 一、配置核心目的

在**多页面应用**中抽离重复代码，压缩每个页面 bundle 打包体积，同时充分利用浏览器缓存，大幅提升页面加载效率。

### 配置前后对比示例

场景：page1、page2、page3 均同步使用 vue、axios

**❌ 未配置拆分（默认打包）**

vue、axios 会被分别打包进 page1、page2、page3 各自的业务 bundle 中，造成代码冗余。

**✅ 配置拆分后（优化后）**

- **vendor\.js**：存放 vue、axios 等所有第三方 NPM 依赖

- **page1\.js / page2\.js / page3\.js**：仅存放各页面独有业务代码

**缓存优势**：浏览器首次加载 vendor\.js 后，后续访问所有页面均可直接复用本地缓存，无需重复请求第三方资源。

## 二、全局核心参数解析

### 1\. chunks: "all"

让**同步加载 \+ 异步懒加载**的所有模块，全部参与代码拆分。

**关键作用**：

- Webpack 默认仅优先拆分异步模块，多页面同步复用的公共代码不会拆分

- 设置为 all 后，多个页面入口之间同步引用的公共模块，可正常抽离为公共 chunk，彻底解决同步代码重复打包问题

### 2\. maxAsyncRequests: 10

限制**异步懒加载**场景下，最多并行请求的拆分 chunk 数量。

作用：避免单次懒加载触发大量网络请求，在「代码拆分粒度」和「网络请求压力」之间做平衡。

### 3\. maxInitialRequests: 10

限制**页面首次初始化加载**时，最多并行请求的 chunk 数量。

作用：防止首屏一次性加载过多文件，导致首屏请求拥堵、加载变慢。

**重要说明**：两个参数仅限制**入口加载阶段的并行资源请求数量**，和代码执行次数无关。拆分不是越多越好，过度拆分反而会增加请求调度成本。

## 三、细分拆分规则配置

### 1\. vendor 规则（抽离第三方依赖）

**作用**：专门抽离 node_modules 中的第三方 NPM 依赖（vue、axios、lodash、element\-plus 等）

```Plain Text
vendor: {
  name: "vendor",
  test: /[\\/]node_modules[\\/]/,
  priority: -10,
  enforce: true,
  reuseExistingChunk: true,
}
```

**字段逐一解析**：

- **name**：公共打包文件输出名称为 vendor

- **test**：正则匹配所有 node_modules 内的依赖模块

- **priority: \-10**：拆分优先级，高于 common（\-20），确保第三方依赖优先进入 vendor，不被误归入普通公共包

- **enforce: true**：强制执行该拆分规则，不受 Webpack 默认拆分阈值限制

- **reuseExistingChunk: true**：检测到已有相同公共 chunk 时，直接复用，避免重复打包

### 2\. common 规则（抽离公共业务代码）

**作用**：抽离多个页面复用的**自定义业务公共代码**（如通用请求方法、公共表格组件、工具函数等）

示例：app/pages/common/request\.js、app/pages/widgets/Table\.vue 等多页面复用业务模块

```Plain Text
common: {
  name: "common",
  minChunks: 2,
  minSize: 1,
  priority: -20,
  reuseExistingChunk: true,
}
```

**字段逐一解析**：

- **name**：公共业务打包文件输出名称为 common

- **minChunks: 2**：模块至少被 2 个页面入口引用，才会触发拆分抽离

- **minSize: 1**：取消默认 20KB 拆分阈值，只要满足复用条件，极小的公共模块也可正常抽离

- **priority: \-20**：优先级低于 vendor，优先保证第三方依赖归类

- **reuseExistingChunk: true**：复用已有公共 chunk，减少冗余代码

## 四、不配置该规则的核心问题

1. Vue、axios 等第三方依赖在多个页面中重复打包

2. 各页面 bundle 体积偏大，加载速度变慢

3. 浏览器无法复用公共资源缓存，每次页面访问都重复请求资源

4. 通用业务代码重复嵌入多个页面包，代码冗余率高

5. 默认 20KB 阈值，导致小型公共模块无法被抽离，持续冗余

6. 无请求数量限制，过度拆分产生大量并行网络请求，拖累加载性能

## 五、整体一句话总结

**vendor 负责抽离第三方依赖，common 负责抽离复用业务代码，chunks: all 全覆盖同步/异步模块拆分**，搭配请求数量上限控制，在「减少代码冗余、最大化利用浏览器缓存」和「控制网络请求成本」之间实现最优平衡。
