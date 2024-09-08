<template>
  <div class="container">
    <div class="text__box one">本次调薪申请以职级变化 和 所作贡献 为主要出发点</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  margin-top: 20px;
}

.text__box {
  position: relative;
  overflow: hidden;
  width: 0;
  font-size: 20px;
  line-height: 40px;
  font-family: 'Courier New', Courier, monospace;
  white-space: nowrap;
  animation: width 4s steps(25) forwards;

  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-size: 20% 20%;
  margin-bottom: 16px;

  &::after {
    content: '';
    position: absolute;
    right: 0px;
    height: 32px;
    border-right: 1px solid #000;
    animation: showInfinite 0.5s 5 both; //	执行 5 次
  }
}

.one {
  animation-delay: 0s;
}

.two {
  animation-delay: 2s;
  &::after {
    animation-delay: 2s;
  }
}

@keyframes width {
  0% {
    width: 0;
  }
  100% {
    width: 25em; //  单位em,表示一个字体的宽度
  }
}

@keyframes showInfinite {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
