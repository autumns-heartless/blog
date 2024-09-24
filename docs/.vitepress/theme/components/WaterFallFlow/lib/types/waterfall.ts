export type ViewCard = Record<string, any>

interface Point {
  rowPerView: number
}

export type Breakpoints = Record<number, Point>

export interface WaterfallProps {
  breakpoints: Breakpoints
  width: number
  posDuration: number
  animationDuration: number
  animationDelay: number
  animationEffect: string
  animationCancel: boolean
  hasAroundGutter: boolean
  gutter: number
  list: ViewCard[]
  animationPrefix: string
  align: string
}

export interface ItemWidthProps {
  breakpoints: Breakpoints
  wrapperWidth: number
  gutter: number
  hasAroundGutter: boolean
  initWidth: number
}

export interface ItemWidthByBreakpointProps extends ItemWidthProps {
  size: number
}
