<BackTop />

<script setup>
import { WORK_SOFT, OTHER_SOFT } from './data'
</script>

# 前端同学 - 装机流程

## 💿 分盘

> 分盘主要是将电脑上的东西进行`分类`，每个盘负责存储其对应的内容

个人建议：除 C 盘之外，分出 D、E、F 盘。

- D：`软件`
- E：`工作`
- F：`娱乐`

## 📂 分文件夹

> 分文件夹同分盘，主要是为了能够 **`迅速定位`**。

下面展示了我的一些 文件夹 📂 命名和分类，希望可以对你有所帮助 😁

- `D盘` 📂: 放置了软件相关的东西

![D盘文件夹](./images/D.png)

- `01_工作所需` 📂：特意标注了序号，看起来能够舒服一点 😌

![01_工作所需](./images/D-1.png)

- `E盘` 📂：放置了工作中的项目

> 当然我这里将娱乐和工作的东西放在了一起 😄

![E盘文件夹](./images/E.png)

## 📚 装软件

> 这里我将列举`前端同学`可能常用的一些软件，如果有更好的也欢迎补充 👏

- 工作所需

<MNavLinks v-for="{title, items} in WORK_SOFT" :title="title" :items="items"/>

- 其他软件

<MNavLinks v-for="{title, items} in OTHER_SOFT" :title="title" :items="items"/>

## 环境配置

## 浏览器配置

## vscode 配置
