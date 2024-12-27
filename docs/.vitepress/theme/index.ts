import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
/* 引入时间线样式 */
import 'vitepress-markdown-timeline/dist/theme/index.css'
import { createPinia } from 'pinia' //使用状态管理库。用于音乐播放器的状态监听
const pinia = createPinia()

import { createMediumZoomProvider } from './composables/useMediumZoom'

import MLayout from './components/MLayout.vue'
import MNavLinks from './components/MNavLinks.vue'
import AuthGuard from './components/AuthGuard.vue'
import Confetti from './components/Confetti.vue'
import Video from './components/Video.vue'
import Firework from './components/Firework.vue'
import BabyPulm from './components/BabyPulm.vue'
import AutoMusic from './components/AutoPlaymusic.vue'
import BackTop from './components/BackTop.vue'
import ArticleMetadata from './components/ArticleMetadata.vue' // 字数阅读时间
import Tag from './components/Tag.vue' // 标签分类
import Friends from '../../other/friends/index.vue'
import BorderHover from './components/BorderHover.vue' // 边框检测鼠标高亮
import WaterFallFlow from './components/WaterFallFlow/index.vue' // 瀑布流
import Archive from './components/Archive.vue' // 归档

import './styles/index.scss'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(MLayout, props)
  },
  async enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router)

    app.provide('DEV', process.env.NODE_ENV === 'development')

    app.component('MNavLinks', MNavLinks)
    app.component('AuthGuard', AuthGuard)
    app.component('Confetti', Confetti)
    app.component('Video', Video)
    app.component('Firework', Firework)
    app.component('BabyPulm', BabyPulm)
    app.component('AutoMusic', AutoMusic)
    app.component('BackTop', BackTop)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('Friends', Friends)
    app.component('Tag', Tag)
    app.component('BorderHover', BorderHover)
    app.component('WaterFallFlow', WaterFallFlow)
    app.component('Archive', Archive)

    app.use(pinia)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            /* /vitepress-nav-template/ 是为了兼容 GitHub Pages */
            location.pathname === '/' || location.pathname === '/vitepress-nav-template/',
          ),
        { immediate: true },
      )
    }

    if (!import.meta.env.SSR) {
      const { loadOml2d } = await import('oh-my-live2d')
      loadOml2d({
        sayHello: false, // 不在控制台打印项目信息
        dockedPosition: 'left', // 桌面位置
        mobileDisplay: false, // 移动端是否展示
        // primaryColor: 'red', // 主题色
        tips: {
          messageLine: 3, // 超出 3 行 省略
          copyTips: {
            // 复制时提示
            message: [
              '你复制了什么内容呢?记得注明出处哦~',
              '主人，你要有出息了，有人复制你东西了~',
            ],
          },
          idleTips: {
            // 闲置时提示
            wordTheDay(wordTheDayData) {
              return `${wordTheDayData.hitokoto}    by.${wordTheDayData.from}`
            },
          },
        },
        statusBar: {},
        menus: {
          items: [
            // {
            //   id: 'Rest',
            //   icon: 'icon-rest',
            //   title: '休息',
            //   onClick(oml2d): void {
            //     oml2d.statusBarOpen('休息一会儿')
            //     oml2d.stageSlideOut()
            //   },
            // },
            {
              id: 'SwitchModel',
              icon: 'icon-switch',
              title: '切换模型',
              onClick(oml2d): void {
                // actions ...
                oml2d.loadNextModel()
              },
            },
          ],
        },
        models: [
          {
            path: 'https://model.oml2d.com/HK416-1-normal/model.json',
            position: [-20, 120],
            scale: 0.04,
            motionPreloadStrategy: 'ALL',
            stageStyle: {
              width: 200,
              height: 300,
            },
          },
          {
            path: 'https://model.oml2d.com/HK416-2-destroy/model.json',
            scale: 0.05,
            position: [0, 100],
            stageStyle: {
              width: 200,
              height: 300,
            },
          },
        ],
      })
    }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

if (typeof document !== 'undefined') {
  // 在客户端代码中访问 document 对象
  console.log(document.title)
} else {
  // 在服务器端代码中执行其他操作
  console.log('This is server-side code')
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
