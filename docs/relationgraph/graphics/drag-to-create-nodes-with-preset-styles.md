# 拖拽创建预设样式的节点

## Vue2 版本

### `drag-to-create-nodes-with-preset-styles.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
      >
        <template #graph-plug>
          <MyDemoPanel width="300px" left="150px">
            <div class="c-content">
              请从左侧拖入节点到画布区域
            </div>
          </MyDemoPanel>
          <DragToCreateToolbar />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import DragToCreateToolbar from './drag-to-create-toolbar.vue';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';

const graphOptions = {
  debug: false,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  allowShowDownloadButton: true,
  defaultJunctionPoint: 'border'
};
export default {
  name: 'ObjectEdit',
  components: { MyDemoPanel, DragToCreateToolbar },
  data() {
    return {
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        nodes: [
          { id: 'fake-root', text: '', opacity: 0 }
        ],
        lines: []
      };
      const graphRef = this.$refs.graphRef;
      graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
      }
      );
    }
  }
};
</script>

<style>
</style>

<style lang="scss" scoped>
::v-deep .relation-graph {
  .my-node-template{
    //transform: translateX(-60px) translateY(-60px) !important;
    cursor: default;
  }
}
</style>
```

### `drag-to-create-toolbar.vue`

```javascript
<template>
  <div class="my-toolbar">
    <div class="my-dragable-items">
      <div class="my-title">节点：</div>
      <template v-for="template of nodeTemplates">
        <div
            :key="template.text"
            class="my-mode-item my-mode-item-node"
            :class="[
              (options.creatingNodePlot ? 'my-mode-item-on':''),
              'my-node-shape-' + template.nodeShape
            ]"
            :style="{
                color: template.fontColor,
                backgroundColor: template.color,
                borderWidth: template.borderWidth,
                borderColor: template.borderColor,
                borderStyle: 'solid'
            }"
            @mousedown="startAddNode(template, $event)"
        >
          <div>
            <div><i class="el-icon-files" /></div>
            <div
              class="c-mb-text"
              :style="{
                color: template.fontColor,
              }"
            >{{template.text}}</div>
          </div>
        </div>
      </template>
      <div class="my-title">线条：<br />（点击创建）</div>
      <template v-for="lineTemplate of lineTemplates">
        <div
            :key="lineTemplate.text"
            class="my-mode-item my-line"
            :class="{'my-mode-item-on':options.creatingLinePlot}"
            @click="startAddLine(lineTemplate, $event)"
        >
          <div
              :style="{
                color: lineTemplate.color
              }"
          >
            <div
                :style="{
                backgroundColor: lineTemplate.color,
                height: lineTemplate.lineWidth + 'px'
              }"
            ></div>
            <div
                class="c-mb-text"
                :style="{
                marginTop: '10px',
                color: lineTemplate.color
              }"
            >{{lineTemplate.text}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DragToCreateToolbar',
  data() {
    return {
      nodeTemplates: [
        {
          text: 'Node 1',
          color: '#5b05f19c',
          borderWidth: 1,
          borderColor: 'rgba(91,5,241,.3)',
          fontColor: '#ffffff',
          nodeShape: 1,
          width: 120,
          height: 80
        },
        {
          text: 'Node 2',
          color: '#5fa903c9',
          borderWidth: 1,
          borderColor: 'rgba(95,169,3,.3)',
          fontColor: '#ffffff',
          nodeShape: 1,
          width: 90,
          height: 30
        },
        {
          text: 'Node 3',
          color: '#5da0f8',
          borderWidth: 1,
          borderColor: '#000000',
          fontColor: '#ffffff',
          nodeShape: 1,
          width: 80,
          height: 80
        },
        {
          text: 'Node 4',
          color: 'rgba(214,103,239,0.59)',
          borderWidth: 1,
          borderColor: 'rgba(214,103,239,1)',
          fontColor: 'rgb(105,20,124)',
          nodeShape: 0,
          width: 80,
          height: 80
        },
        {
          text: 'Node 5',
          color: '#af7802cc',
          borderWidth: 1,
          borderColor: 'rgba(175,120,2,.3)',
          fontColor: '#ffffff',
          nodeShape: 0,
          width: 50,
          height: 50
        },
        {
          text: 'Node 6',
          color: '#4f1e1ecc',
          borderWidth: 1,
          borderColor: 'rgba(79,30,30,.3)',
          fontColor: '#ffffff',
          nodeShape: 0,
          width: 180,
          height: 180
        }
      ],
      lineTemplates: [
        {
          lineWidth: 3,
          color: '#8080ff',
          text: 'Line 1'
        },
        {
          lineWidth: 3,
          color: '#5fa903c9',
          text: 'Line 2'
        },
        {
          lineWidth: 3,
          color: '#af7802cc',
          text: 'Line 3'
        },
        {
          lineWidth: 3,
          color: '#5da0f8',
          text: 'Line 4'
        }
      ],
      showNewNodeTemplate: false,
      newObjectTemplatePosition: { x: 0, y: 0 },
      height: 275,
      newNodeIdIndex: 1,
      newLineIdIndex: 1
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
    // if (this.options.layouts.length > 1) {
    //   this.height -= 40;
    // }
  },
  methods: {
    startAddNode(tempNode, e) {
      this.relationGraph.startCreatingNodePlot(e, {
        templateText: tempNode.text,
        templateNode: JSON.parse(JSON.stringify(tempNode)),
        onCreateNode: (x, y) => {
          const nodeSize = { width: (tempNode.width || 96), height: (tempNode.height || 96) };
          console.log('new node：', x, y, nodeSize.width, nodeSize.height);
          const newId = this.newNodeIdIndex++;
          this.relationGraph.addNodes([Object.assign({}, tempNode, {
            id: 'newNode-' + newId,
            text: 'New node' + newId,
            x: x - (nodeSize.width / 2),
            y: y - (nodeSize.height / 2)
          })]);
        }
      });
    },
    startAddLine(template, e) {
      if (!this.relationGraph.getNodes().some(node => node.opacity > 0)) {
        return this.$message({ type: 'error', message: '请先创建节点！' });
      }
      this.$message({ type: 'success', message: '点击节点开始创建线条！' });
      this.relationGraph.startCreatingLinePlot(e, {
        template: JSON.parse(JSON.stringify(template)),
        onCreateLine: (from, to, finalTemplate) => {
          console.log('new line：', from, to);
          if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
            const newLineId = this.newLineIdIndex++;
            this.relationGraph.addLines([Object.assign({}, finalTemplate, {
              from: from.id,
              to: to.id,
              text: 'New line' + newLineId
            })]);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-toolbar {
  position: absolute;z-index: 900;
  top:10px;left: 10px; padding:10px;
  width:80px;
  height:calc(100% - 40px);
  background-color: rgba(248, 166, 8, 0.5);
  border: #b67903 solid 1px;
  box-shadow: 0 3px 9px rgba(0,21,41,.08);
  border-radius: 5px;
  user-select: none;
  .my-title {
    text-align: center;
    font-size: 12px;
    color: #835703;
  }
  .my-dragable-items {
    display: flex;justify-content: center;place-items: center;gap: 10px;
    flex-wrap: wrap;
  }
  .rg-icon {
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    fill: currentColor;
    overflow: hidden;
  }
  .my-mode-item{
    height:70px;
    width:70px;
    padding-top:5px;
    background-color: #ffffff;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    color: #2E74B5;
    font-size: 18px;
    box-sizing:border-box;
    position: relative;
    border-radius: 5px;
    display: flex;justify-content: center;place-items: center;
    .c-mb-text{
      font-size: 12px;
      line-height: 12px;
      color: #2E74B5;
    }
  }
  .my-line {
    height: 40px;
  }
  .my-mode-item-node {
    cursor: move;
  }
  .my-node-shape-0 {
    border-radius: 50%;
  }
  .my-mode-item-on{
    background-color: #2E74B5;
    border-top: #2E4E8F solid 1px;
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.5);
    color: #ffffff;
    .c-mb-text{
      font-size: 12px;
      line-height: 12px;
      color: #ffffff;
    }
  }
  .my-mode-item:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff;
  }
}
</style>
<style scoped>

</style>
```

### 📂 rg-ui-simple

### `MyDemoPanel.vue`

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

### `drag-to-create-nodes-with-preset-styles.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph
        ref="$graphRef"
        :options="graphOptions"
      >
        <template #graph-plug>
          <MyDemoPanel width="300px" left="150px">
            <div class="c-content">
              Please drag nodes from the left to the canvas area
            </div>
          </MyDemoPanel>
          <DragToCreateToolbar />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, defineComponent, onMounted, ref} from 'vue';
import RelationGraph, { RGJsonData, RGOptions, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';
import DragToCreateToolbar from './drag-to-create-toolbar.vue';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel.vue';
import {RelationGraphInstance} from "relation-graph-vue3";

const graphOptions: RGOptions = {
    debug: false,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border'
};

const $graphRef = ref<RelationGraphComponent>(null);
const graphInstance = computed<RelationGraphInstance>(() => $graphRef.value?.getInstance());

onMounted(() => {
    showGraph();
});

const showGraph = () => {
    const __graph_json_data: RGJsonData = {
        nodes: [
            { id: 'fake-root', text: '', opacity: 0 }
        ],
        lines: []
    };

    $graphRef.value.setJsonData(__graph_json_data, (graphInstance) => {
    // Code to be executed after the graph is initialized

    });
};
</script>

<style>
</style>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
  .my-node-template{
    //transform: translateX(-60px) translateY(-60px) !important;
    cursor: default;
  }
}
</style>
```

### `drag-to-create-toolbar.vue`

```javascript
<template>
  <div class="my-toolbar">
    <div class="my-dragable-items">
      <div class="my-title">Nodes:</div>
      <template v-for="template in nodeTemplates" :key="template.text">
        <div
          class="my-mode-item my-mode-item-node"
          :class="[
            (options.creatingNodePlot ? 'my-mode-item-on':''),
            'my-node-shape-' + template.nodeShape
          ]"
          :style="{
            color: template.fontColor,
            backgroundColor: template.color,
            borderWidth: template.borderWidth + 'px',
            borderColor: template.borderColor,
            borderStyle: 'solid'
          }"
          @mousedown="startAddNode(template, $event)"
        >
          <div>
            <div><i class="el-icon-files" /></div>
            <div
              class="c-mb-text"
              :style="{ color: template.fontColor }"
            >
              {{ template.text }}
            </div>
          </div>
        </div>
      </template>
      <div class="my-title">Lines:<br>(Click to create)</div>
      <template v-for="lineTemplate in lineTemplates" :key="lineTemplate.text">
        <div
          class="my-mode-item my-line"
          :class="{'my-mode-item-on': options.creatingLinePlot}"
          @click="startAddLine(lineTemplate, $event)"
        >
          <div
            :style="{ color: lineTemplate.color }"
          >
            <div
              :style="{
                backgroundColor: lineTemplate.color,
                height: lineTemplate.lineWidth + 'px'
              }"
            />
            <div
              class="c-mb-text"
              :style="{ marginTop: '10px', color: lineTemplate.color }"
            >
              {{ lineTemplate.text }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, inject, onMounted, computed} from 'vue';
import {graphKey} from 'relation-graph-vue3';
import {ElNotification} from 'element-plus'; // Assume types are defined in './types'

const graph = inject(graphKey);
const options = computed(() => {
    return graph && graph.options;
});
const graphInstance = computed(() => {
    return graph && graph.instance;
});

const nodeTemplates = ref([
    {
        text: 'Node 1',
        color: '#5b05f19c',
        borderWidth: 1,
        borderColor: 'rgba(91,5,241,.3)',
        fontColor: '#ffffff',
        nodeShape: 1,
        width: 120,
        height: 80
    },
    {
        text: 'Node 2',
        color: '#5fa903c9',
        borderWidth: 1,
        borderColor: 'rgba(95,169,3,.3)',
        fontColor: '#ffffff',
        nodeShape: 1,
        width: 90,
        height: 30
    },
    {
        text: 'Node 3',
        color: '#5da0f8',
        borderWidth: 1,
        borderColor: '#000000',
        fontColor: '#ffffff',
        nodeShape: 1,
        width: 80,
        height: 80
    },
    {
        text: 'Node 4',
        color: 'rgba(214,103,239,0.59)',
        borderWidth: 1,
        borderColor: 'rgba(214,103,239,1)',
        fontColor: 'rgb(105,20,124)',
        nodeShape: 0,
        width: 80,
        height: 80
    },
    {
        text: 'Node 5',
        color: '#af7802cc',
        borderWidth: 1,
        borderColor: 'rgba(175,120,2,.3)',
        fontColor: '#ffffff',
        nodeShape: 0,
        width: 50,
        height: 50
    },
    {
        text: 'Node 6',
        color: '#4f1e1ecc',
        borderWidth: 1,
        borderColor: 'rgba(79,30,30,.3)',
        fontColor: '#ffffff',
        nodeShape: 0,
        width: 180,
        height: 180
    }
]);

const lineTemplates = ref([
    {
        lineWidth: 3,
        color: '#8080ff',
        text: 'Line 1'
    },
    {
        lineWidth: 3,
        color: '#5fa903c9',
        text: 'Line 2'
    },
    {
        lineWidth: 3,
        color: '#af7802cc',
        text: 'Line 3'
    },
    {
        lineWidth: 3,
        color: '#5da0f8',
        text: 'Line 4'
    }
]);

const startAddNode = (tempNode: NodeTemplate, e: MouseEvent) => {
    graphInstance.value.startCreatingNodePlot(e, {
        templateText: tempNode.text,
        templateNode: JSON.parse(JSON.stringify(tempNode)),
        onCreateNode: (x, y) => {
            const nodeSize = { width: (tempNode.width || 96), height: (tempNode.height || 96) };
            console.log('new node：', x, y, nodeSize.width, nodeSize.height);
            const newId = graphInstance.value.generateNewUUID();
            graphInstance.value.addNodes([Object.assign({}, tempNode, {
                id: 'newNode-' + newId,
                text: 'New node' + newId,
                x: x - (nodeSize.width / 2),
                y: y - (nodeSize.height / 2)
            })]);
        }
    });
};

const startAddLine = (template: LineTemplate, e: MouseEvent) => {
    if (!graphInstance.value.getNodes().some(node => node.opacity > 0)) {
        return ElNotification({ type: 'error', message: '请先创建节点！' });
    }
    ElNotification({ type: 'success', message: '点击节点开始创建线条！' });
    graphInstance.value.startCreatingLinePlot(e, {
        template: JSON.parse(JSON.stringify(template)),
        onCreateLine: (from, to, finalTemplate) => {
            console.log('new line：', from, to);
            if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
                const newLineId = graphInstance.value.generateNewUUID();
                graphInstance.value.addLines([Object.assign({}, finalTemplate, {
                    from: from.id,
                    to: to.id,
                    text: 'New line' + newLineId
                })]);
            }
        }
    });
};
</script>

<style lang="scss" scoped>
.my-toolbar {
  position: absolute;z-index: 900;
  top:10px;left: 10px; padding:10px;
  width:80px;
  height:calc(100% - 40px);
  background-color: rgba(248, 166, 8, 0.5);
  border: #b67903 solid 1px;
  box-shadow: 0 3px 9px rgba(0,21,41,.08);
  border-radius: 5px;
  user-select: none;
  .my-title {
    text-align: center;
    font-size: 12px;
    color: #835703;
  }
  .my-dragable-items {
    display: flex;justify-content: center;place-items: center;gap: 10px;
    flex-wrap: wrap;
  }
  .rg-icon {
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    fill: currentColor;
    overflow: hidden;
  }
  .my-mode-item{
    height:70px;
    width:70px;
    padding-top:5px;
    background-color: #ffffff;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    color: #2E74B5;
    font-size: 18px;
    box-sizing:border-box;
    position: relative;
    border-radius: 5px;
    display: flex;justify-content: center;place-items: center;
    .c-mb-text{
      font-size: 12px;
      line-height: 12px;
      color: #2E74B5;
    }
  }
  .my-line {
    height: 40px;
  }
  .my-mode-item-node {
    cursor: move;
  }
  .my-node-shape-0 {
    border-radius: 50%;
  }
  .my-mode-item-on{
    background-color: #2E74B5;
    border-top: #2E4E8F solid 1px;
    color: #ffffff;
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.5);
    .c-mb-text{
      font-size: 12px;
      line-height: 12px;
      color: #ffffff;
    }
  }
  .my-mode-item:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff;
  }
}
</style>
<style scoped>

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

### `drag-to-create-nodes-with-preset-styles.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph, {
  RGJsonData,
  RGOptions,
  RelationGraphComponent,
  RGSlotOnGraph,
} from 'relation-graph-react'
import DragToCreateToolbar from './drag-to-create-toolbar'
import MyDemoPanel from './RGDemoComponents/MyDemoPanel'

import './drag-to-create-nodes-with-preset-styles.scss'

const graphOptions: RGOptions = {
  debug: false,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  allowShowDownloadButton: true,
  defaultJunctionPoint: 'border',
}

const MyComponent = () => {
  const graphRef = useRef < RelationGraphComponent > null

  useEffect(() => {
    showGraph()
  }, [])

  const showGraph = async () => {
    const graphJsonData: RGJsonData = {
      rootId: 'fake-root',
      nodes: [{ id: 'fake-root', text: '', opacity: 0 }],
      lines: [],
    }
    graphRef.current?.setJsonData(graphJsonData)
  }
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions}>
          <RGSlotOnGraph>
            <MyDemoPanel width="300px" left="150px">
              <div className="c-content">Please drag nodes from the left to the canvas area</div>
            </MyDemoPanel>
            <DragToCreateToolbar />
          </RGSlotOnGraph>
        </RelationGraph>
      </div>
    </div>
  )
}

export default MyComponent
```

### `drag-to-create-nodes-with-preset-styles.scss`

```scss
.relation-graph {
}
```

### `drag-to-create-toolbar.tsx`

```javascript
// DragToCreateToolbar.tsx
import React, { useCallback, useContext } from 'react'
import { JsonLine, RGNode, RGPosition } from 'relation-graph-react'
import {
  RelationGraphInstance,
  RGInstanceContext,
  RGUpdateSingalContext,
} from 'relation-graph-react' // Ensure this import matches your project structure
import './drag-to-create-toolbar.scss'
import { ElNotification } from './RGDemoComponents/MyUIComponents'
interface NodeTemplate {
  text: string;
  color: string;
  borderWidth: number;
  borderColor: string;
  fontColor: string;
  nodeShape: number;
  width: number;
  height: number;
}

interface LineTemplate {
  lineWidth: number;
  color: string;
  text: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    text: 'Node 1',
    color: '#5b05f19c',
    borderWidth: 1,
    borderColor: 'rgba(91,5,241,.3)',
    fontColor: '#ffffff',
    nodeShape: 1,
    width: 120,
    height: 80,
  },
  {
    text: 'Node 2',
    color: '#5fa903c9',
    borderWidth: 1,
    borderColor: 'rgba(95,169,3,.3)',
    fontColor: '#ffffff',
    nodeShape: 1,
    width: 90,
    height: 30,
  },
  {
    text: 'Node 3',
    color: '#5da0f8',
    borderWidth: 1,
    borderColor: '#000000',
    fontColor: '#ffffff',
    nodeShape: 1,
    width: 80,
    height: 80,
  },
  {
    text: 'Node 4',
    color: 'rgba(214,103,239,0.59)',
    borderWidth: 1,
    borderColor: 'rgba(214,103,239,1)',
    fontColor: 'rgb(105,20,124)',
    nodeShape: 0,
    width: 80,
    height: 80,
  },
  {
    text: 'Node 5',
    color: '#af7802cc',
    borderWidth: 1,
    borderColor: 'rgba(175,120,2,.3)',
    fontColor: '#ffffff',
    nodeShape: 0,
    width: 50,
    height: 50,
  },
  {
    text: 'Node 6',
    color: '#4f1e1ecc',
    borderWidth: 1,
    borderColor: 'rgba(79,30,30,.3)',
    fontColor: '#ffffff',
    nodeShape: 0,
    width: 180,
    height: 180,
  },
]

const lineTemplates: LineTemplate[] = [
  {
    lineWidth: 3,
    color: '#8080ff',
    text: 'Line 1',
  },
  {
    lineWidth: 3,
    color: '#5fa903c9',
    text: 'Line 2',
  },
  {
    lineWidth: 3,
    color: '#af7802cc',
    text: 'Line 3',
  },
  {
    lineWidth: 3,
    color: '#5da0f8',
    text: 'Line 4',
  },
]

const DragToCreateToolbar: React.FC = () => {
  const graphInstance = useContext(RGInstanceContext)
  useContext(RGUpdateSingalContext)
  const startAddNode = (tempNode: NodeTemplate, event: React.MouseEvent) => {
    graphInstance.startCreatingNodePlot(event, {
      templateText: tempNode.text,
      templateNode: JSON.parse(JSON.stringify(tempNode)),
      onCreateNode: (x: number, y: number) => {
        const nodeSize = { width: tempNode.width || 96, height: tempNode.height || 96 }
        console.log('new node：', x, y, nodeSize.width, nodeSize.height)
        const newId = graphInstance.generateNewUUID()
        graphInstance.addNodes([
          Object.assign({}, tempNode, {
            id: 'newNode-' + newId,
            text: 'New node' + newId,
            x: x - nodeSize.width / 2,
            y: y - nodeSize.height / 2,
          }),
        ])
      },
    })
  }

  const startAddLine = (template: LineTemplate, event: React.MouseEvent) => {
    if (!graphInstance.getNodes().some((node: RGNode) => !node.opacity || node.opacity > 0)) {
      return ElNotification({ type: 'error', message: 'Please create the node first！' })
    }
    ElNotification({ type: 'success', message: 'Click on the node to start creating a line.' })
    graphInstance.startCreatingLinePlot(event, {
      template: JSON.parse(JSON.stringify(template)),
      onCreateLine: (from: RGNode, to: RGNode | RGPosition, finalTemplate: JsonLine) => {
        console.log('new line：', from, to)
        if (to.id) {
          // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
          const newLineId = graphInstance.generateNewUUID()
          graphInstance.addLines([
            Object.assign({}, finalTemplate, {
              from: from.id,
              to: to.id,
              text: 'New line' + newLineId,
            }),
          ])
        }
      },
    })
  }
  const options = graphInstance?.options
  const creatingNodePlot = options && options.creatingNodePlot
  const creatingLinePlot = options && options.creatingLinePlot
  return (
    <div className="my-toolbar">
      <div className="my-dragable-items">
        <div className="my-title">Nodes:</div>
        {nodeTemplates.map((template) => (
          <div
            key={template.text}
            className={`my-mode-item my-mode-item-node my-node-shape-${template.nodeShape} ${
              creatingNodePlot ? 'my-mode-item-on' : ''
            }`}
            style={{
              color: template.fontColor,
              backgroundColor: template.color,
              borderWidth: `${template.borderWidth}px`,
              borderColor: template.borderColor,
              borderStyle: 'solid',
            }}
            onMouseDown={(e) => startAddNode(template, e)}
          >
            <div>
              <i className="el-icon-files" />
              <div className="c-mb-text" style={{ color: template.fontColor }}>
                {template.text}
              </div>
            </div>
          </div>
        ))}
        <div className="my-title">
          Lines:
          <br />
          (Click to create)
        </div>
        {lineTemplates.map((template) => (
          <div
            key={template.text}
            className={`my-mode-item my-line ${creatingLinePlot ? 'my-mode-item-on' : ''}`}
            onClick={(e) => startAddLine(template, e)}
            style={{ color: template.color }}
          >
            <div className="c-mb-text" style={{ marginTop: '10px', color: template.color }}>
              <div style={{ backgroundColor: template.color, height: `${template.lineWidth}px` }} />
              {template.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DragToCreateToolbar
```

### `drag-to-create-toolbar.scss`

```scss
.my-toolbar {
  position: absolute;
  z-index: 900;
  top: 10px;
  left: 10px;
  padding: 10px;
  width: 90px;
  height: calc(100% - 40px);
  background-color: rgba(248, 166, 8, 0.5);
  border: #b67903 solid 1px;
  box-shadow: 0 3px 9px rgba(0, 21, 41, 0.08);
  border-radius: 5px;
  user-select: none;
  box-sizing: border-box;
  .my-title {
    text-align: center;
    font-size: 12px;
    color: #835703;
  }
  .my-dragable-items {
    display: flex;
    justify-content: center;
    place-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .rg-icon {
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    fill: currentColor;
    overflow: hidden;
  }
  .my-mode-item {
    height: 60px;
    width: 60px;
    padding-top: 5px;
    background-color: #ffffff;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    color: #2e74b5;
    font-size: 18px;
    box-sizing: border-box;
    position: relative;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    place-items: center;
    .c-mb-text {
      font-size: 12px;
      line-height: 12px;
      color: #2e74b5;
    }
  }
  .my-line {
    height: 40px;
  }
  .my-mode-item-node {
    cursor: move;
  }
  .my-node-shape-0 {
    border-radius: 50%;
  }
  .my-mode-item-on {
    background-color: #2e74b5;
    border-top: #2e4e8f solid 1px;
    color: #ffffff;
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.5);
    .c-mb-text {
      font-size: 12px;
      line-height: 12px;
      color: #ffffff;
    }
  }
  .my-mode-item:hover .c-mb-text,
  .c-mb-button-on .c-mb-text {
    color: #ffffff;
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
