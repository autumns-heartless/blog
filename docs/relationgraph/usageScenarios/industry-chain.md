# 产业链图谱

## Vue2 版本

### `industry-chain.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #node="{node}">
          <div v-if="node.lot && node.lot.level === 0" class="my-industy-node my-industy-node-level-0"><!-- root node -->
            <div class="my-card-header">产业链名称</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
          <div v-else-if="node.lot && node.lot.level === 1" class="my-industy-node my-industy-node-level-1"><!-- level 1 nodes -->
            <div class="my-card-header">产业环节</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
          <div v-else-if="node.lot && node.lot.level === 2" class="my-industy-node my-industy-node-level-2"><!-- level 2 nodes -->
            <div class="my-card-header">细分环节</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
          <div v-else class="my-industy-node my-industy-node-level-3">
            <div class="my-card-header">产品类型</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        backgrounImageNoRepeat: true,
        moveToCenterWhenRefresh: true,
        zoomToFitWhenRefresh: true,
        useAnimationWhenRefresh: false,
        "useAnimationWhenExpanded": true,
        reLayoutWhenExpandedOrCollapsed: true,
        "defaultExpandHolderPosition": "bottom",
        defaultNodeShape: 1,
        defaultNodeBorderWidth: 0,
        defaultLineShape: 2,
        defaultJunctionPoint: 'tb',
        lineUseTextPath: true,
        layout:
          {
            layoutName: 'tree',
            from: 'top',
            min_per_width: 160,
            levelDistance: '250,250,250,250'
          }
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    async showGraph() {
      const __graph_json_data = {"rootId":"0","nodes":[{"id":"0","text":"半导体"},{"id":"1","text":"封测"},{"id":"2","text":"传统封装"},{"id":"3","text":"COG（玻璃覆晶封装）"},{"id":"5","text":"TO(同轴封装）"},{"id":"8","text":"BGA（焊球阵列封装）"},{"id":"10","text":"QFN（方型扁平无引脚封装）"},{"id":"12","text":"其他传统封装"},{"id":"30","text":"测试"},{"id":"31","text":"成品测试"},{"id":"44","text":"晶圆测试"},{"id":"49","text":"其他专业测试"},{"id":"51","text":"先进封装"},{"id":"52","text":"MEMS（微机械系统封装）"},{"id":"54","text":"WLCSP（晶圆级封装）"},{"id":"56","text":"TSV（硅通孔技术）"},{"id":"58","text":"FOWLP（扇出晶圆级封装）"},{"id":"60","text":"BUMP（凸点封装技术）"},{"id":"70","text":"原材料"},{"id":"71","text":"其他原材料"},{"id":"72","text":"蓝宝石晶体"},{"id":"74","text":"半导体封测用电镀液添加剂"},{"id":"75","text":"探针卡"},{"id":"77","text":"铝电解电容器用电极箔"},{"id":"78","text":"碳素材料、新型高分子复合材料"},{"id":"95","text":"晶圆制造材料"},{"id":"96","text":"光刻材料"},{"id":"101","text":"化学机械研磨材料"},{"id":"105","text":"电子气体"},{"id":"116","text":"二、三代半导体"},{"id":"149","text":"沉积材料"},{"id":"178","text":"封装材料"},{"id":"179","text":"陶瓷基板"},{"id":"185","text":"引线框"},{"id":"197","text":"键合线/丝"},{"id":"217","text":"封装基板"},{"id":"252","text":"芯片黏结材料"},{"id":"268","text":"设计"},{"id":"269","text":"模拟电路"},{"id":"270","text":"射频前端和接收器"},{"id":"272","text":"模拟/混合信号"},{"id":"273","text":"驱动芯片"},{"id":"309","text":"数据转换"},{"id":"325","text":"高性能模拟芯片"},{"id":"465","text":"分立器件"},{"id":"466","text":"IGBT"},{"id":"467","text":"功率器件"},{"id":"470","text":"二极管/晶体管"},{"id":"502","text":"MOSFET"},{"id":"518","text":"FRD"},{"id":"552","text":"其他芯片"},{"id":"553","text":"时钟芯片"},{"id":"555","text":"生物芯片"},{"id":"556","text":"25G和56G高速IO连接器"},{"id":"557","text":"航空航天军用特殊芯片"},{"id":"558","text":"安全芯片"},{"id":"560","text":"传感器"},{"id":"561","text":"气体传感器"},{"id":"563","text":"光电传感器"},{"id":"574","text":"温度传感器"},{"id":"580","text":"光学传感器"},{"id":"582","text":"湿度传感器"},{"id":"669","text":"光电子"},{"id":"670","text":"LED/LD"},{"id":"681","text":"光芯片"},{"id":"1167","text":"制造"},{"id":"1168","text":"生产模式"},{"id":"1169","text":"Foundry"},{"id":"1200","text":"IDM"},{"id":"1218","text":"FOUNDRY"},{"id":"1238","text":"设备"},{"id":"1239","text":"前道测试设备"},{"id":"1240","text":"量测类"},{"id":"1245","text":"缺陷检测类"},{"id":"1253","text":"其他设备"},{"id":"1254","text":"其他检测设备"},{"id":"1259","text":"工业机器人"},{"id":"1260","text":"圆片焊接系统"},{"id":"1262","text":"集成电路装备-气体纯化器"},{"id":"1263","text":"固晶机"},{"id":"1269","text":"前道工艺设备"},{"id":"1270","text":"离子注入设备"},{"id":"1272","text":"去胶设备"},{"id":"1274","text":"光刻"},{"id":"1279","text":"单晶炉"},{"id":"1280","text":"电镀设备"},{"id":"1302","text":"后道检测设备"},{"id":"1303","text":"测试机"},{"id":"1316","text":"探针台"},{"id":"1319","text":"分选机"},{"id":"1324","text":"后道封装设备"},{"id":"1325","text":"晶圆对准/键合设备"},{"id":"1328","text":"划片机"},{"id":"1335","text":"其他封装设备"},{"id":"1337","text":"贴片机"},{"id":"1346","text":"切筋成型机"}],"lines":[{"text":"","from":"0","to":"1"},{"text":"","from":"1","to":"2"},{"text":"","from":"2","to":"3"},{"text":"","from":"2","to":"5"},{"text":"","from":"2","to":"8"},{"text":"","from":"2","to":"10"},{"text":"","from":"2","to":"12"},{"text":"","from":"1","to":"30"},{"text":"","from":"30","to":"31"},{"text":"","from":"30","to":"44"},{"text":"","from":"30","to":"49"},{"text":"","from":"1","to":"51"},{"text":"","from":"51","to":"52"},{"text":"","from":"51","to":"54"},{"text":"","from":"51","to":"56"},{"text":"","from":"51","to":"58"},{"text":"","from":"51","to":"60"},{"text":"","from":"0","to":"70"},{"text":"","from":"70","to":"71"},{"text":"","from":"71","to":"72"},{"text":"","from":"71","to":"74"},{"text":"","from":"71","to":"75"},{"text":"","from":"71","to":"77"},{"text":"","from":"71","to":"78"},{"text":"","from":"70","to":"95"},{"text":"","from":"95","to":"96"},{"text":"","from":"95","to":"101"},{"text":"","from":"95","to":"105"},{"text":"","from":"95","to":"116"},{"text":"","from":"95","to":"149"},{"text":"","from":"70","to":"178"},{"text":"","from":"178","to":"179"},{"text":"","from":"178","to":"185"},{"text":"","from":"178","to":"197"},{"text":"","from":"178","to":"217"},{"text":"","from":"178","to":"252"},{"text":"","from":"0","to":"268"},{"text":"","from":"268","to":"269"},{"text":"","from":"269","to":"270"},{"text":"","from":"269","to":"272"},{"text":"","from":"269","to":"273"},{"text":"","from":"269","to":"309"},{"text":"","from":"269","to":"325"},{"text":"","from":"268","to":"465"},{"text":"","from":"465","to":"466"},{"text":"","from":"465","to":"467"},{"text":"","from":"465","to":"470"},{"text":"","from":"465","to":"502"},{"text":"","from":"465","to":"518"},{"text":"","from":"268","to":"552"},{"text":"","from":"552","to":"553"},{"text":"","from":"552","to":"555"},{"text":"","from":"552","to":"556"},{"text":"","from":"552","to":"557"},{"text":"","from":"552","to":"558"},{"text":"","from":"268","to":"560"},{"text":"","from":"560","to":"561"},{"text":"","from":"560","to":"563"},{"text":"","from":"560","to":"574"},{"text":"","from":"560","to":"580"},{"text":"","from":"560","to":"582"},{"text":"","from":"268","to":"669"},{"text":"","from":"669","to":"670"},{"text":"","from":"669","to":"681"},{"text":"","from":"0","to":"1167"},{"text":"","from":"1167","to":"1168"},{"text":"","from":"1168","to":"1169"},{"text":"","from":"1168","to":"1200"},{"text":"","from":"1168","to":"1218"},{"text":"","from":"0","to":"1238"},{"text":"","from":"1238","to":"1239"},{"text":"","from":"1239","to":"1240"},{"text":"","from":"1239","to":"1245"},{"text":"","from":"1238","to":"1253"},{"text":"","from":"1253","to":"1254"},{"text":"","from":"1253","to":"1259"},{"text":"","from":"1253","to":"1260"},{"text":"","from":"1253","to":"1262"},{"text":"","from":"1253","to":"1263"},{"text":"","from":"1238","to":"1269"},{"text":"","from":"1269","to":"1270"},{"text":"","from":"1269","to":"1272"},{"text":"","from":"1269","to":"1274"},{"text":"","from":"1269","to":"1279"},{"text":"","from":"1269","to":"1280"},{"text":"","from":"1238","to":"1302"},{"text":"","from":"1302","to":"1303"},{"text":"","from":"1302","to":"1316"},{"text":"","from":"1302","to":"1319"},{"text":"","from":"1238","to":"1324"},{"text":"","from":"1324","to":"1325"},{"text":"","from":"1324","to":"1328"},{"text":"","from":"1324","to":"1335"},{"text":"","from":"1324","to":"1337"},{"text":"","from":"1324","to":"1346"}]};
      const graphComponentRef = this.$refs.graphRef;
      const graphInstance = graphComponentRef.getInstance();
      graphInstance.loading();
      await graphInstance.setJsonData(__graph_json_data);
      await graphInstance.doLayout();
      await this.openByLevel(1);
      await graphInstance.zoomToFit();
      graphInstance.clearLoading();
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    async openByLevel(level) {
      const graphInstance = this.$refs.graphRef.getInstance();
      // 重置数据
      graphInstance.getNodes().forEach(node => {
        node.expanded = true;
        node.alignItems = 'top';
      });
      // 重置数据
      graphInstance.getNodes().forEach(node => {
        node.className = 'my-industy-node-level-' + Math.abs(node.lot.level);
      });
      graphInstance.getNodes().forEach(node => {
        // 判断节点的级别（根节点为0）
        if (Math.abs(node.lot.level) >= level) { // 双向树结构的上半部分内容的层级为-1,-2,-3，所以这里用绝对值
          console.log('collapseNode:', level, node.text, node.lot.level);
          // 收起节点：
          node.expanded = false;
        }
      })
      await graphInstance.doLayout();
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.my-industy-node{
  width: 140px;
  border-radius: 5px;
  background-color: #ffffff;
  overflow: hidden;
  .my-card-body{
    line-height: 30px;
  }
}
::v-deep .my-industy-node-level-0{
  .my-industy-node{
    width: 180px;
    border: #5b05f1 solid 1px;
    .my-card-header{
      background-color: #5b05f1;
    }
    .my-card-body{
      color: #5b05f1;
      font-size: 18px;
      line-height: 50px;
      height:50px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color:  #5b05f1 !important;
    }
  }
}
::v-deep .my-industy-node-level-1{
  .my-industy-node{
    border: #FD8B37 solid 1px;
    .my-card-header{
      background-color: #FD8B37;
    }
    .my-card-body{
      color: #FD8B37;
      font-size: 16px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color:  #FD8B37 !important;
    }
  }
}
::v-deep .my-industy-node-level-2{
  .my-industy-node{
    border: #9b9903 solid 1px;
    .my-card-header{
      background-color: #9b9903;
    }
    .my-card-body{
      color: #9b9903;
    }
  }
  .c-btn-open-close {
    & span {
      background-color:  #9b9903 !important;
    }
  }
}
::v-deep .my-industy-node-level-3{
  .my-industy-node{
    border: #247c02 solid 1px;
    .my-card-header{
      background-color: #247c02;
    }
    .my-card-body{
      color: #247c02;
      font-size: 12px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color:  #247c02 !important;
    }
  }
}
</style>
```

## Vue3 版本

### `industry-chain.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #node="{node}">
          <div v-if="node.lot && node.lot.level === 0" class="my-industy-node my-industy-node-level-0"><!-- root node -->
            <div class="my-card-header">Industry Chain Name</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
          <div v-else-if="node.lot && node.lot.level === 1" class="my-industy-node my-industy-node-level-1"><!-- level 1 nodes -->
            <div class="my-card-header">Industry Link</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
          <div v-else-if="node.lot && node.lot.level === 2" class="my-industy-node my-industy-node-level-2"><!-- level 2 nodes -->
            <div class="my-card-header">Subsection Link</div>
            <div class="my-card-body">{{node.text}}</div>
          </div>
          <div v-else class="my-industy-node my-industy-node-level-3">
            <div class="my-card-header">Product Type</div>
            <div class="my-card-body">{{node.text}}</div>
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
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenRefresh: false,
    useAnimationWhenExpanded: true,
    reLayoutWhenExpandedOrCollapsed: true,
    defaultExpandHolderPosition: 'bottom',
    defaultNodeShape: 1,
    defaultNodeBorderWidth: 0,
    defaultLineShape: 2,
    defaultJunctionPoint: 'tb',
    lineUseTextPath: true,
    layouts: [
        {
            layoutName: 'tree',
            from: 'top',
            min_per_width: 160,
            levelDistance: '250,250,250,250'
        }
    ]
};

const graphRef = ref<RelationGraphComponent>();

onMounted(() => {
    showGraph();
});

const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
        rootId: '0',
        nodes: [
            { id: '0', text: 'Semiconductor' },
            { id: '1', text: 'Final Test' },
            { id: '2', text: 'Traditional Packaging' },
            { id: '3', text: 'COG (Glass Encapsulation)' },
            { id: '5', text: 'TO (Coaxial Encapsulation)' },
            { id: '8', text: 'BGA (Ball Grid Array Encapsulation)' },
            { id: '10', text: 'QFN (Quad Flat No-Lead Encapsulation)' },
            { id: '12', text: 'Other Traditional Packaging' },
            { id: '30', text: 'Testing' },
            { id: '31', text: 'Finished Product Testing' },
            { id: '44', text: 'Wafer Testing' },
            { id: '49', text: 'Other Professional Testing' },
            { id: '51', text: 'Advanced Packaging' },
            { id: '52', text: 'MEMS (Micro-Electro-Mechanical Systems Packaging)' },
            { id: '54', text: 'WLCSP (Wafer-Level Chip-Scale Packaging)' },
            { id: '56', text: 'TSV (Through-Silicon Via Technology)' },
            { id: '58', text: 'FOWLP (Fan-Out Wafer-Level Packaging)' },
            { id: '60', text: 'BUMP (Bump Packaging Technology)' },
            { id: '70', text: 'Raw Materials' },
            { id: '71', text: 'Other Raw Materials' },
            { id: '72', text: 'Sapphire Crystal' },
            { id: '74', text: 'Plating Additives for Semiconductor Testing' },
            { id: '75', text: 'Probe Card' },
            { id: '77', text: 'Aluminum Electrolytic Capacitor Electrode Foil' },
            { id: '78', text: 'Carbon Materials, New Polymer Composite Materials' },
            { id: '95', text: 'Wafer Manufacturing Materials' },
            { id: '96', text: 'Photoresist Materials' },
            { id: '101', text: 'Chemical Mechanical Polishing Materials' },
            { id: '105', text: 'Electronic Gases' },
            { id: '116', text: 'Second and Third Generation Semiconductors' },
            { id: '149', text: 'Deposition Materials' },
            { id: '178', text: 'Packaging Materials' },
            { id: '179', text: 'Ceramic Substrate' },
            { id: '185', text: 'Lead Frame' },
            { id: '197', text: 'Bonding Wire' },
            { id: '217', text: 'Packaging Substrate' },
            { id: '252', text: 'Chip Bonding Materials' },
            { id: '268', text: 'Design' },
            { id: '269', text: 'Analog Circuit' },
            { id: '270', text: 'RF Front-End and Receiver' },
            { id: '272', text: 'Analog/Mixed-Signal' },
            { id: '273', text: 'Driver Chip' },
            { id: '309', text: 'Data Conversion' },
            { id: '325', text: 'High-Performance Analog Chip' },
            { id: '465', text: 'Discrete Devices' },
            { id: '466', text: 'IGBT' },
            { id: '467', text: 'Power Devices' },
            { id: '470', text: 'Diode/Transistor' },
            { id: '502', text: 'MOSFET' },
            { id: '518', text: 'FRD' },
            { id: '552', text: 'Other Chips' },
            { id: '553', text: 'Clock Chip' },
            { id: '555', text: 'Biochip' },
            { id: '556', text: '25G and 56G High-Speed IO Connector' },
            { id: '557', text: 'Aerospace and Military Special Chips' },
            { id: '558', text: 'Security Chip' },
            { id: '560', text: 'Sensor' },
            { id: '561', text: 'Gas Sensor' },
            { id: '563', text: 'Photoelectric Sensor' },
            { id: '574', text: 'Temperature Sensor' },
            { id: '580', text: 'Optical Sensor' },
            { id: '582', text: 'Humidity Sensor' },
            { id: '669', text: 'Optoelectronics' },
            { id: '670', text: 'LED/LD' },
            { id: '681', text: 'Optical Chip' },
            { id: '1167', text: 'Manufacturing' },
            { id: '1168', text: 'Production Mode' },
            { id: '1169', text: 'Foundry' },
            { id: '1200', text: 'IDM' },
            { id: '1218', text: 'FOUNDRY' },
            { id: '1238', text: 'Equipment' },
            { id: '1239', text: 'Front-End Test Equipment' },
            { id: '1240', text: 'Measurement' },
            { id: '1245', text: 'Defect Detection' },
            { id: '1253', text: 'Other Equipment' },
            { id: '1254', text: 'Other Detection Equipment' },
            { id: '1259', text: 'Industrial Robot' },
            { id: '1260', text: 'Wafer Bonding System' },
            { id: '1262', text: 'Integrated Circuit Equipment - Gas Purifier' },
            { id: '1263', text: 'Die Bonder' },
            { id: '1269', text: 'Front-End Process Equipment' },
            { id: '1270', text: 'Ion Implantation Equipment' },
            { id: '1272', text: 'Debonding Equipment' },
            { id: '1274', text: 'Photolithography' },
            { id: '1279', text: 'Single Crystal Furnace' },
            { id: '1280', text: 'Plating Equipment' },
            { id: '1302', text: 'Back-End Test Equipment' },
            { id: '1303', text: 'Tester' },
            { id: '1316', text: 'Probe Station' },
            { id: '1319', text: 'Sorter' },
            { id: '1324', text: 'Back-End Packaging Equipment' },
            { id: '1325', text: 'Wafer Alignment/Bonding Equipment' },
            { id: '1328', text: 'Dicing Machine' },
            { id: '1335', text: 'Other Packaging Equipment' },
            { id: '1337', text: 'Mounter' },
            { id: '1346', text: 'Die Bonder' }
        ],
        lines: [
            { text: '', from: '0', to: '1' },
            { text: '', from: '1', to: '2' },
            { text: '', from: '2', to: '3' },
            { text: '', from: '2', to: '5' },
            { text: '', from: '2', to: '8' },
            { text: '', from: '2', to: '10' },
            { text: '', from: '2', to: '12' },
            { text: '', from: '1', to: '30' },
            { text: '', from: '30', to: '31' },
            { text: '', from: '30', to: '44' },
            { text: '', from: '30', to: '49' },
            { text: '', from: '1', to: '51' },
            { text: '', from: '51', to: '52' },
            { text: '', from: '51', to: '54' },
            { text: '', from: '51', to: '56' },
            { text: '', from: '51', to: '58' },
            { text: '', from: '51', to: '60' },
            { text: '', from: '0', to: '70' },
            { text: '', from: '70', to: '71' },
            { text: '', from: '71', to: '72' },
            { text: '', from: '71', to: '74' },
            { text: '', from: '71', to: '75' },
            { text: '', from: '71', to: '77' },
            { text: '', from: '71', to: '78' },
            { text: '', from: '70', to: '95' },
            { text: '', from: '95', to: '96' },
            { text: '', from: '95', to: '101' },
            { text: '', from: '95', to: '105' },
            { text: '', from: '95', to: '116' },
            { text: '', from: '95', to: '149' },
            { text: '', from: '70', to: '178' },
            { text: '', from: '178', to: '179' },
            { text: '', from: '178', to: '185' },
            { text: '', from: '178', to: '197' },
            { text: '', from: '178', to: '217' },
            { text: '', from: '178', to: '252' },
            { text: '', from: '0', to: '268' },
            { text: '', from: '268', to: '269' },
            { text: '', from: '269', to: '270' },
            { text: '', from: '269', to: '272' },
            { text: '', from: '269', to: '273' },
            { text: '', from: '269', to: '309' },
            { text: '', from: '269', to: '325' },
            { text: '', from: '268', to: '465' },
            { text: '', from: '465', to: '466' },
            { text: '', from: '465', to: '467' },
            { text: '', from: '465', to: '470' },
            { text: '', from: '465', to: '502' },
            { text: '', from: '465', to: '518' },
            { text: '', from: '268', to: '552' },
            { text: '', from: '552', to: '553' },
            { text: '', from: '552', to: '555' },
            { text: '', from: '552', to: '556' },
            { text: '', from: '552', to: '557' },
            { text: '', from: '552', to: '558' },
            { text: '', from: '268', to: '560' },
            { text: '', from: '560', to: '561' },
            { text: '', from: '560', to: '563' },
            { text: '', from: '560', to: '574' },
            { text: '', from: '560', to: '580' },
            { text: '', from: '560', to: '582' },
            { text: '', from: '268', to: '669' },
            { text: '', from: '669', to: '670' },
            { text: '', from: '669', to: '681' },
            { text: '', from: '0', to: '1167' },
            { text: '', from: '1167', to: '1168' },
            { text: '', from: '1168', to: '1169' },
            { text: '', from: '1168', to: '1200' },
            { text: '', from: '1168', to: '1218' },
            { text: '', from: '0', to: '1238' },
            { text: '', from: '1238', to: '1239' },
            { text: '', from: '1239', to: '1240' },
            { text: '', from: '1239', to: '1245' },
            { text: '', from: '1238', to: '1253' },
            { text: '', from: '1253', to: '1254' },
            { text: '', from: '1253', to: '1259' },
            { text: '', from: '1253', to: '1260' },
            { text: '', from: '1253', to: '1262' },
            { text: '', from: '1253', to: '1263' },
            { text: '', from: '1238', to: '1269' },
            { text: '', from: '1269', to: '1270' },
            { text: '', from: '1269', to: '1272' },
            { text: '', from: '1269', to: '1274' },
            { text: '', from: '1269', to: '1279' },
            { text: '', from: '1269', to: '1280' },
            { text: '', from: '1238', to: '1302' },
            { text: '', from: '1302', to: '1303' },
            { text: '', from: '1302', to: '1316' },
            { text: '', from: '1302', to: '1319' },
            { text: '', from: '1238', to: '1324' },
            { text: '', from: '1324', to: '1325' },
            { text: '', from: '1324', to: '1328' },
            { text: '', from: '1324', to: '1335' },
            { text: '', from: '1324', to: '1337' },
            { text: '', from: '1324', to: '1346' }
        ]
    };

    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        graphInstance.loading();
        await graphInstance.setJsonData(__graph_json_data);
        await graphInstance.doLayout();
        await openByLevel(1);
        await graphInstance.zoomToFit();
        graphInstance.clearLoading();
    }
};

const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
};

const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
};

const openByLevel = async (level: number) => {
    const graphInstance = graphRef.value?.getInstance();
    if (graphInstance) {
        // Reset data

        graphInstance.getNodes().forEach(node => {
            node.expanded = true;
            node.alignItems = 'top';
        });
        // Reset data

        graphInstance.getNodes().forEach(node => {
            node.className = 'my-industy-node-level-' + Math.abs(node.lot.level);
        });
        graphInstance.getNodes().forEach(node => {
            // Determine the level of the node (root node is 0)
            if (Math.abs(node.lot.level) >= level) {
                console.log('collapseNode:', level, node.text, node.lot.level);
                // Collapse node

                node.expanded = false;
            }
        });
        await graphInstance.doLayout();
    }
};

</script>

<style lang="scss" scoped>
.my-industy-node {
  width: 140px;
  border-radius: 5px;
  background-color: #ffffff;
  overflow: hidden;
  .my-card-body {
    line-height: 30px;
  }
}
::v-deep(.my-industy-node-level-0) {
  .my-industy-node {
    width: 180px;
    border: #5b05f1 solid 1px;
    .my-card-header {
      background-color: #5b05f1;
    }
    .my-card-body {
      color: #5b05f1;
      font-size: 18px;
      line-height: 50px;
      height: 50px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #5b05f1 !important;
    }
  }
}
::v-deep(.my-industy-node-level-1) {
  .my-industy-node {
    border: #FD8B37 solid 1px;
    .my-card-header {
      background-color: #FD8B37;
    }
    .my-card-body {
      color: #FD8B37;
      font-size: 16px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #FD8B37 !important;
    }
  }
}
::v-deep(.my-industy-node-level-2) {
  .my-industy-node {
    border: #9b9903 solid 1px;
    .my-card-header {
      background-color: #9b9903;
    }
    .my-card-body {
      color: #9b9903;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #9b9903 !important;
    }
  }
}
::v-deep(.my-industy-node-level-3) {
  .my-industy-node {
    border: #247c02 solid 1px;
    .my-card-header {
      background-color: #247c02;
    }
    .my-card-body {
      color: #247c02;
      font-size: 12px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #247c02 !important;
    }
  }
}
</style>
```

## React 版本

### `industry-chain.tsx`

```javascript
import React, { useEffect, useRef } from 'react';
import RelationGraph, {RGNodeSlotProps} from 'relation-graph-react';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import './industry-chain.scss';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph();
  }, []);

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: '0',
      nodes: [
        { id: '0', text: 'Semiconductor' },
        { id: '1', text: 'Final Test' },
        { id: '2', text: 'Traditional Packaging' },
        { id: '3', text: 'COG (Glass Encapsulation)' },
        { id: '5', text: 'TO (Coaxial Encapsulation)' },
        { id: '8', text: 'BGA (Ball Grid Array Encapsulation)' },
        { id: '10', text: 'QFN (Quad Flat No-Lead Encapsulation)' },
        { id: '12', text: 'Other Traditional Packaging' },
        { id: '30', text: 'Testing' },
        { id: '31', text: 'Finished Product Testing' },
        { id: '44', text: 'Wafer Testing' },
        { id: '49', text: 'Other Professional Testing' },
        { id: '51', text: 'Advanced Packaging' },
        { id: '52', text: 'MEMS (Micro-Electro-Mechanical Systems Packaging)' },
        { id: '54', text: 'WLCSP (Wafer-Level Chip-Scale Packaging)' },
        { id: '56', text: 'TSV (Through-Silicon Via Technology)' },
        { id: '58', text: 'FOWLP (Fan-Out Wafer-Level Packaging)' },
        { id: '60', text: 'BUMP (Bump Packaging Technology)' },
        { id: '70', text: 'Raw Materials' },
        { id: '71', text: 'Other Raw Materials' },
        { id: '72', text: 'Sapphire Crystal' },
        { id: '74', text: 'Plating Additives for Semiconductor Testing' },
        { id: '75', text: 'Probe Card' },
        { id: '77', text: 'Aluminum Electrolytic Capacitor Electrode Foil' },
        { id: '78', text: 'Carbon Materials, New Polymer Composite Materials' },
        { id: '95', text: 'Wafer Manufacturing Materials' },
        { id: '96', text: 'Photoresist Materials' },
        { id: '101', text: 'Chemical Mechanical Polishing Materials' },
        { id: '105', text: 'Electronic Gases' },
        { id: '116', text: 'Second and Third Generation Semiconductors' },
        { id: '149', text: 'Deposition Materials' },
        { id: '178', text: 'Packaging Materials' },
        { id: '179', text: 'Ceramic Substrate' },
        { id: '185', text: 'Lead Frame' },
        { id: '197', text: 'Bonding Wire' },
        { id: '217', text: 'Packaging Substrate' },
        { id: '252', text: 'Chip Bonding Materials' },
        { id: '268', text: 'Design' },
        { id: '269', text: 'Analog Circuit' },
        { id: '270', text: 'RF Front-End and Receiver' },
        { id: '272', text: 'Analog/Mixed-Signal' },
        { id: '273', text: 'Driver Chip' },
        { id: '309', text: 'Data Conversion' },
        { id: '325', text: 'High-Performance Analog Chip' },
        { id: '465', text: 'Discrete Devices' },
        { id: '466', text: 'IGBT' },
        { id: '467', text: 'Power Devices' },
        { id: '470', text: 'Diode/Transistor' },
        { id: '502', text: 'MOSFET' },
        { id: '518', text: 'FRD' },
        { id: '552', text: 'Other Chips' },
        { id: '553', text: 'Clock Chip' },
        { id: '555', text: 'Biochip' },
        { id: '556', text: '25G and 56G High-Speed IO Connector' },
        { id: '557', text: 'Aerospace and Military Special Chips' },
        { id: '558', text: 'Security Chip' },
        { id: '560', text: 'Sensor' },
        { id: '561', text: 'Gas Sensor' },
        { id: '563', text: 'Photoelectric Sensor' },
        { id: '574', text: 'Temperature Sensor' },
        { id: '580', text: 'Optical Sensor' },
        { id: '582', text: 'Humidity Sensor' },
        { id: '669', text: 'Optoelectronics' },
        { id: '670', text: 'LED/LD' },
        { id: '681', text: 'Optical Chip' },
        { id: '1167', text: 'Manufacturing' },
        { id: '1168', text: 'Production Mode' },
        { id: '1169', text: 'Foundry' },
        { id: '1200', text: 'IDM' },
        { id: '1218', text: 'FOUNDRY' },
        { id: '1238', text: 'Equipment' },
        { id: '1239', text: 'Front-End Test Equipment' },
        { id: '1240', text: 'Measurement' },
        { id: '1245', text: 'Defect Detection' },
        { id: '1253', text: 'Other Equipment' },
        { id: '1254', text: 'Other Detection Equipment' },
        { id: '1259', text: 'Industrial Robot' },
        { id: '1260', text: 'Wafer Bonding System' },
        { id: '1262', text: 'Integrated Circuit Equipment - Gas Purifier' },
        { id: '1263', text: 'Die Bonder' },
        { id: '1269', text: 'Front-End Process Equipment' },
        { id: '1270', text: 'Ion Implantation Equipment' },
        { id: '1272', text: 'Debonding Equipment' },
        { id: '1274', text: 'Photolithography' },
        { id: '1279', text: 'Single Crystal Furnace' },
        { id: '1280', text: 'Plating Equipment' },
        { id: '1302', text: 'Back-End Test Equipment' },
        { id: '1303', text: 'Tester' },
        { id: '1316', text: 'Probe Station' },
        { id: '1319', text: 'Sorter' },
        { id: '1324', text: 'Back-End Packaging Equipment' },
        { id: '1325', text: 'Wafer Alignment/Bonding Equipment' },
        { id: '1328', text: 'Dicing Machine' },
        { id: '1335', text: 'Other Packaging Equipment' },
        { id: '1337', text: 'Mounter' },
        { id: '1346', text: 'Die Bonder' }
      ],
      lines: [
        { text: '', from: '0', to: '1' },
        { text: '', from: '1', to: '2' },
        { text: '', from: '2', to: '3' },
        { text: '', from: '2', to: '5' },
        { text: '', from: '2', to: '8' },
        { text: '', from: '2', to: '10' },
        { text: '', from: '2', to: '12' },
        { text: '', from: '1', to: '30' },
        { text: '', from: '30', to: '31' },
        { text: '', from: '30', to: '44' },
        { text: '', from: '30', to: '49' },
        { text: '', from: '1', to: '51' },
        { text: '', from: '51', to: '52' },
        { text: '', from: '51', to: '54' },
        { text: '', from: '51', to: '56' },
        { text: '', from: '51', to: '58' },
        { text: '', from: '51', to: '60' },
        { text: '', from: '0', to: '70' },
        { text: '', from: '70', to: '71' },
        { text: '', from: '71', to: '72' },
        { text: '', from: '71', to: '74' },
        { text: '', from: '71', to: '75' },
        { text: '', from: '71', to: '77' },
        { text: '', from: '71', to: '78' },
        { text: '', from: '70', to: '95' },
        { text: '', from: '95', to: '96' },
        { text: '', from: '95', to: '101' },
        { text: '', from: '95', to: '105' },
        { text: '', from: '95', to: '116' },
        { text: '', from: '95', to: '149' },
        { text: '', from: '70', to: '178' },
        { text: '', from: '178', to: '179' },
        { text: '', from: '178', to: '185' },
        { text: '', from: '178', to: '197' },
        { text: '', from: '178', to: '217' },
        { text: '', from: '178', to: '252' },
        { text: '', from: '0', to: '268' },
        { text: '', from: '268', to: '269' },
        { text: '', from: '269', to: '270' },
        { text: '', from: '269', to: '272' },
        { text: '', from: '269', to: '273' },
        { text: '', from: '269', to: '309' },
        { text: '', from: '269', to: '325' },
        { text: '', from: '268', to: '465' },
        { text: '', from: '465', to: '466' },
        { text: '', from: '465', to: '467' },
        { text: '', from: '465', to: '470' },
        { text: '', from: '465', to: '502' },
        { text: '', from: '465', to: '518' },
        { text: '', from: '268', to: '552' },
        { text: '', from: '552', to: '553' },
        { text: '', from: '552', to: '555' },
        { text: '', from: '552', to: '556' },
        { text: '', from: '552', to: '557' },
        { text: '', from: '552', to: '558' },
        { text: '', from: '268', to: '560' },
        { text: '', from: '560', to: '561' },
        { text: '', from: '560', to: '563' },
        { text: '', from: '560', to: '574' },
        { text: '', from: '560', to: '580' },
        { text: '', from: '560', to: '582' },
        { text: '', from: '268', to: '669' },
        { text: '', from: '669', to: '670' },
        { text: '', from: '669', to: '681' },
        { text: '', from: '0', to: '1167' },
        { text: '', from: '1167', to: '1168' },
        { text: '', from: '1168', to: '1169' },
        { text: '', from: '1168', to: '1200' },
        { text: '', from: '1168', to: '1218' },
        { text: '', from: '0', to: '1238' },
        { text: '', from: '1238', to: '1239' },
        { text: '', from: '1239', to: '1240' },
        { text: '', from: '1239', to: '1245' },
        { text: '', from: '1238', to: '1253' },
        { text: '', from: '1253', to: '1254' },
        { text: '', from: '1253', to: '1259' },
        { text: '', from: '1253', to: '1260' },
        { text: '', from: '1253', to: '1262' },
        { text: '', from: '1253', to: '1263' },
        { text: '', from: '1238', to: '1269' },
        { text: '', from: '1269', to: '1270' },
        { text: '', from: '1269', to: '1272' },
        { text: '', from: '1269', to: '1274' },
        { text: '', from: '1269', to: '1279' },
        { text: '', from: '1269', to: '1280' },
        { text: '', from: '1238', to: '1302' },
        { text: '', from: '1302', to: '1303' },
        { text: '', from: '1302', to: '1316' },
        { text: '', from: '1302', to: '1319' },
        { text: '', from: '1238', to: '1324' },
        { text: '', from: '1324', to: '1325' },
        { text: '', from: '1324', to: '1328' },
        { text: '', from: '1324', to: '1335' },
        { text: '', from: '1324', to: '1337' },
        { text: '', from: '1324', to: '1346' }
      ]
    };

    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      graphInstance.loading();
      await graphInstance.setJsonData(__graph_json_data);
      await graphInstance.doLayout();
      await openByLevel(1);
      await graphInstance.zoomToFit();
      graphInstance.clearLoading();
    }
  };

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
  };

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject);
  };

  const openByLevel = async (level: number) => {
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      // Reset data

      graphInstance.getNodes().forEach(node => {
        node.expanded = true;
        node.alignItems = 'top';
      });

      // Reset data

      graphInstance.getNodes().forEach((node:RGNode) => {
        node.className = 'my-industy-node-level-' + Math.abs(node.lot.level!);
      });

      graphInstance.getNodes().forEach(node => {
        // Determine the level of the node (root node is 0)
        if (Math.abs(node.lot.level!) >= level) {
          console.log('collapseNode:', level, node.text, node.lot.level);
          // Collapse node

          node.expanded = false;
        }
      });

      await graphInstance.doLayout();
    }
  };
  const MyNodeSlot: React.FC<RGNodeSlotProps> = ({node}) => {
    return (
      <div slot="node" slot-scope="{node}">
        {node.lot && node.lot.level === 0 && (
          <div className="my-industy-node my-industy-node-level-0">
            {/* root node */}
            <div className="my-card-header">Industry Chain Name</div>
            <div className="my-card-body">{node.text}</div>
          </div>
        )}
        {node.lot && node.lot.level === 1 && (
          <div className="my-industy-node my-industy-node-level-1">
            {/* level 1 nodes */}
            <div className="my-card-header">Industry Link</div>
            <div className="my-card-body">{node.text}</div>
          </div>
        )}
        {node.lot && node.lot.level === 2 && (
          <div className="my-industy-node my-industy-node-level-2">
            {/* level 2 nodes */}
            <div className="my-card-header">Subsection Link</div>
            <div className="my-card-body">{node.text}</div>
          </div>
        )}
        {!node.lot || node.lot.level >= 3 && (
          <div className="my-industy-node my-industy-node-level-3">
            <div className="my-card-header">Product Type</div>
            <div className="my-card-body">{node.text}</div>
          </div>
        )}
      </div>
    );
  }
  const graphOptions: RGOptions = {
    debug: true,
    backgrounImageNoRepeat: true,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    useAnimationWhenRefresh: false,
    useAnimationWhenExpanded: true,
    reLayoutWhenExpandedOrCollapsed: true,
    defaultExpandHolderPosition: 'bottom',
    defaultNodeShape: 1,
    defaultNodeBorderWidth: 0,
    defaultLineShape: 2,
    defaultJunctionPoint: 'tb',
    lineUseTextPath: true,
    layouts: [
      {
        layoutName: 'tree',
        from: 'top',
        min_per_width: 160,
        levelDistance: '250,250,250,250'
      }
    ]
  };
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph ref={graphRef} options={graphOptions} nodeSlot={MyNodeSlot}>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `industry-chain.scss`

```scss
.my-industy-node {
  width: 140px;
  border-radius: 5px;
  background-color: #ffffff;
  overflow: hidden;
  .my-card-body {
    line-height: 30px;
  }
}
.my-industy-node-level-0 {
  .my-industy-node {
    width: 180px;
    border: #5b05f1 solid 1px;
    .my-card-header {
      background-color: #5b05f1;
    }
    .my-card-body {
      color: #5b05f1;
      font-size: 18px;
      line-height: 50px;
      height: 50px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #5b05f1 !important;
    }
  }
}
.my-industy-node-level-1 {
  .my-industy-node {
    border: #fd8b37 solid 1px;
    .my-card-header {
      background-color: #fd8b37;
    }
    .my-card-body {
      color: #fd8b37;
      font-size: 16px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #fd8b37 !important;
    }
  }
}
.my-industy-node-level-2 {
  .my-industy-node {
    border: #9b9903 solid 1px;
    .my-card-header {
      background-color: #9b9903;
    }
    .my-card-body {
      color: #9b9903;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #9b9903 !important;
    }
  }
}
.my-industy-node-level-3 {
  .my-industy-node {
    border: #247c02 solid 1px;
    .my-card-header {
      background-color: #247c02;
    }
    .my-card-body {
      color: #247c02;
      font-size: 12px;
    }
  }
  .c-btn-open-close {
    & span {
      background-color: #247c02 !important;
    }
  }
}
```
