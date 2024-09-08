<template>
  <div class="container">
    <div class="bigBox">
      <a :href="toHref" target="_blank">
        <img :src="`../public/images/${bigImage}.png`" />
        <img src="../public/images/playVideo.svg" />
      </a>
    </div>
    <div class="swiperList">
      <ul>
        <li v-for="(item, index) in imagesList" :key="index" @click="changeImage(item, index)">
          <a>
            <img
              :src="`../public/images/${item.url}.png`"
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

const bigImage = ref('开发规范')

const toHref = ref('https://v.youku.com/v_show/id_XNjQyNTkwODU0MA==.html')

const imagesList = reactive([
  {
    url: '开发规范',
    active: true,
    href: 'XNjQxODUyNjY4MA',
  },
  {
    url: '组件_组件封装',
    active: false,
    href: 'XNjQxODUyNTUxMg',
  },
  {
    url: '组件_多选框联动',
    active: false,
    href: 'XNjQyNTUwMDU5Mg',
  },
  {
    url: '社区矫正演示视频',
    active: false,
    href: 'XNjQyNTUwMDY0NA',
  },
  {
    url: 'VSCode_setting.json文件',
    active: false,
    href: 'XNjQyNTUwMDY1Ng',
  },
  {
    url: 'VSCode_小技巧',
    active: false,
    href: 'XNjQxODUzMzQ2NA',
  },
  {
    url: '产品研发相关规划上',
    active: false,
    href: 'XNjQyNTUwNDg5Mg',
  },
  {
    url: '产品研发相关规划下',
    active: false,
    href: 'XNjQxODUzOTQxMg',
  },
  {
    url: '规范建设',
    active: false,
    href: 'XNjQyNTUwMjMwMA',
  },
  {
    url: '技术培训',
    active: false,
    href: 'XNjQyNTUwMjM0MA',
  },
  {
    url: '人员熟悉与配合',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQxODkyODU1Mg==.html',
  },
  {
    url: '为知笔记与未来技术发展探讨',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQxODkyODU5Ng==.html',
  },
  {
    url: '效率翻倍',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQyNTkwODEwOA==.html',
  },
  {
    url: 'vben框架_初步使用',
    active: false,
    href: 'XNjQxODkzNjA3Mg',
  },
  {
    url: '依赖_CodeInspector使用',
    active: false,
    href: 'XNjQyNTkwNjk0OA',
  },
  {
    url: 'VSCode插件_fnMap使用',
    active: false,
    href: 'XNjQxODkzNjI5Ng',
  },
  {
    url: '依赖_ssh2-sftp-client使用',
    active: false,
    href: 'XNjQyNTkwNzAxNg',
  },
  {
    url: 'VSCode插件_SFTP使用',
    active: false,
    href: 'XNjQyNTkwNzA1Ng',
  },
  {
    url: 'vue3_组件注册',
    active: false,
    href: 'XNjQxODkzNjM5Mg',
  },
  {
    url: 'vue3_透传',
    active: false,
    href: 'XNjQyNTkwODU0MA',
  },
])

function changeImage(item) {
  bigImage.value = item.url
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
  background: url(../public/images/开发规范.png) no-repeat center / cover;
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
