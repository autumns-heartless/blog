# 展示全部按钮

## Vue2 版本

### `show-more-nodes-by-page.vue`

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
      >
        <template #node="{node}">
          <div v-if="node.data.type === 'btn-more-from' || node.data.type === 'btn-more-to'" class="my-node more-btn" @click="showMoreNodes(node)">
            {{node.text}}
          </div>
          <div v-else-if="node.data.type === 'root'" class="my-node my-root">
            {{node.text}}
          </div>
          <div v-else-if="node.data.type === 'level1'" class="my-node" style="width: 100px;padding-left:0px;text-align: center;background-color: #2c3e50;color: #ffffff;">
            {{node.text}}
          </div>
          <div v-else class="my-node">
            <span class="c-circle-flag"></span>{{node.text}}
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 25px;">本页面使用的数据都是随机生成的，如果想要看看其他数据效果，可以重新进入此页面即可</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts">
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import {RGNode} from "relation-graph";

const graphOptions = {
  debug: false,
  lineUseTextPath: true,
  useAnimationWhenExpanded: true,
  layout:
    {
      layoutName: 'tree',
      from: 'left',
      min_per_width: 400,
      max_per_width: 400,
      min_per_height: 40,
      max_per_height: 50,
      enableGatherNodes: false,
      levelDistance: '200,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300'
    },
  defaultNodeShape:  1,
  defaultLineShape:  4,
  defaultJunctionPoint: 'lr',
  defaultNodeBorderWidth: 0,
  defaultLineColor: '#dddddd',
  defaultNodeColor: 'transparent'
};
export default {
  name: 'Vip4ShowMoreNodesByPage',
  components: { },
  data() {
    return {
      currentCase: '横向树状图谱',
      isShowCodePanel: false,
      g_loading: false,
      newNodeIndex: 0,
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
            { 'id': 'root', 'text': '北京天天天科技有限公司', offset_x: 0, data: {type:'root'} }
          ], lines: [
            ] };
      this.generateChildNodes('root', 'left', __graph_json_data);
      this.generateChildNodes('root', 'right', __graph_json_data);
      console.log(JSON.stringify(__graph_json_data));
      // 以上四行模拟获取股东、高管、分支机构、对外投资的过程可以改成异步从后台获取，在数据全部获取到并放入__graoh_json_data后再执行以下代码：
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setJsonData(__graph_json_data, true);
      await graphInstance.playShowEffect();
      await this.hideMoreNodes(1);
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    async hideMoreNodes(level) {
      const graphInstance = this.$refs.graphRef.getInstance();
      //获取所有的节点
      const allNodeData = graphInstance.getNodes();
      let newLines = [];
      let newNodes = [];
      allNodeData.forEach(node => {
        if (!node.lot || !node.lot.childs) {
          return;
        }
        // console.log('xxxxx', node.id, node.lot.childs.length);
        //targetTo的节点
        let childNodes = node.targetTo;
        if(childNodes.length>2) {
          const sliceToNode = childNodes.slice(2);
          sliceToNode.forEach(item => {
            item.isHide=true;
          });
          newNodes.push({ id: `${node.id}-to-more`, text: '展开全部T', alignItems: 'left', data: {type: 'btn-more-to' }});
          newLines.push({ from: node.id, to: `${node.id}-to-more`});
        }
        childNodes = node.targetFrom;
        if(childNodes.length>2) {
          const sliceToNode = childNodes.slice(2);
          sliceToNode.forEach(item => {
            item.isHide=true;
          });
          newNodes.push({ id: `${node.id}-from-more`, text: '展开全部F', alignItems: 'right', data: {type: 'btn-more-from' }});
          newLines.push({ from: `${node.id}-from-more`, to: node.id });
        }
      })
      graphInstance.addNodes(newNodes);
      graphInstance.addLines(newLines);
      await graphInstance.doLayout();
      await graphInstance.setZoom(80);
    },
    showMoreNodes(nodeObject) {
      console.log('showMoreNodes');
      const graphInstance = this.$refs.graphRef.getInstance();
      if (nodeObject.data.type === 'btn-more-to') {// 如果点击的树右侧（当前布局from=left时）的节点
        const allSublingNodes = nodeObject.lot.parent.targetTo;
        console.log('showMoreNodes:allSublingNodes', allSublingNodes.length);
        allSublingNodes.forEach(node => {
          node.isHide = false;
        })
        graphInstance.removeNodeById(nodeObject.id);
        graphInstance.doLayout();
      }
      if (nodeObject.data.type === 'btn-more-from') {// 如果点击的树左侧（当前布局from=left时）的节点，左右处理的主要差别是：一个取targetTo，另一个取targetFrom
        const allSublingNodes = nodeObject.lot.parent.targetFrom;
        console.log('showMoreNodes:allSublingNodes', allSublingNodes.length);
        allSublingNodes.forEach(node => {
          node.isHide = false;
        })
        graphInstance.removeNodeById(nodeObject.id);
        graphInstance.doLayout();
      }
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    generateChildNodes(parentNodeId:string, newNodesPosition:string, graphJsonData, level = 1){
      // 以下模拟了从数据库中查询出来的两个投资对象，以及expandedNodeId与他们的投资关系
      const randomChildSize = 1 + Math.floor(Math.random() * 10);
      console.log('generateChildNodes for:', parentNodeId, 'size:', randomChildSize);
      for (let i = 0 ; i< randomChildSize;i++) {
        const thisNodeIndex = this.newNodeIndex++;
        const newNodeId = 'N' + thisNodeIndex; // 节点id必须是字符串
        const randomEntName = `N${thisNodeIndex}北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeId}公司`;
        const alignItems = newNodesPosition === 'left' ? 'right' : 'left'; // 新增的节点如果要放在左侧，则这些新增节点显示为右对齐
        const newChild = {
          id: newNodeId,
          text: randomEntName,
          alignItems
        }
        let newLine;
        if (newNodesPosition === 'left') {
          newLine = { from: newNodeId, to: parentNodeId }
        } else {
          newLine = { from: parentNodeId, to: newNodeId }
        }
        graphJsonData.nodes.push(newChild);
        graphJsonData.lines.push(newLine);
        if (level < 3) { // 为左右两侧各生成两层数据
          if (Math.random() > 0.5) { // 以50%的概率为这个第一层的子节点添加随机数量的子节点
            const thisNodeChildSize = this.generateChildNodes(newNodeId, newNodesPosition, graphJsonData, level + 1);
            if (thisNodeChildSize > 0) {
              newChild.expandHolderPosition = newNodesPosition; // 展开收缩按钮，左侧的展示在左侧，右侧的展示在右侧
            }
          }
        }
      }
      return randomChildSize; // 返回为节点生成的子节点数量
    }
  }
};
const randomEntNamePrefix = ['', '天星', '星月夜', '风云际会', '金凯宾斯基'];
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
::v-deep .rel-node-checked{
  //box-shadow:none;
  //animation: none;
}
::v-deep .c-collapsed{
  background-color: #888888 !important;
}
::v-deep .c-expanded{
  background-color: #888888 !important;
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
  color: #333333;
  &:hover{
    border: rgba(15, 71, 255, 0.5) solid 1px;
  }
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ex-btn {
  border: none;
  &:hover{
    border: none;
  }
}
.more-btn {
  background-color: #efefef;
  cursor: pointer;
  text-align: center;
  padding-left: 0px;
  width: 100px;
  font-size: 12px;
  &:hover{
    color: rgba(15, 71, 255, 0.5);
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
.c-circle-flag{
  display: inline-block;
  width:12px;
  height:12px;
  border-radius: 50%;
  background-color: #00bb00;
  margin-right:5px;
}
</style>

<style lang="scss" scoped>
.c-my-panel {
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;

  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
}
</style>
```

## Vue3 版本

### `show-more-nodes-by-page.vue`

```javascript
<template>
  <div>
    <div
      v-loading="g_loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      style="height:calc(100vh - 60px);">
      <RelationGraph

        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      >
        <template #node="{node}">
          <div v-if="node.data.type === 'btn-more-from' || node.data.type === 'btn-more-to'" class="my-node more-btn" @click="showMoreNodes(node)">
            {{ node.text }}
          </div>
          <div v-else-if="node.data.type === 'root'" class="my-node my-root">
            {{ node.text }}
          </div>
          <div v-else-if="node.data.type === 'level1'" class="my-node" style="width: 100px;padding-left:0px;text-align: center;background-color: #2c3e50;color: #ffffff;">
            {{ node.text }}
          </div>
          <div v-else class="my-node">
            <span class="c-circle-flag" />{{ node.text }}
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 25px;">The data used on this page is randomly generated. If you want to see other data, you can refresh the page.</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import { RelationGraphComponent, RGNode, RGLine, RGLink, RGUserEvent, RGJsonData, RGOptions } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    useAnimationWhenExpanded: true,
    'layout': {
        'layoutName': 'tree',
        'from': 'left',
        'min_per_width': '400',
        'max_per_width': '400',
        'min_per_height': '40',
        'max_per_height': '50',
        enableGatherNodes: false,
        levelDistance: '200,360,360,360,360,360,360,360,360,360,300,300,300,300,300,300'
    },
    'defaultNodeShape': 1,
    'defaultLineShape': 4,
    'defaultJunctionPoint': 'lr',
    'defaultNodeBorderWidth': 0,
    'defaultLineColor': '#dddddd',
    'defaultNodeColor': 'transparent'
};

const g_loading = ref(false);
const newNodeIndex = ref(0);
const graphRef = ref<RelationGraphComponent>();

const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        'rootId': 'root',
        'nodes': [
            { 'id': 'root', 'text': 'Tian Technology Co., Ltd.', offset_x: 0, data: {type:'root'} }
        ],
        lines: []
    };
    generateChildNodes('root', 'left', __graph_json_data);
    generateChildNodes('root', 'right', __graph_json_data);
    console.log(JSON.stringify(__graph_json_data));

    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data, true);
    await graphInstance.playShowEffect();
    await hideMoreNodes(1);
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const hideMoreNodes = async (level: number) => {
    const graphInstance = graphRef.value!.getInstance();
    const allNodeData = graphInstance.getNodes();
    let newLines: RGLine[] = [];
    let newNodes: RGNode[] = [];
    allNodeData.forEach(node => {
        if (!node.lot || !node.lot.childs) {
            return;
        }
        let childNodes = node.targetTo;
        if(childNodes.length>2) {
            const sliceToNode = childNodes.slice(2);
            sliceToNode.forEach(item => {
                item.isHide=true;
            });
            newNodes.push({ id: `${node.id}-to-more`, text: 'Expand All T', alignItems: 'left', data: {type: 'btn-more-to' }});
            newLines.push({ from: node.id, to: `${node.id}-to-more`});
        }
        childNodes = node.targetFrom;
        if(childNodes.length>2) {
            const sliceToNode = childNodes.slice(2);
            sliceToNode.forEach(item => {
                item.isHide=true;
            });
            newNodes.push({ id: `${node.id}-from-more`, text: 'Expand All F', alignItems: 'right', data: {type: 'btn-more-from' }});
            newLines.push({ from: `${node.id}-from-more`, to: node.id });
        }
    });
    graphInstance.addNodes(newNodes);
    graphInstance.addLines(newLines);
    await graphInstance.doLayout();
    await graphInstance.setZoom(80);
};

const showMoreNodes = (nodeObject: RGNode) => {
    console.log('showMoreNodes');
    const graphInstance = graphRef.value!.getInstance();
    if (nodeObject.data.type === 'btn-more-to') {
        const allSublingNodes = nodeObject.lot.parent.targetTo;
        console.log('showMoreNodes:allSublingNodes', allSublingNodes.length);
        allSublingNodes.forEach(node => {
            node.isHide = false;
        });
        graphInstance.removeNodeById(nodeObject.id);
        graphInstance.doLayout();
    }
    if (nodeObject.data.type === 'btn-more-from') {
        const allSublingNodes = nodeObject.lot.parent.targetFrom;
        console.log('showMoreNodes:allSublingNodes', allSublingNodes.length);
        allSublingNodes.forEach(node => {
            node.isHide = false;
        });
        graphInstance.removeNodeById(nodeObject.id);
        graphInstance.doLayout();
    }
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};

const generateChildNodes = (parentNodeId: string, newNodesPosition: string, graphJsonData: RGJsonData, level = 1) => {
    const randomChildSize = 1 + Math.floor(Math.random() * 10);
    console.log('generateChildNodes for:', parentNodeId, 'size:', randomChildSize);
    for (let i = 0 ; i< randomChildSize;i++) {
        const thisNodeIndex = newNodeIndex.value++;
        const newNodeId = 'N' + thisNodeIndex;
        const randomEntName = `N${thisNodeIndex} Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} Company ${newNodeId}`;
        const alignItems = newNodesPosition === 'left' ? 'right' : 'left';
        const newChild: RGNode = {
            id: newNodeId,
            text: randomEntName,
            alignItems

        };
        let newLine: RGLine;
        if (newNodesPosition === 'left') {
            newLine = { from: newNodeId, to: parentNodeId };
        } else {
            newLine = { from: parentNodeId, to: newNodeId };
        }
        graphJsonData.nodes.push(newChild);
        graphJsonData.lines.push(newLine);
        if (level < 3) {
            if (Math.random() > 0.5) {
                const thisNodeChildSize = generateChildNodes(newNodeId, newNodesPosition, graphJsonData, level + 1);
                if (thisNodeChildSize > 0) {
                    newChild.expandHolderPosition = newNodesPosition;
                }
            }
        }
    }
    return randomChildSize;
};


onMounted(() => {
    showGraph();
});

const randomEntNamePrefix = ['', 'Tianxing', 'Xingyueye', 'Fengyunjihui', 'Jinkai Binshi'];
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
    .rel-node-checked{
        //box-shadow:none;
        //animation: none;
    }
    .c-collapsed{
        background-color: #888888 !important;
    }
    .c-expanded{
        background-color: #888888 !important;
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
  color: #333333;
  &:hover{
    border: rgba(15, 71, 255, 0.5) solid 1px;
  }
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ex-btn {
  border: none;
  &:hover{
    border: none;
  }
}
.more-btn {
  background-color: #efefef;
  cursor: pointer;
  text-align: center;
  padding-left: 0px;
  width: 100px;
  font-size: 12px;
  &:hover{
    color: rgba(15, 71, 255, 0.5);
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
.c-circle-flag{
  display: inline-block;
  width:12px;
  height:12px;
  border-radius: 50%;
  background-color: #00bb00;
  margin-right:5px;
}
</style>

<style lang="scss" scoped>
.c-my-panel {
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;

  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
}
</style>
```

## React 版本

### `show-more-nodes-by-page.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph, { RGNodeSlotProps } from 'relation-graph-react'
import {
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGJsonData,
  RGOptions,
  RelationGraphComponent,
} from 'relation-graph-react'
import './show-more-nodes-by-page.scss'

const ShowMoreNodesByPage = () => {
  const graphRef = (useRef < RelationGraphComponent) | (null > null)
  const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    useAnimationWhenExpanded: true,
    layout: {
      layoutName: 'tree',
      from: 'left',
      min_per_width: '400',
      max_per_width: '400',
      min_per_height: '40',
      max_per_height: '50',
      enableGatherNodes: false,
      levelDistance: '200,360,360,360,360,360,360,360,360,360,300,300,300,300,300,300',
    },
    defaultNodeShape: 1,
    defaultLineShape: 4,
    defaultJunctionPoint: 'lr',
    defaultNodeBorderWidth: 0,
    defaultLineColor: '#dddddd',
    defaultNodeColor: 'transparent',
  }

  const newNodeIndex = useRef(0)

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'root',
      nodes: [
        { id: 'root', text: 'Tian Technology Co., Ltd.', offset_x: 0, data: { type: 'root' } },
      ],
      lines: [],
    }
    generateChildNodes('root', 'left', __graph_json_data)
    generateChildNodes('root', 'right', __graph_json_data)
    console.log(JSON.stringify(__graph_json_data))

    const graphInstance = graphRef.current?.getInstance()
    await graphInstance?.setJsonData(__graph_json_data, true)
    await graphInstance?.playShowEffect()
    await hideMoreNodes(1)
  }

  const hideMoreNodes = async (level: number) => {
    const graphInstance = graphRef.current?.getInstance()
    const allNodeData = graphInstance?.getNodes()
    let newLines: RGLine[] = []
    let newNodes: RGNode[] = []
    allNodeData?.forEach((node) => {
      if (!node.lot || !node.lot.childs) {
        return
      }
      let childNodes = node.targetTo
      if (childNodes.length > 2) {
        const sliceToNode = childNodes.slice(2)
        sliceToNode.forEach((item) => {
          item.isHide = true
        })
        newNodes.push({
          id: `${node.id}-to-more`,
          text: 'Expand All T',
          alignItems: 'left',
          data: { type: 'btn-more-to' },
        })
        newLines.push({ from: node.id, to: `${node.id}-to-more` })
      }
      childNodes = node.targetFrom
      if (childNodes.length > 2) {
        const sliceToNode = childNodes.slice(2)
        sliceToNode.forEach((item) => {
          item.isHide = true
        })
        newNodes.push({
          id: `${node.id}-from-more`,
          text: 'Expand All F',
          alignItems: 'right',
          data: { type: 'btn-more-from' },
        })
        newLines.push({ from: `${node.id}-from-more`, to: node.id })
      }
    })
    graphInstance?.addNodes(newNodes)
    graphInstance?.addLines(newLines)
    await graphInstance?.doLayout()
    await graphInstance?.setZoom(80)
  }

  const showMoreNodes = (nodeObject: RGNode) => {
    console.log('showMoreNodes')
    const graphInstance = graphRef.current?.getInstance()
    if (nodeObject.data.type === 'btn-more-to') {
      const allSublingNodes = nodeObject.lot.parent.targetTo
      console.log('showMoreNodes:allSublingNodes', allSublingNodes.length)
      allSublingNodes.forEach((node) => {
        node.isHide = false
      })
      graphInstance?.removeNodeById(nodeObject.id)
      graphInstance?.doLayout()
    }
    if (nodeObject.data.type === 'btn-more-from') {
      const allSublingNodes = nodeObject.lot.parent.targetFrom
      console.log('showMoreNodes:allSublingNodes', allSublingNodes.length)
      allSublingNodes.forEach((node) => {
        node.isHide = false
      })
      graphInstance?.removeNodeById(nodeObject.id)
      graphInstance?.doLayout()
    }
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject)
  }

  const generateChildNodes = (
    parentNodeId: string,
    newNodesPosition: string,
    graphJsonData: RGJsonData,
    level = 1,
  ) => {
    const randomChildSize = 1 + Math.floor(Math.random() * 10)
    console.log('generateChildNodes for:', parentNodeId, 'size:', randomChildSize)
    for (let i = 0; i < randomChildSize; i++) {
      const thisNodeIndex = newNodeIndex.current++
      const newNodeId = 'N' + thisNodeIndex
      const randomEntName = `N${thisNodeIndex} Beijing ${
        randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]
      } Company ${newNodeId}`
      const alignItems = newNodesPosition === 'left' ? 'right' : 'left'
      const newChild: RGNode = {
        id: newNodeId,
        text: randomEntName,
        alignItems,
      }
      let newLine: RGLine
      if (newNodesPosition === 'left') {
        newLine = { from: newNodeId, to: parentNodeId }
      } else {
        newLine = { from: parentNodeId, to: newNodeId }
      }
      graphJsonData.nodes.push(newChild)
      graphJsonData.lines.push(newLine)
      if (level < 3) {
        if (Math.random() > 0.5) {
          const thisNodeChildSize = generateChildNodes(
            newNodeId,
            newNodesPosition,
            graphJsonData,
            level + 1,
          )
          if (thisNodeChildSize > 0) {
            newChild.expandHolderPosition = newNodesPosition
          }
        }
      }
    }
    return randomChildSize
  }
  const randomEntNamePrefix = ['', 'Tianxing', 'Xingyueye', 'Fengyunjihui', 'Jinkai Binshi']

  const MyNodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    return (
      <div>
        {node.data?.type === 'btn-more-from' || node.data?.type === 'btn-more-to' ? (
          <div className="my-node more-btn" onClick={() => showMoreNodes(node)}>
            {node.text}
          </div>
        ) : node.data?.type === 'root' ? (
          <div className="my-node my-root">{node.text}</div>
        ) : node.data?.type === 'level1' ? (
          <div
            className="my-node"
            style={{
              width: '100px',
              paddingLeft: '0px',
              textAlign: 'center',
              backgroundColor: '#2c3e50',
              color: '#ffffff',
            }}
          >
            {node.text}
          </div>
        ) : (
          <div className="my-node">
            <span className="c-circle-flag" />
            {node.text}
          </div>
        )}
      </div>
    )
  }
  useEffect(() => {
    showGraph()
  }, [])
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div slot="graph-plug">
          <div className="c-my-panel">
            <div className="c-option-name" style={{ lineHeight: '25px' }}>
              The data used on this page is randomly generated. If you want to see other data, you
              can refresh the page.
            </div>
          </div>
        </div>
        <RelationGraph ref={graphRef} options={graphOptions} nodeSlot={MyNodeSlot}></RelationGraph>
      </div>
    </div>
  )
}

export default ShowMoreNodesByPage
```

### `show-more-nodes-by-page.scss`

```scss
.relation-graph {
  .rel-node-checked {
    //box-shadow:none;
    //animation: none;
  }
  .c-collapsed {
    background-color: #888888 !important;
  }
  .c-expanded {
    background-color: #888888 !important;
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
  color: #333333;
  &:hover {
    border: rgba(15, 71, 255, 0.5) solid 1px;
  }
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ex-btn {
  border: none;
  &:hover {
    border: none;
  }
}
.more-btn {
  background-color: #efefef;
  cursor: pointer;
  text-align: center;
  padding-left: 0px;
  width: 100px;
  font-size: 12px;
  &:hover {
    color: rgba(15, 71, 255, 0.5);
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
.c-circle-flag {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #00bb00;
  margin-right: 5px;
}

.c-my-panel {
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 20px;

  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
```
