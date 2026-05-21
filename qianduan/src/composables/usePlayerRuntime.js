import { ref, onMounted, onUnmounted, inject } from 'vue'
import { createPlayerController } from '../runtime/player/PlayerController'
import { useListeningStore } from '../runtime/stores'
import { getSetItems, getMaterialById, getTranscriptById } from '../data/mockData'

export function usePlayerRuntime (audioElementRef, audioUrlRef) {
  const runtime = inject('runtime')
  const store = useListeningStore()
  let controller = null

  const setItems = ref([])

  onMounted(() => {
    controller = createPlayerController(audioElementRef.value)
  })

  onUnmounted(() => {
    controller?.destroy()
    store.$reset()
    setItems.value = []
  })

  async function loadMaterial (id) {
    if (!id) return
    try {
      runtime.showLoading('加载中...')
      const { detail, transcript } = await controller.loadMaterial(id)
      store.setMaterial(detail)
      store.setTranscript(transcript.lines)
      if (detail.audioUrl) audioUrlRef.value = detail.audioUrl

      if (detail.year && detail.month && detail.level && detail.setNumber) {
        const set = getSetItems({ year: detail.year, month: detail.month, level: detail.level, setNumber: detail.setNumber })
        setItems.value = (set || []).map(item => ({
          ...item,
          typeLabel: { LECTURE: '新闻', DIALOGUE: '对话', PASSAGE: '短文', DICTADO: '听写' }[item.type] || item.type
        }))
      } else {
        setItems.value = []
      }
    } catch (e) {
      console.warn('[loadMaterial] 后端不可用，尝试从本地 mock 数据加载:', id)
      const mockDetail = getMaterialById(id)
      const mockTranscript = getTranscriptById(id)
      if (mockDetail && mockTranscript) {
        store.setMaterial({ ...mockDetail, audioUrl: `/audio/${id}.mp3`, isCollected: false })
        store.setTranscript(mockTranscript.lines)
        audioUrlRef.value = `/audio/${id}.mp3`
        setItems.value = getSetItems(mockDetail).map(item => ({
          ...item,
          typeLabel: { LECTURE: '新闻', DIALOGUE: '对话', PASSAGE: '短文', DICTADO: '听写' }[item.type] || item.type
        }))
        controller?.loadMaterial(id).catch(() => {})
      } else {
        runtime.showToast('材料加载失败', 'error')
      }
    } finally {
      runtime.hideLoading()
    }
  }

  return {
    getController: () => controller,
    loadMaterial,
    setItems,
    play: () => controller?.play(),
    pause: () => controller?.pause(),
    seekToLine: (index) => controller?.seekToLine(index),
    setAutoNext: (val) => controller?.setAutoNext(val),
    setLoopMode: (mode) => controller?.setLoopMode(mode),
    getLoopMode: () => controller?.getLoopMode(),
    onLoopModeChange: (fn) => controller?.onLoopModeChange(fn),
    onPlaybackEnded: (fn) => controller?.onPlaybackEnded(fn),
    submitFeedback: (lineNumber, status) => controller?.submitFeedback(lineNumber, status)
  }
}
