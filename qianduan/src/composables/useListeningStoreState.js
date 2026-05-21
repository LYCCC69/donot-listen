import { computed } from 'vue'
import { useListeningStore } from '../runtime/stores'

export function useListeningStoreState () {
  const store = useListeningStore()

  return {
    currentMaterial: computed(() => store.currentMaterial),
    currentLine: computed(() => store.currentLine),
    currentLineIndex: computed(() => store.currentLineIndex),
    isPlaying: computed(() => store.isPlaying),
    currentTime: computed(() => store.currentTime),
    duration: computed(() => store.duration),
    transcriptLines: computed(() => store.transcriptLines),
    feedbackStatus: computed(() => store.feedbackStatus)
  }
}
