# 缩略示意图（鹰眼）

## Vue2 版本

### `gee-thumbnail-diagram.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              一个粗糙的缩略图，后续会改进，到时候您只需要升级版本即可
            </div>
          </MyDemoPanel>
          <RGMiniView width="300px" height="150px" position="tr" />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
import { RGMiniView } from 'relation-graph';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';
export default {
  name: 'Demo',
  components: { MyDemoPanel, RGMiniView },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        // 这里可以参考"Graph 图谱"中的参数进行设置
        allowShowMiniToolBar: false,
        layout: {
          layoutName: 'force'
        }
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = { 'rootId': 'a', 'nodes': [{ 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' }, { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' }, { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' }, { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' }, { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' }, { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' }, { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' }, { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' }, { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' }, { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' }, { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' }, { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }], 'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' }, { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' }, { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' }, { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' }, { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' }, { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' }, { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' }, { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' }] };

      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    }
  }
};
</script>
<style scoped lang="scss">
::v-deep .relation-graph {
  .rel-map {
    background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
}
</style>
```

### 📂 rg-ui-simple

#### `MyDemoPanel.vue`

```javascript
<template>
  <div class="c-my-demo-panel"
       :class="[(closed ? 'c-my-demo-panel-closed':''), (right ? 'c-my-demo-panel-r' : '')]"
       :style="{
         '--my-panel-width': this.width,
         '--my-panel-top': this.top,
          left: right ? undefined : left,
          right: right ? right : undefined
       }"
  >
    <div class="my-footer">
      <div v-if="closed" class="my-icon my-icon-open" @click="tooglePanel">{{right ? '↙':'↘'}}</div>
      <div v-else class="my-icon my-icon-close" @click="tooglePanel">{{right ? '➡':'⬅'}}</div>
    </div>
    <div class="my-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDemoPanel',
  props: {
    width: {
      mustUseProp: false,
      default: '400px',
      type: String
    },
    left: {
      mustUseProp: false,
      default: '10px',
      type: String
    },
    right: {
      mustUseProp: false,
      default: '',
      type: String
    },
    top: {
      mustUseProp: false,
      default: '10px',
      type: String
    }
  },
  data() {
    return {
      closed: false
    };
  },
  mounted() {
  },
  methods: {
    tooglePanel() {
      this.closed = !this.closed;
    }
  }
};
</script>
<style lang="scss" scoped>
.c-my-demo-panel{
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0,21,41,.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title{
    color: #333333;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
  .c-content{
    color: #666666;
    font-size: 14px;
    line-height: 20px;
    padding:6px;
  }
  .c-button {
    line-height: 18px;
    display: inline-block;
    background-color: #035a8a;
    color: #ffffff;
    font-size: 12px;
    padding: 5px 15px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: rgba(3, 90, 138, 0.68);
    }
  }
  .c-link {
    color: #167fb7;
    cursor: pointer;
    padding: 0px 15px;
    &:hover {
      text-decoration: underline #167fb7;
    }
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
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
</style>
```

## Vue3 版本

### `gee-thumbnail-diagram.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="$graphRef" :options="graphOptions">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              A rough thumbnail, which will be improved later, and you only need to upgrade the version at that time

            </div>
          </MyDemoPanel>
          <RGMiniView width="300px" height="150px" position="tr" />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import RelationGraph, {
    RelationGraphComponent,
    RGOptions,
    RGJsonData,
    RGNode,
    RGLine,
    RGLink,
    RGUserEvent,
    RelationGraphInstance
} from 'relation-graph-vue3';
import { RGMiniView } from 'relation-graph-vue3';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel.vue';

const $graphRef = ref<RelationGraphComponent>(null);
const graphInstance = computed<RelationGraphInstance>(() => $graphRef.value?.getInstance());
const graphOptions: RGOptions = {
    allowShowMiniToolBar: false,
    layout: {
        layoutName: 'force'
    }
};

onMounted(() => {
    showGraph();
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

    const graphInstance = $graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};
</script>

<style scoped lang="scss">
::v-deep(.relation-graph) {
  .rel-map {
    background-size: 30px 30px;
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 0),
      linear-gradient(180deg, rgba(0, 0, 0, 0.1) 1px, transparent 0);
  }
}
</style>
```

### 📂 RGDemoComponents

#### `MyDemoPanel.vue`

```javascript
<template>
  <div
    class="c-my-demo-panel"
    :class="[(closed ? 'c-my-demo-panel-closed' : ''), (right ? 'c-my-demo-panel-r' : '')]"
    :style="{
      '--my-panel-width': width,
      '--my-panel-top': top,
      left: right ? undefined : left,
      right: right ? right : undefined
    }"
  >
    <div class="my-footer">
      <div v-if="closed" class="my-icon my-icon-open" @click="togglePanel">{{ right ? '↙' : '↘' }}</div>
      <div v-else class="my-icon my-icon-close" @click="togglePanel">{{ right ? '➡' : '⬅' }}</div>
    </div>
    <div class="my-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    width: {
        type: String,
        default: '400px'
    },
    left: {
        type: String,
        default: '10px'
    },
    right: {
        type: String,
        default: ''
    },
    top: {
        type: String,
        default: '10px'
    }
});

const closed = ref(false);

function togglePanel() {
    closed.value = !closed.value;
}
</script>
<style lang="scss" scoped>
.c-my-demo-panel{
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0,21,41,.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title{
    color: #333333;
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
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
::v-deep(.c-content) {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  padding:6px;
}
::v-deep(.c-button) {
  line-height: 18px;
  display: inline-block;
  background-color: #035a8a;
  color: #ffffff;
  font-size: 12px;
  padding: 5px 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(3, 90, 138, 0.68);
  }
}
::v-deep(.c-link) {
  color: #167fb7;
  cursor: pointer;
  padding: 0px 15px;
  &:hover {
    text-decoration: underline #167fb7;
  }
}
</style>
```

## React 版本

### `gee-thumbnail-diagram.tsx`

```javascript
import React, { useRef, useEffect } from 'react';
import { RelationGraphComponent, RGOptions, RGJsonData } from 'relation-graph-react';
import RelationGraph, { RGMiniView, RGSlotOnGraph } from 'relation-graph-react';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel';

import './gee-thumbnail-diagram.scss';
const MyThumbnailDiagram = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph();
  }, []);

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

    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };
  const graphOptions: RGOptions = {
    allowShowMiniToolBar: false,
    layout: {
      layoutName: 'force'
    }
  };
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions}>
          <RGSlotOnGraph>
            <MyDemoPanel>
              <div className="c-content">
                A rough thumbnail, which will be improved later, and you only need to upgrade the version at that time
              </div>
            </MyDemoPanel>
            <RGMiniView width="300px" height="150px" position="tr" />
          </RGSlotOnGraph>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyThumbnailDiagram;
```

### `gee-thumbnail-diagram.scss`

```scss
.relation-graph {
  .rel-map {
    background-size: 30px 30px;
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 0), linear-gradient(180deg, rgba(
            0,
            0,
            0,
            0.1
          ) 1px, transparent 0);
  }
}
```

### 📂 RGDemoComponents

#### `MyDemoPanel.tsx`

```javascript
import React, { useState } from 'react';
import './MyDemoPanel.scss';

declare module 'react' {
  interface CSSProperties {
    // 这里可以添加任意数量的自定义属性
    '--my-panel-width'?: string;
    '--my-panel-top'?: string;
  }
}
const MyDemoPanel:React.FC<{ width?:string, left?:string, right?:string, top?:string }> = ({ children, width = '400px', left = '10px', right = '', top = '10px' }) => {
  const [closed, setClosed] = useState(false);
  const togglePanel = () => {
    setClosed(!closed);
  };

  const panelClasses = `c-my-demo-panel ${closed ? 'c-my-demo-panel-closed' : ''} ${right ? 'c-my-demo-panel-r' : ''}`;
  const iconClasses = `my-icon ${closed ? 'my-icon-open' : 'my-icon-close'}`;

  return (
    <div
      className={panelClasses}
      style={{
        '--my-panel-width': width,
        '--my-panel-top': top,
        left: right ? undefined : left,
        right: right || undefined
      }}
    >
      <div className="my-footer">
        <div className={iconClasses} onClick={togglePanel}>
          {closed ? (right ? '↙' : '↘') : (right ? '➡' : '⬅')}
        </div>
      </div>
      <div className="my-body">
        {children}
      </div>
    </div>
  );
};

export default MyDemoPanel;
```

#### `MyDemoPanel.scss`

```scss
.c-my-demo-panel {
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0, 21, 41, 0.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  //transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title {
    color: #333333;
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
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
.c-content {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  padding: 6px;
}
.c-button {
  line-height: 18px;
  display: inline-block;
  background-color: #035a8a;
  color: #ffffff;
  font-size: 12px;
  padding: 5px 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(3, 90, 138, 0.68);
  }
}
.c-link {
  color: #167fb7;
  cursor: pointer;
  padding: 0px 15px;
  &:hover {
    text-decoration: underline #167fb7;
  }
}
```
