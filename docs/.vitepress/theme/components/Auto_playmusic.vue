<template>
  <div>
    <audio ref="musicPlayer" loop autoplay>
      <source :src="audioSource" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
    <button @click="togglePlayback" class="playback-button">
      {{ isPlaying ? '🎵 暂停' : '▶️ 播放' }}
    </button>
    <div class="lyrics">{{ displayedLyric }}</div>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      audioSource: '/audio/black.mp3', // 这里放你的音频文件路径
      isPlaying: false,
      lyrics: [],
      currentLyricIndex: 0,
      displayedLyric: '',
    }
  },

  mounted() {
    this.loadLyrics('/audio/black.lrc') // 这里放你的LRC歌词文件路径
    // 注: 自动播放的部分已经移动到按钮的点击事件中
    this.togglePlayback()
  },

  methods: {
    togglePlayback() {
      const player = this.$refs.musicPlayer
      if (!player.paused) {
        player.pause()
        this.isPlaying = false
      } else {
        player
          .play()
          .then(() => {
            this.isPlaying = true
          })
          .catch((error) => {
            console.log('播放被阻止:', error)
          })
      }
    },

    loadLyrics(lyricsPath) {
      fetch(lyricsPath)
        .then((response) => response.text())
        .then((text) => {
          this.lyrics = this.parseLyrics(text)
          // 设置定时器检查当前应显示的歌词
          setInterval(this.checkLyrics, 100)
        })
        .catch((error) => console.error(error))
    },

    parseLyrics(text) {
      const lines = text.split('\n')
      const pattern = /\[(\d{2}):(\d{2})\.(\d{2,3})]/
      return lines
        .map((line) => {
          const results = pattern.exec(line)
          if (results) {
            const time =
              parseInt(results[1]) * 60 * 1000 + // minutes
              parseInt(results[2]) * 1000 + // seconds
              parseInt(results[3].padEnd(3, '0')) // milliseconds
            return { time, text: line.replace(pattern, '').trim() }
          }
        })
        .filter((entry) => entry) // filter out null entries
    },

    checkLyrics() {
      const player = this.$refs.musicPlayer
      if (!player) {
        return
      }
      const currentTime = player.currentTime * 1000 // convert to milliseconds
      let lastPassedLyric = this.lyrics[this.currentLyricIndex]
      // Make sure we're not past the last lyric
      if (lastPassedLyric && currentTime >= lastPassedLyric.time) {
        // Check if we've passed the time for the next lyric
        for (let i = this.currentLyricIndex + 1; i < this.lyrics.length; i++) {
          if (this.lyrics[i].time > currentTime) {
            break
          }
          this.currentLyricIndex = i
          lastPassedLyric = this.lyrics[i]
        }
        // Update the displayed lyric
        this.displayedLyric = lastPassedLyric.text
      }
    },
  },
}
</script>

<style>
/* Add your styles here */
</style>

<style scoped>
.playback-button {
  border: none;
  border-radius: 30px; /* 圆角 */
  padding: 10px 10px;
  background-color: #4caf50; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  cursor: pointer; /* 鼠标悬停时的光标样式 */
  outline: none; /* 点击时去除焦点边框 */
  position: fixed; /* 固定定位 */
  bottom: 30px; /* 离底部的位置 */
  right: 10px; /* 离右边的位置 */
  z-index: 999;
}

.lyrics {
  position: fixed;
  bottom: 20px; /* 歌词距离底部的位置，可以根据页脚高度进行调整 */
  width: 100%;
  text-align: center;
  color: rgba(102, 172, 88, 0.5); /* 设置颜色为半透明，使用rgba的a值来控制透明度 */
  font-weight: bold; /* 加粗字体 */
  left: 0; /* 歌词居中对齐，左右设置为 0 */
  z-index: 999;
  padding: 0 40px; /* 两侧内边距，确保与播放按钮右侧对齐 */
}

/* 其他样式... */
</style>
