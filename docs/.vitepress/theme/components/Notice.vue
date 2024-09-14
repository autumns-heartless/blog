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
            class="bulletin-icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            style="width: 20px; height: 20px; font-size: 20px; color: rgb(255, 255, 255)"
          >
            <path
              d="M27.16 8.08l-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88z"
              fill="currentColor"
            ></path>
            <path
              d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59z"
              fill="currentColor"
            ></path>
            <path
              d="M18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1zM4 20h6.08a1 1 0 0 1 .71.3L17 26.57V5.43l-6.21 6.27a1 1 0 0 1-.71.3H4z"
              fill="currentColor"
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
</template>

<style lang="scss" scoped>
@property --rotate {
  syntax: '<angle>';
  initial-value: 132deg;
  inherits: false;
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
