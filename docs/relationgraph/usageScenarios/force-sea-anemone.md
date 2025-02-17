# 小玩意-海葵

## Vue2 版本

### `force-sea-anemone.vue`

```javascript
<template>
  <div>
    <div class="my-graph" style="height: calc(100vh - 10px);">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
      >
        <template #graph-plug>
          <div class="c-user-toolbar">
            <div class="c-logo-circle">
              <div class="c-user-button">
                <div v-if="playing" class="c-logo-dot"></div>
                <div v-if="playing" class="c-logo-dot" style="margin-left:8px;margin-top:0px;width:7px;height:7px;"></div>
              </div>
              <div class="c-rg-logo">
                <img style="width: 25px;height:25px;" src="https://www.relation-graph.com/images/rg-logo-135-135.png" />
              </div>
            </div>
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
  debug: false,
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
    maxLayoutTimes: 30000,
    force_node_repulsion: 1, // 全局设置，节点之间的斥力系数，默认为1，建议合理的取值范围:0.1 -- 10
    force_line_elastic: 1 // 全局设置，线条的牵引系数，默认为1, 建议合理的取值范围:0.1 -- 10
  }
};
export default {
  name: 'ForceSeaAnemone',
  components: { },
  data() {
    return {
      resizeTimer: null,
      optIndex: 0,
      playing: true,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
    this.resizeTimer = setInterval(async() => {
      await this.updateLayouterOptions();
    }, 3000);
  },
  methods: {
    showGraph() {
      const __graph_json_data_big = { 'rootId': 'a', 'nodes': [{ 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' }, { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' }, { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' }, { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' }, { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' }, { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' }, { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' }, { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' }, { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' }, { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' }, { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' }, { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }], 'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' }, { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' }, { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' }, { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' }, { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' }, { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' }, { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' }, { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' }] };

      const graphRef = this.$refs.graphRef;
      graphRef.setJsonData(__graph_json_data_big, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
        graphInstance.setZoom(30);
      });
    },
    async updateLayouterOptions() {
      const graphInstance = this.$refs.graphRef.getInstance();
      // await graphInstance.stopAutoLayout();
      const opts = [[0.2, 2], [1, 0.2]];
      const opt = opts[this.optIndex++];
      if (this.optIndex >= opts.length) {
        this.optIndex = 0;
      }
      graphInstance.layouter.force_node_repulsion = opt[0];
      graphInstance.layouter.force_line_elastic = opt[1];

      // const graphInstance = this.$refs.graphRef.getInstance();
      // await graphInstance.zoomToFit();
      setTimeout(async() => {
        // await graphInstance.startAutoLayout();
      }, 500);
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
::v-deep .rel-map {
  background: none !important;
  .rel-node-shape-1 {
  }
}
::v-deep .rel-toolbar{
  color: #ffffff;
  .c-current-zoom{
    color: #ffffff;
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
.c-user-toolbar {
  z-index: 22;
  margin:20px;
  height: 50px;
  width:50px;
  position: absolute;
  cursor: pointer;
  .c-logo-circle{
    height:100%;
    position: relative;
    .c-user-button{
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.51);
      border:rgba(255, 255, 255, 0.9) solid 1px;
      border-radius: 50%;
      //box-shadow: -3px -3px 5px rgba(253, 252, 252, 0.47);
      animation:turn 2s linear infinite;
    }
    .c-rg-logo{
      position: absolute;
      height: 100%;
      width: 100%;
      padding:11px;
      border-radius: 50%;
      &:hover{
        background-color: rgba(255, 255, 255, 0.3);
      }
      & svg {
        width: 30px;
        height: 30px;
        margin:auto;
      }
    }
    .c-logo-dot{
      position: absolute;
      height: 10px;
      width:10px;
      margin-top:2px;
      margin-left:2px;
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: -3px 3px 9px rgba(250, 249, 249, 0.8);
    }
  }
}
</style>
```

## Vue3 版本

### `force-sea-anemone.vue`

```javascript
<template>
  <div>
    <div class="my-graph" style="height: calc(100vh - 10px);">
      <RelationGraph

        ref="graphRef"
        :options="graphOptions"
      >
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount} from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    debug: false,
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
        maxLayoutTimes: 30000,
        force_node_repulsion: 1,
        force_line_elastic: 1

    }
};
const resizeTimer = ref();
const optIndex = ref(0);
const playing = ref(true);
const graphRef = ref<RelationGraphComponent>();

onMounted(() => {
    showGraph();
    resizeTimer.value = setInterval(async () => {
        await updateLayouterOptions();
    }, 3000);
});

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a' },
            { id: 'b', text: 'b' },
            { id: 'b1', text: 'b1' },
            { id: 'b1-1', text: 'b1-1' },
            { id: 'b1-2', text: 'b1-2' },
            { id: 'b1-3', text: 'b1-3' },
            { id: 'b1-4', text: 'b1-4' },
            { id: 'b1-5', text: 'b1-5' },
            { id: 'b1-6', text: 'b1-6' },
            { id: 'b2', text: 'b2' },
            { id: 'b2-1', text: 'b2-1' },
            { id: 'b2-2', text: 'b2-2' },
            { id: 'b2-3', text: 'b2-3' },
            { id: 'b2-4', text: 'b2-4' },
            { id: 'b3', text: 'b3' },
            { id: 'b3-1', text: 'b3-1' },
            { id: 'b3-2', text: 'b3-2' },
            { id: 'b3-3', text: 'b3-3' },
            { id: 'b3-4', text: 'b3-4' },
            { id: 'b3-5', text: 'b3-5' },
            { id: 'b3-6', text: 'b3-6' },
            { id: 'b3-7', text: 'b3-7' },
            { id: 'b4', text: 'b4' },
            { id: 'b4-1', text: 'b4-1' },
            { id: 'b4-2', text: 'b4-2' },
            { id: 'b4-3', text: 'b4-3' },
            { id: 'b4-4', text: 'b4-4' },
            { id: 'b4-5', text: 'b4-5' },
            { id: 'b4-6', text: 'b4-6' },
            { id: 'b4-7', text: 'b4-7' },
            { id: 'b4-8', text: 'b4-8' },
            { id: 'b4-9', text: 'b4-9' },
            { id: 'b5', text: 'b5' },
            { id: 'b5-1', text: 'b5-1' },
            { id: 'b5-2', text: 'b5-2' },
            { id: 'b5-3', text: 'b5-3' },
            { id: 'b5-4', text: 'b5-4' },
            { id: 'b6', text: 'b6' },
            { id: 'b6-1', text: 'b6-1' },
            { id: 'b6-2', text: 'b6-2' },
            { id: 'b6-3', text: 'b6-3' },
            { id: 'b6-4', text: 'b6-4' },
            { id: 'b6-5', text: 'b6-5' },
            { id: 'c', text: 'c' },
            { id: 'c1', text: 'c1' },
            { id: 'c1-1', text: 'c1-1' },
            { id: 'c1-2', text: 'c1-2' },
            { id: 'c1-3', text: 'c1-3' },
            { id: 'c1-4', text: 'c1-4' },
            { id: 'c1-5', text: 'c1-5' },
            { id: 'c1-6', text: 'c1-6' },
            { id: 'c1-7', text: 'c1-7' },
            { id: 'c2', text: 'c2' },
            { id: 'c2-1', text: 'c2-1' },
            { id: 'c2-2', text: 'c2-2' },
            { id: 'c3', text: 'c3' },
            { id: 'c3-1', text: 'c3-1' },
            { id: 'c3-2', text: 'c3-2' },
            { id: 'c3-3', text: 'c3-3' },
            { id: 'd', text: 'd' },
            { id: 'd1', text: 'd1' },
            { id: 'd1-1', text: 'd1-1' },
            { id: 'd1-2', text: 'd1-2' },
            { id: 'd1-3', text: 'd1-3' },
            { id: 'd1-4', text: 'd1-4' },
            { id: 'd1-5', text: 'd1-5' },
            { id: 'd1-6', text: 'd1-6' },
            { id: 'd1-7', text: 'd1-7' },
            { id: 'd1-8', text: 'd1-8' },
            { id: 'd2', text: 'd2' },
            { id: 'd2-1', text: 'd2-1' },
            { id: 'd2-2', text: 'd2-2' },
            { id: 'd3', text: 'd3' },
            { id: 'd3-1', text: 'd3-1' },
            { id: 'd3-2', text: 'd3-2' },
            { id: 'd3-3', text: 'd3-3' },
            { id: 'd3-4', text: 'd3-4' },
            { id: 'd3-5', text: 'd3-5' },
            { id: 'd4', text: 'd4' },
            { id: 'd4-1', text: 'd4-1' },
            { id: 'd4-2', text: 'd4-2' },
            { id: 'd4-3', text: 'd4-3' },
            { id: 'd4-4', text: 'd4-4' },
            { id: 'd4-5', text: 'd4-5' },
            { id: 'd4-6', text: 'd4-6' },
            { id: 'e', text: 'e' },
            { id: 'e1', text: 'e1' },
            { id: 'e1-1', text: 'e1-1' },
            { id: 'e1-2', text: 'e1-2' },
            { id: 'e1-3', text: 'e1-3' },
            { id: 'e1-4', text: 'e1-4' },
            { id: 'e1-5', text: 'e1-5' },
            { id: 'e1-6', text: 'e1-6' },
            { id: 'e2', text: 'e2' },
            { id: 'e2-1', text: 'e2-1' },
            { id: 'e2-2', text: 'e2-2' },
            { id: 'e2-3', text: 'e2-3' },
            { id: 'e2-4', text: 'e2-4' },
            { id: 'e2-5', text: 'e2-5' },
            { id: 'e2-6', text: 'e2-6' },
            { id: 'e2-7', text: 'e2-7' },
            { id: 'e2-8', text: 'e2-8' },
            { id: 'e2-9', text: 'e2-9' }
        ],
        lines: [
            { from: 'a', to: 'b' },
            { from: 'b', to: 'b1' },
            { from: 'b1', to: 'b1-1' },
            { from: 'b1', to: 'b1-2' },
            { from: 'b1', to: 'b1-3' },
            { from: 'b1', to: 'b1-4' },
            { from: 'b1', to: 'b1-5' },
            { from: 'b1', to: 'b1-6' },
            { from: 'b', to: 'b2' },
            { from: 'b2', to: 'b2-1' },
            { from: 'b2', to: 'b2-2' },
            { from: 'b2', to: 'b2-3' },
            { from: 'b2', to: 'b2-4' },
            { from: 'b', to: 'b3' },
            { from: 'b3', to: 'b3-1' },
            { from: 'b3', to: 'b3-2' },
            { from: 'b3', to: 'b3-3' },
            { from: 'b3', to: 'b3-4' },
            { from: 'b3', to: 'b3-5' },
            { from: 'b3', to: 'b3-6' },
            { from: 'b3', to: 'b3-7' },
            { from: 'b', to: 'b4' },
            { from: 'b4', to: 'b4-1' },
            { from: 'b4', to: 'b4-2' },
            { from: 'b4', to: 'b4-3' },
            { from: 'b4', to: 'b4-4' },
            { from: 'b4', to: 'b4-5' },
            { from: 'b4', to: 'b4-6' },
            { from: 'b4', to: 'b4-7' },
            { from: 'b4', to: 'b4-8' },
            { from: 'b4', to: 'b4-9' },
            { from: 'b', to: 'b5' },
            { from: 'b5', to: 'b5-1' },
            { from: 'b5', to: 'b5-2' },
            { from: 'b5', to: 'b5-3' },
            { from: 'b5', to: 'b5-4' },
            { from: 'b', to: 'b6' },
            { from: 'b6', to: 'b6-1' },
            { from: 'b6', to: 'b6-2' },
            { from: 'b6', to: 'b6-3' },
            { from: 'b6', to: 'b6-4' },
            { from: 'b6', to: 'b6-5' },
            { from: 'a', to: 'c' },
            { from: 'c', to: 'c1' },
            { from: 'c1', to: 'c1-1' },
            { from: 'c1', to: 'c1-2' },
            { from: 'c1', to: 'c1-3' },
            { from: 'c1', to: 'c1-4' },
            { from: 'c1', to: 'c1-5' },
            { from: 'c1', to: 'c1-6' },
            { from: 'c1', to: 'c1-7' },
            { from: 'c', to: 'c2' },
            { from: 'c2', to: 'c2-1' },
            { from: 'c2', to: 'c2-2' },
            { from: 'c', to: 'c3' },
            { from: 'c3', to: 'c3-1' },
            { from: 'c3', to: 'c3-2' },
            { from: 'c3', to: 'c3-3' },
            { from: 'a', to: 'd' },
            { from: 'd', to: 'd1' },
            { from: 'd1', to: 'd1-1' },
            { from: 'd1', to: 'd1-2' },
            { from: 'd1', to: 'd1-3' },
            { from: 'd1', to: 'd1-4' },
            { from: 'd1', to: 'd1-5' },
            { from: 'd1', to: 'd1-6' },
            { from: 'd1', to: 'd1-7' },
            { from: 'd1', to: 'd1-8' },
            { from: 'd', to: 'd2' },
            { from: 'd2', to: 'd2-1' },
            { from: 'd2', to: 'd2-2' },
            { from: 'd', to: 'd3' },
            { from: 'd3', to: 'd3-1' },
            { from: 'd3', to: 'd3-2' },
            { from: 'd3', to: 'd3-3' },
            { from: 'd3', to: 'd3-4' },
            { from: 'd3', to: 'd3-5' },
            { from: 'd', to: 'd4' },
            { from: 'd4', to: 'd4-1' },
            { from: 'd4', to: 'd4-2' },
            { from: 'd4', to: 'd4-3' },
            { from: 'd4', to: 'd4-4' },
            { from: 'd4', to: 'd4-5' },
            { from: 'd4', to: 'd4-6' },
            { from: 'a', to: 'e' },
            { from: 'e', to: 'e1' },
            { from: 'e1', to: 'e1-1' },
            { from: 'e1', to: 'e1-2' },
            { from: 'e1', to: 'e1-3' },
            { from: 'e1', to: 'e1-4' },
            { from: 'e1', to: 'e1-5' },
            { from: 'e1', to: 'e1-6' },
            { from: 'e', to: 'e2' },
            { from: 'e2', to: 'e2-1' },
            { from: 'e2', to: 'e2-2' },
            { from: 'e2', to: 'e2-3' },
            { from: 'e2', to: 'e2-4' },
            { from: 'e2', to: 'e2-5' },
            { from: 'e2', to: 'e2-6' },
            { from: 'e2', to: 'e2-7' },
            { from: 'e2', to: 'e2-8' },
            { from: 'e2', to: 'e2-9' }
        ]
    };

    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    graphInstance.setZoom(30);
};

const updateLayouterOptions = async () => {
    const graphInstance = graphRef.value.getInstance();
    const opts = [[0.2, 2], [1, 0.2]];
    const opt = opts[optIndex.value++];
    if (optIndex.value >= opts.length) {
        optIndex.value = 0;
    }
    graphInstance.layouter.force_node_repulsion = opt[0];
    graphInstance.layouter.force_line_elastic = opt[1];

    setTimeout(async () => {
        // await graphInstance.startAutoLayout();
    }, 500);
};
onBeforeUnmount(() => {
    console.log('beforeUnmount: clear timer');
    clearInterval(resizeTimer.value);
});

</script>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
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
</style>
```

## React 版本

### `force-sea-anemone.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph from 'relation-graph-react'
import type {
  RGOptions,
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
} from 'relation-graph-react'
import './force-sea-anemone.scss'

const ForceSeaAnemone = () => {
  const graphRef = (useRef < RelationGraphComponent) | (null > null)
  const optIndex = useRef(0)

  useEffect(() => {
    showGraph()
    const resizeTimer = setInterval(async () => {
      await updateLayouterOptions()
    }, 3000)

    return () => {
      clearInterval(resizeTimer)
    }
  }, [])

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'a' },
        { id: 'b', text: 'b' },
        { id: 'b1', text: 'b1' },
        { id: 'b1-1', text: 'b1-1' },
        { id: 'b1-2', text: 'b1-2' },
        { id: 'b1-3', text: 'b1-3' },
        { id: 'b1-4', text: 'b1-4' },
        { id: 'b1-5', text: 'b1-5' },
        { id: 'b1-6', text: 'b1-6' },
        { id: 'b2', text: 'b2' },
        { id: 'b2-1', text: 'b2-1' },
        { id: 'b2-2', text: 'b2-2' },
        { id: 'b2-3', text: 'b2-3' },
        { id: 'b2-4', text: 'b2-4' },
        { id: 'b3', text: 'b3' },
        { id: 'b3-1', text: 'b3-1' },
        { id: 'b3-2', text: 'b3-2' },
        { id: 'b3-3', text: 'b3-3' },
        { id: 'b3-4', text: 'b3-4' },
        { id: 'b3-5', text: 'b3-5' },
        { id: 'b3-6', text: 'b3-6' },
        { id: 'b3-7', text: 'b3-7' },
        { id: 'b4', text: 'b4' },
        { id: 'b4-1', text: 'b4-1' },
        { id: 'b4-2', text: 'b4-2' },
        { id: 'b4-3', text: 'b4-3' },
        { id: 'b4-4', text: 'b4-4' },
        { id: 'b4-5', text: 'b4-5' },
        { id: 'b4-6', text: 'b4-6' },
        { id: 'b4-7', text: 'b4-7' },
        { id: 'b4-8', text: 'b4-8' },
        { id: 'b4-9', text: 'b4-9' },
        { id: 'b5', text: 'b5' },
        { id: 'b5-1', text: 'b5-1' },
        { id: 'b5-2', text: 'b5-2' },
        { id: 'b5-3', text: 'b5-3' },
        { id: 'b5-4', text: 'b5-4' },
        { id: 'b6', text: 'b6' },
        { id: 'b6-1', text: 'b6-1' },
        { id: 'b6-2', text: 'b6-2' },
        { id: 'b6-3', text: 'b6-3' },
        { id: 'b6-4', text: 'b6-4' },
        { id: 'b6-5', text: 'b6-5' },
        { id: 'c', text: 'c' },
        { id: 'c1', text: 'c1' },
        { id: 'c1-1', text: 'c1-1' },
        { id: 'c1-2', text: 'c1-2' },
        { id: 'c1-3', text: 'c1-3' },
        { id: 'c1-4', text: 'c1-4' },
        { id: 'c1-5', text: 'c1-5' },
        { id: 'c1-6', text: 'c1-6' },
        { id: 'c1-7', text: 'c1-7' },
        { id: 'c2', text: 'c2' },
        { id: 'c2-1', text: 'c2-1' },
        { id: 'c2-2', text: 'c2-2' },
        { id: 'c3', text: 'c3' },
        { id: 'c3-1', text: 'c3-1' },
        { id: 'c3-2', text: 'c3-2' },
        { id: 'c3-3', text: 'c3-3' },
        { id: 'd', text: 'd' },
        { id: 'd1', text: 'd1' },
        { id: 'd1-1', text: 'd1-1' },
        { id: 'd1-2', text: 'd1-2' },
        { id: 'd1-3', text: 'd1-3' },
        { id: 'd1-4', text: 'd1-4' },
        { id: 'd1-5', text: 'd1-5' },
        { id: 'd1-6', text: 'd1-6' },
        { id: 'd1-7', text: 'd1-7' },
        { id: 'd1-8', text: 'd1-8' },
        { id: 'd2', text: 'd2' },
        { id: 'd2-1', text: 'd2-1' },
        { id: 'd2-2', text: 'd2-2' },
        { id: 'd3', text: 'd3' },
        { id: 'd3-1', text: 'd3-1' },
        { id: 'd3-2', text: 'd3-2' },
        { id: 'd3-3', text: 'd3-3' },
        { id: 'd3-4', text: 'd3-4' },
        { id: 'd3-5', text: 'd3-5' },
        { id: 'd4', text: 'd4' },
        { id: 'd4-1', text: 'd4-1' },
        { id: 'd4-2', text: 'd4-2' },
        { id: 'd4-3', text: 'd4-3' },
        { id: 'd4-4', text: 'd4-4' },
        { id: 'd4-5', text: 'd4-5' },
        { id: 'd4-6', text: 'd4-6' },
        { id: 'e', text: 'e' },
        { id: 'e1', text: 'e1' },
        { id: 'e1-1', text: 'e1-1' },
        { id: 'e1-2', text: 'e1-2' },
        { id: 'e1-3', text: 'e1-3' },
        { id: 'e1-4', text: 'e1-4' },
        { id: 'e1-5', text: 'e1-5' },
        { id: 'e1-6', text: 'e1-6' },
        { id: 'e2', text: 'e2' },
        { id: 'e2-1', text: 'e2-1' },
        { id: 'e2-2', text: 'e2-2' },
        { id: 'e2-3', text: 'e2-3' },
        { id: 'e2-4', text: 'e2-4' },
        { id: 'e2-5', text: 'e2-5' },
        { id: 'e2-6', text: 'e2-6' },
        { id: 'e2-7', text: 'e2-7' },
        { id: 'e2-8', text: 'e2-8' },
        { id: 'e2-9', text: 'e2-9' },
      ],
      lines: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'b1' },
        { from: 'b1', to: 'b1-1' },
        { from: 'b1', to: 'b1-2' },
        { from: 'b1', to: 'b1-3' },
        { from: 'b1', to: 'b1-4' },
        { from: 'b1', to: 'b1-5' },
        { from: 'b1', to: 'b1-6' },
        { from: 'b', to: 'b2' },
        { from: 'b2', to: 'b2-1' },
        { from: 'b2', to: 'b2-2' },
        { from: 'b2', to: 'b2-3' },
        { from: 'b2', to: 'b2-4' },
        { from: 'b', to: 'b3' },
        { from: 'b3', to: 'b3-1' },
        { from: 'b3', to: 'b3-2' },
        { from: 'b3', to: 'b3-3' },
        { from: 'b3', to: 'b3-4' },
        { from: 'b3', to: 'b3-5' },
        { from: 'b3', to: 'b3-6' },
        { from: 'b3', to: 'b3-7' },
        { from: 'b', to: 'b4' },
        { from: 'b4', to: 'b4-1' },
        { from: 'b4', to: 'b4-2' },
        { from: 'b4', to: 'b4-3' },
        { from: 'b4', to: 'b4-4' },
        { from: 'b4', to: 'b4-5' },
        { from: 'b4', to: 'b4-6' },
        { from: 'b4', to: 'b4-7' },
        { from: 'b4', to: 'b4-8' },
        { from: 'b4', to: 'b4-9' },
        { from: 'b', to: 'b5' },
        { from: 'b5', to: 'b5-1' },
        { from: 'b5', to: 'b5-2' },
        { from: 'b5', to: 'b5-3' },
        { from: 'b5', to: 'b5-4' },
        { from: 'b', to: 'b6' },
        { from: 'b6', to: 'b6-1' },
        { from: 'b6', to: 'b6-2' },
        { from: 'b6', to: 'b6-3' },
        { from: 'b6', to: 'b6-4' },
        { from: 'b6', to: 'b6-5' },
        { from: 'a', to: 'c' },
        { from: 'c', to: 'c1' },
        { from: 'c1', to: 'c1-1' },
        { from: 'c1', to: 'c1-2' },
        { from: 'c1', to: 'c1-3' },
        { from: 'c1', to: 'c1-4' },
        { from: 'c1', to: 'c1-5' },
        { from: 'c1', to: 'c1-6' },
        { from: 'c1', to: 'c1-7' },
        { from: 'c', to: 'c2' },
        { from: 'c2', to: 'c2-1' },
        { from: 'c2', to: 'c2-2' },
        { from: 'c', to: 'c3' },
        { from: 'c3', to: 'c3-1' },
        { from: 'c3', to: 'c3-2' },
        { from: 'c3', to: 'c3-3' },
        { from: 'a', to: 'd' },
        { from: 'd', to: 'd1' },
        { from: 'd1', to: 'd1-1' },
        { from: 'd1', to: 'd1-2' },
        { from: 'd1', to: 'd1-3' },
        { from: 'd1', to: 'd1-4' },
        { from: 'd1', to: 'd1-5' },
        { from: 'd1', to: 'd1-6' },
        { from: 'd1', to: 'd1-7' },
        { from: 'd1', to: 'd1-8' },
        { from: 'd', to: 'd2' },
        { from: 'd2', to: 'd2-1' },
        { from: 'd2', to: 'd2-2' },
        { from: 'd', to: 'd3' },
        { from: 'd3', to: 'd3-1' },
        { from: 'd3', to: 'd3-2' },
        { from: 'd3', to: 'd3-3' },
        { from: 'd3', to: 'd3-4' },
        { from: 'd3', to: 'd3-5' },
        { from: 'd', to: 'd4' },
        { from: 'd4', to: 'd4-1' },
        { from: 'd4', to: 'd4-2' },
        { from: 'd4', to: 'd4-3' },
        { from: 'd4', to: 'd4-4' },
        { from: 'd4', to: 'd4-5' },
        { from: 'd4', to: 'd4-6' },
        { from: 'a', to: 'e' },
        { from: 'e', to: 'e1' },
        { from: 'e1', to: 'e1-1' },
        { from: 'e1', to: 'e1-2' },
        { from: 'e1', to: 'e1-3' },
        { from: 'e1', to: 'e1-4' },
        { from: 'e1', to: 'e1-5' },
        { from: 'e1', to: 'e1-6' },
        { from: 'e', to: 'e2' },
        { from: 'e2', to: 'e2-1' },
        { from: 'e2', to: 'e2-2' },
        { from: 'e2', to: 'e2-3' },
        { from: 'e2', to: 'e2-4' },
        { from: 'e2', to: 'e2-5' },
        { from: 'e2', to: 'e2-6' },
        { from: 'e2', to: 'e2-7' },
        { from: 'e2', to: 'e2-8' },
        { from: 'e2', to: 'e2-9' },
      ],
    }

    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data)
      graphInstance.setZoom(30)
    }
  }

  const updateLayouterOptions = async () => {
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      const opts = [
        [0.2, 2],
        [1, 0.2],
      ]
      const opt = opts[optIndex.current++]
      if (optIndex.current >= opts.length) {
        optIndex.current = 0
      }
      graphInstance.layouter.force_node_repulsion = opt[0]
      graphInstance.layouter.force_line_elastic = opt[1]

      setTimeout(async () => {
        // await graphInstance.startAutoLayout();
      }, 500)
    }
  }
  const graphOptions: RGOptions = {
    debug: false,
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
    layout: {
      layoutName: 'force',
      from: 'left',
      maxLayoutTimes: 30000,
      force_node_repulsion: 1,
      force_line_elastic: 1,
    },
  }
  return (
    <div>
      <div className="my-graph" style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions} />
      </div>
    </div>
  )
}

export default ForceSeaAnemone
```

### `force-sea-anemone.scss`

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
```
