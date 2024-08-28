<script>
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

# 涨薪申请

## 员工薪资调整表

![image](images/qrCode.png)

## ⭐️ 职级变化

### 🚀 任职时间

- 任职时间：2024/03/12 ~ 至今

## ⭐️ 所作贡献

- 所作贡献：培训、组件库

### 🚀 组件库

- 说明：为公司 Jeeplus 所搭建的 1 套前端组件库
- 作用：能够极大效率提升前端同学的开发效率
- 使用项目：《 公安厅 》、《 宣传部 》、《 社区矫正 》

### 🚀 培训

#### ⏰ 培训视频

::: details 20240322\_开发规范

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240322_开发规范.mp4"
  class="lazy-load"
/>

:::

::: details 20240322\_组件封装

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240322_组件封装.mp4"
  class="lazy-load"
/>

:::

::: details 20240324\_多选框联动

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240324_多选框联动.mp4"
  class="lazy-load"
/>

:::

::: details 20240427\_社区矫正演示视频

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240427_社区矫正演示视频.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_产品研发相关规划上

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_产品研发相关规划上.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_产品研发相关规划下

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_产品研发相关规划下.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_规范建设

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_规范建设.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_技术培训

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_技术培训.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_人员熟悉与配合

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_人员熟悉与配合.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_为知笔记运用与未来技术发展探讨

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_为知笔记运用与未来技术发展探讨.mp4"
  class="lazy-load"
/>

:::

::: details 20240528\_效率翻倍

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_效率翻倍.mp4"
  class="lazy-load"
/>

:::

::: details 20240528_VSCode 设置 json

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_VSCode设置json.mp4"
  class="lazy-load"
/>

:::

::: details 20240528_VSCode 小技巧

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240528_VSCode小技巧.mp4"
  class="lazy-load"
/>

:::

::: details 20240712_vben 新框架初步使用

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240712_vben新框架初步使用.mp4"
  class="lazy-load"
/>

:::

::: details 20240726_codeInspector

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240726_codeInspector.mp4"
  class="lazy-load"
/>

:::

::: details 20240726_fnMap

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240726_fnMap.mp4"
  class="lazy-load"
/>

:::

::: details 20240726_ssh2-sftp-client

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240726_ssh2-sftp-client.mp4"
  class="lazy-load"
/>

:::

::: details 20240726_VSCode 插件之 SFTP

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240726_VSCode插件之SFTP.mp4"
  class="lazy-load"
/>

:::

::: details 20240726_vue3 组件注册

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240726_vue3 组件注册.mp4"
  class="lazy-load"
/>

:::

::: details 20240726_vue3 透传

<Video
  v-lazy
  :second="3"
  width="100%"
  height="500px"
  src="/video/ruis/20240726_vue3透传.mp4"
  class="lazy-load"
/>

:::
