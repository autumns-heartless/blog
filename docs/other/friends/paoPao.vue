<template>
  <div id="boxes">
    <div style="--color: #f44336">唐佳琪</div>
    <div style="--color: #e91e63">章家龙</div>
    <div style="--color: #9c27b0">井文超</div>
    <!-- <div style="--color: #2196f3"></div>
    <div style="--color: #4caf50"></div>
    <div style="--color: #ff9800"></div> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  var boxes = document.querySelectorAll('#boxes > div')
  ;[].forEach.call(boxes, (box) => {
    box.addEventListener('mousemove', (e) => {
      document.body.style.setProperty('--bg-color', box.style.getPropertyValue('--color'))
      var size = parseInt(getComputedStyle(box).width)
      var x = size * 0.3 * 0.7 + 0.7 * e.offsetX
      var y = size * 0.3 * 0.7 + 0.7 * e.offsetY
      box.style.setProperty('--x', x)
      box.style.setProperty('--y', y)
      box.style.setProperty('--size', size)
    })
  })
})
</script>

<style scoped lang="scss">
@import './scss/paopao.scss';
</style>
