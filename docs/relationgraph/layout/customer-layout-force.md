# force-自定义力学布局

## Vue2 版本

### `customer-layout-force.vue`

```javascript
<template>
  <div>
    <div class="my-graph" style="height: calc(100vh - 50px);">
      <div style="width:400px;border-radius: 10px;position: absolute;left:20px;top:20px;z-index: 20;padding:30px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);">
        <el-divider>布局参数设置</el-divider>
        最大布局次数：{{graphOptions.layout.maxLayoutTimes}}
        <el-slider v-model="graphOptions.layout.maxLayoutTimes" :min="30" :max="5000" :step="100" :show-tooltip="true"></el-slider>
        节点斥力系数：{{graphOptions.layout.force_node_repulsion}}（设置太大会抖动）
        <el-slider v-model="graphOptions.layout.force_node_repulsion" :min="0.01" :step="0.05" :max="4"></el-slider>
        连线牵引力系数：{{graphOptions.layout.force_line_elastic}}（设置太大会抖动）
        <el-slider v-model="graphOptions.layout.force_line_elastic" :min="0.01" :step="0.05" :max="4"></el-slider>
        <el-button size="mini" type="primary" @click="updateLayouterOptions">应用设置</el-button>
        <div>
          <el-link size="mini" type="primary" @click="resetNodeColor">随机变一下颜色模拟重新聚合</el-link>
        </div>
      </div>
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
      />
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import {Layout} from "relation-graph";

class MyForceLayout extends Layout.ForceLayouter {
  constructor(arg1, arg2, arg3) {
    console.log('MyForceLayout..................');
    super(arg1, arg2, arg3);
  }
  resetCalcNodes() {
    // 以下代码会在力学布局开始前重置forCalcNodes，forCalcNodes用于频繁的计算，
    // 而visibleNodes中的节点是响应式对象会导致性能低下，所以这里将visibleNodes转换为forCalcNodes用于力学布局迭代计算
    this.forCalcNodes = [];
    this.calcNodeMap = new WeakMap();
    this.visibleNodes.forEach(thisNode => {
      const calcNode = {
        rgNode: thisNode,
        Fx: 0,
        Fy: 0,
        x: thisNode.x,
        y: thisNode.y,
        ignoreForce: (thisNode.dragging || (this.justLayoutSingleNode && !thisNode.singleNode)),
        force_weight: thisNode.force_weight || 1,
        forceCenterOffset_X: (thisNode.width || thisNode.el.offsetWidth || 60) / 2,
        forceCenterOffset_Y: (thisNode.height || thisNode.el.offsetHeight || 60) / 2,
        fixed: thisNode.fixed || false,
        myColor: thisNode.color
      };
      this.forCalcNodes.push(calcNode);
      this.calcNodeMap.set(thisNode, calcNode);
    });
  }
  calcNodesPosition() {
    const nodes = this.forCalcNodes;
    for (let i=0;i<this.forCalcNodes.length;i++) {
      const __node1 = this.forCalcNodes[i];
      if (__node1.ignoreForce) {
        continue;
      }
      if (__node1.fixed) {
        continue;
      }
      for (let j = 0; j < this.forCalcNodes.length;j++) {
        // 循环点，计算i点与j点点斥力及方向
        if (i !== j) {
          const __node2 = this.forCalcNodes[j];
          if (__node2.ignoreForce) {
            continue;
          }
          /**
           * 任意两点之间都会在这里进行作用力分析
           * 你可以在这里根据你自己的规则为他们施加作用力，施加作用力的方式有两种：
           * 斥力：   this.addGravityByNode(__node1, __node2);
           * 牵引力： this.addElasticByLine(__node1, __node2, 0.5);
           */
          // 示例：两点之间不能靠的太近，所以要给节点间施加斥力
          this.addGravityByNode(__node1, __node2);
          if (__node1.myColor === __node2.myColor) {
            // 示例：如果颜色相同，则他们不能离得太远，所以要施加牵引力
            this.addElasticByLine(
              __node1,
              __node2,
              1
            );
          }
        }
      }
    }
  }
}

const graphOptions = {
  debug: true,
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  useAnimationWhenRefresh: false,
  defaultLineColor: 'rgba(255, 255, 255, 0.6)',
  defaultNodeColor: 'rgba(255, 255, 255, 0.6)',
  defaultNodeBorderWidth: 1,
  defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
  defaultNodeFontColor: '#1b7702',
  defaultNodeShape: 0,
  defaultNodeWidth: 60,
  defaultNodeHeight: 60,
  toolBarDirection: 'h',
  toolBarPositionH: 'right',
  toolBarPositionV: 'bottom',
  defaultPloyLineRadius: 10,
  defaultLineShape: 1,
  layout: {
    layoutName: 'force',
    from: 'left',
    maxLayoutTimes: 500,
    // disableLiveChanges: true,
    force_node_repulsion: 0.4, // 全局设置，节点之间的斥力系数，默认为1，建议合理的取值范围:0.1 -- 10
    force_line_elastic: 0.1 // 全局设置，线条的牵引系数，默认为1, 建议合理的取值范围:0.1 -- 10
  }
};
export default {
  name: 'VipForceLayoutDIY',
  components: { },
  data() {
    return {
      useBigData: true,
      resizeTimer: null,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
    this.resizeTimer = setInterval(async() => {
      // const graphInstance = this.$refs.graphRef.getInstance();
      // await graphInstance.zoomToFit();
    }, 3000);
  },
  methods: {
    async showGraph() {
      const __graph_json_data_big = { 'rootId': 'a', 'nodes': [{ 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' }, { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' }, { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' }, { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' }, { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' }, { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' }, { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' }, { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' }, { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' }, { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' }, { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' }, { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }], 'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' }, { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' }, { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' }, { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' }, { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' }, { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' }, { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' }, { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' }] };

      let __graph_json_data_small = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'Very heavy', force_weight: 10000 },
          { 'id': 'b', 'text': 'b' },
          { 'id': 'b1', 'text': 'b1' },
          { 'id': 'b1-1', 'text': 'b1-1' },
          { 'id': 'b1-2', 'text': 'b1-2' },
          { 'id': 'b1-3', 'text': 'b1-3' },
          { 'id': 'b1-4', 'text': 'b1-4' },
          { 'id': 'b1-5', 'text': 'b1-5' },
          { 'id': 'b1-6', 'text': 'b1-6' },
          { 'id': 'b2', 'text': 'b2' },
          { 'id': 'b2-1', 'text': 'b2-1' },
          { 'id': 'b2-2', 'text': 'b2-2' },
          { 'id': 'c', 'text': 'c' },
          { 'id': 'c1', 'text': 'c1' },
          { 'id': 'c2', 'text': 'c2' },
          { 'id': 'c3', 'text': 'c3' }],
        'lines': [
          { 'from': 'a', 'to': 'b', text: '' },
          { 'from': 'b', 'to': 'b1', text: '' },
          { 'from': 'b1', 'to': 'b1-1', text: '' },
          { 'from': 'b1', 'to': 'b1-2', text: '' },
          { 'from': 'b1', 'to': 'b1-3', text: '' },
          { 'from': 'b1', 'to': 'b1-4', text: '' },
          { 'from': 'b1', 'to': 'b1-5', text: '' },
          { 'from': 'b1', 'to': 'b1-6', text: '' },
          { 'from': 'b', 'to': 'b2', text: '' },
          { 'from': 'b2', 'to': 'b2-1', text: '' },
          { 'from': 'b2', 'to': 'b2-2', text: '' },
          { 'from': 'a', 'to': 'c', text: '' },
          { 'from': 'c', 'to': 'c1', text: '' },
          { 'from': 'c', 'to': 'c2', text: '' },
          { 'from': 'c', 'to': 'c3', text: '' }]
      };
      const data = this.useBigData ? __graph_json_data_big : __graph_json_data_small;

      // 随机为节点分配一个颜色，待会儿在力学布局时，相同样色的节点会通过自定义力学布局（MyForceLayout）被吸引在一起。
      data.nodes.forEach(node => {
        node.color = ['red', 'yellow', 'blue'][Math.floor(Math.random() * 3)];
      })
      const graphInstance = this.$refs.graphRef.getInstance();
      // 使用你的自定义力学布局
      graphInstance.setLayouter(new MyForceLayout(graphInstance.layouter.layoutOptions, graphInstance.options, graphInstance))
      await this.stopForceIfNeed();
      await graphInstance.setJsonData(data);
      if (this.useBigData) {
        await graphInstance.setZoom(30);
      } else {
        await graphInstance.setZoom(80);
      }
    },
    async stopForceIfNeed() {
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.stopAutoLayout();
    },
    async updateLayouterOptions() {
      await this.stopForceIfNeed();
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.layouter.maxLayoutTimes = this.graphOptions.layout.maxLayoutTimes;
      graphInstance.layouter.force_node_repulsion = this.graphOptions.layout.force_node_repulsion;
      graphInstance.layouter.force_line_elastic = this.graphOptions.layout.force_line_elastic;
      setTimeout(async() => {
        await graphInstance.startAutoLayout();
      }, 500);
    },
    async resetNodeColor() {
      const graphInstance = this.$refs.graphRef.getInstance();
      for (const node of graphInstance.getNodes()) {
        node.color = ['red', 'yellow', 'blue'][Math.floor(Math.random() * 3)];
      }
      await this.updateLayouterOptions();
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy:clear timer');
    clearInterval(this.resizeTimer);
  }
};
</script>

<style>
</style>

<style lang="scss" scoped>
::v-deep .relation-graph {
    .rel-map {
        background: none !important;
    }
    .rel-node-shape-1 {
    }
    .rel-toolbar{
        color: #ffffff;
        .c-current-zoom{
            color: #ffffff;
        }
    }
}
.my-graph{
  background: linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13));
}
@keyframes AnimationRound {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.c-round{
}
.c-round:hover{
  animation: AnimationRound 2s infinite;
}
</style>
```

## Vue3 版本

### `customer-layout-force.vue`

```javascript
<template>
  <div>
    <div class="my-graph" style="height: calc(100vh);">
      <div style="width:400px;border-radius: 10px;position: absolute;left:20px;top:20px;z-index: 20;padding:30px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);">
        <el-divider>Layout Parameters</el-divider>
        Maximum Layout Times: {{ graphOptions.layout.maxLayoutTimes }}
        <el-slider v-model="graphOptions.layout.maxLayoutTimes" :min="30" :max="5000" :step="100" :show-tooltip="true" />
        Node Repulsion Coefficient: {{ graphOptions.layout.force_node_repulsion }} (Setting it too high will cause shaking)
        <el-slider v-model="graphOptions.layout.force_node_repulsion" :min="0.01" :step="0.05" :max="4" />
        Line Elastic Coefficient: {{ graphOptions.layout.force_line_elastic }} (Setting it too high will cause shaking)
        <el-slider v-model="graphOptions.layout.force_line_elastic" :min="0.01" :step="0.05" :max="4" />
        <el-button size="small" type="primary" @click="updateLayouterOptions">Apply Settings</el-button>
        <div>
          <el-link size="small" type="primary" @click="resetNodeColor">Randomly Change Colors</el-link>
        </div>
      </div>
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from 'vue';
import RelationGraph from 'relation-graph-vue3';
import {Layout, RelationGraphComponent, RGJsonData} from 'relation-graph-vue3';

class MyForceLayout extends Layout.ForceLayouter {
    constructor(arg1, arg2, arg3) {
        console.log('MyForceLayout..................');
        super(arg1, arg2, arg3);
    }
    private forCalcNodes = [];
    private calcNodeMap = new WeakMap();
    resetCalcNodes() {
    // 以下代码会在力学布局开始前重置forCalcNodes，forCalcNodes用于频繁的计算，
    // 而visibleNodes中的节点是响应式对象会导致性能低下，所以这里将visibleNodes转换为forCalcNodes用于力学布局迭代计算
        this.forCalcNodes = [];
        this.calcNodeMap = new WeakMap();
        this.visibleNodes.forEach(thisNode => {
            const calcNode = {
                rgNode: thisNode,
                Fx: 0,
                Fy: 0,
                x: thisNode.x,
                y: thisNode.y,
                ignoreForce: (thisNode.dragging || (this.justLayoutSingleNode && !thisNode.singleNode)),
                force_weight: thisNode.force_weight || 1,
                forceCenterOffset_X: (thisNode.width || thisNode.el.offsetWidth || 60) / 2,
                forceCenterOffset_Y: (thisNode.height || thisNode.el.offsetHeight || 60) / 2,
                fixed: thisNode.fixed || false,
                myColor: thisNode.color
            };
            this.forCalcNodes.push(calcNode);
            this.calcNodeMap.set(thisNode, calcNode);
        });
    }
    calcNodesPosition() {
        const nodes = this.forCalcNodes;
        for (let i=0;i<this.forCalcNodes.length;i++) {
            const __node1 = this.forCalcNodes[i];
            if (__node1.ignoreForce) {
                continue;
            }
            if (__node1.fixed) {
                continue;
            }
            for (let j = 0; j < this.forCalcNodes.length;j++) {
                // 循环点，计算i点与j点点斥力及方向
                if (i !== j) {
                    const __node2 = this.forCalcNodes[j];
                    if (__node2.ignoreForce) {
                        continue;
                    }
                    /**
           * 任意两点之间都会在这里进行作用力分析
           * 你可以在这里根据你自己的规则为他们施加作用力，施加作用力的方式有两种：
           * 斥力：   this.addGravityByNode(__node1, __node2);
           * 牵引力： this.addElasticByLine(__node1, __node2, 0.5);
           */
                    // 示例：两点之间不能靠的太近，所以要给节点间施加斥力
                    this.addGravityByNode(__node1, __node2);
                    if (__node1.myColor === __node2.myColor) {
                        // 示例：如果颜色相同，则他们不能离得太远，所以要施加牵引力
                        this.addElasticByLine(
                            __node1,
                            __node2,
                            1
                        );
                    }
                }
            }
        }
    }
}

const graphOptions = {
    debug: true,
    'backgrounImageNoRepeat': true,
    'moveToCenterWhenRefresh': true,
    'zoomToFitWhenRefresh': true,
    useAnimationWhenRefresh: false,
    defaultLineColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeBorderWidth: 1,
    defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
    defaultNodeFontColor: '#1b7702',
    defaultNodeShape: 0,
    defaultNodeWidth: 60,
    defaultNodeHeight: 60,
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'bottom',
    defaultPolyLineRadius: 10,
    defaultLineShape: 1,
    layout: {
        layoutName: 'force',
        from: 'left',
        maxLayoutTimes: 300,
        // disableLiveChanges: true,
        force_node_repulsion: 0.4, // Global setting, repulsion coefficient between nodes, default is 1, recommended range: 0.1 -- 10

        force_line_elastic: 0.1 // Global setting, elastic coefficient of lines, default is 1, recommended range: 0.1 -- 10

    }
};
const useBigData = true;
const resizeTimer = ref();
const graphRef = ref<RelationGraphComponent>();

const showGraph = async () => {
    const __graph_json_data_big: RGJsonData = { 'rootId': 'a', 'nodes': [{ 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' }, { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' }, { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' }, { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' }, { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' }, { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' }, { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' }, { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' }, { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' }, { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' }, { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' }, { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }], 'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' }, { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' }, { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' }, { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' }, { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' }, { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' }, { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' }, { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' }] };

    let __graph_json_data_small: RGJsonData = {
        'rootId': 'a',
        'nodes': [
            { 'id': 'a', 'text': 'Very heavy', force_weight: 10000 },
            { 'id': 'b', 'text': 'b' },
            { 'id': 'b1', 'text': 'b1' },
            { 'id': 'b1-1', 'text': 'b1-1' },
            { 'id': 'b1-2', 'text': 'b1-2' },
            { 'id': 'b1-3', 'text': 'b1-3' },
            { 'id': 'b1-4', 'text': 'b1-4' },
            { 'id': 'b1-5', 'text': 'b1-5' },
            { 'id': 'b1-6', 'text': 'b1-6' },
            { 'id': 'b2', 'text': 'b2' },
            { 'id': 'b2-1', 'text': 'b2-1' },
            { 'id': 'b2-2', 'text': 'b2-2' },
            { 'id': 'c', 'text': 'c' },
            { 'id': 'c1', 'text': 'c1' },
            { 'id': 'c2', 'text': 'c2' },
            { 'id': 'c3', 'text': 'c3' }],
        'lines': [
            { 'from': 'a', 'to': 'b', text: '' },
            { 'from': 'b', 'to': 'b1', text: '' },
            { 'from': 'b1', 'to': 'b1-1', text: '' },
            { 'from': 'b1', 'to': 'b1-2', text: '' },
            { 'from': 'b1', 'to': 'b1-3', text: '' },
            { 'from': 'b1', 'to': 'b1-4', text: '' },
            { 'from': 'b1', 'to': 'b1-5', text: '' },
            { 'from': 'b1', 'to': 'b1-6', text: '' },
            { 'from': 'b', 'to': 'b2', text: '' },
            { 'from': 'b2', 'to': 'b2-1', text: '' },
            { 'from': 'b2', 'to': 'b2-2', text: '' },
            { 'from': 'a', 'to': 'c', text: '' },
            { 'from': 'c', 'to': 'c1', text: '' },
            { 'from': 'c', 'to': 'c2', text: '' },
            { 'from': 'c', 'to': 'c3', text: '' }]
    };
    const data = useBigData ? __graph_json_data_big : __graph_json_data_small;

    // Randomly assign a color to each node, nodes with the same color will be attracted together by the custom force layout (MyForceLayout)
    data.nodes.forEach(node => {
        node.color = ['red', 'yellow', 'blue'][Math.floor(Math.random() * 3)];
    });
    const graphInstance = graphRef.value!.getInstance();
    // Use your custom force layout

    graphInstance.setLayouter(new MyForceLayout(graphInstance.layouter.layoutOptions, graphInstance.options, graphInstance));
    await stopForceIfNeed();
    await graphInstance.setJsonData(data);
    if (useBigData) {
        await graphInstance.setZoom(30);
    } else {
        await graphInstance.setZoom(80);
    }
};

const stopForceIfNeed = async () => {
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.stopAutoLayout();
};

const updateLayouterOptions = async () => {
    await stopForceIfNeed();
    const graphInstance = graphRef.value!.getInstance();
    const forceLayouter = graphInstance.layouter as Layout.ForceLayouter;
    forceLayouter.maxLayoutTimes = graphOptions.layout.maxLayoutTimes;
    forceLayouter.force_node_repulsion = graphOptions.layout.force_node_repulsion;
    forceLayouter.force_line_elastic = graphOptions.layout.force_line_elastic;
    setTimeout(async() => {
        await graphInstance.startAutoLayout();
    }, 500);
};

const resetNodeColor = async () => {
    const graphInstance = graphRef.value!.getInstance();
    for (const node of graphInstance.getNodes()) {
        node.color = ['red', 'yellow', 'blue'][Math.floor(Math.random() * 3)];
    }
    await updateLayouterOptions();
};

onMounted(() => {
    showGraph();
    resizeTimer.value = setInterval(async() => {
        // const graphInstance = graphRef.value.getInstance();
        // await graphInstance.zoomToFit();
    }, 3000);
});
onUnmounted(() => {
    console.log('beforeUnmount:clear timer');
    clearInterval(resizeTimer.value);
});
</script>

<style>
</style>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
    .rel-map {
        background: none !important;
        .rel-node-shape-1 {
        }
    }
    .rel-toolbar{
        color: #ffffff;
        .c-current-zoom{
            color: #ffffff;
        }
    }
}
.my-graph{
  background: linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13));
}
@keyframes AnimationRound {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.c-round{
}
.c-round:hover{
  animation: AnimationRound 2s infinite;
}
</style>
```

## React 版本

### `customer-layout-force.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {Layout} from 'relation-graph-react';
import { RGJsonData, RGNode, RGLine, RGOptions, RGUserEvent, RelationGraphComponent, RGNodeSlotProps, RGLink } from 'relation-graph-react';
import './customer-layout-force.scss';
import {MyButton, MyLinkButton, MySlider} from "./RGDemoComponents/MyUIComponents";

class MyForceLayout extends Layout.ForceLayouter {
    constructor(arg1, arg2, arg3) {
        console.log('MyForceLayout..................');
        super(arg1, arg2, arg3);
    }
    resetCalcNodes() {
        this.forCalcNodes = [];
        this.calcNodeMap = new WeakMap();
        this.visibleNodes.forEach(thisNode => {
            const calcNode = {
                rgNode: thisNode,
                Fx: 0,
                Fy: 0,
                x: thisNode.x,
                y: thisNode.y,
                ignoreForce: (thisNode.dragging || (this.justLayoutSingleNode && !thisNode.singleNode)),
                force_weight: thisNode.force_weight || 1,
                forceCenterOffset_X: (thisNode.width || thisNode.el.offsetWidth || 60) / 2,
                forceCenterOffset_Y: (thisNode.height || thisNode.el.offsetHeight || 60) / 2,
                fixed: thisNode.fixed || false,
                myColor: thisNode.color

            };
            this.forCalcNodes.push(calcNode);
            this.calcNodeMap.set(thisNode, calcNode);
        });
    }
    calcNodesPosition() {
        const nodes = this.forCalcNodes;
        for (let i=0;i<this.forCalcNodes.length;i++) {
            const __node1 = this.forCalcNodes[i];
            if (__node1.ignoreForce) {
                continue;
            }
            if (__node1.fixed) {
                continue;
            }
            for (let j = 0; j < this.forCalcNodes.length;j++) {
                if (i !== j) {
                    const __node2 = this.forCalcNodes[j];
                    if (__node2.ignoreForce) {
                        continue;
                    }
                    this.addGravityByNode(__node1, __node2);
                    if (__node1.myColor === __node2.myColor) {
                        this.addElasticByLine(
                            __node1,
                            __node2,
                            1

                        );
                    }
                }
            }
        }
    }
}

const MyMainComponent = () => {
    const [maxLayoutTimes, setMaxLayoutTimes] = useState(3000);
    const [force_node_repulsion, setForce_node_repulsion] = useState(0.4);
    const [force_line_elastic, setForce_line_elastic] = useState(0.1);
    const graphRef = useRef<RelationGraphComponent|null>(null);
    const changeOptionsTimer = useRef<number>(0);
    const graphOptions: RGOptions = {
        debug: true,
        moveToCenterWhenRefresh: true,
        zoomToFitWhenRefresh: true,
        useAnimationWhenRefresh: false,
        defaultLineColor: 'rgba(255, 255, 255, 0.6)',
        defaultNodeColor: 'rgba(255, 255, 255, 0.6)',
        defaultNodeBorderWidth: 1,
        defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
        defaultNodeFontColor: '#1b7702',
        defaultNodeShape: 0,
        defaultNodeWidth: 60,
        defaultNodeHeight: 60,
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'bottom',
        defaultPolyLineRadius: 10,
        defaultLineShape: 1,
        placeOtherGroup: true,
        layout: {
            layoutName: 'force',
            maxLayoutTimes: 3000,
            force_node_repulsion: 0.4,
            force_line_elastic: 0.1
        }
    };
    const resizeTimer = useRef(0);

    const showGraph = async () => {
        const data: RGJsonData = { 'rootId': 'a', 'nodes': [{ 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' }, { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' }, { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' }, { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' }, { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' }, { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' }, { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' }, { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' }, { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' }, { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' }, { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' }, { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }], 'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' }, { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' }, { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' }, { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' }, { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' }, { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' }, { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' }, { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' }, { 'from': 'a', 'to': 'e2' }] };


        data.nodes.forEach(node => {
            node.color = ['red', 'yellow', 'blue'][Math.floor(Math.random() * 3)];
        });
        const graphInstance = graphRef.current!.getInstance();
        graphInstance.setLayouter(new MyForceLayout(graphInstance.layouter.layoutOptions, graphInstance.options, graphInstance));
        // await stopForceIfNeed();
        await graphInstance.setJsonData(data);
        await graphInstance.placeOtherNodes();
        await graphInstance.setZoom(30);
    };

    const stopForceIfNeed = async () => {
        const graphInstance = graphRef.current!.getInstance();
        await graphInstance.stopAutoLayout();
    };

    const realUpdateLayouterOptions = async () => {
        await stopForceIfNeed();
        const graphInstance = graphRef.current!.getInstance();
        const forceLayouter = graphInstance.layouter as MyForceLayout;
        forceLayouter.maxLayoutTimes = maxLayoutTimes;
        forceLayouter.force_node_repulsion = force_node_repulsion;
        forceLayouter.force_line_elastic = force_line_elastic;
        setTimeout(async() => {
            await graphInstance.startAutoLayout();
        }, 500);
    };

    const updateLayouterOptions = async () => {
        if (changeOptionsTimer.current) {
            clearTimeout(changeOptionsTimer.current);
        }
        changeOptionsTimer.current = setTimeout(() => {
            realUpdateLayouterOptions();
        }, 500);
    };
    const resetNodeColor = async () => {
        const graphInstance = graphRef.current!.getInstance();
        for (const node of graphInstance.getNodes()) {
            node.color = ['red', 'yellow', 'blue'][Math.floor(Math.random() * 3)];
        }
        await updateLayouterOptions();
    };

    useEffect(() => {
        showGraph();
        resizeTimer.current = setInterval(async() => {
            // const graphInstance = graphRef.current.getInstance();
            // await graphInstance.zoomToFit();
        }, 3000);
        return () => {
            console.log('beforeUnmount:clear timer');
            clearInterval(resizeTimer.current);
        };
    }, []);
    useEffect(() => {
        // console.log('xxxxxxxxxxxxxxxxxxx');
        updateLayouterOptions();
    }, [maxLayoutTimes, force_node_repulsion, force_line_elastic])

    return (
        <div>
            <div className="my-graph" style={{ height: '100vh' }}>
                <div style={{ width: '400px', borderRadius: '10px', position: 'absolute', left: '20px', top: '20px', zIndex: '20', padding: '30px', backgroundColor: '#ffffff', border: '#efefef solid 1px', boxShadow: '0 3px 9px rgba(0,21,41,.08)' }}>
                    <el-divider>Layout Parameters</el-divider>
                    Maximum Layout Times: {maxLayoutTimes}
                    <MySlider currentValue={maxLayoutTimes} min={30} max={5000} step={100} onChange={(newValue) => {setMaxLayoutTimes(newValue);}} />
                    Node Repulsion Coefficient: {force_node_repulsion} (Setting it too high will cause shaking)
                    <MySlider currentValue={force_node_repulsion} min={0.01} step={0.05} max={1.2} onChange={(newValue) => {setForce_node_repulsion(newValue);}} />
                    Line Elastic Coefficient: {force_line_elastic} (Setting it too high will cause shaking)
                    <MySlider currentValue={force_line_elastic} min={0.01} step={0.05} max={1.2} onChange={(newValue) => {setForce_line_elastic(newValue);}} />
                    {/*<MyButton onClick={() => {updateLayouterOptions();}}>Apply Settings</MyButton>*/}
                    <div>
                        <MyLinkButton onClick={() => {resetNodeColor();}}>Randomly Change Colors</MyLinkButton>
                    </div>
                </div>
                <RelationGraph
                    ref={graphRef}
                    options={graphOptions}
                />
            </div>
        </div>
    );
};

export default MyMainComponent;
```

### `customer-layout-force.scss`

```scss
.relation-graph {
  .rel-map {
    background: none !important;
    .rel-node-shape-1 {
    }
  }
  .rel-toolbar {
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
}
.my-graph {
  background: linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13));
}
@keyframes AnimationRound {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.c-round {
}
.c-round:hover {
  animation: AnimationRound 2s infinite;
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
