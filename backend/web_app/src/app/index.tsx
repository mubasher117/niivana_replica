/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';
import { ForgotPassword } from './pages/ForgotPassword/Loadable';
import { Login } from './pages/Login/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { Otp } from './pages/Otp/Loadable';
import { Register } from './pages/Register/Loadable';
import { ResetPassword } from './pages/ResetPassword/Loadable';
import history from '../utils/history';
import { HomePage } from './pages/HomePage/Loadable';
import { ZoomMeeting } from './pages/ZoomMeeting/Loadable';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import { selectAuth } from './sharedSlice/auth/slice/selectors';
import { usePubNub } from 'pubnub-react';
import { createPubNubListener } from 'pubnub-redux';
import { store } from 'index';
import { initializePubnunbChat } from 'utils/pubnub';

export function App() {
  const { token, user } = useSelector(selectAuth);
  const { i18n } = useTranslation();
  const pubnub = usePubNub();

  const leaveApplication = () => {
    // This is required to show the current user leave immediately rather than
    // wating for the timeout period
    pubnub.unsubscribeAll();
  };

  useEffect(() => {
    // Start listening for messages and events from PubNub
    pubnub.addListener(createPubNubListener(store.dispatch));
    // pubnub.addListener(createTypingIndicatorsListener(store.dispatch));
    return leaveApplication;
  }, []);

  useEffect(() => {
    if (token) {
      initializePubnunbChat(user);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveApplication);
  }, []);
  return (
    <Router history={history}>
      <Helmet
        titleTemplate="%s - Niivana Web"
        defaultTitle="Niivana Web"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Niivana Web application" />
      </Helmet>
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/login'}
          component={Login}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/zoom-meeting/:id'}
          component={ZoomMeeting}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/register'}
          component={Register}
        />

        <Route
          exact
          path={process.env.PUBLIC_URL + '/forgot-password'}
          component={ForgotPassword}
        />
        <Route exact path={process.env.PUBLIC_URL + '/otp'} component={Otp} />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/reset-password'}
          component={ResetPassword}
        />
        {token && (
          <Route path={process.env.PUBLIC_URL + '/'}>
            <HomePage />
          </Route>
        )}

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
