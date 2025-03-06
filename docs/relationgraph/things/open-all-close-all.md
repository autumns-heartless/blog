# 展开/关闭所有

## Vue2 版本

### `open-all-close-all.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
      >
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">操作：</div>
            <el-button type="primary" :disabled="playing" size="mini" @click="openAll">依次展开所有</el-button>
            <el-button type="primary" :disabled="playing" size="mini" @click="closeAll">依次关闭所有</el-button>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";

const graphOptions = {
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  defaultExpandHolderPosition: "right",
  useAnimationWhenExpanded: true,
  useAnimationWhenRefresh: false,
  reLayoutWhenExpandedOrCollapsed: true,
  debug: false,
  layout:
    {
      label: '中心',
      layoutName: 'center',
      from: 'top',
      layoutClassName: 'seeks-layout-center'
    }
};
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      playing: false,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {"rootId":"2","nodes":[{"id":"2","text":"ALTXX","data":null},{"id":"3","text":"CH2 TTN","data":null},{"id":"4","text":"CH1 AlCu","data":null},{"id":"5","text":"MainFrame","data":null},{"id":"6","text":"TestMainSys","data":null},{"id":"7","text":"汽车部件","data":null},{"id":"8","text":"汽车工艺","data":null},{"id":"9","text":"过程质检","data":null},{"id":"10","text":"卓立制造","data":null},{"id":"11","text":"压电开关","data":null},{"id":"12","text":"电子产品","data":null},{"id":"13","text":"集成电路","data":null},{"id":"14","text":"ArHigh","data":null},{"id":"15","text":"ArLow","data":null},{"id":"16","text":"ShowerHead","data":null},{"id":"17","text":"CrypoPump","data":null},{"id":"18","text":"DryPump","data":null},{"id":"19","text":"Ti Target","data":null},{"id":"20","text":"N2","data":null},{"id":"21","text":"Shutter","data":null},{"id":"22","text":"Cool Chbr","data":null},{"id":"23","text":"Transfer Chbr","data":null},{"id":"24","text":"Alignment Unit","data":null},{"id":"25","text":"齿轮箱","data":null},{"id":"26","text":"车门内部人工涂蜡","data":null},{"id":"27","text":"原材料检验","data":null},{"id":"28","text":"地板RTV硅胶密封","data":null},{"id":"29","text":"热保护焊接","data":null},{"id":"30","text":"电热管导线焊接","data":null},{"id":"31","text":"温控器安装","data":null},{"id":"32","text":"蒸汽硅胶座配装","data":null},{"id":"33","text":"温度调试","data":null},{"id":"34","text":"压电开关的模型塑料外壳","data":null},{"id":"35","text":"安装开关","data":null},{"id":"36","text":"ASIC IC","data":null},{"id":"37","text":"SENSOR","data":null},{"id":"38","text":"CON","data":null},{"id":"39","text":"Flash","data":null},{"id":"40","text":"Flite","data":null}],"lines":[{"from":"2","to":"5","text":"子系统","data":null},{"from":"2","to":"6","text":"子系统","data":null},{"from":"2","to":"3","text":"子系统","data":null},{"from":"2","to":"4","text":"子系统","data":null},{"from":"3","to":"21","text":"子系统","data":null},{"from":"3","to":"20","text":"子系统","data":null},{"from":"3","to":"19","text":"子系统","data":null},{"from":"4","to":"18","text":"子系统","data":null},{"from":"4","to":"17","text":"子系统","data":null},{"from":"4","to":"16","text":"子系统","data":null},{"from":"4","to":"15","text":"子系统","data":null},{"from":"4","to":"14","text":"子系统","data":null},{"from":"5","to":"24","text":"子系统","data":null},{"from":"5","to":"23","text":"子系统","data":null},{"from":"5","to":"22","text":"子系统","data":null},{"from":"6","to":"13","text":"子系统","data":null},{"from":"6","to":"12","text":"子系统","data":null},{"from":"6","to":"11","text":"子系统","data":null},{"from":"6","to":"10","text":"子系统","data":null},{"from":"6","to":"9","text":"子系统","data":null},{"from":"6","to":"8","text":"子系统","data":null},{"from":"6","to":"7","text":"子系统","data":null},{"from":"7","to":"25","text":"子系统","data":null},{"from":"8","to":"26","text":"子系统","data":null},{"from":"9","to":"27","text":"子系统","data":null},{"from":"10","to":"33","text":"子系统","data":null},{"from":"10","to":"32","text":"子系统","data":null},{"from":"10","to":"31","text":"子系统","data":null},{"from":"10","to":"30","text":"子系统","data":null},{"from":"10","to":"29","text":"子系统","data":null},{"from":"10","to":"28","text":"子系统","data":null},{"from":"11","to":"35","text":"子系统","data":null},{"from":"11","to":"34","text":"子系统","data":null},{"from":"12","to":"39","text":"子系统","data":null},{"from":"12","to":"38","text":"子系统","data":null},{"from":"12","to":"37","text":"子系统","data":null},{"from":"12","to":"36","text":"子系统","data":null},{"from":"13","to":"40","text":"子系统","data":null}]}

      const graphRef = this.$refs.graphRef
      graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
        // this.expandNode(graphInstance.graphData.rootNode);
        this.openAll();
      });
    },
    async deepExpandNode(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.expandNode(node);
      // await sleep(500);
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        await this.deepExpandNode(cnode);
      }
    },
    async openAll() {
      this.playing = true;
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.graphData.nodes.forEach(n => {
        if (n.lot.childs.length > 0) {
          n.expanded = false;
        }
      });
      await this.deepExpandNode(graphInstance.graphData.rootNode);
      this.playing = false;
    },
    async closeAll() {
      this.playing = true;
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.graphData.nodes.forEach(n => {
        if (n.lot.childs.length > 0) {
          n.expanded = true;
        }
      });
      await this.deepCloseNode(graphInstance.graphData.rootNode);
      this.playing = false;
    },
    async deepCloseNode(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      // await sleep(500);
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        await this.deepCloseNode(cnode);
      }
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.collapseNode(node);
    }
  },
};
const sleep = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
</script>

<style lang="scss" scoped>
.c-my-panel {
  position: absolute;
  left: 10px;
  top: 10px;
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

### `open-all-close-all.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph

          ref="graphRef"
          :options="graphOptions"
      >
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">Actions:</div>
            <el-button type="primary" :disabled="playing" size="small" @click="openAll">Expand All</el-button>
            <el-button type="primary" :disabled="playing" size="small" @click="closeAll">Collapse All</el-button>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
  'backgrounImageNoRepeat': true,
  'moveToCenterWhenRefresh': true,
  'zoomToFitWhenRefresh': true,
  "defaultExpandHolderPosition": "right",
  "useAnimationWhenExpanded": true,
  useAnimationWhenRefresh: false,
  reLayoutWhenExpandedOrCollapsed: true,
  debug: false,
  'layouts': [
    {
      'label': 'Center',
      'layoutName': 'center',
      'from': 'top',
      'layoutClassName': 'seeks-layout-center'
    }
  ]
};

const playing = ref(false);
const graphRef = ref<RelationGraphComponent | null>(null);

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        "rootId": "2",
        "nodes": [
            {"id": "2", "text": "ALTXX", "data": null},
            {"id": "3", "text": "CH2 TTN", "data": null},
            {"id": "4", "text": "CH1 AlCu", "data": null},
            {"id": "5", "text": "MainFrame", "data": null},
            {"id": "6", "text": "TestMainSys", "data": null},
            {"id": "7", "text": "Automotive Parts", "data": null},
            {"id": "8", "text": "Automotive Process", "data": null},
            {"id": "9", "text": "Process Quality Inspection", "data": null},
            {"id": "10", "text": "Zhuoli Manufacturing", "data": null},
            {"id": "11", "text": "Piezoelectric Switch", "data": null},
            {"id": "12", "text": "Electronic Products", "data": null},
            {"id": "13", "text": "Integrated Circuit", "data": null},
            {"id": "14", "text": "ArHigh", "data": null},
            {"id": "15", "text": "ArLow", "data": null},
            {"id": "16", "text": "ShowerHead", "data": null},
            {"id": "17", "text": "CrypoPump", "data": null},
            {"id": "18", "text": "DryPump", "data": null},
            {"id": "19", "text": "Ti Target", "data": null},
            {"id": "20", "text": "N2", "data": null},
            {"id": "21", "text": "Shutter", "data": null},
            {"id": "22", "text": "Cool Chbr", "data": null},
            {"id": "23", "text": "Transfer Chbr", "data": null},
            {"id": "24", "text": "Alignment Unit", "data": null},
            {"id": "25", "text": "Gearbox", "data": null},
            {"id": "26", "text": "Car Door Interior Waxing", "data": null},
            {"id": "27", "text": "Raw Material Inspection", "data": null},
            {"id": "28", "text": "Floor RTV Silicone Sealing", "data": null},
            {"id": "29", "text": "Thermal Protection Welding", "data": null},
            {"id": "30", "text": "Electric Heating Tube Wire Welding", "data": null},
            {"id": "31", "text": "Temperature Controller Installation", "data": null},
            {"id": "32", "text": "Steam Silicone Seat Assembly", "data": null},
            {"id": "33", "text": "Temperature Debugging", "data": null},
            {"id": "34", "text": "Plastic Shell of Piezoelectric Switch Model", "data": null},
            {"id": "35", "text": "Switch Installation", "data": null},
            {"id": "36", "text": "ASIC IC", "data": null},
            {"id": "37", "text": "SENSOR", "data": null},
            {"id": "38", "text": "CON", "data": null},
            {"id": "39", "text": "Flash", "data": null},
            {"id": "40", "text": "Flite", "data": null}
        ],
        "lines": [
            {"from": "2", "to": "5", "text": "Subsystem", "data": null},
            {"from": "2", "to": "6", "text": "Subsystem", "data": null},
            {"from": "2", "to": "3", "text": "Subsystem", "data": null},
            {"from": "2", "to": "4", "text": "Subsystem", "data": null},
            {"from": "3", "to": "21", "text": "Subsystem", "data": null},
            {"from": "3", "to": "20", "text": "Subsystem", "data": null},
            {"from": "3", "to": "19", "text": "Subsystem", "data": null},
            {"from": "4", "to": "18", "text": "Subsystem", "data": null},
            {"from": "4", "to": "17", "text": "Subsystem", "data": null},
            {"from": "4", "to": "16", "text": "Subsystem", "data": null},
            {"from": "4", "to": "15", "text": "Subsystem", "data": null},
            {"from": "4", "to": "14", "text": "Subsystem", "data": null},
            {"from": "5", "to": "24", "text": "Subsystem", "data": null},
            {"from": "5", "to": "23", "text": "Subsystem", "data": null},
            {"from": "5", "to": "22", "text": "Subsystem", "data": null},
            {"from": "6", "to": "13", "text": "Subsystem", "data": null},
            {"from": "6", "to": "12", "text": "Subsystem", "data": null},
            {"from": "6", "to": "11", "text": "Subsystem", "data": null},
            {"from": "6", "to": "10", "text": "Subsystem", "data": null},
            {"from": "6", "to": "9", "text": "Subsystem", "data": null},
            {"from": "6", "to": "8", "text": "Subsystem", "data": null},
            {"from": "6", "to": "7", "text": "Subsystem", "data": null},
            {"from": "7", "to": "25", "text": "Subsystem", "data": null},
            {"from": "8", "to": "26", "text": "Subsystem", "data": null},
            {"from": "9", "to": "27", "text": "Subsystem", "data": null},
            {"from": "10", "to": "33", "text": "Subsystem", "data": null},
            {"from": "10", "to": "32", "text": "Subsystem", "data": null},
            {"from": "10", "to": "31", "text": "Subsystem", "data": null},
            {"from": "10", "to": "30", "text": "Subsystem", "data": null},
            {"from": "10", "to": "29", "text": "Subsystem", "data": null},
            {"from": "10", "to": "28", "text": "Subsystem", "data": null},
            {"from": "11", "to": "35", "text": "Subsystem", "data": null},
            {"from": "11", "to": "34", "text": "Subsystem", "data": null},
            {"from": "12", "to": "39", "text": "Subsystem", "data": null},
            {"from": "12", "to": "38", "text": "Subsystem", "data": null},
            {"from": "12", "to": "37", "text": "Subsystem", "data": null},
            {"from": "12", "to": "36", "text": "Subsystem", "data": null},
            {"from": "13", "to": "40", "text": "Subsystem", "data": null}
        ]
    };

    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        await graphInstance.moveToCenter();
        await graphInstance.zoomToFit();
        await openAll();
    }
};

const deepExpandNode = async (node: RGNode) => {
    if (node.lot.childs.length === 0) {
        return;
    }
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.expandNode(node);
        for (let i = 0; i < node.lot.childs.length; i++) {
            const cnode = node.lot.childs[i];
            await deepExpandNode(cnode);
        }
    }
};

const openAll = async () => {
    playing.value = true;
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.graphData.nodes.forEach(n => {
            if (n.lot.childs.length > 0) {
                n.expanded = false;
            }
        });
        await deepExpandNode(graphInstance.graphData.rootNode);
    }
    playing.value = false;
};

const deepCloseNode = async (node: RGNode) => {
    if (node.lot.childs.length === 0) {
        return;
    }
    for (let i = 0; i < node.lot.childs.length; i++) {
        const cnode = node.lot.childs[i];
        await deepCloseNode(cnode);
    }
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.collapseNode(node);
    }
};

const closeAll = async () => {
    playing.value = true;
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.graphData.nodes.forEach(n => {
            if (n.lot.childs.length > 0) {
                n.expanded = true;
            }
        });
        await deepCloseNode(graphInstance.graphData.rootNode);
    }
    playing.value = false;
};

onMounted(() => {
    showGraph();
});
const sleep = async (time: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
</script>

<style lang="scss" scoped>
.c-my-panel {
  position: absolute;
  left: 10px;
  top: 10px;
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

### `open-all-close-all.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph from 'relation-graph-react';
import { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import './open-all-close-all.scss';
import {MyButton, MyLinkButton} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const graphOptions: RGOptions = {
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    defaultExpandHolderPosition: "right",
    useAnimationWhenExpanded: true,
    useAnimationWhenRefresh: false,
    reLayoutWhenExpandedOrCollapsed: true,
    debug: false,
    layout: {
      'layoutName': 'center',
      'from': 'top'
    }
  };

  const [playing, setPlaying] = useState(false);
  const graphRef = useRef<RelationGraphComponent | null>(null);

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      "rootId": "2",
      "nodes": [
        { "id": "2", "text": "ALTXX" },
        { "id": "3", "text": "CH2 TTN" },
        { "id": "4", "text": "CH1 AlCu" },
        { "id": "5", "text": "MainFrame" },
        { "id": "6", "text": "TestMainSys" },
        { "id": "7", "text": "Automotive Parts" },
        { "id": "8", "text": "Automotive Process" },
        { "id": "9", "text": "Process Quality Inspection" },
        { "id": "10", "text": "Zhuoli Manufacturing" },
        { "id": "11", "text": "Piezoelectric Switch" },
        { "id": "12", "text": "Electronic Products" },
        { "id": "13", "text": "Integrated Circuit" },
        { "id": "14", "text": "ArHigh" },
        { "id": "15", "text": "ArLow" },
        { "id": "16", "text": "ShowerHead" },
        { "id": "17", "text": "CrypoPump" },
        { "id": "18", "text": "DryPump" },
        { "id": "19", "text": "Ti Target" },
        { "id": "20", "text": "N2" },
        { "id": "21", "text": "Shutter" },
        { "id": "22", "text": "Cool Chbr" },
        { "id": "23", "text": "Transfer Chbr" },
        { "id": "24", "text": "Alignment Unit" },
        { "id": "25", "text": "Gearbox" },
        { "id": "26", "text": "Car Door Interior Waxing" },
        { "id": "27", "text": "Raw Material Inspection" },
        { "id": "28", "text": "Floor RTV Silicone Sealing" },
        { "id": "29", "text": "Thermal Protection Welding" },
        { "id": "30", "text": "Electric Heating Tube Wire Welding" },
        { "id": "31", "text": "Temperature Controller Installation" },
        { "id": "32", "text": "Steam Silicone Seat Assembly" },
        { "id": "33", "text": "Temperature Debugging" },
        { "id": "34", "text": "Plastic Shell of Piezoelectric Switch Model" },
        { "id": "35", "text": "Switch Installation" },
        { "id": "36", "text": "ASIC IC" },
        { "id": "37", "text": "SENSOR" },
        { "id": "38", "text": "CON" },
        { "id": "39", "text": "Flash" },
        { "id": "40", "text": "Flite" }
      ],
      "lines": [
        { "from": "2", "to": "5", "text": "Subsystem" },
        { "from": "2", "to": "6", "text": "Subsystem" },
        { "from": "2", "to": "3", "text": "Subsystem" },
        { "from": "2", "to": "4", "text": "Subsystem" },
        { "from": "3", "to": "21", "text": "Subsystem" },
        { "from": "3", "to": "20", "text": "Subsystem" },
        { "from": "3", "to": "19", "text": "Subsystem" },
        { "from": "4", "to": "18", "text": "Subsystem" },
        { "from": "4", "to": "17", "text": "Subsystem" },
        { "from": "4", "to": "16", "text": "Subsystem" },
        { "from": "4", "to": "15", "text": "Subsystem" },
        { "from": "4", "to": "14", "text": "Subsystem" },
        { "from": "5", "to": "24", "text": "Subsystem" },
        { "from": "5", "to": "23", "text": "Subsystem" },
        { "from": "5", "to": "22", "text": "Subsystem" },
        { "from": "6", "to": "13", "text": "Subsystem" },
        { "from": "6", "to": "12", "text": "Subsystem" },
        { "from": "6", "to": "11", "text": "Subsystem" },
        { "from": "6", "to": "10", "text": "Subsystem" },
        { "from": "6", "to": "9", "text": "Subsystem" },
        { "from": "6", "to": "8", "text": "Subsystem" },
        { "from": "6", "to": "7", "text": "Subsystem" },
        { "from": "7", "to": "25", "text": "Subsystem" },
        { "from": "8", "to": "26", "text": "Subsystem" },
        { "from": "9", "to": "27", "text": "Subsystem" },
        { "from": "10", "to": "33", "text": "Subsystem" },
        { "from": "10", "to": "32", "text": "Subsystem" },
        { "from": "10", "to": "31", "text": "Subsystem" },
        { "from": "10", "to": "30", "text": "Subsystem" },
        { "from": "10", "to": "29", "text": "Subsystem" },
        { "from": "10", "to": "28", "text": "Subsystem" },
        { "from": "11", "to": "35", "text": "Subsystem" },
        { "from": "11", "to": "34", "text": "Subsystem" },
        { "from": "12", "to": "39", "text": "Subsystem" },
        { "from": "12", "to": "38", "text": "Subsystem" },
        { "from": "12", "to": "37", "text": "Subsystem" },
        { "from": "12", "to": "36", "text": "Subsystem" },
        { "from": "13", "to": "40", "text": "Subsystem" }
      ]
    };

    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data);
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
      await openAll();
    }
  };

  const deepExpandNode = async (node: RGNode) => {
    if (node.lot.childs.length === 0) {
      return;
    }
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      await graphInstance.expandNode(node);
      for (let i = 0; i < node.lot.childs.length; i++) {
        const cnode = node.lot.childs[i];
        await deepExpandNode(cnode);
      }
    }
  };

  const openAll = async () => {
    setPlaying(true);
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      graphInstance.graphData.nodes.forEach(n => {
        if (n.lot.childs.length > 0) {
          n.expanded = false;
        }
      });
      await deepExpandNode(graphInstance.graphData.rootNode);
    }
    setPlaying(false);
  };

  const deepCloseNode = async (node: RGNode) => {
    if (node.lot.childs.length === 0) {
      return;
    }
    for (let i = 0; i < node.lot.childs.length; i++) {
      const cnode = node.lot.childs[i];
      await deepCloseNode(cnode);
    }
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      await graphInstance.collapseNode(node);
    }
  };

  const closeAll = async () => {
    setPlaying(true);
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      graphInstance.graphData.nodes.forEach(n => {
        if (n.lot.childs.length > 0) {
          n.expanded = true;
        }
      });
      await deepCloseNode(graphInstance.graphData.rootNode);
    }
    setPlaying(false);
  };

  useEffect(() => {
    showGraph();
  }, []);

  const sleep = async (time: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <div className="c-my-panel w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          <div className="c-option-name">Actions:</div>
          <MyButton
            disabled={playing}
            onClick={openAll}
          >
            Expand All
          </MyButton>
          <MyButton
            disabled={playing}
            onClick={closeAll}
          >
            Collapse All
          </MyButton>
        </div>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `open-all-close-all.scss`

```scss
.c-my-panel {
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
```

### 📂 RGDemoComponents

#### `MyUIComponents.tsx`

```javascript
import React from "react";

export interface MySelectorProps {
  small?: boolean
  currentValue: string|number
  data:{value: string|number, text:string}[]
  onChange: (newValue:string|number, label:string) => void
}
export const MySelector:React.FC<MySelectorProps> = ({small, data, onChange, currentValue}) => {
  return (
    <div className="flex flex-wrap justify-center rounded-lg border border-gray-900 overflow-hidden">
      {
        data.map(item =>
          <div key={item.value}
               className={`border-r w-auto text-xs cursor-pointer whitespace-nowrap ${currentValue === item.value && 'bg-blue-500 text-white'} ${small?' px-2 h-6 leading-6':'h-8 px-3 leading-8'}`}
               onClick={() => {onChange(item.value, item.text);}}
          >
          {item.text}
        </div>)
      }
    </div>
  );
};
export interface MySwitchProps {
  currentValue: boolean
  onChange: (newValue:boolean) => void
}
export const MySwitch:React.FC<MySwitchProps> = ({onChange, currentValue}) => {
  return (
    <div className={`w-14 flex rounded-full border p-0.5 ${currentValue ? 'justify-end border-blue-500' : 'justify-start border-gray-500'}`}>
      <div
        className={`w-8 h-5 leading-8 rounded-full w-auto px-3 text-xs cursor-pointer whitespace-nowrap ${currentValue ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => {onChange(!currentValue);}}>
      </div>
    </div>
  );
};
export interface MySliderProps {
  min: number
  max: number
  step: number
  currentValue: number
  onChange: (newValue:number) => void
}
export const MySlider:React.FC<MySliderProps> = ({min, max, step, currentValue, onChange}) => {
  return (
    <div>
      <input
        type="range"
        className="w-72"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => { onChange(parseFloat(e.target.value))}}
      />
    </div>
  );
};

export interface MyRangeSliderProps {
  min: number
  max: number
  step: number
  currentValue: [number, number]
  onChange: (newValue:[number, number]) => void
}
export const MyRangeSlider:React.FC<MyRangeSliderProps> = ({min, max, step, currentValue, onChange}) => {
  return (
    <div className="w-72">
      <div>Min:</div>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={currentValue[0]}
        onChange={(e) => { if (parseFloat(e.target.value) < currentValue[1]) onChange([parseFloat(e.target.value), currentValue[1]])}}
      />
      <div>Max:</div>
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={currentValue[1]}
        onChange={(e) => { if (parseFloat(e.target.value) > currentValue[0]) onChange([currentValue[0], parseFloat(e.target.value)])}}
      />
    </div>
  );
};
export interface MyButtonProps {
  onClick: () => void
  disabled?: boolean
}
export const MyButton:React.FC<MyButtonProps> = ({children, onClick, disabled}) => {
  return (
    <button className={`mr-2 px-2 py-1 rounded ${disabled===true ? 'bg-gray-300 text-black cursor-not-allowed':'bg-blue-500 hover:bg-blue-700 text-white'}`}
            onClick={()=>{onClick();}}>{children}</button>
  );
};
export interface MyLinkButtonProps {
  onClick: () => void
}
export const MyLinkButton:React.FC<MyLinkButtonProps> = ({children, onClick}) => {
  return (
    <div className="text-blue-600 cursor-pointer underline decoration-1" onClick={()=>{onClick();}}>
      {children}
    </div>
  );
};
export interface MyCheckBoxProps {
  currentValue: string|number
  data:{value: string|number, text:string}[]
  onChange: (newValue:string|number, label:string) => void
}
export const MyCheckBox:React.FC<MyCheckBoxProps> = ({data, onChange, currentValue}) => {
  // console.log(data);
  return (
    <div className="flex gap-2 flex-wrap">
      {
        data.map(thisItem =>
          <div
            key={thisItem.value}
            className={`px-1 py-0.5 flex justify-center place-items-center rounded-sm text-sm cursor-pointer  hover:bg-gray-300 ${currentValue === thisItem.value ? 'text-blue-600':'text-gray-500'}`}
            onClick={()=>{onChange(thisItem.value, thisItem.text);}}
          >
            <div className={`w-4 h-4 mr-1 rounded-full ${currentValue === thisItem.value ? 'border border-blue-500 bg-blue-500 text-blue-600':'border border-gray-500 text-gray-500'}`}></div>
            {thisItem.text}
          </div>
        )
      }
    </div>
  );
};
export interface CheckboxOption {
  value: string | number;
  text: string;
}

export interface MyMultiCheckBoxProps {
  currentValue: (string | number)[];
  checkboxOptions: CheckboxOption[];
  onChange: (newValue: (string | number)[]) => void;
}
export const MyMultiCheckBox:React.FC<MyMultiCheckBoxProps> = ({data, onChange, currentValue}) => {
  // console.log(data);
  const onClickItem = (item: string | number) => {
    const newValue = currentValue.includes(item)
      ? currentValue.filter((value) => value !== item)
      : [...currentValue, item];
    onChange(newValue);
  };
  return (
    <div className="flex gap-2 flex-wrap">
      {
        data.map(thisItem =>
          <div
            key={thisItem.value}
            className={`px-1 py-0.5 flex justify-center place-items-center rounded-sm text-sm cursor-pointer  hover:bg-gray-300 ${currentValue === thisItem.value ? 'text-blue-600':'text-gray-500'}`}
            onClick={()=>{onClickItem(thisItem.value);}}
          >
            <div className={`w-4 h-4 mr-1 rounded-full ${currentValue.includes(thisItem.value) ? 'border border-blue-500 bg-blue-500 text-blue-600':'border border-gray-500 text-gray-500'}`}></div>
            {thisItem.text}
          </div>
        )
      }
    </div>
  );
};
export const ElMessage = (messageObject) => {
  console.warn(messageObject);
}
export const ElNotification = (messageObject) => {
  console.warn(messageObject);
}
```
