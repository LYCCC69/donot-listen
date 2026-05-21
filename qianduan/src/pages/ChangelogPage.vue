<template>
  <div class="changelog-page">
    <h2>更新日志</h2>
    <div class="log-entry">
      <h3>v1.0.0</h3>
      <p>发布日期：2026-05-20</p>
      <ul>
        <li>全新 Vue 3 前端架构</li>
        <li>Spring Boot 3.2 后端重构</li>
        <li>FSRS 复习调度算法</li>
        <li>AI 智能句子解析</li>
        <li>学习记录与统计</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.changelog-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 24px;
}
.log-entry {
  margin-top: 24px;
  background: var(--color-surface);
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.log-entry h3 {
  margin-bottom: 4px;
}
.log-entry p {
  color: var(--color-text-secondary);
  font-size: 13px;
  margin-bottom: 12px;
}
.log-entry ul {
  padding-left: 20px;
}
.log-entry li {
  margin-bottom: 6px;
}
</style>
