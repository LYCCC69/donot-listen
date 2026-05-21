<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 @click="$router.push('/player')">听力导航</h2>
    </div>
    <div class="sidebar-content">
      <div v-if="!data && !error" class="sidebar-loading">加载中…</div>
      <div v-else-if="error" class="sidebar-loading sidebar-error">{{ error }}</div>
      <template v-else>
        <div v-for="year in data.years" :key="year.id" class="nav-section">
          <div class="nav-section-title" @click="toggleSection(year.id)">
            <span>{{ year.title }}</span>
            <span class="collapse-icon">{{ expanded[year.id] !== false ? '▾' : '▸' }}</span>
          </div>
          <div v-show="expanded[year.id] !== false" class="nav-section-body">
            <div v-for="month in year.months" :key="month.id" class="nav-month">
              <div class="nav-month-title">{{ month.title }}</div>
              <!-- 英语结构 -->
              <template v-if="month.cet4">
                <div v-for="set in month.cet4" :key="set.id">
                  <div v-for="item in set.items" :key="item.id" class="nav-item" :class="{ active: currentId === item.id }" @click="selectItem(item)">
                    <span class="type-badge" :class="typeClass(item.type)">{{ typeLabel(item.type) }}</span>
                    <span class="item-label">{{ item.label }}</span>
                  </div>
                </div>
              </template>
              <!-- 西语结构 -->
              <template v-if="month.items">
                <div v-for="set in month.items" :key="set.id">
                  <div v-for="item in set.items" :key="item.id" class="nav-item" :class="{ active: currentId === item.id }" @click="selectItem(item)">
                    <span class="type-badge" :class="typeClass(item.type)">{{ typeLabel(item.type) }}</span>
                    <span class="item-label">{{ item.label }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div v-for="special in data.special" :key="special.id" class="nav-section">
          <div class="nav-section-title">{{ special.title }}</div>
          <div class="nav-section-body">
            <div v-for="item in special.items" :key="item.id" class="nav-item" :class="{ active: currentId === item.id }" @click="selectItem(item)">
              <span class="type-badge" :class="typeClass(item.type)">{{ typeLabel(item.type) }}</span>
              <span class="item-label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="sidebar-footer">
      <button class="nav-link" @click="$router.push('/favorites')">收藏</button>
      <button class="nav-link" @click="$router.push('/learning-records')">记录</button>
      <button class="nav-link" @click="$router.push('/review')">复习</button>
      <button class="nav-link" @click="$router.push('/settings')">设置</button>
    </div>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({ data: Object, currentId: String, error: String })
const emit = defineEmits(['select'])

const expanded = reactive({})

function toggleSection (id) {
  expanded[id] = expanded[id] === false ? true : false
}

function selectItem (item) {
  emit('select', item.id)
}

function typeClass (type) {
  return {
    LECTURE: 'badge-news',
    DIALOGUE: 'badge-dialogue',
    PASSAGE: 'badge-passage',
    DICTADO: 'badge-dictado'
  }[type] || ''
}

function typeLabel (type) {
  return {
    LECTURE: '新闻',
    DIALOGUE: '对话',
    PASSAGE: '短文',
    DICTADO: '听写'
  }[type] || type
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.sidebar-header {
  padding: 16px 16px 12px;
  border-bottom: 1px solid var(--color-border);
}
.sidebar-header h2 {
  font-size: 16px;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}
.sidebar-loading {
  padding: 24px 16px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 13px;
}
.sidebar-error {
  color: var(--color-danger);
  font-size: 12px;
  word-break: break-word;
}
.nav-section {
  margin-bottom: 2px;
}
.nav-section-title {
  padding: 8px 16px;
  font-weight: 600;
  font-size: 12px;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  letter-spacing: 0.3px;
}
.nav-section-title:hover {
  color: var(--color-text);
}
.collapse-icon {
  font-size: 10px;
  transition: transform 0.15s;
}
.nav-month {
  padding: 0 0 4px;
}
.nav-month-title {
  padding: 2px 16px 2px 24px;
  font-size: 11px;
  color: var(--color-text-secondary);
  opacity: 0.7;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 16px 5px 32px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 0;
  margin: 0;
  transition: background 0.12s, color 0.12s;
  color: var(--color-text);
}
.nav-item:hover {
  background: #f1f5f9;
}
.nav-item.active {
  background: #eef2ff;
  color: var(--color-primary);
  font-weight: 500;
}
.nav-item.active .item-label {
  color: var(--color-primary);
}
.type-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 600;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}
.badge-news { background: #dbeafe; color: #1d4ed8; }
.badge-dialogue { background: #d1fae5; color: #047857; }
.badge-passage { background: #fef3c7; color: #b45309; }
.badge-dictado { background: #ede9fe; color: #6d28d9; }
.item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar-footer {
  padding: 10px 12px;
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.nav-link {
  flex: 1;
  font-size: 12px;
  padding: 6px 8px;
  background: transparent;
  color: var(--color-text-secondary);
  text-align: center;
  border-radius: 6px;
  transition: background 0.12s, color 0.12s;
}
.nav-link:hover {
  background: #f1f5f9;
  color: var(--color-text);
}
</style>
