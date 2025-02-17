# folder-组织机构树

## Vue2 版本

### `layout-folder2.vue`

```javascript
<template>
  <div style="">
    <div v-loading="g_loading" style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
            <div class="my-card-node">
                <div class="card-left"></div>
                <div class="card-right">
                    <div class="card-name">{{node.text}}</div>
                    <div class="card-tags">
                        <div v-for="tag of node.data.tags" :key="tag" class="card-tag">{{tag}}</div>
                    </div>
                    <div class="card-location">{{node.data.location}}</div>
                </div>
            </div>
        </template>
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-option-name">
              这个示例中，调用setJsonData时传递的是一个典型的有层级结构的数据，图谱会自动识别（通过children属性识别子节点），再将其做扁平化处理。这样做仅仅是为了方便展示一些树状图谱。
              <br>
              直接使用tree数据结构有明显的确缺陷：只能设置全局的线条默认样式，无法对具体的line设置属性，不能精细的定义线条的样式。
            </div>
            <div>
              布局方向：
              <el-radio-group v-model="myLayoutFrom" size="mini" @change="setGraphData">
                <el-radio-button :label="'left'">left</el-radio-button>
                <el-radio-button :label="'right'">right</el-radio-button>
              </el-radio-group>
            </div>
          </MyDemoPanel>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';

import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';

export default {
  name: 'RelationGraphDemo',
  components: { MyDemoPanel },
  data() {
    return {
      g_loading: true,
      myLayoutFrom: 'left',
      graphOptions: {
        debug: false,
        layout: {
          layoutName: 'folder',
          from: 'left',
          min_per_width: 130,
          min_per_height: 80,
          max_per_height: 80
          // levelDistance: [100,100,100,100,100,100,100,100,] // 如果此选项有值，则优先级高于上面那4个选项
        },
        defaultExpandHolderPosition: 'right',
        defaultNodeShape: 1,
        defaultLineShape: 41,
        defaultPloyLineRadius: 4,
        defaultBottomJuctionPoint_X: 28,
        defaultLineTextOffset_x: 0,
        defaultLineTextOffset_y: 0,
        defaultJunctionPoint: 'lr',
        defaultNodeBorderWidth: 0,
        defaultLineColor: '#cccccc',
        defaultNodeColor: '#333333',
        reLayoutWhenExpandedOrCollapsed: true
        // useAnimationWhenExpanded: true
      }
    };
  },
  created() {
  },
  mounted() {
    this.setGraphData();
  },
  methods: {
    async setGraphData() {
      const rootNodeJson = [
        {
          'id': 'a',
          'text': 'Tian Technology Co., Ltd.',
          'data': {
            'tags': [
              'Tag1',
              'Tag2',
              'Tag3'
            ],
            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
          },
          'children': [
            {
              'id': 'b',
              'text': 'Beijing Tianxing Company',
              'data': {
                'tags': [
                  'Tag1',
                  'Tag2',
                  'Tag3'
                ],
                'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
              },
              'children': [
                {
                  'id': 'b1',
                  'text': 'Beijing Tianxing A Company',
                  'data': {
                    'tags': [
                      'Tag2',
                      'Tag3'
                    ],
                    'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                  },
                  'children': [
                    {
                      'id': 'b1-1',
                      'text': 'Beijing Tianxing A 1 Company',
                      'data': {
                        'tags': [
                          'Tag1'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      },
                      'children': [
                        {
                          'id': 'b1-6-1',
                          'text': 'Beijing Tianxing A 555 Company',
                          'data': {
                            'tags': [
                              'Tag1'
                            ],
                            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                          }
                        },
                        {
                          'id': 'b1-6-2',
                          'text': 'Beijing Tianxing A 666 Company',
                          'data': {
                            'tags': [
                              'Tag2'
                            ],
                            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                          }
                        },
                        {
                          'id': 'b1-6-3',
                          'text': 'Beijing Tianxing A 777 Company',
                          'data': {
                            'tags': [
                              'Tag3'
                            ],
                            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                          }
                        }
                      ]
                    },
                    {
                      'id': 'b1-2',
                      'text': 'Beijing Tianxing A 2 Company',
                      'data': {
                        'tags': [
                          'Tag2'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      }
                    },
                    {
                      'id': 'b1-3',
                      'text': 'Beijing Tianxing A 3 Company',
                      'data': {
                        'tags': [
                          'Tag3'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      }
                    },
                    {
                      'id': 'b1-4',
                      'text': 'Beijing Tianxing A 4 Company',
                      'data': {
                        'tags': [
                          'Tag1',
                          'Tag2'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      }
                    },
                    {
                      'id': 'b1-5',
                      'text': 'Beijing Tianxing A 5 Company',
                      'data': {
                        'tags': [
                          'Tag1',
                          'Tag3'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      }
                    },
                    {
                      'id': 'b1-6',
                      'text': 'Beijing Tianxing A 6 Company',
                      'data': {
                        'tags': [
                          'Tag2',
                          'Tag3'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      },
                      'children': [
                        {
                          'id': 'b1-6-7',
                          'text': 'Beijing Tianxing A 888 Company',
                          'data': {
                            'tags': [
                              'Tag1'
                            ],
                            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                          }
                        },
                        {
                          'id': 'b1-6-8',
                          'text': 'Beijing Tianxing A aaa666 Company',
                          'data': {
                            'tags': [
                              'Tag2'
                            ],
                            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                          }
                        },
                        {
                          'id': 'b1-6-9',
                          'text': 'Beijing Tianxing A 77sda7 Company',
                          'data': {
                            'tags': [
                              'Tag3'
                            ],
                            'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  'id': 'b2',
                  'text': 'Beijing Tianxing B Company',
                  'data': {
                    'tags': [
                      'Tag2',
                      'Tag3'
                    ],
                    'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                  },
                  'children': [
                    {
                      'id': 'b2-1',
                      'text': 'Beijing Tianxing B 33 Company',
                      'data': {
                        'tags': [
                          'Tag1',
                          'Tag2'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      }
                    },
                    {
                      'id': 'b2-2',
                      'text': 'Beijing Tianxing B 33 Company',
                      'data': {
                        'tags': [
                          'Tag3'
                        ],
                        'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                      }
                    }
                  ]
                }
              ]
            },
            {
              'id': 'c',
              'text': 'Chengdu Tianxing Company',
              'data': {
                'tags': [
                  'Tag1',
                  'Tag3'
                ],
                'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
              },
              'children': [
                {
                  'id': 'c1',
                  'text': 'Chengdu Tianxing 1 Company',
                  'data': {
                    'tags': [
                      'Tag1'
                    ],
                    'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                  }
                },
                {
                  'id': 'c2',
                  'text': 'Chengdu Tianxing 3 Company',
                  'data': {
                    'tags': [
                      'Tag3'
                    ],
                    'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                  }
                },
                {
                  'id': 'c3',
                  'text': 'Chengdu Tianxing 3 Company',
                  'data': {
                    'tags': [
                      'Tag3'
                    ],
                    'location': 'No. 99, Guixi Street, Chengdu City, Sichuan Province.'
                  }
                }
              ]
            }
          ]
        }
      ];
      this.g_loading = false;
      const graphInstance = this.$refs.graphRef.getInstance();
      if (this.myLayoutFrom === 'right') {
        this.graphOptions.layout.from = 'right';
        this.graphOptions.defaultBottomJuctionPoint_X = 228;
        this.graphOptions.defaultLineTextOffset_x = -10;
      } else {
        this.graphOptions.layout.from = 'left';
        this.graphOptions.defaultBottomJuctionPoint_X = 28;
        this.graphOptions.defaultLineTextOffset_x = 0;
      }
      graphInstance.setOptions(this.graphOptions);
      graphInstance.clearGraph();
      const graphJsonData = {
        rootId: 'a',
        nodes: [],
        lines: [
          // 你仍然可以通过常规方式添加关系
        ]
      };
        // 将树状数据展开为扁平数据，里面的节点会被收集到graphJsonData.nodes, graphJsonData.lines
      graphInstance.flatNodeData(rootNodeJson, null, graphJsonData.nodes, graphJsonData.lines);
      graphJsonData.lines.forEach(line => {
        line.fromJunctionPoint = 'bottom';
        line.toJunctionPoint = this.graphOptions.layout.from;
        line.text = 'Text:' + Math.floor(Math.random() * 10000);
        // line.useTextPath = true;
        // line.placeText = '100%';
        line.textAnchor = this.graphOptions.layout.from === 'right' ? 'end' : 'start';
      });
      console.log('graphJsonData:', graphJsonData);
      await graphInstance.addNodes(graphJsonData.nodes);
      await graphInstance.addLines(graphJsonData.lines);
      graphInstance.graphData.rootNode = graphInstance.getNodeById(graphJsonData.rootId);
      await graphInstance.doLayout();
      await graphInstance.playShowEffect();
    }
  }
};
</script>
<style lang="scss" scoped>
//::v-deep .relation-graph {
//  .c-rg-line-text {
//    textPath {
//      text-anchor: end;
//    }
//  }
//}

.my-card-node {
    background-color: #f6f8ff;
    color: #333333;
    border: #447fff solid 1px;
    border-radius: 5px;
    height: 60px;
    width: 250px;
    display: flex;
    overflow: hidden;
    .card-left {
        width: 6px;
        background-color: #447fff;
    }
    .card-right {
        flex-grow: 1;
        text-align: left;
        padding-left: 10px;
        .card-name {
            font-size: 15px;
            line-height: 22px;
        }
        .card-tags {
            .card-tag {
                display: inline-block;
                font-size: 10px;
                background-color: rgba(68, 127, 255, 0.3);
                color: #447fff;
                border-radius: 5px;
                margin-right:5px;
                line-height: 18px;
                padding-left: 8px;
                padding-right: 8px;
            }
        }
        .card-location {
            width: 220px;
            font-size: 12px;
            color: #888888;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

::v-deep .relation-graph {
    .rel-node-checked {
        box-shadow: 0 0 0 5px rgba(68, 127, 255, 0.3);
    }
    .rel-node {
    }
    .c-btn-open-close {
        z-index: 10;
    }
    .c-btn-open-close span{
        background-color: #447fff !important;
    }
    .c-expand-positon-right span{
        transform: translateX(-45px);
    }
}
</style>
```

### 📂 rg-ui-simple

#### `MyDemoPanel.vue`

```javascript
<template>
  <div class="c-my-demo-panel"
       :class="[(closed ? 'c-my-demo-panel-closed':''), (right ? 'c-my-demo-panel-r' : '')]"
       :style="{
         '--my-panel-width': this.width,
         '--my-panel-top': this.top,
          left: right ? undefined : left,
          right: right ? right : undefined
       }"
  >
    <div class="my-footer">
      <div v-if="closed" class="my-icon my-icon-open" @click="tooglePanel">{{right ? '↙':'↘'}}</div>
      <div v-else class="my-icon my-icon-close" @click="tooglePanel">{{right ? '➡':'⬅'}}</div>
    </div>
    <div class="my-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDemoPanel',
  props: {
    width: {
      mustUseProp: false,
      default: '400px',
      type: String
    },
    left: {
      mustUseProp: false,
      default: '10px',
      type: String
    },
    right: {
      mustUseProp: false,
      default: '',
      type: String
    },
    top: {
      mustUseProp: false,
      default: '10px',
      type: String
    }
  },
  data() {
    return {
      closed: false
    };
  },
  mounted() {
  },
  methods: {
    tooglePanel() {
      this.closed = !this.closed;
    }
  }
};
</script>
<style lang="scss" scoped>
.c-my-demo-panel{
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0,21,41,.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  transition: width 0.3s ease-out;
  .my-footer {
    text-align: right;
    display: flex;
    place-items: end;
    justify-content: end;
    .my-icon {
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 16px;
      color: #666666;
      background-color: #efefef;
      display: flex;
      place-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #666666;
        color: #ffffff;
      }
      svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
      }
    }
    .my-icon-close {
    }
  }
  .c-title{
    color: #333333;
    font-size: 14px;
    line-height: 40px;
    padding-left:10px;
    padding-right:10px;
  }
  .c-content{
    color: #666666;
    font-size: 14px;
    line-height: 20px;
    padding:6px;
  }
  .c-button {
    line-height: 18px;
    display: inline-block;
    background-color: #035a8a;
    color: #ffffff;
    font-size: 12px;
    padding: 5px 15px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: rgba(3, 90, 138, 0.68);
    }
  }
  .c-link {
    color: #167fb7;
    cursor: pointer;
    padding: 0px 15px;
    &:hover {
      text-decoration: underline #167fb7;
    }
  }
  .c-my-options {
    text-align: center;
    .c-my-option-item {
      text-align: left;
      color: #1da9f5;
      cursor: pointer;
      border-radius: 5px;
      padding-left: 10px;
      margin-top: 5px;
      line-height: 25px;
      &:hover{
        background-color: rgba(29, 169, 245, 0.2);
      }
    }
  }
}
.c-my-demo-panel-closed {
  width: 50px;
  height: 50px;
  .my-body {
    opacity: 0;
    display: none;
  }
}
.c-my-demo-panel-r {
  .my-footer {
    place-items: end;
    justify-content: start;
  }
}
</style>
```

## Vue3 版本

### `layout-folder2.vue`

```javascript
<template>
  <div style="">
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
          <div class="my-card-node">
            <div class="card-left" />
            <div class="card-right">
              <div class="card-name">{{ node.text }}</div>
              <div class="card-tags">
                <div v-for="tag of node.data.tags" :key="tag" class="card-tag">{{ tag }}</div>
              </div>
              <div class="card-location">{{ node.data.location }}</div>
            </div>
          </div>
        </template>
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-option-name" style="line-height: 25px;padding:0px;width:300px;">
              这个示例中，调用setJsonData时传递的是一个典型的有层级结构的数据，图谱会自动识别（通过children属性识别子节点），再将其做扁平化处理。这样做仅仅是为了方便展示一些树状图谱。
              <br>
              直接使用tree数据结构有明显的确缺陷：只能设置全局的线条默认样式，无法对具体的line设置属性，不能精细的定义线条的样式。
            </div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RelationGraph, {RelationGraphComponent} from 'relation-graph-vue3';
import {RGOptions} from 'relation-graph-vue3';
import {onMounted, ref} from 'vue';

const graphOptions:RGOptions = {
    debug: false,
    layout: {
        'layoutName': 'folder',
        'from': 'left',
        min_per_width: 100,
        min_per_height: 80,
        max_per_height: 80,
        // 'levelDistance': [100,100,100,100,100,100,100,100,] // 如果此选项有值，则优先级高于上面那4个选项
    },
    'defaultExpandHolderPosition': 'right',
    'defaultNodeShape': 1,
    'defaultLineShape': 41,
    defaultPolyLineRadius: 4,
    defaultBottomJuctionPoint_X: 28,
    'defaultJunctionPoint': 'lr',
    'defaultNodeBorderWidth': 0,
    'defaultLineColor': '#cccccc',
    'defaultNodeColor': '#333333',
    reLayoutWhenExpandedOrCollapsed: true,
    // useAnimationWhenExpanded: true
};
const graphRef = ref<RelationGraphComponent>();
const setGraphData = async() => {
    // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
    //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
    const rootNodeJson = [
        { 'id': 'a', 'text': 'Tian Technology Co., Ltd.', data: { tags: ['Tag1', 'Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' }, 'children': [
            { 'id': 'b', 'text': 'Beijing Tianxing Company', data: { tags: ['Tag1', 'Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' }, 'children': [
                { 'id': 'b1', 'text': 'Beijing Tianxing A Company', data: { tags: ['Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' }, 'children': [
                    { 'id': 'b1-1', 'text': 'Beijing Tianxing A 1 Company', data: { tags: ['Tag1'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { 'id': 'b1-2', 'text': 'Beijing Tianxing A 2 Company', data: { tags: ['Tag2'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { 'id': 'b1-3', 'text': 'Beijing Tianxing A 3 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { 'id': 'b1-4', 'text': 'Beijing Tianxing A 4 Company', data: { tags: ['Tag1', 'Tag2'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { 'id': 'b1-5', 'text': 'Beijing Tianxing A 5 Company', data: { tags: ['Tag1', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { 'id': 'b1-6', 'text': 'Beijing Tianxing A 6 Company', data: { tags: ['Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } }
                ]
                },
                { 'id': 'b2', 'text': 'Beijing Tianxing B Company', data: { tags: ['Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' }, 'children': [
                    { 'id': 'b2-1', 'text': 'Beijing Tianxing B 33 Company', data: { tags: ['Tag1', 'Tag2'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { 'id': 'b2-2', 'text': 'Beijing Tianxing B 33 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } }
                ]
                }
            ]
            },
            { 'id': 'c', 'text': 'Chengdu Tianxing Company', data: { tags: ['Tag1', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' }, 'children': [
                { 'id': 'c1', 'text': 'Chengdu Tianxing 1 Company', data: { tags: ['Tag1',], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                { 'id': 'c2', 'text': 'Chengdu Tianxing 3 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                { 'id': 'c3', 'text': 'Chengdu Tianxing 3 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } }
            ]
            }
        ]
        }
    ];
    const graphInstance = graphRef.value!.getInstance();
    const graphJsonData = {
        rootId: 'a',
        nodes: [],
        lines: [
            // 你仍然可以通过常规方式添加关系
        ]
    };
    // 将树状数据展开为扁平数据，里面的节点会被收集到graphJsonData.nodes, graphJsonData.lines
    graphInstance.flatNodeData(rootNodeJson, null, graphJsonData.nodes, graphJsonData.lines);
    graphJsonData.lines.forEach(line => {
        line.fromJunctionPoint = 'bottom';
        line.toJunctionPoint = 'left';
    });
    console.log('graphJsonData:', graphJsonData);
    await graphInstance.addNodes(graphJsonData.nodes);
    await graphInstance.addLines(graphJsonData.lines);
    graphInstance.graphData.rootNode = graphInstance.getNodeById(graphJsonData.rootId);
    await graphInstance.doLayout();
    await graphInstance.playShowEffect();
};
onMounted(() => {
    setGraphData();
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

    .c-option-name{
        color: #666666;
        font-size: 14px;
        line-height: 40px;
        padding-left:10px;
        padding-right:10px;
    }
}

.my-card-node {
    background-color: #f6f8ff;
    color: #333333;
    border: #447fff solid 1px;
    border-radius: 5px;
    height: 60px;
    width: 250px;
    display: flex;
    overflow: hidden;
    .card-left {
        width: 6px;
        background-color: #447fff;
    }
    .card-right {
        flex-grow: 1;
        text-align: left;
        padding-left: 10px;
        .card-name {
            font-size: 15px;
            line-height: 22px;
        }
        .card-tags {
            .card-tag {
                display: inline-block;
                font-size: 10px;
                background-color: rgba(68, 127, 255, 0.3);
                color: #447fff;
                border-radius: 5px;
                margin-right:5px;
                line-height: 18px;
                padding-left: 8px;
                padding-right: 8px;
            }
        }
        .card-location {
            width: 220px;
            font-size: 12px;
            color: #888888;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

::v-deep(.relation-graph) {
    .rel-node-checked {
        box-shadow: 0 0 0 5px rgba(68, 127, 255, 0.3);
    }
    .rel-node {
    }
    .c-btn-open-close {
        z-index: 10;
    }
    .c-btn-open-close span{
        background-color: #447fff !important;
    }
    .c-expand-positon-right span{
        transform: translateX(-45px);
    }
}
</style>
```

## React 版本

### `layout-folder2.tsx`

```javascript
import React, { useEffect, useRef } from 'react';
import RelationGraph, {
  RGOptions,
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent, RGNodeSlotProps
} from 'relation-graph-react';
import './layout-folder2.scss';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);

  const graphOptions: RGOptions = {
    debug: false,
    layout: {
      layoutName: 'folder',
      from: 'left',
      min_per_width: 100,
      min_per_height: 80,
      max_per_height: 80,
    },
    defaultExpandHolderPosition: 'right',
    defaultNodeShape: 1,
    defaultLineShape: 41,
    defaultPolyLineRadius: 4,
    defaultBottomJuctionPoint_X: 28,
    defaultJunctionPoint: 'lr',
    defaultNodeBorderWidth: 0,
    defaultLineColor: '#cccccc',
    defaultNodeColor: '#333333',
    reLayoutWhenExpandedOrCollapsed: true,
  };

  useEffect(() => {
    const setGraphData = async () => {
      const rootNodeJson = [
        {
          id: 'a',
          text: 'Tian Technology Co., Ltd.',
          data: { tags: ['Tag1', 'Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' },
          children: [
            {
              id: 'b',
              text: 'Beijing Tianxing Company',
              data: { tags: ['Tag1', 'Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' },
              children: [
                {
                  id: 'b1',
                  text: 'Beijing Tianxing A Company',
                  data: { tags: ['Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' },
                  children: [
                    { id: 'b1-1', text: 'Beijing Tianxing A 1 Company', data: { tags: ['Tag1'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { id: 'b1-2', text: 'Beijing Tianxing A 2 Company', data: { tags: ['Tag2'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { id: 'b1-3', text: 'Beijing Tianxing A 3 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { id: 'b1-4', text: 'Beijing Tianxing A 4 Company', data: { tags: ['Tag1', 'Tag2'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { id: 'b1-5', text: 'Beijing Tianxing A 5 Company', data: { tags: ['Tag1', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { id: 'b1-6', text: 'Beijing Tianxing A 6 Company', data: { tags: ['Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                  ],
                },
                {
                  id: 'b2',
                  text: 'Beijing Tianxing B Company',
                  data: { tags: ['Tag2', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' },
                  children: [
                    { id: 'b2-1', text: 'Beijing Tianxing B 33 Company', data: { tags: ['Tag1', 'Tag2'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                    { id: 'b2-2', text: 'Beijing Tianxing B 33 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                  ],
                },
              ],
            },
            {
              id: 'c',
              text: 'Chengdu Tianxing Company',
              data: { tags: ['Tag1', 'Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' },
              children: [
                { id: 'c1', text: 'Chengdu Tianxing 1 Company', data: { tags: ['Tag1'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                { id: 'c2', text: 'Chengdu Tianxing 3 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
                { id: 'c3', text: 'Chengdu Tianxing 3 Company', data: { tags: ['Tag3'], location: 'No. 99, Guixi Street, Chengdu City, Sichuan Province.' } },
              ],
            },
          ],
        },
      ];

      const graphInstance = graphRef.current!.getInstance();
      const graphJsonData: RGJsonData = {
        rootId: 'a',
        nodes: [],
        lines: [],
      };

      graphInstance.flatNodeData(rootNodeJson, null, graphJsonData.nodes, graphJsonData.lines);

      graphJsonData.lines.forEach((line) => {
        line.fromJunctionPoint = 'bottom';
        line.toJunctionPoint = 'left';
      });

      console.log('graphJsonData:', graphJsonData);

      await graphInstance.addNodes(graphJsonData.nodes);
      await graphInstance.addLines(graphJsonData.lines);
      graphInstance.graphData.rootNode = graphInstance?.getNodeById(graphJsonData.rootId!);
      await graphInstance?.doLayout();
      await graphInstance?.playShowEffect();
    };

    setGraphData();
  }, []);

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    // handle node click event

  };

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    // handle line click event

  };

  const MyNodeSlot:React.FC<RGNodeSlotProps> = ({node}) => {
    return (
      <div className="my-card-node" slot="node" slot-scope="{node}">
        <div className="card-left" />
        <div className="card-right">
          <div className="card-name">{node.text}</div>
          <div className="card-tags">
            {node.data?.tags.map((tag: string) => (
              <div key={tag} className="card-tag">
                {tag}
              </div>
            ))}
          </div>
          <div className="card-location">{node.data?.location}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ height: 'calc(100vh - 60px)' }}>
      <div className="absolute left-20 top-20 z-20 w-96 rounded-lg  p-4 bg-white border-solid border-2 border-black shadow-lg">
        <div className="c-option-name" style={{ lineHeight: '25px', padding: '0px', width: '300px' }}>
          This example demonstrates passing hierarchical data to the graph using the setJsonData method. The graph will automatically recognize the hierarchy (by the children property) and flatten it for display. This approach is only for displaying tree-like graphs.
          <br />
          Using a tree data structure has obvious limitations: you can only set global default line styles, cannot set specific properties for individual lines, and cannot define line styles precisely.
        </div>
      </div>
      <RelationGraph ref={graphRef} options={graphOptions} onNodeClick={onNodeClick} onLineClick={onLineClick} nodeSlot={MyNodeSlot}>
      </RelationGraph>
    </div>
  );
};

export default MyComponent;
```

### `layout-folder2.scss`

```scss
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

.my-card-node {
  background-color: #f6f8ff;
  color: #333333;
  border: #447fff solid 1px;
  border-radius: 5px;
  height: 60px;
  width: 250px;
  display: flex;
  overflow: hidden;
  .card-left {
    width: 6px;
    background-color: #447fff;
  }
  .card-right {
    flex-grow: 1;
    text-align: left;
    padding-left: 10px;
    .card-name {
      font-size: 15px;
      line-height: 22px;
    }
    .card-tags {
      .card-tag {
        display: inline-block;
        font-size: 10px;
        background-color: rgba(68, 127, 255, 0.3);
        color: #447fff;
        border-radius: 5px;
        margin-right: 5px;
        line-height: 18px;
        padding-left: 8px;
        padding-right: 8px;
      }
    }
    .card-location {
      width: 220px;
      font-size: 12px;
      color: #888888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.relation-graph {
  .rel-node-checked {
    box-shadow: 0 0 0 5px rgba(68, 127, 255, 0.3);
  }
  .rel-node {
  }
  .c-btn-open-close {
    z-index: 10;
  }
  .c-btn-open-close span {
    background-color: #447fff !important;
  }
  .c-expand-positon-right span {
    transform: translateX(-45px);
  }
}
```
