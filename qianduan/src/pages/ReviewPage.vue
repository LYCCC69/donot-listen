<template>
  <div class="review-page">
    <h2>复习训练</h2>
    <div v-if="loading" class="state-msg">加载中...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>
    <div v-else-if="queue.length === 0" class="state-msg empty">
      暂无待复习内容，继续学习新材料吧！
    </div>
    <ul v-else class="review-queue">
      <li v-for="item in queue" :key="item.id" class="review-item">
        <span>{{ item.listeningTitle }}</span>
        <span class="meta">熟练度: {{ item.masteryScore || '-' }}</span>
        <button @click="startReview(item)">开始复习</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import apiClient from '../runtime/apiClient'
import { useProtectedPage } from '../composables/useProtectedPage'

useProtectedPage()
const runtime = inject('runtime')

const queue = ref([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    queue.value = await apiClient.get('/review/queue')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

function startReview (item) {
  runtime.showToast('复习功能开发中', 'info')
}
</script>

<style scoped>
.review-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;
}
.review-queue {
  list-style: none;
  margin-top: 24px;
}
.review-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--color-surface);
  border-radius: var(--radius);
  margin-bottom: 8px;
  box-shadow: var(--shadow);
}
.review-item span:first-child {
  flex: 1;
}
.meta {
  color: var(--color-text-secondary);
  font-size: 13px;
}
.state-msg {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary);
}
.state-msg.error { color: var(--color-danger); }
</style>
