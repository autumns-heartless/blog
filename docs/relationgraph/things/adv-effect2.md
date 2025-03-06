# 节点/连线点击效果 2

## Vue2 版本

### `adv-effect2.vue`

```javascript
<template>
  <div>
    <div style="margin-top:0px;width: calc(100% - 10px);height:calc(100vh - 100px);">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick">
        <template #node="{node}">
          <div class="my-node-style" :style="{'background-image': 'url(' + node.data.icon + ')'}">
          </div>
          <div class="c-node-name" :style="{color:node.color}">{{node.text}}</div>
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
  layout:
    {
      label: '自动布局',
      layoutName: 'force'
    },
  defaultJunctionPoint: 'border'
  // 这里可以参考"Graph 图谱"中的参数进行设置
};
export default {
  name: 'RelationGraphDemo',
  components: { },
  data() {
    return {
      g_loading: true,
      demoname: '---',
      checked_sex: '',
      checked_isgoodman: '',
      rel_checkList: ['师生', '上下级', '亲戚', '情人', '朋友', '夫妻', '勾结', '腐化', '举报'],
      all_rel_type: ['师生', '上下级', '亲戚', '情人', '朋友', '夫妻', '勾结', '腐化', '举报'],
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
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        setTimeout(() => {
          graphInstance.stopAutoLayout();
        }, 1000);
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
      const allLinks = this.$refs.graphRef.getLinks();
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          if (line.data.orignColor) {
            line.color = line.data.orignColor;
          }
          if (line.data.orignFontColor) {
            line.fontColor = line.data.orignColor;
          }
          if (line.data.orignLineWidth) {
            line.lineWidth = line.data.orignLineWidth;
          }
        });
      });
      // 让与{nodeObject}相关的所有连线高亮
      allLinks.filter(link => (link.fromNode === nodeObject || link.toNode === nodeObject)).forEach(link => {
        link.relations.forEach(line => {
          console.log('line:', line);
          line.data.orignColor = line.color;
          line.data.orignFontColor = line.fontColor || line.color;
          line.data.orignLineWidth = line.lineWidth || 1;
          line.color = '#ff0000';
          line.fontColor = '#ff0000';
          line.lineWidth = 3;
        });
      });
      // 有时候更改一些属性后，并不能马上同步到视图，这需要以下方法让视图强制根据数据同步到最新
      this.$refs.graphRef.getInstance().dataUpdated();
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
      this.$notify({
        title: '点击连线：',
        type: 'success',
        message: '点击了线:' + linkObject.fromNode.text + ' to ' + linkObject.toNode.text
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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

### `adv-effect2.vue`

```javascript
<template>
  <div>
    <div style="margin-top:0px;width: calc(100% - 10px);height:calc(100vh - 100px);">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick">
        <template #node="{node}">
          <div class="my-node-style" :style="{'background-image': 'url(' + node.data.icon + ')'}" />
          <div class="c-node-name" :style="{color:node.color}">{{ node.text }}</div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-vue3';

const graphOptions: RGOptions = {
    debug: false,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'rgba(238, 178, 94, 1)',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    'layouts': [
        {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
        }
    ],
    defaultJunctionPoint: 'border'
};

const graphRef = ref<RelationGraphComponent>();
const g_loading = ref(true);

onMounted(() => {
    setGraphData();
});

const setGraphData = async() => {
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
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        await graphInstance.setJsonData(__graph_json_data);
        setTimeout(() => {
            graphInstance.stopAutoLayout();
        }, 1000);
    }
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
    const allLinks = graphRef.value?.getLinks() || [];
    allLinks.forEach(link => {
        link.relations.forEach(line => {
            if (line.data.orignColor) {
                line.color = line.data.orignColor;
            }
            if (line.data.orignFontColor) {
                line.fontColor = line.data.orignColor;
            }
            if (line.data.orignLineWidth) {
                line.lineWidth = line.data.orignLineWidth;
            }
        });
    });
    allLinks.filter(link => (link.fromNode === nodeObject || link.toNode === nodeObject)).forEach(link => {
        link.relations.forEach(line => {
            console.log('line:', line);
            line.data.orignColor = line.color;
            line.data.orignFontColor = line.fontColor || line.color;
            line.data.orignLineWidth = line.lineWidth || 1;
            line.color = '#ff0000';
            line.fontColor = '#ff0000';
            line.lineWidth = 3;
        });
    });
    graphRef.value?.getInstance()?.dataUpdated();
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
    this.$notify({
        title: '点击连线：',
        type: 'success',
        message: '点击了线:' + linkObject.fromNode.text + ' to ' + linkObject.toNode.text

    });
};
</script>

<style lang="scss" scoped>
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

### `adv-effect2.tsx`

```javascript
import React, { useEffect, useRef } from 'react'
import RelationGraph, { RGNodeSlotProps } from 'relation-graph-react'
import type {
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGOptions,
  RelationGraphComponent,
} from 'relation-graph-react'
import demoData from './Demo4AdvDataFilterData.json'
import './adv-effect2.scss'

const MyComponent = () => {
  const graphRef = (useRef < RelationGraphComponent) | (null > null)

  useEffect(() => {
    setGraphData()
  }, [])

  const setGraphData = async () => {
    const __graph_json_data: RGJsonData = demoData
    const graphInstance = graphRef.current?.getInstance()
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data)
      setTimeout(() => {
        graphInstance.stopAutoLayout()
      }, 1000)
    }
  }

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject)
    const allLinks = graphRef.current?.getLinks() || []
    allLinks.forEach((link) => {
      link.relations.forEach((line) => {
        if (line.data.orignColor) {
          line.color = line.data.orignColor
        }
        if (line.data.orignFontColor) {
          line.fontColor = line.data.orignColor
        }
        if (line.data.orignLineWidth) {
          line.lineWidth = line.data.orignLineWidth
        }
      })
    })
    allLinks
      .filter((link) => link.fromNode === nodeObject || link.toNode === nodeObject)
      .forEach((link) => {
        link.relations.forEach((line) => {
          console.log('line:', line)
          line.data.orignColor = line.color
          line.data.orignFontColor = line.fontColor || line.color
          line.data.orignLineWidth = line.lineWidth || 1
          line.color = '#ff0000'
          line.fontColor = '#ff0000'
          line.lineWidth = 3
        })
      })
    graphRef.current?.getInstance()?.dataUpdated()
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject)
    // this.$notify({
    //     title: '点击连线：',
    //     type: 'success',
    //     message: '点击了线:' + linkObject.fromNode.text + ' to ' + linkObject.toNode.text

    // });
  }
  const graphOptions: RGOptions = {
    debug: false,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: 'rgba(238, 178, 94, 1)',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineShape: 1,
    layout: {
      layoutName: 'force',
    },
    defaultJunctionPoint: 'border',
  }
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          nodeSlot={NodeSlot}
        ></RelationGraph>
      </div>
    </div>
  )
}

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  return (
    <div className="h-full">
      <div className="my-node-style" style={{ backgroundImage: `url(${node.data?.icon})` }} />
      <div className="c-node-name" style={{ color: node.color }}>
        {node.text}
      </div>
    </div>
  )
}

export default MyComponent
```

### `adv-effect2.scss`

```scss
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
