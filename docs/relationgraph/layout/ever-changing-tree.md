# tree-变化多端的树

## Vue2 版本

### `ever-changing-tree.vue`

```javascript
<template>
  <div>

    <div ref="myPage" class="my-graph" style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">布局方向：</div>
            <el-radio-group size="mini" v-model="layoutFrom" @change="updateLayouterOptions">
              <el-radio-button label="left">left</el-radio-button>
              <el-radio-button label="right">right</el-radio-button>
              <el-radio-button label="top">top</el-radio-button>
              <el-radio-button label="bottom">bottom</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">布局层级内扩展方向：</div>
            <el-radio-group size="mini" v-model="layoutExpansionDirection" @change="updateLayouterOptions">
              <el-radio-button label="center">默认</el-radio-button>
              <el-radio-button label="left">向左</el-radio-button>
              <el-radio-button label="right">向右</el-radio-button>
              <el-radio-button label="top">向上</el-radio-button>
              <el-radio-button label="bottom">向下</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">连线形状：</div>
            <el-radio-group v-model="lineShape" size="mini" @change="tabChange">
              <el-radio-button :label="1">直线</el-radio-button>
              <el-radio-button :label="2" >2</el-radio-button>
              <el-radio-button :label="3" >3</el-radio-button>
              <el-radio-button :label="5" >5</el-radio-button>
              <el-radio-button :label="6" >6</el-radio-button>
              <el-radio-button :label="7" >7</el-radio-button>
              <el-radio-button :label="4" >折线</el-radio-button>
            </el-radio-group>
            <div v-if="lineShape === 4">
              <div class="c-option-name">折线弯角大小：</div>
              <el-radio-group v-model="polyLineRadius" size="mini" @change="tabChange">
                <el-radio-button :label="0">0</el-radio-button>
                <el-radio-button :label="3">3</el-radio-button>
                <el-radio-button :label="5" >5</el-radio-button>
                <el-radio-button :label="8" >8</el-radio-button>
                <el-radio-button :label="10" >10</el-radio-button>
                <el-radio-button :label="15" >15</el-radio-button>
              </el-radio-group>
            </div>
            <div class="c-option-name">连接点：</div>
            <el-radio-group v-model="linePoint" size="mini" @change="tabChange">
              <el-radio-button label="border">边缘</el-radio-button>
              <el-radio-button label="tb">上下</el-radio-button>
              <el-radio-button label="lr">左右</el-radio-button>
              <el-radio-button label="ltrb">ltrb</el-radio-button>
              <el-radio-button label="left">L</el-radio-button>
              <el-radio-button label="top">T</el-radio-button>
              <el-radio-button label="right">R</el-radio-button>
              <el-radio-button label="bottom">B</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">层级距离 & 节点间距：</div>
            <div>
              <div>
                <div>
                  <div class="c-option-name">节点间【横向】距离:</div>
                  <el-slider v-model="range_horizontal" :min="40" :max="500" @change="updateLayouterOptions">
                  </el-slider>
                </div>
                <div>
                  <div class="c-option-name">节点间【纵向】距离:</div>
                  <el-slider v-model="range_vertical" :min="40" :max="500" @change="updateLayouterOptions">
                  </el-slider>
                </div>
              </div>
<!--              <div>-->
<!--                <div style="font-size:14px;">-->
<!--                  <div class="c-option-name">依次设置每个层级的距离:</div>-->
<!--                  <el-input v-model="levelDistance" placeholder="请输入内容" @change="tabChange"></el-input>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
const graphOptions = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineColor: '#2E74B5',
  defaultNodeColor: '#2E74B5',
  defaultNodeBorderWidth: 0,
  defaultNodeBorderColor: '#2E74B5',
  defaultNodeFontColor: '#ffffff',
  defaultNodeWidth: 40,
  defaultNodeHeight: 40,
  toolBarDirection: 'h',
  toolBarPositionH: 'center',
  toolBarPositionV: 'bottom',
  defaultLineShape: 2,
  defaultJunctionPoint: 'lr',
  // lineUseTextPath: true,
  defaultLineTextOffset_x: 2,
  defaultLineTextOffset_y: -3,
  layout: {
    layoutName: 'tree',
    from: 'left',
    min_per_width: 70, // 根据节点的宽度设置，这个是让图谱看起来偏亮的关键
    min_per_height: 50
  }
  // 这里可以参考"Graph 图谱"中的参数进行设置
};
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
    { 'from': 'a', 'to': 'b', text: 'Text' },
    { 'from': 'b', 'to': 'b1', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-1', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-2', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-3', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-4', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-5', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-6', text: 'Text' },
    { 'from': 'b', 'to': 'b2', text: 'Text' },
    { 'from': 'b2', 'to': 'b2-1', text: 'Text' },
    { 'from': 'b2', 'to': 'b2-2', text: 'Text' },
    { 'from': 'a', 'to': 'c', text: 'Text' },
    { 'from': 'c', 'to': 'c1', text: 'Text' },
    { 'from': 'c', 'to': 'c2', text: 'Text' },
    { 'from': 'c', 'to': 'c3', text: 'Text' }]
};
export default {
  name: 'Demo4AdvLineSlot',
  components: { },
  data() {
    return {
      lineShape: 2,
      polyLineRadius: 5,
      layoutExpansionDirection: 'center',
      linePoint: 'lr',
      layoutFrom: 'left',
      range_horizontal: 300,
      range_vertical: 70,
      levelDistance: '150,200,250,300,350',
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    tabChange() {
      const graphInstance = this.$refs.graphRef.getInstance();
      const graphOptions = graphInstance.options;
      graphOptions.defaultLineShape = this.lineShape;
      graphOptions.defaultPolyLineRadius = this.polyLineRadius;
      graphOptions.defaultJunctionPoint = this.linePoint;
    },
    async updateLayouterOptions() {
      this.graphOptions.layout.from = this.layoutFrom;
      this.graphOptions.layout.layoutExpansionDirection = this.layoutExpansionDirection;
      this.graphOptions.layout.min_per_width = this.range_horizontal;
      this.graphOptions.layout.max_per_width = this.range_horizontal + 10;
      this.graphOptions.layout.min_per_height = this.range_vertical;
      this.graphOptions.layout.max_per_height = this.range_vertical + 10;
      this.graphOptions.defaultPolyLineRadius = this.polyLineRadius;
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setOptions(this.graphOptions);
      this.tabChange();
    }
  }
};
</script>
<style lang="scss" scoped>
.c-my-panel{
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
  .c-my-options {
    text-align: center;
    .c-my-option-item {
      text-align: left;
      color: #1da9f5;
      cursor: pointer;
      border-radius: 5px;
      padding-left: 10px;
      margin-top: 5px;
      line-height: 25px;
      &:hover{
        background-color: rgba(29, 169, 245, 0.2);
      }
    }
  }
}
</style>
```

## Vue3 版本

### `ever-changing-tree.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">Layout Direction:</div>
            <el-radio-group size="small" v-model="layoutFrom" @change="updateLayouterOptions">
              <el-radio-button label="left">left</el-radio-button>
              <el-radio-button label="right">right</el-radio-button>
              <el-radio-button label="top">top</el-radio-button>
              <el-radio-button label="bottom">bottom</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">Layout Expansion Direction:</div>
            <el-radio-group size="small" v-model="layoutExpansionDirection" @change="updateLayouterOptions">
              <el-radio-button label="center">Default</el-radio-button>
              <el-radio-button label="left">Left</el-radio-button>
              <el-radio-button label="right">Right</el-radio-button>
              <el-radio-button label="top">Top</el-radio-button>
              <el-radio-button label="bottom">Bottom</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">Line Shape:</div>
            <el-radio-group v-model="lineShape" size="small" @change="tabChange">
              <el-radio-button :label="1">Straight</el-radio-button>
              <el-radio-button :label="2">2</el-radio-button>
              <el-radio-button :label="3">3</el-radio-button>
              <el-radio-button :label="5">5</el-radio-button>
              <el-radio-button :label="6">6</el-radio-button>
              <el-radio-button :label="7">7</el-radio-button>
              <el-radio-button :label="4">Polyline</el-radio-button>
            </el-radio-group>
            <div v-if="lineShape === 4">
              <div class="c-option-name">Polyline Radius:</div>
              <el-radio-group v-model="polyLineRadius" size="small" @change="tabChange">
                <el-radio-button :label="0">0</el-radio-button>
                <el-radio-button :label="3">3</el-radio-button>
                <el-radio-button :label="5">5</el-radio-button>
                <el-radio-button :label="8">8</el-radio-button>
                <el-radio-button :label="10">10</el-radio-button>
                <el-radio-button :label="15">15</el-radio-button>
              </el-radio-group>
            </div>
            <div class="c-option-name">Junction Point:</div>
            <el-radio-group v-model="linePoint" size="small" @change="tabChange">
              <el-radio-button label="border">Border</el-radio-button>
              <el-radio-button label="tb">Top-Bottom</el-radio-button>
              <el-radio-button label="lr">Left-Right</el-radio-button>
              <el-radio-button label="ltrb">Left-Top-Right-Bottom</el-radio-button>
              <el-radio-button label="left">L</el-radio-button>
              <el-radio-button label="top">T</el-radio-button>
              <el-radio-button label="right">R</el-radio-button>
              <el-radio-button label="bottom">B</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">Level Distance & Node Spacing:</div>
            <div>
              <div>
                <div>
                  <div class="c-option-name">Node Spacing (Horizontal):</div>
                  <el-slider v-model="range_horizontal" :min="40" :max="500" @change="updateLayouterOptions">
                  </el-slider>
                </div>
                <div>
                  <div class="c-option-name">Node Spacing (Vertical):</div>
                  <el-slider v-model="range_vertical" :min="40" :max="500" @change="updateLayouterOptions">
                  </el-slider>
                </div>
              </div>
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph, {
    RGOptions,
    RGJsonData,
    RGNode,
    RGLine,
    RGLink,
    RGUserEvent,
    RelationGraphComponent,
    RGTreeLayoutOptions
} from 'relation-graph-vue3';

const graphOptions: RGOptions = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineColor: '#2E74B5',
  defaultNodeColor: '#2E74B5',
  defaultNodeBorderWidth: 0,
  defaultNodeBorderColor: '#2E74B5',
  defaultNodeFontColor: '#ffffff',
  defaultNodeWidth: 40,
  defaultNodeHeight: 40,
  toolBarDirection: 'h',
  toolBarPositionH: 'center',
  toolBarPositionV: 'bottom',
  defaultLineShape: 2,
  defaultJunctionPoint: 'lr',
  defaultLineTextOffset_x: 2,
  defaultLineTextOffset_y: -3,
  layout: {
    layoutName: 'tree',
    from: 'left',
    'min_per_width': 70,
    'min_per_height': 50

  }
};

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
    { 'from': 'a', 'to': 'b', text: 'Text' },
    { 'from': 'b', 'to': 'b1', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-1', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-2', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-3', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-4', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-5', text: 'Text' },
    { 'from': 'b1', 'to': 'b1-6', text: 'Text' },
    { 'from': 'b', 'to': 'b2', text: 'Text' },
    { 'from': 'b2', 'to': 'b2-1', text: 'Text' },
    { 'from': 'b2', 'to': 'b2-2', text: 'Text' },
    { 'from': 'a', 'to': 'c', text: 'Text' },
    { 'from': 'c', 'to': 'c1', text: 'Text' },
    { 'from': 'c', 'to': 'c2', text: 'Text' },
    { 'from': 'c', 'to': 'c3', text: 'Text' }
  ]
};
const lineShape = ref(2);
const polyLineRadius = ref(5);
const layoutExpansionDirection = ref('center');
const linePoint = ref('lr');
const layoutFrom = ref('left');
const range_horizontal = ref(300);
const range_vertical = ref(70);
const graphRef = ref<RelationGraphComponent>();

const showGraph = async () => {
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

const tabChange = () => {
    const graphInstance = graphRef.value!.getInstance();
    const graphOptions = graphInstance.options;
    graphOptions.defaultLineShape = lineShape.value;
    graphOptions.defaultPolyLineRadius = polyLineRadius.value;
    graphOptions.defaultJunctionPoint = linePoint.value;
};

const updateLayouterOptions = async () => {
    const treeLayoutOptions = graphOptions.layout as RGTreeLayoutOptions;
    treeLayoutOptions.from = layoutFrom.value;
    treeLayoutOptions.layoutExpansionDirection = layoutExpansionDirection.value;
    treeLayoutOptions.min_per_width = range_horizontal.value;
    treeLayoutOptions.max_per_width = range_horizontal.value + 10;
    treeLayoutOptions.min_per_height = range_vertical.value;
    treeLayoutOptions.max_per_height = range_vertical.value + 10;
    graphOptions.defaultPolyLineRadius = polyLineRadius.value;
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setOptions(graphOptions);
    tabChange();
};

onMounted(() => {
    showGraph();
});
</script>

<style lang="scss" scoped>
.c-my-panel {
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .c-my-options {
    text-align: center;
    .c-my-option-item {
      text-align: left;
      color: #1da9f5;
      cursor: pointer;
      border-radius: 5px;
      padding-left: 10px;
      margin-top: 5px;
      line-height: 25px;
      &:hover {
        background-color: rgba(29, 169, 245, 0.2);
      }
    }
  }
}
</style>
```

## React 版本

### `ever-changing-tree.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {
  RGOptions,
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
  RGTreeLayoutOptions,
  RGLineShape, RGJunctionPoint
} from 'relation-graph-react';
import {MySelector} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineColor: '#2E74B5',
    defaultNodeColor: '#2E74B5',
    defaultNodeBorderWidth: 0,
    defaultNodeBorderColor: '#2E74B5',
    defaultNodeFontColor: '#ffffff',
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    toolBarDirection: 'h',
    toolBarPositionH: 'center',
    toolBarPositionV: 'bottom',
    defaultLineShape: 2,
    defaultJunctionPoint: 'lr',
    defaultLineTextOffset_x: 2,
    defaultLineTextOffset_y: -3,
    layout: {
      layoutName: 'tree',
      from: 'left',
      'min_per_width': 70,
      'min_per_height': 50

    }
  };

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
      { 'from': 'a', 'to': 'b', text: 'Text' },
      { 'from': 'b', 'to': 'b1', text: 'Text' },
      { 'from': 'b1', 'to': 'b1-1', text: 'Text' },
      { 'from': 'b1', 'to': 'b1-2', text: 'Text' },
      { 'from': 'b1', 'to': 'b1-3', text: 'Text' },
      { 'from': 'b1', 'to': 'b1-4', text: 'Text' },
      { 'from': 'b1', 'to': 'b1-5', text: 'Text' },
      { 'from': 'b1', 'to': 'b1-6', text: 'Text' },
      { 'from': 'b', 'to': 'b2', text: 'Text' },
      { 'from': 'b2', 'to': 'b2-1', text: 'Text' },
      { 'from': 'b2', 'to': 'b2-2', text: 'Text' },
      { 'from': 'a', 'to': 'c', text: 'Text' },
      { 'from': 'c', 'to': 'c1', text: 'Text' },
      { 'from': 'c', 'to': 'c2', text: 'Text' },
      { 'from': 'c', 'to': 'c3', text: 'Text' }
    ]
  };

  const [lineShape, setLineShape] = useState(2);
  const [polyLineRadius, setPolyLineRadius] = useState(5);
  const [layoutExpansionDirection,setLayoutExpansionDirection] = useState('center');
  const [linePoint, setLinePoint] = useState('lr');
  const [layoutFrom, setLayoutFrom] = useState('left');
  const [range_horizontal, setRange_horizontal] = useState(300);
  const [range_vertical, setRange_vertical] = useState(70);
  const graphRef = useRef<RelationGraphComponent|null>(null);

  const showSeeksGraph = async () => {
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setJsonData(__graph_json_data);
    await graphInstance?.moveToCenter();
    await graphInstance?.zoomToFit();
  };

  const updateOptions = () => {
    const graphInstance = graphRef.current?.getInstance();
    const graphOptions = graphInstance?.options!;
    graphOptions.defaultLineShape = lineShape as RGLineShape;
    graphOptions.defaultPolyLineRadius = polyLineRadius;
    graphOptions.defaultJunctionPoint = linePoint as RGJunctionPoint;
    graphInstance?.dataUpdated();
  };

  const updateLayouterOptions = async () => {
    const treeLayoutOptions = graphOptions.layout as RGTreeLayoutOptions;
    treeLayoutOptions.from = layoutFrom;
    treeLayoutOptions.layoutExpansionDirection = layoutExpansionDirection;
    treeLayoutOptions.min_per_width = range_horizontal;
    treeLayoutOptions.max_per_width = range_horizontal + 10;
    treeLayoutOptions.min_per_height = range_vertical;
    treeLayoutOptions.max_per_height = range_vertical + 10;
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setOptions(graphOptions);
    await graphInstance?.doLayout();
  };

  useEffect(() => {
    showSeeksGraph();
  }, []);
  useEffect(() => {
    updateOptions();
  }, [lineShape, polyLineRadius, linePoint]);
  useEffect(() => {
    updateLayouterOptions();
  }, [layoutExpansionDirection, layoutFrom, range_horizontal, range_vertical]);

  return (
    <div>
      <div className="my-graph" style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          <div className="c-option-name">Layout Direction:</div>
          <MySelector

            data={[
              { value: 'left', text: 'left' },
              { value: 'right', text: 'right' },
              { value: 'top', text: 'top' },
              { value: 'bottom', text: 'bottom' }
            ]}
            currentValue={layoutFrom}
            onChange={(newValue: string, label) => { setLayoutFrom(newValue) }}
          />
          <div className="c-option-name">Layout Expansion Direction:</div>
          <MySelector

            data={[
              { value: 'center', text: 'Default' },
              { value: 'left', text: 'Left' },
              { value: 'right', text: 'Right' },
              { value: 'top', text: 'Top' },
              { value: 'bottom', text: 'Bottom' }
            ]}
            currentValue={layoutExpansionDirection}
            onChange={(newValue: string, label) => { setLayoutExpansionDirection(newValue); }}
          />
          <div className="c-option-name">Line Shape:</div>
          <MySelector

            data={[
              { value: 1, text: 'Straight' },
              { value: 2, text: '2' },
              { value: 3, text: '3' },
              { value: 5, text: '5' },
              { value: 6, text: '6' },
              { value: 7, text: '7' },
              { value: 4, text: 'Polyline' }
            ]}
            currentValue={lineShape}
            onChange={(newValue: number, label) => { setLineShape(newValue); }}
          />
          {lineShape === 4 && (
            <div>
              <div className="c-option-name">Polyline Radius:</div>
              <MySelector

                data={[
                  { value: 0, text: '0' },
                  { value: 3, text: '3' },
                  { value: 5, text: '5' },
                  { value: 8, text: '8' },
                  { value: 10, text: '10' },
                  { value: 15, text: '15' }
                ]}
                currentValue={polyLineRadius}
                onChange={(newValue: number, label) => { setPolyLineRadius(newValue); }}
              />
            </div>
          )}
          <div className="c-option-name">Junction Point:</div>
          <MySelector

            data={[
              { value: 'border', text: 'Border' },
              { value: 'tb', text: 'Top-Bottom' },
              { value: 'lr', text: 'Left-Right' },
              { value: 'ltrb', text: 'Left-Top-Right-Bottom' },
              { value: 'left', text: 'L' },
              { value: 'top', text: 'T' },
              { value: 'right', text: 'R' },
              { value: 'bottom', text: 'B' }
            ]}
            currentValue={linePoint}
            onChange={(newValue: string, label) => { setLinePoint(newValue); }}
          />
          <div className="c-option-name">Level Distance & Node Spacing:</div>
          <div>
            <div>
              <div>
                <div className="c-option-name">Node Spacing (Horizontal):</div>
                <input

                  type="range"
                  min={40}
                  max={500}
                  value={range_horizontal}
                  onChange={(e) => { setRange_horizontal(parseFloat(e.target.value)); }}
                />
              </div>
              <div>
                <div className="c-option-name">Node Spacing (Vertical):</div>
                <input

                  type="range"
                  min={40}
                  max={500}
                  value={range_vertical}
                  onChange={(e) => { setRange_vertical(parseFloat(e.target.value)); }}
                />
              </div>
            </div>
          </div>
        </div>
        <RelationGraph ref={graphRef} options={graphOptions}>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
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
