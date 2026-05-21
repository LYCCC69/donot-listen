/**
 * 语音合成播放服务 — 朗读字幕文本，逐句触发 onLineEnd
 */
export function createSpeechSynthesis () {
  const synth = window.speechSynthesis
  let _utterance = null
  let _lines = []
  let _currentIndex = 0
  let _speaking = false
  let _paused = false
  let _rate = 1
  let _onTimeUpdate = null
  let _onLineEnd = null
  let _onEnded = null

  // 用于平滑进度插值
  let _progressTimer = null
  let _progressStart = 0       // 真实世界开始时间戳 (performance.now)
  let _lineStartTime = 0       // 当前行 startTime
  let _lineEndTime = 0         // 当前行 endTime
  let _lineDuration = 0        // endTime - startTime

  function stopProgress () {
    if (_progressTimer !== null) {
      cancelAnimationFrame(_progressTimer)
      _progressTimer = null
    }
  }

  function startProgress (line) {
    stopProgress()
    _lineStartTime = line.startTime || 0
    _lineEndTime = line.endTime || _lineStartTime + 5
    _lineDuration = _lineEndTime - _lineStartTime
    _progressStart = performance.now()

    function tick () {
      if (_paused) return
      const elapsed = (performance.now() - _progressStart) / 1000
      const t = Math.min(elapsed / _lineDuration, 0.95) // 留 5% 给 onend 收尾
      _onTimeUpdate?.(_lineStartTime + t * _lineDuration)
      if (t < 0.95) {
        _progressTimer = requestAnimationFrame(tick)
      }
    }
    _progressTimer = requestAnimationFrame(tick)
  }

  function cancel () {
    stopProgress()
    if (synth.speaking) synth.cancel()
    _utterance = null
    _speaking = false
    _paused = false
  }

  function speakLine (index) {
    if (index >= _lines.length) {
      cancel()
      _onEnded?.()
      return
    }
    const line = _lines[index]
    if (!line || !line.text) {
      _currentIndex = index
      _onTimeUpdate?.(index * 5)
      setTimeout(() => speakLine(index + 1), 50)
      return
    }

    _currentIndex = index
    _speaking = true
    _paused = false

    const utterance = new SpeechSynthesisUtterance(line.text)
    _utterance = utterance
    utterance.rate = _rate
    utterance.pitch = 1
    utterance.volume = 1

    const hasSpanishChars = /[áéíóúñü¿¡]/i.test(line.text)
    utterance.lang = hasSpanishChars ? 'es-ES' : 'en-US'

    utterance.onstart = () => {
      startProgress(line)
      _onTimeUpdate?.(_lineStartTime)
    }

    utterance.onend = () => {
      if (_paused) return
      stopProgress()
      _speaking = false
      // 句末：对齐到 endTime
      _onTimeUpdate?.(_lineEndTime)
      // 通知控制器单句结束，由控制器决定是否播下句或结束
      _onLineEnd?.(_currentIndex)
    }

    utterance.onerror = () => {
      _speaking = false
      stopProgress()
    }

    synth.speak(utterance)
  }

  function init (lines) {
    cancel()
    _lines = lines || []
    _currentIndex = 0
    _rate = 1
  }

  function play () {
    if (_paused && synth.speaking) {
      synth.resume()
      _paused = false
      // 恢复进度插值：重新校准基准时间
      const line = _lines[_currentIndex]
      if (line) startProgress(line)
      return
    }
    if (!_speaking) {
      speakLine(_currentIndex)
    }
  }

  function pause () {
    if (synth.speaking) {
      stopProgress()
      synth.pause()
      _paused = true
    }
  }

  function seek (time) {
    const idx = _lines.findLastIndex(l => time >= (l.startTime || 0))
    const targetIndex = idx < 0 ? 0 : idx
    const wasSpeaking = _speaking
    cancel()
    _currentIndex = targetIndex
    _onTimeUpdate?.(_lines[targetIndex]?.startTime || time)
    if (wasSpeaking) {
      speakLine(targetIndex)
    }
  }

  function setRate (rate) { _rate = rate }
  function setLines (lines) { _lines = lines || [] }

  function destroy () {
    cancel()
    _lines = []
    _currentIndex = 0
    _onTimeUpdate = null
    _onLineEnd = null
    _onEnded = null
  }

  return {
    init, play, pause, seek, setRate, setLines, destroy,
    get element () { return null },
    onTimeUpdate: (fn) => { _onTimeUpdate = fn },
    onLineEnd: (fn) => { _onLineEnd = fn },
    onEnded: (fn) => { _onEnded = fn }
  }
}
