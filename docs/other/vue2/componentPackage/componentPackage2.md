# 📦 组件（二）之 slot

- **slot：**
  > 释义：让 **父组件** 可以向 **子组件** **指定位置插入 html 结构**，也是一种 **组件间通信** 的方式

> 1. **匿名插槽**：**纯 slot**，将会展示 **父组件传递的内容 || 本身的默认值**

```javascript
<!-- 子组件 -->
<template>
    <span>
        我是子, 父组件传过来的值: <slot>我爸不喊就展示这段文字</slot>
    </span>
</template>

<!--父组件-->
<template>
    <div>
        我是父：<child> 儿子吃饭啦 ~ </child>
    </div>
</template>

```

> 2. **具名插槽**：**\<slot>** 元素有一个 **特殊的 attribute：name**，通过该属性可以 **将内容放在指定的插槽里**

```javascript
🌟🌟🌟 使用方式:
    1. <标签 slot="插槽名"></标签>
    2. <template v-slot:插槽名></template> (版本：V2.6.0+)
    3. <template #插槽名></template>

<!-- 子组件 -->
<template>
    <div class="category">
      <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
      <slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot>
      <slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot>
    </div>
</template>

<!--父组件-->
<template>
    <div class="container">
      <category title="美食" >
          <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
          <a slot="footer" href="http://www.atguigu.com">更多美食</a>
      </category>

      <category title="电影">
          <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
          <template v-slot:footer>
              <a href="http://www.atguigu.com">经典</a>
          </template>
      </category>

      <category title="游戏">
          <span slot="center">有啥游戏？</span>
          <template #footer>
              <a>王者荣耀</a>
          </template>
      </category>
    </div>
</template>
```

> 3. **作用域插槽**： **子组件** 提供 **数据**，**父组件** 接收 子组件的值 并 **展示 和 处理逻辑**

```javascript
🌟🌟🌟 使用方式:
    1. 子组件匿名插槽，父组件：<template v-slot="{变量名></template> 适用版本：V2.6.0+
    2. 子组件具名插槽，父组件：<template v-slot:插槽名="{变量名></template> 适用版本：V2.6.0+
    3. 子组件具名插槽，父组件：<template #插槽名="{变量名></template> 适用版本：V2.6.0+
    4. 子组件匿名插槽，父组件：<template slot-scope="{变量名></template> (适用版本：V2.5.0 ~ V2.6.0(不包含2.6.0))
    5. 子组件匿名插槽，父组件：<template scope="变量名</template> (适用版本：V2.5.0 以下)

<!-- 子组件 -->
<template>
    <div class="category">
      <slot :games="games">我是默认的一些内容</slot>
      <slot :games="games" name="game">我是默认的一些内容</slot>
    </div>
</template>
<script>
    export default {
        name:'category',
        data() {
            return {
          games:['红色警戒', '穿越火线', '劲舞团', '超级玛丽']
            }
        }
    }
</script>

<!--父组件-->
<template>
    <div class="container">
      <category title="游戏">
    ​    <template v-slot="{games}">
    ​        <span>结合匿名插槽，适用版本：V2.6.0+</span>
    ​     </template>
    ​   </category>

      <category title="游戏">
    ​    <template v-slot:game="{games}">
    ​        <span>结合具名插槽，适用版本：V2.6.0+</span>
    ​     </template>
    ​   </category>

      <category title="游戏">
    ​    <template #game="{games}">
    ​        <span>结合具名插槽，适用版本：V2.6.0+</span>
    ​     </template>
  ​    </category>

      <category title="游戏">
          <template slot-scope="{games}">
        <span>适用版本：V2.5.0 ~ V2.6.0(不包含2.6.0)</span>
          </template>
      </category>

      <category title="游戏">
          <template scope="joney">
        <span>适用版本：V2.5.0(以下)</span>
          </template>
      </category>
    </div>
</template>
```
