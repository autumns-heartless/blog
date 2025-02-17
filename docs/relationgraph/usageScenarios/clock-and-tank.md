# 小玩意-时钟

## Vue2 版本

### `clock-and-tank.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="options">
        <template #node="{node}">
          <div v-if="node.id === 'current'" :style="{zIndex: 555, opacity: 0.5, lineHeight:'40px', width: '100%', height: '100%', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', background: 'linear-gradient(to right, #00FFFF, #FF00FF)'}">{{ node.text }}</div>
          <div v-else-if="node.id === 'root'" :style="{zIndex: 555, opacity: 0.5, lineHeight:'100px', width: '100%', height: '100%', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', fontSize: '32px', textAlign: 'center', overflow: 'hidden', border: '#000000 solid 1px'}">
            <div :style="{width: '100%', height: (node.data.percent * 100) + '%', marginTop: ((1-node.data.percent) * 100) + '%', background: 'linear-gradient(to bottom, #00FFFF, #FF00FF)'}">
              {{node.text}}
            </div>
          </div>
          <div v-else :style="{lineHeight:'40px', width: '100%', height: '100%', border: '#999999 solid 1px', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', textAlign: 'center'}">{{ node.text }}</div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      graphRef: null,
      timer: null,
      currentSecond: 1,
      options: {
        lineUseTextPath: true,
        defaultLineShape: 1,
        placeSingleNode: false,
        moveToCenterWhenRefresh: true,
        zoomToFitWhenRefresh: true,
        layout: {
          layoutName: 'center',
          maxLayoutTimes: 3000
        },
        allowShowMiniToolBar: true,
        defaultNodeWidth: 40,
        defaultNodeHeight: 40,
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'transparent',
        backgroundColor: 'transparent',
        defaultExpandHolderPosition: 'right',
        defaultLineColor: 'rgba(227,226,226,0.3)'
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      const graphJsonData = {
        rootId: 'root',
        nodes: [
          { id: 'root', text: '', width: 100, height: 100, data: { percent: 0 } }
        ],
        lines: []
      };
      for (let i = 1; i < 61; i++) {
        graphJsonData.nodes.push({ id: i.toString(), text: i.toString() });
        graphJsonData.lines.push({ from: 'root', to: i.toString(), text: '' });
      }
      graphJsonData.nodes.push({ id: 'current', text: '', x: -20, y: -20 });
      this.$refs.graphRef.setJsonData(graphJsonData, true, () => {
        this.timer = setInterval(() => {
          this.play();
        }, 500);
      });
    });
  },
  beforeDestroy() {
    console.log('beforeDestroy:clear clock:', this.timer);
    clearInterval(this.timer);
  },
  methods: {
    play() {
      if (this.currentSecond > 60) this.currentSecond = 1;
      const graphInstance = this.$refs.graphRef.getInstance();
      if (this.currentSecond === 15) {
        graphInstance.startAutoLayout();
      }
      if (this.currentSecond === 18) {
        graphInstance.zoomToFit();
      }
      const rootNode = graphInstance.graphData.rootNode;
      if (this.currentSecond <= 20) {
        rootNode && (rootNode.data.percent = this.currentSecond / 15);
      }
      if (this.currentSecond === 60) {
        rootNode && (rootNode.data.percent = 0);
        graphInstance.stopAutoLayout();
        graphInstance.doLayout();
        graphInstance.setZoom(100);
        graphInstance.zoomToFit();
      }
      const targetNode = graphInstance.getNodeById(this.currentSecond.toString());
      const focusNode = graphInstance.getNodeById('current');
      if (!targetNode || !focusNode) return;
      focusNode.x = targetNode.x;
      focusNode.y = targetNode.y;
      // 设置正在力学布局过程中的节点的位置
      graphInstance.emitEvent('node-dragging', {
        node: focusNode,
        x: focusNode.x,
        y: focusNode.y
      });
      graphInstance.options.checkedNodeId = 'current';
      graphInstance.options.checkedLineId = graphInstance.getLinks().find((l) => l.toNode.id === targetNode.id).relations[0].id;
      this.currentSecond++;
    }
  }
};
</script>
```

## Vue3 版本

### `clock-and-tank.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
          <div v-if="node.id === 'current'" :style="{zIndex: 555, opacity: 0.5, lineHeight:'40px', width: '100%', height: '100%', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', background: 'linear-gradient(to right, #00FFFF, #FF00FF)'}">{{ node.text }}</div>
          <div v-else-if="node.id === 'root'" :style="{zIndex: 555, opacity: 0.5, lineHeight:'100px', width: '100%', height: '100%', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', fontSize: '32px', textAlign: 'center', overflow: 'hidden', border: '#000000 solid 1px'}">
            <div :style="{width: '100%', height: (node.data.percent * 100) + '%', marginTop: ((1-node.data.percent) * 100) + '%', background: 'linear-gradient(to bottom, #00FFFF, #FF00FF)'}">
              {{node.text}}
            </div>
          </div>
          <div v-else :style="{lineHeight:'40px', width: '100%', height: '100%', border: '#999999 solid 1px', color: '#000000', borderRadius:'50%', boxSizing: 'border-box', textAlign: 'center'}">{{ node.text }}</div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphRef = ref<RelationGraphComponent>();
const timer = ref<number | null>(null);
let currentSecond = 1;

const graphOptions: RGOptions = {
    lineUseTextPath: true,
    defaultLineShape: 1,
    placeSingleNode: false,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    layouts: [
        {
            layoutName: 'center',
            maxLayoutTimes: 3000

        }
    ],
    allowShowMiniToolBar: true,
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'transparent',
    backgroundColor: 'transparent',
    defaultExpandHolderPosition: 'right',
    defaultLineColor: 'rgba(227,226,226,0.3)'
};

const play = () => {
    if (currentSecond > 60) currentSecond = 1;
    const graphInstance = graphRef.value!.getInstance();
    if (currentSecond === 15) {
        graphInstance.startAutoLayout();
    }
    if (currentSecond === 18) {
        graphInstance.zoomToFit();
    }
    const rootNode = graphInstance.graphData.rootNode;
    if (currentSecond <= 20) {
        rootNode && (rootNode.data.percent = currentSecond / 15);
    }
    if (currentSecond === 60) {
        rootNode && (rootNode.data.percent = 0);
        graphInstance.stopAutoLayout();
        graphInstance.doLayout();
        graphInstance.setZoom(100);
        graphInstance.zoomToFit();
    }
    const targetNode = graphInstance.getNodeById(currentSecond.toString());
    const focusNode = graphInstance.getNodeById('current');
    if (!targetNode || !focusNode) return;
    focusNode.x = targetNode.x;
    focusNode.y = targetNode.y;
    // 设置正在力学布局过程中的节点的位置
    graphInstance.emitEvent('node-dragging', {
        node: focusNode,
        x: focusNode.x,
        y: focusNode.y
    });
    graphInstance.options.checkedNodeId = 'current';
    graphInstance.options.checkedLineId = graphInstance.getLinks().find((l) => l.toNode.id === targetNode.id).relations[0].id;
    currentSecond++;
};

onMounted(() => {
    const graphJsonData: RGJsonData = {
        rootId: 'root',
        nodes: [
            { id: 'root', text: '', width: 100, height: 100, data: { percent: 0 } }
        ],
        lines: []
    };
    for (let i = 1; i < 61; i++) {
        graphJsonData.nodes.push({ id: i.toString(), text: i.toString() });
        graphJsonData.lines.push({ from: 'root', to: i.toString(), text: '' });
    }
    graphJsonData.nodes.push({ id: 'current', text: '', x: -20, y: -20 });
    graphRef.value!.setJsonData(graphJsonData, true, () => {
        timer.value = setInterval(() => {
            play();
        }, 500);
    });
});

onBeforeUnmount(() => {
    console.log('beforeDestroy:clear clock:', timer.value);
    clearInterval(timer.value);
});
</script>
```

## React 版本

### `clock-and-tank.tsx`

```javascript
import React, { useEffect, useRef } from 'react';
import RelationGraph, {RGNodeSlotProps} from 'relation-graph-react';
import type { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import './clock-and-tank.scss';

const ClockAndTank = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const timer = useRef(0);
  const currentSecond = useRef(1);

  const graphOptions: RGOptions = {
    lineUseTextPath: true,
    defaultLineShape: 1,
    placeSingleNode: false,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    layout: {
      layoutName: 'center',
      maxLayoutTimes: 3000
    },
    allowShowMiniToolBar: true,
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'transparent',
    backgroundColor: 'transparent',
    defaultExpandHolderPosition: 'right',
    defaultLineColor: 'rgba(227,226,226,0.3)'
  };

  const play = () => {
    if (currentSecond.current > 60) currentSecond.current = 1;
    const graphInstance = graphRef.current!.getInstance();
    if (currentSecond.current === 15) {
      graphInstance?.startAutoLayout();
    }
    if (currentSecond.current === 18) {
      graphInstance?.zoomToFit();
    }
    const rootNode = graphInstance?.graphData.rootNode;
    if (currentSecond.current <= 20) {
      rootNode && (rootNode.data.percent = currentSecond.current / 15);
    }
    if (currentSecond.current === 60) {
      rootNode && (rootNode.data.percent = 0);
      graphInstance?.stopAutoLayout();
      graphInstance?.doLayout();
      graphInstance?.setZoom(100);
      graphInstance?.zoomToFit();
    }
    const targetNode = graphInstance.getNodeById(currentSecond.current.toString());
    const focusNode = graphInstance.getNodeById('current');
    if (!targetNode || !focusNode) return;
    focusNode.x = targetNode.x;
    focusNode.y = targetNode.y;
    // 设置正在力学布局过程中的节点的位置

    graphInstance.emitEvent('node-dragging', {
      node: focusNode,
      x: focusNode.x,
      y: focusNode.y

    });
    graphInstance.options.checkedNodeId = 'current';
    graphInstance.options.checkedLineId = graphInstance.getLinks().find((l) => l.toNode.id === targetNode.id)?.relations[0].id;
    currentSecond.current++;
    graphInstance.dataUpdated();
  };

  useEffect(() => {
    const graphJsonData: RGJsonData = {
      rootId: 'root',
      nodes: [
        { id: 'root', text: '', width: 100, height: 100, data: { percent: 0 } }
      ],
      lines: []
    };
    for (let i = 1; i < 61; i++) {
      graphJsonData.nodes.push({ id: i.toString(), text: i.toString() });
      graphJsonData.lines.push({ from: 'root', to: i.toString(), text: '' });
    }
    graphJsonData.nodes.push({ id: 'current', text: '', x: -20, y: -20 });
    graphRef.current?.setJsonData(graphJsonData, true, () => {
      timer.current = setInterval(() => {
        play();
      }, 500);
    });

    return () => {
      console.log('beforeDestroy:clear clock:', timer.current);
      clearInterval(timer.current);
    };
  }, []);


  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          nodeSlot={MyNodeSlot}
        >
        </RelationGraph>
      </div>
    </div>
  );
};
const MyNodeSlot:React.FC<RGNodeSlotProps> = ({node}) => {
  return <>
    {node.id === 'current' && (
      <div
        style={{
          zIndex: 555,
          opacity: 0.5,
          lineHeight: '40px',
          width: '100%',
          height: '100%',
          color: '#000000',
          borderRadius: '50%',
          boxSizing: 'border-box',
          background: 'linear-gradient(to right, #00FFFF, #FF00FF)'
        }}
      >
        {node.text}
      </div>
    )}
    {node.id === 'root' && (
      <div
        style={{
          zIndex: 555,
          width: '100%',
          height: '100%',
          opacity: 0.5,
          lineHeight: '100px',
          color: '#000000',
          borderRadius: '50%',
          boxSizing: 'border-box',
          fontSize: '32px',
          textAlign: 'center',
          overflow: 'hidden',
          border: '#000000 solid 1px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: `${node.data.percent * 100}%`,
            marginTop: `${(1 - node.data.percent) * 100}%`,
            background: 'linear-gradient(to bottom, #00FFFF, #FF00FF)'
          }}
        >
          {node.text}
        </div>
      </div>
    )}
    {node.id !== 'current' && node.id !== 'root' && (
      <div
        style={{
          lineHeight: '40px',
          width: '100%',
          height: '100%',
          border: '#999999 solid 1px',
          color: '#000000',
          borderRadius: '50%',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}
      >
        {node.text}
      </div>
    )}
  </>
}
export default ClockAndTank;
```

### `clock-and-tank.scss`

```scss

```
