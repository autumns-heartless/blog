<template>
  <div class="container">
    <div class="text__box one name">生活不止眼前的苟且，还有诗和远方</div>
    <div class="text__box two text">这是最好的时代，也是最坏的时代</div>
    <!-- <div class="text__box three"></div> -->
    <!-- <div class="text__box four"></div> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}

.text__box {
  position: relative;
  overflow: hidden;
  width: 0;
  font-size: 40px;
  line-height: 40px;
  font-family: 'Courier New', Courier, monospace;
  white-space: nowrap;
  animation: width 4s steps(16) forwards;

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
  animation-delay: 4s;
  &::after {
    animation-delay: 2s;
  }
}

// .three {
//   animation-delay: 4s;
//   &::after {
//     animation-delay: 4s;
//   }
// }

// .four {
//   animation-delay: 6s;
//   &::after {
//     animation-delay: 6s;
//     animation: showInfinite 0.5s infinite both;
//   }
// }

@keyframes width {
  0% {
    width: 0;
  }
  100% {
    width: 16em; //  单位em,表示一个字体的宽度
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
