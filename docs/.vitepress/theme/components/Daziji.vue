<template>
  <p class="text useAnimation">欢迎来到我的博客~</p>
</template>

<style scoped>
.text {
  border-right: 2px solid #eee;
  font-size: 40px;
  white-space: nowrap;
  overflow: hidden;
}
.useAnimation {
  animation: width-change 4s steps(44) 1s normal both, color-change 0.5s steps(44) infinite normal;
}

@keyframes width-change {
  from {
    width: 0;
  }
  to {
    width: 350px;
  }
}
/* 竖线的闪烁效果 */
@keyframes color-change {
  from {
    border-right-color: #363636;
  }
  to {
    border-right-color: #ffffff;
  }
}
</style>
