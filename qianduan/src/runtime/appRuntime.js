export function createAppRuntime ({ router }) {
  let toastTimer = null

  function showToast (msg, type = 'info') {
    const existing = document.querySelector('.app-toast')
    if (existing) existing.remove()
    clearTimeout(toastTimer)
    const el = document.createElement('div')
    el.className = `app-toast app-toast--${type}`
    el.textContent = msg
    document.body.appendChild(el)
    toastTimer = setTimeout(() => el.remove(), 3000)
  }

  function showLoading (msg = '加载中...') {
    const existing = document.querySelector('.app-loading')
    if (existing) return
    const el = document.createElement('div')
    el.className = 'app-loading'
    el.textContent = msg
    document.body.appendChild(el)
  }

  function hideLoading () {
    const el = document.querySelector('.app-loading')
    if (el) el.remove()
  }

  function showDialog (config) {
    const el = document.createElement('div')
    el.className = 'app-dialog-overlay'
    el.innerHTML = `
      <div class="app-dialog">
        <p>${config.message || ''}</p>
        <div class="app-dialog-actions">
          ${config.confirmText ? `<button class="btn-confirm">${config.confirmText}</button>` : ''}
          ${config.cancelText ? `<button class="btn-cancel">${config.cancelText}</button>` : ''}
        </div>
      </div>
    `
    document.body.appendChild(el)
    return new Promise(resolve => {
      el.querySelector('.btn-confirm')?.addEventListener('click', () => {
        el.remove()
        resolve(true)
      })
      el.querySelector('.btn-cancel')?.addEventListener('click', () => {
        el.remove()
        resolve(false)
      })
    })
  }

  return { showToast, showLoading, hideLoading, showDialog, router }
}
