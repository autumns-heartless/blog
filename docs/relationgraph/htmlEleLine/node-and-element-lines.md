# HTML 元素 & 节点内容

## Vue2 版本

### `node-and-element-lines.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick">
        <template #canvas-plug><!-- canvas-plug Elements will behind nodes -->
          <div class="my-diy-canvas-element" style="left: 400px;top:0px;width:240px;height:140px;background-color: #1da9f5;">
            <div id="el-1" style="width:150px;background-color: #8080ff;padding:5px;border-radius: 5px;margin:auto;">
              [Behind]Element 1
            </div>
          </div>
          <div id="el-4" class="my-diy-canvas-element" style="left: -200px;top:-150px;width:170px;height:110px;background-color: #650baf;">[Behind]Element 4</div>
        </template>
        <!-- default Elements will above nodes -->
        <div id="el-2" class="my-diy-canvas-element rel-node-checked" style="left: 200px;top:150px;width:150px;height:50px;background-color: #2cbb03;">[Above]Element 2</div>
        <div id="el-3" class="my-diy-canvas-element" style="left: 0px;top:0px;width:160px;height:100px;background-color: #e85f84;">[Above]Element 3</div>
        <template #node="{node}">
          <div v-if="node.id==='e'">
            <div>{{node.text}}</div>
            <div id="e-1" style="width:50px;margin:auto;line-height:20px;background-color: #ffffff;color: #1da9f5;">{{node.text}}-1</div>
          </div>
          <div v-else-if="node.id==='d'" style="background-color: #1da9f5;">
            <div>{{node.text}}</div>
            <div id="d-1" style="width:50px;margin:auto;line-height:20px;background-color: #ffffff;color: #1da9f5;">{{node.text}}-1</div>
          </div>
          <div v-else class="rg-center-items" style="height: 100%;">
            <div style="width: 100%;">{{node.text}}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        debug: false,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        allowShowDownloadButton: true,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      // const __graph_json_data = {
      //   rootId: 'a',
      //   nodes: [
      //     { id: 'a', text: 'A', borderColor: 'yellow' },
      //     { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
      //     { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
      //     { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
      //   ],
      //   lines: [
      //     { from: 'a', to: 'b', text: 'Line Text', color: '#43a2f1' },
      //     { from: 'a', to: 'c', text: 'Line Text' },
      //     { from: 'a', to: 'e', text: 'Line Text' },
      //     { from: 'b', to: 'e', text: '', color: '#67C23A' }
      //   ]
      // };
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'A', borderColor: 'yellow' },
          { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
          { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
          { id: 'd', text: 'D', nodeShape: 1, width: 80, height: 60 },
          { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
          { from: 'a', to: 'b', text: 'Line Text', color: '#43a2f1' },
          { from: 'b', to: 'b', text: 'Line Text' },
          { from: 'd', to: 'd', text: 'Line Text' },
          { from: 'e', to: 'e', text: 'Line Text' },
          { from: 'c', to: 'c', text: 'xxx', color: 'rgba(159,23,227,0.65)' },
          { from: 'b', to: 'c', text: 'Line Text' },
          { from: 'a', to: 'c', text: 'Line Text', forDisplayOnly: true, lineShape: 3 },
          { from: 'c', to: 'd', lineShape: 1, text: 'Line Text' },
          { from: 'd', to: 'c', lineShape: 1, text: '', color: '#67C23A' },
          { from: 'd', to: 'c', lineShape: 1, text: '', color: 'rgba(159,23,227,0.65)' },
          { from: 'd', to: 'a', text: '', color: '#03469a' },
          { from: 'e', to: 'a', text: '', color: '#67C23A' }
        ],
        elementLines: [
          { from: 'e-1', to: 'd-1', text: 'Line Text', lineShape: 3, color: 'rgba(159,23,227,0.65)', lineWidth: 4, showEndArrow: false },
          { from: 'el-1', to: 'el-2', text: 'Line Text', lineShape: 5, color: 'rgba(159,23,227,0.65)', lineWidth: 4, showEndArrow: false },
          { from: 'el-1', to: 'd-1', text: 'Line Text Use TextPath', useTextPath: true, lineShape: 2, color: 'rgba(159,23,227,0.65)', lineWidth: 4, showEndArrow: false },
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.my-diy-canvas-element{
  position: absolute;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  display: grid;
  place-items: center; /* 水平居中和垂直居中 */
}
</style>
```

## Vue3 版本

### `node-and-element-lines.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh - 60px);">
      <RelationGraph

        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick">
        <template #canvas-plug><!-- canvas-plug Elements will behind nodes -->
          <div class="my-diy-canvas-element" style="left: 400px;top:0px;width:240px;height:140px;background-color: #1da9f5;">
            <div id="el-1" style="width:150px;background-color: #8080ff;padding:5px;border-radius: 5px;margin:auto;">
              [Behind]Element 1

            </div>
          </div>
          <div id="el-4" class="my-diy-canvas-element" style="left: -200px;top:-150px;width:170px;height:110px;background-color: #650baf;">[Behind]Element 4</div>
        </template>
        <!-- default Elements will above nodes -->
        <div id="el-2" class="my-diy-canvas-element rel-node-checked" style="left: 200px;top:150px;width:150px;height:50px;background-color: #2cbb03;">[Above]Element 2</div>
        <div id="el-3" class="my-diy-canvas-element" style="left: 0px;top:0px;width:160px;height:100px;background-color: #e85f84;">[Above]Element 3</div>
        <template #node="{node}">
          <div v-if="node.id==='e'">
            <div>{{node.text}}</div>
            <div id="e-1" style="width:50px;margin:auto;line-height:20px;background-color: #ffffff;color: #1da9f5;">{{node.text}}-1</div>
          </div>
          <div v-else-if="node.id==='d'" style="background-color: #1da9f5;">
            <div>{{node.text}}</div>
            <div id="d-1" style="width:50px;margin:auto;line-height:20px;background-color: #ffffff;color: #1da9f5;">{{node.text}}-1</div>
          </div>
          <div v-else class="rg-center-items" style="height: 100%;">
            <div style="width: 100%;">{{node.text}}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';

const graphRef = ref<RelationGraphComponent>();
const isShowCodePanel = ref(false);
const graphOptions: RGOptions = {
    debug: false,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border'
    // 这里可以参考"Graph 图谱"中的参数进行设置

};

onMounted(() => {
    showGraph();
});

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'A', borderColor: 'yellow' },
            { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
            { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
            { id: 'd', text: 'D', nodeShape: 1, width: 80, height: 60 },
            { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
            { from: 'a', to: 'b', text: 'Line Text', color: '#43a2f1' },
            { from: 'b', to: 'b', text: 'Line Text' },
            { from: 'd', to: 'd', text: 'Line Text' },
            { from: 'e', to: 'e', text: 'Line Text' },
            { from: 'c', to: 'c', text: 'xxx', color: 'rgba(159,23,227,0.65)' },
            { from: 'b', to: 'c', text: 'Line Text' },
            { from: 'a', to: 'c', text: 'Line Text', forDisplayOnly: true, lineShape: 3 },
            { from: 'c', to: 'd', lineShape: 1, text: 'Line Text' },
            { from: 'd', to: 'c', lineShape: 1, text: '', color: '#67C23A' },
            { from: 'd', to: 'c', lineShape: 1, text: '', color: 'rgba(159,23,227,0.65)' },
            { from: 'd', to: 'a', text: '', color: '#03469a' },
            { from: 'e', to: 'a', text: '', color: '#67C23A' }
        ],
        elementLines: [
            { from: 'e-1', to: 'd-1', text: 'Line Text', lineShape: 3, color: 'rgba(159,23,227,0.65)', lineWidth: 4, showEndArrow: false },
            { from: 'el-1', to: 'el-2', text: 'Line Text', lineShape: 5, color: 'rgba(159,23,227,0.65)', lineWidth: 4, showEndArrow: false },
            { from: 'el-1', to: 'd-1', text: 'Line Text Use TextPath', useTextPath: true, lineShape: 2, color: 'rgba(159,23,227,0.65)', lineWidth: 4, showEndArrow: false },
        ]
    };
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        await graphInstance.moveToCenter();
        await graphInstance.zoomToFit();
    }
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.my-diy-canvas-element{
  position: absolute;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  display: grid;
  place-items: center; /* 水平居中和垂直居中 */
}
</style>
```

## React 版本

### `node-and-element-lines.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph from 'relation-graph-react'
import type {
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGOptions,
  RelationGraphComponent,
} from 'relation-graph-react'

import './node-and-element-lines.scss'

const NodeSlot: React.FC<{ node: RGNode }> = ({ node }) => {
  if (node.id === 'e') {
    return (
      <div>
        <div>{node.text}</div>
        <div
          id="e-1"
          style={{
            width: '50px',
            margin: 'auto',
            lineHeight: '20px',
            backgroundColor: '#ffffff',
            color: '#1da9f5',
          }}
        >
          {node.text}-1
        </div>
      </div>
    )
  } else if (node.id === 'd') {
    return (
      <div style={{ backgroundColor: '#1da9f5' }}>
        <div>{node.text}</div>
        <div
          id="d-1"
          style={{
            width: '50px',
            margin: 'auto',
            lineHeight: '20px',
            backgroundColor: '#ffffff',
            color: '#1da9f5',
          }}
        >
          {node.text}-1
        </div>
      </div>
    )
  } else {
    return (
      <div className="rg-center-items" style={{ height: '100%' }}>
        <div style={{ width: '100%' }}>{node.text}</div>
      </div>
    )
  }
}

const MyComponent = () => {
  const graphRef = useRef < RelationGraphComponent > null

  useEffect(() => {
    showGraph()
  }, [])

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'A', borderColor: 'yellow' },
        { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
        { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
        { id: 'd', text: 'D', nodeShape: 1, width: 80, height: 60 },
        { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 },
      ],
      lines: [
        { from: 'a', to: 'b', text: 'Line Text', color: '#43a2f1' },
        { from: 'b', to: 'b', text: 'Line Text' },
        { from: 'd', to: 'd', text: 'Line Text' },
        { from: 'e', to: 'e', text: 'Line Text' },
        { from: 'c', to: 'c', text: 'xxx', color: 'rgba(159,23,227,0.65)' },
        { from: 'b', to: 'c', text: 'Line Text' },
        { from: 'a', to: 'c', text: 'Line Text', forDisplayOnly: true, lineShape: 3 },
        { from: 'c', to: 'd', lineShape: 1, text: 'Line Text' },
        { from: 'd', to: 'c', lineShape: 1, text: '', color: '#67C23A' },
        { from: 'd', to: 'c', lineShape: 1, text: '', color: 'rgba(159,23,227,0.65)' },
        { from: 'd', to: 'a', text: '', color: '#03469a' },
        { from: 'e', to: 'a', text: '', color: '#67C23A' },
      ],
      elementLines: [
        {
          from: 'e-1',
          to: 'd-1',
          text: 'Line Text',
          lineShape: 3,
          color: 'rgba(159,23,227,0.65)',
          lineWidth: 4,
          showEndArrow: false,
        },
        {
          from: 'el-1',
          to: 'el-2',
          text: 'Line Text',
          lineShape: 5,
          color: 'rgba(159,23,227,0.65)',
          lineWidth: 4,
          showEndArrow: false,
        },
        {
          from: 'el-1',
          to: 'd-1',
          text: 'Line Text',
          lineShape: 2,
          color: 'rgba(159,23,227,0.65)',
          lineWidth: 4,
          showEndArrow: false,
        },
      ],
    }
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data)
      await graphInstance.moveToCenter()
      await graphInstance.zoomToFit()
    }
  }

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject)
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject)
  }

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={{
            debug: false,
            allowSwitchLineShape: true,
            allowSwitchJunctionPoint: true,
            allowShowDownloadButton: true,
            defaultJunctionPoint: 'border',
          }}
          canvasPlugSlot={
            <div>
              {/*canvas-plug Elements will above nodes*/}
              <div
                id="el-2"
                className="my-diy-canvas-element rel-node-checked"
                style={{
                  left: '200px',
                  top: '150px',
                  width: '150px',
                  height: '50px',
                  backgroundColor: '#2cbb03',
                }}
              >
                [Above]Element 2
              </div>
              <div
                id="el-3"
                className="my-diy-canvas-element"
                style={{
                  left: '0px',
                  top: '0px',
                  width: '160px',
                  height: '100px',
                  backgroundColor: '#e85f84',
                }}
              >
                [Above]Element 3
              </div>
            </div>
          }
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          nodeSlot={NodeSlot}
        >
          {/*default Elements will behind nodes*/}
          <div
            className="my-diy-canvas-element"
            style={{
              left: '400px',
              top: '0px',
              width: '240px',
              height: '140px',
              backgroundColor: '#1da9f5',
            }}
          >
            <div
              id="el-1"
              style={{
                width: '150px',
                backgroundColor: '#8080ff',
                padding: '5px',
                borderRadius: '5px',
                margin: 'auto',
              }}
            >
              [Behind]Element 1
            </div>
          </div>
          <div
            id="el-4"
            className="my-diy-canvas-element"
            style={{
              left: '-200px',
              top: '-150px',
              width: '170px',
              height: '110px',
              backgroundColor: '#650baf',
            }}
          >
            [Behind]Element 4
          </div>
        </RelationGraph>
      </div>
    </div>
  )
}

export default MyComponent
```

### `node-and-element-lines.scss`

```scss
.my-diy-canvas-element {
  position: absolute;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  display: grid;
  place-items: center; /* 水平居中和垂直居中 */
}
```
