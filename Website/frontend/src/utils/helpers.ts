// Utility Functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
