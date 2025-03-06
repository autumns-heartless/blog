# 自定义工具栏图标、英文 Tooltips

## Vue2 版本

### `toolbar-tooltips.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh)" @mousemove="onMouseMove">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
      >
        <template #tool-bar>
            <VipToolbarTooltipsMyToolbar>
                <div v-tooltip.left="favo?'已收藏':'点击收藏'" class="c-mb-button" @click="myToolbarBtnAction('favo')">
                    <i v-if="favo" class="el-icon-star-on rg-icon" style="color: #df7f03;" />
                    <i v-else class="el-icon-star-off rg-icon" />
                </div>
                <div v-tooltip.left="{content: '分享'}" class="c-mb-button" @click="myToolbarBtnAction('aaa2')">
                    <i class="el-icon-share rg-icon" />
                </div>
                <div v-tooltip.left="{container:'.my-tooltips-container', content: '帮助说明122', popperClass: 'xxxxxxxxxxxxxxxx'}" class="c-mb-button" @click="myToolbarBtnAction('aaa3')">
                    <i class="el-icon-question rg-icon" />
                </div>
            </VipToolbarTooltipsMyToolbar>
        </template>
        <template #graph-plug>
          <div class="my-tooltips-container" style="min-width: 600px;"></div>
          <div v-if="isShowLineTips" class="c-tips" :style="{left: lineTipsPosition.x + 'px', top: lineTipsPosition.y + 'px' }">
              <div>{{currentLine.text}}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
/**
 * 注意：这个示例使用到了一个Tooltips组件：floating-vue，你需要在package.json中引入它，同时在main.js中配置它
 * import FloatingVue from 'floating-vue'
 * import 'floating-vue/dist/style.css'
 * Vue.use(FloatingVue, {container:'.my-tooltips-container'})
 *
 */
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph/vue2';
import VipToolbarTooltipsMyToolbar from './VipToolbarTooltipsMyToolbar.vue';


const graphOptions = {
  useAnimationWhenRefresh: false,

    // 工具栏内置的5个按钮可以设置隐藏
    allowShowFullscreenMenu: false,
    allowShowZoomMenu: false,
    allowAutoLayoutIfSupport: false,
    allowShowRefreshButton: false,
    allowShowDownloadButton: false,
    // 连线文字最多展示的字符数（超出的字符将不显示并加上省略号，此值默认为15）
    lineTextMaxLength: 6,
    multiLineDistance: 20,
    lineUseTextPath: true,
    defaultLineShape: 6,
    defaultLineTextOffset_y: -2,
    layout: {
      layoutName: 'center',
        startAngle: 180
    }
};
export default {
  name: 'Demo',
  components: { VipToolbarTooltipsMyToolbar },
  data() {
    return {
        favo: false,
        // --------Line tips-----------
        isShowLineTips: false,
        lineTipsPosition: { x: 0, y: 0 },
      graphOptions
    };
  },
  mounted() {
    this.showHTree();
  },
  methods: {
    showHTree() {
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'A', borderColor: 'yellow' },
          { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
          { id: 'c', text: 'C', nodeShape: 1, width: 120, height: 80 },
          { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
          { from: 'a', to: 'b', text: '关系1关系1关系1关系1关系1关系1关系1关系1关系1关系1关系1关系1', color: '#43a2f1' },
          { from: 'a', to: 'b', text: '关系2关系2关系2关系2', color: '#43a2f1' },
          { from: 'a', to: 'b', text: '关系3关系3关系3关系3关系3关系3关系3关系3关系3', color: '#43a2f1' },
          { from: 'a', to: 'b', text: '关系3关系3关系3关系3关系3关系3关系3关系3关系3', color: '#43a2f1' },
          { from: 'a', to: 'b', text: '关系4', color: '#43a2f1' },
          { from: 'c', to: 'a', text: '2关系2关系2关系2关系2关系2', lineShape: 1 },
          { from: 'a', to: 'c', text: '1关系2关系2关系2关系2关系2', lineShape: 1, showStartArrow: true },
          { from: 'c', to: 'a', text: '3关系2关系2关系2关系2关系2', lineShape: 1 },
          { from: 'a', to: 'c', text: '4关系2关系2关系2关系2关系2', lineShape: 1, hideArrow: true },
          { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
          { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
          { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
          { from: 'a', to: 'e', text: '关系3', lineShape: 7 }
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
      myToolbarBtnAction(msg) {
          if (msg === 'favo') {
              this.favo = !this.favo;
          } else {
              alert(msg);
          }
      },
      onMouseMove($event) {
          const graphInstance = this.$refs.graphRef.getInstance();
          const link = graphInstance.isLink($event.target);
          console.log('onMouseMove:', $event.x, $event.y, link);
          if (link) {
              this.showLineTips($event, link);
              this.isShowLineTips = true;
          } else {
              this.isShowLineTips = false;
          }
      },
      showLineTips($event, linkObject) {
          const graphInstance = this.$refs.graphRef.getInstance();
          console.log('showLineTips:', $event.clientX, $event.clientY, this.currentLine);
          const _base_position = graphInstance.options.fullscreen ? { x: 0, y: 0 } : graphInstance.getBoundingClientRect();
          this.lineTipsPosition.x = $event.clientX - _base_position.x + 10;
          this.lineTipsPosition.y = $event.clientY - _base_position.y + 10;
          const lineIndex = getLineElementIndex($event.target);
          this.currentLink = linkObject;
          this.currentLine = linkObject.relations[lineIndex];
      },
  }
};
const getLineElementIndex = (el, deep=0) => {
    if (deep > 10)return -1;// 层级太深了，不继续找了
    if (el.tagName === 'body')return -1;// 到头了
    if (el.parentElement.classList.contains('rel-link-peel')) {
        return Array.from(el.parentElement.children).indexOf(el);
    } else {
        return getLineElementIndex(el.parentElement, deep + 1);
    }
}
</script>

<style lang="scss" scoped>
// 修改图谱的默认样式
::v-deep .relation-graph {
    .rel-toolbar{
        background-color: #ffffff;
        color: #1459fe;
    }
    .c-current-zoom {
        color: #1459fe;
    }
    .rel-toolbar-v {
        width: 45px;
        max-height: none;
        height: auto;
    }
    .rel-toolbar-h {
        height: 45px;
        width: auto;
    }
    /** 根据实际工具栏宽高设置以下值**/
    .rel-toolbar-h-center {
        left: calc((100% - 360px) / 2);
    }
    .rel-toolbar-v-center {
        top: calc((100% - 360px) / 2);
    }
    .c-rg-line-text {

    }
}
.c-tips {
    z-index: 999;padding:10px;
    width: 200px;
    position: absolute;
    border-radius: 10px;
    background-color: #333333;
    color: #ffffff;
    border:#eeeeee solid 1px;
    box-shadow: 0px 0px 8px #cccccc;
    & > div {
        line-height: 25px;font-size: 12px;
    }
}
</style>
<style lang="scss" scoped>
.c-my-panel {
  position: absolute;
  left: 200px;
  top: 200px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;

  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
}
</style>
```

### `VipToolbarTooltipsMyToolbar.vue`

```javascript
<template>
    <div
        class="rel-toolbar"
        :class="['rel-toolbar-h-' + options.toolBarPositionH, 'rel-toolbar-v-' + options.toolBarPositionV, 'rel-toolbar-' + options.toolBarDirection]"
    >
        <div v-tooltip.left="'全屏/退出全屏'" class="c-mb-button" style="margin-top: 0px;" @click="relationGraph.fullscreen();">
            <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-resize-"></use></svg>
        </div>
        <div v-tooltip.left="'放大'" class="c-mb-button" @click="relationGraph.zoom(20)">
            <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-fangda"></use></svg>
        </div>
        <div class="c-current-zoom" @dblclick="zoomToFit">{{ options.canvasZoom }}%</div>
        <div v-tooltip.left="'缩小'" class="c-mb-button" style="margin-top:0px;" @click="relationGraph.zoom(-20)">
            <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-suoxiao"></use></svg>
        </div>
        <div v-if="options.isNeedShowAutoLayoutButton" v-tooltip.left="options.autoLayouting?'点击停止自动布局':'点击开始自动调整布局'" :class="{'c-mb-button-on':options.autoLayouting}" class="c-mb-button" @click="toggleAutoLayout">
            <svg v-if="!options.autoLayouting" class="rg-icon" aria-hidden="true"><use xlink:href="#icon-zidong"></use></svg>
            <svg v-else class="c-loading-icon rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjiezhong"></use></svg>
        </div>
        <div v-tooltip.left="'刷新'" class="c-mb-button" @click="refresh">
            <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ico_reset"></use></svg>
        </div>
        <div v-tooltip.left="'下载图片'" class="c-mb-button" @click="downloadAsImage">
            <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-tupian"></use></svg>
        </div>
        <div v-tooltip.left="'隐藏连线文字'" class="c-mb-button" @click="toggleLineText">
            <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-tupian"></use></svg>
        </div>
        <slot />
        <div style="clear: both;"></div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'VipToolbarTooltipsMyToolbar',
    data() {
        return {
        };
    },
    inject: ['graph', 'graphInstance'],
    computed: {
        relationGraph() {
          return this.graphInstance();
        },
        options() {
            return this.graph.options;
        }
    },
    mounted() {
    },
    methods: {
        refresh() {
            this.relationGraph.refresh();
        },
        switchLayout(layoutConfig) {
            console.log('change layout:', layoutConfig);
            this.relationGraph.switchLayout(layoutConfig);
        },
        toggleAutoLayout() {
            // devLog('this.options.autoLayouting', this.options.autoLayouting)
            this.relationGraph.toggleAutoLayout();
        },
        downloadAsImage() {
            // devLog('this.options.autoLayouting', this.options.autoLayouting)
            this.relationGraph.downloadAsImage('png');
        },
        async zoomToFit() {
            await this.relationGraph.setZoom(100);
            await this.relationGraph.moveToCenter();
            await this.relationGraph.zoomToFit();
        },
        toggleLineText() {
            this.relationGraph.options.defaultShowLineLabel = !this.relationGraph.options.defaultShowLineLabel;
        }
    }
};
</script>
```

## Vue3 版本

### `toolbar-tooltips.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh)" @mousemove="onMouseMove">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #tool-bar>
          <VipToolbarTooltipsMyToolbar>
            <div v-tooltip.left="favo?'已收藏':'点击收藏'" class="c-mb-button" @click="myToolbarBtnAction('favo')">
                <CircumIcon v-if="favo" class="rg-icon" name="star" style="color: #df7f03;" />
                <CircumIcon v-else class="rg-icon" name="star"/>
            </div>
            <div v-tooltip.left="'分享'" class="c-mb-button" @click="myToolbarBtnAction('aaa2')">
                <CircumIcon class="rg-icon" name="router"/>
            </div>
            <div v-tooltip.left="'帮助说明'" class="c-mb-button" @click="myToolbarBtnAction('aaa3')">
                <CircumIcon class="rg-icon" name="settings"/>
            </div>
          </VipToolbarTooltipsMyToolbar>
        </template>
        <template #graph-plug>
          <div v-if="isShowLineTips" class="c-tips" :style="{left: lineTipsPosition.x + 'px', top: lineTipsPosition.y + 'px' }">
            <div>{{ currentLine.text }}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import VipToolbarTooltipsMyToolbar from './VipToolbarTooltipsMyToolbar.vue';
import RelationGraph from 'relation-graph-vue3';
import { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';
import CircumIcon from "@klarr-agency/circum-icons-vue"; // Vue
import 'floating-vue/dist/style.css'

const graphOptions: RGOptions = {
    useAnimationWhenRefresh: false,
    allowShowFullscreenMenu: false,
    allowShowZoomMenu: false,
    allowAutoLayoutIfSupport: false,
    allowShowRefreshButton: false,
    allowShowDownloadButton: false,
    lineTextMaxLength: 6,
    multiLineDistance: 20,
    lineUseTextPath: true,
    defaultLineShape: 6,
    defaultLineTextOffset_y: -2

};

const favo = ref(false);
const isShowLineTips = ref(false);
const lineTipsPosition = ref({ x: 0, y: 0 });
const currentLine = ref({ text: '' });

const showHTree = () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'A', borderColor: 'yellow' },
            { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
            { id: 'c', text: 'C', nodeShape: 1, width: 120, height: 80 },
            { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
            { from: 'a', to: 'b', text: '关系1关系1关系1关系1关系1关系1关系1关系1关系1关系1关系1关系1', color: '#43a2f1' },
            { from: 'a', to: 'b', text: '关系2关系2关系2关系2', color: '#43a2f1' },
            { from: 'a', to: 'b', text: '关系3关系3关系3关系3关系3关系3关系3关系3关系3', color: '#43a2f1' },
            { from: 'a', to: 'b', text: '关系3关系3关系3关系3关系3关系3关系3关系3关系3', color: '#43a2f1' },
            { from: 'a', to: 'b', text: '关系4', color: '#43a2f1' },
            { from: 'a', to: 'c', text: '1关系2关系2关系2关系2关系2', lineShape: 1 },
            { from: 'a', to: 'c', text: '2关系2关系2关系2关系2关系2', lineShape: 1 },
            { from: 'a', to: 'c', text: '3关系2关系2关系2关系2关系2', lineShape: 1 },
            { from: 'a', to: 'c', text: '4关系2关系2关系2关系2关系2', lineShape: 1 },
            { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
            { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
            { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
            { from: 'a', to: 'e', text: '关系3', lineShape: 7 },
            { from: 'c', to: 'e', text: '', color: '#67C23A', lineShape: 8, fromJunctionPoint: 'left', showEndArrow: false }
        ]
    };
    graphRef.value!.setJsonData(__graph_json_data, () => {
        // 这些写上当图谱初始化完成后需要执行的代码

    });
};

const myToolbarBtnAction = (msg: string) => {
    if (msg === 'favo') {
        favo.value = !favo.value;
    } else {
        alert(msg);
    }
};

const onMouseMove = ($event: MouseEvent) => {
    const graphInstance = graphRef.value.getInstance();
    const link = graphInstance.isLink($event.target as HTMLElement);
    console.log('onMouseMove:', $event.x, $event.y, link);
    if (link) {
        showLineTips($event, link);
        isShowLineTips.value = true;
    } else {
        isShowLineTips.value = false;
    }
};

const showLineTips = ($event: MouseEvent, linkObject: RGLink) => {
    const graphInstance = graphRef.value.getInstance();
    console.log('showLineTips:', $event.clientX, $event.clientY, currentLine.value);
    const _base_position = graphInstance.options.fullscreen ? { x: 0, y: 0 } : graphInstance.getBoundingClientRect();
    lineTipsPosition.value.x = $event.clientX - _base_position.x + 10;
    lineTipsPosition.value.y = $event.clientY - _base_position.y + 10;
    const lineIndex = getLineElementIndex($event.target as HTMLElement);
    currentLine.value = linkObject.relations[lineIndex];
};

const graphRef = ref<RelationGraphComponent | null>(null);

onMounted(() => {
    showHTree();
});

const getLineElementIndex = (el: HTMLElement, deep = 0): number => {
    if (deep > 10) return -1;
    if (el.tagName === 'body') return -1;
    if (el.parentElement?.classList.contains('rel-link-peel')) {
        return Array.from(el.parentElement.children).indexOf(el);
    } else {
        return getLineElementIndex(el.parentElement as HTMLElement, deep + 1);
    }
};
</script>

<style lang="scss" scoped>
.relation-graph {
  .rel-toolbar {
    background-color: #ffffff;
    color: #1459fe;
  }
  .c-current-zoom {
    color: #1459fe;
  }
  .rel-toolbar-v {
    width: 45px;
    max-height: none;
    height: auto;
  }
  .rel-toolbar-h {
    height: 45px;
    width: auto;
  }
  .rel-toolbar-h-center {
    left: calc((100% - 360px) / 2);
  }
  .rel-toolbar-v-center {
    top: calc((100% - 360px) / 2);
  }
  .c-rg-line-text {
  }
}
.c-tips {
  z-index: 999;
  padding: 10px;
  width: 200px;
  position: absolute;
  border-radius: 10px;
  background-color: #333333;
  color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  & > div {
    line-height: 25px;
    font-size: 12px;
  }
}
</style>
<style lang="scss" scoped>
.c-my-panel {
  position: absolute;
  left: 200px;
  top: 200px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
```

### `VipToolbarTooltipsMyToolbar.vue`

```javascript
<template>
  <div
    class="rel-toolbar"
    :class="['rel-toolbar-h-' + options.toolBarPositionH, 'rel-toolbar-v-' + options.toolBarPositionV, 'rel-toolbar-' + options.toolBarDirection]"
  >
    <div v-tooltip.left="'Fullscreen/Exit Fullscreen'" class="c-mb-button" style="margin-top: 0px;" @click="relationGraph.fullscreen()">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-resize-"></use></svg>
    </div>
    <div v-tooltip.left="'Zoom In'" class="c-mb-button" @click="relationGraph.zoom(20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-fangda"></use></svg>
    </div>
    <div class="c-current-zoom" @dblclick="zoomToFit">{{ options.canvasZoom }}%</div>
    <div v-tooltip.left="'Zoom Out'" class="c-mb-button" style="margin-top:0px;" @click="relationGraph.zoom(-20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-suoxiao"></use></svg>
    </div>
    <div v-if="options.isNeedShowAutoLayoutButton" v-tooltip.left="options.autoLayouting ? 'Click to Stop Auto Layout' : 'Click to Start Auto Layout'" :class="{'c-mb-button-on':options.autoLayouting}" class="c-mb-button" @click="toggleAutoLayout">
      <svg v-if="!options.autoLayouting" class="rg-icon" aria-hidden="true"><use xlink:href="#icon-zidong"></use></svg>
      <svg v-else class="c-loading-icon rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjiezhong"></use></svg>
    </div>
    <div v-tooltip.left="'Refresh'" class="c-mb-button" @click="refresh">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ico_reset"></use></svg>
    </div>
    <div v-tooltip.left="'Download Image'" class="c-mb-button" @click="downloadAsImage">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-tupian"></use></svg>
    </div>
    <slot />
    <div style="clear: both;"></div>
  </div>
</template>

<script lang="ts" setup>
import {defineComponent, ref, onMounted, inject, computed} from 'vue';
import type { RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';
import {graphKey} from "relation-graph-vue3";

const graph = inject(graphKey);
const options = computed(() => {
    return graph && graph.options;
});
const relationGraph = computed(() => {
    return graph && graph.instance;
});
const refresh = () => {
    relationGraph.value?.refresh();
};

const switchLayout = (layoutConfig: any) => {
    console.log('change layout:', layoutConfig);
    relationGraph.value?.switchLayout(layoutConfig);
};

const toggleAutoLayout = () => {
    relationGraph.value?.toggleAutoLayout();
};

const downloadAsImage = () => {
    relationGraph.value?.downloadAsImage('png');
};

const zoomToFit = async () => {
    await relationGraph.value?.setZoom(100);
    await relationGraph.value?.moveToCenter();
    await relationGraph.value?.zoomToFit();
};

</script>
```

## React 版本

### `toolbar-tooltips.tsx`

```javascript
import React, { useRef, useEffect, useState } from 'react';
import RelationGraph, {
  RGJsonData,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
  JsonLine
} from 'relation-graph-react';
import MyToolbarToolbar from './VipToolbarTooltipsMyToolbar';
import './toolbar-tooltips.scss';

import 'react-tooltip/dist/react-tooltip.css'
import {Tooltip} from "react-tooltip";

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [favo, setFavo] = useState(false);
  const [isShowLineTips, setIsShowLineTips] = useState(false);
  const [lineTipsPosition, setLineTipsPosition] = useState({ x: 0, y: 0 });
  const [currentLine, setCurrentLine] = useState<JsonLine>({ from:'', to: '', text: '' });

  const graphOptions: RGOptions = {
    useAnimationWhenRefresh: false,
    allowShowFullscreenMenu: false,
    allowShowZoomMenu: false,
    allowAutoLayoutIfSupport: false,
    allowShowRefreshButton: false,
    allowShowDownloadButton: false,
    lineTextMaxLength: 6,
    multiLineDistance: 20,
    lineUseTextPath: true,
    defaultLineShape: 6,
    defaultLineTextOffset_y: -2

  };

  useEffect(() => {
    showHTree();
  }, []);

  const showHTree = () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'A', borderColor: 'yellow' },
        { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
        { id: 'c', text: 'C', nodeShape: 1, width: 120, height: 80 },
        { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
      ],
      lines: [
        { from: 'a', to: 'b', text: 'text', color: '#43a2f1' },
        { from: 'a', to: 'b', text: 'text', color: '#43a2f1' },
        { from: 'a', to: 'b', text: 'text', color: '#43a2f1' },
        { from: 'a', to: 'b', text: 'text', color: '#43a2f1' },
        { from: 'a', to: 'b', text: 'text', color: '#43a2f1' },
        { from: 'a', to: 'c', text: 'text', lineShape: 1 },
        { from: 'a', to: 'c', text: 'text', lineShape: 1 },
        { from: 'a', to: 'c', text: 'text', lineShape: 1 },
        { from: 'a', to: 'c', text: 'text', lineShape: 1 },
        { from: 'a', to: 'e', text: 'text', lineShape: 7 },
        { from: 'a', to: 'e', text: 'text', lineShape: 7 },
        { from: 'a', to: 'e', text: 'text', lineShape: 7 },
        { from: 'a', to: 'e', text: 'text', lineShape: 7 },
        { from: 'c', to: 'e', text: '', color: '#67C23A', lineShape: 8, fromJunctionPoint: 'left', showEndArrow: false }
      ]
    };
    graphRef.current!.setJsonData(__graph_json_data, () => {

    });
  };

  const myToolbarBtnAction = (msg: string) => {
    if (msg === 'favo') {
      setFavo(!favo);
    } else {
      alert(msg);
    }
  };

  const onMouseMove = ($event: React.MouseEvent) => {
    const graphInstance = graphRef.current?.getInstance();
    const link = graphInstance?.isLink($event.target as HTMLElement);
    console.log('onMouseMove:', $event.clientX, $event.clientY, link);
    if (link) {
      showLineTips($event, link);
      setIsShowLineTips(true);
    } else {
      setIsShowLineTips(false);
    }
  };

  const showLineTips = ($event: React.MouseEvent, linkObject: RGLink) => {
    const graphInstance = graphRef.current!.getInstance();
    console.log('showLineTips:', $event.clientX, $event.clientY, currentLine);
    const _base_position = graphInstance.options.fullscreen ? { x: 0, y: 0 } : graphInstance.getBoundingClientRect();
    setLineTipsPosition({
      x: $event.clientX - _base_position.x + 10,
      y: $event.clientY - _base_position.y + 10

    });
    const lineIndex = getLineElementIndex($event.target as HTMLElement);
    setCurrentLine(linkObject.relations[lineIndex]);
  };

  const getLineElementIndex = (el: HTMLElement, deep = 0): number => {
    if (deep > 10) return -1;
    if (el.tagName === 'BODY') return -1;
    if (el.parentElement?.classList.contains('rel-link-peel')) {
      return Array.from(el.parentElement.children).indexOf(el);
    } else {
      return getLineElementIndex(el.parentElement as HTMLElement, deep + 1);
    }
  };

  return (
    <div>
      <div style={{ height: '100vh' }} onMouseMove={onMouseMove}>
        <div
          style={{
            display: isShowLineTips ? 'block' : 'none',
            position: 'absolute',
            left: lineTipsPosition.x + 'px',
            top: lineTipsPosition.y + 'px'
          }}
          className="c-tips"
        >
          <div>{currentLine.text}</div>
        </div>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          toolBarSlot={() => <MyToolbarToolbar
            // favo={favo} // Pass the reactive variable like this
            // onFavoClick={() => myToolbarBtnAction('favo')} // Pass the event handler function like this
            // onShareClick={() => myToolbarBtnAction('aaa2')}
            // onHelpClick={() => myToolbarBtnAction('aaa3')}
          />}
          graphPlugSlot={<div>
            <Tooltip id="my-tooltip" />
          </div>}
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `toolbar-tooltips.scss`

```scss
.relation-graph {
  .rel-toolbar {
    background-color: #ffffff;
    color: #1459fe;
  }
  .c-current-zoom {
    color: #1459fe;
  }
  .rel-toolbar-v {
    width: 45px;
    max-height: none;
    height: auto;
  }
  .rel-toolbar-h {
    height: 45px;
    width: auto;
  }
  .rel-toolbar-h-center {
    left: calc((100% - 360px) / 2);
  }
  .rel-toolbar-v-center {
    top: calc((100% - 360px) / 2);
  }
  .c-rg-line-text {
  }
}
.c-tips {
  z-index: 999;
  padding: 10px;
  width: 200px;
  position: absolute;
  border-radius: 10px;
  background-color: #333333;
  color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  & > div {
    line-height: 25px;
    font-size: 12px;
  }
}

.c-my-panel {
  position: absolute;
  left: 200px;
  top: 200px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
```

### `VipToolbarTooltipsMyToolbar.tsx`

```javascript
import React, { useEffect, useContext, useRef } from 'react'
import {
  RelationGraphComponent,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphStoreContext,
} from 'relation-graph-react'

const VipToolbarTooltipsMyToolbar = () => {
  const graphInstance = useContext(RelationGraphStoreContext)
  const options = graphInstance.options

  const refresh = () => {
    graphInstance.refresh()
  }

  const switchLayout = (layoutConfig: any) => {
    console.log('change layout:', layoutConfig)
    graphInstance.switchLayout(layoutConfig)
  }

  const toggleAutoLayout = () => {
    graphInstance.toggleAutoLayout()
  }

  const downloadAsImage = () => {
    graphInstance.downloadAsImage('png')
  }

  const zoomToFit = async () => {
    await graphInstance.setZoom(100)
    await graphInstance.moveToCenter()
    await graphInstance.zoomToFit()
  }

  return (
    <div
      className={`rel-toolbar rel-toolbar-h-${options.toolBarPositionH} rel-toolbar-v-${options.toolBarPositionV} rel-toolbar-${options.toolBarDirection}`}
    >
      <div
        className="c-mb-button"
        style={{ marginTop: '0px' }}
        onClick={() => graphInstance.fullscreen()}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Fullscreen/Exit Fullscreen!"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-resize-"></use>
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={() => graphInstance.zoom(20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom In"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-fangda"></use>
        </svg>
      </div>
      <div className="c-current-zoom" onDoubleClick={zoomToFit}>
        {options.canvasZoom}%
      </div>
      <div
        className="c-mb-button"
        style={{ marginTop: '0px' }}
        onClick={() => graphInstance.zoom(-20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom Out"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-suoxiao"></use>
        </svg>
      </div>
      {options.isNeedShowAutoLayoutButton && (
        <div
          className={`c-mb-button ${options.autoLayouting ? 'c-mb-button-on' : ''}`}
          onClick={toggleAutoLayout}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={
            options.autoLayouting ? 'Click to Stop Auto Layout' : 'Click to Start Auto Layout'
          }
          data-tooltip-place="left"
        >
          {!options.autoLayouting ? (
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-zidong"></use>
            </svg>
          ) : (
            <svg className="c-loading-icon rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjiezhong"></use>
            </svg>
          )}
        </div>
      )}
      <div
        className="c-mb-button"
        onClick={refresh}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Refresh"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-ico_reset"></use>
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={downloadAsImage}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Download Image"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-tupian"></use>
        </svg>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  )
}

export default VipToolbarTooltipsMyToolbar
```
