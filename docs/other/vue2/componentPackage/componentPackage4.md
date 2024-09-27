# 📦 组件（四）之 自定义组件的 v-model（待完善）

> ##### 一般来说，v-model 是针对于 input 等表单元素使用的
>
> ##### 自 **V2.2.0+** 之后，**自定义组件** 也可以绑定 **v-model**

```javascript
🌟🌟🌟 假设我们正在开发一个简单的购物车组件，其中包含商品列表和购物车总价。
            我们可以使用自定义组件和 v-model 实现商品数量的控制和购物车总价的实时更新。

CartItem.vue（子组件---商品项组件）
<template>
  <div>
    <h3>{{ item.name }}</h3>
    <p>Price: ${{ item.price }}</p>
    <label>Quantity:</label>
    <input type="number" v-model="quantity" @input="updateQuantity">
  </div>
</template>

<script>
export default {
  props: ['item', 'value'],
  data() {
    return {
      quantity: this.value
    };
  },
  methods: {
    updateQuantity() {
      this.$emit('input', this.quantity);
    }
  },
  watch: {
    value(newValue) {
      this.quantity = newValue;
    }
  }
};
</script>

ShoppingCart.vue（父组件---购物车组件）
<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-for="(cartItem, index) in cartItems" :key="index">
      <CartItem :item="cartItem" v-model="cartQuantities[index]" />
    </div>
    <p>Total Price: ${{ total }}</p>
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  components: {
    CartItem
  },
  data() {
    return {
      cartItems: [
        { name: 'Product A', price: 10 },
        { name: 'Product B', price: 20 },
        { name: 'Product C', price: 30 }
      ],
      cartQuantities: [1, 2, 1]
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((total, item, index) => {
        return total + item.price * this.cartQuantities[index];
      }, 0);
    }
  }
};
</script>
```

在 Vue 2 中，`v-model` 是用于在自定义组件中实现双向数据绑定的指令。当你在一个自定义组件上使用 `v-model` 时，实际上是在使用该组件的 `value` prop 和 `input` 事件。

### 实现双向绑定的步骤：

1. **在父组件中传递值：**

- 在父组件中使用  `v-model`  来绑定一个数据变量到自定义组件上。

html 复制代码

```Plain Text
<custom-component v-model="data"></custom-component>

```

2. **在自定义组件中接收值：**

- 在自定义组件中定义一个  `value` prop，用于接收父组件传递的值。

javascript 复制代码

```Plain Text
props: ['value']

```

3. **在自定义组件中更新值：**

- 在自定义组件内部，当值发生变化时，通过触发一个名为  `input`  的事件来更新父组件绑定的值。

javascript 复制代码

```Plain Text
this.$emit('input', newValue);

```

### 在自定义组件中实现 v-model：

复制代码

在这个示例中，`CustomInput` 组件接收一个名为 `value` 的 prop，并在内部使用一个名为 `text` 的 data 属性来维护输入框的值。当输入框的值发生变化时，通过 `updateValue` 方法更新 `text` 的值，并通过 `$emit('input', this.text)` 触发 `input` 事件将新值传递给父组件。

通过以上步骤，您可以在 Vue 2 中自定义组件中使用 `v-model` 来实现双向数据绑定。

在 Vue.js 中，可以通过自定义组件的 `model` 选项来指定自定义组件的 prop 和 event 名称，以实现双向绑定。这在开发自定义输入组件时非常有用，例如创建一个搜索框组件。

### prop 和 event：

- **prop：** prop 是用于接收父组件传递的值的属性名称。
- **event：** event 是用于在组件内部更新值时触发的事件名称。

### 示例：

javascript 复制代码

```Plain Text
Vue.component('search-box', {
  model: {
    prop: 'searchValue',
    event: 'input'
  },
  props: {
    searchValue: String
  },
  template: `
    <input
      :value="searchValue"
      @input="$emit('input', $event.target.value)"
      placeholder="Search..."
    />
  `
});

new Vue({
  el: '#app',
  data: {
    form: {
      searchForm: ''
    }
  }
});

```

在这个示例中，我们定义了一个名为 `search-box` 的自定义组件，其中指定了 `model` 选项，将 `searchValue` 作为 prop 名称，`input` 作为事件名称。在组件中，我们使用 `:value="searchValue"` 将父组件传递的 `searchValue` 绑定到输入框的值上，并通过 `@input="$emit('input', $event.target.value)"` 在输入框值发生变化时触发 `input` 事件更新父组件的值。

在父组件中，可以像下面这样使用 `search-box` 组件，并通过 `v-model` 实现双向绑定：

html 复制代码

```Plain Text
<div id="app">
  <search-box v-model="form.searchForm"></search-box>
</div>

```

这样就可以通过 `v-model` 在父组件中实现双向绑定，将搜索框的值同步到父组件的 `form.searchForm` 中。

在 Vue.js 中，自定义组件的 `model` 选项用于配置自定义组件的双向绑定行为。通过定义 `model` 选项，您可以指定自定义组件的 prop 和 event 名称，实现和 `v-model` 相关行为的定制。下面详细解释 `model` 选项中的属性：

### 1\. prop

- **作用：** prop 是用于在父组件中向自定义组件传递初始值的属性名称。
- **默认值：**  默认值为  `'value'`，因为大多数情况下，`v-model`  的默认行为是基于一个名为  `'value'`  的 prop。
- **使用场景：**  当在自定义组件中需要使用不同的 prop 名称来接收父组件的值时，可以通过  `model`  选项中的  `prop`  属性指定。

### 2\. event

- **作用：** event 是用于在组件内部更新值时触发的事件名称。
- **默认值：**  默认值为空字符串，此时会自动根据 prop 名称生成一个对应的事件名称。
- **使用场景：**  当在组件内部需要触发一个特定事件来更新父组件的值时，可以通过  `model`  选项中的  `event`  属性指定。

### 示例：

javascript 复制代码

```Plain Text
Vue.component('custom-input', {
  model: {
    prop: 'customValue',
    event: 'customInput'
  },
  props: {
    customValue: String
  },
  template: `
    <input
      :value="customValue"
      @input="$emit('customInput', $event.target.value)"
    />
  `
});

```

在这个示例中，我们定义了一个自定义组件 `custom-input`，并使用 `model` 选项指定了 `prop` 为 `'customValue'`，`event` 为 `'customInput'`。这意味着父组件使用这个自定义组件时，需要将值传递给 `customValue` prop，并监听 `'customInput'` 事件来更新值。

通过合理设置 `model` 选项中的 `prop` 和 `event` 属性，您可以更灵活地定义自定义组件的双向绑定行为，适应不同的需求和场景。这样可以提高组件的可复用性和定制性。
