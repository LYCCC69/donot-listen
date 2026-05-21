import emitter from '../eventBus'

/**
 * 音频引擎 — 包装 HTMLAudioElement
 * 可传入已有 <audio> 元素（来自模板 ref），或由内部创建
 */
export function createAudioEngine (audioElement) {
  const audio = audioElement || new Audio()
  let ready = false

  audio.preload = 'auto'

  audio.addEventListener('loadedmetadata', () => {
    ready = true
    emitter.emit('audio:loaded', audio.duration)
  })

  audio.addEventListener('timeupdate', () => {
    emitter.emit('audio:timeupdate', audio.currentTime)
  })

  audio.addEventListener('ended', () => {
    emitter.emit('audio:ended')
  })

  audio.addEventListener('error', () => {
    emitter.emit('audio:error', audio.error)
  })

  function load (url) {
    ready = false
    audio.src = url
    audio.load()
  }

  async function play () {
    if (!audio.src) {
      console.warn('[Audio] 音频源为空，等待加载...')
      return
    }
    await audio.play()
  }

  function pause () {
    audio.pause()
  }

  function seek (time) {
    audio.currentTime = time
  }

  function setPlaybackRate (rate) {
    audio.playbackRate = rate
  }

  function destroy () {
    audio.pause()
    audio.src = ''
  }

  return { load, play, pause, seek, setPlaybackRate, destroy, element: audio }
}
