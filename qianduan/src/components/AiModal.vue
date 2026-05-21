<template>
  <div class="ai-modal-overlay" @click.self="$emit('close')">
    <div class="ai-modal">
      <div class="ai-modal-header">
        <h3>AI 解析</h3>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="ai-modal-body">
        <div v-if="loading" class="state-msg">AI 分析中...</div>
        <div v-else-if="error" class="state-msg error">{{ error }}</div>
        <div v-else class="ai-content" v-html="renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '../runtime/apiClient'

const props = defineProps({ lineId: String })
defineEmits(['close'])

const loading = ref(true)
const error = ref('')
const content = ref('')

const renderedContent = computed(() => {
  if (!content.value) return ''
  return content.value
    .replace(/\n/g, '<br>')
    .replace(/【([^】]+)】/g, '<strong>【$1】</strong>')
})

onMounted(async () => {
  try {
    content.value = await apiClient.getAiExplain(props.lineId)
  } catch (e) {
    error.value = 'AI 解析暂不可用'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.ai-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.ai-modal {
  background: var(--color-surface);
  border-radius: 12px;
  width: 90%;
  max-width: 560px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}
.ai-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}
.close-btn {
  background: none;
  color: var(--color-text-secondary);
  font-size: 18px;
  padding: 4px;
}
.ai-modal-body {
  padding: 20px;
  overflow-y: auto;
  max-height: 60vh;
}
.ai-content {
  line-height: 1.8;
  font-size: 14px;
}
.state-msg {
  text-align: center;
  padding: 32px;
  color: var(--color-text-secondary);
}
.state-msg.error { color: var(--color-danger); }
</style>
