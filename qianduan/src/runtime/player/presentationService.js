export function createPresentationService () {
  let _lines = []
  let _currentIndex = 0
  let _onLineChange = null

  function setLines (lines) {
    _lines = lines
  }

  function getCurrentLine () {
    return _lines[_currentIndex] || null
  }

  function getCurrentIndex () { return _currentIndex }
  function getLineAt (index) { return _lines[index] || null }
  function getLineCount () { return _lines.length }

  function seekToLine (index) {
    if (index >= 0 && index < _lines.length) {
      _currentIndex = index
      _onLineChange?.(_lines[index], index)
    }
  }

  function updateCurrentByTime (time) {
    let newIndex = _lines.findLastIndex(
      line => time >= (line.startTime || 0)
    )
    if (newIndex < 0) newIndex = 0
    if (newIndex !== _currentIndex) {
      _currentIndex = newIndex
      _onLineChange?.(_lines[newIndex], newIndex)
    }
  }

  function onLineChange (fn) { _onLineChange = fn }

  function destroy () {
    _lines = []
    _currentIndex = 0
    _onLineChange = null
  }

  return { setLines, getCurrentLine, getCurrentIndex, getLineAt, getLineCount, seekToLine, updateCurrentByTime, onLineChange, destroy }
}
