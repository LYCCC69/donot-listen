<template>
  <div v-if="currentLine" class="feedback-bar">
    <span class="feedback-label">这句：</span>
    <button class="fb-btn understood" @click="$emit('feedback', currentLine.number, 'UNDERSTOOD')">懂了</button>
    <button class="fb-btn familiar" @click="$emit('feedback', currentLine.number, 'FAMILIAR')">熟悉</button>
    <button class="fb-btn unfamiliar" @click="$emit('feedback', currentLine.number, 'UNFAMILIAR')">陌生</button>
  </div>
</template>

<script setup>
defineProps({ currentLine: Object })
defineEmits(['feedback'])
</script>

<style scoped>
.feedback-bar {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--color-surface);
  padding: 16px 12px;
  border-radius: var(--radius);
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  z-index: 100;
}
.feedback-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: center;
}
.fb-btn {
  writing-mode: horizontal-tb;
  font-size: 13px;
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}
.fb-btn.understood { border-color: var(--color-success); color: var(--color-success); }
.fb-btn.familiar { border-color: var(--color-warning); color: var(--color-warning); }
.fb-btn.unfamiliar { border-color: var(--color-danger); color: var(--color-danger); }
.fb-btn:hover {
  opacity: 0.8;
}
</style>
