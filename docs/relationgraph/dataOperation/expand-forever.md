# 动态追加数据 2

## Vue2 版本

### `expand-forever.vue`

```javascript
<template>
  <div>
    <div v-loading="g_loading" style="height:calc(100vh);">
      <RelationGraph
          ref="graphRef"
          :options="hTreeOptions"
          :on-node-expand="onNodeExpand"
          :on-node-collapse="onNodeCollapse"
      >
        <template #node="{node}">
          <div class="my-node">
            我的节点：{{node.text}}
          </div>
        </template>
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-option-name">点击展开/收起节点后：</div>
            <div>
              <el-radio-group v-model="relayout" @change="setRelayout">
                <el-radio-button :label="true">重新布局</el-radio-button>
                <el-radio-button :label="false">不重新布局</el-radio-button>
              </el-radio-group>
            </div>
            <div style="padding-top:5px;">
              <el-radio-group v-model="animation" @change="setRelayout">
                <el-radio-button :label="true">使用动画</el-radio-button>
                <el-radio-button :label="false">不使用动画</el-radio-button>
              </el-radio-group>
            </div>
          </MyDemoPanel>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';

export default {
  name: 'Demo',
  components: { MyDemoPanel },
  data() {
    return {
      relayout: true,
      animation: true,
      g_loading: false,
      hTreeOptions: {
        layout:
          {
            label: '中心',
            layoutName: 'tree',
            from: 'bottom',
            layoutClassName: 'seeks-layout-center',
            defaultJunctionPoint: 'border',
            defaultNodeShape: 0,
            defaultLineShape: 1,
            min_per_width: 170,
            max_per_width: 170,
            min_per_height: 160
          },
        defaultNodeShape: 1,
        defaultLineShape: 2,
        defaultJunctionPoint: 'tb',
        defaultNodeBorderWidth: 0,
        defaultLineColor: 'rgba(0, 186, 189, 1)',
        defaultNodeColor: 'rgba(0, 206, 209, 1)',
        defaultExpandHolderPosition: 'top',
        zoomToFitWhenRefresh: true, // UI
        reLayoutWhenExpandedOrCollapsed: true,
        useAnimationWhenExpanded: true,
        debug: false
      }
    };
  },
  mounted() {
    this.showHTree();
  },
  methods: {
    showHTree() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a' },
          { 'id': 'b', 'text': 'b' },
          { 'id': 'b1', 'text': 'b1' },
          { 'id': 'b2', 'text': 'b2' },
          { 'id': 'b2-1', 'text': 'b2-1', expandHolderPosition: 'top', expanded: false, data: { isNeedLoadDataFromRemoteServer: true }},
          { 'id': 'b2-2', 'text': 'b2-2' }
        ],
        'lines': [
          { 'from': 'a', 'to': 'b' },
          { 'from': 'b', 'to': 'b1' },
          { 'from': 'b', 'to': 'b2' },
          { 'from': 'b2', 'to': 'b2-1' },
          { 'from': 'b2', 'to': 'b2-2' }
        ]
      };
      this.g_loading = false;
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        // setTimeout(() => {
        //   const rootNode = graphInstance.graphData.rootNode
        //   console.log('debug0910:create rootNode coordinates:x', rootNode.x, rootNode.y);
        //   graphInstance.collapseNode(rootNode, null);
        // }, 3000);
      });
    },
    setRelayout() {
      this.$refs.graphRef.getInstance().options.reLayoutWhenExpandedOrCollapsed = this.relayout;
      this.$refs.graphRef.getInstance().options.useAnimationWhenExpanded = this.animation;
    },
    onNodeCollapse(node, e) {
    },
    // 通过onNodeExpand事件监听节点的展开事件，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
    onNodeExpand(node, e) {
      const graphInstance = this.$refs.graphRef.getInstance();
      console.log('onNodeExpand:', node);
      // 根据具体的业务需要决定是否需要从后台加载数据
      if (!node.data.isNeedLoadDataFromRemoteServer) {
        console.log('这个节点的子节点无需从远程加载数据');
        return;
      }
      // 判断是否已经动态加载数据了
      if (node.data.childrenLoaded) {
        console.log('这个节点的子节点已经加载过了');
        return;
      }
      node.data.childrenLoaded = true;
      const new_data = this.loadChildNodesFromRemoteServer(node);
      new_data.nodes.forEach(newNode => {
        newNode.x = node.x;
        newNode.y = node.y;
      });
      // 方式1：新增节点和线条数据，然后重新布局
      graphInstance.addNodes(new_data.nodes);
      graphInstance.addLines(new_data.lines);
      graphInstance.doLayout(); // 根据最新的数据重新布局
      // 方式2：appendJsonData就是上述代码的快捷方式，并加上一个渐入渐出的显示效果
      // graphInstance.appendJsonData(new_data);
    },
    loadChildNodesFromRemoteServer(node, callback) {
      const _new_json_data = {
        nodes: [
          { id: node.id + '-c-1', text: '子节点1', expandHolderPosition: 'top', expanded: false, data: { isNeedLoadDataFromRemoteServer: true }},
          { id: node.id + '-c-2', text: '子节点2' }
        ],
        lines: [
          { from: node.id, to: node.id + '-c-1' },
          { from: node.id, to: node.id + '-c-2' }
        ]
      };
      return _new_json_data;
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.my-node{
  width: 150px;
  height:60px;
  line-height: 60px;
}
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

### `expand-forever.vue`

```javascript
<template>
  <div>
    <div v-loading="g_loading" style="height:calc(100vh);">
      <RelationGraph

          ref="graphRef"
          :options="hTreeOptions"
          @node-expand="onNodeExpand"
          @node-collapse="onNodeCollapse"
      >
        <template #node="{node}">
          <div class="my-node">
            My Node: {{node.text}}
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">After expanding/collapsing a node:</div>
            <div class="c-option-name" style="font-size: 12px;">(Refers to non-dynamically loaded content, which will definitely be re-layouted after dynamically loading content)</div>
            <el-radio-group v-model="relayout" size="small" @change="setRelayout">
              <el-radio-button :label="true">Re-layout</el-radio-button>
              <el-radio-button :label="false">No re-layout</el-radio-button>
            </el-radio-group>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RGJsonData, RelationGraphComponent } from 'relation-graph-vue3';

const relayout = ref(true);
const g_loading = ref(false);
const hTreeOptions: RGOptions = {
    layouts: [
        {
            label: 'Center',
            layoutName: 'tree',
            from: 'bottom',
            layoutClassName: 'seeks-layout-center',
            defaultJunctionPoint: 'border',
            defaultNodeShape: 0,
            defaultLineShape: 1,
            min_per_width: 170,
            max_per_width: 170,
            min_per_height: 160

        }
    ],
    defaultNodeShape: 1,
    defaultLineShape: 2,
    defaultJunctionPoint: 'tb',
    defaultNodeBorderWidth: 0,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)',
    reLayoutWhenExpandedOrCollapsed: true,
    defaultExpandHolderPosition: 'top',
    zoomToFitWhenRefresh: true,
    useAnimationWhenExpanded: true,
    debug: false

};

onMounted(() => {
    showHTree();
});

const showHTree = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a' },
            { id: 'b', text: 'b' },
            { id: 'b1', text: 'b1' },
            { id: 'b2', text: 'b2' },
            { id: 'b2-1', text: 'b2-1', expandHolderPosition: 'top', expanded: false, data: { isNeedLoadDataFromRemoteServer: true } },
            { id: 'b2-2', text: 'b2-2' }
        ],
        lines: [
            { from: 'a', to: 'b' },
            { from: 'b', to: 'b1' },
            { from: 'b', to: 'b2' },
            { from: 'b2', to: 'b2-1' },
            { from: 'b2', to: 'b2-2' }
        ]
    };
    g_loading.value = false;
    const graphInstance = graphRef.value.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.playShowEffect();
};

const setRelayout = () => {
    graphRef.value.getInstance().options.reLayoutWhenExpandedOrCollapsed = relayout.value;
};

const onNodeCollapse = (node: RGNode, e: RGUserEvent) => {
    // Code for node collapse event

};

const onNodeExpand = (node: RGNode, e: RGUserEvent) => {
    const graphInstance = graphRef.value.getInstance();
    console.log('onNodeExpand:', node);
    if (!node.data.isNeedLoadDataFromRemoteServer) {
        console.log('The children of this node do not need to load data from the remote server');
        return;
    }
    if (node.data.childrenLoaded) {
        console.log('The children of this node have already been loaded');
        return;
    }
    g_loading.value = true;
    node.data.childrenLoaded = true;
    loadChildNodesFromRemoteServer(node, async(new_data) => {
        g_loading.value = false;
        await graphInstance.appendJsonData(new_data);
    });
};

const loadChildNodesFromRemoteServer = (node: RGNode, callback: (new_data: RGJsonData) => void) => {
    setTimeout(function() {
        const _new_json_data: RGJsonData = {
            nodes: [
                { id: node.id + '-c-1', text: 'Child Node 1', expandHolderPosition: 'top', expanded: false, data: { isNeedLoadDataFromRemoteServer: true } },
                { id: node.id + '-c-2', text: 'Child Node 2' }
            ],
            lines: [
                { from: node.id, to: node.id + '-c-1' },
                { from: node.id, to: node.id + '-c-2' }
            ]
        };
        callback(_new_json_data);
    }, 1000);
};

const graphRef = ref<RelationGraphComponent>();

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.my-node{
  width: 150px;
  height:60px;
  line-height: 60px;
}
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

### `expand-forever.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph from 'relation-graph-react';
import { RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RGJsonData, RelationGraphComponent } from 'relation-graph-react';
import {MySelector, MySwitch} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [relayout, setRelayout] = useState(true);
  const [loading, setLoading] = useState(false);
  const hTreeOptions: RGOptions = {
    layout: {
      layoutName: 'tree',
      from: 'bottom',
      min_per_width: 170,
      max_per_width: 170,
      min_per_height: 160
    },
    defaultNodeShape: 1,
    defaultLineShape: 2,
    defaultNodeWidth: 100,
    defaultNodeHeight: 60,
    defaultJunctionPoint: 'tb',
    defaultNodeBorderWidth: 0,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)',
    reLayoutWhenExpandedOrCollapsed: true,
    defaultExpandHolderPosition: 'top',
    zoomToFitWhenRefresh: true,
    useAnimationWhenExpanded: true,
    debug: false
  };

  useEffect(() => {
    showHTree();
  }, []);

  const showHTree = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'a' },
        { id: 'b', text: 'b' },
        { id: 'b1', text: 'b1' },
        { id: 'b2', text: 'b2' },
        { id: 'b2-1', text: 'b2-1', expandHolderPosition: 'top', expanded: false, data: { isNeedLoadDataFromRemoteServer: true } },
        { id: 'b2-2', text: 'b2-2' }
      ],
      lines: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'b1' },
        { from: 'b', to: 'b2' },
        { from: 'b2', to: 'b2-1' },
        { from: 'b2', to: 'b2-2' }
      ]
    };
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.playShowEffect();
  };

  const setRelayoutWhenExpandedOrCollapsed = (newValue) => {
    graphRef.current!.getInstance().options.reLayoutWhenExpandedOrCollapsed = newValue;
    setRelayout(newValue);
  };

  const onNodeCollapse = (node: RGNode, $event: RGUserEvent) => {
    // Code for node collapse event

  };

  const onNodeExpand = (node: RGNode, $event: RGUserEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    console.log('onNodeExpand:', node);
    if (!node.data.isNeedLoadDataFromRemoteServer) {
      console.log('The children of this node do not need to load data from the remote server');
      return;
    }
    if (node.data.childrenLoaded) {
      console.log('The children of this node have already been loaded');
      return;
    }
    setLoading(true)
    node.data.childrenLoaded = true;
    loadChildNodesFromRemoteServer(node, async (new_data) => {
      setLoading(false)
      await graphInstance.appendJsonData(new_data);
    });
  };

  const loadChildNodesFromRemoteServer = (node: RGNode, callback: (new_data: RGJsonData) => void) => {
    setTimeout(function () {
      const _new_json_data: RGJsonData = {
        nodes: [
          { id: node.id + '-c-1', text: 'Child Node 1', expandHolderPosition: 'top', expanded: false, data: { isNeedLoadDataFromRemoteServer: true } },
          { id: node.id + '-c-2', text: 'Child Node 2' }
        ],
        lines: [
          { from: node.id, to: node.id + '-c-1' },
          { from: node.id, to: node.id + '-c-2' }
        ]
      };
      callback(_new_json_data);
    }, 1000);
  };

  return (
    <div>
      <div className={loading ? 'el-loading-mask' : ''} style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={hTreeOptions}
          onNodeExpand={onNodeExpand}
          onNodeCollapse={onNodeCollapse}
          graphPlugSlot={<>
            <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
              <div className="c-option-name">After expanding/collapsing a node:</div>
              <div className="c-option-name" style={{ fontSize: '12px' }}>(Refers to non-dynamically loaded content, which will definitely be re-layouted after dynamically loading content)</div>
              <MySwitch
                currentValue={relayout}
                onChange={(newValue: boolean) => { setRelayoutWhenExpandedOrCollapsed(newValue); }}
              />
            </div>
            {loading && <div className="w-full h-full absolute left-0 top-0 z-20 bg-white/50 flex justify-center place-items-center">
              <div className="w-96 text-white text-center bg-gray-500 rounded-lg">Loading data from remote...</div>
            </div>}
          </>
          }
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### 📂 RGDemoComponents

#### `MyDemoPanel.tsx`

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
