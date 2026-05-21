import apiClient from '../apiClient'
import { getMaterialById, getTranscriptById, getSetItems } from '../../data/mockData'

export function createMaterialLoader () {
  async function loadDetail (id) {
    // 优先使用本地 mock 数据，避免后端未启动时长时间等待
    const mock = getMaterialById(id)
    if (mock) return { ...mock, audioUrl: `/audio/${id}.mp3`, isCollected: false }

    try {
      return await apiClient.getListeningDetail(id)
    } catch {
      throw new Error('材料不存在: ' + id)
    }
  }

  async function loadTranscript (id) {
    // 优先使用本地 mock 数据
    const mock = getTranscriptById(id)
    if (mock) return mock

    try {
      return await apiClient.getTranscript(id)
    } catch {
      throw new Error('字幕不存在: ' + id)
    }
  }

  function loadList (params) {
    return apiClient.getListeningList(params)
  }

  function loadSet (params) {
    return new Promise(resolve => {
      apiClient.getListeningSet(params)
        .then(resolve)
        .catch(() => resolve(getSetItems(params)))
    })
  }

  return { loadList, loadDetail, loadTranscript, loadSet }
}
