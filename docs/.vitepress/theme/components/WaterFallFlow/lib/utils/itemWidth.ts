import type { ItemWidthProps } from '../types/waterfall'

/**
 * @description: 获取当前窗口尺寸下格子的宽度
 * @param {ItemWidthProps} param1
 * @return {*}
 */
export const getItemWidth = ({ breakpoints, wrapperWidth, gutter, hasAroundGutter, initWidth }: ItemWidthProps) => {
  // 获取升序尺寸集合
  const sizeList: number[] = Object.keys(breakpoints).map((key) => { return Number(key) }).sort((a, b) => a - b)

  // 获取当前的可用宽度
  let validSize = wrapperWidth
  let breakpoint = false
  for (const size of sizeList) {
    if (wrapperWidth <= size) {
      validSize = size
      breakpoint = true
      break
    }
  }

  // 非断点，返回设置的宽度
  if (!breakpoint)
    return initWidth

  // 断点模式，计算当前断点下的宽度
  let breakWidth = 0
  const col = breakpoints[validSize]!.rowPerView
  if (hasAroundGutter)
    breakWidth = (wrapperWidth - gutter) / col - gutter
  else
    breakWidth = (wrapperWidth - (col - 1) * gutter) / col

  return Math.floor(breakWidth)
}
