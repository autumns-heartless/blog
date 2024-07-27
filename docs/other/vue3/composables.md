# 组合式函数

### 1.什么是“组合式函数”？

在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如你可能已经用过的 [lodash](https://lodash.com/) 或是 [date-fns](https://date-fns.org/)。

相比之下，有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。在实际应用中，也可能是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。

### 2.示例

需求：获取鼠标点击的坐标

```javascript
<template>
    <div>
        获取到了鼠标的坐标：X轴 {{ point.x }} - Y轴 {{ point.y }}
    </div>
</template>
<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
// 定义响应式数据x和y坐标
let point = reactive({
    x: 0,
    y: 0
})
// 获取坐标的函数
function pointFn(ev) {
    point.x = ev.pageX
    point.y = ev.pageY
}
// 绑定事件
onMounted(() => window.addEventListener('click', pointFn))
// 组件销毁移除绑定的事件及处理函数
onUnmounted(() => window.removeEventListener('click', pointFn))
</script>
```

假如我的同事，xx 负责的业务模块也有这个功能！我们就需要涉及到封装组合式函数了（还有一个别名 hooks）

### 3.封装组合式函数

#### 3.1.无参数

1.组合式函数封装

src/hooks/usePoint.js

```javascript
import { reactive, onMounted, onUnmounted } from 'vue'
export default function () {
  // 定义响应式数据x和y坐标
  let point = reactive({
    x: 0,
    y: 0,
  })
  // 获取坐标的函数
  function pointFn(ev) {
    point.x = ev.pageX
    point.y = ev.pageY
  }
  // 绑定事件
  onMounted(() => window.addEventListener('click', pointFn))
  // 组件销毁移除绑定的事件及处理函数
  onUnmounted(() => window.removeEventListener('click', pointFn))
  return { ...toRefs(point) }
}
```

2.组件中的使用

```javascript
<template>
    <div>
        获取到了鼠标的坐标：X轴 {{ x }} - Y轴 {{ y }}
    </div>
</template>
<script setup>
// 引入组合式函数usePoint.js
import usePoint from './hooks/usePoint.js'
// 引入获取鼠标坐标的方法
let {x,y} = usePoint()
</script>
```

如你所见，核心逻辑完全一致，我们做的只是把它移到一个外部函数中去，并返回需要暴露的状态。现在，useMouse() 的功能可以在任何组件中轻易复用了。

更酷的是，你还可以嵌套多个组合式函数：一个组合式函数可以调用一个或多个其他的组合式函数。这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。实际上，这正是为什么我们决定将实现了这一设计模式的 API 集合命名为组合式 API。

举例来说，我们可以将添加和清除 DOM 事件监听器的逻辑也封装进一个组合式函数中：把绑定事件移除事件单独拿出来

src/hooks/useEvent.js

```javascript
import { onMounted, onUnmounted } from 'vue'
/*
 *  addEventListener(事件类型, 回调函数, 冒泡/捕获boolean(可以忽略不写))
 *  useEventListener函数的参数都有哪些？
 *  @params target target绑定给谁
 *  @params ev 给谁绑定什么事件？
 *  @params callback 给谁绑定什么事件用来做什么事情
 */
export function useEventListener(target, ev, callback) {
  onMounted(() => target.addEventListener(ev, callback))
  onUnmounted(() => target.removeEventListener(ev, callback))
}
```

把 event.js 这个组合式函数引入到 usePoint.js 这个组合式函数中

```javascript
import { reactive, onMounted, onUnmounted } from 'vue'
import { useEventListener } from './use-event.js'
export default function () {
  // 定义响应式数据x和y坐标
  let point = reactive({
    x: 0,
    y: 0,
  })
  // 获取坐标的函数
  function pointFn(ev) {
    point.x = ev.pageX
    point.y = ev.pageY
  }
  // use-event.js中的方法来绑定和解绑事件
  useEventListener(window, 'click', pointFn)
  return point
}
```

#### 3.2.有参数

##### 3.2.1.需求

需求：加，我们需要做的就是把这个功能分别拆分到不同的组合式函数中

在组件中的 input 中输入两个数，然后计算他们的加减平均值

##### 3.2.2.实现

1.加的组合式函数
src/hooks/useIncrement.js

```javascript
import { ref, watch } from 'vue'
export default function (num1, num2) {
  // 和的变量
  let sum = ref(0)
  // 求和的方法
  const addFn = (num1, num2) => {
    sum.value = num1 + num2
  }
  // 监听数字的变化实时计算和
  watch([num1, num2], ([newNum1, newNum2]) => {
    addFn(newNum1, newNum2)
  })
  return
  sum
}
```

2.在组件中使用

```javascript
<template>
    <div>
        <p><input type="text" v-model.number="num1"></p>
        <p><input type="text" v-model.number="num2"></p>
        <p>和是: {{ sum }}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue'
// 引入组合式函数use-point.js
import Increment from './hooks/useIncrement.js'
const num1 = ref(0)
const num2 = ref(0)
/*
 * sum从Increment组合式函数中解构出来
 * num1就是input的第一个值，实参
 * num2就是input的第二个值，实参
*/
const { sum } = Increment(num1, num2)
</script>
```

### 4.异步状态示例

#### 4.1.没有封装成组合式函数

```javascript
<template>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
        Data loaded:
        <p>{{ data }}</p>
    </div>
    <div v-else>Loading...</div>
</template>
<script setup>
import { ref } from 'vue'
import Axios from 'axios'
// 响应式数据
const data = ref(null)
const error = ref(null)
// 异步请求
Axios.get(`http://localhost:3000/hooks`).then(res => {
   data.value = res.data.data.title
}).catch(err => {
   console.log(err)
})
</script>
```

#### 4.2.封装成组合式函数

src/hooks/useFetch.js

1.封装

```javascript
import Axios from 'axios'
import { ref } from 'vue'
export function useFetch(url) {
  // 响应式数据
  const data = ref(null)
  const error = ref(null)
  // 异步请求
  Axios.get(url)
    .then((res) => (data.value = res.data.data.title))
    .catch((err) => (error.value = err.response.data.msg))
  return {
    data,
    error,
  }
}
```

2.使用

```javascript
<template>
    <div v-if="error">Oops! Error encountered: {{ error }}</div>
    <div v-else-if="data">
        Data loaded:
        <pre>{{ data }}</pre>
    </div>
    <div v-else>Loading...</div>
</template>
<script setup>
import { ref } from 'vue'
import { useFetch } from './hooks/useFetch.js'
let { data, error } = useFetch('http://localhost:3000/hooks')
</script>
```

### 5.约定和最佳实践

#### 5.1.命名

组合式函数约定用驼峰命名法命名，并以“use”作为开头。

#### 5.2.输入参数

即便不依赖于 ref 或 getter 的响应性，组合式函数也可以接收它们作为参数。如果你正在编写一个可能被其他开发者使用的组合式函数，最好处理一下输入参数是 ref 或 getter 而非原始值的情况。可以利用 `toValue()` 工具函数来实现：

```javascript
import { toValue } from 'vue'
function useFeature(maybeRefOrGetter) {
  // 如果 maybeRefOrGetter 是一个 ref 或 getter，
  // 将返回它的规范化值。
  // 否则原样返回。
  const value = toValue(maybeRefOrGetter)
}
```

如果你的组合式函数在输入参数是 ref 或 getter 的情况下创建了响应式 effect，为了让它能够被正确追踪，请确保要么使用 `watch()` 显式地监视 ref 或 getter，要么在 `watchEffect()` 中调用 `toValue()`。

### 6.与其他模式的比较

#### 6.1.和 Mixin 的对比

Vue 2 的用户可能会对 [mixins](https://cn.vuejs.org/api/options-composition.html#mixins) 选项比较熟悉。它也让我们能够把组件逻辑提取到可复用的单元里。然而 mixins 有三个主要的短板：

1. **不清晰的数据来源**：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。这也是我们推荐在组合式函数中使用 ref + 解构模式的理由：让属性的来源在消费组件时一目了然。
2. **命名空间冲突**：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。若使用组合式函数，你可以通过在解构变量时对变量进行重命名来避免相同的键名。
3. **隐式的跨 mixin 交流**：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。

基于上述理由，我们不再推荐在 Vue 3 中继续使用 mixin。保留该功能只是为了项目迁移的需求和照顾熟悉它的用户。

#### 6.2.和无渲染组件的对比

组合式函数相对于无渲染组件的主要优势是：组合式函数不会产生额外的组件实例开销。当在整个应用中使用时，由无渲染组件产生的额外组件实例会带来无法忽视的性能开销。

Vue 推荐在纯逻辑复用时使用组合式函数，在需要同时复用逻辑和视图布局时使用无渲染组件。

#### 6.3.和 React Hooks 的对比

如果你有 React 的开发经验，你可能注意到组合式函数和自定义 React hooks 非常相似。组合式 API 的一部分灵感正来自于 React hooks，Vue 的组合式函数也的确在逻辑组合能力上与 React hooks 相近。然而，Vue 的组合式函数是基于 Vue 细粒度的响应性系统，这和 React hooks 的执行模型有本质上的不同。这一话题在[组合式 API 的常见问题](https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)中有更细致的讨论。

### 7.延伸阅读

- [VueUse](https://vueuse.org/)：一个日益增长的 Vue 组合式函数集合。源代码本身就是一份不错的学习资料。
