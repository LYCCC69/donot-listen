<template>
  <div class="transcript-panel">
    <div v-if="lines.length === 0" class="empty-state">
      选择听力材料开始学习
    </div>
    <div
      v-for="(line, index) in lines"
      :key="line.id"
      :class="['line', { 'line--active': index === currentLineIndex, 'line--understood': feedbackStatus[line.number] === 'UNDERSTOOD', 'line--familiar': feedbackStatus[line.number] === 'FAMILIAR', 'line--unfamiliar': feedbackStatus[line.number] === 'UNFAMILIAR', 'line--looping': index === currentLineIndex && loopMode === 'single' }]"
      @click="$emit('seek', index)"
    >
      <span class="line-number">{{ line.number }}</span>
      <span v-if="line.speaker" class="line-speaker">{{ line.speaker }}</span>
      <span class="line-text">{{ line.text }}</span>
      <span v-if="index === currentLineIndex && loopMode === 'single'" class="loop-badge" title="单句循环中">循环</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lines: { type: Array, default: () => [] },
  currentLineIndex: { type: Number, default: 0 },
  loopMode: { type: String, default: 'none' },
  feedbackStatus: { type: Object, default: () => ({}) }
})
defineEmits(['seek'])
</script>

<style scoped>
.transcript-panel {
  max-width: 720px;
  margin: 0 auto;
}
.empty-state {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 80px 20px;
  font-size: 16px;
}
.line {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s;
  margin-bottom: 2px;
  position: relative;
}
.line:hover {
  background: #f8fafc;
}
.line--active {
  background: #eef2ff;
  border-left: 3px solid var(--color-primary);
}
.line--active.line--looping {
  background: #fefce8;
  border-left-color: #eab308;
}
.line--understood { border-left: 3px solid var(--color-success); }
.line--familiar { border-left: 3px solid var(--color-warning); }
.line--unfamiliar { border-left: 3px solid var(--color-danger); }
.line-number {
  color: var(--color-text-secondary);
  font-size: 11px;
  min-width: 22px;
  text-align: right;
  padding-top: 2px;
  font-variant-numeric: tabular-nums;
}
.line-speaker {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 12px;
  min-width: 20px;
  padding-top: 2px;
  flex-shrink: 0;
}
.line-text {
  flex: 1;
  font-size: 17px;
  line-height: 1.8;
  letter-spacing: 0.3px;
}
.loop-badge {
  position: absolute;
  right: 8px;
  top: 4px;
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 3px;
  background: #fef3c7;
  color: #b45309;
  font-weight: 600;
  letter-spacing: 0.3px;
}
</style>
