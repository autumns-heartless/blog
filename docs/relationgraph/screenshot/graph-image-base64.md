# 获取图谱图片的 Base64 数据

## Vue2 版本

### `graph-image-base64.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              <div class="c-button" @click="generateImageBase64">获取图谱截图的base64字符串</div>
            </div>
            <div v-if="base64String" class="c-content">
              截图：
              <div class="c-content">
                <img style="width:100%;" :src="base64String" />
              </div>
              base64：
              <textarea v-model="base64String" style="width:100%;height: 200px;" />
            </div>
          </MyDemoPanel>
          <RGBackground>
            <div
                :style="{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `radial-gradient(circle at 51% 46%, rgb(149, 176, 249), rgba(149, 176, 249, 0) 50%), radial-gradient(circle at 10% 10%, rgb(114, 226, 253), rgba(114, 226, 253, 0) 50%), radial-gradient(circle at 90% 10%, rgb(184, 150, 255), rgba(184, 150, 255, 0) 50%), radial-gradient(circle at 90% 90%, rgb(86, 207, 210), rgba(86, 207, 210, 0) 50%), radial-gradient(circle at 10% 90%, rgb(168, 112, 253), rgba(168, 112, 253, 0) 50%)`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'repeat',
                  backgroundColor: '#ffffff'
                }"
            />
          </RGBackground>
          <RGWatermark position="br" width="200px" height="130px" :forImage="true" :forDisplay="true">
            <div style="width: 100%;height:100%;border-radius: 5px;padding:10px;background-color: rgba(255,255,255,0.3);">
              <div style="text-align: center;">
                <img style="width: 40px;" src="data:img/png;base64,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" />
              </div>
              <div style="font-size: 14px;text-align: center;color: #ffffff;background-color: #f19304;border-radius: 5px;">
                Relation Graph
              </div>
              <div style="font-size: 12px;text-align: center;color: #000000;">
                https://relation-graph.com
              </div>
              <div style="font-size: 14px;text-align: center;color: #000000;">
                {{time}}
              </div>
            </div>
          </RGWatermark>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
import { RGBackground, RGWatermark } from 'relation-graph';
import MyDemoPanel from './rg-ui-simple/MyDemoPanel.vue';
export default {
  name: 'Demo',
  components: { RGBackground, MyDemoPanel, RGWatermark },
  data() {
    return {
      time: '',
      base64String: null,
      graphOptions: {
        // 这里可以参考"Graph 图谱"中的参数进行设置
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'top',
        defaultLineColor: '#ffffff'
      }
    };
  },
  mounted() {
    this.showGraph();
    this.clockTimer = setInterval(async() => {
      this.time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    }, 1000);
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'Border color', borderColor: 'yellow' },
          { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
          { id: 'a2', text: 'Plain', borderWidth: 1, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
          // 除非万不得已，否则不建议使用html属性，你可以使用node插槽，让节点展示为任意形态
          { id: 'a1-1', text: 'Text Node' },
          { id: 'a1-4', text: 'XXX', nodeShape: 0 },
          { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
          { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
          { id: 'e', text: 'Rectangular node', nodeShape: 1 },
          { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
          { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
          { id: 'g', text: 'Css Flash' }
        ],
        lines: [
          { from: 'a', to: 'b' },
          { from: 'a', to: 'a1' },
          { from: 'a1', to: 'a1-1' },
          { from: 'a', to: 'a2' },
          { from: 'a1', to: 'a1-4' },
          { from: 'a', to: 'f1' },
          { from: 'a', to: 'd' },
          { from: 'd', to: 'f' },
          { from: 'a', to: 'g' },
          { from: 'a', to: 'e' },
          { from: 'b', to: 'e' }
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
      });
    },
    async generateImageBase64() {
      const graphInstance = this.$refs.graphRef.getInstance();
      this.base64String = await graphInstance.getImageBase64();
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy:clear timer');
    clearInterval(this.resizeTimer);
    clearInterval(this.clockTimer);
  }
};
</script>
<style scoped lang="scss">
::v-deep .relation-graph {
 .rel-map {
    //background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    //background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-toolbar{
    background-color: #ff8c00;
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
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

### `graph-image-base64.vue`

```javascript
<template>
  <div>
    <div style="height:calc(100vh);">
      <RelationGraph ref="$graphRef" :options="graphOptions">
        <template #graph-plug>
          <MyDemoPanel>
            <div class="c-content">
              <div class="c-button" @click="generateImageBase64">Get base64 string of the graph screenshot</div>
            </div>
            <div v-if="base64String" class="c-content">
              Screenshot:
              <div class="c-content">
                <img style="width:100%;" :src="base64String">
              </div>
              base64:
              <textarea v-model="base64String" style="width:100%;height: 200px;" />
            </div>
          </MyDemoPanel>
          <RGBackground>
            <div
              :style="{
                width: '100%',
                height: '100%',
                backgroundImage: `radial-gradient(circle at 51% 46%, rgb(149, 176, 249), rgba(149, 176, 249, 0) 50%), radial-gradient(circle at 10% 10%, rgb(114, 226, 253), rgba(114, 226, 253, 0) 50%), radial-gradient(circle at 90% 10%, rgb(184, 150, 255), rgba(184, 150, 255, 0) 50%), radial-gradient(circle at 90% 90%, rgb(86, 207, 210), rgba(86, 207, 210, 0) 50%), radial-gradient(circle at 10% 90%, rgb(168, 112, 253), rgba(168, 112, 253, 0) 50%)`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'repeat',
                backgroundColor: '#ffffff'
              }"
            />
          </RGBackground>
          <RGWatermark position="br" width="200px" height="130px" :for-image="true" :for-display="true">
            <div style="width: 100%;height:100%;border-radius: 5px;padding:10px;background-color: rgba(255,255,255,0.3);">
              <div style="text-align: center;">
                <img style="width: 40px;" src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACNCAYAAAB2S9JvAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5wIbADQIj7x5oQAAHk9JREFUeNrNnXn0X0V1wD/zzU8IGiBJQwUEC8QAZZFFIIiooKVaFFQOFrUc3Cv2VLFU6bF4jgsurVaxYrUu7VFQK4igCBaMFkGtUjcErEYwIFaWsEgEQglJpn/c7/Jm3iz3vvd+0OvB/L7vzdztzXLn3jszbt2Z2wIO8NTBAX5v4DDgScAuwA7AAuAh4DbgVuCHwFXAj4FNCsT9wY/Z+38HE6Zq+i19Ay2O/jAXEsoytRA4HvxJwFPHv0vwcmAj8CPgXOBs4E6N8oQDu+DOOWM9bSfoW6frR2zS8oVSablzz2swUjB/LHAFuHOAo6g3hgnMAYcA70caxuva9NrKCznQd3m78F2GlPnoobner6OVk7tLY8BnP5ADWALuo8CXgUPSClQrdGfgQ+C+AvxBlSujUrrD/A/BDy8PrvDG1es5GKU/st8V3EXgTw7fx43Ct5EWmfFHg1sFHDqgFgZQ2CNtfLiGjuJ/++CaQXnEmL0bTX40PtoTgMvAHx4Xzs+h5bk1ZMavAC4BnqIRbljwxuddwSV5z/dS39BRyW6o6cNHuFIY8g3O4WZTxhjJtsBngBV6JmLmVR9xKXA+sJce7yMJLvN3iW+feBrrqZ8N46r1XQZD2IEneDy+ZUO8F1iZY8Il/qoxXWBye+CfgC11yih9FKdUkE15s+d9Gmbpw2uX+rnatfrx+7QB68MpYwpHAa8KK7pMxT4KCuoeAby+JnhdUK9UkAXnhKdu1n+9jmZK6NsYUzTL+CYNYkvgnbPfQ3x4NZwG7FynVXpfb0zdRg8dTVe0FyzT6RCNryC/D5+kYNIgnoP4DFSobc+rilgGnNxFRAud/Oihlyf88D7x16yeTy7TfaqCUUYMOFyjuI/QpUeoSYN4qZbFbpZ6lfsXIwZtRbzcktcyomU+koLn9Edulo2H+Axu9WBVkEeFw+6sGyHxiCP1lboMvVUrfVckPlKk1c9G6MNz87em4fddLj9yfpER4iTaOmTHwpB1WZqzfFMNQtnjfeqpi9A0P6hmGWmZzzWjToJOFuVQDUsLMzojErbDpCe64vCoUZSGkWn9g2rMpiGeG5tzePNRrlH25V+LI2FcFkRzpFYY89VAwmXnbvliap9CWu6qIEHh5eC2UiIs8GN2kvWAro2pZuDmIpVtZ9JwIPhGiNewI6HkWK0olxyyl4FfWnhfI0L30atGo/Q+Xa7fMrfOtx9s9Ain0jlgUZ3Q0MZccsj2Dud8/n3lWcxv7t9ePFZ00lyK6mh1zVsAfg9ZEOwCPAa8Ax4Efg1cD6y1ySkNYw7PhnLjGjo8m7ekPH6TsU7iva/8O4SMMT0rj83apuSWHYHnjf/bB8lWS6Uw3Ab8HFgFfAW4VivTHM7dXp/TuigthaeI47fAPXbc3fjqlmlUHxl0uihHkBP0lyMu/hOAxyqIbD/+7wjgLUh0+QPAd2sVR+DX5F/7xn+xUIUqWTzx+wDPbcADSoT0NRi7ZRp50+OyEyv+7XII3gDue0iD0DSGGLYCjgcuBz4ILCkVHgE/mFHXKrmrB80l3KfTB1fX6ZaSdeYHXNW4LLFh8aC2GsbjgS8CZ4Jf1iZkln1L4BTga8B+uUIjcFcB64WlnJKHCivnhlsHcKVeabPfbhpenp9sKJ+0T3J4u9OKgmErgMuAF+Tlt05TU94OAr5OyzstZSZTxnfLAvVpKBoPn79lzKQZv89Oa10UZ4G+tkS25u8DFwB79uMv7ogBb8vGNA6MuRgBmx3us2HFWgBHq4Bord4qPn1wHmJU5tVUpaTvncM7dXJyW8CDZKp/HNhnGL9Csdxi4FPI8nVafrJkOQ/46QxhydDpspb3JV7vRzKnIpq2ZFPLWr7bur+nw06H8xRkSWnAYaUdfIR9gfc1347GCrofWZ5Qn6c0hk1FeeHrfwRuaNN8WJN0FHwPz0cUYlkOnK7jxUqnOKq/FHjW5EfTqfElZAiZIpn8L6+YyrxdiWs4MWjP6CbYfEDaL5HjP8elnloQmHsDwZJwuOV2ZUQcIYPBaGxUBhbo3wA/mSCZ/K8zY8WosMPjHwA2ajOQ9UN9HPom/7sik7choDzdZmFHxOk0rjm/I1UC/2HA08ZGZWCBrgX3QsQf3kWwgkAuGiM9iCftA5rkTxs0DGNTB89NkalpsjZd5uVJ6OcYcNslQ/cBD8OMkImONQJeOPkjLn49cDRTI9OallYP3UbwOuAvB5HUwKMeciOEfZnrkh/cARwddoq40dWW1lq5i3AEsP2oXd0BXIcYGhfqFNU74eR9wDPVpWsZUkGhVI9VZjRNi/ebz1225wP4xcABad77hO/Nsj4B2Ke1t7PB9G+A44DXAL9UctZVgIXIkQEr7NVDZU+UH3r+CsO8b/2h1F+lTlCqWG451RiFyzy1ZGw16yTLbwEcOKpbs+7jwMHAXyGHgFiGgBuAT9KKYmZDu58myu+sKyYcfifKT7uctQk9tUJ1r61TlBnDMuRjKGWcleniT4mnq4jPx8/VQ7oexIv4QXBngV+JWKWHIgGYHUUgtxn8WuB25ASZbwPfAtYBV+I5e0Y7GwJ+MvBhstsCcunuOcVpQJM4E9OtR38NiUaL7TLMRkNfnBLqckUlRnN1JQcINgH/Of5vAkuAR4HfjIwEGxMVz8GxN7KspZ1UEtA9CVgNvLumEDukZOyaRWXFMbxjy/fip9mgZnoZzV52ht8iy9U7STeGCfbTkewdDdPvAJ4/nOq0iuqztOscbV2nx2+lUaYd7tV1AJtH7Zc1tnIGTpk0cvjYK1Glc7FgbLvsq6XQRSFpPgeMIfjM8xDuJtuRYsMxNz30GSmC6eW2kaJGRMKeadRoRHcgU8JddSb9dkgUNojGhULU5H844yAZMepwE9IoMiJp7ZuuMK2/GbgmahAdemGGn+ZIEgl1NbiTxwwkyzdsjH3BfRI59rBC1BXYd0uAnYD9wa1EDOKVSObQbmTSyvSxk9qysAh3ANdY8NrL1HE43P8A184VjDsFI378HdrWbn7fgAf8+cBbwZ0xodmmPOXp+cDbgbfoDF/nwO+O7Eg7GNgP/M7ANsBi8AsaeDYheZx3IO761UiD/Q74//Zy9mZb5iyv8VPVSsMjqXJ/pKOlo52qn1+VeDx8A7hxbog5c0YkJURqqeYA/04He3nZ+V0T/nRwq8GfU+Bnb+B54J8DPJFov0mojCmtBeNyi5ANx08bv38QWA3+68C/Mc07HWx4bsJS4Onlsl32xqS6WBHn5wGcnGSrg3qKepMRJy7fbDKxBzkCYBXSk2twL7ijwF8VPX828Orxv4/WSGFclj0EfBNxsF1AxQAsjwot2iuBj1FIes37bAbdQPV94HBgg8morKeoR95BNxEgVRaQJddJSAp+QhFB3a3Bn404wkBiH98A/h1xsSsaQ0BbK++jgKPAnYs4205gegKwRj+RTmY//wLpDIbG0MQ3qMH898AGUI0Qg7bEHPwJcBFTRRd71SrgZ4hC59Lo5p3nVcBp4K62O4FYDJwJvKwfCzMZBTeEI4daB+czDn2DY8Gbn609qTjHVF4Bhjo3APcBz1LECZYjQ615yTwgLAdegvSq/wKnbX2HAF9AOkBFP5Ys91oebBbWAH8K3Dupq192evXD8Zu2hduuE6TTnQn8S9oBY83J6FMmXzdq5Nsg53h/Fvw2CgSvRUaWA8rFSlOCxgHVjO4W5f8d8ArglmZdzeHnCVz2QrX5dfz+FFQbdmpKqZXpMrJl0wlPAC5GdmGnYClikH4EaUQKSLmpbUk9lcNe7kNWd1fEJUZ2YmVGesL9wMvB3Vgu1jX7qcZnx635nqcicZrlM0wOZJfUKjyvzPOfRLgG/J8TfLB6hDVkKSvHzYgR/tWIV6B1LqUWrB/B1NrXgD8J3F35nIKhDMZiFrCeZ3m1D3ABuMcJJv9qZBV0YLtqMYvpEmSb3SeA5wIfQs59iHjopIMLgWcgB9A3MM1wNaKduQSPvpt1UuWr9b8N/gflacY1/j9+rW2wQ4S+A3ji2Av7CWQHlnKKgHFqwSTKe/P44X3INPpM4Kskz89QwXeQqe044JcpWSZ7ZJ32iqUeJ52YcI3fvQr4ZzwLqumC4fuNSG+yZtE+iiBrqS7BsKOUvwlJNr64Qu/JwIuAZ4JbDj63RHzQ4W72+CuRZeVlWobdujMXdxQupxSLspJlD0AMy0VKJCBbES8AbkScXQsMdTcjTq2dwI2A3cHvDzwD03kM2SywGlwK7rXjRqGltXAcr1nOLDjnkGOE1iKnx/wCsckqfEZv844p4wcvrXb0Cl0I7pvjND0NbATeiGwHVFJRjHQiyw7AiciOqh2riFV6Cp5tBv4OCdxtsOOGoTpyUycjXaWUMePaVTpBINwbDY0BxG2taAzZUHyp+K3I9oDDEC+qmsZMnqzReqvDHY9kkW1I4anv3lI0aiXPuesRAmyuatEONYdO8ewMnJpiuPDsUiMNJQQ0foXM2xe1ygRofeLPJN3LgSM9/sISrxOntJLHxOumLyP3Ldv+iqz71xfngG5+gErCyJtoJapUlfybLDZDD1FUfgDJBP9ZUMbFeFxNJe9Dbh5YreMh52DSZorXAmHx9Nna7NtluWaJHmZhV3AvTwueU7KDlPFocumbRo57kF3SUSVNMMmtRQJIp9E4WM2V64w5LI/O2phRehe7j9555uwfN5H3oM7ayeI/Cfyidr1auD1BI5R7S+Qsx5Iw60jkNKZS1JFp4zqC5N9UL4wjkf4mZPkXSdB3lTbD0TaWaxlsM9ma7zLh4zTS9DOtUNlni4A/qyskd+tv0bu4H/jLSgWQpdnPkVNsLmgrMMC/EbFb9qUIrRjNQYj38fKJJLU9FVZPR9lYbnbicsrkaKbqIUFrhHqAw8GtmDGeD8zYD2P3c0j+Qe6/bZEl5TOQvMbXK/D+UEc7eD6icaKcRo7hzrIWitrEmsmRQkXmdJBzcVfrn5C3qS20kzkBPl8++fsM4HFpOSb/uBtoJd/mSAX9/FnknG1egyuHf8jO7DRJJj74p1puirrtPEn0/EVME1tnDdMHOF1UP9fwLLZQ3HCmv7ehdBW1A+Q8rs2zj1FacQV2xQoS6XIOV/mmtZhSMVBmBG/IOnLVBxHq9uiQCKksR/ZLJARt/z07k7ImcNfglodov0gCtgYWzD6GtiF6BxwSF9FvxJmPCG9bT6NyBQ2jpTrtZU30/kngDEElMngs74vyTa4WKNlVu1M1xrO0D2r6LtzAQ77uvIhUdlUrHyJXQQvlYatwZdMeaXU4JStVT+aojSdrrP0SSee/q8lzAjRbBnJ62hOJrFLq+eWzJfI9vJstGI5yc2UEfYYpn3jSerZrcR9DvFpqlakaX+uBnxY64e3I3srvIccy3lERaktk/0dHcI9DDjK/daaPtp7LG2oM32SMvulTSS/dZ9BoEMXU9wSDuaRZdQh4AVP7IVwbt9bprqaULJ2f0LpkLii73hiyfjGwR/EjFHH4bZGkmVtDWYp1MjLnnjWcYs4RHi1Zt1jm2si1I0PvMnNMN9fovWpp4bPJNpuB9XlvnonfPSgeYqKCLZjuZm+S9QVTottIXZc1jbeDDdFZoURSz9HZOGvSK2d6N5XSI+NrL3CXUHaDhzpIkxoBS2ypAzaeZ+N2Wzf1CHbXzS4tXNq08WD9vxWt85W6KMbbq9jgJcA3wC8PH9fCzyWuvLlSunTbF2KLZ7Sh1UNVGUWqLOISeBCD7x6SnsGBoOrwyfK9E+LOPhE4qiBDhFGVd6pQrk6fld3cBtyz560GYSfSFdwm8BsN5UkanGZeY7sjWW9/ZFf2wna9PD1FY9jENLKaojvsqk5fpku0M5iStAkaKZh+kA2YbuGbuLVNU8cK4G1C1d3t8deC/xqy1CzUcxeDPwbceeCXpMupVzpNaMg8Xx2txEudR71RFwy/taVSiRHfRHL7/KnE4fHb43mJZLtN6d6BpOp9Jl/bA+7r4F8D7nPjqGkvbsZy303hPKmBaJD/PvXvVjAqawaOLVrfxukAd/0QrtuUZ2/cADYmYjDbAecQbMdPGcUe4Avg316jXtfH9N3NVA9cs0vfpq/xa6Sh0CByeQlNJspM1i5fcXCN3nVb4tTisp2WPQvcwQolvYfGPsieDfinJIJnZXmr7vkEHl8sV4LiZt+polXx+vb7mpHl8T8Btz5L16S4Mi8xJmAR+I8Dj0mXm9LahBxOslZnCBZ5vJr8aGbg3ytKdlsQKDb7OsWo2LnXrAG/ulaofL1AvXYbpnj2B05VJPf8Cjhd1/OyPD4EXNXdmNRkiHeMeTRAcWCIL7/uQRxR0pUV5H08jBreTgW/QlH3bOQ2gArarBzXMr6+Sgsaz6IGiyWzKn1gSP+wcyRWkZkvAJvrQ691FKqXH/O1GHi3ovwGZNudKKjYOZIvLyaZepcH2x1jucyqVCJPHtJGpYv+UOHKW7UVwb4P/LhdzZd/pxlu8eOKI88Ujgd/bB7XFC5lnDmd5iJb90FkQ3IvcMVpo0tmVSVjKrsq6O2qLsIGZDgmaOmmAcIX3mgNNvce5OjDQnnnCS6drdGaMr2K6R1mGqgY+YNBJdqZuBzsYQAHcgbk2rrRZubJcMCG3wvZ6d2iEy3nLiW4eFaVZBvdXDykj4fxDFboQQZ0RT/EwwHj9cPtyKFclOe71vPaB9++LlKgyL8G/jCebqKeeT9ysm0CaXLYvgIZIRrvBl5puNTooVkMtOGRPOtR2J7aBu4sYI2ae6lWi5Tu0vzhXGUVJRt3/mH2Jvvh7g1/ZnvjRmQ/6Kbw+3QZfS3Bu9Lvcnljg+iaJewUr/zdwJsL2U+pesdXaB3b/FG+n2r6+2hwryiUWUBwWHmUUhii+zTw7Xjh0c0WiKfz3IfXRFDzy1ljg2gMdxGdga4nPg/4nAHDkcgJMqmSb8dyF2go4weBYxI4FwDvAg5sv2tx+CtkdEgkSJVsJM1yOUWvS2wpgVt3Gn4pn1FT1gQ7IJe87WKo80XkOL87kWH/Rcg5DH1gI3Au4j+4HznQ5HjgSEX28mZwx4H/ck8eIuir23r9oEF0O2luiCSaFo4jkQ/xaDt+N05a7RKe75N1FJR5B/i35ut11dkQ/DWyshPfOzgwpP/c1kXAEMc4T/By5EZh3wl/ojGUN7/UnTqz/MUqP59Lh8z7xxnaclSN5GLZ1Pce9VsG1dkvg8888SAJLG9q4tFZ5z75KBBe5Zp3EYpYT0lX8VeQmwc3t/Fp9FHTYez11X238KSaaj6EyyAYQqCuI86UzvvBnT5rJlr3dWzx5tLeS/4ObYrgtNyXkaTc/1WUheKIZdVhedSwjPyjdC/NWbBd1sHW9xM60+H83cj0kTmE0yXqpPANDQGtf0V2df1OX1+f52ADS8wnGcsY2kVtTb5VfcRzkbT9RJlh5uY0VJfSG5Drq19J4zCxbvj7fAeNfyUslzvwbKRXYkSgp+7LW9dbwrwM2M6G1yBL9llRyGuRm3Hem6+fep6b2kyZVwqoZqslnyfuuIqZymTyGvidxQSa/6+OQm4F/mS9GkpyxHsyiJ6pVhH3AB9GbtO5J8VzeAdWMS6S1ZgqabY0S5rwz8BwCp3FORVj6bPm9scCe3YRuy1Hed5urtATBuB68J9HLlC7zirvrIHkPnZpJZDRX+dBJP895vQfOqfMno6pbCv3IK7i1yqw/AdydsNTOjmyWqNWUP9m4ELwnwKu7i9oH4PdLlPS2ZjUudSZM33oJKJSY1J8nHIrPxx4akX6+5BVyA3AEeCPQWIYe9DYihcoJpCjxatHdnZdjqTfXwH+Tt2HqEHJaTRkg/CNvxLfMt8BS1NGgkHX/DN/j3RTyJ4Xr7yGegDuYmYJK98c/7cFchbUfkggajcv939vCyxkdvreRjz34LgLyf6+DrnW+efICbfzANrRV4+rquPi+RMhPvWNOhrh6ldBm2jsCfxIjMqs0jYiu7S/pcC3wOEWefwWzBwYG5ER5kEdr3Y9NQ3MIW8lmi8YjxAKizYJPvpVahxmRbwa2KpS70rk+mUNbPL4dbopTRcc0mnIJ//WQ5egWPcpSHGCjMGUDcIF9p7UgO2Qgzpq8FHGGYWdmDQrzRr3sTqear4Qa0et02/q3WE5yVYlf/cgjg+FOBHYvpg4KndXXJLnsWuirpZ3DX5rz87HOuxpdzHNNP2whJcpo26UaPWkXUI5wO8A7I3YCrsgN+B68OuQqwopJo5K/OCBCGdVAXbXugX/kLGUsDHZMXQZTcYNwtda8nDhjgXAc8C/CPOtd4EMa3F8tpsCxgJlkmjqq6e4dNZ/EeG08hjTnW9jNFh2luIKM7F6Wt7HIfkNh9pxtNbRn3K4W/NKruGbmB2aSG+Oo8kZkHEjansibVvy+hieue+oxzuXRpBRYva5K5XbAQkAnWjBHSq59f7qco+b/6VdfvVQmuZSbuqUy9raMGqjiCkfIgVdEmFCC3xsBB2G3H99oh5XIwiUl+OjyN3aanz9ZexWL72DuxblrCXSdIW6oTqXq9avjzk8/ggkG3qprW7KxdriaFvkbu0tkcijDl/yuXVtH9cr+wn6O6L6eTFLuFKYoxNkSiFa01r/AGSb/1J7XVNewoeAV1CFIfaM5Jx3Wj9BKQfDKXFk8Pj4fb6R186ciE6Q0eYoFGEJsmNpWb6uJgNapRSHjBCHlssPa1OYB/FpzGwI/mKbzUUMlZ1nkb+n9XfShujmBJnC2zDcWqdXSrM3xQk0fITpQepWcIp3qQzsIUiYGr+xXg3SI9soXdTK6LT8IUiEsiJD6C61CZCcFw9AYh89FaOlqYUhvJ6+UqbrMjV+Is967P5OMnIqYui1ibt03X7XEQb7J04BFvff+zAkaF282mX/UCumRiObpojIH6NWGRMEjOyO57nt91qlmJJuE8KxK3I0UBdB9GBGb2vwZaNPo5tao4m2LkTFR0U8PsVklsHn4iZnPsbv+zi+Su9az1+QxzHESgNlZ9TS6repZoYvZQ+4RLm4vGuVmzaI5Ed3aiYd8MdGSTJoas+KX+Rgh8tcclKaix/evSn12/Nc5t+heGjSD52JUz9EJwfKrMpS4Ikt5nsPr6lnfsp8ArbzclaUkoZlqTsU1K9xnv1STLc+jUOvg+ZTrzzJtv7q8Uwjl7VkTgP+oJR66WdI2a/Pya5XL9XSLHk3236FQBcDD25DJcg8Voer+5raMIJVb+iJs4RK/MQBtm7nQ9X5KOoqEj2ZVt+1U0dgWHaGBkgkzNb1unmmh1HytCcvrJXsk+c4ZJJs+ZB3w0hbVZ8p2hlbmqUVRVaRiazlHENtI7GfLyKm4Wt3dw8AfTy5Ll8/8gnMD8/lZekov2wxCRrdiFsyhjRr6z4KccoLSvqMSrXVQal8LtbgMscmWmSoL3dd5X3PfIipYGuBe7VRu9wUkT/2x5L57W/MyTDM6fIafXQb4WwjQ8rpV69fozHKVSuz0hL4FuA3fQ3EfC6jLyFrwiYc10/UFfM6TBMYyhXdF5rG7nCGbodYRtJn8QByqn0HcIU3itEhfH0jsFrUNEmy00+HrsrLBMd8xT666msonoJ9GbXEi/bDiZLG/16UZ7gmULpch0zlVcjWvE7KKA2n1cz03vJqy89nHqmvjBCu/CLqhauAG+qMaYzKTgJuJnMKrn2YrxhnJta6xCZy0H0U0C7tGw0i57VLWbJJptchm2eKAth8DvkgTAIuI7vPc8iPomGlOwx0RHSipq5uZZURG3TV/RMfAzHqcgKEt9Zr3dZVZWwAzkjLoKegf94NNJ2h/uH6ZH3XwbjKqE4HdwOn1cnaMpEUrfsjwHdtvOoo26G00u83HTiz/aKnOUDGVBa+hBzI1UP4wFgt1HMgDeEtNhZznlRlbEGFy8JHGF3JQfnsDavMIa9RxpQCoVpOB/C3yMmuGRw6w7O82dcB/tfAy8Ddjwm6jIBdR83S5pjZSFnbH1rGrVl26ozmkXoZ5erIGoQ3IOc7nF/QTU/wa4DnAb+wD+0d8y47zUK1jTvGUcnnfvhEbXti7kg3XKaQVcuvRxrFu1SC2j7SZcjBYj+2VNIopFhnXlYX+WlgMnEGhC1efFN+asuGSLXcxHKvOuwH5R9C5vdjCG61LQW0ihL/FpmOjnG4mzRKGTJ/QSHvgDCZRiquezOfsZ7D54WrnjPMFBOosj3/YuAIPKcC19QZbjXGW5ADQ1cC7wEe0hpY6asnHW2FaBUaQ9+PpUk9GAJy9liUjTW7USdlS1iWOeqyWwFPQUaNlUj6/DJmjdMjp8r/Gjko9KvImZG3aWkOd9qbVib7cjDPox3XkHK6dWcu7slATgCNYO6x4HcBdgK3Nfg5pDGsRQ4PvZnWZSQxbhWdnjJatBG69c18ebBdD9WNy5zD8f8Awt5+/azgKQgAAAAASUVORK5CYII=">
              </div>
              <div style="font-size: 14px;text-align: center;color: #ffffff;background-color: #f19304;border-radius: 5px;">
                Relation Graph
              </div>
              <div style="font-size: 12px;text-align: center;color: #000000;">
                https://relation-graph.com
              </div>
              <div style="font-size: 14px;text-align: center;color: #000000;">
                {{ time }}
              </div>
            </div>
          </RGWatermark>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed, onUnmounted} from 'vue';
import RelationGraph, { RGBackground, RGWatermark, RelationGraphComponent,RelationGraphInstance } from 'relation-graph-vue3';
import MyDemoPanel from './RGDemoComponents/MyDemoPanel.vue';
import {RGJsonData, RGOptions} from "relation-graph-vue3";

const $graphRef = ref<RelationGraphComponent>(null);
const graphInstance = computed<RelationGraphInstance>(() => $graphRef.value?.getInstance());
const time = ref('');
const clockTimer = ref('');
const base64String = ref(null);
const graphOptions: RGOptions = {
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'top',
    defaultLineColor: '#ffffff'
};

onMounted(() => {
    showGraph();
    clockTimer.value = setInterval(() => {
        time.value = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(clockTimer.value);
});
const showGraph = async() => {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'Border color', borderColor: 'yellow' },
            { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
            { id: 'a2', text: 'Plain', borderWidth: 1, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
            { id: 'a1-1', text: 'Text Node' },
            { id: 'a1-4', text: 'XXX', nodeShape: 0 },
            { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
            { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
            { id: 'e', text: 'Rectangular node', nodeShape: 1 },
            { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
            { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
            { id: 'g', text: 'Css Flash' }
        ],
        lines: [
            { from: 'a', to: 'b' },
            { from: 'a', to: 'a1' },
            { from: 'a1', to: 'a1-1' },
            { from: 'a', to: 'a2' },
            { from: 'a1', to: 'a1-4' },
            { from: 'a', to: 'f1' },
            { from: 'a', to: 'd' },
            { from: 'd', to: 'f' },
            { from: 'a', to: 'g' },
            { from: 'a', to: 'e' },
            { from: 'b', to: 'e' }
        ]
    };
    $graphRef.value.setJsonData(__graph_json_data);
};

const generateImageBase64 = async () => {
    base64String.value = await graphInstance.value.getImageBase64();
};
</script>

<style scoped lang="scss">
::v-deep .relation-graph {
 .rel-map {
    //background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    //background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-toolbar{
    background-color: #ff8c00;
    color: #ffffff;
    .c-current-zoom{
      color: #ffffff;
    }
  }
}
</style>
```

### 📂 RGDemoComponents

#### `MyDemoPanel.vue`

```javascript
<template>
  <div
    class="c-my-demo-panel"
    :class="[(closed ? 'c-my-demo-panel-closed' : ''), (right ? 'c-my-demo-panel-r' : '')]"
    :style="{
      '--my-panel-width': width,
      '--my-panel-top': top,
      left: right ? undefined : left,
      right: right ? right : undefined
    }"
  >
    <div class="my-footer">
      <div v-if="closed" class="my-icon my-icon-open" @click="togglePanel">{{ right ? '↙' : '↘' }}</div>
      <div v-else class="my-icon my-icon-close" @click="togglePanel">{{ right ? '➡' : '⬅' }}</div>
    </div>
    <div class="my-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    width: {
        type: String,
        default: '400px'
    },
    left: {
        type: String,
        default: '10px'
    },
    right: {
        type: String,
        default: ''
    },
    top: {
        type: String,
        default: '10px'
    }
});

const closed = ref(false);

function togglePanel() {
    closed.value = !closed.value;
}
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
::v-deep(.c-content) {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  padding:6px;
}
::v-deep(.c-button) {
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
::v-deep(.c-link) {
  color: #167fb7;
  cursor: pointer;
  padding: 0px 15px;
  &:hover {
    text-decoration: underline #167fb7;
  }
}
</style>
```

## React 版本

### `graph-image-base64.tsx`

```javascript
import React, { useRef, useEffect, useState } from 'react';
import RelationGraph, { RGSlotOnGraph, RGBackground, RGWatermark } from 'relation-graph-react'; // Adjust import based on your project structure
import MyDemoPanel from './RGDemoComponents/MyDemoPanel';
import {
  RGJsonData,
  RGOptions,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RelationGraphComponent
} from 'relation-graph-react';

import './graph-image-base64.scss';
const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent>(null);
  const [base64String, setBase64String] = useState<string | null>(null);

  useEffect(() => {
    showGraph();
  }, []);

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'Border color', borderColor: 'yellow' },
        { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
        { id: 'a2', text: 'Plain', borderWidth: 1, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
        { id: 'a1-1', text: 'Text Node' },
        { id: 'a1-4', text: 'XXX', nodeShape: 0 },
        { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
        { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
        { id: 'e', text: 'Rectangular node', nodeShape: 1 },
        { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
        { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
        { id: 'g', text: 'Css Flash' }
      ],
      lines: [
        { from: 'a', to: 'b' },
        { from: 'a', to: 'a1' },
        { from: 'a1', to: 'a1-1' },
        { from: 'a', to: 'a2' },
        { from: 'a1', to: 'a1-4' },
        { from: 'a', to: 'f1' },
        { from: 'a', to: 'd' },
        { from: 'd', to: 'f' },
        { from: 'a', to: 'g' },
        { from: 'a', to: 'e' },
        { from: 'b', to: 'e' }
      ]
    };
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  const generateImageBase64 = async () => {
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      const base64 = await graphInstance.getImageBase64();
      setBase64String(base64);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <RelationGraph ref={graphRef} options={{
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'top',
        defaultLineColor: '#ffffff'
      }}>
        <RGSlotOnGraph>
          <MyDemoPanel>
            <div className="c-content">
              This example customizes a watermark with a combination of text and image using a slot in a regular div
              element.
            </div>
            <div className="c-content">
              The foreground watermark can be set to not display, but it will still be drawn in the exported image.
            </div>
            <div className="c-content">
              At the same time, these contents will be drawn in the final image along with the nodes/lines when exporting
              the image.
            </div>
            <div className="c-content">
              You can click the “Download Image” button in the toolbar to try it out. Or:
            </div>
            <div className="c-button" onClick={generateImageBase64}>Download Image</div>
            {base64String && (
              <div className="c-content">
                Screenshot:
                <div className="c-content">
                  <img style={{ width: '100%' }} src={base64String} alt="Graph Screenshot"/>
                </div>
                base64:
                <div className="overflow-auto break-words h-36">{base64String}</div>
              </div>
            )}
          </MyDemoPanel>
          <RGBackground>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `radial-gradient(circle at 51% 46%, rgb(149, 176, 249), rgba(149, 176, 249, 0) 50%), radial-gradient(circle at 10% 10%, rgb(114, 226, 253), rgba(114, 226, 253, 0) 50%), radial-gradient(circle at 90% 10%, rgb(184, 150, 255), rgba(184, 150, 255, 0) 50%), radial-gradient(circle at 90% 90%, rgb(86, 207, 210), rgba(86, 207, 210, 0) 50%), radial-gradient(circle at 10% 90%, rgb(168, 112, 253), rgba(168, 112, 253, 0) 50%)`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'repeat',
              backgroundColor: '#ffffff'
            }} />
          </RGBackground>
          <RGWatermark position="br" width="200px" height="130px" forImage={true} forDisplay={true}>
            <MyWatermark />
          </RGWatermark>
        </RGSlotOnGraph>
      </RelationGraph>
    </div>
  );
};
const MyWatermark = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setTime(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      console.log('beforeUnmount: clear timer');
      clearInterval(clockTimer);
    };
  }, []);
  return <div style={{
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    textAlign: 'center'
  }}>
    <div style={{
      textAlign: 'center'
    }}>
      <img style={{ width: '40px' }} src="data:img/png;base64,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" />
    </div>
    <div style={{
      fontSize: '14px',
      textAlign: 'center',
      color: '#ffffff',
      backgroundColor: '#f19304',
      borderRadius: '5px'
    }}>
      Relation Graph
    </div>
    <div style={{
      fontSize: '12px',
      textAlign: 'center',
      color: '#000000'
    }}>
      https://relation-graph.com
    </div>
    <div style={{
      fontSize: '14px',
      textAlign: 'center',
      color: '#000000'
    }}>
      { time }
    </div>
  </div>;
};
export default MyComponent;
```

### `graph-image-base64.scss`

```scss
.relation-graph {
  .rel-map {
    //background-size: 30px 30px;
    //background-image: radial-gradient(circle,rgba(0,0,0,.2) 1px,transparent 0);
    //background-image: linear-gradient(90deg,rgba(0,0,0,.1) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.1) 1px,transparent 0);
    //.rel-node-selected {
    //  border: 0px;
    //  box-shadow: 0 0 0 5px rgba(231, 119, 7, 0.8);
    //  background-color: rgba(231, 160, 7, 0.3);;
    //}
  }
  .rel-toolbar {
    background-color: #ff8c00;
    color: #ffffff;
    .c-current-zoom {
      color: #ffffff;
    }
  }
}
```

### 📂 RGDemoComponents

#### `MyDemoPanel.tsx`

```javascript
import React, { useState } from 'react';
import './MyDemoPanel.scss';

declare module 'react' {
  interface CSSProperties {
    // 这里可以添加任意数量的自定义属性
    '--my-panel-width'?: string;
    '--my-panel-top'?: string;
  }
}
const MyDemoPanel:React.FC<{ width?:string, left?:string, right?:string, top?:string }> = ({ children, width = '400px', left = '10px', right = '', top = '10px' }) => {
  const [closed, setClosed] = useState(false);
  const togglePanel = () => {
    setClosed(!closed);
  };

  const panelClasses = `c-my-demo-panel ${closed ? 'c-my-demo-panel-closed' : ''} ${right ? 'c-my-demo-panel-r' : ''}`;
  const iconClasses = `my-icon ${closed ? 'my-icon-open' : 'my-icon-close'}`;

  return (
    <div
      className={panelClasses}
      style={{
        '--my-panel-width': width,
        '--my-panel-top': top,
        left: right ? undefined : left,
        right: right || undefined
      }}
    >
      <div className="my-footer">
        <div className={iconClasses} onClick={togglePanel}>
          {closed ? (right ? '↙' : '↘') : (right ? '➡' : '⬅')}
        </div>
      </div>
      <div className="my-body">
        {children}
      </div>
    </div>
  );
};

export default MyDemoPanel;
```

#### `MyDemoPanel.scss`

```scss
.c-my-demo-panel {
  position: absolute;
  border-radius: 5px;
  z-index: 800;
  width: var(--my-panel-width);
  top: var(--my-panel-top);
  background-color: #ffffff;
  border: #999999 solid 1px;
  box-shadow: 0 2px 6px rgba(0, 21, 41, 0.3);
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666666;
  //transition: width 0.3s ease-out;
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
  .c-title {
    color: #333333;
    font-size: 14px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
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
      &:hover {
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
.c-content {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  padding: 6px;
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
```
