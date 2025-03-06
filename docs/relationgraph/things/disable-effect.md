# 禁用拖动、缩放画布；禁用拖动、选中节点

## Vue2 版本

### `disable-effect.vue`

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
            <div>
              <el-switch
                  size="mini"
                  style="margin-left:30px;"
                  v-model="graphOptions.disableZoom"
                  @change="upddateGraphOptions"
                  active-text="禁用缩放">
              </el-switch>
            </div>
            <div>
              <el-switch
                  size="mini"
                  style="margin-left:30px;"
                  v-model="graphOptions.disableDragCanvas"
                  @change="upddateGraphOptions"
                  active-text="禁用画布拖动">
              </el-switch>
            </div>
            <div>
              <el-switch
                  size="mini"
                  style="margin-left:30px;"
                  v-model="graphOptions.disableDragNode"
                  @change="upddateGraphOptions"
                  active-text="禁用节点拖动">
              </el-switch>
            </div>
            <div>
              <el-switch
                  size="mini"
                  style="margin-left:30px;"
                  v-model="graphOptions.disableNodeClickEffect"
                  @change="upddateGraphOptions"
                  active-text="禁用节点选中效果">
              </el-switch>
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
  useAnimationWhenRefresh: false,
  defaultFocusRootNode: false,
  disableLineClickEffect: true,
  allowSwitchLineShape: true,
  defaultNodeBorderWidth: 0,
  defaultLineColor: "#a9bdc6",
  defaultLineWidth:  2,
  defaultNodeShape: 0,
  disableZoom: true,
  disableDragCanvas: true,
  disableDragNode: true,
  disableNodeClickEffect: true,
  defaultPolyLineRadius: 10,
  defaultLineShape: 4,
  layout: {
    layoutName: "tree",
    from: 'top',
    levelDistance: '300,300,300,300',
    min_per_width: 100,
    max_per_width: 200
  },
  disableDefaultClickEffect: true
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
    setTimeout(() => {
      this.showGraph();
    }, 100)
  },
  methods: {
    showGraph() {
      const __graph_json_data = {"rootId":"a","nodes":[{"id":"a","text":"a"},{"id":"b","text":"b"},{"id":"b1","text":"b1"},{"id":"b2","text":"b2"},{"id":"b3","text":"b3"},{"id":"b4","text":"b4"},{"id":"b5","text":"b5"},{"id":"b6","text":"b6"},{"id":"c","text":"c"},{"id":"c1","text":"c1"},{"id":"c2","text":"c2"},{"id":"c3","text":"c3"},{"id":"d","text":"d"},{"id":"d1","text":"d1"},{"id":"d2","text":"d2"},{"id":"d3","text":"d3"},{"id":"d4","text":"d4"},{"id":"e","text":"e"},{"id":"e1","text":"e1"},{"id":"e2","text":"e2"}],"lines":[{"from":"a","to":"b"},{"from":"b","to":"b1"},{"from":"b","to":"b2"},{"from":"b","to":"b3"},{"from":"b","to":"b4"},{"from":"b","to":"b5"},{"from":"b","to":"b6"},{"from":"a","to":"c"},{"from":"c","to":"c1"},{"from":"c","to":"c2"},{"from":"c","to":"c3"},{"from":"a","to":"d"},{"from":"d","to":"d1"},{"from":"d","to":"d2"},{"from":"d","to":"d3"},{"from":"d","to":"d4"},{"from":"a","to":"e"},{"from":"e","to":"e1"},{"from":"e","to":"e2"}]};
      const graphRef = this.$refs.graphRef
      graphRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码.
        }
      );
    },
    async upddateGraphOptions() {
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setOptions(this.graphOptions, true);
      await graphInstance.refresh();
    }
  },
};
</script>

<style lang="scss" scoped>
.c-my-panel{
  width: 260px;
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
  & > div {
    padding: 5px;
  }
}
</style>
```

## Vue3 版本

### `disable-effect.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div>
              <el-switch

                size="small"
                style="margin-left:30px;"
                v-model="graphOptions.disableZoom"
                @change="updateGraphOptions"
                active-text="Disable Zoom"
              ></el-switch>
            </div>
            <div>
              <el-switch

                size="small"
                style="margin-left:30px;"
                v-model="graphOptions.disableDragCanvas"
                @change="updateGraphOptions"
                active-text="Disable Canvas Drag"
              ></el-switch>
            </div>
            <div>
              <el-switch

                size="small"
                style="margin-left:30px;"
                v-model="graphOptions.disableDragNode"
                @change="updateGraphOptions"
                active-text="Disable Node Drag"
              ></el-switch>
            </div>
            <div>
              <el-switch

                size="small"
                style="margin-left:30px;"
                v-model="graphOptions.disableNodeClickEffect"
                @change="updateGraphOptions"
                active-text="Disable Node Click Effect"
              ></el-switch>
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph, { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    useAnimationWhenRefresh: false,
    defaultFocusRootNode: false,
    disableLineClickEffect: true,
    allowSwitchLineShape: true,
    defaultNodeBorderWidth: 0,
    defaultLineColor: '#a9bdc6',
    defaultLineWidth: 2,
    defaultNodeShape: 0,
    disableZoom: true,
    disableDragCanvas: true,
    disableDragNode: true,
    disableNodeClickEffect: true,
    defaultPolyLineRadius: 10,
    defaultLineShape: 4,
    layout: {
        layoutName: 'tree',
        from: 'top',
        levelDistance: '300,300,300,300',
        min_per_width: 100,
        max_per_width: 200

    }
};

const graphRef = ref<RelationGraphComponent>();

onMounted(() => {
    setTimeout(() => {
        showGraph();
    }, 100);
});

const showGraph = () => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a' },
            { id: 'b', text: 'b' },
            { id: 'b1', text: 'b1' },
            { id: 'b2', text: 'b2' },
            { id: 'b3', text: 'b3' },
            { id: 'b4', text: 'b4' },
            { id: 'b5', text: 'b5' },
            { id: 'b6', text: 'b6' },
            { id: 'c', text: 'c' },
            { id: 'c1', text: 'c1' },
            { id: 'c2', text: 'c2' },
            { id: 'c3', text: 'c3' },
            { id: 'd', text: 'd' },
            { id: 'd1', text: 'd1' },
            { id: 'd2', text: 'd2' },
            { id: 'd3', text: 'd3' },
            { id: 'd4', text: 'd4' },
            { id: 'e', text: 'e' },
            { id: 'e1', text: 'e1' },
            { id: 'e2', text: 'e2' }
        ],
        lines: [
            { from: 'a', to: 'b' },
            { from: 'b', to: 'b1' },
            { from: 'b', to: 'b2' },
            { from: 'b', to: 'b3' },
            { from: 'b', to: 'b4' },
            { from: 'b', to: 'b5' },
            { from: 'b', to: 'b6' },
            { from: 'a', to: 'c' },
            { from: 'c', to: 'c1' },
            { from: 'c', to: 'c2' },
            { from: 'c', to: 'c3' },
            { from: 'a', to: 'd' },
            { from: 'd', to: 'd1' },
            { from: 'd', to: 'd2' },
            { from: 'd', to: 'd3' },
            { from: 'd', to: 'd4' },
            { from: 'a', to: 'e' },
            { from: 'e', to: 'e1' },
            { from: 'e', to: 'e2' }
        ]
    };

    graphRef.value!.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
    });
};

const updateGraphOptions = async () => {
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setOptions(graphOptions, true);
        await graphInstance.refresh();
    }
};
</script>

<style scoped lang="scss">
.c-my-panel {
  width: 260px;
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
  & > div {
    padding: 5px;
  }
}
</style>
```

## React 版本

### `disable-effect.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraphReact, { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import {MySwitch} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [graphOptions, setGraphOptions] = useState<RGOptions>({
    useAnimationWhenRefresh: false,
    defaultFocusRootNode: false,
    defaultNodeBorderWidth: 0,
    defaultLineColor: '#a9bdc6',
    defaultLineWidth: 2,
    defaultNodeShape: 0,
    disableZoom: true,
    disableDragCanvas: true,
    disableDragNode: true,
    defaultPolyLineRadius: 10,
    defaultLineShape: 4,
    layout: {
      layoutName: 'tree',
      from: 'top',
      levelDistance: '300,300,300,300',
      min_per_width: 100,
      max_per_width: 200
    },
    disableLineClickEffect: true,
    disableNodeClickEffect: true
  });
  useEffect(() => {
    const showGraph = () => {
      const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'a' },
          { id: 'b', text: 'b' },
          { id: 'b1', text: 'b1' },
          { id: 'b2', text: 'b2' },
          { id: 'b3', text: 'b3' },
          { id: 'b4', text: 'b4' },
          { id: 'b5', text: 'b5' },
          { id: 'b6', text: 'b6' },
          { id: 'c', text: 'c' },
          { id: 'c1', text: 'c1' },
          { id: 'c2', text: 'c2' },
          { id: 'c3', text: 'c3' },
          { id: 'd', text: 'd' },
          { id: 'd1', text: 'd1' },
          { id: 'd2', text: 'd2' },
          { id: 'd3', text: 'd3' },
          { id: 'd4', text: 'd4' },
          { id: 'e', text: 'e' },
          { id: 'e1', text: 'e1' },
          { id: 'e2', text: 'e2' }
        ],
        lines: [
          { from: 'a', to: 'b' },
          { from: 'b', to: 'b1' },
          { from: 'b', to: 'b2' },
          { from: 'b', to: 'b3' },
          { from: 'b', to: 'b4' },
          { from: 'b', to: 'b5' },
          { from: 'b', to: 'b6' },
          { from: 'a', to: 'c' },
          { from: 'c', to: 'c1' },
          { from: 'c', to: 'c2' },
          { from: 'c', to: 'c3' },
          { from: 'a', to: 'd' },
          { from: 'd', to: 'd1' },
          { from: 'd', to: 'd2' },
          { from: 'd', to: 'd3' },
          { from: 'd', to: 'd4' },
          { from: 'a', to: 'e' },
          { from: 'e', to: 'e1' },
          { from: 'e', to: 'e2' }
        ]
      };

      graphRef.current?.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
      });
    };

    setTimeout(() => {
      showGraph();
    }, 100);
  }, []);

  const updateGraphOptions = async () => {
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      await graphInstance.setOptions(graphOptions, true);
      await graphInstance.refresh();
    }
  };
  useEffect(() => {
    updateGraphOptions();
  }, [graphOptions]);
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          <div className="flex gap-2">
            <MySwitch
              currentValue={graphOptions.disableZoom!}
              onChange={(newValue) => {
                graphOptions.disableZoom = newValue;
                setGraphOptions(JSON.parse(JSON.stringify(graphOptions)));
              }}
            />
            <div className="w-72">Disable Zoom</div>
          </div>
          <div className="flex gap-2">
            <MySwitch
              currentValue={graphOptions.disableDragCanvas!}
              onChange={(newValue) => {
                graphOptions.disableDragCanvas = newValue;
                setGraphOptions(JSON.parse(JSON.stringify(graphOptions)));
              }}
            />
            <div className="w-72">Disable Canvas Drag</div>
          </div>
          <div className="flex gap-2">
            <MySwitch
              currentValue={graphOptions.disableDragNode!}
              onChange={(newValue) => {
                graphOptions.disableDragNode = newValue;
                setGraphOptions(JSON.parse(JSON.stringify(graphOptions)));
              }}
            />
            <div className="w-72">Disable Node Drag</div>
          </div>
          <div className="flex gap-2">
            <MySwitch
              currentValue={graphOptions.disableNodeClickEffect!}
              onChange={(newValue) => {
                graphOptions.disableNodeClickEffect = newValue;
                setGraphOptions(JSON.parse(JSON.stringify(graphOptions)));
              }}
            />
            <div className="w-72">Disable Node Click Effect</div>
          </div>
        </div>
        <RelationGraphReact ref={graphRef} options={graphOptions}>
        </RelationGraphReact>
      </div>
    </div>
  );
};

export default MyComponent;
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
