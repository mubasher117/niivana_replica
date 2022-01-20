/**
 *
 * HomePage
 *
 */
import Header from 'app/components/AppBar';
import { BookingCard } from 'app/components/BookingCard';
import { DashboardSidebar } from 'app/components/DashboardSidebar';
import { FlexDiv } from 'app/components/FlexDiv';
import * as React from 'react';
import { BookingDetails } from '../BookingDetails/Loadable';
import { BookingList } from '../BookingList/Loadable';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';

interface Props {}

export function HomePage(props: Props) {
  return (
    <div>
      <Header />
      <DashboardSidebar>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          component={BookingList}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/booking/:id'}
          component={BookingDetails}
        />
      </DashboardSidebar>
    </div>
  );
}
