<template>
  <div ref="waterfallWrapper" class="waterfall-list" :style="{ height: `${wrapperHeight}px` }">
    <div v-for="(item, index) in list" :key="getKey(item, index)" class="waterfall-item">
      <div class="waterfall-card">
        <slot :item="item" :index="index" :url="getRenderURL(item)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, provide, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useCalculateCols, useLayout } from '../use/index.ts'
import Lazy from '../utils/lazy.ts'
import type { LazyType } from '../types/lazy.ts'
import { getValue } from '../utils/util.ts'
import type { ViewCard } from '../types/waterfall.ts'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ViewCard[]>,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    imgSelector: {
      type: String,
      default: 'src',
    },
    width: {
      type: Number,
      default: 200,
    },
    breakpoints: {
      type: Object,
      default: () => ({
        1200: {
          // when wrapper width < 1200
          rowPerView: 3,
        },
        800: {
          // when wrapper width < 800
          rowPerView: 2,
        },
        500: {
          // when wrapper width < 500
          rowPerView: 1,
        },
      }),
    },
    gutter: {
      type: Number,
      default: 10,
    },
    hasAroundGutter: {
      type: Boolean,
      default: true,
    },
    posDuration: {
      type: Number,
      default: 300,
    },
    animationPrefix: {
      type: String,
      default: 'animate__animated',
    },
    animationEffect: {
      type: String,
      default: 'fadeIn',
    },
    animationDuration: {
      type: Number,
      default: 1000,
    },
    animationDelay: {
      type: Number,
      default: 300,
    },
    animationCancel: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    lazyload: {
      type: Boolean,
      default: true,
    },
    loadProps: {
      type: Object,
      default: () => {},
    },
    crossOrigin: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 300,
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  setup(props, ctx) {
    const lazy: LazyType = new Lazy(props.lazyload, props.loadProps, props.crossOrigin)
    provide('lazy', lazy)
    // 容器块信息
    const { waterfallWrapper, wrapperWidth, colWidth, cols, offsetX } = useCalculateCols(props)
    // 容器高度，块定位
    const { wrapperHeight, layoutHandle } = useLayout(
      props,
      colWidth,
      cols,
      offsetX,
      waterfallWrapper,
    )
    // 1s内最多执行一次排版，减少性能开销
    const renderer = useDebounceFn(() => {
      layoutHandle().then(() => {
        ctx.emit('afterRender')
      })
    }, props.delay)
    // 列表发生变化直接触发排版
    watch(
      () => [wrapperWidth, colWidth, props.list],
      () => {
        if (wrapperWidth.value > 0) renderer()
      },
      { deep: true },
    )
    // 尺寸宽度变化防抖触发
    const sizeChangeTime = ref(0)
    // watchDebounced(colWidth, () => {
    //   layoutHandle()
    //   sizeChangeTime.value += 1
    // }, { debounce: props.delay })
    provide('sizeChangeTime', sizeChangeTime)
    // 图片加载完成
    provide('imgLoaded', renderer)
    // 根据选择器获取图片地址
    const getRenderURL = (item: ViewCard): string => {
      return getValue(item, props.imgSelector)[0]
    }
    // 获取唯一值
    const getKey = (item: ViewCard, index: number): string => {
      return item[props.rowKey] || index
    }
    return {
      colWidth,
      waterfallWrapper,
      wrapperHeight,
      getRenderURL,
      getKey,
      renderer,
    }
  },
})
</script>

<style scoped>
.waterfall-list {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: v-bind(backgroundColor);
}
.waterfall-item {
  position: absolute;
  left: 0;
  top: 0;
  /* 初始位置设置到屏幕以外，避免懒加载失败 */
  transform: translate3d(0, 3000px, 0);
  visibility: hidden;
}
/* 初始的入场效果 */
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
</style>
