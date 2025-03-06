# 自定义线条操作栏

## Vue2 版本

### `customize-line-toolbar.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          :on-canvas-click="onCanvasClick"
          :on-line-click="onLineClick">
        <template #graph-plug>
          <MyDemoPanel width="300px">
            <div class="c-content">
              点击选中一个线条，会显示一个操作栏，你可以在这里自定义针对当前线条的操作。
            </div>
            <div class="c-content">
              线条操作栏的位置、大小、内容都是可以完全自定义的。
            </div>
          </MyDemoPanel>
          <RGEditingConnectController />
          <RGEditingLineController>
            <div class="c-my-line-toolbar">
              <div class="c-my-row">
                <div>线条颜色：</div>
                <div class="c-my-line-btn" @click="changeLineColor('rgba(214,103,239,0.59)')" :style="{backgroundColor: 'rgba(214,103,239,0.59)'}"></div>
                <div class="c-my-line-btn" @click="changeLineColor('#5fa903c9')" :style="{backgroundColor: '#5fa903c9'}"></div>
                <div class="c-my-line-btn" @click="changeLineColor('#af7802cc')" :style="{backgroundColor: '#af7802cc'}"></div>
                <div class="c-my-line-btn" @click="changeLineColor('#1894d7')" :style="{backgroundColor: '#1894d7'}"></div>
                <div class="c-my-line-btn" @click="changeLineColor('#e85f84')" :style="{backgroundColor: '#e85f84'}"></div>
              </div>
              <div class="c-my-row">
                <div>线条形状：</div>
                <div class="c-my-line-btn" @click="changeLineShape(1)">1</div>
                <div class="c-my-line-btn" @click="changeLineShape(2)">2</div>
                <div class="c-my-line-btn" @click="changeLineShape(3)">3</div>
                <div class="c-my-line-btn" @click="changeLineShape(4)">4</div>
                <div class="c-my-line-btn" @click="changeLineShape(5)">5</div>
                <div class="c-my-line-btn" @click="changeLineShape(6)">6</div>
                <div class="c-my-line-btn" @click="changeLineShape(7)">7</div>
              </div>
              <div class="c-my-row">
                <div>线条粗细：</div>
                <div class="c-my-line-btn" @click="changeLineWidth(1)">1</div>
                <div class="c-my-line-btn" @click="changeLineWidth(2)">2</div>
                <div class="c-my-line-btn" @click="changeLineWidth(4)">4</div>
                <div class="c-my-line-btn" @click="changeLineWidth(6)">6</div>
                <div class="c-my-line-btn" @click="changeLineWidth(8)">8</div>
                <div class="c-my-line-btn" @click="changeLineWidth(12)">12</div>
              </div>
              <div>
                <div class="c-my-button" @click="removeLine">删除线条</div>
              </div>
            </div>
          </RGEditingLineController>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
import { RGEditingConnectController, RGEditingLineController } from 'relation-graph';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';
export default {
  name: 'Demo',
  components: { MyDemoPanel, RGEditingConnectController, RGEditingLineController },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        // 这里可以参考"Graph 图谱"中的参数进行设置
        allowShowMiniToolBar: false,
        defaultLineShape: 6,
        defaultLineColor: '#43a2f1',
        defaultLineWidth: 2
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
          { id: 'a1', text: 'No border', borderWidth: 1, offset_y: 5, color: '#ff8c00' },
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
      });
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.setEditingLine(lineObject, linkObject);
    },
    onCanvasClick() {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.setEditingLine(null, null);
      graphInstance.clearChecked();
    },
    changeLineColor(newValue) {
      const graphInstance = this.$refs.graphRef.getInstance();
      const line = graphInstance.options.editingLineController.line;
      line.color = newValue;
    },
    changeLineShape(newValue) {
      const graphInstance = this.$refs.graphRef.getInstance();
      const line = graphInstance.options.editingLineController.line;
      line.lineShape = newValue;
    },
    changeLineWidth(newValue) {
      const graphInstance = this.$refs.graphRef.getInstance();
      const line = graphInstance.options.editingLineController.line;
      line.lineWidth = newValue;
    },
    removeLine() {
      const graphInstance = this.$refs.graphRef.getInstance();
      const line = graphInstance.options.editingLineController.line;
      const link = graphInstance.options.editingLineController.link;
      graphInstance.removeLine(link, line);
      graphInstance.setEditingLine(null, null);
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
  .c-my-line-toolbar {
    pointer-events: auto;
    position: absolute;width: 400px;font-size:12px;top:10px;left: calc((100% - 400px) / 2);
    padding:15px;
    border: rgba(166,41,239,0.65) solid 1px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 3px 9px rgba(0,21,41,.3);
    color: #666666;
    .c-my-row {
      display: flex;place-items: center;justify-content: start;gap: 5px;
      padding-bottom: 5px;
    }
    .c-my-line-btn {
      height: 20px;
      width: 20px;
      border-radius: 5px;
      border: rgba(166,41,239,1) solid 1px;
      color: rgba(166,41,239,1);
      cursor: pointer;
      font-size: 12px;
      display: flex;place-items: center;justify-content: center;
      &:hover {
        background-color: rgba(166,41,239,1);
        color: #ffffff;
      }
    }
    .c-my-button {
      border-radius: 5px;
      border: rgba(166,41,239,1) solid 1px;
      background-color: rgba(166,41,239,0.65);
      color: #ffffff;
      cursor: pointer;
      padding: 2px 15px;
      font-size: 12px;
      display: inline-block;
      &:hover {
        background-color: rgba(166,41,239,1);
      }
    }
  }
}
</style>
```

### 📂 rg-ui-simple

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

### `customize-line-toolbar.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="$graphRef"
        :options="graphOptions"
        @canvas-click="onCanvasClick"
        @line-click="onLineClick">
        <template #graph-plug>
          <MyDemoPanel width="300px">
            <div class="c-content">
              Click to select a line, and a toolbar will be displayed where you can customize operations for the current line.
            </div>
            <div class="c-content">
              The position, size, and content of the line toolbar can be fully customized.
            </div>
          </MyDemoPanel>
          <RGEditingConnectController />
          <RGEditingLineController>
            <div class="c-my-line-toolbar">
              <div class="c-my-row">
                <div>Line color:</div>
                <div class="c-my-line-btn" :style="{backgroundColor: 'rgba(214,103,239,0.59)'}" @click="changeLineColor('rgba(214,103,239,0.59)')" />
                <div class="c-my-line-btn" :style="{backgroundColor: '#5fa903c9'}" @click="changeLineColor('#5fa903c9')" />
                <div class="c-my-line-btn" :style="{backgroundColor: '#af7802cc'}" @click="changeLineColor('#af7802cc')" />
                <div class="c-my-line-btn" :style="{backgroundColor: '#1894d7'}" @click="changeLineColor('#1894d7')" />
                <div class="c-my-line-btn" :style="{backgroundColor: '#e85f84'}" @click="changeLineColor('#e85f84')" />
              </div>
              <div class="c-my-row">
                <div>Line shape:</div>
                <div class="c-my-line-btn" @click="changeLineShape(1)">1</div>
                <div class="c-my-line-btn" @click="changeLineShape(2)">2</div>
                <div class="c-my-line-btn" @click="changeLineShape(3)">3</div>
                <div class="c-my-line-btn" @click="changeLineShape(4)">4</div>
                <div class="c-my-line-btn" @click="changeLineShape(5)">5</div>
                <div class="c-my-line-btn" @click="changeLineShape(6)">6</div>
                <div class="c-my-line-btn" @click="changeLineShape(7)">7</div>
              </div>
              <div class="c-my-row">
                <div>Line width:</div>
                <div class="c-my-line-btn" @click="changeLineWidth(1)">1</div>
                <div class="c-my-line-btn" @click="changeLineWidth(2)">2</div>
                <div class="c-my-line-btn" @click="changeLineWidth(4)">4</div>
                <div class="c-my-line-btn" @click="changeLineWidth(6)">6</div>
                <div class="c-my-line-btn" @click="changeLineWidth(8)">8</div>
                <div class="c-my-line-btn" @click="changeLineWidth(12)">12</div>
              </div>
              <div>
                <div class="c-my-button" @click="removeLine">Delete Line</div>
              </div>
            </div>
          </RGEditingLineController>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import RelationGraph, { RGEditingConnectController, RGEditingLineController } from 'relation-graph-vue3';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel.vue';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';
import {RelationGraphInstance} from 'relation-graph-vue3';

const $graphRef = ref<RelationGraphComponent>(null);
const graphInstance = computed<RelationGraphInstance>(() => $graphRef.value?.getInstance());
const graphOptions: RGOptions = {
    allowShowMiniToolBar: false,
    defaultLineShape: 6,
    defaultLineColor: '#43a2f1',
    defaultLineWidth: 2

};

onMounted(() => {
    showGraph();
});

const showGraph = () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'Border color', borderColor: 'yellow' },
            { id: 'a1', text: 'No border', borderWidth: 1, offset_y: 5, color: '#ff8c00' },
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
    $graphRef.value.setJsonData(__graph_json_data, () => {
        // Code to be executed after the graph is initialized

    });
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
    graphInstance.value.setEditingLine(lineObject, linkObject);
};

const onCanvasClick = () => {
    graphInstance.value.setEditingLine(null, null);
    graphInstance.value.clearChecked();
};

const changeLineColor = (newValue: string) => {
    const line = graphInstance.value.options.editingLineController.line;
    line.color = newValue;
};

const changeLineShape = (newValue: number) => {
    const line = graphInstance.value.options.editingLineController.line;
    line.lineShape = newValue;
};

const changeLineWidth = (newValue: number) => {
    const line = graphInstance.value.options.editingLineController.line;
    line.lineWidth = newValue;
};

const removeLine = () => {
    const line = graphInstance.value.options.editingLineController.line;
    const link = graphInstance.value.options.editingLineController.link;
    graphInstance.value.removeLine(link, line);
    graphInstance.value.setEditingLine(null, null);
};
</script>

<style scoped lang="scss">
::v-deep(.relation-graph) {
  .rel-map {
    background-size: 30px 30px;
    background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
  }
  .c-my-line-toolbar {
    pointer-events: auto;
    position: absolute;width: 400px;font-size:12px;top:10px;left: calc((100% - 400px) / 2);
    padding:15px;
    border: rgba(166,41,239,0.65) solid 1px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 3px 9px rgba(0,21,41,.3);
    color: #666666;
    .c-my-row {
      display: flex;place-items: center;justify-content: start;gap: 5px;
      padding-bottom: 5px;
    }
    .c-my-line-btn {
      height: 20px;
      width: 20px;
      border-radius: 5px;
      border: rgba(166,41,239,1) solid 1px;
      color: rgba(166,41,239,1);
      cursor: pointer;
      font-size: 12px;
      display: flex;place-items: center;justify-content: center;
      &:hover {
        background-color: rgba(166,41,239,1);
        color: #ffffff;
      }
    }
    .c-my-button {
      border-radius: 5px;
      border: rgba(166,41,239,1) solid 1px;
      background-color: rgba(166,41,239,0.65);
      color: #ffffff;
      cursor: pointer;
      padding: 2px 15px;
      font-size: 12px;
      display: inline-block;
      &:hover {
        background-color: rgba(166,41,239,1);
      }
    }
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

### `customize-line-toolbar.tsx`

```javascript
import React, { useRef, useEffect } from 'react';
import { RGJsonData, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-react';
import RelationGraph, { RGEditingConnectController, RGEditingLineController, RGSlotOnGraph } from 'relation-graph-react';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel';

import './customize-line-toolbar.scss';
const CustomizeLineToolbar = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph();
  }, []);

  const graphOptions: RGOptions = {
    allowShowMiniToolBar: false,
    defaultLineShape: 6,
    defaultLineColor: '#43a2f1',
    defaultLineWidth: 2

  };

  const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'Border color', borderColor: 'yellow' },
        { id: 'a1', text: 'No border', borderWidth: 1, offset_y: 5, color: '#ff8c00' },
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
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
  };

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    console.log('onLineClick:', lineObject);
    graphInstance.setEditingLine(lineObject, linkObject);
  };

  const onCanvasClick = () => {
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.setEditingLine(null, null);
    graphInstance.clearChecked();
  };

  const changeLineColor = (newValue: string) => {
    const graphInstance = graphRef.current!.getInstance();
    const line = graphInstance.options.editingLineController.line;
    if (line) {
      line.color = newValue;
    }
    graphInstance.dataUpdated();
  };

  const changeLineShape = (newValue: number) => {
    const graphInstance = graphRef.current!.getInstance();
    const line = graphInstance.options.editingLineController.line;
    if (line) {
      line.lineShape = newValue;
    }
    graphInstance.dataUpdated();
  };

  const changeLineWidth = (newValue: number) => {
    const graphInstance = graphRef.current!.getInstance();
    const line = graphInstance.options.editingLineController.line;
    if (line) {
      line.lineWidth = newValue;
    }
    graphInstance.dataUpdated();
  };

  const removeLine = () => {
    const graphInstance = graphRef.current!.getInstance();
    const line = graphInstance.options.editingLineController.line;
    const link = graphInstance.options.editingLineController.link;
    if (line && link) {
      graphInstance.removeLine(link, line);
      graphInstance.setEditingLine(null, null);
    }
  };

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph

          ref={graphRef}
          options={graphOptions}
          onCanvasClick={onCanvasClick}
          onLineClick={onLineClick}
        >
          <RGSlotOnGraph>
            <MyDemoPanel width="300px">
              <div className="c-content">
                Click to select a line, and a toolbar will be displayed where you can customize operations for the current line.
              </div>
              <div className="c-content">
                The position, size, and content of the line toolbar can be fully customized.
              </div>
            </MyDemoPanel>
            <RGEditingConnectController />
            <RGEditingLineController>
              <div className="c-my-line-toolbar">
                <div className="c-my-row">
                  <div>Line color:</div>
                  <div

                    className="c-my-line-btn"
                    style={{ backgroundColor: 'rgba(214,103,239,0.59)' }}
                    onClick={() => changeLineColor('rgba(214,103,239,0.59)')}
                  />
                  <div

                    className="c-my-line-btn"
                    style={{ backgroundColor: '#5fa903c9' }}
                    onClick={() => changeLineColor('#5fa903c9')}
                  />
                  <div

                    className="c-my-line-btn"
                    style={{ backgroundColor: '#af7802cc' }}
                    onClick={() => changeLineColor('#af7802cc')}
                  />
                  <div

                    className="c-my-line-btn"
                    style={{ backgroundColor: '#1894d7' }}
                    onClick={() => changeLineColor('#1894d7')}
                  />
                  <div

                    className="c-my-line-btn"
                    style={{ backgroundColor: '#e85f84' }}
                    onClick={() => changeLineColor('#e85f84')}
                  />
                </div>
                <div className="c-my-row">
                  <div>Line shape:</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(1)}>1</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(2)}>2</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(3)}>3</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(4)}>4</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(5)}>5</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(6)}>6</div>
                  <div className="c-my-line-btn" onClick={() => changeLineShape(7)}>7</div>
                </div>
                <div className="c-my-row">
                  <div>Line width:</div>
                  <div className="c-my-line-btn" onClick={() => changeLineWidth(1)}>1</div>
                  <div className="c-my-line-btn" onClick={() => changeLineWidth(2)}>2</div>
                  <div className="c-my-line-btn" onClick={() => changeLineWidth(4)}>4</div>
                  <div className="c-my-line-btn" onClick={() => changeLineWidth(6)}>6</div>
                  <div className="c-my-line-btn" onClick={() => changeLineWidth(8)}>8</div>
                  <div className="c-my-line-btn" onClick={() => changeLineWidth(12)}>12</div>
                </div>
                <div>
                  <div className="c-my-button" onClick={removeLine}>Delete Line</div>
                </div>
              </div>
            </RGEditingLineController>
          </RGSlotOnGraph>
        </RelationGraph>
      </div>
    </div>
  );
};

export default CustomizeLineToolbar;
```

### `customize-line-toolbar.scss`

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
  .c-my-line-toolbar {
    pointer-events: auto;
    position: absolute;
    width: 400px;
    font-size: 12px;
    top: 10px;
    left: calc((100% - 400px) / 2);
    z-index: 10;
    padding: 15px;
    border: rgba(166, 41, 239, 0.65) solid 1px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 3px 9px rgba(0, 21, 41, 0.3);
    color: #666666;
    .c-my-row {
      display: flex;
      place-items: center;
      justify-content: start;
      gap: 5px;
      padding-bottom: 5px;
    }
    .c-my-line-btn {
      height: 20px;
      width: 20px;
      border-radius: 5px;
      border: rgba(166, 41, 239, 1) solid 1px;
      color: rgba(166, 41, 239, 1);
      cursor: pointer;
      font-size: 12px;
      display: flex;
      place-items: center;
      justify-content: center;
      &:hover {
        background-color: rgba(166, 41, 239, 1);
        color: #ffffff;
      }
    }
    .c-my-button {
      border-radius: 5px;
      border: rgba(166, 41, 239, 1) solid 1px;
      background-color: rgba(166, 41, 239, 0.65);
      color: #ffffff;
      cursor: pointer;
      padding: 2px 15px;
      font-size: 12px;
      display: inline-block;
      &:hover {
        background-color: rgba(166, 41, 239, 1);
      }
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
