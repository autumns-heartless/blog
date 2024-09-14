<BackTop />

# 写给懒人的 Vue3 速查宝典

**Vue 3 相对于 Vue 2 有许多改进和新功能，其中一些主要的变化包括：**

1.  `使用 Composition API`：Vue 3 引入了 Composition API，这是一种新的、更灵活的组件编写方式，允许更好地组织和复用代码。
2.  `改进的性能`：Vue 3 在性能方面进行了许多改进，包括更快的渲染速度、更小的捆绑体积和更好的内存管理。
3.  `更好的 TypeScript 支持`：Vue 3 提供了更好的 TypeScript 支持，包括类型推断和类型注解。
4.  `新的路由器和状态管理库`：Vue 3 引入了新的路由器和状态管理库，称为 Vue Router 和 Vuex 4。
5.  `更好的 tree-shaking 支持`：Vue 3 更好地支持 tree-shaking，这意味着在生产环境中，只打包实际使用的代码，从而减少应用程序的大小。

### setup

在 Vue 3 中，`setup` 是一个新的组件选项，用于定义组件的逻辑和状态。通过使用 setup，可以更清晰地组织组件的逻辑和状态，并使其更易于测试和维护。`也可以直接把setup写在script标签上哦`。

```script
<template>
  <section>     
    {{ count }}    
  </section>
</template>

<script>
  export default {    
     name: 'MyComponent',
      setup() {      
        const count = ref(0);    
        const increment = () => {
            count.value++;       
        };
        return {       
            count,        
            increment       
        };
      }
  };
</script>
```

### 响应式数据

使用`reactive`创建对象类型响应式数据，如果给 reactive 重新分配一个对象，会失去响应式，可以使用`Object.assign()`去整体替换。使用 ref 创建基本类型响应数据

> ref 也可以创建对象类型的响应数据。若层级较深，建议 reactive

```script
<script setup>     
  import { reactive, ref } from 'vue';     
  let obj = reactive({       
    a: 1,       
    b: {         
      c: 3,  
      d: 4   
    }     
  })
      
  let str = ref('hi');
  const fnc = () => {       
    str.value = 'hello!'; // 记得加.value    
  }
</script>
```

### 解构响应式对象

`toRefs`可用来解构，该对象的每个属性都是独立的 ref 对象，并保持响应式

```script
import { reactive, toRefs } from 'vue';

let info = reactive({     
  name: 'Echo',     
  age: 26,     
  gender: 'Male'
})

let { name, age, gender } = toRefs(info); // 解构数据，并保持响应式
```

### 如何监听多个数据？

监听多个数据，第一个参数需用数组包起来；如果监听非对象类型，需写成函数形式，若监听 reactive 定义的对象类型，就默认开启深度监听。

开启 immediate ：上来就调用监听里的内容，类似 react 中的 useEffect(()=>{},\[\])

```script
import { watch } from 'vue';

// 监听active、type
watch(
  [() => props.active, ()=> props.type],
  (nv, ov) => {
    // nv代表最新数据，ov是老数据     console.log(nv)     //开启deep代表深度监听
  },
  { deep:true, immediate: true }
)
```

### 解放双手，自动检测变化

`watchEffect`可以自动检测到属性的变化，无需手动指定要监听的属性。

与传统的 watch 不同，watchEffect 会在属性变化时自动执行副作用函数，并且可以返回一个清理函数，用于在组件卸载时清理副作用。

```script
import { watchEffect } from 'vue';

// 只要temp.val跟json.val发生变更，就会自动执行watchEffect内的副作用函数
watchEffect(() => {     
  if(temp.val > 60 || json.val > 60){
    console.log('发送请求')     
  }
})
```

### 接收 props

父子组件传值，需要使用`defineProps`接收 props，案例如下：

```script
<script setup>
import { defineProps } from 'vue';

//子组件接收props    
const props = defineProps({
    language: {
      type: Object,    
       // 也可以使用withDefaults设置默认值     
      default: () => ({}),    
    },       
    cookieCountry: {        
       type: String,      
       default: ''    
    }    
})
</script>
```

### Ref 属性（父子交互）

通过 `Ref 属性`，可以从父组件中访问子组件的属性和方法，或者直接操作 DOM 元素。

```script
<template>
    <section ref="myDiv">Hello, World!</section>
</template>

<script>
import { ref, onMounted } from 'vue';
    export default {
        setup() {
            const myDiv = ref(null);

            // mounted是生命周期，代表挂载完毕
            onMounted(() => {       
              myDiv.value.style.color = 'red'; // 将myDiv的颜色改成红色     
            });         

           return {
               myDiv
           };
        }
    };
</script>
```

> 如果父组件想访问子组件的内容，子组件需使用 defineExpose 将内容导出。

defineExpose 将组件中的属性或方法暴露给外部环境，以便在其他组件或模板中使用。

```script
<template>      
  <card-num ref="cardNumRef" />
</template>

<script setup>     
import { ref } from 'vue';
 
const resetAllRefData = () => {       
  console.log(cardNumRef.value.cardNo) // 获取子组件中的cardNo值     
}
</script>
```

cardNum 组件：

```script
<script setup>
     import { defineExpose } from 'vue';

     const resetData = () => {       
        cardNo.value = ''       
        cardNum.value = ''     
     }     

     // 暴露     
     defineExpose({ resetData })
</script>
```

### 自定义事件

`defineEmits` 是 Vue 3 中的一个新特性，它允许你在组件中自定义事件。在父组件中，可以使用 v-on 指令来监听自定义事件。

```script
<template>    
<!-- 自定义一个叫update的事件 -->     
  <Child @update="onUpdate"/>
</template>

<script setup>     
import Child from '/Child.vue';
       
const onUpdate = (value) => {       
  console.log(value) // 666     
}
</script>
```

Child 组件：

```script
<template>     
  <!-- 点击button，将666传给父，emits 触发事件 -->    
  <button @click="emits('update',666)"/>
</template>

<script setup>     
import { defineEmits,onMounted } from 'vue';
         
// 定义 emits     
const emits = defineEmits(['update'])
// 接收事件名update
</script>
```

### vue3 生命周期

```script
<script setup>     
import { onMounted,onBeforeMount,onUpdated,unmounted } from 'vue';

  // 挂载前
  onBeforeMount(()=>{})
    
  // 挂载完毕     
  onMounted(()=>{})
      
  // 更新完毕     
  onUpdated(()=>{})

  // 卸载完毕
  onUnmounted(()=>{})
</script>
```

`beforeCreate`: 在实例初始化之后。

`created`: 在实例创建完成后被立即调用。

`beforeUpdate`: 数据更新时。

`beforeUnmount`: 实例销毁之前。

以此类推...

### 作用域插槽

作用域插槽，它允许你在一个组件中定义具有局部作用域的插槽。通过作用域插槽，可以将组件的属性传递给插槽内容，从而使插槽内容能够根据组件的状态进行动态渲染。  
作用域插槽使用 `v-slot` 指令来定义，它可以接受一个参数，该参数指定了要传递给插槽的属性名。  
下面是具名插槽+作用域插槽的例子：

> 如果不写名字就是默认插槽

```script
<!-- <template #ScopedSlot="{list}"></template> -->
<template>     
  <SlotComponent>       
      <!-- ScopedSlot是插槽名，params子组件传的是参数 -->       
      <template v-slot:ScopedSlot='params'>         
          <ul>           
            <li v-for='d in params.list' :key="d.id">           
              {{ d.name }}           
            </li>         
          </ul>       
      </template>     
  </SlotComponent>
</template>

<script>
  import SlotComponent from './SlotComponent.vue';

  export default {     
      components: { SlotComponent },
  };
</script>
```

子组件 SlotComponent：

```script
<template>     
  <section>       
    <slot name="ScopedSlot" :list="list" />     
  </section>
</template>

<script setup>    
import { reactive } from 'vue';
    
let list = reactive([       
  { id: '001', name: 'test-01' },
  { id: '002', name: 'test-02' }     
])
</script>
```

### 提高性能-浅层次响应

`shallowRef()`与`ref()`类似，但它不支持深度响应性，是浅层次响应。

对嵌套对象的属性或数组元素的修改不会触发响应性。这在需要优化性能并避免不必要的深度响应性跟踪时非常有用。这样使用浅的响应式提高性能，只有最外一层是响应式。

> shallowReactive 同理

### 响应式对象 => 原始对象

`toRaw()` 是用于将响应式对象转换为原始对象。以便在需要时进行操作。转换后的对象不再具有响应性，对其进行的更改不会触发 Vue 的更新机制。

```script
import { reactive, toRaw } from 'vue';

const obj = reactive({ name: 'John', age: 24 });

const rawObj = toRaw(obj);
console.log(rawObj);    // 输出：{ name: 'John', age: 24 }

rawObj.name = 'Alice';
console.log(obj.name); // 输出：'John'
```

### 创建自定义的 ref

`customRef` 是 Vue 3 中引入的一个新特性，用于创建自定义的 ref，让用户来决定什么时候收集和执行依赖，从而更好地控制行为和逻辑。customRef 接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。

track 用于追踪数据，trigger 用于触发响应，更新视图。一般 track 方法放在 get 中，trigger 方法放在 set 中。

```script
import { customRef } from 'vue';

const myCustomRef = customRef((track, trigger) => {
    // 在这里编写自定义的逻辑
     return {
        get() {    
           track() // 跟踪    
        },       
        set(value) {         
          trigger() // 触发       
        }     
    }
});

// 在组件中使用自定义的 ref
const myComponent = {     
    template: `<section ref="myCustomRef"></section>`,
    setup() {       
      const myCustomRef = myCustomRef();
      console.log(myCustomRef.value); // 获取当前的引用值
    }
};
```

### 获取未在 props 中声明的属性

`$attrs` 可以用于获取父组件传递的属性值，或者在组件内部未在 props 中声明的属性。

注意：$attrs 中的属性是只读的，不能直接修改。如果需要在组件内部处理未在 props 中声明的属性，可以使用 v-bind 指令或动态组件来实现。

```script
<!-- 传值给子组件 -->
<child-component :id="id" :style="style" some-other-attribute="value"></child-component>

export default {     
  props: ['id', 'style'], // props只接收了id跟style     
  created() {       
    console.log(this.$attrs); // $attrs能实现全部获取，输出：{ id: "id", style: "style", someOtherAttribute: "value" }
  }
};
```

### 组件间通信

$parent 和 refs 是用于组件间通信和访问的属性。需要配合`defineExpose`一起使用

- refs 可以用于在模板中访问子组件或 DOM 元素。在模板中的元素或组件上使用 ref 属性来定义一个引用名称，然后在组件的 JavaScript 代码中通过 `$refs` 访问到这个元素或组件。
- parent 指向当前组件的父组件实例。通过 `$parent`，可以访问父组件的属性、方法和事件等。

父组件 $refs 示例代码：

```script
<template>     
  <section>       
    <button @click="myButton($refs)">点击我</button>       
    <!-- 子组件 -->       
    <ChildComponent1 />       
    <ChildComponent2 />     
  </section>
</template>

<script setup>     
  import ChildComponent1 from '/ChildComponent1.vue';     
  import ChildComponent2 from '/ChildComponent2.vue';
  import { ref, defineExpose } from 'vue';
          
  let value=ref('666');
   
  function myButton(refs) {
      // refs是子组件的集合       
      for(let key in refs){         
        refs[key].val += 1 // 操作每个子组件的 val + 1       
      }     
  }     
  defineExpose({value})
</script>

子组件 $parent 示例代码：

<template>     
  <section>       
    <button @click="parentMethod($parent)">点击我</button>
  </section>
</template>

<script>     
  import { ref } from 'vue';

  let value=ref('888');
  
  function myButton(parent) {       
    parent.value -= 1 // 子操作父的value     
  }

  defineExpose({value})
</script>
```

### 隔代通信

`provide` 是一个用于提供依赖注入的选项。可用于隔代通信；它允许父组件向其后代组件提供共享的数据或功能。在子组件中可以通过 inject 选项来接收父组件提供的属性。

```script
<template>     
  <section>       
    <Child />     
  </section>
</template>

<script setup>     
  import Child from './Child.vue';     
  import { ref, provide } from 'vue';
           
  let value = ref({ name:'sam', age:18 });

  // provide向后代提供数据     
  provide('val',value);
</script>

子组件 Child：

<template>     
  <section>       
    <!-- sam -->       
    姓名:{{data.name}}       
    <!-- 18 -->       
    年龄:{{data.age}}     
  </section>
</template>

<script setup>     
  import { inject } from 'vue';
     
  // inject接收数据     
  let data = inject('val', {
    // 第二个参数是默认值       
    name:'未知',       
    age:0     
  })
</script>
```
