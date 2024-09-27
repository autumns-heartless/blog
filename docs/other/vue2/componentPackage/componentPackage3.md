# 📦 组件（三）之 组件传值方式

> 列举 vue2 中 组件之间 的 `传值方式`：

- `props`、 `$emit`、 `bus`
- `$attrs`、`$listeners`、`$props`
- `slot`
- `$refs`
- `路由传值`
- `$parent`、`$children`、`$root`
- `provide`、`inject`
- `EventBus`
- `localStorage`、`sessionStorage`、`cookie`、`IndexedDB`
- `vuex`、 `observable`

## 1. `props`、`$emit`、`bus`

> `props`、`$emit` 相信大家应该都熟悉，这里就 `bus` 展开说一下

```javascript
🌟🌟🌟 建立 1 个 js 文件(bus.js)，内容如下：
import Vue from 'vue';
export default new Vue();
```

```javascript
🌟🌟🌟 这是 A 组件
<template>
      <div id="A">
          <p>{{ num }}</p>
          <button @click="send">发送传递数据</button>
      </div>
</template>

<script>
/* 引入 bus.js 文件 */
import bus from '@/utils/bus.js';

export default {
     name: 'A',
     data(){
         return{
            num: 0
         }
     },
     methods: {
         send(){
             this.num++;
             // 创建自定义事件，将数据传递到了 bus.js 文件
             bus.$emit("getNum", this.num);
         }
     }
}
</script>
```

```javascript
🌟🌟🌟 这是 B 组件
<template>
      <div id="B">
            <p>{{ number }}</p>
      </div>
</template>

<script>
import bus from '@/utils/bus.js';

export default {
     data(){
         return{
             number: 0
         }
     },
    created() {
        // bus 触发事件的方法
        bus.$on('getNum', val => {
            this.number = val;
        })
    }
}
</script>
```

## 2. `$attrs`、`$listeners`、`$props`

## 3. `slot`

## 4. `$refs`

> `$refs` 这里说 1 个注意点：必要时在 `$nextTick` 里使用 `$refs`

## 5. `路由传值`

> 首先得了解，路由跳转分为 `声明式导航` 和 `编程式导航，`这里不过多详解，可参考该 [网址](https://gitcode.csdn.net/65e7d37c1a836825ed7897f4.html#devmenu3)

## 6. `$parent`、`$children`、`$root`

> `$parent`：获取到一个父节点的 VueComponent 对象，包含 `父节点中所有数据和方法` 等

> `$children`：获取到一个包含 `所有子组件(不包含孙子组件)` 的 VueComponent 对象数组，可以直接拿到 `子组件中所有数据和方法` 等

> `$root`：`任何子组件` 都可以访问 `根组件实例上` 的 `data`、`methods`、`computed` 等 `属性和方法`，以及 `全局注册的组件或插件`

## 7. `provide`、`inject`

> `provide`：可以让我们 `给后代组件` 指定想要提供的 `数据或方法`

> `inject`：在 `任何后代组件` 中 `接收` 想要添加在这个组件上的 `数据或方法`

> ⚠️`注意事项`： provide 和 inject 传递的数据 `不是响应式` 的，除非传入的就是一个可监听的对象(谨慎使用)

```javascript
<!-- 父组件 --!>
<template>
  <div class="parent">
    <child></child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentData: "我的名字是你父亲"
    };
  },
  provide() {
    return {
      name: this.val, // data 的数据
      someMethod: this.someMethod // methods 中的方法
    };
  },
  methods: {
    someMethod() {
      console.log("这是注入的方法");
    }
  }

};

<!-- 子组件 --!>
<template>
  <div class="child">
    <SunChild></SunChild>
  </div>
</template>

<script>
export default {
  inject: ["name", "someMethod"],
  mounted() {
    console.log(this.name); // 我的名字是你父亲
    this.someMethod(); // 会打印出 '这是注入的方法' 这句话
  }
};
</script>

<!-- 孙组件 --!>
<template>
  <div class="SunChild">
    {{ name }} // 我的名字是你父亲
  </div>
</template>

<script>
export default {
  inject: ["name", "someMethod"],
  mounted() {
    console.log(this.name); // 我的名字是你父亲
    this.someMethod(); // 会打印出 '这是注入的方法' 这句话
  }
};
</script>
```

## 8. `EventBus`

释义：EventBus 是 `中央事件总线`，不管是 `父子组件，兄弟组件，跨层级组件` 等都可以完成 `通信`

```javascript
// 找到main.js 加入以下代码 公共的$bus
Vue.prototype.$bus = new Vue();

<!-- A 组件 --!>
<template>
  <div class="A">
    我是A组件
  </div>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on("fn", (value) => {
      console.log(value);
    });
  }
};
</script>

<!-- B 组件 --!>
<template>
  <div>
    <input type="text" @blur="fn" />
  </div>
</template>

<script>
export default {
  methods: {
    fn() {
      this.$bus.$emit("fn", "可以父子通信，也可以兄弟通信");
    }
  }
};
</script>
```

## 9. `localStorage`、`sessionStorage`、`cookie`、`IndexedDB`

> 释义：这些存储的简单使用一般大家都熟悉，这里不做详尽解释，后续会专门开展一篇文章去介绍他们

## 10. `vuex`、`observable`

> 示例：这里将以在 `vuex 中请求下拉列表数据` 为例，给大家讲解如何使用 vuex
