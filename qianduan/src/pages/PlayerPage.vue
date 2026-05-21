<template>
  <div class="player-page">
    <SidebarNav :data="navData" :error="navError" :current-id="store.currentMaterial?.id" @select="onMaterialSelect" />
    <div class="player-main">
      <!-- 顶部：标题栏 + 播放进度条 -->
      <div class="top-bar">
        <div class="top-bar-info">
          <div v-if="store.currentMaterial" class="material-tags">
            <span class="tag tag-year">{{ store.currentMaterial.year }}年</span>
            <span class="tag" :class="'tag-' + (store.currentMaterial.type || '').toLowerCase()">{{ typeLabel(store.currentMaterial.type) }}</span>
          </div>
          <h2 class="material-title">{{ store.currentMaterial?.title || '选择听力材料' }}</h2>
        </div>
        <div class="top-bar-controls">
          <button type="button" class="play-btn" @click="handlePlayClick">
            <span class="play-icon">{{ store.isPlaying ? '⏸' : '▶' }}</span>
          </button>
          <div class="progress-area">
            <input
              type="range"
              class="progress-slider"
              min="0"
              :max="store.duration || 0"
              :value="store.currentTime"
              @input="onSeeking"
              @change="onSeekCommitted"
              @mousedown="onSeekStart"
            />
            <span class="time-text">{{ formatTime(store.currentTime) }} / {{ formatTime(store.duration) }}</span>
          </div>
          <select v-if="setItems.length > 1" class="set-select-top" @change="onSetChange" :value="store.currentMaterial?.id">
            <option v-for="item in setItems" :key="item.id" :value="item.id">
              {{ item.typeLabel }} — {{ item.title }}
            </option>
          </select>
        </div>
      </div>

      <!-- 正文：字幕文本 -->
      <div class="transcript-area">
        <div v-if="store.transcriptLines.length === 0" class="empty-state">
          <p>选择左侧听力材料开始学习</p>
        </div>
        <div
          v-for="(line, index) in store.transcriptLines"
          :key="line.id || index"
          :class="['transcript-line', {
            'line-active': index === store.currentLineIndex,
            'line-understood': store.feedbackStatus[line.number] === 'UNDERSTOOD',
            'line-familiar': store.feedbackStatus[line.number] === 'FAMILIAR',
            'line-unfamiliar': store.feedbackStatus[line.number] === 'UNFAMILIAR'
          }]"
          @click="onSeekToLine(index)"
        >
          <span class="line-num">{{ line.number }}</span>
          <span class="line-text">{{ line.text }}</span>
        </div>
      </div>

      <!-- 翻译面板 -->
      <div v-if="showTranslation && store.currentLine" class="translation-bar">
        <span class="translation-label">中文翻译</span>
        <span class="translation-text">{{ store.currentLine.cn || '（暂无翻译）' }}</span>
        <span v-if="store.currentLine.grammar" class="translation-grammar">{{ store.currentLine.grammar }}</span>
      </div>

      <!-- 底部：功能按钮 -->
      <div class="bottom-bar" v-if="store.currentLine">
        <button type="button" class="action-btn" :class="{ active: showTranslation }" @click="showTranslation = !showTranslation">
          <span class="action-icon">译</span>
          <span>翻译</span>
        </button>
        <button type="button" class="action-btn" :class="{ active: loopMode === 'single' }" @click="toggleLoop">
          <span class="action-icon">🔁</span>
          <span>{{ loopMode === 'single' ? '停止循环' : '单句循环' }}</span>
        </button>
        <button type="button" class="action-btn" :class="{ active: autoNext }" @click="toggleAutoNext">
          <span class="action-icon">⏭</span>
          <span>{{ autoNext ? '关闭连播' : '自动连播' }}</span>
        </button>
        <button type="button" class="action-btn" @click="onFeedback(store.currentLine.number, 'UNDERSTOOD')">
          <span class="action-icon">✓</span>
          <span>懂了</span>
        </button>
        <button type="button" class="action-btn" @click="onFeedback(store.currentLine.number, 'UNFAMILIAR')">
          <span class="action-icon">?</span>
          <span>陌生</span>
        </button>
        <button type="button" class="action-btn" @click="openAiModal">
          <span class="action-icon">AI</span>
          <span>解析</span>
        </button>
      </div>
    </div>

    <AiModal
      v-if="showAiModal"
      :line-id="aiLineId"
      @close="showAiModal = false"
    />

    <!-- 隐藏的 audio 元素 — Vue 管理 :src 和生命周期 -->
    <audio ref="audioElement" :src="audioUrl" key="main-audio-player" style="display:none"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useListeningStore } from '../runtime/stores'
import { usePlayerRuntime } from '../composables/usePlayerRuntime'
import { useNavigationData } from '../composables/useNavigationData'
import SidebarNav from '../components/SidebarNav.vue'
import AiModal from '../components/AiModal.vue'

const route = useRoute()
const store = useListeningStore()
const { navData, error: navError } = useNavigationData()

const audioElement = ref(null)
const audioUrl = ref('')

const { loadMaterial, setItems, play, pause, seekToLine, setAutoNext, setLoopMode, onPlaybackEnded, submitFeedback, getController } = usePlayerRuntime(audioElement, audioUrl)

const showAiModal = ref(false)
const aiLineId = ref(null)
const showTranslation = ref(false)
const autoNext = ref(localStorage.getItem('autoNextDefault') === 'true')
const loopMode = ref('none')
const isSeeking = ref(false)

onMounted(async () => {
  const id = route.query.id
  if (id) {
    await loadMaterial(id)
  }
  if (autoNext.value) {
    setAutoNext(true)
  }
  onPlaybackEnded(() => {
    store.setPlaying(false)
  })
})

async function onMaterialSelect (id) {
  await loadMaterial(id)
}

function onSetChange (e) {
  const id = e.target.value
  if (id && id !== store.currentMaterial?.id) {
    loadMaterial(id)
  }
}

function typeLabel (type) {
  return { LECTURE: '新闻', DIALOGUE: '对话', PASSAGE: '短文', DICTADO: '听写' }[type] || type
}

function formatTime (s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function handlePlayClick () {
  const ctrl = getController()
  if (!ctrl) return
  if (store.isPlaying) {
    pause()
  } else {
    ctrl.play()
  }
}

function onSeekStart () {
  isSeeking.value = true
  getController()?.setSeeking(true)
}

function onSeeking (e) {
  const time = parseFloat(e.target.value)
  store.currentTime = time
}

function onSeekCommitted (e) {
  const time = parseFloat(e.target.value)
  store.currentTime = time
  getController()?.seek(time)
  getController()?.setSeeking(false)
  isSeeking.value = false
}

function onSeekToLine (index) {
  store.setCurrentLineIndex(index)
  seekToLine(index)
}

function toggleAutoNext () {
  autoNext.value = !autoNext.value
  setAutoNext(autoNext.value)
}

function toggleLoop () {
  loopMode.value = loopMode.value === 'single' ? 'none' : 'single'
  setLoopMode(loopMode.value)
}

function openAiModal () {
  const line = store.currentLine
  aiLineId.value = line?.id || String(line?.number || '')
  showAiModal.value = true
}

async function onFeedback (lineNumber, status) {
  const ok = await submitFeedback(lineNumber, status)
  if (ok) {
    store.setFeedback(lineNumber, status)
  }
}
</script>

<style scoped>
.player-page {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}

.player-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
}

/* ====== 顶部栏 ====== */
.top-bar {
  flex-shrink: 0;
  padding: 20px 28px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.top-bar-info {
  margin-bottom: 12px;
}
.material-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
}
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  letter-spacing: 0.3px;
  color: #fff;
}
.tag-year { background: #4f46e5; }
.tag-dictado { background: #7c3aed; }
.tag-passage { background: #d97706; }
.tag-lecture { background: #2563eb; }
.tag-dialogue { background: #059669; }
.material-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.3px;
}
.top-bar-controls {
  display: flex;
  align-items: center;
  gap: 14px;
}
.play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4f46e5;
  color: #fff;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 18px;
  transition: background 0.15s;
}
.play-btn:hover { background: #4338ca; }
.play-btn.loading { opacity: 0.7; }
.play-icon { line-height: 1; }
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.progress-area {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.progress-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #e2e8f0;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #4f46e5;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  cursor: pointer;
}
.time-text {
  font-size: 13px;
  color: #94a3b8;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  min-width: 95px;
  text-align: right;
}
.set-select-top {
  padding: 6px 10px;
  font-size: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
  outline: none;
  max-width: 200px;
}

/* ====== 字幕区域 ====== */
.transcript-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
  font-size: 15px;
}
.transcript-line {
  display: flex;
  gap: 14px;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s;
  margin-bottom: 2px;
  border-left: 3px solid transparent;
}
.transcript-line:hover { background: #f8fafc; }
.line-active {
  background: #eef2ff;
  border-left-color: #4f46e5;
}
.line-understood { border-left-color: #22c55e; background: #f0fdf4; }
.line-familiar { border-left-color: #f59e0b; background: #fffbeb; }
.line-unfamiliar { border-left-color: #ef4444; background: #fef2f2; }
.line-num {
  min-width: 26px;
  text-align: right;
  font-size: 13px;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
  padding-top: 1px;
  flex-shrink: 0;
}
.line-text {
  flex: 1;
  font-size: 16px;
  line-height: 1.8;
  color: #1e293b;
  letter-spacing: 0.3px;
}

/* ====== 翻译面板 ====== */
.translation-bar {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 28px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
.translation-label {
  font-size: 15px;
  font-weight: 600;
  color: #4f46e5;
  white-space: nowrap;
  padding-top: 2px;
}
.translation-text {
  font-size: 17px;
  line-height: 1.8;
  color: #1e293b;
}
.translation-grammar {
  display: block;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e2e8f0;
  font-size: 14px;
  line-height: 1.7;
  color: #7c3aed;
}

/* ====== 底部功能栏 ====== */
.bottom-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #475569;
  cursor: pointer;
  transition: all 0.12s;
  white-space: nowrap;
}
.action-btn:hover {
  border-color: #4f46e5;
  color: #4f46e5;
  background: #f8f7ff;
}
.action-btn.active {
  border-color: #4f46e5;
  background: #eef2ff;
  color: #4f46e5;
}
.action-icon {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}
</style>
