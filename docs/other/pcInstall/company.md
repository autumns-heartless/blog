---
  author: '张鑫'
  title: 入职须知
  date: 2024/11/01
  words: 1491
  duration: 12
  categories:
    - 入职须知
  tags:
    - 入职须知
---

<BackTop />

<script setup>
import { defineAsyncComponent } from "vue";
import { INTERNAL_SOFT } from './data'
const VueOfficeExcel = defineAsyncComponent(() => import("@vue-office/excel"));
const VueOfficeDocx = defineAsyncComponent(() => import("@vue-office/docx"));
import '@vue-office/excel/lib/index.css'
import '@vue-office/docx/lib/index.css'
</script>

<style>
a {
  position: relative;
}

.download-svg {
  position: absolute;
  top: 4px;
  right: 2px;
}
</style>

# 入职须知

## 👨‍⚖️ 办公沟通

<MNavLinks v-for="{title, items} in INTERNAL_SOFT" :title="title" :items="items" />

## 💪 述职

### &nbsp;&nbsp;&nbsp;&nbsp; 1 > &nbsp; <b class="text-[red]">5 天述职</b>

<pre>


      线下表格，<b class="text-[red]">龚燕</b> 会给你发放(纸质版)，5天之后 <b class="text-[red]">面向朱总</b> 进行述职
</pre>

### &nbsp;&nbsp;&nbsp;&nbsp; 2 > &nbsp; <b class="text-[red]">月度述职</b>（模板可能会更新，以实际收到为准）

<a href="/excel/月度述职表.xlsx" download="月度述职表.xlsx" target="view_window">
  <img src="/images/download.svg" class="download-svg" />
  <img src="/images/月度述职表.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />
</a>

<VueOfficeExcel src="/excel/月度述职表.xlsx" style="height: 100vh" class="w-[calc(100%_-_40px)] ml-[40px] mt-[20px]" />

## 📰 日报 (由 **`表格`** 和 **`邮箱`** 组成)

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. 表格如下 (命名格式和内容如下)

<a href="/excel/工作汇报-xx-20241101.xlsx" download="工作汇报-xx-20241101.xlsx" target="view_window">
  <img src="/images/download.svg" class="download-svg" />
  <img src="/images/daily.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />
</a>

<VueOfficeExcel src="/excel/工作汇报-xx-20241101.xlsx" style="height: 100vh" class="w-[calc(100%_-_40px)] ml-[40px]" />

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. 邮箱如下 (邮箱需找 **`总经办龚艳`** 申请，注意 **`添加附件`**)

<a href="https://sirius-release.lx.netease.com/api/pub/client/update/download-windows" download="网易灵犀办公.exe" target="view_window">
  <img src="/images/download.svg" class="download-svg" />
  <img src="/images/网易灵犀办公.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />
</a>

<img src="/images/daily-template.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />

##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 以下为<b class="text-[red]"> 邮件模板</b>，可参考使用

<pre>


    领导，您好：

      以下是我今天工作内容的简述：

      今日工作回顾：
         《 上午 》：
            1>
            2>

         《 下午 》：
            1>
            2>

      以下是明天的工作事项简述：

          明日工作计划：
           1>

      详细的工作报告及相关文件已整理在 附件 中，请您查收。
          如有任何疑问或需要进一步的信息，请随时与我联系。

      此致
      敬礼！

      [姓名] xxx
      [职位] 前端工程师
      [日期]

      联系方式：

      手机：
      邮箱：xxx@ningxiache.freeqiye.com

      感谢您的关注与支持，期待与您共同推动项目的进展。
</pre>

## 💰 报销（模板可能会有变动，以实际收到的为准）

<a href="/excel/报销申请单（10月）.xlsx" download="报销申请单（10月）.xlsx" target="view_window">
  <img src="/images/download.svg" class="download-svg" />
  <img src="/images/报销.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />
</a>

<VueOfficeExcel src="/excel/报销申请单（10月）.xlsx" style="height: 100vh" class="w-[calc(100%_-_40px)] ml-[40px] my-[30px]" />

## ✅ 打卡

<pre>


    1：<b class="text-[red]">打卡🐔打卡：</b>用钉钉把自己的人脸录入，这样就可以用打卡机人脸识别打卡；

       <b class="text-[red]">蓝牙打卡：</b>也可以手机打开蓝牙，考勤机 5-10米内 都可连接；

    2：每人每月 <b class="text-[red]">只有1次补卡机会，</b>大家切记不要忘记打卡；

    3：<b class="text-[red]">加班的同事也一定不要忘记打卡，</b>不然不好统计加班时长；

    4：每月 <b class="text-[red]">5号之前</b> 请大家整理一下自己 <b class="text-[red]">上月需要报销的单据，</b> 需要报销单的可以找 <b class="text-[red]">吴芳</b> 领；

    5: 如果当月有 <b class="text-[red]">1</b> 次 打卡 <b class="text-[red]">异常</b> (包括缺卡、迟到)，都可 <b class="text-[red]">补卡</b>；

        <s>第 <b class="text-[red]">2</b> 次迟到，扣除 <b class="text-[red]">¥20 + 全勤奖</b></s>

        <s>第 <b class="text-[red]">3</b> 次迟到，扣除 <b class="text-[red]">¥40 + 全勤</b></s>

        <s>第 <b class="text-[red]">4</b> 次迟到，扣除 <b class="text-[red]">3天工资 + 全勤</b></s>

        每个🈷️<b class="text-[red]"> 迟到3次以内并且不超过15分钟</b>，<b class="text-[green]">不影响绩效考核</b>

    6: 每个月 5 号之前，吴芳 会将 <b class="text-[red]">上个月考勤</b> 统计好，发至群里，请大家仔细核对。

        如有异议，请联系 <b class="text-[red]">吴芳</b>。
</pre>

## ☀️ 请假

<pre>
  <b class="text-[red]">如有特殊原因请假可酌情处理</b>
</pre>

## 🐔 月度述职评分制绩效考核体系 V2.1

<a href="/excel/月度述职评分制绩效考核体系V2.1.docx" download="月度述职评分制绩效考核体系V2.1.docx" target="view_window">
  <img src="/images/download.svg" class="download-svg" />
  <img src="/images/月度述职评分制绩效考核体系V2.1.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />
</a>

<VueOfficeDocx src="/excel/月度述职评分制绩效考核体系V2.1.docx" style="height: 100vh" class="w-[calc(100%_-_40px)] ml-[40px] my-[30px]" />

## 🐔 加班补贴制度 V2.1

<a href="/excel/加班补贴制度V2.1.docx" download="加班补贴制度V2.1.docx" target="view_window">
  <img src="/images/download.svg" class="download-svg" />
  <img src="/images/加班补贴制度V2.1.png" class="my-[30px] w-[calc(100%_-_40px)] ml-[40px]" />
</a>

<VueOfficeDocx src="/excel/加班补贴制度V2.1.docx" style="height: 100vh" class="w-[calc(100%_-_40px)] ml-[40px] my-[30px]" />
