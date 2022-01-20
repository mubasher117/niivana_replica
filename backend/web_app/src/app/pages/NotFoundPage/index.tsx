import * as React from 'react';
import styled from 'styled-components/macro';
import { P } from './P';
import { Link } from 'app/components/Link';
import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { useSelector } from 'react-redux';
import {
  selectAuth,
  selectAuthToken,
} from 'app/sharedSlice/auth/slice/selectors';

export function NotFoundPage() {
  const token = useSelector(selectAuthToken);
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      {/* <NavBar /> */}
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
        <Link
          to={
            token
              ? process.env.PUBLIC_URL + '/'
              : process.env.PUBLIC_URL + '/login'
          }
        >
          {`Return to ${token ? 'Home' : 'Login'} Page`}
        </Link>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${p => p.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
