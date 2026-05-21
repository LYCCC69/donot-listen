import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from './apiClient'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || '')

  const isLoggedIn = computed(() => !!(token.value && user.value))

  function setLogin (userData, tokenStr) {
    user.value = userData
    token.value = tokenStr
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenStr)
  }

  function logout () {
    user.value = null
    token.value = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, token, isLoggedIn, setLogin, logout }
})

export const useListeningStore = defineStore('listening', {
  state: () => ({
    currentMaterial: null,
    transcriptLines: [],
    currentLineIndex: 0,
    feedbackStatus: {},
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
  }),
  getters: {
    currentLine: (state) => state.transcriptLines[state.currentLineIndex] || null,
  },
  actions: {
    setMaterial (material) {
      this.currentMaterial = material
    },
    setTranscript (lines) {
      this.transcriptLines = lines
    },
    setCurrentLineIndex (index) {
      this.currentLineIndex = index
    },
    setFeedback (lineNumber, status) {
      this.feedbackStatus[lineNumber] = status
    },
    setPlaying (status) {
      this.isPlaying = status
    },
    $reset () {
      this.currentMaterial = null
      this.transcriptLines = []
      this.currentLineIndex = 0
      this.feedbackStatus = {}
      this.isPlaying = false
      this.currentTime = 0
      this.duration = 0
    },
  },
})
