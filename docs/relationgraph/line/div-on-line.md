# 跟随线条的元素(H5 DIV)

## Vue2 版本

### `div-on-line.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          :on-line-click="onLineClick"
          :onNodeDragEnd="onNodeDragEnd"
      >
        <template #canvas-plug>
          <div class="div-on-line" :class="{'div-on-line-stoped': divStoped}" :style="{offsetPath: divOffsetPath, offsetDistance: (divStoped ? divPosition : undefined)}">
            <el-badge :value="200" :max="99" class="item">
              <el-button size="small">H5 DIV</el-button>
            </el-badge>
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 20px;">
              Please try clicking on the line or the text of the line to change the selected line, or try changing the shape of the line or moving the node's position.
              <br />
              请试着点击线条或线条文字更改选中的线条，或者尝试更改线条形状、移动节点位置。
            </div>
            <div>
              <div class="c-option-name">Line Shape:</div>
              <el-radio-group v-model="lineShape" size="mini" @change="updateGraphOptions">
                <el-radio-button :label="1">Shape 1</el-radio-button>
                <el-radio-button :label="2">Shape 2</el-radio-button>
                <el-radio-button :label="4">Shape 4</el-radio-button>
                <el-radio-button :label="5">Shape 5</el-radio-button>
                <el-radio-button :label="6">Shape 6</el-radio-button>
              </el-radio-group>
              <div class="c-option-name">Div position on line:</div>
              <el-radio-group v-model="divPosition" size="mini" @change="updateDivPosition">
                <el-radio-button label="">move</el-radio-button>
                <el-radio-button label="0%">0%</el-radio-button>
                <el-radio-button label="20%">20%</el-radio-button>
                <el-radio-button label="50%">50%</el-radio-button>
                <el-radio-button label="70%">70%</el-radio-button>
                <el-radio-button label="100%">100%</el-radio-button>
              </el-radio-group>
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
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  placeOtherGroup: true,
  defaultJunctionPoint: 'lr',
  defaultNodeWidth: 150,
  defaultNodeHeight: 30,
  defaultLineWidth: 4,
  defaultLineShape: 2,
  showLineLabel: false,
  lineUseTextPath: true,
  layout: {
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
      showTips: true,
      isShowCodePanel: false,
      lineShape: 2,
      divStoped: false,
      divPosition: '',
      divOffsetPath: '',
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        'rootId': '2',
        'nodes': [
          {
            'id': '2',
            'text': 'ALTXX'
          },
          {
            'id': '3',
            'text': 'CH2 TTN'
          },
          {
            'id': '4',
            'text': 'CH1 AlCu'
          },
          {
            'id': '5',
            'text': 'MainFrame'
          },
          {
            'id': '14',
            'text': 'ArHigh'
          },
          {
            'id': '15',
            'text': 'ArLow'
          },
          {
            'id': '20',
            'text': 'N2'
          },
          {
            'id': '22',
            'text': 'Cool Chbr'
          },
          {
            'id': '24',
            'text': 'Alignment Unit'
          }
        ],
        'lines': [
          {
            'from': '2',
            'to': '5'
          },
          {
            'from': '2',
            'to': '3'
          },
          {
            'from': '2',
            'to': '4'
          },
          {
            'from': '3',
            'to': '20'
          },
          {
            'from': '4',
            'to': '15'
          },
          {
            'from': '4',
            'to': '14'
          },
          {
            'from': '5',
            'to': '24'
          },
          {
            'from': '5',
            'to': '22'
          }
        ]
      };
      __graph_json_data.lines.forEach(line => {
        line.showEndArrow = false;
        line.text = 'Line Text';
      });
      const graphRef = this.$refs.graphRef;
      graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
        const firstLink = graphInstance.getLinks()[0];
        this.playAnimation(firstLink.relations[0], firstLink);
      });
    },
    updateDivPosition() {
      console.log('updateDivPosition:', this.divPosition);
      this.divStoped = !!this.divPosition;
      console.log('divStoped:', this.divStoped);
    },
    updateGraphOptions(lineObject, $event) {
      console.log('onLineClick:', lineObject);
      this.$refs.graphRef.getInstance().options.defaultLineShape = this.lineShape;
      setTimeout(() => {
        this.onNodeDragEnd(); // Update div offset-path = The line path after changing the shape.
      }, 300);
    },
    onNodeDragEnd() {
      console.log('onNodeDragEnd:');
      this.moveDivOnCheckedLine();
    },
    onLineClick(line, link, e) {
      console.log('onLineClick:', line);
      this.playAnimation(line, link);
    },
    moveDivOnCheckedLine() {
      console.log('moveDivOnCheckedLine:');
      const graphInstance = this.$refs.graphRef.getInstance();
      if (graphInstance.options.checkedLineId) {
        const link = graphInstance.getLinkByLineId(graphInstance.options.checkedLineId);
        this.playAnimation(link.relations[0], link, null);
      } else {
        console.log('checkedLineId is empty:', graphInstance.options.checkedLineId);
      }
    },
    playAnimation(line, link) {
      console.log('playAnimation:', line);
      const graphInstance = this.$refs.graphRef.getInstance();
      const linePathRefId = graphInstance.options.instanceId + '-' + line.id;
      console.log('linePathRefId:', linePathRefId);
      const linePath = document.getElementById(linePathRefId).getAttribute('d');
      console.log('linePath:', linePath, line);
      this.divOffsetPath = `path("${linePath}")`;
    }
  }
};
</script>

<style scoped>

.c-my-panel {
  width: 700px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding:10px;
  background-color: rgba(239, 239, 239, 0.86);
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}

@keyframes myAnimation1 {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20,20,20;
  }
  50% {
    stroke-dashoffset: 5px;
    stroke-dasharray: 5,5,5
  }
  to {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20,20,20;
  }
}
@keyframes myAnimation2 {
  from {
    stroke-dashoffset: 352px;
  }
  to {
    stroke-dashoffset: 0;
  }
}

::v-deep .c-rg-line{
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  /*animation-timing-function: linear;*/
  animation-name: myAnimation1;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}

::v-deep .c-rg-line-checked{
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  animation-name: myAnimation2;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}
.div-on-line {
  animation: my-line-move 3000ms infinite alternate ease-in-out;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 999;
}
.div-on-line-stoped {
  animation: none;
}
</style>
<style>
@keyframes my-line-move {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}
</style>
```

## Vue3 版本

### `div-on-line.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          @line-click="onLineClick"
          @node-drag-end="onNodeDragEnd"
      >
        <template #canvas-plug>
          <div class="div-on-line" :class="{'div-on-line-stoped': divStoped}" :style="{offsetPath: divOffsetPath, offsetDistance: (divStoped ? divPosition : undefined)}">
            <el-badge :value="200" :max="99" class="item">
              <el-button size="small">H5 DIV</el-button>
            </el-badge>
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 20px;">
              Please try clicking on the line or the text of the line to change the selected line, or try changing the shape of the line or moving the node's position.
              <br />
              Please try clicking on the line or the text of the line to change the selected line, or try changing the shape of the line or moving the node's position.
            </div>
            <div>
              <div class="c-option-name">Line Shape:</div>
              <el-radio-group v-model="lineShape" size="small" @change="updateGraphOptions">
                <el-radio-button :label="1">Shape 1</el-radio-button>
                <el-radio-button :label="2">Shape 2</el-radio-button>
                <el-radio-button :label="4">Shape 4</el-radio-button>
                <el-radio-button :label="5">Shape 5</el-radio-button>
                <el-radio-button :label="6">Shape 6</el-radio-button>
              </el-radio-group>
              <div class="c-option-name">Div position on line:</div>
              <el-radio-group v-model="divPosition" size="small" @change="updateDivPosition">
                <el-radio-button label="">move</el-radio-button>
                <el-radio-button label="0%">0%</el-radio-button>
                <el-radio-button label="20%">20%</el-radio-button>
                <el-radio-button label="50%">50%</el-radio-button>
                <el-radio-button label="70%">70%</el-radio-button>
                <el-radio-button label="100%">100%</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import { RelationGraphComponent, RGJsonData, RGLine, RGLink, RGUserEvent, RGOptions } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
  'backgrounImageNoRepeat': true,
  'moveToCenterWhenRefresh': true,
  'zoomToFitWhenRefresh': true,
  placeOtherGroup: true,
  defaultJunctionPoint: 'lr',
  defaultNodeWidth: 150,
  defaultNodeHeight: 30,
  defaultLineWidth: 4,
  defaultLineShape: 2,
  showLineLabel: false,
  lineUseTextPath: true,
  'layouts': [
    {
      'label': 'Center',
      'layoutName': 'tree',
      from: 'left',
      'layoutClassName': 'seeks-layout-center'
    }
  ]
};
const showTips = ref(true);
const isShowCodePanel = ref(false);
const lineShape = ref(2);
const divStoped = ref(false);
const divPosition = ref('');
const divOffsetPath = ref('');
const graphRef = ref<RelationGraphComponent | null>(null);
const currentLineObject = ref();
const currentLinkObject = ref();


const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
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
                "to": "5"
            },
            {
                "from": "2",
                "to": "3"
            },
            {
                "from": "2",
                "to": "4"
            },
            {
                "from": "3",
                "to": "20"
            },
            {
                "from": "4",
                "to": "15"
            },
            {
                "from": "4",
                "to": "14"
            },
            {
                "from": "5",
                "to": "24"
            },
            {
                "from": "5",
                "to": "22"
            }
        ]
    };
    __graph_json_data.lines.forEach(line => {
        line.showEndArrow = false;
        line.text = 'Line Text';
    });
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        const firstLink = graphInstance.getLinks()[0];
        onLineClick(firstLink.relations[0], firstLink);
    }
};

const updateDivPosition = () => {
    console.log('updateDivPosition:', divPosition.value);
    divStoped.value = !!divPosition.value;
    console.log('divStoped:', divStoped.value);
};

const updateGraphOptions = () => {
    console.log('onLineClick:', currentLineObject);
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.options.defaultLineShape = lineShape.value;
        setTimeout(() => {
            playAnimation(currentLineObject.value, currentLinkObject.value); // Update div offset-path = The line path after changing the shape.
        }, 300);
    }
};

const onNodeDragEnd = () => {
    console.log('onNodeDragEnd:');
    moveDivOnCheckedLine();
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event?: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
    currentLineObject.value = lineObject;
    currentLinkObject.value = lineObject;
    playAnimation(lineObject, linkObject);
};

const moveDivOnCheckedLine = () => {
    console.log('moveDivOnCheckedLine:');
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        if (graphInstance.options.checkedLineId) {
            const link = graphInstance.getLinkByLineId(graphInstance.options.checkedLineId);
            playAnimation(link.relations[0], link);
        } else {
            console.log('checkedLineId is empty:', graphInstance.options.checkedLineId);
        }
    }
};

const playAnimation = (line: RGLine, link: RGLink) => {
    console.log('playAnimation:', line);
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        const linePathRefId = `${graphInstance.options.instanceId}-${line.id}`;
        console.log('linePathRefId:', linePathRefId);
        const linePath = document.getElementById(linePathRefId)?.getAttribute('d');
        console.log('linePath:', linePath, line);
        divOffsetPath.value = `path("${linePath}")`;
    }
};

onMounted(() => {
    showGraph();
});
</script>

<style scoped>
.c-my-panel {
  width: 700px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding:10px;
  background-color: rgba(239, 239, 239, 0.86);
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}

@keyframes myAnimation1 {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20,20,20;
  }
  50% {
    stroke-dashoffset: 5px;
    stroke-dasharray: 5,5,5

  }
  to {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20,20,20;
  }
}
@keyframes myAnimation2 {
  from {
    stroke-dashoffset: 352px;
  }
  to {
    stroke-dashoffset: 0;
  }
}

::v-deep(.relation-graph) {
    .c-rg-line{
        stroke-width: 2px;
        stroke-dasharray: 5, 5, 5;
        stroke-dashoffset: 3px;
        stroke-linecap: butt;
        /*stroke: #FD8B37;*/
        stroke-linejoin: bevel;
        /*animation-timing-function: linear;*/
        animation-name: myAnimation1;
        animation-duration: 10s;
        animation-iteration-count: infinite;
    }
    .c-rg-line-checked{
        stroke-width: 2px;
        stroke-dasharray: 5, 5, 5;
        stroke-dashoffset: 3px;
        stroke-linecap: butt;
        /*stroke: #FD8B37;*/
        stroke-linejoin: bevel;
        animation-name: myAnimation2;
        animation-duration: 10s;
        animation-iteration-count: infinite;
    }
}
.div-on-line {
  animation: my-line-move 3000ms infinite alternate ease-in-out;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 999;
}
.div-on-line-stoped {
  animation: none;
}
</style>
<style>
@keyframes my-line-move {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}
</style>
```

## React 版本

### `div-on-line.tsx`

```javascript
import React, {useRef, useEffect, useState} from 'react';
import RelationGraph, {
  RGJsonData,
  RGLine,
  RGLink,
  RGUserEvent,
  RGOptions,
  RGNodeSlotProps,
  RelationGraphComponent,
  RGLineShape
} from 'relation-graph-react';
import './div-on-line.scss';

interface MySelectorProps {
  currentValue: string|number
  data:{value: string|number, text:string}[]
  onChange: (newValue:string|number, label:string) => void
}
const MySelector:React.FC<MySelectorProps> = ({data, onChange, currentValue}) => {
  return (
    <div className="flex rounded-lg border border-gray-900 overflow-hidden">
      {
        data.map(item => <div key={item.value} className={`h-8 leading-8 w-auto px-3 text-xs cursor-pointer whitespace-nowrap ${currentValue === item.value && 'bg-gray-900 text-white'}`} onClick={() => {onChange(item.value, item.text);}}>
          {item.text}
        </div>)
      }
    </div>
  );
};

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const currentLineObject = useRef<RGLine | null>(null);
  const currentLinkObject = useRef<RGLink | null>(null);
  const [divPosition, setDivPosition] = useState('');
  const [lineShape, setLineShape] = useState(2);
  const [divOffsetPath, setDivOffsetPath] = useState('');

  const graphOptions: RGOptions = {
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    placeOtherGroup: true,
    defaultJunctionPoint: 'lr',
    defaultNodeWidth: 150,
    defaultNodeHeight: 30,
    defaultLineWidth: 4,
    defaultLineShape: 2,
    lineUseTextPath: true,
    layout: {
      label: 'Center',
      layoutName: 'tree',
      from: 'left',
      layoutClassName: 'seeks-layout-center'
    }
  };

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
          to: '5'
        },
        {
          from: '2',
          to: '3'
        },
        {
          from: '2',
          to: '4'
        },
        {
          from: '3',
          to: '20'
        },
        {
          from: '4',
          to: '15'
        },
        {
          from: '4',
          to: '14'
        },
        {
          from: '5',
          to: '24'
        },
        {
          from: '5',
          to: '22'
        }
      ]
    };
    __graph_json_data.lines.forEach(line => {
      line.showEndArrow = false;
      line.text = 'Line Text';
    });
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data);
      const firstLink = graphInstance.getLinks()[0];
      onLineClick(firstLink.relations[0], firstLink);
      updateMyAnimation();
    }
  };
  const updateMyAnimation = () => {
    if (!currentLineObject.current) {
      return;
    }
    console.log('updateMyAnimation:');
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      graphInstance.options.defaultLineShape = lineShape as RGLineShape;
      graphInstance.dataUpdated();
      setTimeout(() => {
        playAnimation(currentLineObject.current!, currentLinkObject.current!); // Update div offset-path = The line path after changing the shape.
      }, 300);
    }
  };

  const onNodeDragEnd = () => {
    console.log('onNodeDragEnd:');
    updateMyAnimation();
  };

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event?: RGUserEvent) => {
    console.log('onLineClick:', lineObject, linkObject);
    currentLineObject.current = lineObject;
    currentLinkObject.current = linkObject;
    playAnimation(lineObject, linkObject);
  };

  const playAnimation = (line: RGLine, link: RGLink) => {
    console.log('playAnimation:', line);
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      const linePathRefId = `${graphInstance.options.instanceId}-${line.id}`;
      console.log('linePathRefId:', linePathRefId);
      const linePath = document.getElementById(linePathRefId)?.getAttribute('d');
      console.log('linePath:', linePath, line);
      setDivOffsetPath(`path("${linePath}")`);
    }
  };

  useEffect(() => {
    showGraph();
  }, []);
  useEffect(() => {
    updateMyAnimation();
  }, [divPosition, lineShape]);

  const MyGraphPlugSlot = () => {
    const lineShapeOptions  = [
      { value: 1, text: 'Shape 1' },
      { value: 2, text: 'Shape 2' },
      { value: 4, text: 'Shape 4' },
      { value: 5, text: 'Shape 5' },
      { value: 6, text: 'Shape 6' },
    ];
    const divPositionOptions  = [
      { value: '', text: 'move' },
      { value: '0%' , text: '0%' },
      { value: '20%' , text: '20%' },
      { value: '50%' , text: '50%' },
      { value: '70%' , text: '70%' },
    ];
    return (
      <div>
        <div className="c-my-panel">
          <div className="c-option-name" style={{ lineHeight: '20px' }}>
            Please try clicking on the line or the text of the line to change the selected line, or try changing the shape of the line or moving the node's position.
            <br />
            Please try clicking on the line or the text of the line to change the selected line, or try changing the shape of the line or moving the node's position.
          </div>
          <div>
            <div className="c-option-name">Line Shape:</div>
            <MySelector data={lineShapeOptions} onChange={(newValue: number, label) => {setLineShape(newValue);}} currentValue={lineShape} />

            <div className="c-option-name">Div position on line:</div>
            <MySelector data={divPositionOptions} onChange={(newValue: string, label) => {setDivPosition(newValue);}} currentValue={divPosition} />

          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onLineClick={onLineClick}
          onNodeDragEnd={onNodeDragEnd}
          graphPlugSlot={MyGraphPlugSlot}
        >
          <div
            className={`div-on-line ${divPosition !== '' ? 'div-on-line-stoped' : ''}`}
            style={{ offsetPath: divOffsetPath, offsetDistance: ((divPosition !== '') ? divPosition : undefined) }}
          >
            <div className="absolute w-12 h-12 px-2 py-2 border border-red-500 text-red-500 rounded-lg text-center text-xs bg-red-200 z-50">
              H5 DIV
            </div>
          </div>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `div-on-line.scss`

```scss
.c-my-panel {
  width: 700px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  padding: 10px;
  background-color: rgba(239, 239, 239, 0.86);
  border: #eeeeee solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
  }
}

.relation-graph {
  .c-rg-line {
    stroke-width: 2px;
    stroke-dasharray: 5, 5, 5;
    stroke-dashoffset: 3px;
    stroke-linecap: butt;
    /*stroke: #FD8B37;*/
    stroke-linejoin: bevel;
    /*animation-timing-function: linear;*/
    animation-name: myAnimation1;
    animation-duration: 10s;
    animation-iteration-count: infinite;
  }
  .c-rg-line-checked {
    stroke-width: 2px;
    stroke-dasharray: 5, 5, 5;
    stroke-dashoffset: 3px;
    stroke-linecap: butt;
    /*stroke: #FD8B37;*/
    stroke-linejoin: bevel;
    animation-name: myAnimation2;
    animation-duration: 10s;
    animation-iteration-count: infinite;
  }
  .div-on-line {
    animation: my-line-move 3000ms infinite alternate ease-in-out;
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 999;
  }
  .div-on-line-stoped {
    animation: none;
  }
  @keyframes my-line-move {
    0% {
      offset-distance: 0%;
    }
    100% {
      offset-distance: 100%;
    }
  }
  @keyframes myAnimation1 {
    from {
      stroke-dashoffset: 10px;
      stroke-dasharray: 20, 20, 20;
    }
    50% {
      stroke-dashoffset: 5px;
      stroke-dasharray: 5, 5, 5;
    }
    to {
      stroke-dashoffset: 10px;
      stroke-dasharray: 20, 20, 20;
    }
  }
  @keyframes myAnimation2 {
    from {
      stroke-dashoffset: 352px;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
}
```
