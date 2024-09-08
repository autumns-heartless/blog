<template>
  <div class="container">
    <div class="bigBox">
      <a :href="toHref" target="_blank">
        <img
          :src="`https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/${bigImage}.png`"
        />
        <img src="./images/playVideo.svg" />
      </a>
    </div>
    <div class="swiperList">
      <ul>
        <li v-for="(item, index) in imagesList" :key="index" @click="changeImage(item, index)">
          <a>
            <img
              :src="`https://fastly.jsdelivr.net/gh/autumns-heartless/DrawBoard@main/money/${item.url}.png`"
              :class="item.active ? 'active' : ''"
              class="medium-zoom-image"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const bigImage = ref('1725800021288%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83')

const toHref = ref('https://v.youku.com/v_show/id_XNjQyNTkwODU0MA==.html')

const imagesList = reactive([
  /* 开发规范 */
  {
    url: '1725800021288%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83',
    active: true,
    href: 'XNjQxODUyNjY4MA',
  },
  /* 组件_组件封装 */
  {
    url: '1725800412288%E7%BB%84%E4%BB%B6_%E7%BB%84%E4%BB%B6%E5%B0%81%E8%A3%85',
    active: false,
    href: 'XNjQxODUyNTUxMg',
  },
  /* 组件_多选框联动 */
  {
    url: '1725800411288%E7%BB%84%E4%BB%B6_%E5%A4%9A%E9%80%89%E6%A1%86%E8%81%94%E5%8A%A8',
    active: false,
    href: 'XNjQyNTUwMDU5Mg',
  },
  /* 社区矫正演示视频 */
  {
    url: '1725800397288%E7%A4%BE%E5%8C%BA%E7%9F%AB%E6%AD%A3%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91',
    active: false,
    href: 'XNjQyNTUwMDY0NA',
  },
  /* VSCode_setting.json文件 */
  {
    url: '1725800715854VSCode_setting.json%E6%96%87%E4%BB%B6',
    active: false,
    href: 'XNjQyNTUwMDY1Ng',
  },
  /* VSCode_小技巧 */
  {
    url: '1725800376288VSCode_%E5%B0%8F%E6%8A%80%E5%B7%A7',
    active: false,
    href: 'XNjQxODUzMzQ2NA',
  },
  /* 产品研发相关规划上 */
  {
    url: '1725800386288%E4%BA%A7%E5%93%81%E7%A0%94%E5%8F%91%E7%9B%B8%E5%85%B3%E8%A7%84%E5%88%92%E4%B8%8A',
    active: false,
    href: 'XNjQyNTUwNDg5Mg',
  },
  /* 产品研发相关规划下 */
  {
    url: '1725800387288%E4%BA%A7%E5%93%81%E7%A0%94%E5%8F%91%E7%9B%B8%E5%85%B3%E8%A7%84%E5%88%92%E4%B8%8B',
    active: false,
    href: 'XNjQxODUzOTQxMg',
  },
  /* 规范建设 */
  {
    url: '1725800391287%E8%A7%84%E8%8C%83%E5%BB%BA%E8%AE%BE',
    active: false,
    href: 'XNjQyNTUwMjMwMA',
  },
  /* 技术培训 */
  {
    url: '1725800392288%E6%8A%80%E6%9C%AF%E5%9F%B9%E8%AE%AD',
    active: false,
    href: 'XNjQyNTUwMjM0MA',
  },
  /* 人员熟悉与配合 */
  {
    url: '1725800396288%E4%BA%BA%E5%91%98%E7%86%9F%E6%82%89%E4%B8%8E%E9%85%8D%E5%90%88',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQxODkyODU1Mg==.html',
  },
  /* 为知笔记与未来技术发展探讨 */
  {
    url: '1725800404288%E4%B8%BA%E7%9F%A5%E7%AC%94%E8%AE%B0%E4%B8%8E%E6%9C%AA%E6%9D%A5%E6%8A%80%E6%9C%AF%E5%8F%91%E5%B1%95%E6%8E%A2%E8%AE%A8',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQxODkyODU5Ng==.html',
  },
  /* 效率翻倍 */
  {
    url: '1725800405288%E6%95%88%E7%8E%87%E7%BF%BB%E5%80%8D',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQyNTkwODEwOA==.html',
  },
  /* vben框架_初步使用 */
  {
    url: '1725799975290vben%E6%A1%86%E6%9E%B6_%E5%88%9D%E6%AD%A5%E4%BD%BF%E7%94%A8',
    active: false,
    href: 'XNjQxODkzNjA3Mg',
  },
  /* 依赖_CodeInspector使用 */
  {
    url: '1725800407288%E4%BE%9D%E8%B5%96_CodeInspector%E4%BD%BF%E7%94%A8',
    active: false,
    href: 'XNjQyNTkwNjk0OA',
  },
  /* VSCode插件_fnMap使用 */
  {
    url: '1725800379288VSCode%E6%8F%92%E4%BB%B6_fnMap%E4%BD%BF%E7%94%A8',
    active: false,
    href: 'XNjQxODkzNjI5Ng',
  },
  /* 依赖_ssh2-sftp-client使用 */
  {
    url: '1725800409288%E4%BE%9D%E8%B5%96_ssh2-sftp-client%E4%BD%BF%E7%94%A8',
    active: false,
    href: 'XNjQyNTkwNzAxNg',
  },
  /* VSCode插件_SFTP使用 */
  {
    url: '1725800381288VSCode%E6%8F%92%E4%BB%B6_SFTP%E4%BD%BF%E7%94%A8',
    active: false,
    href: 'XNjQyNTkwNzA1Ng',
  },
  /* vue3_组件注册 */
  {
    url: '1725800385289vue3_%E7%BB%84%E4%BB%B6%E6%B3%A8%E5%86%8C',
    active: false,
    href: 'XNjQxODkzNjM5Mg',
  },
  /* vue3_透传 */
  {
    url: '1725800383287vue3_%E9%80%8F%E4%BC%A0',
    active: false,
    href: 'XNjQyNTkwODU0MA',
  },
])

function changeImage(item) {
  bigImage.value = `${item.url}`
  toHref.value = `https://v.youku.com/v_show/id_${item.href}==.html`
  imagesList.forEach((item) => {
    item.active = false
  })
  item.active = true
}

onMounted(async () => {
  const imgs = document.querySelectorAll('.swiperList img')
  imgs.forEach((image) => {
    image.classList.remove('medium-zoom-image')
  })
})
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  position: relative;
  background: linear-gradient(to bottom, pink, skyblue);
}

/* 当前大图 */
.container .bigBox {
  width: 98%;
  height: 300px;
  margin: 10px auto;
  background: url(./images/开发规范.png) no-repeat center / cover;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  transition: all 1s;

  img:nth-of-type(1) {
    height: 100%;
  }

  img:nth-of-type(2) {
    display: none;
  }

  a {
    position: relative;
  }

  a:hover img:nth-of-type(2) {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    transform: translate(-50px, -50px);
    z-index: 999;
    opacity: 0.5;
    background: rgba(0, 0, 0, 0.1);
  }
}

/* 下方小图 */
.container ul {
  list-style: none;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  overflow: auto;
}

/* 滚动条样式 */
.container ul::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.container ul::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}

.container ul::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}

.container ul::-webkit-scrollbar-thumb:hover {
  background: #333;
}

.container ul::-webkit-scrollbar-corner {
  background: #179a16;
}

.container ul li {
  flex: 1;
  min-width: 300px;
  height: 120px;
  cursor: pointer;
}

.container ul li img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
}

.container ul li img.active {
  border: 5px solid orange;
}
</style>
