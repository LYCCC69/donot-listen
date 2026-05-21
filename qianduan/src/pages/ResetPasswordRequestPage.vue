<template>
  <div class="reset-page">
    <div class="reset-card">
      <h2>重置密码</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>邮箱地址</label>
          <input v-model="email" type="email" required placeholder="请输入注册邮箱" />
        </div>
        <p v-if="message" class="success-msg">{{ message }}</p>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <button type="submit" :disabled="loading">{{ loading ? '发送中...' : '发送重置链接' }}</button>
      </form>
      <p class="back-link"><a href="#" @click.prevent="$router.push('/login')">返回登录</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const runtime = inject('runtime')
const email = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

async function handleSubmit () {
  loading.value = true
  error.value = ''
  message.value = ''
  try {
    const { default: apiClient } = await import('../runtime/apiClient')
    await apiClient.post('/auth/reset-password-request', { email: email.value })
    message.value = '重置链接已发送到您的邮箱'
  } catch (e) {
    error.value = e.message || '发送失败'
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
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  color: var(--color-text-secondary);
}
.success-msg { color: var(--color-success); font-size: 13px; margin-bottom: 12px; }
.error-msg { color: var(--color-danger); font-size: 13px; margin-bottom: 12px; }
.back-link { margin-top: 16px; text-align: center; font-size: 13px; }
</style>
