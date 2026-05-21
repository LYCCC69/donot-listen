import { reactive } from 'vue'

// UI 层共享状态（非持久化）
const state = reactive({
  sidebarCollapsed: false,
  aiModalVisible: false,
  currentModalLineId: null
})

export function useUiState () {
  function toggleSidebar () {
    state.sidebarCollapsed = !state.sidebarCollapsed
  }

  function openAiModal (lineId) {
    state.aiModalVisible = true
    state.currentModalLineId = lineId
  }

  function closeAiModal () {
    state.aiModalVisible = false
    state.currentModalLineId = null
  }

  return { uiState: state, toggleSidebar, openAiModal, closeAiModal }
}
