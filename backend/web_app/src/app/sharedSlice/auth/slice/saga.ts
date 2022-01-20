import { initializePubnunbChat } from 'utils/pubnub';
import { getPubnubProviderState, store } from './../../../../index';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { authActions as actions } from '.';
import history from '../../../../utils/history';
import { fetchMemberships } from 'pubnub-redux';
function* login(action) {
  try {
    const user = yield call(request, '/login/', 'POST', action.payload);

    initializePubnunbChat(user.user);
    yield put(actions.loginSuccess(user));
    history.replace('/');
  } catch (error: any) {
    yield put(actions.loginError(error.response?.data?.non_field_errors[0]));
  }
}

function* register(action) {
  try {
    const user = yield call(request, '/signup/', 'POST', action.payload);

    yield put(actions.registerSuccess(user));
    history.replace('/login');
  } catch (error: any) {
    yield put(
      actions.registerError(
        error.response.data?.email[0] || 'Internal Error Occurred',
      ),
    );
  }
}

function* forgotPassword(action) {
  try {
    const response = yield call(
      request,
      '/otp/send_otp/',
      'POST',
      action.payload,
    );
    yield put(actions.setForgotPasswordEmail(action.payload.email));
    history.replace('/otp');
    yield put(actions.forgotPasswordSuccess());
  } catch (error) {
    yield put(actions.forgotPasswordError(error));
  }
}

function* CheckOtp(action) {
  try {
    const response = yield call(
      request,
      '/otp/check_otp/',
      'POST',
      action.payload,
    );
    if (!response.success) {
      yield put(actions.checkOTPError('Invalid OTP'));
      return;
    }
    yield put(actions.setForgotPasswordOTP(action.payload.code));
    yield put(actions.checkOTPSuccess());
    history.replace('/reset-password');
  } catch (error) {
    yield put(actions.checkOTPError(error));
  }
}

function* ResetPassword(action) {
  try {
    const response = yield call(
      request,
      '/otp/update_password/',
      'POST',
      action.payload,
    );
    yield put(actions.resetPasswordSuccess());
    history.replace('/login');
  } catch (error) {
    yield put(actions.resetPasswordError(error));
  }
}

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, login);
  yield takeLatest(actions.registerRequest.type, register);
  yield takeLatest(actions.forgotPasswordRequest.type, forgotPassword);
  yield takeLatest(actions.checkOTPRequest.type, CheckOtp);
  yield takeLatest(actions.resetPasswordRequest.type, ResetPassword);
}
