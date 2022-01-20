/* --- STATE --- */
export interface AuthState {
  user: any;
  loading: boolean;
  error?: any;
  token?: string;
  forgotPasswordEmail?: string;
  forgotPasswordOTP?: number;
  pubbunUserId?: string;
}
