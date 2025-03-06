# 动态追加数据

## Vue2 版本

### `adv-dynamic-data.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      >
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-my-button" :class="{'c-my-button-disabled': level2DataIsloaded}" @click="!level2DataIsloaded && loadNextLevel2Data()">加载第2层数据</div>
            <div class="c-my-button" :class="{'c-my-button-disabled': !level2DataIsloaded || level3DataIsloaded}" @click="(level2DataIsloaded && !level3DataIsloaded) && loadNextLevel3Data()">加载第3层数据</div>
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
  debug: true,
  defaultNodeBorderWidth: 0,
  defaultNodeColor: 'rgba(238, 178, 94, 1)',
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineShape: 1,
  layout:
    {
      label: '中心',
      layoutName: 'center',
      // layoutName: 'force',
      layoutClassName: 'seeks-layout-center'
    },
  defaultJunctionPoint: 'border'

  // 这里可以参考"Graph 图谱"中的参数进行设置
}
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      level2DataIsloaded: false,
      level3DataIsloaded: false,
      isShowCodePanel: false,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          { id: '1', text: '节点-1', myicon: 'el-icon-star-on' },
          { id: '2', text: '节点-2', myicon: 'el-icon-setting' },
          { id: '4', text: '节点-4', myicon: 'el-icon-star-on' },
          { id: '6', text: '节点-6', myicon: 'el-icon-setting' },
          { id: '7', text: '节点-7', myicon: 'el-icon-setting' },
          { id: '8', text: '节点-8', myicon: 'el-icon-star-on' },
          { id: '9', text: '节点-9', myicon: 'el-icon-headset' },
          { id: '119', text: '节点-9', myicon: 'el-icon-headset' }
        ],
        lines: [
          { from: '1', to: '2', text: '投资' },
          { from: '4', to: '2', text: '高管' },
          { from: '6', to: '2', text: '高管' },
          { from: '7', to: '2', text: '高管' },
          { from: '8', to: '2', text: '高管' },
          { from: '9', to: '2', text: '高管' }
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    async loadNextLevel2Data() {
      this.level2DataIsloaded = true;
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          { id: '3', text: '节点-3', myicon: 'el-icon-setting' },
          { id: '71', text: '节点-71', myicon: 'el-icon-headset' },
          { id: '72', text: '节点-72', myicon: 'el-icon-s-tools' },
          { id: '73', text: '节点-73', myicon: 'el-icon-star-on' },
          { id: '81', text: '节点-81', myicon: 'el-icon-s-promotion' },
          { id: '82', text: '节点-82', myicon: 'el-icon-s-promotion' },
          { id: '83', text: '节点-83', myicon: 'el-icon-star-on' },
          { id: '84', text: '节点-84', myicon: 'el-icon-s-promotion' },
          { id: '85', text: '节点-85', myicon: 'el-icon-sunny' },
          { id: '91', text: '节点-91', myicon: 'el-icon-sunny' },
          { id: '92', text: '节点-82', myicon: 'el-icon-sunny' },
          { id: '5', text: '节点-5', myicon: 'el-icon-sunny' },
          { id: '401', text: '节点-401', myicon: 'el-icon-sunny' },
          { id: '402', text: '节点-402', myicon: 'el-icon-sunny' },
          { id: '403', text: '节点-403', myicon: 'el-icon-sunny' },
          { id: '404', text: '节点-404', myicon: 'el-icon-sunny' },
          { id: '405', text: '节点-405', myicon: 'el-icon-sunny' },
          { id: '551', text: '节点-551', myicon: 'el-icon-sunny' },
          { id: '552', text: '节点-552', myicon: 'el-icon-sunny' }
        ],
        lines: [
          { from: '7', to: '71', text: '投资' },
          { from: '7', to: '72', text: '投资' },
          { from: '7', to: '73', text: '投资' },
          { from: '8', to: '81', text: '投资' },
          { from: '8', to: '82', text: '投资' },
          { from: '8', to: '83', text: '投资' },
          { from: '8', to: '84', text: '投资' },
          { from: '8', to: '85', text: '投资' },
          { from: '9', to: '91', text: '投资' },
          { from: '9', to: '92', text: '投资' },
          { from: '3', to: '1', text: '高管' },
          { from: '1', to: '5', text: '投资' },
          { from: '401', to: '402', text: '投资' },
          { from: '401', to: '403', text: '投资' },
          { from: '551', to: '552', text: '投资' }
        ]
      };
      const graphInstance = this.$refs.graphRef.getInstance();
      // 新增节点数据
      graphInstance.addNodes(__graph_json_data.nodes);
      // 新增线条数据
      graphInstance.addLines(__graph_json_data.lines);
      // 如果是force布局
      __graph_json_data.nodes.forEach(node => {
        node.x = Math.floor(Math.random() * 300);
        node.y = Math.floor(Math.random() * 300);
      });
      await graphInstance.layouter.placeNodes(graphInstance.graphData.nodes, graphInstance.graphData.rootNode);
      // 如果是其他布局
      // await graphInstance.doLayout();
    },
    loadNextLevel3Data() {
      this.level3DataIsloaded = true;
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          { id: '51', text: '节点-51', myicon: 'el-icon-sunny' },
          { id: '52', text: '节点-52', myicon: 'el-icon-sunny' },
          { id: '53', text: '节点-53', myicon: 'el-icon-sunny' },
          { id: '54', text: '节点-54', myicon: 'el-icon-sunny' },
          { id: '55', text: '节点-55', myicon: 'el-icon-sunny' }
        ],
        lines: [
          { from: '5', to: '51', text: '投资1' },
          { from: '5', to: '52', text: '投资' },
          { from: '5', to: '53', text: '投资3' },
          { from: '5', to: '54', text: '投资4' },
          { from: '5', to: '55', text: '投资' }
        ]
      };
      this.$refs.graphRef.appendJsonData(__graph_json_data, (graphInstance) => {
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
.c-my-panel{
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;
  width: 240px;
  .c-my-button {
    text-align: left;
    color: #ffffff;
    background-color: #f57e1d;
    border: #ffffff solid 1px;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    border-radius: 10px;
    padding-left: 10px;
    margin-top: 10px;
    &:hover{
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, -webkit-box-shadow 200ms ease;
      box-shadow: 0 0 0 5px rgba(245, 126, 29, 0.2);
    }
  }
  .c-my-button-disabled {
    background-color: rgba(245, 126, 29, 0.2);
    cursor: no-drop;
    &:hover{
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, -webkit-box-shadow 200ms ease;
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
```

## Vue3 版本

### `adv-dynamic-data.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions" @node-click="onNodeClick" @line-click="onLineClick">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-my-button" :class="{'c-my-button-disabled': level2DataIsloaded}" @click="!level2DataIsloaded && loadNextLevel2Data()">Load Level 2 Data</div>
            <div class="c-my-button" :class="{'c-my-button-disabled': !level2DataIsloaded || level3DataIsloaded}" @click="(level2DataIsloaded && !level3DataIsloaded) && loadNextLevel3Data()">Load Level 3 Data</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent, RGOptions } from 'relation-graph-vue3';

const graphRef = ref<RelationGraphComponent>();
const level2DataIsloaded = ref(false);
const level3DataIsloaded = ref(false);
const graphOptions: RGOptions = {
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'rgba(238, 178, 94, 1)',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layouts: [
        {
            label: 'Center',
            layoutName: 'center',
            layoutClassName: 'seeks-layout-center'
        }
    ],
    defaultJunctionPoint: 'border'
};

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: '2',
        nodes: [
            { id: '1', text: 'Node-1', myicon: 'el-icon-star-on' },
            { id: '2', text: 'Node-2', myicon: 'el-icon-setting' },
            { id: '4', text: 'Node-4', myicon: 'el-icon-star-on' },
            { id: '6', text: 'Node-6', myicon: 'el-icon-setting' },
            { id: '7', text: 'Node-7', myicon: 'el-icon-setting' },
            { id: '8', text: 'Node-8', myicon: 'el-icon-star-on' },
            { id: '9', text: 'Node-9', myicon: 'el-icon-headset' }
        ],
        lines: [
            { from: '1', to: '2', text: 'Investment' },
            { from: '4', to: '2', text: 'Executive' },
            { from: '6', to: '2', text: 'Executive' },
            { from: '7', to: '2', text: 'Executive' },
            { from: '8', to: '2', text: 'Executive' },
            { from: '9', to: '2', text: 'Executive' }
        ]
    };
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        await graphInstance.moveToCenter();
        await graphInstance.zoomToFit();
    }
};

const loadNextLevel2Data = () => {
    level2DataIsloaded.value = true;
    const __graph_json_data: RGJsonData = {
        rootId: '2',
        nodes: [
            { id: '3', text: 'Node-3', myicon: 'el-icon-setting' },
            { id: '71', text: 'Node-71', myicon: 'el-icon-headset' },
            { id: '72', text: 'Node-72', myicon: 'el-icon-s-tools' },
            { id: '73', text: 'Node-73', myicon: 'el-icon-star-on' },
            { id: '81', text: 'Node-81', myicon: 'el-icon-s-promotion' },
            { id: '82', text: 'Node-82', myicon: 'el-icon-s-promotion' },
            { id: '83', text: 'Node-83', myicon: 'el-icon-star-on' },
            { id: '84', text: 'Node-84', myicon: 'el-icon-s-promotion' },
            { id: '85', text: 'Node-85', myicon: 'el-icon-sunny' },
            { id: '91', text: 'Node-91', myicon: 'el-icon-sunny' },
            { id: '92', text: 'Node-82', myicon: 'el-icon-sunny' },
            { id: '5', text: 'Node-5', myicon: 'el-icon-sunny' }
        ],
        lines: [
            { from: '7', to: '71', text: 'Investment' },
            { from: '7', to: '72', text: 'Investment' },
            { from: '7', to: '73', text: 'Investment' },
            { from: '8', to: '81', text: 'Investment' },
            { from: '8', to: '82', text: 'Investment' },
            { from: '8', to: '83', text: 'Investment' },
            { from: '8', to: '84', text: 'Investment' },
            { from: '8', to: '85', text: 'Investment' },
            { from: '9', to: '91', text: 'Investment' },
            { from: '9', to: '92', text: 'Investment' },
            { from: '3', to: '1', text: 'Executive' },
            { from: '1', to: '5', text: 'Investment' }
        ]
    };
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.appendJsonData(__graph_json_data);
    }
};

const loadNextLevel3Data = () => {
    level3DataIsloaded.value = true;
    const __graph_json_data: RGJsonData = {
        rootId: '2',
        nodes: [
            { id: '51', text: 'Node-51', myicon: 'el-icon-sunny' },
            { id: '52', text: 'Node-52', myicon: 'el-icon-sunny' },
            { id: '53', text: 'Node-53', myicon: 'el-icon-sunny' },
            { id: '54', text: 'Node-54', myicon: 'el-icon-sunny' },
            { id: '55', text: 'Node-55', myicon: 'el-icon-sunny' }
        ],
        lines: [
            { from: '5', to: '51', text: 'Investment1' },
            { from: '5', to: '52', text: 'Investment' },
            { from: '5', to: '53', text: 'Investment3' },
            { from: '5', to: '54', text: 'Investment4' },
            { from: '5', to: '55', text: 'Investment' }
        ]
    };
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.appendJsonData(__graph_json_data);
    }
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};

onMounted(() => {
    showGraph();
});
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-my-panel{
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;
  width: 240px;
  .c-my-button {
    text-align: left;
    color: #ffffff;
    background-color: #f57e1d;
    border: #ffffff solid 1px;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    border-radius: 10px;
    padding-left: 10px;
    margin-top: 10px;
    &:hover{
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, -webkit-box-shadow 200ms ease;
      box-shadow: 0 0 0 5px rgba(245, 126, 29, 0.2);
    }
  }
  .c-my-button-disabled {
    background-color: rgba(245, 126, 29, 0.2);
    cursor: no-drop;
    &:hover{
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, -webkit-box-shadow 200ms ease;
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
```

## React 版本

### `adv-dynamic-data.tsx`

```javascript
import React, { useRef, useEffect, useState } from 'react'
import RelationGraph from 'relation-graph-react'
import type {
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
  RGOptions,
} from 'relation-graph-react'
import './adv-dynamic-data.scss'

const AdvDynamicData = () => {
  const graphRef = useRef < RelationGraphComponent > null
  const [level2DataIsloaded, setLevel2DataIsloaded] = useState(false)
  const [level3DataIsloaded, setLevel3DataIsloaded] = useState(false)

  const graphOptions: RGOptions = {
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'rgba(238, 178, 94, 1)',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layouts: [
      {
        label: 'Center',
        layoutName: 'center',
        layoutClassName: 'seeks-layout-center',
      },
    ],
    defaultJunctionPoint: 'border',
  }

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        { id: '1', text: 'Node-1' },
        { id: '2', text: 'Node-2' },
        { id: '4', text: 'Node-4' },
        { id: '6', text: 'Node-6' },
        { id: '7', text: 'Node-7' },
        { id: '8', text: 'Node-8' },
        { id: '9', text: 'Node-9' },
      ],
      lines: [
        { from: '1', to: '2', text: 'Investment' },
        { from: '4', to: '2', text: 'Executive' },
        { from: '6', to: '2', text: 'Executive' },
        { from: '7', to: '2', text: 'Executive' },
        { from: '8', to: '2', text: 'Executive' },
        { from: '9', to: '2', text: 'Executive' },
      ],
    }
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data)
      await graphInstance.moveToCenter()
      await graphInstance.zoomToFit()
    }
  }

  const loadNextLevel2Data = () => {
    setLevel2DataIsloaded(true)
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        { id: '3', text: 'Node-3' },
        { id: '71', text: 'Node-71' },
        { id: '72', text: 'Node-72' },
        { id: '73', text: 'Node-73' },
        { id: '81', text: 'Node-81' },
        { id: '82', text: 'Node-82' },
        { id: '83', text: 'Node-83' },
        { id: '84', text: 'Node-84' },
        { id: '85', text: 'Node-85' },
        { id: '91', text: 'Node-91' },
        { id: '92', text: 'Node-82' },
        { id: '5', text: 'Node-5' },
      ],
      lines: [
        { from: '7', to: '71', text: 'Investment' },
        { from: '7', to: '72', text: 'Investment' },
        { from: '7', to: '73', text: 'Investment' },
        { from: '8', to: '81', text: 'Investment' },
        { from: '8', to: '82', text: 'Investment' },
        { from: '8', to: '83', text: 'Investment' },
        { from: '8', to: '84', text: 'Investment' },
        { from: '8', to: '85', text: 'Investment' },
        { from: '9', to: '91', text: 'Investment' },
        { from: '9', to: '92', text: 'Investment' },
        { from: '3', to: '1', text: 'Executive' },
        { from: '1', to: '5', text: 'Investment' },
      ],
    }
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      graphInstance.appendJsonData(__graph_json_data)
    }
  }

  const loadNextLevel3Data = () => {
    setLevel3DataIsloaded(true)
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        { id: '51', text: 'Node-51' },
        { id: '52', text: 'Node-52' },
        { id: '53', text: 'Node-53' },
        { id: '54', text: 'Node-54' },
        { id: '55', text: 'Node-55' },
      ],
      lines: [
        { from: '5', to: '51', text: 'Investment1' },
        { from: '5', to: '52', text: 'Investment' },
        { from: '5', to: '53', text: 'Investment3' },
        { from: '5', to: '54', text: 'Investment4' },
        { from: '5', to: '55', text: 'Investment' },
      ],
    }
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      graphInstance.appendJsonData(__graph_json_data)
    }
  }

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject)
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject)
  }

  useEffect(() => {
    showGraph()
  }, [])

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          graphPlugSlot={
            <div className="c-my-panel">
              <div
                className={`c-my-button ${level2DataIsloaded ? 'c-my-button-disabled' : ''}`}
                onClick={!level2DataIsloaded && loadNextLevel2Data}
              >
                Load Level 2 Data
              </div>
              <div
                className={`c-my-button ${
                  !level2DataIsloaded || level3DataIsloaded ? 'c-my-button-disabled' : ''
                }`}
                onClick={level2DataIsloaded && !level3DataIsloaded && loadNextLevel3Data}
              >
                Load Level 3 Data
              </div>
            </div>
          }
        ></RelationGraph>
      </div>
    </div>
  )
}

export default AdvDynamicData
```

### `adv-dynamic-data.scss`

```scss
.c-my-panel {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;
  width: 240px;
  .c-my-button {
    text-align: left;
    color: #ffffff;
    background-color: #f57e1d;
    border: #ffffff solid 1px;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    border-radius: 10px;
    padding-left: 10px;
    margin-top: 10px;
    &:hover {
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, -webkit-box-shadow
          200ms ease;
      box-shadow: 0 0 0 5px rgba(245, 126, 29, 0.2);
    }
  }
  .c-my-button-disabled {
    background-color: rgba(245, 126, 29, 0.2);
    cursor: no-drop;
    &:hover {
      transition: background-color 200ms ease, outline 200ms ease, color 200ms ease, -webkit-box-shadow
          200ms ease;
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
}
```
