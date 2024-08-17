<template>
  <ul class="ul">
    <template v-if="theme.website?.cardMusic">
      <li class="li" v-if="isPause" @click="togglePlay">
        <div class="group">
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"
              fill="currentColor"
            ></path>
          </svg>
          播放音乐
          <span class="VPBadge warning strong mini">🎵</span>
        </div>
      </li>
      <li class="li" v-else @click="togglePlay">
        <div class="group">
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z" fill="currentColor"></path>
          </svg>
          停止音乐
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useData } from 'vitepress'
import { usePlayerStore } from '../../store/player'
import type { Song } from '../types'

const { theme } = useData()
const { togglePlay, isPause } = toRefs(usePlayerStore())
const { pushPlayList } = usePlayerStore()

const songList = ref<Song[]>()
songList.value = theme.value?.music ? theme.value.music : []
songList.value && pushPlayList(true, ...songList.value)
</script>

<style>
.ul {
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  .li {
    padding: 5px 10px;
    margin: 0 10px;
    transition: all 0.5s ease;
    cursor: pointer;

    .group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;

      .strong {
        position: absolute;
        left: 100%;
        word-break: keep-all;
        transform: translate(-15px, -5px) scale(0.8);
        top: 0;
      }
    }

    .svg {
      width: 14px;
      object-fit: fill;
      fill: currentColor;
      margin-right: 8px;
    }
  }

  .li:hover {
    color: var(--vp-c-brand-1);
    transition: all 0.5s ease;
  }
}
</style>
