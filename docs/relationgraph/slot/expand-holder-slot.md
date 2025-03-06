# 展开/收缩 按钮自定义

## Vue2 版本

### `expand-holder-slot.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
      >
        <template #node-expand-holder="{expandHolderPosition, expandButtonClass, color, expandOrCollapseNode}">
          <div :class="[('c-expand-positon-' + expandHolderPosition)]" class="c-btn-open-close">
            <span
                class="my-expand-button"
                @click.stop="expandOrCollapseNode"
                @touchend.stop="expandOrCollapseNode"
            >
              <div v-if="expandButtonClass === 'c-collapsed'">
                关
              </div>
              <div v-else>
                开
              </div>
            </span>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import staticJsonData from './example-data/systems.json';

const graphOptions = {
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  defaultExpandHolderPosition: 'right',
  useAnimationWhenExpanded: true,
  reLayoutWhenExpandedOrCollapsed: true,
  useAnimationWhenRefresh: false,
  debug: false,
  layout:
    {
      label: '中心',
      layoutName: 'center',
      from: 'top',
      layoutClassName: 'seeks-layout-center',
      defaultExpandHolderPosition: 'hide',
      defaultJunctionPoint: 'border'
    }
};
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = staticJsonData;
      const graphRef = this.$refs.graphRef;
      graphRef.setJsonData(__graph_json_data, async(graphInstance) => {
      });
    }
  }
};
</script>

<style scoped>
.c-btn-open-close .my-expand-button{
  background-color: red;
  font-size: 12px;
  border-radius:3px;
}
</style>
```

### 📂 example-data

#### `systems.json`

```json
{
  "rootId": "2",
  "nodes": [
    {
      "id": "2",
      "text": "relation-graph",
      "data": null
    },
    {
      "id": "3",
      "text": "CH2 TTN",
      "data": null
    },
    {
      "id": "4",
      "text": "CH1 AlCu",
      "data": null
    },
    {
      "id": "5",
      "text": "MainFrame",
      "data": null
    },
    {
      "id": "6",
      "text": "TestMainSys",
      "expanded": false,
      "data": null
    },
    {
      "id": "7",
      "text": "汽车部件",
      "data": null
    },
    {
      "id": "8",
      "text": "汽车工艺",
      "data": null
    },
    {
      "id": "9",
      "text": "过程质检",
      "data": null
    },
    {
      "id": "10",
      "text": "卓立制造",
      "data": null
    },
    {
      "id": "11",
      "text": "压电开关",
      "data": null
    },
    {
      "id": "12",
      "text": "电子产品",
      "data": null
    },
    {
      "id": "13",
      "text": "集成电路",
      "data": null
    },
    {
      "id": "14",
      "text": "ArHigh",
      "data": null
    },
    {
      "id": "15",
      "text": "ArLow",
      "data": null
    },
    {
      "id": "16",
      "text": "ShowerHead",
      "data": null
    },
    {
      "id": "17",
      "text": "CrypoPump",
      "data": null
    },
    {
      "id": "18",
      "text": "DryPump",
      "data": null
    },
    {
      "id": "19",
      "text": "Ti Target",
      "data": null
    },
    {
      "id": "20",
      "text": "N2",
      "data": null
    },
    {
      "id": "21",
      "text": "Shutter",
      "data": null
    },
    {
      "id": "22",
      "text": "Cool Chbr",
      "data": null
    },
    {
      "id": "23",
      "text": "Transfer Chbr",
      "data": null
    },
    {
      "id": "24",
      "text": "Alignment Unit",
      "data": null
    },
    {
      "id": "25",
      "text": "齿轮箱",
      "data": null
    },
    {
      "id": "26",
      "text": "车门内部人工涂蜡",
      "data": null
    },
    {
      "id": "27",
      "text": "原材料检验",
      "data": null
    },
    {
      "id": "28",
      "text": "地板RTV硅胶密封",
      "data": null
    },
    {
      "id": "29",
      "text": "热保护焊接",
      "data": null
    },
    {
      "id": "30",
      "text": "电热管导线焊接",
      "data": null
    },
    {
      "id": "31",
      "text": "温控器安装",
      "data": null
    },
    {
      "id": "32",
      "text": "蒸汽硅胶座配装",
      "data": null
    },
    {
      "id": "33",
      "text": "温度调试",
      "data": null
    },
    {
      "id": "34",
      "text": "压电开关的模型塑料外壳",
      "data": null
    },
    {
      "id": "35",
      "text": "安装开关",
      "data": null
    },
    {
      "id": "36",
      "text": "ASIC IC",
      "data": null
    },
    {
      "id": "37",
      "text": "SENSOR",
      "data": null
    },
    {
      "id": "38",
      "text": "CON",
      "data": null
    },
    {
      "id": "39",
      "text": "Flash",
      "data": null
    },
    {
      "id": "40",
      "text": "Flite",
      "data": null
    }
  ],
  "lines": [
    {
      "from": "2",
      "to": "5",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "6",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "3",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "4",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "21",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "20",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "19",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "18",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "17",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "16",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "15",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "14",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "24",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "23",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "22",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "13",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "12",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "11",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "10",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "9",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "8",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "7",
      "text": "子系统",
      "data": null
    },
    {
      "from": "7",
      "to": "25",
      "text": "子系统",
      "data": null
    },
    {
      "from": "8",
      "to": "26",
      "text": "子系统",
      "data": null
    },
    {
      "from": "9",
      "to": "27",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "33",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "32",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "31",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "30",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "29",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "28",
      "text": "子系统",
      "data": null
    },
    {
      "from": "11",
      "to": "35",
      "text": "子系统",
      "data": null
    },
    {
      "from": "11",
      "to": "34",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "39",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "38",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "37",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "36",
      "text": "子系统",
      "data": null
    },
    {
      "from": "13",
      "to": "40",
      "text": "子系统",
      "data": null
    }
  ]
}
```

## Vue3 版本

### `expand-holder-slot.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node-expand-holder="{ expandHolderPosition, expandButtonClass, color, expandOrCollapseNode }">
          <div :class="[('c-expand-positon-' + expandHolderPosition)]" class="c-btn-open-close">
            <span class="my-expand-button" @click.stop="expandOrCollapseNode" @touchend.stop="expandOrCollapseNode">
              <div v-if="expandButtonClass === 'c-collapsed'">
                Close

              </div>
              <div v-else>
                Open

              </div>
            </span>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import { RelationGraphComponent, RGJsonData, RGOptions, RGNode, RGUserEvent, RGLine, RGLink } from 'relation-graph-vue3';
import staticJsonData from './example-data/systems.json';

const graphOptions: RGOptions = {
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    defaultExpandHolderPosition: 'right',
    useAnimationWhenExpanded: true,
    reLayoutWhenExpandedOrCollapsed: true,
    useAnimationWhenRefresh: false,
    debug: false,
    layouts: [
        {
            label: 'Center',
            layoutName: 'center',
            from: 'top',
            layoutClassName: 'seeks-layout-center',
            defaultExpandHolderPosition: 'hide',
            defaultJunctionPoint: 'border'
        }
    ]
};

const graphRef = ref<RelationGraphComponent | null>(null);

onMounted(() => {
    showGraph();
});

const showGraph = async() => {
    const __graph_json_data: RGJsonData = staticJsonData;
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};
</script>

<style scoped>
.c-btn-open-close .my-expand-button {
  background-color: red;
  font-size: 12px;
  border-radius: 3px;
}
</style>
```

### 📂 example-data

#### `systems.json`

```json
{
  "rootId": "2",
  "nodes": [
    {
      "id": "2",
      "text": "relation-graph",
      "data": null
    },
    {
      "id": "3",
      "text": "CH2 TTN",
      "data": null
    },
    {
      "id": "4",
      "text": "CH1 AlCu",
      "data": null
    },
    {
      "id": "5",
      "text": "MainFrame",
      "data": null
    },
    {
      "id": "6",
      "text": "TestMainSys",
      "expanded": false,
      "data": null
    },
    {
      "id": "7",
      "text": "汽车部件",
      "data": null
    },
    {
      "id": "8",
      "text": "汽车工艺",
      "data": null
    },
    {
      "id": "9",
      "text": "过程质检",
      "data": null
    },
    {
      "id": "10",
      "text": "卓立制造",
      "data": null
    },
    {
      "id": "11",
      "text": "压电开关",
      "data": null
    },
    {
      "id": "12",
      "text": "电子产品",
      "data": null
    },
    {
      "id": "13",
      "text": "集成电路",
      "data": null
    },
    {
      "id": "14",
      "text": "ArHigh",
      "data": null
    },
    {
      "id": "15",
      "text": "ArLow",
      "data": null
    },
    {
      "id": "16",
      "text": "ShowerHead",
      "data": null
    },
    {
      "id": "17",
      "text": "CrypoPump",
      "data": null
    },
    {
      "id": "18",
      "text": "DryPump",
      "data": null
    },
    {
      "id": "19",
      "text": "Ti Target",
      "data": null
    },
    {
      "id": "20",
      "text": "N2",
      "data": null
    },
    {
      "id": "21",
      "text": "Shutter",
      "data": null
    },
    {
      "id": "22",
      "text": "Cool Chbr",
      "data": null
    },
    {
      "id": "23",
      "text": "Transfer Chbr",
      "data": null
    },
    {
      "id": "24",
      "text": "Alignment Unit",
      "data": null
    },
    {
      "id": "25",
      "text": "齿轮箱",
      "data": null
    },
    {
      "id": "26",
      "text": "车门内部人工涂蜡",
      "data": null
    },
    {
      "id": "27",
      "text": "原材料检验",
      "data": null
    },
    {
      "id": "28",
      "text": "地板RTV硅胶密封",
      "data": null
    },
    {
      "id": "29",
      "text": "热保护焊接",
      "data": null
    },
    {
      "id": "30",
      "text": "电热管导线焊接",
      "data": null
    },
    {
      "id": "31",
      "text": "温控器安装",
      "data": null
    },
    {
      "id": "32",
      "text": "蒸汽硅胶座配装",
      "data": null
    },
    {
      "id": "33",
      "text": "温度调试",
      "data": null
    },
    {
      "id": "34",
      "text": "压电开关的模型塑料外壳",
      "data": null
    },
    {
      "id": "35",
      "text": "安装开关",
      "data": null
    },
    {
      "id": "36",
      "text": "ASIC IC",
      "data": null
    },
    {
      "id": "37",
      "text": "SENSOR",
      "data": null
    },
    {
      "id": "38",
      "text": "CON",
      "data": null
    },
    {
      "id": "39",
      "text": "Flash",
      "data": null
    },
    {
      "id": "40",
      "text": "Flite",
      "data": null
    }
  ],
  "lines": [
    {
      "from": "2",
      "to": "5",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "6",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "3",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "4",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "21",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "20",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "19",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "18",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "17",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "16",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "15",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "14",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "24",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "23",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "22",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "13",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "12",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "11",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "10",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "9",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "8",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "7",
      "text": "子系统",
      "data": null
    },
    {
      "from": "7",
      "to": "25",
      "text": "子系统",
      "data": null
    },
    {
      "from": "8",
      "to": "26",
      "text": "子系统",
      "data": null
    },
    {
      "from": "9",
      "to": "27",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "33",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "32",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "31",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "30",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "29",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "28",
      "text": "子系统",
      "data": null
    },
    {
      "from": "11",
      "to": "35",
      "text": "子系统",
      "data": null
    },
    {
      "from": "11",
      "to": "34",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "39",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "38",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "37",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "36",
      "text": "子系统",
      "data": null
    },
    {
      "from": "13",
      "to": "40",
      "text": "子系统",
      "data": null
    }
  ]
}
```

## React 版本

### `expand-holder-slot.tsx`

```javascript
import React, { useEffect, useRef } from 'react';
import RelationGraph, {
  RGJsonData,
  RGOptions,
  RGNode,
  RGUserEvent,
  RGLine,
  RGLink,
  RGNodeSlotProps,
  RelationGraphComponent,
  RGNodeExpandHolderProps
} from 'relation-graph-react';
import staticJsonData from './systems.json';
import './expand-holder-slot.scss';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);

  useEffect(() => {
    showSeeksGraph();
  }, []);

  const showSeeksGraph = async () => {
    const __graph_json_data: RGJsonData = staticJsonData;
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance?.setJsonData(__graph_json_data);
    await graphInstance?.moveToCenter();
    await graphInstance?.zoomToFit();
  };

  const NodeExpandHolder: React.FC<RGNodeExpandHolderProps> = ({ expandHolderPosition, expandButtonClass, color, expandOrCollapseNode }) => {
    return (
      <div className={`c-expand-positon-${expandHolderPosition} c-btn-open-close`}>
        <span className="my-expand-button" onClick={expandOrCollapseNode} onTouchEnd={expandOrCollapseNode}>
          {expandButtonClass === 'c-collapsed' ? (
            <div>
              X
            </div>
          ) : (
            <div>
              O
            </div>
          )}
        </span>
      </div>
    );
  };

  const graphOptions: RGOptions = {
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    defaultExpandHolderPosition: 'right',
    useAnimationWhenExpanded: true,
    reLayoutWhenExpandedOrCollapsed: true,
    useAnimationWhenRefresh: false,
    debug: false,
    layout: {
      layoutName: 'center',
      from: 'top'
    }
  };

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions} expandHolderSlot={NodeExpandHolder} />
      </div>
    </div>
  );
};

export default MyComponent;
```

### `expand-holder-slot.scss`

```scss
.c-btn-open-close .my-expand-button {
  background-color: red;
  font-size: 12px;
  border-radius: 3px;
}
```

### `systems.json`

```json
{
  "rootId": "2",
  "nodes": [
    {
      "id": "2",
      "text": "relation-graph",
      "data": null
    },
    {
      "id": "3",
      "text": "CH2 TTN",
      "data": null
    },
    {
      "id": "4",
      "text": "CH1 AlCu",
      "data": null
    },
    {
      "id": "5",
      "text": "MainFrame",
      "data": null
    },
    {
      "id": "6",
      "text": "TestMainSys",
      "expanded": false,
      "data": null
    },
    {
      "id": "7",
      "text": "汽车部件",
      "data": null
    },
    {
      "id": "8",
      "text": "汽车工艺",
      "data": null
    },
    {
      "id": "9",
      "text": "过程质检",
      "data": null
    },
    {
      "id": "10",
      "text": "卓立制造",
      "data": null
    },
    {
      "id": "11",
      "text": "压电开关",
      "data": null
    },
    {
      "id": "12",
      "text": "电子产品",
      "data": null
    },
    {
      "id": "13",
      "text": "集成电路",
      "data": null
    },
    {
      "id": "14",
      "text": "ArHigh",
      "data": null
    },
    {
      "id": "15",
      "text": "ArLow",
      "data": null
    },
    {
      "id": "16",
      "text": "ShowerHead",
      "data": null
    },
    {
      "id": "17",
      "text": "CrypoPump",
      "data": null
    },
    {
      "id": "18",
      "text": "DryPump",
      "data": null
    },
    {
      "id": "19",
      "text": "Ti Target",
      "data": null
    },
    {
      "id": "20",
      "text": "N2",
      "data": null
    },
    {
      "id": "21",
      "text": "Shutter",
      "data": null
    },
    {
      "id": "22",
      "text": "Cool Chbr",
      "data": null
    },
    {
      "id": "23",
      "text": "Transfer Chbr",
      "data": null
    },
    {
      "id": "24",
      "text": "Alignment Unit",
      "data": null
    },
    {
      "id": "25",
      "text": "齿轮箱",
      "data": null
    },
    {
      "id": "26",
      "text": "车门内部人工涂蜡",
      "data": null
    },
    {
      "id": "27",
      "text": "原材料检验",
      "data": null
    },
    {
      "id": "28",
      "text": "地板RTV硅胶密封",
      "data": null
    },
    {
      "id": "29",
      "text": "热保护焊接",
      "data": null
    },
    {
      "id": "30",
      "text": "电热管导线焊接",
      "data": null
    },
    {
      "id": "31",
      "text": "温控器安装",
      "data": null
    },
    {
      "id": "32",
      "text": "蒸汽硅胶座配装",
      "data": null
    },
    {
      "id": "33",
      "text": "温度调试",
      "data": null
    },
    {
      "id": "34",
      "text": "压电开关的模型塑料外壳",
      "data": null
    },
    {
      "id": "35",
      "text": "安装开关",
      "data": null
    },
    {
      "id": "36",
      "text": "ASIC IC",
      "data": null
    },
    {
      "id": "37",
      "text": "SENSOR",
      "data": null
    },
    {
      "id": "38",
      "text": "CON",
      "data": null
    },
    {
      "id": "39",
      "text": "Flash",
      "data": null
    },
    {
      "id": "40",
      "text": "Flite",
      "data": null
    }
  ],
  "lines": [
    {
      "from": "2",
      "to": "5",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "6",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "3",
      "text": "子系统",
      "data": null
    },
    {
      "from": "2",
      "to": "4",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "21",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "20",
      "text": "子系统",
      "data": null
    },
    {
      "from": "3",
      "to": "19",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "18",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "17",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "16",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "15",
      "text": "子系统",
      "data": null
    },
    {
      "from": "4",
      "to": "14",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "24",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "23",
      "text": "子系统",
      "data": null
    },
    {
      "from": "5",
      "to": "22",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "13",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "12",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "11",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "10",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "9",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "8",
      "text": "子系统",
      "data": null
    },
    {
      "from": "6",
      "to": "7",
      "text": "子系统",
      "data": null
    },
    {
      "from": "7",
      "to": "25",
      "text": "子系统",
      "data": null
    },
    {
      "from": "8",
      "to": "26",
      "text": "子系统",
      "data": null
    },
    {
      "from": "9",
      "to": "27",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "33",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "32",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "31",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "30",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "29",
      "text": "子系统",
      "data": null
    },
    {
      "from": "10",
      "to": "28",
      "text": "子系统",
      "data": null
    },
    {
      "from": "11",
      "to": "35",
      "text": "子系统",
      "data": null
    },
    {
      "from": "11",
      "to": "34",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "39",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "38",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "37",
      "text": "子系统",
      "data": null
    },
    {
      "from": "12",
      "to": "36",
      "text": "子系统",
      "data": null
    },
    {
      "from": "13",
      "to": "40",
      "text": "子系统",
      "data": null
    }
  ]
}
```
