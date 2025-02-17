# 线条高级用法-曲线上的文字

## Vue2 版本

### `lineAdv2.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" :class="{
      'my-line-style-start': lineTextAnchor === 'start',
      'my-line-style-end': lineTextAnchor === 'end'
    }" style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">
              连线形状：
            </div>
            <el-radio-group v-model="lineShape" size="small" @change="tabChange">
              <el-radio-button :label="1">直线</el-radio-button>
              <el-radio-button :label="2" >曲线2</el-radio-button>
              <el-radio-button :label="5" >曲线5</el-radio-button>
              <el-radio-button :label="6" >曲线6</el-radio-button>
              <el-radio-button :label="4" >折线</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">
              连接点：
            </div>
            <el-radio-group v-model="linePoint" size="small" @change="tabChange">
              <el-radio-button label="border">边缘</el-radio-button>
              <el-radio-button label="lr" >左右</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">
              连线文字自身对齐：
            </div>
            <el-radio-group v-model="lineTextAnchor" size="small" @change="tabChange">
              <el-radio-button label="start">start</el-radio-button>
              <el-radio-button label="middle">middle</el-radio-button>
              <el-radio-button label="end" >end</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">
              连线文字在连线上的位置：
            </div>
            <el-radio-group v-model="lineTextPlace" size="small" @change="tabChange">
              <el-radio-button label="">默认位置</el-radio-button>
              <el-radio-button label="start">靠近起点</el-radio-button>
              <el-radio-button label="end" >靠近终点</el-radio-button>
              <el-radio-button label="20%" >20%</el-radio-button>
              <el-radio-button label="40%" >40%</el-radio-button>
              <el-radio-button label="60%" >60%</el-radio-button>
              <el-radio-button label="80%" >80%</el-radio-button>
              <el-radio-button label="90%" >90%</el-radio-button>
            </el-radio-group>
<!--            <div class="c-option-name">连接文字x偏移量：{{defaultLineTextOffset_x}}</div>-->
<!--            <el-slider v-model="defaultLineTextOffset_x" :min="-250" :max="250" :show-tooltip="true" @change="tabChange"></el-slider>-->
<!--            <div class="c-option-name">连接文字y偏移量：{{defaultLineTextOffset_y}}</div>-->
<!--            <el-slider v-model="defaultLineTextOffset_y" :min="-50" :max="50" @change="tabChange"></el-slider>-->
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
  defaultNodeWidth: 170,
  defaultNodeHeight: 40,
  toolBarDirection: 'h',
  toolBarPositionH: 'center',
  toolBarPositionV: 'bottom',
  defaultLineShape: 2,
  defaultJunctionPoint: 'lr',
  lineUseTextPath: true,
  defaultLineTextOffset_x: 2,
  defaultLineTextOffset_y: -3,
    lineTextMaxLength: 4,
  layout: {
    layoutName: 'tree',
    from: 'left',
    min_per_width: 410, // 根据节点的宽度设置，这个是让图谱看起来偏亮的关键
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
    { 'from': 'a', 'to': 'b', text: '这些关系文字都很长' },
    { 'from': 'b', 'to': 'b1', text: '这些关系文字都很长' },
    { 'from': 'b1', 'to': 'b1-1', text: '这些关系文字都很长' },
    { 'from': 'b1', 'to': 'b1-2', text: '这些关系文字都很长' },
    { 'from': 'b1', 'to': 'b1-3', text: '这些关系文字都很长' },
    { 'from': 'b1', 'to': 'b1-4', text: '这些关系文字都很长' },
    { 'from': 'b1', 'to': 'b1-5', text: '这些关系文字都很长' },
    { 'from': 'b1', 'to': 'b1-6', text: '这些关系文字都很长' },
    { 'from': 'b', 'to': 'b2', text: '这些关系文字都很长' },
    { 'from': 'b2', 'to': 'b2-1', text: '这些关系文字都很长' },
    { 'from': 'b2', 'to': 'b2-2', text: '这些关系文字都很长' },
    { 'from': 'a', 'to': 'c', text: '这些关系文字都很长' },
    { 'from': 'c', 'to': 'c1', text: '这些关系文字都很长' },
    { 'from': 'c', 'to': 'c2', text: '这些关系文字都很长' },
    { 'from': 'c', 'to': 'c3', text: '这些关系文字都很长' }]
};
export default {
  name: 'Demo4AdvLineSlot',
  components: { },
  data() {
    return {
      defaultLineTextOffset_x: 2,
      defaultLineTextOffset_y: -3,
      lineShape: 2,
      linePoint: 'lr',
      lineTextAnchor: 'middle',
        lineTextPlace: '',
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
      graphOptions.defaultJunctionPoint = this.linePoint;
      graphOptions.defaultLineTextOffset_x = this.defaultLineTextOffset_x;
      graphOptions.defaultLineTextOffset_y = this.defaultLineTextOffset_y;
        const lines = graphInstance.getLinks().reduce((currentLines, link) => currentLines.concat(...link.relations), []);
        for (const line of lines) {
            line.placeText = this.lineTextPlace;
        }
    },
    async updateLayouterOptions() {
      const graphInstance = this.$refs.graphRef.getInstance();
      const graphOptions = graphInstance.options;
      graphOptions.defaultLineTextOffset_x = this.defaultLineTextOffset_x;
      graphOptions.defaultLineTextOffset_y = this.defaultLineTextOffset_y;
      // const graphInstance = this.$refs.graphRef.getInstance();
      // await graphInstance.setOptions(JSON.parse(JSON.stringify(this.graphOptions)));
      // await graphInstance.refresh();
    },
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
  background-color: rgba(239, 239, 239, 0.86);
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}
::v-deep .my-line-style-start {
  .c-rg-line-text {
    textPath {
      text-anchor: start;
      startOffset: 0% !important;
    }
  }
}
::v-deep .my-line-style-end {
  .c-rg-line-text {
    textPath {
      text-anchor: end;
      startOffset: 100% !important;
    }
  }
}
</style>
```

## Vue3 版本

### `lineAdv2.vue`

```javascript
<template>
  <div>
    <div
      ref="myPage" class="my-graph" :class="{
        'my-line-style-start': lineTextAnchor === 'start',
        'my-line-style-end': lineTextAnchor === 'end'
      }" style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">
              Line Shape:
            </div>
            <el-radio-group v-model="lineShape" size="small" @change="tabChange">
              <el-radio-button :label="1">Straight</el-radio-button>
              <el-radio-button :label="2">Curve 2</el-radio-button>
              <el-radio-button :label="5">Curve 5</el-radio-button>
              <el-radio-button :label="6">Curve 6</el-radio-button>
              <el-radio-button :label="4">Polyline</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">
              Junction Point:
            </div>
            <el-radio-group v-model="linePoint" size="small" @change="tabChange">
              <el-radio-button label="border">Border</el-radio-button>
              <el-radio-button label="lr">Left-Right</el-radio-button>
            </el-radio-group>
            <div class="c-option-name">
              Line Text Anchor:
            </div>
            <el-radio-group v-model="lineTextAnchor" size="small" @change="tabChange">
              <el-radio-button label="start">start</el-radio-button>
              <el-radio-button label="middle">middle</el-radio-button>
              <el-radio-button label="end">end</el-radio-button>
            </el-radio-group>
              <div class="c-option-name">
                  The Position Of The Text On The Line：
              </div>
              <el-radio-group v-model="lineTextPlace" size="small" @change="tabChange">
                  <el-radio-button label="">Default</el-radio-button>
                  <el-radio-button label="start">Close To Start</el-radio-button>
                  <el-radio-button label="end" >Close To End</el-radio-button>
                  <el-radio-button label="20%" >20%</el-radio-button>
                  <el-radio-button label="40%" >40%</el-radio-button>
                  <el-radio-button label="60%" >60%</el-radio-button>
                  <el-radio-button label="80%" >80%</el-radio-button>
                  <el-radio-button label="90%" >90%</el-radio-button>
              </el-radio-group>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph, { RelationGraphComponent } from 'relation-graph-vue3';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineColor: '#2E74B5',
    defaultNodeColor: '#2E74B5',
    defaultNodeBorderWidth: 0,
    defaultNodeBorderColor: '#2E74B5',
    defaultNodeFontColor: '#ffffff',
    defaultNodeWidth: 170,
    defaultNodeHeight: 40,
    toolBarDirection: 'h',
    toolBarPositionH: 'center',
    toolBarPositionV: 'bottom',
    defaultLineShape: 2,
    defaultJunctionPoint: 'lr',
    lineUseTextPath: true,
    defaultLineTextOffset_x: 2,
    defaultLineTextOffset_y: -3,
    lineTextMaxLength: 5,
    layout: {
        layoutName: 'tree',
        from: 'left',
        'min_per_width': 410,
        'min_per_height': 50
    }
};

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
        { id: 'c3', text: 'c3' }
    ],
    lines: [
        { from: 'a', to: 'b', text: 'These relationship texts are very long' },
        { from: 'b', to: 'b1', text: 'These relationship texts are very long' },
        { from: 'b1', to: 'b1-1', text: 'These relationship texts are very long' },
        { from: 'b1', to: 'b1-2', text: 'These relationship texts are very long' },
        { from: 'b1', to: 'b1-3', text: 'These relationship texts are very long' },
        { from: 'b1', to: 'b1-4', text: 'These relationship texts are very long' },
        { from: 'b1', to: 'b1-5', text: 'These relationship texts are very long' },
        { from: 'b1', to: 'b1-6', text: 'These relationship texts are very long' },
        { from: 'b', to: 'b2', text: 'These relationship texts are very long' },
        { from: 'b2', to: 'b2-1', text: 'These relationship texts are very long' },
        { from: 'b2', to: 'b2-2', text: 'These relationship texts are very long' },
        { from: 'a', to: 'c', text: 'These relationship texts are very long' },
        { from: 'c', to: 'c1', text: 'These relationship texts are very long' },
        { from: 'c', to: 'c2', text: 'These relationship texts are very long' },
        { from: 'c', to: 'c3', text: 'These relationship texts are very long' }
    ]
};
const lineShape = ref(2);
const linePoint = ref('lr');
const lineTextPlace = ref('');
const lineTextAnchor = ref('middle');
const defaultLineTextOffset_x = ref(0);
const defaultLineTextOffset_y = ref(0);

const graphRef = ref<RelationGraphComponent>();

const showGraph = async() => {
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
};

const tabChange = () => {
    const graphInstance = graphRef.value!.getInstance();
    const graphOptions = graphInstance.options;
    graphOptions.defaultLineShape = lineShape.value;
    graphOptions.defaultJunctionPoint = linePoint.value;
    graphOptions.defaultLineTextOffset_x = defaultLineTextOffset_x.value;
    graphOptions.defaultLineTextOffset_y = defaultLineTextOffset_y.value;
    const lines = graphInstance.getLinks().reduce((currentLines, link) => currentLines.concat(...link.relations), []);
    for (const line of lines) {
        line.placeText = lineTextPlace.value;
    }
};

const updateLayouterOptions = async () => {
    const graphInstance = graphRef.value!.getInstance();
    const graphOptions = graphInstance.options;
    graphOptions.defaultLineTextOffset_x = defaultLineTextOffset_x.value;
    graphOptions.defaultLineTextOffset_y = defaultLineTextOffset_y.value;
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
  background-color: rgba(239, 239, 239, 0.86);
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}
::v-deep(.my-line-style-start) {
  .relation-graph {
    .c-rg-line-text {
      textPath {
        text-anchor: start;
        startOffset: 0% !important;
      }
    }
  }
}
::v-deep(.my-line-style-end) {
  .relation-graph {
    .c-rg-line-text {
      textPath {
        text-anchor: end;
        startOffset: 100% !important;
      }
    }
  }
}
</style>
```

## React 版本

### `lineAdv2.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {
  RGOptions,
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGNodeSlotProps,
  RelationGraphComponent, RGLineShape, RGJunctionPoint
} from 'relation-graph-react';
import {MySelector} from "./RGDemoComponents/MyUIComponents";
import './lineAdv2.scss';

const LineAdv2 = () => {
  const [lineShape, setLineShape] = useState(2);
  const [junctionPoint, setJunctionPoint] = useState('lr');
  const [lineTextPlace, setLineTextPlace] = useState('');
  const [lineTextAnchor, setLineTextAnchor] = useState('middle');
  const graphRef = useRef<RelationGraphComponent|null>(null);

  const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineColor: '#2E74B5',
    defaultNodeColor: '#2E74B5',
    defaultNodeBorderWidth: 0,
    defaultNodeBorderColor: '#2E74B5',
    defaultNodeFontColor: '#ffffff',
    defaultNodeWidth: 170,
    defaultNodeHeight: 40,
    toolBarDirection: 'h',
    toolBarPositionH: 'center',
    toolBarPositionV: 'bottom',
    defaultLineShape: 2,
    defaultJunctionPoint: 'lr',
    lineUseTextPath: true,
    defaultLineTextOffset_x: 2,
    defaultLineTextOffset_y: -3,
    lineTextMaxLength: 5,
    layout: {
      layoutName: 'tree',
      from: 'left',
      'min_per_width': 410,
      'min_per_height': 50

    }
  };

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
      { id: 'c3', text: 'c3' }
    ],
    lines: [
      { from: 'a', to: 'b', text: 'These relationship texts are very long' },
      { from: 'b', to: 'b1', text: 'These relationship texts are very long' },
      { from: 'b1', to: 'b1-1', text: 'These relationship texts are very long' },
      { from: 'b1', to: 'b1-2', text: 'These relationship texts are very long' },
      { from: 'b1', to: 'b1-3', text: 'These relationship texts are very long' },
      { from: 'b1', to: 'b1-4', text: 'These relationship texts are very long' },
      { from: 'b1', to: 'b1-5', text: 'These relationship texts are very long' },
      { from: 'b1', to: 'b1-6', text: 'These relationship texts are very long' },
      { from: 'b', to: 'b2', text: 'These relationship texts are very long' },
      { from: 'b2', to: 'b2-1', text: 'These relationship texts are very long' },
      { from: 'b2', to: 'b2-2', text: 'These relationship texts are very long' },
      { from: 'a', to: 'c', text: 'These relationship texts are very long' },
      { from: 'c', to: 'c1', text: 'These relationship texts are very long' },
      { from: 'c', to: 'c2', text: 'These relationship texts are very long' },
      { from: 'c', to: 'c3', text: 'These relationship texts are very long' }
    ]
  };

  const MyGraphPlugSlot = () => {
    return (
      <div className="rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
        <div className="c-option-name">
          Line Shape:
        </div>
        <MySelector
          data={[
            {value: 1, text: 'Straight' },
            {value: 2, text: 'Curve 2' },
            {value: 5, text: 'Curve 5' },
            {value: 6, text: 'Curve 6' },
            {value: 4, text: 'Polyline' },
          ]}
          currentValue={lineShape}
          onChange={(newValue: number, label) => {setLineShape(newValue);}}
        />
        <div className="c-option-name">
          Junction Point:
        </div>
        <MySelector
          data={[
            {value: 'border', text: 'Border' },
            {value: 'lr', text: 'Left-Right' },
          ]}
          currentValue={junctionPoint}
          onChange={(newValue: string, label) => {setJunctionPoint(newValue);}}
        />
        <div className="c-option-name">
          Line Text Anchor:
        </div>
        <MySelector
          data={[
            {value: 'start', text: 'start' },
            {value: 'middle', text: 'middle' },
            {value: 'end', text: 'end' },
          ]}
          currentValue={lineTextAnchor}
          onChange={(newValue: string, label) => {setLineTextAnchor(newValue);}}
        />
        <div className="c-option-name">
          The Position Of The Text On The Line：
        </div>
        <MySelector
          data={[
            {value: '', text: 'Default' },
            {value: 'start', text: 'Start' },
            {value: 'end', text: 'End' },
            {value: '20%', text: '20%' },
            {value: '40%', text: '40%' },
            {value: '60%', text: '60%' },
            {value: '80%', text: '80%' },
            {value: '90%', text: '90%' },
          ]}
          currentValue={lineTextPlace}
          onChange={(newValue: string, label) => {setLineTextPlace(newValue);}}
        />
      </div>
    );
  }
  const showGraph = async () => {
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data);
    }
  };
  const onTabChange = () => {
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      const graphOptions = graphInstance.options;
      graphOptions.defaultLineShape = lineShape as RGLineShape;
      graphOptions.defaultJunctionPoint = junctionPoint as RGJunctionPoint;
      // graphOptions.defaultLineTextOffset_x = defaultLineTextOffset_x.current;
      // graphOptions.defaultLineTextOffset_y = defaultLineTextOffset_y.current;
      const lines = graphInstance.getLinks().reduce((currentLines, link) => currentLines.concat(...link.relations), []);
      for (const line of lines) {
        line.placeText = lineTextPlace;
      }
      graphInstance.dataUpdated();
    }
  };
  useEffect(() => {
    showGraph();
  }, []);
  useEffect(() => {
    onTabChange();
  }, [lineShape, junctionPoint, lineTextPlace]);
  return (
    <div>
      <div
        className={`my-graph ${lineTextAnchor === 'start' ? 'my-line-style-start' : ''} ${lineTextAnchor === 'end' ? 'my-line-style-end' : ''}`}
        style={{ height: '100vh' }}
      >
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          graphPlugSlot={MyGraphPlugSlot}
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default LineAdv2;
```

### `lineAdv2.scss`

```scss
.c-my-panel {
  width: 350px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding: 10px;
  background-color: rgba(239, 239, 239, 0.86);
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}

.my-line-style-start {
  .c-rg-line-text {
    textPath {
      text-anchor: start;
      startoffset: 0% !important;
    }
  }
}
.my-line-style-end {
  .c-rg-line-text {
    textPath {
      text-anchor: end;
      startoffset: 100% !important;
    }
  }
}
```

### 📂 RGDemoComponents

#### MyUIComponents.tsx

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
