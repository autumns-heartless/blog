<script setup lang="ts">
import NewFont from './NewFont.vue'
import AnimateTitle from './AnimateTitle.vue'
import Notice from './Notice.vue'

import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, ref, toRefs } from 'vue'
import Giscus from '@giscus/vue'

import { usePlayerStore } from '../../store/player'

import { usePageId } from '../composables'

import MNavVisitor from './MNavVisitor.vue'
import MDocFooter from './MDocFooter.vue'

/* 引入音乐播放器 */
import Player from './Player.vue'
import TogglePlay from './TogglePlay.vue'

const { Layout } = DefaultTheme
const { isDark, theme, frontmatter } = useData()
const pageId = usePageId()

const { comment } = theme.value

const { isPause } = toRefs(usePlayerStore())

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  // @ts-ignore
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <Layout v-bind="$attrs">
    <!--
      相关插槽
      https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
      https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
    -->

    <template #layout-top>
      <ClientOnly>
        <!-- 在布局下方添加 雪花特效 -->
        <div class="snow" v-if="theme.website?.showSnow && isDark">
          <div v-for="index in 80" :key="index" class="dot"></div>
        </div>
        <!-- <Lantern /> -->
      </ClientOnly>
      <Notice />
    </template>

    <template #nav-bar-title-after>
      <MNavVisitor />
    </template>

    <template #nav-bar-content-before>
      <!-- 播放/停止 音乐 -->
      <TogglePlay />
      <!-- 在导航搜索框💰添加 -->
      <ClientOnly>
        <div
          v-if="!isPause"
          class=""
          style="padding-left: 32px; position: relative; height: 40px; margin-right: 0px"
        >
          <Player />
        </div>
      </ClientOnly>
    </template>

    <template #home-hero-actions-after>
      <!-- 梅林宝宝 -->
      <BabyPulm />
    </template>

    <template #home-hero-info>
      <!-- 渐变色标题 -->
      <!-- <AnimateTitle /> -->
      <!-- 打字机效果 -->
      <NewFont />
    </template>

    <template v-if="comment && frontmatter.comment !== false" #doc-footer-before>
      <!-- 评论 -->
      <div class="doc-comments">
        <Giscus
          id="comments"
          mapping="specific"
          :term="pageId"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          :theme="isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
          v-bind="{ ...comment }"
        />
      </div>
    </template>

    <template #doc-after>
      <AutoMusic />
      <MDocFooter />
    </template>
  </Layout>
</template>

<style>
.prev-next.prev-next {
  border-top: none;
}

.doc-comments {
  margin-top: 24px;
  margin-bottom: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

.ul {
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  .li {
    padding: 5px 10px;
    margin: 0 10px;
    transition: all 0.5s ease;
    cursor: pointer;

    .group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;

      .strong {
        position: absolute;
        left: 100%;
        word-break: keep-all;
        transform: translate(-25px, -5px) scale(0.8);
        top: 0;
      }
    }

    .svg {
      width: 14px;
      object-fit: fill;
      fill: currentColor;
      margin-right: 8px;
    }
  }

  .li:hover {
    color: var(--vp-c-brand-1);
    transition: all 0.5s ease;
  }
}
</style>
