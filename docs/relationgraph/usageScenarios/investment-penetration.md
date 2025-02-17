# 投资关系探查

## Vue2 版本

### `investment-penetration.vue`

```javascript
<template>
  <div>
    <div
        v-loading="g_loading"
        element-loading-text="正在加载数据..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.6)"
        style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-node-expand="onNodeExpand"
        :on-node-collapse="onNodeCollapse"
      >
        <template #node="{node}">
          <div v-if="node.data.type === 'ex-btn'" class="my-node ex-btn">
            {{node.text}}
          </div>
          <div v-else-if="node.data.type === 'more-btn'" class="my-node more-btn">
            {{node.text}}
          </div>
          <div v-else-if="node.data.type === 'root'" class="my-node my-root">
            {{node.text}}
          </div>
          <div v-else class="my-node">
            {{node.text}}
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts">
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
const graphOptions = {
  debug: false,
  lineUseTextPath: true,
  useAnimationWhenExpanded: true,
  layout:
    {
      layoutName: 'tree',
      from: 'right',
      min_per_width: 300,
      max_per_width: 300,
      min_per_height: 40,
      max_per_height: 50,
      enableGatherNodes: true,
      levelDistance: '200,300,200,300,200,300,200,300,200,300,200,300,200,300,200,300'
    },
  defaultNodeShape: 1,
  defaultLineShape: 4,
  defaultJunctionPoint: 'lr',
  defaultNodeBorderWidth: 0,
  defaultLineColor: 'rgba(15, 71, 255)',
  defaultNodeFontColor: '#333333',
  defaultNodeColor: 'transparent'
};
export default {
  name: 'InvestmentPenetration',
  components: { },
  data() {
    return {
      currentCase: '横向树状图谱',
      isShowCodePanel: false,
      g_loading: false,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    async showGraph() {
      const __graph_json_data =
          { 'rootId': 'root', 'nodes': [
            { 'id': 'root', 'text': '北京天天天科技有限公司', offset_x: -50, data: { type: 'root' }},
            { 'id': 'root-invs', 'text': '对外投资', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: false, alignItems: 'right', data: { type: 'ex-btn', childrenLoaded: false }},
            { 'id': 'root-sh', 'text': '股东', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: false, alignItems: 'left', data: { type: 'ex-btn', childrenLoaded: false }},
            { 'id': 'root-history-invs', 'text': '历史投资', expandHolderPosition: 'left', expanded: false, alignItems: 'left', data: { type: 'ex-btn', iconToRight: true, childrenLoaded: false }}
          ], lines: [
            { 'from': 'root', 'to': 'root-invs', showEndArrow: false },
            { 'from': 'root-sh', 'to': 'root', showEndArrow: false },
            { 'from': 'root-history-invs', 'to': 'root', showEndArrow: false }
          ] };
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setJsonData(__graph_json_data, true);
      await graphInstance.playShowEffect();
      // 这些写上当图谱初始化完成后需要执行的代码
      // 找到根节点
      const rootNode = graphInstance.getNodeById('root-invs');
      // 展开根节点
      await graphInstance.expandNode(rootNode);
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    onNodeCollapse(node, e) {
    },
    // 通过onNodeExpand事件监听节点的展开事件，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
    async onNodeExpand(node, e) {
      const graphInstance = this.$refs.graphRef.getInstance();
      console.log('onNodeExpand:', node);
      // 判断是否已经动态加载数据了
      if (node.data.childrenLoaded) {
        console.log('这个节点的子节点已经加载过了');
        return;
      }
      this.g_loading = true;
      node.data.childrenLoaded = true;
      const newJsonData = await postRequest('/api/getEntInverstments', node);
      await graphInstance.appendJsonData(newJsonData, true);
      await graphInstance.doLayout();
      this.g_loading = false;
    }
  }
};
let newNodeIndex = 1;
const randomEntNamePrefix = ['', '天星', '星月夜', '风云际会', '金凯宾斯基'];
const postRequest = async(url:string, node) => {
  return new Promise((resolve, reject) => {
    setTimeout(function() { // 模拟从后来加载的时间
      // 以下模拟了从数据库中查询出来的两个投资对象，以及expandedNodeId与他们的投资关系
      const expandedNodeId = node.id;
      const alignItems = node.alignItems;
      const offset_x = alignItems === 'left' ? -100 : 100;
      // 如果展开的是投资按钮
      if (node.data.type === 'ex-btn') {
        const _new_json_data = {
          nodes: [
            { id: expandedNodeId + '-c1', text: `北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeIndex++}公司`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }},
            { id: expandedNodeId + '-c2', text: `北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeIndex++}公司`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }}
          ],
          lines: [
            { from: expandedNodeId, to: expandedNodeId + '-c1' },
            { from: expandedNodeId, to: expandedNodeId + '-c2' },
            { from: expandedNodeId, to: expandedNodeId + '-more' }
          ]
        };
        resolve(_new_json_data);
      } else {
        // 如果展开的是企业
        const _new_json_data = {
          nodes: [
            // 展开企业首先要展示出两个按钮
            { 'id': expandedNodeId + '-invs', 'text': '对外投资', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: false, alignItems, data: { type: 'ex-btn', childrenLoaded: false }},
            { 'id': expandedNodeId + '-sh', 'text': '股东', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: true, alignItems, data: { type: 'ex-btn', iconToRight: true, childrenLoaded: true }},
            // 展开企业还需要默认展开它的股东
            { id: expandedNodeId + '-c1', text: `北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeIndex++}公司`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }},
            { id: expandedNodeId + '-c2', text: `北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeIndex++}公司`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }},
            { id: expandedNodeId + '-c3', text: `北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeIndex++}公司`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }}
          ],
          lines: [
            { 'from': expandedNodeId, 'to': expandedNodeId + '-invs', showEndArrow: false },
            { 'from': expandedNodeId, 'to': expandedNodeId + '-sh', showEndArrow: false },
            { from: expandedNodeId + '-sh', to: expandedNodeId + '-c1', showEndArrow: false },
            { from: expandedNodeId + '-sh', to: expandedNodeId + '-c2', showEndArrow: false },
            { from: expandedNodeId + '-sh', to: expandedNodeId + '-c3', showEndArrow: false },
            { from: expandedNodeId + '-sh', to: expandedNodeId + '-more', showEndArrow: false }
          ]
        };
        resolve(_new_json_data);
      }
    }, 1000);
  });
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
::v-deep .relation-graph {
    .rel-node-checked{
        //box-shadow:none;
        //animation: none;
        box-shadow: 0 0 0 5px rgba(15, 71, 255, 0.3);
    }
    .c-collapsed{
        background-color: rgba(15, 71, 255, 0.5) !important;
    }
    .c-expanded{
        background-color: rgba(15, 71, 255, 0.5) !important;
    }
    .c-expand-positon-left{
        margin-left:-25px;
    }
}
.my-node{
    height:32px;
    text-align: right;
    border: #eeeeee solid 1px;
    border-radius:5px;
    background-color: #ffffff;
    padding-left:5px;
    padding-right:5px;
    line-height: 30px;
    &:hover:not(.more-btn,.ex-btn){
        color: rgba(15, 71, 255, 0.5);
        border: rgba(15, 71, 255, 0.5) solid 1px;
    }
    white-space: nowrap;
    text-overflow: ellipsis;
}
.ex-btn {
    border: none;
    text-align: left !important;
    &:hover{
        border: none;
    }
}
.more-btn {
    background-color: rgba(15, 71, 255, 0.5);
    color: #ffffff;
    cursor: pointer;
    text-align: center;
    padding-left: 0px;
    width: 100px;
    font-size: 12px;
    &:hover{
        background-color: rgba(15, 71, 255, 0.8);
    }
}
.my-root {
    border: rgba(15, 71, 255, 0.5) solid 1px;
    text-align: center;
    padding-left: 0px;
    width: 180px;
    font-size: 12px;
    &:hover{
        color: rgba(15, 71, 255, 0.5);
    }
}
</style>
```

## Vue3 版本

### `investment-penetration.vue`

```javascript
<template>
  <div>
    <div

      v-loading="g_loading"
      element-loading-text="Loading data..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      style="height:calc(100vh);">
      <RelationGraph

        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-node-expand="onNodeExpand"
        :on-node-collapse="onNodeCollapse"
      >
        <template #node="{node}">
          <div v-if="node.data.type === 'ex-btn'" class="my-node ex-btn">
            {{ node.text }}
          </div>
          <div v-else-if="node.data.type === 'more-btn'" class="my-node more-btn">
            {{ node.text }}
          </div>
          <div v-else-if="node.data.type === 'root'" class="my-node my-root">
            {{ node.text }}
          </div>
          <div v-else class="my-node">
            {{ node.text }}
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RGJsonData, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    useAnimationWhenExpanded: true,
    'layouts': [
        {
            'layoutName': 'tree',
            'from': 'right',
            'min_per_width': '300',
            'max_per_width': '300',
            'min_per_height': '40',
            'max_per_height': '50',
            enableGatherNodes: true,
            levelDistance: '200,300,200,300,200,300,200,300,200,300,200,300,200,300,200,300'
        }
    ],
    'defaultNodeShape': 1,
    'defaultLineShape': 4,
    'defaultJunctionPoint': 'lr',
    'defaultNodeBorderWidth': 0,
    'defaultLineColor': 'rgba(15, 71, 255)',
    defaultNodeFontColor: '#333333',
    'defaultNodeColor': 'transparent'
};

const graphRef = ref<RelationGraphComponent | null>(null);
const currentCase = 'Horizontal Tree Diagram';
const isShowCodePanel = ref(false);
const g_loading = ref(false);

onMounted(() => {
    showGraph();
});

const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        'rootId': 'root',
        'nodes': [
            { 'id': 'root', 'text': 'Tian Technology Co., Ltd.', offset_x: -50, data: {type:'root'} },
            { 'id': 'root-invs', 'text': 'Investment', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: false, alignItems: 'right', data: { type: 'ex-btn', childrenLoaded: false }},
            { 'id': 'root-sh', 'text': 'Share Holder', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: false, alignItems: 'left', data: { type: 'ex-btn', childrenLoaded: false }},
            { 'id': 'root-history-invs', 'text': 'Historical Investment', expandHolderPosition: 'left', expanded: false, alignItems: 'left', data: { type: 'ex-btn', iconToRight: true, childrenLoaded: false }},
        ],
        lines: [
            { 'from': 'root', 'to': 'root-invs', showEndArrow: false },
            { 'from': 'root-sh', 'to': 'root', showEndArrow: false },
            { 'from': 'root-history-invs', 'to': 'root', showEndArrow: false },
        ]
    };
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data, true);
    await graphInstance.playShowEffect();
    // These are the codes that need to be executed after the graph is initialized

    // Find the root node

    const rootNode = graphInstance.getNodeById('root-invs');
    // Expand the root node

    await graphInstance.expandNode(rootNode);
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};

const onNodeCollapse = (node: RGNode, e: RGUserEvent) => {
};

const onNodeExpand = async (node: RGNode, e: RGUserEvent) => {
    const graphInstance = graphRef.value!.getInstance();
    console.log('onNodeExpand:', node);
    // Check if the data has already been loaded

    if (node.data.childrenLoaded) {
        console.log('The children of this node have already been loaded');
        return;
    }
    g_loading.value = true;
    node.data.childrenLoaded = true;
    const newJsonData = await postRequest('/api/getEntInverstments', node);
    await graphInstance.appendJsonData(newJsonData, true);
    await graphInstance.doLayout();
    g_loading.value = false;
};

let newNodeIndex = 1;
const randomEntNamePrefix = ['', 'Tianxing', 'Xingyueye', 'Fengyunjihui', 'Jinkai Binji'];
const postRequest = async(url: string, node: RGNode) => {
    return new Promise((resolve, reject) => {
        setTimeout(function() { // Simulate the time it takes to load from the backend

            // The following simulates two investment objects queried from the database, as well as the investment relationship with expandedNodeId

            const expandedNodeId = node.id;
            const alignItems = node.alignItems;
            const offset_x = alignItems === 'left' ? -100 : 100;
            // If the expanded button is clicked

            if (node.data.type === 'ex-btn') {
                const _new_json_data: RGJsonData = {
                    nodes: [
                        { id: expandedNodeId + '-c1', text: `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} Company ${newNodeIndex++}`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }},
                        { id: expandedNodeId + '-c2', text: `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} Company ${newNodeIndex++}`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false } }
                        // If there are too many nodes, show the "Show More" button
                    ],
                    lines: [
                        { from: expandedNodeId, to: expandedNodeId + '-c1' },
                        { from: expandedNodeId, to: expandedNodeId + '-c2' },
                        { from: expandedNodeId, to: expandedNodeId + '-more' }
                    ]
                };
                resolve(_new_json_data);
            } else {
                // If the expanded node is an enterprise

                const _new_json_data: RGJsonData = {
                    nodes: [
                        // First, two buttons need to be displayed when expanding the enterprise

                        { 'id': expandedNodeId + '-invs', 'text': 'Investment', disableDefaultClickEffect: true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: false, alignItems, data: { type: 'ex-btn', childrenLoaded: false }},
                        { 'id': expandedNodeId + '-sh', 'text': 'Share Holder', disableDefaultClickEffect:true, width: 80, fontColor: 'rgba(15, 71, 255)', expandHolderPosition: 'left', expanded: true, alignItems, data: { type: 'ex-btn', iconToRight: true, childrenLoaded: true }},
                        // The shareholders of the enterprise need to be expanded by default

                        { id: expandedNodeId + '-c1', text: `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} Company ${newNodeIndex++}`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false }},
                        { id: expandedNodeId + '-c2', text: `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} Company ${newNodeIndex++}`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false } },
                        { id: expandedNodeId + '-c3', text: `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} Company ${newNodeIndex++}`, expandHolderPosition: 'left', expanded: false, alignItems, offset_x, data: { childrenLoaded: false } }
                    ],
                    lines: [
                        { 'from':expandedNodeId, 'to': expandedNodeId + '-invs', showEndArrow: false },
                        { 'from': expandedNodeId, 'to': expandedNodeId + '-sh', showEndArrow: false },
                        { from: expandedNodeId + '-sh', to: expandedNodeId + '-c1', showEndArrow: false },
                        { from: expandedNodeId + '-sh', to: expandedNodeId + '-c2', showEndArrow: false },
                        { from: expandedNodeId + '-sh', to: expandedNodeId + '-c3', showEndArrow: false },
                        { from: expandedNodeId + '-sh', to: expandedNodeId + '-more', showEndArrow: false }
                    ]
                };
                resolve(_new_json_data);
            }

        }, 1000);
    });
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
    .rel-node-checked{
        //box-shadow:none;
        //animation: none;
        box-shadow: 0 0 0 5px rgba(15, 71, 255, 0.3);
    }
    .c-collapsed{
         background-color: rgba(15, 71, 255, 0.5) !important;
     }
    .c-expanded{
        background-color: rgba(15, 71, 255, 0.5) !important;
    }
    .c-expand-positon-left{
        margin-left:-25px;
    }
}
.my-node{
  height:32px;
  text-align: right;
  border: #eeeeee solid 1px;
  border-radius:5px;
  background-color: #ffffff;
  padding-left:5px;
  padding-right:5px;
  line-height: 30px;
  &:hover:not(.more-btn,.ex-btn){
      color: rgba(15, 71, 255, 0.5);
    border: rgba(15, 71, 255, 0.5) solid 1px;
  }
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ex-btn {
  border: none;
    text-align: left !important;
  &:hover{
    border: none;
  }
}
.more-btn {
  background-color: rgba(15, 71, 255, 0.5);
    color: #ffffff;
  cursor: pointer;
  text-align: center;
  padding-left: 0px;
  width: 100px;
  font-size: 12px;
  &:hover{
      background-color: rgba(15, 71, 255, 0.8);
  }
}
.my-root {
  border: rgba(15, 71, 255, 0.5) solid 1px;
  text-align: center;
  padding-left: 0px;
  width: 180px;
  font-size: 12px;
  &:hover{
    color: rgba(15, 71, 255, 0.5);
  }
}
</style>
```

## React 版本

### `investment-penetration.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph from 'relation-graph-react'

import type {
  RGNodeSlotProps,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGJsonData,
  RelationGraphComponent,
} from 'relation-graph-react'
import './investment-penetration.scss'

const InvestmentPenetration = () => {
  const graphRef = (useRef < RelationGraphComponent) | (null > null)

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'root',
      nodes: [
        { id: 'root', text: 'Tian Technology Co., Ltd.', offset_x: -50, data: { type: 'root' } },
        {
          id: 'root-invs',
          text: 'Investment',
          disableDefaultClickEffect: true,
          width: 80,
          fontColor: 'rgba(15, 71, 255)',
          expandHolderPosition: 'left',
          expanded: false,
          alignItems: 'right',
          data: { type: 'ex-btn', childrenLoaded: false },
        },
        {
          id: 'root-sh',
          text: 'Share Holder',
          disableDefaultClickEffect: true,
          width: 80,
          fontColor: 'rgba(15, 71, 255)',
          expandHolderPosition: 'left',
          expanded: false,
          alignItems: 'left',
          data: { type: 'ex-btn', childrenLoaded: false },
        },
        {
          id: 'root-history-invs',
          text: 'Historical Investment',
          expandHolderPosition: 'left',
          expanded: false,
          alignItems: 'left',
          data: { type: 'ex-btn', iconToRight: true, childrenLoaded: false },
        },
      ],
      lines: [
        { from: 'root', to: 'root-invs', showEndArrow: false },
        { from: 'root-sh', to: 'root', showEndArrow: false },
        { from: 'root-history-invs', to: 'root', showEndArrow: false },
      ],
    }
    const graphInstance = graphRef.current?.getInstance()
    await graphInstance?.setJsonData(__graph_json_data, true)
    await graphInstance?.playShowEffect()
  }

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject)
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject)
  }

  const onNodeCollapse = (node: RGNode, e: RGUserEvent) => {}

  const onNodeExpand = async (node: RGNode, e: RGUserEvent) => {
    const graphInstance = graphRef.current?.getInstance()
    console.log('onNodeExpand:', node)
    if (node.data.childrenLoaded) {
      console.log('The children of this node have already been loaded')
      return
    }
    node.data.childrenLoaded = true
    const newJsonData = await postRequest('/api/getEntInverstments', node)
    await graphInstance?.appendJsonData(newJsonData, true)
    await graphInstance?.doLayout()
  }

  let newNodeIndex = 1
  const randomEntNamePrefix = ['', 'Tianxing', 'Xingyueye', 'Fengyunjihui', 'Jinkai Binji']
  const postRequest = async (url: string, node: RGNode) => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        const expandedNodeId = node.id
        const alignItems = node.alignItems
        const offset_x = alignItems === 'left' ? -100 : 100
        if (node.data.type === 'ex-btn') {
          const _new_json_data: RGJsonData = {
            nodes: [
              {
                id: expandedNodeId + '-c1',
                text: `Beijing ${
                  randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]
                } Company ${newNodeIndex++}`,
                expandHolderPosition: 'left',
                expanded: false,
                alignItems,
                offset_x,
                data: { childrenLoaded: false },
              },
              {
                id: expandedNodeId + '-c2',
                text: `Beijing ${
                  randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]
                } Company ${newNodeIndex++}`,
                expandHolderPosition: 'left',
                expanded: false,
                alignItems,
                offset_x,
                data: { childrenLoaded: false },
              },
            ],
            lines: [
              { from: expandedNodeId, to: expandedNodeId + '-c1' },
              { from: expandedNodeId, to: expandedNodeId + '-c2' },
              { from: expandedNodeId, to: expandedNodeId + '-more' },
            ],
          }
          resolve(_new_json_data)
        } else {
          const _new_json_data: RGJsonData = {
            nodes: [
              {
                id: expandedNodeId + '-invs',
                text: 'Investment',
                disableDefaultClickEffect: true,
                width: 80,
                fontColor: 'rgba(15, 71, 255)',
                expandHolderPosition: 'left',
                expanded: false,
                alignItems,
                data: { type: 'ex-btn', childrenLoaded: false },
              },
              {
                id: expandedNodeId + '-sh',
                text: 'Share Holder',
                disableDefaultClickEffect: true,
                width: 80,
                fontColor: 'rgba(15, 71, 255)',
                expandHolderPosition: 'left',
                expanded: true,
                alignItems,
                data: { type: 'ex-btn', iconToRight: true, childrenLoaded: true },
              },
              {
                id: expandedNodeId + '-c1',
                text: `Beijing ${
                  randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]
                } Company ${newNodeIndex++}`,
                expandHolderPosition: 'left',
                expanded: false,
                alignItems,
                offset_x,
                data: { childrenLoaded: false },
              },
              {
                id: expandedNodeId + '-c2',
                text: `Beijing ${
                  randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]
                } Company ${newNodeIndex++}`,
                expandHolderPosition: 'left',
                expanded: false,
                alignItems,
                offset_x,
                data: { childrenLoaded: false },
              },
              {
                id: expandedNodeId + '-c3',
                text: `Beijing ${
                  randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]
                } Company ${newNodeIndex++}`,
                expandHolderPosition: 'left',
                expanded: false,
                alignItems,
                offset_x,
                data: { childrenLoaded: false },
              },
            ],
            lines: [
              { from: expandedNodeId, to: expandedNodeId + '-invs', showEndArrow: false },
              { from: expandedNodeId, to: expandedNodeId + '-sh', showEndArrow: false },
              { from: expandedNodeId + '-sh', to: expandedNodeId + '-c1', showEndArrow: false },
              { from: expandedNodeId + '-sh', to: expandedNodeId + '-c2', showEndArrow: false },
              { from: expandedNodeId + '-sh', to: expandedNodeId + '-c3', showEndArrow: false },
              { from: expandedNodeId + '-sh', to: expandedNodeId + '-more', showEndArrow: false },
            ],
          }
          resolve(_new_json_data)
        }
      }, 200)
    })
  }

  useEffect(() => {
    showGraph()
  }, [])
  const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    useAnimationWhenExpanded: true,
    layout: {
      layoutName: 'tree',
      from: 'right',
      min_per_width: '300',
      max_per_width: '300',
      min_per_height: '40',
      max_per_height: '50',
      enableGatherNodes: true,
      levelDistance: '200,300,200,300,200,300,200,300,200,300,200,300,200,300,200,300',
    },
    defaultNodeShape: 1,
    defaultLineShape: 4,
    defaultJunctionPoint: 'lr',
    defaultNodeBorderWidth: 0,
    defaultLineColor: 'rgba(15, 71, 255)',
    defaultNodeFontColor: '#333333',
    defaultNodeColor: 'transparent',
  }
  const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    return (
      <>
        {node.data?.type === 'ex-btn' && <div className="my-node ex-btn">{node.text}</div>}
        {node.data?.type === 'more-btn' && <div className="my-node more-btn">{node.text}</div>}
        {node.data?.type === 'root' && <div className="my-node my-root">{node.text}</div>}
        {!['ex-btn', 'more-btn', 'root'].includes(node.data?.type) && (
          <div className="my-node">{node.text}</div>
        )}
      </>
    )
  }
  return (
    <div>
      <div className="relation-graph" style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          onNodeExpand={onNodeExpand}
          onNodeCollapse={onNodeCollapse}
          nodeSlot={NodeSlot}
        />
      </div>
    </div>
  )
}

export default InvestmentPenetration
```

### `investment-penetration.scss`

```scss
.relation-graph {
  .rel-node-checked {
    //box-shadow:none;
    //animation: none;
    box-shadow: 0 0 0 5px rgba(15, 71, 255, 0.3);
  }
  .c-collapsed {
    background-color: rgba(15, 71, 255, 0.5) !important;
  }
  .c-expanded {
    background-color: rgba(15, 71, 255, 0.5) !important;
  }
  .c-expand-positon-left {
    margin-left: -25px;
  }
}
.my-node {
  height: 32px;
  text-align: right;
  border: #eeeeee solid 1px;
  border-radius: 5px;
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
  line-height: 30px;
  &:hover:not(.more-btn, .ex-btn) {
    color: rgba(15, 71, 255, 0.5);
    border: rgba(15, 71, 255, 0.5) solid 1px;
  }
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ex-btn {
  border: none;
  text-align: left !important;
  &:hover {
    border: none;
  }
}
.more-btn {
  background-color: rgba(15, 71, 255, 0.5);
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  padding-left: 0px;
  width: 100px;
  font-size: 12px;
  &:hover {
    background-color: rgba(15, 71, 255, 0.8);
  }
}
.my-root {
  border: rgba(15, 71, 255, 0.5) solid 1px;
  text-align: center;
  padding-left: 0px;
  width: 180px;
  font-size: 12px;
  &:hover {
    color: rgba(15, 71, 255, 0.5);
  }
}
```
