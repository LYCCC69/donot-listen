<template>
  <div class="dictation-panel">
    <h3>听写模式</h3>
    <div v-if="!currentLine" class="empty-state">播放音频开始听写</div>
    <div v-else class="dictation-content">
      <div class="dictation-info">
        <span>句子 {{ currentLine.number }}</span>
        <button class="play-btn" @click="$emit('replay')">重播</button>
      </div>
      <textarea
        v-model="userInput"
        placeholder="在此输入你听到的内容..."
        rows="3"
      ></textarea>
      <button @click="checkAnswer">对照原文</button>
      <div v-if="showResult" class="dictation-result">
        <p class="correct-text">{{ currentLine.text }}</p>
        <p class="accuracy">{{ accuracy }}% 匹配</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ currentLine: Object })
defineEmits(['replay'])

const userInput = ref('')
const showResult = ref(false)
const accuracy = ref(0)

function checkAnswer () {
  if (!userInput.value.trim()) return
  const a = userInput.value.trim().toLowerCase()
  const b = currentLine.text.toLowerCase()
  let matches = 0
  const words = b.split(/\s+/)
  for (const w of words) {
    if (a.includes(w)) matches++
  }
  accuracy.value = Math.round((matches / words.length) * 100)
  showResult.value = true
}
</script>

<style scoped>
.dictation-panel {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 24px;
  margin-top: 16px;
}
.dictation-content {
  margin-top: 12px;
}
.dictation-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.play-btn {
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 13px;
}
textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 12px;
  font-size: 14px;
  resize: none;
  outline: none;
}
textarea:focus {
  border-color: var(--color-primary);
}
.dictation-result {
  margin-top: 12px;
  padding: 16px;
  background: var(--color-bg);
  border-radius: var(--radius);
}
.correct-text {
  font-size: 15px;
  margin-bottom: 8px;
}
.accuracy {
  font-size: 13px;
  color: var(--color-text-secondary);
}
.empty-state {
  color: var(--color-text-secondary);
  padding: 24px;
  text-align: center;
}
</style>
