import { computed, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { getItemWidth } from '../utils/itemWidth'
import type { WaterfallProps } from '../types/waterfall'
import type { Nullable } from '../types/utils'

export function useCalculateCols(props: WaterfallProps) {
  const wrapperWidth = ref<number>(0)
  const waterfallWrapper = ref<Nullable<any>>(null)

  useResizeObserver(waterfallWrapper, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    wrapperWidth.value = width
  })

  // 列实际宽度
  const colWidth = computed(() => {
    return getItemWidth({
      wrapperWidth: wrapperWidth.value,
      breakpoints: props.breakpoints,
      gutter: props.gutter,
      hasAroundGutter: props.hasAroundGutter,
      initWidth: props.width,
    })
  })

  // 列
  const cols = computed(() => {
    const offset = props.hasAroundGutter ? -props.gutter : props.gutter
    const val = (wrapperWidth.value + offset) / (colWidth.value + props.gutter)
    return Math.floor(val)
  })

  // 偏移
  const offsetX = computed(() => {
    // 左对齐
    if (props.align === 'left') {
      return 0
    }
    else if (props.align === 'center') {
      // 居中
      const offset = props.hasAroundGutter ? props.gutter : -props.gutter
      const contextWidth = cols.value * (colWidth.value + props.gutter) + offset
      return (wrapperWidth.value - contextWidth) / 2
    }
    else {
      const offset = props.hasAroundGutter ? props.gutter : -props.gutter
      const contextWidth = cols.value * (colWidth.value + props.gutter) + offset
      return (wrapperWidth.value - contextWidth)
    }
  })

  return {
    waterfallWrapper,
    wrapperWidth,
    colWidth,
    cols,
    offsetX,
  }
}
