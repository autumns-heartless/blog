---
title: Vue 练手小项目 - Todolist
date: 2024/10/28
tags:
  - Vue
  - Capstone
---

# Vue 练手小项目 - Todolist

参考自 [尚硅谷 Vue2.0+Vue3.0 全套教程 - TodoList 案例](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=70) 。

链接：

- [GitLatb](https://gitlab.com/tangjan/vue-todolist)
- [在线查看](https://vue-todolist-7490c6.gitlab.io/)

## 需求

图示：

![1-app-picture](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/28/vue-todolist/1-app-picture.png)

### 头部

- 回车添加任务。输入任务名称，按下回车添加到任务列表中。
- 输入为空时按下回车，提示 `输入不能为空`。

### 任务列表

- 任务项可勾选/不勾选。
- 删除按钮。鼠标悬浮到任务项上时，显示删除按钮，不悬浮则不显示。点击删除按钮提示 `确定删除此任务吗？`，确定则删除对应的任务项，不论这个任务项的状态是勾选还是未勾选。

### 尾部

- 全部勾选。
- 统计已完成数量 / 全部数量。
- 当任务数量为 0 时，隐藏尾部。
- 清除已完成任务。点击时提示 `确定清除所有已完成任务吗？`。

## 组件拆分

组件拆分如图所示，其中 `MyItem` 是 `MyList` 的子组件。

![2-components-separation](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/28/vue-todolist/2-components-separation.png)

在本文中，分别将各组件称为：

- `MyHeader.vue`：头部
- `MyList.vue`：任务列表
- `MyItem.vue`：任务项
- `MyFooter.vue`：尾部

大部分逻辑一看源码就能明白，这里记录一下值得注意的一些问题。

## App.vue

::: details `<template>`

```HTML
<div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader :addTodo="addTodo"/>

      <MyList
        :todos="todos"
        :checkTodo="checkTodo"
        :deleteTodo="deleteTodo"
      />

      <MyFooter
        :todos="todos"
        :checkAllTodo="checkAllTodo"
        :clearAllTodo="clearAllTodo"
      />
    </div>
  </div>
</div>
```

:::

::: details `<script>`

```js
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  components: { MyHeader, MyList, MyFooter },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || [
        { id: '001', title: '任务1', done: true },
        { id: '002', title: '任务2', done: true },
        { id: '003', title: '任务3', done: false },
      ],
    }
  },
  methods: {
    // 添加一个任务项
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    // 勾选/取消勾选一个任务项
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    // 删除一个任务项
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    // 全选/取消全选
    checkAllTodo(doneStatus) {
      this.todos.forEach((todo) => {
        todo.done = doneStatus
      })
    },
    // 清除所有已经完成的任务项
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    },
  },
  watch: {
    todos: {
      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      },
      deep: true,
    },
  },
}
```

:::

### 任务列表的定义

::: details 任务列表的代码

```js
data() {
  return {
    todos: JSON.parse(localStorage.getItem('todos')) ||
    [
      {id:'001', title:'任务1', done:true},
      {id:'002', title:'任务2', done:true},
      {id:'003', title:'任务3', done:false}
    ]
  }
},
```

:::

任务列表用对象数组存储，存储在 `App.vue` 中。

任务项对象定义三个属性，分别是 `id`、`title`、`done`

`id` 用作唯一标识符，使用 [nanoid](https://github.com/ai/nanoid) 生成。也可以用 [uuid](https://github.com/uuidjs/uuid) 生成，不过 uuid 太长了，没必要。

`title` 即任务名称。`title` 不能用作唯一标识符，因为可能有同名任务。

`done` 是任务状态，即勾选/不勾选。尾部的数量统计、清除已完成任务要用到这个属性。

之所以选择存储在 `App.vue` 中，而不是存储在 `MyList.vue` 中，是因为头部 `MyHeader` 在添加任务项后需要渲染到任务列表 `MyList` 区域，它们是平级的关系，不太好用 `props` 传递数据。所以选择用 [状态提升](https://cn.vuejs.org/guide/scaling-up/state-management) 的方式，将数据存放在它们共同的父组件 `App.vue` 中。

### 任务方法的定义

::: details 任务方法的代码

```js
methods: {
  // 添加一个todo
  addTodo(todoObj){
    this.todos.unshift(todoObj)
  },
  // 勾选/取消勾选一个任务项
  checkTodo(id){
    this.todos.forEach((todo)=>{
      if(todo.id === id) todo.done = !todo.done
    })
  },
  // 删除一个todo
  deleteTodo(id){
    this.todos = this.todos.filter( todo => todo.id !== id )
  },
  // 全选or取消全选
  checkAllTodo(doneStatus){
    this.todos.forEach((todo)=>{
      todo.done = doneStatus
    })
  },
  // 清除所有已经完成的todo
  clearAllTodo(){
    this.todos = this.todos.filter((todo)=>{
      return !todo.done
    })
  }
},
```

:::

任务数据既然存储在了 `App.vue` 中，添加、勾选/取消勾选、删除、清除已完成等方法就也统一存放在 `App.vue` 中，统一管理数据状态。

方法具体实现一看就懂，不解释了。

### 浏览器缓存

::: details 浏览器缓存相关的代码

```js
data() {
  return {
    todos: JSON.parse(localStorage.getItem('todos')) ||
    [
      {id:'001', title:'任务1', done:true},
      {id:'002', title:'任务2', done:true},
      {id:'003', title:'任务3', done:false}
    ]
  }
},

watch: {
  todos: {
    deep: true
    handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
    }
  }
},
```

:::

要引入浏览器缓存，实现网页刷新不丢失数据，有两个时机需要考虑：

1. 初始化时读取缓存。要注意加上 `||` 单独定义一个初始任务列表（可以为空），不然初次使用时浏览器缓存为 null，控制台会报报错。
2. 任务对象数组有变更时（增、删）。使用 `watch` 侦听属性实现。

注意对象数组要调用 [JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 和 [JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 来实现对象和 JSON 字符串之间的转化，

![3-JSON](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/28/vue-todolist/3-JSON.png)

## 头部 MyHeader.vue

::: details `<template>`

```html
<div class="todo-header">
  <input type="text" placeholder="输入任务名称，回车键确认" v-model="title" @keyup.enter="add" />
</div>
```

:::

::: details `<script>`

```js
import { nanoid } from 'nanoid'
export default {
  name: 'MyHeader',
  props: ['addTodo'],
  data() {
    return {
      title: '',
    }
  },
  methods: {
    add() {
      if (!this.title.trim()) return alert('输入不能为空')

      // 捕获用户输入，包装成一个对象
      const headerTodoObj = { id: nanoid(), title: this.title, done: false }
      this.addTodo(headerTodoObj)

      // 清空输入框
      this.title = ''
    },
  },
}
```

:::

没什么说的，一看就懂。

值得一提的是，如果有服务端，`id` 应该是由服务器生成的。但现在做的是单机版，就自己用 `nanoid()` 替代吧。

其实也可以用 [`Date.now()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now) 来代替 id，反正只要不重复就行了。

## 任务列表 MyList.vue

::: details `<template>`

```html
<ul class="todo-main">
  <MyItem
    v-for="todoObj in todos"
    :key="todoObj.id"
    :todo="todoObj"
    :checkTodo="checkTodo"
    :deleteTodo="deleteTodo"
  />
</ul>
```

:::

::: details `<script>`

```js
import MyItem from './MyItem.vue'

export default {
  name: 'MyList',
  components: { MyItem },
  props: ['todos', 'checkTodo', 'deleteTodo'],
}
```

:::

这里需要注意的是在对 `<MyItem>` 使用 `v-for` 遍历渲染时，不应该用 `index` 作为 `key`，而是应该用 `id` 作为 `key`。因为新添加的任务项会放在任务列表前方，涉及到逆序操作，用 `index` 会导致 DOM 渲染不复用，效率不高。

参见：

- [key 作用与原理 - 哔哩哔哩](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=30)
- [v-for index / person.id 作为 key - CodePen](https://codepen.io/Jan-Tang/pen/BaXWbba)

## 任务项 MyItem.vue

::: details `<template>`

```html
<li>
  <label>
    <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
    <span>{{todo.title}}</span>
  </label>
  <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
</li>
```

:::

::: details `<script>`

```js
export default {
  name: 'MyItem',
  props: ['todo', 'checkTodo', 'deleteTodo'],
  methods: {
    handleCheck(id) {
      this.checkTodo(id)
    },

    handleDelete(id) {
      if (confirm('确定删除此任务吗？')) {
        this.deleteTodo(id)
      }
    },
  },
}
```

:::

### change 事件可换为 click 事件

```html
<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
```

这里，[change](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/change_event) 事件可以替换为 [click](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event) 事件，因为对于 [input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素，这俩事件效果一样。

### 组件间通信问题

前面说过，这里是使用的 [状态提升](https://cn.vuejs.org/guide/scaling-up/state-management) 的方式将 `todo`、`checkTodo()` 和 `deleteTodo()` 从 `App.vue` 传递到 `MyItem.vue` 中的。

`MyItem` 是 `MyList` 的子组件，`MyList` 又是 `App` 的子组件，所以用 `props` 传递时需要一级一级传，也就是 `App.vue` → `MyList.vue` → `MyItem.vue`。

还有两种方法可以处理组件间通信问题：

- 全局事件总线
- 消息订阅与发布

但我还没学，有机会再补充。

### 不合适的数据通信方法：v-model

```html
<input type="checkbox" v-model="todo.done" @change="handleCheck(todo.id)" />
```

这样也可以实现任务项状态同步，不过，参见 [单向数据流](https://cn.vuejs.org/guide/components/props#one-way-data-flow)，这种方式下，子组件 `MyItem` 修改了父组件 `App` 的数据，违反了 Vue `props` 的单向绑定原则，是不合适的。

## 尾部 MyFooter.vue

::: details `<template>`

```html
<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{doneTotal}}</span>
      / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>
```

:::

::: details `<script>`

```js
<script>
  export default {
    name:'MyFooter',
    props:['todos','checkAllTodo','clearAllTodo'],
    computed: {
      // 总数
      total(){
        return this.todos.length
      },

      // 已完成数
      doneTotal(){
        return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0), 0)
      },

      // 全选
      isAll:{
        // 全选时自动勾选
        get(){
          return this.doneTotal === this.total && this.total > 0
        },
        // 手动全选/取消全选
        set(value){
          this.checkAllTodo(value)
        }
      }
    },
    methods: {
      //清空所有已完成
      clearAll(){
        if(confirm('确定清除所有已完成任务吗？')){
          this.clearAllTodo()
        }
      }
    },
  }
</script>
```

:::

### 隐藏尾部

任务数为 0 时，隐藏尾部，通过 `v-show="total"` 实现。

### 全选/全不选

全选/全不选通过 [计算属性](https://cn.vuejs.org/guide/essentials/computed) 实现。因为 `isAll` 不单单是读取，还可被修改，所以不能写简写形式，要写完整的 getter `get()` 和 setter `set()`。

```js
computed: {
  isAll:{
    // 全选时自动勾选
    get(){
      return this.doneTotal === this.total && this.total > 0
    },
    // 手动全选/取消全选
    set(value){
      this.checkAllTodo(value)
    }
  }
},
```

```js
checkAllTodo(doneStatus){
  this.todos.forEach((todo)=>{
    todo.done = doneStatus
  })
},
```

### 全选/全不选，另一种实现方法

其实 `v-model="isAll"` 是 `:checked="isAll"` 和 `@change="checkAll"` 融合在一起。

```html
<input type="checkbox" :checked="isAll" @change="checkAll" />
```

```js
computed: {
  isAll:{
    return this.doneTotal === this.total && this.total > 0
  }
},
methods: {
  checkAll(e){
    this.checkAllTodo(e.target.checked)
  }
}
```

## 部署到 GitLab Pages

其实可以用 [StackBlitz](https://stackblitz.com/) 部署这个 Vue 项目，并且更方便一点。

但我选择用 [GitLab](https://gitlab.com/tangjan) 作为我的个人练手项目集合中心，所以部署到 GitLab Pages。

::: details `.gitlab-ci.yml`

```yml
image: node:latest

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build

pages:
  stage: deploy
  script:
    - rm -rf public
    - mkdir public && cp -rf dist/* public
  artifacts:
    paths:
      - public
    expire_in: 30 days

cache:
  paths:
    - node_modules
    - dist
```

:::

### 一个小 bug

在 Gitlab 仓库的 `Deploy` - `Pages` 设置中，默认是勾选 `Use unique domain`，这时打开项目地址，则一切正常。

但如果不勾选 `Use unique domain`，选择用 https://tangjan.gitlab.io/vue-todolist/ 作为项目地址，则会报错：

![4-gitlab-use-unique-domain](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/28/vue-todolist/4-gitlab-use-unique-domain.png)

![5-console-browser-error](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/10/28/vue-todolist/5-console-browser-error.png)

查了一下相关信息，但还没仔细研究，有空再说，先用 unique domain 用着。

- [Enable CORS for GitLab Pages on Gitlab.com (#66)](https://gitlab.com/gitlab-org/gitlab-pages/-/issues/66)
- [CORS when connecting to self-hosted gitlab](https://answers.netlify.com/t/cors-when-connecting-to-self-hosted-gitlab/18467)
