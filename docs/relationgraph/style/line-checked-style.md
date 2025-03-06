# 图谱颜色 & 主题

## Vue2 版本

### `line-checked-style.vue`

```javascript
<template>
  <div>

    <div ref="myPage" class="my-graph" style="height:calc(100vh);" :class="['my-theme-' + themeId]">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-theme-desc">
              邀请专业设计师设计的配色：
            </div>
            <div style="padding:10px;">
              <div class="c-option-name">主题颜色：</div>
              <div class="c-themes">
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '1'}" @click="setTheme('1')"><div class="c-theme-color" style="background-color: #5b05f1;"></div><div class="c-theme-name">Theme 1</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '2'}" @click="setTheme('2')"><div class="c-theme-color" style="background-color: #f105dd;"></div><div class="c-theme-name">Theme 2</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '3'}" @click="setTheme('3')"><div class="c-theme-color" style="background-color: #0395c2;"></div><div class="c-theme-name">Theme 3</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '4'}" @click="setTheme('4')"><div class="c-theme-color" style="background-color: #6cc004;"></div><div class="c-theme-name">Theme 4</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '5'}" @click="setTheme('5')"><div class="c-theme-color" style="background-color: #da8f04;"></div><div class="c-theme-name">Theme 5</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '6'}" @click="setTheme('6')"><div class="c-theme-color" style="background-color: #aaaaaa;"></div><div class="c-theme-name">Theme 6</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '7'}" @click="setTheme('7')"><div class="c-theme-color" style="background-color: rgba(79, 30, 30);"></div><div class="c-theme-name">Theme 7</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '8'}" @click="setTheme('8')"><div class="c-theme-color" style="background-color: #000000;"></div><div class="c-theme-name">Theme 8</div></div>
              </div>
            </div>
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
  name: 'Demo4NodeStyle',
  components: { },
  data() {
    return {
      themeId: '1',
      graphOptions: {
        debug: true,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineColor: 'auto',
        defaultNodeColor: 'auto',
        defaultNodeBorderWidth: 'auto',
        defaultNodeBorderColor: 'auto',
        defaultNodeFontColor: 'auto',
        defaultNodeShape: 0,
        defaultPloyLineRadius: 10,
        defaultLineShape: 6,
        defaultJunctionPoint: 'lr',
        // disableNodeClickEffect: true,
        lineUseTextPath: true,
        allowShowDownloadButton: false,
        useAnimationWhenRefresh: false,
        layout: {
          layoutName: 'tree',
          from: 'left',
          min_per_width: 310, // 根据节点的宽度设置，这个是让图谱看起来偏亮的关键
          min_per_height: 70
        }
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
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a', data: { icon: 'node-dm-8' } },
          { 'id': 'b', 'text': 'b', data: { icon: 'node-dm-2' } },
          { 'id': 'b1', 'text': 'b1', data: { icon: 'node-dm-3' } },
          { 'id': 'b2', 'text': 'b2', data: {icon:'node-dm-4' }},
          { 'id': 'b2-1', 'text': 'b2-1', data: {icon:'node-dm-7'} },
          { 'id': 'b2-2', 'text': 'b2-2', data: {icon:'node-dm-9'} },
          { 'id': 'c', 'text': 'c', data: { icon: 'volleyball-ball' } },
          { 'id': 'c1', 'text': 'c1', data: { icon: 'node-dm-6' } },
          { 'id': 'c2', 'text': 'c2', data: { icon: 'node-dm-10' } },
          { 'id': 'c3', 'text': 'c3', data: { icon: 'node-dm-5' } }],
        'lines': [
          { 'from': 'a', 'to': 'b', text: '关系描述'  },
          { 'from': 'b', 'to': 'b1', text: '关系描述' },
          { 'from': 'b', 'to': 'b2', text: '关系描述' },
          { 'from': 'b2', 'to': 'b2-1', text: '关系描述' },
          { 'from': 'b2', 'to': 'b2-2', text: '关系描述' },
          { 'from': 'a', 'to': 'c', text: '关系描述' },
          { 'from': 'c', 'to': 'c1', text: '关系描述' },
          { 'from': 'c', 'to': 'c2', text: '关系描述' },
          { 'from': 'c', 'to': 'c3', text: '关系描述' }]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        this.setTheme('1');
      });
      // 监控全屏事件，记得在组件销毁时移除这个事件
      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          // div进入全屏模式
          console.log('div进入全屏模式', document.fullscreenElement);
          console.log('graphRef', this.$refs.graphRef.$el);
          // vue 会将组件对应的Element挂载在组件对象的$el属性中
          if (this.$refs.graphRef.$el === document.fullscreenElement) {
            console.log('relation-graph被全屏了!');
            setTimeout(async() => {
              await this.resetView();
              console.log('relation-graph 重置完成!');
            }, 500)
          }
        } else {
          // div退出全屏模式
          console.log('div退出全屏模式');
          setTimeout(async() => {
            await this.resetView();
            console.log('relation-graph 重置完成!');
          }, 500)
        }
      });
    },
    async resetView() {
      const graphInstance = this.$refs.graphRef.getInstance();
      await graphInstance.resetViewSize();
      await graphInstance.refreshNVAnalysisInfo();
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
    },
    setTheme(id) {
      this.themeId = id;
      const graphInstance = this.$refs.graphRef.getInstance();
      // Random Set the checked line and node to show the theme effect
      const nodes = graphInstance.getNodes();
      const links = graphInstance.getLinks();
      graphInstance.options.checkedNodeId = nodes[Math.floor(Math.random() * nodes.length)].id;
      graphInstance.options.checkedLineId = links[Math.floor(Math.random() * links.length)].relations[0].id;
      console.log(graphInstance.options.checkedLineId, graphInstance.options.checkedNodeId);
    }
  }
};
</script>
<style lang="scss" scoped>
.c-my-panel{
  width: 400px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border:#eeeeee solid 1px;
  border: rgba(79, 30, 30, 0.6) solid 1px;
  overflow: hidden;
  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 30px;
  }
  .c-themes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  .c-theme-desc{
    font-size: 16px;color: #ffffff;
    background-color: rgba(79, 30, 30, 0.6);
    line-height: 40px;
    text-align: center;
  }
  .c-theme-item{
    border-radius: 5px;
    width: 150px;
    text-align: center;
    line-height: 30px;
    padding:5px;
    cursor: pointer;
    background-color: #ffffff;
    display: flex;
    border:#ffffff solid 1px;
    &:hover {
      transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
      box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    }
    .c-theme-color {
      width:30px;
      height:30px;
      border-radius: 5px;
      border:#ffffff solid 1px;
    }
    .c-theme-name {
      padding-left:10px;
    }
  }
  .c-theme-item-checked{
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    background-color: rgba(79, 30, 30, 1);
    color: #ffffff;
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-1{
  .rel-map {
    background-color: rgba(91,5,241, 0.1);
  }
  .rel-node{
    background-color: rgba(91,5,241,0.61);
    border: 2px solid rgba(91,5,241,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: #5b05f1;
  }
  .c-rg-line-text {
    fill: #5b05f1;
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(91,5,241,0.2);
  }
  .rel-toolbar{
    background-color: rgba(91,5,241,0.8);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: #5b05f1;
  }
  .c-rg-line-text-checked {
    stroke: #5b05f1;
  }
  .c-rg-line-checked-bg {
    stroke: rgba(91,5,241,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(91,5,241,0.2);
  }
  .rel-graph-loading{
    background-color: #ede9fd;
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-2{
  .rel-map {
    background-color: rgba(241, 5, 221, 0.1);
  }
  .rel-node{
    background-color: rgba(241, 5, 221, 0.73);
    border: 2px solid rgba(241, 5, 221,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text {
    fill: rgba(241, 5, 221);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(241, 5, 221,0.2);
  }
  .rel-toolbar{
    background-color: rgba(241, 5, 221,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(241, 5, 221,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221,0.2);
  }
  .rel-graph-loading{
    background-color: #ecf4f8;
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-3{
  .rel-map {
    background-color: rgba(3, 149, 194, 0.1);
  }
  .rel-node{
    background-color: rgba(3, 149, 194, 0.92);
    border: 2px solid rgba(3, 149, 194,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-text {
    fill: rgba(3, 149, 194);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(3, 149, 194,0.2);
  }
  .rel-toolbar{
    background-color: rgba(3, 149, 194,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-text-checked {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(3, 149, 194,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(3, 149, 194,0.2);
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-4{
  .rel-map {
    background-color: rgba(95, 169, 3, 0.1);
  }
  .rel-node{
    background-color: rgba(95, 169, 3, 0.79);
    border: 2px solid rgba(95, 169, 3,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-text {
    fill: rgba(95, 169, 3);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(95, 169, 3,0.2);
  }
  .rel-toolbar{
    background-color: rgba(95, 169, 3,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-text-checked {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(95, 169, 3,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(95, 169, 3,0.2);
  }
  .rel-graph-loading{
    background-color: #f1f6ea;
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-5{
  .rel-map {
    background-color: rgba(175, 120, 2, 0.1);
  }
  .rel-node{
    background-color: rgba(175, 120, 2, 0.8);
    border: 2px solid rgba(175, 120, 2,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-text {
    fill: rgba(175, 120, 2);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(175, 120, 2,0.2);
  }
  .rel-toolbar{
    background-color: rgba(175, 120, 2,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(175, 120, 2,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(175, 120, 2,0.2);
  }
  .rel-graph-loading{
    background-color: #f6f1e9;
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-6{
  .rel-map {
    background-color: rgba(59, 59, 59, 0.1);
  }
  .rel-node{
    background-color: rgba(59, 59, 59, 0.8);
    border: 2px solid rgba(59, 59, 59,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-text {
    fill: rgba(59, 59, 59);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(59, 59, 59,0.2);
  }
  .rel-toolbar{
    background-color: rgba(59, 59, 59,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-text-checked {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(59, 59, 59,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(59, 59, 59,0.2);
  }
  .rel-graph-loading{
    background-color: #ebebeb;
  }
}
</style>
<style scoped lang="scss">
::v-deep .my-theme-7{
  .rel-map {
    background-color: rgba(79, 30, 30, 0.1);
  }
  .rel-node{
    background-color: rgba(79, 30, 30, 0.8);
    border: 2px solid rgba(79, 30, 30,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-text {
    fill: rgba(79, 30, 30);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(79, 30, 30,0.2);
  }
  .rel-toolbar{
    background-color: rgba(79, 30, 30,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-text-checked {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(79, 30, 30,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(79, 30, 30,0.2);
  }
  .rel-graph-loading{
    background-color: #ece8e8;
  }
}
</style>

<style scoped lang="scss">
::v-deep .my-theme-8{
  .rel-map {
    background-color: #111111;
  }
  .rel-node{
    background-color: #eeeeee;
    border: 0px solid #d8e6c5;
    .c-node-text {
      color: #000000;
    }
  }
  .c-rg-line {
    stroke: #eeeeee;
  }
  .c-rg-line-text {
    fill: #eeeeee;
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px #555555;
  }
  .rel-toolbar{
    background-color: rgba(40, 39, 39,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: #ffffff;
  }
  .c-rg-line-text-checked {
    stroke: rgba(255, 255, 255, 0.3);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(255, 255, 255, 0.3);
  }
  .c-rg-line-text-checked {
    //stroke: #ffffff;
  }
  .rel-graph-loading{
    background-color: #111111;
  }
}
</style>
```

## Vue3 版本

### `line-checked-style.vue`

```javascript
<template>
  <div>
    <div ref="myPage" class="my-graph" style="height:calc(100vh);" :class="['my-theme-' + themeId]">
      <RelationGraph ref="graphRef" :options="graphOptions">
        <template #graph-plug>
          <div class="c-my-panel">
            <div class="c-theme-desc">
              Colors designed by professional designers:
            </div>
            <div style="padding:10px;">
              <div class="c-option-name">Theme Color:</div>
              <div class="c-themes">
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '1'}" @click="setTheme('1')"><div class="c-theme-color" style="background-color: #5b05f1;"></div><div class="c-theme-name">Theme 1</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '2'}" @click="setTheme('2')"><div class="c-theme-color" style="background-color: #f105dd;"></div><div class="c-theme-name">Theme 2</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '3'}" @click="setTheme('3')"><div class="c-theme-color" style="background-color: #0395c2;"></div><div class="c-theme-name">Theme 3</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '4'}" @click="setTheme('4')"><div class="c-theme-color" style="background-color: #6cc004;"></div><div class="c-theme-name">Theme 4</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '5'}" @click="setTheme('5')"><div class="c-theme-color" style="background-color: #da8f04;"></div><div class="c-theme-name">Theme 5</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '6'}" @click="setTheme('6')"><div class="c-theme-color" style="background-color: #aaaaaa;"></div><div class="c-theme-name">Theme 6</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '7'}" @click="setTheme('7')"><div class="c-theme-color" style="background-color: rgba(79, 30, 30);"></div><div class="c-theme-name">Theme 7</div></div>
                <div class="c-theme-item" :class="{'c-theme-item-checked': themeId === '8'}" @click="setTheme('8')"><div class="c-theme-color" style="background-color: #000000;"></div><div class="c-theme-name">Theme 8</div></div>
              </div>
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

const graphRef = ref<RelationGraphComponent>();
const themeId = ref('1');
const graphOptions: RGOptions = {
    debug: true,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultLineColor: 'auto',
    defaultNodeColor: 'auto',
    defaultNodeBorderWidth: 'auto',
    defaultNodeBorderColor: 'auto',
    defaultNodeFontColor: 'auto',
    defaultNodeShape: 0,
    defaultPolyLineRadius: 10,
    defaultLineShape: 6,
    defaultJunctionPoint: 'lr',
    // disableNodeClickEffect: true,
    lineUseTextPath: true,
    allowShowDownloadButton: false,
    useAnimationWhenRefresh: false,
    layout: {
        layoutName: 'tree',
        from: 'left',
        min_per_width: 310,
        min_per_height: 70

    }
};


const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a', data: { icon: 'align_bottom' } },
            { id: 'b', text: 'b', data: { icon: 'basketball' } },
            { id: 'b1', text: 'b1', data: { icon: 'bowl_noodles' } },
            { id: 'b2', text: 'b2', data: { icon: 'delivery_truck' } },
            { id: 'b2-1', text: 'b2-1', data: { icon: 'fries' } },
            { id: 'b2-2', text: 'b2-2', data: { icon: 'microchip' } },
            { id: 'c', text: 'c', data: { icon: 'satellite_1' } },
            { id: 'c1', text: 'c1', data: { icon: 'brightness_up' } },
            { id: 'c2', text: 'c2', data: { icon: 'burger' } },
            { id: 'c3', text: 'c3', data: { icon: 'cloud_drizzle' } }
        ],
        lines: [
            { from: 'a', to: 'b', text: 'Relation Description' },
            { from: 'b', to: 'b1', text: 'Relation Description' },
            { from: 'b', to: 'b2', text: 'Relation Description' },
            { from: 'b2', to: 'b2-1', text: 'Relation Description' },
            { from: 'b2', to: 'b2-2', text: 'Relation Description' },
            { from: 'a', to: 'c', text: 'Relation Description' },
            { from: 'c', to: 'c1', text: 'Relation Description' },
            { from: 'c', to: 'c2', text: 'Relation Description' },
            { from: 'c', to: 'c3', text: 'Relation Description' }
        ]
    };
    const graphInstance = graphRef.value.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    setTheme('1');

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            console.log('div entered fullscreen mode', document.fullscreenElement);
            if (graphRef.value.$el === document.fullscreenElement) {
                console.log('relation-graph is fullscreen!');
                setTimeout(async () => {
                    await resetView();
                    console.log('relation-graph reset complete!');
                }, 500);
            }
        } else {
            console.log('div exited fullscreen mode');
            setTimeout(async () => {
                await resetView();
                console.log('relation-graph reset complete!');
            }, 500);
        }
    });
};

const resetView = async () => {
    const graphInstance = graphRef.value.getInstance();
    await graphInstance.resetViewSize();
    await graphInstance.refreshNVAnalysisInfo();
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

const setTheme = (id: string) => {
    themeId.value = id;
    const graphInstance = graphRef.value.getInstance();
    const nodes = graphInstance.getNodes();
    const links = graphInstance.getLinks();
    graphInstance.options.checkedNodeId = nodes[Math.floor(Math.random() * nodes.length)].id;
    graphInstance.options.checkedLineId = links[Math.floor(Math.random() * links.length)].relations[0].id;
    console.log(graphInstance.options.checkedLineId, graphInstance.options.checkedNodeId);
};

onMounted(() => {
    showGraph();
});
</script>

<style lang="scss" scoped>
.c-my-panel{
  width: 380px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border:#eeeeee solid 1px;
  border: rgba(79, 30, 30, 0.6) solid 1px;
  overflow: hidden;
  .c-option-name{
    color: #666666;
    font-size: 14px;
    line-height: 30px;
  }
  .c-themes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
      place-items: center;
  }
  .c-theme-desc{
    font-size: 16px;color: #ffffff;
    background-color: rgba(79, 30, 30, 0.6);
    line-height: 40px;
    text-align: center;
  }
  .c-theme-item{
    border-radius: 5px;
    width: 150px;
    text-align: center;
    line-height: 30px;
    padding:5px;
    cursor: pointer;
    background-color: #ffffff;
    display: flex;
    border:#ffffff solid 1px;
    &:hover {
      transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
      box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    }
    .c-theme-color {
      width:30px;
      height:30px;
      border-radius: 5px;
      border:#ffffff solid 1px;
    }
    .c-theme-name {
      padding-left:10px;
    }
  }
  .c-theme-item-checked{
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    background-color: rgba(79, 30, 30, 1);
    color: #ffffff;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-1) {
  .rel-map {
    background-color: rgba(91,5,241, 0.1);
  }
  .rel-node{
    background-color: rgba(91,5,241,0.61);
    border: 2px solid rgba(91,5,241,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: #5b05f1;
  }
  .c-rg-line-text {
    fill: #5b05f1;
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(91,5,241,0.2);
  }
  .rel-toolbar{
    background-color: rgba(91,5,241,0.8);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: #5b05f1;
  }
  .c-rg-line-text-checked {
    stroke: #5b05f1;
  }
  .c-rg-line-checked-bg {
    stroke: rgba(91,5,241,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(91,5,241,0.2);
  }
  .rel-graph-loading{
    background-color: #ede9fd;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-2) {
  .rel-map {
    background-color: rgba(241, 5, 221, 0.1);
  }
  .rel-node{
    background-color: rgba(241, 5, 221, 0.73);
    border: 2px solid rgba(241, 5, 221,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text {
    fill: rgba(241, 5, 221);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(241, 5, 221,0.2);
  }
  .rel-toolbar{
    background-color: rgba(241, 5, 221,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(241, 5, 221,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221,0.2);
  }
  .rel-graph-loading{
    background-color: #ecf4f8;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-3) {
  .rel-map {
    background-color: rgba(3, 149, 194, 0.1);
  }
  .rel-node{
    background-color: rgba(3, 149, 194, 0.92);
    border: 2px solid rgba(3, 149, 194,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-text {
    fill: rgba(3, 149, 194);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(3, 149, 194,0.2);
  }
  .rel-toolbar{
    background-color: rgba(3, 149, 194,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-text-checked {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(3, 149, 194,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(3, 149, 194,0.2);
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-4) {
  .rel-map {
    background-color: rgba(95, 169, 3, 0.1);
  }
  .rel-node{
    background-color: rgba(95, 169, 3, 0.79);
    border: 2px solid rgba(95, 169, 3,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-text {
    fill: rgba(95, 169, 3);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(95, 169, 3,0.2);
  }
  .rel-toolbar{
    background-color: rgba(95, 169, 3,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-text-checked {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(95, 169, 3,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(95, 169, 3,0.2);
  }
  .rel-graph-loading{
    background-color: #f1f6ea;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-5) {
  .rel-map {
    background-color: rgba(175, 120, 2, 0.1);
  }
  .rel-node{
    background-color: rgba(175, 120, 2, 0.8);
    border: 2px solid rgba(175, 120, 2,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-text {
    fill: rgba(175, 120, 2);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(175, 120, 2,0.2);
  }
  .rel-toolbar{
    background-color: rgba(175, 120, 2,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(175, 120, 2,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(175, 120, 2,0.2);
  }
  .rel-graph-loading{
    background-color: #f6f1e9;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-6) {
  .rel-map {
    background-color: rgba(59, 59, 59, 0.1);
  }
  .rel-node{
    background-color: rgba(59, 59, 59, 0.8);
    border: 2px solid rgba(59, 59, 59,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-text {
    fill: rgba(59, 59, 59);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(59, 59, 59,0.2);
  }
  .rel-toolbar{
    background-color: rgba(59, 59, 59,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-text-checked {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(59, 59, 59,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(59, 59, 59,0.2);
  }
  .rel-graph-loading{
    background-color: #ebebeb;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-7) {
  .rel-map {
    background-color: rgba(79, 30, 30, 0.1);
  }
  .rel-node{
    background-color: rgba(79, 30, 30, 0.8);
    border: 2px solid rgba(79, 30, 30,0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-text {
    fill: rgba(79, 30, 30);
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px rgba(79, 30, 30,0.2);
  }
  .rel-toolbar{
    background-color: rgba(79, 30, 30,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-text-checked {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(79, 30, 30,0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(79, 30, 30,0.2);
  }
  .rel-graph-loading{
    background-color: #ece8e8;
  }
}
</style>
<style scoped lang="scss">
::v-deep(.my-theme-8) {
  .rel-map {
    background-color: #111111;
  }
  .rel-node{
    background-color: #eeeeee;
    border: 0px solid #d8e6c5;
    .c-node-text {
      color: #000000;
    }
  }
  .c-rg-line {
    stroke: #eeeeee;
  }
  .c-rg-line-text {
    fill: #eeeeee;
  }
  .rel-node-checked {
    transition: background-color .2s ease,outline .2s ease,color .2s ease,-webkit-box-shadow .2s ease;
    box-shadow: 0 0 0 8px #555555;
  }
  .rel-toolbar{
    background-color: rgba(40, 39, 39,0.9);
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: #ffffff;
  }
  .c-rg-line-text-checked {
    stroke: rgba(255, 255, 255, 0.3);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(255, 255, 255, 0.3);
  }
  .c-rg-line-text-checked {
    //stroke: #ffffff;
  }
  .rel-graph-loading{
    background-color: #111111;
  }
}
</style>
```

## React 版本

### `line-checked-style.tsx`

```javascript
import React, {useEffect, useRef, useState} from 'react';
import RelationGraph, {RGNodeSlotProps} from 'relation-graph-react';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent } from 'relation-graph-react';
import './line-checked-style.scss';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent|null>(null);
  const [themeId, setThemeId] = useState('1');

  const graphOptions: RGOptions = {
    debug: true,
    defaultLineColor: 'auto',
    defaultNodeColor: 'auto',
    // defaultNodeBorderWidth: 'auto',
    defaultNodeBorderColor: 'auto',
    defaultNodeFontColor: 'auto',
    defaultNodeShape: 0,
    defaultPolyLineRadius: 10,
    defaultLineShape: 6,
    defaultJunctionPoint: 'lr',
    lineUseTextPath: true,
    allowShowDownloadButton: false,
    useAnimationWhenRefresh: false,
    layout: {
      layoutName: 'tree',
      from: 'left',
      min_per_width: 310,
      min_per_height: 70
    }
  };

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'a', data: { icon: 'align_bottom' } },
        { id: 'b', text: 'b', data: { icon: 'basketball' } },
        { id: 'b1', text: 'b1', data: { icon: 'bowl_noodles' } },
        { id: 'b2', text: 'b2', data: { icon: 'delivery_truck' } },
        { id: 'b2-1', text: 'b2-1', data: { icon: 'fries' } },
        { id: 'b2-2', text: 'b2-2', data: { icon: 'microchip' } },
        { id: 'c', text: 'c', data: { icon: 'satellite_1' } },
        { id: 'c1', text: 'c1', data: { icon: 'brightness_up' } },
        { id: 'c2', text: 'c2', data: { icon: 'burger' } },
        { id: 'c3', text: 'c3', data: { icon: 'cloud_drizzle' } }
      ],
      lines: [
        { from: 'a', to: 'b', text: 'Relation Description' },
        { from: 'b', to: 'b1', text: 'Relation Description' },
        { from: 'b', to: 'b2', text: 'Relation Description' },
        { from: 'b2', to: 'b2-1', text: 'Relation Description' },
        { from: 'b2', to: 'b2-2', text: 'Relation Description' },
        { from: 'a', to: 'c', text: 'Relation Description' },
        { from: 'c', to: 'c1', text: 'Relation Description' },
        { from: 'c', to: 'c2', text: 'Relation Description' },
        { from: 'c', to: 'c3', text: 'Relation Description' }
      ]
    };
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.setJsonData(__graph_json_data);
    setTheme('1');

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        console.log('div entered fullscreen mode', document.fullscreenElement);
        if (graphRef.current?.$el === document.fullscreenElement) {
          console.log('relation-graph is fullscreen!');
          setTimeout(async () => {
            await resetView();
            console.log('relation-graph reset complete!');
          }, 500);
        }
      } else {
        console.log('div exited fullscreen mode');
        setTimeout(async () => {
          await resetView();
          console.log('relation-graph reset complete!');
        }, 500);
      }
    });
  };

  const resetView = async () => {
    const graphInstance = graphRef.current?.getInstance();
    await graphInstance?.resetViewSize();
    await graphInstance?.refreshNVAnalysisInfo();
    await graphInstance?.moveToCenter();
    await graphInstance?.zoomToFit();
  };

  const setTheme = (id: string) => {
    setThemeId(id);
    const graphInstance = graphRef.current?.getInstance();
    const nodes = graphInstance!.getNodes();
    const links = graphInstance!.getLinks();
    graphInstance!.options.checkedNodeId = nodes[Math.floor(Math.random() * nodes.length)].id;
    graphInstance!.options.checkedLineId = links[Math.floor(Math.random() * links.length)].relations[0].id;
    console.log(graphInstance?.options.checkedLineId, graphInstance?.options.checkedNodeId);
  };

  useEffect(() => {
    showGraph();
  }, []);

  const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    return (
      <div className="my-node">
        <div className="my-node-text">
          {node.text}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={`my-graph my-theme-${themeId}`} style={{ height: '100vh' }}>
        <div className="c-my-panel">
          <div className="c-theme-desc">
            Please select a theme color:
          </div>
          <div style={{ padding: '10px' }}>
            <div className="c-option-name">Theme Color:</div>
            <div className="c-themes">
              <div className={`c-theme-item ${themeId === '1' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('1')}>
                <div className="c-theme-color" style={{ backgroundColor: '#5b05f1' }}></div>
                <div className="c-theme-name">Theme 1</div>
              </div>
              <div className={`c-theme-item ${themeId === '2' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('2')}>
                <div className="c-theme-color" style={{ backgroundColor: '#f105dd' }}></div>
                <div className="c-theme-name">Theme 2</div>
              </div>
              <div className={`c-theme-item ${themeId === '3' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('3')}>
                <div className="c-theme-color" style={{ backgroundColor: '#0395c2' }}></div>
                <div className="c-theme-name">Theme 3</div>
              </div>
              <div className={`c-theme-item ${themeId === '4' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('4')}>
                <div className="c-theme-color" style={{ backgroundColor: '#6cc004' }}></div>
                <div className="c-theme-name">Theme 4</div>
              </div>
              <div className={`c-theme-item ${themeId === '5' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('5')}>
                <div className="c-theme-color" style={{ backgroundColor: '#da8f04' }}></div>
                <div className="c-theme-name">Theme 5</div>
              </div>
              <div className={`c-theme-item ${themeId === '6' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('6')}>
                <div className="c-theme-color" style={{ backgroundColor: '#aaaaaa' }}></div>
                <div className="c-theme-name">Theme 6</div>
              </div>
              <div className={`c-theme-item ${themeId === '7' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('7')}>
                <div className="c-theme-color" style={{ backgroundColor: 'rgba(79, 30, 30)' }}></div>
                <div className="c-theme-name">Theme 7</div>
              </div>
              <div className={`c-theme-item ${themeId === '8' ? 'c-theme-item-checked' : ''}`} onClick={() => setTheme('8')}>
                <div className="c-theme-color" style={{ backgroundColor: '#000000' }}></div>
                <div className="c-theme-name">Theme 8</div>
              </div>
            </div>
          </div>
        </div>
        <RelationGraph ref={graphRef} options={graphOptions} nodeSlot={NodeSlot}>
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
```

### `line-checked-style.scss`

```scss
.c-my-panel {
  width: 380px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  border: rgba(79, 30, 30, 0.6) solid 1px;
  overflow: hidden;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 30px;
  }
  .c-themes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    place-items: center;
  }
  .c-theme-desc {
    font-size: 16px;
    color: #ffffff;
    background-color: rgba(79, 30, 30, 0.6);
    line-height: 40px;
    text-align: center;
  }
  .c-theme-item {
    border-radius: 5px;
    width: 150px;
    text-align: center;
    line-height: 30px;
    padding: 5px;
    cursor: pointer;
    background-color: #ffffff;
    display: flex;
    border: #ffffff solid 1px;
    &:hover {
      transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
          0.2s ease;
      box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    }
    .c-theme-color {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      border: #ffffff solid 1px;
    }
    .c-theme-name {
      padding-left: 10px;
    }
  }
  .c-theme-item-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 5px rgba(79, 30, 30, 0.3);
    background-color: rgba(79, 30, 30, 1);
    color: #ffffff;
  }
}
.my-node {
  height: 100%;
  display: flex;
  place-items: center;
  justify-content: center;
}

.my-theme-1 {
  .relation-graph {
    .rel-map {
      background-color: rgba(91, 5, 241, 0.1);
    }
    .rel-node {
      background-color: rgba(91, 5, 241, 0.61);
      border: 2px solid rgba(91, 5, 241, 0.3);
      .c-node-text {
        color: #ffffff;
      }
    }
    .c-rg-line {
      stroke: #5b05f1;
    }
    .c-rg-line-text {
      fill: #5b05f1;
    }
    .rel-node-checked {
      transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
          0.2s ease;
      box-shadow: 0 0 0 8px rgba(91, 5, 241, 0.2);
    }
    .rel-toolbar {
      background-color: rgba(91, 5, 241, 0.8);
      color: #ffffff;
      .c-current-zoom {
        color: #ffffff;
      }
    }
    .rel-node-flashing {
      animation: none;
    }
    .c-rg-line-checked {
      stroke: #5b05f1;
    }
    .c-rg-line-text-checked {
      stroke: #5b05f1;
    }
    .c-rg-line-checked-bg {
      stroke: rgba(91, 5, 241, 0.2);
    }
    .c-rg-line-text-checked {
      stroke: rgba(91, 5, 241, 0.2);
    }
    .rel-graph-loading {
      background-color: #ede9fd;
    }
  }
}

.my-theme-2 {
  .rel-map {
    background-color: rgba(241, 5, 221, 0.1);
  }
  .rel-node {
    background-color: rgba(241, 5, 221, 0.73);
    border: 2px solid rgba(241, 5, 221, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text {
    fill: rgba(241, 5, 221);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px rgba(241, 5, 221, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(241, 5, 221, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(241, 5, 221, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(241, 5, 221, 0.2);
  }
  .rel-graph-loading {
    background-color: #ecf4f8;
  }
}

.my-theme-3 {
  .rel-map {
    background-color: rgba(3, 149, 194, 0.1);
  }
  .rel-node {
    background-color: rgba(3, 149, 194, 0.92);
    border: 2px solid rgba(3, 149, 194, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-text {
    fill: rgba(3, 149, 194);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px rgba(3, 149, 194, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(3, 149, 194, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-text-checked {
    stroke: rgba(3, 149, 194);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(3, 149, 194, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(3, 149, 194, 0.2);
  }
}

.my-theme-4 {
  .rel-map {
    background-color: rgba(95, 169, 3, 0.1);
  }
  .rel-node {
    background-color: rgba(95, 169, 3, 0.79);
    border: 2px solid rgba(95, 169, 3, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-text {
    fill: rgba(95, 169, 3);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px rgba(95, 169, 3, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(95, 169, 3, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-text-checked {
    stroke: rgba(95, 169, 3);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(95, 169, 3, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(95, 169, 3, 0.2);
  }
  .rel-graph-loading {
    background-color: #f1f6ea;
  }
}

.my-theme-5 {
  .rel-map {
    background-color: rgba(175, 120, 2, 0.1);
  }
  .rel-node {
    background-color: rgba(175, 120, 2, 0.8);
    border: 2px solid rgba(175, 120, 2, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-text {
    fill: rgba(175, 120, 2);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px rgba(175, 120, 2, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(175, 120, 2, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(175, 120, 2);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(175, 120, 2, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(175, 120, 2, 0.2);
  }
  .rel-graph-loading {
    background-color: #f6f1e9;
  }
}

.my-theme-6 {
  .rel-map {
    background-color: rgba(59, 59, 59, 0.1);
  }
  .rel-node {
    background-color: rgba(59, 59, 59, 0.8);
    border: 2px solid rgba(59, 59, 59, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-text {
    fill: rgba(59, 59, 59);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px rgba(59, 59, 59, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(59, 59, 59, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-text-checked {
    stroke: rgba(59, 59, 59);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(59, 59, 59, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(59, 59, 59, 0.2);
  }
  .rel-graph-loading {
    background-color: #ebebeb;
  }
}

.my-theme-7 {
  .rel-map {
    background-color: rgba(79, 30, 30, 0.1);
  }
  .rel-node {
    background-color: rgba(79, 30, 30, 0.8);
    border: 2px solid rgba(79, 30, 30, 0.3);
    .c-node-text {
      color: #ffffff;
    }
  }
  .c-rg-line {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-text {
    fill: rgba(79, 30, 30);
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px rgba(79, 30, 30, 0.2);
  }
  .rel-toolbar {
    background-color: rgba(79, 30, 30, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-text-checked {
    stroke: rgba(79, 30, 30);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(79, 30, 30, 0.2);
  }
  .c-rg-line-text-checked {
    stroke: rgba(79, 30, 30, 0.2);
  }
  .rel-graph-loading {
    background-color: #ece8e8;
  }
}

.my-theme-8 {
  .rel-map {
    background-color: #111111;
  }
  .rel-node {
    background-color: #eeeeee;
    border: 0px solid #d8e6c5;
    .c-node-text {
      color: #000000;
    }
  }
  .c-rg-line {
    stroke: #eeeeee;
  }
  .c-rg-line-text {
    fill: #eeeeee;
  }
  .rel-node-checked {
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease, -webkit-box-shadow
        0.2s ease;
    box-shadow: 0 0 0 8px #555555;
  }
  .rel-toolbar {
    background-color: rgba(40, 39, 39, 0.9);
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
  .rel-node-flashing {
    animation: none;
  }
  .c-rg-line-checked {
    stroke: #ffffff;
  }
  .c-rg-line-text-checked {
    stroke: rgba(255, 255, 255, 0.3);
  }
  .c-rg-line-checked-bg {
    stroke: rgba(255, 255, 255, 0.3);
  }
  .c-rg-line-text-checked {
    //stroke: #ffffff;
  }
  .rel-graph-loading {
    background-color: #111111;
  }
}
```
