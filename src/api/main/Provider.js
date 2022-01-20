import API from ".."

export function getProviders() {
  return API.get("/availability/get_providers/")
}
export function getProviderDetails(providerId) {
  return API.get(`/availability/get_provider/?id=${providerId}`)
}
export function getFeedbackProvider(providerId) {
  return API.get(`/feedback/?id=${providerId}`)
}
