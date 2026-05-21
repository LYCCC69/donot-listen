import { createAudioEngine } from './audioEngine'
import { createSpeechSynthesis } from './speechSynthesis'
import { useListeningStore } from '../stores'

/**
 * 播放服务 — 优先使用真实音频文件，回退到语音合成朗读字幕
 */
export function createPlaybackService (audioElement) {
  const audio = createAudioEngine(audioElement)
  const store = useListeningStore()
  let speech = null
  let mode = 'audio' // 'audio' | 'speech'
  let _lines = []

  let _onTimeUpdate = null
  let _onEnded = null
  let _onLineEnd = null
  let _rafId = null
  let _switchTimer = null

  function startAudioRAF () {
    if (_rafId) return
    function tick () {
      if (mode !== 'audio') return
      _onTimeUpdate?.(audio.element.currentTime)
      if (!audio.element.paused && !audio.element.ended) {
        _rafId = requestAnimationFrame(tick)
      } else {
        _rafId = null
      }
    }
    _rafId = requestAnimationFrame(tick)
  }

  function cancelSwitchTimer () {
    if (_switchTimer !== null) {
      clearTimeout(_switchTimer)
      _switchTimer = null
    }
  }

  // 音频开始播放 → 取消切换到语音合成的定时器，防止播放中销毁音频
  audio.element.addEventListener('play', () => {
    cancelSwitchTimer()
    startAudioRAF()
  })
  audio.element.addEventListener('pause', () => {
    console.log('[Playback] pause 事件 — currentTime:', audio.element.currentTime, 'audio.src:', audio.element.src ? '有值' : '为空')
  })
  audio.element.addEventListener('ended', () => {
    console.log('[Playback] 音频播放结束 (ended 事件触发)')
    store.setPlaying(false)
    if (mode === 'audio') _onEnded?.()
  })

  function switchToSpeech () {
    if (mode !== 'audio') return
    mode = 'speech'
    audio.destroy()

    speech = createSpeechSynthesis()
    speech.init(_lines)
    speech.onTimeUpdate(time => _onTimeUpdate?.(time))
    speech.onLineEnd(index => _onLineEnd?.(index))
    speech.onEnded(() => _onEnded?.())
  }

  function init (url, lines) {
    _lines = lines || []
    speech = null
    mode = 'audio'

    console.log('[Playback] init, audioUrl:', url)

    if (!url) {
      console.log('[Playback] 无音频 URL，切换到语音合成')
      // 没有音频 URL → 直接使用语音合成
      switchToSpeech()
      return
    }

    audio.load(url)

    // 音频加载失败 → 切换到语音合成
    audio.element?.addEventListener('error', () => switchToSpeech(), { once: true })
    // 1秒未加载完成 → 切换到语音合成（音频开始播放后自动取消）
    _switchTimer = setTimeout(() => {
      if (mode === 'audio') switchToSpeech()
    }, 1000)
  }

  function play () {
    if (mode === 'speech' && speech) { speech.play(); store.setPlaying(true); return }
    if (!audio.element.src) {
      console.warn('[Playback] 音频源为空，请先加载材料')
      return
    }
    console.log('[Playback] 播放前 currentTime:', audio.element.currentTime)
    audio.element.play().catch(err => {
      console.warn('[Playback] 播放失败:', err)
      store.setPlaying(false)
    })
    store.setPlaying(true)
  }

  function pause () {
    if (mode === 'speech' && speech) { speech.pause(); store.setPlaying(false); return }
    console.log('[Playback] 暂停 - 当前进度:', audio.element.currentTime)
    audio.element.pause()
    store.setPlaying(false)
  }

  function seek (time) {
    if (mode === 'speech' && speech) { speech.seek(time); return }
    audio.seek(time)
  }

  function setRate (rate) {
    if (mode === 'speech' && speech) { speech.setRate(rate); return }
    audio.setPlaybackRate(rate)
  }

  function getDuration () {
    if (mode === 'speech') {
      return _lines.reduce((max, l) => Math.max(max, l.endTime || 0), 0)
    }
    return audio.element.duration || 0
  }

  function onTimeUpdate (fn) { _onTimeUpdate = fn }
  function onEnded (fn) { _onEnded = fn }
  function onLineEnd (fn) { _onLineEnd = fn }

  function destroy () {
    cancelSwitchTimer()
    if (_rafId) { cancelAnimationFrame(_rafId); _rafId = null }
    audio.destroy()
    speech?.destroy()
    speech = null
    _lines = []
    _onTimeUpdate = null
    _onEnded = null
    _onLineEnd = null
  }

  return { init, play, pause, seek, setRate, getDuration, onTimeUpdate, onEnded, onLineEnd, destroy,
    getAudioElement: () => mode === 'audio' ? audio.element : null }
}
