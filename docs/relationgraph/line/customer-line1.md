# 自定义全新的线条形状

## Vue2 版本

### `customer-line1.vue`

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
        默认的线条连接点：
       <div>
         <el-radio-group size="mini" v-model="graphOptions.defaultJunctionPoint" @change="updateGraphOptions">
           <el-radio-button label="border">边缘</el-radio-button>
           <el-radio-button label="tb">上下</el-radio-button>
           <el-radio-button label="lr">左右</el-radio-button>
           <el-radio-button label="ltrb">上下左右</el-radio-button>
         </el-radio-group>
       </div>
        连接文字x偏移量：{{defaultLineTextOffset_x}}
        <el-slider v-model="defaultLineTextOffset_x" :min="-250" :max="250" :show-tooltip="true"></el-slider>
        连接文字y偏移量：{{defaultLineTextOffset_y}}
        <el-slider v-model="defaultLineTextOffset_y" :min="-50" :max="50"></el-slider>
        <el-button size="mini" type="primary" @click="updateLayouterOptions">应用设置</el-button>
      </div>
      <RelationGraph
        ref="graphRef"
        :relationGraphCore="relationGraphCore"
        :options="graphOptions"
      />
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import {RelationGraphWithLineShape3} from './VipDemo4CustomerLine1GraphCore.ts'
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
  defaultLineTextOffset_x: -21,
  defaultLineTextOffset_y: -4,
  lineUseTextPath: false,
  defaultLineMarker: {
    markerWidth: 5,
    markerHeight: 5,
    refX: 5,
    refY: 3,
    data: `M 0 3 A 3 3 0 0 1 6 3 A 3 3 0 0 1 0 3`
  },
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
      relationGraphCore: RelationGraphWithLineShape3,
      defaultLineTextOffset_x: -21,
      defaultLineTextOffset_y: -4,
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
      graphInstance.options.defaultJunctionPoint = this.graphOptions.defaultJunctionPoint;
    },
    async updateLayouterOptions() {
      this.graphOptions.defaultLineTextOffset_x = this.defaultLineTextOffset_x;
      this.graphOptions.defaultLineTextOffset_y = this.defaultLineTextOffset_y;
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.setOptions(JSON.parse(JSON.stringify(this.graphOptions)));
      await graphInstance.refresh();
    },
  },
};
</script>

<style>
</style>

<style lang="scss" scoped>
/* 通过以下代码可以修改线条被选中时的样式：*/
::v-deep .c-rg-line-checked{
  stroke: rgba(99, 2, 148, 0.3);
}
::v-deep .c-rg-line-text-checked{
  stroke: rgba(99, 2, 148, 0.3);
}
::v-deep .c-rg-line-checked-bg{
  stroke: rgba(99, 2, 148, 0.3);
}
</style>
```

### `VipDemo4CustomerLine1GraphCore.ts`

```typescript
import { RelationGraphCore, RGLine, RGLink } from 'relation-graph'
import { RGLinkUtils, RGGraphMath } from 'relation-graph'
const { JUNCTION_POINT_STYLE } = RGLinkUtils
console.log('JUNCTION_POINT_STYLE:', RGGraphMath)
export class RelationGraphWithLineShape3 extends RelationGraphCore {
  constructor(...args) {
    super(...args)
  }
  // createLinePath(link:RGLink, relationData:RGLine, ri:number) {
  //   try {
  //     const d = this.createLinePath2(link, relationData, ri);
  //     console.log('createLinePath:d:', d);
  //     return d;
  //   } catch (e) {
  //     // console.log(e);
  //   }
  // }
  createLinePath(link: RGLink, relationData: RGLine, ri: number) {
    let from: any = link.fromNode
    if (!from) {
      from = {
        x: 0,
        y: 0,
        el: {
          offsetWidth: 10,
          offsetHeight: 10,
        },
      }
    }
    const to = link.toNode
    if (!ri) ri = 0
    const __lineDirection = relationData.lineDirection || this.options.layoutDirection || 'h'
    console.log('createLinePath', __lineDirection)
    let from_x = from.x
    let from_y = from.y
    let to_x = to.x
    let to_y = to.y
    const textPosition = { x: 0, y: 0, rotate: 0 }
    if (Number.isNaN(from_x) || Number.isNaN(from_y)) {
      console.log('error start node:', from.text, from.x, from.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (Number.isNaN(to_x) || Number.isNaN(to_y)) {
      console.log('error end point:', to.text, to.x, to.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    let f_W = from.el.offsetWidth || from.width || 60
    let f_H = from.el.offsetHeight || from.height || 60
    if (Number.isNaN(f_W) || Number.isNaN(f_H)) {
      console.log('error end point22:', to.text, to.x, to.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    let t_W = to.el.offsetWidth || to.width || 60
    let t_H = to.el.offsetHeight || to.height || 60
    if (Number.isNaN(t_W) || Number.isNaN(t_H)) {
      console.log('error end point33:', to.text, to.x, to.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    const __params4start = [
      from_x,
      from_y,
      to_x,
      to_y,
      f_W,
      f_H,
      t_W,
      t_H,
      this.options.defaultNodeShape,
      false,
      link.relations.length,
      ri,
    ]
    const __params4end = [
      to_x,
      to_y,
      from_x,
      from_y,
      t_W,
      t_H,
      f_W,
      f_H,
      this.options.defaultNodeShape,
      true,
      link.relations.length,
      ri,
    ]
    let __start, __end
    let _junctionPointStyle = from.junctionPoint || this.options.defaultJunctionPoint
    if (!_junctionPointStyle) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _junctionPointStyle = JUNCTION_POINT_STYLE.border
    }
    if (_junctionPointStyle === JUNCTION_POINT_STYLE.border) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getBorderPoint4MultiLine(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getBorderPoint4MultiLine(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.ltrb) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getRectJoinPoint(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getRectJoinPoint(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.tb) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getRectVJoinPoint(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getRectVJoinPoint(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.lr) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getRectHJoinPoint(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getRectHJoinPoint(...__params4end)
    } else {
      return this.createReturnValue('Unknown join point type:' + _junctionPointStyle, textPosition)
    }
    if (!__start || !__end) {
      return this.createReturnValue('Can not create start and end!', textPosition)
    }
    const fx = __start.x
    const fy = __start.y
    const tx = __end.x
    const ty = __end.y
    if (Number.isNaN(fx) || Number.isNaN(fy)) {
      console.error('error start point:', from)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (Number.isNaN(tx) || Number.isNaN(ty)) {
      console.error('error end point:', to)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    let __buff_x = __end.x - __start.x
    let __buff_y = __end.y - __start.y
    let __buff_type = __end.x > __start.x ? 1 : -1
    if (__lineDirection === 'v') {
      __buff_type = __end.y > __start.y ? 1 : -1
    }
    let __path = ''
    const distanceRate = Math.floor((60 / (link.relations.length + 1)) * (ri + 1)) - 30
    let radius = this.options.defaultPloyLineRadius || 0
    if (__lineDirection === 'v') {
      __buff_y = __buff_y - (__buff_type * 33 + distanceRate)
      const startMove = __buff_type * 33 + distanceRate - radius
      __path = `M ${fx} ${fy} v${startMove} L${tx} ${ty - startMove} v${startMove}`
      // __path = `M ${fx} ${fy + startMove} L ${tx} ${ty - startMove} `;
      const middleFx = fx
      const middleFy = fy + startMove
      const middleTx = tx
      const middleTy = ty - startMove
      this.calcTextPosition(middleFx, middleFy, middleTx, middleTy, textPosition)
    } else {
      const startMove = __buff_type * 33 + distanceRate - radius
      __path = `M ${fx} ${fy} h${startMove} L ${tx - startMove} ${ty} h${startMove}`
      // __path = `M ${fx + startMove} ${fy} L ${tx - startMove} ${ty} `;
      const middleFx = fx + startMove
      const middleFy = fy
      const middleTx = tx - startMove
      const middleTy = ty
      this.calcTextPosition(middleFx, middleFy, middleTx, middleTy, textPosition)
    }
    return this.createReturnValue(__path, textPosition)
  }
  calcTextPosition(middleFx, middleFy, middleTx, middleTy, textPosition) {
    const __buff_x = middleTx - middleFx
    const __buff_y = middleTy - middleFy
    textPosition.rotate = RGGraphMath.getTextAngle(middleFx, middleFy, middleTx, middleTy)
    textPosition.x = Math.round(middleFx + __buff_x / 2)
    textPosition.y = Math.round(middleFy + __buff_y / 2)
    if (Number.isNaN(textPosition.rotate)) {
      textPosition.rotate = 0
    }
  }
  getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return 'translate(0,0)'
    }
    const __lineShape =
      thisRelation.lineShape === undefined ? this.options.defaultLineShape : thisRelation.lineShape
    if (__lineShape === 1 || __lineShape === 4) {
      return `translate(${x},${y})rotate(${rotate || 0})`
    } else {
      return `translate(${x},${y})`
    }
  }
}
```

## Vue3 版本

### `customer-line1.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh);position: relative;font-size:12px;line-height: 30px;">
      <div style="width:400px;padding-left:20px;padding-top:5px;position: absolute;left:20px;top:20px;z-index: 20;padding:20px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);">
        Layout Direction:
        <div>
          <el-radio-group v-model="graphOptions.layouts[0].from" size="small" @change="updateLayouterOptions">
            <el-radio-button label="left">left</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
          </el-radio-group>
        </div>
        Default Line Junction Point:
        <div>
          <el-radio-group v-model="graphOptions.defaultJunctionPoint" size="small" @change="updateGraphOptions">
            <el-radio-button label="border">border</el-radio-button>
            <el-radio-button label="tb">top-bottom</el-radio-button>
            <el-radio-button label="lr">left-right</el-radio-button>
            <el-radio-button label="ltrb">left-top-right-bottom</el-radio-button>
          </el-radio-group>
        </div>
        Line Text Offset X: {{ defaultLineTextOffset_x }}
        <el-slider v-model="defaultLineTextOffset_x" :min="-250" :max="250" :show-tooltip="true" @change="updateLayouterOptions" />
        Line Text Offset Y: {{ defaultLineTextOffset_y }}
        <el-slider v-model="defaultLineTextOffset_y" :min="-50" :max="50" @change="updateLayouterOptions" />
        <!--        <el-button size="small" type="primary" @click="updateLayouterOptions">Apply Settings</el-button>-->
      </div>
      <RelationGraph

        ref="graphRef"
        :relation-graph-core="relationGraphCore"
        :options="graphOptions"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RelationGraphWithLineShape3 } from './VipDemo4CustomerLine1GraphCore.ts';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';




const graphOptions: RGOptions = {
    debug: false,
    'backgrounImageNoRepeat': true,
    'moveToCenterWhenRefresh': true,
    'zoomToFitWhenRefresh': true,
    useAnimationWhenRefresh: false,
    defaultNodeWidth: 150,
    defaultNodeHeight: 30,
    defaultLineWidth: 2,
    defaultLineShape: 4,
    defaultLineTextOffset_x: -21,
    defaultLineTextOffset_y: -4,
    lineUseTextPath: false,
    'defaultLineMarker': {
        'markerWidth': 5,
        'markerHeight': 5,
        'refX': 5,
        'refY': 3,
        'data': 'M 0 3 A 3 3 0 0 1 6 3 A 3 3 0 0 1 0 3'
    },
    'layouts': [
        {
            'label': 'Center',
            'layoutName': 'tree',
            from: 'left',
            'layoutClassName': 'seeks-layout-center'
        }
    ]
};

const relationGraphCore = RelationGraphWithLineShape3;
const defaultLineTextOffset_x = ref(-21);
const defaultLineTextOffset_y = ref(-4);
const graphOptionsRef = ref(graphOptions);
const graphRef = ref<RelationGraphComponent>();

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
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
                'to': '5',
                'text': 'Subsystem', showEndArrow: false

            },
            {
                'from': '2',
                'to': '3',
                'text': 'Subsystem', showEndArrow: false

            },
            {
                'from': '2',
                'to': '4',
                'text': 'Subsystem', showEndArrow: false

            },
            {
                'from': '3',
                'to': '20',
                'text': 'Subsystem'
            },
            {
                'from': '4',
                'to': '15',
                'text': 'Subsystem'
            },
            {
                'from': '4',
                'to': '14',
                'text': 'Subsystem'
            },
            {
                'from': '5',
                'to': '24',
                'text': 'Subsystem'
            },
            {
                'from': '5',
                'to': '22',
                'text': 'Subsystem'
            }
        ]
    };
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
};

const updateGraphOptions = () => {
    const graphInstance = graphRef.value!.getInstance();
    graphInstance.options.defaultJunctionPoint = graphOptionsRef.value.defaultJunctionPoint;
};

const updateLayouterOptions = async () => {
    graphOptionsRef.value.defaultLineTextOffset_x = defaultLineTextOffset_x.value;
    graphOptionsRef.value.defaultLineTextOffset_y = defaultLineTextOffset_y.value;
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setOptions(JSON.parse(JSON.stringify(graphOptionsRef.value)));
    await graphInstance.doLayout();
};

onMounted(() => {
    showGraph();
});
</script>

<style lang="scss" scoped>
/* Modify the style when a line is selected: */
::v-deep(.relation-graph){
    .c-rg-line-checked{
        stroke: rgba(99, 2, 148, 0.3);
    }
    .c-rg-line-text-checked{
        stroke: rgba(99, 2, 148, 0.3);
    }
    .c-rg-line-checked-bg{
        stroke: rgba(99, 2, 148, 0.3);
    }
}
</style>
```

### `VipDemo4CustomerLine1GraphCore.ts`

```typescript
import { RelationGraphCore, RGLine, RGLink } from 'relation-graph-vue3'
import { RGLinkUtils, RGGraphMath } from 'relation-graph-vue3'
const { JUNCTION_POINT_STYLE } = RGLinkUtils
console.log('JUNCTION_POINT_STYLE:', RGGraphMath)
export class RelationGraphWithLineShape3 extends RelationGraphCore {
  constructor(...args) {
    super(...args)
  }
  // createLinePath(link:RGLink, relationData:RGLine, ri:number) {
  //   try {
  //     const d = this.createLinePath2(link, relationData, ri);
  //     console.log('createLinePath:d:', d);
  //     return d;
  //   } catch (e) {
  //     // console.log(e);
  //   }
  // }
  createLinePath(link: RGLink, relationData: RGLine, ri: number) {
    let from: any = link.fromNode
    if (!from) {
      from = {
        x: 0,
        y: 0,
        el: {
          offsetWidth: 10,
          offsetHeight: 10,
        },
      }
    }
    const to = link.toNode
    if (!ri) ri = 0
    const __lineDirection = relationData.lineDirection || this.options.layoutDirection || 'h'
    console.log('createLinePath', __lineDirection)
    const from_x = from.x
    const from_y = from.y
    const to_x = to.x
    const to_y = to.y
    const textPosition = { x: 0, y: 0, rotate: 0 }
    if (Number.isNaN(from_x) || Number.isNaN(from_y)) {
      console.log('error start node:', from.text, from.x, from.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (Number.isNaN(to_x) || Number.isNaN(to_y)) {
      console.log('error end point:', to.text, to.x, to.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    const f_W = from.el.offsetWidth || from.width || 60
    const f_H = from.el.offsetHeight || from.height || 60
    if (Number.isNaN(f_W) || Number.isNaN(f_H)) {
      console.log('error end point22:', to.text, to.x, to.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    const t_W = to.el.offsetWidth || to.width || 60
    const t_H = to.el.offsetHeight || to.height || 60
    if (Number.isNaN(t_W) || Number.isNaN(t_H)) {
      console.log('error end point33:', to.text, to.x, to.y)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    const __params4start = [
      from_x,
      from_y,
      to_x,
      to_y,
      f_W,
      f_H,
      t_W,
      t_H,
      this.options.defaultNodeShape,
      false,
      link.relations.length,
      ri,
    ]
    const __params4end = [
      to_x,
      to_y,
      from_x,
      from_y,
      t_W,
      t_H,
      f_W,
      f_H,
      this.options.defaultNodeShape,
      true,
      link.relations.length,
      ri,
    ]
    let __start, __end
    let _junctionPointStyle = from.junctionPoint || this.options.defaultJunctionPoint
    if (!_junctionPointStyle) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _junctionPointStyle = JUNCTION_POINT_STYLE.border
    }
    if (_junctionPointStyle === JUNCTION_POINT_STYLE.border) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getBorderPoint4MultiLine(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getBorderPoint4MultiLine(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.ltrb) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getRectJoinPoint(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getRectJoinPoint(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.tb) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getRectVJoinPoint(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getRectVJoinPoint(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.lr) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __start = RGGraphMath.getRectHJoinPoint(...__params4start)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      __end = RGGraphMath.getRectHJoinPoint(...__params4end)
    } else {
      return this.createReturnValue('Unknown join point type:' + _junctionPointStyle, textPosition)
    }
    if (!__start || !__end) {
      return this.createReturnValue('Can not create start and end!', textPosition)
    }
    const fx = __start.x
    const fy = __start.y
    const tx = __end.x
    const ty = __end.y
    if (Number.isNaN(fx) || Number.isNaN(fy)) {
      console.error('error start point:', from)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (Number.isNaN(tx) || Number.isNaN(ty)) {
      console.error('error end point:', to)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    const __buff_x = __end.x - __start.x
    let __buff_y = __end.y - __start.y
    let __buff_type = __end.x > __start.x ? 1 : -1
    if (__lineDirection === 'v') {
      __buff_type = __end.y > __start.y ? 1 : -1
    }
    let __path = ''
    const distanceRate = Math.floor((60 / (link.relations.length + 1)) * (ri + 1)) - 30
    const radius = this.options.defaultPloyLineRadius || 0
    if (__lineDirection === 'v') {
      __buff_y = __buff_y - (__buff_type * 33 + distanceRate)
      const startMove = __buff_type * 33 + distanceRate - radius
      __path = `M ${fx} ${fy} v${startMove} L${tx} ${ty - startMove} v${startMove}`
      // __path = `M ${fx} ${fy + startMove} L ${tx} ${ty - startMove} `;
      const middleFx = fx
      const middleFy = fy + startMove
      const middleTx = tx
      const middleTy = ty - startMove
      this.calcTextPosition(middleFx, middleFy, middleTx, middleTy, textPosition)
    } else {
      const startMove = __buff_type * 33 + distanceRate - radius
      __path = `M ${fx} ${fy} h${startMove} L ${tx - startMove} ${ty} h${startMove}`
      // __path = `M ${fx + startMove} ${fy} L ${tx - startMove} ${ty} `;
      const middleFx = fx + startMove
      const middleFy = fy
      const middleTx = tx - startMove
      const middleTy = ty
      this.calcTextPosition(middleFx, middleFy, middleTx, middleTy, textPosition)
    }
    return this.createReturnValue(__path, textPosition)
  }
  calcTextPosition(middleFx, middleFy, middleTx, middleTy, textPosition) {
    const __buff_x = middleTx - middleFx
    const __buff_y = middleTy - middleFy
    textPosition.rotate = RGGraphMath.getTextAngle(middleFx, middleFy, middleTx, middleTy)
    textPosition.x = Math.round(middleFx + __buff_x / 2)
    textPosition.y = Math.round(middleFy + __buff_y / 2)
    if (Number.isNaN(textPosition.rotate)) {
      textPosition.rotate = 0
    }
  }
  getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return 'translate(0,0)'
    }
    const __lineShape =
      thisRelation.lineShape === undefined ? this.options.defaultLineShape : thisRelation.lineShape
    if (__lineShape === 1 || __lineShape === 4) {
      return `translate(${x},${y})rotate(${rotate || 0})`
    } else {
      return `translate(${x},${y})`
    }
  }
}
```

## React 版本

### `customer-line1.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {RGJunctionPoint, RGTreeLayoutOptions} from 'relation-graph-react';
import { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-react';
import {MySelector} from "./RGDemoComponents/MyUIComponents";

const CustomerLine1 = () => {
  const [layoutFrom, setLayoutFrom] = useState('left');
  const [junctionPoint, setJunctionPoint] = useState('lr');
  const [defaultLineTextOffset_x, setDefaultLineTextOffset_x] = useState(0);
  const [defaultLineTextOffset_y, setDefaultLineTextOffset_y] = useState(0);
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const graphOptions: RGOptions = {
    debug: false,
    backgroundImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenRefresh: false,
    placeOtherGroup: true,
    defaultNodeWidth: 150,
    defaultNodeHeight: 30,
    defaultLineWidth: 2,
    defaultLineShape: 4,
    // defaultShowLineLabel: false,
    defaultLineTextOffset_x: -21,
    defaultLineTextOffset_y: -4,
    lineUseTextPath: false,
    defaultLineMarker: {
      markerWidth: 5,
      markerHeight: 5,
      refX: 5,
      refY: 3,
      data: 'M 0 3 A 3 3 0 0 1 6 3 A 3 3 0 0 1 0 3',
    },
    layout:{
      label: 'Center',
      layoutName: 'tree',
      from: 'left',
      layoutClassName: 'seeks-layout-center',
    }
  };

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        {
          id: '2',
          text: 'ALTXX',
        },
        {
          id: '3',
          text: 'CH2 TTN',
        },
        {
          id: '4',
          text: 'CH1 AlCu',
        },
        {
          id: '5',
          text: 'MainFrame',
        },
        {
          id: '14',
          text: 'ArHigh',
        },
        {
          id: '15',
          text: 'ArLow',
        },
        {
          id: '20',
          text: 'N2',
        },
        {
          id: '22',
          text: 'Cool Chbr',
        },
        {
          id: '24',
          text: 'Alignment Unit',
        },
      ],
      lines: [
        {
          from: '2',
          to: '5',
          text: 'Subsystem',
          showEndArrow: false,
        },
        {
          from: '2',
          to: '3',
          text: 'Subsystem',
          showEndArrow: false,
        },
        {
          from: '2',
          to: '4',
          text: 'Subsystem',
          showEndArrow: false,
        },
        {
          from: '3',
          to: '20',
          text: 'Subsystem',
        },
        {
          from: '4',
          to: '15',
          text: 'Subsystem',
        },
        {
          from: '4',
          to: '14',
          text: 'Subsystem',
        },
        {
          from: '5',
          to: '24',
          text: 'Subsystem',
        },
        {
          from: '5',
          to: '22',
          text: 'Subsystem',
        },
      ],
    };
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setJsonData(__graph_json_data);
  };
  useEffect(() => {
    showGraph();
  }, []);

  const updateLayouterOptions = async () => {
    graphOptions.defaultLineTextOffset_x = defaultLineTextOffset_x;
    graphOptions.defaultLineTextOffset_y = defaultLineTextOffset_y;
    graphOptions.defaultJunctionPoint = junctionPoint as RGJunctionPoint;
    const layoutOptions = graphOptions.layout as RGTreeLayoutOptions;
    layoutOptions.from = layoutFrom;
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setOptions(JSON.parse(JSON.stringify(graphOptions)));
    await graphInstance?.doLayout();
  };

  useEffect(() => {
    updateLayouterOptions();
  }, [layoutFrom, junctionPoint, defaultLineTextOffset_x, defaultLineTextOffset_y]);
  return (
    <div>
      <div

        style={{
          height: '100vh',
          position: 'relative',
          fontSize: '12px',
          lineHeight: '30px',
        }}
      >
        <div className="rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
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
          Default Line Junction Point:
          <MySelector
            data={[
              {value: 'border', text: 'Border' },
              {value: 'tb', text: 'top-bottom' },
              {value: 'lr', text: 'Left-Right' },
              {value: 'ltrb', text: 'left-top-right-bottom' },
            ]}
            currentValue={junctionPoint}
            onChange={(newValue: string, label) => {setJunctionPoint(newValue);}}
          />
          <div className="w-96 ">
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
          </div>

        </div>
        <RelationGraph ref={graphRef} options={graphOptions} />
      </div>
    </div>
  );
};

export default CustomerLine1;
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
