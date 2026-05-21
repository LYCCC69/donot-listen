<template>
  <div class="player-bar">
    <div class="player-controls">
      <button :class="['ctrl-btn', { loading: isLoading }]" @click="isPlaying ? $emit('pause') : $emit('play')">
        {{ isPlaying ? '⏸' : '▶' }}
      </button>
      <span class="time">{{ formatTime(time) }}</span>
      <input
        type="range"
        class="progress"
        min="0"
        :max="dur || 0"
        :value="time"
        @input="handleSeek"
      />
      <span class="time">{{ formatTime(dur) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  isPlaying: Boolean,
  currentTime: Number,
  duration: Number,
  isLoading: Boolean,
  audioEl: { type: Object, default: null }
})
const emit = defineEmits(['play', 'pause', 'seek'])

const time = ref(0)
const dur = ref(0)
let rafId = null

function updateProgress () {
  const el = props.audioEl
  if (!el || !el.src) return
  // 只有在真正播放时才更新进度，暂停时绝不重置
  if (!el.paused) {
    time.value = el.currentTime
    if (el.duration && !isNaN(el.duration)) dur.value = el.duration
    rafId = requestAnimationFrame(updateProgress)
  }
}

function handleSeek () {
  const el = props.audioEl
  if (el) el.currentTime = parseFloat(time.value)
  emit('seek', time.value)
}

// 音频元素事件绑定（通过 watch 处理 audioEl 滞后设置的情况）
watch(() => props.audioEl, (el, old) => {
  if (old) {
    old.removeEventListener('play', onPlay)
    old.removeEventListener('pause', onPause)
    old.removeEventListener('loadedmetadata', onMeta)
  }
  if (el) {
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('loadedmetadata', onMeta)
    if (el.duration && !isNaN(el.duration)) dur.value = el.duration
    time.value = el.currentTime
  }
}, { immediate: true })

// 没有 audioEl 时回退到 store 的值
watch(() => props.currentTime, (t) => {
  if (!props.audioEl) time.value = t
})
watch(() => props.duration, (d) => {
  if (!props.audioEl) dur.value = d
})

function onPlay () {
  // 暂停→继续播放时启动 rAF，绝不重置 time
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateProgress)
}
function onPause () {
  // 暂停时停止 rAF，保存 currentTime 不动
  cancelAnimationFrame(rafId)
  rafId = null
  if (props.audioEl) time.value = props.audioEl.currentTime
}
function onMeta () {
  if (props.audioEl) dur.value = props.audioEl.duration
}

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  if (props.audioEl) {
    props.audioEl.removeEventListener('play', onPlay)
    props.audioEl.removeEventListener('pause', onPause)
    props.audioEl.removeEventListener('loadedmetadata', onMeta)
  }
})

function formatTime (s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.player-bar {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 12px 24px;
}
.player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}
.ctrl-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
}
.ctrl-btn.loading {
  opacity: 0.6;
}
.progress {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-border);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
}
.time {
  font-size: 13px;
  color: var(--color-text-secondary);
  min-width: 36px;
  font-variant-numeric: tabular-nums;
}
</style>
