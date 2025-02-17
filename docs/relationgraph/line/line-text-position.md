# 自定义连线文字位置

## Vue2 版本

### `line-text-position.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh - 50px);position: relative;font-size:12px;line-height: 30px;">
      <div style="width:400px;padding-left:20px;padding-top:5px;position: absolute;left:20px;top:20px;z-index: 20;padding:20px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);">
        布局方向：
       <div>
         <el-radio-group size="mini" v-model="graphOptions.layout.from" @change="updateLayouterOptions">
           <el-radio-button label="left">left</el-radio-button>
           <el-radio-button label="right">right</el-radio-button>
           <el-radio-button label="top">top</el-radio-button>
           <el-radio-button label="bottom">bottom</el-radio-button>
         </el-radio-group>
       </div>
        连接文字x偏移量：{{defaultLineTextOffset_x}}
        <el-slider v-model="defaultLineTextOffset_x" :min="-250" :max="250" :show-tooltip="true" @change="updateLayouterOptions"></el-slider>
        连接文字y偏移量：{{defaultLineTextOffset_y}}
        <el-slider v-model="defaultLineTextOffset_y" :min="-50" :max="50" @change="updateLayouterOptions"></el-slider>
<!--        <el-button size="mini" type="primary" @click="updateLayouterOptions">应用设置</el-button>-->
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
const graphOptions = {
  debug: false,
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  useAnimationWhenRefresh: false,
  placeOtherGroup: true,
  defaultNodeWidth: 150,
  defaultNodeHeight: 30,
  defaultLineWidth: 2,
  defaultLineShape: 4,
  showLineLabel: false,
  lineUseTextPath: true,
  defaultLineTextOffset_x: 0,
  defaultLineTextOffset_y: 0,
  layout:
    {
      label: '中心',
      layoutName: 'tree',
      from: 'left',
      layoutClassName: 'seeks-layout-center'
    }
};
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      defaultLineTextOffset_x: 0,
      defaultLineTextOffset_y: 0,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        "rootId": "2",
        "nodes": [
          {
            "id": "2",
            "text": "ALTXX"
          },
          {
            "id": "3",
            "text": "CH2 TTN"
          },
          {
            "id": "4",
            "text": "CH1 AlCu"
          },
          {
            "id": "5",
            "text": "MainFrame"
          },
          {
            "id": "14",
            "text": "ArHigh"
          },
          {
            "id": "15",
            "text": "ArLow"
          },
          {
            "id": "20",
            "text": "N2"
          },
          {
            "id": "22",
            "text": "Cool Chbr"
          },
          {
            "id": "24",
            "text": "Alignment Unit"
          }
        ],
        "lines": [
          {
            "from": "2",
            "to": "5",
            "text": "子系统", showEndArrow: false
          },
          {
            "from": "2",
            "to": "3",
            "text": "子系统", showEndArrow: false
          },
          {
            "from": "2",
            "to": "4",
            "text": "子系统", showEndArrow: false
          },
          {
            "from": "3",
            "to": "20",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "15",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "14",
            "text": "子系统"
          },
          {
            "from": "5",
            "to": "24",
            "text": "子系统"
          },
          {
            "from": "5",
            "to": "22",
            "text": "子系统"
          }
        ]
      };
      const graphRef = this.$refs.graphRef
      graphRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码.
      });
    },
    updateGraphOptions() {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.options.defaultLineShape = this.graphOptions.defaultLineShape;
    },
    async updateLayouterOptions() {
      this.graphOptions.defaultLineTextOffset_x = this.defaultLineTextOffset_x;
      this.graphOptions.defaultLineTextOffset_y = this.defaultLineTextOffset_y;
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setOptions(JSON.parse(JSON.stringify(this.graphOptions)));
      await graphInstance.doLayout();
    },
  },
};
</script>

<style>
</style>

<style scoped>
::v-deep .c-rg-line-text{
  font: italic 40px 华文行楷;
  fill: red;
  font-size: 14px;
  background-color: #00bb00;
}
</style>
```

## Vue3 版本

### `line-text-position.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh);position: relative;font-size:12px;line-height: 30px;">
      <div style="width:400px;padding-left:20px;padding-top:5px;position: absolute;left:20px;top:20px;z-index: 20;padding:20px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);">
        Layout Direction:
        <div>
          <el-radio-group v-model="layoutFrom" size="small" @change="updateLayouterOptions">
            <el-radio-button label="left">left</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
          </el-radio-group>
        </div>
        <div class="c-option-name">Line Shape:</div>
        <el-radio-group v-model="defaultLineShapeRef" size="small" @change="updateGraphLineShape">
          <el-radio-button :label="undefined">Auto</el-radio-button>
          <el-radio-button :label="1">Straight</el-radio-button>
          <el-radio-button :label="2">Curve1</el-radio-button>
          <el-radio-button :label="3">Curve2</el-radio-button>
          <el-radio-button :label="4">Polyline</el-radio-button>
          <el-radio-button :label="5">Curve5</el-radio-button>
        </el-radio-group>
        Line Text x Offset: {{ defaultLineTextOffset_x }}
        <el-slider v-model="defaultLineTextOffset_x" :min="-250" :max="250" :show-tooltip="true" @change="updateTextOffsetChanged" />
        Line Text y Offset: {{ defaultLineTextOffset_y }}
        <el-slider v-model="defaultLineTextOffset_y" :min="-50" :max="50" @change="updateTextOffsetChanged" />
        <!--        <el-button size="small" type="primary" @click="updateLayouterOptions">Apply Settings</el-button>-->
      </div>
      <RelationGraph ref="graphRef" :options="graphOptions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph, {
    RGJsonData,
    RGOptions,
    RGNode,
    RGLine,
    RGLink,
    RGUserEvent,
    RelationGraphComponent,
    RGTreeLayoutOptions
} from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    debug: false,
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenRefresh: false,
    placeOtherGroup: true,
    defaultNodeWidth: 150,
    defaultNodeHeight: 30,
    defaultLineWidth: 2,
    defaultLineShape: 4,
    showLineLabel: false,
    lineUseTextPath: true,
    defaultLineTextOffset_x: 0,
    defaultLineTextOffset_y: 0,
    layout: {
        label: 'Center',
        layoutName: 'tree',
        from: 'left',
        layoutClassName: 'seeks-layout-center'
    }
};

const graphRef = ref<RelationGraphComponent>();
const layoutFrom = ref('left');
const defaultLineTextOffset_x = ref(0);
const defaultLineTextOffset_y = ref(0);
const defaultLineShapeRef = ref('4');
const graphOptionsRef = ref(graphOptions);

onMounted(() => {
    showGraph();
});

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: '2',
        nodes: [
            {
                id: '2',
                text: 'ALTXX'
            },
            {
                id: '3',
                text: 'CH2 TTN'
            },
            {
                id: '4',
                text: 'CH1 AlCu'
            },
            {
                id: '5',
                text: 'MainFrame'
            },
            {
                id: '14',
                text: 'ArHigh'
            },
            {
                id: '15',
                text: 'ArLow'
            },
            {
                id: '20',
                text: 'N2'
            },
            {
                id: '22',
                text: 'Cool Chbr'
            },
            {
                id: '24',
                text: 'Alignment Unit'
            }
        ],
        lines: [
            {
                from: '2',
                to: '5',
                text: 'Subsystem',
                showEndArrow: false

            },
            {
                from: '2',
                to: '3',
                text: 'Subsystem',
                showEndArrow: false

            },
            {
                from: '2',
                to: '4',
                text: 'Subsystem',
                showEndArrow: false

            },
            {
                from: '3',
                to: '20',
                text: 'Subsystem'
            },
            {
                from: '4',
                to: '15',
                text: 'Subsystem'
            },
            {
                from: '4',
                to: '14',
                text: 'Subsystem'
            },
            {
                from: '5',
                to: '24',
                text: 'Subsystem'
            },
            {
                from: '5',
                to: '22',
                text: 'Subsystem'
            }
        ]
    };
    graphRef.value?.setJsonData(__graph_json_data, (graphInstance) => {
        // Code to execute after the graph is initialized.
    });
};


const updateGraphLineShape = () => {
    const graphInstance = graphRef.value!.getInstance();
    graphInstance.options.defaultLineShape = defaultLineShapeRef.value;
};

const updateTextOffsetChanged = async () => {
    const graphInstance = graphRef.value?.getInstance()!;
    graphInstance.options.defaultLineTextOffset_x = defaultLineTextOffset_x.value;
    graphInstance.options.defaultLineTextOffset_y = defaultLineTextOffset_y.value;
};
const updateLayouterOptions = async () => {
    const layoutOptions = graphOptions.layout as RGTreeLayoutOptions;
    layoutOptions.from = layoutFrom.value;
    const graphInstance = graphRef.value?.getInstance();
    await graphInstance?.setOptions(JSON.parse(JSON.stringify(graphOptionsRef.value)));
    await graphInstance?.doLayout();
};
</script>

<style>
</style>

<style scoped>
::v-deep(.relation-graph) {
    .c-rg-line-text {
        font: italic 40px 华文行楷;
        fill: red;
        font-size: 14px;
        background-color: #00bb00;
    }
}
</style>
```

## React 版本

### `line-text-position.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {
  RGJsonData,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
  RGTreeLayoutOptions
} from 'relation-graph-react';
import './line-text-position.scss';
import {MySelector} from "./RGDemoComponents/MyUIComponents";

const MyComponent = () => {
  const [layoutFrom, setLayoutFrom] = useState('left');
  const [defaultLineTextOffset_x, setDefaultLineTextOffset_x] = useState(0);
  const [defaultLineTextOffset_y, setDefaultLineTextOffset_y] = useState(0);
  const graphRef = useRef<RelationGraphComponent|null>(null);

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        {
          id: '2',
          text: 'ALTXX'
        },
        {
          id: '3',
          text: 'CH2 TTN'
        },
        {
          id: '4',
          text: 'CH1 AlCu'
        },
        {
          id: '5',
          text: 'MainFrame'
        },
        {
          id: '14',
          text: 'ArHigh'
        },
        {
          id: '15',
          text: 'ArLow'
        },
        {
          id: '20',
          text: 'N2'
        },
        {
          id: '22',
          text: 'Cool Chbr'
        },
        {
          id: '24',
          text: 'Alignment Unit'
        }
      ],
      lines: [
        {
          from: '2',
          to: '5',
          text: 'Subsystem',
          showEndArrow: false

        },
        {
          from: '2',
          to: '3',
          text: 'Subsystem',
          showEndArrow: false

        },
        {
          from: '2',
          to: '4',
          text: 'Subsystem',
          showEndArrow: false

        },
        {
          from: '3',
          to: '20',
          text: 'Subsystem'
        },
        {
          from: '4',
          to: '15',
          text: 'Subsystem'
        },
        {
          from: '4',
          to: '14',
          text: 'Subsystem'
        },
        {
          from: '5',
          to: '24',
          text: 'Subsystem'
        },
        {
          from: '5',
          to: '22',
          text: 'Subsystem'
        }
      ]
    };
    graphRef.current?.setJsonData(__graph_json_data, (graphInstance) => {
      // Code to execute after the graph is initialized.
    });
  };

  // const updateGraphOptions = () => {
  //   // The first method of changing options is relatively quiet and very elegant.
  //   const graphInstance = graphRef.current!.getInstance();
  //   graphInstance.options.defaultLineShape = graphOptionsRef.current.defaultLineShape;
  //   graphInstance.dataUpdated();
  // };

  const graphOptions: RGOptions = {
    debug: false,
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenRefresh: false,
    placeOtherGroup: true,
    defaultNodeWidth: 150,
    defaultNodeHeight: 30,
    defaultLineWidth: 2,
    defaultLineShape: 4,
    lineUseTextPath: true,
    defaultLineTextOffset_x: 0,
    defaultLineTextOffset_y: 0,
    layout: {
      label: 'Center',
      layoutName: 'tree',
      from: 'left',
      layoutClassName: 'seeks-layout-center'
    }
  };
  const updateLayouterOptions = async () => {
    // The second method of changing options will rearrange the layout and cause major screen changes.
    graphOptions.defaultLineTextOffset_x = defaultLineTextOffset_x;
    graphOptions.defaultLineTextOffset_y = defaultLineTextOffset_y;
    const layoutOptions = graphOptions.layout as RGTreeLayoutOptions;
    layoutOptions.from = layoutFrom;
    const graphInstance = graphRef.current?.getInstance()!;
    await graphInstance.setOptions(JSON.parse(JSON.stringify(graphOptions)));
    await graphInstance.doLayout();
    graphInstance.dataUpdated();
  };
  useEffect(() => {
    showGraph();
  }, []);
  useEffect(() => {
    updateLayouterOptions();
  }, [layoutFrom, defaultLineTextOffset_x, defaultLineTextOffset_y]);
  return (
    <div>
      <div style={{ height: "100vh", position: "relative", fontSize: "12px", lineHeight: "30px" }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          Layout Direction:
          <MySelector
            data={[
              {value: 'left', text: 'left' },
              {value: 'right', text: 'right' },
              {value: 'top', text: 'top' },
              {value: 'bottom', text: 'bottom' },
            ]}
            currentValue={layoutFrom}
            onChange={(newValue: string, label) => {setLayoutFrom(newValue);}}
          />
          Line Text x Offset: {defaultLineTextOffset_x}
          <input type="range"
                 min="-250"
                 max="250"
                 value={defaultLineTextOffset_x}
                 className="w-full"
                 onChange={(e) => {setDefaultLineTextOffset_x(parseFloat((e.target as HTMLInputElement).value));}}
          />
          Line Text y Offset: {defaultLineTextOffset_y}
          <input type="range"
                 min="-50"
                 max="50"
                 value={defaultLineTextOffset_y}
                 className="w-full"
                 onChange={(e) => {setDefaultLineTextOffset_y(parseFloat((e.target as HTMLInputElement).value));}}
          />
          {/*<button className="h-10 px-6 font-semibold rounded-md bg-black text-white"*/}
          {/*        onClick={() => {updateLayouterOptions();}}*/}
          {/*>*/}
          {/*  Apply*/}
          {/*</button>*/}
        </div>
        <RelationGraph ref={graphRef} options={graphOptions} />
      </div>
    </div>
  );
};

export default MyComponent;
```

### `line-text-position.scss`

```scss
.relation-graph {
  .c-rg-line-text {
    font: italic 40px 华文行楷;
    fill: red;
    font-size: 14px;
    background-color: #00bb00;
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
