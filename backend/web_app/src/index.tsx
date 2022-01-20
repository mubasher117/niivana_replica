/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import { App } from 'app';
import { PubNubProvider } from 'pubnub-react';

import FontFaceObserver from 'fontfaceobserver';
import { SnackbarProvider } from 'notistack';
import Pubnub from 'pubnub';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from 'reportWebVitals';

// Use consistent styling
import 'sanitize.css/sanitize.css';
import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
// Initialize languages
import './locales/i18n';
import PubNubCustomProvider from 'utils/PubNubCustomProvider';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});
const pubsubKeys = {
  publishKey: process.env.REACT_APP_PUBLISH_KEY || '',
  subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY || '',
};

const pubnubConfig = Object.assign(
  {},
  {
    // Ensure that subscriptions will be retained if the network connection is lost
    restore: true,
    heartbeatInterval: 0,
  },
  pubsubKeys,
);
export const pubnub = new Pubnub(pubnubConfig);
export const store = configureAppStore({
  pubnub: {
    api: pubnub,
  },
});
export const persistor = persistStore(store);

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

let pubnubProviderRef;
export const getPubnubProviderState = () => pubnubProviderRef.state;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PubNubCustomProvider ref={ref => (pubnubProviderRef = ref)}>
        <ThemeProvider>
          <SnackbarProvider maxSnack={3}>
            <HelmetProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </HelmetProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PubNubCustomProvider>
    </PersistGate>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
