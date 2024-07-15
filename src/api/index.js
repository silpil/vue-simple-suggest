export function debounceFetch (fn, delay, onCancel = () => {}) {
  let timer = 0, isFetching = false
  
  return function (...args) {
    clearTimeout(timer)
    
    if (isFetching) {
      onCancel()
      isFetching = false
    }
    
    timer = setTimeout(() => {
      isFetching = true
      fn(...args)
    }, delay)
  }
}

export function useAbortable () {
  let controller

  return {
    fetch: (url, opts = {}) => {
      controller = new AbortController()

      return fetch(url, Object.assign({}, opts, {
        signal: controller.signal
      }))
    },
    abort: () => controller.abort()
  }
}
