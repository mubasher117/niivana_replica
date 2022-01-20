import API from ".."

export function signUp(payload) {
  return API.post(`/signup/`, JSON.stringify(payload))
}
export function SignIn(payload) {
  return API.post(`/login/`, payload)
}
export function SendOtp(payload) {
  return API.post(`/otp/send_otp/`, JSON.stringify(payload))
}
export function CheckOtp(payload) {
  return API.post(`/otp/check_otp/`, JSON.stringify(payload))
}
export function UpdatePassword(payload) {
  return API.post(`/otp/update_password/`, JSON.stringify(payload))
}

export function refreshAccessToken(){
  return
}
