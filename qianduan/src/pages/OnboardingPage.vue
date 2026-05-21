<template>
  <div class="onboarding-page">
    <h2>欢迎使用不听听力</h2>
    <div class="steps">
      <div class="step">
        <span class="step-num">1</span>
        <div>
          <strong>选择材料</strong>
          <p>从侧边栏选择历年真题或专项训练</p>
        </div>
      </div>
      <div class="step">
        <span class="step-num">2</span>
        <div>
          <strong>逐句精听</strong>
          <p>播放音频，对照原文逐句学习</p>
        </div>
      </div>
      <div class="step">
        <span class="step-num">3</span>
        <div>
          <strong>反馈标记</strong>
          <p>对每句标记听懂/熟悉/陌生，系统会记录薄弱点</p>
        </div>
      </div>
      <div class="step">
        <span class="step-num">4</span>
        <div>
          <strong>AI 解析</strong>
          <p>对难点句子使用 AI 智能分析</p>
        </div>
      </div>
      <div class="step">
        <span class="step-num">5</span>
        <div>
          <strong>科学复习</strong>
          <p>系统根据遗忘曲线安排复习</p>
        </div>
      </div>
    </div>
    <button @click="$router.push('/player')">开始学习</button>
  </div>
</template>

<style scoped>
.onboarding-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 48px 24px;
}
.steps {
  margin: 32px 0;
}
.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}
.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.step strong {
  display: block;
  margin-bottom: 4px;
}
.step p {
  color: var(--color-text-secondary);
  font-size: 13px;
}
</style>
