const LOCAL_FEEDBACK_KEY = 'local_feedback'

function loadLocalFeedback () {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_FEEDBACK_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveLocalFeedback (data) {
  localStorage.setItem(LOCAL_FEEDBACK_KEY, JSON.stringify(data))
}

export function createFeedbackService () {
  async function submit (listeningId, lineNumber, status) {
    try {
      const { default: apiClient } = await import('../apiClient')
      await apiClient.submitFeedback({ listeningId, lineNumber, status })
      return true
    } catch {
      const local = loadLocalFeedback()
      const key = `${listeningId}:${lineNumber}`
      local[key] = status
      saveLocalFeedback(local)
      return false
    }
  }

  function getLocalStatus (listeningId, lineNumber) {
    const local = loadLocalFeedback()
    return local[`${listeningId}:${lineNumber}`] || null
  }

  return { submit, getLocalStatus }
}
