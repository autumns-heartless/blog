---
  comment: false
  aside: false
  sidebar: false
  footer: false
  author: '张鑫'
  date: 2024/11/09
  title: 诚硕述职
---

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import 'vue3-video-play/dist/style.css'
  import { videoPlay } from 'vue3-video-play'

  import Font from './Font.vue';

  import { videoConfig, csszData } from './config';

  const baseUrl = ref('https://zx-picture-bed.oss-cn-beijing.aliyuncs.com/images/');

  onMounted(()=>{
    scrollTo(0, 0);
  })
</script>

<style lang="scss" scoped>
 * {
    user-select: none;
  }

  img {
    width: 100px;
    margin: 0 12px;
    display: inline-block;
  }

  table {
    text-align: center;

    :deep(tr) th {
      color: red;
      text-align: center !important;
    }

    tr:nth-of-type(2) {
      color: green;
    }

    tr:nth-of-type(8) {
      color: purple;
    }

    tr:nth-of-type(18) {
      color: pink;
    }

    td {
      padding: 30px 0;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* 视频画面比例铺满 */
  :deep(video) {
    object-fit: fill;
    background-color: #fff;
    background-size: cover;
    border-radius: 8px 8px 0 0;
  }
</style>

<BackTop />

# 月度述职

<Font content="本次述职主要以 开发任务和内容 为主要出发点" />

## 主要内容

<table border="1">
    <tr>
        <th>开发任务</th>
        <th>类型 1</th>
        <th>类型 2</th>
        <th>当前效果</th>
    </tr>
    <tr v-for="task in csszData" :key="task.name">
        <td>{{ task.name }}</td>
        <td>{{ task.type1 }}</td>
        <td>{{ task.type2 }}</td>
        <td class="item-img">
          <div v-if="task.src.length > 0">
            <div v-if="task.type === 'video'">
              <videoPlay
                v-for="e in task.src"
                v-bind="videoConfig"
                :src="`${baseUrl}${e}`"
              />
            </div>
            <div v-else-if="task.type === 'image'">
              <img v-for="e in task.src" :src="`${baseUrl}${e}`" />
            </div>
            <div v-else> / </div>
          </div>
          <div v-else> / </div>
        </td>
    </tr>
</table>

## 小 Tips

::: tip 闲余时间(内网可看)
<a href="http://192.168.2.203:8372/other/pcinstall/company">瞎搞了一篇新人入职流程</a>
:::
