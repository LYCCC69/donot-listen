import { ref } from 'vue'
import apiClient from '../runtime/apiClient'

export function useLineFeedback () {
  const submitting = ref(false)

  async function submitFeedback (listeningId, lineNumber, status) {
    submitting.value = true
    try {
      await apiClient.submitFeedback({ listeningId, lineNumber, status })
      return true
    } catch {
      return false
    } finally {
      submitting.value = false
    }
  }

  return { submitting, submitFeedback }
}
