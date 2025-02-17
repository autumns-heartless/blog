# 展示更多(分页)

## Vue2 版本

### `show-more-nodes-front.vue`

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
      levelDistance: '200,300,200,300,200,300,200,300,200,300,200,300,200,300,200,300'
    },
  defaultNodeShape:  1,
  defaultLineShape:  4,
  defaultJunctionPoint: 'lr',
  defaultNodeBorderWidth: 0,
  defaultLineColor: '#dddddd',
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
            { 'id': 'root', 'text': '北京天天天科技有限公司', offset_x: 0, data: {type:'root'} },
            { 'id': 'gudong', 'text': '股东', offset_x: -80, data: {type:'level1'} },
            { 'id': 'gaoguan', 'text': '高管', offset_x: -80, data: {type:'level1'} },
            { 'id': 'duiwaitouzi', 'text': '对外投资', offset_x: 80, data: {type:'level1'} },
            { 'id': 'fenzhijigou', 'text': '分支机构', offset_x: 80, data: {type:'level1'} },
          ], lines: [
              {from: 'gudong', to: 'root', lineShape: 3 },
              {from: 'gaoguan', to: 'root', lineShape: 3 },
              {from: 'root', to: 'duiwaitouzi', lineShape: 3 },
              {from: 'root', to: 'fenzhijigou', lineShape: 3 },
            ] };
      const graphInstance = this.$refs.graphRef.getInstance();
      this.generateChildNodes('gudong', 'left', __graph_json_data);
      this.generateChildNodes('gaoguan', 'left', __graph_json_data);
      this.generateChildNodes('fenzhijigou', 'right', __graph_json_data);
      this.generateChildNodes('duiwaitouzi', 'right', __graph_json_data);
      // 以上四行模拟获取股东、高管、分支机构、对外投资的过程可以改成异步从后台获取，在数据全部获取到并放入__graoh_json_data后再执行以下代码：
      await graphInstance.setJsonData(__graph_json_data, true);
      await graphInstance.playShowEffect();
      await this.hideMoreNodes();
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    async hideMoreNodes() {
      const graphInstance = this.$refs.graphRef.getInstance();
      //获取所有的节点
      const allNodeData = graphInstance.getNodes();
      let newLines = [];
      let newNodes = [];
      const pageSize = 3;
      allNodeData.forEach(node => {
        if (!node.lot || !node.lot.childs) {
          return;
        }
        // console.log('xxxxx', node.id, node.lot.childs.length);
        //targetTo的节点
        let childNodes = node.targetTo;
        if(childNodes.length>pageSize) {
          const sliceToNode = childNodes.slice(2);
          sliceToNode.forEach(item => {
            item.isHide=true;
          });
          newNodes.push({ id: `${node.id}-to-more`, text: `展开更多T(${childNodes.length - pageSize})`, alignItems: 'left', data: {type: 'btn-more-to' }});
          newLines.push({ from: node.id, to: `${node.id}-to-more`});
        }
        childNodes = node.targetFrom;
        if(childNodes.length>2) {
          const sliceToNode = childNodes.slice(2);
          sliceToNode.forEach(item => {
            item.isHide=true;
          });
          newNodes.push({ id: `${node.id}-from-more`, text: `展开更多F(${childNodes.length - pageSize})`, alignItems: 'right', data: {type: 'btn-more-from' }});
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
        // 【代码片段1】和【代码片段2】一模一样，为了方便理解，这里重复写
        /************分页逻辑【代码片段1】-开始****************************************************************/
        const pageSize = 3;
        let displayedCount = 0; // 本次新显示的节点数
        let newDisplayedCount = 0; // 本次新显示的节点数
        for (const node of allSublingNodes) {
          if (node.isHide === true) {
            node.isHide = false; // 显示节点
            newDisplayedCount++; // 计数，统计当前新显示了几个节点了，假设每页显示3个，那么新显示的节点到3个时就要停止显示新的节点
          }
          if (node.isHide !== true) {
            displayedCount++;
          }
          if (newDisplayedCount >= pageSize) {
            // 新的一个显示够了，停止
            break;
          }
        }
        // 显示的节点数量已经大于等于总节点数时
        if (displayedCount >= allSublingNodes.length) {
          // 如果新显示的节点为0，则表示所有节点都显示了，不能再继续翻页了
          // 此时，需要移除【显示更多】按钮
          graphInstance.removeNodeById(nodeObject.id);
        }
        const moreButton = graphInstance.getNodeById(nodeObject.id);
        moreButton.text = `展示更多(${allSublingNodes.length - displayedCount - 1})`
        /************分页逻辑【代码片段1】- 结束****************************************************************/
        graphInstance.doLayout();
      }
      if (nodeObject.data.type === 'btn-more-from') {// 如果点击的树左侧（当前布局from=left时）的节点，左右处理的主要差别是：一个取targetTo，另一个取targetFrom
        const allSublingNodes = nodeObject.lot.parent.targetFrom;
        console.log('showMoreNodes:allSublingNodes', allSublingNodes.length);
        /************分页逻辑【代码片段2】-开始****************************************************************/
        const pageSize = 3;
        let displayedCount = 0; // 本次新显示的节点数
        let newDisplayedCount = 0; // 本次新显示的节点数
        for (const node of allSublingNodes) {
          if (node.isHide === true) {
            node.isHide = false; // 显示节点
            newDisplayedCount++; // 计数，统计当前新显示了几个节点了，假设每页显示3个，那么新显示的节点到3个时就要停止显示新的节点
          }
          if (node.isHide !== true) {
            displayedCount++;
          }
          if (newDisplayedCount >= pageSize) {
            // 新的一个显示够了，停止
            break;
          }
        }
        const moreButton = graphInstance.getNodeById(nodeObject.id);
        moreButton.text = `展示更多(${allSublingNodes.length - displayedCount - 1})`
        // 显示的节点数量已经大于等于总节点数时
        if (displayedCount >= allSublingNodes.length) {
          // 如果新显示的节点为0，则表示所有节点都显示了，不能再继续翻页了
          // 此时，需要移除【显示更多】按钮
          graphInstance.removeNodeById(nodeObject.id);
        }
        /************分页逻辑【代码片段2】- 结束****************************************************************/
        graphInstance.doLayout();
      }
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    generateChildNodes(parentNodeId:string, newNodesPosition:string, graphJsonData){
      // 以下模拟了从数据库中查询出来的两个投资对象，以及expandedNodeId与他们的投资关系
      const randomChildSize = 1 + Math.floor(Math.random() * 30);
      for (let i = 0 ; i< randomChildSize;i++) {
        const thisNodeIndex = newNodeIndex++;
        const newNodeId = 'N' + thisNodeIndex; // 节点id必须是字符串
        const randomEntName = `北京${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]}第${newNodeId}公司`;
        const alignItems = newNodesPosition === 'left' ? 'right' : 'left'; // 新增的节点如果要放在左侧，则这些新增节点显示为右对齐
        const newChild = { id: newNodeId, text: randomEntName, expanded: false, alignItems }
        let newLine;
        if (newNodesPosition === 'left') {
          newLine = { from: newNodeId, to: parentNodeId }
        } else {
          newLine = { from: parentNodeId, to: newNodeId }
        }
        graphJsonData.nodes.push(newChild);
        graphJsonData.lines.push(newLine);
      }
    }
  }
};
let newNodeIndex = 1;
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
```

## Vue3 版本

### `show-more-nodes-front.vue`

```javascript
<template>
  <div>
    <div

      v-loading="g_loading"
      element-loading-text="Loading..."
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
    'layouts': [
        {
            'layoutName': 'tree',
            'from': 'left',
            'min_per_width': '400',
            'max_per_width': '400',
            'min_per_height': '40',
            'max_per_height': '50',
            enableGatherNodes: false,
            levelDistance: '200,300,200,300,200,300,200,300,200,300,200,300,200,300,200,300'
        }
    ],
    'defaultNodeShape': 1,
    'defaultLineShape': 4,
    'defaultJunctionPoint': 'lr',
    'defaultNodeBorderWidth': 0,
    'defaultLineColor': '#dddddd',
    'defaultNodeColor': 'transparent'
};

const graphRef = ref<RelationGraphComponent | null>(null);
const g_loading = ref(false);

const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        'rootId': 'root',
        'nodes': [
            { 'id': 'root', 'text': 'Tian Technology Co., Ltd.', offset_x: 0, data: {type:'root'} },
            { 'id': 'gudong', 'text': 'Shareholders', offset_x: -80, data: {type:'level1'} },
            { 'id': 'gaoguan', 'text': 'Executives', offset_x: -80, data: {type:'level1'} },
            { 'id': 'duiwaitouzi', 'text': 'External Investment', offset_x: 80, data: {type:'level1'} },
            { 'id': 'fenzhijigou', 'text': 'Branches', offset_x: 80, data: {type:'level1'} },
        ],
        lines: [
            {from: 'gudong', to: 'root', lineShape: 3 },
            {from: 'gaoguan', to: 'root', lineShape: 3 },
            {from: 'root', to: 'duiwaitouzi', lineShape: 3 },
            {from: 'root', to: 'fenzhijigou', lineShape: 3 },
        ]
    };

    const graphInstance = graphRef.value!.getInstance();
    generateChildNodes('gudong', 'left', __graph_json_data);
    generateChildNodes('gaoguan', 'left', __graph_json_data);
    generateChildNodes('fenzhijigou', 'right', __graph_json_data);
    generateChildNodes('duiwaitouzi', 'right', __graph_json_data);

    await graphInstance.setJsonData(__graph_json_data, true);
    await graphInstance.playShowEffect();
    await hideMoreNodes();
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const hideMoreNodes = async () => {
    const graphInstance = graphRef.value!.getInstance();
    const allNodeData = graphInstance.getNodes();
    let newLines: RGLine[] = [];
    let newNodes: RGNode[] = [];
    const pageSize = 3;

    allNodeData.forEach(node => {
        if (!node.lot || !node.lot.childs) {
            return;
        }

        let childNodes = node.targetTo;
        if(childNodes.length>pageSize) {
            const sliceToNode = childNodes.slice(2);
            sliceToNode.forEach(item => {
                item.isHide=true;
            });
            newNodes.push({ id: `${node.id}-to-more`, text: `Show More T(${childNodes.length - pageSize})`, alignItems: 'left', data: {type: 'btn-more-to' }});
            newLines.push({ from: node.id, to: `${node.id}-to-more`});
        }

        childNodes = node.targetFrom;
        if(childNodes.length>2) {
            const sliceToNode = childNodes.slice(2);
            sliceToNode.forEach(item => {
                item.isHide=true;
            });
            newNodes.push({ id: `${node.id}-from-more`, text: `Show More F(${childNodes.length - pageSize})`, alignItems: 'right', data: {type: 'btn-more-from' }});
            newLines.push({ from: `${node.id}-from-more`, to: node.id });
        }
    });

    graphInstance.addNodes(newNodes);
    graphInstance.addLines(newLines);
    await graphInstance.doLayout();
    await graphInstance.setZoom(80);
};

const showMoreNodes = (nodeObject: RGNode) => {
    const graphInstance = graphRef.value!.getInstance();

    if (nodeObject.data.type === 'btn-more-to') {
        const allSublingNodes = nodeObject.lot.parent.targetTo;
        const pageSize = 3;
        let displayedCount = 0;
        let newDisplayedCount = 0;

        for (const node of allSublingNodes) {
            if (node.isHide === true) {
                node.isHide = false;
                newDisplayedCount++;
            }
            if (node.isHide !== true) {
                displayedCount++;
            }
            if (newDisplayedCount >= pageSize) {
                break;
            }
        }

        if (displayedCount >= allSublingNodes.length) {
            graphInstance.removeNodeById(nodeObject.id);
        }

        const moreButton = graphInstance.getNodeById(nodeObject.id);
        moreButton.text = `Show More (${allSublingNodes.length - displayedCount - 1})`;

        graphInstance.doLayout();
    }

    if (nodeObject.data.type === 'btn-more-from') {
        const allSublingNodes = nodeObject.lot.parent.targetFrom;
        const pageSize = 3;
        let displayedCount = 0;
        let newDisplayedCount = 0;

        for (const node of allSublingNodes) {
            if (node.isHide === true) {
                node.isHide = false;
                newDisplayedCount++;
            }
            if (node.isHide !== true) {
                displayedCount++;
            }
            if (newDisplayedCount >= pageSize) {
                break;
            }
        }

        const moreButton = graphInstance.getNodeById(nodeObject.id);
        moreButton.text = `Show More (${allSublingNodes.length - displayedCount - 1})`;

        if (displayedCount >= allSublingNodes.length) {
            graphInstance.removeNodeById(nodeObject.id);
        }

        graphInstance.doLayout();
    }
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};

const generateChildNodes = (parentNodeId: string, newNodesPosition: string, graphJsonData: RGJsonData) => {
    const randomChildSize = 1 + Math.floor(Math.random() * 30);

    for (let i = 0 ; i< randomChildSize;i++) {
        const thisNodeIndex = newNodeIndex++;
        const newNodeId = 'N' + thisNodeIndex;
        const randomEntName = `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} No.${newNodeId} Company`;
        const alignItems = newNodesPosition === 'left' ? 'right' : 'left';
        const newChild: RGNode = { id: newNodeId, text: randomEntName, expanded: false, alignItems };
        let newLine: RGLine;

        if (newNodesPosition === 'left') {
            newLine = { from: newNodeId, to: parentNodeId };
        } else {
            newLine = { from: parentNodeId, to: newNodeId };
        }

        graphJsonData.nodes.push(newChild);
        graphJsonData.lines.push(newLine);
    }
};

onMounted(() => {
    showGraph();
});
let newNodeIndex = 1;
const randomEntNamePrefix = ['', 'Tianxing', 'Starry Night', 'Gathering Storm', 'Jin Kaibinski'];
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
```

## React 版本

### `show-more-nodes-front.tsx`

```javascript
import React, { useRef, useEffect } from 'react';
import RelationGraph, {RGNodeSlotProps} from 'relation-graph-react';
import { RGNode, RGLine, RGLink, RGUserEvent, RGJsonData, RGOptions, RelationGraphComponent } from 'relation-graph-react';
import './show-more-nodes-front.scss';

const ShowMoreNodesFront = () => {
  const graphRef = useRef<RelationGraphComponent | null>(null);

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
      levelDistance: '200,300,200,300,200,300,200,300,200,300,200,300,200,300,200,300'
    },
    defaultNodeShape: 1,
    defaultLineShape: 4,
    defaultJunctionPoint: 'lr',
    defaultNodeBorderWidth: 0,
    defaultLineColor: '#dddddd',
    defaultNodeColor: 'transparent'
  };

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'root',
      nodes: [
        { id: 'root', text: 'Tian Technology Co., Ltd.', offset_x: 0, data: { type: 'root' } },
        { id: 'gudong', text: 'Shareholders', offset_x: -80, data: { type: 'level1' } },
        { id: 'gaoguan', text: 'Executives', offset_x: -80, data: { type: 'level1' } },
        { id: 'duiwaitouzi', text: 'External Investment', offset_x: 80, data: { type: 'level1' } },
        { id: 'fenzhijigou', text: 'Branches', offset_x: 80, data: { type: 'level1' } },
      ],
      lines: [
        { from: 'gudong', to: 'root', lineShape: 3 },
        { from: 'gaoguan', to: 'root', lineShape: 3 },
        { from: 'root', to: 'duiwaitouzi', lineShape: 3 },
        { from: 'root', to: 'fenzhijigou', lineShape: 3 },
      ]
    };

    const graphInstance = graphRef.current!.getInstance();
    generateChildNodes('gudong', 'left', __graph_json_data);
    generateChildNodes('gaoguan', 'left', __graph_json_data);
    generateChildNodes('fenzhijigou', 'right', __graph_json_data);
    generateChildNodes('duiwaitouzi', 'right', __graph_json_data);

    await graphInstance.setJsonData(__graph_json_data, true);
    await graphInstance.playShowEffect();
    await hideMoreNodes();
  };

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
  };

  const hideMoreNodes = async () => {
    const graphInstance = graphRef.current!.getInstance();
    const allNodeData = graphInstance.getNodes();
    let newLines: RGLine[] = [];
    let newNodes: RGNode[] = [];
    const pageSize = 3;

    allNodeData.forEach(node => {
      if (!node.lot || !node.lot.childs) {
        return;
      }

      let childNodes = node.targetTo;
      if (childNodes.length > pageSize) {
        const sliceToNode = childNodes.slice(2);
        sliceToNode.forEach(item => {
          item.isHide = true;
        });
        newNodes.push({ id: `${node.id}-to-more`, text: `Show More T(${childNodes.length - pageSize})`, alignItems: 'left', data: { type: 'btn-more-to' } });
        newLines.push({ from: node.id, to: `${node.id}-to-more` });
      }

      childNodes = node.targetFrom;
      if (childNodes.length > 2) {
        const sliceToNode = childNodes.slice(2);
        sliceToNode.forEach(item => {
          item.isHide = true;
        });
        newNodes.push({ id: `${node.id}-from-more`, text: `Show More F(${childNodes.length - pageSize})`, alignItems: 'right', data: { type: 'btn-more-from' } });
        newLines.push({ from: `${node.id}-from-more`, to: node.id });
      }
    });

    graphInstance.addNodes(newNodes);
    graphInstance.addLines(newLines);
    await graphInstance.doLayout();
    await graphInstance.setZoom(80);
  };

  const showMoreNodes = (nodeObject: RGNode) => {
    const graphInstance = graphRef.current!.getInstance();

    if (nodeObject.data.type === 'btn-more-to') {
      const allSublingNodes = nodeObject.lot.parent.targetTo;
      const pageSize = 3;
      let displayedCount = 0;
      let newDisplayedCount = 0;

      for (const node of allSublingNodes) {
        if (node.isHide === true) {
          node.isHide = false;
          newDisplayedCount++;
        }
        if (node.isHide !== true) {
          displayedCount++;
        }
        if (newDisplayedCount >= pageSize) {
          break;
        }
      }

      if (displayedCount >= allSublingNodes.length) {
        graphInstance.removeNodeById(nodeObject.id);
      }

      const moreButton = graphInstance.getNodeById(nodeObject.id);
      moreButton.text = `Show More (${allSublingNodes.length - displayedCount - 1})`;

      graphInstance.doLayout();
    }

    if (nodeObject.data.type === 'btn-more-from') {
      const allSublingNodes = nodeObject.lot.parent.targetFrom;
      const pageSize = 3;
      let displayedCount = 0;
      let newDisplayedCount = 0;

      for (const node of allSublingNodes) {
        if (node.isHide === true) {
          node.isHide = false;
          newDisplayedCount++;
        }
        if (node.isHide !== true) {
          displayedCount++;
        }
        if (newDisplayedCount >= pageSize) {
          break;
        }
      }

      const moreButton = graphInstance.getNodeById(nodeObject.id);
      moreButton.text = `Show More (${allSublingNodes.length - displayedCount - 1})`;

      if (displayedCount >= allSublingNodes.length) {
        graphInstance.removeNodeById(nodeObject.id);
      }

      graphInstance.doLayout();
    }
  };

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
  };

  const generateChildNodes = (parentNodeId: string, newNodesPosition: string, graphJsonData: RGJsonData) => {
    const randomChildSize = 1 + Math.floor(Math.random() * 30);

    for (let i = 0; i < randomChildSize; i++) {
      const thisNodeIndex = newNodeIndex++;
      const newNodeId = 'N' + thisNodeIndex;
      const randomEntName = `Beijing ${randomEntNamePrefix[Math.floor(Math.random() * randomEntNamePrefix.length)]} No.${newNodeId} Company`;
      const alignItems = newNodesPosition === 'left' ? 'right' : 'left';
      const newChild: RGNode = { id: newNodeId, text: randomEntName, expanded: false, alignItems };
      let newLine: RGLine;

      if (newNodesPosition === 'left') {
        newLine = { from: newNodeId, to: parentNodeId };
      } else {
        newLine = { from: parentNodeId, to: newNodeId };
      }

      graphJsonData.nodes.push(newChild);
      graphJsonData.lines.push(newLine);
    }
  };

  useEffect(() => {
    showGraph();
  }, []);

  let newNodeIndex = 1;
  const randomEntNamePrefix = ['', 'Tianxing', 'Starry Night', 'Gathering Storm', 'Jin Kaibinski'];
  const MyNodeSlot: React.FC<RGNodeSlotProps> = ({node}) => {
    return (
      <div>
        {node.data?.type === 'btn-more-from' || node.data?.type === 'btn-more-to' ? (
          <div className="my-node more-btn" onClick={() => showMoreNodes(node)}>
            {node.text}
          </div>
        ) : node.data?.type === 'root' ? (
          <div className="my-node my-root">
            {node.text}
          </div>
        ) : node.data?.type === 'level1' ? (
          <div className="my-node" style={{ width: '100px', paddingLeft: '0px', textAlign: 'center', backgroundColor: '#2c3e50', color: '#ffffff' }}>
            {node.text}
          </div>
        ) : (
          <div className="my-node">
            <span className="c-circle-flag" />{node.text}
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          nodeSlot={MyNodeSlot}
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default ShowMoreNodesFront;
```

### `show-more-nodes-front.scss`

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
```
