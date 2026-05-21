<template>
  <div class="favorites-page">
    <div class="page-header">
      <h2>我的收藏</h2>
      <span v-if="list.length" class="count">{{ list.length }} 项</span>
    </div>

    <div v-if="loading" class="state-msg">加载中...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>
    <div v-else-if="list.length === 0" class="state-msg empty">
      暂无收藏
      <span class="sub">点击听力材料旁的收藏按钮添加到此处</span>
    </div>

    <div v-else class="favorites-list">
      <div v-for="item in list" :key="item.id" class="favorite-card" @click="goPlay(item.listeningId)">
        <div class="card-left">
          <span class="type-badge" :class="typeClass(item.type)">{{ typeLabel(item.type) }}</span>
          <span class="title">{{ item.listeningTitle }}</span>
        </div>
        <div class="card-right">
          <span class="meta">{{ levelLabel(item.level) }}</span>
          <button class="remove-btn" @click.stop="remove(item.listeningId)" title="取消收藏">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../runtime/apiClient'
import { LEVEL, LISTENING_TYPE } from '../constants'
import { useProtectedPage } from '../composables/useProtectedPage'

useProtectedPage()
const router = useRouter()

const list = ref([])
const loading = ref(false)
const error = ref('')

function levelLabel (l) { return LEVEL[l] || l }
function typeLabel (t) { return LISTENING_TYPE[t] || t }
function typeClass (type) {
  return {
    LECTURE: 'badge-news',
    DIALOGUE: 'badge-dialogue',
    PASSAGE: 'badge-passage'
  }[type] || ''
}

async function fetch () {
  loading.value = true
  error.value = ''
  try {
    const data = await apiClient.getCollections({ page: 1, pageSize: 50 })
    list.value = data.list || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function remove (listeningId) {
  try {
    await apiClient.removeCollection(listeningId)
    list.value = list.value.filter(i => i.listeningId !== listeningId)
  } catch {
    error.value = '取消收藏失败'
  }
}

function goPlay (id) {
  router.push(`/player?id=${id}`)
}

onMounted(fetch)
</script>

<style scoped>
.favorites-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 24px;
}
.page-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
}
.page-header h2 {
  font-size: 18px;
  font-weight: 700;
}
.count {
  font-size: 12px;
  color: var(--color-text-secondary);
}
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.favorite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.12s;
}
.favorite-card:hover {
  background: #f8fafc;
}
.card-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}
.card-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}
.meta {
  font-size: 12px;
  color: var(--color-text-secondary);
}
.type-badge {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
  font-weight: 600;
  flex-shrink: 0;
  letter-spacing: 0.3px;
}
.badge-news { background: #dbeafe; color: #1d4ed8; }
.badge-dialogue { background: #d1fae5; color: #047857; }
.badge-passage { background: #fef3c7; color: #b45309; }
.remove-btn {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.12s;
}
.favorite-card:hover .remove-btn {
  opacity: 1;
}
.remove-btn:hover {
  background: #fef2f2;
  color: var(--color-danger);
}
.state-msg {
  text-align: center;
  padding: 48px 16px;
  color: var(--color-text-secondary);
  font-size: 14px;
}
.state-msg .sub {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.7;
}
.state-msg.error { color: var(--color-danger); }
</style>
