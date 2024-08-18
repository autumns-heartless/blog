<template>
  <div :style="mainDivStyles" @click="changeStatus">
    <div
      id="baby_plum"
      :class="['baby_plum_anim', babyPlumClass]"
      :style="babyPlumStyles"
      @mouseover="mouseoverHandler"
      @mouseout="mouseoutHandler"
      @animationend="animationEndHandler"
    ></div>
  </div>
</template>

<script>
// 点击后生成新的坐标位置, 随机
let clickStatus = false
export default {
  data() {
    return {
      isIdle: true,
      isClick: false,
      babyPlumClass: 'baby_plum_anm_Idle',
      mainDivStyles: {
        zIndex: 1000,
        position: 'absolute',
        left: '0px',
        top: '0px',
        transform: 'translate(100.484px, 200.938px)',
        transition: 'transform 2s', // 定义动画效果
      },
      babyPlumStyles: {
        position: 'absolute',
        left: '0px',
        top: '0px',
      },
      targetPosition: { x: 100.484, y: 200.938 }, // 结束动画后的目标位置
    }
  },
  methods: {
    mouseoverHandler() {
      this.babyPlumClass = 'baby_plum_anm_HelloLoop'
    },
    mouseoutHandler() {
      if (clickStatus) {
        this.babyPlumClass = 'baby_plum_anm_Idle'
      } else {
        // 定时一定时间, 才
        setTimeout(() => {
          this.babyPlumClass = 'baby_plum_anm_Idle'
          this.isIdle = true
          this.isClick = false
          clickStatus = false
        }, 500)
      }
    },
    changeStatus() {
      this.isIdle = false
      this.isClick = true
      this.babyPlumClass = 'baby_plum_anm_Attack1'
      clickStatus = true

      // 1 更新目标位置，然后修改transform效果
      this.targetPosition.x = Math.random() * window.innerWidth - 128 / 2 // 将目标坐标设为新的位置
      this.targetPosition.y = Math.random() * window.innerHeight - 128 / 2 // 将目标坐标设为新的位置
      this.mainDivStyles.transform = `translate(${this.targetPosition.x}px, ${this.targetPosition.y}px)`

      setTimeout(() => {
        this.babyPlumClass = 'baby_plum_anm_Idle'
        this.isIdle = true
        this.isClick = false
        clickStatus = false
      }, 1000)
    },
  },
}
</script>

<style scoped>
@import '../styles/baby_pulm.scss';
</style>
