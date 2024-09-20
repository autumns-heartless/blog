<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'
import { countWord } from '../utils/functions'

const { page } = useData()
const date = computed(() => new Date(page.value.lastUpdated!))
const author = computed(() => page.value.frontmatter.author)
const isReprinted = computed(() => page.value.frontmatter.reprinted)

const wordCount = ref(0)
const imageCount = ref(0)

const wordTime = computed(() => {
  return (wordCount.value / 275) * 60
})

const imageTime = computed(() => {
  const n = imageCount.value
  if (imageCount.value <= 10) {
    // 等差数列求和
    return n * 13 + (n * (n - 1)) / 2
  }
  return 175 + (n - 10) * 3
})

// 阅读时间
const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60)
})

function analyze() {
  document.querySelectorAll('.meta-des').forEach((v) => v.remove())
  const docDomContainer = window.document.querySelector('#VPContent')
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>('.content-container .main img')
  imageCount.value = imgs?.length || 0
  const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
  wordCount.value = countWord(words)
}

onMounted(() => {
  // 初始化时执行一次
  analyze()
})
</script>

<template>
  <div class="word" v-if="author">
    <div>
      <!-- 原创 -->
      <div class="original" v-if="!isReprinted">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="arco-icon arco-icon-trophy"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          width="12"
          height="12"
        >
          <path
            d="M24 33c-6.075 0-11-4.925-11-11m11 11c6.075 0 11-4.925 11-11M24 33v8M13 22V7h22v15m-22 0V9H7v7a6 6 0 0 0 6 6Zm22 0V9h6v7a6 6 0 0 1-6 6ZM12 41h24"
          ></path>
        </svg>
        <span>原创</span>
      </div>
      <!-- 转载 -->
      <div class="reprinted" v-else>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="arco-icon arco-icon-share-alt"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          width="12"
          height="12"
        >
          <path
            d="M32.442 21.552a4.5 4.5 0 1 1 .065 4.025m-.065-4.025-16.884-8.104m16.884 8.104A4.483 4.483 0 0 0 32 23.5c0 .75.183 1.455.507 2.077m-16.95-12.13a4.5 4.5 0 1 1-8.113-3.895 4.5 4.5 0 0 1 8.114 3.896Zm-.064 20.977A4.5 4.5 0 1 0 11.5 41c3.334-.001 5.503-3.68 3.993-6.578Zm0 0 17.014-8.847"
          ></path>
        </svg>
        <span>转载</span>
      </div>
      <!-- 作者 -->
      <span>作者：{{ author }}</span>
      <!-- 更新 -->
      <div>
        <svg
          t="1724572866572"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="18131"
          width="16"
          height="16"
        >
          <path
            d="M168.021333 504.192A343.253333 343.253333 0 0 1 268.629333 268.8a342.229333 342.229333 0 0 1 243.285334-100.778667A341.504 341.504 0 0 1 755.029333 268.8c9.856 9.898667 19.2 20.394667 27.733334 31.402667l-60.16 46.976a8.021333 8.021333 0 0 0 2.986666 14.122666l175.701334 43.008a8.021333 8.021333 0 0 0 9.898666-7.68l0.810667-180.906666a7.936 7.936 0 0 0-12.885333-6.314667L842.666667 253.44a418.858667 418.858667 0 0 0-330.922667-161.493333c-229.12 0-415.488 183.594667-419.797333 411.818666a8.021333 8.021333 0 0 0 8.021333 8.192H160a7.978667 7.978667 0 0 0 8.021333-7.808zM923.946667 512H864a7.978667 7.978667 0 0 0-8.021333 7.808 341.632 341.632 0 0 1-26.88 125.994667 342.186667 342.186667 0 0 1-73.685334 109.397333 342.442667 342.442667 0 0 1-243.328 100.821333 342.229333 342.229333 0 0 1-270.976-132.224l60.16-46.976a8.021333 8.021333 0 0 0-2.986666-14.122666l-175.701334-43.008a8.021333 8.021333 0 0 0-9.898666 7.68l-0.682667 181.034666c0 6.698667 7.68 10.496 12.885333 6.314667L181.333333 770.56a419.072 419.072 0 0 0 330.922667 161.408c229.205333 0 415.488-183.722667 419.797333-411.818667a8.021333 8.021333 0 0 0-8.021333-8.192z"
            fill="#8a8a8a"
            p-id="18132"
          ></path>
        </svg>
        <span>更新: {{ date.toLocaleDateString() }}</span>
      </div>
      <!-- 字数 -->
      <div>
        <svg
          t="1724571760788"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6125"
          width="16"
          height="16"
        >
          <path
            d="M204.8 0h477.866667l273.066666 273.066667v614.4c0 75.093333-61.44 136.533333-136.533333 136.533333H204.8c-75.093333 0-136.533333-61.44-136.533333-136.533333V136.533333C68.266667 61.44 129.706667 0 204.8 0z m307.2 607.573333l68.266667 191.146667c13.653333 27.306667 54.613333 27.306667 61.44 0l102.4-273.066667c6.826667-20.48 0-34.133333-20.48-40.96s-34.133333 0-40.96 13.653334l-68.266667 191.146666-68.266667-191.146666c-13.653333-27.306667-54.613333-27.306667-68.266666 0l-68.266667 191.146666-68.266667-191.146666c-6.826667-13.653333-27.306667-27.306667-47.786666-20.48s-27.306667 27.306667-20.48 47.786666l102.4 273.066667c13.653333 27.306667 54.613333 27.306667 61.44 0l75.093333-191.146667z"
            fill="#777777"
            p-id="6126"
          ></path>
          <path
            d="M682.666667 0l273.066666 273.066667h-204.8c-40.96 0-68.266667-27.306667-68.266666-68.266667V0z"
            fill="#E0E0E0"
            opacity=".619"
            p-id="6127"
          ></path>
        </svg>
        <span>字数: {{ wordCount }} 字</span>
      </div>
      <!-- 时长 -->
      <div>
        <svg
          t="1724572797268"
          class="icon"
          viewBox="0 0 1060 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="15031"
          width="16"
          height="16"
        >
          <path
            d="M556.726857 0.256A493.933714 493.933714 0 0 0 121.929143 258.998857L0 135.021714v350.390857h344.649143L196.205714 334.482286a406.820571 406.820571 0 1 1-15.908571 312.649143H68.937143A505.819429 505.819429 0 1 0 556.726857 0.256z m-79.542857 269.531429v274.907428l249.197714 150.966857 42.422857-70.070857-212.114285-129.389714V269.787429h-79.542857z"
            fill="#8a8a8a"
            p-id="15032"
          ></path>
        </svg>
        <span>时长: {{ readTime }} 分钟</span>
      </div>
    </div>
  </div>
</template>

<style>
.word {
  color: var(--vp-c-text-2);
  font-size: 15px;
  margin-top: 12px;

  & > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    svg {
      margin: 0px 8px;
      /* mix-blend-mode: difference; */
    }

    /* 原创 */
    .original,
    .reprinted {
      display: flex;
      align-items: center;
      padding-right: 4px;
      margin-right: 8px;
      border-radius: 4px;
      font-size: 12px;

      svg {
        margin: 0px 4px;
        mix-blend-mode: normal;
      }
    }

    .original {
      background-color: #fff3e8;
      color: #f77234;

      .svg {
        fill: #f77234;
      }
    }

    /* 转载 */
    .reprinted {
      background-color: #e8f3ff;
      color: #165dff;

      .svg {
        fill: #165dff;
      }
    }
  }
}
</style>
