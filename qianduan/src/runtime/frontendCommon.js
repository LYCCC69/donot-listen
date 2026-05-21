// 本地兜底、历史兼容、通用工具
// 随着重构推进，业务语义的逻辑应逐步迁移到专用 runtime service

export function getLocalFeedback (listeningId, lineNumber) {
  try {
    const data = JSON.parse(localStorage.getItem('local_feedback') || '{}')
    return data[`${listeningId}:${lineNumber}`] || null
  } catch {
    return null
  }
}

export function setLocalFeedback (listeningId, lineNumber, status) {
  try {
    const data = JSON.parse(localStorage.getItem('local_feedback') || '{}')
    data[`${listeningId}:${lineNumber}`] = status
    localStorage.setItem('local_feedback', JSON.stringify(data))
  } catch {
    // silent
  }
}

export function generateId () {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
