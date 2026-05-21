<template>
  <div class="settings-page">
    <h2>设置</h2>
    <div class="settings-section">
      <h3>账户</h3>
      <div v-if="userStore.isLoggedIn" class="user-info">
        <p>用户名: {{ userStore.user?.username }}</p>
        <p>邮箱: {{ userStore.user?.email }}</p>
        <p>等级: {{ userStore.user?.level === 6 ? '六级' : '四级' }}</p>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>
      <div v-else>
        <p class="state-msg">未登录</p>
        <button @click="$router.push('/login')">去登录</button>
      </div>
    </div>
    <div class="settings-section">
      <h3>播放设置</h3>
      <div class="setting-row">
        <span class="setting-label">默认视图</span>
        <div class="setting-options">
          <button class="option-btn" :class="{ active: defaultView === 'normal' }" @click="setView('normal')">标准</button>
          <button class="option-btn" :class="{ active: defaultView === 'immersive' }" @click="setView('immersive')">沉浸</button>
        </div>
      </div>
      <div class="setting-row">
        <span class="setting-label">自动连播</span>
        <label class="toggle">
          <input type="checkbox" :checked="autoNextDefault" @change="setAutoNextDefault">
          <span class="toggle-track"></span>
        </label>
      </div>
      <div class="setting-row">
        <span class="setting-label">默认倍速</span>
        <select class="setting-select" :value="defaultRate" @change="setDefaultRate">
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
    <div class="settings-section">
      <h3>关于</h3>
      <p>不听听力 v1.0.0</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../runtime/stores'
import { useProtectedPage } from '../composables/useProtectedPage'

useProtectedPage()
const router = useRouter()
const userStore = useUserStore()

const defaultView = ref(localStorage.getItem('defaultView') || 'normal')
const autoNextDefault = ref(localStorage.getItem('autoNextDefault') === 'true')
const defaultRate = ref(parseFloat(localStorage.getItem('defaultRate') || '1'))

function setView (val) {
  defaultView.value = val
  localStorage.setItem('defaultView', val)
}

function setAutoNextDefault (e) {
  autoNextDefault.value = e.target.checked
  localStorage.setItem('autoNextDefault', String(e.target.checked))
}

function setDefaultRate (e) {
  defaultRate.value = e.target.value
  localStorage.setItem('defaultRate', e.target.value)
}

function handleLogout () {
  userStore.logout()
  router.push('/home')
}
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 24px;
}
.settings-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 20px 24px;
  margin-top: 20px;
}
.settings-section h3 {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  letter-spacing: 0.3px;
}
.user-info p {
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--color-text);
}
.logout-btn {
  margin-top: 12px;
  padding: 6px 16px;
  font-size: 13px;
  background: transparent;
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.12s;
}
.logout-btn:hover {
  background: #fef2f2;
}
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
}
.setting-row + .setting-row {
  border-top: 1px solid var(--color-border);
}
.setting-label {
  color: var(--color-text);
  font-weight: 500;
}
.setting-options {
  display: flex;
  gap: 6px;
}
.option-btn {
  padding: 4px 14px;
  font-size: 13px;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.12s;
}
.option-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
}
.option-btn.active {
  background: #eef2ff;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.setting-select {
  padding: 4px 10px;
  font-size: 13px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  outline: none;
}
.toggle {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  cursor: pointer;
}
.toggle input {
  display: none;
}
.toggle-track {
  position: absolute;
  inset: 0;
  background: #d1d5db;
  border-radius: 11px;
  transition: background 0.15s;
}
.toggle-track::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  left: 2px;
  top: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.15s;
}
.toggle input:checked + .toggle-track {
  background: var(--color-primary);
}
.toggle input:checked + .toggle-track::after {
  transform: translateX(18px);
}
.state-msg {
  color: var(--color-text-secondary);
  margin-bottom: 12px;
  font-size: 14px;
}
</style>
