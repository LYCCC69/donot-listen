import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../runtime/stores'

export function useProtectedPage () {
  const router = useRouter()
  const userStore = useUserStore()

  onMounted(() => {
    if (!userStore.isLoggedIn) {
      router.replace('/home')
    }
  })

  return { isAuthenticated: userStore.isLoggedIn }
}
