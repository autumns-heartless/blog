# 支持生成图片的背景水印

## Vue2 版本

### `watermark-for-download-image.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              这个示例通过插槽，以普通div元素的方式自定义了背景的颜色、图片、图片是否重复、图片大小等。你可以设置背景为任何内容。
            </div>
            <div class="c-content">
              同时这些内容将会在导出图片时，和节点/线条一起被绘制在最终的图片中。
            </div>
            <div class="c-content">
              你可以点击工具栏中的【下载图片】按钮来试试。或者：
            </div>
            <div class="c-button" @click="downloadImageByRGApi">下载图片</div>
          </MyDemoPanel>
          <RGBackground>
            <div
                :style="{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(data:image/png;base64,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)`,
                  backgroundSize: '200px 200px',
                  backgroundRepeat: 'repeat',
                  backgroundColor: 'rgba(246, 167, 87, 0.1)'
                }"
            />
          </RGBackground>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
import { RGBackground } from 'relation-graph';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';
export default {
  name: 'Demo',
  components: { MyDemoPanel, RGBackground },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        // 这里可以参考"Graph 图谱"中的参数进行设置
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'top'
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
          { id: 'a2', text: 'Plain', borderWidth: 1, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
          // 除非万不得已，否则不建议使用html属性，你可以使用node插槽，让节点展示为任意形态
          { id: 'a1-1', text: 'Text Node' },
          { id: 'a1-4', text: 'XXX', nodeShape: 0 },
          { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
          { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
          { id: 'e', text: 'Rectangular node', nodeShape: 1 },
          { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
          { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
          { id: 'g', text: 'Css Flash' }
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
      });
    },
    async downloadImageByRGApi() {
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.downloadAsImage('png', 'your-filename.png');
    }
  }
};
</script>
<style scoped lang="scss">
::v-deep .relation-graph {
 .rel-map {
    //background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    //background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-toolbar{
    background-color: #ff8c00;
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
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

### `watermark-for-download-image.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="$graphRef" :options="graphOptions">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              This example customizes the background color, image, repeat, and size using a regular div element through slots. You can set the background to any content.
            </div>
            <div class="c-content">
              At the same time, these contents will be drawn in the final image along with the nodes/lines when exporting the image.
            </div>
            <div class="c-content">
              You can click the "Download Image" button in the toolbar to try it out. Or:
            </div>
            <div class="c-button" @click="downloadImageByRGApi">Download Image</div>
          </MyDemoPanel>
          <RGBackground>
            <div
              :style="{
                width: '100%',
                height: '100%',
                backgroundImage: `url(data:image/png;base64,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)`,
                backgroundSize: '200px 200px',
                backgroundRepeat: 'repeat',
                backgroundColor: 'rgba(246, 167, 87, 0.1)'
              }"
            />
          </RGBackground>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import RelationGraph, { RGBackground, RelationGraphComponent } from 'relation-graph-vue3';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel.vue';
import {RelationGraphInstance, RGOptions} from "relation-graph-vue3";

const $graphRef = ref<RelationGraphComponent>(null);
const graphInstance = computed<RelationGraphInstance>(() => $graphRef.value?.getInstance());
const graphOptions: RGOptions = {
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'top'
};

onMounted(() => {
    showGraph();
});

const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'Border color', borderColor: 'yellow' },
            { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
            { id: 'a2', text: 'Plain', borderWidth: 1, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
            { id: 'a1-1', text: 'Text Node' },
            { id: 'a1-4', text: 'XXX', nodeShape: 0 },
            { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
            { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
            { id: 'e', text: 'Rectangular node', nodeShape: 1 },
            { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
            { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
            { id: 'g', text: 'Css Flash' }
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
    const graphInstance = $graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
    }
};

const downloadImageByRGApi = async () => {
    await graphInstance.value.downloadAsImage('png', 'your-filename.png');
};

</script>

<style scoped lang="scss">
::v-deep(.relation-graph) {
 .rel-map {
    //background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    //background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-toolbar{
    background-color: #ff8c00;
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
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

### `watermark-for-download-image.tsx`

```javascript
import React, { useState, useEffect, useRef } from 'react';
import RelationGraph, { RGSlotOnGraph, RGBackground } from 'relation-graph-react'; // Adjust import based on your project structure
import MyDemoPanel from './RGDemoComponents/MyDemoPanel';
import './watermark-for-download-image.scss';
import { RelationGraphComponent, RGJsonData } from 'relation-graph-react';
const MyCustomGraph = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph();
  }, []);

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'Border color', borderColor: 'yellow' },
        { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
        { id: 'a2', text: 'Plain', borderWidth: 1, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
        { id: 'a1-1', text: 'Text Node' },
        { id: 'a1-4', text: 'XXX', nodeShape: 0 },
        { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
        { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
        { id: 'e', text: 'Rectangular node', nodeShape: 1 },
        { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
        { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
        { id: 'g', text: 'Css Flash' }
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
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  const downloadImageByRGApi = async () => {
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      await graphInstance.downloadAsImage('png', 'your-filename.png');
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <RelationGraph ref={graphRef} options={{
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'top'
      }}>
        <RGSlotOnGraph>
          <MyDemoPanel>
            <div className="c-content">
              This example customizes the background color, image, repeat, and size using a regular div element through slots. You can set the background to any content.
            </div>
            <div className="c-content">
              At the same time, these contents will be drawn in the final image along with the nodes/lines when exporting the image.
            </div>
            <div className="c-content">
              You can click the “Download Image” button in the toolbar to try it out. Or:
            </div>
            <div className="c-button" onClick={downloadImageByRGApi}>Download Image</div>
          </MyDemoPanel>
          <RGBackground>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(data:image/png;base64,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)',
                backgroundSize: '200px 200px',
                backgroundRepeat: 'repeat',
                backgroundColor: 'rgba(246, 167, 87, 0.1)'
              }}
            />
          </RGBackground>
        </RGSlotOnGraph>
      </RelationGraph>
    </div>
  );
};

export default MyCustomGraph;
```

### `watermark-for-download-image.scss`

```scss
.relation-graph {
  .rel-map {
    //background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    //background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-toolbar {
    background-color: #ff8c00;
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
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
