<template>
  <div class="reset-page">
    <div class="reset-card">
      <h2>设置新密码</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>新密码</label>
          <input v-model="password" type="password" required minlength="6" />
        </div>
        <div class="form-group">
          <label>确认密码</label>
          <input v-model="confirmPassword" type="password" required />
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="message" class="success-msg">{{ message }}</p>
        <button type="submit" :disabled="loading">{{ loading ? '处理中...' : '重置密码' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

async function handleSubmit () {
  if (password.value !== confirmPassword.value) {
    error.value = '两次密码不一致'
    return
  }
  loading.value = true
  error.value = ''
  message.value = ''
  try {
    const { default: apiClient } = await import('../runtime/apiClient')
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    await apiClient.post('/auth/reset-password-confirm', { token, password: password.value })
    message.value = '密码已重置，请重新登录'
  } catch (e) {
    error.value = e.message || '重置失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reset-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}
.reset-card {
  background: var(--color-surface);
  padding: 40px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 400px;
}
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 4px; font-size: 13px; color: var(--color-text-secondary); }
.success-msg { color: var(--color-success); font-size: 13px; margin-bottom: 12px; }
.error-msg { color: var(--color-danger); font-size: 13px; margin-bottom: 12px; }
</style>
