import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSaga } from 'app/sharedSlice/auth/slice/saga';
import { bookingSaga } from 'app/sharedSlice/booking/slice/saga';
import { PubnubThunkContext } from 'pubnub-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { createReducer } from './reducers';
import ReduxThunk from 'redux-thunk';

export type AppThunkContext = PubnubThunkContext;

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = createReducer();
const appReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return rootReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, appReducer);
export type RootState = Readonly<ReturnType<typeof appReducer>>;

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
function* rootSaga() {
  yield all([fork(authSaga), fork(bookingSaga)]);
}
export function configureAppStore(thunkContext: AppThunkContext) {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({ serializableCheck: false }),
      sagaMiddleware,
      ReduxThunk.withExtraArgument(thunkContext),
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}
// export default store;
