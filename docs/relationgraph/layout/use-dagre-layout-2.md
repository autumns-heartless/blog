# 使用 Dagre 布局算法(仅位置)

## Vue2 版本

### `use-dagre-layout-2.vue`

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
            <div class="c-option-name">样例数据：</div>
            <el-radio-group v-model="dataId" size="mini" @change="showGraph">
              <el-radio-button label="1">样例数据1</el-radio-button>
              <el-radio-button label="2">样例数据2</el-radio-button>
            </el-radio-group>
            <div class="c-option-name" style="line-height: 25px;padding:10px;">
              此布局使用到了第三方布局算法：Dagre，线条以及其他功能依然由relation-graph提供。
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import dagre from 'dagre';

export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      dataId: '2',
      isShowCodePanel: false,
      graphOptions: {
        debug: false,
        lineUseTextPath: true,
        layout: {
          layoutName: 'fixed',
          layoutDirection: 'v'
        },
        defaultNodeShape:  1,
        defaultLineShape:  4,
        defaultJunctionPoint: 'tb',
        defaultNodeBorderWidth: 0,
        defaultPolyLineRadius: 20,
        defaultNodeWidth: 100,
        defaultNodeHeight: 30,
        defaultLineColor: 'rgba(0, 186, 189, 1)',
        defaultNodeColor: 'rgba(0, 206, 209, 1)'
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    async showGraph() {
      let __graph_json_data = {};
      if (this.dataId === '1') { // 少量演示数据
        __graph_json_data = {"rootId":"root","nodes":[{"id":"root","text":"主题"},{"id":"N2","text":"New-N2"},{"id":"N3","text":"New-N3"},{"id":"N4","text":"New-N4"},{"id":"N5","text":"New-N5"},{"id":"N6","text":"New-N6"},{"id":"N7","text":"New-N7"},{"id":"N8","text":"New-N8"}],"lines":[{"from":"root","to":"N2","text":"新连线1"},{"from":"root","to":"N3","text":"新连线2"},{"from":"N3","to":"N4","text":"新连线4"},{"from":"N4","to":"N5","text":"新连线5"},{"from":"N5","to":"N6","text":"新连线6"},{"from":"N6","to":"N2","text":"新连线7"},{"from":"N2","to":"N8","text":"新连线8"},{"from":"N2","to":"N7","text":"新连线9"},{"from":"N7","to":"N8","text":"新连线10"},{"from":"root","to":"N8","text":"新连线11"}]};
        // __graph_json_data = {"rootId": null,
        //   "nodes": [
        //     {
        //       "id": "CA00-ESR Group Limited",
        //       "text": "CA00-ESR Group Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B121-Orchid Offshore Holdings (BVI) Limited",
        //       "text": "B121-Orchid Offshore Holdings (BVI) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B104-Clover Offshore Holdings (BVI) Limited",
        //       "text": "B104-Clover Offshore Holdings (BVI) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B146-ECDP MEGA Limited",
        //       "text": "B146-ECDP MEGA Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "Reco Ebony Private Limited",
        //       "text": "Reco Ebony Private Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "Stichting Depositary APG Strategic Real\nEstate Pool as depositary of APG\nStrategic Real Estate Pool",
        //       "text": "Stichting Depositary APG Strategic Real\nEstate Pool as depositary of APG\nStrategic Real Estate Pool",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B145-ECDP EG Limited",
        //       "text": "B145-ECDP EG Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B147-ECDP EA Limited",
        //       "text": "B147-ECDP EA Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B120-Narcissus Offshore Holdings (BVI) Limited",
        //       "text": "B120-Narcissus Offshore Holdings (BVI) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B098-Clubs Offshore Holdings (BVI) Limited",
        //       "text": "B098-Clubs Offshore Holdings (BVI) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B154-ECDP MEGA I (BVI) Limited",
        //       "text": "B154-ECDP MEGA I (BVI) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "B155-ECDP MEGA II (BVI) Limited",
        //       "text": "B155-ECDP MEGA II (BVI) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "C164-上海易洱仓储服务有限公司",
        //       "text": "C164-上海易洱仓储服务有限公司",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "H102-Narcissus Offshore Holdings (HK) Limited",
        //       "text": "H102-Narcissus Offshore Holdings (HK) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "H088-Clubs Offshore Holdings (HK) Limited",
        //       "text": "H088-Clubs Offshore Holdings (HK) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "H135-ECDP MEGA I (HK) Limited",
        //       "text": "H135-ECDP MEGA I (HK) Limited",
        //       "color": "#4ea2f0"
        //     },
        //     {
        //       "id": "C156-三河市易阳电商产业园有限公司",
        //       "text": "C156-三河市易阳电商产业园有限公司",
        //       "color": "#4ea2f0"
        //     }
        //   ],
        //   "lines": [
        //     {
        //       "from": "CA00-ESR Group Limited",
        //       "to": "B121-Orchid Offshore Holdings (BVI) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B121-Orchid Offshore Holdings (BVI) Limited",
        //       "to": "B104-Clover Offshore Holdings (BVI) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B104-Clover Offshore Holdings (BVI) Limited",
        //       "to": "B146-ECDP MEGA Limited",
        //       "text": "20%"
        //     },
        //     {
        //       "from": "Reco Ebony Private Limited",
        //       "to": "B146-ECDP MEGA Limited",
        //       "text": "40%"
        //     },
        //     {
        //       "from": "Stichting Depositary APG Strategic Real\nEstate Pool as depositary of APG\nStrategic Real Estate Pool",
        //       "to": "B146-ECDP MEGA Limited",
        //       "text": "40%"
        //     },
        //     {
        //       "from": "B104-Clover Offshore Holdings (BVI) Limited",
        //       "to": "B145-ECDP EG Limited",
        //       "text": "20%"
        //     },
        //     {
        //       "from": "Reco Ebony Private Limited",
        //       "to": "B145-ECDP EG Limited",
        //       "text": "80%"
        //     },
        //     {
        //       "from": "B104-Clover Offshore Holdings (BVI) Limited",
        //       "to": "B147-ECDP EA Limited",
        //       "text": "20%"
        //     },
        //     {
        //       "from": "Stichting Depositary APG Strategic Real\nEstate Pool as depositary of APG\nStrategic Real Estate Pool",
        //       "to": "B147-ECDP EA Limited",
        //       "text": "80%"
        //     },
        //     {
        //       "from": "B146-ECDP MEGA Limited",
        //       "to": "B120-Narcissus Offshore Holdings (BVI) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B146-ECDP MEGA Limited",
        //       "to": "B098-Clubs Offshore Holdings (BVI) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B146-ECDP MEGA Limited",
        //       "to": "B154-ECDP MEGA I (BVI) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B146-ECDP MEGA Limited",
        //       "to": "B155-ECDP MEGA II (BVI) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B146-ECDP MEGA Limited",
        //       "to": "C164-上海易洱仓储服务有限公司",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B120-Narcissus Offshore Holdings (BVI) Limited",
        //       "to": "H102-Narcissus Offshore Holdings (HK) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B098-Clubs Offshore Holdings (BVI) Limited",
        //       "to": "H088-Clubs Offshore Holdings (HK) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "B154-ECDP MEGA I (BVI) Limited",
        //       "to": "H135-ECDP MEGA I (HK) Limited",
        //       "text": "100%"
        //     },
        //     {
        //       "from": "H102-Narcissus Offshore Holdings (HK) Limited",
        //       "to": "C156-三河市易阳电商产业园有限公司",
        //       "text": "94.81%"
        //     }
        //   ]};
      } else {
        __graph_json_data =
          { 'rootId': 'root', 'nodes': [{ 'id': 'root', 'text': '节点' }, { 'id': 'N2', 'text': '新节点N2' }, { 'id': 'N3', 'text': '新节点N3' }, { 'id': 'N4', 'text': '新节点N4' }, { 'id': 'N5', 'text': '新节点N5' }, { 'id': 'N6', 'text': '新节点N6' }, { 'id': 'N7', 'text': '新节点N7' }, { 'id': 'N8', 'text': '新节点N8' }, { 'id': 'N9', 'text': '新节点N9' }, { 'id': 'N10', 'text': '新节点N10' }, { 'id': 'N11', 'text': '新节点N11' }, { 'id': 'N12', 'text': '新节点N12' }, { 'id': 'N13', 'text': '新节点N13' }, { 'id': 'N14', 'text': '新节点N14' }, { 'id': 'N15', 'text': '新节点N15' }, { 'id': 'N16', 'text': '新节点N16' }, { 'id': 'N17', 'text': '新节点N17' }, { 'id': 'N18', 'text': '新节点N18' }, { 'id': 'N19', 'text': '新节点N19' }, { 'id': 'N20', 'text': '新节点N20' }, { 'id': 'N21', 'text': '新节点N21' }, { 'id': 'N22', 'text': '新节点N22' }, { 'id': 'N23', 'text': '新节点N23' }, { 'id': 'N24', 'text': '新节点N24' }, { 'id': 'N25', 'text': '新节点N25' }, { 'id': 'N26', 'text': '新节点N26' }, { 'id': 'N27', 'text': 'New-N27' }, { 'id': 'N28', 'text': 'New-N28' }, { 'id': 'N29', 'text': 'New-N29' }, { 'id': 'N30', 'text': 'New-N30' }, { 'id': 'N31', 'text': 'New-N31' }, { 'id': 'N32', 'text': 'New-N32' }, { 'id': 'N33', 'text': 'New-N33' }, { 'id': 'N34', 'text': 'New-N34' }, { 'id': 'N35', 'text': 'New-N35' }, { 'id': 'N36', 'text': 'New-N36' }, { 'id': 'N37', 'text': 'New-N37' }, { 'id': 'N38', 'text': 'New-N38' }, { 'id': 'N39', 'text': 'New-N39' }], 'lines': [{ 'from': 'N3', 'to': 'N2', 'text': '新连线1' }, { 'from': 'N2', 'to': 'root', 'text': '新连线1' }, { 'from': 'root', 'to': 'N4', 'text': '新连线2' }, { 'from': 'N4', 'to': 'N5', 'text': '新连线3' }, { 'from': 'N6', 'to': 'N7', 'text': '新连线2' }, { 'from': 'N7', 'to': 'root', 'text': '新连线3' }, { 'from': 'N8', 'to': 'N9', 'text': '新连线4' }, { 'from': 'N9', 'to': 'root', 'text': '新连线5' }, { 'from': 'N10', 'to': 'N11', 'text': '新连线6' }, { 'from': 'N11', 'to': 'root', 'text': '新连线7' }, { 'from': 'N13', 'to': 'N12', 'text': '新连线8' }, { 'from': 'N12', 'to': 'root', 'text': '新连线9' }, { 'from': 'N18', 'to': 'N17', 'text': '新连线10' }, { 'from': 'N17', 'to': 'N14', 'text': '新连线11' }, { 'from': 'N15', 'to': 'N14', 'text': '新连线12' }, { 'from': 'N16', 'to': 'N15', 'text': '新连线13' }, { 'from': 'N12', 'to': 'N14', 'text': '新连线14' }, { 'from': 'N20', 'to': 'N19', 'text': '新连线15' }, { 'from': 'N21', 'to': 'N19', 'text': '新连线16' }, { 'from': 'N19', 'to': 'N15', 'text': '新连线17' }, { 'from': 'N26', 'to': 'N22', 'text': '新连线18' }, { 'from': 'N24', 'to': 'N25', 'text': '新连线19' }, { 'from': 'N24', 'to': 'N22', 'text': '新连线20' }, { 'from': 'N22', 'to': 'N23', 'text': '新连线21' }, { 'from': 'N23', 'to': 'N14', 'text': '新连线22' }, { 'from': 'root', 'to': 'N30', 'text': '新连线1' }, { 'from': 'root', 'to': 'N27', 'text': '新连线2' }, { 'from': 'N30', 'to': 'N33', 'text': '新连线3' }, { 'from': 'N30', 'to': 'N29', 'text': '新连线4' }, { 'from': 'N27', 'to': 'N28', 'text': '新连线5' }, { 'from': 'N27', 'to': 'N31', 'text': '新连线6' }, { 'from': 'N27', 'to': 'N32', 'text': '新连线7' }, { 'from': 'N4', 'to': 'N34', 'text': '新连线8' }, { 'from': 'N28', 'to': 'N35', 'text': '新连线9' }, { 'from': 'N28', 'to': 'N36', 'text': '新连线12' }, { 'from': 'N28', 'to': 'N37', 'text': '新连线13' }, { 'from': 'N36', 'to': 'N39', 'text': '新连线14' }, { 'from': 'N36', 'to': 'N38', 'text': '新连线15' }] };
      }
      __graph_json_data.nodes.forEach(node => { // 随机设置节点宽高
        // node.width = 40 + Math.floor(Math.random() * 200)
        // node.height = 40
      })
      let lineIndex = 0;
      __graph_json_data.lines.forEach(line => {
        line.data = { // 自定义属性放在data中
          points: [] // 准备一个属性，待会儿接收从dagre生成的线条点
        };
        line.lineDirection = 'v';
        line.id = 'L' + lineIndex++; // id 必须是字符串
        line.text = '';
      })
      const g = new dagre.graphlib.Graph();
      g.setGraph({
        ranker: 'longest-path',
        nodesep: 30,
        ranksep: this.dataId === '1' ? 20 : 80,
        // rankdir: 'LR'
        // rankdir：指定节点排名的方向，可以是从上到下（TB）、从下到上（BT）、从左到右（LR）或从右到左（RL）。
        // align：指定排名节点的对齐方式，可以是左上（UL）、右上（UR）、左下（DL）或右下（DR）。
        // nodesep：指定布局中水平分隔节点的像素数。
        // edgesep：指定布局中水平分隔边的像素数。
        // ranksep：指定布局中每个排名之间的像素数。
        // marginx：指定图形左右两侧用作边缘的像素数。
        // marginy：指定图形上下两侧用作边缘的像素数。
        // acyclicer：如果设置为greedy，则使用贪心启发式算法找到图的反馈弧集，即一组可以移除的边，使得图变为无环。
        // ranker：指定用于为输入图中的每个节点分配排名的算法类型，可以是network-simplex、tight-tree或longest-path
      });
      g.setDefaultEdgeLabel(function() { return {}; });
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setJsonData(__graph_json_data);
      graphInstance.getNodes().forEach(node => {
        node.width = node.el.offsetWidth;
        node.height = node.el.offsetHeight;
        // console.log('offsetHeight', node.height);
        g.setNode(node.id, node);
      });
      graphInstance.getLinks().forEach(link => {
        link.relations.forEach((line) => {
          g.setEdge(link.fromNode.id, link.toNode.id, {
            id: line.id, // 设置id，到会儿通过id找到jsonData中的line，设置line.data.points
            // weight: 0  // 这是一个非常重要的参数，尝试设置为0或者1或者中间值查看效果
          });
        })
      });
      dagre.layout(g);
      graphInstance.getNodes().forEach(node => { // 由于dagre生成的坐标是指向节点中心的，所以要根据节点宽高做偏移
        node.x = node.x - node.el.offsetWidth / 2 - 5;
        node.y = node.y - node.el.offsetHeight / 2 - 5;
      });
      g.edges().forEach(e => {
        const edge = g.edge(e); // 读取dagre生成的连线信息，写入relation-graph的线条属性中
        console.log(edge);
        const line = this.getLineById(graphInstance, edge.id);
        const link = this.getLinkByLineId(graphInstance, edge.id);
        line.data.points = edge.points;
        line.data.startPointOffset = { // 为了支持节点移动时线条跟着动
          x: edge.points[0].x - link.fromNode.x,
          y: edge.points[0].y - link.fromNode.y
        };
        line.data.endPointOffset = {// 为了支持节点移动时线条跟着动
          x: edge.points[edge.points.length - 1].x - link.toNode.x,
          y: edge.points[edge.points.length - 1].y - link.toNode.y
        };
      })
      console.log(graphInstance.getGraphJsonData());
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
    },
    getLineById(graphInstance, lineId) {
      for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
          if (line.id === lineId) {
            return line;
          }
        }
      }
    },
    getLinkByLineId(graphInstance, lineId) {
      for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
          if (line.id === lineId) {
            return link;
          }
        }
      }
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
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name{
    color: #666666;
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
</style>
```

## Vue3 版本

### `use-dagre-layout-2.vue`

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
            <div class="c-option-name">Sample Data:</div>
            <el-radio-group v-model="dataId" size="small" @change="showGraph">
              <el-radio-button label="1">Sample Data 1</el-radio-button>
              <el-radio-button label="2">Sample Data 2</el-radio-button>
            </el-radio-group>
            <div class="c-option-name" style="line-height: 25px;padding:10px;">
              This layout uses a third-party layout algorithm: Dagre, while the lines and other features are provided by relation-graph.
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import dagre from 'dagre';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';

const graphRef = ref<RelationGraphComponent>();
const dataId = ref('2');
const isShowCodePanel = ref(false);
const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    layout: {
        layoutName: 'fixed',
        layoutDirection: 'v',
    },
    defaultNodeShape: 1,
    defaultLineShape: 7,
    defaultJunctionPoint: 'tb',
    defaultNodeBorderWidth: 0,
    defaultNodeWidth: 100,
    defaultNodeHeight: 30,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)'
};

onMounted(() => {
    showGraph();
});

const showGraph = async () => {
    let __graph_json_data: RGJsonData = {};
    if (dataId.value === '1') {
        __graph_json_data = {
            "rootId": "root",
            "nodes": [
                { "id": "root", "text": "Theme" },
                { "id": "N2", "text": "New-N2" },
                { "id": "N3", "text": "New-N3" },
                { "id": "N4", "text": "New-N4" },
                { "id": "N5", "text": "New-N5" },
                { "id": "N6", "text": "New-N6" },
                { "id": "N7", "text": "New-N7" },
                { "id": "N8", "text": "New-N8" }
            ],
            "lines": [
                { "from": "root", "to": "N2", "text": "New Line 1" },
                { "from": "root", "to": "N3", "text": "New Line 2" },
                { "from": "N3", "to": "N4", "text": "New Line 4" },
                { "from": "N4", "to": "N5", "text": "New Line 5" },
                { "from": "N5", "to": "N6", "text": "New Line 6" },
                { "from": "N6", "to": "N2", "text": "New Line 7" },
                { "from": "N2", "to": "N8", "text": "New Line 8" },
                { "from": "N2", "to": "N7", "text": "New Line 9" },
                { "from": "N7", "to": "N8", "text": "New Line 10" },
                { "from": "root", "to": "N8", "text": "New Line 11" }
            ]
        };
    } else {
        __graph_json_data = {
            "rootId": "root",
            "nodes": [
                { "id": "root", "text": "Node" },
                { "id": "N2", "text": "New Node N2" },
                { "id": "N3", "text": "New Node N3" },
                { "id": "N4", "text": "New Node N4" },
                { "id": "N5", "text": "New Node N5" },
                { "id": "N6", "text": "New Node N6" },
                { "id": "N7", "text": "New Node N7" },
                { "id": "N8", "text": "New Node N8" },
                { "id": "N9", "text": "New Node N9" },
                { "id": "N10", "text": "New Node N10" },
                { "id": "N11", "text": "New Node N11" },
                { "id": "N12", "text": "New Node N12" },
                { "id": "N13", "text": "New Node N13" },
                { "id": "N14", "text": "New Node N14" },
                { "id": "N15", "text": "New Node N15" },
                { "id": "N16", "text": "New Node N16" },
                { "id": "N17", "text": "New Node N17" },
                { "id": "N18", "text": "New Node N18" },
                { "id": "N19", "text": "New Node N19" },
                { "id": "N20", "text": "New Node N20" },
                { "id": "N21", "text": "New Node N21" },
                { "id": "N22", "text": "New Node N22" },
                { "id": "N23", "text": "New Node N23" },
                { "id": "N24", "text": "New Node N24" },
                { "id": "N25", "text": "New Node N25" },
                { "id": "N26", "text": "New Node N26" },
                { "id": "N27", "text": "New-N27" },
                { "id": "N28", "text": "New-N28" },
                { "id": "N29", "text": "New-N29" },
                { "id": "N30", "text": "New-N30" },
                { "id": "N31", "text": "New-N31" },
                { "id": "N32", "text": "New-N32" },
                { "id": "N33", "text": "New-N33" },
                { "id": "N34", "text": "New-N34" },
                { "id": "N35", "text": "New-N35" },
                { "id": "N36", "text": "New-N36" },
                { "id": "N37", "text": "New-N37" },
                { "id": "N38", "text": "New-N38" },
                { "id": "N39", "text": "New-N39" }
            ],
            "lines": [
                { "from": "N3", "to": "N2", "text": "New Line 1" },
                { "from": "N2", "to": "root", "text": "New Line 1" },
                { "from": "root", "to": "N4", "text": "New Line 2" },
                { "from": "N4", "to": "N5", "text": "New Line 3" },
                { "from": "N6", "to": "N7", "text": "New Line 2" },
                { "from": "N7", "to": "root", "text": "New Line 3" },
                { "from": "N8", "to": "N9", "text": "New Line 4" },
                { "from": "N9", "to": "root", "text": "New Line 5" },
                { "from": "N10", "to": "N11", "text": "New Line 6" },
                { "from": "N11", "to": "root", "text": "New Line 7" },
                { "from": "N13", "to": "N12", "text": "New Line 8" },
                { "from": "N12", "to": "root", "text": "New Line 9" },
                { "from": "N18", "to": "N17", "text": "New Line 10" },
                { "from": "N17", "to": "N14", "text": "New Line 11" },
                { "from": "N15", "to": "N14", "text": "New Line 12" },
                { "from": "N16", "to": "N15", "text": "New Line 13" },
                { "from": "N12", "to": "N14", "text": "New Line 14" },
                { "from": "N20", "to": "N19", "text": "New Line 15" },
                { "from": "N21", "to": "N19", "text": "New Line 16" },
                { "from": "N19", "to": "N15", "text": "New Line 17" },
                { "from": "N26", "to": "N22", "text": "New Line 18" },
                { "from": "N24", "to": "N25", "text": "New Line 19" },
                { "from": "N24", "to": "N22", "text": "New Line 20" },
                { "from": "N22", "to": "N23", "text": "New Line 21" },
                { "from": "N23", "to": "N14", "text": "New Line 22" },
                { "from": "root", "to": "N30", "text": "New Line 1" },
                { "from": "root", "to": "N27", "text": "New Line 2" },
                { "from": "N30", "to": "N33", "text": "New Line 3" },
                { "from": "N30", "to": "N29", "text": "New Line 4" },
                { "from": "N27", "to": "N28", "text": "New Line 5" },
                { "from": "N27", "to": "N31", "text": "New Line 6" },
                { "from": "N27", "to": "N32", "text": "New Line 7" },
                { "from": "N4", "to": "N34", "text": "New Line 8" },
                { "from": "N28", "to": "N35", "text": "New Line 9" },
                { "from": "N28", "to": "N36", "text": "New Line 12" },
                { "from": "N28", "to": "N37", "text": "New Line 13" },
                { "from": "N36", "to": "N39", "text": "New Line 14" },
                { "from": "N36", "to": "N38", "text": "New Line 15" }
            ]
        };
    }
    __graph_json_data.nodes.forEach(node => {
        // Randomly set node width and height

        // node.width = 40 + Math.floor(Math.random() * 200)
        // node.height = 40

    });
    let lineIndex = 0;
    __graph_json_data.lines.forEach(line => {
        line.data = {
            points: []
        };
        line.lineDirection = 'v';
        line.id = 'L' + lineIndex++;
    });
    const g = new dagre.graphlib.Graph();
    g.setGraph({
        ranker: 'longest-path',
        nodesep: 30,
        ranksep: dataId.value === '1' ? 20 : 80,
    });
    g.setDefaultEdgeLabel(function() { return {}; });
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    graphInstance.getNodes().forEach(node => {
        node.width = node.el.offsetWidth;
        node.height = node.el.offsetHeight;
        g.setNode(node.id, node);
    });
    graphInstance.getLinks().forEach(link => {
        link.relations.forEach((line) => {
            g.setEdge(link.fromNode.id, link.toNode.id, {
                id: line.id,
            });
        })
    });
    dagre.layout(g);
    graphInstance.getNodes().forEach(node => {
        node.x = node.x - node.el.offsetWidth / 2 - 5;
        node.y = node.y - node.el.offsetHeight / 2 - 5;
    });
    g.edges().forEach(e => {
        const edge = g.edge(e);
        const line = getLineById(graphInstance, edge.id);
        const link = getLinkByLineId(graphInstance, edge.id);
        line.data.points = edge.points;
        line.data.startPointOffset = {
            x: edge.points[0].x - link.fromNode.x,
            y: edge.points[0].y - link.fromNode.y

        };
        line.data.endPointOffset = {
            x: edge.points[edge.points.length - 1].x - link.toNode.x,
            y: edge.points[edge.points.length - 1].y - link.toNode.y

        };
    });
    console.log(graphInstance.getGraphJsonData());
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

const getLineById = (graphInstance: RelationGraphComponent, lineId: string) => {
    for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
            if (line.id === lineId) {
                return line;
            }
        }
    }
};

const getLinkByLineId = (graphInstance: RelationGraphComponent, lineId: string) => {
    for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
            if (line.id === lineId) {
                return link;
            }
        }
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

.c-my-panel{
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name{
    color: #666666;
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
</style>
```

## React 版本

### `use-dagre-layout-2.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGOptions,
  RelationGraphComponent,
  RelationGraphInstance
} from 'relation-graph-react';
import dagre from 'dagre';
import './use-dagre-layout.scss';
import {MySelector} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [dataId, setDataId] = useState('2');
  const graphOptions: RGOptions = {
    debug: false,
    lineUseTextPath: true,
    layout: {
      layoutName: 'fixed'
    },
    defaultNodeShape: 1,
    defaultLineShape: 1,
    defaultJunctionPoint: 'border',
    defaultNodeBorderWidth: 0,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)'
  };

  const showGraph = async () => {
    let __graph_json_data: RGJsonData;
    if (dataId === '1') {
      __graph_json_data = {
        rootId: 'root',
        nodes: [
          { id: 'root', text: 'Theme' },
          { id: 'N2', text: 'New-N2' },
          { id: 'N3', text: 'New-N3' },
          { id: 'N4', text: 'New-N4' },
          { id: 'N5', text: 'New-N5' },
          { id: 'N6', text: 'New-N6' },
          { id: 'N7', text: 'New-N7' },
          { id: 'N8', text: 'New-N8' }
        ],
        lines: [
          { from: 'root', to: 'N2', text: 'New Line 1' },
          { from: 'root', to: 'N3', text: 'New Line 2' },
          { from: 'N3', to: 'N4', text: 'New Line 4' },
          { from: 'N4', to: 'N5', text: 'New Line 5' },
          { from: 'N5', to: 'N6', text: 'New Line 6' },
          { from: 'N6', to: 'N2', text: 'New Line 7' },
          { from: 'N2', to: 'N8', text: 'New Line 8' },
          { from: 'N2', to: 'N7', text: 'New Line 9' },
          { from: 'N7', to: 'N8', text: 'New Line 10' },
          { from: 'root', to: 'N8', text: 'New Line 11' }
        ]
      };
    } else {
      __graph_json_data = {
        rootId: 'root',
        nodes: [
          { id: 'root', text: 'Node' },
          { id: 'N2', text: 'New Node N2' },
          { id: 'N3', text: 'New Node N3' },
          { id: 'N4', text: 'New Node N4' },
          { id: 'N5', text: 'New Node N5' },
          { id: 'N6', text: 'New Node N6' },
          { id: 'N7', text: 'New Node N7' },
          { id: 'N8', text: 'New Node N8' },
          { id: 'N9', text: 'New Node N9' },
          { id: 'N10', text: 'New Node N10' },
          { id: 'N11', text: 'New Node N11' },
          { id: 'N12', text: 'New Node N12' },
          { id: 'N13', text: 'New Node N13' },
          { id: 'N14', text: 'New Node N14' },
          { id: 'N15', text: 'New Node N15' },
          { id: 'N16', text: 'New Node N16' },
          { id: 'N17', text: 'New Node N17' },
          { id: 'N18', text: 'New Node N18' },
          { id: 'N19', text: 'New Node N19' },
          { id: 'N20', text: 'New Node N20' },
          { id: 'N21', text: 'New Node N21' },
          { id: 'N22', text: 'New Node N22' },
          { id: 'N23', text: 'New Node N23' },
          { id: 'N24', text: 'New Node N24' },
          { id: 'N25', text: 'New Node N25' },
          { id: 'N26', text: 'New Node N26' },
          { id: 'N27', text: 'New-N27' },
          { id: 'N28', text: 'New-N28' },
          { id: 'N29', text: 'New-N29' },
          { id: 'N30', text: 'New-N30' },
          { id: 'N31', text: 'New-N31' },
          { id: 'N32', text: 'New-N32' },
          { id: 'N33', text: 'New-N33' },
          { id: 'N34', text: 'New-N34' },
          { id: 'N35', text: 'New-N35' },
          { id: 'N36', text: 'New-N36' },
          { id: 'N37', text: 'New-N37' },
          { id: 'N38', text: 'New-N38' },
          { id: 'N39', text: 'New-N39' }
        ],
        lines: [
          { from: 'N3', to: 'N2', text: 'New Line 1' },
          { from: 'N2', to: 'root', text: 'New Line 1' },
          { from: 'root', to: 'N4', text: 'New Line 2' },
          { from: 'N4', to: 'N5', text: 'New Line 3' },
          { from: 'N6', to: 'N7', text: 'New Line 2' },
          { from: 'N7', to: 'root', text: 'New Line 3' },
          { from: 'N8', to: 'N9', text: 'New Line 4' },
          { from: 'N9', to: 'root', text: 'New Line 5' },
          { from: 'N10', to: 'N11', text: 'New Line 6' },
          { from: 'N11', to: 'root', text: 'New Line 7' },
          { from: 'N13', to: 'N12', text: 'New Line 8' },
          { from: 'N12', to: 'root', text: 'New Line 9' },
          { from: 'N18', to: 'N17', text: 'New Line 10' },
          { from: 'N17', to: 'N14', text: 'New Line 11' },
          { from: 'N15', to: 'N14', text: 'New Line 12' },
          { from: 'N16', to: 'N15', text: 'New Line 13' },
          { from: 'N12', to: 'N14', text: 'New Line 14' },
          { from: 'N20', to: 'N19', text: 'New Line 15' },
          { from: 'N21', to: 'N19', text: 'New Line 16' },
          { from: 'N19', to: 'N15', text: 'New Line 17' },
          { from: 'N26', to: 'N22', text: 'New Line 18' },
          { from: 'N24', to: 'N25', text: 'New Line 19' },
          { from: 'N24', to: 'N22', text: 'New Line 20' },
          { from: 'N22', to: 'N23', text: 'New Line 21' },
          { from: 'N23', to: 'N14', text: 'New Line 22' },
          { from: 'root', to: 'N30', text: 'New Line 1' },
          { from: 'root', to: 'N27', text: 'New Line 2' },
          { from: 'N30', to: 'N33', text: 'New Line 3' },
          { from: 'N30', to: 'N29', text: 'New Line 4' },
          { from: 'N27', to: 'N28', text: 'New Line 5' },
          { from: 'N27', to: 'N31', text: 'New Line 6' },
          { from: 'N27', to: 'N32', text: 'New Line 7' },
          { from: 'N4', to: 'N34', text: 'New Line 8' },
          { from: 'N28', to: 'N35', text: 'New Line 9' },
          { from: 'N28', to: 'N36', text: 'New Line 12' },
          { from: 'N28', to: 'N37', text: 'New Line 13' },
          { from: 'N36', to: 'N39', text: 'New Line 14' },
          { from: 'N36', to: 'N38', text: 'New Line 15' }
        ]
      };
    }
    __graph_json_data.nodes.forEach(node => {
      // Randomly set node width and height

      // node.width = 40 + Math.floor(Math.random() * 200)
      // node.height = 40

    });
    let lineIndex = 0;
    __graph_json_data.lines.forEach(line => {
      line.data = {
        id: 'L' + lineIndex++,
        points: [] // Prepare a property to receive line points generated by dagre
      };
    });
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    const nodes4Calc = [];
    const lines4Calc = [];
    graphInstance.getNodes().forEach(node => {
      node.width = node.el.offsetWidth;
      node.height = node.el.offsetHeight;
      const { id, width, height } = node;
      nodes4Calc.push({id, width, height});
    });
    graphInstance.getLinks().forEach(link => {
      link.relations.forEach((line) => {
        lines4Calc.push({
          id: line.data?.id,
          from: link.fromNode.id,
          to: link.toNode.id
        });
      });
    });

    const g = new dagre.graphlib.Graph();
    g.setGraph({
      nodesep: 50,
      ranksep: 50,
      ranker: 'network-simplex',
    });
    // g.setDefaultEdgeLabel(function () {
    //   return {};
    // });
    for (const calcNode of nodes4Calc) {
      g.setNode(calcNode.id, calcNode);
    }
    for (const calcLine of lines4Calc) {
      g.setEdge(calcLine.from, calcLine.to, calcLine);
    }
    dagre.layout(g);
    console.log('all nodes:', nodes4Calc);
    for (const n of nodes4Calc) {
      console.log('set dagre-node position to relation-graph node:', n.id, n.x, n.y);
      const rgNode: RGNode = graphInstance.getNodeById(n.id);
      rgNode.x = n.x;//  - rgNode.el.offsetWidth / 2 - 5;
      rgNode.y = n.y;//  - rgNode.el.offsetHeight / 2 - 5;
    }
    console.log(graphInstance.getGraphJsonData());
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  }

  const getLineById = (graphInstance: RelationGraphInstance, lineId: string) => {
    if (graphInstance) {
      for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
          if (line.data?.id === lineId) {
            return line;
          }
        }
      }
    }
    return null;
  }

  const getLinkByLineId = (graphInstance: RelationGraphInstance, lineId: string) => {
    if (graphInstance) {
      for (const link of graphInstance.getLinks()) {
        for (const line of link.relations) {
          if (line.id === lineId) {
            return link;
          }
        }
      }
    }
    return null;
  }

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
  }

  useEffect(() => {
    showGraph();
  }, [dataId]);

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          <div className="c-option-name">Sample Data:</div>
          <MySelector
            data={[
              { value: '1', text: 'Sample Data 1' },
              { value: '2', text: 'Sample Data 2' }
            ]}
            currentValue={dataId}
            onChange={(newValue: string, label) => { setDataId(newValue); }}
          />
          <div className="c-option-name" style={{ lineHeight: '25px', padding: '10px' }}>
            This layout uses a third-party layout algorithm: Dagre, and you can still use powerful features such as slot support in relation-graph. The Dagre layout can make the layout clear when the relationship is chaotic by setting the relationship weight, and avoid nodes with complex curved lines.
          </div>
        </div>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
        >
        </RelationGraph>
      </div>
    </div>
  );
}

export default MyComponent;
```

### `use-dagre-layout.scss`

```scss
.c-my-panel {
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name {
    color: #666666;
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
