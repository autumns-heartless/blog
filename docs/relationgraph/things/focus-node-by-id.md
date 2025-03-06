# 聚焦到节点

## Vue2 版本

### `focus-node-by-id.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">Focus Node：</div>
            <el-radio-group :disabled="playing" v-model="nodeId" size="small" @change="tabChange">
              <el-radio-button label="N1">N1</el-radio-button>
              <el-radio-button label="N20" >N20</el-radio-button>
              <el-radio-button label="N30" >N30</el-radio-button>
              <el-radio-button label="N40" >N40</el-radio-button>
              <el-radio-button label="N64" >N64</el-radio-button>
              <el-radio-button label="N75" >N75</el-radio-button>
              <el-radio-button label="N86" >N86</el-radio-button>
              <el-radio-button label="N99" >N99</el-radio-button>
              <el-radio-button label="N123" >N123</el-radio-button>
              <el-radio-button label="N159" >N159</el-radio-button>
            </el-radio-group>

            <el-button size="mini" type="primary" plain style="margin-left:20px;" @click="randomPosition">Random Position</el-button>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'Demo4FocusNode',
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      nodeId: '1',
      timer: null,
      playing: false,
      graphOptions: {
        debug: false,
        useAnimationWhenRefresh: true,
        layout: {
          layoutName: 'force'
        }
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    async showGraph() {
      const graphInstance = this.$refs.graphRef.getInstance();
      const newNodes = [];
      const startPoint = {
        x: -500,
        y: -500
      };
      for (let i = 0; i < 160; i++) {
        newNodes.push({
          id: 'N' + i,
          text: 'N' + i,
          x: startPoint.x + (i % 22) * 200,
          y: startPoint.y + Math.floor(i / 22) * 200
        });
      }
      graphInstance.addNodes(newNodes);
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
    },
    async tabChange() {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.options.useAnimationWhenRefresh = false;
      await graphInstance.zoomToFit();
      graphInstance.options.useAnimationWhenRefresh = true;
      graphInstance.focusNodeById(this.nodeId);
    },
    async randomPosition() {
      this.playing = true;
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.refresh();
      let times = 0;
      this.timer = setInterval(() => {
        times++;
        graphInstance.options.useAnimationWhenRefresh = false;
        graphInstance.zoomToFit();
        if (times > 4) {
          this.playing = false;
          clearInterval(this.timer);
        }
      }, 2000);
    }
  }
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

### `focus-node-by-id.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name">Focus Node:</div>
            <el-radio-group v-model="nodeId" :disabled="playing" size="small" @change="tabChange">
              <el-radio-button label="N1">N1</el-radio-button>
              <el-radio-button label="N20">N20</el-radio-button>
              <el-radio-button label="N30">N30</el-radio-button>
              <el-radio-button label="N40">N40</el-radio-button>
              <el-radio-button label="N64">N64</el-radio-button>
              <el-radio-button label="N75">N75</el-radio-button>
              <el-radio-button label="N86">N86</el-radio-button>
              <el-radio-button label="N99">N99</el-radio-button>
              <el-radio-button label="N123">N123</el-radio-button>
              <el-radio-button label="N159">N159</el-radio-button>
            </el-radio-group>

            <el-button size="small" type="primary" plain style="margin-left:20px;" @click="randomPosition">Random Position</el-button>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const nodeId = ref('1');
const timer = ref(null);
const playing = ref(false);
const graphOptions: RGOptions = {
    debug: false,
    useAnimationWhenRefresh: true,
    layout: {
        layoutName: 'force'
    }
    // 这里可以参考"Graph 图谱"中的参数进行设置

};

const showGraph = async () => {
    const graphInstance = graphRef.value.getInstance();
    const newNodes: RGNode[] = [];
    const startPoint = {
        x: -500,
        y: -500

    };
    for (let i = 0; i < 160; i++) {
        newNodes.push({
            id: 'N' + i,
            text: 'N' + i,
            x: startPoint.x + (i % 22) * 200,
            y: startPoint.y + Math.floor(i / 22) * 200

        });
    }
    graphInstance.addNodes(newNodes);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

const tabChange = async () => {
    const graphInstance = graphRef.value.getInstance();
    graphInstance.options.useAnimationWhenRefresh = false;
    await graphInstance.zoomToFit();
    graphInstance.options.useAnimationWhenRefresh = true;
    graphInstance.focusNodeById(nodeId.value);
};

const randomPosition = () => {
    playing.value = true;
    const graphInstance = graphRef.value.getInstance();
    graphInstance.refresh();
    let times = 0;
    timer.value = setInterval(() => {
        times++;
        graphInstance.options.useAnimationWhenRefresh = false;
        graphInstance.zoomToFit();
        if (times > 4) {
            playing.value = false;
            clearInterval(timer.value);
        }
    }, 2000);
};

const graphRef = ref<RelationGraphComponent>();

onMounted(() => {
    showGraph();
});
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

  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
```

## React 版本

### `focus-node-by-id.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {JsonNode} from 'relation-graph-react';
import { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import {MyButton, MyCheckBox, MySelector} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [nodeId, setNodeId] = useState('');
  const timer = useRef(0);
  const [playing, setPlaying] = useState(false);

  const graphOptions: RGOptions = {
    debug: false,
    useAnimationWhenRefresh: true,
    layout: {
      layoutName: 'force'
    }
    // 这里可以参考"Graph 图谱"中的参数进行设置

  };


  const showGraph = async () => {
    const graphInstance = graphRef.current?.getInstance();
    const newNodes: JsonNode[] = [];
    const startPoint = {
      x: -500,
      y: -500

    };
    for (let i = 0; i < 160; i++) {
      newNodes.push({
        id: 'N' + i,
        text: 'N' + i,
        x: startPoint.x + (i % 22) * 200,
        y: startPoint.y + Math.floor(i / 22) * 200

      });
    }
    graphInstance?.addNodes(newNodes);
    await graphInstance?.moveToCenter();
    await graphInstance?.zoomToFit();
  };

  const tabChange = async () => {
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.options.useAnimationWhenRefresh = false;
    await graphInstance.zoomToFit();
    graphInstance.options.useAnimationWhenRefresh = true;
    await graphInstance.focusNodeById(nodeId);
    graphInstance.dataUpdated();
  };

  const randomPosition = () => {
    setPlaying(true);
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.refresh();
  };

  useEffect(() => {
    showGraph();
  }, []);

  useEffect(() => {
    if (nodeId) {
      tabChange();
    }
  }, [nodeId]);
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          <div className="c-option-name">Focus Node:</div>
          <MyCheckBox
            data={[
              { value: 'N1', text: 'N1' },
              { value: 'N20', text: 'N20' },
              { value: 'N30', text: 'N30' },
              { value: 'N40', text: 'N40' },
              { value: 'N64', text: 'N64' },
              { value: 'N75', text: 'N75' },
              { value: 'N86', text: 'N86' },
              { value: 'N99', text: 'N99' },
              { value: 'N123', text: 'N123' },
              { value: 'N159', text: 'N159' }
            ]}
            currentValue={nodeId}
            onChange={(newValue: string, label) => {
              setNodeId(newValue);
            }}
          />
          <MyButton
            onClick={randomPosition}
          >
            Random Position
          </MyButton>
        </div>
        <RelationGraph ref={graphRef} options={graphOptions}>
        </RelationGraph>
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
