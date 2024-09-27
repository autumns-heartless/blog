# 📦 组件（一）之 \$attrs、\$listeners

- **\$attrs (版本: v2.4.0+)**

> 释义：它是 1 个 **对象**，**\$attrs + props = 父组件传递过来的属性\*\*** (\***\*其实还有\*\***\$props:\***\* \*\***它也是 1 个\***\*对象，包含了\*\***props 中的所有属性\***\*)**

> **inheritAttrs**：设置为 **false** 的话 \$attrs 接收到的属性 **不会出现在 html 标签元素上**

> 运用技巧，一般**需要设置默认值**的可继续通过 **props** 接收，**其余 **的通过** \*\***v-bind="\$attrs"\*\* 接收

```javascript
/* 父组件 */
<template>
    <JeeDialog width="50%" title="弹窗标题" visible="true" cancelText="取消"></JeeDialog>
</template>

/* 子组件 */
<template>
  <el-dialog v-bind="$attrs">
    <div slot="footer">
        <el-button>{{ cancelText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'JeeDialog',
  inheritAttrs: false,
  props: {
    /* 展示 取消、返回类按钮---文字 */
    cancelText: { type: String, default: '返回' },
  },
  /* 这里所有的代码只作为示例，不考虑实际应用 */
  mounted() {
      /* 因为 cancelText 在 props中 接收了，所以它不会出现在 $attrs 中 */
      console.log(this.$attrs); // { width: "50%", title: "弹窗标题", visible: true }
  }
};
</script>
```

- **\$listeners (版本: v2.4.0+)**

> 1. 能够实现 **父孙级传值(\*\***也就是 \***\*父组件\*\*** \***\*能够 \*\***监听\***\* \*\***到 \***\*孙组件 的 \$emit\*\***)**：**孙组件\***\* **通过 **\$emit** 向 **父组件 **进行传值，同时 **子组件\*\*** **绑定** \***\*v-on="\$listeners"**
> 2. **子组件** 通过 **this.\$listeners\*\*** \***\*能 \*\***监听\***\* \*\***到 \***\*父组件\*\*** \***\*的 \*\***所有事件\***\*，\*\***但注意\***\* 父组件 的 \*\***@click.native\***\*，\*\***子组件监听不到\*\*

```javascript
/* 父组件 */
<template>
  <div>
    <child :foo="foo" :bar="bar" @upFoo="update"></childm>
  </div>
</template>

<script>
export default {
  name: 'father',
  methods: {
    update(val) {
      console.log(val); // father啊，我是你的grandSon
    }
  }
};
</script>

/* 子组件 */
<template>
  <div>
    <grand-son v-bind="$attrs" v-on="$listeners"></grand-son>
  </div>
</template>

/* 孙组件 */
<template>
  <div>
    <button @click="tellFather">我要更新foo</button>
  </div>
</template>
​
<script>
export default {
  name: 'grandSon',
  props: ["bar"],
  methods: {
    tellFather() {
      this.$emit("fromGrandSon", "father啊，我是你的grandSon");
    }
  }
};
</script>
```
