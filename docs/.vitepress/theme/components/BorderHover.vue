<template>
  <div class="container">
    <div class="card">
      <div class="inner">
        <p>黄鹤楼送孟浩然之广陵</p>
        <p>唐 · 李白</p>
        <p>故人西辞黄鹤楼，烟花三月下扬州。</p>
        <p>孤帆远影碧空尽，唯见长江天际流。</p>
      </div>
    </div>
    <div class="card">
      <div class="inner">
        <p>送元二使安西</p>
        <p>唐 · 王维</p>
        <p>渭城朝雨浥轻尘，客舍青青柳色新。</p>
        <p>劝君更尽一杯酒，西出阳关无故人。</p>
      </div>
    </div>
    <div class="card">
      <div class="inner">
        <p>春日</p>
        <p>宋 · 朱熹</p>
        <p>胜日寻芳泗水滨，无边光景一时新。</p>
        <p>等闲识得东风面，万紫千红总是春。</p>
      </div>
    </div>
    <div class="card">
      <div class="inner">
        <p>小池</p>
        <p>唐 · 杨万里</p>
        <p>泉眼无声惜细流，树阴照水爱晴柔。</p>
        <p>小荷才露尖尖角，早有蜻蜓立上头。</p>
      </div>
    </div>
    <div class="card">
      <div class="inner">
        <p>村居</p>
        <p>清 · 高鼎</p>
        <p>草长莺飞二月天，拂堤杨柳醉春烟。</p>
        <p>儿童散学归来早，忙趁东风放纸鸢。</p>
      </div>
    </div>
    <div class="card">
      <div class="inner">
        <p>晓出净慈寺送林子方</p>
        <p>唐 · 杨万里</p>
        <p>毕竟西湖六月中，风光不与四时同。</p>
        <p>接天莲叶无穷碧，映日荷花别样红。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const container = document.querySelector('.container')
  const cards = document.querySelectorAll('.card')

  container.onmousemove = (e) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
    }
  }
})
</script>

<style scoped lang="scss">
@import '../styles/border-hover.scss';
</style>
