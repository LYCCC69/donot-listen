import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useAppShellNavigation () {
  const router = useRouter()

  onMounted(() => {
    const hash = window.location.hash
    if (hash && hash.startsWith('#/')) {
      router.replace(hash.slice(1))
    }
  })
}
