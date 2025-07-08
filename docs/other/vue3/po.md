---
  author: '前端小智'
  reprinted: true
  title: Vue3 性能优化的 10 个硬核技巧
  date: 2025/07/08
  words: 1468
  duration: 6
  categories:
    - vue3
  tags:
    - vue3
---

# Vue3 性能优化的 10 个硬核技巧

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/InAgCeB8CHQ1_qbSCqIlDw)

你是否也在为 Vue3 项目的卡顿问题苦恼？组件结构复杂、逻辑难以维护、渲染性能不给力？别担心，本文为你总结了前端实战中亲测有效的 Vue3 性能优化技巧，共 10 招，招招见效！

---

## Hack 1：用  `shallowReactive`  替代  `reactive`，性能瞬间起飞

**问题：**

<pre>Vue3 的  `reactive`  默认是深度响应式，大型数据结构稍有变动就触发整个组件重渲染，性能堪忧。</pre>

**解决方案：**

<pre>使用  `shallowReactive`，只追踪**第一层属性**的变化，就像开启了 “响应式节能模式”。</pre>

```javascript
import { shallowReactive } from 'vue'

const userInfo = shallowReactive({
  name: '前端达人',
  address: { city: '', street: '' },
  hobbies: ['写代码', '调 Bug'],
})

userInfo.name = 'Vue 高手' // ✅ 会触发更新
userInfo.address.city = '上海' // ❌ 不会触发更新！
```

**为什么推荐？**

<pre>对于如表格数据、API 响应等大数据对象，`shallowReactive`  能大幅减少不必要的重渲染。</pre>

---

## Hack 2：用  `toRefs`  解构响应式对象，清爽优雅

**问题：**

<pre>每次都手动  `state.xxx`  获取属性太繁琐？</pre>

**解决方案：**

<pre>使用  `toRefs`  一键将响应式对象转为独立的  `ref`。</pre>

```javascript
import { reactive, toRefs } from 'vue'

const user = reactive({
  name: '小明',
  age: 25,
})

const { name, age } = toRefs(user)
name.value = '小红' // ✅ 自动响应更新
```

**为什么推荐？**

<pre>减少冗余逻辑，让模板更简洁，开发更流畅。</pre>

---

## Hack 3：用  `watchEffect`  自动追踪依赖，响应式更聪明

**问题：**

<pre>普通  `watch`  用法太啰嗦，还得手动指定依赖源？</pre>

**解决方案：**`watchEffect`

<pre>自动感知依赖，数据变了就触发。</pre>

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const double = ref(0)

watchEffect(() => {
  double.value = count.value * 2
})
```

**为什么推荐？**

<pre>适用于表单联动、缓存数据、动态依赖场景，响应式编程首选。</pre>

---

## Hack 4：使用  `<Suspense>`  异步组件加载更丝滑

**问题：**

<pre>异步组件加载时页面一片空白，用户体验不佳？</pre>

**解决方案：**

<pre>用  `Suspense`  包裹异步组件，优雅展示 loading 状态。</pre>

```vue
<template>
   
  <Suspense>
       
    <template #default>
           
      <AsyncComponent />
         
    </template>
       
    <template #fallback>
           
      <div>组件加载中…</div>
         
    </template>
     
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))
</script>
```

**为什么推荐？**

<pre>提升异步组件加载体验，优化首屏性能。</pre>

---

## Hack 5：用  `<Teleport>`  让弹窗随心所欲渲染到任何位置

**问题：**

<pre>模态框、菜单层级混乱、z-index 失控？</pre>

**解决方案：**

<pre>使用  `Teleport`  将内容直接传送到  `body`  或其他 DOM 节点。</pre>

```javascript
<template> 
  <button @click="show = true">打开弹窗</button> 
  <Teleport to="body">   
    <div v-if="show" class="modal">     
      <button @click="show = false">关闭</button>   
    </div> 
  </Teleport>
</template>
```

**为什么推荐？**

<pre>彻底解决样式冲突和 DOM 结构限制，是构建组件库的必杀技。</pre>

---

## Hack 6：自定义指令  `v-copy`，实现一键复制

**问题：**

<pre>每次复制内容都要手动写  `execCommand`  很麻烦？</pre>

**解决方案：**

<pre>封装成一个可复用的自定义指令：</pre>

```javascript
app.directive('copy', {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      const textarea = document.createElement('textarea')
      textarea.value = binding.value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    })
  },
})
```

**使用方式：**

```javascript
<button v-copy="'复制这段话'">点我复制</button>
```

**为什么推荐？**

<pre>逻辑集中、组件更简洁、交互更友好。</pre>

---

## Hack 7：使用 Pinia 插件，扩展状态管理功能

**问题：**

<pre>Pinia 状态管理逻辑越来越庞杂，难以复用？</pre>

**解决方案：**

<pre>自定义插件统一扩展所有 store 的功能：</pre>

```javascript
// 插件：添加 $reset 方法
const resetPlugin = ({ store }) => {
  store.$reset = () => store.$patch(store.$initialState)
}

const pinia = createPinia()
pinia.use(resetPlugin)
```

**使用示例：**

```javascript
const userStore = useUserStore()
userStore.$reset() // 快速重置状态
```

**为什么推荐？**

<pre>共享逻辑，结构清晰，是中大型项目中不可或缺的利器。</pre>

---

## Hack 8：使用  `v-memo`  缓存列表项渲染

**问题：**

<pre>大列表频繁重绘，性能直线下滑？</pre>

**解决方案：**

<pre>用  `v-memo`  指令缓存渲染结果，只有依赖项变化才更新。</pre>

```javascript
<li 
  v-for="item in items" 
  :key="item.id" 
  v-memo="[item.id, item.status]"
> 
  {{ item.name }} - {{ item.status }}
</li>
```

**为什么推荐？**

<pre>显著减少无效更新，优化表格、虚拟滚动等性能瓶颈。</pre>

---

## Hack 9：用  `useIntersectionObserver`  实现智能懒加载

**问题：**

<pre>页面加载慢，大量图片资源拖垮性能？</pre>

**解决方案：**

<pre>借助 VueUse 的  `useIntersectionObserver`  轻松实现图片懒加载。</pre>

```javascript
<script setup>
import { useIntersectionObserver } from '@vueuse/core';

const target = ref(null);
const isVisible = ref(false);

useIntersectionObserver(target, ([entry]) => {
  isVisible.value = entry.isIntersecting;
});
</script>

<template> 
  <img ref="target" :src="isVisible ? 'img.jpg' : ''" alt="懒加载图">
</template>
```

**为什么推荐？**

<pre>加快首屏加载速度，有利于 SEO 与移动端体验。</pre>

---

## Hack 10：封装自定义 Hook（Composable），逻辑复用更高效

**问题：**

<pre>表单校验、请求逻辑不断复制粘贴？</pre>

**解决方案：**

<pre>封装为可复用的 Composable 函数。</pre>

```javascript
// useFormValidation.js
export default function () {
  const email = ref('')
  const errors = ref({})
  const validate = () => {
    errors.value = {}
    if (!email.value) errors.value.email = '邮箱不能为空'
    return Object.keys(errors.value).length === 0
  }
  return { email, errors, validate }
}
```

在组件中使用：

```javascript
<script setup>
  import useFormValidation from './useFormValidation'; const {(email, errors, validate)} =
  useFormValidation();
</script>
```

**为什么推荐？**

<pre>高度模块化、便于测试，复用率极高，是 Vue3 最值得投入的模式之一。</pre>

---

## 🧠 总结一下

<table><thead><tr><th><section>Hack 编号</section></th><th><section>技巧名称</section></th><th><section>应用价值</section></th></tr></thead><tbody><tr><td><section>#1</section></td><td><code>shallowReactive</code></td><td><section>减少不必要的响应式更新</section></td></tr><tr><td><section>#2</section></td><td><code>toRefs</code></td><td><section>更优雅地解构响应式对象</section></td></tr><tr><td><section>#3</section></td><td><code>watchEffect</code></td><td><section>自动依赖追踪</section></td></tr><tr><td><section>#4</section></td><td><code>&lt;Suspense&gt;</code></td><td><section>提升异步组件体验</section></td></tr><tr><td><section>#5</section></td><td><code>&lt;Teleport&gt;</code></td><td><section>解决组件渲染位置问题</section></td></tr><tr><td><section>#6</section></td><td><code>v-copy</code><section>&nbsp;指令</section></td><td><section>实现一键复制</section></td></tr><tr><td><section>#7</section></td><td><section>Pinia 插件</section></td><td><section>优化状态管理逻辑</section></td></tr><tr><td><section>#8</section></td><td><code>v-memo</code></td><td><section>缓存列表渲染</section></td></tr><tr><td><section>#9</section></td><td><code>useIntersectionObserver</code></td><td><section>智能懒加载</section></td></tr><tr><td><section>#10</section></td><td><section>自定义 Hook（Composable）</section></td><td><section>逻辑封装与复用</section></td></tr></tbody></table>

这些技巧并非炫技，而是真正在大型 Vue3 项目中落地可用、提升开发体验和性能的利器。希望你能将它们融入日常开发实践中，打造更加健壮高效的 Vue 应用。
