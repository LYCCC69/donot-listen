<template>
  <div class="home-page">
    <header class="home-header">
      <h1>不听听力</h1>
      <p class="subtitle">四六级听力训练平台</p>
    </header>
    <section class="home-actions">
      <button class="action-btn" @click="$router.push('/login')">开始学习</button>
      <button class="action-btn secondary" @click="$router.push('/player')">试听材料</button>
    </section>
    <section class="home-features">
      <div class="feature">
        <h3>逐句精听</h3>
        <p>逐句原文对照，精准定位薄弱环节</p>
      </div>
      <div class="feature">
        <h3>AI 解析</h3>
        <p>智能分析连读、失爆、生词等难点</p>
      </div>
      <div class="feature">
        <h3>科学复习</h3>
        <p>FSRS 调度算法，高效巩固记忆</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
  text-align: center;
}
.home-header h1 {
  font-size: 36px;
  margin-bottom: 8px;
}
.subtitle {
  color: var(--color-text-secondary);
  font-size: 16px;
  margin-bottom: 32px;
}
.home-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
}
.action-btn {
  padding: 12px 32px;
  font-size: 16px;
}
.action-btn.secondary {
  background: var(--color-border);
  color: var(--color-text);
}
.home-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.feature {
  background: var(--color-surface);
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.feature h3 {
  margin-bottom: 8px;
  font-size: 16px;
}
.feature p {
  color: var(--color-text-secondary);
  font-size: 13px;
}
</style>
