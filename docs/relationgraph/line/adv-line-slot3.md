# 线条高级用法-插槽-圆角折线

## Vue2 版本

### `adv-line-slot3.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #line="{line, link}">
          <MyLine :link="link" :relation="line" />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import MyLine from './Demo4AdvLineSlot3LineSlot';
export default {
  name: 'Demo4AdvLineSlot',
  components: { MyLine },
  data() {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineColor: 'rgba(255, 255, 255, 0.6)',
        defaultNodeColor: 'transparent',
        defaultNodeBorderWidth: 1,
        defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
        defaultNodeFontColor: '#ffffff',
        defaultNodeWidth: 170,
        defaultNodeHeight: 40,
        toolBarDirection: 'h',
        toolBarPositionH: 'left',
        toolBarPositionV: 'top',
        defaultPloyLineRadius: 10,
        layout: {
          layoutName: 'tree',
          from: 'left',
          min_per_width: 410, // 根据节点的宽度设置，这个是让图谱看起来偏亮的关键
          min_per_height: 50,
        }
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a' },
          { 'id': 'b', 'text': 'b' },
          { 'id': 'b1', 'text': 'b1' },
          { 'id': 'b1-1', 'text': 'b1-1' },
          { 'id': 'b1-2', 'text': 'b1-2' },
          { 'id': 'b1-3', 'text': 'b1-3' },
          { 'id': 'b1-4', 'text': 'b1-4' },
          { 'id': 'b1-5', 'text': 'b1-5' },
          { 'id': 'b1-6', 'text': 'b1-6' },
          { 'id': 'b2', 'text': 'b2' },
          { 'id': 'b2-1', 'text': 'b2-1' },
          { 'id': 'b2-2', 'text': 'b2-2' },
          { 'id': 'c', 'text': 'c' },
          { 'id': 'c1', 'text': 'c1' },
          { 'id': 'c2', 'text': 'c2' },
          { 'id': 'c3', 'text': 'c3' }],
        'lines': [
          { 'from': 'a', 'to': 'b', text: '￥30.23万' },
          { 'from': 'b', 'to': 'b1', text: '￥30.23万' },
          { 'from': 'b1', 'to': 'b1-1', text: '￥30.23万' },
          { 'from': 'b1', 'to': 'b1-2', text: '￥30.23万' },
          { 'from': 'b1', 'to': 'b1-3', text: '￥30.23万' },
          { 'from': 'b1', 'to': 'b1-4', text: '￥30.23万' },
          { 'from': 'b1', 'to': 'b1-5', text: '￥30.23万' },
          { 'from': 'b1', 'to': 'b1-6', text: '￥30.23万' },
          { 'from': 'b', 'to': 'b2', text: '￥30.23万' },
          { 'from': 'b2', 'to': 'b2-1', text: '￥30.23万' },
          { 'from': 'b2', 'to': 'b2-2', text: '￥30.23万' },
          { 'from': 'a', 'to': 'c', text: '￥30.23万' },
          { 'from': 'c', 'to': 'c1', text: '￥30.23万' },
          { 'from': 'c', 'to': 'c2', text: '￥30.23万' },
          { 'from': 'c', 'to': 'c3', text: '￥30.23万' }]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .rel-map {
  background-image: none !important;
  background-color: #e94057;
  background:linear-gradient(320deg,#f27121,#e94057,#8a2387) !important;
  .rel-node-shape-1 {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  .rel-toolbar{
    background-color: rgba(203, 7, 7, 0.2);
    color: #d9001b;
  }
}
::v-deep .rel-toolbar{
  color: #ffffff;
  .c-current-zoom{
    color: #ffffff;
  }
}
</style>
```

### `Demo4AdvLineSlot3LineSlot.vue`

```javascript
<template>
  <g>
    <!-- 常规方式 -->
    <path
        :d="pathData.path"
        :class="['c-rg-line', relation.styleClass, checked ? 'c-rg-line-checked' : '']"
        :stroke="
        checked
          ? options.checkedLineColor
          : relation.color
          ? relation.color
          : options.defaultLineColor
      "
        :style="{
        'opacity': relation.opacity,
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : options.defaultLineWidth) + 'px',
      }"
        :marker-start="showStartArrow"
        :marker-end="showEndArrow"
        fill="none"
        @click="onClick(relation, $event)"
    />
    <g
        v-if="
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
        :transform="pathData.textTransform"
    >
      <rect
          :key="'t-' + relation.seeks_id"
          rx="15" ry="15"
          :x="10 + (options.layouts[0].from === 'right' ? -100 : 0)"
          :y="-10"
          :style="{
          opacity: relation.opacity,
          fill: checked
            ? options.checkedLineColor
            : relation.fontColor
            ? relation.fontColor
            : relation.color
            ? relation.color
            : undefined,
        }"
          class="c-rg-line-text-bg"
          @click="onClick(relation, $event)"
      >
      </rect>
      <text
          :x="20 + (options.layouts[0].from === 'right' ? -100 : 0)"
          :y="10"
          :style="{
          opacity: relation.opacity
        }"
          class="c-rg-line-text"
          @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'Demo4AdvLineSlot2LineSlot',
  props: {
    link: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relation: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relationIndex: {
      mustUseProp: true,
      default: () => {
        return 0;
      },
      type: Number,
    },
  },
  data() {
    return {
      is_flashing: false,
    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    checked() {
      return this.relation.id === this.options.checkedLineId;
    },
    showStartArrow() {
      return this.relation.showStartArrow && this.relationGraph.getArrow(this.relation, this.link, true);
    },
    showEndArrow() {
      return this.relation.showEndArrow && this.relationGraph.getArrow(this.relation, this.link, false);
    },
    pathData() {
      try {
        const { path, textPosition } = this.relationGraph.createLinePath(
            this.link,
            this.relation,
            this.relationIndex
        );
        let textTransform = {}
        try {
          textTransform = this.relationGraph.getTextTransform(
              this.relation,
              textPosition.x,
              textPosition.y,
              textPosition.rotate
          )
        } catch (e) {
        }
        return {
          path,
          textTransform
        };
      } catch (e) {
      }
      return {path:null, textTransform: null};
    },
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    }
  },
  show() {
    this.isShow = true;
  },
  watch: {},
  methods: {
    onClick(line, e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(line, this.link, e);
    }
  },
};
</script>

<style scoped>
/*.RGLine-enter-active {*/
/*transition: all .3s ease;*/
/*}*/
/*.RGLine-leave-active {*/
/*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
.c-rg-line-text-bg {
  fill: rgba(255, 255, 255);
  width: 80px;
  height:30px;
  font-size: 12px;
  border-radius: 10px;
}
.c-rg-line-text {
  fill: #e94057;
  font-size: 12px;
}
.c-rg-line {
  z-index: 1000;
  fill-rule: nonzero;
  /*marker-end: url('#arrow');*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  /*animation-timing-function:linear;*/
  /*animation: ACTRGLineInit 1s;*/
}
.c-rg-line-tool {
  stroke-dasharray: 5, 5, 5;
}
.c-rg-line-flash {
  /* firefox bug fix - won't rotate at 90deg angles */
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
@keyframes ACTRGLineInit {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }

  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 0, 0, 0;
  }
}
@keyframes ACTRGLineChecked {
  from {
    stroke-dashoffset: 352px;
  }

  to {
    stroke-dashoffset: 0;
  }
}
.c-rg-line-checked {
  /*stroke: var(--stroke);*/
  /*marker-end: var(--markerEndChecked) !important;*/
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
</style>
```

## Vue3 版本

### `adv-line-slot3.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #line="{line, link}">
          <MyLine :link="link" :line="line" />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue';
import RelationGraph, { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';
import MyLine from './Demo4AdvLineSlot3LineSlot';


const graphRef = ref<RelationGraphComponent>();

const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeColor: 'transparent',
    defaultNodeBorderWidth: 1,
    defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
    defaultNodeFontColor: '#ffffff',
    defaultNodeWidth: 170,
    defaultNodeHeight: 40,
    toolBarDirection: 'h',
    toolBarPositionH: 'left',
    toolBarPositionV: 'top',
    defaultPolyLineRadius: 10,
    layout: {
        layoutName: 'tree',
        from: 'left',
        'min_per_width': 410,
        'min_per_height': 50,
    }
};


const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        'rootId': 'a',
        'nodes': [
            { 'id': 'a', 'text': 'a' },
            { 'id': 'b', 'text': 'b' },
            { 'id': 'b1', 'text': 'b1' },
            { 'id': 'b1-1', 'text': 'b1-1' },
            { 'id': 'b1-2', 'text': 'b1-2' },
            { 'id': 'b1-3', 'text': 'b1-3' },
            { 'id': 'b1-4', 'text': 'b1-4' },
            { 'id': 'b1-5', 'text': 'b1-5' },
            { 'id': 'b1-6', 'text': 'b1-6' },
            { 'id': 'b2', 'text': 'b2' },
            { 'id': 'b2-1', 'text': 'b2-1' },
            { 'id': 'b2-2', 'text': 'b2-2' },
            { 'id': 'c', 'text': 'c' },
            { 'id': 'c1', 'text': 'c1' },
            { 'id': 'c2', 'text': 'c2' },
            { 'id': 'c3', 'text': 'c3' }
        ],
        'lines': [
            { 'from': 'a', 'to': 'b', text: '￥30.23万' },
            { 'from': 'b', 'to': 'b1', text: '￥30.23万' },
            { 'from': 'b1', 'to': 'b1-1', text: '￥30.23万' },
            { 'from': 'b1', 'to': 'b1-2', text: '￥30.23万' },
            { 'from': 'b1', 'to': 'b1-3', text: '￥30.23万' },
            { 'from': 'b1', 'to': 'b1-4', text: '￥30.23万' },
            { 'from': 'b1', 'to': 'b1-5', text: '￥30.23万' },
            { 'from': 'b1', 'to': 'b1-6', text: '￥30.23万' },
            { 'from': 'b', 'to': 'b2', text: '￥30.23万' },
            { 'from': 'b2', 'to': 'b2-1', text: '￥30.23万' },
            { 'from': 'b2', 'to': 'b2-2', text: '￥30.23万' },
            { 'from': 'a', 'to': 'c', text: '￥30.23万' },
            { 'from': 'c', 'to': 'c1', text: '￥30.23万' },
            { 'from': 'c', 'to': 'c2', text: '￥30.23万' },
            { 'from': 'c', 'to': 'c3', text: '￥30.23万' }
        ]
    };

    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

onMounted(() => {
    showGraph();
});
</script>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
    .rel-map {
        background-image: none !important;
        background-color: #e94057;
        background:linear-gradient(320deg,#f27121,#e94057,#8a2387) !important;
        .rel-node-shape-1 {
            background-color: rgba(255, 255, 255, 0.2) !important;
            border-radius: 10px;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
    }
    .rel-toolbar{
        color: #ffffff;
        .c-current-zoom{
            color: #ffffff;
        }
    }
    .c-rg-line-text {
        fill: #e94057;
        font-size: 12px;
    }
    .c-rg-link-checked {
        .c-rg-line-text {
            fill: #ffffff;
            font-size: 12px;
        }
    }
    .c-rg-line-checked {
        stroke-width: 2px;
        stroke-dasharray: 5, 5, 5;
        stroke-dashoffset: 3px;
        stroke-linecap: butt;
        stroke: #ffffff;
        stroke-linejoin: bevel;
        animation-timing-function: linear;
        animation: MyLineChecked 10s;
    }
    .c-rg-line-checked-bg {
        stroke: rgba(255, 255, 255, 0.3);
    }
}
</style>

<style lang="scss">
@keyframes MyLineChecked {
    from {
        stroke-dashoffset: 352px;
    }

    to {
        stroke-dashoffset: 0;
    }
}
</style>
```

### `Demo4AdvLineSlot3LineSlot.vue`

```javascript
<template>
  <g>
    <!-- Regular way -->
    <path

      :d="pathData.path"
      :class="['c-rg-line', line.styleClass, checked ? 'c-rg-line-checked' : '']"
      :stroke="
        checked

          ? line.checkedLineColor

          : line.color

          ? line.color

          : options.defaultLineColor

      "
      :style="{
        'opacity': line.opacity,
        'stroke-width':
          (line.lineWidth

            ? line.lineWidth

            : options.defaultLineWidth) + 'px',
      }"
      :marker-start="showStartArrow"
      :marker-end="showEndArrow"
      fill="none"
      @click="onClick(line, $event)"
    />
    <g

      v-if="
        options.defaultShowLineLabel &&
        options.canvasZoom > 40

      "
      :transform="pathData.textTransform"
    >
      <rect

        :key="'t-' + line.seeks_id"
        rx="15" ry="15"
        :x="10 + (options.layouts[0].from === 'right' ? -100 : 0)"
        :y="-10"
        :style="{
          opacity: line.opacity,
          fill: checked

            ? options.checkedLineColor

            : line.fontColor

            ? line.fontColor

            : line.color

            ? line.color

            : undefined,
        }"
        class="c-rg-line-text-bg"
        @click="onClick(line, $event)"
      >
      </rect>
      <text

        :x="20 + (options.layouts[0].from === 'right' ? -100 : 0)"
        :y="10"
        :style="{
          opacity: line.opacity

        }"
        class="c-rg-line-text"
        @click="onClick(line, $event)"
      >
        {{ line.text }}
      </text>
    </g>
  </g>
</template>

<script lang="ts" setup>
import {computed, defineComponent, inject} from 'vue';
import type { RGLine, RGLink, RGUserEvent } from 'relation-graph-vue3';
import {graphKey} from "relation-graph-vue3";

const {link,line} = defineProps<{
    link: RGLink,
    line: RGLine,
}>();

const graph = inject<any>(graphKey);
// const graphInstance = inject<any>('graphInstance');
const options = computed(() => {
    return graph.options;
});
const checked = computed(() => {
    return line.id === graph.options.checkedLineId;
});
const showStartArrow = computed(() => {
    return (
        line.showStartArrow &&
        graph.instance.getArrow(line, link, true)
    );
});
const showEndArrow = computed(() => {
    return (
        line.showEndArrow &&
        graph.instance.getArrow(line, link, false)
    );
});
const pathData = computed(() => {
    try {
        const { path, textPosition } = graph.instance.createLinePath(
            link,
            line,
            0
        );
        let textTransform = {};
        try {
            textTransform = graph.instance.getTextTransform(
                line,
                textPosition.x,
                textPosition.y,
                textPosition.rotate

            );
        } catch (e) {}
        return {
            path,
            textTransform,
        };
    } catch (e) {}
    return { path: null, textTransform: null };
});
const onClick = (line: RGLine, $event: RGUserEvent) => {
    graph.instance.onLineClick(line, link, $event);
};
</script>

<style scoped>
.c-rg-line-text-bg {
  fill: rgba(255, 255, 255);
  width: 80px;
  height: 30px;
  font-size: 12px;
  border-radius: 10px;
}
</style>
```

## React 版本

### `adv-line-slot3.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph, {
  RGJsonData,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
} from 'relation-graph-react'
import MyLine from './Demo4AdvLineSlot3LineSlot'
import { RGNodeSlotProps } from 'relation-graph-react'
import './adv-line-slot3.scss'

const AdvLineSlot3 = () => {
  const graphRef = useRef < RelationGraphComponent > null

  const graphOptions: RGOptions = {
    defaultLineColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeColor: 'transparent',
    defaultNodeBorderWidth: 1,
    defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
    defaultNodeFontColor: '#ffffff',
    defaultNodeWidth: 170,
    defaultNodeHeight: 40,
    toolBarDirection: 'h',
    toolBarPositionH: 'left',
    toolBarPositionV: 'top',
    defaultPolyLineRadius: 10,
    layout: {
      layoutName: 'tree',
      from: 'left',
      min_per_width: 410,
      min_per_height: 50,
    },
  }

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'a' },
        { id: 'b', text: 'b' },
        { id: 'b1', text: 'b1' },
        { id: 'b1-1', text: 'b1-1' },
        { id: 'b1-2', text: 'b1-2' },
        { id: 'b1-3', text: 'b1-3' },
        { id: 'b1-4', text: 'b1-4' },
        { id: 'b1-5', text: 'b1-5' },
        { id: 'b1-6', text: 'b1-6' },
        { id: 'b2', text: 'b2' },
        { id: 'b2-1', text: 'b2-1' },
        { id: 'b2-2', text: 'b2-2' },
        { id: 'c', text: 'c' },
        { id: 'c1', text: 'c1' },
        { id: 'c2', text: 'c2' },
        { id: 'c3', text: 'c3' },
      ],
      lines: [
        { from: 'a', to: 'b', text: '￥30.23万' },
        { from: 'b', to: 'b1', text: '￥30.23万' },
        { from: 'b1', to: 'b1-1', text: '￥30.23万' },
        { from: 'b1', to: 'b1-2', text: '￥30.23万' },
        { from: 'b1', to: 'b1-3', text: '￥30.23万' },
        { from: 'b1', to: 'b1-4', text: '￥30.23万' },
        { from: 'b1', to: 'b1-5', text: '￥30.23万' },
        { from: 'b1', to: 'b1-6', text: '￥30.23万' },
        { from: 'b', to: 'b2', text: '￥30.23万' },
        { from: 'b2', to: 'b2-1', text: '￥30.23万' },
        { from: 'b2', to: 'b2-2', text: '￥30.23万' },
        { from: 'a', to: 'c', text: '￥30.23万' },
        { from: 'c', to: 'c1', text: '￥30.23万' },
        { from: 'c', to: 'c2', text: '￥30.23万' },
        { from: 'c', to: 'c3', text: '￥30.23万' },
      ],
    }

    const graphInstance = graphRef.current?.getInstance()
    await graphInstance?.setJsonData(__graph_json_data)
    await graphInstance?.moveToCenter()
    await graphInstance?.zoomToFit()
  }

  useEffect(() => {
    showGraph()
  }, [])

  const LineSlot: React.FC<{ line: RGLine, link: RGLink }> = ({ line, link }) => {
    return <MyLine link={link} line={line} />
  }

  return (
    <div>
      <div className="my-graph" style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions} lineSlot={LineSlot} />
      </div>
    </div>
  )
}

export default AdvLineSlot3
```

### `adv-line-slot3.scss`

```scss
.relation-graph {
  .rel-map {
    background-image: none !important;
    background-color: #e94057;
    background: linear-gradient(320deg, #f27121, #e94057, #8a2387) !important;
    .rel-node-shape-1 {
      background-color: rgba(255, 255, 255, 0.2) !important;
      border-radius: 10px;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
  }
  .rel-toolbar {
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .c-rg-line-text {
    fill: #e94057;
    font-size: 12px;
  }
  .c-rg-link-checked {
    .c-rg-line-text {
      fill: #ffffff;
      font-size: 12px;
    }
  }
  .c-rg-line-checked {
    stroke-width: 2px;
    stroke-dasharray: 5, 5, 5;
    stroke-dashoffset: 3px;
    stroke-linecap: butt;
    stroke: #ffffff;
    stroke-linejoin: bevel;
    animation-timing-function: linear;
    animation: MyLineChecked 10s;
  }
  .c-rg-line-checked-bg {
    stroke: rgba(255, 255, 255, 0.3);
  }
}

@keyframes MyLineChecked {
  from {
    stroke-dashoffset: 352px;
  }

  to {
    stroke-dashoffset: 0;
  }
}
```

### `Demo4AdvLineSlot3LineSlot.tsx`

```javascript
import React from 'react';
import {
  RelationGraphStoreContext,
  RGLine,
  RGLineSlotProps,
  RGTreeLayoutOptions,
  RGUserEvent
} from 'relation-graph-react';
import './Demo4AdvLineSlot3LineSlot.scss';

const LineSlot: React.FC<RGLineSlotProps> = ({ line, link }) => {
  const graphInstance = React.useContext(RelationGraphStoreContext);
  const options = graphInstance.options;
  const checked = line.id === options.checkedLineId;
  const showStartArrow = line.showStartArrow ? graphInstance.getArrow(line, link, true) : undefined;
  const showEndArrow = line.showEndArrow ? graphInstance.getArrow(line, link, false) : undefined;

  const onClick = (line: RGLine, $event: React.MouseEvent) => {
    graphInstance.onLineClick(line, link, $event as RGUserEvent);
  };

  const { path, textPosition } = graphInstance.createLinePath(link, line, 0);
  let textTransform = '';
  try {
    textTransform = graphInstance.getTextTransform(line, textPosition.x, textPosition.y, textPosition.rotate);
  } catch (e) {}
  const treeLayoutFrom = (options.layouts![0] as RGTreeLayoutOptions).from;
  return (
    <g>
      <path
        d={path}
        className={`c-rg-line ${line.styleClass} ${checked ? 'c-rg-line-checked' : ''}`}
        stroke={checked ? options.checkedLineColor : line.color ? line.color : options.defaultLineColor}
        style={{
          opacity: line.opacity,
          strokeWidth: `${line.lineWidth ? line.lineWidth : options.defaultLineWidth}px`,
        }}
        markerStart={showStartArrow}
        markerEnd={showEndArrow}
        fill="none"
        onClick={(event) => onClick(line, event)}
      />
      {options.defaultShowLineLabel && options.canvasZoom > 40 && (
        <g transform={textTransform}>
          <rect

            key={`t-${line.seeks_id}`}
            rx="15"
            ry="15"
            x={10 + (treeLayoutFrom === 'right' ? -100 : 0)}
            y="-10"
            style={{
              opacity: line.opacity,
              fill: checked ? options.checkedLineColor : line.fontColor ? line.fontColor : line.color,
            }}
            className="c-rg-line-text-bg"
            onClick={(event) => onClick(line, event)}
          />
          <text

            x={20 + (treeLayoutFrom === 'right' ? -100 : 0)}
            y="10"
            style={{
              opacity: line.opacity,
            }}
            className="c-rg-line-text"
            onClick={(event) => onClick(line, event)}
          >
            {line.text}
          </text>
        </g>
      )}
    </g>
  );
};

export default LineSlot;
```

### `Demo4AdvLineSlot3LineSlot.scss`

```scss
.relation-graph {
  .c-rg-line-text-bg {
    fill: rgba(255, 255, 255);
    width: 80px;
    height: 30px;
    font-size: 12px;
    border-radius: 10px;
  }
}
```
