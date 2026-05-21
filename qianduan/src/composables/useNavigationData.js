import { ref } from 'vue'
import { NAVIGATION_DATA } from '../data/mockData'

export function useNavigationData () {
  const navData = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 直接使用内置导航数据，不依赖后端 API
  navData.value = NAVIGATION_DATA

  return { navData, loading, error, refresh: () => { navData.value = NAVIGATION_DATA } }
}
