---
sidebar: false
aside: false
title: 教师端PC - 样式：弹窗、抽屉中单选框组的样式问题；租户展示问题(教师端不选择租户)；任务管理：查看详情 - 附件样式问题；表单label宽度导致的对齐与连接问题；学生信息管理的左侧树高度和表格宽度及横向滚动条导致的问题；解决 bug 数 1；
date: 2025/02/08
tags:
  - 工作日报
---

# 今日回顾

## ☀️ 👨‍🏫 教师端 PC 2025/02/08

## 样式调整

| 调整项                                                           | 旧版                                                                                      | 目前                                                                                      |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **`弹窗`、`抽屉`中`单选框组`的样式问题**                         | ![旧版界面](../images/radio-group-background-old.png)                                     | ![目前界面](../images/radio-group-background-v1.png)                                      |
| **租户展示问题(`教师端不选择租户`)**                             | ![旧版界面](../images/tenant-old.png)                                                     | ![目前界面](../images/tenant-v1.png)                                                      |
| **任务管理：查看详情 - `附件样式`问题**                          | ![旧版界面](../images/task-file-old.png)                                                  | ![任务管理](../images/task-file-v1.png) ![任务管理](../images/task-file-nodata-v1.png)    |
| **表单`label宽度导致的对齐与连接`问题**                          | ![label宽度](../images/label-style-old1.png) ![label宽度](../images/label-style-old2.png) | ![label宽度](../images/label-style-v1-1.png) ![label宽度](../images/label-style-v1-2.png) |
| **学生信息管理的`左侧树高度`和`表格宽度及横向滚动条`导致的问题** | ![旧版界面](../images/student-info-manage-bug-20250208-old.png)                           | ![目前界面](../images/student-info-manage-bug-20250208-v1.png)                            |

## bug

- 目前存在 bug：<b style="color: red">1</b>
- 今日解决 bug：<b style="color: green">1</b>

![bug](../images/20250208-teacher-pc-bug.png)

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
