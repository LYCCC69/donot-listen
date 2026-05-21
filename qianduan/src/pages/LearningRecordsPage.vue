<template>
  <div class="records-page">
    <h2>学习记录</h2>
    <div v-if="loading" class="state-msg">加载中...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>
    <template v-else>
      <div class="stats-cards">
        <div class="stat-card">
          <span class="stat-value">{{ stats.totalListeningTime || 0 }}</span>
          <span class="stat-label">总时长(秒)</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ stats.totalUnderstood || 0 }}</span>
          <span class="stat-label">听懂</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ stats.totalFamiliar || 0 }}</span>
          <span class="stat-label">熟悉</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ stats.totalUnfamiliar || 0 }}</span>
          <span class="stat-label">陌生</span>
        </div>
      </div>
      <ul v-if="records.length" class="records-list">
        <li v-for="r in records" :key="r.id" class="record-item">
          <span>{{ r.listeningTitle }}</span>
          <span class="meta">{{ formatDate(r.lastPractice) }}</span>
        </li>
      </ul>
      <div v-else class="state-msg empty">暂无学习记录</div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../runtime/apiClient'
import { formatDate } from '../utils/format'
import { useProtectedPage } from '../composables/useProtectedPage'

useProtectedPage()

const loading = ref(false)
const error = ref('')
const stats = ref({})
const records = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const data = await apiClient.getLearningRecords({ page: 1, pageSize: 20 })
    stats.value = data.statistics || {}
    records.value = data.records || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.records-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;
}
.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 24px 0;
}
.stat-card {
  background: var(--color-surface);
  padding: 20px;
  border-radius: var(--radius);
  text-align: center;
  box-shadow: var(--shadow);
}
.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}
.stat-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}
.records-list {
  list-style: none;
}
.record-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-surface);
  border-radius: var(--radius);
  margin-bottom: 6px;
  box-shadow: var(--shadow);
}
.state-msg {
  text-align: center;
  padding: 48px;
  color: var(--color-text-secondary);
}
.state-msg.error { color: var(--color-danger); }
</style>
