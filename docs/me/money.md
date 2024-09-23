---
  comment: false
  lastUpdated: false
  footer: false
---

<BackTop />

<style lang="scss" scoped>
  :deep(.vue-office-pdf-wrapper) {
    background-color: transparent !important;
    mix-blend-mode: difference;
  }
</style>

# 涨薪申请 <small>(建议在 PC 端观看)</small>

<Font />

## ⭐️ 职级变化（开发&nbsp;&nbsp;→&nbsp;&nbsp;主管）

### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;⏰ 任职时间：2024/03/12 ~ 至今

## ⭐️ 所作贡献

### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;🚀 组件库

  <div style="text-indent: 4em">
    <p>
      <b>·</b> 说明：为公司 Jeeplus 所搭建的 1 套 <b style="color: red">前端组件库</b>
    </p>
    <p>
      <b>·</b> 作用：能够 <b style="color: red">极大</b> 地提升前端同学的开发效率
    </p>
    <p>
      <b>·</b> 使用项目：《 公安厅 》、《 宣传部 》、《 社区矫正 》、《 农事服务 》
    </p>
    <p>
      <b>·</b> 使用前(左) / 使用后(右)：代码量 <b style="color: red">急剧缩减</b>
      <div style="display: flex; justify-content: center;">
        <img src="https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/code-old.png" style="max-height: 800px; overflow-y: auto;" />
        <img src="https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/code-new.png" style="max-height: 800px; overflow-y: auto;" />  
      </div>
    </p>
  </div>

### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;🚀 前端规划

<div style="text-indent: 4em">
  <p>
    <b>·</b> 说明：针对公司目前现状对前端同学所做的 <b style="color: red">规划</b>
  </p>
  <p>
    <b>·</b> 作用：让大家有 1 个明确的 <b style="color: red">提升路线</b> 和 <b style="color: red">更加规范、更加效率</b> 的开发体系
  </p>
  <img src="https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/%E5%89%8D%E7%AB%AF%E8%A7%84%E5%88%92_v1.svg" style="width: 80%; height: 500px; display: block; margin: 30px auto;" />
</div>

### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;🚀 培训

#### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⏰ 培训视频（ **`优酷`** 跳转观看 / **`Tube`** 本地观看）

#### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⏰ 培训文档（**`为知笔记`** 存放 / <a href="https://qtmyx.netlify.app/other/vben/example"> **`部分文档`** 在线地址</a>）

<div style="text-indent: 5em">
  <p>
    <b>·</b> 说明：每次培训的 <b style="color: red">文档和视频</b> 都将记录在内
  </p>
  <p>
    <b>·</b> 作用：<b style="color: red">提升团队整体水平</b>
  </p>
</div>

<br />

<Swiper />

### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;🚀 前端所规划待办事项

<div style="text-indent: 4em">
  <p>
    <b>·</b> 说明：针对前端团队 <b style="color: red">未来发展</b> 所规划的一些前瞻工作
  </p>
  <p>
    <b>·</b> 作用：将规划落地，让团队更加有 <b style="color: red">规范和素养</b>
  </p>
</div>

<VueOfficePdf src="/待办事项.pdf" />

<script setup>
import Swiper from './Swiper.vue';
import Font from './Font.vue';
import VueOfficePdf from "@vue-office/pdf";

document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy-load"));
  if ("IntersectionObserver" in window) {
    let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyVideo = entry.target;
          for (var source in lazyVideo.children) {
            var videoSource = lazyVideo.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }
          lazyVideo.load();
          lazyVideo.classList.remove("lazy-load");
          lazyVideoObserver.unobserve(lazyVideo);
        }
      });
    });
    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
</script>
