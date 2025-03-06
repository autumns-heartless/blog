# 与节点相关的连线

## Vue2 版本

### `line-hightlight.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
<!--          <template #line="{line, link}">-->
<!--              <Demo4LineStyleHLLineSlot :link="link" :relation="line" />-->
<!--          </template>-->
        <template #node="{node}">
          <div class="my-node" @mouseover="nodeMouseOver(node)" @mouseout="nodeMouseOut(node)">
            {{node.text}}
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">
            设置选中的线条：
            </div>
            <el-checkbox-group v-model="hightLighLineId" size="mini" @change="setHighlightLine">
              <el-checkbox :label="'line1'">线条1</el-checkbox>
              <el-checkbox :label="'line2'">线条2</el-checkbox>
              <el-checkbox :label="'line3'">线条3</el-checkbox>
              <el-checkbox :label="'line4'">线条4</el-checkbox>
              <el-checkbox :label="'line5'">线条5</el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import Demo4LineStyleHLLineSlot from './Demo4LineStyleHLLineSlot';

export default {
  name: 'Demo4LineStyleHighLight',
  components: { Demo4LineStyleHLLineSlot },
  data() {
    return {
      hightLighLineId: [],
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultNodeColor: 'transparent',
        defaultNodeBorderWidth: 0,
        defaultNodeBorderColor: 'transpanret',
        defaultLineColor: 'rgba(128, 128, 255)',
        defaultNodeShape: 1,
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'bottom',
        defaultPloyLineRadius: 10,
        defaultLineShape: 4,
        defaultLineWidth: 2,
        // defaultJunctionPoint: 'tb',
        // disableNodeClickEffect: true,
        // lineUseTextPath: true,
          defaultLineTextOffset_x: 0,
          defaultLineTextOffset_y: -2,
        layout: {
          layoutName: 'tree',
          from: 'top',
          min_per_width: 210, // 根据节点的宽度设置，这个是让图谱看起来偏亮的关键
          min_per_height: 120,
        }
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    async showGraph() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a', offset_y: -60, data: { icon: 'node-dm-8' } },
          { 'id': 'b', 'text': 'b', data: { icon: 'node-dm-2' } },
          { 'id': 'b1', 'text': 'b1', data: { icon: 'node-dm-3' } },
          { 'id': 'b2', 'text': 'b2', data: {icon:'node-dm-4' }},
          { 'id': 'b2-1', 'text': 'b2-1', data: {icon:'node-dm-7'} },
          { 'id': 'b2-2', 'text': 'b2-2', data: {icon:'node-dm-9'} },
          { 'id': 'c', 'text': 'c', data: { icon: 'volleyball-ball' } },
          { 'id': 'c1', 'text': 'c1', data: { icon: 'node-dm-6' } },
          { 'id': 'c2', 'text': 'c2', data: { icon: 'node-dm-10' } },
          { 'id': 'c3', 'text': 'c3', data: { icon: 'node-dm-5' } },
          { 'id': 'root-p1', 'text': 'root-p1', data: { icon: 'node-dm-5' } },
          { 'id': 'root-p2', 'text': 'root-p2', data: { icon: 'node-dm-5' } },
          { 'id': 'root-p3', 'text': 'root-p3', data: { icon: 'node-dm-5' } },
          { 'id': 'root-p3-p1', 'text': 'root-p3-p1', data: { icon: 'node-dm-5' } },
          { 'id': 'root-p3-p2', 'text': 'root-p3-p2', data: { icon: 'node-dm-5' } }
        ],
        'lines': [
          { data: {'myLineId': 'line1',}, 'from': 'a', 'to': 'b', text: '关系描述', styleClass: 'my-line-highlight'  },
          { data: {'myLineId': 'line2',}, 'from': 'b', 'to': 'b1', text: '关系描述' },
          { data: {'myLineId': 'line3',}, 'from': 'b', 'to': 'b2', text: '关系描述' },
          { data: {'myLineId': 'line4',}, 'from': 'b2', 'to': 'b2-1', text: '关系描述' },
          { data: {'myLineId': 'line5',}, 'from': 'b2', 'to': 'b2-2', text: '关系描述' },
          { data: {'myLineId': 'line6',}, 'from': 'a', 'to': 'c', text: '关系描述' },
          { data: {'myLineId': 'line7',}, 'from': 'c', 'to': 'c1', text: '关系描述' },
          { data: {'myLineId': 'line8',}, 'from': 'c', 'to': 'c2', text: '关系描述' },
          { data: {'myLineId': 'line9',}, 'from': 'c', 'to': 'c3', text: '关系描述' },
          { data: {'myLineId': 'line9',}, 'from': 'root-p1', 'to': 'a', text: '关系描述', placeText: 'start' },
          { data: {'myLineId': 'line9',}, 'from': 'root-p2', 'to': 'a', text: '关系描述', placeText: 'start' },
          { data: {'myLineId': 'line9',}, 'from': 'root-p3', 'to': 'a', text: '关系描述', placeText: 'start' },
          { data: {'myLineId': 'line9',}, 'from': 'root-p3-p1', 'to': 'root-p3', text: '关系描述', placeText: 'start' },
          { data: {'myLineId': 'line9',}, 'from': 'root-p3-p2', 'to': 'root-p3', text: '关系描述', placeText: 'start' }
        ]
      };
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setJsonData(__graph_json_data);
    },
    nodeMouseOver(currentNode) {
      const graphInstance = this.$refs.graphRef.getInstance();
      for (const node of graphInstance.getNodes()) {
        currentNode.className = '';
      }
      currentNode.className = 'my-node-highlight';
      for (const link of graphInstance.getLinks()) {
        if (link.fromNode === currentNode || link.toNode === currentNode) {
          for (const line of link.relations) {
            line.className = 'my-line-highlight';
            line.lineWidth = 3;
          }
        } else {
          for (const line of link.relations) {
            line.className = '';
            line.lineWidth = this.graphOptions.defaultLineWidth;
          }
        }
      }
    },
    nodeMouseOut(currentNode) {
      const graphInstance = this.$refs.graphRef.getInstance();
      for (const node of graphInstance.getNodes()) {
        currentNode.className = '';
      }
      this.setHighlightLine();
    },
    setHighlightLine() {
      const graphInstance = this.$refs.graphRef.getInstance();
      for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
          if (this.hightLighLineId.includes(line.data.myLineId)) {
            line.className = 'my-line-highlight';
            line.lineWidth = 3;
          } else {
            line.className = '';
            line.lineWidth = this.graphOptions.defaultLineWidth;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.c-my-panel {
  width: 350px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding:10px;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}
//取消点击线条后节点的闪烁效果
::v-deep .rel-node-flashing {
  animation: none;
}

// 修改默认的，线条选中时背景样式
::v-deep .c-rg-line-checked-bg {
  stroke: rgba(128, 128, 255, 0.4);
}
// 修改默认的，线条选中时线条样式
::v-deep .c-rg-line-checked {
  stroke: rgba(128, 128, 255, 0.4);
}
// 修改默认的，线条选中时文字样式
::v-deep .c-rg-line-text-checked {
  stroke: rgba(128, 128, 255, 0.4);
  fill: rgb(91, 91, 182) !important;
}
// 修改默认的，节点样式
::v-deep .rel-node{
  border-radius:8px;
  transition: border-radius 0.6s ease;
}
// 修改默认的，节点选中样式
::v-deep .rel-node-checked{
  box-shadow: 0px 0px 0px 5px rgba(128, 128, 255, 0.4);
}
// 修改默认的，连线样式
::v-deep .c-rg-line{
  stroke: rgba(128, 128, 255, 0.4);
}
// 修改默认的，连线文字text标签样式
::v-deep .c-rg-line-text{
  text-anchor: start;
  transition: text-anchor 2s ease, fill 2s ease, stroke 2s ease, opacity 2s ease;
}
</style>

<style scoped lang="scss">
.my-node {
  color: #eeeeee;
  font-size: 18px;
  width: 70px;height:70px;
  background-color: #8080ff;
  display: flex;
  border-radius:8px;
  place-items: center;
  justify-content: center;
  transition: border-radius 0.6s ease;
}
::v-deep .my-node-highlight {
  .rel-node {
    border-radius: 50%;
    .my-node {
      border-radius: 50%;
      box-shadow: 0px 0px 0px 5px rgba(128, 128, 255, 0.4);
    }
  }
}
::v-deep .my-line-highlight{
  .c-rg-line {
    animation: my-line-anm2 2s infinite;
    stroke: rgba(75, 28, 119, 0.5);
    stroke-width: 3px;
  }
  .c-rg-line-text{
    animation: my-line-text-anm2 2s infinite;
    text-anchor: middle;
    stroke: #ffffff;
    fill:  rgba(75, 28, 119, 1) !important;
  }
}

@keyframes my-line-anm2 {
  from {
    stroke-dashoffset: 0;
    stroke-dasharray: 4,4,4;
  }
  to {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20,20,20;
  }
}

@keyframes my-line-text-anm2 {
  from {
    stroke: #ffffff;
    opacity: 0.3;
    scale: 0.5;
  }
  to {
    stroke: rgba(75, 28, 119, 1);
    opacity: 1;
    scale: 1.5;
  }
}

</style>
```

### `Demo4LineStyleHLLineSlot.vue`

```javascript
<template>
    <g :class="[relation.className]">
        <!-- 常规方式 -->
        <path
            :d="pathData.path"
            class="c-rg-line"
            :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
            :stroke="
        (relation.color?relation.color:options.defaultLineColor)
      "
            :style="{
        'opacity': relation.opacity,
        'pointer-events': (relation.disableDefaultClickEffect && 'none'),
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : options.defaultLineWidth) + 'px',
      }"
            :marker-start="showStartArrow"
            :marker-end="showEndArrow"
            fill="none"
            @touchstart="onClick(relation, $event)"
            @click="onClick(relation, $event)"
        />
        <g
            v-if="
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
            :transform="pathData.textTransform"
        >
            <text
                :key="'t-' + relation.seeks_id"
                :x="relation.textOffset_x || options.defaultLineTextOffset_x || 0"
                :y="relation.textOffset_y || options.defaultLineTextOffset_y || 10"
                :style="{
          opacity: relation.opacity,
          fill: (relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor)))
        }"
                text-anchor="middle"
                class="c-rg-line-text"
                :class="{'c-rg-line-text-checked' : checked}"
                @touchstart="onClick(relation, $event)"
                @click="onClick(relation, $event)"
            >
                {{ relation.text }}
            </text>
        </g>
    </g>
</template>

<script lang="ts">

export default {
    name: 'SeeksRGLine',
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
                    console.log('my-line-slot:error:', e);
                }
                return {
                    path,
                    textTransform
                };
            } catch (e) {
                console.log('my-line-slot:error:', e);
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
    }
};
</script>

<style scoped>
</style>
```

## Vue3 版本

### `line-hightlight.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
          <div class="my-node" @mouseover="nodeMouseOver(node)" @mouseout="nodeMouseOut(node)">
            {{ node.text }}
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">
              Set selected line:
            </div>
            <el-checkbox-group v-model="hightLighLineId" size="small" @change="setHighlightLine">
              <el-checkbox :label="'line1'">Line 1</el-checkbox>
              <el-checkbox :label="'line2'">Line 2</el-checkbox>
              <el-checkbox :label="'line3'">Line 3</el-checkbox>
              <el-checkbox :label="'line4'">Line 4</el-checkbox>
              <el-checkbox :label="'line5'">Line 5</el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RelationGraph, { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';
import {onMounted, ref} from 'vue';


const graphOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultNodeColor: 'transparent',
    defaultNodeBorderWidth: 0,
    defaultNodeBorderColor: 'transparent',
    defaultLineColor: 'rgba(128, 128, 255)',
    defaultNodeShape: 1,
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'bottom',
    defaultPolyLineRadius: 10,
    defaultLineShape: 4,
    defaultLineWidth: 2,
    defaultJunctionPoint: 'tb',
    layout: {
        layoutName: 'tree',
        from: 'top',
        'min_per_width': 210,
        'min_per_height': 120,
    }
};
const graphRef = ref<RelationGraphComponent>();
const hightLighLineId = ref([]);
const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a', data: { icon: 'align_bottom' } },
            { id: 'b', text: 'b', data: { icon: 'basketball' } },
            { id: 'b1', text: 'b1', data: { icon: 'bowl_noodles' } },
            { id: 'b2', text: 'b2', data: { icon: 'delivery_truck' } },
            { id: 'b2-1', text: 'b2-1', data: { icon: 'fries' } },
            { id: 'b2-2', text: 'b2-2', data: { icon: 'microchip' } },
            { id: 'c', text: 'c', data: { icon: 'satellite_1' } },
            { id: 'c1', text: 'c1', data: { icon: 'brightness_up' } },
            { id: 'c2', text: 'c2', data: { icon: 'burger' } },
            { id: 'c3', text: 'c3', data: { icon: 'cloud_drizzle' } },
        ],
        lines: [
            { data: { 'myLineId': 'line1' }, from: 'a', to: 'b', text: 'Relation Description', styleClass: 'my-line-highlight' },
            { data: { 'myLineId': 'line2' }, from: 'b', to: 'b1', text: 'Relation Description' },
            { data: { 'myLineId': 'line3' }, from: 'b', to: 'b2', text: 'Relation Description' },
            { data: { 'myLineId': 'line4' }, from: 'b2', to: 'b2-1', text: 'Relation Description' },
            { data: { 'myLineId': 'line5' }, from: 'b2', to: 'b2-2', text: 'Relation Description' },
            { data: { 'myLineId': 'line6' }, from: 'a', to: 'c', text: 'Relation Description' },
            { data: { 'myLineId': 'line7' }, from: 'c', to: 'c1', text: 'Relation Description' },
            { data: { 'myLineId': 'line8' }, from: 'c', to: 'c2', text: 'Relation Description' },
            { data: { 'myLineId': 'line9' }, from: 'c', to: 'c3', text: 'Relation Description' },
        ],
    };
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
};
const nodeMouseOver = (currentNode: RGNode) => {
    const graphInstance = graphRef.value!.getInstance();
    for (const node of graphInstance.getNodes()) {
        currentNode.className = '';
    }
    currentNode.className = 'my-node-highlight';
    for (const link of graphInstance.getLinks()) {
        if (link.fromNode === currentNode || link.toNode === currentNode) {
            for (const line of link.relations) {
                line.className = 'my-line-highlight';
                line.lineWidth = 3;
            }
        } else {
            for (const line of link.relations) {
                line.className = '';
                line.lineWidth = graphOptions.defaultLineWidth;
            }
        }
    }
};
const nodeMouseOut = (currentNode: RGNode) => {
    const graphInstance = graphRef.value!.getInstance();
    for (const node of graphInstance.getNodes()) {
        currentNode.className = '';
    }
    setHighlightLine();
};
const setHighlightLine = () => {
    const graphInstance = graphRef.value!.getInstance();
    for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
            if (hightLighLineId.value.includes(line.data.myLineId)) {
                line.className = 'my-line-highlight';
                line.lineWidth = 3;
            } else {
                line.className = '';
                line.lineWidth = graphOptions.defaultLineWidth;
            }
        }
    }
};
onMounted(() => {
    showGraph();
});
</script>

<style lang="scss" scoped>
.c-my-panel {
  width: 350px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding: 10px;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}

::v-deep(.relation-graph) {
    .rel-node-flashing {
        animation: none;
    }
    .c-rg-line-checked-bg {
        stroke: rgba(128, 128, 255, 0.4);
    }
    .c-rg-line-checked {
        stroke: rgba(128, 128, 255, 0.4);
    }
    .c-rg-line-text-checked {
        stroke: rgba(128, 128, 255, 0.4);
        fill: rgb(91, 91, 182) !important;
    }
    .rel-node {
        border-radius: 8px;
        transition: border-radius 0.6s ease;
    }
    .rel-node-checked {
        box-shadow: 0px 0px 0px 5px rgba(128, 128, 255, 0.4);
    }
    .c-rg-line {
        stroke: rgba(128, 128, 255, 0.4);
    }
    .c-rg-line-text {
        text-anchor: start;
        transition: text-anchor 2s ease, fill 2s ease, stroke 2s ease, opacity 2s ease;
    }
    .my-node-highlight {
        .rel-node {
            border-radius: 50%;
            .my-node {
                border-radius: 50%;
                box-shadow: 0px 0px 0px 5px rgba(128, 128, 255, 0.4);
            }
        }
    }
    .my-line-highlight {
        .c-rg-line {
            animation: my-line-anm2 2s infinite;
            stroke: rgba(75, 28, 119, 0.5);
            stroke-width: 3px;
        }
        .c-rg-line-text {
            animation: my-line-text-anm2 2s infinite;
            text-anchor: middle;
            stroke: #ffffff;
            fill: rgba(75, 28, 119, 1) !important;
        }
    }
}

.my-node {
  color: #eeeeee;
  font-size: 18px;
  width: 70px;
  height: 70px;
  background-color: #8080ff;
  display: flex;
  border-radius: 8px;
  place-items: center;
  justify-content: center;
  transition: border-radius 0.6s ease;
}

@keyframes my-line-anm2 {
  from {
    stroke-dashoffset: 0;
    stroke-dasharray: 4, 4, 4;
  }
  to {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }
}

@keyframes my-line-text-anm2 {
  from {
    stroke: #ffffff;
    opacity: 0.3;
    scale: 0.5;
  }
  to {
    stroke: rgba(75, 28, 119, 1);
    opacity: 1;
    scale: 1.5;
  }
}
</style>
```

## React 版本

### `line-hightlight.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
  RGNodeSlotProps
} from 'relation-graph-react';
import { RGOptions } from 'relation-graph-react';
import {MyMultiCheckBox, MySelector} from "./RGDemoComponents/MyUIComponents";
import './line-hightlight.scss';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [hightLighLineIds, setHightLighLineIds] = useState<string[]>([]);

  const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultNodeColor: 'transparent',
    defaultNodeBorderWidth: 0,
    defaultNodeBorderColor: 'transparent',
    defaultLineColor: 'rgba(128, 128, 255)',
    defaultNodeShape: 1,
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'bottom',
    defaultPolyLineRadius: 10,
    defaultLineShape: 4,
    defaultLineWidth: 2,
    defaultJunctionPoint: 'tb',
    layout: {
      layoutName: 'tree',
      from: 'top',
      min_per_width: 210,
      min_per_height: 200,
    }
  };

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'a', data: { icon: 'align_bottom' } },
        { id: 'b', text: 'b', data: { icon: 'basketball' } },
        { id: 'b1', text: 'b1', data: { icon: 'bowl_noodles' } },
        { id: 'b2', text: 'b2', data: { icon: 'delivery_truck' } },
        { id: 'b2-1', text: 'b2-1', data: { icon: 'fries' } },
        { id: 'b2-2', text: 'b2-2', data: { icon: 'microchip' } },
        { id: 'c', text: 'c', data: { icon: 'satellite_1' } },
        { id: 'c1', text: 'c1', data: { icon: 'brightness_up' } },
        { id: 'c2', text: 'c2', data: { icon: 'burger' } },
        { id: 'c3', text: 'c3', data: { icon: 'cloud_drizzle' } },
      ],
      lines: [
        { data: { 'myLineId': 'line1' }, from: 'a', to: 'b', text: 'Relation Description', styleClass: 'my-line-highlight' },
        { data: { 'myLineId': 'line2' }, from: 'b', to: 'b1', text: 'Relation Description' },
        { data: { 'myLineId': 'line3' }, from: 'b', to: 'b2', text: 'Relation Description' },
        { data: { 'myLineId': 'line4' }, from: 'b2', to: 'b2-1', text: 'Relation Description' },
        { data: { 'myLineId': 'line5' }, from: 'b2', to: 'b2-2', text: 'Relation Description' },
        { data: { 'myLineId': 'line6' }, from: 'a', to: 'c', text: 'Relation Description' },
        { data: { 'myLineId': 'line7' }, from: 'c', to: 'c1', text: 'Relation Description' },
        { data: { 'myLineId': 'line8' }, from: 'c', to: 'c2', text: 'Relation Description' },
        { data: { 'myLineId': 'line9' }, from: 'c', to: 'c3', text: 'Relation Description' },
      ],
    };
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setJsonData(__graph_json_data);
  };

  const nodeMouseOver = (currentNode: RGNode) => {
    const graphInstance = graphRef.current!.getInstance();
    for (const node of graphInstance?.getNodes() || []) {
      currentNode.className = '';
    }
    currentNode.className = 'my-node-highlight';
    for (const link of graphInstance?.getLinks() || []) {
      if (link.fromNode === currentNode || link.toNode === currentNode) {
        for (const line of link.relations) {
          line.className = 'my-line-highlight';
          line.lineWidth = 3;
        }
      } else {
        for (const line of link.relations) {
          line.className = '';
          line.lineWidth = graphOptions.defaultLineWidth;
        }
      }
    }
    graphInstance.dataUpdated();
  };

  const nodeMouseOut = (currentNode: RGNode) => {
    const graphInstance = graphRef.current!.getInstance();
    for (const node of graphInstance?.getNodes() || []) {
      currentNode.className = '';
    }
    updateHighlightLines();
  };

  const updateHighlightLines = () => {
    const graphInstance = graphRef.current!.getInstance();
    for (const link of graphInstance?.getLinks() || []) {
      for (const line of link.relations) {
        if (hightLighLineIds.includes(line.data?.myLineId)) {
          line.className = 'my-line-highlight';
          line.lineWidth = 3;
        } else {
          line.className = '';
          line.lineWidth = graphOptions.defaultLineWidth;
        }
      }
    }
    graphInstance.dataUpdated();
  };
  const MyNodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    return (
      <div className="h-full" onMouseEnter={() => nodeMouseOver(node)} onMouseLeave={() => nodeMouseOut(node)}>
        <div className="my-node">
          {node.text}
        </div>
      </div>
    );
  };
  useEffect(() => {
    showGraph();
  }, []);
  useEffect(() => {
    updateHighlightLines();
  }, [hightLighLineIds]);

  return (
    <div>
      <div className="my-graph" style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          nodeSlot={MyNodeSlot}
          graphPlugSlot={
            <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
              <div className="c-option-name">
                Set selected line:
              </div>
              <MyMultiCheckBox
                data={[
                  { value: 'line1', text: 'Line 1' },
                  { value: 'line2', text: 'Line 2' },
                  { value: 'line3', text: 'Line 3' },
                  { value: 'line4', text: 'Line 4' },
                  { value: 'line5', text: 'Line 5' },
                ]}
                currentValue={hightLighLineIds}
                onChange={(newValue: string[]) => {
                  setHightLighLineIds(newValue);
                }}
              />
          </div>}
        >

        </RelationGraph>
      </div>
    </div>
  );
};


export default MyComponent;
```

### `line-hightlight.scss`

```scss
.c-my-panel {
  width: 350px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding: 10px;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}

.relation-graph {
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked-bg {
    stroke: rgba(128, 128, 255, 0.4);
  }
  .c-rg-line-checked {
    stroke: rgba(128, 128, 255, 0.4);
  }
  .c-rg-line-text-checked {
    stroke: rgba(128, 128, 255, 0.4);
    fill: rgb(91, 91, 182) !important;
  }
  .rel-node {
    border-radius: 8px;
    transition: border-radius 0.6s ease;
  }
  .rel-node-checked {
    box-shadow: 0px 0px 0px 5px rgba(128, 128, 255, 0.4);
  }
  .c-rg-line {
    stroke: rgba(128, 128, 255, 0.4);
  }
  .c-rg-line-text {
    text-anchor: start;
    transition: text-anchor 2s ease, fill 2s ease, stroke 2s ease, opacity 2s ease;
  }
  .my-node-highlight {
    .rel-node {
      border-radius: 50%;
      .my-node {
        border-radius: 50%;
        box-shadow: 0px 0px 0px 5px rgba(128, 128, 255, 0.4);
      }
    }
  }
  .my-line-highlight {
    .c-rg-line {
      animation: my-line-anm2 2s infinite;
      stroke: rgba(75, 28, 119, 0.5);
      stroke-width: 3px;
    }
    .c-rg-line-text {
      animation: my-line-text-anm2 2s infinite;
      text-anchor: middle;
      stroke: #ffffff;
      fill: rgba(75, 28, 119, 1) !important;
    }
  }
}

.my-node {
  color: #eeeeee;
  font-size: 18px;
  width: 70px;
  height: 70px;
  background-color: #8080ff;
  display: flex;
  border-radius: 8px;
  place-items: center;
  justify-content: center;
  transition: border-radius 0.6s ease;
}

@keyframes my-line-anm2 {
  from {
    stroke-dashoffset: 0;
    stroke-dasharray: 4, 4, 4;
  }
  to {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }
}

@keyframes my-line-text-anm2 {
  from {
    stroke: #ffffff;
    opacity: 0.3;
    scale: 0.5;
  }
  to {
    stroke: rgba(75, 28, 119, 1);
    opacity: 1;
    scale: 1.5;
  }
}
```

### 📂 RGDemoComponents

#### `MyUIComponents.tsx`

```javascript
import React from "react";

export interface MySelectorProps {
  small?: boolean
  currentValue: string|number
  data:{value: string|number, text:string}[]
  onChange: (newValue:string|number, label:string) => void
}
export const MySelector:React.FC<MySelectorProps> = ({small, data, onChange, currentValue}) => {
  return (
    <div className="flex flex-wrap justify-center rounded-lg border border-gray-900 overflow-hidden">
      {
        data.map(item =>
          <div key={item.value}
               className={`border-r w-auto text-xs cursor-pointer whitespace-nowrap ${currentValue === item.value && 'bg-blue-500 text-white'} ${small?' px-2 h-6 leading-6':'h-8 px-3 leading-8'}`}
               onClick={() => {onChange(item.value, item.text);}}
          >
          {item.text}
        </div>)
      }
    </div>
  );
};
export interface MySwitchProps {
  currentValue: boolean
  onChange: (newValue:boolean) => void
}
export const MySwitch:React.FC<MySwitchProps> = ({onChange, currentValue}) => {
  return (
    <div className={`w-14 flex rounded-full border p-0.5 ${currentValue ? 'justify-end border-blue-500' : 'justify-start border-gray-500'}`}>
      <div
        className={`w-8 h-5 leading-8 rounded-full w-auto px-3 text-xs cursor-pointer whitespace-nowrap ${currentValue ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => {onChange(!currentValue);}}>
      </div>
    </div>
  );
};
export interface MySliderProps {
  min: number
  max: number
  step: number
  currentValue: number
  onChange: (newValue:number) => void
}
export const MySlider:React.FC<MySliderProps> = ({min, max, step, currentValue, onChange}) => {
  return (
    <div>
      <input
        type="range"
        className="w-72"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => { onChange(parseFloat(e.target.value))}}
      />
    </div>
  );
};

export interface MyRangeSliderProps {
  min: number
  max: number
  step: number
  currentValue: [number, number]
  onChange: (newValue:[number, number]) => void
}
export const MyRangeSlider:React.FC<MyRangeSliderProps> = ({min, max, step, currentValue, onChange}) => {
  return (
    <div className="w-72">
      <div>Min:</div>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={currentValue[0]}
        onChange={(e) => { if (parseFloat(e.target.value) < currentValue[1]) onChange([parseFloat(e.target.value), currentValue[1]])}}
      />
      <div>Max:</div>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={currentValue[1]}
        onChange={(e) => { if (parseFloat(e.target.value) > currentValue[0]) onChange([currentValue[0], parseFloat(e.target.value)])}}
      />
    </div>
  );
};
export interface MyButtonProps {
  onClick: () => void
  disabled?: boolean
}
export const MyButton:React.FC<MyButtonProps> = ({children, onClick, disabled}) => {
  return (
    <button className={`mr-2 px-2 py-1 rounded ${disabled===true ? 'bg-gray-300 text-black cursor-not-allowed':'bg-blue-500 hover:bg-blue-700 text-white'}`}
            onClick={()=>{onClick();}}>{children}</button>
  );
};
export interface MyLinkButtonProps {
  onClick: () => void
}
export const MyLinkButton:React.FC<MyLinkButtonProps> = ({children, onClick}) => {
  return (
    <div className="text-blue-600 cursor-pointer underline decoration-1" onClick={()=>{onClick();}}>
      {children}
    </div>
  );
};
export interface MyCheckBoxProps {
  currentValue: string|number
  data:{value: string|number, text:string}[]
  onChange: (newValue:string|number, label:string) => void
}
export const MyCheckBox:React.FC<MyCheckBoxProps> = ({data, onChange, currentValue}) => {
  // console.log(data);
  return (
    <div className="flex gap-2 flex-wrap">
      {
        data.map(thisItem =>
          <div
            key={thisItem.value}
            className={`px-1 py-0.5 flex justify-center place-items-center rounded-sm text-sm cursor-pointer  hover:bg-gray-300 ${currentValue === thisItem.value ? 'text-blue-600':'text-gray-500'}`}
            onClick={()=>{onChange(thisItem.value, thisItem.text);}}
          >
            <div className={`w-4 h-4 mr-1 rounded-full ${currentValue === thisItem.value ? 'border border-blue-500 bg-blue-500 text-blue-600':'border border-gray-500 text-gray-500'}`}></div>
            {thisItem.text}
          </div>
        )
      }
    </div>
  );
};
export interface CheckboxOption {
  value: string | number;
  text: string;
}

export interface MyMultiCheckBoxProps {
  currentValue: (string | number)[];
  checkboxOptions: CheckboxOption[];
  onChange: (newValue: (string | number)[]) => void;
}
export const MyMultiCheckBox:React.FC<MyMultiCheckBoxProps> = ({data, onChange, currentValue}) => {
  // console.log(data);
  const onClickItem = (item: string | number) => {
    const newValue = currentValue.includes(item)
      ? currentValue.filter((value) => value !== item)
      : [...currentValue, item];
    onChange(newValue);
  };
  return (
    <div className="flex gap-2 flex-wrap">
      {
        data.map(thisItem =>
          <div
            key={thisItem.value}
            className={`px-1 py-0.5 flex justify-center place-items-center rounded-sm text-sm cursor-pointer  hover:bg-gray-300 ${currentValue === thisItem.value ? 'text-blue-600':'text-gray-500'}`}
            onClick={()=>{onClickItem(thisItem.value);}}
          >
            <div className={`w-4 h-4 mr-1 rounded-full ${currentValue.includes(thisItem.value) ? 'border border-blue-500 bg-blue-500 text-blue-600':'border border-gray-500 text-gray-500'}`}></div>
            {thisItem.text}
          </div>
        )
      }
    </div>
  );
};
export const ElMessage = (messageObject) => {
  console.warn(messageObject);
}
export const ElNotification = (messageObject) => {
  console.warn(messageObject);
}
```
