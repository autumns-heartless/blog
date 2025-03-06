# 中心布局角度偏移

## Vue2 版本

### `graph-angle-offset.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel" :style="{pointerEvents: (applying?'node':undefined), opacity: (applying?0.5:1)}">
              <div class="c-option-name">角度偏移:{{graphAngleOffset}}</div>
              <el-slider v-model="graphAngleOffset" :min="0" :max="360" :step="5" style="width:200px;" :show-tooltip="true" @change="tabChange" />
              <div><a class="c-my-link" @click="addAngle(5)">顺时针旋转5度</a></div>
              <div><a class="c-my-link" @click="addAngle(-5)">逆时针旋转5度</a></div>
              <div><a class="c-my-link" @click="addNewLink">添加一个关系</a></div>
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
  name: 'Demo4GraphOffset',
  components: { },
  data() {
    return {
        applying: false,
        graphAngleOffset: 90,
      graphOffset_y: 0,
      graphOptions: {
        debug: false,
        graphOffset_x: 0,
        graphOffset_y: 0,
          layout: {
              layoutName: 'center',
              startAngle: 90 // 默认就是180
          }
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
        _AllNodes.forEach(item => {
            item.added = false;
        });
        _AllLinks.forEach(item => {
            item.added = false;
        });
        const __graph_json_data = {
            rootId: '2',
            nodes: [
                { id: '2', text: 'Node-2' },
                { id: '9', text: 'Node-9' },
            ],
            lines: [
                // { from: '7', to: '71', text: 'Investment' },
                // { from: '7', to: '72', text: 'Investment' },
                // { from: '7', to: '73', text: 'Investment' },
                // { from: '8', to: '81', text: 'Investment' },
                // { from: '8', to: '82', text: 'Investment' },
                // { from: '8', to: '83', text: 'Investment' },
                // { from: '8', to: '84', text: 'Investment' },
                // { from: '8', to: '85', text: 'Investment' },
                // { from: '9', to: '91', text: 'Investment' },
                // { from: '9', to: '92', text: 'Investment' },
                // { from: '5', to: '51', text: 'Investment1' },
                // { from: '5', to: '52', text: 'Investment' },
                // { from: '5', to: '53', text: 'Investment3' },
                // { from: '5', to: '54', text: 'Investment4' },
                // { from: '5', to: '55', text: 'Investment' },
                // { from: '1', to: '2', text: 'Investment' },
                // { from: '3', to: '1', text: 'Executive' },
                // { from: '4', to: '2', text: 'Executive' },
                // { from: '6', to: '2', text: 'Executive' },
                // { from: '7', to: '2', text: 'Executive' },
                // { from: '1', to: '5', text: 'Investment' },
                { from: '9', to: '2', text: 'Executive' },
            ]
        };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    async tabChange() {
        this.applying = true;
      const graphInstance = this.$refs.graphRef.getInstance();
        graphInstance.layouter.layoutOptions.startAngle = this.graphAngleOffset;
        await graphInstance.doLayout();
        this.applying = false;
    },
      async addAngle(buff) {
          this.graphAngleOffset += buff;
          await this.tabChange();
      },
      addNewLink() {
          this.applying = true;
          const graphInstance = this.$refs.graphRef.getInstance();
        const newLine = _AllLinks.find(item => { // 找出一个与现有关系网相关的连线
            if (!item.added) {
                if (graphInstance.getNodes().some(node => (node.id === item.from || node.id === item.to))) {
                    return true;
                }
            }
        });
        if (newLine) {
            newLine.added = true;
            const newNodes = [];
            _AllNodes.forEach(item => { // 添加与新线条相关的节点
                if (item.id === newLine.from || item.id === newLine.to) {
                    if (!item.added) {
                        item.added = true;
                        newNodes.push(item);
                    }
                }
            })
            graphInstance.addNodes(newNodes);
            graphInstance.addLines([newLine]);
            graphInstance.doLayout();
        }
          this.applying = false;
      }
  }
};
const _AllNodes = [
    { id: '1', text: 'Node-1' },
    { id: '3', text: 'Node-3' },
    { id: '4', text: 'Node-4' },
    { id: '6', text: 'Node-6' },
    { id: '7', text: 'Node-7' },
    { id: '8', text: 'Node-8' },
    { id: '71', text: 'Node-71' },
    { id: '72', text: 'Node-72' },
    { id: '73', text: 'Node-73' },
    { id: '81', text: 'Node-81' },
    { id: '82', text: 'Node-82' },
    { id: '83', text: 'Node-83' },
    { id: '84', text: 'Node-84' },
    { id: '85', text: 'Node-85' },
    { id: '91', text: 'Node-91' },
    { id: '92', text: 'Node-82' },
    { id: '51', text: 'Node-51' },
    { id: '52', text: 'Node-52' },
    { id: '53', text: 'Node-53' },
    { id: '54', text: 'Node-54' },
    { id: '55', text: 'Node-55' },
    { id: '5', text: 'Node-5' }
    ];
const _AllLinks = [
    { from: '1', to: '2', text: 'Investment' },
    { from: '3', to: '1', text: 'Executive' },
    { from: '4', to: '2', text: 'Executive' },
    { from: '6', to: '2', text: 'Executive' },
    { from: '7', to: '2', text: 'Executive' },
    { from: '1', to: '5', text: 'Investment' },
    { from: '7', to: '71', text: 'Investment' },
    { from: '7', to: '72', text: 'Investment' },
    { from: '7', to: '73', text: 'Investment' },
    { from: '8', to: '81', text: 'Investment' },
    { from: '8', to: '82', text: 'Investment' },
    { from: '8', to: '83', text: 'Investment' },
    { from: '8', to: '84', text: 'Investment' },
    { from: '8', to: '85', text: 'Investment' },
    { from: '9', to: '91', text: 'Investment' },
    { from: '9', to: '92', text: 'Investment' },
    { from: '5', to: '51', text: 'Investment1' },
    { from: '5', to: '52', text: 'Investment' },
    { from: '5', to: '53', text: 'Investment3' },
    { from: '5', to: '54', text: 'Investment4' },
    { from: '5', to: '55', text: 'Investment' },
]
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
    .c-my-link {
        font-size: 14px;
        color: #1da9f5;
        line-height: 30px;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
```

## Vue3 版本

### `graph-angle-offset.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel" :style="{pointerEvents: (applying?'node':undefined), opacity: (applying?0.5:1)}">
            <div class="c-option-name">角度偏移:{{ graphAngleOffset }}</div>
            <el-slider v-model="graphAngleOffset" :min="0" :max="360" :step="5" style="width:200px;" :show-tooltip="true" @change="tabChange" />
            <div><a class="c-my-link" @click="addAngle(5)">顺时针旋转5度</a></div>
            <div><a class="c-my-link" @click="addAngle(-5)">逆时针旋转5度</a></div>
            <div><a class="c-my-link" @click="addNewLink">添加一个关系</a></div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph, { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphRef = ref<RelationGraphComponent>();
const applying = ref(false);
const graphAngleOffset = ref(90);
const graphOptions: RGOptions = {
    debug: false,
    graphOffset_x: 0,
    graphOffset_y: 0,
    layout: {
        layoutName: 'center',
        startAngle: graphAngleOffset.value
    }
    // 这里可以参考"Graph 图谱"中的参数进行设置
};

onMounted(() => {
    showGraph();
});

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: '2',
        nodes: [
            { id: '2', text: 'Node-2' },
            { id: '9', text: 'Node-9' },
        ],
        lines: [
            { from: '2', to: '9', text: 'Executive' },
        ]
    };
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.playShowEffect();
};

const tabChange = async() => {
    applying.value = true;
    const graphInstance = graphRef.value!.getInstance();
    graphInstance.layouter.layoutOptions.startAngle = graphAngleOffset.value;
    await graphInstance.doLayout();
    applying.value = false;
};
const addAngle = async(buff:number) => {
    graphAngleOffset.value += buff;
    await tabChange();
};
const addNewLink = async() => {
    applying.value = true;
    const graphInstance = graphRef.value!.getInstance();
    const newLine = _AllLinks.find(item => { // 找出一个与现有关系网相关的连线
        if (!item.added) {
            if (graphInstance.getNodes().some(node => (node.id === item.from || node.id === item.to))) {
                return true;
            }
        }
    });
    if (newLine) {
        newLine.added = true;
        const newNodes = [];
        _AllNodes.forEach(item => { // 添加与新线条相关的节点
            if (item.id === newLine.from || item.id === newLine.to) {
                if (!item.added) {
                    item.added = true;
                    newNodes.push(item);
                }
            }
        });
        graphInstance.addNodes(newNodes);
        graphInstance.addLines([newLine]);
        await graphInstance.doLayout();
    }
    applying.value = false;
};
const _AllNodes = [
    { id: '1', text: 'Node-1' },
    { id: '3', text: 'Node-3' },
    { id: '4', text: 'Node-4' },
    { id: '6', text: 'Node-6' },
    { id: '7', text: 'Node-7' },
    { id: '8', text: 'Node-8' },
    { id: '71', text: 'Node-71' },
    { id: '72', text: 'Node-72' },
    { id: '73', text: 'Node-73' },
    { id: '81', text: 'Node-81' },
    { id: '82', text: 'Node-82' },
    { id: '83', text: 'Node-83' },
    { id: '84', text: 'Node-84' },
    { id: '85', text: 'Node-85' },
    { id: '91', text: 'Node-91' },
    { id: '92', text: 'Node-82' },
    { id: '51', text: 'Node-51' },
    { id: '52', text: 'Node-52' },
    { id: '53', text: 'Node-53' },
    { id: '54', text: 'Node-54' },
    { id: '55', text: 'Node-55' },
    { id: '5', text: 'Node-5' }
];
const _AllLinks = [
    { from: '1', to: '2', text: 'Investment' },
    { from: '3', to: '1', text: 'Executive' },
    { from: '4', to: '2', text: 'Executive' },
    { from: '6', to: '2', text: 'Executive' },
    { from: '7', to: '2', text: 'Executive' },
    { from: '1', to: '5', text: 'Investment' },

    { from: '7', to: '71', text: 'Investment' },
    { from: '7', to: '72', text: 'Investment' },
    { from: '7', to: '73', text: 'Investment' },
    { from: '8', to: '81', text: 'Investment' },
    { from: '8', to: '82', text: 'Investment' },
    { from: '8', to: '83', text: 'Investment' },
    { from: '8', to: '84', text: 'Investment' },
    { from: '8', to: '85', text: 'Investment' },
    { from: '9', to: '91', text: 'Investment' },
    { from: '9', to: '92', text: 'Investment' },
    { from: '5', to: '51', text: 'Investment1' },
    { from: '5', to: '52', text: 'Investment' },
    { from: '5', to: '53', text: 'Investment3' },
    { from: '5', to: '54', text: 'Investment4' },
    { from: '5', to: '55', text: 'Investment' },
];
</script>

<style scoped lang="scss">
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
    .c-my-link {
        font-size: 14px;
        color: #1da9f5;
        line-height: 30px;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
```

## React 版本

### `graph-angle-offset.tsx`

```javascript
import React, { useRef, useEffect, useState } from 'react';
import RelationGraph, { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import {MySelector, MySlider} from "./RGDemoComponents/MyUIComponents";
import './graph-angle-offset.scss';

const GraphAngleOffset = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [applying, setApplying] = useState(false);
  const [graphAngleOffset, setGraphAngleOffset] = useState(90);

  const graphOptions: RGOptions = {
    debug: false,
    graphOffset_x: 0,
    graphOffset_y: 0,
    layout: {
      layoutName: 'center',
      startAngle: graphAngleOffset
    }
  };


  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        { id: '2', text: 'Node-2' },
        { id: '9', text: 'Node-9' },
      ],
      lines: [
        { from: '2', to: '9', text: 'Executive' },
      ]
    };
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.playShowEffect();
  };

  const tabChange = async () => {
    setApplying(true);
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.layouter.layoutOptions.startAngle = graphAngleOffset;
    await graphInstance.doLayout();
    setApplying(false);
  };

  const addAngle = async (buff: number) => {
    setGraphAngleOffset(prevOffset => prevOffset + buff);
    await tabChange();
  };

  const addNewLink = async () => {
    setApplying(true);
    const graphInstance = graphRef.current?.getInstance();
    const newLine = _AllLinks.find(item => {
      if (!item.added) {
        if (graphInstance?.getNodes().some(node => (node.id === item.from || node.id === item.to))) {
          return true;
        }
      }
    });
    if (newLine) {
      newLine.added = true;
      const newNodes = [];
      _AllNodes.forEach(item => {
        if (item.id === newLine.from || item.id === newLine.to) {
          if (!item.added) {
            item.added = true;
            newNodes.push(item);
          }
        }
      });
      graphInstance?.addNodes(newNodes);
      graphInstance?.addLines([newLine]);
      await graphInstance?.doLayout();
    }
    setApplying(false);
  };

  const _AllNodes = [
    { id: '1', text: 'Node-1' },
    { id: '3', text: 'Node-3' },
    { id: '4', text: 'Node-4' },
    { id: '6', text: 'Node-6' },
    { id: '7', text: 'Node-7' },
    { id: '8', text: 'Node-8' },
    { id: '71', text: 'Node-71' },
    { id: '72', text: 'Node-72' },
    { id: '73', text: 'Node-73' },
    { id: '81', text: 'Node-81' },
    { id: '82', text: 'Node-82' },
    { id: '83', text: 'Node-83' },
    { id: '84', text: 'Node-84' },
    { id: '85', text: 'Node-85' },
    { id: '91', text: 'Node-91' },
    { id: '92', text: 'Node-82' },
    { id: '51', text: 'Node-51' },
    { id: '52', text: 'Node-52' },
    { id: '53', text: 'Node-53' },
    { id: '54', text: 'Node-54' },
    { id: '55', text: 'Node-55' },
    { id: '5', text: 'Node-5' }
  ];
  const _AllLinks = [
    { from: '1', to: '2', text: 'Investment' },
    { from: '3', to: '1', text: 'Executive' },
    { from: '4', to: '2', text: 'Executive' },
    { from: '6', to: '2', text: 'Executive' },
    { from: '7', to: '2', text: 'Executive' },
    { from: '1', to: '5', text: 'Investment' },

    { from: '7', to: '71', text: 'Investment' },
    { from: '7', to: '72', text: 'Investment' },
    { from: '7', to: '73', text: 'Investment' },
    { from: '8', to: '81', text: 'Investment' },
    { from: '8', to: '82', text: 'Investment' },
    { from: '8', to: '83', text: 'Investment' },
    { from: '8', to: '84', text: 'Investment' },
    { from: '8', to: '85', text: 'Investment' },
    { from: '9', to: '91', text: 'Investment' },
    { from: '9', to: '92', text: 'Investment' },
    { from: '5', to: '51', text: 'Investment1' },
    { from: '5', to: '52', text: 'Investment' },
    { from: '5', to: '53', text: 'Investment3' },
    { from: '5', to: '54', text: 'Investment4' },
    { from: '5', to: '55', text: 'Investment' },
  ];

  useEffect(() => {
    showGraph();
  }, []);
  useEffect(() => {
    tabChange();
  }, [graphAngleOffset]);
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="c-my-panel w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg" style={{ pointerEvents: (applying ? 'auto' : undefined), opacity: (applying ? 0.5 : 1) }}>
          <div className="c-option-name">角度偏移:{graphAngleOffset}</div>
          <MySlider
            max={360}
            mmin={0}
            currentValue={graphAngleOffset}
            onChange={(newValue: number) => { setGraphAngleOffset(newValue); }}
          />
          <div><a className="c-my-link" onClick={() => addAngle(5)}>顺时针旋转5度</a></div>
          <div><a className="c-my-link" onClick={() => addAngle(-5)}>逆时针旋转5度</a></div>
          <div><a className="c-my-link" onClick={addNewLink}>添加一个关系</a></div>
        </div>
        <RelationGraph ref={graphRef} options={graphOptions}>

        </RelationGraph>
      </div>
    </div>
  );
};

export default GraphAngleOffset;
```

### `graph-angle-offset.scss`

```scss
.c-my-panel {
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .c-my-link {
    font-size: 14px;
    color: #1da9f5;
    line-height: 30px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
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
