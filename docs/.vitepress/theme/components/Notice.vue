<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)

function closeBulletin() {
  visible.value = false
}
</script>

<template>
  <div v-if="visible" class="notice">
    <div class="bulletin-wrapper card">
      <div class="bulletin-title">
        <span class="bulletin-icon left">
          <svg
            data-v-7192b94d=""
            width="20"
            height="20"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              data-v-7192b94d=""
              fill="currentColor"
              d="M880 112c-3.8 0-7.7.7-11.6 2.3L292 345.9H128c-8.8 0-16 7.4-16 16.6v299c0 9.2 7.2 16.6 16 16.6h101.6c-3.7 11.6-5.6 23.9-5.6 36.4c0 65.9 53.8 119.5 120 119.5c55.4 0 102.1-37.6 115.9-88.4l408.6 164.2c3.9 1.5 7.8 2.3 11.6 2.3c16.9 0 32-14.2 32-33.2V145.2C912 126.2 897 112 880 112M344 762.3c-26.5 0-48-21.4-48-47.8c0-11.2 3.9-21.9 11-30.4l84.9 34.1c-2 24.6-22.7 44.1-47.9 44.1"
            ></path>
          </svg>
          <span style="margin-left: 4px; font-size: 18px">广告</span>
        </span>
        <svg
          class="btn-close"
          @click="closeBulletin"
          t="1573745677073"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4448"
          width="22"
          height="22"
        >
          <path
            d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0"
            p-id="4449"
          ></path>
        </svg>
      </div>

      <div class="bulletin-content">
        <h3 class="bulletin-h3 title">买白酒，找南将</h3>
        <img class="bulletin-img" src="/qrCode.jpg" />
      </div>
    </div>
  </div>
  <!-- 展示/隐藏 -->
  <div class="switch" v-else @click="visible = true">
    <svg
      data-v-7192b94d=""
      width="16"
      height="16"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-7192b94d=""
        fill="currentColor"
        d="M880 112c-3.8 0-7.7.7-11.6 2.3L292 345.9H128c-8.8 0-16 7.4-16 16.6v299c0 9.2 7.2 16.6 16 16.6h101.6c-3.7 11.6-5.6 23.9-5.6 36.4c0 65.9 53.8 119.5 120 119.5c55.4 0 102.1-37.6 115.9-88.4l408.6 164.2c3.9 1.5 7.8 2.3 11.6 2.3c16.9 0 32-14.2 32-33.2V145.2C912 126.2 897 112 880 112M344 762.3c-26.5 0-48-21.4-48-47.8c0-11.2 3.9-21.9 11-30.4l84.9 34.1c-2 24.6-22.7 44.1-47.9 44.1"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@property --rotate {
  syntax: '<angle>';
  initial-value: 132deg;
  inherits: false;
}

.switch {
  --color: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
  position: fixed;
  top: 42%;
  right: 2%;
  z-index: 99;

  svg {
    cursor: pointer;
  }
}

/* 当屏幕宽度 ≤ 500px，不展示 */
@media (max-width: 500px) {
  .notice {
    display: none;
  }
}

.notice {
  position: fixed;
  top: 40%;
  right: 1%;
  z-index: 99;
}

.card {
  background: #191c29 !important;
  position: absolute;
  right: 1%;
  top: 40%;
  width: 320px;
  height: 300px;
  padding: 3px;
  border-radius: 6px;
  font-size: 1.5em;
  // color: rgb(88 199 250 / 0%);
  cursor: pointer;
  font-family: cursive;

  svg {
    display: inline-block !important;
  }

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: rgb(88 199 250 / 100%);
    transition: color 1s;
    fill: #fff;
  }

  img {
    width: 240px !important;
    height: 200px !important;
    margin: 20px auto 0px;
  }

  .title {
    text-align: center;
  }
}

// .card:hover {
//   color: rgb(88 199 250 / 100%);
//   transition: color 1s;
// }

// .card:hover:before,
// .card:hover:after {
//   animation: none;
//   opacity: 0;
// }

.card::before {
  content: '';
  width: 330px;
  height: 308px;
  border-radius: 8px;
  background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
  position: absolute;
  z-index: -1;
  top: -1%;
  left: -2%;
  animation: spin 2.5s linear infinite;
}

.card::after {
  position: absolute;
  content: '';
  top: 20%;
  right: 1%;
  z-index: -1;
  height: 300px;
  width: 300px;
  margin: 0 auto;
  transform: scale(0.8);
  filter: blur(calc(400px / 6));
  background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
  opacity: 1;
  transition: opacity 0.5s;
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
</style>
