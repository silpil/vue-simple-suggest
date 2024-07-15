import { ref } from 'vue'
import { debounceFetch, useAbortable } from '@/api'

export function useSuggest({ apiUrl = '/', minLengthQuery = 3 }) {
  const abortable = useAbortable()

  const list = ref([])
  const errorMessage = ref('')
  const isLoading = ref(false)

  const handleReset = () => {
    list.value = []
    errorMessage.value = ''
    isLoading.value = false
  }

  const fetchSuggest = async (query, abort = false) => {
    if (abort) {
      abortable?.abort()

      return
    }

    try {
      const response = await abortable.fetch(`${apiUrl}?q=${query}`)
      if (!response.ok) throw new Error(response.status)
      
      const json = await response.json()
      list.value = json.data
      errorMessage.value = ''
    } catch (error) {
      if (error.name !== 'AbortError') {
        switch (error.message) {
          case '404':
            errorMessage.value = 'Не найдено'
            break
          case '400':
            errorMessage.value = 'Неправильный запрос'
            break
          case '500':
            errorMessage.value = 'Ошибка на сервере'
            break
          default:
            errorMessage.value = 'Что-то пошло не так :('
        }
      }
    } finally {
      isLoading.value = false
    }
  }

  const debouncedFetch = debounceFetch(fetchSuggest, 500, () => abortable.abort())

  const handleInput = (query) => {
    if (query.length >= minLengthQuery) {
      isLoading.value = true
      debouncedFetch(query)
    } else {
      handleReset()
      debouncedFetch(query, true)
    }
  }

  return {
    list,
    errorMessage,
    isLoading,
    handleInput,
    handleReset
  }
}
