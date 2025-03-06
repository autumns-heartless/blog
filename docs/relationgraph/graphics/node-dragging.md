# 节点碰撞检测与位移限制

## Vue2 版本

### `node-dragging.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);" @mousemove="onMouseMove">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          :on-node-click="onNodeClick"
          :on-line-click="onLineClick"
          :on-node-dragging="onNodeDragging"
          :on-node-drag-start="onNodeDragStart"
          :on-node-drag-end="onNodeDragEnd"
      >
        <template #node="{node}">
          <div><!---------------- if node a ---------------->
            <div style="background-color: #f39930">{{node.text}}</div>
            <div v-if="node.id==='SYS_ROLE'" style="color: #df7f03;padding:10px;">Not allowed to enter</div>
          </div>
        </template>
        <template #graph-plug>
          <!-- To facilitate understanding, the CSS style code is directly embedded here. -->
          <div style="z-index: 300;position: absolute;left:10px; top: calc(100% - 140px);font-size: 12px;background-color: #ffffff;border:#efefef solid 1px;border-radius: 10px;width:250px;height:130px;">
            <div style="padding-left:10px;">
              <div style="line-height: 30px;">The color of the moving over node：</div>
              <div style="margin-top: 10px;">
                Allowed drop
                <div style="height:5px;width:80px;background-color: rgba(212,252,189,0.82);"></div>
              </div>
              <div style="margin-top: 10px;">
                Not allowed drop
                <div style="height:5px;width:80px;background-color: rgba(252,189,189,0.82);"></div>
              </div>
              <div style="margin-top: 10px;">
                Not allowed to enter
                <div style="height:5px;width:80px;background-color: rgba(214,165,246,0.82);"></div>
              </div>
            </div>
          </div>
        </template>
        <template #canvas-plug>
          <!--- 可以将一些不允许被拖动的元素放在这里 --->
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import { RGNodesAnalyticUtils } from 'relation-graph';
const { RGNodesAnalytic } = RGNodesAnalyticUtils;
export default {
  name: 'Demo',
  components: {},
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        debug: false,
        // backgroundImage: '/images/graph-grid-bg.png',
        // backgroundColor: '#fce7d3',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        allowShowDownloadButton: true,
        defaultJunctionPoint: 'border',
        placeOtherNodes: false,
        placeSingleNode: false,
        defaultNodeColor: '#ffffff',
        defaultNodeBorderWidth: 1,
        defaultNodeBorderColor: '#f39930',
        defaultNodeWidth: 170,
        defaultNodeHeight: 70,
        defaultLineColor: '#f39930',
        defaultLineWidth: 2,
        defaultLineTextOffset_y: -2,
        layout: {
          layoutName: 'fixed'
        }
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const jsonData = {
        'rootId': 'SYS_ROLE',
        'nodes': [
          { 'id': 'SYS_USER', 'text': 'SYS_USER', 'nodeShape': 1, 'opacity': 1, 'x': -32, 'y': -427, width: 120, height: 80, 'data': { dropAble: true }},
          { 'id': 'SYS_DEPT', 'text': 'SYS_DEPT', 'nodeShape': 0, 'opacity': 1, 'x': -244, 'y': -283, 'data': { dropAble: true }},
          { 'id': 'SYS_ROLE', 'text': 'SYS_ROLE', 'nodeShape': 1, 'opacity': 1, 'x': -21, 'y': -171, width: 300, height: 200, 'data': { allowOverlap: false }},
          { 'id': 'SYS_USER_ROLE', 'text': 'SYS_USER_ROLE', 'nodeShape': 1, 'opacity': 1, 'x': 405, 'y': -174 },
          { 'id': 'SYS_RESOURCE', 'text': 'SYS_RESOURCE', 'nodeShape': 1, 'opacity': 1, 'x': -246, 'y': -80, 'data': { dropAble: true }},
          { 'id': 'SYS_ROLE_RESOURCE', 'text': 'SYS_ROLE_RESOURCE', 'nodeShape': 1, 'opacity': 1, 'x': 338, 'y': -100 }
        ],
        'lines': [
          { from: 'SYS_DEPT', to: 'SYS_USER', text: 'xxxxxxx' },
          { from: 'SYS_DEPT', to: 'SYS_USER' },
          { from: 'SYS_DEPT', to: 'SYS_USER' },
          { from: 'SYS_DEPT', to: 'SYS_USER' },
          { from: 'SYS_DEPT', to: 'SYS_USER' },
          { from: 'SYS_DEPT', to: 'SYS_USER' }
        ]
      };
      this.$refs.graphRef.setJsonData(jsonData, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeDragging(nodeObject, newX, newY, $event) {
      console.log('onNodeDragging:', nodeObject);
      const graphInstance = this.$refs.graphRef.getInstance();
      let rejectOverlaped = false;
      let limitedPosition;
      for (const n of graphInstance.getNodes()) {
        if (nodeObject === n) continue;
        const shapeA = nodeObject.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const shapeB = n.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const nodeBox = {
          el: nodeObject.el,
          x: newX,
          y: newY
        };
        const overlap = RGNodesAnalytic.shapesOverlap(nodeBox, n, shapeA, shapeB);
        if (overlap) {
          let newColor = n.data.dropAble ? 'rgba(212,252,189,0.82)' : 'rgba(252,189,189,0.82)';
          if (n.data.allowOverlap === false) {
            rejectOverlaped = true;
            limitedPosition = RGNodesAnalytic.getNoOverlapLimitedPosition(nodeObject, newX, newY, n);
            newColor = 'rgba(214,165,246,0.82)';
          }
          if (!n.data.orignColorSaved) { // Only the initial node color is saved
            n.data.orignColorSaved = true;
            n.data.orignColor = n.color;
          }
          n.color = newColor;
        } else {
          n.color = undefined;
        }
      }
      if (rejectOverlaped) {
        return limitedPosition;
      }
    },
    onNodeDragStart(nodeObject, $event) {
      console.log('onNodeDragStart:', nodeObject);
      nodeObject.data.startX = nodeObject.x;
      nodeObject.data.startY = nodeObject.y;
    },
    onNodeDragEnd(nodeObject, $event) {
      console.log('onNodeDragEnd:', nodeObject);
      const graphInstance = this.$refs.graphRef.getInstance();
      for (const n of graphInstance.getNodes()) {
        if (nodeObject === n) continue;
        if (n.data.allowOverlap === false) continue;
        if (!n.data.dropAble) continue;
        const shapeA = nodeObject.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const shapeB = n.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const overlap = RGNodesAnalytic.shapesOverlap(nodeObject, n, shapeA, shapeB);
        if (overlap) {
          this.updateNodeAsChildren(nodeObject, n);
          break;
        }
      }
      for (const n of graphInstance.getNodes()) {
        n.color = n.data.orignColor; // Restore the original color of the node
      }
    },
    updateNodeAsChildren(node, parentNode) {
      console.log('updateNodeAsChildren:', parentNode.id, '---->', node.id);
      node.x = node.data.startX;
      node.y = node.data.startY;
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.addLines([{
        from: parentNode.id,
        to: node.id,
        text: '新连线',
        color: 'rgba(214,165,246,0.82)',
        lineWidth: 3
      }]);
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    onMouseMove(e) {
      if (e.target) {
        const tagName = e.target.tagName;
        if (tagName === 'path' || tagName === 'text') {
          const graphInstance = this.$refs.graphRef.getInstance();
          const link = graphInstance.isLink(e.target);
          if (link) {
            console.log('Show Detail:', link.fromNode.id, link.toNode.id, link.text);
          }
        } else {
          console.log('Hide Detail');
        }
      }
    }
  }
};

</script>
<style lang="scss" scoped>

::v-deep .relation-graph {
  //customize node
  .rel-node {
    overflow: hidden;
  }
  //customize toolbar style
  .rel-toolbar {
    background-color: #f39930;
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  //customize background image size
  .rel-map {
    background-size: 50px 50px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.1) 3px,transparent 0);
    background-image: linear-gradient(90deg, rgba(243, 153, 48, 0.3) 1px,transparent 0),linear-gradient(180deg,rgba(243, 153, 48, 0.3) 1px,transparent 0);
  }
}
</style>
```

## Vue3 版本

### `node-dragging.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);" @mousemove="onMouseMove">
      <RelationGraph

          ref="graphRef"
          :options="graphOptions"
          :on-node-click="onNodeClick"
          :on-line-click="onLineClick"
          :on-node-dragging="onNodeDragging"
          :on-node-drag-start="onNodeDragStart"
          :on-node-drag-end="onNodeDragEnd"
      >
        <template #node="{node}">
          <div><!---------------- if node a ---------------->
            <div style="background-color: #f39930">{{node.text}}</div>
            <div v-if="node.id==='SYS_ROLE'" style="color: #df7f03;padding:10px;">Not allowed to enter</div>
          </div>
        </template>
        <template #graph-plug>
          <!-- To facilitate understanding, the CSS style code is directly embedded here. -->
          <div style="z-index: 300;position: absolute;left:10px; top: calc(100% - 140px);font-size: 12px;background-color: #ffffff;border:#efefef solid 1px;border-radius: 10px;width:250px;height:130px;">
            <div style="padding-left:10px;">
              <div style="line-height: 30px;">The color of the moving over node：</div>
              <div style="margin-top: 10px;">
                Allowed drop
                <div style="height:5px;width:80px;background-color: rgba(212,252,189,0.82);"></div>
              </div>
              <div style="margin-top: 10px;">
                Not allowed drop
                <div style="height:5px;width:80px;background-color: rgba(252,189,189,0.82);"></div>
              </div>
              <div style="margin-top: 10px;">
                Not allowed to enter
                <div style="height:5px;width:80px;background-color: rgba(214,165,246,0.82);"></div>
              </div>
            </div>
          </div>
        </template>
        <template #canvas-plug>
          <!--- 可以将一些不允许被拖动的元素放在这里 --->
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import { RGNodesAnalyticUtils, RGLink, RGNode, RGLine, RGUserEvent, RGJsonData, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';

const { RGNodesAnalytic } = RGNodesAnalyticUtils;

const graphRef = ref<RelationGraphComponent>();
const isShowCodePanel = ref(false);
const graphOptions: RGOptions = {
    debug: false,
    // backgroundImage: '/images/graph-grid-bg.png',
    // backgroundColor: '#fce7d3',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border',
    placeOtherNodes: false,
    placeSingleNode: false,
    defaultNodeColor: '#ffffff',
    defaultNodeBorderWidth: 1,
    defaultNodeBorderColor: '#f39930',
    defaultNodeWidth: 170,
    defaultNodeHeight: 70,
    defaultLineColor: '#f39930',
    defaultLineWidth: 2,
    defaultLineTextOffset_y: -2,
    layout: {
        layoutName: 'fixed'
    }
    // 这里可以参考"Graph 图谱"中的参数进行设置

};

onMounted(() => {
    showGraph();
});

const showGraph = async() => {
    const jsonData: RGJsonData = {
        rootId: 'SYS_ROLE',
        nodes: [
            { id: 'SYS_USER', text: 'SYS_USER', nodeShape: 1, opacity: 1, x: -32, y: -427, width: 120, height: 80, data: { dropAble: true } },
            { id: 'SYS_DEPT', text: 'SYS_DEPT', nodeShape: 0, opacity: 1, x: -244, y: -283, data: { dropAble: true } },
            { id: 'SYS_ROLE', text: 'SYS_ROLE', nodeShape: 1, opacity: 1, x: -21, y: -171, width: 300, height: 200, data: { allowOverlap: false } },
            { id: 'SYS_USER_ROLE', text: 'SYS_USER_ROLE', nodeShape: 1, opacity: 1, x: 405, y: -174 },
            { id: 'SYS_RESOURCE', text: 'SYS_RESOURCE', nodeShape: 1, opacity: 1, x: -246, y: -80, data: { dropAble: true } },
            { id: 'SYS_ROLE_RESOURCE', text: 'SYS_ROLE_RESOURCE', nodeShape: 1, opacity: 1, x: 338, y: -100 }
        ],
        lines: [
            { from: 'SYS_DEPT', to: 'SYS_USER', text: 'xxxxxxx' },
            { from: 'SYS_DEPT', to: 'SYS_USER' },
            { from: 'SYS_DEPT', to: 'SYS_USER' },
            { from: 'SYS_DEPT', to: 'SYS_USER' },
            { from: 'SYS_DEPT', to: 'SYS_USER' },
            { from: 'SYS_DEPT', to: 'SYS_USER' }
        ]
    };
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(jsonData);
        await graphInstance.moveToCenter();
        await graphInstance.zoomToFit();
    }
};

const onNodeDragging = (nodeObject: RGNode, newX: number, newY: number, $event: RGUserEvent) => {
    console.log('onNodeDragging:', nodeObject);
    const graphInstance = graphRef.value?.getInstance();
    let rejectOverlaped = false;
    let limitedPosition;
    for (const n of graphInstance?.getNodes() || []) {
        if (nodeObject === n) continue;
        const shapeA = nodeObject.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const shapeB = n.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const nodeBox = {
            el: nodeObject.el,
            x: newX,
            y: newY,
        };
        const overlap = RGNodesAnalytic.shapesOverlap(nodeBox, n, shapeA, shapeB);
        if (overlap) {
            let newColor = n.data.dropAble ? 'rgba(212,252,189,0.82)' : 'rgba(252,189,189,0.82)';
            if (n.data.allowOverlap === false) {
                rejectOverlaped = true;
                limitedPosition = RGNodesAnalytic.getNoOverlapLimitedPosition(nodeObject, newX, newY, n);
                newColor = 'rgba(214,165,246,0.82)';
            }
            if (!n.data.orignColorSaved) {// Only the initial node color is saved

                n.data.orignColorSaved = true;
                n.data.orignColor = n.color;
            }
            n.color = newColor;
        } else {
            n.color = undefined;
        }
    }
    if (rejectOverlaped) {
        return limitedPosition;
    }
};

const onNodeDragStart = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeDragStart:', nodeObject);
    nodeObject.data.startX = nodeObject.x;
    nodeObject.data.startY = nodeObject.y;
};

const onNodeDragEnd = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeDragEnd:', nodeObject);
    const graphInstance = graphRef.value?.getInstance();
    for (const n of graphInstance?.getNodes() || []) {
        if (nodeObject === n) continue;
        if (n.data.allowOverlap === false) continue;
        if (!n.data.dropAble) continue;
        const shapeA = nodeObject.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const shapeB = n.nodeShape || graphInstance.options.defaultNodeShape || 0;
        const overlap = RGNodesAnalytic.shapesOverlap(nodeObject, n, shapeA, shapeB);
        if (overlap) {
            updateNodeAsChildren(nodeObject, n);
            break;
        }
    }
    for (const n of graphInstance?.getNodes() || []) {
        n.color = n.data.orignColor; // Restore the original color of the node

    }
};

const updateNodeAsChildren = (node: RGNode, parentNode: RGNode) => {
    console.log('updateNodeAsChildren:', parentNode.id, '---->', node.id);
    node.x = node.data.startX;
    node.y = node.data.startY;
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.addLines([{
            from: parentNode.id,
            to: node.id,
            text: '新连线',
            color: 'rgba(214,165,246,0.82)',
            lineWidth: 3

        }]);
    }
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};

const onMouseMove = (e: MouseEvent) => {
    if (e.target) {
        const tagName = (e.target as HTMLElement).tagName;
        if (tagName === 'path' || tagName === 'text') {
            const graphInstance = graphRef.value?.getInstance();
            const link: RGLink | null = graphInstance?.isLink(e.target as HTMLElement);
            if (link) {
                console.log('Show Detail:', link.fromNode.id, link.toNode.id, link.text);
            }
        } else {
            console.log('Hide Detail');
        }
    }
};
</script>

<style lang="scss" scoped>
//customize node

::v-deep(.relation-graph) {
    //customize node
    .rel-node {
        overflow: hidden;
    }
    //customize toolbar style
    .rel-toolbar {
        background-color: #f39930;
        color: #ffffff;
        .c-current-zoom {
            color: #ffffff;
        }
    }
    //customize background image size
    .rel-map {
        background-size: 50px 50px;
        //background-image: radial-gradient(circle,rgba(0,0,0,.1) 3px,transparent 0);
        background-image: linear-gradient(90deg, rgba(243, 153, 48, 0.3) 1px,transparent 0),linear-gradient(180deg,rgba(243, 153, 48, 0.3) 1px,transparent 0);
    }
}
</style>
```

## React 版本

### `node-dragging.tsx`

```javascript
import React, { useRef, useEffect } from 'react';
import RelationGraph, {
  RGLink,
  RGNodesAnalyticUtils,
  RGNodeSlotProps
} from 'relation-graph-react';
import type { RGNode, RGLine, RGUserEvent, RGJsonData, RGOptions, RelationGraphComponent } from 'relation-graph-react';
import './node-dragging.scss';

const { RGNodesAnalytic } = RGNodesAnalyticUtils;

const NodeDragging = () => {
  const graphRef = useRef<RelationGraphComponent>();

  useEffect(() => {
    showGraph();
  }, []);

  const graphOptions: RGOptions = {
    debug: true,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border',
    placeOtherNodes: false,
    placeSingleNode: false,
    defaultNodeColor: '#ffffff',
    defaultNodeBorderWidth: 1,
    defaultNodeBorderColor: '#f39930',
    defaultNodeWidth: 170,
    defaultNodeHeight: 70,
    defaultLineColor: '#f39930',
    defaultLineWidth: 2,
    defaultLineTextOffset_y: -2,
    layout: {
      layoutName: 'fixed'
    }
  };

  const showGraph = async () => {
    const jsonData: RGJsonData = {
      rootId: 'SYS_ROLE',
      nodes: [
        { id: 'SYS_USER', text: 'SYS_USER', nodeShape: 1, opacity: 1, x: -32, y: -427, width: 120, height: 80, data: { dropAble: true } },
        { id: 'SYS_DEPT', text: 'SYS_DEPT', nodeShape: 0, opacity: 1, x: -244, y: -283, data: { dropAble: true } },
        { id: 'SYS_ROLE', text: 'SYS_ROLE', nodeShape: 1, opacity: 1, x: 0, y: 0, width: 300, height: 200, data: { allowOverlap: false } },
        { id: 'SYS_USER_ROLE', text: 'SYS_USER_ROLE', nodeShape: 1, opacity: 1, x: 405, y: -174 },
        { id: 'SYS_RESOURCE', text: 'SYS_RESOURCE', nodeShape: 1, opacity: 1, x: -246, y: -80, data: { dropAble: true } },
        { id: 'SYS_ROLE_RESOURCE', text: 'SYS_ROLE_RESOURCE', nodeShape: 1, opacity: 1, x: 338, y: -100 }
      ],
      lines: [
        { from: 'SYS_DEPT', to: 'SYS_USER', text: 'xxxxxxx' },
        { from: 'SYS_DEPT', to: 'SYS_USER' },
        { from: 'SYS_DEPT', to: 'SYS_USER' },
        { from: 'SYS_DEPT', to: 'SYS_USER' },
        { from: 'SYS_DEPT', to: 'SYS_USER' },
        { from: 'SYS_DEPT', to: 'SYS_USER' }
      ]
    };
    graphRef.current!.setJsonData(jsonData, () => {
      // set data ok.
    });
  };

  const onNodeDragging = (nodeObject: RGNode, newX: number, newY: number, _$event: RGUserEvent) => {
    console.log('onNodeDragging:', nodeObject);
    const graphInstance = graphRef.current!.getInstance();
    let rejectOverlaped = false;
    let limitedPosition;
    for (const n of graphInstance?.getNodes() || []) {
      if (nodeObject === n) continue;
      const shapeA = nodeObject.nodeShape || graphInstance.options.defaultNodeShape || 0;
      const shapeB = n.nodeShape || graphInstance.options.defaultNodeShape || 0;
      const nodeBox = {
        el: nodeObject.el,
        x: newX,
        y: newY
      };
      const overlap = RGNodesAnalytic.shapesOverlap(nodeBox, n, shapeA, shapeB);
      if (overlap) {
        let newColor = n.data!.dropAble ? 'rgba(212,252,189,0.82)' : 'rgba(252,189,189,0.82)';
        if (n.data!.allowOverlap === false) {
          rejectOverlaped = true;
          limitedPosition = RGNodesAnalytic.getNoOverlapLimitedPosition(nodeObject, newX, newY, n);
          newColor = 'rgba(214,165,246,0.82)';
        }
        if (!n.data!.orignColorSaved) {
          n.data!.orignColorSaved = true;
          n.data!.orignColor = n.color;
        }
        n.color = newColor;
      } else {
        n.color = undefined;
      }
    }
    if (rejectOverlaped) {
      return limitedPosition;
    }
  };

  const onNodeDragStart = (nodeObject: RGNode, _$event: RGUserEvent) => {
    console.log('onNodeDragStart:', nodeObject);
    nodeObject.data!.startX = nodeObject.x;
    nodeObject.data!.startY = nodeObject.y;
  };

  const onNodeDragEnd = (nodeObject: RGNode, _$event: RGUserEvent) => {
    console.log('onNodeDragEnd:', nodeObject);
    const graphInstance = graphRef.current!.getInstance();
    for (const n of graphInstance?.getNodes() || []) {
      if (nodeObject === n) continue;
      if (n.data!.allowOverlap === false) continue;
      if (!n.data!.dropAble) continue;
      const shapeA = nodeObject.nodeShape || graphInstance.options.defaultNodeShape || 0;
      const shapeB = n.nodeShape || graphInstance.options.defaultNodeShape || 0;
      const overlap = RGNodesAnalytic.shapesOverlap(nodeObject, n, shapeA, shapeB);
      if (overlap) {
        updateNodeAsChildren(nodeObject, n);
        break;
      }
    }
    for (const n of graphInstance?.getNodes() || []) {
      n.color = n.data!.orignColor;
    }
  };

  const updateNodeAsChildren = (node: RGNode, parentNode: RGNode) => {
    console.log('updateNodeAsChildren:', parentNode.id, '---->', node.id);
    node.x = node.data!.startX;
    node.y = node.data!.startY;
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      graphInstance.addLines([{
        from: parentNode.id,
        to: node.id,
        text: 'New Line',
        color: 'rgba(214,165,246,0.82)',
        lineWidth: 3

      }]);
    }
  };

  const onNodeClick = (nodeObject: RGNode, _$event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
  };

  const onLineClick = (lineObject: RGLine, _linkObject: RGLink, _$event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.target) {
      const tagName = (e.target as HTMLElement).tagName;
      if (tagName === 'path' || tagName === 'text') {
        const graphInstance = graphRef.current!.getInstance();
        const link: RGLink | undefined = graphInstance.isLink(e.target as HTMLElement);
        if (link) {
          console.log('Show Detail:', link.fromNode.id, link.toNode.id);
        }
      } else {
        console.log('Hide Detail');
      }
    }
  };
  const MyNodeSlot:React.FC<RGNodeSlotProps> = ({ node }) => {
    return (
      <div className="h-full">
        <div className="bg-yellow-500">{node.text}</div>
        {node.id === 'SYS_ROLE' && <div style={{ color: '#df7f03', padding: '10px' }}>Not allowed to enter</div>}
      </div>
    );
  };
  const MyGraphSlot:React.FC = () => {
    return (
      <>
        <div>
          <div style={{ zIndex: 300, position: 'absolute', left: '10px', top: 'calc(100% - 140px)', fontSize: '12px', backgroundColor: '#ffffff', border: '#efefef solid 1px', borderRadius: '10px', width: '250px', height: '130px' }}>
            <div style={{ paddingLeft: '10px' }}>
              <div style={{ lineHeight: '30px' }}>The color of the moving over node：</div>
              <div style={{ marginTop: '10px' }}>
                Allowed drop

                <div style={{ height: '5px', width: '80px', backgroundColor: 'rgba(212,252,189,0.82)' }}></div>
              </div>
              <div style={{ marginTop: '10px' }}>
                Not allowed drop

                <div style={{ height: '5px', width: '80px', backgroundColor: 'rgba(252,189,189,0.82)' }}></div>
              </div>
              <div style={{ marginTop: '10px' }}>
                Not allowed to enter

                <div style={{ height: '5px', width: '80px', backgroundColor: 'rgba(214,165,246,0.82)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <div style={{ height: '100vh' }} onMouseMove={onMouseMove}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeDragging={onNodeDragging}
          onNodeDragStart={onNodeDragStart}
          onNodeDragEnd={onNodeDragEnd}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          graphPlugSlot={MyGraphSlot}
          nodeSlot={MyNodeSlot}
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default NodeDragging;
```

### `node-dragging.scss`

```scss
//customize node
.relation-graph {
  .rel-node {
    overflow: hidden;
  }
  .rel-toolbar {
    background-color: #f39930;
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-map {
    background-size: 50px 50px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.1) 3px,transparent 0);
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 2px, transparent 0), linear-gradient(180deg, rgba(
            0,
            0,
            0,
            0.1
          ) 2px, transparent 0);
  }
}
```
