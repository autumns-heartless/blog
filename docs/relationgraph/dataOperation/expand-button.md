# 动态加载数据与重新布局

## Vue2 版本

### `expand-button.vue`

```javascript
<template>
  <div>
    <div v-loading="g_loading" style="margin-top:50px;width: calc(100% - 10px);height:calc(100vh - 140px);">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-expand="onNodeExpand">
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
const graphOptions = {
  layout:
    {
      label: '中心',
      layoutName: 'tree',
      layoutClassName: 'seeks-layout-center',
      defaultJunctionPoint: 'border',
      defaultNodeShape: 0,
      defaultLineShape: 1,
      from: 'left',
      max_per_width: 300,
      min_per_height: 40
    },
  defaultLineMarker: {
    markerWidth: 12,
    markerHeight: 12,
    refX: 6,
    refY: 6,
    data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
  },
  moveToCenterWhenRefresh: true,
  reLayoutWhenExpandedOrCollapsed: true,
  defaultExpandHolderPosition: 'right',
  defaultNodeShape: 1,
  defaultNodeWidth: 100,
  defaultLineShape: 4,
  defaultJunctionPoint: 'lr',
  defaultNodeBorderWidth: 0,
  defaultLineColor: 'rgba(0, 186, 189, 1)',
  defaultNodeColor: 'rgba(0, 206, 209, 1)'
};
export default {
  name: 'RelationGraphDemo',
  components: { },
  data() {
    return {
      g_loading: true,
      demoname: '---',
      graphOptions
    };
  },
  created() {
  },
  mounted() {
    this.setGraphData();
  },
  methods: {
    setGraphData() {
      // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
      //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a' },
          { 'id': 'b', 'text': 'b-固定数据展开/关闭', color: '#ff0099' },
          { 'id': 'b1', 'text': 'b1', color: '#2fce03' },
          { 'id': 'b1-1', 'text': 'b1-1' },
          { 'id': 'b1-2', 'text': 'b1-2' },
          { 'id': 'b1-3', 'text': 'b1-3' },
          { 'id': 'b1-4', 'text': 'b1-4' },
          { 'id': 'b1-5', 'text': 'b1-5' },
          { 'id': 'b1-6', 'text': 'b1-6' },
          { 'id': 'b2', 'text': 'b2', color: '#06a1c4' },
          { 'id': 'b2-1', 'text': 'b2-1' },
          { 'id': 'b2-2', 'text': 'b2-2' },
          { 'id': 'c', 'text': 'c-动态数据展开/关闭', color: '#dcb106' },
          { 'id': 'c1', 'text': 'c1-动态获取子节点', color: '#ef6504', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false }},
          { 'id': 'c2', 'text': 'c2-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false }},
          { 'id': 'c3', 'text': 'c3-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false }}],
        'lines': [
          { 'from': 'a', 'to': 'b' },
          { 'from': 'b', 'to': 'b1' },
          { 'from': 'b1', 'to': 'b1-1' },
          { 'from': 'b1', 'to': 'b1-2' },
          { 'from': 'b1', 'to': 'b1-3' },
          { 'from': 'b1', 'to': 'b1-4' },
          { 'from': 'b1', 'to': 'b1-5' },
          { 'from': 'b1', 'to': 'b1-6' },
          { 'from': 'b', 'to': 'b2' },
          { 'from': 'b2', 'to': 'b2-1' },
          { 'from': 'b2', 'to': 'b2-2' },
          { 'from': 'a', 'to': 'c' },
          { 'from': 'c', 'to': 'c1' },
          { 'from': 'c', 'to': 'c2' },
          { 'from': 'c', 'to': 'c3' }]
      };

      console.log(JSON.stringify(__graph_json_data));
      setTimeout(() => {
        this.g_loading = false;
        this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        });
      }, 1000);
    },
    // 通过onNodeExpand事件监听节点的展开事件，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
    onNodeExpand(node, e) {
      console.log('onNodeExpand:', node);
      // 根据具体的业务需要决定是否需要从后台加载数据
      if (!node.data.isNeedLoadDataFromRemoteServer) {
        console.log('这个节点的子节点已经加载过了');
        return;
      }
      // 判断是否已经动态加载数据了
      if (node.data.childrenLoaded) {
        console.log('这个节点的子节点已经加载过了');
        return;
      }
      this.g_loading = true;
      node.data.childrenLoaded = true;
      this.loadChildNodesFromRemoteServer(node, new_data => {
        this.g_loading = false;
        this.$refs.graphRef.getInstance().appendJsonData(new_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        });
      });
    },
    loadChildNodesFromRemoteServer(node, callback) {
      setTimeout(function() {
        const _new_json_data = {
          nodes: [
            { id: node.id + '-child-1', text: node.id + '-的动态子节点1', width: 150 },
            { id: node.id + '-child-2', text: node.id + '-的动态子节点2', width: 150 },
            { id: node.id + '-child-3', text: node.id + '-的动态子节点3', width: 150 }
          ],
          lines: [
            { from: node.id, to: node.id + '-child-1', text: '动态子节点' },
            { from: node.id, to: node.id + '-child-2', text: '动态子节点' },
            { from: node.id, to: node.id + '-child-3', text: '动态子节点' }
          ]
        };
        callback(_new_json_data);
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

## Vue3 版本

### `expand-button.vue`

```javascript
<template>
  <div>
    <div v-loading="g_loading" style="margin-top:50px;width: calc(100% - 10px);height:calc(100vh - 140px);">
      <RelationGraph ref="graphRef" :options="graphOptions" @node-expand="onNodeExpand" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    'layouts': [
        {
            'label': 'Center',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            'max_per_width': '300',
            'min_per_height': '40'
        }
    ],
    'defaultLineMarker': {
        'markerWidth': 12,
        'markerHeight': 12,
        'refX': 6,
        'refY': 6,
        'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
    },
    moveToCenterWhenRefresh: true,
    reLayoutWhenExpandedOrCollapsed: true,
    'defaultExpandHolderPosition': 'right',
    'defaultNodeShape': 1,
    'defaultNodeWidth': 100,
    'defaultLineShape': 4,
    'defaultJunctionPoint': 'lr',
    'defaultNodeBorderWidth': 0,
    'defaultLineColor': 'rgba(0, 186, 189, 1)',
    'defaultNodeColor': 'rgba(0, 206, 209, 1)'
};
const g_loading = ref(true);
const graphRef = ref<RelationGraphComponent>();

onMounted(() => {
    setGraphData();
});

const setGraphData = async() => {
    const __graph_json_data: RGJsonData = {
        'rootId': 'a',
        'nodes': [
            { 'id': 'a', 'text': 'a' },
            { 'id': 'b', 'text': 'b-固定数据展开/关闭', color: '#ff0099' },
            { 'id': 'b1', 'text': 'b1', color: '#2fce03' },
            { 'id': 'b1-1', 'text': 'b1-1' },
            { 'id': 'b1-2', 'text': 'b1-2' },
            { 'id': 'b1-3', 'text': 'b1-3' },
            { 'id': 'b1-4', 'text': 'b1-4' },
            { 'id': 'b1-5', 'text': 'b1-5' },
            { 'id': 'b1-6', 'text': 'b1-6' },
            { 'id': 'b2', 'text': 'b2', color: '#06a1c4' },
            { 'id': 'b2-1', 'text': 'b2-1' },
            { 'id': 'b2-2', 'text': 'b2-2' },
            { 'id': 'c', 'text': 'c-动态数据展开/关闭', color: '#dcb106' },
            { 'id': 'c1', 'text': 'c1-动态获取子节点', color: '#ef6504', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false }},
            { 'id': 'c2', 'text': 'c2-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false }},
            { 'id': 'c3', 'text': 'c3-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false }}],
        'lines': [
            { 'from': 'a', 'to': 'b' },
            { 'from': 'b', 'to': 'b1' },
            { 'from': 'b1', 'to': 'b1-1' },
            { 'from': 'b1', 'to': 'b1-2' },
            { 'from': 'b1', 'to': 'b1-3' },
            { 'from': 'b1', 'to': 'b1-4' },
            { 'from': 'b1', 'to': 'b1-5' },
            { 'from': 'b1', 'to': 'b1-6' },
            { 'from': 'b', 'to': 'b2' },
            { 'from': 'b2', 'to': 'b2-1' },
            { 'from': 'b2', 'to': 'b2-2' },
            { 'from': 'a', 'to': 'c' },
            { 'from': 'c', 'to': 'c1' },
            { 'from': 'c', 'to': 'c2' },
            { 'from': 'c', 'to': 'c3' }]
    };

    console.log(JSON.stringify(__graph_json_data));
    g_loading.value = false;
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

const onNodeExpand = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeExpand:', nodeObject);
    if (!nodeObject.data.isNeedLoadDataFromRemoteServer) {
        console.log('These child nodes have already been loaded');
        return;
    }
    if (nodeObject.data.childrenLoaded) {
        console.log('These child nodes have already been loaded');
        return;
    }
    g_loading.value = true;
    nodeObject.data.childrenLoaded = true;
    loadChildNodesFromRemoteServer(nodeObject, (new_data) => {
        g_loading.value = false;
        const graphInstance = graphRef.value!.getInstance();
        graphInstance.appendJsonData(new_data, (graphInstance) => {
            // 这些写上当图谱初始化完成后需要执行的代码

        });
    });
};

const loadChildNodesFromRemoteServer = (nodeObject: RGNode, callback: (new_data: RGJsonData) => void) => {
    setTimeout(function() {
        const _new_json_data: RGJsonData = {
            nodes: [
                { id: nodeObject.id + '-child-1', text: nodeObject.id + '-dynamic child node 1', width: 150 },
                { id: nodeObject.id + '-child-2', text: nodeObject.id + '-dynamic child node 2', width: 150 },
                { id: nodeObject.id + '-child-3', text: nodeObject.id + '-dynamic child node 3', width: 150 }
            ],
            lines: [
                { from: nodeObject.id, to: nodeObject.id + '-child-1', text: 'Dynamic child node' },
                { from: nodeObject.id, to: nodeObject.id + '-child-2', text: 'Dynamic child node' },
                { from: nodeObject.id, to: nodeObject.id + '-child-3', text: 'Dynamic child node' }
            ]
        };
        callback(_new_json_data);
    }, 1000);
};
</script>

<style scoped>
</style>
```

## React 版本

### `expand-button.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph from 'relation-graph-react'
import type {
  RGOptions,
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent,
} from 'relation-graph-react'

const ExpandButton = () => {
  const graphRef = useRef < RelationGraphComponent > null
  const setGraphData = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'a' },
        { id: 'b', text: 'b-static-childs', color: '#ff0099' },
        { id: 'b1', text: 'b1', color: '#2fce03' },
        { id: 'b1-1', text: 'b1-1' },
        { id: 'b1-2', text: 'b1-2' },
        { id: 'b1-3', text: 'b1-3' },
        { id: 'b1-4', text: 'b1-4' },
        { id: 'b1-5', text: 'b1-5' },
        { id: 'b1-6', text: 'b1-6' },
        { id: 'b2', text: 'b2', color: '#06a1c4' },
        { id: 'b2-1', text: 'b2-1' },
        { id: 'b2-2', text: 'b2-2' },
        { id: 'c', text: 'c-dynamic-childs', color: '#dcb106' },
        {
          id: 'c1',
          text: 'c1-childs-from-remote',
          color: '#ef6504',
          expandHolderPosition: 'right',
          expanded: false,
          data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false },
        },
        {
          id: 'c2',
          text: 'c2-childs-from-remote',
          expandHolderPosition: 'right',
          expanded: false,
          data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false },
        },
        {
          id: 'c3',
          text: 'c3-childs-from-remote',
          expandHolderPosition: 'right',
          expanded: false,
          data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false },
        },
      ],
      lines: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'b1' },
        { from: 'b1', to: 'b1-1' },
        { from: 'b1', to: 'b1-2' },
        { from: 'b1', to: 'b1-3' },
        { from: 'b1', to: 'b1-4' },
        { from: 'b1', to: 'b1-5' },
        { from: 'b1', to: 'b1-6' },
        { from: 'b', to: 'b2' },
        { from: 'b2', to: 'b2-1' },
        { from: 'b2', to: 'b2-2' },
        { from: 'a', to: 'c' },
        { from: 'c', to: 'c1' },
        { from: 'c', to: 'c2' },
        { from: 'c', to: 'c3' },
      ],
    }

    console.log(JSON.stringify(__graph_json_data))
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data)
      await graphInstance.moveToCenter()
      await graphInstance.zoomToFit()
    }
  }

  const onNodeExpand = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeExpand:', nodeObject)
    if (!nodeObject.data.isNeedLoadDataFromRemoteServer) {
      console.log('These child nodes have already been loaded')
      return
    }
    if (nodeObject.data.childrenLoaded) {
      console.log('These child nodes have already been loaded')
      return
    }
    nodeObject.data.childrenLoaded = true
    loadChildNodesFromRemoteServer(nodeObject, (new_data) => {
      const graphInstance = graphRef.current?.getInstance()
      if (graphInstance) {
        graphInstance.appendJsonData(new_data)
      }
    })
  }

  const loadChildNodesFromRemoteServer = (
    nodeObject: RGNode,
    callback: (new_data: RGJsonData) => void,
  ) => {
    setTimeout(function () {
      const _new_json_data: RGJsonData = {
        nodes: [
          {
            id: nodeObject.id + '-child-1',
            text: nodeObject.id + '-dynamic child node 1',
            width: 150,
          },
          {
            id: nodeObject.id + '-child-2',
            text: nodeObject.id + '-dynamic child node 2',
            width: 150,
          },
          {
            id: nodeObject.id + '-child-3',
            text: nodeObject.id + '-dynamic child node 3',
            width: 150,
          },
        ],
        lines: [
          { from: nodeObject.id, to: nodeObject.id + '-child-1', text: 'Dynamic child node' },
          { from: nodeObject.id, to: nodeObject.id + '-child-2', text: 'Dynamic child node' },
          { from: nodeObject.id, to: nodeObject.id + '-child-3', text: 'Dynamic child node' },
        ],
      }
      callback(_new_json_data)
    }, 1000)
  }
  const graphOptions: RGOptions = {
    layout: {
      label: 'Center',
      layoutName: 'tree',
      layoutClassName: 'seeks-layout-center',
      defaultJunctionPoint: 'border',
      defaultNodeShape: 0,
      defaultLineShape: 1,
      from: 'left',
      max_per_width: '300',
      min_per_height: '40',
    },
    defaultLineMarker: {
      markerWidth: 12,
      markerHeight: 12,
      refX: 6,
      refY: 6,
      data: 'M2,2 L10,6 L2,10 L6,6 L2,2',
    },
    moveToCenterWhenRefresh: true,
    reLayoutWhenExpandedOrCollapsed: true,
    defaultExpandHolderPosition: 'right',
    defaultNodeShape: 1,
    defaultNodeWidth: 100,
    defaultLineShape: 4,
    defaultJunctionPoint: 'lr',
    defaultNodeBorderWidth: 0,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)',
    defaultPolyLineRadius: 5,
    defaultLineTextOffset_y: 2,
  }
  useEffect(() => {
    setGraphData()
  }, [])
  return (
    <div>
      <div style={{ marginTop: '50px', width: 'calc(100% - 10px)', height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions} onNodeExpand={onNodeExpand} />
      </div>
    </div>
  )
}

export default ExpandButton
```
