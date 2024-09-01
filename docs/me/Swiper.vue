<template>
  <div class="container">
    <div class="bigBox">
      <a :href="toHref" target="_blank">
        <img :src="`./images/${bigImage}.png`" @click="playVideo" />
      </a>
    </div>
    <div class="swiperList">
      <ul>
        <li v-for="(item, index) in imagesList" :key="index" @click="changeImage(item, index)">
          <a>
            <img
              :src="`./images/${item.url}.png`"
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

const bigImage = ref('vue3_透传')

const toHref = ref('https://v.youku.com/v_show/id_XNjQyNTkwODU0MA==.html')

const imagesList = reactive([
  {
    url: 'vue3_透传',
    active: true,
    href: 'https://v.youku.com/v_show/id_XNjQyNTkwODU0MA==.html',
  },
  {
    url: 'vue3_组件注册',
    active: false,
    href: 'https://v.youku.com/v_show/id_XNjQxODkzNjM5Mg==.html',
  },
  // { url: './images/VSCode插件之fnMap使用.png', active: false },
  // { url: './images/VSCode插件之SFTP使用.png', active: false },
  // { url: './images/依赖之CodeInspector使用.png', active: false },
  // { url: './images/依赖之ssh2-sftp-client使用.png', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
  // { url: './images', active: false },
])

function changeImage(item) {
  bigImage.value = item.url
  toHref.value = item.href
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
  console.log(imgs, 'imgs')
})

function playVideo() {
  // const bigImageValue = 'your_video_id' // 替换为实际的视频 ID
  // const url = `https://v.youku.com/${bigImageValue}.html`
  // window.location.href = url
}
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
  background: url(./images/qrCode.png) no-repeat center / cover;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  transition: all 1s;

  img {
    height: 100%;
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

.container ul li {
  flex: 1;
  min-width: 120px;
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
