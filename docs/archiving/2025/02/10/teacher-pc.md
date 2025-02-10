---
sidebar: false
aside: false
title: 教师端PC - 样式：课程列表：创建课程样式调整；任务管理：查看详情改为与批阅表单项一致；试卷管理页面样式调整；在线考试页面样式调整；阅卷管理页面样式调整；知识点管理页面样式调整；公告与邮件页面样式调整；讨论区样式更改；我的发布页面样式调整；单选框的边框样式问题：和背景色一致导致看不见；解决 bug 数 1；
date: 2025/02/10
tags:
  - 工作日报
---

# 今日回顾

## ☀️ 👨‍🏫 教师端 PC 2025/02/10

## 样式调整及 bug 修复

| 调整项                                               | 旧版                                                           | 目前                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| **课程列表：`创建课程`样式调整**                     | ![旧版](../images/20250210-course-add-style-old.png)           | ![目前](../images/20250210-course-add-style-v1.png)           |
| **`任务管理`：`查看详情`改为与`批阅`表单项一致**     | ![旧版](../images/20250210-taskManage-details-style-old.png)   | ![目前](../images/20250210-taskManage-details-style-v1.png)   |
| **`试卷管理`页面样式调整**                           | ![旧版](../images/20250210-tmpl-style-old.png)                 | ![目前](../images/20250210-tmpl-style-v1.png)                 |
| **`在线考试`页面样式调整**                           | ![旧版](../images/20250210-exam-style-old.png)                 | ![目前](../images/20250210-exam-style-v1.png)                 |
| **`阅卷管理`页面样式调整**                           | ![旧版](../images/20250210-review-style-old.png)               | ![目前](../images/20250210-review-style-v1.png)               |
| **`知识点管理`页面样式调整**                         | ![旧版](../images/20250210-knowledgePointManage-style-old.png) | ![目前](../images/20250210-knowledgePointManage-style-v1.png) |
| **`公告与邮件`页面样式调整**                         | ![旧版](../images/20250210-announcement-style-old.png)         | ![目前](../images/20250210-announcement-style-v1.png)         |
| **`讨论区`样式更改**                                 | ![旧版](../images/20250210-discussion-style-old.png)           | ![目前](../images/20250210-discussion-style-v1.png)           |
| **`我的发布`页面样式调整**                           | ![旧版](../images/20250210-myRelease-style-old.png)            | ![目前](../images/20250210-myRelease-style-v1.png)            |
| **`单选框`的边框样式问题：和背景色一致导致`看不见`** | ![旧版](../images/20250210-radio-style-old.png)                | ![目前](../images/20250210-radio-style-v1.png)                |

## bug

- 目前存在 bug：<b style="color: red">1</b>
- 今日解决 bug：<b style="color: green">1</b>

![bug](../images/20250210-teacher-pc-bug.png)

<style scoped>
table, thead, tr, th, td {
  text-align: center !important;
}

td:has(img[alt="任务管理"]),
td:has(img[alt="label宽度"]) {
   img {
    display: inline-block !important;
   }
}

img {
  width: 200px;
  height: 150px;
  display: block;
  margin: 0 auto;
}

img[alt="bug"] {
  width: 100% !important;
  height: auto;
}
</style>
