# 📦 组件（零）之 前言

#### **为什么要**📦**组件 ？**

> 以后台管理系统为例，项目中 el-form-item、el-table-column 冗余，导致代码可读性差、可维护性差，变相增加了代码体积

#### 📦**组件有什么好处 ？**

- 复用性：提高代码复用率，**提高开发效率**，避免重复造轮子
- 维护性：降低代码耦合度，更容易**定位和修复问题**
- 可读性：代码看起来更清晰，有利于**心情舒畅、身心健康**
- 成长性：有利于**提高个人技术**😄

#### 📦**组件的几大要素：(\$attrs、\$listeners、slot、10 种传值方式)**

#### 📦**组件的核心思想：**

> 以 封装 vxe-grid 为例

1. 观察项目中所有表格的**共性**
2. 将这些**共性**通过**props**传递并设置**默认值**
3. 在子组件上绑定 **v-bind="\$attrs" v-on="\$listeners"**，以兼容和接收原始组件的其余属性、方法
4. 留好**插槽**，以供使用组件时可进行**定制化开发**
5. 最后就是关于子组件的**样式**问题，可在公共样式或子组件内部定义好

> 另外 1 个就是关于自定义组件，可能涉及到 v-model 这个点
