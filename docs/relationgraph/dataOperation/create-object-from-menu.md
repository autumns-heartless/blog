# 右键菜单创建节点、关系

## Vue2 版本

### `create-object-from-menu.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-contextmenu="onContextmenu"
      >
        <template #graph-plug>
          <div
              v-if="isShowNodeTipsPanel"
              :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
              class="c-right-menu-panel"
          >
            <div class="c-object-info">
              <div>当前右键事件信息：</div>
              <div>类型：{{currentObjectType}}</div>
              <div v-if="currentObjectType==='link'">{{currentObject.fromNode.text}} -> {{currentObject.toNode.text}}</div>
              <div v-if="currentObjectType==='node'">ID:{{currentObject.id}}</div>
              <div v-if="currentObjectType==='node'">Text:{{currentObject.text}}</div>
              <div>你可以对这个对象做以下操作：</div>
            </div>
            <div v-if="currentObjectType==='canvas'" class="c-node-menu-item" @click="addNode">添加节点</div>
            <div v-if="currentObjectType==='node'" class="c-node-menu-item" @click="deleteNode">删除节点</div>
            <div v-if="currentObjectType==='node'" class="c-node-menu-item" @click="createLineFromNode">添加连线</div>
            <div v-if="currentObjectType==='link'" class="c-node-menu-item" @click="deleteLink">删除关系</div>
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
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  allowShowDownloadButton: true,
  defaultJunctionPoint: 'border'
};
export default {
  name: 'ObjectEdit',
  components: { },
  data() {
    return {
      isShowNodeTipsPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentObjectType: null,
      currentObject: '',
      newNodeIdIndex: 1,
      newLineIdIndex: 1,
      graphOptions
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'A', borderColor: 'yellow' },
          { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
          { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
          { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
          { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
          { from: 'a', to: 'c', text: '关系2' },
          { from: 'a', to: 'e', text: '关系3' },
          { from: 'b', to: 'e', text: '', color: '#67C23A' }
        ]
      };
      const graphRef = this.$refs.graphRef
      graphRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码.
        }
      );
    },
    onContextmenu($event, objectType, object) {
      const graphInstance = this.$refs.graphRef.getInstance();
      this.currentObjectType = objectType;
      this.currentObject = object;
      const _base_position = graphInstance.getBoundingClientRect();
      console.log('showNodeMenus:', $event, _base_position);
      this.isShowNodeTipsPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10;
      const hideContentMenu = () => {
        this.isShowNodeTipsPanel = false;
        document.body.removeEventListener('click', hideContentMenu)
      }
      document.body.addEventListener('click', hideContentMenu)
    },
    addNode($event) {
      const graphInstance = this.$refs.graphRef.getInstance();
      const _base_position = graphInstance.getBoundingClientRect();
      const canvasCoordinate = graphInstance.getCanvasCoordinateByClientCoordinate({
        x: this.nodeMenuPanelPosition.x - 10 + _base_position.x,
        y: this.nodeMenuPanelPosition.y - 10 + _base_position.y
      });
      const newId = this.newNodeIdIndex++
      graphInstance.addNodes([{
        id: 'addFromCanvas-' + newId,
        text: 'New-' + newId,
        color: '#5da0f8',
        x: canvasCoordinate.x,
        y: canvasCoordinate.y
      }]);
    },
    deleteNode($event) {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.removeNodeById(this.currentObject.id);
    },
    deleteLink($event) {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.removeLinkById(this.currentObject.seeks_id);
    },
    createLineFromNode(e) {
      const graphInstance = this.$refs.graphRef.getInstance();
      graphInstance.startCreatingLinePlot(e, {
        template: {
          lineWidth: 3,
          color: '#e85f84',
          text: '新连线'
        },
        fromNode: this.currentObject,
        onCreateLine: (from, to) => {
          console.log('新增连线：', from, to);
          if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
            const newLineId = this.newLineIdIndex++;
            graphInstance.addLines([{
              from: from.id,
              to: to.id,
              lineWidth: 3,
              color: '#e85f84',
              text: '新连线' + newLineId
            }]);
          }
        }
      });
    }
  },
};
</script>

<style>
</style>

<style scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
.c-object-info{
  line-height: 18px;padding-left: 10px;color: #888888;font-size: 12px;
}
.c-right-menu-panel{
  z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;
  border-radius: 10px;
  width:200px;
}
</style>
```

## Vue3 版本

### `create-object-from-menu.vue`

```javascript
<template>
  <div>
    <div style="height: calc(100vh)">
      <RelationGraph ref="graphRef" :options="graphOptions" @contextmenu="onContextmenu">
        <template #graph-plug>
            <div class="c-my-panel">
                <div class="c-option-name">Please try right-clicking on the artboard, node, or line</div>
            </div>
          <div
            v-if="isShowNodeTipsPanel"
            :style="{ left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
            class="c-right-menu-panel"
          >
            <div class="c-object-info">
              <div>Current right-click event information:</div>
              <div>Type: {{ currentObjectType }}</div>
              <div v-if="currentObjectType === 'link'">
                {{ currentObject.fromNode.text }} -> {{ currentObject.toNode.text }}
              </div>
              <div v-if="currentObjectType === 'node'">ID: {{ currentObject.id }}</div>
              <div v-if="currentObjectType === 'node'">Text: {{ currentObject.text }}</div>
              <div>You can perform the following operations on this object:</div>
            </div>
            <div v-if="currentObjectType === 'canvas'" class="c-node-menu-item" @click="addNode">
              Add Node
            </div>
            <div v-if="currentObjectType === 'node'" class="c-node-menu-item" @click="deleteNode">
              Delete Node
            </div>
            <div v-if="currentObjectType === 'node'" class="c-node-menu-item" @click="createLineFromNode">
              Add Link
            </div>
            <div v-if="currentObjectType === 'link'" class="c-node-menu-item" @click="deleteLink">
              Delete Relation
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
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border'
};

const isShowNodeTipsPanel = ref(false);
const nodeMenuPanelPosition = ref({ x: 0, y: 0 });
const currentObjectType = ref(null);
const currentObject = ref('');
let newNodeIdIndex = 1;
let newLineIdIndex = 1;

const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'A', borderColor: 'yellow' },
            { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
            { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
            { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
            { from: 'a', to: 'b', text: 'Relation 1', color: '#43a2f1' },
            { from: 'a', to: 'c', text: 'Relation 2' },
            { from: 'a', to: 'e', text: 'Relation 3' },
            { from: 'b', to: 'e', text: '', color: '#67C23A' }
        ]
    };
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        await graphInstance.moveToCenter();
        await graphInstance.zoomToFit();
    }
};

const onContextmenu = ($event: RGUserEvent, objectType: string, object: any) => {
    const graphInstance = graphRef.value.getInstance();
    currentObjectType.value = objectType;
    currentObject.value = object;
    const _base_position = graphInstance.getBoundingClientRect();
    console.log('showNodeMenus:', $event, _base_position);
    isShowNodeTipsPanel.value = true;
    nodeMenuPanelPosition.value.x = $event.clientX - _base_position.x + 10;
    nodeMenuPanelPosition.value.y = $event.clientY - _base_position.y + 10;
    const hideContentMenu = () => {
        isShowNodeTipsPanel.value = false;
        document.body.removeEventListener('click', hideContentMenu);
    };
    document.body.addEventListener('click', hideContentMenu);
};

const addNode = ($event: MouseEvent) => {
    const graphInstance = graphRef.value.getInstance();
    const _base_position = graphInstance.getBoundingClientRect();
    const canvasCoordinate = graphInstance.getCanvasCoordinateByClientCoordinate({
        x: nodeMenuPanelPosition.value.x - 10 + _base_position.x,
        y: nodeMenuPanelPosition.value.y - 10 + _base_position.y

    });
    const newId = newNodeIdIndex++;
    graphInstance.addNodes([
        {
            id: 'addFromCanvas-' + newId,
            text: 'New-' + newId,
            color: '#5da0f8',
            x: canvasCoordinate.x,
            y: canvasCoordinate.y

        }
    ]);
};

const deleteNode = ($event: MouseEvent) => {
    const graphInstance = graphRef.value.getInstance();
    graphInstance.removeNodeById(currentObject.value.id);
};

const deleteLink = ($event: MouseEvent) => {
    const graphInstance = graphRef.value.getInstance();
    graphInstance.removeLinkById(currentObject.value.seeks_id);
};

const createLineFromNode = (e: MouseEvent) => {
    const graphInstance = graphRef.value.getInstance();
    graphInstance.startCreatingLinePlot(e, {
        template: {
            lineWidth: 3,
            color: '#e85f84',
            text: 'New Link'
        },
        fromNode: currentObject.value,
        onCreateLine: (from: RGNode, to: RGNode) => {
            console.log('New Link:', from, to);
            if (to.id) {
                const newLineId = newLineIdIndex++;
                graphInstance.addLines([
                    {
                        from: from.id,
                        to: to.id,
                        lineWidth: 3,
                        color: '#e85f84',
                        text: 'New Link ' + newLineId

                    }
                ]);
            }
        }
    });
};

const graphRef = ref<RelationGraphComponent>();

onMounted(() => {
    showGraph();
});
</script>

<style>
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
.c-object-info {
  line-height: 18px;
  padding-left: 10px;
  color: #888888;
  font-size: 12px;
}
.c-right-menu-panel {
  z-index: 999;
  padding: 10px;
  background-color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  position: absolute;
  border-radius: 10px;
  width: 200px;
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
    .c-my-button{
        border-radius: 5px;
        height: 42px;
        width: 150px;
        text-align: center;
        line-height: 30px;
        padding:5px;
        cursor: pointer;
        background-color: #ffffff;
        border:rgba(79, 30, 30, 1) solid 1px;
        &:hover {
            transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
            box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
        }
    }
    .c-my-button-checked{
        transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
        box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
        background-color: rgba(79, 30, 30, 1);
        color: #ffffff;
    }
}
</style>
```

## React 版本

### `create-object-from-menu.tsx`

```javascript
import React, { useRef, useEffect, useState } from 'react';
import RelationGraph from 'relation-graph-react';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-react';
import './create-object-from-menu.scss';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [isShowNodeTipsPanel, setIsShowNodeTipsPanel] = useState(false);
  const [nodeMenuPanelPosition, setNodeMenuPanelPosition] = useState({ x: 0, y: 0 });
  const [currentObjectType, setCurrentObjectType] = useState<string | null>(null);
  const [currentObject, setCurrentObject] = useState<any>('');

  let newNodeIdIndex = 1;
  let newLineIdIndex = 1;

  const graphOptions: RGOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border'
  };

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'A', borderColor: 'yellow' },
        { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
        { id: 'c', text: 'C', nodeShape: 1, width: 50, height: 50 },
        { id: 'e', text: 'E', nodeShape: 0, width: 80, height: 80 }
      ],
      lines: [
        { from: 'a', to: 'b', text: 'Relation 1', color: '#43a2f1' },
        { from: 'a', to: 'c', text: 'Relation 2' },
        { from: 'a', to: 'e', text: 'Relation 3' },
        { from: 'b', to: 'e', text: '', color: '#67C23A' }
      ]
    };
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data);
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
    }
  };

  const onContextmenu = ($event: RGUserEvent, objectType: string, object: any) => {
    const graphInstance = graphRef.current!.getInstance();
    setCurrentObjectType(objectType);
    setCurrentObject(object);
    const _base_position = graphInstance.getBoundingClientRect();
    console.log('showNodeMenus:', $event, _base_position);
    setIsShowNodeTipsPanel(true);
    setNodeMenuPanelPosition({
      x: $event.clientX - _base_position.x + 10,
      y: $event.clientY - _base_position.y + 10

    });
    const hideContentMenu = () => {
      setIsShowNodeTipsPanel(false);
      document.body.removeEventListener('click', hideContentMenu);
    };
    document.body.addEventListener('click', hideContentMenu);
  };

  const addNode = ($event: React.MouseEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    const _base_position = graphInstance.getBoundingClientRect();
    const canvasCoordinate = graphInstance.getCanvasCoordinateByClientCoordinate({
      x: nodeMenuPanelPosition.x - 10 + _base_position.x,
      y: nodeMenuPanelPosition.y - 10 + _base_position.y

    });
    const newId = newNodeIdIndex++;
    graphInstance.addNodes([
      {
        id: 'addFromCanvas-' + newId,
        text: 'New-' + newId,
        color: '#5da0f8',
        x: canvasCoordinate.x,
        y: canvasCoordinate.y

      }
    ]);
  };

  const deleteNode = ($event: React.MouseEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.removeNodeById(currentObject.id);
  };

  const deleteLink = ($event: React.MouseEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.removeLinkById(currentObject.seeks_id);
  };

  const createLineFromNode = (e: React.MouseEvent) => {
    const graphInstance = graphRef.current!.getInstance();
    graphInstance.startCreatingLinePlot(e, {
      template: {
        lineWidth: 3,
        color: '#e85f84',
        text: 'New Link'
      },
      fromNode: currentObject,
      onCreateLine: (from: RGNode, to: RGNode) => {
        console.log('New Link:', from, to);
        if (to.id) {
          const newLineId = newLineIdIndex++;
          graphInstance.addLines([
            {
              from: from.id,
              to: to.id,
              lineWidth: 3,
              color: '#e85f84',
              text: 'New Link ' + newLineId

            }
          ]);
        }
      }
    });
  };

  useEffect(() => {
    showGraph();
  }, []);

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          <div className="c-option-name">Please try right-clicking on the artboard, node, or line</div>
        </div>
        {isShowNodeTipsPanel && (
          <div
            style={{ left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }}
            className="c-right-menu-panel"
          >
            <div className="c-object-info">
              <div>Current right-click event information:</div>
              <div>Type: {currentObjectType}</div>
              {currentObjectType === 'link' && (
                <div>
                  {currentObject.fromNode.text} -&gt; {currentObject.toNode.text}
                </div>
              )}
              {currentObjectType === 'node' && <div>ID: {currentObject.id}</div>}
              {currentObjectType === 'node' && <div>Text: {currentObject.text}</div>}
              <div>You can perform the following operations on this object:</div>
            </div>
            {currentObjectType === 'canvas' && (
              <div className="c-node-menu-item" onClick={addNode}>
                Add Node

              </div>
            )}
            {currentObjectType === 'node' && (
              <div className="c-node-menu-item" onClick={deleteNode}>
                Delete Node

              </div>
            )}
            {currentObjectType === 'node' && (
              <div className="c-node-menu-item" onClick={createLineFromNode}>
                Add Link

              </div>
            )}
            {currentObjectType === 'link' && (
              <div className="c-node-menu-item" onClick={deleteLink}>
                Delete Relation

              </div>
            )}
          </div>
        )}
        <RelationGraph ref={graphRef} options={graphOptions} onContextmenu={onContextmenu}>

        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `create-object-from-menu.scss`

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
.c-object-info {
  line-height: 18px;
  padding-left: 10px;
  color: #888888;
  font-size: 12px;
}
.c-right-menu-panel {
  z-index: 999;
  padding: 10px;
  background-color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  position: absolute;
  border-radius: 10px;
  width: 200px;
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

  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .c-my-button {
    border-radius: 5px;
    height: 42px;
    width: 150px;
    text-align: center;
    line-height: 30px;
    padding: 5px;
    cursor: pointer;
    background-color: #ffffff;
    border: rgba(79, 30, 30, 1) solid 1px;
    &:hover {
      transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
          0.2s ease;
      box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    }
  }
  .c-my-button-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    background-color: rgba(79, 30, 30, 1);
    color: #ffffff;
  }
}
```
