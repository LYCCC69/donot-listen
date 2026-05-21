import { createPlaybackService } from './playbackService'
import { createMaterialLoader } from './materialLoader'
import { createPresentationService } from './presentationService'
import { createFeedbackService } from './feedbackService'
import { useListeningStore } from '../stores'

export function createPlayerController (audioElement) {
  const store = useListeningStore()
  const playback = createPlaybackService(audioElement)
  const loader = createMaterialLoader()
  const presentation = createPresentationService()
  const feedback = createFeedbackService()

  let _listeningId = null
  let _autoNext = false
  let _loopMode = 'none' // 'none' | 'single'
  let _onLoopModeChange = null
  let _onPlaybackEnded = null
  let _isSeeking = false

  function setSeeking (v) { _isSeeking = v }

  // 高亮行同步到 store
  presentation.onLineChange((line, index) => {
    store.setCurrentLineIndex(index)
  })

  // 时间更新 → 同步进度条 + 更新当前行高亮 + 音频模式的自动连播/循环
  playback.onTimeUpdate(time => {
    if (!_isSeeking) {
      store.currentTime = time
    }
    store.duration = playback.getDuration()
    presentation.updateCurrentByTime(time)

    const line = presentation.getCurrentLine()
    if (!line || !line.endTime) return

    if (_loopMode === 'single' && time >= line.endTime) {
      playback.seek(line.startTime || 0)
      return
    }
    if (_autoNext && _loopMode !== 'single' && time >= line.endTime) {
      const nextIndex = presentation.getCurrentIndex() + 1
      if (nextIndex < presentation.getLineCount()) {
        const nextLine = presentation.getLineAt(nextIndex)
        if (nextLine) playback.seek(nextLine.startTime || 0)
        presentation.seekToLine(nextIndex)
      }
    }
  })

  // 语音合成模式单句结束 → 自动连播 / 循环 / 结束
  playback.onLineEnd(lineIndex => {
    if (_loopMode === 'single') {
      const line = presentation.getLineAt(lineIndex)
      if (line) {
        playback.seek(line.startTime || 0)
        playback.play()
      }
      return
    }
    if (_autoNext) {
      const nextIndex = lineIndex + 1
      if (nextIndex < presentation.getLineCount()) {
        const nextLine = presentation.getLineAt(nextIndex)
        if (nextLine) {
          playback.seek(nextLine.startTime || 0)
          presentation.seekToLine(nextIndex)
          playback.play()
          return
        }
      }
    }
    // 无连播/循环：推进到下一句起始位置，再结束播放
    const nextIndex = lineIndex + 1
    if (nextIndex < presentation.getLineCount()) {
      const nextLine = presentation.getLineAt(nextIndex)
      if (nextLine) {
        presentation.seekToLine(nextIndex)
        playback.seek(nextLine.startTime || 0)
      }
    }
    _onPlaybackEnded?.()
  })

  playback.onEnded(() => {
    if (_loopMode !== 'none') {
      const line = presentation.getCurrentLine()
      playback.seek(line?.startTime || 0)
      playback.play()
    } else {
      _onPlaybackEnded?.()
    }
  })

  async function loadMaterial (id) {
    _listeningId = id
    const [detail, transcript] = await Promise.all([
      loader.loadDetail(id),
      loader.loadTranscript(id)
    ])
    presentation.setLines(transcript.lines)
    playback.init(detail.audioUrl, transcript.lines)
    _loopMode = 'none'
    _autoNext = false
    return { detail, transcript }
  }

  function play () { return playback.play() }
  function pause () { playback.pause() }
  function seek (time) { playback.seek(time) }
  function setRate (rate) { playback.setRate(rate) }
  function seekToLine (index) {
    const line = presentation.getLineAt(index)
    if (line) playback.seek(line.startTime || 0)
    presentation.seekToLine(index)
  }

  function setAutoNext (val) { _autoNext = val }
  function setLoopMode (mode) {
    _loopMode = mode
    _onLoopModeChange?.(mode)
  }
  function onLoopModeChange (fn) { _onLoopModeChange = fn }
  function getLoopMode () { return _loopMode }
  function onPlaybackEnded (fn) { _onPlaybackEnded = fn }

  function submitFeedback (lineNumber, status) {
    return feedback.submit(_listeningId, lineNumber, status)
  }

  function destroy () {
    playback.destroy()
    presentation.destroy()
    _listeningId = null
    _onLoopModeChange = null
    _onPlaybackEnded = null
  }

  return {
    loadMaterial, play, pause, seek, setRate, seekToLine, setSeeking,
    setAutoNext, setLoopMode, onLoopModeChange, getLoopMode,
    onPlaybackEnded, getDuration: () => playback.getDuration(),
    getAudioElement: () => playback.getAudioElement(),
    submitFeedback, presentation, playback, feedback, destroy
  }
}
