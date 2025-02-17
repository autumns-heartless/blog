# 线条高级用法-插槽

## Vue2 版本

### `adv-line-slot2.vue`

```javascript
<template>
  <div>
    <div ref="myPage" style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #line="{line, link}">
          <MyLine :link="link" :relation="line" />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import MyLine from './Demo4AdvLineSlot2LineSlot';
export default {
  name: 'Demo4AdvLineSlot',
  components: { MyLine },
  data() {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        defaultLineColor: '#2E74B5',
        defaultNodeColor: '#2E74B5',
        defaultNodeBorderWidth: 2,
        defaultNodeBorderColor: '#2E74B5',
        defaultNodeFontColor: '#ffffff',
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失
          { id: '1', text: '节点-1', data: { myicon: 'el-icon-star-on' }},
          { id: '2', text: '节点-2', data: { myicon: 'el-icon-setting' }},
          { id: '4', text: '节点-4', data: { myicon: 'el-icon-star-on' }},
          { id: '6', text: '节点-6', data: { myicon: 'el-icon-setting' }},
          { id: '7', text: '节点-7', data: { myicon: 'el-icon-setting' }},
          { id: '8', text: '节点-8', data: { myicon: 'el-icon-star-on' }},
          { id: '9', text: '节点-9', data: { myicon: 'el-icon-headset' }}
        ],
        lines: [
          { from: '1', to: '2', text: '投资' },
          { from: '4', to: '2', text: '高管' },
          { from: '6', to: '2', text: '高管' },
          { from: '7', to: '2', text: '高管' },
          { from: '8', to: '2', text: '高管' },
          { from: '9', to: '2', text: '高管' }
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
```

### `Demo4AdvLineSlot2LineSlot.vue`

```javascript
<template>
  <g>
    <!-- 常规方式 -->
    <path
      :d="pathData.path"
      :class="['c-rg-line', relation.styleClass, checked ? 'c-rg-line-checked' : '']"
      :stroke="
        checked
          ? options.checkedLineColor
          : relation.color
          ? relation.color
          : options.defaultLineColor
      "
      :style="{
        'opacity': relation.opacity,
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : options.defaultLineWidth) + 'px',
      }"
      :marker-start="showStartArrow"
      :marker-end="showEndArrow"
      fill="none"
      @click="onClick(relation, $event)"
    />
    <g
      v-if="
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
      :transform="pathData.textTransform"
    >
      <rect
        :key="'t-' + relation.seeks_id"
        rx="15" ry="15"
        :x="-30"
        :y="-15"
        :style="{
          opacity: relation.opacity,
          fill: checked
            ? options.checkedLineColor
            : relation.fontColor
            ? relation.fontColor
            : relation.color
            ? relation.color
            : undefined,
        }"
        class="c-rg-line-text-bg"
        @click="onClick(relation, $event)"
      >
      </rect>
      <text
          :x="0"
          :y="4"
          :style="{
          opacity: relation.opacity
        }"
          class="c-rg-line-text"
          @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'Demo4AdvLineSlot2LineSlot',
  props: {
    link: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relation: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relationIndex: {
      mustUseProp: true,
      default: () => {
        return 0;
      },
      type: Number,
    },
  },
  data() {
    return {
      is_flashing: false,
    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    checked() {
      return this.relation.id === this.options.checkedLineId;
    },
    showStartArrow() {
      return this.relation.showStartArrow && this.relationGraph.getArrow(this.relation, this.link, true);
    },
    showEndArrow() {
      return this.relation.showEndArrow && this.relationGraph.getArrow(this.relation, this.link, false);
    },
    pathData() {
      try {
        const { path, textPosition } = this.relationGraph.createLinePath(
          this.link,
          this.relation,
          this.relationIndex
        );
        let textTransform = {}
        try {
          textTransform = this.relationGraph.getTextTransform(
              this.relation,
              textPosition.x,
              textPosition.y,
              textPosition.rotate
          )
        } catch (e) {
        }
        return {
          path,
          textTransform
        };
      } catch (e) {
      }
      return {path:null, textTransform: null};
    },
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    }
  },
  show() {
    this.isShow = true;
  },
  watch: {},
  methods: {
    onClick(line, e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(line, this.link, e);
    }
  },
};
</script>

<style scoped>
/*.RGLine-enter-active {*/
/*transition: all .3s ease;*/
/*}*/
/*.RGLine-leave-active {*/
/*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
.c-rg-line-text-bg {
  fill: #2E74B5;
  width: 80px;
  height:30px;
  font-size: 12px;
  border-radius: 10px;
}
.c-rg-line-text {
  fill: #ffffff;
  font-size: 12px;
}
.c-rg-line {
  z-index: 1000;
  fill-rule: nonzero;
  /*marker-end: url('#arrow');*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  /*animation-timing-function:linear;*/
  /*animation: ACTRGLineInit 1s;*/
}
.c-rg-line-tool {
  stroke-dasharray: 5, 5, 5;
}
.c-rg-line-flash {
  /* firefox bug fix - won't rotate at 90deg angles */
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
@keyframes ACTRGLineInit {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }

  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 0, 0, 0;
  }
}
@keyframes ACTRGLineChecked {
  from {
    stroke-dashoffset: 352px;
  }

  to {
    stroke-dashoffset: 0;
  }
}
.c-rg-line-checked {
  /*stroke: var(--stroke);*/
  /*marker-end: var(--markerEndChecked) !important;*/
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
</style>
```

## Vue3 版本

### `adv-line-slot2.vue`

```javascript
<template>
  <div>
    <div ref="myPage" style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #line="{link, line}">
          <MyLine :link="link" :line="line" />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import { RelationGraphComponent, RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent } from 'relation-graph-vue3';
import MyLine from './Demo4AdvLineSlot2LineSlot';

const graphRef = ref<RelationGraphComponent>();
const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultJunctionPoint: 'border',
    defaultLineColor: '#2E74B5',
    defaultNodeColor: '#2E74B5',
    defaultNodeBorderWidth: 2,
    defaultNodeBorderColor: '#2E74B5',
    defaultNodeFontColor: '#ffffff',
    // 这里可以参考"Graph 图谱"中的参数进行设置

};

onMounted(() => {
    showGraph();
});

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: '2',
        nodes: [
            // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失

            { id: '1', text: '节点-1', data: { myicon: 'el-icon-star-on' }},
            { id: '2', text: '节点-2', data: { myicon: 'el-icon-setting' }},
            { id: '4', text: '节点-4', data: { myicon: 'el-icon-star-on' }},
            { id: '6', text: '节点-6', data: { myicon: 'el-icon-setting' }},
            { id: '7', text: '节点-7', data: { myicon: 'el-icon-setting' }},
            { id: '8', text: '节点-8', data: { myicon: 'el-icon-star-on' }},
            { id: '9', text: '节点-9', data: { myicon: 'el-icon-headset' }}
        ],
        lines: [
            { from: '1', to: '2', text: '投资' },
            { from: '4', to: '2', text: '高管' },
            { from: '6', to: '2', text: '高管' },
            { from: '7', to: '2', text: '高管' },
            { from: '8', to: '2', text: '高管' },
            { from: '9', to: '2', text: '高管' }
        ]
    };
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
```

### `Demo4AdvLineSlot2LineSlot.vue`

```javascript
<template>
  <g>
    <!-- Regular way -->
    <path

      :d="pathData.path"
      :class="['c-rg-line', line.styleClass, checked ? 'c-rg-line-checked' : '']"
      :stroke="checked ? options.checkedLineColor : line.color ? line.color : options.defaultLineColor"
      :style="{
        'opacity': line.opacity,
        'stroke-width': (line.lineWidth ? line.lineWidth : options.defaultLineWidth) + 'px',
      }"
      :marker-start="showStartArrow"
      :marker-end="showEndArrow"
      fill="none"
      @click="onClick(line, $event)"
    />
    <g v-if="options.defaultShowLineLabel && options.canvasZoom > 40" :transform="pathData.textTransform">
      <rect

        :key="'t-' + line.seeks_id"
        rx="15"
        ry="15"
        :x="-30"
        :y="-15"
        :style="{
          opacity: line.opacity,
          fill: checked ? options.checkedLineColor : line.fontColor ? line.fontColor : line.color ? line.color : undefined,
        }"
        class="c-rg-line-text-bg"
        @click="onClick(line, $event)"
      />
      <text

        :x="0"
        :y="4"
        :style="{
          opacity: line.opacity

        }"
        class="c-rg-line-text"
        @click="onClick(line, $event)"
      >
        {{ line.text }}
      </text>
    </g>
  </g>
</template>

<script lang="ts" setup>
import {defineComponent, inject, ref, onMounted, computed} from 'vue';
import type { RGJsonData, RGLine, RGLink, RGNode, RGOptions, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';
import {RelationGraphInstance, graphKey} from "relation-graph-vue3";

const {link,line} = defineProps<{
    link: RGLink,
    line: RGLine,
}>();
const graph = inject<any>(graphKey);
const isFlashing = ref(false);
console.log(graph);
const options = computed(() => {
    return graph.options;
});
const checked = computed(() => {
    return line.id === graph.options.checkedLineId;
});

const showStartArrow = computed(() => {
    return line.showStartArrow && graph.instance.getArrow(line, link, true);
});

const showEndArrow = computed(() => {
    return line.showEndArrow && graph.instance.getArrow(line, link, false);
});

const pathData = computed(() => {
    try {
        const { path, textPosition } = graph.instance.createLinePath(link, line, 0);
        let textTransform = {};
        try {
            textTransform = graph.instance.getTextTransform(
                line,
                textPosition.x,
                textPosition.y,
                textPosition.rotate

            );
        } catch (e) {}
        return {
            path,
            textTransform,
        };
    } catch (e) {}
    return { path: null, textTransform: null };
});


const onClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    graph.instance.onLineClick(lineObject, linkObject, $event);
};

onMounted(() => {
    isFlashing.value = true;
});
</script>

<style scoped>
/*.RGLine-enter-active {*/
/*transition: all .3s ease;*/
/*}*/
/*.RGLine-leave-active {*/
/*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
.c-rg-line-text-bg {
  fill: #2E74B5;
  width: 80px;
  height: 30px;
  font-size: 12px;
  border-radius: 10px;
}
.c-rg-line-text {
  fill: #ffffff;
  font-size: 12px;
}
.c-rg-line {
  z-index: 1000;
  fill-rule: nonzero;
  /*marker-end: url('#arrow');*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  /*animation-timing-function:linear;*/
  /*animation: ACTRGLineInit 1s;*/
}
.c-rg-line-tool {
  stroke-dasharray: 5, 5, 5;
}
.c-rg-line-flash {
  /* firefox bug fix - won't rotate at 90deg angles */
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
@keyframes ACTRGLineInit {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }

  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 0, 0, 0;
  }
}
@keyframes ACTRGLineChecked {
  from {
    stroke-dashoffset: 352px;
  }

  to {
    stroke-dashoffset: 0;
  }
}
.c-rg-line-checked {
  /*stroke: var(--stroke);*/
  /*marker-end: var(--markerEndChecked) !important;*/
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
</style>
```

## React 版本

### `adv-line-slot2.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph, {
  RGJsonData,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGNodeSlotProps,
  RGLineSlotProps,
  RelationGraphComponent,
} from 'relation-graph-react'
import MyLine from './Demo4AdvLineSlot2LineSlot'
import './adv-line-slot2.scss'

const AdvLineSlot2 = () => {
  const graphRef = (useRef < RelationGraphComponent) | (null > null)

  const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultJunctionPoint: 'border',
    defaultLineColor: '#2E74B5',
    defaultNodeColor: '#ffffff',
    defaultNodeBorderWidth: 2,
    defaultNodeBorderColor: '#2E74B5',
    defaultNodeFontColor: '#2E74B5',
    // 这里可以参考"Graph 图谱"中的参数进行设置
  }

  useEffect(() => {
    showGraph()
  }, [])

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: '2',
      nodes: [
        // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失

        { id: '1', text: '节点-1', data: { myicon: 'el-icon-star-on' } },
        { id: '2', text: '节点-2', data: { myicon: 'el-icon-setting' } },
        { id: '4', text: '节点-4', data: { myicon: 'el-icon-star-on' } },
        { id: '6', text: '节点-6', data: { myicon: 'el-icon-setting' } },
        { id: '7', text: '节点-7', data: { myicon: 'el-icon-setting' } },
        { id: '8', text: '节点-8', data: { myicon: 'el-icon-star-on' } },
        { id: '9', text: '节点-9', data: { myicon: 'el-icon-headset' } },
      ],
      lines: [
        { from: '1', to: '2', text: '投资' },
        { from: '4', to: '2', text: '高管' },
        { from: '6', to: '2', text: '高管' },
        { from: '7', to: '2', text: '高管' },
        { from: '8', to: '2', text: '高管' },
        { from: '9', to: '2', text: '高管' },
      ],
    }
    const graphInstance = graphRef.current?.getInstance()
    await graphInstance?.setJsonData(__graph_json_data)
    await graphInstance?.moveToCenter()
    await graphInstance?.zoomToFit()
  }

  const LineSlot: React.FC<RGLineSlotProps> = ({ link, line }) => {
    return <MyLine link={link} line={line} />
  }

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions} lineSlot={LineSlot} />
      </div>
    </div>
  )
}

export default AdvLineSlot2
```

### `adv-line-slot2.scss`

```scss
.c-node-menu-item {
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}
.c-node-menu-item:hover {
  background-color: rgba(66, 187, 66, 0.2);
}
```

### `Demo4AdvLineSlot2LineSlot.tsx`

```javascript
import React, {useContext, useEffect, useRef} from 'react';
import {
  RGJsonData,
  RGLine,
  RGLink,
  RGNode,
  RGOptions,
  RGUserEvent,
  RelationGraphComponent,
  RGLineSlotProps, RelationGraphStoreContext
} from 'relation-graph-react';
import './Demo4AdvLineSlot2LineSlot.scss';

interface Props {
  link: RGLink;
  line: RGLine;
}

const Demo4AdvLineSlot2LineSlot: React.FC<RGLineSlotProps> = ({ link, line }) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph.options;
  const checked = line.id === options?.checkedLineId;

  const showStartArrow = line.showStartArrow ? relationGraph.getArrow(line, link, true) : undefined;
  const showEndArrow = line.showEndArrow ? relationGraph.getArrow(line, link, false) : undefined;

  const pathData = relationGraph.createLinePath(link, line, 0);

  const onClick = (lineObject: RGLine, linkObject: RGLink, $event: React.MouseEvent<SVGGElement>) => {
    relationGraph.onLineClick(lineObject, linkObject, $event as RGUserEvent);
  };

  let textTransform = ''
  try {
    textTransform = relationGraph.getTextTransform(
      line,
      pathData.textPosition.x,
      pathData.textPosition.y,
      pathData.textPosition.rotate
    )
  } catch (e) {
  }
  return (
    <g>
      {/* Regular way */}
      <path

        d={pathData?.path}
        className={`c-rg-line ${line.styleClass} ${checked ? 'c-rg-line-checked' : ''}`}
        stroke={checked ? options?.checkedLineColor : line.color ? line.color : options?.defaultLineColor}
        style={{
          opacity: line.opacity,
          strokeWidth: `${line.lineWidth ? line.lineWidth : options?.defaultLineWidth}px`,
        }}
        markerStart={showStartArrow}
        markerEnd={showEndArrow}
        fill="none"
        onClick={(event) => onClick(line, link, event)}
      />
      {options?.defaultShowLineLabel && options?.canvasZoom > 40 && (
        <g transform={textTransform}>
          <rect
            key={`t-${line.seeks_id}`}
            rx="15"
            ry="15"
            x="-30"
            y="-15"
            style={{
              opacity: line.opacity,
              fill: checked ? options?.checkedLineColor : line.fontColor ? line.fontColor : line.color,
            }}
            className="c-rg-line-text-bg"
            onClick={(event) => onClick(line, link, event)}
          />
          <text
            x="0"
            y="4"
            style={{
              opacity: line.opacity,
            }}
            className="c-rg-line-text"
            onClick={(event) => onClick(line, link, event)}
          >
            {line.text}
          </text>
        </g>
      )}
    </g>
  );
};

export default Demo4AdvLineSlot2LineSlot;
```

### `Demo4AdvLineSlot2LineSlot.scss`

```scss
.relation-graph {
  /*.RGLine-enter-active {*/
  /*transition: all .3s ease;*/
  /*}*/
  /*.RGLine-leave-active {*/
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  /*}*/
  .c-rg-line-text-bg {
    fill: #2e74b5;
    width: 80px;
    height: 30px;
    font-size: 12px;
    border-radius: 10px;
  }
  .c-rg-line-text {
    fill: #ffffff;
    font-size: 12px;
  }
  .c-rg-line {
    z-index: 1000;
    fill-rule: nonzero;
    /*marker-end: url('#arrow');*/
    /* firefox bug fix - won't rotate at 90deg angles */
    /*-moz-transform: rotate(-89deg) translateX(-190px);*/
    /*animation-timing-function:linear;*/
    /*animation: ACTRGLineInit 1s;*/
  }
  .c-rg-line-tool {
    stroke-dasharray: 5, 5, 5;
  }
  .c-rg-line-flash {
    /* firefox bug fix - won't rotate at 90deg angles */
    -moz-transform: rotate(-89deg) translateX(-190px);
    animation-timing-function: linear;
    animation: ACTRGLineChecked 10s;
  }
  @keyframes ACTRGLineInit {
    from {
      stroke-dashoffset: 10px;
      stroke-dasharray: 20, 20, 20;
    }

    to {
      stroke-dashoffset: 0;
      stroke-dasharray: 0, 0, 0;
    }
  }
  @keyframes ACTRGLineChecked {
    from {
      stroke-dashoffset: 352px;
    }

    to {
      stroke-dashoffset: 0;
    }
  }
  .c-rg-line-checked {
    /*stroke: var(--stroke);*/
    /*marker-end: var(--markerEndChecked) !important;*/
    stroke-width: 2px;
    stroke-dasharray: 5, 5, 5;
    stroke-dashoffset: 3px;
    stroke-linecap: butt;
    /*stroke: #FD8B37;*/
    stroke-linejoin: bevel;
    /* firefox bug fix - won't rotate at 90deg angles */
    /*-moz-transform: rotate(-89deg) translateX(-190px);*/
    animation-timing-function: linear;
    animation: ACTRGLineChecked 10s;
  }
}
```
