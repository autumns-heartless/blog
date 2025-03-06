# 布局切换

## Vue2 版本

### `before-change-layout.vue`

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
            <el-button v-if="!playing" style="background-color: #00bb00;color: #ffffff;" @click="play">播放自动切换</el-button>
            <el-button v-else style="background-color: #d9001b;color: #ffffff;" @click="stop">停止自动切换</el-button>
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
  // defaultLineShape: 4,
  useAnimationWhenExpanded: true,
  placeOtherGroup: true,
  placeSingleNode: false,
  useAnimationWhenRefresh: true,
  debug: false,
  layouts: [
    {
      label: '中心',
      layoutName: 'center',
      from: 'left',
      layoutClassName: 'seeks-layout-center',
      defaultExpandHolderPosition: 'hide',
      defaultJunctionPoint: 'border'
    },{
      label: '树状',
      layoutName: 'tree',
      from: 'left',
      layoutClassName: 'seeks-layout-center',
      defaultExpandHolderPosition: 'hide',
      defaultJunctionPoint: 'border'
    },{
      label: '环形',
      layoutName: 'circle',
      from: 'left',
      layoutClassName: 'seeks-layout-center',
      defaultExpandHolderPosition: 'hide',
      defaultJunctionPoint: 'border'
    },{
      label: '力学',
      layoutName: 'force',
      from: 'left',
      layoutClassName: 'seeks-layout-center',
      defaultExpandHolderPosition: 'hide',
      defaultJunctionPoint: 'border'
    }
  ]
};
export default {
  name: 'SwitchLayout',
  components: { },
  data() {
    return {
      playing: false,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        "rootId": "a",
        "nodes": [
          {
            "id": "a",
            "text": "a"
          },
          {
            "id": "b",
            "text": "b"
          },
          {
            "id": "b1",
            "text": "b1"
          },
          {
            "id": "b2",
            "text": "b2"
          },
          {
            "id": "b3",
            "text": "b3"
          },
          {
            "id": "b4",
            "text": "b4"
          },
          {
            "id": "b5",
            "text": "b5"
          },
          {
            "id": "b6",
            "text": "b6"
          },
          {
            "id": "c",
            "text": "c"
          },
          {
            "id": "c1",
            "text": "c1"
          },
          {
            "id": "c2",
            "text": "c2"
          },
          {
            "id": "c3",
            "text": "c3"
          },
          {
            "id": "d",
            "text": "d"
          },
          {
            "id": "d1",
            "text": "d1"
          },
          {
            "id": "d2",
            "text": "d2"
          },
          {
            "id": "d3",
            "text": "d3"
          },
          {
            "id": "d4",
            "text": "d4"
          },
          {
            "id": "e",
            "text": "e"
          },
          {
            "id": "e1",
            "text": "e1"
          },
          {
            "id": "e2",
            "text": "e2"
          }
        ],
        "lines": [
          {
            "from": "a",
            "to": "b"
          },
          {
            "from": "b",
            "to": "b1"
          },
          {
            "from": "b",
            "to": "b2"
          },
          {
            "from": "b",
            "to": "b3"
          },
          {
            "from": "b",
            "to": "b4"
          },
          {
            "from": "b",
            "to": "b5"
          },
          {
            "from": "b",
            "to": "b6"
          },
          {
            "from": "a",
            "to": "c"
          },
          {
            "from": "c",
            "to": "c1"
          },
          {
            "from": "c",
            "to": "c2"
          },
          {
            "from": "c",
            "to": "c3"
          },
          {
            "from": "a",
            "to": "d"
          },
          {
            "from": "d",
            "to": "d1"
          },
          {
            "from": "d",
            "to": "d2"
          },
          {
            "from": "d",
            "to": "d3"
          },
          {
            "from": "d",
            "to": "d4"
          },
          {
            "from": "a",
            "to": "e"
          },
          {
            "from": "e",
            "to": "e1"
          },
          {
            "from": "e",
            "to": "e2"
          }
        ]
      };
      const rgInstanceRef = this.$refs.graphRef
      rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码.
        }
      );
    },
    play() {
      this.playing = true;
      this.switchLayout(1);
    },
    async switchLayout(layoutOptionsIndex) {
      if (!this.playing) return;
      if (layoutOptionsIndex > this.graphOptions.layouts.length - 1) layoutOptionsIndex = 0;
      const graphInstance = this.$refs.graphRef.getInstance();
      if (!graphInstance) return;
      await graphInstance.switchLayout(this.graphOptions.layouts[layoutOptionsIndex], false, true);
      await sleep(2000);
      await this.switchLayout(layoutOptionsIndex + 1);
    },
    stop(layoutOptionsIndex) {
      this.playing = false;
    }
  },
};

const sleep = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
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

### `before-change-layout.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh - 60px)">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <el-button v-if="!playing" style="background-color: #00bb00;color: #ffffff;" @click="play">Play Auto Switch</el-button>
            <el-button v-else style="background-color: #d9001b;color: #ffffff;" @click="stop">Stop Auto Switch</el-button>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenExpanded: true,
    placeOtherGroup: true,
    placeSingleNode: false,
    useAnimationWhenRefresh: true,
    debug: false,
    layouts: [
        {
            label: 'Center',
            layoutName: 'center',
            from: 'left',
            layoutClassName: 'seeks-layout-center',
            defaultExpandHolderPosition: 'hide',
            defaultJunctionPoint: 'border'
        },
        {
            label: 'Tree',
            layoutName: 'tree',
            from: 'left',
            layoutClassName: 'seeks-layout-center',
            defaultExpandHolderPosition: 'hide',
            defaultJunctionPoint: 'border'
        },
        {
            label: 'Circle',
            layoutName: 'circle',
            from: 'left',
            layoutClassName: 'seeks-layout-center',
            defaultExpandHolderPosition: 'hide',
            defaultJunctionPoint: 'border'
        },
        {
            label: 'Force',
            layoutName: 'force',
            from: 'left',
            layoutClassName: 'seeks-layout-center',
            defaultExpandHolderPosition: 'hide',
            defaultJunctionPoint: 'border'
        }
    ]
};

const playing = ref(false);

const showGraph = async() => {
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
    const rgInstanceRef = graphRef.value.getInstance();
    await rgInstanceRef.setJsonData(__graph_json_data);
    await rgInstanceRef.playShowEffect();
};

const play = () => {
    playing.value = true;
    switchLayout(1);
};

const switchLayout = async (layoutOptionsIndex: number) => {
    if (!playing.value) return;
    if (layoutOptionsIndex > graphOptions.layouts.length - 1) layoutOptionsIndex = 0;
    const graphInstance = graphRef.value.getInstance();
    if (!graphInstance) return;
    await graphInstance.switchLayout(graphOptions.layouts[layoutOptionsIndex], false, true);
    await sleep(2000);
    await switchLayout(layoutOptionsIndex + 1);
};

const stop = () => {
    playing.value = false;
};

const graphRef = ref<RelationGraphComponent | null>(null);

onMounted(() => {
    showGraph();
});

const sleep = async (time: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};
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
}
</style>
```

## React 版本

### `before-change-layout.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph from 'relation-graph-react';
import type { RGJsonData, RGOptions, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent | null>(null);
  const [playing, setPlaying] = useState(false);
  const playingSignal = useRef(false);

  const graphOptions: RGOptions = {
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenExpanded: true,
    placeOtherGroup: true,
    placeSingleNode: false,
    useAnimationWhenRefresh: true,
    debug: false,
    layouts: [
      {
        label: 'Center',
        layoutName: 'center',
        from: 'left',
        layoutClassName: 'seeks-layout-center'
      },
      {
        label: 'Tree',
        layoutName: 'tree',
        from: 'left',
        layoutClassName: 'seeks-layout-center'
      },
      {
        label: 'Circle',
        layoutName: 'circle',
        from: 'left',
        layoutClassName: 'seeks-layout-center'
      },
      {
        label: 'Force',
        layoutName: 'force',
        from: 'left',
        layoutClassName: 'seeks-layout-center'
      }
    ]
  };

  const showGraph = async () => {
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
    const rgInstanceRef = graphRef.current?.getInstance();
    if (rgInstanceRef) {
      await rgInstanceRef.setJsonData(__graph_json_data);
      await rgInstanceRef.playShowEffect();
    }
  };

  const play = () => {
    playingSignal.current = true;
    switchLayout(1);
  };

  const switchLayout = async (layoutOptionsIndex: number) => {
    if (!playingSignal.current) return;
    if (layoutOptionsIndex > graphOptions.layouts.length - 1) layoutOptionsIndex = 0;
    const graphInstance = graphRef.current?.getInstance();
    if (!graphInstance) return;
    await graphInstance.switchLayout(graphOptions.layouts[layoutOptionsIndex], false, true);
    await sleep(2000);
    await switchLayout(layoutOptionsIndex + 1);
  };

  const stop = () => {
    playingSignal.current = false;
  };

  useEffect(() => {
    showGraph();
  }, []);
  useEffect(() => {
    if (playing) {
      play();
    } else {
      stop();
    }
  }, [playing]);

  const sleep = async (time: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          {!playing ? (
            <button
              className="border rounded-lg px-2"
              style={{ backgroundColor: '#00bb00', color: '#ffffff' }}
              onClick={() => {setPlaying(true);}}
            >
              Play Auto Switch
            </button>
          ) : (
            <button
              className="border rounded-lg px-2"
              style={{ backgroundColor: '#d9001b', color: '#ffffff' }}
              onClick={() => {setPlaying(false);}}
            >
              Stop Auto Switch
            </button>
          )}
        </div>
        <RelationGraph ref={graphRef} options={graphOptions}>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```
