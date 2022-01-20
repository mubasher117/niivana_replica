import API from ".."

export function BookAppointment(clientId, providerId) {
  const apiInput = { clientId, providerId }
  return API.post("/booking/", JSON.stringify(apiInput))
}
