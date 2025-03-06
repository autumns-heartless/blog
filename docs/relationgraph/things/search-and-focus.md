# 搜索节点 & 定位节点

## Vue2 版本

### `search-and-focus.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
          <div class="my-node-style" :style="{'background-image': 'url(' + node.data.icon + ')'}">
          </div>
          <div class="c-node-name" :style="{color:node.color}">{{node.text}}</div>
        </template>
        <template #graph-plug>
          <div style="position: absolute;left:30px;top:30px;z-index: 600;padding:10px;border-radius: 5px;background-color: #67C23A;color: #ffffff;font-size: 12px;">
            Search Node:
            <el-select
                size="mini"
                v-model="searchText"
                filterable
                remote
                reserve-keyword
                placeholder="Search by node text or ID"
                @change="changeSelected"
            >
              <el-option
                  v-for="item in graphAllNodes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
const graphOptions = {
  debug: false,
  defaultNodeBorderWidth: 0,
  defaultNodeColor: 'rgba(238, 178, 94, 1)',
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineShape: 1,
  layout: {
    label: '自动布局',
    layoutName: 'force',
    layoutClassName: 'seeks-layout-force',
    maxLayoutTimes: 100
  },
  defaultJunctionPoint: 'border'

  // 这里可以参考"Graph 图谱"中的参数进行设置
};
export default {
  name: 'RelationGraphDemo',
  components: { }, // 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要在这里注册：components: { RelationGraph }
  data() {
    return {
      searchText: '',
      graphAllNodes: [],
      graphOptions
    };
  },
  created() {
  },
  mounted() {
    this.setGraphData();
  },
  methods: {
    async setGraphData() {
      const __graph_json_data = {
        'rootId': 'N13',
        'nodes': [
          { 'id': 'N1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014&n=侯亮平'}},
          { 'id': 'N2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062&n=李达康'}},
          { 'id': 'N3', 'text': '祁同伟', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092&n=祁同伟'}},
          { 'id': 'N4', 'text': '陈岩石', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021&n=陈岩石'}},
          { 'id': 'N5', 'text': '陆亦可', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060&n=陆亦可'}},
          { 'id': 'N6', 'text': '高育良', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1&n=高育良'}},
          { 'id': 'N7', 'text': '沙瑞金', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1&n=沙瑞金'}},
          { 'id': 'N8', 'text': '高小琴', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011&n=高小琴'}},
          { 'id': 'N9', 'text': '高小凤', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012&n=高小凤'}},
          { 'id': 'N10', 'text': '赵东来', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013&n=赵东来'}},
          { 'id': 'N11', 'text': '程度', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3&n=程度'}},
          { 'id': 'N12', 'text': '吴惠芬', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081&n=吴惠芬'}},
          { 'id': 'N13', 'text': '赵瑞龙', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080&n=赵瑞龙'}},
          { 'id': 'N14', 'text': '赵立春', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=赵立春'}},
          { 'id': 'N15', 'text': '陈海', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0&n=陈海'}},
          { 'id': 'N16', 'text': '梁璐', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2&n=梁璐'}},
          { 'id': 'N17', 'text': '刘新建', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082&n=刘新建'}},
          { 'id': 'N18', 'text': '欧阳菁', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091&n=欧阳菁'}},
          { 'id': 'N19', 'text': '吴心怡', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=吴心怡'}},
          { 'id': 'N20', 'text': '蔡成功', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1&n=蔡成功'}},
          { 'id': 'N21', 'text': '丁义珍', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093&n=丁义珍'}}
        ],
        'lines': [
          { 'from': 'N6', 'to': 'N1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N6', 'to': 'N3', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N14', 'to': 'N6', 'text': '前领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N14', 'to': 'N13', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N14', 'to': 'N17', 'text': '前部队下属', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N2', 'to': 'N14', 'text': '前任秘书', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N3', 'to': 'N8', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N4', 'to': 'N15', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N5', 'to': 'N15', 'text': '属下', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N7', 'to': 'N4', 'text': '故人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N3', 'to': 'N15', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N3', 'to': 'N1', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N1', 'to': 'N15', 'text': '同学，生死朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N6', 'to': 'N12', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N15', 'to': 'N10', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N8', 'to': 'N9', 'text': '双胞胎', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N10', 'to': 'N5', 'text': '爱慕', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N3', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N6', 'to': 'N9', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N13', 'to': 'N3', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N2', 'to': 'N10', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N13', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N7', 'to': 'N2', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N7', 'to': 'N6', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N3', 'to': 'N16', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N12', 'to': 'N16', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N2', 'to': 'N18', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N13', 'to': 'N17', 'text': '洗钱工具', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N13', 'to': 'N8', 'text': '勾结，腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N13', 'to': 'N9', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N19', 'to': 'N5', 'text': '母女', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N19', 'to': 'N12', 'text': '姐妹', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N20', 'to': 'N1', 'text': '发小', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N20', 'to': 'N18', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d'},
          { 'from': 'N18', 'to': 'N17', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d'},
          { 'from': 'N17', 'to': 'N13', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d'},
          { 'from': 'N2', 'to': 'N21', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N8', 'to': 'N21', 'text': '策划出逃', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N3', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
          { 'from': 'N13', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }
        ]
      };
      const graphInstance =  this.$refs.graphRef.getInstance();
      await graphInstance.setJsonData(__graph_json_data);
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
      this.graphAllNodes = graphInstance.getNodes().map(node => {
        return { value: node.id, label: node.id + ',' + node.text };
      });
    },
    async changeSelected(itemId) {
      console.log('changeSelected:', itemId);
      const graphInstance = this.$refs.graphRef.getInstance();
      // const node = graphInstance.getNodeById(itemId);
      await graphInstance.focusNodeById(itemId)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::v-deep .rel-node-shape-0{
  padding:3px !important;
}
.my-node-style{
  background-position: center center;
  background-size: 100%;
  height:100%;
  width:100%;
  border-radius: 40px;
  overflow: visible;
}
.c-node-name{
  width:80px;
  text-align:center;
  color: #2E74B5;
  margin-top: 10px;
}
</style>
```

## Vue3 版本

### `search-and-focus.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
          <div class="my-node-style" :style="{'background-image': 'url(' + node.data.icon + ')'}" />
          <div class="c-node-name" :style="{color:node.color}">{{ node.id }}/{{ node.text }}</div>
        </template>
        <template #graph-plug>
          <div style="position: absolute;left:30px;top:30px;z-index: 600;padding:10px;border-radius: 5px;background-color: #67C23A;color: #ffffff;font-size: 12px;">
            Search Node:
            <el-select

              v-model="searchText"
              size="small"
              filterable

              remote

              reserve-keyword

              placeholder="Search by node text or ID"
              @change="changeSelected"
            >
              <el-option

                v-for="item in graphAllNodes"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
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

const graphOptions: RGOptions = {
    debug: false,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'rgba(238, 178, 94, 1)',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layouts: [
        {
            label: '自动布局',
            layoutName: 'force',
            layoutClassName: 'seeks-layout-force',
            maxLayoutTimes: 100

        }
    ],
    defaultJunctionPoint: 'border'
};

const graphRef = ref<RelationGraphComponent>();
const searchText = ref('');
const graphAllNodes = ref([]);
const graphOptionsRef = ref(graphOptions);

onMounted(() => {
    setGraphData();
});

const setGraphData = async () => {
    const __graph_json_data: RGJsonData = {
        'rootId': 'N13',
        'nodes': [
            { 'id': 'N1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014&n=侯亮平'}},
            { 'id': 'N2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062&n=李达康'}},
            { 'id': 'N3', 'text': '祁同伟', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092&n=祁同伟'}},
            { 'id': 'N4', 'text': '陈岩石', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021&n=陈岩石'}},
            { 'id': 'N5', 'text': '陆亦可', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060&n=陆亦可'}},
            { 'id': 'N6', 'text': '高育良', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1&n=高育良'}},
            { 'id': 'N7', 'text': '沙瑞金', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1&n=沙瑞金'}},
            { 'id': 'N8', 'text': '高小琴', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011&n=高小琴'}},
            { 'id': 'N9', 'text': '高小凤', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012&n=高小凤'}},
            { 'id': 'N10', 'text': '赵东来', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013&n=赵东来'}},
            { 'id': 'N11', 'text': '程度', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3&n=程度'}},
            { 'id': 'N12', 'text': '吴惠芬', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081&n=吴惠芬'}},
            { 'id': 'N13', 'text': '赵瑞龙', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080&n=赵瑞龙'}},
            { 'id': 'N14', 'text': '赵立春', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=赵立春'}},
            { 'id': 'N15', 'text': '陈海', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0&n=陈海'}},
            { 'id': 'N16', 'text': '梁璐', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2&n=梁璐'}},
            { 'id': 'N17', 'text': '刘新建', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082&n=刘新建'}},
            { 'id': 'N18', 'text': '欧阳菁', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091&n=欧阳菁'}},
            { 'id': 'N19', 'text': '吴心怡', 'color': '#ec6941', 'borderColor': '#ff875e', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=吴心怡'}},
            { 'id': 'N20', 'text': '蔡成功', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1&n=蔡成功'}},
            { 'id': 'N21', 'text': '丁义珍', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', data: { icon: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093&n=丁义珍'}}
        ],
        'lines': [
            { 'from': 'N6', 'to': 'N1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N6', 'to': 'N3', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N14', 'to': 'N6', 'text': '前领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N14', 'to': 'N13', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N14', 'to': 'N17', 'text': '前部队下属', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N2', 'to': 'N14', 'text': '前任秘书', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N3', 'to': 'N8', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N4', 'to': 'N15', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N5', 'to': 'N15', 'text': '属下', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N7', 'to': 'N4', 'text': '故人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N3', 'to': 'N15', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N3', 'to': 'N1', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N1', 'to': 'N15', 'text': '同学，生死朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N6', 'to': 'N12', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N15', 'to': 'N10', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N8', 'to': 'N9', 'text': '双胞胎', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N10', 'to': 'N5', 'text': '爱慕', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N3', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N6', 'to': 'N9', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N13', 'to': 'N3', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N2', 'to': 'N10', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N13', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N7', 'to': 'N2', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N7', 'to': 'N6', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N3', 'to': 'N16', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N12', 'to': 'N16', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N2', 'to': 'N18', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N13', 'to': 'N17', 'text': '洗钱工具', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N13', 'to': 'N8', 'text': '勾结，腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N13', 'to': 'N9', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N19', 'to': 'N5', 'text': '母女', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N19', 'to': 'N12', 'text': '姐妹', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N20', 'to': 'N1', 'text': '发小', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N20', 'to': 'N18', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d'},
            { 'from': 'N18', 'to': 'N17', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d'},
            { 'from': 'N17', 'to': 'N13', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d'},
            { 'from': 'N2', 'to': 'N21', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N8', 'to': 'N21', 'text': '策划出逃', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N3', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5'},
            { 'from': 'N13', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }
        ]
    };
    const graphInstance =  graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
    graphAllNodes.value = graphInstance.getNodes().map(node => {
        return { value: node.id, label: node.id + '/' + node.text };
    });
};

const changeSelected = async (itemId: string) => {
    console.log('changeSelected:', itemId);
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.focusNodeById(itemId);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::v-deep(.relation-graph) {
    .rel-node-shape-0{
        padding:3px !important;
    }
}
.my-node-style{
  background-position: center center;
  background-size: 100%;
  height:100%;
  width:100%;
  border-radius: 40px;
  overflow: visible;
}
.c-node-name{
  width:80px;
  text-align:center;
  color: #2E74B5;
  margin-top: 10px;
}
</style>
```

## React 版本

### `search-and-focus.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph from 'relation-graph-react';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import './search-and-focus.scss';
import {MyCheckBox, MySelector} from "./RGDemoComponents/MyUIComponents";
import demoData from "./Demo4AdvDataFilterData.json";

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [searchText, setSearchText] = useState('');
  const [nodesForFilter, setNodesForFilter] = useState([]);
  const graphOptions: RGOptions = {
    debug: false,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'rgba(238, 178, 94, 1)',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layouts: [
      {
        label: '自动布局',
        layoutName: 'force',
        layoutClassName: 'seeks-layout-force',
        maxLayoutTimes: 100

      }
    ],
    defaultJunctionPoint: 'border'
  };



  const setGraphData = async () => {
    const __graph_json_data: RGJsonData = demoData;
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setJsonData(__graph_json_data);
    await graphInstance?.moveToCenter();
    await graphInstance?.zoomToFit();
  };

  const filterItems = async () => {
    const graphInstance = graphRef.current!.getInstance();
    const nodes = graphInstance.getNodes().filter(node => node.text.toLowerCase().includes(searchText.toLowerCase())).map(node => {
      return { value: node.id, text: node.text };
    });
    setNodesForFilter(nodes);
  };
  const changeSelected = async (itemId: string) => {
    console.log('changeSelected:', itemId);
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.focusNodeById(itemId);
    graphInstance.dataUpdated();
  };
  useEffect(() => {
    setGraphData();
  }, []);
  useEffect(() => {
    filterItems();
  }, [searchText]);
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <div className="w-96 rounded-lg absolute left-20 top-20 z-20 p-4 bg-white border-solid border-2 border-black shadow-lg">
          Search Node:
          <div className="py-2">
            <input defaultValue={searchText} className="border border-gray-500 bg-yellow-200 px-2 py-1 rounded-lg" onChange={(e) => {setSearchText(e.target.value)}} />
          </div>
          {nodesForFilter.length > 0 && <MyCheckBox
            data={nodesForFilter}
            currentValue={''}
            onChange={(newValue: string, label) => {
              changeSelected(newValue);
            }}
          />}
        </div>
        <RelationGraph ref={graphRef} options={graphOptions}>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `search-and-focus.scss`

```scss
.relation-graph {
  .rel-node-shape-0 {
    padding: 3px !important;
  }
}
.my-node-style {
  background-position: center center;
  background-size: 100%;
  height: 100%;
  width: 100%;
  border-radius: 40px;
  overflow: visible;
}
.c-node-name {
  width: 80px;
  text-align: center;
  color: #2e74b5;
  margin-top: 10px;
}
```

### `Demo4AdvDataFilterData.json`

```json
{
  "rootId": "N13",
  "nodes": [
    {
      "id": "N1",
      "text": "Liangping.Hou",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "male",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014&n=侯亮平"
      }
    },
    {
      "id": "N2",
      "text": "Dakang.Li",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "male",
        "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062&n=李达康"
      }
    },
    {
      "id": "N3",
      "text": "Tongwei.Qi",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092&n=祁同伟"
      }
    },
    {
      "id": "N4",
      "text": "Yanshi.Chen",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "male",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021&n=陈岩石"
      }
    },
    {
      "id": "N5",
      "text": "Yike.Lu",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "female",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060&n=陆亦可"
      }
    },
    {
      "id": "N6",
      "text": "Yuliang.Gao",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1&n=高育良"
      }
    },
    {
      "id": "N7",
      "text": "Ruijin.Sha",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "male",
        "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1&n=沙瑞金"
      }
    },
    {
      "id": "N8",
      "text": "Xiaoqin.Gao",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "female",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011&n=高小琴"
      }
    },
    {
      "id": "N9",
      "text": "Xiaofeng.Gao",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "female",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012&n=高小凤"
      }
    },
    {
      "id": "N10",
      "text": "Donglai.Zhao",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "male",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013&n=赵东来"
      }
    },
    {
      "id": "N11",
      "text": "Du.Cheng",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3&n=程度"
      }
    },
    {
      "id": "N12",
      "text": "Huifen.Wu",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "female",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081&n=吴惠芬"
      }
    },
    {
      "id": "N13",
      "text": "Ruilong.Zhao",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080&n=赵瑞龙"
      }
    },
    {
      "id": "N14",
      "text": "Lichun.Zhao",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=赵立春"
      }
    },
    {
      "id": "N15",
      "text": "Hai.Chen",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "male",
        "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0&n=陈海"
      }
    },
    {
      "id": "N16",
      "text": "Lu.Liang",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "female",
        "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2&n=梁璐"
      }
    },
    {
      "id": "N17",
      "text": "Jianxin.Liu",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082&n=刘新建"
      }
    },
    {
      "id": "N18",
      "text": "Jing.Ouyang",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "female",
        "icon": "https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091&n=欧阳菁"
      }
    },
    {
      "id": "N19",
      "text": "Xinyi.Wu",
      "color": "#ec6941",
      "borderColor": "#ff875e",
      "data": {
        "isGoodMan": "1",
        "sexType": "female",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C&n=吴心怡"
      }
    },
    {
      "id": "N20",
      "text": "Chenggong.Cai",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1&n=蔡成功"
      }
    },
    {
      "id": "N21",
      "text": "YiZhen.Ding",
      "color": "rgba(0, 206, 209, 1)",
      "borderColor": "#6cc0ff",
      "data": {
        "isGoodMan": "0",
        "sexType": "male",
        "icon": "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093&n=丁义珍"
      }
    }
  ],
  "lines": [
    {
      "from": "N6",
      "to": "N1",
      "text": "teacher-student",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "teacher-student"
      }
    },
    {
      "from": "N6",
      "to": "N3",
      "text": "teacher-student",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "teacher-student"
      }
    },
    {
      "from": "N14",
      "to": "N6",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N14",
      "to": "N13",
      "text": "relative",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "relative"
      }
    },
    {
      "from": "N14",
      "to": "N17",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N2",
      "to": "N14",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N3",
      "to": "N8",
      "text": "lover",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "lover"
      }
    },
    {
      "from": "N4",
      "to": "N15",
      "text": "relative",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "relative"
      }
    },
    {
      "from": "N5",
      "to": "N15",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N7",
      "to": "N4",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N3",
      "to": "N15",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N3",
      "to": "N1",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N1",
      "to": "N15",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N1",
      "to": "N15",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N6",
      "to": "N12",
      "text": "couple",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "couple"
      }
    },
    {
      "from": "N15",
      "to": "N10",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N8",
      "to": "N9",
      "text": "relative",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "relative"
      }
    },
    {
      "from": "N10",
      "to": "N5",
      "text": "lover",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "lover"
      }
    },
    {
      "from": "N3",
      "to": "N11",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N6",
      "to": "N9",
      "text": "lover",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "lover"
      }
    },
    {
      "from": "N13",
      "to": "N3",
      "text": "collusion",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "collusion"
      }
    },
    {
      "from": "N2",
      "to": "N10",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N13",
      "to": "N11",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N7",
      "to": "N2",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N7",
      "to": "N6",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N3",
      "to": "N16",
      "text": "couple",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "couple"
      }
    },
    {
      "from": "N12",
      "to": "N16",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N2",
      "to": "N18",
      "text": "couple",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "couple"
      }
    },
    {
      "from": "N13",
      "to": "N17",
      "text": "corruption",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "corruption"
      }
    },
    {
      "from": "N13",
      "to": "N8",
      "text": "collusion",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "collusion"
      }
    },
    {
      "from": "N13",
      "to": "N8",
      "text": "corruption",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "corruption"
      }
    },
    {
      "from": "N13",
      "to": "N9",
      "text": "corruption",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "corruption"
      }
    },
    {
      "from": "N19",
      "to": "N5",
      "text": "relative",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "relative"
      }
    },
    {
      "from": "N19",
      "to": "N12",
      "text": "relative",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "relative"
      }
    },
    {
      "from": "N20",
      "to": "N1",
      "text": "friend",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "friend"
      }
    },
    {
      "from": "N20",
      "to": "N18",
      "text": "report",
      "color": "#ed724d",
      "fontColor": "#ed724d",
      "data": {
        "type": "report"
      }
    },
    {
      "from": "N18",
      "to": "N17",
      "text": "report",
      "color": "#ed724d",
      "fontColor": "#ed724d",
      "data": {
        "type": "report"
      }
    },
    {
      "from": "N17",
      "to": "N13",
      "text": "report",
      "color": "#ed724d",
      "fontColor": "#ed724d",
      "data": {
        "type": "report"
      }
    },
    {
      "from": "N2",
      "to": "N21",
      "text": "superior-subordinate",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "superior-subordinate"
      }
    },
    {
      "from": "N8",
      "to": "N21",
      "text": "collusion",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "collusion"
      }
    },
    {
      "from": "N3",
      "to": "N21",
      "text": "collusion",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "collusion"
      }
    },
    {
      "from": "N13",
      "to": "N21",
      "text": "collusion",
      "color": "#d2c0a5",
      "fontColor": "#d2c0a5",
      "data": {
        "type": "collusion"
      }
    }
  ]
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
