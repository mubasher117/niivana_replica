import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { bookingActions as actions } from '.';
import history from 'utils/history';
import { request } from 'utils/request';

export function* bookingListSaga() {
  try {
    const bookingList = yield call(
      request,
      '/appointment/get_provider_appointments/',
      'GET',
      null,
      null,
      true,
    );

    yield put(actions.bookingListSuccess(bookingList));
  } catch (error: any) {
    yield put(
      actions.bookingListError(
        error.response?.data?.non_field_errors[0] || 'Internal Error Occurred',
      ),
    );
  }
}
export function* bookingSaga() {
  yield takeLatest(actions.bookingListRequest.type, bookingListSaga);
}
