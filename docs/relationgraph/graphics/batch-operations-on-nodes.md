# 节点批量操作

## Vue2 版本

### `batch-operations-on-nodes.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          :on-canvas-selection-end="onCanvasSelectionEnd"
          :on-canvas-click="onCanvasClick"
          :on-node-click="onNodeClick">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              点击任意节点开始调整大小
            </div>
            <div class="c-content">
              按住Ctrl/Command/Shift，点击节点可以多选。
            </div>
            <div class="c-content">
              按住Shift，可以开始拖动框选。
            </div>
            <div class="c-content">
              节点上方的工具栏是可以完全自定义的。
            </div>
          </MyDemoPanel>
          <RGEditingController>
            <RGEditingResize />
            <RGEditingNearNodeWidget position="top">
              <div class="rel-gee-icon" style="background-color: rgba(205,92,92,0.77)" @click="changeNodesColor('rgba(205,92,92,0.77)')"></div>
              <div class="rel-gee-icon" style="background-color: rgb(24,148,215)" @click="changeNodesColor('rgb(24,148,215)')"></div>
              <div class="rel-gee-icon" style="background-color: rgb(41,164,8)" @click="changeNodesColor('rgb(41,164,8)')"></div>
              <div class="rel-gee-icon" style="padding: 0px 5px;" @click="removeNodes">Remove</div>
            </RGEditingNearNodeWidget>
          </RGEditingController>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
import {
  RGEditingController,
  RGEditingCreateLineHandle,
  RGEditingNearNodeWidget,
  RGEditingResize
} from 'relation-graph';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';
export default {
  name: 'Demo',
  components: { RGEditingNearNodeWidget, MyDemoPanel, RGEditingController, RGEditingResize },
  data() {
    return {
      graphOptions: {
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
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'Border color', borderColor: 'yellow' },
          { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
          { id: 'a2', text: 'Plain', borderWidth: 3, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
          // 除非万不得已，否则不建议使用html属性，你可以使用node插槽，让节点展示为任意形态
          { id: 'a1-1', text: 'Text Node' },
          { id: 'a1-4', text: 'XXX', nodeShape: 0 },
          { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
          { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
          { id: 'e', text: 'Rectangular node', nodeShape: 1 },
          { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
          { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
          { id: 'g', text: 'Css Flash', styleClass: 'my-node-flash-style' }
        ],
        lines: [
          { from: 'a', to: 'b' },
          { from: 'a', to: 'a1' },
          { from: 'a1', to: 'a1-1' },
          { from: 'a', to: 'a2' },
          { from: 'a1', to: 'a1-4' },
          { from: 'a', to: 'f1' },
          { from: 'a', to: 'd' },
          { from: 'd', to: 'f' },
          { from: 'a', to: 'g' },
          { from: 'a', to: 'e' },
          { from: 'b', to: 'e' }
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        const nodeD = graphInstance.getNodeById('d');
        const nodeA = graphInstance.getNodeById('a');
        graphInstance.setEditingNodes([nodeD, nodeA]);
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
      const graphInstance = this.$refs.graphRef.getInstance();
      if ($event.shiftKey || $event.ctrlKey || ($event.metaKey && !$event.altKey)) {
        // add or remove node from "resize nodes"
        graphInstance.toggleEditingNode(nodeObject);
      } else {
        // reset "resize nodes"
        graphInstance.setEditingNodes([nodeObject]);
      }
      graphInstance.setEditingLine(null, null);
    },
    onCanvasSelectionEnd(selectionView, $event) {
      console.log('onCanvasSelectionEnd:', selectionView);
      const graphInstance = this.$refs.graphRef.getInstance();
      const willSelectedNodes = graphInstance.getNodesInSelectionView(selectionView);
      graphInstance.getNodes().forEach(node => {
        node.selected = willSelectedNodes.includes(node);
      });
      this.updateSelectedNodes();
    },
    onCanvasClick() {
      this.clearSelection();
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.setEditingLine(null, null);
    },
    clearSelection() {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.getNodes().forEach(node => {
        node.selected = false;
      });
      this.updateSelectedNodes();
    },
    updateSelectedNodes() {
      const selectedNodes = [];
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.getNodes().forEach(node => {
        if (node.selected) selectedNodes.push(node);
      });
      // reset "resize nodes"
      graphInstance.setEditingNodes(selectedNodes);
    },
    changeNodesColor(newColor) {
      const graphInstance = this.$refs.graphRef.getInstance();
      const editingNodes = graphInstance.options.editingController.nodes;
      for (const node of editingNodes) {
        node.color = newColor;
      }
    },
    removeNodes() {
      const graphInstance = this.$refs.graphRef.getInstance();
      const editingNodes = graphInstance.options.editingController.nodes;
      for (const node of editingNodes) {
        graphInstance.removeNode(node);
      }
      graphInstance.setEditingNodes([]);
    }
  }
};
</script>
<style scoped lang="scss">
::v-deep .relation-graph {
  .rel-map {
    background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-editing-bar-top {
    width: 300px;
    left: calc((100% - 300px) / 2);
  }
}
</style>
```

### 📂rg-ui-simple

#### `MyDemoPanel.vue`

```javascript
<template>
  <div class="c-my-demo-panel"
       :class="[(closed ? 'c-my-demo-panel-closed':''), (right ? 'c-my-demo-panel-r' : '')]"
       :style="{
         '--my-panel-width': this.width,
         '--my-panel-top': this.top,
          left: right ? undefined : left,
          right: right ? right : undefined
       }"
  >
    <div class="my-footer">
      <div v-if="closed" class="my-icon my-icon-open" @click="tooglePanel">{{right ? '↙':'↘'}}</div>
      <div v-else class="my-icon my-icon-close" @click="tooglePanel">{{right ? '➡':'⬅'}}</div>
    </div>
    <div class="my-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDemoPanel',
  props: {
    width: {
      mustUseProp: false,
      default: '400px',
      type: String
    },
    left: {
      mustUseProp: false,
      default: '10px',
      type: String
    },
    right: {
      mustUseProp: false,
      default: '',
      type: String
    },
    top: {
      mustUseProp: false,
      default: '10px',
      type: String
    }
  },
  data() {
    return {
      closed: false
    };
  },
  mounted() {
  },
  methods: {
    tooglePanel() {
      this.closed = !this.closed;
    }
  }
};
</script>
<style lang="scss" scoped>
.c-my-demo-panel{
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0,21,41,.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title{
    color: #333333;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
  .c-content{
    color: #666666;
    font-size: 14px;
    line-height: 20px;
    padding:6px;
  }
  .c-button {
    line-height: 18px;
    display: inline-block;
    background-color: #035a8a;
    color: #ffffff;
    font-size: 12px;
    padding: 5px 15px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: rgba(3, 90, 138, 0.68);
    }
  }
  .c-link {
    color: #167fb7;
    cursor: pointer;
    padding: 0px 15px;
    &:hover {
      text-decoration: underline #167fb7;
    }
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
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
</style>
```

## Vue3 版本

### `batch-operations-on-nodes.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="$graphRef"
        :options="graphOptions"
        @canvas-selection-end="onCanvasSelectionEnd"
        @canvas-click="onCanvasClick"
        @node-click="onNodeClick">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              Click any node to start resizing
            </div>
            <div class="c-content">
              Hold Ctrl/Command/Shift and click nodes to select multiple.
            </div>
            <div class="c-content">
              Hold Shift to start box selection.
            </div>
            <div class="c-content">
              The toolbar above the node can be fully customized.
            </div>
          </MyDemoPanel>
          <RGEditingController>
            <RGEditingResize />
            <RGEditingNearNodeWidget position="top">
              <div class="rel-gee-icon" style="background-color: rgba(205,92,92,0.77)" @click="changeNodesColor('rgba(205,92,92,0.77)')" />
              <div class="rel-gee-icon" style="background-color: rgb(24,148,215)" @click="changeNodesColor('rgb(24,148,215)')" />
              <div class="rel-gee-icon" style="background-color: rgb(41,164,8)" @click="changeNodesColor('rgb(41,164,8)')" />
              <div class="rel-gee-icon" style="padding: 0px 5px;" @click="removeNodes">Remove</div>
            </RGEditingNearNodeWidget>
          </RGEditingController>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import RelationGraph, {
    RGEditingController,
    RGEditingCreateLineHandle,
    RGEditingNearNodeWidget,
    RGEditingResize
} from 'relation-graph-vue3';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel.vue';
import type {
    RGJsonData,
    RGNode,
    RGLine,
    RGLink,
    RGUserEvent,
    RGOptions,
    RelationGraphComponent,
    RGSelectionView
} from 'relation-graph-vue3';
import {RelationGraphInstance} from "relation-graph-vue3";

const $graphRef = ref<RelationGraphComponent>(null);
const graphInstance = computed<RelationGraphInstance>(() => $graphRef.value?.getInstance());

const graphOptions: RGOptions = {
    // Set graph options here
};

onMounted(() => {
    showGraph();
});

const showGraph = () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'Border color', borderColor: 'yellow' },
            { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
            { id: 'a2', text: 'Plain', borderWidth: 3, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
            { id: 'a1-1', text: 'Text Node' },
            { id: 'a1-4', text: 'XXX', nodeShape: 0 },
            { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
            { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
            { id: 'e', text: 'Rectangular node', nodeShape: 1 },
            { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
            { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
            { id: 'g', text: 'Css Flash', styleClass: 'my-node-flash-style' }
        ],
        lines: [
            { from: 'a', to: 'b' },
            { from: 'a', to: 'a1' },
            { from: 'a1', to: 'a1-1' },
            { from: 'a', to: 'a2' },
            { from: 'a1', to: 'a1-4' },
            { from: 'a', to: 'f1' },
            { from: 'a', to: 'd' },
            { from: 'd', to: 'f' },
            { from: 'a', to: 'g' },
            { from: 'a', to: 'e' },
            { from: 'b', to: 'e' }
        ]
    };
    $graphRef.value.setJsonData(__graph_json_data, (graphInstance) => {
        const nodeD = graphInstance.getNodeById('d');
        const nodeA = graphInstance.getNodeById('a');
        graphInstance.setEditingNodes([nodeD, nodeA]);
    });
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
    if ($event.shiftKey || $event.ctrlKey || ($event.metaKey && !$event.altKey)) {
        graphInstance.value.toggleEditingNode(nodeObject);
    } else {
        graphInstance.value.setEditingNodes([nodeObject]);
    }
    graphInstance.value.setEditingLine(null, null);
};

const onCanvasSelectionEnd = (selectionView: RGSelectionView, $event: RGUserEvent) => {
    console.log('onCanvasSelectionEnd:', selectionView);
    const willSelectedNodes = graphInstance.value.getNodesInSelectionView(selectionView) || [];
    graphInstance.value.getNodes().forEach(node => {
        node.selected = willSelectedNodes.includes(node);
    });
    updateSelectedNodes();
};

const onCanvasClick = () => {
    clearSelection();
    graphInstance.value.setEditingLine(null, null);
};

const clearSelection = () => {
    graphInstance.value.getNodes().forEach(node => {
        node.selected = false;
    });
    updateSelectedNodes();
};

const updateSelectedNodes = () => {
    const selectedNodes: RGNode[] = [];
    graphInstance.value.getNodes().forEach(node => {
        if (node.selected) selectedNodes.push(node);
    });
    graphInstance.value?.setEditingNodes(selectedNodes);
};

const changeNodesColor = (newColor: string) => {
    const editingNodes = graphInstance.value.options.editingController.nodes || [];
    for (const node of editingNodes) {
        node.color = newColor;
    }
};

const removeNodes = () => {
    const editingNodes = graphInstance.value.options.editingController.nodes || [];
    for (const node of editingNodes) {
        graphInstance.value.removeNode(node);
    }
    graphInstance.value.setEditingNodes([]);
};
</script>

<style scoped lang="scss">
::v-deep(.relation-graph) {
  .rel-map {
    background-size: 30px 30px;
    background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
  }
  .rel-editing-bar-top {
    width: 300px;
    left: calc((100% - 300px) / 2);
  }
}
</style>
```

### 📂 RGDemoComponents

#### `MyDemoPanel.vue`

```javascript
<template>
  <div
    class="c-my-demo-panel"
    :class="[(closed ? 'c-my-demo-panel-closed' : ''), (right ? 'c-my-demo-panel-r' : '')]"
    :style="{
      '--my-panel-width': width,
      '--my-panel-top': top,
      left: right ? undefined : left,
      right: right ? right : undefined
    }"
  >
    <div class="my-footer">
      <div v-if="closed" class="my-icon my-icon-open" @click="togglePanel">{{ right ? '↙' : '↘' }}</div>
      <div v-else class="my-icon my-icon-close" @click="togglePanel">{{ right ? '➡' : '⬅' }}</div>
    </div>
    <div class="my-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    width: {
        type: String,
        default: '400px'
    },
    left: {
        type: String,
        default: '10px'
    },
    right: {
        type: String,
        default: ''
    },
    top: {
        type: String,
        default: '10px'
    }
});

const closed = ref(false);

function togglePanel() {
    closed.value = !closed.value;
}
</script>
<style lang="scss" scoped>
.c-my-demo-panel{
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0,21,41,.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title{
    color: #333333;
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
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
::v-deep(.c-content) {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  padding:6px;
}
::v-deep(.c-button) {
  line-height: 18px;
  display: inline-block;
  background-color: #035a8a;
  color: #ffffff;
  font-size: 12px;
  padding: 5px 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(3, 90, 138, 0.68);
  }
}
::v-deep(.c-link) {
  color: #167fb7;
  cursor: pointer;
  padding: 0px 15px;
  &:hover {
    text-decoration: underline #167fb7;
  }
}
</style>
```

## React 版本

### `batch-operations-on-nodes.tsx`

```javascript
import React, { useRef, useEffect } from 'react';
import RelationGraph, { RGEditingController, RGEditingNearNodeWidget, RGEditingResize, RGSlotOnGraph } from 'relation-graph-react';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel';
import type {
  RGJsonData,
  RGNode,
  RGUserEvent,
  RelationGraphComponent,
  RGSelectionView,
  RGOptions
} from 'relation-graph-react';

import './batch-operations-on-nodes.scss';

const BatchOperationsOnNodes = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph();
  }, []);

  const showGraph = () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'Border color', borderColor: 'yellow' },
        { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
        { id: 'a2', text: 'Plain', borderWidth: 3, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
        { id: 'a1-1', text: 'Text Node' },
        { id: 'a1-4', text: 'XXX', nodeShape: 0 },
        { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
        { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
        { id: 'e', text: 'Rectangular node', nodeShape: 1 },
        { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
        { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
        { id: 'g', text: 'Css Flash', styleClass: 'my-node-flash-style' }
      ],
      lines: [
        { from: 'a', to: 'b' },
        { from: 'a', to: 'a1' },
        { from: 'a1', to: 'a1-1' },
        { from: 'a', to: 'a2' },
        { from: 'a1', to: 'a1-4' },
        { from: 'a', to: 'f1' },
        { from: 'a', to: 'd' },
        { from: 'd', to: 'f' },
        { from: 'a', to: 'g' },
        { from: 'a', to: 'e' },
        { from: 'b', to: 'e' }
      ]
    };
    graphRef.current!.setJsonData(__graph_json_data, (graphInstance) => {
      const nodeD = graphInstance.getNodeById('d');
      const nodeA = graphInstance.getNodeById('a');
      graphInstance.setEditingNodes([nodeD, nodeA]);
    });
  };

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    console.log('onNodeClick:', nodeObject);
    if ($event.shiftKey || $event.ctrlKey || ($event.metaKey && !$event.altKey)) {
      graphInstance.toggleEditingNode(nodeObject);
    } else {
      graphInstance.setEditingNodes([nodeObject]);
    }
    graphInstance.setEditingLine(null, null);
  };

  const onCanvasSelectionEnd = (selectionView: RGSelectionView, $event: RGUserEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    console.log('onCanvasSelectionEnd:', selectionView);
    const willSelectedNodes = graphInstance.getNodesInSelectionView(selectionView) || [];
    graphInstance.getNodes().forEach(node => {
      node.selected = willSelectedNodes.includes(node);
    });
    updateSelectedNodes();
  };

  const onCanvasClick = () => {
    const graphInstance = graphRef.current!.getInstance();
    clearSelection();
    graphInstance.setEditingLine(null, null);
  };

  const clearSelection = () => {
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.getNodes().forEach(node => {
      node.selected = false;
    });
    updateSelectedNodes();
  };

  const updateSelectedNodes = () => {
    const graphInstance = graphRef.current!.getInstance();
    const selectedNodes: RGNode[] = [];
    graphInstance.getNodes().forEach(node => {
      if (node.selected) selectedNodes.push(node);
    });
    graphInstance.setEditingNodes(selectedNodes);
  };

  const changeNodesColor = (newColor: string) => {
    const graphInstance = graphRef.current!.getInstance();
    const editingNodes = graphInstance.options.editingController.nodes || [];
    for (const node of editingNodes) {
      node.color = newColor;
    }
    graphInstance.dataUpdated();
  };

  const removeNodes = () => {
    const graphInstance = graphRef.current!.getInstance();
    const editingNodes = graphInstance.options.editingController.nodes || [];
    for (const node of editingNodes) {
      graphInstance.removeNode(node);
    }
    graphInstance.setEditingNodes([]);
  };
  const graphOptions: RGOptions = {};
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onCanvasSelectionEnd={onCanvasSelectionEnd}
          onCanvasClick={onCanvasClick}
          onNodeClick={onNodeClick}
        >
          <RGSlotOnGraph>
            <MyDemoPanel>
              <div className="c-content">
                Click any node to start resizing
              </div>
              <div className="c-content">
                Hold Ctrl/Command/Shift and click nodes to select multiple.
              </div>
              <div className="c-content">
                Hold Shift to start box selection.
              </div>
              <div className="c-content">
                The toolbar above the node can be fully customized.
              </div>
            </MyDemoPanel>
            <RGEditingController>
              <RGEditingResize />
              <RGEditingNearNodeWidget position="top">
                <div className="rel-gee-icon" style={{ backgroundColor: 'rgba(205,92,92,0.77)' }} onClick={() => changeNodesColor('rgba(205,92,92,0.77)')} />
                <div className="rel-gee-icon" style={{ backgroundColor: 'rgb(24,148,215)' }} onClick={() => changeNodesColor('rgb(24,148,215)')} />
                <div className="rel-gee-icon" style={{ backgroundColor: 'rgb(41,164,8)' }} onClick={() => changeNodesColor('rgb(41,164,8)')} />
                <div className="rel-gee-icon" style={{ padding: '0px 5px' }} onClick={removeNodes}>Remove</div>
              </RGEditingNearNodeWidget>
            </RGEditingController>
          </RGSlotOnGraph>
        </RelationGraph>
      </div>
    </div>
  );
};

export default BatchOperationsOnNodes;
```

### `batch-operations-on-nodes.scss`

```scss
.relation-graph {
  .rel-map {
    background-size: 30px 30px;
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 0), linear-gradient(180deg, rgba(
            0,
            0,
            0,
            0.1
          ) 1px, transparent 0);
  }
  .rel-editing-ctrl {
    .rel-editing-bar-top {
      width: 300px;
      left: calc((100% - 300px) / 2);
    }
  }
}
```

### 📂 RGDemoComponents

#### `MyDemoPanel.tsx`

```javascript
import React, { useState } from 'react';
import './MyDemoPanel.scss';

declare module 'react' {
  interface CSSProperties {
    // 这里可以添加任意数量的自定义属性
    '--my-panel-width'?: string;
    '--my-panel-top'?: string;
  }
}
const MyDemoPanel:React.FC<{ width?:string, left?:string, right?:string, top?:string }> = ({ children, width = '400px', left = '10px', right = '', top = '10px' }) => {
  const [closed, setClosed] = useState(false);
  const togglePanel = () => {
    setClosed(!closed);
  };

  const panelClasses = `c-my-demo-panel ${closed ? 'c-my-demo-panel-closed' : ''} ${right ? 'c-my-demo-panel-r' : ''}`;
  const iconClasses = `my-icon ${closed ? 'my-icon-open' : 'my-icon-close'}`;

  return (
    <div
      className={panelClasses}
      style={{
        '--my-panel-width': width,
        '--my-panel-top': top,
        left: right ? undefined : left,
        right: right || undefined
      }}
    >
      <div className="my-footer">
        <div className={iconClasses} onClick={togglePanel}>
          {closed ? (right ? '↙' : '↘') : (right ? '➡' : '⬅')}
        </div>
      </div>
      <div className="my-body">
        {children}
      </div>
    </div>
  );
};

export default MyDemoPanel;
```

#### `MyDemoPanel.scss`

```scss
.c-my-demo-panel {
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0, 21, 41, 0.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  //transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title {
    color: #333333;
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
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
.c-content {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  padding: 6px;
}
.c-button {
  line-height: 18px;
  display: inline-block;
  background-color: #035a8a;
  color: #ffffff;
  font-size: 12px;
  padding: 5px 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(3, 90, 138, 0.68);
  }
}
.c-link {
  color: #167fb7;
  cursor: pointer;
  padding: 0px 15px;
  &:hover {
    text-decoration: underline #167fb7;
  }
}
```
